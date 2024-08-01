import { datasource } from '../config/db';
import { Board } from '../entities/Board';

/** 게시글 저장 리포지토리 */
export const saveBoardRepository = async (board: Board) => {
  const boardRepo = datasource.getRepository(Board);
  return await boardRepo.save(board);
};

/** 게시글 조회 리포지토리 */
export const getBoardByIdRepository = async (
  boardId: number
): Promise<Board | null> => {
  const boardRepo = datasource.getRepository(Board);
  return await boardRepo.findOneBy({ board_id: boardId });
};

/** 게시글 수정 리포지토리 */
export const updateBoardRepository = async (board: Board) => {
  const boardRepo = datasource.getRepository(Board);
  return await boardRepo.save(board);
};

/** 게시글 삭제 리포지토리 */
export const deleteBoardRepository = async (boardId: number) => {
  const boardRepo = datasource.getRepository(Board);
  return await boardRepo.softDelete({ board_id: boardId });
};
