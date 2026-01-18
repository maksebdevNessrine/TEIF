FROM node:20-alpine

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
RUN echo "=== Directory structure ===" && ls -la packages/backend/ | head -20
RUN echo "=== package.json ===" && cat packages/backend/package.json | grep -A5 '"scripts"'

# Build backend with error output
RUN echo "=== Starting build ===" && npx turbo build --filter=@teif/backend 2>&1 || (echo "Build failed with exit code $?"; exit 1)

EXPOSE 3000
HEALTHCHECK --interval=30s --timeout=10s --start-period=40s --retries=3 \
    CMD node -e "require('http').get('http://localhost:3000/api/health', (r) => {if (r.statusCode !== 200) throw new Error(r.statusCode)})"
CMD ["node", "packages/backend/dist/index.js"]
