import { Request, Response, NextFunction } from 'express';
import {
  getSidoAddr,
  getSiguAddr,
  getDongAddr,
  searchHospitals,
  searchHospitalsByLocation,
  getHospitalDetails
} from '../services/hospitalService';
import {
  SidoDTO,
  SiguDTO,
  SearchHospitalDTO,
  LocationDTO,
  HospitalDetailDTO
} from '../dtos/hospitalDto';
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

/** 지역명 선택 기반 병원 검색 컨트롤러 */
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

/** 위치 기반 병원 검색 컨트롤러 */
export async function getHospitalsByLocation(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const locationParams = plainToClass(LocationDTO, req.query);

    // 유효성 검사
    const errors = await validate(locationParams);
    if (errors.length > 0) {
      return res.status(400).json(errors);
    }

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
    const searchParams = plainToClass(HospitalDetailDTO, req.query);

    // 유효성 검사
    const errors = await validate(searchParams);
    if (errors.length > 0) {
      return res.status(400).json(errors);
    }

    const result = await getHospitalDetails(searchParams);
    return res.status(200).json(result);
  } catch (err) {
    next(err);
  }
}
