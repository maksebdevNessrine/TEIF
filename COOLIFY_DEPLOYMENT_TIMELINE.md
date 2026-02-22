# COOLIFY FIRST DEPLOYMENT - VISUAL TIMELINE

**Follow this timeline for your FIRST deployment of TEIF on Coolify**

---

## 🟢 PHASE 1: PRE-DEPLOYMENT (15 minutes)

```
START
  │
  ├─ [1] Verify production branch created
  │  └─ git branch → should show: * production
  │
  ├─ [2] Generate secrets (in PowerShell)
  │  ├─ JWT_SECRET (copy output)
  │  └─ POSTGRES_PASSWORD (copy output)
  │
  ├─ [3] Get your VPS IP address
  │  └─ From hosting provider or Coolify dashboard
  │
  ├─ [4] Configure DNS (at your registrar)
  │  ├─ Create A record: @ → VPS_IP
  │  ├─ Create A record: www → VPS_IP
  │  └─ Wait 5-15 minutes for propagation
  │
  ├─ [5] Verify DNS is working
  │  └─ nslookup yourdomain.com
  │     Should return: your VPS IP address
  │
  └─ [6] Save all credentials locally
     ✅ Ready for Coolify deployment
```

---

## 🔵 PHASE 2: COOLIFY SETUP (5 minutes)

```
COOLIFY DASHBOARD
  │
  ├─ [1] Login to Coolify
  │  └─ https://your-vps-ip:3000
  │
  ├─ [2] Create New Application
  │  ├─ Click: Applications → + New Application
  │  ├─ Name: TEIF
  │  ├─ Project: TEIF Production (new or existing)
  │  └─ Create
  │
  ├─ [3] Configure Build Settings
  │  ├─ Build Pack: Docker Compose
  │  ├─ Compose File: docker-compose.prod.yml
  │  └─ Save
  │
  ├─ [4] Configure Git
  │  ├─ Source: GitHub
  │  ├─ Repository: TEIF
  │  ├─ Branch: production ⚠️ (CRITICAL!)
  │  ├─ Deploy on Push: Enable
  │  └─ Save
  │
  ├─ [5] Add Domain
  │  ├─ Domain: yourdomain.com
  │  ├─ SSL: Let's Encrypt (auto-issuing)
  │  ├─ HTTP→HTTPS Redirect: Enable
  │  └─ Save & Wait for SSL certificate
  │
  └─ ✅ Ready for environment variables
```

---

## 🟡 PHASE 3: ADD ENVIRONMENT VARIABLES (3 minutes)

```
ENVIRONMENT VARIABLES SECTION (15 total)
  │
  ├─ DATABASE (3 variables)
  │  ├─ POSTGRES_USER = postgres
  │  ├─ POSTGRES_PASSWORD = [32-char password]
  │  └─ POSTGRES_DB = teif_prod
  │
  ├─ BACKEND API (8 variables)
  │  ├─ DATABASE_URL = postgresql://postgres:[PASSWORD]@postgres:5432/teif_prod
  │  ├─ JWT_SECRET = [32-char secret]
  │  ├─ JWT_EXPIRY = 3600
  │  ├─ SITE_URL = https://yourdomain.com
  │  ├─ CORS_ORIGIN = https://yourdomain.com
  │  ├─ SMTP_HOST = ssl0.ovh.net
  │  ├─ SMTP_PORT = 587
  │  └─ SMTP_USER = support@comptacrm.com
  │
  ├─ EMAIL (2 variables - continued)
  │  ├─ SMTP_PASSWORD = Compta2025++
  │  └─ SMTP_SECURE = false
  │
  ├─ FRONTEND (2 variables)
  │  ├─ VITE_API_BASE_URL = https://yourdomain.com/api
  │  └─ NODE_ENV = production
  │
  ├─ [REPEAT] For each variable:
  │  ├─ Click: + Add Variable
  │  ├─ Enter Key & Value
  │  ├─ Visibility: Private
  │  ├─ Save
  │  └─ Move to next variable
  │
  └─ ✅ All 15 variables saved
```

---

## 🟠 PHASE 4: DEPLOYMENT (15 minutes)

```
DEPLOYMENT PROCESS
  │
  ├─ [1] Click: Deploy button
  │  └─ Status: "Deployment Started..."
  │
  ├─ [2] Building Backend Image (3-5 minutes)
  │  ├─ Pulling node:20-alpine
  │  ├─ Installing dependencies
  │  ├─ Running pnpm install
  │  ├─ Building application
  │  ├─ Running Prisma generate
  │  └─ ✅ Backend image ready
  │
  ├─ [3] Building Frontend Image (3-5 minutes)
  │  ├─ Pulling node:20-alpine builder
  │  ├─ Installing dependencies
  │  ├─ Building React app with Vite
  │  ├─ Building Nginx stage
  │  └─ ✅ Frontend image ready
  │
  ├─ [4] Starting Services (2-3 minutes)
  │  ├─ PostgreSQL: Starting...
  │  │  └─ ✅ PostgreSQL Running
  │  │
  │  ├─ Backend: Starting...
  │  │  ├─ Waiting for PostgreSQL health check
  │  │  ├─ Running Prisma migrations
  │  │  └─ ✅ Backend Running
  │  │
  │  └─ Frontend: Starting...
  │     ├─ Waiting for Backend health check
  │     └─ ✅ Frontend Running
  │
  └─ ✅ All Services: 🟢 Green
     Deployment Complete!
```

**Total Time: ~15-20 minutes**

---

## 🟢 PHASE 5: VERIFICATION (5 minutes)

```
POST-DEPLOYMENT VERIFICATION
  │
  ├─ [1] Check Service Status (In Coolify)
  │  ├─ teif-postgres: 🟢 Running
  │  ├─ teif-backend: 🟢 Running
  │  └─ teif-frontend: 🟢 Running
  │  └─ ✅ All Green
  │
  ├─ [2] Test Health Endpoint
  │  ├─ Run: curl https://yourdomain.com/api/health
  │  ├─ Expected: {"status":"ok",...}
  │  └─ ✅ Backend responding
  │
  ├─ [3] Test Frontend
  │  ├─ Open: https://yourdomain.com
  │  ├─ You should see: TEIF login page
  │  └─ ✅ Frontend loading
  │
  ├─ [4] Test Authentication
  │  ├─ Click: Sign Up
  │  ├─ Enter email: test@yourdomain.com
  │  ├─ Enter password: TestPassword123!
  │  ├─ Click: Register
  │  ├─ Check email for verification
  │  ├─ Click verification link
  │  ├─ Login with credentials
  │  └─ ✅ Authentication working
  │
  ├─ [5] Check Coolify Logs
  │  ├─ Look for: No ERROR messages
  │  ├─ Look for: No WARN messages
  │  └─ ✅ No issues found
  │
  └─ ✅ DEPLOYMENT SUCCESSFUL!
```

---

## 📊 TIMELINE SUMMARY

| Phase | Time | Status |
|-------|------|--------|
| Pre-Deployment (secrets, DNS) | 15 min | 🟢 Offline |
| Coolify Setup (app, git, domain) | 5 min | ⏳ Pending |
| Environment Variables | 3 min | ⏳ Pending |
| Deployment (building & starting) | 15 min | 🔵 In Progress |
| Verification (testing) | 5 min | 🟡 Testing |
| **TOTAL** | **~43 min** | **🟢 LIVE** |

---

## 🎯 WHAT HAPPENS AT EACH STEP

### When you click "Deploy"

```
Your Code (production branch)
        ↓
Git Clone to VPS
        ↓
Read docker-compose.prod.yml
        ↓
Build Backend Image
├─ Copy source code
├─ npm install (pnpm)
├─ Compile TypeScript
├─ Generate Prisma client
└─ Create Docker image
        ↓
Build Frontend Image
├─ Copy source code
├─ npm install (pnpm)
├─ Build with Vite
├─ Optimize with Nginx
└─ Create Docker image
        ↓
Start PostgreSQL Container
├─ Create database volume
├─ Initialize database
└─ Health check passes
        ↓
Start Backend Container
├─ Wait for PostgreSQL ready
├─ Run database migrations
├─ Start Hono.js server
└─ Health check passes
        ↓
Start Frontend Container
├─ Wait for Backend ready
├─ Start Nginx web server
└─ Health check passes
        ↓
Reverse Proxy Routes Traffic
├─ https://yourdomain.com → Frontend (port 80)
├─ https://yourdomain.com/api → Backend (port 3000)
└─ PostgreSQL → Backend only (internal)
        ↓
✅ LIVE ON PRODUCTION
```

---

## 🚦 EXPECTED STATUS CHANGES

### Before Deployment
```
Status: Not Deployed
Services: None
Domain: Not configured
```

### During Deployment (0-5 minutes)
```
Status: Building...
Services: Building images
Domain: Requesting SSL cert
```

### During Deployment (5-10 minutes)
```
Status: Starting Services...
Services: PostgreSQL ✅
Services: Backend ⏳
Services: Frontend ⏳
```

### During Deployment (10-15 minutes)
```
Status: Running Health Checks...
Services: PostgreSQL ✅
Services: Backend ✅
Services: Frontend ✅
```

### After Deployment ✅
```
Status: Deployed
Services: All 🟢 Running
Domain: SSL ✅ Active
Your App: 🟢 LIVE
URL: https://yourdomain.com
```

---

## ⚠️ COMMON TIMING ISSUES

### "Build is taking too long (>20 minutes)"
```
This can happen on first deploy due to:
- Docker pulling base images (slow network)
- npm dependencies resolving (slow network)
- Large monorepo being processed

👉 Wait up to 30 minutes
👉 Check logs for actual errors
👉 If still failing, cancel and retry
```

### "Services stuck on 'Starting...'"
```
Possible causes:
- Health check failing (database not ready)
- Port conflicts
- Insufficient memory

👉 Check Coolify logs
👉 Look for specific error messages
👉 Fix the error, redeploy
```

### "Frontend shows blank page after successful deploy"
```
This happens when frontend can't reach backend:
- VITE_API_BASE_URL incorrect
- CORS_ORIGIN doesn't match
- Backend not responding

👉 Check browser console (F12)
👉 Fix environment variables
👉 Redeploy
```

---

## 🎓 WHAT'S HAPPENING BEHIND THE SCENES

### Docker Compose Orchestration
```
Your docker-compose.prod.yml defines:

1. Services:
   - postgres: Database container
   - backend: API container
   - frontend: Web server container

2. Networks:
   - Internal bridge network (172.25.0.0/16)
   - Services communicate by hostname
   - Postgres ← Backend only (not exposed)
   - Backend ← Reverse proxy from frontend

3. Volumes:
   - postgres_data: Database files (persistent)
   - postgres_backups: Backup files (for recovery)
   - Frontend files: Inside container (no persistence needed)

4. Health Checks:
   - PostgreSQL: pg_isready command
   - Backend: wget /api/health endpoint
   - Frontend: wget /index.html from localhost

5. Dependencies:
   - Backend waits for PostgreSQL health check
   - Frontend waits for Backend health check
   - Ensures correct startup order
```

### Load Balancing
```
When traffic arrives at https://yourdomain.com:

1. Reverse Proxy (Coolify provides)
   │
   ├─ Path: /
   │  └─ Routes to Frontend (Nginx)
   │
   ├─ Path: /api
   │  └─ Routes to Backend (Hono.js)
   │
   └─ Path: /health
      └─ Routes to Backend health check

No manual configuration needed!
Coolify handles all reverse proxy setup.
```

---

## ✅ SUCCESS CHECKLIST

After deployment is complete, verify:

```
□ All services show 🟢 Green
□ Health endpoint returns 200 OK
□ Frontend loads without errors
□ Signup/verification email works
□ Login works
□ No error messages in logs
□ No CORS errors in browser console
□ Database is initialized
□ Backups can be configured
```

If all checked ✅, you're ready to use production!

---

## 🎉 YOU'RE LIVE!

Once all verification checks pass:

```
Your TEIF App is now:
✅ Running on Coolify
✅ Accessible at: https://yourdomain.com
✅ Using production database
✅ Sending emails via SMTP
✅ Protected by SSL/HTTPS
✅ Auto-deploying on git push

Next steps:
1. Monitor logs daily
2. Set up automated backups
3. Test backup restoration
4. Track performance metrics
5. Plan scaling if needed
```

---

**Duration:** ~40-50 minutes from start to live  
**Confidence:** This is the exact deployment process for TEIF  
**Status:** First deployment guide - follow step-by-step
