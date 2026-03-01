# WSL Deployment Plan: Docker Hub → Fresh Ubuntu 24.04

## Flow Summary
```
code ✅ → github ✅ → docker hub ✅ → wsl (NEXT)
```

**Status:**
- ✅ Code committed and pushed
- ✅ GitHub Actions CI/CD working (Run #14 successful)
- ✅ Docker images built and pushed to Docker Hub (maksebdev3/teif-backend:latest, maksebdev3/teif-frontend:latest)
- ⏳ WSL Fresh Deployment (planned)

---

## Prerequisites Check

### What We Have Ready:
1. **Docker images on Docker Hub** (built by GitHub Actions Run #14)
   - Backend: `maksebdev3/teif-backend:latest`
   - Frontend: `maksebdev3/teif-frontend:latest`

2. **Deployment configuration files**
   - `docker-compose.prod.yml` — Service orchestration
   - `.env.production` — Environment variables (production-ready)
   - `deploy-from-dockerhub.sh` — Automated deployment script ✅

3. **Deployment script coverage**
   - Pre-flight checks (Docker, Docker Compose installed)
   - Pull latest images from Docker Hub
   - Shutdown existing services (clean slate)
   - Start services with docker-compose.prod.yml
   - Health checks (PostgreSQL, Backend API, Frontend)
   - Verification and endpoint testing
   - Deployment summary

### What We Need to Do:

1. **Reset WSL to fresh Ubuntu 24.04**
   - Current WSL distro may have leftover containers, volumes, or configurations
   - Fresh start ensures clean deployment

2. **Install Docker & Docker Compose on fresh WSL**
   - Docker daemon setup
   - Verify daemon is running
   - Confirm docker-compose v2 installed

3. **Copy/Transfer deployment files to WSL**
   - docker-compose.prod.yml
   - .env.production
   - deploy-from-dockerhub.sh
   - Or clone repository into WSL

4. **Run deployment script**
   - Execute `bash deploy-from-dockerhub.sh`
   - Script handles everything: pull images, start services, verify health

5. **Validate full deployment**
   - All containers running
   - Services responding on expected ports
   - Database connectivity verified

---

## Detailed Execution Plan

### Phase 1: WSL Reset (PowerShell on Windows)
```powershell
# 1. Unregister current WSL instance
wsl --unregister Ubuntu

# 2. Install fresh Ubuntu 24.04 (if not already installed)
wsl --install -d Ubuntu-24.04
# Or from Microsoft Store: https://www.microsoft.com/store/apps/9NZ3FUJJN69S

# 3. Verify installation
wsl --list -v
# Should show: Ubuntu-24.04  Running  2

# 4. Launch WSL
wsl -d Ubuntu-24.04
```

### Phase 2: Docker Installation (Inside fresh WSL)
```bash
# 1. Update system
sudo apt update && sudo apt upgrade -y

# 2. Install Docker
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh
sudo usermod -aG docker $USER

# 3. Install Docker Compose (v2)
sudo curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" \
  -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose

# 4. Verify installation
docker --version
docker-compose --version
docker ps  # Should show "Cannot connect to Docker daemon" if daemon not running yet

# 5. Start Docker daemon
sudo service docker start
# Or if using systemd:
sudo systemctl start docker
sudo systemctl enable docker

# 6. Verify daemon is running
docker ps  # Should work now
```

### Phase 3: Deploy from Docker Hub (Inside WSL)
```bash
# 1. Navigate to project directory (or clone repo)
cd ~/teif
# OR clone fresh:
git clone https://github.com/your-repo/teif.git ~/teif && cd ~/teif

# 2. Ensure configuration files are present
ls -la docker-compose.prod.yml .env.production deploy-from-dockerhub.sh

# 3. Make deployment script executable
chmod +x deploy-from-dockerhub.sh

# 4. Run deployment
bash deploy-from-dockerhub.sh

# 5. Check running services
docker ps
docker compose -f docker-compose.prod.yml logs -f
```

### Phase 4: Verification
```bash
# 1. Verify all containers are running
docker ps | grep -E "teif-backend|teif-frontend|teif-postgres"

# 2. Check service logs
docker compose -f docker-compose.prod.yml logs backend
docker compose -f docker-compose.prod.yml logs frontend
docker compose -f docker-compose.prod.yml logs postgres

# 3. Test endpoints
curl http://localhost:3000/api/health      # Backend
curl http://localhost/                      # Frontend
curl -s http://localhost:3000/api/health | jq  # Pretty print

# 4. Verify database
docker compose -f docker-compose.prod.yml exec postgres \
  psql -U postgres -d teif_prod -c "SELECT version();"

# 5. Access application
# In browser: http://localhost (frontend)
# or from Windows: http://localhost (if WSL port forwarding enabled)
```

---

## Script: WSL Preparation (PowerShell)

We have `deploy-from-dockerhub.sh` which handles Phase 3 & 4 automatically.

For Phase 1 & 2, we can create a one-time PowerShell script:

**File:** `wsl-prepare.ps1`
```powershell
# WSL Preparation Script - Run once on Windows
# Reset WSL and install Docker

Write-Host "=== WSL Preparation ===" -ForegroundColor Cyan

# Step 1: Unregister old WSL
Write-Host "Unregistering current WSL instance..." -ForegroundColor Yellow
wsl --unregister Ubuntu -f 2>$null || Write-Host "No existing WSL found"

# Step 2: Install fresh Ubuntu
Write-Host "Installing fresh Ubuntu 24.04..." -ForegroundColor Yellow
wsl --install -d Ubuntu-24.04 -NoDistribution

# Step 3: Verify
Write-Host "Verifying installation..." -ForegroundColor Yellow
wsl --list -v

Write-Host "✓ WSL reset complete. Next steps:" -ForegroundColor Green
Write-Host "  1. Run: wsl -d Ubuntu-24.04"
Write-Host "  2. Inside WSL, run: curl -fsSL https://get.docker.com | sudo sh"
Write-Host "  3. Then run: bash deploy-from-dockerhub.sh"
```

---

## Execution Sequence

### Before Starting:
- ✅ Confirm GitHub Actions Run #14 completed (images on Docker Hub)
- ✅ Confirm docker-compose.prod.yml and .env.production exist
- ✅ Confirm deploy-from-dockerhub.sh is executable

### Step-by-Step:
1. **Windows PowerShell:** Run WSL reset
   ```powershell
   wsl --unregister Ubuntu
   wsl --install -d Ubuntu-24.04
   ```

2. **Inside fresh Ubuntu 24.04:**
   ```bash
   # Install Docker
   curl -fsSL https://get.docker.com | sudo sh
   sudo usermod -aG docker $USER
   docker ps  # Verify
   ```

3. **Inside Ubuntu 24.04:**
   ```bash
   # Deploy application
   cd ~/teif  # or wherever repository is
   bash deploy-from-dockerhub.sh
   ```

4. **Verify:**
   ```bash
   docker ps
   curl http://localhost:3000/api/health
   curl http://localhost/
   ```

---

## Rollback Plan

If deployment fails:

```bash
# Stop all services
docker compose -f docker-compose.prod.yml down -v

# Reset to state before deployment
wsl --unregister Ubuntu-24.04
wsl --install -d Ubuntu-24.04

# Or debug logs
docker compose -f docker-compose.prod.yml logs postgres
docker compose -f docker-compose.prod.yml logs backend
docker compose -f docker-compose.prod.yml logs frontend
```

---

## Success Criteria

✅ All tasks complete when:
1. WSL is running fresh Ubuntu 24.04
2. Docker daemon is running (verified: `docker ps`)
3. All 3 services are running (postgres, backend, frontend)
4. Frontend accessible at http://localhost
5. Backend health check passing: `curl http://localhost:3000/api/health`
6. Database connectivity verified

---

## Timeline Estimate

- WSL reset: ~5 minutes
- Docker installation: ~3 minutes
- Deploy from Docker Hub: ~2-3 minutes (image pull + service startup)
- Verification: ~2 minutes

**Total: ~12-15 minutes**

---

## Notes

- **Prerequisites already satisfied:** Docker images built and tested by GitHub Actions
- **Deployment script is comprehensive:** Handles pulls, startup, health checks, verification
- **No manual database setup needed:** Prisma migrations run automatically in backend container
- **WSL networking:** Port forwarding should work automatically (localhost:80, localhost:3000)

---

## Next Action

When ready to proceed, confirm:
1. Start with WSL reset (Phase 1)
2. Install Docker (Phase 2)
3. Run deploy-from-dockerhub.sh (Phase 3)
4. Verify all services (Phase 4)
