from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from database import get_db
from models import ChatRequest
from services import process_query

chat_router = APIRouter()

@chat_router.post("/chat")
async def chat_endpoint(request: ChatRequest, db: Session = Depends(get_db)):
    response = process_query(request.query, db)
    return response