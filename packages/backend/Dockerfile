FROM node:20-alpine

WORKDIR /app
ENV NODE_ENV=production

# Copy entire repo
COPY . .

# Install dependencies  
RUN npm install -g pnpm@9.0.0
RUN pnpm install --frozen-lockfile

# Use npx turbo to build backend (turbo is in node_modules)
RUN npx turbo build --filter=backend

EXPOSE 3000
HEALTHCHECK --interval=30s --timeout=10s --start-period=40s --retries=3 \
    CMD node -e "require('http').get('http://localhost:3000/api/health', (r) => {if (r.statusCode !== 200) throw new Error(r.statusCode)})"
CMD ["node", "packages/backend/dist/index.js"]
