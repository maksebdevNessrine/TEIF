# 🚀 TEIF Complete Production Deployment System

**Status: ✅ Production-Ready**

This is a complete, automated CI/CD and deployment system for TEIF that:
- 🤖 Automatically builds Docker images from code changes
- 📦 Pushes to Docker Hub
- 🖥️ Auto-deploys to any fresh VPS with one command
- 📊 Includes monitoring, backups, and health checks
- 🔐 Enterprise-grade security and best practices

---

## 📦 What's Included

### 1. GitHub Actions CI/CD Workflow
**File:** `.github/workflows/docker-build-push.yml`

Automatically:
- Builds Docker image on pull to `production` branch
- Runs tests (optional)
- Pushes image to Docker Hub
- Tags with commit SHA, branch name, and version tags

**Trigger:** Push to `production` branch or manual trigger

### 2. VPS Auto-Setup Script
**File:** `deploy.sh`

Completely automated Fresh VPS setup that:
- ✅ Installs Docker & Docker Compose
- ✅ Creates application directory
- ✅ Configures networking
- ✅ Starts all services
- ✅ Runs database migrations
- ✅ Configures firewall
- ✅ Sets up daily backups
- ✅ Configures log rotation

**Usage:** 
```bash
curl -fsSL https://raw.githubusercontent.com/YOUR_ORG/TEIF/main/deploy.sh | bash
```

### 3. Docker Configuration
**Files:**
- `Dockerfile` - Multi-stage production build
- `docker-compose.yml` - Service orchestration
- `.dockerignore` - Optimized build context

### 4. Documentation
- `DEPLOYMENT_GUIDE.md` - Complete step-by-step guide
- `DEPLOYMENT_CHECKLIST.md` - Pre-launch verification
- `QUICK_REFERENCE.md` - Quick commands and troubleshooting
- `Makefile` - Common operations as make targets
- `.env.example` - Environment template

---

## 🎯 Getting Started (3 Steps)

### Step 1: Configure GitHub (5 min)
```bash
# 1. Create Docker Hub personal access token:
#    docker.io > Account Settings > Personal access tokens

# 2. Add GitHub Secrets:
#    Settings > Secrets and variables > Actions
#    - DOCKER_HUB_USERNAME
#    - DOCKER_HUB_PASSWORD

# 3. Update workflow file with your Docker Hub username
```

### Step 2: Deploy to VPS (1 min)
```bash
# SSH to fresh Ubuntu 22.04 VPS
ssh root@your-vps-ip

# Run ONE command:
curl -fsSL https://raw.githubusercontent.com/YOUR_ORG/TEIF/main/deploy.sh | bash

# Done! Services running ✅
```

### Step 3: Deploy Updates (automated)
```bash
# Make code changes
git commit -m "feat: new feature"
git push origin production

# GitHub Actions automatically:
# 1. Builds Docker image
# 2. Pushes to Docker Hub
# 3. (Optional: Triggers VPS deployment)
```

---

## 📋 Complete Deployment Flow

```
Developer          GitHub              Docker Hub          VPS
   │                │                      │               │
   │ push code      │                      │               │
   ├───────────────→│                      │               │
   │                │ Trigger Actions      │               │
   │                ├──────────────────┐   │               │
   │                │ Build & Test     │   │               │
   │                ├──────────────────┤   │               │
   │                │ Push Image           │               │
   │                ├──────────────────→│  │               │
   │                │                   │  │ Pull & Deploy │
   │                │                   │  ├──────────────→│
   │                │                   │  │               │
   │                │                   │  │ Containers:   │
   │                │                   │  │ ✅ Backend    │
   │                │                   │  │ ✅ PostgreSQL │
   │                │                   │  │ ✅ Backups    │
   │                │                   │  │ ✅ Logs       │
```

---

## 🔄 AutoDeploy Options

### Option A: GitHub Actions Webhook (Auto)
```bash
# Configure on VPS:
# Webhook endpoint that pulls and restarts services
# Can use: Deploybot, Updater, or custom script
```

### Option B: Manual Deployment
```bash
# On VPS:
ssh root@your-vps-ip
cd /opt/teif
docker pull maksebdev3/teif:latest
docker-compose up -d
```

### Option C: CI/CD with Status Notification
```bash
# GitHub Actions posts to Slack/Teams when ready
# DevOps team pulls when approved
```

---

## 📊 Directory Structure

```
project-root/
├── .github/
│   └── workflows/
│       └── docker-build-push.yml    ← CI/CD automation
├── packages/
│   ├── backend/
│   ├── frontend/
│   └── shared/
├── Dockerfile                       ← Docker image def
├── docker-compose.yml              ← Service composition
├── Makefile                        ← Command shortcuts
├── deploy.sh                       ← VPS auto-setup
├── DEPLOYMENT_GUIDE.md             ← Complete docs
├── DEPLOYMENT_CHECKLIST.md         ← Verification
├── QUICK_REFERENCE.md              ← Quick help
└── .env.example                    ← Config template
```

**On VPS after setup:**
```
/opt/teif/
├── .env                            ← Production secrets
├── docker-compose.yml              ← Running config
├── backup.sh                       ← Backup utility
├── logs/                           ← Service logs
├── backups/                        ← Daily DB backups
└── data/                           ← Docker volumes
```

---

## 🛠️ Common Make Commands

```bash
# Local Development
make install              # Install dependencies
make dev                  # Start backend locally
make build-local          # Build Docker image
make test-image           # Test image locally

# Docker Hub
make push                 # Push image to Docker Hub
make pull                 # Pull latest image

# VPS Operations (use: make VPS_IP=1.2.3.4 <command>)
make VPS_IP=1.2.3.4 deploy-vps       # Deploy to VPS
make VPS_IP=1.2.3.4 status-vps       # Check status
make VPS_IP=1.2.3.4 logs             # View logs
make VPS_IP=1.2.3.4 restart-vps      # Restart services
make VPS_IP=1.2.3.4 backup-vps       # Backup database
make generate-secrets                 # Generate random secrets
```

See all commands: `make help`

---

## 🔐 Security Features

✅ **Automated**
- Database backups (daily, rotated 30 days)
- Log rotation (daily, compressed)
- Firewall configuration (SSH, HTTP(S), App port)
- Health checks (services auto-restart if down)
- SSL/TLS ready (integrate with Caddy/Nginx)

✅ **Manual**
- Strong password generation via `make generate-secrets`
- HTTP-only database access
- Environment secrets in `.env` (not in git)
- Secret rotation procedures
- Audit logging

---

## 📈 Monitoring & Maintenance

### Automated
- ✅ Daily database backups
- ✅ Log rotation
- ✅ Health checks each 30 seconds
- ✅ Auto-restart on failure

### Manual Checks
- Weekly: Review logs for errors
- Bi-weekly: Check disk usage
- Monthly: Review backups + test restore
- Quarterly: Security audit

### Commands
```bash
# Health check
curl http://your-vps-ip:3000/api/health

# Disk usage
ssh root@your-vps-ip "df -h"

# Docker stats
ssh root@your-vps-ip "docker stats"

# Log review
make VPS_IP=your-vps-ip logs | grep ERROR
```

---

## 🆘 Rollback Procedure

If something breaks after deployment:

```bash
# Option 1: Restart services (fixes most issues)
make VPS_IP=your-vps-ip restart-vps

# Option 2: Rollback to previous image
ssh root@your-vps-ip
cd /opt/teif
docker pull maksebdev3/teif:previous-sha-here
docker-compose pull
docker-compose up -d

# Option 3: Restore database from backup
./backup.sh  # List available backups
# Restore from backup...
```

---

## 🚀 Next Steps

1. **Update GitHub Secrets**
   ```
   Settings > Secrets > Add DOCKER_HUB_USERNAME & PASSWORD
   ```

2. **Update Workflow**
   ```bash
   # Edit .github/workflows/docker-build-push.yml
   # Change IMAGE_NAME to your Docker Hub username
   ```

3. **Test Locally**
   ```bash
   make build-local
   make test-image
   ```

4. **Deploy to VPS**
   ```bash
   # Fresh VPS
   curl -fsSL https://raw.githubusercontent.com/YOUR_ORG/TEIF/main/deploy.sh | bash
   
   # OR via Make
   make VPS_IP=1.2.3.4 setup-vps
   ```

5. **Verify**
   ```bash
   curl http://your-vps-ip:3000/api/health
   make VPS_IP=your-vps-ip status-vps
   ```

---

## 📚 Documentation Files

| File | Purpose |
|------|---------|
| `DEPLOYMENT_GUIDE.md` | Complete implementation guide |
| `DEPLOYMENT_CHECKLIST.md` | Pre-launch verification checklist |
| `QUICK_REFERENCE.md` | Quick commands & troubleshooting |
| `Makefile` | Executable commands with `make` |
| `.env.example` | Environment configuration template |

---

## 🎯 Architecture Decisions

- **Docker Multi-stage Build**: Smaller images, faster deployments
- **Docker Compose**: Single-file deployment config, easy management
- **Alpine Linux**: Minimal image size, fast startup
- **PostgreSQL in Container**: Data persistence with volumes
- **Automated Backups**: Daily backups with 30-day retention
- **Log Rotation**: Prevents disk usage growth
- **Health Checks**: Auto-restart failed services
- **Minimal Secrets**: Only what's necessary hardcoded

---

## ✅ Pre-Launch Checklist

- [ ] GitHub Secrets configured
- [ ] Workflow file updated with your Docker Hub username
- [ ] Docker image builds locally successfully
- [ ] VPS requirements met (Ubuntu 22.04+, 2GB+ RAM, 20GB+ disk)
- [ ] SSH key-based access to VPS configured
- [ ] All sensitive values in `.env`, not in code
- [ ] Database backups tested
- [ ] Health endpoint responds
- [ ] Logs monitored for errors
- [ ] Firewall rules configured
- [ ] SSL/HTTPS setup (optional but recommended)

---

## 📞 Support & Resources

- **Docker Docs**: https://docs.docker.com
- **GitHub Actions**: https://docs.github.com/actions
- **Docker Hub**: https://hub.docker.com
- **Ubuntu Docs**: https://ubuntu.com/server/docs

---

## 🎉 Success Metrics

After deployment, you should have:

1. ✅ **Automated CI/CD**: Code → Docker Hub in minutes
2. ✅ **One-Command VPS Setup**: Fresh server ready in < 10 minutes
3. ✅ **Zero-Downtime Deployments**: Services restart automatically
4. ✅ **Automated Backups**: Daily database snapshots
5. ✅ **Health Monitoring**: Services auto-restart if down
6. ✅ **Easy Rollback**: Previous versions available
7. ✅ **Production Ready**: Security, monitoring, logs included

---

**🚀 Your complete production deployment system is ready to go!**

For detailed instructions, see `DEPLOYMENT_GUIDE.md`
For quick reference, see `QUICK_REFERENCE.md`
