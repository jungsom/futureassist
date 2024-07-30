import { Request, Response, NextFunction } from 'express';
import { validate } from 'class-validator';
import dotenv from 'dotenv';

import {
  generateUser,
  generateAccessToken,
  checkEmail,
  checkEmailwithPw,
  changeUserInfo,
  generateKakao
} from '../services/userService';
import { CustomRequest, JwtPayload } from '../models/jwtModel';
import { registerDTO, loginDTO, userDto } from '../dtos/userDto';
import {
  createdUser,
  selectedByEmail,
  selectedById,
  deleteUser
} from '../repositories/userRepo';
import axios from 'axios';

dotenv.config();

/** 회원가입 컨트롤러 */
export async function register(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const user = Object.assign(new registerDTO(), req.body);
    await checkEmail(user.email);

    const errors = await validate(user);
    console.log(errors);
    if (errors.length > 0) {
      throw new Error('유효성 검사 실패'); //메시지 보는법, 에러처리하는 법
    }

    await generateUser(user);

    return res.status(201).json({ message: '회원가입이 완료되었습니다.' });
  } catch (err) {
    next(err);
  }
}

// 추가 및 수정 예정 ) 쿠키 생성 service로
/** 로그인 컨트롤러 */
export async function login(req: Request, res: Response, next: NextFunction) {
  try {
    const data = Object.assign(new loginDTO(), req.body);
    const errors = await validate(data);
    if (errors.length > 0) {
      throw new Error('유효성 검사 실패');
    }

    const user = await checkEmailwithPw(data.email, data.password);

    const accessToken = await generateAccessToken(user.email, user.user_id);
    res.cookie('token', accessToken, {
      maxAge: 30 * 60 * 1000
    });

    return res.status(200).json({ message: '로그인이 완료되었습니다.' });
  } catch (err) {
    next(err);
  }
}

/** 로그아웃 컨트롤러 */
export async function logout(req: Request, res: Response, next: NextFunction) {
  try {
    res.clearCookie('token');

    return res.status(200).json({ message: '로그아웃이 완료되었습니다.' });
  } catch (err) {
    next(err);
  }
}

/** 회원수정 컨트롤러 */
export async function updateUser(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const userId = (req as CustomRequest).user_id;
    console.log(userId);
    const user = Object.assign(new userDto(), req.body);
    console.log(user);

    const errors = await validate(user);

    if (errors.length > 0) {
      throw new Error('유효성 검사 실패'); //메시지 보는법, 에러처리하는 법
    }

    await changeUserInfo(userId, user);

    return res.status(201).json({ message: '수정이 완료되었습니다.' });
  } catch (err) {
    next(err);
  }
}

/** 회원탈퇴 컨트롤러 */
export async function withDraw(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const userId = (req as CustomRequest).user_id;
    const user = await selectedById(userId);
    await deleteUser(user);

    return res.status(201).json({ message: '탈퇴가 완료되었습니다.' });
  } catch (err) {
    next(err);
  }
}

// 토큰 재발급 함수
// 탈퇴 후 다른곳에 재접근 x하도록

// 카카오 액세스 토큰 발급
export async function kakaoLogin(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const code = req.query.code;
  console.log(code);
  try {
    const data = await axios(
      `https://kauth.kakao.com/oauth/token?grant_type=authorization_code&client_id=${process.env.KAKAO_RESTAPI_KEY}&redirect_uri=${process.env.REDIRECT_URL}&code=${code}`,
      {
        method: 'POST',
        headers: {
          'Content-type': 'application/x-www-form-urlencoded;charset=utf-8'
        }
      }
    );
    const result = await kakaoToJwt(data);
    console.log(data.data);
    console.log(result);
    res.status(200).json('카카오 로그인이 완료되었습니다.');
  } catch (err) {
    throw err;
  }
}

export const kakaoToJwt = async (data: any) => {
  const token = data.data.access_token;
  const kakao = await axios(`https://kapi.kakao.com/v2/user/me`, {
    method: 'GET',
    headers: {
      'Content-type': 'application/x-www-form-urlencoded;charset=utf-8',
      Authorization: `Bearer ${token}`
    }
  });

  await checkEmail(kakao.data.kakao_account.email);
  const kakaoUser = await generateKakao(kakao);
  console.log(kakaoUser);

  await generateAccessToken(kakaoUser.email, kakaoUser.user_id);
};
