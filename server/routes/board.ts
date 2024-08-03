import { Router } from 'express';
import {
  createBoardRecord,
  updateBoardRecord,
  deleteBoardRecord,
  getBoardRecord,
  addLike,
  removeLike
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
boardRouter.get(
  '/',
  verifyAccessToken,
  validationMiddleware(BoardIdDTO, 'query'),
  getBoardRecord
);
boardRouter.post(
  '/like',
  verifyAccessToken,
  validationMiddleware(BoardIdDTO, 'query'),
  addLike
);
boardRouter.delete(
  '/like',
  verifyAccessToken,
  validationMiddleware(BoardIdDTO, 'query'),
  removeLike
);

export default boardRouter;
