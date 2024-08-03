import { datasource } from '../config/db';
import { Comment } from '../entities/comment';

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
export const selectByBoardId = async (userId: number, boardId: number) => {
  try {
    const result = await datasource.query(
      'SELECT "comment_id" FROM "comment" WHERE user_id = $1 AND board_id = $2',
      [userId, boardId]
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
