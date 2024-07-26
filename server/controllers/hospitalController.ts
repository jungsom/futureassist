import { Request, Response, NextFunction } from 'express';
import {
  getSidoAddr,
  getSiguAddr,
  getDongAddr,
  searchHospitals,
} from '../services/hospitalService';
import { SidoDTO, SiguDTO, SearchHospitalDTO } from '../dtos/hospitalDto';
import { validate } from 'class-validator';
import { plainToClass } from 'class-transformer';

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

    // 유효성 검사
    const errors = await validate(locationParams);
    if (errors.length > 0) {
      return res.status(400).json(errors);
    }

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

    // 유효성 검사
    const errors = await validate(locationParams);
    if (errors.length > 0) {
      return res.status(400).json(errors);
    }

    const result = await getDongAddr(
      locationParams.sido_addr,
      locationParams.sigu_addr
    );
    return res.status(200).json(result);
  } catch (err) {
    next(err);
  }
}

/** 병원 검색 컨트롤러 */
export async function searchHospital(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const searchParams = plainToClass(SearchHospitalDTO, req.query);

    // 유효성 검사
    const errors = await validate(searchParams);
    if (errors.length > 0) {
      return res.status(400).json(errors);
    }

    const result = await searchHospitals(searchParams);
    return res.status(200).json(result);
  } catch (err) {
    next(err);
  }
}
