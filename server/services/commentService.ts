import { Comment } from '../entities/comment';
import { User } from '../entities/User';

/** 댓글 정보 생성 */
export const generateComment = async (userId: number, content: string) => {
  try {
    const comment = new Comment();
    comment.content = content;
    comment.user_id = userId;

    return comment;
  } catch (err) {
    throw err;
  }
};
