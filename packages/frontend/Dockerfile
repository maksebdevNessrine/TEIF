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

# Diagnostic: Show what we have
RUN echo "FRONTEND FOLDER CONTENTS:" >&2; ls -la /app/packages/frontend/ >&2

# Diagnostic: Check if package.json exists
RUN test -f /app/packages/frontend/package.json && echo "✓ package.json found" >&2 || (echo "✗ ERROR: package.json NOT found" >&2; exit 1)

# Diagnostic: Show package.json name field
RUN echo "PACKAGE NAME:" >&2; grep '"name"' /app/packages/frontend/package.json >&2

# Step 1: Install node_modules in frontend
RUN cd /app/packages/frontend && npm install 2>&1 >&2 || (echo "npm install failed" >&2; exit 1)

# Step 2: Run build
RUN cd /app/packages/frontend && npm run build 2>&1 >&2 || (echo "npm run build failed" >&2; exit 1)

# Step 3: Verify dist exists
RUN test -d /app/packages/frontend/dist && echo "✓ BUILD SUCCESS: dist created" >&2 || (echo "✗ BUILD FAILED: dist not found" >&2; ls -laR /app/packages/frontend/ >&2; exit 1)


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
