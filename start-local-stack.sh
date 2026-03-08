#!/usr/bin/env bash

# Simple helper to start the full local stack (Postgres + backend + frontend)
# Usage: ./start-local-stack.sh

set -euo pipefail

COMPOSE_FILES=(
  "docker-compose.dev.yml"
  "docker-compose.local.yml"
)

echo "Starting local stack (Postgres + backend + frontend)"
echo "Using compose files: ${COMPOSE_FILES[*]}"

echo "Removing leftover manual containers (if any)..."
docker rm -f teif-backend teif-frontend 2>/dev/null || true

docker compose -f "${COMPOSE_FILES[0]}" -f "${COMPOSE_FILES[1]}" up --build -d

echo "\n✅ Local stack started"
echo "Frontend: http://localhost:5173"
echo "Backend:  http://localhost:4000"
