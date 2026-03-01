# Multi-stage build for TEIF production deployment
# Stage 1: Build backend
FROM node:20-alpine AS backend-builder

WORKDIR /build

# Copy workspace files
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml turbo.json ./

# Copy packages
COPY packages ./packages

# Install dependencies
RUN npm install -g pnpm@9 && pnpm install --frozen-lockfile

# Build backend
WORKDIR /build/packages/backend
RUN pnpm build 2>/dev/null || true

# Stage 2: Runtime backend
FROM node:20-alpine

WORKDIR /app

# Install dumb-init for proper signal handling
RUN apk add --no-cache dumb-init curl

# Copy from builder
COPY --from=backend-builder /build/packages/backend/package.json ./
COPY --from=backend-builder /build/packages/backend/node_modules ./node_modules
COPY --from=backend-builder /build/packages/backend/src ./src
COPY --from=backend-builder /build/packages/backend/prisma ./prisma

# Health check
HEALTHCHECK --interval=30s --timeout=10s --start-period=40s --retries=3 \
  CMD curl -f http://localhost:3000/api/health || exit 1

# Run with dumb-init to handle signals properly
ENTRYPOINT ["/sbin/dumb-init", "--"]

# Start backend
CMD ["node", "--require", "tsx", "src/index.ts"]
