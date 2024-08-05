import dotenv from 'dotenv';
import 'reflect-metadata';
import cookieParser from 'cookie-parser';
import path from 'path';

import express from 'express';
import cors from 'cors';
import userRouter from './routes/user';
import hospitalRouter from './routes/hospital';
import chatRouter from './routes/chat';
import boardRouter from './routes/board';
import commentRouter from './routes/comment';
import healthRouter from './routes/health';
import { errorMiddleware } from './middlewares/error';
import { verifyAccessToken } from './middlewares/jwt';

dotenv.config();

const app = express();
const port = process.env.PORT || 4000;

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// 미들웨어 설정
app.use(
  cors({
    origin: 'http://localhost:3000/',
    credentials: true
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// 라우트 경로 설정
app.use('/auth', verifyAccessToken, (req, res, next) => {
  res.status(200).json('토큰 인증에 성공하였습니다.');
});
app.use('/api/user', userRouter);
app.use('/api/hospital', hospitalRouter);
app.use('/api/chat', chatRouter);
app.use('/api/board', boardRouter);
app.use('/api/comment', commentRouter);
app.use('/api/health', healthRouter);

// 에러 처리 미들웨어
app.use(errorMiddleware);

// 서버 시작
app.listen(port, () => {
  console.log(`서버가 ${port}번 포트에서 실행 중입니다.`);
});
