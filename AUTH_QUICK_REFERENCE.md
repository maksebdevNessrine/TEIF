# JWT Authentication - Quick Reference

## Files Created (8)

| File | Lines | Purpose |
|------|-------|---------|
| `backend/src/services/auth.service.ts` | 130 | Password hashing, JWT, user CRUD |
| `backend/src/middleware/auth.ts` | 46 | Bearer token validation |
| `backend/src/routes/auth.ts` | 158 | Register, login, logout, me endpoints |
| `backend/src/types/auth.types.ts` | 14 | TypeScript type definitions |
| `backend/src/utils/response.ts` | 45 | Response formatting helpers |
| `backend/src/middleware/error.middleware.ts` | 65 | Global error handler |
| `shared/src/validation/auth.schemas.ts` | 53 | Zod validation schemas |
| `shared/src/validation/index.ts` | +1 | Export auth schemas |

## Files Updated (6)

| File | Changes |
|------|---------|
| `backend/src/index.ts` | Added error middleware, auth routes mount |
| `frontend/src/lib/api.ts` | Implemented 4 auth API methods |
| `frontend/src/contexts/AuthContext.tsx` | Real API calls instead of mocks |
| `shared/src/validation/index.ts` | Export auth schemas |
| `backend/.env.example` | Documented all variables |
| `frontend/.env.example` | Updated with comments |

## API Endpoints

```
POST /api/auth/register    → 201 { user, token }
POST /api/auth/login       → 200 { user, token }
POST /api/auth/logout      → 200 { message }
GET  /api/auth/me          → 200 { user } (requires auth)
```

## Key Technologies

- **Password Hashing**: bcrypt (10 rounds)
- **Token Generation**: JWT (HS256, 7-day expiry)
- **Validation**: Zod schemas
- **Error Handling**: Middleware-based, centralized
- **Frontend State**: React Context + localStorage token

## Environment Variables Required

```env
JWT_SECRET="your-strong-32-char-secret"
JWT_EXPIRES_IN="7d"
PORT=3000
NODE_ENV="development"
FRONTEND_URL="http://localhost:5173"
DATABASE_URL="postgresql://..."
```

## Database Migration

```bash
cd packages/backend
pnpm run db:push
```

Creates `User` table with:
- id (cuid)
- email (unique)
- name
- passwordHash
- createdAt, updatedAt
- invoices relationship

## Testing

```bash
# Terminal 1: Backend
cd packages/backend && pnpm run dev

# Terminal 2: Frontend  
cd packages/frontend && pnpm run dev

# Terminal 3: Test auth
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"Test","email":"test@example.com","password":"password123"}'
```

## Error Responses

| Status | Error | Scenario |
|--------|-------|----------|
| 400 | Validation failed | Invalid input |
| 401 | Invalid credentials | Wrong password |
| 401 | Authentication required | Missing token |
| 404 | User not found | Email not registered |
| 409 | Email already exists | Duplicate registration |
| 500 | Internal server error | Server error |

## Type Definitions

```typescript
// Auth request types
type RegisterInput = { name: string; email: string; password: string }
type LoginInput = { email: string; password: string }

// Auth response types
type AuthResponse = { user: UserResponse; token: string }
type UserResponse = { id: string; email: string; name: string }

// Context
interface AuthUser { userId: string; email: string }
```

## Architecture

```
Frontend (React)
    ↓ axios + interceptors
Backend Routes (Hono)
    ↓
Auth Middleware (JWT validation)
    ↓
Auth Service (business logic)
    ↓
Database (Prisma + PostgreSQL)
```

## Security Summary

✅ Passwords hashed with bcrypt (10 rounds)  
✅ JWT tokens signed with secret  
✅ Input validation with Zod  
✅ CORS restricted to frontend origin  
✅ Error messages don't leak user existence  
✅ Middleware-based authentication  
✅ Types prevent accidental misuse  

## Production TODO

- [ ] Set strong JWT_SECRET (min 32 chars)
- [ ] Enable HTTPS
- [ ] Update FRONTEND_URL to production domain
- [ ] Consider HTTP-only cookies for token
- [ ] Implement refresh tokens
- [ ] Add rate limiting to auth endpoints
- [ ] Set up error logging/monitoring
- [ ] Review token expiry time
