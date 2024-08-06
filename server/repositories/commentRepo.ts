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

/** 게시글에 대한 전체 comments 검색 */
export const selectByBoardId = async (userId: number, boardId: number) => {
  try {
    const result = await datasource.query(
      `SELECT a.comment_id, c.name as user_name, a.content, 
      TO_CHAR(a.created_at, 'YYYY-MM-DD HH24:MI') as created_at,
      TO_CHAR(a.updated_at, 'YYYY-MM-DD HH24:MI') as updated_at,
      NOT EXISTS (
      SELECT like_id
      FROM "comment_like" b
      WHERE a.comment_id = b.comment_id
      AND b.user_id = $1
      ) as canLike
      FROM "comment" a
      LEFT JOIN "user" c ON a.user_id = c.user_id
      WHERE a.board_id = $2 AND a.deleted_at is NULL
      ORDER BY a.created_at ASC`,
      [userId, boardId]
    );

    return result;
  } catch (err) {
    throw err;
  }
};

/** 특정 comment 검색 */
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
export const hardDeleteCommentLike = async (
  userId: number,
  commentId: number
) => {
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
export const increaseCommentLikesCount = async (commentId: number) => {
  try {
    const commentRepository = datasource.getRepository(Comment);
    return await commentRepository.increment(
      { comment_id: commentId },
      'likes',
      1
    );
  } catch (err) {
    throw err;
  }
};

export const decreaseCommentLikesCount = async (commentId: number) => {
  try {
    const commentRepository = datasource.getRepository(Comment);
    return await commentRepository.decrement(
      { comment_id: commentId },
      'likes',
      1
    );
  } catch (err) {
    throw err;
  }
};
