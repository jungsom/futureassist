import { Request, Response, NextFunction } from 'express';
import { validate } from 'class-validator';

import {
  generateUser,
  generateAccessToken,
  checkEmail,
  checkEmailwithPw,
  changeUserInfo
} from '../services/userService';
import { CustomRequest, JwtPayload } from '../models/jwtModel';
import { registerDTO, loginDTO, userDto } from '../dtos/userDto';
import {
  createdUser,
  selectedByEmail,
  selectedById,
  deleteUser
} from '../repositories/userRepo';

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

// 특정 회원 정보? or 토큰을 통한 회원 정보?
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
