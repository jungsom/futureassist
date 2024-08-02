import { Request, Response, NextFunction } from 'express';
import {
  createBoard,
  updateBoard,
  deleteBoard,
  getBoardAndIncrementViews
} from '../services/boardService';
import { BoardDTO, BoardIdDTO } from '../dtos/boardDto';
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
    const param = plainToClass(BoardIdDTO, req.query);
    const result = await updateBoard(userId, body, param.board_id);
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
    const param = plainToClass(BoardIdDTO, req.query);
    const result = await deleteBoard(userId, param);
    return res.status(200).json(result);
  } catch (err) {
    next(err);
  }
}

/** 게시글 조회 및 조회수 증가 컨트롤러 */
export async function getBoardRecord(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const param = plainToClass(BoardIdDTO, req.query);
    const result = await getBoardAndIncrementViews(param);
    return res.status(200).json(result);
  } catch (err) {
    next(err);
  }
}
