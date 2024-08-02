import { datasource } from '../config/db';
import { Board } from '../entities/Board';

/** 게시글 저장 리포지토리 */
export const saveBoardRepository = async (board: Board) => {
  const boardRepo = datasource.getRepository(Board);
  return await boardRepo.save(board);
};

/** 게시글 수정 리포지토리 */
export const updateBoardRepository = async (board: Board) => {
  const boardRepo = datasource.getRepository(Board);
  return await boardRepo.save(board);
};

/** 게시글 삭제 리포지토리 */
export const deleteBoardRepository = async (
  userId: number,
  boardId: number
): Promise<void> => {
  const boardRepo = datasource.getRepository(Board);
  await boardRepo.softDelete({
    user_id: userId,
    board_id: boardId
  });
};

/** 게시글 조회 리포지토리 */
export const getBoardByIdRepository = async (
  boardId: number
): Promise<Board | null> => {
  const query = `
    SELECT board_id, user_id, title, content, hashtag, views, likes, "updatedAt"
    FROM board
    WHERE board_id = $1 AND "deletedAt" IS NULL
  `;
  const result = await datasource.query(query, [boardId]);
  return result[0] || null;
};

/** 게시글 조회 및 조회수 증가 리포지토리 */
export const getAndIncrementViewsRepository = async (
  boardId: number
): Promise<Board | null> => {
  const boardRepo = datasource.getRepository(Board);

  // 조회수 증가
  await boardRepo.query(
    `UPDATE board
     SET views = views + 1
     WHERE board_id = $1 AND "deletedAt" IS NULL`,
    [boardId]
  );

  // 게시글 조회
  const board = await boardRepo.query(
    `SELECT board_id, user_id, title, content, hashtag, views, likes, "updatedAt"
     FROM board
     WHERE board_id = $1 AND "deletedAt" IS NULL`,
    [boardId]
  );

  return board[0] || null;
};
