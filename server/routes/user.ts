import { Router } from 'express';
import {
  register,
  login,
  logout,
  updateUser,
  withDraw,
  kakaoLogin
} from '../controllers/userController';
import { verifyAccessToken } from '../middlewares/jwt';
import { validationMiddleware } from '../middlewares/validation';
import { registerDTO, loginDTO, userDto } from '../dtos/userDto';

const userRouter = Router();

userRouter.post('/register', validationMiddleware(registerDTO), register);
userRouter.post('/login', validationMiddleware(loginDTO), login);
userRouter.get('/kakao', kakaoLogin);
userRouter.get('/logout', verifyAccessToken, logout);
userRouter.put(
  '/info',
  validationMiddleware(userDto),
  verifyAccessToken,
  updateUser
);
userRouter.delete('/', verifyAccessToken, withDraw);

export default userRouter;
