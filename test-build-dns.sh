#!/bin/bash
# WSL Docker Build Test with DNS Configuration
# Tests the Debian Slim Dockerfiles with Docker daemon DNS configuration

set -e

log_info() { echo -e "\033[0;34m[INFO]\033[0m $1"; }
log_success() { echo -e "\033[0;32m[✓]\033[0m $1"; }
log_warning() { echo -e "\033[1;33m[!]\033[0m $1"; }
log_error() { echo -e "\033[0;31m[✗]\033[0m $1"; exit 1; }

cd /opt/teif

# Step 1: Pull latest DNS configuration
log_info "Step 1: Pulling latest code with DNS configuration..."
git pull origin production 2>/dev/null || log_error "Failed to pull from origin"
log_success "Code pulled successfully"

# Step 2: Restart Docker daemon with new configuration
log_info "Step 2: Restarting Docker daemon..."
pkill -f dockerd 2>/dev/null || true
sleep 2

# Start dockerd in background
dockerd > /tmp/dockerd.log 2>&1 &
sleep 3

# Verify daemon is running
if [ ! -S /var/run/docker.sock ]; then
  log_error "Docker daemon failed to start. Check /tmp/dockerd.log"
fi
log_success "Docker daemon running with DNS configuration"

# Step 3: Clean up previous containers/images
log_info "Step 3: Cleaning up previous containers and volumes..."
docker compose -f docker-compose.prod.yml down -v 2>/dev/null || true
log_success "Cleanup complete"

# Step 4: Build with new DNS configuration
log_info "Step 4: Building Docker images with DNS configuration (this may take 3-5 minutes)..."
docker compose -f docker-compose.prod.yml build --no-cache || {
  log_error "Docker build failed. Check /tmp/dockerd.log for daemon issues."
}
log_success "Docker build completed successfully!"

# Step 5: Start services
log_info "Step 5: Starting services..."
docker compose -f docker-compose.prod.yml up -d || log_error "Failed to start services"
sleep 5
log_success "Services started"

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
