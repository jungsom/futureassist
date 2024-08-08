import torch
import openai
from app.utils.config import OPENAI_API_KEY

openai.api_key = OPENAI_API_KEY

def calculate_score(okt, input_sentence, df, c1, c2):
    input_nouns = okt.nouns(input_sentence)
    score = 0
    
    for noun in input_nouns:
        if noun in df['Noun'].values:
            count = df.loc[df['Noun'] == noun, 'Count'].values[0]
            if count >= c1:
                score += 10
            elif count >= c2:
                score += 5
            else:
                score += 1
    return score

def classify_disease(okt, sentence, disease_dict):
    tokens = okt.morphs(sentence)

    # N-gram 생성
    ngram_list = []
    for i in range(len(tokens)):
        for j in range(i + 1, len(tokens) + 1):
            ngram = ''.join(tokens[i:j])
            ngram_list.append(ngram)

    # 병명 추출
    for ngram in ngram_list:
        if ngram in disease_dict:
            return ngram, disease_dict[ngram]

    return 'etc', '내과'

def predict(text, model, tokenizer, device):
    input_ids = tokenizer(
        text,
        return_tensors='pt',
    ).input_ids.to(device)

    with torch.no_grad():
        output = model.generate(
            input_ids,
            max_length=1024,
            num_beams=5,
            no_repeat_ngram_size=2,
            early_stopping=True,
            top_p=1,
        )

        decoded_output = tokenizer.decode(
            output[0],
            skip_special_tokens=True,
            clean_up_tokenization_spaces=True,
        )

    return decoded_output

def chat_with_gpt(prompt):
    try:
        response = openai.ChatCompletion.create(
            model="gpt-3.5-turbo",
            messages=[
                {"role": "system", "content": "너는 의료 전문 상담 챗봇 헬시메이트야. 사용자의 상태를 고려한 병명을 포함하여 200자 이내의 답변을 하고, 사용자가 병명과 관련된 추가질문을(검진, 식이, 생활, 약물, 예방, 운동, 원인, 재활, 정의, 증상, 진단, 치료) 할 수 있도록 유도해줘."},
                {"role": "user", "content": prompt}
            ],
            max_tokens=256,
            temperature=0.3
        )
        return response.choices[0].message['content'].strip()
    except openai.error.OpenAIError as e:
        error_message = f"OpenAI API error: {e}"
        print(error_message)
        return error_message
    except Exception as e:
        error_message = f"Unexpected error: {e}"
        print(error_message)
        return error_message