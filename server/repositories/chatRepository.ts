import { datasource } from '../config/db'; // 데이터베이스 설정 파일을 임포트
import { CreateChatDTO } from '../dtos/chatDto'; // DTO 파일을 임포트

/** 채팅 데이터 저장 리포지토리 */
export const saveChatRepository = async (chatData: CreateChatDTO): Promise<void> => {
  const { disease, department, user_id } = chatData;
  await datasource.query(
    `INSERT INTO chat (disease, department, user_id, created_at, updated_at) VALUES ($1, $2, $3, NOW(), NOW())`,
    [disease, department, user_id]
  );
};