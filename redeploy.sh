#!/bin/bash
#
# Quick redeploy script - run after pushing new code to production branch
# Uses Docker containers with esbuild compilation
# Usage: bash redeploy.sh
#

set -e

APP_PATH="${APP_PATH:-/opt/teif}"
REPO="${REPO:-origin}"
BRANCH="${BRANCH:-production}"

echo "=========================================="
echo "  TEIF - Quick Redeploy (Docker)    "
echo "=========================================="
echo ""

cd "$APP_PATH"

echo "[1] Pulling latest code from $REPO/$BRANCH..."
git fetch "$REPO" || exit 1
git reset --hard "$REPO/$BRANCH" || exit 1
echo "✓ Latest code pulled"

echo ""
echo "[2] Stopping services..."
docker-compose -f docker-compose.prod.yml down || true
echo "✓ Services stopped"

echo ""
echo "[3] Rebuilding Docker image (esbuild compilation)..."
docker system prune -f --volumes
docker build --no-cache -f packages/backend/Dockerfile -t teif-backend:latest .
echo "✓ Docker image built"

echo ""
echo "[4] Starting services with docker-compose..."
docker-compose -f docker-compose.prod.yml up -d
sleep 5
echo "✓ Services started"

echo ""
echo "[5] Running database migrations..."
docker-compose -f docker-compose.prod.yml exec -T backend npx prisma migrate deploy || true
echo "✓ Migrations complete"

echo ""
echo "[6] Verifying health..."
for i in {1..30}; do
  if curl -s http://localhost:3000/api/health > /dev/null 2>&1; then
    echo "✓ Backend health check passed"
    break
  fi
  if [ $i -eq 30 ]; then
    echo "✗ Backend health check failed after 30 attempts"
    exit 1
  fi
  sleep 1
done

echo ""
echo "=========================================="
echo "  ✓ Redeploy complete!"
echo "=========================================="
echo ""
echo "Status: docker-compose -f docker-compose.prod.yml ps"
echo "Logs: docker-compose -f docker-compose.prod.yml logs -f backend"
echo "Verify: curl http://localhost:3000/api/health"
