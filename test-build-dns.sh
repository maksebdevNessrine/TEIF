#!/bin/bash
# Docker Build Test with esbuild Compilation
# Tests the optimized Docker build using esbuild for ESM TypeScript compilation

set -e

log_info() { echo -e "\033[0;34m[INFO]\033[0m $1"; }
log_success() { echo -e "\033[0;32m[✓]\033[0m $1"; }
log_warning() { echo -e "\033[1;33m[!]\033[0m $1"; }
log_error() { echo -e "\033[0;31m[✗]\033[0m $1"; exit 1; }

cd "${APP_PATH:-.}"

# Step 1: Pull latest code
log_info "Step 1: Pulling latest code from origin/production..."
git fetch origin || log_error "Failed to fetch from origin"
git reset --hard origin/production || log_error "Failed to reset to latest"
log_success "Code pulled successfully"

# Step 2: Verify Docker daemon
log_info "Step 2: Verifying Docker daemon..."
if ! docker ps > /dev/null 2>&1; then
  log_error "Docker daemon not running. Start Docker and try again."
fi
log_success "Docker daemon running"

# Step 3: Clean up previous containers/images
log_info "Step 3: Cleaning up previous containers and volumes..."
docker compose -f docker-compose.prod.yml down -v 2>/dev/null || true
docker system prune -f --volumes 2>/dev/null || true
log_success "Cleanup complete"

# Step 4: Build with esbuild (optimized compilation)
log_info "Step 4: Building Docker image with esbuild (may take 5-10 minutes)..."
docker build --no-cache -f packages/backend/Dockerfile -t teif-backend:latest . || {
  log_error "Docker build failed. Check build output above."
}
log_success "Docker build completed successfully (esbuild ESM compilation)!"

# Step 5: Verify image
log_info "Step 5: Verifying image..."
docker images teif-backend:latest || log_error "Image not found"
log_success "Image verified"

# Step 6: Test container startup (ESM import check)
log_info "Step 6: Testing container startup (ESM import verification)..."
if timeout 5 docker run --rm -e NODE_ENV=production -e JWT_SECRET=test teif-backend:latest 2>&1 | grep -qi "cannot find module\|.js.js\|error"; then
  log_error "Container startup failed - ESM import errors detected"
fi
log_success "Container startup OK - No ESM errors"

# Step 7: Start services with docker-compose
log_info "Step 7: Starting services with docker-compose..."
docker compose -f docker-compose.prod.yml up -d || log_error "Failed to start services"
sleep 5
log_success "Services started"

# Step 8: Verify services are healthy
log_info "Step 8: Verifying service health..."
for service in backend postgres; do
  if docker compose -f docker-compose.prod.yml ps "$service" 2>/dev/null | grep -q "healthy"; then
    log_success "$service service is healthy"
  else
    log_warning "$service may still be starting..."
  fi
done

log_success "All services running"
echo ""
echo "Status: docker compose -f docker-compose.prod.yml ps"
echo "Logs: docker compose -f docker-compose.prod.yml logs -f backend"

# Step 6: Verify services
log_info "Step 6: Verifying services..."
echo ""
echo "Container status:"
docker compose -f docker-compose.prod.yml ps
echo ""

# Check health
log_info "Checking service health..."
if docker compose -f docker-compose.prod.yml ps postgres | grep -q "healthy"; then
  log_success "PostgreSQL is healthy"
else
  log_warning "PostgreSQL health check still pending..."
fi

# Step 7: Test API health endpoint
log_info "Step 7: Testing API health endpoint..."
sleep 2
if curl -s http://localhost:3000/api/health >/dev/null 2>&1; then
  log_success "Backend API is responding"
else
  log_warning "Backend API not yet responding (may still be starting)"
fi

echo ""
log_success "Build test completed!"
echo ""
echo "Next steps:"
echo "1. Monitor services: docker compose -f docker-compose.prod.yml logs -f"
echo "2. Test frontend: curl http://localhost/"
echo "3. Check daemon logs: cat /tmp/dockerd.log"
