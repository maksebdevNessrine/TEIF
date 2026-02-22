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
TEST_MODE="${TEST_MODE:-false}"

# Detect test mode from domain
if [[ "$DOMAIN" == "test.local" ]] || [[ "$DOMAIN" == "localhost" ]]; then
  TEST_MODE=true
fi

# ============================================
# PRE-FLIGHT CHECKS
# ============================================
log_info "Running pre-flight checks..."

if [ "$EUID" -ne 0 ]; then
  log_error "This script must be run as root"
fi

# Check OS
if ! grep -qi ubuntu /etc/os-release; then
  log_error "This script requires Ubuntu. Detected: $(cat /etc/os-release | grep PRETTY_NAME)"
fi
log_success "Ubuntu detected"

# ============================================
# 1. SYSTEM UPDATES & DEPENDENCIES
# ============================================
log_info "Updating system packages..."
apt-get update -qq || log_error "Failed to update package list"
apt-get upgrade -y -qq || log_error "Failed to upgrade packages"

log_info "Installing base dependencies..."
apt-get install -y -qq \
  curl wget git \
  ufw certbot python3-certbot-nginx \
  openssl ca-certificates \
  apt-transport-https software-properties-common \
  || log_error "Failed to install base dependencies"
log_success "Base dependencies installed"

# ============================================
# 1.1 INSTALL DOCKER
# ============================================
log_info "Checking for Docker installation..."

# Check if docker command exists and works
if docker --version &> /dev/null 2>&1 && [ $? -eq 0 ]; then
  DOCKER_VERSION=$(docker --version 2>/dev/null)
  log_success "Docker already installed: $DOCKER_VERSION"
  DOCKER_INSTALLED=true
else
  log_info "Docker not found or not working. Installing Docker..."
  DOCKER_INSTALLED=false
fi

# Install Docker if needed
if [ "$DOCKER_INSTALLED" = false ]; then
  # Detect if running in WSL
  if grep -qi microsoft /proc/version; then
    log_warning "WSL detected. Docker Desktop integration recommended."
    log_info "To use Docker Desktop with WSL 2:"
    log_info "  1. Open Docker Desktop on Windows"
    log_info "  2. Settings > Resources > WSL Integration"
    log_info "  3. Enable 'Ubuntu-VPS'"
    log_info "  4. Restart Docker Desktop"
    log_info "  5. Then run this script again"
    log_warning "Alternatively, installing native Docker in WSL..."
  fi
  
  # Add Docker GPG key
  curl -fsSL https://download.docker.com/linux/ubuntu/gpg 2>/dev/null | gpg --dearmor -o /usr/share/keyrings/docker-archive-keyring.gpg 2>/dev/null || \
    log_error "Failed to download Docker GPG key"
  
  # Add Docker repository
  echo \
    "deb [arch=amd64 signed-by=/usr/share/keyrings/docker-archive-keyring.gpg] https://download.docker.com/linux/ubuntu \
    $(lsb_release -cs) stable" | tee /etc/apt/sources.list.d/docker.list > /dev/null 2>&1 || \
    log_error "Failed to add Docker repository"
  
  # Install Docker
  apt-get update -qq 2>/dev/null || log_error "Failed to update after adding Docker repo"
  apt-get install -y -qq docker-ce docker-ce-cli containerd.io docker-compose-plugin 2>/dev/null || \
    log_error "Failed to install Docker packages"
  
  # Try to start Docker
  if systemctl is-system-running &> /dev/null; then
    systemctl start docker 2>/dev/null || log_warning "Could not start Docker service via systemctl"
    systemctl enable docker 2>/dev/null || log_warning "Could not enable Docker service"
  else
    log_warning "systemd not available. WSL might need Docker Desktop integration"
  fi
  
  # Final verification
  if docker --version &> /dev/null 2>&1; then
    log_success "Docker installed: $(docker --version 2>/dev/null)"
  else
    log_error "Docker installation failed. Please enable Docker Desktop WSL 2 integration or check installation manually."
  fi
fi

# ============================================
# 1.2 INSTALL DOCKER COMPOSE (Standalone)
# ============================================
log_info "Checking for docker-compose installation..."

# Check if docker-compose command exists and works
if docker-compose --version &> /dev/null 2>&1 && [ $? -eq 0 ]; then
  COMPOSE_VERSION=$(docker-compose --version 2>/dev/null)
  log_success "docker-compose already installed: $COMPOSE_VERSION"
  COMPOSE_INSTALLED=true
else
  log_info "docker-compose not found or not working. Installing..."
  COMPOSE_INSTALLED=false
fi

if [ "$COMPOSE_INSTALLED" = false ]; then
  # Get latest version with fallback
  DOCKER_COMPOSE_VERSION=$(curl -s https://api.github.com/repos/docker/compose/releases/latest 2>/dev/null | grep 'tag_name' | cut -d'"' -f4) || \
    DOCKER_COMPOSE_VERSION="v2.20.0"
  
  log_info "Downloading docker-compose ${DOCKER_COMPOSE_VERSION}..."
  
  curl -fL "https://github.com/docker/compose/releases/download/${DOCKER_COMPOSE_VERSION}/docker-compose-$(uname -s)-$(uname -m)" \
    -o /usr/local/bin/docker-compose 2>/dev/null || log_error "Failed to download docker-compose"
  
  chmod +x /usr/local/bin/docker-compose || log_error "Failed to make docker-compose executable"
  
  if docker-compose --version &> /dev/null 2>&1; then
    log_success "docker-compose installed: $(docker-compose --version 2>/dev/null)"
  else
    log_error "docker-compose installation failed"
  fi
fi

# ============================================
# 1.3 VERIFY ALL DEPENDENCIES
# ============================================
log_info "Verifying all dependencies..."

REQUIRED_CMDS=("docker" "docker-compose" "git" "curl" "certbot")
MISSING_DEPS=0

for cmd in "${REQUIRED_CMDS[@]}"; do
  if $cmd --version &> /dev/null 2>&1; then
    VERSION=$($cmd --version 2>&1 | head -1)
    log_success "$cmd: $VERSION"
  else
    log_warning "$cmd: NOT AVAILABLE"
    MISSING_DEPS=$((MISSING_DEPS + 1))
  fi
done

# Verify docker daemon is accessible
if docker info &> /dev/null 2>&1; then
  log_success "Docker daemon is accessible"
else
  log_warning "Docker daemon is not accessible. Check Docker Desktop WSL 2 integration or systemd."
fi

if [ $MISSING_DEPS -gt 0 ]; then
  log_error "Missing $MISSING_DEPS required dependencies. Please fix and try again."
fi

log_success "All critical dependencies verified"

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
# 6. SSL CERTIFICATE (Let's Encrypt or Self-Signed)
# ============================================
log_info "Setting up SSL certificate..."

if [ "$TEST_MODE" = true ]; then
  log_warning "TEST MODE: Using self-signed certificate for $DOMAIN"
  mkdir -p /etc/nginx/ssl
  
  if [ ! -f "/etc/nginx/ssl/cert.pem" ]; then
    openssl req -x509 -nodes -days 365 -newkey rsa:2048 \
      -keyout /etc/nginx/ssl/key.pem \
      -out /etc/nginx/ssl/cert.pem \
      -subj "/CN=$DOMAIN/O=TEIF-Test/C=TN"
    log_success "Self-signed certificate created for testing"
  else
    log_success "Self-signed certificate already exists"
  fi
else
  # Production: Use Let's Encrypt
  if [ ! -f "/etc/letsencrypt/live/${DOMAIN}/fullchain.pem" ]; then
    log_info "Requesting new SSL certificate from Let's Encrypt..."
    
    if certbot certonly --standalone \
      -d "$DOMAIN" \
      -d "www.${DOMAIN}" \
      --non-interactive \
      --agree-tos \
      --email "$EMAIL" 2>&1; then
      # Create auto-renewal
      echo "0 3 * * * /usr/bin/certbot renew --quiet" | crontab -
      log_success "SSL certificate installed and auto-renewal configured"
    else
      log_error "Failed to obtain SSL certificate from Let's Encrypt. Check your domain and email."
    fi
  else
    log_success "SSL certificate already exists"
  fi
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
