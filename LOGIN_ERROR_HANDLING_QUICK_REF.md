# Login Error Handling - Quick Reference

## For Backend Developers

### Throwing Errors
```typescript
import { authErrors } from '@/utils/auth-errors';

// Common errors
throw authErrors.invalidCredentials();
throw authErrors.userNotFound();
throw authErrors.emailExists('user@example.com');
throw authErrors.accountLocked(900); // 15 min retry
throw authErrors.tooManyLoginAttempts(900);
throw authErrors.internalError();

// With details
throw authErrors.invalidVerificationCode();
throw authErrors.verificationCodeExpired();
```

### Error Response Format
```json
{
  "success": false,
  "error": "ERROR_CODE",
  "message": "User-friendly message",
  "code": "ERROR_CODE",
  "statusCode": 401,
  "retryable": true,
  "retryAfter": 900
}
```

### HTTP Status Codes
- `400` - Validation errors (INVALID_EMAIL, INVALID_PASSWORD, etc.)
- `401` - Auth errors (INVALID_CREDENTIALS, TOKEN_EXPIRED, etc.)
- `404` - Not found (USER_NOT_FOUND)
- `409` - Conflict (EMAIL_EXISTS)
- `429` - Rate limited (TOO_MANY_LOGIN_ATTEMPTS)
- `500` - Server errors (INTERNAL_ERROR, DATABASE_ERROR)

---

## For Frontend Developers

### Parsing Errors
```typescript
import { parseAuthError, isRateLimited, isNetworkError } from '@/lib/error-handler';

try {
  await loginUser(email, password);
} catch (error) {
  const parsed = parseAuthError(error);
  
  if (isRateLimited(parsed)) {
    // Show retry countdown
    setRetryAfter(parsed.retryAfter);
  }
  
  if (isNetworkError(parsed)) {
    // Show network error with retry
    showRetryButton();
  }
  
  // User-friendly message
  console.log(parsed.userMessage);
}
```

### Error Categories
```typescript
parsed.isValidationError    // 400 - Field validation failed
parsed.isAuthError          // 401 - Authentication failed
parsed.isServerError        // 500 - Server error
parsed.isRateLimited        // 429 - Rate limit exceeded
parsed.isNetworkError       // Network connection failed
```

### Displaying Errors
```typescript
// General error alert
{errors.general && (
  <div className={`alert ${errors.isNetworkError ? 'warning' : 'error'}`}>
    <p>{errors.general}</p>
    {errors.retryAfter && <p>Retry in {errors.retryAfter}s</p>}
  </div>
)}

// Field errors
{errors.email && <p className="field-error">{errors.email}</p>}
{errors.password && <p className="field-error">{errors.password}</p>}
```

### Multilingual Messages
```typescript
// Messages automatically in user's language
const t = useTranslation(language);

// Error keys available:
t('err_invalid_credentials')
t('err_user_not_found')
t('err_account_locked')
t('err_email_exists')
t('err_network_error')
t('err_too_many_login_attempts')
// ... and 20+ more
```

---

## Error Codes Reference

### 🔴 Critical (User Can't Login)
```
INVALID_CREDENTIALS      → "Email or password is incorrect"
USER_NOT_FOUND          → "Account not found"
ACCOUNT_LOCKED          → "Try again in X minutes"
ACCOUNT_DISABLED        → "Contact support"
```

### 🟡 Validation (Fix Input)
```
INVALID_EMAIL           → "Valid email required"
INVALID_PASSWORD        → "Password format invalid"
PASSWORD_TOO_WEAK       → "Min 8 chars, uppercase, number"
MISSING_FIELDS          → "Fill all required fields"
```

### 🟠 Temporary (Retry Later)
```
TOO_MANY_LOGIN_ATTEMPTS → "Retry in 15 minutes"
RATE_LIMITED            → "Too many requests, slow down"
NETWORK_ERROR           → "Check internet connection"
TOKEN_EXPIRED           → "Session expired, login again"
```

### 🔴 Server (Our Problem)
```
INTERNAL_ERROR          → "Unexpected error, try later"
DATABASE_ERROR          → "System error, try later"
TOKEN_GENERATION_FAILED → "Login system error"
```

---

## Common UI Patterns

### Pattern 1: Show Error Alert
```typescript
{errors.general && (
  <div className="p-4 rounded bg-red-900/20 border-l-4 border-red-600 text-red-200">
    <p className="font-medium">{errors.general}</p>
    {errors.retryAfter && <p className="text-sm">Retry in {errors.retryAfter}m</p>}
  </div>
)}
```

### Pattern 2: Disable Form on Rate Limit
```typescript
const isRateLimited = errors.code === 'TOO_MANY_LOGIN_ATTEMPTS';
<button disabled={isRateLimited}>
  {isLoading ? 'Signing in...' : 'Sign In'}
</button>
```

### Pattern 3: Show Retry Countdown
```typescript
{errors.retryAfter && (
  <p className="text-sm text-orange-400">
    Try again in {errors.retryAfter} seconds
  </p>
)}
```

### Pattern 4: Network Error Retry
```typescript
{errors.isNetworkError && (
  <button onClick={() => handleSubmit(e)}>
    Retry Connection
  </button>
)}
```

---

## Testing Error Scenarios

### Frontend
```typescript
// Mock network error
const error = new Error('Network error');
(error as any).response = undefined;

// Mock rate limit
const error = new Error('Too many attempts');
(error as any).response = {
  status: 429,
  data: {
    code: 'TOO_MANY_LOGIN_ATTEMPTS',
    retryAfter: 900
  }
};

// Mock validation error
const error = new Error('Invalid email');
(error as any).response = {
  status: 400,
  data: {
    code: 'INVALID_EMAIL'
  }
};
```

### Backend
```typescript
// In auth.service.ts
it('should throw invalid credentials for wrong password', () => {
  expect(() => loginUser('test@example.com', 'wrong'))
    .toThrow(AuthError);
});

it('should throw too many attempts after N failures', () => {
  expect(() => loginUser('test@example.com', 'wrong'))
    .toThrow(authErrors.tooManyLoginAttempts(900));
});
```

---

## Debugging Tips

### 1. Enable Detailed Logging
```typescript
// In api-client.ts
const error = await res.json();
console.error('Auth Error:', {
  status: res.status,
  code: error.code,
  message: error.message,
  details: error.details
});
```

### 2. Check Error Response Format
```typescript
// Ensure backend returns:
{
  success: false,
  error: "ERROR_CODE",
  message: "message",
  code: "ERROR_CODE",
  statusCode: 401
}
```

### 3. Verify i18n Keys
```typescript
// All error keys should exist in i18n
err_invalid_email
err_invalid_credentials
err_user_not_found
// etc...
```

### 4. Test Retry Logic
```typescript
// Simulate rate limit
await new Promise(r => setTimeout(r, retryAfter * 1000));
// Then retry
```

---

## Related Files

| File | Purpose |
|------|---------|
| `packages/backend/src/utils/auth-errors.ts` | Error definitions |
| `packages/backend/src/routes/auth.ts` | Login endpoint |
| `packages/frontend/src/lib/error-handler.ts` | Error parsing |
| `packages/frontend/src/pages/Login.tsx` | Login UI |
| `packages/frontend/src/services/i18n.ts` | Error messages |

---

## Compliance Checklist

For each new error scenario, ensure:

- [ ] Backend defines error code in `AuthErrorCode` enum
- [ ] Backend throws using `authErrors.errorName()`
- [ ] Error includes proper HTTP status code
- [ ] Frontend has `parseAuthError()` handler
- [ ] Error message added to i18n (AR, FR, EN)
- [ ] UI updated to handle error type
- [ ] Retry logic if `retryable: true`
- [ ] Tests added for error scenario

---

## Pro Tips

1. **Never reveal if email exists** - Always return "Invalid credentials"
2. **Add retry-after times** - Let frontend show countdown
3. **Use specific error codes** - Not just "Error"
4. **Categorize errors** - Network vs auth vs validation
5. **Make messages user-friendly** - No technical jargon
6. **Support all languages** - i18n error messages
7. **Test error paths** - Not just happy path
8. **Log for security** - Track failed attempts

---

## Support

For questions about error handling:
1. Check this reference card
2. Read `LOGIN_ERROR_HANDLING_GUIDE.md`
3. Review source files in `/src/utils/` and `/src/lib/`
4. Check test files for examples
