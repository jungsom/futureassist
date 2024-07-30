from fastapi import APIRouter, Request
from app.controllers.chatController import chatAnswer
from app.utils.csv2df import csv2df
from app.utils.loadModel import loadModel
from konlpy.tag import Okt
import os
router = APIRouter()

# 현재 파일의 디렉토리 경로
current_dir = os.path.dirname(os.path.abspath(__file__))

# CSV 파일의 절대 경로
a2dpath = os.path.join(current_dir, '..', 'data', 'answer2department.csv')
dailypath = os.path.join(current_dir, '..', 'data', 'filtered_daily_noun_counts.csv')
medipath = os.path.join(current_dir, '..', 'data', 'filtered_medi_noun_counts.csv')
modelpath = os.path.join(current_dir, '..', 'model_aihub')

a2d = csv2df(a2dpath)
a2d = a2d.set_index('disease')['department'].to_dict()
daily_noun = csv2df(dailypath)
medi_noun = csv2df(medipath)
okt = Okt()
model, tokenizer, device = loadModel(modelpath)

@router.post("/chat")
async def answer(request: Request):
    input_data = await request.json()
    input = input_data.get('input')
    return chatAnswer(input, a2d, daily_noun, medi_noun, okt, model, tokenizer, device)