# 🚀 TEIF Deployment - Quick Reference Card

## 📖 Complete Flow Overview

```
Development
    ↓
Git Push to 'production' branch
    ↓
GitHub Actions CI/CD Triggers
    ├─ Build Docker image
    ├─ Run tests (optional)
    └─ Push to Docker Hub
    ↓
Image Available on Docker Hub
    ↓
Deploy to VPS (Manual or Webhook)
    ├─ Pull latest image
    └─ Restart services
    ↓
Production: Service Running ✅
```

---

## 🎯 Quick Start (5 Minutes)

### Option 1: Fresh VPS (Automated)
```bash
# On your local machine
ssh root@your-vps-ip

# Run this ONE command:
curl -fsSL https://raw.githubusercontent.com/YOUR_ORG/TEIF/main/deploy.sh | bash

# Done! Services should be running
docker-compose ps
```

### Option 2: Using Make Commands
```bash
# Setup secrets
make generate-secrets

# Deploy
make VPS_IP=your-vps-ip deploy-vps

# Check status
make VPS_IP=your-vps-ip status-vps
```

---

## 🛠️ Common Operations

### Deploy New Version
```bash
# Option A: Automatic (CI/CD)
git commit -m "feat: new feature"
git push origin production
# → Automatically builds and pushes to Docker Hub

# Option B: Manual
make build-local push
make VPS_IP=your-vps-ip deploy-vps
```

### View Logs
```bash
# Backend logs
make VPS_IP=your-vps-ip logs

# Database logs
make VPS_IP=your-vps-ip logs-db

# All logs
make VPS_IP=your-vps-ip logs-all
```

### Restart Services
```bash
make VPS_IP=your-vps-ip restart-vps
```

### Database Backup
```bash
make VPS_IP=your-vps-ip backup-vps
```

### Check Health
```bash
make VPS_IP=your-vps-ip health-vps
curl http://your-vps-ip:3000/api/health
```

---

## 📋 Pre-Deployment Checklist

- [ ] GitHub Secrets configured (`DOCKER_HUB_USERNAME`, `DOCKER_HUB_PASSWORD`)
- [ ] `.env` file on VPS has all secrets (not placeholders)
- [ ] VPS can SSH connection
- [ ] Disk space available: `df -h`
- [ ] GitHub Actions workflow exists: `.github/workflows/docker-build-push.yml`

---

## 🔐 Secrets Setup

### Generate Strong Passwords
```bash
# Generate 32-char secret
openssl rand -base64 32

# Generate 64-char encryption key
openssl rand -hex 64
```

### GitHub Secrets
```
1. Go to: Repository Settings → Secrets and variables → Actions
2. Add:
   - DOCKER_HUB_USERNAME
   - DOCKER_HUB_PASSWORD (personal access token, not password)
```

### VPS .env File
```
POSTGRES_PASSWORD=use_generated_secret_from_openssl
JWT_SECRET=use_generated_secret_from_openssl  
JWT_REFRESH_SECRET=use_generated_secret_from_openssl
SIGNATURE_ENCRYPTION_KEY=use_generated_hex_from_openssl
FRONTEND_URL=https://yourdomain.com
```

---

## 🆘 Troubleshooting Quick

| Problem | Solution |
|---------|----------|
| Services won't start | `docker-compose logs` |
| Port already in use | `sudo lsof -i :3000` |
| Database errors | `docker-compose logs postgres` |
| Out of disk | `docker image prune -a && docker volume prune` |
| Can't pull image | Check Docker Hub credentials & image name |
| Slow performance | `docker stats` to check resource usage |

---

## 📁 Important Files

```
/opt/teif/
├── .env                   ← Secrets (NEVER commit)
├── docker-compose.yml     ← Service configuration
├── backup.sh             ← Database backup utility
├── logs/                 ← Application logs
└── backups/              ← Database backups (daily)
```

---

## 🔄 CI/CD Pipeline Status

Check your GitHub Actions:
```
GitHub → Actions tab → docker-build-push workflow
```

**Status indicators:**
- 🟢 Green = Successful build & push
- 🔴 Red = Build failed
- 🟡 Yellow = In progress

---

## 📞 Commands Cheat Sheet

### Local Development
```bash
pnpm install          # Install dependencies
pnpm dev              # Start backend
docker build . -t teif # Build Docker image
docker run teif       # Test image locally
```

### Docker Hub
```bash
docker push IMAGE     # Push to Docker Hub
docker pull IMAGE     # Pull from Docker Hub
```

### VPS Management
```bash
make VPS_IP=1.2.3.4 deploy-vps       # Deploy to VPS
make VPS_IP=1.2.3.4 status-vps       # Check status
make VPS_IP=1.2.3.4 logs             # View logs
make VPS_IP=1.2.3.4 restart-vps      # Restart services
make VPS_IP=1.2.3.4 backup-vps       # Backup database
make VPS_IP=1.2.3.4 clean-vps        # Clean up Docker
```

### Manual SSH Commands
```bash
# SSH to VPS
ssh root@your-vps-ip

# Check status
cd /opt/teif && docker-compose ps

# View logs
docker-compose logs -f backend

# Restart
docker-compose restart

# Update image
docker pull maksebdev3/teif:latest && docker-compose up -d

# Database backup
./backup.sh
```

---

## 🚨 Emergency Procedures

### Rollback to Previous Version
```bash
# 1. Stop current version
docker-compose down

# 2. Pull previous version
docker pull maksebdev3/teif:previous-sha

# 3. Update docker-compose.yml to use previous version
# 4. Restart
docker-compose up -d
```

### Recover Database
```bash
# 1. Find backup file
ls -la /opt/teif/backups/

# 2. Restore
gunzip < /opt/teif/backups/backup_LATEST.sql.gz | \
  docker exec -i teif-postgres psql -U postgres -d teif_prod
```

### Clear Stuck Services
```bash
# Stop everything
docker-compose down -v

# Clean images
docker image prune -a

# Restart
docker-compose up -d
```

---

## 📊 Resources

- **Deployment Guide:** `DEPLOYMENT_GUIDE.md`
- **Checklist:** `DEPLOYMENT_CHECKLIST.md`
- **Dockerfile:** `Dockerfile`
- **Compose Config:** `docker-compose.yml`
- **CI/CD Workflow:** `.github/workflows/docker-build-push.yml`

---

## 💡 Pro Tips

1. **Test locally first:**
   ```bash
   docker build -t teif:test .
   docker run teif:test
   ```

2. **Use semantic versioning:**
   ```bash
   git tag v1.0.0
   git push --tags
   ```

3. **Monitor in real-time:**
   ```bash
   watch -n 1 'docker stats'
   ```

4. **Setup alerts:**
   - Uptime monitoring (UptimeRobot, Pingdom)
   - Error tracking (Sentry, Rollbar)
   - Performance (NewRelic, Datadog)

5. **Document your domain:**
   ```bash
   # Update FRONTEND_URL in .env
   FRONTEND_URL=https://your-production-domain.com
   ```

---

## ✅ Success Indicators

After deployment, verify:

```bash
# 1. Services running
docker-compose ps
# Expected: All containers "Up"

# 2. Health check
curl http://your-vps-ip:3000/api/health
# Expected: 200 OK with JSON response

# 3. Logs clean
docker-compose logs backend | tail -20
# Expected: No ERROR entries, only INFO/WARN

# 4. Database connected
docker-compose logs postgres | tail -5
# Expected: "database system is ready to accept connections"

# 5. No recent restarts
docker inspect teif-backend | grep RestartCount
# Expected: Low or 0
```

---

**🎉 Your deployment is ready!**

For detailed troubleshooting, see `DEPLOYMENT_GUIDE.md`
