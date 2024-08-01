import { HealthRecords } from '../entities/HealthRecord';
import { User } from '../entities/User';
import { Ihealth } from '../models/healthModel';

/** 건강기록 정보 생성 */
export const generateHealthRecord = async (userId: User, data: Ihealth) => {
  try {
    const health = new HealthRecords();
    health.user_id = userId;
    health.height = data.height;
    health.weight = data.weight;
    health.bloodsugar = data.bloodsugar;
    health.bloodpressure = data.bloodpressure;

    return health;
  } catch (err) {
    throw err;
  }
};
