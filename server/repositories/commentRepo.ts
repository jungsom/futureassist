import { datasource } from '../config/db';
import { Comment } from '../entities/comment';
import { Comment_like } from '../entities/comment_like';

/** comment 저장 */
export const createComment = async (comment: Comment) => {
  try {
    const userRepository = datasource.getRepository(Comment);
    return await userRepository.save(comment);
  } catch (err) {
    throw err;
  }
};

/** commentId 검색 */
export const selectByBoardId = async (boardId: number) => {
  try {
    const result = await datasource.query(
      'SELECT comment_id, user_id, content, created_at, updated_at FROM "comment" WHERE board_id = $1 AND deleted_at is NULL',
      [boardId]
    );
    return result;
  } catch (err) {
    throw err;
  }
};

/** comment 검색 */
export const selectByCommendId = async (commentId: number) => {
  try {
    const result = await datasource.query(
      'SELECT user_id, board_id FROM "comment" WHERE comment_id = $1',
      [commentId]
    );
    return result[0];
  } catch (err) {
    throw err;
  }
};

/** comment 소프트 삭제 */
export const softDeleteComment = async (comment: Comment) => {
  try {
    const commentRepository = datasource.getRepository(Comment);
    return await commentRepository.softRemove(comment);
  } catch (err) {
    throw err;
  }
};

/** commentLike 저장 */
export const createCommentLike = async (commentLike: Comment_like) => {
  try {
    const commentLikeRepository = datasource.getRepository(Comment_like);
    return await commentLikeRepository.save(commentLike);
  } catch (err) {
    throw err;
  }
};

/** commentLike 삭제 */
export const deleteCommentLike = async (userId: number, commentId: number) => {
  try {
    const commentLikeRepository = datasource.getRepository(Comment_like);
    return await commentLikeRepository.delete({
      user_id: userId,
      comment_id: commentId
    });
  } catch (err) {
    throw err;
  }
};

/** commentLike 조회 */
export const selectCommentLike = async (userId: number, commentId: number) => {
  try {
    const result = await datasource.query(
      'SELECT like_id FROM "comment_like" WHERE user_id = $1 AND comment_id = $2',
      [userId, commentId]
    );
    return result[0];
  } catch (err) {
    throw err;
  }
};

/** comment에 likes 저장 */
export const increaseCommentLikesCount = async () => {};

export const decreaseCommentLikesCount = async () => {};
