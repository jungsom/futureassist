export class BadRequest extends Error {
  status: number;
  constructor(message: string) {
    super(message);
    this.status = 400;
  }
}

export class Unauthorized extends Error {
  status: number;
  constructor(message: string) {
    super(message);
    this.status = 401;
  }
}

export class Forbidden extends Error {
  status: number;
  constructor(message: string) {
    super(message);
    this.status = 403;
  }
}

export class NotFound extends Error {
  status: number;
  constructor(message: string) {
    super(message);
    this.status = 404;
  }
}

export class MethodNotAllowed extends Error {
  status: number;
  constructor(message: string) {
    super(message);
    this.status = 405;
  }
}

export class InternalServerError extends Error {
  status: number;
  constructor(message: string) {
    super(message);
    this.status = 500;
  }
}

export const errorMiddleware = (err: Error, req: any, res: any, next: any) => {
  console.error(err.stack);

  const status = (err as any).status || 500;
  const message = err.message || 'Internal Server Error';

  res.status(status).json({ status, message });
};
