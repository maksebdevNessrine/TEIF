FROM node:20-alpine AS builder

WORKDIR /app
ENV NODE_ENV=production

# Copy entire repo
COPY . .

# Install and build
RUN npm install -g pnpm@9.0.0 && pnpm install --frozen-lockfile

# Build with explicit error output
RUN cd packages/frontend && pnpm run build


FROM nginx:alpine

COPY --from=builder /app/packages/frontend/dist /usr/share/nginx/html
COPY packages/frontend/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
HEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=3 \
    CMD wget --no-verbose --tries=1 --spider http://localhost/index.html || exit 1
CMD ["nginx", "-g", "daemon off;"]
