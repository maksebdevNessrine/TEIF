# PDF Generation API Documentation

## Overview

The TEIF invoice system includes a built-in PDF generation engine using Puppeteer and Supabase Storage. Invoices are rendered to professional PDF format with support for multiple languages (French, English, Arabic with RTL support) and intelligent caching for performance optimization.

## Architecture

### Components

- **Puppeteer**: Headless Chrome for HTML-to-PDF conversion with full CSS/JavaScript support
- **Supabase Storage**: Cloud storage for PDF caching to reduce regeneration overhead
- **Template Engine**: HTML/CSS templates with multi-language support
- **QR Code**: Embedded QR codes containing invoice metadata for verification

### Flow Diagram

```
Client Request (GET /api/invoices/:id/pdf)
    ↓
Authentication Middleware
    ↓
PDF Service
    ├─→ Check Supabase Storage Cache
    │   ├─→ Cache Hit: Return PDF from storage
    │   └─→ Cache Miss: Continue to generation
    ├─→ Fetch Invoice Data
    ├─→ Generate QR Code
    ├─→ Render HTML Template
    ├─→ Puppeteer PDF Generation
    ├─→ Upload to Storage
    └─→ Return PDF to Client
```

## API Endpoint

### GET /api/invoices/:id/pdf

Generate and download an invoice PDF with optional caching.

#### Request

```http
GET /api/invoices/{invoiceId}/pdf?language=fr HTTP/1.1
Authorization: Bearer {accessToken}
```

#### URL Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `id` | string | Yes | Invoice ID (UUID) |

#### Query Parameters

| Parameter | Type | Values | Default | Description |
|-----------|------|--------|---------|-------------|
| `language` | string | `fr`, `en`, `ar` | `fr` | PDF language and locale |

#### Response Headers

| Header | Value | Description |
|--------|-------|-------------|
| `Content-Type` | `application/pdf` | PDF binary content |
| `Content-Disposition` | `inline; filename="invoice-{id}.pdf"` | Download filename suggestion |
| `X-PDF-Cache` | `hit` \| `miss` | Cache status indicator |

#### Response Body

Binary PDF file (A4 format, 210mm × 297mm)

#### Status Codes

| Code | Description |
|------|-------------|
| `200` | PDF generated or retrieved from cache |
| `400` | Invalid language parameter |
| `401` | Missing or invalid authentication token |
| `404` | Invoice not found |
| `500` | PDF generation failed |
| `504` | PDF generation timeout (>30 seconds) |

### Examples

#### Basic Request (Default French)

```bash
curl -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIs..." \
  "http://localhost:3000/api/invoices/abc-123/pdf" \
  --output invoice.pdf
```

#### English PDF

```bash
curl -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIs..." \
  "http://localhost:3000/api/invoices/abc-123/pdf?language=en" \
  --output invoice.pdf
```

#### Arabic PDF (RTL)

```bash
curl -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIs..." \
  "http://localhost:3000/api/invoices/abc-123/pdf?language=ar" \
  --output invoice.pdf
```

#### Check Cache Status

```bash
curl -i -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIs..." \
  "http://localhost:3000/api/invoices/abc-123/pdf" | grep X-PDF-Cache
```

Response header indicates: `X-PDF-Cache: hit` or `X-PDF-Cache: miss`

## Supported Languages

### French (fr)

- **Default**: Yes
- **Layout**: LTR (Left-to-Right)
- **Locale**: fr_FR
- **Supported Labels**: All invoice fields with professional French terminology

**Example:**
```
Facture #INV-2024-001
Fournisseur: [Supplier Name]
Total TTC: 1 234,567 TND
```

### English (en)

- **Default**: No
- **Layout**: LTR (Left-to-Right)
- **Locale**: en_US
- **Supported Labels**: All invoice fields in English

**Example:**
```
Invoice #INV-2024-001
Supplier: [Supplier Name]
Total: 1,234.567 TND
```

### Arabic (ar)

- **Default**: No
- **Layout**: RTL (Right-to-Left)
- **Locale**: ar_SA
- **Supported Labels**: All invoice fields in Modern Standard Arabic
- **Special Features**: RTL text direction, Arabic numerals, date formatting

**Example:**
```
فاتورة #INV-2024-001
المورد: [Supplier Name]
الإجمالي الكلي: 1 234,567 TND
```

## PDF Template

### Included Sections

#### Header
- Document type and number (large, prominent)
- Invoice date with locale-specific formatting
- QR code (top-right, RTL-adjusted for Arabic)

#### Partner Information
- **Supplier (Left Block)**:
  - Name, ID type/value, registration number
  - Address (street, postal code, city, country)
  - Contact details (phone, email)

- **Buyer (Right Block)**:
  - Same fields as supplier

#### References
- Order reference (if applicable)
- Contract reference (if applicable)
- Delivery note reference (if applicable)

#### Line Items Table
- **Columns**: Item Code, Description, Quantity, Unit, Unit Price, Discount %, Tax Rate, FODEC, Line Total
- **Features**:
  - Alternating row colors for readability
  - Right-aligned numbers for proper formatting
  - LTR (Left-to-Right) for numbers even in RTL documents
  - Tax rate variations per line

#### Allowances/Charges
- Separate section for global invoice-level discounts/surcharges
- Each row shows: Description and Amount (with +/- indicator)

#### Financial Summary
- **Total HT**: Subtotal (excluding taxes)
- **Tax Breakdown**: By tax rate (7%, 13%, 19%, etc.)
- **FODEC**: Additional consumption tax (if applicable)
- **Stamp Duty**: Administrative tax (if applicable)
- **IRC Withholding**: Withholding tax (if applicable)
- **Total TTC**: Grand total (bold, large font, highlighted)

#### Amount in Words
- Text representation of total amount in selected language
- French example: "ARRÊTÉ LA PRÉSENTE FACTURE À LA SOMME DE : Mille Deux Cent Trente-Quatre DINARS TUNISIENS"
- Uppercase formatting for legal compliance

#### Payment Details
Conditional rendering based on payment method:

**Bank Transfer (I-114)**
- Bank name
- Bank code
- RIB (Relevé d'Identité Bancaire)
- Account owner name

**Postal (I-115)**
- Account number
- Account owner
- Branch code
- Service name

**Cash (I-116)**
- Simple label only

**Check (I-117)**
- Check number
- Expected clearing date

**Card (I-118)**
- Card type (Visa, Mastercard, etc.)
- Last 4 digits
- Transaction reference

**E-Payment (I-119)**
- Payment gateway name
- Transaction ID
- Merchant reference

**Other (I-120)**
- Custom description
- Reference number

#### Footer
- Generation timestamp
- Page numbering (if multi-page)
- TTN branding/compliance notice

### Styling Features

- **Professional Layout**: 
  - A4 page size with 20mm top/bottom margins, 15mm left/right
  - Print-optimized colors and spacing

- **Typography**:
  - Arial font for cross-platform consistency
  - Readable font sizes (10-12pt for body, 24pt for title)
  - Font weight variations for hierarchy

- **Borders & Spacing**:
  - Professional grid borders
  - Adequate whitespace for readability
  - Alternating row shading in tables

- **Language Support**:
  - RTL (Right-to-Left) layout for Arabic
  - Proper text direction for mixed content
  - Locale-specific number and date formatting

- **Print Optimization**:
  - Print-friendly colors (black text, minimal backgrounds)
  - No unnecessary gradients or images
  - Optimized for both screen and print media

## QR Code

### Format

Each PDF includes an encoded QR code in the header containing:

```
invoiceId | documentNumber | invoiceDate | totalTTC
```

**Example:**
```
f47ac10b-58cc-4372-a567-0e02b2c3d479|INV-2024-001|2024-01-15|5000.000
```

### Usage

Scan with any QR code reader to verify invoice details:
- Confirms invoice authenticity
- Quick access to invoice metadata
- Useful for mobile verification

### Specifications

- **Type**: QR Code (2D barcode)
- **Error Correction**: Level H (30% damage tolerance)
- **Size**: 200×200 pixels
- **Position**: Top-right corner (auto-adjusted for RTL)

## Caching Strategy

### Cache Structure

PDFs are stored in Supabase Storage with the following path structure:

```
invoices/{userId}/{invoiceId}/{language}.pdf
```

**Example Path:**
```
invoices/user-123/inv-abc/fr.pdf
invoices/user-123/inv-abc/en.pdf
invoices/user-123/inv-abc/ar.pdf
```

### Cache Behavior

1. **Cache Check**:
   - On GET request, PDF service checks if cached variant exists
   - If exists and invoice not modified → Return from cache (fast)
   - If missing or outdated → Generate new PDF

2. **Cache Hit**:
   - Response header: `X-PDF-Cache: hit`
   - Latency: ~100-500ms (storage download)
   - No Puppeteer rendering overhead

3. **Cache Miss**:
   - Response header: `X-PDF-Cache: miss`
   - Latency: ~2-5 seconds (full generation)
   - PDF automatically uploaded to cache for future requests

### Cache Invalidation

Cache is automatically invalidated when:

- Invoice is updated (PUT /api/invoices/:id)
- All language variants deleted from storage
- Manual invalidation endpoint called (if exposed)

**Manual Invalidation:**
```bash
curl -X DELETE \
  -H "Authorization: Bearer {token}" \
  "http://localhost:3000/api/invoices/abc-123/pdf-cache"
```

### Bypass Cache

To force regeneration (bypass cache):

```bash
curl "http://localhost:3000/api/invoices/abc-123/pdf?bypassCache=true"
```

Note: Currently not exposed in public API for security. Contact system administrator for cache purging.

## Performance Characteristics

### Benchmarks

| Scenario | Time | Notes |
|----------|------|-------|
| **Cache Hit** | 100-500ms | Storage download + network latency |
| **First Generation** | 2-5 seconds | Full rendering with Puppeteer |
| **Typical Average** | 1-2 seconds | Mix of hits/misses in steady state |
| **Complex Invoice** | 3-8 seconds | Many line items, allowances, multi-language |
| **Timeout** | 30 seconds | Maximum PDF generation time |

### Optimization Strategies

1. **Puppeteer Pooling**: Browser instance reused across requests (not relaunched)
2. **Page Caching**: Page objects cached in pool for rapid content rendering
3. **Parallel Processing**: Multiple PDF generation requests handled concurrently
4. **Storage Caching**: Generated PDFs cached to eliminate future rendering

### Monitoring

Check service health and performance:

```bash
# Get pool statistics
curl -H "Authorization: Bearer {token}" \
  "http://localhost:3000/api/pdf/stats"

# Response example:
{
  "puppeteer": {
    "available": 3,
    "max": 5,
    "isHealthy": true
  }
}
```

## Error Handling

### Common Errors & Solutions

#### 404 Not Found
**Cause**: Invoice ID doesn't exist or has been deleted

**Solution**:
- Verify invoice ID is correct
- Check invoice hasn't been soft-deleted
- Confirm user has permission to access invoice

#### 400 Bad Request: Invalid language parameter
**Cause**: Language query param not one of: `fr`, `en`, `ar`

**Solution**:
- Use valid language code
- Default to `fr` if unsure

#### 500 Internal Server Error: Failed to generate PDF
**Causes**: 
- Puppeteer browser crash
- Missing invoice data
- Template rendering error
- Server resource exhaustion

**Solutions**:
- Check server logs for detailed error
- Verify invoice has all required fields
- Ensure server has sufficient memory (Puppeteer intensive)
- Check Supabase Storage connectivity

#### 504 Gateway Timeout: PDF generation timeout
**Cause**: PDF generation exceeded 30-second timeout

**Causes**:
- Very complex invoice (thousands of line items)
- Server under heavy load
- Puppeteer browser unresponsive

**Solutions**:
- Simplify invoice (remove unnecessary items)
- Retry request during off-peak hours
- Contact system administrator if persistent

## Environment Configuration

Required environment variables in `.env`:

```bash
# Supabase Configuration
SUPABASE_URL="https://your-project.supabase.co"
SUPABASE_SERVICE_ROLE_KEY="your-service-role-key"
SUPABASE_STORAGE_BUCKET="invoice-pdfs"

# Puppeteer Configuration (optional, uses defaults)
# PUPPETEER_TIMEOUT=30000 # Timeout in ms
# PUPPETEER_MAX_CONCURRENT_PAGES=5
```

### Supabase Setup

1. **Get Service Role Key**:
   - Log in to Supabase dashboard
   - Navigate to Project Settings → API
   - Copy "Service Role" key (marked "NEVER share this publicly")

2. **Create Storage Bucket**:
   ```sql
   -- SQL from Supabase dashboard
   INSERT INTO storage.buckets (id, name, public)
   VALUES ('invoice-pdfs', 'invoice-pdfs', false);
   ```

3. **Configure Bucket Policies** (optional, for direct access):
   ```sql
   CREATE POLICY "Enable invoice-pdfs access"
   ON storage.objects
   FOR SELECT
   USING (bucket_id = 'invoice-pdfs');
   ```

## Client Integration

### Frontend Example (JavaScript)

```javascript
// Fetch and download PDF
async function downloadInvoicePdf(invoiceId, language = 'fr') {
  const token = localStorage.getItem('authToken');
  
  const response = await fetch(
    `/api/invoices/${invoiceId}/pdf?language=${language}`,
    {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    }
  );

  if (!response.ok) {
    throw new Error(`PDF generation failed: ${response.statusText}`);
  }

  // Get cache status from header
  const cacheStatus = response.headers.get('X-PDF-Cache');
  console.log(`PDF cache status: ${cacheStatus}`);

  // Download PDF
  const blob = await response.blob();
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `invoice-${invoiceId}.pdf`;
  a.click();
  window.URL.revokeObjectURL(url);
}

// Usage
downloadInvoicePdf('abc-123', 'fr')
  .catch(error => console.error('Error:', error));
```

### Frontend Example (React)

```jsx
import { useState } from 'react';

export function InvoicePdfDownloader({ invoiceId }) {
  const [loading, setLoading] = useState(false);
  const [language, setLanguage] = useState('fr');

  const handleDownload = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('authToken');
      const response = await fetch(
        `/api/invoices/${invoiceId}/pdf?language=${language}`,
        { headers: { 'Authorization': `Bearer ${token}` } }
      );
      
      if (!response.ok) throw new Error('PDF generation failed');
      
      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `invoice-${invoiceId}.pdf`;
      a.click();
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to download PDF');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <select value={language} onChange={(e) => setLanguage(e.target.value)}>
        <option value="fr">Français</option>
        <option value="en">English</option>
        <option value="ar">العربية</option>
      </select>
      <button onClick={handleDownload} disabled={loading}>
        {loading ? 'Generating...' : 'Download PDF'}
      </button>
    </div>
  );
}
```

## Testing Checklist

- [ ] PDF generates for invoice with all fields populated
- [ ] PDF generates for invoice with minimal fields
- [ ] QR code is readable and contains correct data
- [ ] Multi-language support works (FR, EN, AR with RTL)
- [ ] All payment method details render correctly
- [ ] Line items table handles many rows (pagination)
- [ ] Allowances/charges display correctly
- [ ] Tax breakdown is accurate
- [ ] Amount in words matches total
- [ ] Cache hit/miss logic works correctly
- [ ] Cache invalidation on invoice update
- [ ] PDF downloads with correct filename
- [ ] Error handling for missing invoice (404)
- [ ] Error handling for Puppeteer failures (500)
- [ ] Performance acceptable (<5s for typical invoice)
- [ ] Concurrent PDF generation requests handled properly
- [ ] RTL (Arabic) layout renders correctly
- [ ] Storage bucket credentials configured
- [ ] PDF size reasonable (typically 50-200KB)

## Troubleshooting

### PDF Generation Fails with "Browser disconnected"

**Cause**: Puppeteer browser crashed

**Solution**:
```bash
# Restart server
npm run dev

# Or manually restart if using process manager
pm2 restart backend
```

### PDFs not caching in Storage

**Cause**: Supabase Storage bucket not created or credentials invalid

**Solution**:
- Verify `SUPABASE_SERVICE_ROLE_KEY` in `.env`
- Verify `SUPABASE_STORAGE_BUCKET` bucket exists in Supabase dashboard
- Check storage bucket is private (not public) for security
- Verify IAM policies allow service role access

### Arabic Text Renders Left-to-Right (Not RTL)

**Cause**: Browser/PDF renderer not respecting dir="rtl" attribute

**Solution**:
- Ensure language parameter is `ar`
- Verify template includes `dir="rtl"` on html element
- Update Puppeteer to latest version
- Check CSS has `direction: rtl; text-align: right;` on body

### PDF Generation Timeout (30+ seconds)

**Cause**: Invoice has too many line items or server under load

**Solution**:
- Simplify invoice (split across multiple invoices if needed)
- Increase `PUPPETEER_TIMEOUT` env var
- Scale up server resources
- Reduce concurrent requests during peak hours

## Support & Maintenance

For issues or feature requests:

1. Check logs: `tail -f logs/backend.log | grep PDF`
2. Monitor pool stats: GET `/api/pdf/stats`
3. Contact system administrator with error message and invoice ID

## Version History

### v1.0.0 (Current)
- Initial PDF generation implementation
- Puppeteer integration with page pooling
- Supabase Storage caching
- Multi-language support (FR, EN, AR)
- QR code generation
- Professional invoice template
- Full TEIF compliance fields

---

**Last Updated**: January 2025  
**Maintainer**: System Engineering Team
