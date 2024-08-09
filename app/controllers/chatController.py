import logging
from app.services.chatService import calculate_score, predict, classify_disease, chat_with_gpt
from app.models.answerModel import Answer

# 전체 로깅 설정
logging.basicConfig(
    level=logging.DEBUG,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s',
    handlers=[
        logging.StreamHandler()
    ]
)

# app.controllers.chatController 로거 설정
chat_controller_logger = logging.getLogger('app.controllers.chatController')
chat_controller_handler = logging.FileHandler('chat.log')
chat_controller_handler.setLevel(logging.INFO)
chat_controller_handler.setFormatter(logging.Formatter('%(asctime)s - %(name)s - %(levelname)s - %(message)s'))
chat_controller_logger.addHandler(chat_controller_handler)

def chatAnswer(input, userid, a2d, medi_noun, okt, model, tokenizer, device):
    medi_score = calculate_score(okt, input, medi_noun, 5000, 1000)
    if (medi_score < 10):
        response = chat_with_gpt(
            prompt = input,
        )
        result = Answer(
            answer=response,
        )
    else:
        predicted_output = predict(input, model, tokenizer, device)
        disease, department = classify_disease(okt, predicted_output, a2d)
        result = Answer(
            disease = disease,
            department = department,
            answer = predicted_output,
            saved=True
        )
    chat_controller_logger.info(f'UserID: {userid}')
    chat_controller_logger.info(f'Input: {input}')
    chat_controller_logger.info(f'Answer: {result.answer}')

    return result