import { Router } from 'express';
import {
  createBoardRecord,
  updateBoardRecord,
  deleteBoardRecord,
  getAllBoardsRecord,
  getBoardRecord,
  addLike,
  removeLike,
  searchBoardsByTagRecord
} from '../controllers/boardController';
import { verifyAccessToken } from '../middlewares/jwt';
import { validationMiddleware } from '../middlewares/validation';
import {
  BoardDTO,
  BoardIdDTO,
  BoardPaginationDTO,
  TagSearchDTO
} from '../dtos/boardDto';

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
  '/all',
  validationMiddleware(BoardPaginationDTO, 'query'),
  getAllBoardsRecord
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
boardRouter.get(
  '/search',
  validationMiddleware(TagSearchDTO, 'query'),
  searchBoardsByTagRecord
);

export default boardRouter;
