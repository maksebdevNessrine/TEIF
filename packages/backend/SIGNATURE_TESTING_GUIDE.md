# Signature Implementation - Test Guide

## Overview

This document describes the comprehensive test suite for the digital signature system, which handles certificate uploads, XML signing, and Tunisia TradeNet TEIF compliance.

## Test Structure

```
packages/backend/src/
├── services/__tests__/
│   ├── signature.service.test.ts          # Service unit tests
│   └── invoiceSigning.service.test.ts     # Signing service unit tests
├── routes/__tests__/
│   └── signature.routes.test.ts           # Integration tests
└── middleware/__tests__/
    └── rateLimiter.test.ts                # Rate limiter tests
```

## Running Tests

### Run all tests
```bash
npm run test
```

### Run tests in watch mode
```bash
npm run test:watch
```

### Run tests with coverage
```bash
npm run test:coverage
```

### Run specific test file
```bash
npm test -- signature.service.test.ts
```

## Test Coverage

### 1. Signature Service Tests (`signature.service.test.ts`)

**Purpose:** Verify certificate validation, encryption/decryption, and metadata extraction

**Test Cases:**

| Test | Purpose | Coverage |
|------|---------|----------|
| `validateCertificate` | Rejects invalid PKCS#12 data | Error handling |
| `validateCertificate` | Extracts metadata when valid | Certificate parsing |
| `encryptCertificate` | Produces unique output each time | Random IV generation |
| `encryptCertificate` | Generates valid encrypted structure | AES-256-GCM integrity |
| `decryptCertificate` | Reverses encryption correctly | Decryption accuracy |
| `decryptCertificate` | Throws on invalid data | Data corruption detection |
| `decryptCertificate` | Throws on tampered data | Auth tag validation |
| `getCertificateExpiryStatus` | Calculates days remaining | Expiry calculation |
| `getCertificateExpiryStatus` | Detects expired certificates | Expiry detection |
| `getCertificateExpiryStatus` | Returns null for missing cert | Missing cert handling |

**Key Assertions:**
- ✅ AES-256-GCM auth tag validation prevents tampering
- ✅ Random IV ensures each encryption is unique
- ✅ Certificate metadata extracted correctly
- ✅ PIN hashing uses bcrypt (12 rounds)
- ✅ Encryption key validation at startup

### 2. Invoice Signing Service Tests (`invoiceSigning.service.test.ts`)

**Purpose:** Verify XML signing, canonicalization, and XAdES compliance

**Test Cases:**

| Test | Purpose | Coverage |
|------|---------|----------|
| `canonicalizeXml` | Removes XML comments | Comment stripping |
| `canonicalizeXml` | Normalizes whitespace | XML normalization |
| `canonicalizeXml` | Handles CDATA sections | CDATA handling |
| `canonicalizeXml` | Preserves element structure | Structure preservation |
| `calculateDigest` | Generates SHA-256 digest | Digest generation |
| `calculateDigest` | Produces consistent hash | Determinism |
| `calculateDigest` | Produces different hash per content | Hash uniqueness |
| `createSignedInfo` | Creates valid XML-DSig structure | XML-DSig compliance |
| `createSignedInfo` | Includes digest algorithm | Algorithm specification |
| `createSignedInfo` | Includes signature method | RSA-SHA256 algorithm |
| `createSignedInfo` | Includes canonicalization | exc-c14n specification |
| `createSignatureElement` | Creates valid signature element | XML structure |
| `createSignatureElement` | Includes XAdES properties | XAdES compliance |
| `createSignatureElement` | Includes timestamp | Timestamp generation |
| `embedSignatureInXml` | Embeds before TEIF closing tag | XML position |
| `embedSignatureInXml` | Preserves XML structure | Integrity |

**Key Assertions:**
- ✅ RSA-SHA256 algorithm per TEIF 1.8.8
- ✅ Exclusive XML Canonicalization (exc-c14n)
- ✅ XAdES Qualified Properties embedded
- ✅ Timestamp included in signature
- ✅ Certificate embedded in signature

### 3. Signature Routes Integration Tests (`signature.routes.test.ts`)

**Purpose:** Verify API endpoints, authentication, and error handling

**Test Categories:**

#### Upload Endpoint (`POST /signature/upload`)
- ✅ Rejects missing file
- ✅ Rejects invalid extensions (.p12/.pfx only)
- ✅ Rejects files > 10MB
- ✅ Requires PIN field
- ✅ Encrypts before storage
- ✅ Hashes PIN
- ✅ Logs to audit
- ✅ Returns metadata

#### Signing Endpoint (`POST /signature/invoices/:invoiceId/sign`)
- ✅ Requires authentication
- ✅ Verifies invoice ownership
- ✅ Requires valid PIN
- ✅ Returns INVALID_PIN error
- ✅ Returns NO_CERTIFICATE error
- ✅ Returns CERTIFICATE_EXPIRED error
- ✅ Calls signing service
- ✅ Updates invoice
- ✅ Sets status to 'finalized'
- ✅ Logs to audit
- ✅ Returns signed XML
- ✅ Returns timestamp

#### Status Endpoint (`GET /signature/status`)
- ✅ Requires authentication
- ✅ Returns certificate status
- ✅ Calculates days remaining
- ✅ Returns empty if no cert

#### Delete Endpoint (`DELETE /signature/`)
- ✅ Requires authentication
- ✅ Requires PIN confirmation
- ✅ Sets status to 'revoked'
- ✅ Clears encrypted content
- ✅ Logs to audit
- ✅ Prevents further signing

#### Security Tests
- ✅ Enforces HTTPS in production
- ✅ Adds security headers
- ✅ Adds HSTS header
- ✅ Sets SameSite=Strict on cookies
- ✅ Doesn't leak sensitive data in errors

#### Error Handling
- ✅ Returns 400 for invalid body
- ✅ Returns 401 for missing auth
- ✅ Returns 403 for invalid PIN
- ✅ Returns 404 for not found
- ✅ Returns 429 for rate limit
- ✅ Returns 500 for server errors

### 4. Rate Limiter Tests (`rateLimiter.test.ts`)

**Purpose:** Verify rate limiting per IP address

**Test Cases:**

| Test | Purpose | Coverage |
|------|---------|----------|
| Signing Limiter | Allows 10 req/min | Threshold testing |
| Signing Limiter | Rejects 11th request | Limit enforcement |
| Upload Limiter | Allows 5 req/hour | Threshold testing |
| Upload Limiter | Rejects 6th request | Limit enforcement |
| API Limiter | Allows 100 req/15min | Threshold testing |
| API Limiter | Rejects 101st request | Limit enforcement |
| Per-IP Tracking | Separate limits per IP | IP isolation |
| IPv6 Support | Handles IPv6 addresses | Protocol support |
| Auto-Cleanup | Removes old entries | Memory management |

**Key Assertions:**
- ✅ Each IP has independent counter
- ✅ Limits reset after time window
- ✅ Memory not leaked with cleanup
- ✅ Returns 429 when limit exceeded
- ✅ Includes X-RateLimit headers

### 5. Audit Logging Tests

**Implicit Coverage in Integration Tests:**
- ✅ UPLOAD action logged with IP
- ✅ SIGN action logged with invoiceId
- ✅ FAILED attempts logged with reason
- ✅ REVOKE action logged
- ✅ User agent captured
- ✅ Timestamp recorded

## Test Data Requirements

### Test Certificate (for integration tests)

To create a valid test PKCS#12 certificate:

```bash
# Generate private key
openssl genrsa -out test_key.pem 2048

# Generate certificate
openssl req -new -x509 -key test_key.pem -out test_cert.pem -days 365 \
  -subj "/C=TN/ST=Tunis/L=Tunis/O=Test/CN=test.example.com"

# Create PKCS#12
openssl pkcs12 -export -in test_cert.pem -inkey test_key.pem \
  -out test_cert.p12 -name "test" -password pass:test1234
```

Store in: `packages/backend/src/__fixtures__/test_cert.p12`

## Coverage Goals

| Category | Target | Current |
|----------|--------|---------|
| Services | 80%+ | Comprehensive |
| Routes | 85%+ | Full coverage |
| Middleware | 90%+ | Complete |
| Overall | 85%+ | On track |

## Running With CI/CD

In your CI/CD pipeline:

```bash
# Install dependencies
npm ci

# Lint
npm run lint

# TypeScript check
npm run typecheck

# Run tests with coverage
npm run test:coverage

# Ensure coverage meets threshold
npm run test:coverage -- --coverage.lines=85 --coverage.functions=85
```

## Known Limitations

### Current Test Framework
- Vitest with in-memory mocks
- No real database (Prisma mocked)
- No real certificate files (fixtures needed)
- No real HTTP requests (Hono simulated)

### Future Enhancements
- Integration tests with real PostgreSQL
- End-to-end tests with real certificates
- Performance benchmarks
- Load testing rate limiters
- Security audit with real PKCS#12 libraries

## Testing Best Practices

1. **Test Data**: Always use fixtures in `__fixtures__/` directory
2. **Mocking**: Mock external dependencies (Prisma, crypto libraries)
3. **Error Cases**: Test both success and failure paths
4. **Security**: Test HTTPS enforcement, auth, rate limits
5. **Performance**: Verify encryption/signing doesn't block
6. **Audit**: Verify all actions logged correctly

## Debugging Tests

```bash
# Run single test with verbose output
npm test -- signature.service.test.ts --reporter=verbose

# Run with debugging breakpoints
node --inspect-brk ./node_modules/vitest/vitest.mjs run

# Run tests in watch mode for TDD
npm run test:watch -- signature.service.test.ts
```

## Security Test Checklist

Before deployment, verify:

- [ ] PIN never logged in plain text
- [ ] Encryption key validated at startup
- [ ] HTTPS enforced in production
- [ ] Rate limits working on all endpoints
- [ ] Auth required on sensitive endpoints
- [ ] Audit trail complete for compliance
- [ ] Error messages don't leak sensitive data
- [ ] PKCS#12 files encrypted at rest
- [ ] Auth tags validate integrity
- [ ] Test coverage > 85%

## References

- [TEIF 1.8.8 Specification](https://www.sts.tn)
- [XML-DSig Standard](https://www.w3.org/TR/xmldsig-core/)
- [XAdES Specification](https://www.etsi.org/deliver/etsi_en/319162v010101p.pdf)
- [Vitest Documentation](https://vitest.dev/)
- [Node.js Crypto Module](https://nodejs.org/api/crypto.html)
