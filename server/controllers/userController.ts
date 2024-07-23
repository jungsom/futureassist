import { Request, Response, NextFunction } from 'express';

export async function register(req: Request, res: Response, next: NextFunction) {
    const { name, password, email, birth_year} = req.body;

    
}