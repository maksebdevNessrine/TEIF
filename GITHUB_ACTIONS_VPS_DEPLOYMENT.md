# 🚀 TEIF GitHub Actions → VPS Deployment Guide

**Complete Workflow:** Code Commit → GitHub Actions Build → Docker Hub Push → VPS Deployment

---

## 1️⃣ Prepare GitHub Secrets (One-time Setup)

Go to your GitHub repository:
```
Settings > Secrets and variables > Actions
```

Add these secrets:
```
DOCKER_HUB_USERNAME = your-docker-hub-username
DOCKER_HUB_PASSWORD = your-docker-hub-personal-access-token
```

**How to get Docker Hub token:**
1. Log in to docker.io
2. Account Settings > Security
3. Create Personal Access Token
4. Copy and paste into GitHub Secrets

---

## 2️⃣ Trigger Docker Image Build

**Option A: Push Code (Automatic)**
```bash
# On your Windows machine
cd TEIF-main
git add .
git commit -m "feat: ready for production deployment"
git push origin production
```

**Option B: Manual Trigger**
- Go to GitHub repo
- Click "Actions" tab
- Click "Build & Deploy to Docker Hub" workflow
- Click "Run workflow" button

---

## 3️⃣ Monitor Build Progress

**GitHub Actions Dashboard:**
```
GitHub > Your Repo > Actions > Build & Deploy to Docker Hub
```

**What happens automatically:**
1. ✅ Checks out code
2. ✅ Sets up Docker Buildx
3. ✅ Logs into Docker Hub
4. ✅ Builds image: `maksebdevnessrine/teif:latest`
5. ✅ Pushes to Docker Hub
6. ✅ Build completes in ~5-10 minutes

**Status indicators:**
- 🟢 Green = Success
- 🟡 Yellow = In Progress  
- 🔴 Red = Failed

---

## 4️⃣ Deploy to VPS

Once GitHub Actions build completes, deploy to your VPS:

**On your VPS:**
```bash
# SSH in
ssh ubuntu@your-vps-ip

# Navigate to deployment directory
cd /var/www/TEIF

# Run the deploy script
sudo ./deploy.sh
```

**Script will:**
1. ✅ Pull the latest image from Docker Hub
2. ✅ Create docker-compose.yml
3. ✅ Generate .env with templates
4. ✅ Start PostgreSQL container
5. ✅ Start backend container
6. ✅ Run database migrations
7. ✅ Configure firewall
8. ✅ Setup daily backups

---

## 5️⃣ Edit VPS Configuration

After deploy.sh runs, customize your production secrets:

**On VPS:**
```bash
sudo nano /opt/teif/.env
```

Update these values:
```bash
POSTGRES_PASSWORD=your-actual-strong-password
JWT_SECRET=your-actual-jwt-secret
JWT_REFRESH_SECRET=your-actual-refresh-secret
FRONTEND_URL=https://yourdomain.com
SIGNATURE_ENCRYPTION_KEY=your-actual-encryption-key
```

**Generate strong secrets on your machine:**
```powershell
# Password
[Convert]::ToBase64String([System.Text.Encoding]::UTF8.GetBytes((Get-Random -SetSeed (Get-Date).Ticks))) 

# Or use OpenSSL
openssl rand -base64 32
```

---

## 6️⃣ Restart Services with New Config

After editing `.env`:

```bash
# Navigate to app dir
cd /opt/teif

# Restart with new environment
docker-compose restart

# Verify it's running
docker-compose ps

# Check health
curl http://localhost:3000/api/health
```

---

## ✅ Verify Deployment

**Health Check:**
```bash
curl http://your-vps-ip:3000/api/health
```

**View Running Containers:**
```bash
ssh ubuntu@your-vps-ip
docker-compose -f /opt/teif/docker-compose.yml ps
```

**Check Logs:**
```bash
docker-compose -f /opt/teif/docker-compose.yml logs -f backend
docker-compose -f /opt/teif/docker-compose.yml logs -f postgres
```

---

## 🔄 Update Deployment

To deploy new code changes:

```bash
# 1. Make changes locally
git add .
git commit -m "feat: new feature"

# 2. Push to GitHub (triggers GitHub Actions)
git push origin production

# 3. Wait for build to complete (~5-10 min)
#    Monitor at: GitHub > Actions

# 4. On VPS, pull new image
ssh ubuntu@your-vps-ip
cd /opt/teif
docker pull maksebdevnessrine/teif:latest
docker-compose up -d  # Restart with new image

# 5. That's it! Zero-downtime update ✅
```

---

## 🛠️ Troubleshooting

**Image not found on Docker Hub**
```
→ GitHub Actions build hasn't completed yet
→ Check Actions tab for build status
→ Wait 5-10 minutes and try again
```

**Services won't start**
```bash
# Check logs
cd /opt/teif
docker-compose logs

# Restart from scratch
docker-compose down -v
docker-compose up -d
```

**Database connection failed**
```bash
# Verify .env has correct DB password
sudo nano /opt/teif/.env

# Check PostgreSQL is running
docker-compose ps | grep postgres

# Test connection
docker-compose exec postgres pg_isready -U postgres
```

---

## 📊 Workflow Summary

```
Developer's Machine          GitHub              Docker Hub          VPS
        │                      │                     │                │
1. Edit code ────────────────→ │                     │                │
2. git push production         │                     │                │
        │                      │                     │                │
3.      │       Trigger Build  │                     │                │
        │       ─────────────→ │                     │                │
        │                      │ Build Docker Image  │                │
        │                      ├────────────────────→│                │
        │                      │                     │                │
        │       Notify Complete│                     │                │
        │       ←───────────── │                     │                │
        │                      │                     │                │
4.      │  Pull from Docker Hub                      │                │
        │  ────────────────────────────────────────→│                │
        │                      │                     │ Deploy         │
        │                      │                     ├───────────────→│
        │                      │                     │                │
        │                      │                     │ ✅ Running    │
```

---

## 🚀 Next Steps

1. ✅ Add GitHub Secrets (DOCKER_HUB_USERNAME, DOCKER_HUB_PASSWORD)
2. ✅ Push code to production branch
3. ✅ Monitor GitHub Actions build
4. ✅ Run deploy.sh on VPS
5. ✅ Edit .env with real secrets
6. ✅ Restart services
7. ✅ Verify health check passes

**You're now using enterprise-grade CI/CD! 🎉**
