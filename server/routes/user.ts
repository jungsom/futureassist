import { Router } from 'express';
import {
  register,
  login,
  logout,
  updateUser,
  withDraw,
  kakaoLogin,
  profileImage,
  UserByUserId,
  authorizeKakao
} from '../controllers/userController';
import { verifyAccessToken } from '../middlewares/jwt';
import { validationMiddleware } from '../middlewares/validation';
import { registerDTO, loginDTO, userDto } from '../dtos/userDto';
import { upload } from '../config/multer';

const userRouter = Router();

userRouter.get('/', verifyAccessToken, UserByUserId);
userRouter.post('/register', validationMiddleware(registerDTO), register);
userRouter.post('/login', validationMiddleware(loginDTO), login);
userRouter.get('/kakao', authorizeKakao);
userRouter.get('/oauth/callback/kakao', kakaoLogin);
userRouter.get('/logout', verifyAccessToken, logout);
userRouter.post(
  '/upload',
  verifyAccessToken,
  upload.single('image'),
  profileImage
);
userRouter.put(
  '/info',
  validationMiddleware(userDto),
  verifyAccessToken,
  updateUser
);
userRouter.delete('/', verifyAccessToken, withDraw);

export default userRouter;
