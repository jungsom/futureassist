import { datasource } from '../config/db';
import { Board } from '../entities/Board';
import { User } from '../entities/User';
import { BoardLike } from '../entities/Board_like';

/** 게시글 저장 리포지토리 */
export const saveBoardRepository = async (board: Board): Promise<Board> => {
  const userRepo = datasource.getRepository(User);
  const user = await userRepo.findOne({ where: { user_id: board.user_id } });

  if (!user) {
    throw new Error('사용자를 찾을 수 없습니다.');
  }

  board.user_name = user.name;

  const boardRepo = datasource.getRepository(Board);
  return await boardRepo.save(board);
};

/** 게시글 존재 여부 확인 리포지토리 */
export const checkBoardExistsRepository = async (
  boardId: number,
  userId: number
): Promise<Board | null> => {
  const query = `
    SELECT *
    FROM board
    WHERE board_id = $1 AND user_id = $2 AND "deletedAt" IS NULL
  `;
  const result = await datasource.query(query, [boardId, userId]);
  return result[0] || null;
};

/** 게시글 수정 리포지토리 */
export const updateBoardRepository = async (board: Board) => {
  const boardRepo = datasource.getRepository(Board);
  return await boardRepo.save(board);
};

/** 게시글 삭제 리포지토리 */
export const deleteBoardRepository = async (boardId: number) => {
  const boardRepo = datasource.getRepository(Board);
  await boardRepo.softDelete(boardId);
};

/** 전체 게시글 조회 리포지토리 */
export const getAllBoardsRepository = async (
  page: number,
  pageSize: number
): Promise<{ boards: Board[]; total: number }> => {
  const offset = (page - 1) * pageSize;
  const query = `
    SELECT board_id, user_name, title, content, hashtag, views, likes, "createdAt"
    FROM board
    WHERE "deletedAt" IS NULL
    ORDER BY "createdAt" DESC
    LIMIT $1 OFFSET $2
  `;
  const result = await datasource.query(query, [pageSize, offset]);
  const countQuery = `
    SELECT COUNT(*)
    FROM board
    WHERE "deletedAt" IS NULL
  `;
  const total = (await datasource.query(countQuery))[0].count;
  return { boards: result, total: parseInt(total, 10) };
};

/** 게시글 조회 및 조회수 증가 리포지토리 */
export const getBoardAndIncrementViewsRepository = async (
  boardId: number,
  userId: number
): Promise<{ board: Board | null; canLike: boolean }> => {
  const boardRepo = datasource.getRepository(Board);
  const likeRepo = datasource.getRepository(BoardLike);

  // 조회수 증가
  await boardRepo.increment({ board_id: boardId }, 'views', 1);

  // 게시글 조회
  const board = await boardRepo.query(
    `SELECT board_id, user_name, title, content, hashtag, views, likes, "createdAt"
     FROM board
     WHERE board_id = $1
     AND "deletedAt" IS NULL`,
    [boardId]
  );

  // 추천 상태 확인
  const like = await likeRepo.findOne({
    where: { board_id: boardId, user_id: userId }
  });

  return { board: board[0] || null, canLike: !like };
};

/** 게시글 추천 등록 리포지토리 */
export const createBoardLike = async (userId: number, boardId: number) => {
  const boardLikeRepo = datasource.getRepository(BoardLike);
  const newLike = boardLikeRepo.create({ user_id: userId, board_id: boardId });
  await boardLikeRepo.save(newLike);
};

/** 게시글 추천 조회 리포지토리 */
export const findBoardLike = async (
  userId: number,
  boardId: number
): Promise<BoardLike | null> => {
  const query = `
    SELECT * FROM board_like
    WHERE user_id = $1 AND board_id = $2
  `;
  const result = await datasource.query(query, [userId, boardId]);
  return result[0] || null;
};

/** 게시글 추천 취소 리포지토리 */
export const deleteBoardLike = async (userId: number, boardId: number) => {
  const boardLikeRepo = datasource.getRepository(BoardLike);
  const existingLike = await findBoardLike(userId, boardId);
  if (existingLike) {
    await boardLikeRepo.remove(existingLike);
  }
};

/** 게시글 추천수 증가 리포지토리 */
export const incrementBoardLikes = async (boardId: number) => {
  const boardRepo = datasource.getRepository(Board);
  await boardRepo.increment({ board_id: boardId }, 'likes', 1);
};

/** 게시글 추천수 감소 리포지토리 */
export const decrementBoardLikes = async (boardId: number) => {
  const boardRepo = datasource.getRepository(Board);
  await boardRepo.decrement({ board_id: boardId }, 'likes', 1);
};

/** 해시태그 검색 리포지토리 */
export const searchBoardsByTagRepository = async (
  tag: string,
  pageSize: number,
  offset: number
): Promise<{ result: Board[]; total: number }> => {
  const query = `
    SELECT board_id, user_name, title, content, hashtag, views, likes, "createdAt"
    FROM board
    WHERE hashtag LIKE $1 AND "deletedAt" IS NULL
    ORDER BY "createdAt" DESC
    LIMIT $2 OFFSET $3
  `;

  const countQuery = `
    SELECT COUNT(*) as total
    FROM board
    WHERE hashtag LIKE $1 AND "deletedAt" IS NULL
  `;
  const searchtag = `%${tag}%`;
  const result = await datasource.query(query, [searchtag, pageSize, offset]);
  const total = (await datasource.query(countQuery, [searchtag]))[0].total;

  return { result, total: parseInt(total, 10) };
};
