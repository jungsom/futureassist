import { Request, Response, NextFunction } from 'express';
import * as chatService from '../services/chatService';
import { CustomRequest } from '../models/jwtModel';

export async function getChat(req: Request, res: Response, next: NextFunction) {
    const { input, sido_addr, sigu_addr, department } = req.body;
    const userId = (req as CustomRequest).user_id;
    try {
        if (input == "!병원추천") {
            const response = await chatService.getHospitalRecommendation(sido_addr, sigu_addr, department);
            res.status(200).json(response);
        } else {
            const response = await chatService.handleChatInput(input, userId);
            res.status(200).json(response);
        }
    } catch (err) {
        next(err);
    }
}