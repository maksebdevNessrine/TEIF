FROM node:20-alpine

WORKDIR /app

# Set build environment
ENV NODE_ENV=production

# Copy workspace configuration files
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml turbo.json ./

# Copy packages
COPY packages/shared ./packages/shared
COPY packages/backend ./packages/backend

# Install pnpm and dependencies
RUN npm install -g pnpm@9.0.0 && \
    pnpm install --frozen-lockfile

# Build backend using root script (turbo handles dependencies)
RUN pnpm run build

# Set working directory for runtime
WORKDIR /app

# Health check
HEALTHCHECK --interval=30s --timeout=10s --start-period=40s --retries=3 \
    CMD node -e "require('http').get('http://localhost:3000/api/health', (r) => {if (r.statusCode !== 200) throw new Error(r.statusCode)})"

# Expose port
EXPOSE 3000

# Start the application
CMD ["node", "packages/backend/dist/index.js"]
