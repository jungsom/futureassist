import { Request, Response, NextFunction } from 'express';

/** 회원 건강정보 등록 */
export const PostHealthRecord = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // const healthRecord = generateHealthRecord();
  // await createdHealthRecord();
};

/** 회원 건강정보 수정 */
export const UpdateHealthRecord = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {};

/** 회원 건강정보 조회 */
export const HealthRecordByUserId = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {};
