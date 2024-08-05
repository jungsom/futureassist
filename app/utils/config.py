import os
from dotenv import load_dotenv

# .env 파일에서 환경 변수 로드
load_dotenv()

# OpenAI API 키를 환경 변수에서 가져오기
OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")