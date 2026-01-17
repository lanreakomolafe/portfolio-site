# Deployment Guide

This guide covers deploying the portfolio website to production.

## Prerequisites

- Vercel account (for frontend)
- Render account (for backend)
- PostgreSQL database (Render managed or external)

## Frontend Deployment (Vercel)

1. **Connect Repository**
   - Push your code to GitHub/GitLab
   - Connect your repository to Vercel

2. **Environment Variables**
   - Add `NEXT_PUBLIC_API_URL` pointing to your Render backend URL
   - Example: `https://your-backend.onrender.com`

3. **Build Settings**
   - Framework Preset: Next.js
   - Build Command: `npm run build`
   - Output Directory: `.next`

4. **Deploy**
   - Vercel will automatically deploy on every push to main branch

## Backend Deployment (Render)

1. **Create Web Service**
   - Connect your repository
   - Select the `backend` directory as root
   - Build Command: `pip install --upgrade pip && pip install -r requirements.txt`
   - Start Command: `uvicorn app.main:app --host 0.0.0.0 --port $PORT`
   
   **Note:** If you encounter `maturin` or Rust build errors, use this build command instead:
   ```
   pip install --upgrade pip setuptools wheel && pip install --only-binary :all: -r requirements.txt || pip install -r requirements.txt
   ```

2. **Environment Variables**
   - `DATABASE_URL`: Your PostgreSQL connection string
   - `AUTH_SECRET`: A secure random string for authentication
   - `ADMIN_USERNAME`: Admin username (default: admin)
   - `ADMIN_PASSWORD`: Strong admin password
   - `ALLOWED_ORIGINS`: Comma-separated list of allowed frontend origins
     - Example: `https://your-site.vercel.app,https://www.yourdomain.com`

3. **Database Setup**
   - Create a PostgreSQL database on Render
   - Run the `database_init.sql` script to create tables
   - Or let the app create them automatically on first startup

## Database Initialization

### Option 1: Automatic (Recommended)
The app will automatically create tables on first startup via `init_db()`.

### Option 2: Manual
Connect to your PostgreSQL database and run:

```sql
CREATE TABLE IF NOT EXISTS subscribers (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    source_page VARCHAR(100),
    submitted_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_subscribers_email ON subscribers(email);
CREATE INDEX IF NOT EXISTS idx_subscribers_submitted_at ON subscribers(submitted_at);
```

## Post-Deployment Checklist

- [ ] Frontend loads correctly
- [ ] API endpoints are accessible
- [ ] CORS is configured correctly
- [ ] Email form submission works
- [ ] Database connection is working
- [ ] Environment variables are set correctly
- [ ] SSL/HTTPS is enabled (automatic on Vercel/Render)

## Troubleshooting

### CORS Errors
- Ensure `ALLOWED_ORIGINS` includes your exact Vercel domain
- Check that the frontend `NEXT_PUBLIC_API_URL` matches your backend URL

### Database Connection Issues
- Verify `DATABASE_URL` is correct
- Check that the database is accessible from Render
- Ensure database tables are created

### Font Issues
- Switzer font is commercial - self-host if you have a license
- Inter font is used as fallback (already configured)

### Build Errors (maturin/Rust)
If you see errors like "Read-only file system" or "maturin failed":

**Root Cause:** Render defaults to Python 3.13, but many packages (like `pydantic-core`) don't have pre-built wheels for 3.13 yet, causing builds from source.

**Solution:**
1. **Set Python Version to 3.11** (has wheels for all dependencies):
   - In Render dashboard: Settings → Environment → Add Environment Variable
   - Key: `PYTHON_VERSION`
   - Value: `3.11.11`
   - OR create a `.python-version` file in your repo root with `3.11.11`
   
2. **Update Build Command** (if not using render.yaml):
   ```
   pip install --upgrade pip setuptools wheel && pip install -r requirements.txt
   ```

3. **Redeploy** - The `.python-version` file in the repo will automatically set Python 3.11
