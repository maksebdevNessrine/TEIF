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

# Build frontend using pnpm (which is already installed and configured)
# Run from the frontend directory
RUN cd /app/packages/frontend && \
    pnpm build 2>&1 | tee /tmp/vite-build.log; \
    BUILD_STATUS=${PIPESTATUS[0]}; \
    echo "Build exit status: $BUILD_STATUS" >&2; \
    cat /tmp/vite-build.log >&2; \
    if [ $BUILD_STATUS -ne 0 ]; then exit 1; fi

# Verify dist folder exists
RUN if [ -d /app/packages/frontend/dist ]; then \
      echo "✓ SUCCESS: dist created" >&2; \
      ls -la /app/packages/frontend/dist/ >&2; \
    else \
      echo "✗ ERROR: dist not found" >&2; \
      ls -laR /app/packages/frontend/ >&2; \
      exit 1; \
    fi


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
