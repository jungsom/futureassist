import {
  saveBoardRepository,
  getBoardByIdRepository,
  updateBoardRepository,
  deleteBoardRepository,
  getAndIncrementViewsRepository
} from '../repositories/boardRepository';
import { BoardDTO, BoardIdDTO } from '../dtos/boardDto';
import { Board } from '../entities/Board';
import { BadRequest } from '../middlewares/error';
import { formatDateToMinute } from './utils';
import { IBoard } from '../models/boardModel';

/** 게시글 생성 서비스 */
export const createBoard = async (userId: number, dto: BoardDTO) => {
  const board = new Board();
  board.user_id = userId;
  board.title = dto.title;
  board.content = dto.content;
  board.hashtag = dto.hashtag || [];

  try {
    await saveBoardRepository(board);
    return { message: '게시글이 생성되었습니다.' };
  } catch (err) {
    throw new Error('게시글 생성 중 오류가 발생했습니다.');
  }
};

/** 게시글 수정 서비스 */
export const updateBoard = async (
  userId: number,
  dto: BoardDTO,
  boardId: number
) => {
  const existingBoard = await getBoardByIdRepository(boardId);

  if (!existingBoard) {
    throw new BadRequest('수정할 게시글을 찾을 수 없습니다.');
  }

  if (existingBoard.user_id !== userId) {
    throw new BadRequest('수정할 권한이 없습니다.');
  }

  existingBoard.title = dto.title;
  existingBoard.content = dto.content;
  existingBoard.hashtag = dto.hashtag || [];

  try {
    await updateBoardRepository(existingBoard);
    return { message: '게시글이 수정되었습니다.' };
  } catch (err) {
    throw new Error('게시글 수정 중 오류가 발생했습니다.');
  }
};

/** 게시글 삭제 서비스 */
export const deleteBoard = async (userId: number, dto: BoardIdDTO) => {
  const board = await getBoardByIdRepository(dto.board_id);

  if (!board) {
    throw new BadRequest('삭제할 게시글을 찾을 수 없습니다.');
  }

  if (board.user_id !== userId) {
    throw new BadRequest('삭제할 권한이 없습니다.');
  }

  try {
    await deleteBoardRepository(userId, dto.board_id);
    return { message: '게시글이 삭제되었습니다.' };
  } catch (err) {
    throw new Error(`게시글 삭제 중 오류가 발생했습니다.`);
  }
};

/** 게시글 조회 및 조회수 증가 서비스 */
export const getBoardAndIncrementViews = async (
  param: BoardIdDTO
): Promise<IBoard> => {
  const board = await getAndIncrementViewsRepository(param.board_id);

  if (!board) {
    throw new BadRequest('해당 게시글을 찾을 수 없습니다.');
  }

  return {
    ...board,
    updatedAt: formatDateToMinute(new Date(board.updatedAt))
  };
};
