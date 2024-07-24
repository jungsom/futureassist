import { Request, Response, NextFunction } from 'express';
import { RegisterInterface } from "../models/user.model";
import { User } from "../entities/User";
import { datasource } from "../config/database";
// import { registerService } from '../services/userService';

export async function register(req: Request, res: Response, next: NextFunction) {
    try { 
        const user: RegisterInterface = req.body;
        const results = await datasource.getRepository(User).save(user)

        return res.status(201).json({ data: results })
 
    } catch (err) {
        next(err)
    }

    
}