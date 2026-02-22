# TEIF - Direct Ubuntu 24.04 VPS Deployment Guide

## Overview
Deploy MERN stack directly to Ubuntu 24.04 VPS without Docker.

**Stack:**
- Node.js 20.x + pnpm
- Hono backend (port 3000)
- React 19.2 Vite frontend (port 5173 dev / served by nginx)
- Prisma ORM
- PM2 or systemd for process management
- Nginx reverse proxy
- Let's Encrypt SSL

---

## Phase 1: Server Preparation

### 1.1 SSH into VPS
```bash
ssh root@your-vps-ip
# or
ssh ubuntu@your-vps-ip
```

### 1.2 Update System
```bash
sudo apt update && sudo apt upgrade -y
sudo apt install -y curl wget git nano build-essential
```

### 1.3 Install Node.js 20.x
```bash
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install -y nodejs
node --version  # Should be v20.x
npm install -g pnpm
pnpm --version
```

### 1.4 Create App Directory
```bash
sudo mkdir -p /var/www/teif
sudo chown ubuntu:ubuntu /var/www/teif  # Replace 'ubuntu' with your user
cd /var/www/teif
```

---

## Phase 2: Clone & Build Application

### 2.1 Clone Repository
```bash
cd /var/www/teif
git clone https://github.com/YOUR-USERNAME/teif-repo.git .
# OR if pushing from local:
git init && git remote add origin https://github.com/...
```

### 2.2 Install Dependencies
```bash
pnpm install
```

### 2.3 Build Packages
```bash
# Build shared package first
pnpm --filter @teif/shared build

# Generate Prisma client
pnpm --filter @teif/backend exec prisma generate

# Build backend
pnpm --filter @teif/backend build

# Build frontend
pnpm --filter @teif/frontend build
```

### 2.4 Verify Builds
```bash
ls -la packages/shared/dist/
ls -la packages/backend/dist/
ls -la packages/frontend/dist/
```

---

## Phase 3: Database Setup

### Option A: PostgreSQL (Local)
```bash
sudo apt install -y postgresql postgresql-contrib

# Create database and user
sudo -u postgres psql << EOF
CREATE DATABASE teif;
CREATE USER teif_user WITH ENCRYPTED PASSWORD 'YOUR_SECURE_PASSWORD';
ALTER ROLE teif_user SET client_encoding TO 'utf8';
ALTER ROLE teif_user SET default_transaction_isolation TO 'read committed';
ALTER ROLE teif_user SET default_transaction_deferrable TO on;
ALTER ROLE teif_user SET default_transaction_read_committed TO on;
GRANT ALL PRIVILEGES ON DATABASE teif TO teif_user;
\q
EOF

# Get connection string for .env:
# postgresql://teif_user:YOUR_SECURE_PASSWORD@localhost:5432/teif
```

### Option B: MongoDB (Local)
```bash
curl -fsSL https://www.mongodb.org/static/pgp/server-7.0.asc | sudo apt-key add -
echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu jammy/mongodb-org/7.0 multiverse" | \
  sudo tee /etc/apt/sources.list.d/mongodb-org-7.0.list
sudo apt update
sudo apt install -y mongodb-org

sudo systemctl start mongod
sudo systemctl enable mongod

# Connection string for .env:
# mongodb://localhost:27017/teif
```

### Option C: Cloud Database
- **MongoDB Atlas**: `mongodb+srv://user:pass@cluster.mongodb.net/teif`
- **PostgreSQL (Azure/AWS)**: Use connection string from provider

---

## Phase 4: Environment Configuration

### 4.1 Create Backend .env
```bash
cat > /var/www/teif/packages/backend/.env << 'EOF'
# Database
DATABASE_URL="postgresql://teif_user:YOUR_PASSWORD@localhost:5432/teif"
# Or for MongoDB:
# DATABASE_URL="mongodb://localhost:27017/teif"

# JWT & Auth
JWT_SECRET="your-super-secret-jwt-key-min-32-chars-random"
REFRESH_TOKEN_SECRET="another-super-secret-refresh-key"

# Email (SendGrid or local SMTP)
SENDGRID_API_KEY="your-sendgrid-key"
SENDGRID_FROM_EMAIL="noreply@efatoura.duckdns.org"

# API
NODE_ENV="production"
PORT=3000
HOST="0.0.0.0"

# Frontend URL (for CORS)
FRONTEND_URL="https://efatoura.duckdns.org"

# Rate Limiting
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100
EOF

chmod 600 /var/www/teif/packages/backend/.env
```

### 4.2 Create Frontend .env
```bash
cat > /var/www/teif/packages/frontend/.env.production << 'EOF'
VITE_API_BASE_URL=https://efatoura.duckdns.org/api
EOF
```

### 4.3 Verify .env files
```bash
# DO NOT push these to git!
echo "/packages/backend/.env" >> /var/www/teif/.gitignore
echo "/packages/frontend/.env.production" >> /var/www/teif/.gitignore
git add .gitignore && git commit -m "add env files to gitignore"
```

---

## Phase 5: Process Management Setup

### Option A: PM2 (Recommended for ease)
```bash
# Install PM2 globally
sudo npm install -g pm2

# Create ecosystem config
cat > /var/www/teif/ecosystem.config.js << 'EOF'
module.exports = {
  apps: [
    {
      name: 'teif-backend',
      script: './packages/backend/dist/index.js',
      cwd: '/var/www/teif',
      instances: 'max',
      exec_mode: 'cluster',
      env: {
        NODE_ENV: 'production',
        PORT: 3000
      },
      watch: false,
      max_memory_restart: '500M',
      error_file: '/var/log/teif/backend-error.log',
      out_file: '/var/log/teif/backend-out.log',
      log_date_format: 'YYYY-MM-DD HH:mm:ss Z'
    }
  ]
};
EOF

# Start with PM2
sudo mkdir -p /var/log/teif
sudo chown ubuntu:ubuntu /var/log/teif

pm2 start ecosystem.config.js
pm2 save
pm2 startup

# Verify
pm2 logs teif-backend
pm2 status
```

### Option B: Systemd Service (More standard)
```bash
sudo cat > /etc/systemd/system/teif-backend.service << 'EOF'
[Unit]
Description=TEIF Backend Service
After=network.target postgresql.service

[Service]
Type=simple
User=ubuntu
WorkingDirectory=/var/www/teif
Environment="NODE_ENV=production"
Environment="PATH=/home/ubuntu/.nvm/versions/node/v20.x/bin:/usr/local/bin:/usr/bin:/bin"
ExecStart=/home/ubuntu/.nvm/versions/node/v20.x/bin/node /var/www/teif/packages/backend/dist/index.js
Restart=always
RestartSec=10
StandardOutput=journal
StandardError=journal

[Install]
WantedBy=multi-user.target
EOF

sudo systemctl daemon-reload
sudo systemctl enable teif-backend
sudo systemctl start teif-backend

# Check status
sudo systemctl status teif-backend
sudo journalctl -u teif-backend -f  # Tail logs
```

---

## Phase 6: Nginx Reverse Proxy

### 6.1 Install Nginx
```bash
sudo apt install -y nginx
```

### 6.2 Create Nginx Config
```bash
sudo cat > /etc/nginx/sites-available/teif << 'EOF'
upstream backend {
    server 127.0.0.1:3000;
}

upstream frontend {
    server 127.0.0.1:5173;
}

server {
    listen 80;
    server_name efatoura.duckdns.org;

    # Redirect HTTP to HTTPS
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl http2;
    server_name efatoura.duckdns.org;

    # SSL certificates (added by certbot)
    ssl_certificate /etc/letsencrypt/live/efatoura.duckdns.org/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/efatoura.duckdns.org/privkey.pem;

    # SSL configuration
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers HIGH:!aNULL:!MD5;
    ssl_prefer_server_ciphers on;
    ssl_session_cache shared:SSL:10m;
    ssl_session_timeout 10m;

    # Gzip compression
    gzip on;
    gzip_types text/plain text/css application/json application/javascript text/xml application/xml application/xml+rss text/javascript;
    gzip_min_length 1000;

    # Security headers
    add_header Strict-Transport-Security "max-age=31536000; includeSubDomains" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-Frame-Options "SAMEORIGIN" always;

    # Frontend
    location / {
        root /var/www/teif/packages/frontend/dist;
        try_files $uri $uri/ /index.html;
        add_header Cache-Control "public, max-age=3600";
    }

    # API
    location /api/ {
        proxy_pass http://backend/;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
        proxy_read_timeout 60s;
        proxy_connect_timeout 60s;
    }

    # Health check endpoint
    location /health {
        proxy_pass http://backend/health;
        access_log off;
    }
}
EOF

# Enable site
sudo ln -sf /etc/nginx/sites-available/teif /etc/nginx/sites-enabled/
sudo rm -f /etc/nginx/sites-enabled/default

# Test config
sudo nginx -t

# Start nginx
sudo systemctl restart nginx
sudo systemctl enable nginx
```

---

## Phase 7: SSL/TLS with Let's Encrypt

### 7.1 Install Certbot
```bash
sudo apt install -y certbot python3-certbot-nginx
```

### 7.2 Get Certificate
```bash
# Note: Make sure your domain (efatoura.duckdns.org) DNS is set up and pointing to VPS IP!

sudo certbot certonly --nginx -d efatoura.duckdns.org

# Or automatic with nginx:
sudo certbot --nginx -d efatoura.duckdns.org
```

### 7.3 Auto-Renewal
```bash
sudo systemctl enable certbot.timer
sudo systemctl start certbot.timer

# Test renewal (dry run)
sudo certbot renew --dry-run
```

---

## Phase 8: Database Migrations (if using Prisma)

### 8.1 Run Migrations
```bash
cd /var/www/teif/packages/backend

# Deploy schema to database
pnpm exec prisma migrate deploy

# Or create initial migration
# pnpm exec prisma migrate dev --name init
```

### 8.2 Verify Database
```bash
# For PostgreSQL:
psql -U teif_user -d teif -c "SELECT * FROM information_schema.tables WHERE table_schema = 'public';"

# For MongoDB:
mongo -u teif_user -p --authenticationDatabase admin << EOF
db.testConnection()
EOF
```

---

## Phase 9: Verification & Health Checks

### 9.1 Check Backend
```bash
# Check if running
curl http://localhost:3000/health

# Via HTTPS (after Nginx setup)
curl https://efatoura.duckdns.org/health

# Logs
pm2 logs teif-backend
# Or systemd:
sudo journalctl -u teif-backend -f
```

### 9.2 Check Frontend
```bash
# Verify build exists
ls -la /var/www/teif/packages/frontend/dist/

# Test via HTTPS
curl https://efatoura.duckdns.org/ | head -20
```

### 9.3 Check Nginx
```bash
sudo systemctl status nginx
sudo tail -f /var/log/nginx/error.log
```

---

## Phase 10: Continuous Deployment (Optional)

### 10.1 Update Script
Create `/var/www/teif/deploy.sh`:
```bash
#!/bin/bash
set -e

echo "=== Pulling latest code ==="
cd /var/www/teif
git pull origin production

echo "=== Installing dependencies ==="
pnpm install

echo "=== Building packages ==="
pnpm --filter @teif/shared build
pnpm --filter @teif/backend exec prisma generate
pnpm --filter @teif/backend build
pnpm --filter @teif/frontend build

echo "=== Migrating database ==="
pnpm --filter @teif/backend exec prisma migrate deploy

echo "=== Restarting backend ==="
pm2 restart teif-backend
# Or for systemd:
# sudo systemctl restart teif-backend

echo "=== Deployment complete ==="
```

```bash
chmod +x /var/www/teif/deploy.sh

# Make executable and run manually or via cron:
# 0 2 * * * /var/www/teif/deploy.sh >> /var/log/teif/deploy.log 2>&1
```

---

## Common Commands

```bash
# Check all services
sudo systemctl status nginx postgresql
pm2 status

# View logs
pm2 logs teif-backend
sudo journalctl -u teif-backend -f
sudo tail -f /var/log/nginx/error.log
sudo tail -f /var/log/nginx/access.log

# Restart services
sudo systemctl restart nginx
pm2 restart teif-backend
sudo systemctl restart teif-backend  # if using systemd

# Stop services
pm2 stop teif-backend
sudo systemctl stop teif-backend

# Database connection
psql -U teif_user -d teif
mongo -u teif_user -p --authenticationDatabase admin
```

---

## Troubleshooting

### Backend not starting
```bash
# Check logs
pm2 logs teif-backend
sudo journalctl -u teif-backend -e

# Check port is not in use
sudo lsof -i :3000

# Test built file exists
ls -la /var/www/teif/packages/backend/dist/index.js
```

### Nginx not forwarding requests
```bash
# Test config
sudo nginx -t

# Check if backend is actually running
curl http://localhost:3000/health

# Restart nginx
sudo systemctl restart nginx
```

### Database connection errors
```bash
# For PostgreSQL
sudo -u postgres psql -c "SELECT version();"

# For MongoDB
mongosh  # or mongo
```

### SSL certificate issues
```bash
# Check certificate
sudo certbot certificates

# Renew manually
sudo certbot renew

# Debug nginx SSL
sudo nginx -t
```

---

## Security Checklist

- [ ] SSH key-based authentication configured
- [ ] Firewall rules set (ufw or AWS Security Groups)
- [ ] `.env` files not committed to git
- [ ] Database user has least privilege
- [ ] SSL/TLS certificate installed and auto-renewing
- [ ] Nginx security headers configured
- [ ] Backend not exposed directly (behind Nginx)
- [ ] Regular backups configured
- [ ] Fail2ban installed for brute-force protection
- [ ] Log monitoring set up

---

## Next Steps

1. **Answer the clarification questions above**
2. **Run Phase 1-4 setup**
3. **Test backend: `curl http://localhost:3000/health`**
4. **Configure Nginx (Phase 6)**
5. **Set up SSL (Phase 7)**
6. **Run database migrations (Phase 8)**
7. **Verify all endpoints working (Phase 9)**
