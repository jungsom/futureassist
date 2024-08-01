import { Request, Response, NextFunction } from 'express';
import {
  getSidoAddr,
  getSiguAddr,
  getDongAddr,
  getSpecialities,
  searchHospitals,
  searchHospitalsByLocation,
  getHospitalDetails,
  saveHospital,
  deleteHospital,
  getHospitalRecordsByUserId
} from '../services/hospitalService';
import {
  SidoDTO,
  SiguDTO,
  SearchHospitalDTO,
  LocationDTO,
  HospitalIdDTO
} from '../dtos/hospitalDto';
import { plainToClass } from 'class-transformer';
import { CustomRequest } from '../models/jwtModel';

/** 시도 데이터 조회 컨트롤러 */
export async function getSido(req: Request, res: Response, next: NextFunction) {
  try {
    const result = await getSidoAddr();
    return res.status(200).json(result);
  } catch (err) {
    next(err);
  }
}

/** 시구 데이터 조회 컨트롤러 */
export async function getSigu(req: Request, res: Response, next: NextFunction) {
  try {
    const locationParams = plainToClass(SidoDTO, req.query);
    const result = await getSiguAddr(locationParams.sido_addr);
    return res.status(200).json(result);
  } catch (err) {
    next(err);
  }
}

/** 동 데이터 조회 컨트롤러 */
export async function getDong(req: Request, res: Response, next: NextFunction) {
  try {
    const locationParams = plainToClass(SiguDTO, req.query);
    const result = await getDongAddr(
      locationParams.sido_addr,
      locationParams.sigu_addr
    );
    return res.status(200).json(result);
  } catch (err) {
    next(err);
  }
}

/** 진료과명 조회 컨트롤러 */
export async function getSpeciality(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const result = await getSpecialities();
    return res.status(200).json(result);
  } catch (err) {
    next(err);
  }
}

/** 지역명 선택 기반 병원 검색 컨트롤러 */
export async function searchHospital(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const searchParams = plainToClass(SearchHospitalDTO, req.query);
    const result = await searchHospitals(searchParams);
    return res.status(200).json(result);
  } catch (err) {
    next(err);
  }
}

/** 위치 기반 병원 검색 컨트롤러 */
export async function getHospitalsByLocation(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const locationParams = plainToClass(LocationDTO, req.query);
    const result = await searchHospitalsByLocation(locationParams);
    return res.status(200).json(result);
  } catch (err) {
    next(err);
  }
}

/** 특정 병원 데이터 조회 컨트롤러 */
export async function getHospitalDetail(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const searchParams = plainToClass(HospitalIdDTO, req.query);
    const result = await getHospitalDetails(searchParams);
    return res.status(200).json(result);
  } catch (err) {
    next(err);
  }
}

/** 병원 저장 컨트롤러 */
export async function saveHospitalRecord(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const userId = (req as CustomRequest).user_id;
    const body = plainToClass(HospitalIdDTO, req.body);
    const result = await saveHospital(userId, body);
    return res.status(200).json(result);
  } catch (err) {
    next(err);
  }
}

/** 병원 삭제 컨트롤러 */
export async function deleteHospitalRecord(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const userId = (req as CustomRequest).user_id;
    const body = plainToClass(HospitalIdDTO, req.body);
    const result = await deleteHospital(userId, body);
    return res.status(200).json(result);
  } catch (err) {
    next(err);
  }
}

/** 병원 기록 조회 컨트롤러 */
export async function getHospitalRecordsByUser(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const userId = (req as CustomRequest).user_id;
    const records = await getHospitalRecordsByUserId(userId);
    return res.status(200).json(records);
  } catch (err) {
    next(err);
  }
}
