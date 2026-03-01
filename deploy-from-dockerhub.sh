#!/bin/bash
# Simple deployment script for TEIF from Docker Hub images
# Usage: bash deploy-from-dockerhub.sh

set -e

# ============================================
# COLORS FOR OUTPUT
# ============================================
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

log_info() { echo -e "${BLUE}[INFO]${NC} $1"; }
log_success() { echo -e "${GREEN}[✓]${NC} $1"; }
log_warning() { echo -e "${YELLOW}[!]${NC} $1"; }
log_error() { echo -e "${RED}[✗]${NC} $1"; exit 1; }

# ============================================
# PRE-FLIGHT CHECKS
# ============================================
log_info "Running pre-flight checks..."

# Check for docker
if ! docker --version &>/dev/null; then
  log_error "Docker is not installed or not in PATH"
fi
log_success "Docker found: $(docker --version)"

# Check for docker-compose
if ! docker compose version &>/dev/null; then
  log_error "Docker Compose is not installed"
fi
log_success "Docker Compose found: $(docker compose version | head -1)"

# Check for required files
if [ ! -f "docker-compose.prod.yml" ]; then
  log_error "docker-compose.prod.yml not found in current directory"
fi

if [ ! -f ".env.production" ]; then
  log_error ".env.production not found in current directory"
fi
log_success "Configuration files found"

# ============================================
# PULL LATEST IMAGES FROM DOCKER HUB
# ============================================
log_info "Pulling latest images from Docker Hub..."

echo ""
log_info "Pulling backend image..."
docker pull maksebdev3/teif-backend:latest
log_success "Backend image pulled"

log_info "Pulling frontend image..."
docker pull maksebdev3/teif-frontend:latest
log_success "Frontend image pulled"

# ============================================
# SHUTDOWN EXISTING SERVICES
# ============================================
log_info "Shutting down existing services..."
docker compose -f docker-compose.prod.yml down -v 2>/dev/null || true
log_success "Services stopped"

# ============================================
# START SERVICES
# ============================================
log_info "Starting services..."
docker compose -f docker-compose.prod.yml --env-file .env.production up -d

log_success "Services started"

# ============================================
# WAIT FOR SERVICES TO BE HEALTHY
# ============================================
log_info "Waiting for services to be healthy (timeout: 60 seconds)..."

# Wait for PostgreSQL
log_info "Waiting for PostgreSQL..."
for i in {1..30}; do
  if docker compose -f docker-compose.prod.yml exec -T postgres pg_isready -U postgres &>/dev/null; then
    log_success "PostgreSQL is ready"
    break
  fi
  echo -n "."
  sleep 2
done

# Wait for Backend API
log_info "Waiting for Backend API..."
for i in {1..30}; do
  if curl -s http://localhost:3000/api/health &>/dev/null; then
    log_success "Backend API is ready"
    break
  fi
  echo -n "."
  sleep 2
done

# Wait for Frontend
log_info "Waiting for Frontend..."
for i in {1..30}; do
  if curl -s http://localhost/ &>/dev/null; then
    log_success "Frontend is ready"
    break
  fi
  echo -n "."
  sleep 2
done

# ============================================
# VERIFY ALL SERVICES
# ============================================
echo ""
log_info "Verifying all services..."

log_info "Running containers:"
docker compose -f docker-compose.prod.yml ps

echo ""
log_info "Testing endpoints..."

log_info "Testing Frontend (http://localhost)..."
if curl -s http://localhost/ &>/dev/null; then
  log_success "✓ Frontend responding"
else
  log_warning "✗ Frontend not responding"
fi

log_info "Testing Backend API (http://localhost:3000/api/health)..."
if curl -s http://localhost:3000/api/health | grep -q '"status"'; then
  log_success "✓ Backend API responding"
else
  log_warning "✗ Backend API not responding"
fi

log_info "Testing PostgreSQL..."
if docker compose -f docker-compose.prod.yml exec -T postgres pg_isready -U postgres &>/dev/null; then
  log_success "✓ PostgreSQL ready"
else
  log_warning "✗ PostgreSQL not ready"
fi

# ============================================
# DEPLOYMENT SUMMARY
# ============================================
echo ""
log_success "======================================="
log_success "DEPLOYMENT COMPLETE"
log_success "======================================="
log_success "Frontend:  http://localhost"
log_success "Backend:   http://localhost:3000/api"
log_success "Database:  postgres (internal)"
log_success "======================================="
log_success ""
log_success "To view logs:"
log_success "  docker compose -f docker-compose.prod.yml logs -f [service]"
log_success ""
log_success "To stop services:"
log_success "  docker compose -f docker-compose.prod.yml down"
log_success ""
log_success "To restart services:"
log_success "  docker compose -f docker-compose.prod.yml restart"
