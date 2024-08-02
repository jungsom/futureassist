import { datasource } from '../config/db';
import { HealthRecords } from '../entities/HealthRecord';
import { User } from '../entities/User';

/** 건강정보 생성 */
export const createdHealthRecord = async (record: HealthRecords) => {
  try {
    const userRepository = datasource.getRepository(HealthRecords);
    return await userRepository.save(record);
  } catch (err) {
    throw err;
  }
};

/** 건강정보 조회 */
export const selectedHealthRecord = async (userId: number) => {
  try {
    const result = await datasource.query(
      'SELECT health_id, height, weight, bloodsugar, cholesterol, bloodpressure, created_at, updated_at FROM "health_records" WHERE user_id = $1',
      [userId]
    );
    return result[0];
  } catch (err) {
    throw err;
  }
};
