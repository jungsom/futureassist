import express from 'express';
import {
  register,
  login,
  logout,
  updateUser,
  withDraw
} from '../controllers/userController';
import { verifyAccessToken } from '../middlewares/jwt';

const userRouter = express.Router();

// userRouter.get('/google', verifyGoogleToken);
userRouter.post('/register', register);
userRouter.post('/login', login);
userRouter.get('/logout', verifyAccessToken, logout);
userRouter.put('/info', verifyAccessToken, updateUser);
userRouter.delete('/', verifyAccessToken, withDraw);

export default userRouter;
