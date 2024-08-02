import { Request, Response, NextFunction } from 'express';
import { User } from '../entities/User';

// JWT 페이로드 인터페이스 정의
export interface JwtPayload {
  user_id: number;
  email: string;
}

// CustomRequest 확장
export interface CustomRequest extends Request {
  user_id: number;
  email: string;
}
