import torch
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
