import torch
from transformers import T5ForConditionalGeneration, T5TokenizerFast

def loadModel(model_path):
    device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
    model = T5ForConditionalGeneration.from_pretrained(model_path).to(device)
    tokenizer = T5TokenizerFast.from_pretrained(model_path)
    return model, tokenizer, device