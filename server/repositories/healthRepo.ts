import { datasource } from '../config/db';
import { HealthRecords } from '../entities/HealthRecord';
import { User } from '../entities/User';

/** 건강정보 생성 */
export const createHealthRecord = async (record: HealthRecords) => {
  try {
    const userRepository = datasource.getRepository(HealthRecords);
    return await userRepository.save(record);
  } catch (err) {
    throw err;
  }
};

/** user_id로 전체 건강정보 조회 */
export const selectHealthRecord = async (userId: number) => {
  try {
    const result = await datasource.query(
      `SELECT health_id, height, weight, bloodsugar, cholesterol, bloodpressure,      
      TO_CHAR(created_at, 'YYYY-MM-DD') as created_at,
      TO_CHAR(updated_at, 'YYYY-MM-DD') as updated_at
      FROM "health_records"
      WHERE user_id = $1
      ORDER BY created_at DESC`,
      [userId]
    );
    return result;
  } catch (err) {
    throw err;
  }
};

/** health_id로 특정 건강정보 조회 */
export const selectByHealthId = async (HealthId: number) => {
  try {
    const result = await datasource.query(
      `SELECT health_id, height, weight, bloodsugar, cholesterol, bloodpressure, 
      TO_CHAR(created_at, 'YYYY-MM-DD') as created_at,
      TO_CHAR(updated_at, 'YYYY-MM-DD') as updated_at
      FROM "health_records"
      WHERE health_id = $1`,
      [HealthId]
    );
    return result[0];
  } catch (err) {
    throw err;
  }
};
