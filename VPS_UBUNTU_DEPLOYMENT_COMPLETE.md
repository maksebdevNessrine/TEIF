# VPS Ubuntu 24.04 Deployment Guide

## Overview

Your entire setup is portable to Ubuntu VPS. This guide covers:
- Deploying backend (Node.js + Hono)
- Deploying frontend (Vite + React)
- Running PostgreSQL container (same as local)
- Using Nginx as reverse proxy
- Setting up SSL with Let's Encrypt

---

## Prerequisites on Ubuntu 24.04 VPS

```bash
# Update system
sudo apt update && sudo apt upgrade -y

# Install Node.js 20
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install -y nodejs

# Install pnpm
npm install -g pnpm

# Install Docker
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh

# Add your user to docker group (to run without sudo)
sudo usermod -aG docker $USER
newgrp docker

# Install Docker Compose
sudo curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose

# Install Nginx (optional, for reverse proxy)
sudo apt install -y nginx

# Install Certbot for SSL (optional)
sudo apt install -y certbot python3-certbot-nginx

# Install PM2 for process management
sudo npm install -g pm2
pm2 startup
pm2 save
```

---

## Step 1: Clone Repository on VPS

```bash
# Connect to your VPS
ssh user@your_vps_ip

# Navigate to deployment directory
cd /var/www

# Clone repository
git clone https://github.com/maksebdevNessrine/teif.git
cd teif

# Switch to production branch
git checkout production

# Pull latest changes
git pull origin production
```

---

## Step 2: Set Up Environment Variables

```bash
# Copy and edit .env file
cp .env.example .env
nano .env  # or vim .env

# Essential variables for VPS:
NODE_ENV=production
PORT=3000

# Database (PostgreSQL will run in Docker)
DATABASE_URL=postgresql://teif_user:postgres@localhost:5432/teif?schema=public
POSTGRES_PASSWORD=postgres

# JWT & Auth
JWT_SECRET=your_secure_random_secret_here
REFRESH_TOKEN_SECRET=your_secure_random_refresh_secret_here

# Frontend URLs
VITE_API_BASE_URL=https://your_domain.com/api
# or if using IP:
VITE_API_BASE_URL=https://your_vps_ip/api

# Email configuration (if needed)
SMTP_HOST=your_smtp_host
SMTP_PORT=587
SMTP_USER=your_email
SMTP_PASSWORD=your_password

# Save and exit (Ctrl+X, then Y, then Enter in nano)
```

---

## Step 3: Start PostgreSQL Container

```bash
# Start the same PostgreSQL container as local
docker run -d \
  --name teif-postgres \
  -e POSTGRES_DB=teif \
  -e POSTGRES_USER=teif_user \
  -e POSTGRES_PASSWORD=postgres \
  -p 5432:5432 \
  -v teif-postgres-data:/var/lib/postgresql/data \
  --restart unless-stopped \
  postgres:16-alpine

# Verify it's running
docker ps --filter "name=teif-postgres"

# Check logs if needed
docker logs teif-postgres
```

**Note:** The `-v teif-postgres-data:/var/lib/postgresql/data` creates a persistent volume so data survives container restarts.

---

## Step 4: Build and Deploy Backend

```bash
# Install dependencies
pnpm install

# Build all packages (backend, frontend, shared)
pnpm run build

# Verify build completed successfully
ls packages/backend/dist/
ls packages/frontend/dist/

# Test backend starts correctly
pnpm --filter @teif/backend start
# Should show: ✅ Server running at http://0.0.0.0:3000

# Kill the test process
# Ctrl+C
```

---

## Step 5: Start Backend with PM2

```bash
# Copy ecosystem config
cp ecosystem.config.js /var/www/teif/

# Start backend with PM2
pm2 start ecosystem.config.js --name teif-backend

# Check status
pm2 status

# View logs
pm2 logs teif-backend

# Save PM2 config to auto-start on reboot
pm2 save
pm2 startup
```

Backend is now running on `http://localhost:3000`

---

## Step 6: Deploy Frontend

### Option A: Static Hosting (Recommended for Production)

```bash
# Frontend is already built at: packages/frontend/dist/

# Copy to web root
sudo mkdir -p /var/www/teif-frontend
sudo cp -r packages/frontend/dist/* /var/www/teif-frontend/

# Set permissions
sudo chown -R www-data:www-data /var/www/teif-frontend
```

### Option B: Use Nginx to Serve Frontend

```bash
# Create Nginx config
sudo nano /etc/nginx/sites-available/teif-frontend

# Paste this config:
server {
    listen 80;
    server_name your_domain.com www.your_domain.com;
    # or use IP if no domain
    # server_name your_vps_ip;

    root /var/www/teif-frontend;
    index index.html;

    # SPA routing - send all requests to index.html
    location / {
        try_files $uri $uri/ /index.html;
    }

    # API proxy to backend
    location /api/ {
        proxy_pass http://localhost:3000/api/;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}

# Enable the site
sudo ln -s /etc/nginx/sites-available/teif-frontend /etc/nginx/sites-enabled/

# Test Nginx config
sudo nginx -t

# Restart Nginx
sudo systemctl restart nginx
```

---

## Step 7: Set Up SSL with Let's Encrypt (HTTPS)

```bash
# Install Certbot (if not already done)
sudo apt install -y certbot python3-certbot-nginx

# Generate SSL certificate
sudo certbot certonly --nginx -d your_domain.com -d www.your_domain.com

# Update Nginx config with SSL
sudo nano /etc/nginx/sites-available/teif-frontend

# Replace with:
server {
    listen 80;
    server_name your_domain.com www.your_domain.com;
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl http2;
    server_name your_domain.com www.your_domain.com;

    ssl_certificate /etc/letsencrypt/live/your_domain.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/your_domain.com/privkey.pem;

    root /var/www/teif-frontend;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }

    location /api/ {
        proxy_pass http://localhost:3000/api/;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}

# Test and restart
sudo nginx -t
sudo systemctl restart nginx

# Auto-renew certificates
sudo systemctl enable certbot.timer
sudo systemctl start certbot.timer
```

---

## Step 8: Database Backup/Restore (Optional)

### Export Database from Local

If you want to migrate data from your local database:

```bash
# On your local machine
docker exec teif-postgres pg_dump -U teif_user -d teif > teif-backup.sql

# Transfer to VPS
scp teif-backup.sql user@your_vps_ip:/home/user/
```

### Import Database on VPS

```bash
# On VPS
docker exec -i teif-postgres psql -U teif_user -d teif < /home/user/teif-backup.sql

# Verify
docker exec teif-postgres psql -U teif_user -d teif -c "\dt"
```

---

## Step 9: Verify Deployment

```bash
# Check backend is running
curl http://localhost:3000/api/health

# Check PM2 status
pm2 status

# Check Docker container
docker ps --filter "name=teif-postgres"

# Check Nginx
sudo systemctl status nginx

# View logs
pm2 logs teif-backend
docker logs teif-postgres
sudo tail -f /var/log/nginx/error.log
```

---

## Step 10: Set Up Monitoring & Auto-Restart

```bash
# PM2 will auto-restart backend if it crashes
# To verify auto-start on reboot:
pm2 save
pm2 startup

# Check Docker container restarts automatically
docker inspect teif-postgres | grep -i restart

# Enable Nginx auto-start
sudo systemctl enable nginx
```

---

## Accessing Your Deployment

After everything is set up:

- **Frontend**: https://your_domain.com (or http://your_vps_ip if no domain)
- **Backend API**: https://your_domain.com/api (proxied through Nginx)
- **Health Check**: https://your_domain.com/api/health

---

## Quick Redeploy After Changes

When you push new code to production branch:

```bash
cd /var/www/teif

# Pull latest
git pull origin production

# Rebuild
pnpm install
pnpm run build

# Restart backend
pm2 restart teif-backend

# Update frontend
sudo cp -r packages/frontend/dist/* /var/www/teif-frontend/
sudo chown -R www-data:www-data /var/www/teif-frontend

# Reload Nginx
sudo systemctl reload nginx
```

---

## Troubleshooting

### Backend won't connect to database
```bash
# Check if PostgreSQL is running
docker ps --filter "name=teif-postgres"

# Check logs
docker logs teif-postgres

# Verify connection string in .env matches container setup
cat .env | grep DATABASE_URL
```

### Frontend shows blank page
```bash
# Check Nginx logs
sudo tail -f /var/log/nginx/error.log

# Verify SPA routing is configured correctly
sudo nginx -t
```

### PM2 not starting backend on reboot
```bash
# Regenerate startup script
pm2 startup
pm2 save
```

### Database migration issues
```bash
# Reset database (WARNING: deletes all data)
docker exec teif-postgres psql -U teif_user -d teif -c "DROP SCHEMA public CASCADE; CREATE SCHEMA public;"

# Run migrations (if using Prisma)
pnpm --filter @teif/backend db:push
# or
npx prisma migrate deploy
```

---

## Database Configuration Summary

Your database setup is **exactly the same** on both local and VPS:

| Setting | Value |
|---------|-------|
| Database | PostgreSQL 16-alpine |
| Database Name | teif |
| Username | teif_user |
| Password | postgres |
| Host | localhost (Docker) |
| Port | 5432 |
| Connection String | `postgresql://teif_user:postgres@localhost:5432/teif?schema=public` |

The only difference is the Docker container:
- **Local**: `teif-postgres` (in PowerShell/Docker Desktop)
- **VPS**: `teif-postgres` (same name, same config)

**Data is persistent** thanks to the volume: `teif-postgres-data:/var/lib/postgresql/data`

---

## Key Differences: Local vs VPS

| Aspect | Local | VPS |
|--------|-------|-----|
| **Node server** | Direct tsx runner | PM2 process manager |
| **Frontend** | Vite dev server | Static files via Nginx |
| **Database** | Docker container | Docker container (same) |
| **Reverse Proxy** | None needed | Nginx (handles HTTP/HTTPS, routing) |
| **SSL** | Not needed for localhost | Let's Encrypt (required) |
| **Auto-restart** | Manual | PM2 + Docker auto-restart |
| **Environment** | Windows | Ubuntu 24.04 |

---

## Next Steps

1. ✅ Prepare VPS with prerequisites
2. ✅ Clone repository and configure .env
3. ✅ Start PostgreSQL container
4. ✅ Deploy backend with PM2
5. ✅ Deploy frontend to Nginx
6. ✅ Set up SSL with Let's Encrypt
7. ✅ Verify all services are running
8. ✅ Set up monitoring and backups

Ready to deploy? Let me know your VPS IP and domain, and I can help with specific commands!
