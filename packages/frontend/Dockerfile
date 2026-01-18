# ============================================
# BUILDER STAGE
# ============================================
FROM node:20-alpine AS builder

WORKDIR /app

# Build-time environment
ENV NODE_ENV=development

# Build-time variables (injected by Coolify)
ARG VITE_API_BASE_URL
ENV VITE_API_BASE_URL=${VITE_API_BASE_URL}

# Debug: Show what VITE_API_BASE_URL is set to
RUN echo "DEBUG: VITE_API_BASE_URL is set to: ${VITE_API_BASE_URL}"

# Alpine compatibility for Vite/esbuild
RUN apk add --no-cache libc6-compat

# Copy workspace configuration and root package files
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml turbo.json ./

# Copy all package.json files (maintains workspace structure)
COPY packages/frontend/package.json packages/frontend/
COPY packages/shared/package.json packages/shared/
COPY packages/backend/package.json packages/backend/

# Enable and configure pnpm
RUN corepack enable
RUN pnpm config set node-linker hoisted

# Install all dependencies (including devDependencies for build)
RUN pnpm install --frozen-lockfile

# Debug: Show workspace structure
RUN echo "DEBUG: Current directory:" && pwd && echo "DEBUG: Files in /app:" && ls -la /app && echo "DEBUG: pnpm list:" && pnpm list --depth=0 || true

# Copy source code after deps are installed (leverages Docker layer caching)
COPY packages/frontend packages/frontend/
COPY packages/shared packages/shared/

# Create comprehensive debug script
RUN cat > /tmp/build-debug.sh << 'EOF'
#!/bin/bash
set -e

echo "========================================="
echo "COMPREHENSIVE BUILD DEBUG LOG"
echo "========================================="

echo ""
echo "1. Environment Check"
echo "---"
echo "PWD: $(pwd)"
echo "Node version: $(node --version)"
echo "pnpm version: $(pnpm --version)"
echo "VITE_API_BASE_URL: ${VITE_API_BASE_URL:-UNSET}"

echo ""
echo "2. Directory Structure"
echo "---"
ls -la /app/packages/frontend/ || echo "ERROR: frontend dir not found"
ls -la /app/packages/shared/ || echo "ERROR: shared dir not found"

echo ""
echo "3. Package.json Content"
echo "---"
cat /app/packages/frontend/package.json || echo "ERROR: package.json not found"

echo ""
echo "4. Workspace Verification"
echo "---"
pnpm list --depth=0 2>&1 || echo "ERROR: pnpm list failed"

echo ""
echo "5. Package Filter Test"
echo "---"
pnpm ls --filter @teif/frontend 2>&1 || echo "ERROR: filter test failed"

echo ""
echo "6. Frontend Build"
echo "---"
echo "Running: pnpm --filter @teif/frontend build"
pnpm --filter @teif/frontend build 2>&1 || (
  echo ""
  echo "BUILD FAILED - Attempting diagnosis..."
  echo "Checking if dist exists:"
  ls -la /app/packages/frontend/dist/ || echo "dist does not exist"
  exit 1
)

echo ""
echo "========================================="
echo "BUILD SUCCESS"
echo "========================================="
EOF

RUN chmod +x /tmp/build-debug.sh && /tmp/build-debug.sh


# ============================================
# PRODUCTION STAGE
# ============================================
FROM nginx:1.25-alpine

COPY --from=builder /app/packages/frontend/dist /usr/share/nginx/html
COPY packages/frontend/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

HEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=3 \
  CMD wget --no-verbose --tries=1 --spider http://localhost/index.html || exit 1

CMD ["nginx", "-g", "daemon off;"]
