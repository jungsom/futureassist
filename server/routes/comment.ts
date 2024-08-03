import { Router } from 'express';
import {
  PostComment,
  UpdateComment,
  DeleteCommentRecord,
  CommentByBoardId,
  LikeComment,
  DislikeComment
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
commentRouter.post('/like', verifyAccessToken, LikeComment);
commentRouter.delete('/like', verifyAccessToken, DislikeComment);

export default commentRouter;
