#!/bin/bash
################################################################################
# TEIF Production VPS Auto-Setup & Deployment Script
# 
# Usage:
#   curl -fsSL https://raw.githubusercontent.com/YOUR_REPO/deploy.sh | bash
#   
# OR manually run:
#   bash deploy.sh
#
# Prerequisites:
#   - Ubuntu 22.04 LTS or later
#   - Root or sudo access
#   - 2GB+ RAM, 20GB+ disk space
################################################################################

set -e  # Exit on any error

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Configuration
APP_NAME="teif"
APP_DIR="/opt/teif"
# Note: Image is built by GitHub Actions and pushed to Docker Hub
# Built from: .github/workflows/docker-build-push.yml
DOCKER_IMAGE="${DOCKER_HUB_USERNAME:-maksebdevnessrine}/teif"
DOCKER_COMPOSE_VERSION="2.20.0"
DOMAIN="${DOMAIN:-localhost}"
PORT="${PORT:-3000}"
DB_PORT="${DB_PORT:-5432}"

# Log functions
log_info() { echo -e "${BLUE}ℹ️  $1${NC}"; }
log_success() { echo -e "${GREEN}✅ $1${NC}"; }
log_warning() { echo -e "${YELLOW}⚠️  $1${NC}"; }
log_error() { echo -e "${RED}❌ $1${NC}"; }

################################################################################
# 1. SYSTEM CHECKS
################################################################################
log_info "=== TEIF VPS Auto-Setup Started ==="
log_info "Checking system requirements..."

# Check if running as root
if [[ $EUID -ne 0 ]]; then
   log_error "This script must be run as root (use sudo)"
   exit 1
fi

# Check OS
if ! grep -qi ubuntu /etc/os-release; then
    log_error "This script is designed for Ubuntu. Your OS may not be supported."
    read -p "Continue anyway? (y/n) " -n 1 -r
    echo
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        exit 1
    fi
fi

log_success "System requirements check passed"

################################################################################
# 2. INSTALL DEPENDENCIES
################################################################################
log_info "=== Installing System Dependencies ==="

# Update package lists
log_info "Updating package manager..."
apt-get update -qq
apt-get upgrade -y -qq

# Install required packages
log_info "Installing Docker & prerequisites..."
apt-get install -y -qq \
    curl \
    wget \
    git \
    jq \
    ca-certificates \
    gnupg \
    lsb-release \
    net-tools \
    htop

log_success "System dependencies installed"

################################################################################
# 3. INSTALL DOCKER
################################################################################
if command -v docker &> /dev/null; then
    log_success "Docker is already installed: $(docker --version)"
else
    log_info "=== Installing Docker Engine ==="
    
    # Remove old Docker if exists
    apt-get remove -y docker docker-engine docker.io containerd runc 2>/dev/null || true
    
    # Add Docker repository
    mkdir -p /etc/apt/keyrings
    curl -fsSL https://download.docker.com/linux/ubuntu/gpg | gpg --dearmor -o /etc/apt/keyrings/docker.gpg
    
    echo \
      "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/ubuntu \
      $(lsb_release -cs) stable" | tee /etc/apt/sources.list.d/docker.list > /dev/null
    
    apt-get update -qq
    
    # Install Docker
    apt-get install -y -qq docker-ce docker-ce-cli containerd.io docker-buildx-plugin
    
    # Start Docker daemon
    systemctl start docker
    systemctl enable docker
    
    log_success "Docker installed and started"
fi

################################################################################
# 4. INSTALL DOCKER COMPOSE
################################################################################
if command -v docker-compose &> /dev/null; then
    log_success "Docker Compose is already installed: $(docker-compose --version)"
else
    log_info "=== Installing Docker Compose ==="
    
    curl -fsSL "https://github.com/docker/compose/releases/download/v${DOCKER_COMPOSE_VERSION}/docker-compose-$(uname -s)-$(uname -m)" \
        -o /usr/local/bin/docker-compose
    
    chmod +x /usr/local/bin/docker-compose
    
    log_success "Docker Compose installed: $(docker-compose --version)"
fi

################################################################################
# 5. CREATE APPLICATION DIRECTORY
################################################################################
log_info "=== Setting Up Application Directory ==="

if [ -d "$APP_DIR" ]; then
    log_warning "Directory $APP_DIR already exists"
else
    mkdir -p "$APP_DIR"
    log_success "Created $APP_DIR"
fi

cd "$APP_DIR"

################################################################################
# 6. DOWNLOAD/CREATE DOCKER COMPOSE FILE
################################################################################
log_info "=== Setting Up Docker Compose Configuration ==="

# Create production docker-compose file
cat > "$APP_DIR/docker-compose.yml" << 'EOF'
version: '3.8'

services:
  postgres:
    image: postgres:16-alpine
    container_name: teif-postgres
    restart: unless-stopped
    environment:
      POSTGRES_USER: ${POSTGRES_USER:-postgres}
      POSTGRES_PASSWORD: ${POSTGRES_PASSWORD}
      POSTGRES_DB: ${POSTGRES_DB:-teif_prod}
      POSTGRES_INITDB_ARGS: "--encoding=UTF8 --locale=en_US.UTF-8"
    volumes:
      - postgres_data:/var/lib/postgresql/data
      - ./backups:/backups
    ports:
      - "${DB_PORT:-5432}:5432"
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U ${POSTGRES_USER:-postgres}"]
      interval: 10s
      timeout: 5s
      retries: 5
      start_period: 30s
    networks:
      - teif-network

  backend:
    image: ${DOCKER_IMAGE}:latest
    container_name: teif-backend
    restart: unless-stopped
    depends_on:
      postgres:
        condition: service_healthy
    environment:
      NODE_ENV: production
      PORT: ${PORT:-3000}
      DATABASE_URL: postgresql://${POSTGRES_USER:-postgres}:${POSTGRES_PASSWORD}@postgres:5432/${POSTGRES_DB:-teif_prod}
      JWT_SECRET: ${JWT_SECRET}
      JWT_REFRESH_SECRET: ${JWT_REFRESH_SECRET}
      FRONTEND_URL: ${FRONTEND_URL:-http://localhost}
      SIGNATURE_ENCRYPTION_KEY: ${SIGNATURE_ENCRYPTION_KEY}
    ports:
      - "${PORT:-3000}:${PORT:-3000}"
    healthcheck:
      test: ["CMD", "curl", "-f", "http://localhost:${PORT:-3000}/api/health"]
      interval: 30s
      timeout: 10s
      retries: 3
      start_period: 40s
    networks:
      - teif-network
    volumes:
      - ./logs:/app/logs

networks:
  teif-network:
    driver: bridge

volumes:
  postgres_data:
    driver: local
EOF

log_success "docker-compose.yml created"

################################################################################
# 7. CREATE ENVIRONMENT FILE
################################################################################
log_info "=== Setting Up Environment Variables ==="

if [ -f "$APP_DIR/.env" ]; then
    log_warning ".env file already exists, keeping existing configuration"
else
    cat > "$APP_DIR/.env" << 'EOF'
# Database Configuration
POSTGRES_USER=postgres
POSTGRES_PASSWORD=generate_strong_password_here_min_32_chars
POSTGRES_DB=teif_prod

# Backend Configuration  
NODE_ENV=production
PORT=3000

# JWT Configuration
JWT_SECRET=generate_jwt_secret_here_min_32_chars
JWT_REFRESH_SECRET=generate_refresh_secret_here_min_32_chars
JWT_EXPIRES_IN=7d

# Frontend
FRONTEND_URL=http://localhost

# Digital Signature (Tunisia)
SIGNATURE_ENCRYPTION_KEY=0123456789abcdef0123456789abcdef0123456789abcdef0123456789abcdef

# Database Port (expose for external access if needed)
DB_PORT=5432

# Docker Hub Image
# Built by GitHub Actions: .github/workflows/docker-build-push.yml
DOCKER_IMAGE=maksebdevnessrine/teif:latest
EOF
    
    log_warning "⚠️  .env file created with placeholder values"
    log_warning "⚠️  EDIT THE `.env` FILE WITH YOUR ACTUAL SECRETS!"
fi

################################################################################
# 8. PULL AND START SERVICES
################################################################################
log_info "=== Pulling Docker Image and Starting Services ==="

# Load environment
set -a
source "$APP_DIR/.env"
set +a

log_info "Pulling latest image: $DOCKER_IMAGE"
if ! docker pull "$DOCKER_IMAGE" 2>/dev/null; then
    log_error "Failed to pull Docker image: $DOCKER_IMAGE"
    echo ""
    log_warning "Image not found on Docker Hub yet. This is normal for first deployment."
    echo ""
    echo "📋 Next Steps:"
    echo "  1. Push code to GitHub (main or production branch):"
    echo "     git push origin production"
    echo ""
    echo "  2. GitHub Actions will automatically:"
    echo "     • Build the Docker image"
    echo "     • Push to Docker Hub"
    echo ""
    echo "  3. Check workflow status at:"
    echo "     https://github.com/maksebdevNessrine/TEIF/actions"
    echo ""
    echo "  4. Once build completes (5-10 min), run this script again:"
    echo "     sudo ./deploy.sh"
    echo ""
    exit 0
fi

log_info "Starting services with docker-compose..."
docker-compose up -d

# Wait for services to be healthy
log_info "Waiting for services to be healthy..."
sleep 15

# Check service status
if docker-compose ps | grep -q "postgres" && docker-compose ps | grep -q "backend"; then
    log_success "Services are running"
else
    log_error "Services failed to start. Check logs:"
    docker-compose logs
    exit 1
fi

################################################################################
# 9. SETUP DATABASE  
################################################################################
log_info "=== Setting Up Database ==="

# Wait for PostgreSQL to be ready
for i in {1..30}; do
    if docker exec teif-postgres pg_isready -U "$POSTGRES_USER" >/dev/null 2>&1; then
        log_success "PostgreSQL is ready"
        break
    fi
    if [ $i -eq 30 ]; then
        log_error "PostgreSQL did not become ready in time"
        exit 1
    fi
    sleep 2
done

# Run migrations (if prisma is configured)
log_info "Running database migrations..."
docker-compose exec -T backend npx prisma migrate deploy || {
    log_warning "Migrations may not be available or already applied"
}

log_success "Database setup complete"

################################################################################
# 10. SETUP FIREWALL
################################################################################
log_info "=== Configuring Firewall ==="

if command -v ufw &> /dev/null; then
    log_info "UFW firewall detected, configuring rules..."
    
    # Enable UFW if not already enabled
    if ! ufw status | grep -q "Status: active"; then
        echo "y" | ufw enable > /dev/null 2>&1
    fi
    
    # Allow SSH
    ufw allow 22/tcp > /dev/null 2>&1
    
    # Allow HTTP/HTTPS
    ufw allow 80/tcp > /dev/null 2>&1
    ufw allow 443/tcp > /dev/null 2>&1
    
    # Allow application port
    ufw allow "$PORT"/tcp > /dev/null 2>&1
    
    log_success "Firewall rules configured"
else
    log_warning "UFW firewall not found, skipping firewall setup"
fi

################################################################################
# 11. SETUP MONITORING & BACKUP
################################################################################
log_info "=== Setting Up Monitoring & Backups ==="

# Create backup script
cat > "$APP_DIR/backup.sh" << 'EOF'
#!/bin/bash
BACKUP_DIR="/opt/teif/backups"
mkdir -p "$BACKUP_DIR"
TIMESTAMP=$(date +%Y%m%d_%H%M%S)
docker exec teif-postgres pg_dump -U ${POSTGRES_USER:-postgres} ${POSTGRES_DB:-teif_prod} | gzip > "$BACKUP_DIR/backup_${TIMESTAMP}.sql.gz"
echo "✅ Backup created: backup_${TIMESTAMP}.sql.gz"
# Keep only last 30 days of backups
find "$BACKUP_DIR" -type f -name "backup_*.sql.gz" -mtime +30 -delete
EOF

chmod +x "$APP_DIR/backup.sh"

# Add backup to cron (daily at 2 AM)
CRON_JOB="0 2 * * * cd /opt/teif && ./backup.sh >> /var/log/teif-backup.log 2>&1"
(crontab -l 2>/dev/null; echo "$CRON_JOB") | crontab -

log_success "Backup script installed (daily at 2 AM)"

################################################################################
# 12. SETUP LOG ROTATION
################################################################################
log_info "=== Setting Up Log Rotation ==="

cat > /etc/logrotate.d/teif << 'EOF'
/opt/teif/logs/*.log {
    daily
    rotate 30
    compress
    delaycompress
    missingok
    notifempty
    create 0640 root root
}
EOF

log_success "Log rotation configured"

################################################################################
# 13. DISPLAY SUMMARY
################################################################################
log_success "=== TEIF VPS Setup Complete ==="
echo ""
echo "════════════════════════════════════════════════════════════════"
echo "  🚀 TEIF Application Successfully Deployed"
echo "════════════════════════════════════════════════════════════════"
echo ""
echo "📍 Application Directory: $APP_DIR"
echo "🐳 Docker Images:"
docker images | grep teif
echo ""
echo "🔄 Running Services:"
docker-compose ps
echo ""
echo "📊 Useful Commands:"
echo "   # View logs:"
echo "   docker-compose logs -f backend"
echo "   docker-compose logs -f postgres"
echo ""
echo "   # Restart services:"
echo "   docker-compose restart"
echo ""
echo "   # Stop services:"
echo "   docker-compose down"
echo ""
echo "   # Update to latest image:"
echo "   docker pull $DOCKER_IMAGE && docker-compose up -d"
echo ""
echo "   # Database backup:"
echo "   ./backup.sh"
echo ""
echo "   # Health check:"
echo "   curl http://localhost:${PORT}/api/health"
echo ""
echo "📝 Next Steps:"
echo "   1. Edit .env with your actual secrets/domain"
echo "   2. Setup SSL with Nginx/Caddy (if using domain)"
echo "   3. Monitor logs: docker-compose logs -f"
echo ""
echo "❓ Help:"
echo "   Logs: docker-compose logs"
echo "   Status: docker-compose ps"
echo "   Exec: docker-compose exec backend bash"
echo ""
echo "════════════════════════════════════════════════════════════════"
