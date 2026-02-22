# Authentication Documentation

## Overview

The TEIF authentication system uses a modern, secure approach combining Supabase Auth for user management with JWT tokens and httpOnly cookies for session management. This ensures both security and reliability.

## Architecture

```
┌──────────────────────────────────────────────────────────────┐
│                        Frontend                              │
│  ┌─────────────────────────────────────────────────────────┐ │
│  │ Login/Register Components                               │ │
│  │ - Form validation with Zod schemas                      │ │
│  │ - User input collection                                 │ │
│  └─────────────────────────────────────────────────────────┘ │
│  ┌─────────────────────────────────────────────────────────┐ │
│  │ AuthContext (State Management)                          │ │
│  │ - Manages user state                                    │ │
│  │ - Handles token refresh logic                           │ │
│  │ - Provides useAuth hook                                 │ │
│  └─────────────────────────────────────────────────────────┘ │
│  ┌─────────────────────────────────────────────────────────┐ │
│  │ API Client                                              │ │
│  │ - localStorage: stores access token                     │ │
│  │ - Automatic token refresh on 401                        │ │
│  │ - Adds Authorization header to requests                 │ │
│  └─────────────────────────────────────────────────────────┘ │
└──────────────────────────────────────────────────────────────┘
                            ↕
                        HTTPS/API
                            ↕
┌──────────────────────────────────────────────────────────────┐
│                        Backend                               │
│  ┌─────────────────────────────────────────────────────────┐ │
│  │ Auth Routes (/api/auth/*)                               │ │
│  │ - /register: Create user account                        │ │
│  │ - /login: Authenticate user                             │ │
│  │ - /refresh: Refresh access token                        │ │
│  │ - /logout: Revoke tokens                                │ │
│  │ - /me: Get current user                                 │ │
│  └─────────────────────────────────────────────────────────┘ │
│  ┌─────────────────────────────────────────────────────────┐ │
│  │ Auth Service                                            │ │
│  │ - JWT generation and validation                         │ │
│  │ - Supabase Auth integration                             │ │
│  │ - User account management                               │ │
│  └─────────────────────────────────────────────────────────┘ │
│  ┌─────────────────────────────────────────────────────────┐ │
│  │ Storage Layer (Prisma/Database)                         │ │
│  │ - Refresh token storage                                 │ │
│  │ - Token rotation tracking                               │ │
│  │ - User profiles                                         │ │
│  └─────────────────────────────────────────────────────────┘ │
└──────────────────────────────────────────────────────────────┘
```

## API Endpoints

### 1. Register User

**Endpoint:** `POST /api/auth/register`

**Request:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "SecurePassword123"
}
```

**Validation:**
- `name`: 2-100 characters
- `email`: Valid email format
- `password`: Minimum 8 characters

**Response (201 Created):**
```json
{
  "user": {
    "id": "user_123",
    "email": "john@example.com",
    "name": "John Doe"
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

**Headers Set:**
```
Set-Cookie: refreshToken=eyJ...; HttpOnly; Secure; SameSite=Strict; Max-Age=604800
```

**Error Responses:**

```json
// 400 - Validation error
{
  "error": "Validation failed",
  "details": {
    "email": "Invalid email format",
    "password": "Password must be at least 8 characters"
  }
}

// 409 - Email already exists
{
  "error": "Email already registered"
}

// 500 - Server error
{
  "error": "Failed to create user"
}
```

---

### 2. Login User

**Endpoint:** `POST /api/auth/login`

**Request:**
```json
{
  "email": "john@example.com",
  "password": "SecurePassword123"
}
```

**Validation:**
- `email`: Valid email format
- `password`: Minimum 6 characters

**Response (200 OK):**
```json
{
  "user": {
    "id": "user_123",
    "email": "john@example.com",
    "name": "John Doe"
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

**Headers Set:**
```
Set-Cookie: refreshToken=eyJ...; HttpOnly; Secure; SameSite=Strict; Max-Age=604800
```

**Error Responses:**

```json
// 401 - Invalid credentials
{
  "error": "Invalid email or password"
}

// 400 - Validation error
{
  "error": "Validation failed",
  "details": {
    "email": "Invalid email format"
  }
}
```

---

### 3. Refresh Token

**Endpoint:** `POST /api/auth/refresh`

**Request Headers:**
```
Cookie: refreshToken=eyJ...
```

**Response (200 OK):**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

**New Headers Set:**
```
Set-Cookie: refreshToken=eyJ...; HttpOnly; Secure; SameSite=Strict; Max-Age=604800
```

**Error Responses:**

```json
// 401 - Refresh token invalid or expired
{
  "error": "Refresh token invalid or expired"
}

// 401 - Refresh token not provided
{
  "error": "No refresh token provided"
}
```

---

### 4. Logout

**Endpoint:** `POST /api/auth/logout`

**Request Headers:**
```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
Cookie: refreshToken=eyJ...
```

**Response (200 OK):**
```json
{
  "message": "Logged out successfully"
}
```

**Headers Set:**
```
Set-Cookie: refreshToken=; Max-Age=0; Path=/
```

**Error Responses:**

```json
// 401 - Unauthorized
{
  "error": "Unauthorized"
}
```

---

### 5. Get Current User

**Endpoint:** `GET /api/auth/me`

**Request Headers:**
```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**Response (200 OK):**
```json
{
  "id": "user_123",
  "email": "john@example.com",
  "name": "John Doe"
}
```

**Error Responses:**

```json
// 401 - Unauthorized
{
  "error": "Unauthorized"
}
```

---

## Token Management

### Access Token (JWT)

**Purpose:** Short-lived token for authenticating API requests

**Structure:**
```
Header: {
  "alg": "HS256",
  "typ": "JWT"
}

Payload: {
  "userId": "user_123",
  "email": "john@example.com",
  "iat": 1673564800,
  "exp": 1673568400
}

Signature: HMACSHA256(base64UrlEncode(header) + "." + base64UrlEncode(payload), JWT_SECRET)
```

**Expiry:** 1 hour (configurable via `JWT_EXPIRES_IN`)

**Storage:** localStorage with key `teif_auth_token`

**Usage:** Sent in Authorization header as `Bearer {token}`

### Refresh Token

**Purpose:** Long-lived token for refreshing access tokens

**Expiry:** 7 days

**Storage:** httpOnly cookie (secure by default)

**Rotation:** New refresh token issued on each successful refresh

**Database Tracking:** Stored in Prisma for revocation tracking

## Security Features

### 1. Token Expiry
- Access tokens expire after 1 hour
- Refresh tokens expire after 7 days
- Expired tokens are rejected by backend

### 2. HttpOnly Cookies
- Refresh tokens stored in httpOnly cookies
- Prevents XSS attacks from stealing refresh tokens
- Cannot be accessed from JavaScript

### 3. Secure Flag
- Cookies only sent over HTTPS
- Enforced in production environment

### 4. SameSite Protection
- Set to `Strict` to prevent CSRF attacks
- Cookies not sent on cross-site requests

### 5. Password Hashing
- Passwords hashed with bcrypt (12 rounds)
- Never stored or transmitted in plain text
- Handled by Supabase Auth

### 6. Token Rotation
- Refresh tokens rotated on each refresh
- Old tokens invalidated to limit token reuse attacks

### 7. Supabase Auth
- Additional layer of authentication via Supabase
- Email verification (optional)
- Password reset capability

## Frontend Integration

### Using the useAuth Hook

```typescript
import { useAuth } from '@/contexts/AuthContext';

function MyComponent() {
  const { user, isAuthenticated, login, logout, register } = useAuth();

  return (
    <>
      {isAuthenticated ? (
        <>
          <p>Welcome, {user?.name}!</p>
          <button onClick={logout}>Logout</button>
        </>
      ) : (
        <>
          <button onClick={() => login(email, password)}>Login</button>
          <button onClick={() => register(name, email, password)}>Register</button>
        </>
      )}
    </>
  );
}
```

### Protected Routes

Protected routes automatically redirect unauthenticated users to login:

```typescript
import { ProtectedRoute } from '@/components/ProtectedRoute';

<Route
  path="/invoices"
  element={
    <ProtectedRoute>
      <InvoicesPage />
    </ProtectedRoute>
  }
/>
```

### Automatic Token Refresh

The AuthContext automatically refreshes tokens:

```typescript
// Token refresh is triggered:
// 1. On component mount (checks if token near expiry)
// 2. Periodically (every minute)
// 3. On API 401 response (handled by API client)
```

## Configuration

### Environment Variables

**Backend (.env):**
```
JWT_SECRET=your-super-secret-jwt-key-minimum-32-characters
JWT_REFRESH_SECRET=your-super-secret-refresh-key-minimum-32-characters
JWT_EXPIRES_IN=7d
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_ANON_KEY=your-anon-key
```

**Frontend (.env):**
```
VITE_API_BASE_URL=http://localhost:3000/api
```

### Token Expiry Times

Modify in backend environment:
- `JWT_EXPIRES_IN`: Access token expiry (default: 7d)
- Refresh token expiry: Hard-coded to 7 days (modify in auth service)

## Flow Diagrams

### Registration Flow

```
1. User fills registration form
2. Frontend validates with Zod schema
3. POST /api/auth/register
4. Backend validates input
5. Supabase Auth creates user account
6. Prisma stores user profile
7. Generate access token (1 hour)
8. Generate refresh token (7 days)
9. Store refresh token in httpOnly cookie
10. Return user & access token
11. Frontend stores token in localStorage
12. Redirect to /invoices
```

### Login Flow

```
1. User enters credentials
2. Frontend validates with Zod schema
3. POST /api/auth/login
4. Backend validates input
5. Supabase Auth authenticates user
6. Generate tokens
7. Store refresh token in httpOnly cookie
8. Return user & access token
9. Frontend stores token in localStorage
10. Redirect to dashboard
```

### Protected Route Access

```
1. User navigates to /invoices
2. Frontend checks isAuthenticated
3. If false: Redirect to /login
4. If true: Render protected component
5. Component makes API call
6. API adds Authorization header with token
7. Backend validates JWT
8. If valid: Process request
9. If expired: Trigger token refresh
10. If invalid: Return 401
```

### Token Refresh Flow

```
1. API call made with expired token
2. Backend returns 401 Unauthorized
3. API client detects 401
4. POST /api/auth/refresh with refresh cookie
5. Backend validates refresh token
6. Generate new access token
7. Generate new refresh token (rotation)
8. Store new refresh token in httpOnly cookie
9. Return new access token
10. API client stores new token
11. Retry original request with new token
12. Request succeeds
```

### Logout Flow

```
1. User clicks logout button
2. POST /api/auth/logout with tokens
3. Backend revokes tokens (optional)
4. Clear refresh token cookie
5. Frontend clears localStorage token
6. Clear user state
7. Redirect to /login
```

## Troubleshooting

### Token Expiry Errors

**Problem:** Getting 401 errors frequently

**Solution:**
1. Check `JWT_EXPIRES_IN` is set reasonably (e.g., 7d)
2. Verify token refresh interval is working
3. Check browser console for refresh token errors
4. Verify refresh token cookie is being sent

### Token Not Stored

**Problem:** Token lost after page refresh

**Solution:**
1. Check localStorage is enabled in browser
2. Verify `VITE_API_BASE_URL` is correct
3. Check API response includes token
4. Verify token is being stored in AuthContext

### CORS Errors

**Problem:** Getting CORS errors on auth requests

**Solution:**
1. Verify `FRONTEND_URL` in backend .env
2. Check backend has CORS middleware enabled
3. Verify credentials included in fetch requests (`credentials: 'include'`)
4. Check httpOnly cookie settings

### Cookie Not Set

**Problem:** Refresh token cookie not being set

**Solution:**
1. Verify HTTPS is used (cookies marked Secure)
2. Check `SameSite=Strict` compatibility
3. Verify cookie path is `/`
4. Check backend is setting cookie in response headers

## Best Practices

1. **Never expose refresh tokens to frontend JavaScript** - Use httpOnly cookies
2. **Always validate input** - Use Zod schemas on both frontend and backend
3. **Keep tokens short-lived** - Access tokens expire quickly
4. **Rotate refresh tokens** - Generate new refresh token on each refresh
5. **Use HTTPS in production** - Cookies marked Secure require HTTPS
6. **Clear tokens on logout** - Remove both localStorage token and cookie
7. **Handle token expiry gracefully** - Redirect to login on 401
8. **Log authentication events** - Track login/logout for security audit
