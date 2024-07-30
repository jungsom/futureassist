import { Iuser, IuserLogin } from '../models/userModel';
import { User } from '../entities/User';
import {
  createdUser,
  selectedByEmail,
  selectedById,
  deleteUser
} from '../repositories/userRepo';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { Unauthorized, BadRequest } from '../middlewares/error';

/** 회원가입 정보 생성 */
export const generateUser = async (userData: Iuser) => {
  try {
    const hashedPassword = await generatePassword(userData.password);

    const user = new User();
    user.email = userData.email;
    user.name = userData.name;
    user.password = hashedPassword;
    user.birth_year = userData.birth_year;

    await createdUser(user);
    return true;
  } catch (err) {
    throw new Error('회원가입 중 오류가 발생했습니다.');
  }
};

/** 비밀번호 생성 */
export const generatePassword = async (password: string) => {
  const hashedPassword = await bcrypt.hash(password, 10);
  return hashedPassword;
};

/** 액세스 토큰 생성 (7일) */
export const generateAccessToken = async (email: string, user_id: number) => {
  try {
    const privateKey = process.env.PRIVATE_KEY?.replace(/\\n/g, '\n') as string;
    const accessToken = jwt.sign(
      {
        type: 'JWT',
        user_id,
        email
      },
      privateKey,
      {
        algorithm: 'RS256',
        expiresIn: '7d'
      }
    );

    return accessToken;
  } catch (err) {
    throw new Unauthorized('토큰 생성에 실패하였습니다.');
  }
};

/** 회원 이메일 중복 체크 */
export const checkEmail = async (email: string) => {
  try {
    const user = await selectedByEmail(email);
    if (user) {
      throw new BadRequest('이미 가입되어 있는 회원입니다.');
    }
  } catch (err) {
    throw new BadRequest('이미 가입되어 있는 회원입니다.');
  }
};

/** 로그인 체크 */
export const checkEmailwithPw = async (email: string, password: string) => {
  try {
    const user = await selectedByEmail(email);
    const correctPassword = await bcrypt.compare(password, user.password);
    if (correctPassword || user) {
      return user;
    }
  } catch (err) {
    throw new BadRequest('이메일 혹은 비밀번호를 다시 확인해주세요.');
  }
};

/** 기존 회원 정보 생성 */
export const changeUserInfo = async (userId: number, userData: Iuser) => {
  try {
    const hashedPassword = await generatePassword(userData.password);

    const user = new User();
    user.user_id = userId;
    user.email = userData.email;
    user.name = userData.name;
    user.password = hashedPassword;
    user.birth_year = userData.birth_year;

    await createdUser(user);
    return true;
  } catch (err) {
    throw err;
  }
};

// 페이지 이동할때마다 토큰 인증 => 유저가 로그인되어있는지 토큰 확인

/** 탈퇴 회원 체크 */

export const generateKakao = async (kakaoData: any) => {
  try {
    const user = new User();
    user.email = kakaoData.data.kakao_account.email;
    user.name = kakaoData.data.properties.nickname;

    console.log(user.email);
    console.log(user.name);

    const result = await createdUser(user);
    return result;
  } catch (err) {
    throw err;
  }
};
