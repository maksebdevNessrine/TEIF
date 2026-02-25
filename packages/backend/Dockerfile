# ============================================
# BUILDER STAGE
# ============================================
FROM node:20-bullseye-slim AS builder

WORKDIR /app

# Build-time environment (must be development for devDependencies)
ENV NODE_ENV=development
# Skip Puppeteer download - will use system Chromium
ENV PUPPETEER_SKIP_DOWNLOAD=true

# Base image (node:20-bullseye-slim) already includes:
# - openssl, curl, ca-certificates, build essentials
# No additional packages needed for build stage

# Copy workspace configuration and root package files
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml turbo.json tsconfig.base.json ./

# Copy all package.json files (maintains workspace structure)
COPY packages/frontend/package.json packages/frontend/
COPY packages/shared/package.json packages/shared/
COPY packages/backend/package.json packages/backend/

# Enable and configure pnpm
# Install pnpm globally using npm (avoids corepack download issues in isolated Docker builds)
RUN npm install -g pnpm@10.28.1 && pnpm config set node-linker hoisted

# Install all dependencies (including devDependencies for build)
RUN pnpm install --frozen-lockfile

# Copy source code after deps are installed (leverages Docker layer caching)
COPY packages/backend packages/backend/
COPY packages/shared packages/shared/

# Build shared package FIRST (backend depends on it)
# Use tsc directly which will respect the tsconfig.json exclude patterns
# tsconfig.json excludes test files (*.test.ts, *.spec.ts)
RUN cd /app/packages/shared && npx tsc --rootDir ./src --outDir ./dist --declaration --declarationMap

# Verify shared dist was created
RUN test -d /app/packages/shared/dist || (echo "ERROR: shared dist not created"; ls -la /app/packages/shared/; exit 1)

# Generate Prisma client (CRITICAL - required for database operations)
RUN cd /app/packages/backend && npx prisma generate --schema=./prisma/schema.prisma

# Build diagnostic output to a file
# Increase Node heap to 8GB for TypeScript compilation (avoid OOM during build)
RUN { \
    echo "=== BACKEND BUILD DIAGNOSTICS ===" && \
    echo "PWD: $(pwd)" && \
    echo "Node: $(node --version)" && \
    echo "pnpm: $(pnpm --version)" && \
    echo "" && \
    echo "=== BACKEND SOURCE ===" && \
    find packages/backend/src -type f -name "*.ts" | head -20 && \
    echo "" && \
    echo "=== BUILDING BACKEND ===" && \
    cd packages/backend && NODE_OPTIONS="--max-old-space-size=8192" npx tsc; \
    } 2>&1 | tee /tmp/backend-build.log

# Fix ESM imports - add .js extensions to relative imports
RUN cd /app/packages/backend && npx tsc-esm-fix --tsconfig tsconfig.json --dist dist

# Verify build succeeded
RUN if [ ! -f /app/packages/backend/dist/index.js ]; then \
    echo "ERROR: Backend build failed - dist/index.js not found"; \
    echo "=== BUILD LOG ==="; \
    cat /tmp/backend-build.log; \
    echo "=== DIST CONTENTS ==="; \
    ls -laR /app/packages/backend/dist/ 2>/dev/null || echo "dist directory missing"; \
    exit 1; \
  fi

# Prune devDependencies in builder stage (before copying to prod)
# Log what we're about to prune
RUN echo "=== BEFORE PRUNE ===" && \
    echo "dotenv location:" && \
    find /app/node_modules -name "dotenv" -type d 2>/dev/null || echo "NOT FOUND" && \
    echo "Total node_modules size:" && \
    du -sh /app/node_modules && \
    echo "pnpm list backend deps:" && \
    cd /app && pnpm list -r --depth=0 --filter="@teif/backend" 2>/dev/null | head -20

# Run prune
RUN cd /app && pnpm prune --prod

# Log what we have after prune
RUN echo "=== AFTER PRUNE ===" && \
    echo "dotenv location:" && \
    find /app/node_modules -name "dotenv" -type d 2>/dev/null || echo "NOT FOUND" && \
    echo "Total node_modules size:" && \
    du -sh /app/node_modules && \
    echo "Backend dependencies:" && \
    cat /app/packages/backend/package.json | grep -A 20 '"dependencies"'


# ============================================
# PRODUCTION STAGE
# ============================================
FROM node:20-bullseye-slim

WORKDIR /app

# Runtime environment
ENV NODE_ENV=production
ENV PORT=3000
# Skip Puppeteer download in production (will use system/predownloaded binary if needed)
ENV PUPPETEER_SKIP_DOWNLOAD=true

# No additional package installation needed - all dependencies included in base image
# (openssl, curl, ca-certificates already present in node:20-bullseye-slim)

# Create non-root user for security (Debian syntax)
RUN addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 --gid 1001 nodejs

# Copy built application and dependencies
COPY --from=builder /app/packages/backend/dist /app/dist
COPY --from=builder /app/packages/backend/prisma /app/prisma
COPY --from=builder /app/packages/shared /app/packages/shared
COPY --from=builder /app/node_modules /app/node_modules

# Copy workspace files for reference (even though node_modules is already copied)
COPY --from=builder /app/package.json /app/pnpm-lock.yaml /app/pnpm-workspace.yaml /app/
COPY --from=builder /app/packages/backend/package.json /app/packages/backend/
COPY --from=builder /app/packages/frontend/package.json /app/packages/frontend/
COPY --from=builder /app/packages/shared/package.json /app/packages/shared/

# DEBUG: Copy build log for inspection
COPY --from=builder /tmp/backend-build.log /app/BUILD_LOG.txt 2>/dev/null || true

# Create symlink for workspace path alias (@teif/shared) so Node.js can resolve it
RUN mkdir -p /app/node_modules/@teif && \
    ln -s /app/packages/shared /app/node_modules/@teif/shared

# Change ownership to nodejs user
RUN chown -R nodejs:nodejs /app

# Switch to non-root user
USER nodejs

EXPOSE 3000

# More robust health check that connects to server on all interfaces
HEALTHCHECK --interval=30s --timeout=10s --start-period=40s --retries=3 \
    CMD curl -f http://127.0.0.1:3000/api/health || exit 1

CMD ["node", "dist/index.js"]
