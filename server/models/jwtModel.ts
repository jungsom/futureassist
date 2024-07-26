import { Request, Response, NextFunction } from 'express';
import { JwtPayload } from 'jsonwebtoken';

export interface CustomRequest extends Request {
  user: string | JwtPayload;
}
