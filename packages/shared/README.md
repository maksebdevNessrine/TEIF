# @teif/shared

Shared types, validation schemas, and utilities for the TEIF invoice generator across all packages.

## Installation

This package is automatically installed when using the monorepo. It's available to `frontend` and `backend` packages via workspace dependencies.

## Exports

### Types (`@teif/shared/types`)

Core TypeScript type definitions:

- **Language**: `'ar' | 'fr' | 'en'` - Supported languages
- **IdType**: `'I-01' | 'I-02' | 'I-03' | 'I-04'` - Identifier types
- **DocTypeCode**: Document type codes (I-11 through I-16)
- **PaymentMeansCode**: Payment method codes (I-114 through I-120)
- **Partner**: Supplier/buyer information
- **InvoiceLine**: Individual invoice line items
- **InvoiceData**: Complete invoice structure

### Validation (`@teif/shared/validation`)

Validation functions for invoice fields:

- `validateRib()` - Tunisian bank account validation
- `validateSiren()` - French business identifier validation
- `validateTaxId()` - Tax ID validation
- `validateDateFormat()` - YYYY-MM-DD format validation
- `validateEmail()` - Email address validation
- `validateAmount()` - Amount validation with decimal precision
- `validatePartner()` - Bulk partner validation

### Utils (`@teif/shared/utils`)

Common utility functions:

- **Date utilities**: `formatDateToISO()`, `formatDateForDisplay()`, `getTodayISO()`, etc.
- **Amount utilities**: `formatAmount()`, `calculateLineAmount()`, `calculateTaxAmount()`
- **String utilities**: `isEmpty()`, `normalizeString()`, `isEqual()`
- **Object utilities**: `generateId()`, `deepClone()`

#### Invoice Utilities (`@teif/shared/utils/invoice`)

TEIF-specific invoice processing utilities used by frontend and backend:

- **`formatTtnDate(dateStr: string)`** - Converts YYYY-MM-DD to ddMMyy format for TEIF XML
  ```typescript
  formatTtnDate('2024-01-15') // Returns '150124'
  ```

- **`generateQrString(data, totalTtc, totalTva): string`** - Generates QR code content
  ```typescript
  const qrString = generateQrString(invoiceData, 1230.456, 230.456);
  // Returns: '1234567|INV-001|20240115|1230.456|230.456'
  ```

- **`numberToLettersFr(total: number): string`** - Converts amounts to French words (Tunisian Dinars)
  ```typescript
  numberToLettersFr(1234.567);
  // Returns: 'ARRÊTÉ LA PRÉSENTE FACTURE À LA SOMME DE : MILLE DEUX CENT TRENTE-QUATRE DINARS ET CINQ CENT SOIXANTE-SEPT MILLIMES'
  ```

- **`validateRib(rib: string): boolean`** - Validates Tunisian RIB (20-digit bank account) using MOD 97 checksum
  ```typescript
  validateRib('12345678901234567890') // Validates checksum
  ```

## Usage

```typescript
// Import types
import { InvoiceData, Partner, Language } from '@teif/shared/types';

// Import validation
import { validateEmail, validateAmount } from '@teif/shared/validation';

// Import utilities
import { formatAmount, calculateTaxAmount } from '@teif/shared/utils';

// Import TEIF-specific invoice utilities
import { formatTtnDate, generateQrString, numberToLettersFr, validateRib } from '@teif/shared/utils/invoice';

// Or import everything
import { InvoiceData, validateEmail, formatAmount, formatTtnDate } from '@teif/shared';
pnpm run typecheck

# All packages reference shared
pnpm run build
```
