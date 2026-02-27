# TEIF Production Deployment - WSL Test Guide

## Step 1: Build Images Locally (WSL)

Navigate to project root and run:

```bash
# Build backend image
docker build \
  --file packages/backend/Dockerfile.prod \
  --tag maksebdev3/teif-backend:test \
  .

# Build frontend image  
docker build \
  --file packages/frontend/Dockerfile.prod \
  --tag maksebdev3/teif-frontend:test \
  .
```

## Step 2: Test Images Locally

Create `.env.prod` file in project root:

```env
# Database
DB_USER=postgres
DB_PASSWORD=test_password_123
DB_NAME=teif_prod

# JWT
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production

# SMTP (OVH)
SMTP_HOST=ssl0.ovh.net
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=support@comptacrm.com
SMTP_PASS=Compta2025++
SMTP_FROM=support@comptacrm.com

# Frontend API URL
FRONTEND_API_URL=http://localhost:3000/api
```

Test with docker-compose:

```bash
# Use custom env file
docker-compose -f docker-compose.prod.yml --env-file .env.prod up -d

# Check logs
docker-compose -f docker-compose.prod.yml logs -f backend
docker-compose -f docker-compose.prod.yml logs -f frontend

# Test endpoints
curl http://localhost/health          # Frontend health
curl http://localhost:3000/health     # Backend health
curl http://localhost:3000/api/health # API health

# Stop
docker-compose -f docker-compose.prod.yml down
```

## Step 3: Push to Docker Hub

```bash
# Login (already done: docker login -u maksebdev3)

# Tag for production
docker tag maksebdev3/teif-backend:test maksebdev3/teif-backend:latest
docker tag maksebdev3/teif-frontend:test maksebdev3/teif-frontend:latest

# Push
docker push maksebdev3/teif-backend:latest
docker push maksebdev3/teif-frontend:latest
```

## Verification

Check images on Docker Hub:
- https://hub.docker.com/r/maksebdev3/teif-backend
- https://hub.docker.com/r/maksebdev3/teif-frontend

## VPS Deployment (Next Phase)

```bash
# SSH to VPS
ssh root@your_vps_ip

# Install Docker & Docker Compose
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh

# Create deployment directory
mkdir -p /opt/teif && cd /opt/teif

# Copy docker-compose.prod.yml
scp docker-compose.prod.yml root@your_vps_ip:/opt/teif/

# Create .env with production values
nano .env

# Deploy
docker-compose -f docker-compose.prod.yml up -d

# Check status
docker-compose -f docker-compose.prod.yml ps
```
