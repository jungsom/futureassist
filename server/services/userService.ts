import { Iuser } from '../models/userModel';
import { User } from '../entities/User';
import {
  createdUser,
  selectedByEmail,
  selectedById,
  deleteUser,
  selectedByDeletedAt
} from '../repositories/userRepo';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import axios from 'axios';

import { Response } from 'express';
import { Unauthorized, BadRequest } from '../middlewares/error';
import { error } from 'console';

dotenv.config();

/** 회원가입 정보 생성 */
export const generateUserInfo = async (data: Iuser) => {
  try {
    const hashedPassword = await generatePassword(data.password);

    const user = new User();
    user.email = data.email;
    user.name = data.name;
    user.password = hashedPassword;
    user.birth_year = data.birth_year;

    return user;
  } catch (err) {
    throw err;
  }
};

/** 비밀번호 생성 */
export const generatePassword = async (password: string) => {
  const hashedPassword = await bcrypt.hash(password, 10);
  return hashedPassword;
};

/** 액세스 토큰 생성 (7일) */
export const generateAccessToken = async (data: Iuser) => {
  try {
    const privateKey = process.env.PRIVATE_KEY?.replace(/\\n/g, '\n') as string;
    const accessToken = jwt.sign(
      {
        type: 'JWT',
        user_id: data.user_id,
        email: data.email
      },
      privateKey,
      {
        algorithm: 'RS256',
        expiresIn: '7d'
      }
    );

    return accessToken;
  } catch (err) {
    throw err;
  }
};

/** 쿠키 생성 (7일) */
export const setCookie = (
  res: Response,
  name: string,
  value: string,
  maxAge: number = 7 * 24 * 60 * 60 * 1000
) => {
  res.cookie(name, value, {
    maxAge,
    secure: process.env.NODE_ENV === 'production',
    httpOnly: true
  });
};

/** 회원 이메일 중복 체크 */
export const checkEmail = async (data: Iuser) => {
  try {
    const user = await selectedByEmail(data.email);
    if (user) {
      throw error;
    }
  } catch (err) {
    throw new BadRequest('이미 가입되어 있는 회원입니다.');
  }
};

/** 로그인 체크 */
export const checkEmailwithPw = async (data: Iuser) => {
  try {
    const user = await selectedByEmail(data.email);
    const correctPassword = await bcrypt.compare(data.password, user.password);
    if (correctPassword && user) {
      return user;
    } else {
      throw error;
    }
  } catch (err) {
    throw new BadRequest('이메일 혹은 비밀번호를 다시 확인해주세요.');
  }
};

/** 기존 회원 정보 생성 */
export const changeUserInfo = async (userId: number, data: Iuser) => {
  try {
    const hashedPassword = await generatePassword(data.password);

    const user = new User();
    user.user_id = userId;
    user.name = data.name;
    user.password = hashedPassword;
    user.birth_year = data.birth_year;

    return user;
  } catch (err) {
    throw err;
  }
};

/** 탈퇴 회원 체크 */
export const checkWithDrawed = async (data: Iuser) => {
  try {
    const user = await selectedByDeletedAt(data.email);

    if (user) {
      throw error;
    }
  } catch (err) {
    throw new BadRequest('이미 탈퇴한 회원입니다.');
  }
};

/** 카카오 회원 등록 */
export const generateKakao = async (kakaoData: any) => {
  try {
    const user = new User();
    user.email = kakaoData.data.kakao_account.email;
    user.name = kakaoData.data.properties.nickname;

    const result = await createdUser(user);
    return result;
  } catch (err) {
    throw err;
  }
};

/** 카카오 인가코드를 토큰으로 변환 */
export const CodeToKakao = async (code: any) => {
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
    return data;
  } catch (err) {
    throw err;
  }
};

/** 카카오 토큰을 jwt로 재발급 */
export const kakaoToJwt = async (res: Response, data: any) => {
  try {
    const token = data.data.access_token;
    const kakao = await axios(`https://kapi.kakao.com/v2/user/me`, {
      method: 'GET',
      headers: {
        'Content-type': 'application/x-www-form-urlencoded;charset=utf-8',
        Authorization: `Bearer ${token}`
      }
    });

    const kakaoUser = await selectedByEmail(kakao.data.kakao_account.email);

    if (kakaoUser) {
      const jwtToken = await generateAccessToken(kakaoUser);
      return jwtToken;
    } else {
      const newUser = await generateKakao(kakao);
      const jwtToken = await generateAccessToken(newUser);
      return jwtToken;
    }
  } catch (err) {
    throw new BadRequest('카카오 로그인에 실패하였습니다.');
  }
};

export const generateProfileImage = async (userId: number, data?: string) => {
  try {
    const user = new User();
    user.user_id = userId;
    user.profile_image = data;

    await createdUser(user);
  } catch (err) {
    throw new BadRequest('이미지 업로드에 실패하였습니다.');
  }
};
