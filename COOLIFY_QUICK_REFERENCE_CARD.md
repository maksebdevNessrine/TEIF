# COOLIFY DEPLOYMENT - QUICK REFERENCE CARD

**Keep this handy while deploying to Coolify**

---

## 📋 PRE-DEPLOYMENT CHECKLIST (Do FIRST!)

### Generate Secrets (PowerShell)

```powershell
# Run this to generate JWT_SECRET (32 chars)
[Convert]::ToBase64String((1..32 | ForEach-Object { [byte](Get-Random -Maximum 256) }))

# Run this to generate POSTGRES_PASSWORD (32 chars)
[Convert]::ToBase64String((1..32 | ForEach-Object { [byte](Get-Random -Maximum 256) }))
```

### OVH SMTP Configuration

Your SMTP credentials are pre-configured for OVH:

```
SMTP_HOST = ssl0.ovh.net
SMTP_PORT = 587
SMTP_USER = support@comptacrm.com
SMTP_PASSWORD = Compta2025++
SMTP_SECURE = false
```

No additional action needed - use these values in Coolify.

### Git Verification

```powershell
# Verify you're on production branch
git branch
# Should show: * production

# Verify latest commit
git log --oneline -1
```

---

## 🚀 COOLIFY DEPLOYMENT STEPS (In Order)

### Step 1: Create Application
```
Coolify Dashboard
→ Applications
→ + New Application
→ Name: TEIF
→ Create
```

### Step 2: Build Settings
```
Build Pack: Docker Compose
Compose File: docker-compose.prod.yml
```

### Step 3: Git Setup
```
Source: GitHub
Repository: TEIF
Branch: production (⚠️ NOT main)
Deploy on Push: Enable
```

### Step 4: Domain Setup
```
Domain: yourdomain.com
SSL: Let's Encrypt
HTTP→HTTPS: Enable
```

### Step 5: Add 15 Environment Variables

**Database (3):**
```
POSTGRES_USER = postgres
POSTGRES_PASSWORD = <your-generated-32-char-password>
POSTGRES_DB = teif_prod
```

**Backend (8):**
```
DATABASE_URL = postgresql://postgres:<PASSWORD>@postgres:5432/teif_prod
JWT_SECRET = <your-generated-32-char-secret>
JWT_EXPIRY = 3600
SITE_URL = https://yourdomain.com
CORS_ORIGIN = https://yourdomain.com
SMTP_HOST = ssl0.ovh.net
SMTP_PORT = 587
SMTP_USER = support@comptacrm.com
```

**Email (2 of the 8 above):**
```
SMTP_PASSWORD = Compta2025++
SMTP_SECURE = false
```

**Frontend (2):**
```
VITE_API_BASE_URL = https://yourdomain.com/api
NODE_ENV = production
```

### Step 6: Deploy
```
Click: Deploy
Wait 10-15 minutes for first build
Monitor logs for errors
```

### Step 7: Verify
```
Test: https://yourdomain.com/api/health
Test: https://yourdomain.com (frontend)
Test: Signup and email verification
Test: Login
```

---

## ⚠️ CRITICAL VALUES

### DATABASE_URL Format
```
postgresql://postgres:<YOUR-POSTGRES-PASSWORD>@postgres:5432/teif_prod
                            ↑
                Replace with your password
```

### CORS_ORIGIN (Must match exactly!)
```
✅ https://yourdomain.com
❌ http://yourdomain.com (missing https)
❌ yourdomain.com (missing https://)
❌ https://www.yourdomain.com (unless this is your domain)
```

### VITE_API_BASE_URL
```
https://yourdomain.com/api
```

### SMTP Credentials (OVH Configuration)
```
SMTP_HOST = ssl0.ovh.net
SMTP_PASSWORD = Compta2025++
These are pre-configured and ready to use.
```

---

## 🆘 IF SOMETHING FAILS

### Service won't start
→ Check Coolify Logs for error message  
→ Usually: Incorrect environment variable

### Frontend shows blank page
→ Check browser console (F12)  
→ Usually: CORS error or incorrect VITE_API_BASE_URL  

### Email not sending
→ Check Coolify Logs for SMTP error  
→ Usually: Wrong SMTP credentials or network issue with OVH

### DNS not working
→ Run: `nslookup yourdomain.com`  
→ Should return your VPS IP address  
→ Wait 5-15 minutes for propagation

---

## ✅ SUCCESSFUL DEPLOYMENT SIGNS

- ✅ All 3 services show 🟢 Green in Coolify
- ✅ Health endpoint responds: `/api/health`
- ✅ Frontend loads: `https://yourdomain.com`
- ✅ Can signup and receive verification email
- ✅ Can login successfully
- ✅ No error messages in Coolify logs

---

## 📞 QUICK HELP

**Coolify Dashboard:** https://your-vps-ip:3000  
**Your App:** https://yourdomain.com  
**API Health:** https://yourdomain.com/api/health  

**DNS Check:** `nslookup yourdomain.com`  
**Health Test:** `curl https://yourdomain.com/api/health`  
**OVH SMTP:** ssl0.ovh.net:587 (support@comptacrm.com)

---

**Detailed Guide:** COOLIFY_FIRST_DEPLOYMENT_DETAILED.md  
**Environment Reference:** ENV_VARIABLES_REFERENCE.md  
**Troubleshooting:** COOLIFY_DOCKER_COMPOSE_GUIDE.md
