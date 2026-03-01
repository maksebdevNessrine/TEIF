# TEIF Production Deployment Guide

> Complete automated VPS setup + CI/CD pipeline with Docker Hub auto-deployment

## 🚀 Architecture Overview

```
┌─────────────────────┐
│   GitHub Actions    │
│  (CI/CD Workflow)   │
└──────────┬──────────┘
           │
           │ Build & Push
           ▼
┌─────────────────────┐
│   Docker Hub        │
│  (Image Registry)   │
└──────────┬──────────┘
           │
           │ Pull (Manual/Webhook)
           ▼
┌─────────────────────┐
│  Ubuntu VPS         │
│  (Production)       │
│  ├─ Docker Engine   │
│  ├─ PostgreSQL      │
│  └─ Backend API     │
└─────────────────────┘
```

## 📋 Prerequisites

### Local Development
- Node.js 20+
- pnpm 9+
- Docker Desktop
- Git

### VPS Requirements
- Ubuntu 22.04 LTS or later
- 2GB+ RAM (4GB recommended)
- 20GB+ disk space (SSD preferred)
- Static IP address
- Sudo/root access via SSH

### GitHub Secrets (Required)
```
DOCKER_HUB_USERNAME  → Your Docker Hub username
DOCKER_HUB_PASSWORD  → Your Docker Hub personal access token
```

## 🔧 Setup Instructions

### Step 1: GitHub Actions Setup

1. **Create Docker Hub Personal Access Token:**
   - Go to [Docker Hub Settings](https://hub.docker.com/settings/personal-access-tokens)
   - Create new token with "Read & Write" permissions
   - Copy the token

2. **Add GitHub Secrets:**
   - Go to your repository: Settings → Secrets and variables → Actions
   - Add these secrets:
     - `DOCKER_HUB_USERNAME`: Your Docker Hub username
     - `DOCKER_HUB_PASSWORD`: Your Docker Hub token (from step 1)

3. **Update Workflow File:**
   ```bash
   # Edit .github/workflows/docker-build-push.yml
   # Update IMAGE_NAME to match your Docker Hub username:
   # IMAGE_NAME: your_username/teif
   ```

### Step 2: Build & Test Locally

```bash
# Build Docker image locally
docker build -t teif:latest .

# Test the image
docker run -p 3000:3000 teif:latest
```

### Step 3: Deploy to VPS (Fresh Server)

**Option A: Automatic Setup (Recommended)**

```bash
# On your local machine or VPS, run:
curl -fsSL https://raw.githubusercontent.com/YOUR_ORG/TEIF/main/deploy.sh | bash

# Or manually:
ssh root@your-vps-ip
curl -fsSL https://raw.githubusercontent.com/YOUR_ORG/TEIF/main/deploy.sh -o deploy.sh
chmod +x deploy.sh
sudo ./deploy.sh
```

**Option B: Manual Setup**

```bash
# 1. SSH into your VPS
ssh root@your-vps-ip

# 2. Install Docker
curl -fsSL https://get.docker.com | sh

# 3. Install Docker Compose
curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
chmod +x /usr/local/bin/docker-compose

# 4. Create application directory
mkdir -p /opt/teif
cd /opt/teif

# 5. Download docker-compose.yml
wget https://raw.githubusercontent.com/YOUR_ORG/TEIF/main/docker-compose.yml

# 6. Create .env file with your secrets
nano .env
# Fill in all variables (see .env.example)

# 7. Start services
docker-compose up -d

# 8. Check status
docker-compose ps
docker-compose logs -f backend
```

### Step 4: Configure Environment Variables

Create `.env` file in `/opt/teif/` with your production secrets:

```env
# Database Configuration
POSTGRES_USER=postgres
POSTGRES_PASSWORD=your_strong_password_here_min_32_chars
POSTGRES_DB=teif_prod

# Backend Configuration  
NODE_ENV=production
PORT=3000

# JWT (Generate with: openssl rand -base64 32)
JWT_SECRET=your_jwt_secret_min_32_characters
JWT_REFRESH_SECRET=your_refresh_secret_min_32_characters
JWT_EXPIRES_IN=7d

# Frontend
FRONTEND_URL=https://yourdomain.com

# Digital Signature (Tunisia)
SIGNATURE_ENCRYPTION_KEY=0123456789abcdef0123456789abcdef0123456789abcdef0123456789abcdef

# Database Port
DB_PORT=5432
```

## 🔄 CI/CD Pipeline Workflow

### Automatic Deployment Flow

```
1. Developer pushes to 'production' branch
   ↓
2. GitHub Actions triggered
   ├─ Checkout code
   ├─ Setup Docker Buildx
   ├─ Login to Docker Hub
   ├─ Build Docker image
   └─ Push to Docker Hub
   ↓
3. Webhook notification (if configured)
   ↓
4. On VPS:
   docker pull maksebdev3/teif:latest
   docker-compose up -d
```

### Manual Deployment (If Webhook Not Configured)

```bash
# SSH to VPS
ssh root@your-vps-ip

cd /opt/teif

# Pull latest image
docker pull maksebdev3/teif:latest

# Restart services
docker-compose up -d

# Verify
docker-compose ps
curl http://localhost:3000/api/health
```

## 📊 Common Commands

### View Logs
```bash
cd /opt/teif

# Backend logs
docker-compose logs -f backend

# Database logs
docker-compose logs -f postgres

# All services
docker-compose logs -f
```

### Restart Services
```bash
cd /opt/teif

# Restart all
docker-compose restart

# Restart specific service
docker-compose restart backend
docker-compose restart postgres
```

### Database Backup
```bash
cd /opt/teif

# Run backup script
./backup.sh

# Or manually:
docker exec teif-postgres pg_dump -U postgres teif_prod | gzip > backup_$(date +%Y%m%d).sql.gz
```

### Database Restore
```bash
# Restore from backup
gunzip < backup_20260228.sql.gz | docker exec -i teif-postgres psql -U postgres -d teif_prod
```

### Update Image
```bash
cd /opt/teif

# Pull latest
docker pull maksebdev3/teif:latest

# Restart
docker-compose up -d

# Verify
docker-compose ps
```

### SSH into Container
```bash
docker-compose exec backend sh
```

### Access Database Directly
```bash
docker-compose exec postgres psql -U postgres -d teif_prod
```

## 🔐 Security Best Practices

### 1. Firewall Configuration
```bash
# Allow SSH
sudo ufw allow 22/tcp

# Allow HTTPS
sudo ufw allow 443/tcp

# Allow HTTP (if using)
sudo ufw allow 80/tcp

# Enable firewall
sudo ufw enable
```

### 2. SSL/HTTPS Setup (Caddy)

Create `/opt/teif/Caddyfile`:
```caddy
yourdomain.com {
    reverse_proxy localhost:3000
    encode gzip
}
```

Run Caddy:
```bash
docker run -d \
  --name caddy \
  -p 80:80 -p 443:443 \
  -v /opt/teif/Caddyfile:/etc/caddy/Caddyfile \
  -v caddy_data:/data \
  caddy:latest
```

### 3. Environment Secrets
```bash
# Never commit .env to git
echo ".env" >> .gitignore

# Use secure password generation
openssl rand -base64 32

# Rotate secrets periodically
```

### 4. Database Security
```bash
# Change default password after deployment
docker-compose exec postgres psql -U postgres -c "ALTER USER postgres WITH PASSWORD 'new_strong_password';"

# Backup regularly (automated daily at 2 AM)
```

## 📈 Monitoring & Maintenance

### Health Checks
```bash
# Application health
curl http://your-vps-ip:3000/api/health

# Database health
docker-compose exec postgres pg_isready -U postgres

# Docker status
docker ps
docker stats
```

### Log Rotation
Automatically configured to:
- Keep 30 days of logs
- Rotate daily
- Compress old logs
- Located at `/var/log/teif-backup.log`

### Disk Space
```bash
# Check disk usage
df -h

# Clean up unused Docker images
docker image prune -a

# Clean up dangling volumes
docker volume prune
```

## 🆘 Troubleshooting

### Services won't start
```bash
# Check logs
docker-compose logs

# Verify image pulled correctly
docker images | grep teif

# Check port availability
sudo netstat -tlnp | grep 3000
```

### Database connection errors
```bash
# Verify PostgreSQL is healthy
docker-compose ps postgres

# Check database logs
docker-compose logs postgres

# Test connection from host
docker-compose exec postgres psql -U postgres -d teif_prod -c "SELECT 1"
```

### Out of disk space
```bash
# Check what's using space
du -sh /var/lib/docker/*

# Clean up old images
docker image prune -a

# Clean up logs
docker exec teif-postgres bash -c "rm -rf /var/log/postgresql/*"
```

### Performance issues
```bash
# Monitor resource usage
docker stats

# Check system load
top
uptime

# View container metrics
docker ps
docker inspect container_id
```

## 📚 File Structure

```
/opt/teif/
├── docker-compose.yml    # Production composition
├── .env                   # Environment secrets
├── backup.sh             # Backup script
├── logs/                 # Application logs
├── backups/              # Database backups
└── data/                 # Docker volumes
```

## 🔄 Update Process

```bash
# 1. Pull latest image
docker pull maksebdev3/teif:latest

# 2. Graceful restart
cd /opt/teif
docker-compose up -d

# 3. Verify
docker-compose ps
docker-compose logs backend

# 4. Rollback if needed
docker-compose down
docker pull maksebdev3/teif:previous-version-sha
docker-compose up -d
```

## 📞 Support

For issues or questions:
1. Check logs: `docker-compose logs`
2. Review troubleshooting section above
3. Check [GitHub Issues](https://github.com/YOUR_ORG/TEIF/issues)
4. Contact: devops@yourdomain.com

---

**Last Updated:** February 28, 2026
**Maintained by:** DevOps Team
