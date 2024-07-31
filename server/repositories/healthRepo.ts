import { datasource } from '../config/db';
import { HealthRecords } from '../entities/HealthRecord';

export const createdHealthRecord = async (record: HealthRecords) => {
  try {
    const userRepository = datasource.getRepository(HealthRecords);
    return await userRepository.save(record);
  } catch (err) {
    throw err;
  }
};
