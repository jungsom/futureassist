import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import { CustomRequest, JwtPayload } from '../models/jwtModel';
import { Unauthorized } from '../middlewares/error';

dotenv.config();

export const verifyAccessToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.cookies.token;
    const publicKey = process.env.PUBLIC_KEY?.replace(/\\n/g, '\n') as string;
    const decoded = jwt.verify(token, publicKey) as JwtPayload;

    (req as CustomRequest).user_id = decoded.user_id;
    res.status(200).json('토큰 인증에 성공하였습니다.');
    next();
  } catch (err) {
    next(err);
  }
};
