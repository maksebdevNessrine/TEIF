# Frontend Authentication Guide

## Overview

The TEIF frontend implements a complete authentication system with login, registration, token management, and protected routes. It uses React Context for state management and Zod schemas for validation.

## Key Features

- ✅ **Login & Registration**: Complete forms with validation
- ✅ **Protected Routes**: Automatic redirect for unauthenticated users
- ✅ **Token Management**: Automatic refresh before expiry
- ✅ **Session Persistence**: Maintains login across page refreshes
- ✅ **Error Handling**: User-friendly error messages
- ✅ **Loading States**: Proper UI feedback during operations
- ✅ **Logout**: Secure token cleanup

## Architecture

### Authentication Flow

```
User Browser
    ↓
Login/Register Forms
    ↓
Validation with Zod
    ↓
API Request
    ↓
Backend Validation & Auth
    ↓
Token Generation
    ↓
Response + httpOnly Cookie
    ↓
Store Token in localStorage
    ↓
Update AuthContext
    ↓
Redirect to Dashboard
```

### Components

#### AuthContext (packages/frontend/src/contexts/AuthContext.tsx)

Manages application-wide authentication state using React Context.

**State:**
- `user`: Current logged-in user or null
- `isLoading`: Loading indicator during auth operations
- `isAuthenticated`: Boolean for quick auth check
- `refreshIntervalRef`: Reference to token refresh interval

**Methods:**
```typescript
// User authentication
login(email: string, password: string): Promise<void>
register(name: string, email: string, password: string): Promise<void>
logout(): Promise<void>

// Token management
refreshToken(): Promise<void>
checkAuth(): Promise<void>

// Hook
useAuth(): AuthContextType
```

**Features:**
- Automatic token refresh every minute
- Session recovery on page load
- Graceful error handling with user feedback
- Token expiry detection and handling

#### ProtectedRoute (packages/frontend/src/components/ProtectedRoute.tsx)

Wrapper component that enforces authentication for routes.

```typescript
<Route
  path="/invoices"
  element={
    <ProtectedRoute>
      <InvoicesPage />
    </ProtectedRoute>
  }
/>
```

**Behavior:**
- Redirects to `/login` if user not authenticated
- Maintains redirect location for post-login redirect
- Shows loading state while checking authentication

#### ErrorBoundary (packages/frontend/src/components/ErrorBoundary.tsx)

Catches React component errors and displays user-friendly error message.

**Features:**
- Catches rendering errors
- Shows error message in development
- Provides retry button
- Logs errors to console

#### Login Form (packages/frontend/src/pages/Login.tsx)

User login page with validation and error handling.

**Features:**
- Email and password validation (Zod)
- Real-time error clearing
- Loading state on submit
- Remember redirect location
- Link to registration

**Validation:**
```typescript
import { loginSchema, type LoginInput } from '@teif/shared';

const loginSchema = z.object({
  email: z.string().email('Invalid email format'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});
```

#### Register Form (packages/frontend/src/pages/Register.tsx)

User registration page with validation and error handling.

**Features:**
- Name, email, password validation
- Password confirmation matching
- Real-time error clearing
- Loading state on submit
- Link to login

**Validation:**
```typescript
import { registerSchema, type RegisterInput } from '@teif/shared';

const registerSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email format'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
});

// With password confirmation
const registerWithConfirmSchema = registerSchema.extend({
  confirmPassword: z.string()
}).refine((data) => data.password === data.confirmPassword, {
  message: 'Passwords do not match',
  path: ['confirmPassword']
});
```

## Using the Authentication System

### 1. Login Flow

```typescript
import { useAuth } from '@/contexts/AuthContext';

function LoginPage() {
  const { login, isLoading } = useAuth();

  const handleLogin = async (email: string, password: string) => {
    try {
      await login(email, password);
      // User redirected automatically
    } catch (error) {
      // Error shown as toast
    }
  };

  return (
    // Form implementation
  );
}
```

### 2. Check Authentication Status

```typescript
import { useAuth } from '@/contexts/AuthContext';

function Header() {
  const { user, isAuthenticated, logout } = useAuth();

  if (!isAuthenticated) {
    return <p>Not logged in</p>;
  }

  return (
    <div>
      <p>Welcome, {user?.name}!</p>
      <button onClick={logout}>Logout</button>
    </div>
  );
}
```

### 3. Protected Routes

```typescript
import { ProtectedRoute } from '@/components/ProtectedRoute';

// In router configuration
{
  path: '/invoices',
  element: (
    <ProtectedRoute>
      <InvoicesPage />
    </ProtectedRoute>
  ),
}
```

### 4. Access User Data

```typescript
import { useAuth } from '@/contexts/AuthContext';

function UserProfile() {
  const { user } = useAuth();

  return (
    <div>
      <p>ID: {user?.id}</p>
      <p>Email: {user?.email}</p>
      <p>Name: {user?.name}</p>
    </div>
  );
}
```

## API Integration

### API Client Setup (packages/frontend/src/lib/api.ts)

The API client automatically:
1. Adds `Authorization: Bearer {token}` header to all requests
2. Handles 401 responses by refreshing token
3. Retries request with new token
4. Stores tokens in localStorage

```typescript
// Example API call
const response = await api.get('/invoices');
// Token automatically added, refreshed if needed
```

### Token Storage

**Access Token:**
- Stored in localStorage with key `teif_auth_token`
- Sent in Authorization header

**Refresh Token:**
- Stored in httpOnly cookie by backend
- Automatically sent with API requests
- Never accessible to JavaScript (for security)

## Configuration

### Environment Variables

**Frontend (.env):**
```
VITE_API_BASE_URL=http://localhost:3000/api
VITE_APP_NAME=TEIF Invoice Generator
```

**Backend (.env):**
```
JWT_SECRET=your-super-secret-jwt-key
JWT_REFRESH_SECRET=your-super-secret-refresh-key
JWT_EXPIRES_IN=7d
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_ANON_KEY=your-anon-key
```

### TypeScript Configuration

**vite-env.d.ts:**
```typescript
/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_BASE_URL: string
  readonly VITE_APP_NAME: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
```

## Security Best Practices

### 1. Never Expose Tokens

```typescript
// ❌ WRONG: Sending token in URL
window.location.href = `/api/endpoint?token=${token}`;

// ✅ CORRECT: Send in Authorization header
api.get('/endpoint', {
  headers: { Authorization: `Bearer ${token}` }
});
```

### 2. Validate Input

```typescript
// ✅ Always validate with Zod schemas
import { loginSchema } from '@teif/shared';

try {
  const validated = loginSchema.parse(formData);
  await login(validated.email, validated.password);
} catch (error) {
  // Handle validation error
}
```

### 3. Clear Tokens on Logout

```typescript
// Handled automatically by AuthContext
await logout();
// - Clears localStorage token
// - Backend clears refresh token cookie
// - Redirects to login
```

### 4. Use HTTPS in Production

```typescript
// httpOnly cookies only sent over HTTPS
// In production, ensure all API calls use HTTPS
VITE_API_BASE_URL=https://api.yourdomain.com/api
```

### 5. Handle Errors Securely

```typescript
// ❌ WRONG: Exposing sensitive info
console.log('Login failed:', error.message);

// ✅ CORRECT: User-friendly error messages
toast.error('Invalid email or password');
```

## Testing

### Manual Testing Checklist

#### Registration
- [ ] Navigate to `/register`
- [ ] Submit with invalid data → Shows validation errors
- [ ] Submit with valid data → Creates user and redirects
- [ ] Verify token stored in localStorage
- [ ] Verify refresh token cookie set (DevTools > Application > Cookies)

#### Login
- [ ] Navigate to `/login`
- [ ] Submit with wrong password → Shows error toast
- [ ] Submit with valid credentials → Logs in and redirects
- [ ] Verify token stored and user state updated

#### Protected Routes
- [ ] Logged out: Visit `/invoices` → Redirects to `/login`
- [ ] Logged in: Visit `/invoices` → Access granted
- [ ] Refresh page while logged in → Remains logged in

#### Token Refresh
- [ ] Login and wait for token near expiry
- [ ] Make API call → Token auto-refreshes
- [ ] Verify new token in localStorage

#### Logout
- [ ] Click logout button → Redirected to login
- [ ] Verify localStorage token removed
- [ ] Verify refresh token cookie cleared
- [ ] Try accessing `/invoices` → Redirected to login

## Troubleshooting

### Issue: Stuck on loading screen

**Cause:** AuthContext checking authentication on mount

**Solution:** Wait for initial auth check to complete

### Issue: Token keeps expiring

**Cause:** Token refresh not working

**Solution:**
1. Check browser console for errors
2. Verify `VITE_API_BASE_URL` is correct
3. Check refresh token cookie exists (DevTools)
4. Verify backend JWT_REFRESH_SECRET is set

### Issue: Logout not working

**Cause:** Token not cleared properly

**Solution:**
1. Check localStorage is cleared
2. Check refresh token cookie cleared
3. Verify API call to `/auth/logout` succeeds
4. Check browser console for errors

### Issue: CORS errors on auth requests

**Cause:** Frontend URL not in backend CORS whitelist

**Solution:**
1. Add `FRONTEND_URL` to backend .env
2. Restart backend server
3. Check browser console for specific CORS errors

## Development Notes

### Adding New Authenticated Endpoints

1. Create service function:
```typescript
export async function getInvoices() {
  const response = await api.get('/invoices');
  return response.data;
}
```

2. Use in component:
```typescript
const { data } = useQuery({ queryKey: ['invoices'], queryFn: getInvoices });
```

3. Token automatically added by API client

### Debugging Authentication Issues

1. Open browser DevTools
2. Check Network tab → look for auth API calls
3. Check Application tab → verify localStorage token and cookies
4. Check Console tab → look for error messages
5. Check backend logs for validation errors

## Summary

The TEIF frontend authentication system is production-ready with:
- ✅ Complete validation with Zod schemas
- ✅ Automatic token refresh
- ✅ Secure storage (localStorage + httpOnly cookies)
- ✅ Protected routes
- ✅ Error handling and user feedback
- ✅ Session persistence

For more details, see:
- Backend documentation: `packages/backend/docs/AUTH.md`
- API integration: `packages/frontend/src/lib/api.ts`
- State management: `packages/frontend/src/contexts/AuthContext.tsx`
