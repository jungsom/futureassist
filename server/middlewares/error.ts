import { Request, Response, NextFunction } from 'express';

export class HttpError extends Error {
  public readonly statuscode: number;

  constructor(message: string, statuscode: number) {
    super(message);
    this.statuscode = statuscode;
    this.name = 'HttpError';
  }
}

export class Unauthorized extends HttpError {
  constructor(message: string) {
    super(message, 401);
    this.name = 'Unauthorized';
  }
}

export class BadRequest extends HttpError {
  constructor(message: string) {
    super(message, 400);
    this.name = 'BadRequest';
  }
}

export class NotFoundError extends HttpError {
  constructor(message: string) {
    super(message, 404);
    this.name = 'NotFoundError';
  }
}

export const errorMiddleware = (
  err: HttpError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error(err.stack);

  const status = err.statuscode || 500;
  const message = err.message || 'Internal Server Error';

  res.status(status).json({ status, message });
};
