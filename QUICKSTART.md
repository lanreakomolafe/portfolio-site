# Quick Start Guide

Get the portfolio website running locally in 5 minutes.

## Step 1: Database Setup

Create a PostgreSQL database:

```bash
# Using PostgreSQL CLI
createdb portfolio_db

# Or using psql
psql -U postgres
CREATE DATABASE portfolio_db;
```

## Step 2: Backend Setup

```bash
cd backend

# Create virtual environment
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Create .env file
cat > .env << EOF
DATABASE_URL=postgresql://postgres:password@localhost:5432/portfolio_db
AUTH_SECRET=dev-secret-key-change-in-production
ADMIN_USERNAME=admin
ADMIN_PASSWORD=admin123
ALLOWED_ORIGINS=http://localhost:3000
EOF

# Start backend
uvicorn app.main:app --reload
```

Backend will be available at `http://localhost:8000`

## Step 3: Frontend Setup

```bash
cd frontend

# Install dependencies
npm install

# Create .env.local file
cat > .env.local << EOF
NEXT_PUBLIC_API_URL=http://localhost:8000
EOF

# Start frontend
npm run dev
```

Frontend will be available at `http://localhost:3000`

## Step 4: Verify

1. Open `http://localhost:3000` in your browser
2. Navigate through Home, About, and Projects pages
3. Try submitting the newsletter form
4. Check backend logs to confirm email was saved

## Testing the API

```bash
# Test subscription endpoint
curl -X POST http://localhost:8000/api/subscribe \
  -H "Content-Type: application/json" \
  -d '{"email": "test@example.com", "source_page": "home"}'

# Test health endpoint
curl http://localhost:8000/health
```

## Next Steps

- Update content in `frontend/pages/about.tsx` with your actual LinkedIn information
- Replace placeholder projects in `frontend/pages/projects.tsx`
- Customize colors and styling in `frontend/styles/globals.css`
- See [DEPLOYMENT.md](./DEPLOYMENT.md) for production deployment
