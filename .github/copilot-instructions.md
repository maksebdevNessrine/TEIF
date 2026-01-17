# MERN Stack Engineering Constitution + Implementation Guide

**Version:** 2025.1  
**Last Updated:** January 2025  
**Status:** Mandatory for Production Code

---

### WINDOWS TERMINAL RULES:
- I am on Windows 11 using PowerShell.
- DO NOT use Unix-style command chaining like `&&`.
- Use the semicolon `;` to separate independent commands (e.g., `cd server; npm install`).
- If you need to run a command ONLY if the previous one succeeds, use the PowerShell 7 syntax: `cmd1 && cmd2`. (Note: Only if I have PowerShell 7+).
- Use backslashes `\` for file paths, or even better, wrap paths in quotes `"./path/to/file"`.
- DO NOT use the pipe `|` unless you are actually passing data between programs.

# PART I: CONSTITUTIONAL PRINCIPLES

## 1. Purpose and Authority

This document defines **mandatory engineering policy** for all production systems built on the MERN stack.

These standards are **non-negotiable** for production code.

Any deviation requires:
- Written technical justification
- Approval from a Staff Engineer or Architect
- A tracking reference in the repository

Our objective is to deliver systems that are:
**predictable, observable, secure by design, and fast by default.**

---

## 2. Architectural Doctrine

### 2.1 System Posture

We operate under a **Server-Driven, API-First** architecture.

- Business logic lives on the **server**
- The client is an **interaction layer**, not a decision layer
- Data access happens **server-side by default**
- APIs are **stable contracts**, not implementation details

### 2.2 Non-Functional Priorities (in order)

1. **Security**
2. **Correctness**
3. **Observability**
4. **Performance**
5. **Developer Experience**

**Convenience never overrides safety.**

---

## 3. Performance as a Design Constraint

### 3.1 Performance Budgets (Mandatory)

| Layer | Budget |
|-------|--------|
| API latency (P95) | ≤ 100 ms |
| Database query (P95) | ≤ 20 ms |
| Client JS per route | ≤ 150 KB gzip |
| Largest Contentful Paint | ≤ 2.0 s |
| Cold start (server) | ≤ 500 ms |

**Budgets are design inputs, not post-launch metrics.**

### 3.2 Performance Measurement Requirements

- All critical paths must be instrumented
- P50, P95, P99 latencies tracked
- Performance regression gates in CI/CD
- Weekly performance reviews for high-traffic endpoints

---

## 4. Security Doctrine

### 4.1 Threat Model Assumptions

We design under the assumption that:

- The client is **compromised**
- Credentials **will leak**
- Networks are **hostile**
- Insider risk **exists**

Therefore:

- **Zero trust** by default
- **Least privilege** everywhere
- **Defense in depth** at every layer

### 4.2 Security Principles (OWASP Aligned)

1. **Never trust user input** — Validate and sanitize everything
2. **Fail securely** — Default deny, not default allow
3. **Minimize attack surface** — Expose only what's necessary
4. **Separate duties** — Authentication ≠ Authorization
5. **Audit everything** — Log access, not just changes

---

## 5. Testing Strategy — Risk-Driven, Not Metric-Driven

### 5.1 Coverage Policy

- **Minimum:** 80%
- **Target:** Confidence, not vanity metrics

### 5.2 Mandatory Deterministic Tests

Critical paths **must have full coverage:**

- Authentication & authorization
- Payments & billing
- Data deletion (GDPR)
- Privilege escalation
- Session management

Low-risk UI logic may remain lightly tested.

### 5.3 Testing Pyramid

```
     E2E (10%)        ← Critical user flows only
    ────────
   Integration (30%)  ← API contracts, DB interactions
  ────────────────
 Unit Tests (60%)     ← Business logic, validators
```

---

## 6. Observability as a First-Class Feature

**If it cannot be observed, it is not production-ready.**

### 6.1 Required Signals

- **Structured logs** (JSON format)
- **Metrics** (latency, errors, throughput)
- **Traces** (distributed request tracking)
- **Health endpoints** (`/health`, `/ready`)

### 6.2 Logging Rules

**Never log:**
- Secrets
- Tokens
- Passwords
- Credit card numbers
- Social security numbers

**Always log:**
- User actions (who, what, when)
- System state changes
- External API failures
- Security events (failed auth, rate limits)

---

## 7. Anti-Patterns (Explicitly Forbidden)

The following patterns are **architecturally prohibited:**

❌ Fat controllers (business logic in routes)  
❌ God services (one service doing everything)  
❌ Shared "utils" dumping grounds  
❌ UI-driven business logic  
❌ Direct DB access from multiple services  
❌ Synchronous cross-service calls in hot paths  
❌ Optimizing before measuring  
❌ Security by obscurity  
❌ Using `any` type in TypeScript  
❌ Storing passwords in plain text  
❌ Trusting client-side validation  

---

## 8. Engineering North Star

We optimize for:

- **Predictability** over cleverness
- **Observability** over assumptions
- **Security** over convenience
- **Performance by design**, not by patching
- **Simplicity** over premature abstraction

**If a decision conflicts with these principles, the decision is wrong.**

---

# PART II: IMPLEMENTATION STANDARDS

## 9. Frontend Direction — React 19.2 (Server-First)

**Versions change. Principles do not.**

### 9.1 Architectural Mandate

- **Server Components are the default** — Use `'use client'` only when interactivity is required
- **React Compiler handles memoization** — No manual `useMemo`/`useCallback` unless profiling proves necessity
- **JavaScript payload is a budgeted resource** — Every KB must be justified

### 9.2 State Strategy

| State Type | Solution |
|------------|----------|
| Local (component-specific) | `useState`, `useReducer` |
| Server (API data) | **TanStack Query** (React Query) |
| Global client | **Zustand** |
| Legacy complex state | Redux (only if unavoidable) |

### 9.3 React 19.2 Modern Patterns

```javascript
// ✅ CORRECT: Server Component (default)
async function ProductList() {
  const products = await db.products.find();
  return (
    <div>
      {products.map(p => <ProductCard key={p.id} {...p} />)}
    </div>
  );
}

// ✅ CORRECT: Client Component (interactive only)
'use client';
import { useState } from 'react';

export function SearchBar() {
  const [query, setQuery] = useState('');
  return <input value={query} onChange={e => setQuery(e.target.value)} />;
}

// ✅ CORRECT: Server Actions for mutations
async function createOrder(formData) {
  'use server';
  const order = await db.orders.create({
    userId: formData.get('userId'),
    total: formData.get('total')
  });
  revalidatePath('/orders');
  return order;
}

// ✅ CORRECT: Form with Server Action
<form action={createOrder}>
  <input name="userId" />
  <input name="total" />
  <button type="submit">Create Order</button>
</form>
```

### 9.4 Code Splitting & Performance

```javascript
// ✅ Route-based code splitting
import { lazy, Suspense } from 'react';

const Dashboard = lazy(() => import('./Dashboard'));

function App() {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <Dashboard />
    </Suspense>
  );
}

// ✅ Pre-render next likely routes (React 19.2)
import { Activity } from 'react';

<Activity mode="hidden">
  <NextRoute />
</Activity>
```

### 9.5 TypeScript Requirements (Strict Mode)

```json
// tsconfig.json
{
  "compilerOptions": {
    "strict": true,
    "noImplicitAny": true,
    "strictNullChecks": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true
  }
}
```

```typescript
// ✅ CORRECT: Explicit types, no 'any'
interface User {
  id: string;
  email: string;
  role: 'admin' | 'user';
}

async function getUser(id: string): Promise<User> {
  const user = await db.users.findById(id);
  if (!user) throw new Error('User not found');
  return user;
}

// ❌ FORBIDDEN: Using 'any'
function processData(data: any) { } // NEVER DO THIS
```

### 9.6 Styling Standards

- **Tailwind CSS only** — Utility-first approach
- **Core classes only** — No JIT compilation in production
- **Use `cn()` helper** for conditional classes
- **Never use inline styles** or CSS-in-JS libraries

```javascript
import { cn } from '@/lib/utils';

<button className={cn(
  "px-4 py-2 rounded",
  isPrimary && "bg-blue-600 text-white",
  isDisabled && "opacity-50 cursor-not-allowed"
)}>
  Submit
</button>
```

---

## 10. Backend Direction — Node.js + Express

### 10.1 Layered Responsibility Model (Mandatory)

```
Routes        → Transport only (HTTP concerns)
Controllers   → Orchestration only (request/response)
Services      → Business logic only
Models        → Persistence only (database schemas)
```

**No layer may absorb the responsibility of another.**

### 10.2 Project Structure (Enforced)

```
/src
  /routes       # API route definitions
  /controllers  # Request handlers (thin layer)
  /services     # Business logic (thick layer)
  /models       # Mongoose schemas
  /middleware   # Custom middleware
  /validators   # Input validation (Joi/Zod)
  /utils        # Pure functions only
  /config       # Configuration files
  /types        # TypeScript type definitions
```

### 10.3 Security Implementation (Non-Negotiable)

```javascript
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import mongoSanitize from 'express-mongo-sanitize';
import hpp from 'hpp';

// ✅ Required security middleware
app.use(helmet()); // Secure HTTP headers
app.use(express.json({ limit: '10kb' })); // Prevent payload attacks
app.use(mongoSanitize()); // Prevent NoSQL injection
app.use(hpp()); // Prevent HTTP parameter pollution

// ✅ Rate limiting (per route)
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // 100 requests per window
  message: 'Too many requests from this IP'
});

app.use('/api/', apiLimiter);

// ✅ Stricter limits for auth endpoints
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5, // 5 attempts per 15 minutes
  skipSuccessfulRequests: true
});

app.use('/api/auth/login', authLimiter);
```

### 10.4 Authentication Standards (2025)

```javascript
// ✅ JWT with HTTP-only cookies (NEVER localStorage)
const generateToken = (userId) => {
  return jwt.sign(
    { userId },
    process.env.JWT_SECRET,
    {
      expiresIn: '15m',
      algorithm: 'HS256'
    }
  );
};

const sendToken = (res, token) => {
  res.cookie('accessToken', token, {
    httpOnly: true,      // Prevent XSS
    secure: true,        // HTTPS only
    sameSite: 'strict',  // CSRF protection
    maxAge: 15 * 60 * 1000
  });
};

// ✅ Password hashing (bcrypt, min 12 rounds)
import bcrypt from 'bcrypt';

const hashPassword = async (password) => {
  return await bcrypt.hash(password, 12);
};

// ✅ Refresh token pattern
const generateRefreshToken = (userId) => {
  return jwt.sign(
    { userId },
    process.env.REFRESH_TOKEN_SECRET,
    { expiresIn: '7d' }
  );
};
```

### 10.5 Input Validation (Always Required)

```javascript
import Joi from 'joi';

// ✅ Define schemas
const userSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(8).required(),
  role: Joi.string().valid('admin', 'user').default('user')
});

// ✅ Validation middleware
const validate = (schema) => (req, res, next) => {
  const { error } = schema.validate(req.body, { abortEarly: false });
  
  if (error) {
    const errors = error.details.map(d => d.message);
    return res.status(400).json({ errors });
  }
  
  next();
};

// ✅ Use in routes
router.post('/users', validate(userSchema), createUser);
```

### 10.6 Error Handling (Centralized)

```javascript
// ✅ Custom error class
class AppError extends Error {
  constructor(message, statusCode, isOperational = true) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = isOperational;
    Error.captureStackTrace(this, this.constructor);
  }
}

// ✅ Async wrapper to catch errors
const catchAsync = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

// ✅ Global error handler
app.use((err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  
  if (process.env.NODE_ENV === 'production') {
    // Don't leak error details in production
    if (err.isOperational) {
      res.status(err.statusCode).json({
        status: 'error',
        message: err.message
      });
    } else {
      console.error('ERROR:', err);
      res.status(500).json({
        status: 'error',
        message: 'Something went wrong'
      });
    }
  } else {
    // Development: show full error
    res.status(err.statusCode).json({
      status: 'error',
      message: err.message,
      stack: err.stack
    });
  }
});
```

### 10.7 API Design Standards

```javascript
// ✅ RESTful endpoint structure
GET    /api/v1/users           # List users
GET    /api/v1/users/:id       # Get user
POST   /api/v1/users           # Create user
PATCH  /api/v1/users/:id       # Update user
DELETE /api/v1/users/:id       # Delete user

// ✅ Consistent response format
{
  "status": "success",
  "data": {
    "user": { /* user object */ }
  },
  "meta": {
    "page": 1,
    "limit": 20,
    "total": 100
  }
}

// ✅ Error response format
{
  "status": "error",
  "message": "User not found",
  "code": "USER_NOT_FOUND"
}
```

---

## 11. Data Architecture — MongoDB

### 11.1 Data Ownership Doctrine

- **Each service owns its schema**
- **Cross-service database access is forbidden**
- Integration happens via:
  - APIs
  - Events
  - Message queues

### 11.2 Schema Design Rules

**Embed for locality. Reference for volatility.**

```javascript
// ✅ CORRECT: Embed for 1:1 relationships
const userSchema = new Schema({
  name: String,
  email: String,
  address: {
    street: String,
    city: String,
    country: String
  }
});

// ✅ CORRECT: Reference for many:many
const orderSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User' },
  products: [{ type: Schema.Types.ObjectId, ref: 'Product' }],
  total: Number
});

// ❌ FORBIDDEN: Unbounded arrays
const postSchema = new Schema({
  comments: [commentSchema] // BAD: Can grow infinitely
});

// ✅ CORRECT: Reference for potentially large arrays
const postSchema = new Schema({
  commentCount: Number
});
const commentSchema = new Schema({
  postId: { type: Schema.Types.ObjectId, ref: 'Post' }
});
```

### 11.3 Indexing Strategy (Performance Critical)

**Indexes are created only after query patterns are known.**

```javascript
// ✅ Single-field index
userSchema.index({ email: 1 }, { unique: true });

// ✅ Compound index (order matters!)
// For query: db.orders.find({ userId: X, status: Y }).sort({ createdAt: -1 })
orderSchema.index({ userId: 1, status: 1, createdAt: -1 });

// ✅ Sparse index (for optional fields)
userSchema.index({ phoneNumber: 1 }, { sparse: true });

// ✅ TTL index (auto-delete old documents)
sessionSchema.index({ createdAt: 1 }, { expireAfterSeconds: 86400 });

// ✅ Text index (full-text search)
productSchema.index({ name: 'text', description: 'text' });
```

### 11.4 Query Optimization (Mandatory)

```javascript
// ❌ BAD: Fetching all fields
const users = await User.find();

// ✅ GOOD: Project only needed fields
const users = await User.find().select('name email');

// ✅ GOOD: Lean queries for read-only data (50% faster)
const users = await User.find().select('name email').lean();

// ✅ GOOD: Pagination
const users = await User.find()
  .limit(20)
  .skip(page * 20)
  .sort({ createdAt: -1 });

// ✅ GOOD: Use explain() to verify index usage
const explain = await User.find({ email: 'test@example.com' })
  .explain('executionStats');
console.log(explain.executionStats.executionTimeMillis); // Should be < 20ms
```

### 11.5 Aggregation Pipeline Performance

```javascript
// ✅ Optimized aggregation (match early, limit often)
db.orders.aggregate([
  { $match: { status: 'shipped', createdAt: { $gte: lastMonth } } }, // Filter FIRST
  { $lookup: { from: 'users', localField: 'userId', foreignField: '_id', as: 'user' } },
  { $group: { _id: '$userId', total: { $sum: '$amount' } } },
  { $sort: { total: -1 } },
  { $limit: 10 }
], { allowDiskUse: true }); // For large datasets
```

### 11.6 Data Integrity Enforcement

```javascript
const userSchema = new Schema({
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    lowercase: true,
    validate: {
      validator: (v) => /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(v),
      message: 'Invalid email format'
    }
  },
  role: {
    type: String,
    enum: ['admin', 'user', 'moderator'],
    default: 'user'
  },
  age: {
    type: Number,
    min: [18, 'Must be at least 18'],
    max: [120, 'Invalid age']
  }
});

// ✅ Pre-save hook for consistency
userSchema.pre('save', async function(next) {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 12);
  }
  next();
});
```

---

## 12. DevOps & Deployment

### 12.1 Deployment Policy

Every change goes through:

1. **Linting** (ESLint + Prettier)
2. **Automated tests** (Jest + Supertest)
3. **Security scanning** (npm audit, Snyk)
4. **Staging verification**

Production deploys require:

- ✅ Green CI/CD pipeline
- ✅ Rollback plan documented
- ✅ Observability confirmation

### 12.2 Docker Best Practices

```dockerfile
# ✅ Multi-stage build for minimal image size
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production && npm cache clean --force

FROM node:20-alpine
WORKDIR /app
COPY --from=builder /app/node_modules ./node_modules
COPY . .

# ✅ Run as non-root user
RUN addgroup -g 1001 -S nodejs && adduser -S nodejs -u 1001
USER nodejs

EXPOSE 3000
CMD ["node", "server.js"]
```

### 12.3 Environment Configuration

```javascript
// ✅ Use dotenv for local development
import 'dotenv/config';

// ✅ Validate environment variables on startup
const requiredEnv = ['DATABASE_URL', 'JWT_SECRET', 'NODE_ENV'];
requiredEnv.forEach(key => {
  if (!process.env[key]) {
    throw new Error(`Missing required environment variable: ${key}`);
  }
});

// ❌ NEVER commit .env files
// Add to .gitignore:
// .env
// .env.local
// .env.production
```

### 12.4 Health Checks & Monitoring

```javascript
// ✅ Health endpoint (required for load balancers)
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok', timestamp: Date.now() });
});

// ✅ Readiness check (includes DB connection)
app.get('/ready', async (req, res) => {
  try {
    await mongoose.connection.db.admin().ping();
    res.status(200).json({ status: 'ready' });
  } catch (error) {
    res.status(503).json({ status: 'unavailable' });
  }
});

// ✅ Structured logging with Winston
import winston from 'winston';

const logger = winston.createLogger({
  level: process.env.LOG_LEVEL || 'info',
  format: winston.format.json(),
  transports: [
    new winston.transports.Console()
  ]
});

// Usage
logger.info('User created', { userId: user.id, email: user.email });
logger.error('Database connection failed', { error: err.message });
```

---

## 13. Testing Implementation

### 13.1 Test Structure

```javascript
// ✅ Unit test (services/business logic)
describe('UserService', () => {
  describe('createUser', () => {
    it('should hash password before saving', async () => {
      const user = await UserService.create({
        email: 'test@example.com',
        password: 'password123'
      });
      
      expect(user.password).not.toBe('password123');
      expect(await bcrypt.compare('password123', user.password)).toBe(true);
    });
    
    it('should throw error for duplicate email', async () => {
      await UserService.create({ email: 'test@example.com', password: 'pass' });
      
      await expect(
        UserService.create({ email: 'test@example.com', password: 'pass' })
      ).rejects.toThrow('Email already exists');
    });
  });
});

// ✅ Integration test (API endpoints)
import request from 'supertest';
import app from '../app';

describe('POST /api/users', () => {
  it('should create user and return 201', async () => {
    const res = await request(app)
      .post('/api/users')
      .send({ email: 'new@example.com', password: 'password123' })
      .expect(201);
    
    expect(res.body.data.user).toHaveProperty('id');
    expect(res.body.data.user.email).toBe('new@example.com');
  });
  
  it('should return 400 for invalid email', async () => {
    const res = await request(app)
      .post('/api/users')
      .send({ email: 'invalid-email', password: 'password123' })
      .expect(400);
    
    expect(res.body.errors).toContain('"email" must be a valid email');
  });
});
```

---

## 14. Code Quality Enforcement

### 14.1 ESLint Configuration

```json
{
  "extends": [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:react/recommended",
    "plugin:react-hooks/recommended",
    "prettier"
  ],
  "rules": {
    "no-console": "warn",
    "no-unused-vars": "error",
    "@typescript-eslint/no-explicit-any": "error",
    "@typescript-eslint/explicit-function-return-type": "warn",
    "react/prop-types": "off",
    "react-hooks/exhaustive-deps": "error"
  }
}
```

### 14.2 Git Commit Standards

Use **Conventional Commits**:

```
feat: add user authentication
fix: resolve memory leak in WebSocket handler
refactor: extract validation logic to service layer
docs: update API documentation for v2
test: add integration tests for payment flow
perf: optimize database query with compound index
```

---

## 15. Compliance Checklist

**Every production change must satisfy:**

- [ ] All inputs validated and sanitized
- [ ] Authentication and authorization reviewed
- [ ] Error handling implemented
- [ ] Observability added (logs, metrics)
- [ ] Performance impact assessed
- [ ] Security implications documented
- [ ] Tests added or updated (80% coverage)
- [ ] TypeScript strict mode compliant
- [ ] ESLint + Prettier passing
- [ ] No secrets in code or commits

---

## 16. Final Mandate

These standards define **how we think**, not only how we code.

Any code that:

- Compromises security
- Hides failures
- Sacrifices clarity
- Ignores performance budgets

is **not production-ready**—regardless of whether it "works."

---

**END OF DOCUMENT**

This constitution is a living document. Propose amendments through RFC process.