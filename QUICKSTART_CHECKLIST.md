# Quick-Start Execution Checklist
**Start Here - Copy/paste commands directly**

---

## ⚡ PHASE 1: Install & Setup (30 minutes)

### Step 1: Navigate to project
```powershell
cd c:\Users\Makseb-DEV-05\Downloads\TEIF-main
```

### Step 2: Initialize shadcn/ui
```powershell
npx shadcn-ui@latest init -d
```
✅ When prompted for questions:
- TypeScript? → **Yes**
- Style? → **Default**  
- Base color? → **Slate**
- Custom tsconfig? → **No**

### Step 3: Install additional dependencies
```powershell
npm install --save framer-motion magicui
npm install --save-dev @types/framer-motion
```

### Step 4: Verify installation
```powershell
npm ls framer-motion magicui
npm run build
```

---

## 🎨 PHASE 2: Add shadcn/ui Components (15 minutes)

Run each command in sequence:

```powershell
npx shadcn-ui@latest add button
npx shadcn-ui@latest add input
npx shadcn-ui@latest add label
npx shadcn-ui@latest add select
npx shadcn-ui@latest add card
npx shadcn-ui@latest add badge
npx shadcn-ui@latest add dropdown-menu
```

✅ Check: `/src/components/ui/` folder should have 7 files

---

## 🎯 PHASE 3: Update Configuration Files (20 minutes)

### File 1: tailwind.config.ts
**Replace entire file:** `c:\Users\Makseb-DEV-05\Downloads\TEIF-main\tailwind.config.ts`

```typescript
import type { Config } from 'tailwindcss'

const config: Config = {
  darkMode: ['class'],
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        emerald: {
          50: '#F0FDF4',
          100: '#DCFCE7',
          200: '#BBFBEE',
          300: '#99F6E4',
          400: '#6EE7B7',
          500: '#10B981',
          600: '#059669',
          700: '#047857',
          800: '#065F46',
          900: '#064E3B',
        },
      },
      boxShadow: {
        'emerald-glow': '0 0 20px rgb(16 185 129 / 0.5)',
        'emerald-glow-lg': '0 0 30px rgb(16 185 129 / 0.6)',
      },
    },
  },
  plugins: [],
}

export default config
```

### File 2: src/index.css or src/globals.css
**Replace entire file content:**

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    color-scheme: dark;
  }

  html {
    @apply dark;
  }

  body {
    @apply bg-slate-950 text-slate-50 antialiased;
  }

  * {
    @apply transition-colors duration-200;
  }

  :focus-visible {
    @apply outline-none;
  }
}

@layer components {
  .focus-emerald {
    @apply focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 focus:ring-offset-slate-950;
  }

  .focus-emerald-subtle {
    @apply focus:outline-none focus:ring-1 focus:ring-emerald-500/50;
  }
}
```

### File 3: Customize src/components/ui/button.tsx
**Full replacement needed - copy from IMPLEMENTATION_GUIDE_SHADCN_MAGICUI.md Task 3.2**

---

## 📦 PHASE 4: Create Custom Components (20 minutes)

### Create folder structure
```powershell
mkdir -p src/components/form
```

### Create 4 files in /src/components/form/:

**1. FormInput.tsx** (copy from guide Task 4.1)
**2. FormSelect.tsx** (copy from guide Task 4.2)
**3. StepIndicator.tsx** (copy from guide Task 4.3)
**4. FormSection.tsx** (copy from guide Task 4.4)
**5. index.ts** (copy from guide Task 4.5)

---

## ✅ PHASE 5: Quick Verification

```powershell
npm run build
```

Expected result:
```
✓ built in 2.5s
```

If errors, check:
1. TypeScript syntax in new files
2. Import paths in components
3. tailwind.config.ts format

---

## 🚀 Next: Start Migrating Components

Once above phases complete:

1. Update `src/components/InvoiceForm.tsx` imports (see PHASE 5.1 in guide)
2. Replace Section 01 HTML (see PHASE 5.2)
3. Repeat for Sections 02-06
4. Test in browser: `npm run dev`

---

## 🆘 Common Issues & Fixes

### Issue: "Cannot find module '@radix-ui/react-label'"
```powershell
npm install @radix-ui/react-label
```

### Issue: Tailwind not applying dark mode
**Check:** Is `html` tag in DOM? Check browser DevTools → Elements → `<html class="dark">`
- If not present: Restart dev server `npm run dev`

### Issue: Button colors not showing emerald
```powershell
rm -rf node_modules/.cache
npm run build
```

### Issue: "MagicUI components not found"
```powershell
npm install magicui @types/node
```

---

## 📋 Deliverables After Completion

- ✅ `src/components/form/` with 5 files
- ✅ Updated `src/components/ui/button.tsx`
- ✅ Updated `tailwind.config.ts`
- ✅ Updated `src/index.css`
- ✅ Updated `src/components/InvoiceForm.tsx` (sections 01-06)
- ✅ No compile errors: `npm run build`
- ✅ Dark theme active in browser
- ✅ Emerald color scheme visible

---

## Commands Cheatsheet (Copy & Paste)

```powershell
# Full setup from scratch
cd c:\Users\Makseb-DEV-05\Downloads\TEIF-main
npx shadcn-ui@latest init -d
npm install --save framer-motion magicui
npx shadcn-ui@latest add button input label select card badge dropdown-menu
npm run build
npm run dev
```

Open `http://localhost:5173` and verify dark background + emerald accents

---

## Progress Tracking

Mark complete as you go:

- [ ] Phase 1: Dependencies installed
- [ ] Phase 2: shadcn/ui components added
- [ ] Phase 3: Config files updated
- [ ] Phase 4: Custom components created
- [ ] Phase 5: InvoiceForm sections migrated (01-06)
- [ ] Phase 6: MagicUI enhancements applied
- [ ] Phase 7: Testing completed
- [ ] Phase 8: Documentation updated

**Estimated total time: 8 hours**

