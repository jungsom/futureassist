import express from 'express';
import {
  register,
  login,
  logout,
  updateUser,
  withDraw,
  kakaoLogin
} from '../controllers/userController';
import { verifyAccessToken } from '../middlewares/jwt';

const userRouter = express.Router();

// userRouter.get('/kakao', kakaoLogin);
userRouter.post('/register', register);
userRouter.post('/login', login);
userRouter.post('/kakao', kakaoLogin);
userRouter.get('/logout', verifyAccessToken, logout);
userRouter.put('/info', verifyAccessToken, updateUser);
userRouter.delete('/', verifyAccessToken, withDraw);

export default userRouter;
