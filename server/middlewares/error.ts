import { Request, Response, NextFunction } from 'express';
import { ValidationError as ClassValidatorError } from 'class-validator';

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

export class ValidationError extends HttpError {
  public readonly errors: ClassValidatorError[];

  constructor(errors: ClassValidatorError[]) {
    super('Validation failed', 400);
    this.name = 'ValidationError';
    this.errors = errors;
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
