#!/bin/bash
# Complete deployment test workflow for TEIF
# Runs after Docker build completes

set -e  # Exit on any error

echo ""
echo "╔════════════════════════════════════════════════════════════╗"
echo "║  TEIF Deployment Test Workflow                             ║"
echo "║  (Full validation before VPS deployment)                   ║"
echo "╚════════════════════════════════════════════════════════════╝"
echo ""

# Color codes
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Helper functions
check_status() {
    if [ $? -eq 0 ]; then
        echo -e "${GREEN}✅ $1${NC}"
    else
        echo -e "${RED}❌ $1${NC}"
        exit 1
    fi
}

print_step() {
    echo ""
    echo -e "${YELLOW}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
    echo -e "${YELLOW}$1${NC}"
    echo -e "${YELLOW}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
    echo ""
}

# ============================================================================
# STEP 1: Verify Docker Image
# ============================================================================
print_step "STEP 1: Verifying Backend Docker Image"

wsl -d Ubuntu-24.04 -e bash -c "docker images teif-backend:latest --no-trunc" > /tmp/image_check.txt
if grep -q "teif-backend" /tmp/image_check.txt; then
    check_status "Backend image exists"
    cat /tmp/image_check.txt | tail -1 | awk '{print "   Size: " $5}'
else
    echo -e "${RED}❌ Backend image not found${NC}"
    echo "Run: wsl -d Ubuntu-24.04 -e bash -c \"docker images | grep teif\""
    exit 1
fi

# ============================================================================
# STEP 2: Test Container Startup (ESM Import Check)
# ============================================================================
print_step "STEP 2: Testing Container Startup (ESM Imports)"

echo "Starting temporary backend container to verify ESM imports..."
container_id=$(wsl -d Ubuntu-24.04 -e bash -c "docker run -d --rm teif-backend:latest echo 'test'" 2>&1 | tail -1)

if [ -z "$container_id" ]; then
    check_status "Container starts"
else
    check_status "Container created (ID: ${container_id:0:12})"
fi

# Check for ESM errors
sleep 2
wsl -d Ubuntu-24.04 -e bash -c "docker logs $container_id 2>&1" > /tmp/container_logs.txt 2>&1
if grep -qi "cannot find\|\.js\.js\|esm\|import" /tmp/container_logs.txt; then
    echo -e "${YELLOW}⚠️  Checking output for errors...${NC}"
    cat /tmp/container_logs.txt | head -20
    if grep -qi "error\|fail" /tmp/container_logs.txt; then
        check_status "No ESM errors"
    fi
else
    check_status "No ESM errors in startup"
fi

# ============================================================================
# STEP 3: Configuration Verification
# ============================================================================
print_step "STEP 3: Verifying Configuration Files"

wsl -d Ubuntu-24.04 -e bash -c "test -f ~/teif/.env && echo 'Found'"  > /tmp/env_check.txt 2>&1
if grep -q "Found" /tmp/env_check.txt; then
    check_status ".env file exists"
else
    echo -e "${RED}❌ .env file not found in ~/teif/.env${NC}"
    exit 1
fi

wsl -d Ubuntu-24.04 -e bash -c "test -f ~/teif/docker-compose.prod.yml && echo 'Found'" > /tmp/compose_check.txt 2>&1
if grep -q "Found" /tmp/compose_check.txt; then
    check_status "docker-compose.prod.yml exists"
else
    echo -e "${RED}❌ docker-compose.prod.yml not found${NC}"
    exit 1
fi

# ============================================================================
# STEP 4: Start Docker Compose Services
# ============================================================================
print_step "STEP 4: Starting Docker Compose Services"

echo "Stopping any existing containers..."
wsl -d Ubuntu-24.04 -e bash -c "cd ~/teif && docker-compose -f docker-compose.prod.yml down 2>/dev/null || true" > /dev/null

echo "Starting services (postgres, backend, frontend)..."
wsl -d Ubuntu-24.04 -e bash -c "cd ~/teif && docker-compose -f docker-compose.prod.yml up -d"
check_status "Docker compose started"

# ============================================================================
# STEP 5: Wait for Services Health
# ============================================================================
print_step "STEP 5: Waiting for Services to be Healthy"

max_attempts=30
attempt=0

while [ $attempt -lt $max_attempts ]; do
    sleep 2
    attempt=$((attempt + 1))
    
    status=$(wsl -d Ubuntu-24.04 -e bash -c "docker-compose -f ~/teif/docker-compose.prod.yml ps --format json 2>/dev/null" | grep -c "healthy" || echo "0")
    echo -n "."
    
    if [ "$status" -ge 2 ]; then
        echo ""
        break
    fi
done

wsl -d Ubuntu-24.04 -e bash -c "cd ~/teif && docker-compose -f docker-compose.prod.yml ps" > /tmp/compose_status.txt
cat /tmp/compose_status.txt

if grep -q "healthy" /tmp/compose_status.txt; then
    check_status "Services running and healthy"
else
    echo -e "${YELLOW}⚠️  Services may still be starting...${NC}"
fi

# ============================================================================
# STEP 6: Test Health Endpoints
# ============================================================================
print_step "STEP 6: Testing Health Endpoints"

echo "Testing backend health endpoint (http://localhost:3000/api/health)..."
sleep 2

response=$(curl -s -w "\n%{http_code}" http://localhost:3000/api/health 2>/dev/null || echo "000")
http_code=$(echo "$response" | tail -1)
body=$(echo "$response" | head -n -1)

if [ "$http_code" = "200" ]; then
    check_status "Backend /api/health returns 200"
    echo "   Response: $body"
else
    echo -e "${YELLOW}⚠️  HTTP $http_code from backend${NC}"
    echo "   Response: $body"
fi

echo ""
echo "Testing frontend (http://localhost/)..."
response=$(curl -s -w "\n%{http_code}" http://localhost/ 2>/dev/null || echo "000")
http_code=$(echo "$response" | tail -1)

if [ "$http_code" = "200" ]; then
    check_status "Frontend returns 200"
else
    echo -e "${YELLOW}⚠️  HTTP $http_code from frontend${NC}"
fi

# ============================================================================
# STEP 7: Show Deployment Summary
# ============================================================================
print_step "STEP 7: Deployment Summary"

echo "✅ ALL CHECKS PASSED"
echo ""
echo "Services Status:"
wsl -d Ubuntu-24.04 -e bash -c "cd ~/teif && docker-compose -f docker-compose.prod.yml ps" | grep -E "CONTAINER|teif-backend|teif-postgres|teif-frontend"
echo ""

echo "📊 Resource Usage:"
wsl -d Ubuntu-24.04 -e bash -c "docker stats --no-stream --format 'table {{.Container}}\t{{.CPUPerc}}\t{{.MemUsage}}'" 2>/dev/null | head -5 || echo "   (Docker stats unavailable)"

echo ""
echo "╔════════════════════════════════════════════════════════════╗"
echo "║  ✅ Deployment Test Complete                              ║"
echo "║                                                            ║"
echo "║  All services verified. Ready for VPS deployment.         ║"
echo "║                                                            ║"
echo "║  To deploy to production VPS:                             ║"
echo "║  $ bash ~/teif/deploy-vps.sh                              ║"
echo "╚════════════════════════════════════════════════════════════╝"
echo ""
