import { Router } from 'express';
import {
  PostComment,
  UpdateComment,
  DeleteCommentRecord,
  CommentByBoardId
} from '../controllers/commentController';
import { verifyAccessToken } from '../middlewares/jwt';
import { validationMiddleware } from '../middlewares/validation';
import { commentDTO } from '../dtos/commentDto';

const commentRouter = Router();

commentRouter.post(
  '/',
  verifyAccessToken,
  validationMiddleware(commentDTO),
  PostComment
);
commentRouter.put(
  '/',
  verifyAccessToken,
  validationMiddleware(commentDTO, 'query'),
  UpdateComment
);
commentRouter.delete(
  '/',
  verifyAccessToken,
  validationMiddleware(commentDTO, 'query'),
  DeleteCommentRecord
);
commentRouter.get(
  '/',
  verifyAccessToken,
  validationMiddleware(commentDTO, 'query'),
  CommentByBoardId
);

export default commentRouter;
