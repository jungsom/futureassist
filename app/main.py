import sys
import os
sys.path.append(os.path.dirname(os.path.abspath(os.path.dirname(__file__))))
from fastapi import FastAPI
from app.routes import chatRoute
import uvicorn

app = FastAPI()

app.include_router(chatRoute.router, prefix="/api", tags=["chat"])

# if __name__ == '__main__':
#     import uvicorn
#     uvicorn.run(app, host='127.0.0.1', port=8000)