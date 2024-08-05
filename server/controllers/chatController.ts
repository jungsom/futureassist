import { Request, Response, NextFunction } from 'express';
import axios from 'axios';
import { CustomRequest } from '../models/jwtModel';
import { saveChatRepository } from '../repositories/chatRepository';
import { CreateChatDTO } from '../dtos/chatDto';
import dotenv from 'dotenv';
dotenv.config();
const baseURL = process.env.CHAT_URL

export async function getChat(req: Request, res: Response, next: NextFunction) {
    const { input } = req.body;
    const userId = (req as CustomRequest).user_id;
    try {
        if (!baseURL) {
            throw new Error('CHAT_URL is not defined in the environment variables');
        }
        console.log('Sending request to external API with data:', { baseURL, input, userId});
        const response = await axios.post(`${baseURL}/api/chat`, { 
            input, userId
        });
        const { disease, department, type } = response.data;

        if (type === 3) {    
            const chatData: CreateChatDTO = { disease, department, user_id: userId };
            await saveChatRepository(chatData);
        }

        res.status(200).json(response.data);
    } catch (err) {
        next(err);
    }
} 