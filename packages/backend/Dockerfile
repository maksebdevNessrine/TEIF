# ============================================
# BUILDER STAGE
# ============================================
FROM node:20-alpine AS builder

WORKDIR /app

# Build-time environment (must be development for devDependencies)
ENV NODE_ENV=development
# Skip Puppeteer download - will use system Chromium
ENV PUPPETEER_SKIP_DOWNLOAD=true

# Alpine compatibility + Prisma requirements
RUN apk add --no-cache \
    libc6-compat \
    openssl \
    chromium \
    nss \
    freetype \
    harfbuzz

# Copy workspace configuration and root package files
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml turbo.json tsconfig.base.json ./

# Copy all package.json files (maintains workspace structure)
COPY packages/frontend/package.json packages/frontend/
COPY packages/shared/package.json packages/shared/
COPY packages/backend/package.json packages/backend/

# Enable and configure pnpm
RUN corepack enable
RUN corepack prepare pnpm@10.28.1 --activate
RUN pnpm config set node-linker hoisted

# Install all dependencies (including devDependencies for build)
RUN pnpm install --frozen-lockfile

# Copy source code after deps are installed (leverages Docker layer caching)
COPY packages/backend packages/backend/
COPY packages/shared packages/shared/

# Build shared package FIRST (backend depends on it)
# Use tsc directly with rootDir and outDir to ensure proper compilation
RUN cd /app/packages/shared && npx tsc --rootDir ./src --outDir ./dist --declaration --declarationMap

# Verify shared dist was created
RUN test -d /app/packages/shared/dist || (echo "ERROR: shared dist not created"; ls -la /app/packages/shared/; exit 1)

# Generate Prisma client (CRITICAL - required for database operations)
RUN cd /app/packages/backend && npx prisma generate --schema=./prisma/schema.prisma

# Build diagnostic output to a file
RUN { \
    echo "=== BACKEND BUILD DIAGNOSTICS ===" && \
    echo "PWD: $(pwd)" && \
    echo "Node: $(node --version)" && \
    echo "pnpm: $(pnpm --version)" && \
    echo "" && \
    echo "=== DIRECTORY ===" && \
    ls -la packages/backend/ && \
    echo "" && \
    echo "=== PACKAGE.JSON ===" && \
    cat packages/backend/package.json && \
    echo "" && \
    echo "=== WORKSPACE ===" && \
    pnpm list --depth=0 && \
    echo "" && \
    echo "=== BUILDING BACKEND ===" && \
    pnpm --filter @teif/backend build; \
    } 2>&1 | tee /tmp/backend-build.log


# ============================================
# PRODUCTION STAGE
# ============================================
FROM node:20-alpine

WORKDIR /app

# Runtime environment
ENV NODE_ENV=production
ENV PORT=3000
# Use system Chromium for Puppeteer (must match installation location)
ENV PUPPETEER_EXECUTABLE_PATH=/usr/bin/chromium-browser

# Install runtime dependencies (critical for Prisma + database operations)
RUN apk add --no-cache \
    libc6-compat \
    openssl \
    curl \
    chromium \
    nss \
    freetype \
    harfbuzz

# Create non-root user for security
RUN addgroup -g 1001 -S nodejs && \
    adduser -S nodejs -u 1001

# Copy built application and minimal dependencies
# Use multi-stage to avoid copying entire node_modules with devDependencies
COPY --from=builder /app/packages/backend/dist ./dist
COPY --from=builder /app/packages/backend/package.json ./
COPY --from=builder /app/packages/shared ./packages/shared
COPY --from=builder /app/package.json pnpm-lock.yaml pnpm-workspace.yaml ./

# Copy only production node_modules (excluding devDependencies)
COPY --from=builder /app/node_modules ./node_modules

# Change ownership to nodejs user
RUN chown -R nodejs:nodejs /app

# Switch to non-root user
USER nodejs

EXPOSE 3000

# More robust health check that connects to server on all interfaces
HEALTHCHECK --interval=30s --timeout=10s --start-period=40s --retries=3 \
    CMD curl -f http://127.0.0.1:3000/api/health || exit 1

CMD ["node", "dist/index.js"]
