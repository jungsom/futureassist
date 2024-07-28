import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import { CustomRequest, JwtPayload } from '../models/jwtModel';
import { OAuth2Client, LoginTicket } from 'google-auth-library';
import { Unauthorized } from '../middlewares/error';
import { error } from 'console';

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
    next();
  } catch (err) {
    throw err;
  }
};

// 미완료 코드
// export const verifyGoogleToken = async (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) => {
//   try {
//     const client = new OAuth2Client(
//       process.env.CLIENT_ID,
//       process.env.CLIENT_SECRET
//     );
//     const token = req.cookies.token;

//     if (!token) {
//       throw new Unauthorized('토큰 인증에 실패하였습니다.');
//     }

//     // 구글 액세스 토큰으로 사용자 정보 호출
//     const userInfoRes = await client.request({
//       url: 'https://www.googleapis.com/oauth2/v3/userinfo',
//       headers: {
//         Authorization: `Bearer ${token}`
//       }
//     });

//     const userInfo = userInfoRes.data;
//     console.log(userInfo); // 사용자 정보를 출력

//     if (userInfo.email) {
//       (req as CustomRequest).email = userInfo.email;
//     } else {
//       throw new Error('이메일을 추출할 수 없습니다.');
//     }

//     next();

//     const ticket = await client.getTokenInfo(token);
//     console.log(ticket);
//   } catch (err) {
//     next(err);
//   }
// };
// export const verifyGoogleToken = async (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) => {
//   try {
//     const client = new OAuth2Client(
//       process.env.CLIENT_ID,
//       process.env.CLIENT_SECRET
//     );
//     const token = req.headers['authorization']?.split(' ')[1];

//     console.log(token);
//     if (!token) {
//       throw new Error('토큰이 없습니다.');
//     }

//     // 액세스 토큰 정보를 검증합니다.
//     const ticket = await client.getTokenInfo(token);
//     console.log(ticket);

//     // Google 사용자 정보 API를 호출하여 사용자 정보를 가져옵니다.
//     const response = await fetch(
//       'https://www.googleapis.com/oauth2/v2/userinfo',
//       {
//         headers: {
//           Authorization: token
//         }
//       }
//     );

//     if (!response.ok) {
//       throw error;
//     }

//     const userInfo = await response.json();
//     console.log(userInfo); // 사용자 정보를 출력합니다.

//     // 필요에 따라 사용자 정보를 req 객체에 저장합니다.
//     // req.user = userInfo;

//     next();
//   } catch (err) {
//     next(err);
//   }
// };
