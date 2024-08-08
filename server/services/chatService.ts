import axios from 'axios';
import { saveChatRepository } from '../repositories/chatRepository';
import { IHospitalReccomendation } from '../models/chatModel';
import { chatRequire } from '../models/chatModel';
import { CreateChatDTO } from '../dtos/chatDto';
import dotenv from 'dotenv';
import https from 'https';
dotenv.config();
const chatURL = process.env.CHAT_URL;
const baseURL = process.env.BASE_URL;

const httpsAgent = new https.Agent({
    rejectUnauthorized: false
});

export async function getHospitalRecommendation(
  sido_addr: string,
  sigu_addr: string,
  department: string
) {
  if (sido_addr && sigu_addr && department) {
    const response = await axios.get(
      `${baseURL}/api/hospital/search?sido_addr=${sido_addr}&sigu_addr=${sigu_addr}&department=${department}&pageSize=3`,
      {
        httpsAgent
      }
    );
    const processedData: IHospitalReccomendation[] = response.data.data.map(
      (item: any) => ({
        name: item.name,
        telno: item.telno,
        url: item.url,
        addr: item.addr
      })
    );
    return processedData;
  } else {
    if (!sido_addr) {
      return { answer: '시/도를 입력해 주세요.', sido: chatRequire.sido };
    }
    if (!sigu_addr) {
      return {
        answer: '시/구를 입력해 주세요.',
        sigu: chatRequire.sigu[sido_addr]
      };
    }
    if (!department) {
      return {
        answer: '진료과를 입력해 주세요.',
        department: chatRequire.department
      };
    }
  }
}

export async function handleChatInput(input: string, userId: number) {
    const response = await axios.post(`${chatURL}/fast/chat`, { 
        input, userId
    }, {
        httpsAgent
    });
    const { disease, department, saved } = response.data;

  if (saved) {
    const chatData: CreateChatDTO = { disease, department, user_id: userId };
    await saveChatRepository(chatData);
  }
  return response.data;
}
