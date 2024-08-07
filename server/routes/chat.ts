import { Router } from 'express';
import { getChat } from '../controllers/chatController';
import { verifyAccessToken } from '../middlewares/jwt';

const router = Router();

router.post('/', verifyAccessToken, getChat);

export default router;
