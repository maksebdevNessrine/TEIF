# Docker Hub Deployment Strategy - Step by Step

## Prerequisites Completed ✅
- Docker Hub account: **maksebdev3**
- Docker login: **Successful**
- PAT Token: **Available**

---

## Phase 1: Build & Push to Docker Hub (Local Machine)

### Step 1: Build Backend Image

```powershell
# Navigate to project root
cd c:\Users\Makseb-DEV-05\Downloads\TEIF-main

# Build backend image
docker build `
  --file packages/backend/Dockerfile.prod `
  --tag maksebdev3/teif-backend:latest `
  .

# Tag for version (optional)
docker tag maksebdev3/teif-backend:latest maksebdev3/teif-backend:v1.0
```

### Step 2: Build Frontend Image

```powershell
# Build frontend image
docker build `
  --file packages/frontend/Dockerfile.prod `
  --tag maksebdev3/teif-frontend:latest `
  .

# Tag for version (optional)
docker tag maksebdev3/teif-frontend:latest maksebdev3/teif-frontend:v1.0
```

### Step 3: Verify Images Built Successfully

```powershell
# List your images
docker images | Select-String "maksebdev3"

# Should see:
# maksebdev3/teif-backend    latest    xxx    xx
# maksebdev3/teif-frontend   latest    xxx    xx
```

### Step 4: Push to Docker Hub

```powershell
# You're already logged in (docker login -u maksebdev3)

# Push backend
docker push maksebdev3/teif-backend:latest
docker push maksebdev3/teif-backend:v1.0

# Push frontend
docker push maksebdev3/teif-frontend:latest
docker push maksebdev3/teif-frontend:v1.0
```

### Step 5: Verify on Docker Hub

Visit:
- https://hub.docker.com/r/maksebdev3/teif-backend
- https://hub.docker.com/r/maksebdev3/teif-frontend

You should see both images listed.

---

## Phase 2: VPS Deployment (Pull & Run)

### Step 1: SSH to VPS

```bash
# Replace with your VPS IP
ssh root@your_vps_ip
```

### Step 2: Install Docker & Docker Compose

```bash
# Install Docker
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh

# Add current user to docker group (optional)
sudo usermod -aG docker $USER

# Install Docker Compose
sudo curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose

# Verify installations
docker --version
docker-compose --version
```

### Step 3: Create Deployment Directory & Config

```bash
# Create directory
mkdir -p /opt/teif
cd /opt/teif

# Download docker-compose.prod.yml from your repo
# Option A: Copy from local
scp docker-compose.prod.yml root@your_vps_ip:/opt/teif/

# Option B: Create manually with nano
# nano docker-compose.prod.yml
# (paste the content)
```

### Step 4: Create Production .env File

```bash
cat > /opt/teif/.env <<'EOF'
# Database Configuration
DB_USER=postgres
DB_PASSWORD=GenerateStrongPassword123!@#
DB_NAME=teif_prod

# JWT Secret (generate: openssl rand -base64 32)
JWT_SECRET=your-generated-jwt-secret-here

# SMTP Configuration (OVH)
SMTP_HOST=ssl0.ovh.net
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=support@comptacrm.com
SMTP_PASS=Compta2025++
SMTP_FROM=support@comptacrm.com

# Frontend API URL (update with your domain)
FRONTEND_API_URL=http://your_vps_ip:3000/api
# OR with domain:
# FRONTEND_API_URL=https://yourdomain.com/api
EOF
```

### Step 5: Pull and Start Services

```bash
cd /opt/teif

# Pull images from Docker Hub
docker-compose -f docker-compose.prod.yml pull

# Start all services
docker-compose -f docker-compose.prod.yml up -d

# Check status
docker-compose -f docker-compose.prod.yml ps

# View logs
docker-compose -f docker-compose.prod.yml logs -f
```

### Step 6: Verify Services Are Running

```bash
# Wait 30 seconds for startup
sleep 30

# Check health
curl http://localhost/health          # Frontend
curl http://localhost:3000/health     # Backend

# Check full status
docker-compose -f docker-compose.prod.yml ps
```

---

## Phase 3: Configure Domain & SSL (Optional)

```bash
# Install Certbot
sudo apt-get update
sudo apt-get install certbot -y

# Get SSL certificate
sudo certbot certonly --standalone -d yourdomain.com -d www.yourdomain.com

# Update DNS to point to VPS IP
# On your domain registrar:
# A record: yourdomain.com → your_vps_ip
# A record: www.yourdomain.com → your_vps_ip

# Update .env
# FRONTEND_API_URL=https://yourdomain.com/api
```

---

## Managing Services on VPS

### View Logs
```bash
# All services
docker-compose -f docker-compose.prod.yml logs -f

# Specific service
docker-compose -f docker-compose.prod.yml logs -f backend
docker-compose -f docker-compose.prod.yml logs -f frontend
docker-compose -f docker-compose.prod.yml logs -f postgres
```

### Stop Services
```bash
docker-compose -f docker-compose.prod.yml stop
```

### Restart Services
```bash
docker-compose -f docker-compose.prod.yml restart
```

### Update to Latest Image
```bash
docker-compose -f docker-compose.prod.yml pull
docker-compose -f docker-compose.prod.yml up -d
```

### View Database
```bash
docker-compose -f docker-compose.prod.yml exec postgres psql -U postgres -d teif_prod

# Inside psql:
# \dt - list tables
# \q - quit
```

---

## Troubleshooting

### Container won't start
```bash
docker-compose -f docker-compose.prod.yml logs backend
# Check error messages and environment variables
```

### Database connection failed
```bash
# Check if postgres is running
docker-compose -f docker-compose.prod.yml ps postgres

# Test connection
docker-compose -f docker-compose.prod.yml exec postgres pg_isready
```

### Images not pulling
```bash
# Check Docker Hub login on VPS
docker login -u maksebdev3

# Then retry
docker-compose -f docker-compose.prod.yml pull
```

### Port conflicts
```bash
# Check what's using ports
sudo netstat -tlnp | grep 80
sudo netstat -tlnp | grep 3000
sudo netstat -tlnp | grep 5432
```

---

## API Endpoints

After deployment, your services will be at:

| Service | URL |
|---------|-----|
| Frontend | http://your_vps_ip |
| Backend API | http://your_vps_ip:3000 |
| Database | localhost:5432 (internal only) |

---

## Files Needed in /opt/teif/

```
/opt/teif/
├── docker-compose.prod.yml  (provided)
├── .env                      (create with values above)
└── .env.backup              (optional - backup)
```

---

## Next Steps

1. **Build images locally** (PowerShell)
2. **Push to Docker Hub** (PowerShell)
3. **SSH to VPS** (Terminal)
4. **Pull & Deploy** (Bash on VPS)

Ready? Start with Step 1 and I'll help troubleshoot if needed!
