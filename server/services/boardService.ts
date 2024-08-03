import {
  saveBoardRepository,
  checkBoardExistsRepository,
  updateBoardRepository,
  deleteBoardRepository,
  getBoardAndIncrementViewsRepository,
  createBoardLike,
  deleteBoardLike,
  incrementBoardLikes,
  decrementBoardLikes
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
  idDto: BoardIdDTO
) => {
  const board = await checkBoardExistsRepository(idDto.board_id, userId);

  if (!board) {
    throw new BadRequest('수정할 게시글을 찾을 수 없거나 권한이 없습니다.');
  }

  board.title = dto.title;
  board.content = dto.content;
  board.hashtag = dto.hashtag || [];

  try {
    await updateBoardRepository(board);
    return { message: '게시글이 수정되었습니다.' };
  } catch (err) {
    throw new Error('게시글 수정 중 오류가 발생했습니다.');
  }
};

/** 게시글 삭제 서비스 */
export const deleteBoard = async (userId: number, idDto: BoardIdDTO) => {
  const board = await checkBoardExistsRepository(idDto.board_id, userId);

  if (!board) {
    throw new BadRequest('삭제할 게시글을 찾을 수 없거나 권한이 없습니다.');
  }

  try {
    await deleteBoardRepository(idDto.board_id);
    return { message: '게시글이 삭제되었습니다.' };
  } catch (err) {
    throw new Error(`게시글 삭제 중 오류가 발생했습니다.`);
  }
};

deleteBoardRepository;

/** 게시글 조회 및 조회수 증가 서비스 */
export const getBoardAndIncrementViews = async (
  idDto: BoardIdDTO,
  userId: number
): Promise<IBoard & { canLike: boolean }> => {
  const { board, canLike } = await getBoardAndIncrementViewsRepository(
    idDto.board_id,
    userId
  );

  if (!board) {
    throw new BadRequest('게시글을 찾을 수 없습니다.');
  }

  return {
    ...board,
    updatedAt: formatDateToMinute(new Date(board.updatedAt)),
    canLike
  };
};

/** 게시글 추천 등록 서비스 */
export const addBoardLike = async (userId: number, idDto: BoardIdDTO) => {
  await createBoardLike(userId, idDto.board_id);
  await incrementBoardLikes(idDto.board_id);

  return { message: '게시글 추천을 등록했습니다.' };
};

/** 게시글 추천 취소 서비스 */
export const removeBoardLike = async (userId: number, idDto: BoardIdDTO) => {
  await deleteBoardLike(userId, idDto.board_id);
  await decrementBoardLikes(idDto.board_id);

  return { message: '게시글 추천을 취소했습니다.' };
};
