# TEIF on Coolify: 5-Minute Quick Start

**Get TEIF running on Coolify in 5 minutes flat.**

---

## ⚡ TL;DR

```
1. Create Coolify App → Docker Compose
2. Connect Git repo (main branch)
3. Set Compose Path: docker-compose.prod.yml
4. Add 15 environment variables
5. Click Deploy
```

**That's it. You're done.**

---

## Step 1: Create Application (30 seconds)

```
Coolify Dashboard
→ Applications
→ + New
→ Select "Docker Compose"
→ Next
```

---

## Step 2: Connect Git (1 minute)

```
Git Configuration
├─ Provider: GitHub (or GitLab/Gitea)
├─ Repository: your-TEIF-repo
├─ Branch: main
└─ Next
```

---

## Step 3: Docker Compose (30 seconds)

```
Build Configuration
├─ Build Type: Docker Compose
├─ Compose File Path: docker-compose.prod.yml
│  (Coolify auto-reads all services)
├─ Root Domain: yourdomain.com
├─ Do NOT modify anything else
└─ Next
```

---

## Step 4: Environment Variables (2 minutes)

Copy-paste these 15 variables into Coolify:

### Database (3)
```
POSTGRES_USER=postgres
POSTGRES_PASSWORD=<generate_32_char_password>
POSTGRES_DB=teif_prod
```

### Backend API (8)
```
DATABASE_URL=postgresql://postgres:<POSTGRES_PASSWORD>@postgres:5432/teif_prod
JWT_SECRET=<generate_32_char_random_secret>
JWT_EXPIRY=3600
SITE_URL=https://yourdomain.com
CORS_ORIGIN=https://yourdomain.com
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=<your-email@gmail.com>
SMTP_PASSWORD=<gmail_app_password>
SMTP_FROM=noreply@yourdomain.com
```

### Frontend (2)
```
VITE_API_BASE_URL=https://yourdomain.com/api
NODE_ENV=production
```

### Optional (2)
```
GEMINI_API_KEY=<your-gemini-key>
LOG_LEVEL=info
```

---

## Step 5: Deploy (1 minute)

```
Click: Deploy

Wait for:
  🟢 PostgreSQL (ready)
  🟢 Backend (healthy)
  🟢 Frontend (running)

Done!
```

---

## ✅ Verify It Works (30 seconds)

```bash
# Test health check
curl https://yourdomain.com/api/health

# Should return:
{"status":"ok","timestamp":"...","environment":"production"}
```

Then open: `https://yourdomain.com` in browser

---

## 🚀 Next: Get Full Guide

[→ Read: COOLIFY_DOCKER_COMPOSE_GUIDE.md](COOLIFY_DOCKER_COMPOSE_GUIDE.md)

Covers:
- ✅ Detailed deployment walkthrough
- ✅ Troubleshooting
- ✅ Monitoring setup
- ✅ Backup automation
- ✅ Zero-downtime updates

---

## 🆘 If Something Goes Wrong

### "Services won't deploy"
→ Check Logs in Coolify dashboard

### "Frontend shows blank page"
→ Verify `VITE_API_BASE_URL` is correct

### "Backend can't connect to database"
→ Verify `DATABASE_URL` has correct password

### "Email not working"
→ Verify SMTP credentials (use Gmail app password)

---

## 🎉 You're Done!

Your TEIF app is now running on Coolify with:
- ✅ Automatic SSL/HTTPS
- ✅ Zero-downtime updates
- ✅ Automated backups (via backup-and-monitor.sh)
- ✅ Built-in health checks
- ✅ Production-grade security

**Next step:** Deploy your code! Push to main branch and Coolify redeploys automatically. 🚀
