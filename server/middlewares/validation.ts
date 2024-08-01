import { validate, ValidationError } from 'class-validator';
import { Request, Response, NextFunction } from 'express';

export const validationMiddleware = (
  type: any,
  source: 'body' | 'query' = 'body'
) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const data = source === 'body' ? req.body : req.query;
    const errors = await validate(data);

    if (errors.length > 0) {
      const errorMessages: Record<string, string[]> = {};

      errors.forEach((error: ValidationError) => {
        errorMessages[error.property] = Object.values(error.constraints || {});
      });
      return res.status(400).json({ errors: errorMessages });
    }

    next();
  };
};
