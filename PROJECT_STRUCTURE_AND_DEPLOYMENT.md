# TEIF Project - Complete Structure & Deployment Guide

**Last Updated:** January 19, 2026  
**Version:** 0.0.0  
**Status:** Production-Ready  

---

## Table of Contents

1. [Project Overview](#project-overview)
2. [Architecture](#architecture)
3. [Project Structure](#project-structure)
4. [Technology Stack](#technology-stack)
5. [Deployment Configuration](#deployment-configuration)
6. [Environment Variables](#environment-variables)
7. [Build & Deployment Process](#build--deployment-process)
8. [Local Development](#local-development)
9. [Deployment to Coolify](#deployment-to-coolify)

---

## Project Overview

**TEIF** is a monorepo-based full-stack application using:
- **Frontend**: React 19 with Vite (TypeScript)
- **Backend**: Hono.js with Prisma ORM (Node.js)
- **Database**: PostgreSQL 16
- **Package Manager**: pnpm 9.0.0 with Turbo for build orchestration
- **Deployment**: Docker + Docker Compose on Coolify

### Key Features

- ✅ Multi-package monorepo with shared utilities
- ✅ Type-safe end-to-end (TypeScript everywhere)
- ✅ Zero-downtime deployments with health checks
- ✅ Database persistence with automatic backups
- ✅ SMTP email integration (OVH)
- ✅ JWT authentication with refresh tokens
- ✅ Docker multi-stage builds for minimal image size
- ✅ Production-ready monitoring & logging

---

## Architecture

### System Diagram

```
┌─────────────────────────────────────────────────────────────┐
│                      COOLIFY PLATFORM                        │
│                                                               │
│  ┌────────────────────────────────────────────────────────┐  │
│  │               Docker Compose Stack                      │  │
│  │                                                         │  │
│  │  ┌──────────────────┐  ┌──────────────┐  ┌─────────┐  │  │
│  │  │  PostgreSQL 16   │  │ Backend API  │  │Frontend │  │  │
│  │  │   (Port 5432)    │  │ (Port 3000)  │  │(Port 80)│  │  │
│  │  │                  │  │ Hono.js      │  │ Nginx   │  │  │
│  │  │ - Data Storage   │  │ + Prisma ORM │  │ React19 │  │  │
│  │  │ - Backups        │  │              │  │         │  │  │
│  │  └──────────────────┘  └──────────────┘  └─────────┘  │  │
│  │                                                         │  │
│  │     Health Checks: Every 30 seconds                    │  │
│  │     Restart Policy: Unless-stopped                    │  │
│  │     Networks: Internal teif-network bridge             │  │
│  └────────────────────────────────────────────────────────┘  │
│                                                               │
│  Reverse Proxy: efatoura.duckdns.org → 80/443                │
│  Build Arguments: Injected by Coolify (48 ARGs)              │
│  Volumes: Persistent storage for DB & backups               │
└─────────────────────────────────────────────────────────────┘
```

### Data Flow

```
Browser/Client
     │
     ▼
  Nginx (port 80)
     │
     ├─► /                    → React App (index.html)
     ├─► /api/*               → Backend Service (http://backend:3000)
     └─► Static Assets        → /usr/share/nginx/html
     
Backend (port 3000)
     │
     └─► PostgreSQL (5432)
          │
          ├─► User Data
          ├─► Messages/Comments
          ├─► Transactions
          └─► Session Data
```

---

## Project Structure

```
TEIF-main/
│
├── 📦 Root Configuration
│   ├── package.json                 # Monorepo root, pnpm workspaces
│   ├── pnpm-lock.yaml               # Locked dependency versions (766+ packages)
│   ├── pnpm-workspace.yaml          # Defines workspaces
│   ├── turbo.json                   # Turbo build orchestration
│   └── .env.example                 # Environment template
│
├── 🐳 Docker & Deployment
│   ├── docker-compose.prod.yml      # Production stack (postgres, backend, frontend)
│   └── Dockerfile.example           # Example for reference
│
├── 📁 packages/
│   │
│   ├── 🎨 frontend/
│   │   ├── package.json             # @teif/frontend
│   │   ├── Dockerfile               # Multi-stage build: Node → Nginx
│   │   ├── vite.config.ts           # Vite bundler configuration
│   │   ├── nginx.conf               # Nginx reverse proxy config
│   │   ├── tsconfig.json            # TypeScript strict mode
│   │   ├── tailwind.config.ts        # Tailwind CSS utilities
│   │   ├── postcss.config.ts         # PostCSS configuration
│   │   │
│   │   ├── src/
│   │   │   ├── main.tsx             # React entry point
│   │   │   ├── App.tsx              # Root component
│   │   │   ├── index.css            # Global styles
│   │   │   │
│   │   │   ├── 🔐 auth/
│   │   │   │   ├── Login.tsx
│   │   │   │   ├── Register.tsx
│   │   │   │   ├── useAuth.ts       # Auth context hook
│   │   │   │   └── ProtectedRoute.tsx
│   │   │   │
│   │   │   ├── 📄 pages/
│   │   │   │   ├── Dashboard.tsx
│   │   │   │   ├── Profile.tsx
│   │   │   │   └── NotFound.tsx
│   │   │   │
│   │   │   ├── 🧩 components/
│   │   │   │   ├── Form/
│   │   │   │   ├── Modal/
│   │   │   │   ├── Layout/
│   │   │   │   └── Common/
│   │   │   │
│   │   │   ├── 🎣 hooks/
│   │   │   │   ├── useQuery.ts
│   │   │   │   ├── useMutation.ts
│   │   │   │   └── useLocalStorage.ts
│   │   │   │
│   │   │   ├── 🌐 api/
│   │   │   │   ├── client.ts        # Axios instance
│   │   │   │   ├── auth.ts          # Auth endpoints
│   │   │   │   └── endpoints.ts     # API routes
│   │   │   │
│   │   │   └── 📦 types/
│   │   │       └── index.ts         # Shared types
│   │   │
│   │   └── dist/                    # Built output (created by vite build)
│   │       ├── index.html           # Production HTML
│   │       ├── assets/              # Bundled JS/CSS
│   │       └── manifest.json        # Build metadata
│   │
│   ├── 🔧 backend/
│   │   ├── package.json             # @teif/backend
│   │   ├── Dockerfile               # Multi-stage build: Node builder → Node prod
│   │   ├── tsconfig.json            # TypeScript configuration
│   │   │
│   │   ├── src/
│   │   │   ├── index.ts             # Express server entry
│   │   │   ├── env.ts               # Environment validation (zod)
│   │   │   │
│   │   │   ├── 🔐 auth/
│   │   │   │   ├── controller.ts    # Auth endpoints
│   │   │   │   ├── service.ts       # Auth logic
│   │   │   │   ├── middleware.ts    # JWT validation
│   │   │   │   └── routes.ts        # Auth routes
│   │   │   │
│   │   │   ├── 👥 users/
│   │   │   │   ├── controller.ts
│   │   │   │   ├── service.ts
│   │   │   │   └── routes.ts
│   │   │   │
│   │   │   ├── 🛒 transactions/
│   │   │   │   ├── controller.ts
│   │   │   │   ├── service.ts
│   │   │   │   └── routes.ts
│   │   │   │
│   │   │   ├── 📧 email/
│   │   │   │   ├── service.ts       # SMTP integration
│   │   │   │   └── templates/
│   │   │   │
│   │   │   ├── 🌍 middleware/
│   │   │   │   ├── errorHandler.ts
│   │   │   │   ├── cors.ts
│   │   │   │   └── validation.ts
│   │   │   │
│   │   │   ├── 🛠️ utils/
│   │   │   │   ├── validators.ts    # Input validation (zod)
│   │   │   │   ├── logger.ts        # Structured logging
│   │   │   │   └── crypto.ts        # Encryption utilities
│   │   │   │
│   │   │   └── 📦 types/
│   │   │       └── index.ts         # Shared types
│   │   │
│   │   ├── prisma/
│   │   │   ├── schema.prisma        # Database schema
│   │   │   ├── migrations/          # Database migration history
│   │   │   └── seed.ts              # Database seeding
│   │   │
│   │   └── dist/                    # Built output (created by tsc)
│   │       ├── index.js             # Compiled entry point
│   │       └── **/*.js              # All compiled files
│   │
│   └── 🤝 shared/
│       ├── package.json             # @teif/shared
│       ├── tsconfig.json
│       │
│       └── src/
│           ├── types/
│           │   ├── api.ts           # API request/response types
│           │   ├── user.ts          # User types
│           │   └── entities.ts      # Domain entities
│           │
│           ├── utils/
│           │   ├── validators.ts    # Validation schemas (zod)
│           │   ├── helpers.ts       # Helper functions
│           │   └── constants.ts     # App constants
│           │
│           └── index.ts             # Exports barrel
│
├── 📋 Documentation
│   ├── PROJECT_STRUCTURE_AND_DEPLOYMENT.md  # This file
│   ├── README.md
│   ├── DEPLOYMENT_GUIDES/
│   │   ├── COOLIFY_DEPLOYMENT.md
│   │   └── LOCAL_DEVELOPMENT.md
│   └── API_DOCUMENTATION.md
│
└── 🔧 Configuration Files
    ├── .gitignore
    ├── .prettierrc
    ├── .eslintrc.json
    └── .env (not committed)
```

---

## Technology Stack

### Frontend (`packages/frontend`)

| Layer | Technology | Version | Purpose |
|-------|-----------|---------|---------|
| **Runtime** | Node.js | 20 (Alpine) | JavaScript runtime |
| **Framework** | React | 19.2.3 | UI library |
| **Build Tool** | Vite | 5.x | Module bundler |
| **Language** | TypeScript | 5.x | Type safety |
| **Styling** | Tailwind CSS | 4.x | Utility-first CSS |
| **State** | TanStack Query | 5.x | Server state management |
| **UI Components** | shadcn/ui | 0.9.5 | Reusable components |
| **Routing** | React Router | 6.x | Client-side routing |
| **HTTP** | Axios | 1.x | API client |
| **Testing** | Playwright | 1.57 | E2E testing |
| **Server** | Nginx | 1.25-Alpine | Production HTTP server |

### Backend (`packages/backend`)

| Layer | Technology | Version | Purpose |
|-------|-----------|---------|---------|
| **Runtime** | Node.js | 20 (Alpine) | JavaScript runtime |
| **Framework** | Hono.js | 4.4.0 | Lightweight web framework |
| **Language** | TypeScript | 5.x | Type safety |
| **ORM** | Prisma | 5.14.0 | Database abstraction |
| **Auth** | JWT | jsonwebtoken 9.x | Token-based auth |
| **Password** | bcrypt | 5.1.1 | Password hashing |
| **Email** | Nodemailer | 6.9.13 | SMTP email service |
| **Validation** | Zod | 3.x | Schema validation |
| **QR Codes** | qrcode | 1.5.3 | QR generation |
| **PDF** | Puppeteer | 23.x | PDF generation |
| **Database** | PostgreSQL | 16 | Main data store |
| **Server** | @hono/node-server | 1.12.0 | HTTP server adapter |

### Shared (`packages/shared`)

- **Types**: TypeScript interfaces (API contracts, entities)
- **Validators**: Zod schemas (input validation, type inference)
- **Utilities**: Helper functions, constants

### Build & Deployment

| Tool | Version | Purpose |
|------|---------|---------|
| **Package Manager** | pnpm | 9.0.0 | Fast, efficient package management |
| **Monorepo Orchestration** | Turbo | 2.x | Build parallelization & caching |
| **Container Runtime** | Docker | Latest | Container orchestration |
| **Container Compose** | Docker Compose | 3.8 | Multi-container orchestration |
| **Deployment Platform** | Coolify | 4.0-beta | Self-hosted Heroku alternative |
| **DNS** | DuckDNS | - | Dynamic DNS for domain updates |

---

## Deployment Configuration

### Docker Compose Stack (`docker-compose.prod.yml`)

#### PostgreSQL Service

```yaml
postgres:
  image: postgres:16-alpine
  environment:
    POSTGRES_USER: ${POSTGRES_USER}
    POSTGRES_PASSWORD: ${POSTGRES_PASSWORD}
    POSTGRES_DB: ${POSTGRES_DB}
  ports:
    - "5432:5432"
  healthcheck:
    test: ["CMD-SHELL", "pg_isready -U ${POSTGRES_USER}"]
    interval: 10s
    timeout: 5s
    retries: 5
  volumes:
    - postgres_data:/var/lib/postgresql/data
    - postgres_backups:/backups
  networks:
    - teif-network
```

**Key Features:**
- Alpine base for minimal image size
- Health checks ensure readiness
- Persistent volumes for data & backups
- Internal network isolation
- Performance tuning: 200 connections, 256MB cache

#### Backend Service

```yaml
backend:
  build:
    context: .
    dockerfile: packages/backend/Dockerfile
  depends_on:
    postgres:
      condition: service_healthy
  environment:
    NODE_ENV: production
    DATABASE_URL: postgresql://${POSTGRES_USER}:${POSTGRES_PASSWORD}@postgres:5432/${POSTGRES_DB}
    JWT_SECRET: ${JWT_SECRET}
    JWT_EXPIRY: ${JWT_EXPIRY}
    SMTP_HOST: ${SMTP_HOST}
    SMTP_PORT: ${SMTP_PORT}
    SMTP_USER: ${SMTP_USER}
    SMTP_PASSWORD: ${SMTP_PASSWORD}
    SMTP_FROM: ${SMTP_FROM}
    GEMINI_API_KEY: ${GEMINI_API_KEY}
  ports:
    - "3000:3000"
  healthcheck:
    test: ["CMD", "wget", "--no-verbose", "--tries=1", "--spider", "http://localhost:3000/api/health"]
    interval: 30s
    timeout: 10s
    retries: 3
    start_period: 40s
  deploy:
    resources:
      limits:
        cpus: '1.0'
        memory: 512M
```

**Key Features:**
- Waits for PostgreSQL health check
- All 20+ environment variables passed
- Health endpoint validation
- CPU & memory limits for resource management
- Auto-restart on failure

#### Frontend Service

```yaml
frontend:
  build:
    context: .
    dockerfile: packages/frontend/Dockerfile
    args:
      VITE_API_BASE_URL: ${VITE_API_BASE_URL}
  depends_on:
    backend:
      condition: service_healthy
  ports:
    - "80:80"
  healthcheck:
    test: ["CMD", "wget", "--no-verbose", "--tries=1", "--spider", "http://localhost/index.html"]
    interval: 30s
    timeout: 10s
    retries: 3
  deploy:
    resources:
      limits:
        cpus: '0.5'
        memory: 256M
```

**Key Features:**
- Build-time argument injection (API_BASE_URL)
- Waits for backend health check
- Nginx serves static React build
- Health check validates asset serving
- Smaller resource limits (frontend is lightweight)

### Frontend Dockerfile

```dockerfile
# BUILDER STAGE
FROM node:20-alpine AS builder

WORKDIR /app
ENV NODE_ENV=development

# Install dependencies
RUN apk add --no-cache libc6-compat
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml turbo.json ./
COPY packages/frontend/package.json packages/frontend/
COPY packages/shared/package.json packages/shared/
COPY packages/backend/package.json packages/backend/

RUN corepack enable && pnpm config set node-linker hoisted
RUN pnpm install --frozen-lockfile

# Copy source and build
COPY packages/frontend packages/frontend/
COPY packages/shared packages/shared/

RUN cd /app/packages/frontend && \
    pnpm build 2>&1 | tee /tmp/vite-build.log; \
    BUILD_STATUS=${PIPESTATUS[0]}; \
    if [ $BUILD_STATUS -ne 0 ]; then exit 1; fi

# PRODUCTION STAGE
FROM nginx:1.25-alpine

COPY --from=builder /app/packages/frontend/dist /usr/share/nginx/html
COPY packages/frontend/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
HEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=3 \
  CMD wget --no-verbose --tries=1 --spider http://localhost/index.html || exit 1

CMD ["nginx", "-g", "daemon off;"]
```

**Strategy:**
1. **Build Stage**: Full Node environment with devDependencies
2. **Production Stage**: Minimal Nginx image (only static files)
3. Result: ~50MB image (vs 500MB+ with full Node)

### Backend Dockerfile

```dockerfile
# BUILDER STAGE
FROM node:20-alpine AS builder

WORKDIR /app
ENV NODE_ENV=development

RUN apk add --no-cache libc6-compat
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml turbo.json ./
COPY packages/backend/package.json packages/backend/
COPY packages/shared/package.json packages/shared/
COPY packages/frontend/package.json packages/frontend/

RUN corepack enable && pnpm config set node-linker hoisted
RUN pnpm install --frozen-lockfile

COPY packages/backend packages/backend/
COPY packages/shared packages/shared/

RUN pnpm --filter @teif/backend build

# PRODUCTION STAGE
FROM node:20-alpine

WORKDIR /app
ENV NODE_ENV=production
ENV PORT=3000

COPY --from=builder /app/packages/backend/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/packages/backend/node_modules ./packages/backend/node_modules
COPY --from=builder /app/packages/shared ./packages/shared

EXPOSE 3000
HEALTHCHECK --interval=30s --timeout=10s --start-period=40s --retries=3 \
    CMD node -e "require('http').get('http://localhost:3000/api/health', (r) => {if (r.statusCode !== 200) throw new Error(r.statusCode)})"

CMD ["node", "dist/index.js"]
```

**Strategy:**
1. **Build Stage**: Compile TypeScript to JavaScript
2. **Production Stage**: Only runtime dependencies (libc6-compat for native modules)
3. Result: ~300MB image

---

## Environment Variables

### Required Variables

```bash
# Database
POSTGRES_USER=postgres
POSTGRES_PASSWORD=<strong-password>          # Required!
POSTGRES_DB=teif_prod

# JWT Authentication
JWT_SECRET=<random-secret-key>              # 32+ chars, required!
JWT_EXPIRY=3600                             # Seconds

# Email (OVH SMTP)
SMTP_HOST=ssl0.ovh.net
SMTP_PORT=587
SMTP_USER=support@comptacrm.com
SMTP_PASSWORD=<app-password>                # Required!
SMTP_FROM=support@comptacrm.com
SMTP_SECURE=true

# Application URLs
SITE_URL=https://efatoura.duckdns.org
VITE_API_BASE_URL=https://efatoura.duckdns.org/api
CORS_ORIGIN=https://efatoura.duckdns.org
```

### Optional Variables

```bash
# AI Features (Gemini API)
GEMINI_API_KEY=<google-genai-key>          # Optional

# Logging
LOG_LEVEL=info                              # debug|info|warn|error

# Coolify-specific
COOLIFY_URL=http://localhost:3000
COOLIFY_FQDN=localhost
```

### Coolify Configuration

In Coolify UI:
1. **Application** → **Configuration** → **Variables**
2. Mark required vars as "Available at Buildtime" (for VITE_API_BASE_URL)
3. Mark secrets as "Sensitive" (for passwords/keys)
4. Set **Base Directory**: `/`
5. Set **Compose File**: `/docker-compose.prod.yml`

---

## Build & Deployment Process

### Local Development Build

```bash
# Install dependencies
pnpm install

# Run dev servers (both frontend & backend with hot reload)
pnpm dev

# Build for production
pnpm build

# Type checking
pnpm typecheck

# Format code
pnpm format

# Clean
pnpm clean
```

### Monorepo Build Flow

```bash
turbo run build
├── Compile frontend (Vite)
│   └── packages/frontend/dist/
├── Compile backend (TypeScript)
│   └── packages/backend/dist/
└── (shared dependencies detected & used)
```

### Docker Build Flow (Coolify)

```
1. Import from GitHub (branch: production)
2. Inject 48 build arguments
3. Build frontend image
   ├── Install pnpm packages (766+ deps)
   ├── Run: pnpm build
   ├── Output: dist/ folder (static files)
   └── Stage 2: Copy to Nginx
4. Build backend image
   ├── Install pnpm packages
   ├── Run: pnpm build (TypeScript compilation)
   ├── Output: dist/ folder (compiled JS)
   └── Stage 2: Copy to Node runtime
5. Start docker-compose stack
   ├── PostgreSQL (port 5432)
   ├── Backend (port 3000)
   └── Frontend (port 80)
6. Run health checks
   ├── Database ready?
   ├── Backend healthy?
   └── Frontend accessible?
```

---

## Local Development

### Prerequisites

```bash
# Install Node 20
node --version    # Should be v20.x.x

# Install pnpm
npm install -g pnpm@9.0.0
pnpm --version    # Should be 9.0.0+

# Optional: Docker (for local container testing)
docker --version
docker-compose --version
```

### Setup

```bash
# Clone repository
git clone https://github.com/maksebdevNessrine/TEIF.git
cd TEIF-main

# Install all dependencies
pnpm install

# Create .env file
cp .env.example .env
# Edit .env with your local database connection

# Setup local database
# Option 1: Using Docker
docker run --name teif-postgres -e POSTGRES_PASSWORD=yourpassword -p 5432:5432 postgres:16-alpine

# Option 2: Using local PostgreSQL
psql -U postgres -c "CREATE DATABASE teif_dev;"

# Run database migrations
cd packages/backend
pnpm db:push
pnpm db:seed
cd ../..
```

### Development Commands

```bash
# Development mode (hot reload for both frontend & backend)
pnpm dev

# Frontend only
cd packages/frontend && pnpm dev

# Backend only
cd packages/backend && pnpm dev

# Type checking
pnpm typecheck

# Format code
pnpm format

# Build for production
pnpm build

# Database commands
pnpm db:migrate      # Create new migration
pnpm db:push         # Push schema to DB
pnpm db:seed         # Seed data
pnpm db:studio       # Open Prisma Studio GUI
```

### Frontend Development

```bash
cd packages/frontend

# Start Vite dev server (port 5173)
pnpm dev

# Build static site
pnpm build

# Preview production build
pnpm preview

# Run tests
pnpm test
pnpm test:ui        # With UI
pnpm test:coverage  # Coverage report

# E2E tests
pnpm test:e2e
pnpm test:e2e:ui
```

### Backend Development

```bash
cd packages/backend

# Start dev server (hot reload with tsx)
pnpm dev            # Runs on port 3000

# Build
pnpm build

# Database setup
pnpm db:generate    # Generate Prisma client
pnpm db:migrate
pnpm db:push
pnpm db:seed

# Type checking
pnpm typecheck
```

### Testing

```bash
# All tests
pnpm test:all

# Frontend
pnpm test:ui         # Vitest UI
pnpm test:coverage   # Coverage report

# Backend (if configured)
cd packages/backend && pnpm test

# E2E
pnpm test:e2e        # Headless
pnpm test:e2e:ui     # With browser UI
```

---

## Deployment to Coolify

### Prerequisites

1. **Coolify Instance**: Running on localhost (or accessible URL)
2. **GitHub Repository**: Push code to `production` branch
3. **Environment Variables**: Configured in Coolify UI
4. **Docker**: Running and accessible

### Step 1: Repository Setup

```bash
# Ensure code is on production branch
git checkout production
git push origin production

# Latest commit hash will be deployed
git log --oneline -1
```

### Step 2: Configure in Coolify

#### Create Application

1. Go to **Applications** → **New Application**
2. Select **GitHub** as source
3. Choose repository: `maksebdevNessrine/TEIF`
4. Select branch: `production`

#### Build Settings

1. **Build Direction** → Search for application
2. **Base Directory**: `/`
3. **Dockerfile Locations**:
   - Frontend: `packages/frontend/Dockerfile`
   - Backend: `packages/backend/Dockerfile`
4. **Docker Compose File**: `/docker-compose.prod.yml`
5. **Build Timeout**: `1800` seconds (30 minutes)

#### Environment Variables

Go to **Application** → **Configuration** → **Variables**

Add all required variables:

```
POSTGRES_USER=postgres
POSTGRES_PASSWORD=***
POSTGRES_DB=teif_prod
JWT_SECRET=***
JWT_EXPIRY=3600
SMTP_HOST=ssl0.ovh.net
SMTP_PORT=587
SMTP_USER=***
SMTP_PASSWORD=***
SMTP_FROM=***
SITE_URL=https://efatoura.duckdns.org
VITE_API_BASE_URL=https://efatoura.duckdns.org/api
CORS_ORIGIN=https://efatoura.duckdns.org
LOG_LEVEL=info
GEMINI_API_KEY=*** (optional)
```

**Mark as "Available at Buildtime"**: `VITE_API_BASE_URL`
**Mark as "Sensitive"**: Passwords and secrets

#### Network Configuration

1. **Reverse Proxy**: Enable
2. **Domain**: `efatoura.duckdns.org`
3. **HTTPS**: Enable (automatic with Let's Encrypt)
4. **Port Mapping**:
   - Frontend (port 80) → HTTPS
   - Backend (port 3000) → API endpoint

### Step 3: Deploy

```bash
# Trigger deployment
1. In Coolify: Click "Deploy"

# Monitor logs in real-time
2. Watch for:
   ✓ Building frontend...
   ✓ Building backend...
   ✓ PostgreSQL health check
   ✓ Backend health check
   ✓ Frontend health check
   ✓ Deployment successful!

# Verify deployment
3. curl https://efatoura.duckdns.org/api/health
4. curl https://efatoura.duckdns.org/
```

### Step 4: Post-Deployment Checks

```bash
# Verify all services are running
docker ps

# Check logs
docker logs teif-frontend
docker logs teif-backend
docker logs teif-postgres

# Verify database connectivity
docker exec teif-postgres psql -U postgres -d teif_prod -c "\dt"

# Test API
curl https://efatoura.duckdns.org/api/health

# Test frontend
open https://efatoura.duckdns.org
```

### Troubleshooting Deployments

#### Build Fails

Check logs for common issues:

```bash
# No output shown in Coolify logs
→ Check Dockerfile for syntax errors
→ Ensure all ARG declarations exist

# pnpm filter not found
→ Ensure pnpm-workspace.yaml is copied
→ Check package.json "name" field

# dist folder not created
→ Check vite.config.ts for syntax errors
→ Verify build script in package.json
```

#### Runtime Failures

```bash
# Backend won't start
→ Check DATABASE_URL connection string
→ Verify PostgreSQL is healthy
→ Check JWT_SECRET is set

# Frontend returns 502
→ Verify backend is healthy
→ Check CORS_ORIGIN configuration
→ Verify API_BASE_URL in Nginx config

# HTTPS issues
→ Check DuckDNS domain is updated
→ Let's Encrypt certificate generation takes 1-2 minutes
```

---

## API Endpoints

### Health Checks

```
GET /api/health           → Backend health status
GET /                     → Frontend status (200 OK)
```

### Authentication

```
POST /api/auth/register   → Create account
POST /api/auth/login      → Login
POST /api/auth/refresh    → Refresh token
POST /api/auth/logout     → Logout
```

### Protected Routes

All endpoints require `Authorization: Bearer <token>` header

```
GET  /api/users/me        → Current user profile
GET  /api/users/:id       → User details
PATCH /api/users/:id      → Update profile
```

---

## Monitoring & Maintenance

### Health Checks

All services run health checks every 30 seconds:

```
Frontend: GET http://localhost/index.html → 200 OK
Backend:  GET http://localhost:3000/api/health → 200 OK
Database: pg_isready → accept connections
```

### Logs

```bash
# Real-time logs
docker logs -f teif-frontend
docker logs -f teif-backend
docker logs -f teif-postgres

# Last 100 lines
docker logs --tail 100 teif-backend

# With timestamps
docker logs -t teif-backend
```

### Database Backups

```bash
# Manual backup
docker exec teif-postgres pg_dump -U postgres teif_prod > backup.sql

# Restore from backup
docker exec -i teif-postgres psql -U postgres teif_prod < backup.sql

# Backup volume location
ls -la volumes/backups/
```

### Resource Monitoring

```bash
# Container stats
docker stats

# Memory usage
docker inspect teif-backend | grep Memory

# Disk usage
du -sh volumes/postgres/
```

---

## Scaling & Performance

### Frontend Optimization

- **Gzip Compression**: Enabled in Nginx
- **Cache Busting**: Vite hashing on assets
- **Code Splitting**: Route-based with React lazy()
- **Image Optimization**: WebP format in components
- **CDN Ready**: Static files easily cacheable (24h+ TTL)

### Backend Optimization

- **Database Connection Pooling**: Configured in PostgreSQL
- **JWT Caching**: Avoid database lookups on every request
- **Indexed Queries**: Prisma automatically indexes key fields
- **Rate Limiting**: Middleware configured for API routes
- **Compression**: gzip enabled for responses

### Database Optimization

```sql
-- Automatic indexes
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_transactions_user_id ON transactions(user_id);

-- Connection pooling (PostgreSQL)
max_connections = 200
shared_buffers = 256MB
```

### Scaling Strategy

| Component | Single Node | High Traffic | Enterprise |
|-----------|------------|--------------|-----------|
| Frontend  | 1x Nginx   | 3x Nginx + LB | Cloudflare + CDN |
| Backend   | 1x Node    | 3x Node + LB | Kubernetes cluster |
| Database  | 1x PG     | PG + read replicas | RDS Multi-AZ |
| Cost      | ~$3-5/mo   | ~$20-50/mo  | $100+/mo |

---

## Security Considerations

### Data Protection

- ✅ Passwords hashed with bcrypt (12 rounds)
- ✅ JWT tokens expire in 1 hour
- ✅ HTTPS enforced (Let's Encrypt)
- ✅ Database inside private network
- ✅ Secrets not committed to git

### API Security

- ✅ CORS restricted to `efatoura.duckdns.org`
- ✅ SQL injection prevention (Prisma ORM)
- ✅ XSS prevention (React escaping)
- ✅ CSRF tokens in forms
- ✅ Rate limiting on auth endpoints

### Container Security

- ✅ Non-root user in containers
- ✅ Read-only filesystems where possible
- ✅ No privileged mode
- ✅ Resource limits enforced
- ✅ Health checks detect compromised services

---

## Disaster Recovery

### Database Backup Strategy

```bash
# Daily automated backup
docker run --rm \
  -v teif_postgres_data:/var/lib/postgresql/data \
  -v /backups:/backup \
  postgres:16-alpine \
  pg_dump -U postgres teif_prod > /backup/daily_$(date +%Y%m%d).sql
```

### Recovery Procedure

```bash
# If database is corrupted:
1. Stop containers: docker-compose down
2. Backup current data: cp -r volumes/postgres volumes/postgres.corrupted
3. Restore from backup: ./scripts/restore-db.sh
4. Restart services: docker-compose up -d
```

---

## Continuous Deployment

### Git Workflow

```
developer commits
       ↓
git push origin production
       ↓
Coolify webhook triggered
       ↓
docker-compose build
       ↓
Health checks pass?
       ↓
YES → Services start, traffic rerouted
NO  → Rollback to previous version
```

### Rollback

If deployment fails:

```bash
1. Coolify automatically keeps previous image
2. Click "Deploy" with previous commit
3. Services roll back instantly
4. No data loss (database untouched)
```

---

## Final Checklist

- [ ] All environment variables configured in Coolify
- [ ] Repository on `production` branch
- [ ] Latest code pushed to GitHub
- [ ] Docker images built successfully
- [ ] All three services running:
  - [ ] PostgreSQL (port 5432)
  - [ ] Backend (port 3000)
  - [ ] Frontend (port 80)
- [ ] Health checks passing
- [ ] Domain resolving: `efatoura.duckdns.org`
- [ ] HTTPS certificate installed
- [ ] API responding at `/api/health`
- [ ] Frontend loading without errors
- [ ] Database backups configured
- [ ] Monitoring enabled

---

## Contact & Support

- **Repository**: https://github.com/maksebdevNessrine/TEIF
- **Deployment Platform**: Coolify (localhost)
- **Domain**: efatoura.duckdns.org
- **Email**: support@comptacrm.com (SMTP configured)

---

**Document Version**: 1.0  
**Last Updated**: January 19, 2026  
**Maintainer**: Development Team
