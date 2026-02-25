# Shell Scripts Alignment Report — esbuild Flow

## Summary
✅ **All critical shell scripts have been aligned** with the new esbuild Docker workflow and docker-compose.prod.yml infrastructure.

---

## What Changed

### ❌ Old Approach
- Native Node.js on VPS
- pnpm build for each service
- tsc → ESM → .js.js double-extension bugs
- PM2 process manager
- Manual deployment complexity

### ✅ New Approach
- Docker containers (all services)
- esbuild ESM compilation (automatic .js handling)
- Pre-built images with docker-compose.prod.yml
- Stateless, reproducible deployments
- Simplified orchestration

---

## Updated Scripts

### 1. ✅ redeploy.sh
**Purpose:** Quick redeploy after code push  
**Status:** Updated for Docker

**Old Flow:**
```bash
git pull → pnpm install → pnpm build → pm2 restart → systemctl restart nginx
```

**New Flow:**
```bash
git reset → docker-compose down → docker build (esbuild) → docker-compose up -d → health check
```

**Key Changes:**
- Uses `docker build` instead of pnpm
- Uses `docker-compose` instead of PM2 + systemctl
- Automatic health checks integrated
- Cleaner error handling

**Command:**
```bash
bash redeploy.sh
```

---

### 2. ✅ test-build-dns.sh
**Purpose:** Build and test Docker images  
**Status:** Updated for esbuild

**Old Flow:**
```bash
docker compose build --no-cache → docker compose up
(Built inside container via Dockerfile)
```

**New Flow:**
```bash
git reset → docker build (esbuild) → Container startup test (ESM check) → docker compose up
```

**Key Changes:**
- Uses pre-build `docker build` with esbuild
- Includes ESM import verification
- Tests for .js.js double-extension errors
- Health check loop

**Command:**
```bash
bash test-build-dns.sh
```

---

### 3. ✅ verify-deployment.sh
**Purpose:** Pre-deployment verification  
**Status:** Already aligned ✓

**What it checks:**
- ✅ Image exists (teif-backend:latest)
- ✅ Container starts without ESM errors
- ✅ Config files present
- ✅ Environment variables set

**Usage:**
```bash
bash verify-deployment.sh
```

---

### 4. ✅ run-deployment-test.sh
**Purpose:** Complete deployment validation  
**Status:** Already aligned ✓

**What it validates:**
- ✅ Backend image exists
- ✅ Container startup (ESM verification)
- ✅ Configuration files
- ✅ Services start with docker-compose
- ✅ Services reach HEALTHY status
- ✅ Health endpoints respond 200 OK

**Usage:**
```bash
bash run-deployment-test.sh
```

---

### 5. ✨ NEW: FASTEST_DEPLOY_DOCKER.sh
**Purpose:** One-command production VPS deployment  
**Status:** Created (replaces old FASTEST_DEPLOY.sh)

**What it does:**
1. System dependencies (apt, Docker)
2. Repository clone
3. Environment setup (generate secrets)
4. Docker image build (esbuild)
5. Start services with docker-compose
6. Configure Nginx reverse proxy
7. Setup SSL certificate (Let's Encrypt)
8. Health verification

**Usage:**
```bash
bash FASTEST_DEPLOY_DOCKER.sh example.com https://github.com/org/teif.git
```

**Key Features:**
- Fully automated (single command)
- All-Docker approach (no pnpm, no PM2, no Node.js on host)
- Automatic SSL setup
- Health checks built-in

---

## Scripts NOT Updated (Reference Only)

| Script | Reason | Status |
|--------|--------|--------|
| `backup-and-monitor.sh` | Uses docker-compose (already compatible) | ✅ Compatible |
| `restore-backup.sh` | Backup utility (orthogonal to build) | ✅ Compatible |
| `VPS_COMMANDS_REFERENCE.sh` | Reference guide (informational) | ℹ️ For reference |
| `monitor-build.sh` | Build monitoring (created for last test) | ℹ️ Test utility |

---

## Alignment Matrix

| Requirement | redeploy.sh | test-build-dns.sh | FASTEST_DEPLOY_DOCKER.sh |
|-------------|-------------|-------------------|--------------------------|
| Uses esbuild | ✅ | ✅ | ✅ |
| Uses docker-compose | ✅ | ✅ | ✅ |
| ESM import checks | ✅ | ✅ | ✅ |
| Health verification | ✅ | ✅ | ✅ |
| No native Node.js | ✅ | ✅ | ✅ |
| No PM2 | ✅ | ✅ | ✅ |
| No pnpm build | ✅ | ✅ | ✅ |
| Supports production | ✅ | ✅ | ✅ |

---

## Migration Guide

### For Existing VPS (Using redeploy.sh)
```bash
# After pushing code to production branch:
ssh ubuntu@your-vps.com
cd /opt/teif
bash redeploy.sh
```

### For Fresh VPS (Using FASTEST_DEPLOY_DOCKER.sh)
```bash
# On fresh Ubuntu 24.04 VPS:
git clone https://github.com/org/teif.git /tmp/teif
cd /tmp/teif
sudo bash FASTEST_DEPLOY_DOCKER.sh example.com https://github.com/org/teif.git
```

### For Testing (Using test-build-dns.sh)
```bash
# On test server:
cd /opt/teif
bash test-build-dns.sh
```

---

## Key Technical Changes

### 1. **Compilation**
```
Old: pnpm --filter @teif/backend build (uses tsc)
New: docker build (uses esbuild via Dockerfile)
```

### 2. **ESM Import Handling**
```
Old: tsc → Node.js regex fix → .js.js errors ❌
New: esbuild → automatic correct .js extensions ✅
```

### 3. **Service Orchestration**
```
Old: PM2 + systemctl nginx + manual coordination
New: docker-compose.prod.yml with health checks
```

### 4. **Environment**
```
Old: .env in packages/backend/.env + nginx config separate
New: Single .env in project root + docker-compose reads it
```

---

## Verification Commands

### Check Current Script Status
```bash
# Verify redeploy.sh uses docker-compose
grep "docker-compose\|docker build" redeploy.sh | head -5

# Verify test-build-dns.sh includes ESM check
grep "\.js\.js\|cannot find module" test-build-dns.sh | head -2

# Verify FASTEST_DEPLOY_DOCKER.sh exists
ls -lh FASTEST_DEPLOY_DOCKER.sh
```

### Test Any Script Locally
```bash
# Dry-run redeploy (check syntax)
bash -n redeploy.sh

# Dry-run FASTEST_DEPLOY_DOCKER.sh (check syntax)
bash -n FASTEST_DEPLOY_DOCKER.sh
```

---

## Deployment Flow Chart

```
┌─────────────────────────────────────────────────────┐
│ Push to GitHub (production branch)                  │
└─────────────────────────────────────────────────────┘
                      ↓
┌─────────────────────────────────────────────────────┐
│ FRESH VPS                │  EXISTING VPS            │
├─────────────────────────────────────────────────────┤
│ bash FASTEST_DEPLOY_...  │  bash redeploy.sh        │
│ • Install Docker         │  • git reset --hard      │
│ • Clone repo             │  • docker build          │
│ • Generate secrets       │  • docker-compose up     │
│ • Build image (esbuild)  │  • Health check          │
│ • Setup Nginx            │                          │
│ • SSL certificate        │                          │
│ • Full deployment        │                          │
└─────────────────────────────────────────────────────┘
                      ↓
┌─────────────────────────────────────────────────────┐
│ docker-compose.prod.yml                             │
│ • postgres (port 5432, internal)                    │
│ • teif-backend (port 3000)                          │
│ • teif-frontend (port 80/443 via nginx)             │
└─────────────────────────────────────────────────────┘
                      ↓
┌─────────────────────────────────────────────────────┐
│ All services HEALTHY ✅                              │
│ • Database migrated ✅                              │
│ • Backend ESM imports correct ✅                    │
│ • Nginx reverse proxy working ✅                    │
│ • SSL active ✅                                      │
└─────────────────────────────────────────────────────┘
```

---

## Troubleshooting

### If redeploy.sh fails
```bash
# Check logs
docker-compose -f docker-compose.prod.yml logs -f backend

# Restart services
docker-compose -f docker-compose.prod.yml restart

# Full rebuild (if needed)
docker system prune -af --volumes
docker build --no-cache -f packages/backend/Dockerfile -t teif-backend:latest .
```

### If build takes too long
```bash
# Monitor progress
docker ps -a  # See running containers
df -h         # Check disk space
free -h       # Check memory
```

### If services don't start
```bash
# Check compose file
docker-compose -f docker-compose.prod.yml config

# Start with verbose output
docker-compose -f docker-compose.prod.yml up

# Check individual service
docker logs teif-backend
docker logs teif-postgres
```

---

## Summary

✅ **All shell scripts now align with:**
- esbuild ESM compilation
- docker-compose.prod.yml orchestration
- No native Node.js builds on VPS
- Automated health checks
- Production-ready deployments

✅ **Scripts ready for production:**
- `redeploy.sh` — Quick redeployment
- `test-build-dns.sh` — Build verification
- `FASTEST_DEPLOY_DOCKER.sh` — Fresh VPS setup
- `run-deployment-test.sh` — Full validation
- `verify-deployment.sh` — Pre-flight checks

**Status: All scripts aligned and production-ready ✅**

