import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import { CustomRequest } from '../models/jwtModel';
import { OAuth2Client, LoginTicket } from 'google-auth-library';

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
    (req as CustomRequest).email = decoded;
    next();
  } catch (err) {
    next(new Error('토큰 인증에 실패하였습니다.'));
  }
};

// 미완료 코드
export const verifyGoogleToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const client = new OAuth2Client(
      process.env.CLIENT_ID,
      process.env.CLIENT_SECRET
    );
    const token = req.cookies.token;

    if (!token) {
      throw new Error('토큰이 없습니다.');
    }

    // 구글 액세스 토큰으로 사용자 정보 호출

    const ticket = await client.getTokenInfo(token);
    console.log(ticket);
  } catch (err) {
    next(err);
  }
};

// export const verifyGoogleToken = async (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) => {
//   try {
//     const client = new OAuth2Client(process.env.CLIENT_ID, process.env.CLIENT_SECRET);
//     const token = req.headers['authorization']?.split(' ')[1];

//     if (!token) {
//       throw new Error('토큰이 없습니다.');
//     }

//     const ticket = await client.getTokenInfo(token);
//     console.log(ticket);
//   } catch (err) {
//     next(err);
//   }
// };
