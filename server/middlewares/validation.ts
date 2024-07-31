import { plainToClass } from 'class-transformer';
import { validate, ValidationError } from 'class-validator';
import { Request, Response, NextFunction } from 'express';

export const validationMiddleware = (type: any) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const output = plainToClass(type, req.body);
    const errors = await validate(output);

    if (errors.length > 0) {
      const errorMessages: Record<string, string[]> = {};

      errors.forEach((error: ValidationError) => {
        errorMessages[error.property] = Object.values(error.constraints || {});
      });
      return res.status(400).json({ errors: errorMessages });
    }

    req.body = output;
    next();
  };
};
