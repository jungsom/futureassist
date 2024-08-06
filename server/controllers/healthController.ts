import { Request, Response, NextFunction } from 'express';
import { CustomRequest } from '../models/jwtModel';
import {
  changeHealthRecord,
  generateHealthRecord
} from '../services/healthService';
import { plainToClass } from 'class-transformer';
import { healthRecordDto } from '../dtos/healthDto';
import { selectHealthRecord } from '../repositories/healthRepo';

/** 회원 건강정보 등록 */
export const PostHealthRecord = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = (req as CustomRequest).user_id;
    const healthRecord = plainToClass(healthRecordDto, req.body);

    await generateHealthRecord(userId, healthRecord);
    return res.status(200).json({ message: '건강기록이 생성되었습니다.' });
  } catch (err) {
    next(err);
  }
};

/** 회원 건강정보 수정 */
export const UpdateHealthRecord = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = (req as CustomRequest).user_id;
    const healthId = parseInt(req.query.health_id as string, 10);
    const healthRecord = plainToClass(healthRecordDto, req.body);

    await changeHealthRecord(userId, healthId, healthRecord);
    return res.status(200).json({ message: '건강기록이 변경되었습니다.' });
  } catch (err) {
    next(err);
  }
};

/** 회원 건강정보 조회 */
export const HealthRecordByUserId = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const userId = (req as CustomRequest).user_id;
  const { from, to } = req.query;

  const fromDate = from ? new Date(from as string) : undefined;
  const toDate = to ? new Date(to as string) : undefined;

  const healthRecord = await selectHealthRecord(userId, fromDate, toDate);

  return res.status(200).json({ data: healthRecord });
};
