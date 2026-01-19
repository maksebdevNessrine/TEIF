#!/bin/bash
#
# Quick redeploy script - run after pushing new code to production branch
# Usage: bash redeploy.sh
#

set -e

APP_PATH="/var/www/teif"

echo "=========================================="
echo "  TEIF - Quick Redeploy              "
echo "=========================================="

cd $APP_PATH

echo "[1] Pulling latest code..."
git pull origin production

echo "[2] Installing dependencies..."
pnpm install

echo "[3] Building packages..."
pnpm --filter @teif/shared build
pnpm --filter @teif/backend exec prisma generate
pnpm --filter @teif/backend build
pnpm --filter @teif/frontend build

echo "[4] Running database migrations..."
pnpm --filter @teif/backend exec prisma migrate deploy

echo "[5] Restarting backend..."
pm2 restart teif-backend

echo "[6] Restarting Nginx..."
sudo systemctl restart nginx

echo ""
echo "=========================================="
echo "  ✓ Redeploy complete!"
echo "=========================================="
echo ""
echo "Verify: curl https://efatoura.duckdns.org/health"
