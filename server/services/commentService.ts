import { Comment } from '../entities/comment';
import { User } from '../entities/User';
import { commentDTO } from '../dtos/commentDto';
import {
  createComment,
  selectByBoardId,
  selectByCommendId,
  softDeleteComment
} from '../repositories/commentRepo';
import { error } from 'console';
import { BadRequest } from '../middlewares/error';

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
