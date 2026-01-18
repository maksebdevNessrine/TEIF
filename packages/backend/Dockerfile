FROM node:20-alpine

WORKDIR /app
ENV NODE_ENV=development

# Copy workspace config and source
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml turbo.json ./
COPY packages ./packages

# Install dependencies  
RUN npm install -g pnpm@9.0.0
RUN pnpm install --frozen-lockfile

# Build backend
RUN pnpm --filter @teif/backend build

EXPOSE 3000
HEALTHCHECK --interval=30s --timeout=10s --start-period=40s --retries=3 \
    CMD node -e "require('http').get('http://localhost:3000/api/health', (r) => {if (r.statusCode !== 200) throw new Error(r.statusCode)})"
CMD ["node", "packages/backend/dist/index.js"]
