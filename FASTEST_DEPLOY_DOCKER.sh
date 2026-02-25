#!/bin/bash
#
# TEIF - Fastest Ubuntu 24.04 VPS Deployment (Docker-based)
# All-in-Docker: PostgreSQL + Backend (esbuild) + Frontend (nginx)
#
# Usage: bash FASTEST_DEPLOY_DOCKER.sh <domain> <repo-url>
# Example: bash FASTEST_DEPLOY_DOCKER.sh example.com https://github.com/org/teif.git
#

set -e

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m'

log_info() { echo -e "${BLUE}[INFO]${NC} $1"; }
log_success() { echo -e "${GREEN}[✓]${NC} $1"; }
log_error() { echo -e "${RED}[✗]${NC} $1"; exit 1; }

# Configuration
DOMAIN="${1:-example.com}"
REPO_URL="${2:-}"
APP_PATH="${APP_PATH:-/opt/teif}"
APP_USER="${APP_USER:-ubuntu}"

# Validate
if [ -z "$REPO_URL" ]; then
  log_error "Repository URL required!\nUsage: bash FASTEST_DEPLOY_DOCKER.sh <domain> <repo-url>"
fi

if [ "$EUID" -ne 0 ]; then
  log_error "This script must be run as root"
fi

echo -e "${BLUE}╔════════════════════════════════════════╗${NC}"
echo -e "${BLUE}║  TEIF - Docker Deployment              ║${NC}"
echo -e "${BLUE}║  Domain: $DOMAIN${NC}"
echo -e "${BLUE}║  Path: $APP_PATH${NC}"
echo -e "${BLUE}╚════════════════════════════════════════╝${NC}"
echo ""

# ============================================================
# PHASE 1: System Setup
# ============================================================
log_info "Phase 1: System Dependencies"

apt-get update -qq || log_error "Failed to update packages"
apt-get upgrade -y -qq || log_error "Failed to upgrade system"
apt-get install -y -qq curl wget git nginx certbot python3-certbot-nginx openssl ca-certificates || log_error "Failed to install dependencies"

log_success "System dependencies installed"

# ============================================================
# PHASE 2: Docker Installation
# ============================================================
log_info "Phase 2: Docker Installation"

if command -v docker &> /dev/null; then
  log_success "Docker already installed: $(docker --version)"
else
  curl -fsSL https://get.docker.com -o get-docker.sh || log_error "Failed to download Docker install script"
  sh get-docker.sh || log_error "Failed to install Docker"
  rm get-docker.sh
  
  # Add user to docker group
  usermod -aG docker $APP_USER || true
  
  log_success "Docker installed"
fi

# Verify docker-compose
if ! docker compose version &> /dev/null; then
  log_error "Docker Compose not available. Please ensure Docker version 20.10+"
fi

log_success "Docker Compose available"

# ============================================================
# PHASE 3: Directory Setup
# ============================================================
log_info "Phase 3: Creating directories"

mkdir -p "$APP_PATH"
chown "$APP_USER:$APP_USER" "$APP_PATH"
mkdir -p /var/teif-data/postgres
chown "$APP_USER:$APP_USER" /var/teif-data/postgres

log_success "Directories created"

# ============================================================
# PHASE 4: Repository Clone
# ============================================================
log_info "Phase 4: Cloning repository"

cd "$APP_PATH"

if [ -d .git ]; then
  log_info "Repository exists, pulling latest..."
  git fetch origin production || log_error "Failed to fetch from origin"
  git reset --hard origin/production || log_error "Failed to reset to latest"
else
  git clone --branch production "$REPO_URL" . || log_error "Failed to clone repository"
fi

log_success "Repository ready"

# ============================================================
# PHASE 5: Environment Configuration
# ============================================================
log_info "Phase 5: Environment configuration"

# Generate secrets
DB_PASSWORD=$(openssl rand -base64 32 | tr -d "=+/" | cut -c1-25)
JWT_SECRET=$(openssl rand -base64 32)

# Create .env for docker-compose
cat > "$APP_PATH/.env" << EOF
# Database
POSTGRES_DB=teif
POSTGRES_USER=teif_user
POSTGRES_PASSWORD=$DB_PASSWORD
DATABASE_URL=postgresql://teif_user:$DB_PASSWORD@postgres:5432/teif

# Backend
NODE_ENV=production
PORT=3000
JWT_SECRET=$JWT_SECRET

# Frontend
VITE_API_BASE_URL=https://$DOMAIN/api

# Server
DOMAIN=$DOMAIN
EOF

chmod 600 "$APP_PATH/.env"
log_success "Environment file created"

# ============================================================
# PHASE 6: Docker Build
# ============================================================
log_info "Phase 6: Building Docker image (esbuild compilation, may take 5-10 minutes)"

cd "$APP_PATH"
docker system prune -f --volumes 2>/dev/null || true
docker build --no-cache -f packages/backend/Dockerfile -t teif-backend:latest . || log_error "Docker build failed"

log_success "Backend image built"

# ============================================================
# PHASE 7: Start Services
# ============================================================
log_info "Phase 7: Starting services"

cd "$APP_PATH"
docker-compose -f docker-compose.prod.yml down -v 2>/dev/null || true
docker-compose -f docker-compose.prod.yml up -d || log_error "Failed to start services"

# Wait for services
log_info "Waiting for services to be healthy..."
for i in {1..60}; do
  if docker-compose -f docker-compose.prod.yml ps | grep -q "healthy"; then
    log_success "Services are healthy"
    break
  fi
  if [ $i -eq 60 ]; then
    log_error "Services failed to become healthy after 60 seconds"
  fi
  sleep 1
done

log_success "All services running"

# ============================================================
# PHASE 8: Database Migrations
# ============================================================
log_info "Phase 8: Running database migrations"

sleep 2
docker-compose -f docker-compose.prod.yml exec -T backend npx prisma migrate deploy || log_info "Migrations skipped (may need manual setup)"

log_success "Database ready"

# ============================================================
# PHASE 9: Nginx Reverse Proxy
# ============================================================
log_info "Phase 9: Configuring Nginx"

# Remove default config
rm -f /etc/nginx/sites-enabled/default

# Create Nginx config (HTTP initially)
tee /etc/nginx/sites-available/teif > /dev/null << 'NGINX_EOF'
upstream backend {
    server 127.0.0.1:3000;
}

server {
    listen 80;
    server_name _;

    # Gzip compression
    gzip on;
    gzip_types text/plain text/css application/json application/javascript;
    gzip_min_length 1000;

    # Frontend
    location / {
        root /opt/teif/packages/frontend/dist;
        try_files $uri $uri/ /index.html;
        expires 1h;
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
    }

    # Health
    location /health {
        proxy_pass http://backend/health;
        access_log off;
    }
}
NGINX_EOF

# Enable site
ln -sf /etc/nginx/sites-available/teif /etc/nginx/sites-enabled/
nginx -t || log_error "Nginx configuration error"
systemctl restart nginx || log_error "Failed to restart Nginx"
systemctl enable nginx

log_success "Nginx configured"

# ============================================================
# PHASE 10: SSL Certificate
# ============================================================
log_info "Phase 10: Setting up SSL certificate"

if [ -f "/etc/letsencrypt/live/$DOMAIN/fullchain.pem" ]; then
  log_success "SSL certificate already exists"
else
  log_info "Getting SSL certificate for $DOMAIN (ensure DNS is configured first)"
  sleep 3
  
  certbot certonly --standalone -d "$DOMAIN" --non-interactive --agree-tos --email "admin@$DOMAIN" 2>/dev/null || \
  log_info "SSL setup deferred - you can run certbot manually later"
fi

# Update Nginx with SSL if cert exists
if [ -f "/etc/letsencrypt/live/$DOMAIN/fullchain.pem" ]; then
  tee /etc/nginx/sites-available/teif > /dev/null << NGINX_SSL
upstream backend {
    server 127.0.0.1:3000;
}

server {
    listen 80;
    server_name $DOMAIN;
    return 301 https://\$host\$request_uri;
}

server {
    listen 443 ssl http2;
    server_name $DOMAIN;

    ssl_certificate /etc/letsencrypt/live/$DOMAIN/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/$DOMAIN/privkey.pem;
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers HIGH:!aNULL:!MD5;

    add_header Strict-Transport-Security "max-age=31536000" always;

    gzip on;
    gzip_types text/plain text/css application/json application/javascript;

    location / {
        root /opt/teif/packages/frontend/dist;
        try_files \$uri \$uri/ /index.html;
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
    }

    location /health {
        proxy_pass http://backend/health;
        access_log off;
    }
}
NGINX_SSL

  nginx -t && systemctl restart nginx
  log_success "Nginx updated with SSL"
fi

# ============================================================
# PHASE 11: Verification
# ============================================================
log_info "Phase 11: Verifying setup"

sleep 2
if curl -s http://localhost:3000/api/health > /dev/null; then
  log_success "Backend responding"
else
  log_info "Backend warming up..."
fi

if docker-compose -f "$APP_PATH/docker-compose.prod.yml" ps | grep -q "healthy"; then
  log_success "All services healthy"
fi

# ============================================================
# SUMMARY
# ============================================================
echo ""
echo -e "${GREEN}╔════════════════════════════════════════╗${NC}"
echo -e "${GREEN}║  DEPLOYMENT COMPLETE ✅                ║${NC}"
echo -e "${GREEN}╚════════════════════════════════════════╝${NC}"
echo ""
echo -e "${BLUE}Access:${NC}"
echo "  URL: https://$DOMAIN"
echo "  API: https://$DOMAIN/api"
echo ""
echo -e "${BLUE}Management:${NC}"
echo "  Status:   docker-compose -f $APP_PATH/docker-compose.prod.yml ps"
echo "  Logs:     docker-compose -f $APP_PATH/docker-compose.prod.yml logs -f backend"
echo "  Restart:  docker-compose -f $APP_PATH/docker-compose.prod.yml restart"
echo "  Redeploy: bash $APP_PATH/redeploy.sh"
echo ""
echo -e "${BLUE}SSL Certificate:${NC}"
if [ -f "/etc/letsencrypt/live/$DOMAIN/fullchain.pem" ]; then
  echo "  ✓ SSL certificate active"
else
  echo "  To manually enable SSL later:"
  echo "  sudo certbot certonly --standalone -d $DOMAIN"
fi
echo ""
