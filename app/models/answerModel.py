from typing import Optional
from pydantic import BaseModel

class Answer(BaseModel):
    disease: Optional[str] = None
    department: Optional[str] = None
    answer: Optional[str] = None