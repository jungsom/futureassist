import dotenv from 'dotenv';
import { DataSource } from 'typeorm';
import { User } from '../entities/User';
import { Hospital } from '../entities/Hospital';
import { MedicalDevice } from '../entities/MedicalDevices';
import { HospitalSpeciality } from '../entities/HospitalSpecialities';
import { HealthRecords } from '../entities/HealthRecord';
import { Chat } from '../entities/Chat';
import { HospitalRecord } from '../entities/HospitalRecord';
import { Board } from '../entities/Board';
import { BoardLike } from '../entities/Board_like';
import { Comment } from '../entities/comment';
import { Comment_like } from '../entities/comment_like';

dotenv.config();

export const datasource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT || '5432', 10),
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  synchronize: true, // 개발 중에만 사용, 실제 환경에서는 false로 설정
  logging: false, // 개발 중에만 사용, 실제 환경에서는 false로 설정
  ssl: process.env.SSL === 'true' ? { rejectUnauthorized: false } : false,
  entities: [
    User,
    Hospital,
    MedicalDevice,
    HospitalSpeciality,
    HealthRecords,
    HospitalRecord,
    Board,
    BoardLike,
    Comment,
<<<<<<< HEAD
    Comment_like,
    Chat
  ]
=======
    Comment_like
  ],
  extra: {
    options: '-c timezone=Asia/Seoul'
  }
>>>>>>> feature_board
});

// DB 연결
datasource
  .initialize()
  .then(async () => {
    console.log('DB에 연결되었습니다.');
    await datasource.query(`SET TIME ZONE 'Asia/Seoul';`); // 타임존 설정
  })
  .catch((err: Error) => console.error('DB 연결 실패', err.stack));

export default datasource;
