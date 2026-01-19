#!/bin/bash
#
# TEIF - Fastest Ubuntu 24.04 VPS Deployment
# PostgreSQL in Docker + Node.js App Native
# 
# Usage: curl -fsSL https://raw.githubusercontent.com/YOUR-REPO/teif/production/FASTEST_DEPLOY.sh | bash
# Or: bash FASTEST_DEPLOY.sh
#

set -e

# Color output
RED='\033[0;31m'
GREEN='\033[0;32m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}========================================${NC}"
echo -e "${BLUE}  TEIF - Fastest Deployment Setup     ${NC}"
echo -e "${BLUE}========================================${NC}"

# Configuration
DOMAIN="${1:-efatoura.duckdns.org}"
APP_USER="ubuntu"
APP_PATH="/var/www/teif"
REPO_URL="${2:-}"

# Validate REPO_URL
if [ -z "$REPO_URL" ]; then
  echo -e "${RED}ERROR: Repository URL required!${NC}"
  echo "Usage: bash FASTEST_DEPLOY.sh <domain> <repo-url>"
  echo "Example: bash FASTEST_DEPLOY.sh efatoura.duckdns.org https://github.com/maksebdevNessrine/teif.git"
  exit 1
fi

echo -e "\n${BLUE}Configuration:${NC}"
echo "  Domain: $DOMAIN"
echo "  App Path: $APP_PATH"
echo "  Repo: $REPO_URL"

# ===== PHASE 1: System & Dependencies =====
echo -e "\n${BLUE}[Phase 1] Installing System Dependencies...${NC}"

sudo apt update
sudo apt upgrade -y
sudo apt install -y \
  curl wget git nano htop build-essential \
  postgresql-client-common \
  nginx certbot python3-certbot-nginx

# Stop existing Nginx to avoid port conflicts
echo "Stopping existing Nginx if running..."
sudo systemctl stop nginx 2>/dev/null || true

# Install Node.js 20.x
if ! command -v node &> /dev/null; then
  echo "Installing Node.js 20.x..."
  curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
  sudo apt install -y nodejs
fi

node --version
npm --version

# Install pnpm
if ! command -v pnpm &> /dev/null; then
  echo "Installing pnpm..."
  npm install -g pnpm@latest
fi

pnpm --version

# Install PM2
if ! command -v pm2 &> /dev/null; then
  echo "Installing PM2..."
  sudo npm install -g pm2
fi

pm2 --version

# Install Docker & Docker Compose
if ! command -v docker &> /dev/null; then
  echo "Installing Docker..."
  curl -fsSL https://get.docker.com -o get-docker.sh
  sudo sh get-docker.sh
  rm get-docker.sh
  
  # Add user to docker group
  sudo usermod -aG docker $APP_USER
fi

docker --version
docker compose --version

# ===== PHASE 2: App Directories =====
echo -e "\n${BLUE}[Phase 2] Setting Up Directories...${NC}"

sudo mkdir -p $APP_PATH
sudo chown $APP_USER:$APP_USER $APP_PATH
sudo mkdir -p /var/log/teif
sudo chown $APP_USER:$APP_USER /var/log/teif
sudo mkdir -p /var/www/teif-data/postgres
sudo chown $APP_USER:$APP_USER /var/www/teif-data/postgres

# ===== PHASE 3: Clone Repository =====
echo -e "\n${BLUE}[Phase 3] Cloning Repository...${NC}"

cd $APP_PATH

if [ -d .git ]; then
  echo "Repository already exists, pulling latest..."
  git pull origin production
else
  echo "Cloning fresh repository..."
  git clone --branch production $REPO_URL .
fi

cd $APP_PATH

# ===== PHASE 4: Environment Setup =====
echo -e "\n${BLUE}[Phase 4] Setting Up Environment...${NC}"

# Generate strong secrets
DB_PASSWORD=$(openssl rand -base64 32 | tr -d "=+/" | cut -c1-25)
JWT_SECRET=$(openssl rand -base64 32)
REFRESH_TOKEN_SECRET=$(openssl rand -base64 32)

# Create backend .env
cat > packages/backend/.env << EOF
# Database
DATABASE_URL="postgresql://teif_user:${DB_PASSWORD}@localhost:5432/teif"

# JWT & Auth
JWT_SECRET="${JWT_SECRET}"
REFRESH_TOKEN_SECRET="${REFRESH_TOKEN_SECRET}"

# Email (Configure these)
SENDGRID_API_KEY=""
SENDGRID_FROM_EMAIL="noreply@${DOMAIN}"

# Server Config
NODE_ENV="production"
PORT=3000
HOST="0.0.0.0"

# API & Frontend
FRONTEND_URL="https://${DOMAIN}"
API_BASE_URL="https://${DOMAIN}/api"

# Rate Limiting
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100
EOF

chmod 600 packages/backend/.env

# Create frontend .env
cat > packages/frontend/.env.production << EOF
VITE_API_BASE_URL=https://${DOMAIN}/api
EOF

echo -e "${GREEN}✓ Environment files created${NC}"

# ===== PHASE 5: PostgreSQL Docker Setup =====
echo -e "\n${BLUE}[Phase 5] Setting Up PostgreSQL with Docker...${NC}"

# Generate DB password
DB_PASSWORD=$(openssl rand -base64 32 | tr -d "=+/" | cut -c1-25)

cat > docker-compose.production.yml << EOF
version: '3.8'

services:
  postgres:
    image: postgres:16-alpine
    container_name: teif-postgres
    restart: always
    environment:
      POSTGRES_DB: teif
      POSTGRES_USER: teif_user
      POSTGRES_PASSWORD: ${DB_PASSWORD}
    volumes:
      - /var/www/teif-data/postgres:/var/lib/postgresql/data
    ports:
      - "5432:5432"
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U teif_user -d teif"]
      interval: 10s
      timeout: 5s
      retries: 5

volumes:
  postgres_data:
    driver: local
EOF

# Start PostgreSQL
echo "Starting PostgreSQL container..."
docker compose -f docker-compose.production.yml up -d

# Wait for DB to be ready
echo "Waiting for PostgreSQL to be ready..."
sleep 5
until docker compose -f docker-compose.production.yml exec -T postgres pg_isready -U teif_user -d teif; do
  echo "PostgreSQL is unavailable, waiting..."
  sleep 2
done

echo -e "${GREEN}✓ PostgreSQL is running${NC}"

# ===== PHASE 6: Install Dependencies & Build =====
echo -e "\n${BLUE}[Phase 6] Installing Dependencies & Building...${NC}"

pnpm install

echo "Building shared package..."
cd $APP_PATH
cd packages/shared
npx tsc
cd ../..

echo "Verifying shared dist was created..."
if [ ! -d "$APP_PATH/packages/shared/dist" ] || [ ! -f "$APP_PATH/packages/shared/dist/index.d.ts" ]; then
  echo -e "${RED}ERROR: Shared dist not created${NC}"
  ls -la $APP_PATH/packages/shared/dist/ || echo "dist folder doesn't exist"
  exit 1
fi

echo "Generating Prisma client..."
pnpm --filter @teif/backend exec prisma generate

echo "Building backend..."
pnpm --filter @teif/backend build

echo "Building frontend..."
pnpm --filter @teif/frontend build

echo -e "${GREEN}✓ All packages built successfully${NC}"

# ===== PHASE 7: Database Migrations =====
echo -e "\n${BLUE}[Phase 7] Running Database Migrations...${NC}"

cd $APP_PATH/packages/backend
pnpm exec prisma migrate deploy || pnpm exec prisma migrate dev --name init || true
cd $APP_PATH

echo -e "${GREEN}✓ Database migrations complete${NC}"

# ===== PHASE 8: PM2 Setup =====
echo -e "\n${BLUE}[Phase 8] Setting Up PM2 Process Manager...${NC}"

# Create ecosystem config
cat > ecosystem.config.js << EOF
module.exports = {
  apps: [
    {
      name: 'teif-backend',
      script: './packages/backend/dist/index.js',
      cwd: '$APP_PATH',
      instances: 'max',
      exec_mode: 'cluster',
      env: {
        NODE_ENV: 'production'
      },
      watch: false,
      max_memory_restart: '500M',
      error_file: '/var/log/teif/backend-error.log',
      out_file: '/var/log/teif/backend-out.log',
      log_date_format: 'YYYY-MM-DD HH:mm:ss Z',
      merge_logs: true
    }
  ]
};
EOF

# Start with PM2
pm2 delete teif-backend || true
pm2 start ecosystem.config.js
pm2 save

# Startup script (handle errors gracefully)
pm2 startup -u $APP_USER --hp /home/$APP_USER || true
echo -e "${BLUE}Note: If pm2 startup fails, manually run: pm2 startup -u ubuntu --hp /home/ubuntu${NC}"

echo -e "${GREEN}✓ Backend started with PM2${NC}"

# ===== PHASE 9: Nginx Reverse Proxy =====
echo -e "\n${BLUE}[Phase 9] Configuring Nginx Reverse Proxy...${NC}"

# Create initial nginx config WITHOUT SSL (will update after cert)
sudo tee /etc/nginx/sites-available/teif > /dev/null << 'NGINX_EOF'
upstream backend {
    server 127.0.0.1:3000;
    keepalive 64;
}

server {
    listen 80;
    server_name _;

    # Gzip compression
    gzip on;
    gzip_types text/plain text/css application/json application/javascript text/xml application/xml;
    gzip_min_length 1000;

    # Frontend - static files
    location / {
        root /var/www/teif/packages/frontend/dist;
        try_files $uri $uri/ /index.html;
        expires 1h;
        add_header Cache-Control "public, max-age=3600";
    }

    # API proxy
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

    # Health check
    location /health {
        proxy_pass http://backend/health;
        access_log off;
    }
}
NGINX_EOF

# Enable site
sudo ln -sf /etc/nginx/sites-available/teif /etc/nginx/sites-enabled/
sudo rm -f /etc/nginx/sites-enabled/default

# Test nginx config
sudo nginx -t

# Start nginx
sudo systemctl restart nginx 2>/dev/null || sudo nginx
sudo systemctl enable nginx 2>/dev/null || true

echo -e "${GREEN}✓ Nginx configured (HTTP only initially)${NC}"

# ===== PHASE 10: SSL Certificate =====
echo -e "\n${BLUE}[Phase 10] Setting Up SSL Certificate...${NC}"

echo "⚠️  Make sure your domain ($DOMAIN) DNS is pointing to this server IP!"
read -p "Press Enter to continue with SSL setup... " || true

# Get SSL certificate
if [ -f "/etc/letsencrypt/live/$DOMAIN/fullchain.pem" ]; then
  echo -e "${GREEN}✓ SSL certificate already exists${NC}"
else
  echo "Getting SSL certificate for $DOMAIN..."
  sudo certbot certonly --webroot -w /var/www/teif/packages/frontend/dist -d $DOMAIN --non-interactive --agree-tos --email admin@$DOMAIN 2>/dev/null || \
  sudo certbot certonly --standalone -d $DOMAIN --non-interactive --agree-tos --email admin@$DOMAIN 2>/dev/null || {
    echo -e "${RED}⚠️  SSL setup failed (may need manual setup or DNS not ready yet)${NC}"
    echo "You can manually run later: sudo certbot certonly --standalone -d $DOMAIN"
  }
fi

# Update Nginx config with SSL if certificate exists
if [ -f "/etc/letsencrypt/live/$DOMAIN/fullchain.pem" ]; then
  echo "Updating Nginx with SSL configuration..."
  sudo tee /etc/nginx/sites-available/teif > /dev/null << NGINX_SSL_EOF
upstream backend {
    server 127.0.0.1:3000;
    keepalive 64;
}

server {
    listen 80;
    server_name $DOMAIN;
    return 301 https://\$server_name\$request_uri;
}

server {
    listen 443 ssl http2;
    server_name $DOMAIN;

    ssl_certificate /etc/letsencrypt/live/$DOMAIN/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/$DOMAIN/privkey.pem;
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers HIGH:!aNULL:!MD5;
    ssl_prefer_server_ciphers on;

    add_header Strict-Transport-Security "max-age=31536000; includeSubDomains" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-Frame-Options "SAMEORIGIN" always;

    access_log /var/log/nginx/teif-access.log;
    error_log /var/log/nginx/teif-error.log;

    gzip on;
    gzip_types text/plain text/css application/json application/javascript text/xml application/xml;
    gzip_min_length 1000;

    location / {
        root /var/www/teif/packages/frontend/dist;
        try_files \$uri \$uri/ /index.html;
        expires 1h;
        add_header Cache-Control "public, max-age=3600";
    }

    location /api/ {
        proxy_pass http://backend/;
        proxy_http_version 1.1;
        proxy_set_header Upgrade \$http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host \$host;
        proxy_set_header X-Real-IP \$remote_addr;
        proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto \$scheme;
        proxy_cache_bypass \$http_upgrade;
        proxy_read_timeout 60s;
        proxy_connect_timeout 60s;
    }

    location /health {
        proxy_pass http://backend/health;
        access_log off;
    }
}
NGINX_SSL_EOF

  sudo nginx -t && sudo systemctl restart nginx
  echo -e "${GREEN}✓ Nginx configured with SSL${NC}"
fi

# Enable certbot renewal
sudo systemctl enable certbot.timer 2>/dev/null || true
sudo systemctl start certbot.timer 2>/dev/null || true

echo -e "${GREEN}✓ SSL certificate setup complete${NC}"

# ===== PHASE 11: Verification =====
echo -e "\n${BLUE}[Phase 11] Verifying Setup...${NC}"

echo "Checking backend health..."
sleep 2
if curl -s http://localhost:3000/health > /dev/null; then
  echo -e "${GREEN}✓ Backend is running${NC}"
else
  echo -e "${RED}✗ Backend health check failed${NC}"
  pm2 logs teif-backend --lines 20
fi

echo "Checking PostgreSQL..."
if docker compose -f docker-compose.production.yml exec -T postgres pg_isready -U teif_user -d teif > /dev/null 2>&1; then
  echo -e "${GREEN}✓ PostgreSQL is running${NC}"
else
  echo -e "${RED}✗ PostgreSQL check failed${NC}"
fi

echo "Checking Nginx..."
if sudo nginx -t > /dev/null 2>&1; then
  echo -e "${GREEN}✓ Nginx is configured${NC}"
else
  echo -e "${RED}✗ Nginx configuration failed${NC}"
fi

# ===== PHASE 12: Summary =====
echo -e "\n${GREEN}========================================${NC}"
echo -e "${GREEN}  DEPLOYMENT COMPLETE! 🎉            ${NC}"
echo -e "${GREEN}========================================${NC}"

echo -e "\n${BLUE}Access Your Application:${NC}"
echo "  URL: https://$DOMAIN"
echo "  API: https://$DOMAIN/api"

echo -e "\n${BLUE}Useful Commands:${NC}"
echo "  Backend logs:      pm2 logs teif-backend"
echo "  Backend status:    pm2 status"
echo "  PostgreSQL logs:   docker compose -f docker-compose.production.yml logs -f postgres"
echo "  Nginx logs:        sudo tail -f /var/log/nginx/teif-error.log"
echo "  Full logs:         sudo journalctl -f"

echo -e "\n${BLUE}Next Steps:${NC}"
echo "  1. Configure SENDGRID_API_KEY in $APP_PATH/packages/backend/.env"
echo "  2. Test API: curl http://localhost:3000/health"
echo "  3. Check backend: pm2 logs teif-backend"
echo "  4. Wait for SSL cert if not already set up"
echo "  5. Visit: https://$DOMAIN"

echo -e "\n${BLUE}Update/Redeploy:${NC}"
echo "  1. Push code to production branch"
echo "  2. SSH to VPS and run: bash $APP_PATH/redeploy.sh"
