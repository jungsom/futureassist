import { Request, Response, NextFunction } from 'express';
import { CustomRequest } from '../models/jwtModel';
import { generateHealthRecord } from '../services/healthService';
import {
  createdHealthRecord,
  selectedHealthRecord
} from '../repositories/healthRepo';

/** 회원 건강정보 등록 */
export const PostHealthRecord = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const userId = (req as CustomRequest).user_id;
  const healthRecord = await generateHealthRecord(userId, req.body);
  await createdHealthRecord(healthRecord);
};

/** 회원 건강정보 수정 */

export const UpdateHealthRecord = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const userId = (req as CustomRequest).user_id;
  const user = await selectedHealthRecord(userId);
  const editableTime = user.created_at - user.updated_at;
};

/** 회원 건강정보 조회 */
export const HealthRecordByUserId = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const userId = (req as CustomRequest).user_id;
  const healthRecord = await selectedHealthRecord(userId);
  return healthRecord;
};
