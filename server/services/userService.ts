import { IuserRegister, IuserLogin } from '../models/userModel';
import { User } from '../entities/User';
import { createdUser, selectedUser } from '../repositories/userRepo';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { Unauthorized, ValidationError } from '../middlewares/error';

/** 회원가입 정보 생성 */
export const generateUser = async (userData: IuserRegister) => {
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
export const generateAccessToken = async (email: string) => {
  const privateKey = process.env.PRIVATE_KEY?.replace(/\\n/g, '\n') as string;
  const accessToken = jwt.sign(
    {
      type: 'JWT',
      email
    },
    privateKey,
    {
      algorithm: 'RS256',
      expiresIn: '7d'
    }
  );

  return accessToken;
};

/** 회원 이메일 중복 체크 */
export const checkEmail = async (email: string) => {
  try {
    const user = await selectedUser(email);
    if (user) {
      throw new Unauthorized('이미 가입되어 있는 회원입니다.');
    }
  } catch (err) {
    throw new Unauthorized('이미 가입되어 있는 회원입니다.');
  }
};

/** 로그인 체크 */
export const checkEmailwithPw = async (email: string, password: string) => {
  try {
    const user = await selectedUser(email);
    const correctPassword = await bcrypt.compare(password, user.password);
    if (!correctPassword) {
      throw new Unauthorized('이메일 혹은 비밀번호를 다시 확인해주세요.');
    }
  } catch (err) {
    throw new Unauthorized('이메일 혹은 비밀번호를 다시 확인해주세요.');
  }
};
