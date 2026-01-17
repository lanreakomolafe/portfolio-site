# Deployment Checklist

Follow these steps in order to deploy your portfolio website.

## ✅ Pre-Deployment Checklist

- [x] Code pushed to GitHub: `https://github.com/lanreakomolafe/portfolio-site.git`
- [x] Git repository initialized
- [x] All files committed
- [ ] Tested locally (frontend and backend work)
- [ ] Environment variables documented

---

## Step 1: Deploy Database (Render)

### 1.1 Create Render Account
- [ ] Go to [render.com](https://render.com) and sign up/login
- [ ] Verify your email if needed

### 1.2 Create PostgreSQL Database
- [ ] Click **"New +"** → **"PostgreSQL"**
- [ ] Configure:
  - **Name:** `portfolio-db`
  - **Database:** `portfolio_db`
  - **User:** `portfolio_user` (or default)
  - **Region:** Choose closest to you
  - **PostgreSQL Version:** Latest (15 or 16)
  - **Plan:** Free tier (or paid for production)
- [ ] Click **"Create Database"**
- [ ] **IMPORTANT:** Copy the **Internal Database URL** (starts with `postgresql://`)
  - This is different from the External Database URL
  - Format: `postgresql://user:password@hostname:port/database`
- [ ] Save this URL securely - you'll need it for the backend

**Database URL saved:** `_________________________________`

---

## Step 2: Deploy Backend (Render)

### 2.1 Create Web Service
- [ ] Click **"New +"** → **"Web Service"**
- [ ] Connect your GitHub account if not already connected
- [ ] Select repository: `lanreakomolafe/portfolio-site`
- [ ] Configure service:
  - **Name:** `portfolio-backend`
  - **Environment:** `Python 3`
  - **Region:** Same as database
  - **Branch:** `main`
  - **Root Directory:** `backend` ⚠️ **IMPORTANT**
  - **Build Command:** `pip install --upgrade pip setuptools wheel && pip install --only-binary :all: -r requirements.txt || pip install -r requirements.txt`
  - **Start Command:** `uvicorn app.main:app --host 0.0.0.0 --port $PORT`
- [ ] Click **"Create Web Service"**

### 2.2 Set Environment Variables
In the Render dashboard, go to **Environment** tab and add:

- [ ] **DATABASE_URL**
  - Value: The Internal Database URL from Step 1.2
  - Example: `postgresql://portfolio_user:password@dpg-xxxxx-a.oregon-postgres.render.com/portfolio_db`

- [ ] **AUTH_SECRET**
  - Value: Generate a secure random string
  - You can generate one: `openssl rand -hex 32`
  - Example: `a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6q7r8s9t0u1v2w3x4y5z6`

- [ ] **ADMIN_USERNAME**
  - Value: `admin` (or your choice)

- [ ] **ADMIN_PASSWORD**
  - Value: Strong password (save it securely)
  - Example: `YourSecurePassword123!`

- [ ] **ALLOWED_ORIGINS**
  - Value: `http://localhost:3000` (temporary, update after frontend deploy)
  - Will update to: `https://your-site.vercel.app` after Step 3

### 2.3 Deploy
- [ ] Click **"Save Changes"**
- [ ] Wait for deployment to complete (5-10 minutes first time)
- [ ] Copy the service URL (e.g., `https://portfolio-backend.onrender.com`)

**Backend URL:** `_________________________________`

### 2.4 Test Backend
- [ ] Test health endpoint: `curl https://your-backend.onrender.com/health`
- [ ] Should return: `{"status":"healthy"}`

---

## Step 3: Deploy Frontend (Vercel)

### 3.1 Create Vercel Account
- [ ] Go to [vercel.com](https://vercel.com) and sign up/login
- [ ] Connect your GitHub account

### 3.2 Import Project
- [ ] Click **"Add New..."** → **"Project"**
- [ ] Import repository: `lanreakomolafe/portfolio-site`
- [ ] Configure project:
  - **Framework Preset:** Next.js (auto-detected)
  - **Root Directory:** `frontend` ⚠️ **IMPORTANT** - Click "Edit" and set to `frontend`
  - **Build Command:** `npm run build` (auto-detected)
  - **Output Directory:** `.next` (auto-detected)
  - **Install Command:** `npm install` (auto-detected)

### 3.3 Set Environment Variables
- [ ] Click **"Environment Variables"**
- [ ] Add:
  - **Key:** `NEXT_PUBLIC_API_URL`
  - **Value:** Your Render backend URL from Step 2.3
  - **Example:** `https://portfolio-backend.onrender.com`
- [ ] Click **"Save"**

### 3.4 Deploy
- [ ] Click **"Deploy"**
- [ ] Wait for build to complete (2-5 minutes)
- [ ] Copy your Vercel URL (e.g., `https://portfolio-site.vercel.app`)

**Frontend URL:** `_________________________________`

### 3.5 Test Frontend
- [ ] Visit your Vercel URL in browser
- [ ] Check all pages load (Home, About, Projects)
- [ ] Test newsletter form submission

---

## Step 4: Update CORS Configuration

### 4.1 Update Backend ALLOWED_ORIGINS
- [ ] Go back to Render dashboard → Your backend service
- [ ] Go to **Environment** tab
- [ ] Update **ALLOWED_ORIGINS**:
  - Remove: `http://localhost:3000`
  - Add: Your Vercel URL from Step 3.4
  - Example: `https://portfolio-site.vercel.app`
  - If you have a custom domain: `https://portfolio-site.vercel.app,https://www.yourdomain.com`
- [ ] Click **"Save Changes"**
- [ ] Backend will auto-redeploy

### 4.2 Verify CORS
- [ ] Test newsletter form on your Vercel site
- [ ] Check browser console for CORS errors
- [ ] Verify email submission works

---

## Step 5: Final Verification

### 5.1 Frontend Tests
- [ ] Home page loads correctly
- [ ] About page loads correctly
- [ ] Projects page loads correctly
- [ ] Navigation works
- [ ] Newsletter form visible on all pages

### 5.2 Backend Tests
- [ ] Health endpoint: `curl https://your-backend.onrender.com/health`
- [ ] Subscribe endpoint test:
  ```bash
  curl -X POST https://your-backend.onrender.com/api/subscribe \
    -H "Content-Type: application/json" \
    -d '{"email": "test@example.com", "source_page": "home"}'
  ```
- [ ] Should return: `{"message":"Thank you for subscribing!"}`

### 5.3 Integration Tests
- [ ] Submit newsletter form on frontend
- [ ] Check Render logs to confirm email saved
- [ ] Verify no CORS errors in browser console
- [ ] Test on mobile device (responsive design)

### 5.4 Database Verification
- [ ] Check Render PostgreSQL dashboard
- [ ] Verify `subscribers` table exists
- [ ] Check that test emails are being saved

---

## Step 6: Custom Domain (Optional)

### 6.1 Add Domain to Vercel
- [ ] Go to Vercel project → **Settings** → **Domains**
- [ ] Add your custom domain
- [ ] Follow DNS configuration instructions
- [ ] Wait for DNS propagation (can take up to 48 hours)

### 6.2 Update Backend CORS
- [ ] Add custom domain to `ALLOWED_ORIGINS` in Render
- [ ] Example: `https://www.yourdomain.com,https://yourdomain.com`

---

## Troubleshooting

### Backend won't start
- Check Render logs for errors
- Verify `DATABASE_URL` is correct (Internal URL, not External)
- Ensure `Root Directory` is set to `backend`
- Check `Start Command` is correct

### Frontend build fails
- Check Vercel build logs
- Verify `Root Directory` is set to `frontend`
- Ensure `NEXT_PUBLIC_API_URL` is set correctly

### CORS errors
- Verify `ALLOWED_ORIGINS` includes exact Vercel URL (with https://)
- Check that frontend `NEXT_PUBLIC_API_URL` matches backend URL
- Clear browser cache and try again

### Database connection errors
- Verify `DATABASE_URL` uses Internal Database URL
- Check that database is running in Render
- Ensure tables are created (check Render logs)

---

## Deployment Summary

Once complete, you should have:

- **Frontend:** `https://your-site.vercel.app`
- **Backend:** `https://your-backend.onrender.com`
- **Database:** Running on Render PostgreSQL

**All URLs:**
- Frontend: `_________________________________`
- Backend: `_________________________________`
- Database: `_________________________________` (Internal URL)

---

## Post-Deployment

- [ ] Update README.md with production URLs
- [ ] Set up monitoring (optional)
- [ ] Configure custom domain (optional)
- [ ] Set up automated backups for database (optional)
- [ ] Document any custom configurations

---

**Deployment completed on:** `_________________`
