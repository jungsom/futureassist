import { Request, Response, NextFunction } from 'express';
import { createUser } from '../services/user.service';
import bcrypt from 'bcrypt';

export async function register(req: Request, res: Response, next: NextFunction) {
    try { 
        const { email, password, name, birth_year } = req.body;

        if ( !email || !password || !name || !birth_year ) {
            return res.status(400).json({ status: 400, message: "회원 정보를 입력해주세요."})
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const user = await createUser({
            name,
            email,
            password: hashedPassword,
            birth_year
        });

        return res.status(201).json({ data: user })
 
    } catch (err) {
        next(err)
    }
}

export async function login(req: Request, res: Response, next: NextFunction) {
    try { 
    } catch (err) {
        next(err)
    }
}

export async function logout(req: Request, res: Response, next: NextFunction) {
    try { 
    } catch (err) {
        next(err)
    }
}