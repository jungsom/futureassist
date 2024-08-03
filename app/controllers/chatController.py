from app.services.chatService import calculate_score, predict, classify_disease
from app.models.answerModel import Answer

def chatAnswer(input, a2d, daily_noun, medi_noun, okt, model, tokenizer, device):
    medi_score = calculate_score(okt, input, medi_noun, 5000, 1000)
    daily_score = calculate_score(okt, input, daily_noun, 100, 10)
    if (medi_score < 5 and daily_score < 5):
        result = Answer(
            type = 1
        )
    elif (daily_score >= medi_score):
        result = Answer(
            type = 2
        )
    else:
        predicted_output = predict(input, model, tokenizer, device)
        disease, department = classify_disease(okt, predicted_output, a2d)
        result = Answer(
            disease = disease,
            department = department,
            answer = predicted_output,
            type = 3
        )
    return result

