import { Comment } from '../entities/comment';
import { User } from '../entities/User';
import { commentDTO } from '../dtos/commentDto';
import {
  createComment,
  selectByBoardId,
  selectByCommendId,
  softDeleteComment,
  createCommentLike,
  selectCommentLike,
  increaseCommentLikesCount,
  hardDeleteCommentLike,
  decreaseCommentLikesCount
} from '../repositories/commentRepo';
import { error } from 'console';
import { BadRequest } from '../middlewares/error';
import { Comment_like } from '../entities/comment_like';
import { CommentByBoardId } from '../controllers/commentController';

/** 새로운 댓글 정보 생성 */
export const generateComment = async (
  userId: number,
  boardId: number,
  dto: commentDTO
) => {
  try {
    const comment = new Comment();
    comment.content = dto.content;
    comment.board_id = boardId;
    comment.user_id = userId;

    await createComment(comment);
  } catch (err) {
    throw new BadRequest('댓글 생성에 실패하였습니다.');
  }
};

/** 기존 댓글 정보 생성 */
export const changeComment = async (
  userId: number,
  commentId: number,
  dto: commentDTO
) => {
  try {
    const comment = await selectByCommendId(commentId);
    if (userId == comment.user_id) {
      const comment = new Comment();
      comment.comment_id = commentId;
      comment.content = dto.content;

      return await createComment(comment);
    } else {
      throw error;
    }
  } catch (err) {
    throw new BadRequest('댓글 수정에 실패하였습니다.');
  }
};

/** 댓글 정보 삭제 */
export const deleteComment = async (userId: number, commentId: number) => {
  try {
    const comment = await selectByCommendId(commentId);

    if (userId == comment.user_id) {
      const comment = new Comment();
      comment.comment_id = commentId;

      return await softDeleteComment(comment);
    } else {
      throw error;
    }
  } catch (err) {
    throw new BadRequest('댓글 삭제에 실패하였습니다.');
  }
};

/** 좋아요 정보 생성 */
export const generateCommentLike = async (
  userId: number,
  commentId: number
) => {
  try {
    const IsCommentLike = await selectCommentLike(userId, commentId);
    if (IsCommentLike) {
      throw error;
    } else {
      const commentLike = new Comment_like();
      commentLike.user_id = userId;
      commentLike.comment_id = commentId;

      await createCommentLike(commentLike);
      await increaseCommentLikesCount(commentId);
    }
  } catch (err) {
    throw new BadRequest('좋아요 등록을 실패하였습니다.');
  }
};

export const cancelCommentLike = async (userId: number, commentId: number) => {
  try {
    await hardDeleteCommentLike(userId, commentId);
    await decreaseCommentLikesCount(commentId);
  } catch (err) {
    throw new BadRequest('좋아요 취소를 실패하였습니다.');
  }
};
