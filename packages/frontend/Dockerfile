FROM node:20-alpine AS builder

WORKDIR /app
ENV NODE_ENV=production

# Copy entire repo
COPY . .

# Install dependencies
RUN npm install -g pnpm@9.0.0
RUN pnpm install --frozen-lockfile

# Use npx turbo to build frontend (turbo is in node_modules)
RUN npx turbo build --filter=frontend -- --mode production


FROM nginx:alpine

COPY --from=builder /app/packages/frontend/dist /usr/share/nginx/html
COPY packages/frontend/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
HEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=3 \
    CMD wget --no-verbose --tries=1 --spider http://localhost/index.html || exit 1
CMD ["nginx", "-g", "daemon off;"]
