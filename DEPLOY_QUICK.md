# Quick Deployment Reference

## 🚀 Fast Deployment Steps

### 1. Database (Render)
- New → PostgreSQL
- Name: `portfolio-db`
- Copy **Internal Database URL**

### 2. Backend (Render)
- New → Web Service
- Repo: `lanreakomolafe/portfolio-site`
- **Root Directory:** `backend` ⚠️
- **Build:** `pip install -r requirements.txt`
- **Start:** `uvicorn app.main:app --host 0.0.0.0 --port $PORT`

**Environment Variables:**
```
DATABASE_URL=<Internal Database URL from step 1>
AUTH_SECRET=f3e66fbe1d16cc7c54b3661f0498c8217bda4076823a7aaa9fcc8d970d414b3a
ADMIN_USERNAME=admin
ADMIN_PASSWORD=<your-secure-password>
ALLOWED_ORIGINS=http://localhost:3000
```

### 3. Frontend (Vercel)
- Add New → Project
- Repo: `lanreakomolafe/portfolio-site`
- **Root Directory:** `frontend` ⚠️
- Framework: Next.js (auto)

**Environment Variable:**
```
NEXT_PUBLIC_API_URL=<your-render-backend-url>
```

### 4. Update CORS
- Render → Backend → Environment
- Update `ALLOWED_ORIGINS` to your Vercel URL

---

## 📋 Full Checklist
See [DEPLOYMENT_CHECKLIST.md](./DEPLOYMENT_CHECKLIST.md) for detailed steps.

---

## 🔗 Your URLs
- GitHub: `https://github.com/lanreakomolafe/portfolio-site.git`
- Frontend: `_________________` (after Vercel deploy)
- Backend: `_________________` (after Render deploy)
