import { datasource } from '../config/db';
import { HealthRecords } from '../entities/HealthRecord';

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
export const selectHealthRecord = async (
  userId: number,
  from?: Date,
  to?: Date
) => {
  try {
    let query = `
      SELECT health_id, height, weight, bloodsugar, cholesterol, bloodpressure,      
      TO_CHAR(created_at, 'YYYY-MM-DD') as created_at,
      TO_CHAR(updated_at, 'YYYY-MM-DD') as updated_at
      FROM "health_records"
      WHERE user_id = $1`;

    if (from && to) {
      query += ` AND created_at >= $2 AND created_at <= $3`;
    }

    query += ` ORDER BY created_at DESC`;

    const result =
      from && to
        ? await datasource.query(query, [userId, from, to])
        : await datasource.query(query, [userId]);

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
