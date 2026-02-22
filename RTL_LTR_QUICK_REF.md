# RTL/LTR Quick Reference Guide

## For Developers: How to Use RTL Utilities

### Import the RTL utility
```typescript
import { getTextAlignClass, getFlexDirectionClass, isRTL } from '@/utils/rtl';
import { useLanguage } from '@/contexts/LanguageContext';

export function MyComponent() {
  const { language } = useLanguage();
```

### Common Use Cases

#### 1. Text Alignment
```typescript
// Text that should be right-aligned for Arabic
<div className={getTextAlignClass(language, 'text-right', 'text-left')}>
  {label}
</div>

// Shorthand: RTL default is 'text-right', LTR default is 'text-left'
<div className={getTextAlignClass(language)}>
  {label}
</div>
```

#### 2. Flex Direction
```typescript
// Row that should reverse for Arabic
<div className={`flex ${getFlexDirectionClass(language)}`}>
  <div>Item 1</div>
  <div>Item 2</div>
</div>

// In Arabic: Item 2 appears first (reversed)
// In English: Item 1 appears first (normal)
```

#### 3. Spacing Direction
```typescript
// Border that switches sides
const borderDir = getSpacingClass(language, 'border-r', 'border-l');
<div className={`flex items-center gap-2 ${borderDir} border-emerald-900/30`}>
  {children}
</div>

// In Arabic: border-right
// In English: border-left
```

#### 4. Conditional RTL
```typescript
// Simple boolean check
if (isRTL(language)) {
  // Do something special for Arabic
}

// In className
<div className={isRTL(language) ? 'special-rtl-style' : 'special-ltr-style'}>
```

#### 5. Get Direction Attribute
```typescript
// Rarely needed (usually automatic)
const dir = getDirAttribute(language);
// Returns: 'rtl' for Arabic, 'ltr' for others
```

---

## Common Patterns

### Pattern 1: Table Header Alignment
```typescript
<th className={`px-4 py-3 ${getTextAlignClass(language, 'text-right', 'text-left')}`}>
  {t('columnName')}
</th>
```

### Pattern 2: Number/Amount Alignment
```typescript
// Numbers should be right-aligned even in RTL
<td className={`px-4 py-3 ${getTextAlignClass(language, 'text-left', 'text-right')}`}>
  {amount.toFixed(3)}
</td>
```

### Pattern 3: Icon Buttons
```typescript
// Icons that should flip direction
<button className={`flex items-center gap-2 ${getFlexDirectionClass(language)}`}>
  <Icon />
  {t('label')}
</button>
```

### Pattern 4: Info Boxes
```typescript
<div className={`p-4 border ${getSpacingClass(language, 'border-r-4', 'border-l-4')} rounded`}>
  {message}
</div>
```

---

## Testing Your RTL Implementation

### Quick Browser Check
1. Open DevTools (F12)
2. Select Elements tab
3. Find the `<html>` element
4. Check the `dir` attribute changes when you switch languages

### What You Should See

**Before Switching to Arabic:**
```html
<html lang="en" dir="ltr">
```

**After Clicking "AR":**
```html
<html lang="ar" dir="rtl">
```

### Test Cases Checklist
- [ ] Language switcher shows current selection
- [ ] Page layout mirrors when you switch languages
- [ ] Tables align correctly in both RTL and LTR
- [ ] Headers reverse layout properly
- [ ] Text flows right-to-left in Arabic
- [ ] Language preference persists on page reload
- [ ] No console errors when switching languages

---

## Common Mistakes to Avoid

### ❌ DON'T: Hardcode alignment
```typescript
// Bad - doesn't respect language
<div className="text-left">
  {label}
</div>
```

### ✅ DO: Use utility functions
```typescript
// Good - respects language
<div className={getTextAlignClass(language)}>
  {label}
</div>
```

### ❌ DON'T: Use margin/padding shortcuts blindly
```typescript
// Bad - ML (margin-left) stays left in RTL
<div className="ml-4">
  {content}
</div>
```

### ✅ DO: Use gap and explicit spacing
```typescript
// Good - respects direction
<div className="flex gap-4">
  {content}
</div>

// Or use getSpacingClass for specific direction
```

### ❌ DON'T: Use flex-row-reverse manually
```typescript
// Bad - only works for one language
<div className={language === 'ar' ? 'flex-row-reverse' : 'flex-row'}>
```

### ✅ DO: Use getFlexDirectionClass
```typescript
// Good - handles both directions
<div className={`flex ${getFlexDirectionClass(language)}`}>
```

---

## How the Magic Works

### HTML Attribute Synchronization
```
User clicks "AR"
       ↓
Language Context updates
       ↓
useEffect hook triggers
       ↓
document.documentElement.dir = 'rtl'
document.documentElement.lang = 'ar'
       ↓
Browser CSS cascade applies
       ↓
All RTL-aware styles update automatically
```

### CSS Direction Property
```css
/* When dir="rtl" is set on HTML */
body {
  direction: rtl;
  text-align: right;  /* Default for RTL */
}

/* Elements inherit direction */
p {
  direction: rtl;  /* Inherited from parent */
}
```

---

## Utility Functions Reference

| Function | Purpose | Parameters | Returns |
|----------|---------|-----------|---------|
| `getTextAlignClass()` | Text alignment | `language, rtlClass?, ltrClass?` | CSS class string |
| `getFlexDirectionClass()` | Flex direction | `language, rtlClass?, ltrClass?` | CSS class string |
| `getSpacingClass()` | Margin/padding direction | `language, rtlClass, ltrClass` | CSS class string |
| `getBorderClass()` | Border direction | `language, rtlClass, ltrClass` | CSS class string |
| `isRTL()` | Boolean check | `language` | boolean |
| `getDirAttribute()` | HTML dir value | `language` | 'rtl' \| 'ltr' |
| `combineRTLClasses()` | Combine classes | `language, base, rtl, ltr` | CSS class string |

---

## File Locations

- **Utilities**: `packages/frontend/src/utils/rtl.ts`
- **Context**: `packages/frontend/src/contexts/LanguageContext.tsx`
- **HTML Template**: `packages/frontend/index.html`
- **Examples**: 
  - `packages/frontend/src/components/Layout.tsx`
  - `packages/frontend/src/pages/InvoiceDetail.tsx`
  - `packages/frontend/src/pages/InvoiceList.tsx`

---

## Need Help?

### Debugging RTL Issues

1. **Check HTML attribute**
   ```javascript
   // In browser console
   document.documentElement.dir
   // Should return 'rtl' or 'ltr'
   ```

2. **Verify language context**
   ```javascript
   // Check localStorage
   localStorage.getItem('language')
   ```

3. **Test utility functions**
   ```javascript
   // Check if importing correctly
   import { getTextAlignClass } from '@/utils/rtl'
   ```

4. **Inspect CSS cascade**
   - Right-click element → Inspect
   - Check "Computed" tab
   - Look for `direction`, `text-align`, `flex-direction`

---

## Performance Tips

- ✅ Utilities have zero runtime overhead
- ✅ CSS cascade handles all styling
- ✅ No re-renders when utilities return different classes
- ✅ Language changes are instant
- ✅ No additional bundle size impact

---

**Last Updated**: January 2025  
**Status**: Production Ready ✅
