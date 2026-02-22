# @teif/frontend

TEIF Invoice Generator - Frontend Application

React 19 + TypeScript + Vite application for creating and managing TEIF-compliant invoices.

## Quick Start

```bash
# Install dependencies (run from root)
pnpm install

# Start development server
pnpm run dev

# Build for production
pnpm run build

# Run tests
pnpm run test

# Run E2E tests
pnpm run test:e2e
```

## Project Structure

```
src/
├── main.tsx           # React entry point
├── App.tsx            # Root component
├── components/        # React components
│   ├── InvoiceForm/   # Invoice form components
│   ├── AIAssistant/   # AI assistant component
│   ├── XmlPreview/    # XML preview component
│   ├── ui/            # shadcn/ui components
│   └── lib/           # Component utilities
├── services/          # Business logic & API integration
│   ├── xmlGenerator.ts    # XML generation
│   ├── validators.ts      # Field validation (shared package)
│   ├── i18n.ts            # Internationalization
│   └── complianceChecker.ts
└── styles/            # CSS files

__tests__/             # Unit & integration tests
e2e/                   # Playwright E2E tests
```

## Features

- ✅ Multi-language support (Arabic, French, English)
- ✅ TEIF 1.8.8 compliant invoicing
- ✅ XML generation and validation
- ✅ AI-powered form assistance (Gemini API)
- ✅ Real-time field validation
- ✅ Conditional field logic
- ✅ QR code generation
- ✅ Accessibility features (WCAG 2.1)

## Configuration

### Environment Variables

Create `.env.local` in the frontend package:

```
VITE_GEMINI_API_KEY=your_gemini_api_key
```

### Component Library

This project uses `shadcn/ui` components styled with Tailwind CSS.

## Type Safety

- TypeScript in strict mode
- Types imported from `@teif/shared/types`
- No `any` types allowed

## Testing

```bash
# Unit tests
pnpm run test

# Watch mode
pnpm run test -- --watch

# Coverage
pnpm run test:coverage

# E2E tests
pnpm run test:e2e

# E2E UI mode
pnpm run test:e2e:ui
```

## Performance

- Vite development server with hot module replacement
- Code splitting via route-based lazy loading
- CSS minification and PostCSS optimization
- Lighthouse integration for performance monitoring

## Development

```bash
# Format code
pnpm run format

# Type check
pnpm run typecheck

# Build & preview
pnpm run preview
```

## Troubleshooting

### Path Resolution Issues

If imports from `@teif/shared` fail, ensure:

1. `packages/shared` is built first: `pnpm run build -F @teif/shared`
2. Vite alias is configured in `vite.config.ts`
3. TypeScript `paths` are set in `tsconfig.json`

### Port Conflicts

Default dev port is 3000. Change in `vite.config.ts`:

```typescript
server: {
  port: 3001
}
```
