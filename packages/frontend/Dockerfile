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

# Copy source code after deps are installed (leverages Docker layer caching)
COPY packages/frontend packages/frontend/
COPY packages/shared packages/shared/

# Diagnostic output - verify pnpm filter works
RUN set -eux; \
    echo "=== Node Version ==="; node -v; \
    echo "=== PNPM Version ==="; pnpm -v; \
    echo "=== Current Directory ==="; pwd; \
    echo "=== Root Contents ==="; ls -la; \
    echo "=== Packages Directory ==="; ls -la packages/; \
    echo "=== Frontend package.json name ==="; grep '"name"' packages/frontend/package.json; \
    echo "=== Listing projects pnpm can see ==="; pnpm list -r --depth 0 || true; \
    echo "=== Testing filter (dry-run) ==="; pnpm --filter @teif/frontend exec pwd || true

# Build frontend - run and capture full output
RUN pnpm --filter @teif/frontend build 2>&1 | head -100

# Verify dist was created
RUN test -d /app/packages/frontend/dist || (echo "DIST NOT FOUND"; ls -laR /app/packages/frontend/; exit 1)


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
