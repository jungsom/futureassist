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

export const selectedByEmail = async (email: string) => {
  try {
    const result = await datasource.query(
      'SELECT user_id, email, password, birth_year, name FROM "user" WHERE email = $1',
      [email]
    );
    return result[0];
  } catch (err) {
    throw new Error('데이터 조회 중 오류가 발생했습니다.');
  }
};

export const selectedById = async (id: number) => {
  try {
    const result = await datasource.query(
      'SELECT user_id, email, password, birth_year, name FROM "user" WHERE user_id = $1',
      [id]
    );
    return result[0];
  } catch (err) {
    throw new Error('데이터 조회 중 오류가 발생했습니다.');
  }
};

export const deleteUser = async (user: User) => {
  const userRepository = datasource.getRepository(User);
  return await userRepository.softRemove(user);
};
