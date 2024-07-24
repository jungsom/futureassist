import 'reflect-metadata';
import express, { Request, Response, NextFunction } from 'express';
import dotenv from 'dotenv';
import datasource from './repositories/db';
import userRouter from './routes/user';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// 미들웨어 설정
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 라우트 경로 설정
app.use('/api/user', userRouter);

// 예제 쿼리 실행 (추후에 삭제)
/* 테스트용 user 샘플 데이터 
[{"user_id":1,"name":"정유경","password":"password123","email":"123@example.com","birth_year":2001,"createdAt":"2024-07-23T16:58:21.939Z","updatedAt":"2024-07-23T16:58:21.939Z","deletedAt":null},
 {"user_id":2,"name":"테스트","password":"password456","email":"456@example.com","birth_year":2000,"createdAt":"2024-07-23T16:58:21.939Z","updatedAt":"2024-07-23T16:58:21.939Z","deletedAt":null},
 {"user_id":3,"name":"엘리스","password":"password789","email":"789@example.com","birth_year":1999,"createdAt":"2024-07-23T16:58:21.939Z","updatedAt":"2024-07-23T16:58:21.939Z","deletedAt":null}]
*/
app.get('/', (req: Request, res: Response) => {
  res.send('Hello, World!');
});

app.get(
  '/api/user',
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await datasource.query('SELECT * FROM "user"'); // 테이블 이름에 큰따옴표 사용
      res.json(result);
    } catch (err) {
      next(err);
    }
  }
);

// 에러 처리 미들웨어
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error('에러 발생', err.stack);
  res.status(500).send('에러 발생');
});

// 서버 시작
app.listen(port, () => {
  console.log(`서버가 ${port}번 포트에서 실행 중입니다.`);
});
