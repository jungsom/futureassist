import { Request, Response, NextFunction } from 'express';
import axios from 'axios';

export async function getChat(req: Request, res: Response, next: NextFunction) {
    const { input } = req.body;
    try {
        const response = await axios.post('http://localhost:8000/api/chat', { input });
        res.status(200).json(response.data);
    } catch (err) {
        next(err);
    }
}