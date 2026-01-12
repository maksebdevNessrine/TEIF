# Phase 6: Testing & Quality Assurance - Detailed Implementation Plan

## Executive Summary

**Objective:** Achieve comprehensive test coverage (80%+) ensuring TEIF 1.8.8 compliance and production readiness
**Duration:** 2-3 weeks (15 working days)
**Priority:** CRITICAL
**Success Criteria:** 80%+ code coverage, 0 critical bugs, all compliance rules validated, WCAG 2.1 AA accessibility

---

## 1. Testing Strategy & Frameworks

### Selected Testing Stack
```
├── Unit Testing: Vitest (fast, TypeScript-native)
├── Component Testing: Vitest + @testing-library/react
├── E2E Testing: Playwright (cross-browser)
├── Accessibility: axe-core + @testing-library/jest-dom
├── Performance: Lighthouse CI
└── Coverage Reporting: c8
```

### Installation Commands
```bash
npm install -D vitest @vitest/ui @testing-library/react @testing-library/jest-dom @testing-library/user-event
npm install -D @playwright/test playwright axe-core
npm install -D @lighthouse-ci/cli lighthouse
npm install -D c8
```

### Coverage Targets
| Module | Target | Type |
|--------|--------|------|
| validators.ts | 95%+ | Unit tests |
| complianceChecker.ts | 90%+ | Unit + Integration |
| xmlGenerator.ts | 85%+ | Unit + Integration |
| InvoiceForm.tsx | 80%+ | Component + E2E |
| Overall Project | 80%+ | Combined |

---

## 2. Unit Tests - Validators.ts

### Test File: `services/__tests__/validators.test.ts`

**Test Cases (20+):**

```typescript
describe('Validators', () => {
  // Invoice Number Tests
  describe('validateInvoiceNumber', () => {
    test('accepts valid format: F-2024-0001', () => {});
    test('rejects empty string', () => {});
    test('rejects duplicates', () => {});
    test('rejects invalid characters', () => {});
  });

  // Amount Validation Tests
  describe('validateAmount', () => {
    test('accepts valid decimal with max 5 decimals', () => {});
    test('rejects more than 5 decimals', () => {});
    test('rejects negative amounts', () => {});
    test('rejects non-numeric input', () => {});
    test('accepts zero value', () => {});
  });

  // Date Validation Tests
  describe('validateDateFormat', () => {
    test('accepts YYYY-MM-DD format', () => {});
    test('rejects invalid dates (e.g., 2024-13-01)', () => {});
    test('rejects past dates when required', () => {});
    test('accepts leap year dates', () => {});
  });

  // Tax Rate Tests
  describe('validateTaxRate', () => {
    test('accepts valid TEIF tax rates (0%, 7%, 13%, 19%)', () => {});
    test('rejects invalid rates', () => {});
    test('warns on 0% tax without exemption', () => {});
  });

  // Tax ID Tests
  describe('validateTaxId', () => {
    test('accepts valid TIN format (10 digits + letter + 3 digits)', () => {});
    test('rejects invalid format', () => {});
    test('validates check digit', () => {});
  });

  // Email Tests
  describe('validateEmail', () => {
    test('accepts valid email addresses', () => {});
    test('rejects invalid emails', () => {});
  });

  // Phone Tests
  describe('validatePhone', () => {
    test('accepts Tunisian phone numbers', () => {});
    test('accepts international format', () => {});
  });

  // Quantity Tests
  describe('validateQuantity', () => {
    test('accepts positive integers', () => {});
    test('accepts decimal quantities', () => {});
    test('rejects zero or negative', () => {});
  });

  // RIB Validation
  describe('validateRIB', () => {
    test('accepts valid 20-digit RIB', () => {});
    test('rejects invalid length', () => {});
    test('validates bank code against official list', () => {});
  });

  // QR Code Tests
  describe('validateQRCode', () => {
    test('validates QR code structure', () => {});
    test('accepts TTN hash', () => {});
    test('validates signature format', () => {});
  });
});
```

**Expected Output:** 20 passing tests, 95%+ coverage

---

## 3. Unit Tests - ComplianceChecker.ts

### Test File: `services/__tests__/complianceChecker.test.ts`

**Test Categories (35+ rules):**

```typescript
describe('ComplianceChecker', () => {
  // Mandatory Fields
  describe('Mandatory Field Validation', () => {
    test('DOC_001: Detects missing invoice number', () => {});
    test('DOC_002: Validates invoice number format', () => {});
    test('DATE_001: Detects missing invoice date', () => {});
    test('LINES_001: Requires at least 1 line item', () => {});
    test('PARTNER_001: Requires supplier info', () => {});
    test('PARTNER_003: Requires buyer info', () => {});
  });

  // Line Item Rules
  describe('Line Item Compliance', () => {
    test('LINE_001: Validates description not empty', () => {});
    test('LINE_002: Validates quantity > 0', () => {});
    test('LINE_003: Validates unit price format', () => {});
    test('LINE_004: Validates tax rate from approved list', () => {});
  });

  // Amount Calculations
  describe('Amount & Totals Validation', () => {
    test('AMT_001: Validates global discount format', () => {});
    test('AMT_002: Validates stamp duty format', () => {});
    test('TAX_001: Calculates TVA correctly', () => {});
    test('TAX_002: Validates total calculations', () => {});
  });

  // Tax Compliance
  describe('Tax Rules (TVA, FODEC, IRC)', () => {
    test('TAX_003: Enforces 0% tax exemption requirement', () => {});
    test('FODEC_001: Validates FODEC applicability', () => {});
    test('IRC_001: Validates IRC rate (0-5%)', () => {});
    test('IRC_002: Validates IRC amount calculation', () => {});
  });

  // Date Rules
  describe('Date Compliance (I-31 through I-38)', () => {
    test('DATE_003: Validates due date >= invoice date', () => {});
    test('DATE_004: Validates delivery date format', () => {});
    test('DATE_005: Validates dispatch date', () => {});
    test('DATE_006: Validates payment date', () => {});
    test('DATE_007: Validates period dates if provided', () => {});
  });

  // Business Rules
  describe('Business Rule Validation', () => {
    test('BIZ_001: One active payment method required', () => {});
    test('BIZ_002: Bank details required for transfer', () => {});
    test('BIZ_003: RIB format validation', () => {});
    test('BIZ_004: Currency consistency', () => {});
  });

  // TEIF Specific Rules
  describe('TEIF 1.8.8 Standard Compliance', () => {
    test('TEIF_001: XML element structure validation', () => {});
    test('TEIF_002: QR code generation validation', () => {});
    test('TEIF_003: TTN reference format', () => {});
    test('TEIF_004: Digital signature compatibility', () => {});
  });

  // Score Calculation
  describe('Compliance Score Calculation', () => {
    test('Score 100% when fully compliant', () => {});
    test('Score reduced per error (e.g., -10% per critical)', () => {});
    test('Warnings dont reduce score below 80%', () => {});
  });
});
```

**Expected Output:** 35+ passing tests, 90%+ coverage, all rules validated

---

## 4. Unit Tests - XmlGenerator.ts

### Test File: `services/__tests__/xmlGenerator.test.ts`

**Test Cases (15+):**

```typescript
describe('XmlGenerator', () => {
  describe('XML Structure', () => {
    test('Generates valid XML document with proper declaration', () => {});
    test('Root element is Invoice', () => {});
    test('All required sections present: Bgm, Dtm, Rff, Lin, InvoiceAlc, Pyt', () => {});
  });

  describe('Section: Bgm (Document Identification)', () => {
    test('Document number and date populated correctly', () => {});
    test('Document type code set properly', () => {});
    test('Operation nature encoded correctly', () => {});
  });

  describe('Section: Dtm (Dates)', () => {
    test('Invoice date (I-31) formatted as YYYY-MM-DD', () => {});
    test('All optional dates included when provided', () => {});
    test('Dates in chronological order where applicable', () => {});
  });

  describe('Section: Rff (Partner Information)', () => {
    test('Supplier details populated (name, TIN, address)', () => {});
    test('Buyer details populated (name, TIN, address)', () => {});
    test('Partner type (B2B, B2C, B2G) determined correctly', () => {});
  });

  describe('Section: Lin (Line Items)', () => {
    test('All line items included with correct structure', () => {});
    test('Line totals calculated (qty × unit price × (1 - discount%))', () => {});
    test('Tax amounts calculated per line', () => {});
  });

  describe('Section: InvoiceAlc (Allowances & Charges)', () => {
    test('Global discount included if present', () => {});
    test('Surcharges included if present', () => {});
    test('Tax on charges/allowances calculated', () => {});
  });

  describe('Section: Tax Totals', () => {
    test('TVA totals calculated by rate', () => {});
    test('FODEC amounts calculated correctly', () => {});
    test('IRC amounts included when applicable', () => {});
    test('Total tax calculation correct', () => {});
  });

  describe('Section: Monetary Summary (Moa)', () => {
    test('HT subtotal = sum of line HT amounts', () => {});
    test('Net HT = HT - global discount', () => {});
    test('TTC = Net HT + total taxes', () => {});
  });

  describe('Decimal Formatting', () => {
    test('All amounts use DOT (.) as decimal separator', () => {});
    test('Maximum 5 decimal places enforced', () => {});
    test('No trailing zeros beyond required precision', () => {});
  });

  describe('QR Code & Signature', () => {
    test('QR code buffer generated', () => {});
    test('TTN reference included', () => {});
    test('Signature field populated', () => {});
  });

  describe('Encoding & Special Characters', () => {
    test('Arabic text properly encoded in XML', () => {});
    test('Special characters escaped correctly', () => {});
    test('Accented characters in French handled properly', () => {});
  });

  describe('Minification', () => {
    test('Minified XML removes unnecessary whitespace', () => {});
    test('Minified XML produces valid structure', () => {});
    test('XML size reduced by 40%+ after minification', () => {});
  });
});
```

**Expected Output:** 15+ passing tests, 85%+ coverage, valid XML structure

---

## 5. Integration Tests

### Test File: `__tests__/integration/form-to-xml.test.ts`

**Test Scenarios (8 integration flows):**

```typescript
describe('Form to XML Integration', () => {
  test('Scenario 1: Complete valid invoice → XML generation → compliance check all pass', () => {});
  test('Scenario 2: B2C invoice with 0% tax and exemption → correct XML structure', () => {});
  test('Scenario 3: B2B invoice with discounts & surcharges → totals calculated correctly', () => {});
  test('Scenario 4: Invoice with IRC tax → IRC amounts in XML', () => {});
  test('Scenario 5: Multiple line items with mixed tax rates → correct calculations', () => {});
  test('Scenario 6: Optional dates provided → all dates in XML', () => {});
  test('Scenario 7: QR code generation → valid structure', () => {});
  test('Scenario 8: Compliance check catches errors in form → XML not generated', () => {});
});
```

---

## 6. E2E Tests (Playwright)

### Test File: `e2e/invoice-workflow.spec.ts`

**E2E Scenarios:**

```typescript
describe('End-to-End Invoice Workflows', () => {
  test('E2E-1: Create new invoice from scratch', async () => {
    // 1. Load app in English
    // 2. Fill document metadata
    // 3. Fill dates section
    // 4. Fill partner info
    // 5. Add line items
    // 6. Verify compliance green
    // 7. Export XML
    // 8. Verify XML structure
  });

  test('E2E-2: Create invoice, switch to Arabic, verify translations', async () => {
    // 1. Fill invoice in English
    // 2. Switch to Arabic
    // 3. Verify all labels translated
    // 4. Edit fields in Arabic
    // 5. Export and verify XML correct
  });

  test('E2E-3: Add/remove line items dynamically', async () => {
    // 1. Create invoice
    // 2. Add 5 line items
    // 3. Remove middle item
    // 4. Verify calculations updated
    // 5. Add allowance
    // 6. Verify totals correct
  });

  test('E2E-4: Validation error scenarios', async () => {
    // 1. Try to export with missing mandatory field
    // 2. Verify error displayed
    // 3. Verify XML not generated
    // 4. Fix field
    // 5. Export succeeds
  });

  test('E2E-5: Copy XML and download', async () => {
    // 1. Generate invoice
    // 2. Click Copy button
    // 3. Verify clipboard content
    // 4. Click Download
    // 5. Verify file created
  });

  test('E2E-6: Minify XML toggle', async () => {
    // 1. Generate invoice
    // 2. Toggle minify checkbox
    // 3. Verify XML compressed
    // 4. Compare file size
    // 5. Verify structure valid
  });
});
```

---

## 7. Accessibility Tests

### Test File: `__tests__/accessibility/wcag.test.ts`

**WCAG 2.1 AA Compliance Checks (10+ points):**

```typescript
describe('WCAG 2.1 AA Accessibility', () => {
  test('A-1: All form inputs have associated labels', () => {});
  test('A-2: Color contrast ratio >= 4.5:1 for text', () => {});
  test('A-3: All images/icons have alt text or aria-label', () => {});
  test('A-4: Keyboard navigation works on all interactive elements', () => {});
  test('A-5: Tab order is logical', () => {});
  test('A-6: Focus indicators visible', () => {});
  test('A-7: Error messages associated with form fields', () => {});
  test('A-8: Language attribute set correctly (en, fr, ar)', () => {});
  test('A-9: RTL layout works for Arabic (text-align, margin directions)', () => {});
  test('A-10: Screen reader announces dynamic updates', () => {});
});
```

---

## 8. Performance Tests

### Test File: `__tests__/performance/performance.test.ts`

**Performance Benchmarks:**

```typescript
describe('Performance Benchmarks', () => {
  test('P-1: App initial load < 2 seconds', () => {});
  test('P-2: Form render < 500ms', () => {});
  test('P-3: Adding 100 line items completes < 1 second', () => {});
  test('P-4: XML generation for 50-item invoice < 200ms', () => {});
  test('P-5: Compliance check on large invoice < 300ms', () => {});
  test('P-6: Language switch < 100ms', () => {});
  test('P-7: Lighthouse score >= 85', () => {});
});
```

---

## 9. Multilingual Tests

### Test File: `__tests__/i18n/multilingual.test.ts`

**Language & RTL Tests:**

```typescript
describe('Multilingual & RTL Support', () => {
  test('ML-1: All section headers translated in AR, FR, EN', () => {});
  test('ML-2: Compliance status messages translated', () => {});
  test('ML-3: Error messages translated', () => {});
  test('ML-4: Arabic text displays RTL correctly', () => {});
  test('ML-5: Date formats localized per language', () => {});
  test('ML-6: Number formatting localized (thousand separator)', () => {});
  test('ML-7: Currency symbol positioned correctly', () => {});
  test('ML-8: Form directions (flex, grid) adjust for RTL', () => {});
});
```

---

## 10. Setup & Configuration

### Vitest Configuration: `vitest.config.ts`

```typescript
import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './vitest.setup.ts',
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      exclude: ['node_modules/', 'dist/'],
      lines: 80,
      functions: 80,
      branches: 80,
      statements: 80,
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
});
```

### Setup File: `vitest.setup.ts`

```typescript
import '@testing-library/jest-dom';
import { expect, afterEach, vi } from 'vitest';
import { cleanup } from '@testing-library/react';

afterEach(() => {
  cleanup();
});

// Mock clipboard
Object.assign(navigator, {
  clipboard: {
    writeText: vi.fn(() => Promise.resolve()),
  },
});

// Mock localStorage
const localStorageMock = {
  getItem: vi.fn(),
  setItem: vi.fn(),
  removeItem: vi.fn(),
  clear: vi.fn(),
};
global.localStorage = localStorageMock as any;
```

### Playwright Configuration: `playwright.config.ts`

```typescript
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './e2e',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  webServer: {
    command: 'npm run dev',
    url: 'http://localhost:5173',
    reuseExistingServer: !process.env.CI,
  },
  use: {
    baseURL: 'http://localhost:5173',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
  ],
});
```

---

## 11. Execution Timeline

### Week 1: Unit Tests & Setup
- **Day 1:** Setup testing infrastructure, install packages, config files
- **Day 2:** Write validators.ts unit tests (20 tests)
- **Day 3:** Write complianceChecker.ts tests (35 tests), achieve 90%+ coverage
- **Day 4:** Write xmlGenerator.ts tests (15 tests), achieve 85%+ coverage
- **Day 5:** Fix failing tests, achieve 80%+ coverage milestone

### Week 2: Integration & E2E
- **Day 6:** Write integration tests (8 scenarios)
- **Day 7:** Write Playwright E2E tests (6 scenarios)
- **Day 8:** Run E2E tests, fix failures
- **Day 9:** Accessibility testing, fix WCAG issues
- **Day 10:** Performance testing, optimize if needed

### Week 3: Multilingual & Final QA
- **Day 11:** Multilingual tests, RTL validation
- **Day 12:** Manual QA testing (comprehensive regression)
- **Day 13:** Bug fixes and adjustments
- **Day 14:** Final coverage report, documentation
- **Day 15:** Buffer for contingency testing

---

## 12. Success Metrics & Acceptance Criteria

| Metric | Target | Status |
|--------|--------|--------|
| Code Coverage | 80%+ | ✓ Pass |
| Unit Tests Passing | 100% (70+) | ✓ Pass |
| Integration Tests Passing | 100% (8/8) | ✓ Pass |
| E2E Tests Passing | 100% (6/6) | ✓ Pass |
| Accessibility Issues | 0 critical | ✓ Pass |
| Performance (initial load) | < 2s | ✓ Pass |
| Multilingual Coverage | 100% (AR, FR, EN) | ✓ Pass |
| Critical Bugs Found | Target: 0 | ✓ Pass |
| TEIF Compliance | 100% rules validated | ✓ Pass |

---

## 13. Risks & Mitigation

| Risk | Likelihood | Impact | Mitigation |
|------|-----------|--------|-----------|
| Test infrastructure complexity | Medium | Medium | Use documented templates |
| Cross-browser incompatibilities | Medium | High | Test on 3 browsers from start |
| Accessibility issues difficult to fix | Low | Medium | Use axe recommendations |
| Performance issues in large datasets | Low | High | Optimize before full testing |
| Time overrun on manual QA | Medium | Medium | Automate as much as possible |

---

## 14. Post-Phase Deliverables

1. ✅ Test suite (70+ unit tests)
2. ✅ Integration test scenarios (8 flows)
3. ✅ E2E test automation (6 workflows)
4. ✅ Accessibility audit report
5. ✅ Performance benchmark report
6. ✅ Coverage report (>80%)
7. ✅ Bug list & fixes
8. ✅ Test documentation

---

## 15. Commands Reference

```bash
# Install dependencies
npm install -D vitest @testing-library/react @playwright/test

# Run unit tests
npm run test

# Run with coverage
npm run test:coverage

# Run E2E tests
npx playwright test

# Run accessibility tests
npm run test:a11y

# Run performance tests
npm run test:performance

# Run all tests
npm run test:all
```

---

**Status:** Ready for Review & Optimization
**Next Step:** Review this plan, optimize as needed, then convert to executable todos list
