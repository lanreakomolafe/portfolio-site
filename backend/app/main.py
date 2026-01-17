from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api import subscribe, auth
from app.database import init_db
import os

app = FastAPI(title="Portfolio API", version="1.0.0")

# CORS middleware to allow frontend to communicate with backend
# Update allowed_origins with your actual Vercel domain in production
allowed_origins = os.getenv(
    "ALLOWED_ORIGINS",
    "http://localhost:3000,http://localhost:3001"
).split(",")

app.add_middleware(
    CORSMiddleware,
    allow_origins=allowed_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Initialize database on startup
@app.on_event("startup")
async def startup_event():
    init_db()  # Non-blocking - won't crash if DB unavailable

# Include routers
app.include_router(subscribe.router, prefix="/api", tags=["subscriptions"])
app.include_router(auth.router, prefix="/api", tags=["authentication"])


@app.get("/")
async def root():
    return {"message": "Portfolio API is running"}


@app.get("/health")
async def health():
    return {"status": "healthy"}
