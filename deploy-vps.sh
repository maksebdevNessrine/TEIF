#!/bin/bash
# TEIF Production Deployment Script for Ubuntu VPS
# Usage: bash deploy-vps.sh
# This script deploys TEIF stack on a fresh Ubuntu VPS with full security hardening

set -e

# ============================================
# COLORS FOR OUTPUT
# ============================================
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

log_info() { echo -e "${BLUE}[INFO]${NC} $1"; }
log_success() { echo -e "${GREEN}[✓]${NC} $1"; }
log_warning() { echo -e "${YELLOW}[!]${NC} $1"; }
log_error() { echo -e "${RED}[✗]${NC} $1"; exit 1; }

# ============================================
# CONFIGURATION
# ============================================
DOMAIN="${DOMAIN:-example.com}"
APP_DIR="/opt/teif"
REPO_URL="${REPO_URL:-https://github.com/your-org/teif.git}"
BRANCH="${BRANCH:-main}"
EMAIL="${EMAIL:-admin@example.com}"

# ============================================
# PRE-FLIGHT CHECKS
# ============================================
log_info "Running pre-flight checks..."

if [ "$EUID" -ne 0 ]; then
  log_error "This script must be run as root"
fi

if ! command -v docker &> /dev/null; then
  log_error "Docker is not installed. Please install Docker first."
fi

if ! command -v docker-compose &> /dev/null; then
  log_error "docker-compose is not installed. Please install docker-compose first."
fi

log_success "All dependencies found"

# ============================================
# 1. SYSTEM UPDATES
# ============================================
log_info "Updating system packages..."
apt-get update -qq
apt-get upgrade -y -qq
apt-get install -y -qq curl wget git ufw certbot python3-certbot-nginx
log_success "System updated"

# ============================================
# 2. FIREWALL CONFIGURATION
# ============================================
log_info "Configuring firewall..."
ufw --force enable
ufw allow 22/tcp    # SSH
ufw allow 80/tcp    # HTTP
ufw allow 443/tcp   # HTTPS
ufw default deny incoming
ufw default allow outgoing
log_success "Firewall configured"

# ============================================
# 3. CREATE APP DIRECTORY
# ============================================
log_info "Creating application directory..."
mkdir -p "$APP_DIR"
cd "$APP_DIR"
log_success "Directory created: $APP_DIR"

# ============================================
# 4. CLONE REPOSITORY
# ============================================
if [ -d ".git" ]; then
  log_info "Updating existing repository..."
  git fetch origin
  git checkout "$BRANCH"
  git pull origin "$BRANCH"
else
  log_info "Cloning repository..."
  git clone --branch "$BRANCH" "$REPO_URL" .
fi
log_success "Repository ready"

# ============================================
# 5. ENVIRONMENT CONFIGURATION
# ============================================
log_info "Configuring environment variables..."

if [ ! -f ".env.production" ]; then
  cat > .env.production <<EOF
# Production Environment Configuration
NODE_ENV=production
LOG_LEVEL=info

# Database - CHANGE THESE VALUES!
POSTGRES_USER=postgres
POSTGRES_PASSWORD=$(openssl rand -base64 32)
POSTGRES_DB=teif_prod

# Generate secure secrets with: openssl rand -base64 32
JWT_SECRET=$(openssl rand -base64 32)
JWT_EXPIRY=3600

# API & Frontend URLs - CHANGE TO YOUR DOMAIN
SITE_URL=https://${DOMAIN}
VITE_API_BASE_URL=https://${DOMAIN}/api
CORS_ORIGIN=https://${DOMAIN}

# SMTP Configuration - CONFIGURE FOR YOUR PROVIDER
SMTP_HOST=smtp.example.com
SMTP_PORT=587
SMTP_USER=noreply@${DOMAIN}
SMTP_PASSWORD=your-secure-password-here
SMTP_FROM=noreply@${DOMAIN}
SMTP_SECURE=true

# Optional AI Features
GEMINI_API_KEY=

# Backup Configuration
BACKUP_RETENTION_DAYS=30
SLACK_WEBHOOK=
EOF
  log_warning "Created .env.production - PLEASE EDIT THIS FILE WITH YOUR CREDENTIALS"
  log_warning "Edit: $APP_DIR/.env.production"
else
  log_success ".env.production exists"
fi

# ============================================
# 6. SSL CERTIFICATE (Let's Encrypt)
# ============================================
log_info "Setting up SSL certificate..."

if [ ! -f "/etc/letsencrypt/live/${DOMAIN}/fullchain.pem" ]; then
  log_info "Requesting new SSL certificate from Let's Encrypt..."
  certbot certonly --standalone \
    -d "$DOMAIN" \
    -d "www.${DOMAIN}" \
    --non-interactive \
    --agree-tos \
    --email "$EMAIL"
  
  # Create auto-renewal
  echo "0 3 * * * /usr/bin/certbot renew --quiet" | crontab -
  log_success "SSL certificate installed and auto-renewal configured"
else
  log_success "SSL certificate already exists"
fi

# ============================================
# 7. BUILD AND DEPLOY
# ============================================
log_info "Building Docker images..."
docker compose -f docker-compose.prod.yml build --no-cache

log_info "Starting services..."
docker compose -f docker-compose.prod.yml down -v 2>/dev/null || true
docker compose -f docker-compose.prod.yml up -d

# Wait for services to be healthy
log_info "Waiting for services to be healthy..."
for i in {1..30}; do
  if docker compose -f docker-compose.prod.yml exec -T postgres pg_isready -U postgres &>/dev/null; then
    log_success "PostgreSQL is ready"
    break
  fi
  sleep 2
done

log_info "Running database migrations..."
docker compose -f docker-compose.prod.yml exec backend npx prisma migrate deploy

log_success "Services deployed and running"

# ============================================
# 8. NGINX REVERSE PROXY
# ============================================
log_info "Configuring nginx reverse proxy..."

cat > /etc/nginx/sites-available/teif <<'NGINX_CONFIG'
upstream backend {
    server localhost:3000;
}

upstream frontend {
    server localhost:80;
}

server {
    listen 80;
    server_name _;
    
    # Redirect all HTTP to HTTPS
    return 301 https://$host$request_uri;
}

server {
    listen 443 ssl http2;
    server_name DOMAIN_PLACEHOLDER www.DOMAIN_PLACEHOLDER;
    
    # SSL Certificates
    ssl_certificate /etc/letsencrypt/live/DOMAIN_PLACEHOLDER/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/DOMAIN_PLACEHOLDER/privkey.pem;
    
    # SSL Configuration
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers HIGH:!aNULL:!MD5;
    ssl_prefer_server_ciphers on;
    ssl_session_cache shared:SSL:10m;
    ssl_session_timeout 10m;
    
    # Security Headers
    add_header Strict-Transport-Security "max-age=31536000; includeSubDomains" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-XSS-Protection "1; mode=block" always;
    add_header Referrer-Policy "strict-origin-when-cross-origin" always;
    
    # Gzip compression
    gzip on;
    gzip_vary on;
    gzip_min_length 1000;
    gzip_types text/plain text/css text/xml text/javascript application/json application/javascript application/xml+rss;
    
    # Frontend (static files)
    location / {
        proxy_pass http://frontend;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        
        # Cache static assets
        location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot)$ {
            expires 1y;
            add_header Cache-Control "public, immutable";
        }
    }
    
    # Backend API
    location /api {
        proxy_pass http://backend;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        
        # API timeouts
        proxy_connect_timeout 60s;
        proxy_send_timeout 60s;
        proxy_read_timeout 60s;
    }
    
    # Health check endpoint
    location /health {
        proxy_pass http://backend/api/health;
        access_log off;
    }
}
NGINX_CONFIG

# Replace domain placeholder
sed -i "s/DOMAIN_PLACEHOLDER/${DOMAIN}/g" /etc/nginx/sites-available/teif

# Enable site
ln -sf /etc/nginx/sites-available/teif /etc/nginx/sites-enabled/teif
rm -f /etc/nginx/sites-enabled/default

# Test nginx config
nginx -t

# Restart nginx
systemctl restart nginx
log_success "Nginx configured and running"

# ============================================
# 9. SETUP BACKUP SCHEDULE
# ============================================
log_info "Setting up automated backups..."
cp "$APP_DIR/backup-and-monitor.sh" /usr/local/bin/teif-backup
chmod +x /usr/local/bin/teif-backup

# Daily backup at 2 AM
echo "0 2 * * * cd $APP_DIR && /usr/local/bin/teif-backup" | crontab -
log_success "Backup scheduled daily at 2 AM"

# ============================================
# 10. SETUP MONITORING
# ============================================
log_info "Setting up monitoring..."

cat > /etc/cron.d/teif-monitor <<EOF
*/5 * * * * curl -sf http://localhost/health > /dev/null || echo "TEIF health check failed" | mail -s "TEIF Alert" $EMAIL
EOF

log_success "Monitoring configured"

# ============================================
# 11. FINAL STATUS
# ============================================
log_success "╔════════════════════════════════════════╗"
log_success "║   TEIF DEPLOYED SUCCESSFULLY!         ║"
log_success "╚════════════════════════════════════════╝"
log_success ""
log_success "🌐 Application URL: https://${DOMAIN}"
log_success "📊 API Endpoint: https://${DOMAIN}/api"
log_success "🔒 SSL Certificate: /etc/letsencrypt/live/${DOMAIN}/"
log_success "📁 Application Directory: ${APP_DIR}"
log_success "🔑 Environment File: ${APP_DIR}/.env.production"
log_success ""
log_warning "NEXT STEPS:"
log_warning "1. Edit ${APP_DIR}/.env.production with your credentials"
log_warning "2. Run: docker compose -f docker-compose.prod.yml restart"
log_warning "3. Verify health: curl https://${DOMAIN}/health"
log_warning "4. Check logs: docker compose -f docker-compose.prod.yml logs -f"
log_warning ""
log_info "Deployment complete! 🚀"
