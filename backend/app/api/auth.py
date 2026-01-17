from fastapi import APIRouter, Depends, HTTPException, status, Security
from fastapi.security import HTTPBasic, HTTPBasicCredentials
import os
from dotenv import load_dotenv
import secrets

load_dotenv()

router = APIRouter()
security = HTTPBasic()

# Simple admin credentials check (in production, use proper password hashing)
ADMIN_USERNAME = os.getenv("ADMIN_USERNAME", "admin")
ADMIN_PASSWORD = os.getenv("ADMIN_PASSWORD", "changeme")


def verify_admin(credentials: HTTPBasicCredentials = Security(security)):
    """
    Verify admin credentials using HTTP Basic Auth.
    """
    is_correct_username = secrets.compare_digest(credentials.username, ADMIN_USERNAME)
    is_correct_password = secrets.compare_digest(credentials.password, ADMIN_PASSWORD)
    
    if not (is_correct_username and is_correct_password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid authentication credentials",
            headers={"WWW-Authenticate": "Basic"},
        )
    return credentials.username


@router.post("/auth/login")
async def login(username: str = Depends(verify_admin)):
    """
    Admin login endpoint (protected by HTTP Basic Auth).
    """
    return {"message": "Authentication successful", "username": username}
