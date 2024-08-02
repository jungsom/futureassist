import { Request, Response, NextFunction } from 'express';
import { CustomRequest } from '../models/jwtModel';
import { generateComment } from '../services/commentService';

export const CommentByUserId = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {};

export const PostComment = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const userId = (req as CustomRequest).user_id;
  const content = req.body;

  await generateComment(userId, content);
};

export const UpdateComment = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  //userid와 boardId로 commentid찾기
  //둘다 있으면 수정 가능
};

export const DeleteComment = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  //userid와 boardid로 commentid 찾기
  //둘다 있으면 삭제 가능(소프트 삭제)
};

export const LikeInComment = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  //boardid와 userid가 없다면 like 추가 => 좋아요를 눌렀습니다.
  //boardid와 userid가 있다면 like 삭제 => 좋아요를 취소하였습니다.
};
