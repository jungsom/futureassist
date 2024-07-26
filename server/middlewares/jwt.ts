import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import { CustomRequest } from '../models/jwtModel';

dotenv.config();

export const verifyAccessToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.cookies.token;
    const publicKey = process.env.PUBLIC_KEY?.replace(/\\n/g, '\n') as string;
    const decoded = jwt.verify(token, publicKey);
    console.log(token);
    console.log(publicKey);
    console.log(decoded);
    (req as CustomRequest).user = decoded;

    next();
  } catch (err) {
    return res.status(401).json('인증에 실패했습니다.');
  }
};
