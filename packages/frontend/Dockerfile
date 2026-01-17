FROM node:20-alpine AS builder

WORKDIR /app

# Set build environment
ENV NODE_ENV=production

# Copy workspace configuration files
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml turbo.json ./

# Copy packages
COPY packages/shared ./packages/shared
COPY packages/frontend ./packages/frontend

# Install pnpm and dependencies
RUN npm install -g pnpm@9.0.0 && \
    pnpm install --frozen-lockfile

# Build frontend from root with Turbo (handles workspace dependencies)
RUN pnpm run build --filter=@teif/frontend


# Production stage with Nginx
FROM nginx:alpine

# Copy built assets from builder
COPY --from=builder /app/packages/frontend/dist /usr/share/nginx/html

# Copy nginx configuration
COPY packages/frontend/nginx.conf /etc/nginx/conf.d/default.conf

# Expose port
EXPOSE 80

# Health check
HEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=3 \
    CMD wget --no-verbose --tries=1 --spider http://localhost/index.html || exit 1

# Start nginx
CMD ["nginx", "-g", "daemon off;"]
