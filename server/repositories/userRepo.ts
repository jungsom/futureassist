import { datasource } from '../config/db';
import { User } from '../entities/User';

export const createdUser = async (user: User) => {
  try {
    const userRepository = datasource.getRepository(User);
    return await userRepository.save(user);
  } catch (err) {
    throw new Error('데이터 저장 중 오류가 발생했습니다.');
  }
};

export const selectedUser = async (email: string) => {
  try {
    const result = await datasource.query(
      'SELECT email, password FROM "user" WHERE email = $1',
      [email]
    );
    return result[0];
  } catch (err) {
    throw new Error('데이터 조회 중 오류가 발생했습니다.');
  }
};
