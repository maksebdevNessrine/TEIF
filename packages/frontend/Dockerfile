FROM node:20-alpine AS builder

WORKDIR /app
ENV NODE_ENV=production

# Build-time env (REQUIRED for Vite)
ARG VITE_API_BASE_URL
ENV VITE_API_BASE_URL=${VITE_API_BASE_URL}

# Alpine compatibility for Vite (esbuild requirement)
RUN apk add --no-cache libc6-compat

# Copy only what is needed
COPY package.json pnpm-lock.yaml ./
COPY packages ./packages

# Install deps
RUN npm install -g pnpm@9.0.0
RUN pnpm install --frozen-lockfile

# 🚨 BUILD with full debug output
RUN cd packages/frontend \
 && echo "=== ENV ===" \
 && env | grep VITE \
 && echo "=== NODE ===" \
 && node -v \
 && echo "=== PNPM ===" \
 && pnpm -v \
 && echo "=== BUILD START ===" \
 && pnpm build --reporter=append-only || (echo "FRONTEND BUILD FAILED"; exit 1)


FROM nginx:alpine

COPY --from=builder /app/packages/frontend/dist /usr/share/nginx/html
COPY packages/frontend/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

HEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=3 \
  CMD wget --no-verbose --tries=1 --spider http://localhost/index.html || exit 1

CMD ["nginx", "-g", "daemon off;"]
