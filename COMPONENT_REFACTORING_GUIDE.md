# Component Refactoring Guide - Before & After

## 1. Section Header Component

### BEFORE (Broken - Color Chaos)
```tsx
<div className="flex justify-between items-center">
  <h2 className="text-lg font-semibold text-slate-100 flex items-center gap-3">
    <span className="w-8 h-8 rounded bg-slate-700 border border-slate-600 
                     text-slate-200 flex items-center justify-center text-xs font-mono">
      04
    </span>
    Invoice Line Items
  </h2>
</div>
```

**Issues:**
- ❌ Small section number (w-8 h-8)
- ❌ No color identity (slate-700)
- ❌ Generic styling, no visual weight
- ❌ Missing visual separation

### AFTER (Fixed - Emerald Theme)
```tsx
<div className="flex justify-between items-center pb-4 border-b-2 border-emerald-500/30">
  <h2 className="text-xl font-bold text-slate-50 flex items-center gap-3">
    <span className="w-10 h-10 rounded-lg bg-gradient-to-br from-emerald-500 to-emerald-600 
                     border border-emerald-400 text-white flex items-center justify-center 
                     text-sm font-bold shadow-lg shadow-emerald-500/30">
      04
    </span>
    <span>Invoice Line Items</span>
  </h2>
  <span className="text-xs font-semibold px-3 py-1.5 rounded-full 
                   bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
    TEIF 1.8.8 Standard
  </span>
</div>
```

**Improvements:**
- ✅ Larger section number (w-10 h-10) for prominence
- ✅ Emerald gradient background with glow effect
- ✅ Bold typography hierarchy (text-xl font-bold)
- ✅ Emerald accent border separator
- ✅ Professional badge styling

---

## 2. Button System Overhaul

### BEFORE (Inconsistent)

#### Add Allowance Button
```tsx
<button className="bg-purple-500 hover:bg-purple-600 
                   text-white px-4 py-2 rounded">
  + Add Allowance
</button>
```

#### Ajouter une ligne Button
```tsx
<button className="bg-blue-400 hover:bg-blue-500 
                   text-slate-900 px-3 py-1.5 rounded">
  Ajouter une ligne
</button>
```

**Issues:**
- ❌ Different colors (purple vs blue)
- ❌ Inconsistent padding
- ❌ No hover effects or focus states
- ❌ Different text colors
- ❌ No visual feedback

### AFTER (Unified Emerald System)

#### Primary Action Button
```tsx
<button 
  className="group px-6 py-2.5 rounded-lg font-semibold
            bg-gradient-to-r from-emerald-500 to-emerald-600
            hover:from-emerald-600 hover:to-emerald-700
            focus:outline-none focus:ring-2 focus:ring-emerald-400 
            focus:ring-offset-2 focus:ring-offset-slate-800
            text-white transition-all duration-200
            shadow-lg hover:shadow-emerald-500/50 hover:shadow-xl
            disabled:opacity-50 disabled:cursor-not-allowed"
>
  + Add Allowance
</button>
```

#### Secondary Action Button
```tsx
<button 
  className="group px-4 py-2 rounded-lg font-medium
            bg-emerald-500/20 hover:bg-emerald-500/30
            text-emerald-300 hover:text-emerald-200
            border border-emerald-500/40 hover:border-emerald-500/60
            focus:outline-none focus:ring-2 focus:ring-emerald-400 
            focus:ring-offset-2 focus:ring-offset-slate-800
            transition-all duration-200
            disabled:opacity-50 disabled:cursor-not-allowed"
>
  Ajouter une ligne
</button>
```

**Improvements:**
- ✅ All use emerald color system
- ✅ Consistent padding and sizing
- ✅ Gradient background for visual depth
- ✅ Proper focus states (ring + offset)
- ✅ Hover animations with shadow effects
- ✅ Disabled state handling
- ✅ Clear primary vs secondary distinction

---

## 3. Input Field System

### BEFORE (White Inputs - Breaking Theme)
```tsx
<input 
  type="text"
  placeholder="Enter amount..."
  className="w-full px-3 py-2 border rounded 
            bg-white text-slate-900 
            border-blue-400 focus:border-blue-600
            placeholder-slate-400"
/>
```

**Issues:**
- ❌ White background breaks dark theme
- ❌ Blue focus border conflicts with design
- ❌ No emerald consistency
- ❌ Poor accessibility (white on slate)
- ❌ No error state styling

### AFTER (Dark Theme Inputs with Emerald Focus)

#### Default Input
```tsx
<input 
  type="text"
  placeholder="Enter amount..."
  className="w-full px-4 py-2.5 rounded-lg
            bg-slate-900 text-slate-50 
            placeholder-slate-500
            border border-slate-700 hover:border-slate-600
            focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500/50
            transition-colors duration-200
            disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-slate-950"
/>
```

#### With Error State
```tsx
<input 
  type="text"
  placeholder="Enter amount..."
  aria-invalid={Boolean(error)}
  className={`w-full px-4 py-2.5 rounded-lg
             bg-slate-900 text-slate-50 
             placeholder-slate-500
             border transition-colors duration-200
             focus:ring-1 focus:outline-none
             ${error 
               ? 'border-red-500 focus:border-red-500 focus:ring-red-500/50' 
               : 'border-slate-700 hover:border-slate-600 focus:border-emerald-500 focus:ring-emerald-500/50'
             }`}
/>
{error && <p className="text-xs font-medium text-red-400 mt-1">{error}</p>}
```

**Improvements:**
- ✅ Dark background (slate-900) matches theme
- ✅ Light text (slate-50) for readability
- ✅ Emerald focus state (border + ring)
- ✅ Hover state prepares for interaction
- ✅ Error state clear and accessible
- ✅ Disabled state visually different
- ✅ Smooth transitions

---

## 4. Select Dropdown

### BEFORE (Generic)
```tsx
<select className="w-full px-3 py-2 border border-slate-700 
                  rounded bg-slate-900 text-sm font-medium 
                  text-slate-100 appearance-none 
                  cursor-pointer focus:outline-none 
                  focus:border-slate-600">
  <option>I-62: Supplier</option>
  <option>I-64: Buyer</option>
</select>
```

**Issues:**
- ❌ No emerald focus indicator
- ❌ No hover feedback
- ❌ Generic styling
- ❌ No custom arrow styling

### AFTER (Enhanced with Emerald)
```tsx
<select 
  className="w-full px-4 py-2.5 pr-10 rounded-lg
            bg-slate-900 text-slate-50
            border border-slate-700 hover:border-slate-600
            focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500/50
            appearance-none cursor-pointer
            transition-colors duration-200
            disabled:opacity-50 disabled:cursor-not-allowed
            [background-image:url('data:image/svg+xml;charset=UTF-8,%3csvg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 24 24%22 fill=%22none%22 stroke=%2210B981%22 stroke-width=%222%22%3e%3cpolyline points=%226 9 12 15 18 9%22%3e%3c/polyline%3e%3c/svg%3e')]
            [background-repeat:no-repeat]
            [background-position:right_1rem_center]
            [background-size:1.5em_1.5em]"
>
  <option>I-62: Supplier</option>
  <option>I-64: Buyer</option>
</select>
```

**Improvements:**
- ✅ Emerald custom dropdown arrow
- ✅ Emerald focus ring
- ✅ Hover state feedback
- ✅ Better padding (py-2.5)
- ✅ Consistent with input styling

---

## 5. Form Section Container

### BEFORE (Inconsistent Spacing)
```tsx
<section className="bg-slate-800 p-6 border border-slate-700 space-y-6">
  <div className="flex justify-between items-center">
    {/* header */}
  </div>
  
  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 border-b border-slate-700 pb-6">
    {/* fields */}
  </div>
  
  <div className="space-y-4">
    {/* nested section */}
  </div>
</section>
```

**Issues:**
- ❌ Unclear visual hierarchy
- ❌ Inconsistent gaps (space-y-6, gap-4, pb-6)
- ❌ No rounded corners
- ❌ Basic border styling

### AFTER (Refined - Consistent Rhythm)
```tsx
<section className="bg-slate-800 p-6 border border-slate-700 rounded-xl 
                   shadow-xl overflow-hidden">
  {/* Header Section */}
  <div className="pb-4 border-b-2 border-emerald-500/30 mb-6">
    <h2 className="text-xl font-bold text-slate-50 flex items-center gap-3">
      <span className="w-10 h-10 rounded-lg 
                       bg-gradient-to-br from-emerald-500 to-emerald-600 
                       border border-emerald-400 
                       text-white flex items-center justify-center 
                       text-sm font-bold shadow-lg shadow-emerald-500/30">
        04
      </span>
      Invoice Line Items
    </h2>
  </div>
  
  {/* Form Fields - Consistent 4px rhythm */}
  <div className="space-y-4 mb-6">
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {/* Field 1 */}
      <div className="space-y-2">
        <label className="block text-sm font-semibold text-slate-200">
          Reference
        </label>
        <input className="w-full px-4 py-2.5 rounded-lg..." />
      </div>
      
      {/* Field 2 */}
      <div className="space-y-2">
        <label className="block text-sm font-semibold text-slate-200">
          Designation
        </label>
        <input className="w-full px-4 py-2.5 rounded-lg..." />
      </div>
    </div>
  </div>
  
  {/* Nested Subsection */}
  <div className="bg-slate-900/50 p-4 rounded-lg border border-slate-700 
                 mb-6 space-y-4">
    <h3 className="text-base font-semibold text-slate-200">
      Invoice-Level Allowances & Charges
    </h3>
    
    <div className="flex gap-3">
      <button className="px-4 py-2 rounded-lg font-medium
                        bg-emerald-500/20 hover:bg-emerald-500/30
                        text-emerald-300 hover:text-emerald-200
                        border border-emerald-500/40 hover:border-emerald-500/60
                        transition-all duration-200">
        + Add Allowance
      </button>
    </div>
  </div>
  
  {/* Button Group - Clear separation */}
  <div className="flex gap-3 pt-4 border-t border-slate-700">
    <button className="px-6 py-2.5 rounded-lg font-semibold
                      bg-gradient-to-r from-emerald-500 to-emerald-600
                      hover:from-emerald-600 hover:to-emerald-700
                      text-white transition-all duration-200">
      Continue
    </button>
    <button className="px-6 py-2.5 rounded-lg font-semibold
                      bg-slate-700 hover:bg-slate-600
                      text-slate-100 transition-all duration-200">
      Cancel
    </button>
  </div>
</section>
```

**Improvements:**
- ✅ Rounded corners (rounded-xl)
- ✅ Shadow depth
- ✅ Consistent 4-16px spacing (space-y-4, space-y-2)
- ✅ Clear section hierarchy with emerald accents
- ✅ Nested subsection styling (bg-slate-900/50)
- ✅ Clear button separation with border-top
- ✅ Unified typography
- ✅ Responsive grid layouts

---

## 6. Label & Helper Text System

### BEFORE (Inconsistent)
```tsx
{/* Different styles everywhere */}
<label className="block text-xs font-medium text-slate-400 mb-2">
  Email
</label>

<label className="block text-sm font-semibold text-slate-100">
  Phone
</label>

<p className="text-xs text-slate-500">Optional field</p>
```

**Issues:**
- ❌ Inconsistent sizes (xs vs sm)
- ❌ Inconsistent weights (medium vs semibold)
- ❌ Inconsistent colors
- ❌ No clear hierarchy
- ❌ No required indicator system

### AFTER (Standardized)
```tsx
{/* Required Label */}
<label className="block text-sm font-semibold text-slate-200 mb-2">
  Email
  <span className="text-red-500 ml-1">*</span>
</label>
<input className="w-full px-4 py-2.5..." />
<p className="text-xs font-normal text-slate-500 mt-1">
  We'll send confirmations to this address
</p>

{/* Optional Label */}
<label className="block text-sm font-semibold text-slate-200 mb-2">
  Phone
  <span className="text-slate-500 text-xs font-normal ml-2">(Optional)</span>
</label>
<input className="w-full px-4 py-2.5..." />

{/* With Error */}
<label className="block text-sm font-semibold text-slate-200 mb-2">
  Bank Code
  <span className="text-red-500 ml-1">*</span>
</label>
<input className="w-full px-4 py-2.5 border border-red-500..." />
<p className="text-xs font-medium text-red-400 mt-1">
  Invalid format. Expected 3 digits.
</p>
```

**Improvements:**
- ✅ All labels: `text-sm font-semibold text-slate-200`
- ✅ Required: red asterisk
- ✅ Optional: subtle gray indicator
- ✅ Helper text: `text-xs font-normal text-slate-500`
- ✅ Error text: `text-xs font-medium text-red-400`
- ✅ Clear visual hierarchy
- ✅ Accessible (aria-labels recommended)

---

## 7. Empty State

### BEFORE (Plain)
```tsx
<div className="flex items-center justify-center min-h-48">
  <p className="text-slate-500">No items added yet</p>
</div>
```

### AFTER (Polished with Emerald Accent)
```tsx
<div className="flex flex-col items-center justify-center min-h-48 
               bg-slate-900/50 rounded-lg border-2 border-dashed border-slate-700
               hover:border-emerald-500/30 transition-colors duration-300">
  <div className="w-12 h-12 rounded-full bg-emerald-500/20 
                 flex items-center justify-center mb-3">
    <svg className="w-6 h-6 text-emerald-400" fill="none" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
            d="M12 6v6m0 0v6m0-6h6m0-6h-6" />
    </svg>
  </div>
  <p className="text-slate-400 font-medium mb-2">
    No items added yet
  </p>
  <p className="text-xs text-slate-500">
    Start by adding your first item
  </p>
  <button className="mt-4 px-4 py-2 rounded-lg font-medium
                    bg-emerald-500/20 hover:bg-emerald-500/30
                    text-emerald-300 hover:text-emerald-200
                    border border-emerald-500/40 hover:border-emerald-500/60
                    transition-all duration-200">
    Add Item
  </button>
</div>
```

**Improvements:**
- ✅ Visual icon with emerald accent
- ✅ Dashed border for emptiness
- ✅ Hover state encourages interaction
- ✅ CTA button integrated
- ✅ Professional appearance

---

## Implementation Checklist

- [ ] Replace all section badges with emerald gradient
- [ ] Update all buttons to emerald system (Primary/Secondary)
- [ ] Change input backgrounds from white to slate-900
- [ ] Update focus rings from blue to emerald
- [ ] Standardize all labels to `text-sm font-semibold text-slate-200`
- [ ] Implement 4px grid spacing throughout
- [ ] Add rounded corners (rounded-lg/xl) to containers
- [ ] Create consistent error state styling
- [ ] Add disabled state styling
- [ ] Create reusable component variants
- [ ] Test accessibility (WCAG AA minimum)
- [ ] Verify dark theme consistency

