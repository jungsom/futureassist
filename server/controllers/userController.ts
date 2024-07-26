import { Request, Response, NextFunction } from 'express';

import {
  generateUser,
  generateAccessToken,
  checkEmail,
  checkPassword
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
    const user: registerDTO = req.body;
    await checkEmail(user.email);
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
    const user: loginDTO = req.body;
    await checkPassword(user.email, user.password);
    const accessToken = await generateAccessToken(user.email);

    res.cookie('token', accessToken, {
      maxAge: 30 * 60 * 1000
    });

    return res.status(200).json({ message: '로그인이 완료되었습니다.' });
  } catch (err) {
    next(new Unauthorized('이메일 혹은 비밀번호를 다시 확인해주세요.'));
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
