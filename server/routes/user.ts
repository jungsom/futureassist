import express from 'express';
import { register } from '../controllers/user.controller';

const userRouter = express.Router();

userRouter.post('/api/register', register);

export default userRouter;