FROM node:20-alpine AS builder

WORKDIR /app
ENV NODE_ENV=production

# Copy entire repo
COPY . .

# Install dependencies
RUN npm install -g pnpm@9.0.0
RUN pnpm install --frozen-lockfile

# Debug: Check what we have
RUN echo "=== Node version ===" && node --version
RUN echo "=== pnpm version ===" && pnpm --version
RUN echo "=== Turbo check ===" && npx turbo --version
RUN echo "=== Directory structure ===" && ls -la packages/frontend/ | head -20
RUN echo "=== package.json ===" && cat packages/frontend/package.json | grep -A5 '"scripts"'

# Build frontend with error output
RUN echo "=== Starting build ===" && npx turbo build --filter=@teif/frontend 2>&1 || (echo "Build failed with exit code $?"; exit 1)


FROM nginx:alpine

COPY --from=builder /app/packages/frontend/dist /usr/share/nginx/html
COPY packages/frontend/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
HEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=3 \
    CMD wget --no-verbose --tries=1 --spider http://localhost/index.html || exit 1
CMD ["nginx", "-g", "daemon off;"]
