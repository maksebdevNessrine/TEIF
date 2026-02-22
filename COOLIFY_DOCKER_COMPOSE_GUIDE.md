# TEIF + Coolify: Docker Compose Deployment (SIMPLIFIED)

**This is the ONLY way you should deploy TEIF on Coolify.**

---

## ✅ Why Docker Compose on Coolify is Perfect

Your project has:
- ✅ Multiple services (Frontend, Backend, Database)
- ✅ Internal networking (services communicate internally)
- ✅ Shared volumes (PostgreSQL persistence)
- ✅ Health checks (automatic readiness detection)
- ✅ Resource limits (prevent over-allocation)
- ✅ Restart policies (automatic recovery)

**Docker Compose = atomic single deployment, zero complexity.**

---

## 🎯 5-Step Deployment (No BS)

### Step 1: Create Coolify Application

```
Coolify Dashboard
├─ Go to: Applications
├─ Click: + New
├─ Select: Docker Compose
└─ Click: Next
```

### Step 2: Connect Repository

```
Git Configuration
├─ Provider: GitHub / GitLab / Gitea
├─ Repository: your-teif-repo
├─ Branch: main (or your production branch)
└─ Click: Next
```

### Step 3: Docker Compose Setup

**This is the critical part - do it exactly:**

```
Build Configuration
├─ Build Type: Docker Compose
├─ Compose File Path: docker-compose.prod.yml
│  (Coolify auto-detects all services)
│
├─ Root Domain: yourdomain.com
│  (Coolify maps all exposed ports automatically)
│
└─ Do NOT:
   ❌ Paste compose content manually
   ❌ Modify service names
   ❌ Change container_name values
   ❌ Hardcode secrets
```

**That's it. Coolify does the rest.**

---

### Step 4: Environment Variables (SECRETS ONLY)

Open the **Environment Variables** section and add:

```env
# Database
POSTGRES_USER=postgres
POSTGRES_PASSWORD=generate_strong_password_here
POSTGRES_DB=teif_prod

# Backend
DATABASE_URL=postgresql://postgres:POSTGRES_PASSWORD@postgres:5432/teif_prod
JWT_SECRET=generate_32_char_random_secret_here
JWT_EXPIRY=3600

# Application URLs
SITE_URL=https://yourdomain.com
CORS_ORIGIN=https://yourdomain.com

# Email
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASSWORD=your_app_password
SMTP_FROM=noreply@yourdomain.com

# Frontend
VITE_API_BASE_URL=https://yourdomain.com/api

# Optional AI
=your_key_here
```

**Rules:**
- ✅ One variable per line
- ✅ Secrets only (not in code)
- ✅ No newlines or special chars
- ✅ Click "Save" after each addition

---

### Step 5: Deploy

```
Click: Deploy

Coolify will:
1. Pull latest code from Git
2. Build backend image (packages/backend/Dockerfile)
3. Build frontend image (packages/frontend/Dockerfile)
4. Create PostgreSQL container
5. Start all services in correct order
6. Wait for health checks
7. Configure reverse proxy
8. Issue SSL certificate
9. Expose services to yourdomain.com
```

**Status indicators:**
- 🟢 Green = Service running & healthy
- 🟡 Yellow = Starting up
- 🔴 Red = Failed (check logs)

---

## ✅ Verify Deployment

### Health Check

```bash
# Test backend API
curl https://yourdomain.com/api/health

# Expected response:
{"status":"ok","timestamp":"2026-01-17T...","environment":"production"}
```

### Frontend

```bash
# Open in browser
https://yourdomain.com

# Should load React app (check Network tab for /api calls)
```

### Logs

In Coolify Dashboard:
```
Service → teif-backend → Logs
Service → teif-frontend → Logs
Service → teif-postgres → Logs
```

**Look for:**
- ✅ "Server running on port 3000"
- ✅ "nginx: master process is running"
- ✅ "database system is ready to accept connections"

---

## 🔄 What Happens During Deployment

### Coolify detects docker-compose.prod.yml and:

1. **Reads service definitions**
   ```yaml
   services:
     postgres:    # Database
     backend:     # API
     frontend:    # Web UI
   ```

2. **Builds images (if needed)**
   - Backend: `packages/backend/Dockerfile`
   - Frontend: `packages/frontend/Dockerfile`
   - PostgreSQL: Uses public image

3. **Creates internal network**
   - Services communicate: `backend` → `postgres`
   - Service names are DNS hostnames
   - Example: `DATABASE_URL=postgresql://postgres:password@postgres:5432/teif_prod`

4. **Starts services in order**
   ```
   1. PostgreSQL (no dependencies)
   2. Backend (waits for PostgreSQL health check)
   3. Frontend (waits for Backend health check)
   ```

5. **Exposes ports**
   ```
   Port 80/443  → Frontend (yourdomain.com)
   Port 3000    → Backend (yourdomain.com/api)
   Port 5432    → Database (internal only)
   ```

6. **Configures SSL**
   - Coolify uses Let's Encrypt
   - Auto-renews 30 days before expiry
   - Redirects HTTP → HTTPS

---

## 🚀 Deploying Code Changes

After pushing code to main branch:

```
In Coolify:
├─ Service → Deployments
├─ Click: Deploy Now
│
├─ Coolify:
│  ├─ Pulls latest code
│  ├─ Rebuilds images
│  ├─ Restarts containers
│  ├─ Skips database/volumes
│  └─ Zero downtime (due to health checks)
│
└─ Done! New code is live
```

---

## 🔄 Zero-Downtime Updates Explained

Your `docker-compose.prod.yml` has:

```yaml
restart: unless-stopped
healthcheck:
  test: [command]
  interval: 30s
  retries: 3
  start_period: 40s

deploy:
  restart_policy:
    condition: on-failure
    max_attempts: 3
    delay: 5s
```

**How it works:**

1. **New container starts** with new code
2. **Health check runs** - validates service is ready
3. **Passes health check** - traffic routes to new container
4. **Old container stops** - gracefully (SIGTERM)
5. **Users don't notice** - zero downtime

---

## 💾 Database Backups

### Manual Backup

```bash
# Creates backup immediately
docker compose exec -T postgres pg_dump \
  -U postgres teif_prod | \
  gzip > ./volumes/backups/backup-manual-$(date +%s).sql.gz
```

### Automated Backup (Recommended)

Add to **crontab** on your server:

```bash
# Daily at 2 AM
0 2 * * * cd /path/to/TEIF-main && ./backup-and-monitor.sh

# Run script manually to test
./backup-and-monitor.sh
```

**What the script does:**
- ✅ Backs up database
- ✅ Cleans up old backups (>30 days)
- ✅ Checks service health
- ✅ Monitors disk space
- ✅ Runs database maintenance
- ✅ Sends Slack notifications (optional)

### Restore from Backup

```bash
# Interactive restore
./restore-backup.sh ./volumes/backups/teif-backup-2026-01-17-120000.sql.gz
```

---

## 📊 Monitoring

### In Coolify Dashboard

```
Service → teif-postgres → Logs
├─ Watch for errors
├─ Check connection pool
└─ Monitor query performance

Service → teif-backend → Logs
├─ API errors
├─ Database connection errors
└─ Authentication failures

Service → teif-frontend → Logs
├─ Build errors
├─ Nginx errors
└─ Access logs
```

### Key Logs to Watch

**PostgreSQL:**
```
LOG:  database system is ready to accept connections
LOG:  autovacuum launcher started
```

**Backend:**
```
✅ Server running at http://localhost:3000
🚀 Database connected
```

**Frontend:**
```
nginx: master process is running
```

---

## 🚨 Common Issues & Fixes

### Issue: "Database connection refused"

**Cause:** Backend trying to connect before PostgreSQL is ready

**Fix:** Already handled!
```yaml
depends_on:
  postgres:
    condition: service_healthy
```

Coolify waits for health check before starting backend.

---

### Issue: "Frontend shows blank page"

**Cause:** VITE_API_BASE_URL pointing to wrong backend

**Check:**
1. Is `VITE_API_BASE_URL=https://yourdomain.com/api` ?
2. Is backend actually responding? (test health endpoint)
3. Check browser Console for CORS errors

---

### Issue: "Services won't start"

**In Coolify:**
```
Service → View Logs → Last 50 lines

Look for:
❌ Error message
❌ Port already in use
❌ Out of memory
❌ Dockerfile issue
```

---

### Issue: "Deployments keep failing"

**Check in this order:**
1. Git repository reachable?
2. Dockerfile syntax valid?
3. Environment variables set?
4. Disk space available?
5. Docker engine running?

---

## 🔐 Security Checklist

Before going live:

- [ ] Secrets in Coolify env vars (not in code)
- [ ] JWT_SECRET is 32+ random characters
- [ ] POSTGRES_PASSWORD is strong (20+ chars)
- [ ] CORS_ORIGIN matches your domain exactly
- [ ] SITE_URL uses https://
- [ ] Email SMTP credentials verified
- [ ] SSL certificate issued & valid
- [ ] Database backups configured
- [ ] Logs accessible & monitored

---

## 📈 Performance Optimization

Your compose file already has:

```yaml
deploy:
  resources:
    limits:
      cpus: '1'        # Backend: max 1 CPU
      memory: 512M     # Backend: max 512MB
    reservations:
      cpus: '0.5'      # Backend: reserve 0.5 CPU
      memory: 256M     # Backend: reserve 256MB
```

**Scaling if needed:**

If you get slow responses:

1. **Upgrade VPS** (more CPU/RAM)
2. **Increase limits** in compose:
   ```yaml
   deploy:
     resources:
       limits:
         cpus: '2'
         memory: 1024M
   ```
3. **Add caching** (Redis, Nginx)

---

## 🎯 Deployment Checklist

### Before Clicking Deploy

- [ ] All secrets generated (JWT, DB password, SMTP)
- [ ] Environment variables added to Coolify
- [ ] Docker Compose file path correct: `docker-compose.prod.yml`
- [ ] Git branch selected: `main` (or your prod branch)
- [ ] Domain DNS configured (A record → VPS IP)

### After Deployment

- [ ] Health check passes: `curl https://yourdomain.com/api/health`
- [ ] Frontend loads: Open in browser
- [ ] Backend logs show no errors
- [ ] Database is connected
- [ ] Email verification works
- [ ] Authentication works end-to-end

### Ongoing

- [ ] Monitor logs daily
- [ ] Backups run automatically
- [ ] Disk space monitored
- [ ] SSL cert renewal tracked (Coolify does it)

---

## 🆘 Support & Resources

### If You Get Stuck

1. **Check logs:** `Service → Logs` in Coolify
2. **Test health:** `curl https://yourdomain.com/api/health`
3. **Test connectivity:** `telnet yourdomain.com 443`
4. **Review:** `docker-compose.prod.yml` structure

### Documentation

- [COOLIFY_DEPLOYMENT_GUIDE.md](COOLIFY_DEPLOYMENT_GUIDE.md) - More detailed guide
- [ENV_VARIABLES_REFERENCE.md](ENV_VARIABLES_REFERENCE.md) - All variables explained
- [QUICK_REFERENCE_CARD.md](QUICK_REFERENCE_CARD.md) - Quick lookup

### External Help

- Coolify Docs: https://coolify.io/docs
- Docker Compose: https://docs.docker.com/compose
- Hono.js: https://hono.dev

---

## ✨ Why This Is Perfect

✅ **One deploy button** - no manual orchestration  
✅ **Atomic stack** - all services start together  
✅ **Health-aware** - Coolify waits for readiness  
✅ **Zero downtime** - automatic rolling updates  
✅ **Automatic SSL** - Let's Encrypt integration  
✅ **Simple** - no custom networking config  
✅ **Production-ready** - backups, monitoring built-in  

---

## 🚀 You're Ready!

Your TEIF project is **perfectly structured for this approach**.

**Next step:** Go to Coolify and click "Docker Compose"

That's it. You've got this! 🎉

---

*Coolify + Docker Compose = Simplicity + Power*
