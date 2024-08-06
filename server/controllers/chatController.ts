import { Request, Response, NextFunction } from 'express';
import axios from 'axios';
import { CustomRequest } from '../models/jwtModel';
import { saveChatRepository } from '../repositories/chatRepository';
import { CreateChatDTO } from '../dtos/chatDto';
import dotenv from 'dotenv';
import { IHospitalReccomendation } from '../models/chatModel';
import { chatRequire } from './chatRequire';
dotenv.config();
const chatURL = process.env.CHAT_URL
const baseURL = process.env.BASE_URL

export async function getChat(req: Request, res: Response, next: NextFunction) {
    const { input, sido_addr, sigu_addr, department } = req.body;
    const userId = (req as CustomRequest).user_id;
    try {
        let response;
        if (input == "!병원추천") {
            if (sido_addr && sigu_addr && department) {
                response = await axios.get(`${baseURL}/api/hospital/search?sido_addr=${sido_addr}&sigu_addr=${sigu_addr}&department=${department}&pageSize=3`);
                const processedData: IHospitalReccomendation[] = response.data.data.map((item: any) => ({
                    name: item.name,
                    telno: item.telno,
                    url: item.url,
                    addr: item.addr
                }));
                res.status(200).json(processedData);
            }
            else {
                console.log(sido_addr,sigu_addr,department);
                if(!sido_addr){
                    res.status(200).json({"answer":"시/도를 입력해 주세요.", "sido":chatRequire.sido});
                }
                else if(!sigu_addr){
                    res.status(200).json({"answer":"시/구를 입력해 주세요.","sigu":chatRequire.sigu[sido_addr]});
                }
                if(!department){
                    res.status(200).json({"answer":"진료과를 입력해 주세요.", "department":chatRequire.department});
                }
            }
        } 
        else {
            response = await axios.post(`${chatURL}/api/chat`, { 
                input, userId
            });
            const { disease, department, saved } = response.data;

            if (saved) {    
                const chatData: CreateChatDTO = { disease, department, user_id: userId };
                await saveChatRepository(chatData);
            }
            res.status(200).json(response.data);
        }
    } catch (err) {
        next(err);
    };
};