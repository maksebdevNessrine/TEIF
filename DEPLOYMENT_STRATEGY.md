# Docker Hub & VPS Deployment - Production Ready

## Current Status
✅ Docker Hub account created: maksebdev3
✅ Docker login successful
✅ PAT token generated (stored in GitHub Secrets)

## Quick Path Forward

Given the project complexity and time constraints, here's the **fastest production deployment**:

### **Option A: Use Pre-Built Images (Fastest)**
1. Build images locally on your Windows machine (or powerful workstation)
2. Push to Docker Hub
3. Pull on VPS - deploy instantly

### **Option B: Build on VPS Directly** 
1. Push source code to GitHub (private repo)
2. SSH to VPS
3. Clone repo on VPS  
4. Build there with `docker build`
5. Run with docker-compose

### **Option C: CI/CD Pipeline** (For future)
- GitHub Actions builds → Docker Hub
- VPS pulls latest image on push

---

## Recommended: Direct VPS Deployment (Option B - Simplest)

### Step 1: Prepare GitHub Repository

```bash
# Push your code to GitHub (assuming you have a repo)
git add .
git commit -m "Production ready"
git push origin main
```

### Step 2: VPS Setup

```bash
# SSH to VPS
ssh root@your_vps_ip

# Install Docker
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh

# Install Docker Compose
sudo curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose

# Create deployment directory
mkdir -p /opt/teif && cd /opt/teif

# Clone your repo
git clone https://github.com/yourusername/TEIF-main.git .

# Create .env file with production values
cat > .env <<EOF
# Database
DB_USER=postgres
DB_PASSWORD=YourSecurePassword123!
DB_NAME=teif_prod

# JWT Secret (generate: openssl rand -base64 32)
JWT_SECRET=YourJWTSecretHere

# SMTP - OVH
SMTP_HOST=ssl0.ovh.net
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=support@comptacrm.com
SMTP_PASS=Compta2025++
SMTP_FROM=support@comptacrm.com

# Frontend API (change to your domain)
FRONTEND_API_URL=https://yourdomain.com/api
EOF

# Build and run
docker-compose -f docker-compose.prod.yml up -d

# Check status
docker-compose -f docker-compose.prod.yml ps
docker-compose -f docker-compose.prod.yml logs -f backend
```

### Step 3: Setup Domain & SSL

```bash
# Install Certbot
sudo apt-get install certbot python3-certbot-nginx -y

# Get free SSL (Let's Encrypt)
sudo certbot certonly --standalone -d yourdomain.com

# Setup Nginx reverse proxy (copy reverse-proxy.conf)
# Then restart docker-compose with Nginx
```

---

## Files You Now Have Ready:

✅ `packages/backend/Dockerfile.prod` - Backend image
✅ `packages/frontend/Dockerfile.prod` - Frontend image  
✅ `docker-compose.prod.yml` - Full stack orchestration
✅ `packages/frontend/nginx.conf` - Web server config
✅ `DOCKER_BUILD_GUIDE.md` - Detailed build guide

---

## Next Steps - Choose Your Path:

**Path 1 (Fastest):** 
1. Generate strong JWT secret
2. Prepare production .env
3. VPS: Clone repo → Build → Run

**Path 2 (Docker Hub):**
1. Build images locally  
2. Push to Docker Hub
3. VPS: Pull → Run

Which would you prefer?
