# ============================================
# BUILDER STAGE
# ============================================
FROM node:20-alpine AS builder

WORKDIR /app

ENV NODE_ENV=development

# Build-time variables (injected by Coolify)
ARG VITE_API_BASE_URL
ENV VITE_API_BASE_URL=${VITE_API_BASE_URL}

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

# Copy source code
COPY packages/frontend packages/frontend/
COPY packages/shared packages/shared/

# Build frontend - verbose output
RUN echo "Building @teif/frontend..." && \
    pnpm --filter @teif/frontend build && \
    echo "Build completed, checking dist folder..." && \
    ls -la packages/frontend/ && \
    echo "Checking if dist exists:" && \
    test -d packages/frontend/dist && echo "✓ dist folder exists" || (echo "✗ dist folder NOT found"; exit 1)


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
