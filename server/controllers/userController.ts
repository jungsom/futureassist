import { Request, Response, NextFunction } from 'express';
import dotenv from 'dotenv';

import {
  generateUserInfo,
  generateAccessToken,
  checkEmail,
  checkEmailwithPw,
  changeUserInfo,
  generateKakao,
  checkWithDrawed,
  setCookie,
  CodeToKakao,
  kakaoToJwt
} from '../services/userService';
import { CustomRequest } from '../models/jwtModel';
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
    const user = await generateUserInfo(req.body);
    await checkEmail(user);
    await createdUser(user);

    return res.status(201).json({ message: '회원가입이 완료되었습니다.' });
  } catch (err) {
    next(err);
  }
}

/** 로그인 컨트롤러 */
export async function login(req: Request, res: Response, next: NextFunction) {
  try {
    await checkWithDrawed(req.body);
    const user = await checkEmailwithPw(req.body);
    const accessToken = await generateAccessToken(user);
    setCookie(res, 'token', accessToken);

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
    const user = await changeUserInfo(userId, req.body);

    await createdUser(user);

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

// 카카오 액세스 토큰 발급
export async function kakaoLogin(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const code = req.query.code;
    const kakaoToken = await CodeToKakao(code);
    const jwtToken = await kakaoToJwt(kakaoToken);
    setCookie(res, 'token', jwtToken);

    res.status(200).json('카카오 로그인이 완료되었습니다.');
  } catch (err) {
    throw err;
  }
}

export async function profileImage(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const image = (req as CustomRequest).file?.path;

  // const user = new User();
  // user.user_id = userId;
  // user.profileImage = image;

  // createdUser(user);
  res.status(200).json('이미지가 변경되었습니다.');
}
