# Visual Migration Guide - Before/After Comparison

---

## Section 01: Supplier Information

### BEFORE (Color Chaos)
```
┌─────────────────────────────────────────────┐
│  [01 - SLATE]  Supplier Information        │  ← Generic slate badge
│  ─────────────────────────────────────────  │
│                                             │
│  Full Name                                  │  ← text-xs font-medium
│  [WHITE INPUT FIELD - breaks theme]         │  ← bg-white (awful!)
│  
│  ID Type                                    │  ← inconsistent label
│  [BLUE BORDER SELECT]                       │  ← Blue selection
│  
│  [PURPLE BUTTON] Add                        │  ← Purple (conflicts)
│  [BLUE BUTTON] Cancel                       │  ← Blue (different)
│
└─────────────────────────────────────────────┘
```

### AFTER (Emerald Unified + Dark)
```
┌──────────────────────────────────────────────────────────────┐
│  [01 ▓▓▓] Supplier Information          TEIF 1.8.8 Standard  │
│  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━  │
│  (Emerald gradient badge with glow)    (Emerald accent badge) │
│                                                               │
│  Full Name                                                    │ ← text-sm font-bold
│  [DARK SLATE INPUT - emerald focus]                          │ ← bg-slate-900
│  Helper text if needed                                       │ ← text-xs slate-500
│  
│  ID Type                                                      │ ← text-sm font-bold
│  [DARK SLATE SELECT - emerald focus]                         │ ← bg-slate-900
│  
│  [EMERALD GRADIENT BUTTON] Add                               │ ← Primary variant
│  [EMERALD/20 BUTTON] Cancel                                  │ ← Secondary variant
│
└──────────────────────────────────────────────────────────────┘
```

**Visual Improvements:**
- ✅ Large emerald gradient badge (w-10 h-10)
- ✅ Dark backgrounds (slate-900)
- ✅ Emerald focus rings (not blue)
- ✅ Unified emerald buttons
- ✅ Consistent typography

---

## Button Comparison

### BEFORE (Inconsistent)
```
┌────────────────────────────────────────┐
│  [Purple Button]  [Blue Button]         │  ← Different colors
│   bg-purple-500   bg-blue-400           │
│   text-white      text-slate-900        │  ← Different text color
│   px-4 py-2       px-3 py-1.5           │  ← Different sizing
└────────────────────────────────────────┘
```

### AFTER (Unified Emerald System)
```
┌────────────────────────────────────────────────────────┐
│ PRIMARY (CTA)                                           │
│ ╔════════════════════════════════════════════╗         │
│ ║ ▓▓▓ Add Item ▓▓▓  (Emerald Gradient)     ║         │
│ ║ from-emerald-500 to-emerald-600           ║         │
│ ║ Hover: from-emerald-600 to-emerald-700    ║         │
│ ╚════════════════════════════════════════════╝         │
│                                                         │
│ SECONDARY (Action)                                      │
│ ┌──────────────────────────────────────────┐           │
│ │ + Add Allowance  (Emerald/20)           │           │
│ │ bg-emerald-500/20 border-emerald-500/40 │           │
│ │ Hover: bg-emerald-500/30                │           │
│ └──────────────────────────────────────────┘           │
│                                                         │
│ TERTIARY (Auxiliary)                                    │
│ ┌──────────────────────────────────────────┐           │
│ │ Cancel  (Slate)                          │           │
│ │ bg-slate-700/50 text-slate-200           │           │
│ └──────────────────────────────────────────┘           │
│                                                         │
│ DANGER (Delete)                                         │
│ ┌──────────────────────────────────────────┐           │
│ │ ✕ Remove  (Red)                          │           │
│ │ bg-red-500/20 text-red-300               │           │
│ └──────────────────────────────────────────┘           │
└────────────────────────────────────────────────────────┘
```

---

## Input Field States

### BEFORE (White Inputs - Theme Breaking)
```
DEFAULT:
┌─────────────────────────────┐
│ [WHITE BG - AWFUL]          │  ← bg-white text-slate-900
└─────────────────────────────┘

FOCUS:
┌─────────────────────────────┐
│ [WHITE BG] ← BLUE RING      │  ← Inconsistent
└─────────────────────────────┘

ERROR:
┌─────────────────────────────┐
│ [WHITE BG] ← RED RING       │  ← Different color system
└─────────────────────────────┘
```

### AFTER (Dark Theme + Emerald Focus)
```
DEFAULT:
┌─────────────────────────────┐
│ [DARK SLATE BG]             │  ← bg-slate-900 text-slate-50
│ Placeholder text            │  ← placeholder-slate-500
└─────────────────────────────┘
        border-slate-700

FOCUS:
┌─────────────────────────────┐
│ [DARK SLATE BG]             │  ← Same dark background
│ User input text             │  ← Light text emerald ring
└─────────────────────────────┘
  border-emerald-500 ring-emerald-500/50

ERROR:
┌─────────────────────────────┐
│ [DARK SLATE BG]             │  ← Maintains dark theme
│ Error message               │
└─────────────────────────────┘
  border-red-500 ring-red-500/50

DISABLED:
┌─────────────────────────────┐
│ [DARK SLATE BG - FADED]     │  ← opacity-50
│ Disabled text               │  ← cursor-not-allowed
└─────────────────────────────┘
```

---

## Typography Hierarchy

### BEFORE (Inconsistent)
```
01                     ← text-xs font-mono (3 different sizes seen)
Supplier Information   ← text-lg font-semibold
─────────────────────  ← inconsistent

Full Name              ← text-xs font-medium (too small)
Email Address          ← text-sm font-semibold (different)
Optional hint          ← text-xs text-slate-400 (right size)

Error message          ← text-xs text-red-500 (inconsistent color)
```

### AFTER (Standardized 4-Level Hierarchy)
```
[01]                         ← text-sm font-bold (in badge)
Supplier Information         ← text-xl font-bold (section title)
━━━━━━━━━━━━━━━━━━━━━━━━   ← border-emerald-500/30

Full Name                    ← text-sm font-semibold text-slate-200
[DARK SLATE INPUT]           ← All inputs consistent
Helper or error text         ← text-xs (consistent)

Error message                ← text-xs font-medium text-red-400
Success message              ← text-xs font-medium text-emerald-400
```

---

## Color System Migration

### BEFORE (Chaos)
```
SECTION BADGES:
┌──────────────────────────────────────┐
│  [01] Purple section    [04] Purple   │  ← Purple (consistent but wrong)
│  [02] Purple section    [05] Orange   │  ← Orange (different!)
│  [03] Purple section    [06] Blue     │  ← Blue (yet another!)
└──────────────────────────────────────┘

BUTTONS:
┌──────────────────────────────────────┐
│  [Purple Button]  [Blue Button]       │  ← Mixed palette
│  [Orange Button]  [Red Button]        │  ← 4 colors for 4 buttons
└──────────────────────────────────────┘

FOCUS RINGS:
┌──────────────────────────────────────┐
│  Input 1 → [BLUE RING]                │  ← #3B82F6 (generic)
│  Input 2 → [BLUE RING]                │  ← Same generic blue
│  Input 3 → [RED RING] (error)         │  ← #EF4444 (error only)
└──────────────────────────────────────┘
```

### AFTER (Unified Emerald)
```
SECTION BADGES:
┌──────────────────────────────────────┐
│  [01 ▓▓▓] All Emerald      [04 ▓▓▓]  │  ← All same emerald gradient
│  [02 ▓▓▓] Section          [05 ▓▓▓]  │  ← Consistent throughout
│  [03 ▓▓▓] Badges          [06 ▓▓▓]   │  ← No visual fragmentation
└──────────────────────────────────────┘

BUTTONS:
┌──────────────────────────────────────┐
│  [✓ Emerald Primary]                  │  ← from-emerald-500 to-600
│  [+ Emerald Secondary]                │  ← emerald-500/20 border
│  [Cancel Slate Tertiary]              │  ← bg-slate-700
│  [✕ Delete Red Danger]                │  ← bg-red-500/20
└──────────────────────────────────────┘

FOCUS RINGS:
┌──────────────────────────────────────┐
│  Input 1 → [EMERALD RING] ✨          │  ← #10B981 (brand color)
│  Input 2 → [EMERALD RING] ✨          │  ← Same emerald everywhere
│  Input 3 → [RED RING] (error)         │  ← #EF4444 (error specific)
└──────────────────────────────────────┘
```

---

## Spacing Grid Alignment

### BEFORE (Inconsistent)
```
SECTION GAPS:
┌──────────────────────────────────────┐
│ space-y-6   (24px) - Too loose         │
│   [Field 1]                            │
│ gap-4 (16px) - Different!              │
│   [Field 2]   [Field 3]                │
│ pb-6 (24px) - Inconsistent padding     │
│                                        │
│ space-y-4 (16px) - Changes again       │
│   [Subsection]                         │
│                                        │
│ pt-4 (16px) - Mixed spacing            │
│ [Button Group]                         │
└──────────────────────────────────────┘
Feels: Disjointed, unprofessional
```

### AFTER (4px Grid System)
```
SECTION GAPS:
┌──────────────────────────────────────┐
│ p-6 (24px) - Section padding           │
│   pb-4 (16px) - Header separator       │
│   mb-6 (24px) - After header           │
│                                        │
│   space-y-4 (16px) - Between rows      │
│     [Field 1]                          │
│     [Field 2]   [Field 3]              │
│                                        │
│   gap-4 (16px) - Column spacing        │
│   mb-6 (24px) - After field group      │
│                                        │
│   [Subsection]                         │
│   space-y-4 (16px)                     │
│                                        │
│   pt-4 (16px) - Button separator       │
│   [Button Group]                       │
└──────────────────────────────────────┘
Feels: Rhythmic, professional, predictable

SPACING SCALE:
8px  (gap-2, p-2)    - Tight
16px (gap-4, p-4)    - Standard
24px (gap-6, p-6)    - Generous
32px (gap-8, p-8)    - Major break
```

---

## Form Section Structure

### BEFORE (Confusing Nesting)
```
<section className="bg-slate-800 p-6 border border-slate-700 space-y-6">
  <div className="flex...">
    <h2 className="text-lg font-semibold text-slate-100 flex items-center gap-3">
      <span className="w-8 h-8 rounded bg-slate-700 ...">01</span>  ← Small & dull
      Supplier Information
    </h2>
  </div>
  
  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 border-b border-slate-700 pb-6">
    {/* fields scattered with inconsistent styling */}
  </div>
  
  <div className="space-y-4">
    {/* nested section - unclear hierarchy */}
  </div>
  
  {/* buttons - no clear visual separation */}
</section>
```

### AFTER (Clear Hierarchy)
```
<FormSection step="01" title="Supplier Information" badge="TEIF 1.8.8">
  {/* Automatically renders: */}
  
  ┌───────────────────────────────────────────────┐
  │ [01 ▓▓▓] Supplier Information    TEIF 1.8.8   │  ← StepIndicator
  │ ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━   │
  │                                               │
  │ space-y-4 (consistent gap)                    │
  │ ┌──────────────────────────────┐             │
  │ │  Full Name                   │ ← FormInput │
  │ │  [DARK INPUT with error]     │             │
  │ │  Helper or error text        │             │
  │ └──────────────────────────────┘             │
  │                                               │
  │ ┌──────────────┐  ┌──────────────┐           │
  │ │ ID Type      │  │ ID Value     │           │
  │ │ [SELECT]     │  │ [INPUT]      │           │
  │ └──────────────┘  └──────────────┘           │
  │  (grid gap-4)                                │
  │                                               │
  │ ┌───────────────────────────────────────────┐│
  │ │ [Sub] Invoice-Level Allowances           ││
  │ │ space-y-4                                 ││
  │ │ [+ Add Allowance Button]                  ││
  │ └───────────────────────────────────────────┘│
  │  (nested subsection - bg-slate-900/50)       │
  │                                               │
  │ ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━   │
  │ gap-3 (button spacing)                       │
  │ [Emerald Primary] [Slate Tertiary]          │
  └───────────────────────────────────────────────┘
  
  Feels: Clear, professional, well-organized
</FormSection>
```

---

## Full Page Layout Comparison

### BEFORE (Chaotic)
```
┌─────────────────────────────────────────────────────┐
│ TEIF Invoice Generator - Compliance v1.8.8          │
└─────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────┐
│ [01 ⬜] Supplier         ← Generic, small badge   │
│ ─────────────────────────────────────────────────  │
│ [WHITE INPUT - horrible]    [BLUE SELECT]          │
│ [PURPLE BUTTON]             [BLUE BUTTON]          │
│ Random colors everywhere                           │
└─────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────┐
│ [02 ⬜] Buyer                                        │
│ [WHITE INPUT - breaks theme]                       │
│ [ORANGE BUTTON - conflicts]                        │
└─────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────┐
│ [04 ⬜] Items          ← Purple badge              │
│ [+ Add Item] [Remove] [Remove] ...                 │
│ [05 ⬜] Allowances     ← Orange badge              │
│ [WHITE INPUTS] [ORANGE BUTTON]                     │
│ [06 ⬜] Bank           ← Blue badge?               │
└─────────────────────────────────────────────────────┘

Impression: Unprofessional, inconsistent, chaotic
```

### AFTER (Unified & Professional)
```
┌─────────────────────────────────────────────────────┐
│ TEIF Invoice Generator - Compliance v1.8.8          │
└─────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────┐
│ [01 ▓▓▓] Supplier Information    TEIF 1.8.8        │
│ ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━  │
│ Full Name                                            │
│ [DARK SLATE - EMERALD FOCUS]                       │
│ [EMERALD PRIMARY BUTTON] [SLATE TERTIARY]          │
│ Professional, cohesive, clear                       │
└─────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────┐
│ [02 ▓▓▓] Buyer Information       TEIF 1.8.8        │
│ ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━  │
│ [Same consistent styling as Section 01]            │
│ Unified, predictable, professional                 │
└─────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────┐
│ [03 ▓▓▓] Invoice Details         TEIF 1.8.8        │
│ [04 ▓▓▓] Line Items              TEIF 1.8.8        │
│ [+ Add Item] [← Emerald consistent]                │
│ [05 ▓▓▓] Allowances              TEIF 1.8.8        │
│ [All dark inputs - emerald accents throughout]     │
│ [06 ▓▓▓] Bank & Payment          TEIF 1.8.8        │
│                                                     │
│ ✨ Emerald color system throughout                 │
│ ✨ Consistent spacing (4px grid)                   │
│ ✨ Professional dark theme                         │
│ ✨ Clear visual hierarchy                          │
│ ✨ Accessible (WCAG AA)                            │
└─────────────────────────────────────────────────────┘

Impression: Professional, trustworthy, modern, accessible
```

---

## Color Palette Reference Card

```
PRIMARY ACCENT (Emerald):
█████ #10B981  ← Use for buttons, badges, focus rings, accents
█████ #059669  ← Hover state
█████ #047857  ← Active/pressed state

DARK BACKGROUNDS:
█████ #0F172A  ← Main page background (slate-900)
█████ #1E293B  ← Card backgrounds (slate-800)
█████ #334155  ← Borders (slate-700)

TEXT:
█████ #F1F5F9  ← Primary text (slate-50)
█████ #94A3B8  ← Secondary text (slate-400)
█████ #64748B  ← Tertiary text (slate-500)

SEMANTIC:
█████ #EF4444  ← Errors (red-500)
█████ #10B981  ← Success (emerald-500)
█████ #F59E0B  ← Warnings (amber-500)
█████ #3B82F6  ← Info (blue-500)
```

---

## Testing Checklist

After implementation, verify:

```
VISUAL:
☐ All section badges are emerald gradient (no purple/orange/blue)
☐ All inputs have dark backgrounds (no white)
☐ All buttons are emerald or slate (no purple/orange/blue)
☐ All focus rings are emerald (no blue)
☐ Spacing is consistent (measure with dev tools)
☐ Typography hierarchy is clear (labels bold, helpers light)

FUNCTIONALITY:
☐ Form inputs capture values correctly
☐ Validation errors display (red text under input)
☐ Dropdowns open/close properly
☐ Buttons clickable and responsive
☐ Form submission works end-to-end

ACCESSIBILITY:
☐ Tab navigation works (logical order)
☐ Focus ring visible when tabbing
☐ Screen reader test (NVDA/JAWS)
☐ Color contrast 4.5:1 minimum
☐ Keyboard can navigate all controls

BROWSER:
☐ Chrome rendering correct
☐ Firefox rendering correct
☐ Safari rendering correct
☐ Mobile (375px) responsive
☐ Tablet (768px) responsive
```

---

This visual guide serves as a reference during implementation to ensure consistency with the design system.

