import sys
import os
sys.path.append(os.path.dirname(os.path.abspath(os.path.dirname(__file__))))
from fastapi import FastAPI
from app.routes import chatRoute

app = FastAPI()

app.include_router(chatRoute.router, prefix="/api", tags=["chatbot"])