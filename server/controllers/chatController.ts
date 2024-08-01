import { Request, Response, NextFunction } from 'express';
import axios from 'axios';
import { CustomRequest } from '../models/jwtModel';
import { saveChatRepository } from '../repositories/chatRepository';
import { CreateChatDTO } from '../dtos/chatDto';

export async function getChat(req: Request, res: Response, next: NextFunction) {
    const { input } = req.body;
    try {
        const response = await axios.post('http://localhost:8000/api/chat', { input });
        const { disease, department, type } = response.data;

        if (type === 3) {
            const userId = (req as CustomRequest).user_id;
            const chatData: CreateChatDTO = { disease, department, user_id: userId };
            await saveChatRepository(chatData);
        }

        res.status(200).json(response.data);
    } catch (err) {
        next(err);
    }
}