FROM node:20-alpine

WORKDIR /app

# Set build environment
ENV NODE_ENV=production

# Copy entire monorepo
COPY . .

# Install pnpm and all dependencies
RUN npm install -g pnpm@9.0.0 && \
    pnpm install --frozen-lockfile

# Build ONLY backend (tsc handles it from package.json script)
RUN cd packages/backend && pnpm run build

# Set working directory for runtime
WORKDIR /app

# Health check
HEALTHCHECK --interval=30s --timeout=10s --start-period=40s --retries=3 \
    CMD node -e "require('http').get('http://localhost:3000/api/health', (r) => {if (r.statusCode !== 200) throw new Error(r.statusCode)})"

# Expose port
EXPOSE 3000

# Start the application
CMD ["node", "packages/backend/dist/index.js"]
