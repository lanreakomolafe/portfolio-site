from pydantic import BaseModel, EmailStr
from typing import Optional
from datetime import datetime


class SubscribeRequest(BaseModel):
    email: EmailStr
    source_page: Optional[str] = None


class SubscribeResponse(BaseModel):
    message: str


class ErrorResponse(BaseModel):
    error: str
