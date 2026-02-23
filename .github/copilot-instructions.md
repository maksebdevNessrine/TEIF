# Copilot Instructions — MERN Stack Workspace
**Version:** 2025.2 | Merged Production Specification

---

## PART 0 — AI BEHAVIORAL CONTRACT

### 0.1 Environment

This workspace runs on **Windows 11 / PowerShell**. All terminal commands must follow these rules:

- Use `;` to separate independent commands — never `&&` (Unix-style)
- Use `&&` **only** if PowerShell 7+ is confirmed and the second command depends on the first succeeding
- Use backslashes `\` for paths, or wrap in quotes `"./path/to/file"`
- Never use `|` unless actually piping data between programs

### 0.2 Stack Initialization

If the active stack is not clear from context, ask **one** question before generating code:

> "Stack check: React, Vue, or Svelte? Active UI library (Shadcn, Radix, MUI, or none)?"

Store as session context. Never ask again. If context is obvious from existing code, skip and proceed.

### 0.3 Response Behavior

1. Generate code immediately. No "Sure!" or "Great question."
2. **Rationale:** One-line comment (`//`) or a single line before the block. Never a paragraph.
3. **Silent philosophy:** Design and architecture values shape output — they are never verbalized unless `DEEPDIVE` is active.
4. **Architectural ambiguity:** Ask one targeted question and stop. Do not guess and generate the wrong architecture.
5. **Cosmetic ambiguity:** Make a decision, note it in the rationale comment, proceed.

### 0.4 Conflict Resolution Hierarchy

When rules compete, resolve in this order (1 = highest):

| Priority | Rule |
|----------|------|
| 1 | Security — Zero trust, OWASP aligned |
| 2 | Correctness — Validated, typed, tested |
| 3 | Accessibility — WCAG AA mandatory, AAA targeted |
| 4 | Performance — Within defined budgets |
| 5 | Stack compliance — Use active library primitives |
| 6 | Avant-garde aesthetic — Bespoke, non-templated |
| 7 | Response brevity |

### 0.5 Standard Response Format

```
// [One-line rationale: why this decision was made]

[Code — typed, import-complete, production-ready]
```

Nothing else in default mode.

### 0.6 `DEEPDIVE` Protocol

**Trigger:** User writes `DEEPDIVE` anywhere (case-insensitive).
**Duration:** One response only. Revert immediately after.
**Threshold:** If the request is trivially simple, respond:

> "`DEEPDIVE` on a low-complexity task. Reply `DEEPDIVE confirm` to proceed with exhaustive analysis."

**When active, structure as:**

1. **Problem Decomposition** — What was asked vs. what is actually needed
2. **Architectural Decision Log** — What was chosen, what was rejected, tradeoffs accepted
3. **Dimensional Analysis:**
   - *Psychological* — Cognitive load, mental model, trust signals
   - *Performance* — Repaint/reflow costs, compositor eligibility, bundle impact
   - *Accessibility* — ARIA patterns, keyboard flow, specific WCAG criteria
   - *Scalability* — Behavior at 10 items vs. 10,000; what breaks first
4. **Edge Cases & Failure Modes** — What a code review would miss
5. **The Code** — Production-ready, fully typed, library-compliant

---

## PART I — CONSTITUTIONAL PRINCIPLES

### 1. Architectural Doctrine

This workspace operates under a **Server-Driven, API-First** architecture:

- Business logic lives on the **server**
- The client is an **interaction layer**, not a decision layer
- APIs are **stable contracts**, not implementation details

**Non-functional priorities (in order):**
1. Security
2. Correctness
3. Observability
4. Performance
5. Developer Experience

**Convenience never overrides safety.**

### 2. Performance Budgets (Mandatory)

| Layer | Budget |
|-------|--------|
| API latency (P95) | ≤ 100 ms |
| Database query (P95) | ≤ 20 ms |
| Client JS per route | ≤ 150 KB gzip |
| Largest Contentful Paint | ≤ 2.0 s |
| Cold start (server) | ≤ 500 ms |

Budgets are **design inputs**, not post-launch metrics. P50/P95/P99 must be tracked on all critical paths.

### 3. Security Doctrine

**Threat model assumptions:**
- The client is compromised
- Credentials will leak
- Networks are hostile
- Insider risk exists

**Principles (OWASP aligned):**
1. Never trust user input — validate and sanitize everything
2. Fail securely — default deny, not default allow
3. Minimize attack surface — expose only what's necessary
4. Separate duties — authentication ≠ authorization
5. Audit everything — log access, not just changes

### 4. Testing Strategy

**Coverage:** 80% minimum. Target confidence, not vanity metrics.

**Mandatory full coverage:**
- Authentication & authorization
- Payments & billing
- Data deletion (GDPR)
- Privilege escalation
- Session management

```
     E2E (10%)        ← Critical user flows only
    ────────
   Integration (30%)  ← API contracts, DB interactions
  ────────────────
 Unit Tests (60%)     ← Business logic, validators
```

### 5. Observability (Non-Negotiable)

**If it cannot be observed, it is not production-ready.**

Required: structured JSON logs, latency metrics, distributed traces, `/health` + `/ready` endpoints.

**Never log:** secrets, tokens, passwords, card numbers, SSNs.
**Always log:** user actions, state changes, external API failures, security events.

### 6. Anti-Patterns — Architecturally Forbidden

❌ Fat controllers (business logic in routes)
❌ God services (one service doing everything)
❌ Shared "utils" dumping grounds
❌ UI-driven business logic
❌ Direct DB access from multiple services
❌ Synchronous cross-service calls in hot paths
❌ Optimizing before measuring
❌ Security by obscurity
❌ `any` type in TypeScript
❌ Plain-text passwords
❌ Trusting client-side validation

---

## PART II — IMPLEMENTATION STANDARDS

### 7. Frontend — React 19.2 (Server-First)

**Architectural mandate:**
- Server Components are the **default** — use `'use client'` only when interactivity is required
- React Compiler handles memoization — no manual `useMemo`/`useCallback` unless profiling proves necessity
- Every KB of JS payload must be justified

**State strategy:**

| State Type | Solution |
|------------|----------|
| Local | `useState`, `useReducer` |
| Server / API data | TanStack Query |
| Global client | Zustand |
| Legacy complex state | Redux (last resort only) |

**Patterns:**

```javascript
// ✅ Server Component (default)
async function ProductList() {
  const products = await db.products.find();
  return <div>{products.map(p => <ProductCard key={p.id} {...p} />)}</div>;
}

// ✅ Client Component (interactive only)
'use client';
export function SearchBar() {
  const [query, setQuery] = useState('');
  return <input value={query} onChange={e => setQuery(e.target.value)} />;
}

// ✅ Server Action for mutations
async function createOrder(formData) {
  'use server';
  const order = await db.orders.create({
    userId: formData.get('userId'),
    total: formData.get('total')
  });
  revalidatePath('/orders');
  return order;
}

// ✅ Code splitting
const Dashboard = lazy(() => import('./Dashboard'));
<Suspense fallback={<LoadingSpinner />}><Dashboard /></Suspense>
```

**TypeScript — strict mode:**

```json
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

- No `any` — ever
- Discriminated unions for state variants
- All props typed explicitly
- If a third-party type returns `any`, wrap with a typed assertion and comment why

**Styling:**
- Tailwind CSS only — utility-first
- Use `cn()` for conditional classes
- No inline styles, no CSS-in-JS
- Override library defaults aggressively with Tailwind arbitrary values or CSS Grid — never accept the default aesthetic

**Design standards:**
- Asymmetry and broken-grid layouts that collapse into intentional whitespace-heavy vertical flows on mobile
- `clamp()` for all fluid type scales
- Every interactive element: entrance state, hover/active state, focus-visible state
- `transform` and `opacity` only for animation (compositor-eligible)
- Always respect `prefers-reduced-motion`:

```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

**Accessibility + aesthetic conflict:** deliver both the visual implementation and an `sr-only`/`aria-*` fallback. Always. Silently.

**Banned UI patterns (auto-reject):**
- Centered hero + gradient + single CTA
- Symmetrical 3-column card grids with default shadows
- Default Tailwind palette (`blue-500`, `gray-100`) without customization
- Hamburger as the only mobile nav
- `Inter` or `system-ui` without deliberate pairing

**Library discipline:**
- Use active library primitives (Dialog, Dropdown, Button) for logic and ARIA — never rebuild from scratch
- Override styling aggressively to strip the default look
- No redundant CSS

---

### 8. Backend — Node.js + Express

**Layered responsibility model (mandatory):**

```
Routes        → Transport only (HTTP concerns)
Controllers   → Orchestration only (request/response)
Services      → Business logic only
Models        → Persistence only (database schemas)
```

No layer absorbs the responsibility of another.

**Project structure:**

```
/src
  /routes
  /controllers
  /services
  /models
  /middleware
  /validators
  /utils          ← Pure functions only
  /config
  /types
```

**Security middleware (required on every app):**

```javascript
app.use(helmet());
app.use(express.json({ limit: '10kb' }));
app.use(mongoSanitize());
app.use(hpp());

// API rate limit
app.use('/api/', rateLimit({ windowMs: 15 * 60 * 1000, max: 100 }));

// Auth rate limit
app.use('/api/auth/login', rateLimit({ windowMs: 15 * 60 * 1000, max: 5, skipSuccessfulRequests: true }));
```

**Auth standards:**

```javascript
// JWT in HTTP-only cookies — NEVER localStorage
res.cookie('accessToken', token, {
  httpOnly: true,
  secure: true,
  sameSite: 'strict',
  maxAge: 15 * 60 * 1000
});

// bcrypt, minimum 12 rounds
await bcrypt.hash(password, 12);

// Access token: 15m | Refresh token: 7d
```

**Input validation:** always use Joi or Zod schemas via middleware before the controller is reached.

**Error handling:**

```javascript
class AppError extends Error {
  constructor(message, statusCode, isOperational = true) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = isOperational;
  }
}

const catchAsync = (fn) => (req, res, next) =>
  Promise.resolve(fn(req, res, next)).catch(next);

// Global handler: never leak stack traces in production
app.use((err, req, res, next) => {
  if (process.env.NODE_ENV === 'production' && !err.isOperational) {
    return res.status(500).json({ status: 'error', message: 'Something went wrong' });
  }
  res.status(err.statusCode || 500).json({ status: 'error', message: err.message });
});
```

**API design:**

```
GET    /api/v1/users
GET    /api/v1/users/:id
POST   /api/v1/users
PATCH  /api/v1/users/:id
DELETE /api/v1/users/:id
```

Response envelope:
```json
{ "status": "success", "data": { }, "meta": { "page": 1, "limit": 20, "total": 100 } }
{ "status": "error", "message": "User not found", "code": "USER_NOT_FOUND" }
```

---

### 9. Data — MongoDB

- Each service owns its schema. Cross-service DB access is forbidden.
- **Embed** for locality (1:1). **Reference** for volatility (many:many, unbounded arrays).
- Indexes only after query patterns are known. Compound index field order matters.
- Always project only needed fields. Use `.lean()` for read-only queries.
- `$match` first in aggregation pipelines.

---

### 10. DevOps

**Every change goes through:** lint → tests → security scan → staging verification.

**Production deploy requires:** green CI/CD, documented rollback plan, observability confirmed.

**Docker:** multi-stage builds, non-root user, `node:20-alpine`.

**Environment:** validate all required env vars on startup. Never commit `.env` files.

**Health endpoints:**
```javascript
app.get('/health', (req, res) => res.json({ status: 'ok', timestamp: Date.now() }));
app.get('/ready', async (req, res) => {
  await mongoose.connection.db.admin().ping();
  res.json({ status: 'ready' });
});
```

---

### 11. Code Quality

**ESLint rules (non-negotiable):**
- `@typescript-eslint/no-explicit-any: error`
- `no-unused-vars: error`
- `react-hooks/exhaustive-deps: error`

**Commits — Conventional Commits:**
```
feat: add user authentication
fix: resolve memory leak in WebSocket handler
perf: optimize query with compound index
```

---

## PART III — COMPLIANCE

### Pre-Merge Checklist

Every production change must satisfy:

- [ ] All inputs validated and sanitized
- [ ] Auth and authorization reviewed
- [ ] Centralized error handling implemented
- [ ] Structured logging added
- [ ] Performance impact assessed against budgets
- [ ] Security implications documented
- [ ] Tests added/updated (80% coverage)
- [ ] TypeScript strict mode compliant — zero `any`
- [ ] ESLint + Prettier passing
- [ ] No secrets in code or commits
- [ ] Banned UI patterns absent from output

### Quick Decision Table

| Situation | Action |
|-----------|--------|
| Stack unknown | Ask one question, wait |
| Architectural ambiguity | Ask one question, wait |
| Cosmetic ambiguity | Decide, note in comment, proceed |
| `DEEPDIVE` on complex task | Full protocol, one response, revert |
| `DEEPDIVE` on trivial task | Flag it, offer `DEEPDIVE confirm` |
| Accessibility vs. aesthetic conflict | Deliver both, silently |
| Banned UI pattern in own output | Rebuild before sending |
| Third-party type returns `any` | Wrap with typed assertion, comment why |
| Security vs. any other rule | Security wins, always |

---

**Any code that compromises security, hides failures, sacrifices clarity, or ignores performance budgets is not production-ready — regardless of whether it works.**