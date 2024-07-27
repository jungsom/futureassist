import { Request, Response, NextFunction } from 'express';
import { validate } from 'class-validator';

import {
  generateUser,
  generateAccessToken,
  checkEmail,
  checkEmailwithPw
} from '../services/userService';
import { CustomRequest } from '../models/jwtModel';
import { registerDTO, loginDTO } from '../dtos/userDto';
import { Unauthorized } from '../middlewares/error';

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
    const user = Object.assign(new loginDTO(), req.body);
    const errors = await validate(user);
    if (errors.length > 0) {
      throw new Error('유효성 검사 실패');
    }

    await checkEmailwithPw(user.email, user.password);

    const accessToken = await generateAccessToken(user.email);
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

// 토큰 재발급 함수
