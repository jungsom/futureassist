import express from 'express';
import { register, login, logout } from '../controllers/userController';
//import { verifyGoogleToken, verifyAccessToken } from '../middlewares/jwt';

const userRouter = express.Router();

userRouter.post('/register', register);
userRouter.post('/login', login);
// userRouter.get('/logout', verifyAccessToken, logout);
// userRouter.get('/google', verifyGoogleToken);

export default userRouter;
