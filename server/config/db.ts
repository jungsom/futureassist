import dotenv from 'dotenv';
import { DataSource } from 'typeorm';
import { User } from '../entities/User';

dotenv.config();

const isLocal = process.env.USE_LOCAL_DB === 'true';

export const datasource = new DataSource({
  type: 'postgres',
  host: isLocal ? process.env.LOCAL_DB_HOST : process.env.TEAM_DB_HOST,
  port: parseInt(
    isLocal
      ? process.env.LOCAL_DB_PORT || '5432'
      : process.env.TEAM_DB_PORT || '5432',
    10
  ),
  username: isLocal ? process.env.LOCAL_DB_USER : process.env.TEAM_DB_USER,
  password: isLocal
    ? process.env.LOCAL_DB_PASSWORD
    : process.env.TEAM_DB_PASSWORD,
  database: isLocal ? process.env.LOCAL_DB_NAME : process.env.TEAM_DB_NAME,
  synchronize: true, // 개발 중에만 사용, 실제 환경에서는 false로 설정 , 엔티티와 스키마 자동 동기화 여부
  logging: true, // 개발 중에만 사용, 실제 환경에서는 false로 설정, 쿼리 관련 로그 출력 여부
  entities: [User] // 엔티티 클래스 지정
});

// DB 연결
datasource
  .initialize()
  .then(() => console.log('DB에 연결되었습니다.'))
  .catch((err: Error) => console.error('DB 연결 실패', err.stack));

export default datasource;
