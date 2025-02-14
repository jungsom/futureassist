import {
  saveBoardRepository,
  checkBoardExistsRepository,
  updateBoardRepository,
  deleteBoardRepository,
  getAllBoardsRepository,
  getBoardAndIncrementViewsRepository,
  createBoardLike,
  findBoardLike,
  deleteBoardLike,
  incrementBoardLikes,
  decrementBoardLikes,
  searchBoardsByTagRepository,
  getUserBoardRecordsRepository
} from '../repositories/boardRepository';
import {
  BoardDTO,
  BoardIdDTO,
  BoardPaginationDTO,
  TagSearchDTO
} from '../dtos/boardDto';
import { Board } from '../entities/Board';
import { BadRequest, NotFoundError } from '../middlewares/error';
import { IBoard } from '../models/boardModel';

/** 게시글 생성 서비스 */
export const createBoard = async (userId: number, dto: BoardDTO) => {
  const board = new Board();
  board.user_id = userId;
  board.title = dto.title;
  board.content = dto.content;
  board.hashtag = dto.hashtag || [];

  await saveBoardRepository(board);
  return { message: '게시글이 생성되었습니다.' };
};

/** 게시글 수정 서비스 */
export const updateBoard = async (
  userId: number,
  dto: BoardDTO,
  idDto: BoardIdDTO
) => {
  const board = await checkBoardExistsRepository(idDto.board_id, userId);

  if (!board) {
    throw new NotFoundError('수정할 게시글을 찾을 수 없거나 권한이 없습니다.');
  }

  board.title = dto.title;
  board.content = dto.content;
  board.hashtag = dto.hashtag || [];

  await updateBoardRepository(board);
  return { message: '게시글이 수정되었습니다.' };
};

/** 게시글 삭제 서비스 */
export const deleteBoard = async (userId: number, idDto: BoardIdDTO) => {
  const board = await checkBoardExistsRepository(idDto.board_id, userId);

  if (!board) {
    throw new NotFoundError('삭제할 게시글을 찾을 수 없거나 권한이 없습니다.');
  }

  await deleteBoardRepository(idDto.board_id);
  return { message: '게시글이 삭제되었습니다.' };
};

/** 전체 게시글 조회 서비스 */
export const getAllBoards = async (
  pagination: BoardPaginationDTO
): Promise<{
  data: IBoard[];
  total: number;
  currentPage: number;
  totalPages: number;
}> => {
  const { page = 1, pageSize = 10 } = pagination;
  const { boards, total } = await getAllBoardsRepository(page, pageSize);

  const totalPages = Math.ceil(total / pageSize);
  return { data: boards, total, currentPage: page, totalPages };
};

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
    throw new NotFoundError('게시글을 찾을 수 없습니다.');
  }

  return { ...board, canLike };
};

/** 게시글 추천 등록 서비스 */
export const addBoardLike = async (userId: number, idDto: BoardIdDTO) => {
  const existingLike = await findBoardLike(userId, idDto.board_id);
  if (existingLike) {
    throw new BadRequest('이미 추천 등록을 하셨습니다.');
  }

  await createBoardLike(userId, idDto.board_id);
  await incrementBoardLikes(idDto.board_id);

  return { message: '게시글 추천을 등록했습니다.' };
};

/** 게시글 추천 취소 서비스 */
export const removeBoardLike = async (userId: number, idDto: BoardIdDTO) => {
  const existingLike = await findBoardLike(userId, idDto.board_id);
  if (!existingLike) {
    throw new BadRequest('추천을 등록하지 않았습니다.');
  }

  await deleteBoardLike(userId, idDto.board_id);
  await decrementBoardLikes(idDto.board_id);

  return { message: '게시글 추천을 취소했습니다.' };
};

/** 해시태그 검색 서비스 */
export const searchBoardsByTag = async (
  dto: TagSearchDTO
): Promise<{ data: IBoard[]; total: number; page: number }> => {
  const { tag, page = 1, pageSize = 10 } = dto;
  const offset = (page - 1) * pageSize;
  const { result, total } = await searchBoardsByTagRepository(
    tag,
    pageSize,
    offset
  );

  if (total === 0) {
    throw new NotFoundError('해당 해시태그를 가진 게시글을 찾을 수 없습니다.');
  }

  return { data: result, total, page };
};

/** 사용자 게시판 기록 조회 서비스 */
export const getUserBoardRecords = async (
  userId: number,
  pagination: BoardPaginationDTO
): Promise<{ records: any[]; total: number }> => {
  const { page = 1, pageSize = 10 } = pagination;

  const { records, total } = await getUserBoardRecordsRepository(
    userId,
    page,
    pageSize
  );

  if (records.length === 0) {
    throw new NotFoundError('게시글 기록이 없습니다.');
  }

  return { records, total };
};
