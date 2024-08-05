import { plainToClass } from 'class-transformer';
import { healthRecordDto } from '../dtos/healthDto';
import { HealthRecords } from '../entities/HealthRecord';
import { User } from '../entities/User';
import { BadRequest } from '../middlewares/error';
import { Ihealth } from '../models/healthModel';
import { format, parseISO, isBefore } from 'date-fns';

import {
  createHealthRecord,
  selectByHealthId,
  selectHealthRecord
} from '../repositories/healthRepo';
import { error } from 'console';
import { notEqual } from 'assert';

/** 새로운 건강기록 정보 생성 (1일 1제한) */
export const generateHealthRecord = async (
  userId: number,
  healthRecord: healthRecordDto
) => {
  try {
    await checkHealthRecordTime(userId);
    const record = healthRecord.toEntity(userId);

    return await createHealthRecord(record);
  } catch (err) {
    throw err;
  }
};

/** 기존 건강기록 정보 수정 */
export const changeHealthRecord = async (
  userId: number,
  healthId: number,
  healthRecord: healthRecordDto
) => {
  try {
    const health = await selectByHealthId(healthId);
    if (health) {
      Object.assign(health, healthRecord.toEntity(userId));
      return await createHealthRecord(health);
    } else {
      throw error;
    }
  } catch (err) {
    throw new BadRequest('건강정보 수정에 실패하였습니다.');
  }
};

/** 건강정보 시간 제한 체크 */
export const checkHealthRecordTime = async (
  userId: number
): Promise<boolean> => {
  try {
    const health = await selectHealthRecord(userId);

    if (!health[0]) {
      return true;
    }

    const nowTime = format(new Date(), 'yyyy-MM-dd');
    const lastTime = health[0].created_at;

    if (isBefore(lastTime, nowTime)) {
      return true; // 하루가 지났으므로 새로운 기록 생성 가능
    } else {
      throw error;
    }
  } catch (err) {
    throw new BadRequest('건강기록은 하루에 한 번만 작성 가능합니다.');
  }
};
