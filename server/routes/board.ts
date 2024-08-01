import { Router } from 'express';
import {
  createBoardRecord,
  updateBoardRecord,
  deleteBoardRecord
} from '../controllers/boardController';
import { verifyAccessToken } from '../middlewares/jwt';
import { validationMiddleware } from '../middlewares/validation';
import { BoardDTO, BoardIdDTO } from '../dtos/boardDto';

const boardRouter = Router();

boardRouter.post(
  '/',
  verifyAccessToken,
  validationMiddleware(BoardDTO),
  createBoardRecord
);
boardRouter.put(
  '/',
  verifyAccessToken,
  validationMiddleware(BoardDTO),
  validationMiddleware(BoardIdDTO, 'query'),
  updateBoardRecord
);
boardRouter.delete(
  '/',
  verifyAccessToken,
  validationMiddleware(BoardIdDTO, 'query'),
  deleteBoardRecord
);

export default boardRouter;
