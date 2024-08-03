import { Request, Response, NextFunction } from 'express';
import { CustomRequest } from '../models/jwtModel';
import {
  generateComment,
  changeComment,
  deleteComment
} from '../services/commentService';
import { commentDTO } from '../dtos/commentDto';
import { plainToClass } from 'class-transformer';
import { BoardIdDTO } from '../dtos/boardDto';

/** 댓글 조회 컨트롤러 */
export const CommentByBoardId = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // commmentId도 보내줘야함
};

/** 댓글 작성 컨트롤러 */
export const PostComment = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const userId = (req as CustomRequest).user_id;
  const boardId = parseInt(req.query.board_id as string, 10);
  const content = plainToClass(commentDTO, req.body);

  await generateComment(userId, boardId, content);
  return res.status(200).json({ message: '댓글이 생성되었습니다.' });
};

/** 댓글 수정 컨트롤러 */
export const UpdateComment = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = (req as CustomRequest).user_id;
    const commentId = parseInt(req.query.comment_id as string, 10);
    const content = plainToClass(commentDTO, req.body);

    await changeComment(userId, commentId, content);
    return res.status(200).json({ message: '댓글이 수정되었습니다.' });
  } catch (err) {
    throw err;
  }
};

/** 댓글 삭제 컨트롤러 */
export const DeleteCommentRecord = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = (req as CustomRequest).user_id;
    const commentId = parseInt(req.query.comment_id as string, 10);

    await deleteComment(userId, commentId);
    return res.status(200).json({ message: '댓글이 삭제되었습니다.' });
  } catch (err) {
    throw err;
  }
};

/** 좋아요 컨트롤러 */
export const LikeInComment = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  //boardid와 userid가 없다면 like 추가 => 좋아요를 눌렀습니다.
  //boardid와 userid가 있다면 like 삭제 => 좋아요를 취소하였습니다.
};
