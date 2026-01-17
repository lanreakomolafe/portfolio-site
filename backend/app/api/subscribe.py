from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from sqlalchemy.exc import IntegrityError
from app.database import get_db, Subscriber
from app.schemas import SubscribeRequest, SubscribeResponse, ErrorResponse

router = APIRouter()


@router.post("/subscribe", response_model=SubscribeResponse, status_code=status.HTTP_200_OK)
async def subscribe(request: SubscribeRequest, db: Session = Depends(get_db)):
    """
    Capture email subscription from the website.
    """
    try:
        subscriber = Subscriber(
            email=request.email,
            source_page=request.source_page
        )
        db.add(subscriber)
        db.commit()
        db.refresh(subscriber)
        return SubscribeResponse(message="Thank you for subscribing!")
    except IntegrityError:
        db.rollback()
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail="Email already subscribed."
        )
    except Exception as e:
        db.rollback()
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="An error occurred while processing your subscription."
        )
