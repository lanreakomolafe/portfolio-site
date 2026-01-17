# Personal Portfolio Website

A clean, minimal portfolio website for Lanre Akomolafe.

## Project Structure

- `frontend/` - Next.js React application (TypeScript)
- `backend/` - FastAPI Python backend
- `backend/database_init.sql` - Database schema initialization script

## Features

- **Three Pages**: Home, About, Projects
- **Email Capture**: Newsletter subscription form with backend validation
- **Clean Design**: Minimal, bold aesthetic with white/black/red color scheme
- **Typography**: Khand for headings, Switzer/Inter for body text
- **Responsive**: Mobile-first design
- **SEO-Friendly**: Proper meta tags and semantic HTML

## Setup

### Prerequisites

- Node.js 18+ and npm
- Python 3.9+
- PostgreSQL database

### Frontend

```bash
cd frontend
npm install
npm run dev
```

The frontend will run on `http://localhost:3000`

### Backend

```bash
cd backend
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
uvicorn app.main:app --reload
```

The backend will run on `http://localhost:8000`

### Database Setup

1. Create a PostgreSQL database
2. Set the `DATABASE_URL` in your backend `.env` file
3. The app will automatically create tables on first startup, or run `database_init.sql` manually

## Environment Variables

### Frontend (.env.local)

```
NEXT_PUBLIC_API_URL=http://localhost:8000
```

### Backend (.env)

```
DATABASE_URL=postgresql://user:password@localhost:5432/portfolio_db
AUTH_SECRET=your-secret-key-here
ADMIN_USERNAME=admin
ADMIN_PASSWORD=changeme
ALLOWED_ORIGINS=http://localhost:3000,http://localhost:3001
```

## Typography Note

The design uses **Switzer** for body text, which is a commercial font. The current setup uses **Inter** as a fallback (available via Google Fonts). To use Switzer in production:

1. Purchase a license for Switzer
2. Self-host the font files
3. Update `frontend/styles/globals.css` to load the self-hosted font

## API Endpoints

- `POST /api/subscribe` - Submit email subscription
- `POST /api/auth/login` - Admin authentication (HTTP Basic Auth)
- `GET /health` - Health check

## Deployment

See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed deployment instructions.

- **Frontend**: Deploy to Vercel
- **Backend**: Deploy to Render
- **Database**: Use Render's managed PostgreSQL or external service

## Development

### Running Locally

1. Start PostgreSQL database
2. Set up backend environment variables
3. Start backend: `cd backend && uvicorn app.main:app --reload`
4. Set up frontend environment variables
5. Start frontend: `cd frontend && npm run dev`

### Project Structure

```
portfolio-site/
├── frontend/
│   ├── pages/          # Next.js pages
│   ├── components/     # React components
│   ├── styles/         # CSS modules
│   └── public/         # Static assets
├── backend/
│   ├── app/
│   │   ├── api/        # API routes
│   │   ├── database.py # Database models
│   │   ├── schemas.py  # Pydantic schemas
│   │   └── main.py     # FastAPI app
│   └── requirements.txt
└── README.md
```
