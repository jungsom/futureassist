import { Request, Response, NextFunction } from 'express';
import {
  createBoard,
  updateBoard,
  deleteBoard,
  getAllBoards,
  getBoardAndIncrementViews,
  addBoardLike,
  removeBoardLike,
  searchBoardsByTag,
  getUserBoardRecords
} from '../services/boardService';
import {
  BoardDTO,
  BoardIdDTO,
  BoardPaginationDTO,
  TagSearchDTO
} from '../dtos/boardDto';
import { plainToClass } from 'class-transformer';
import { CustomRequest } from '../models/jwtModel';

/** 게시글 생성 컨트롤러 */
export async function createBoardRecord(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const userId = (req as CustomRequest).user_id;
    const body = plainToClass(BoardDTO, req.body);
    const result = await createBoard(userId, body);
    return res.status(200).json(result);
  } catch (err) {
    next(err);
  }
}

/** 게시글 수정 컨트롤러 */
export async function updateBoardRecord(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const userId = (req as CustomRequest).user_id;
    const body = plainToClass(BoardDTO, req.body);
    const boardId = plainToClass(BoardIdDTO, req.query);
    const result = await updateBoard(userId, body, boardId);
    return res.status(200).json(result);
  } catch (err) {
    next(err);
  }
}

/** 게시글 삭제 컨트롤러 */
export async function deleteBoardRecord(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const userId = (req as CustomRequest).user_id;
    const boardId = plainToClass(BoardIdDTO, req.query);
    const result = await deleteBoard(userId, boardId);
    return res.status(200).json(result);
  } catch (err) {
    next(err);
  }
}

/** 전체 게시글 조회 컨트롤러 */
export const getAllBoardsRecord = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const pagination = plainToClass(BoardPaginationDTO, req.query);
    const result = await getAllBoards(pagination);
    res.status(200).json(result);
  } catch (err) {
    next(err);
  }
};

/** 게시글 조회 및 조회수 증가 컨트롤러 */
export async function getBoardRecord(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const userId = (req as CustomRequest).user_id;
    const boardId = plainToClass(BoardIdDTO, req.query);
    const result = await getBoardAndIncrementViews(boardId, userId);
    return res.status(200).json(result);
  } catch (err) {
    next(err);
  }
}

/** 게시글 추천 등록 컨트롤러 */
export const addLike = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = (req as any).user_id;
    const boardId = plainToClass(BoardIdDTO, req.query);
    const result = await addBoardLike(userId, boardId);
    res.status(200).json(result);
  } catch (err) {
    next(err);
  }
};

/** 게시글 추천 취소 컨트롤러 */
export const removeLike = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = (req as any).user_id;
    const boardId = plainToClass(BoardIdDTO, req.query);
    const result = await removeBoardLike(userId, boardId);
    res.status(200).json(result);
  } catch (err) {
    next(err);
  }
};

/** 해시태그 검색 컨트롤러 */
export const searchBoardsByTagRecord = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const tagSearchDto = plainToClass(TagSearchDTO, req.query);
    const result = await searchBoardsByTag(tagSearchDto);
    res.status(200).json(result);
  } catch (err) {
    next(err);
  }
};

/** 사용자 게시판 기록 조회 컨트롤러 */
export async function getUserBoardRecordsController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const userId = (req as any).user_id;
    const query = plainToClass(BoardPaginationDTO, req.query);
    const result = await getUserBoardRecords(userId, query);
    return res.status(200).json(result);
  } catch (err) {
    next(err);
  }
}
