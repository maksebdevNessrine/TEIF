FROM node:20-alpine AS builder

WORKDIR /app

# Build-time: must be development to install devDependencies (Vite, TypeScript, etc.)
ENV NODE_ENV=development

# Build-time env (REQUIRED for Vite)
ARG VITE_API_BASE_URL
ENV VITE_API_BASE_URL=${VITE_API_BASE_URL}

# Alpine compatibility for Vite (esbuild requirement)
RUN apk add --no-cache libc6-compat

# Copy only what is needed
COPY package.json pnpm-lock.yaml ./
COPY packages ./packages

# Install deps (includes devDependencies because NODE_ENV=development)
RUN npm install -g pnpm@9.0.0
RUN pnpm install --frozen-lockfile

# 🚨 BUILD with full debug output
RUN cd packages/frontend \
 && echo "=== VITE ENV ===" \
 && env | sort \
 && echo "=== BUILD START ===" \
 && pnpm build --debug


FROM nginx:alpine

COPY --from=builder /app/packages/frontend/dist /usr/share/nginx/html
COPY packages/frontend/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

HEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=3 \
  CMD wget --no-verbose --tries=1 --spider http://localhost/index.html || exit 1

CMD ["nginx", "-g", "daemon off;"]
