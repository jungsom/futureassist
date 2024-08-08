from fastapi import APIRouter, Request, HTTPException
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
medipath = os.path.join(current_dir, '..', 'data', 'filtered_medi_noun_counts.csv')
modelpath = os.path.join(current_dir, '..', 'model_aihub')

a2d = csv2df(a2dpath)
a2d = a2d.set_index('disease')['department'].to_dict()
medi_noun = csv2df(medipath)
okt = Okt()
model, tokenizer, device = loadModel(modelpath)

@router.post("/chat")
async def answer(request: Request):
    try:
        input_data = await request.json()
        input = input_data.get('input')
        userId = input_data.get('userId')
        
        if input is None or userId is None:
            raise HTTPException(status_code=400, detail="Invalid input data: 'input' and 'userId' are required")

        result = chatAnswer(input, userId, a2d, medi_noun, okt, model, tokenizer, device)
        return result

    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))
    except HTTPException as e:
        raise e
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Internal Server Error: {str(e)}")