# Global Styles & Theme

This directory contains the global styling system for the application, including typography, brand colors, and reusable theme constants.

## Files

- `theme.ts` - TypeScript theme constants for use in styled-components and components
- `global.css` - Global CSS classes for typography and brand colors
- `index.ts` - Exports for easy importing

## Usage

### Using Theme in TypeScript/React Components

```typescript
import { theme, brandColors, typography } from '../../../shared/styles/theme'

// Use in styled-components
const StyledComponent = styled.div`
  color: ${brandColors.text.primary};
  font-size: ${typography.fontSize.base};
  background-color: ${brandColors.primary};
`

// Use in inline styles
<div style={{ color: brandColors.primary, fontSize: typography.fontSize.lg }}>
  Content
</div>
```

### Using CSS Classes

```jsx
// Typography
<h1 className="text-primary">Heading</h1>
<p className="text-secondary">Body text</p>
<span className="text-small">Small text</span>

// Brand colors
<div className="bg-primary">Primary background</div>
<span className="text-success">Success text</span>

// Status colors
<div className="bg-submitted">Submitted status</div>
<div className="bg-deadline-warning">Deadline warning</div>
<div className="bg-payment-complete">Payment complete</div>
```

### Typography

All headings (h1-h6) are automatically styled with consistent font sizes, weights, and line heights.

**Heading Sizes:**
- h1: 30px, font-weight: 600
- h2: 24px, font-weight: 600
- h3: 20px, font-weight: 600
- h4: 18px, font-weight: 600
- h5: 16px, font-weight: 600
- h6: 14px, font-weight: 600

**Body Text:**
- Default: 14px, font-weight: 400
- Small: 12px (use `.text-small` class)
- Large: 16px (use `.text-large` class)

### Brand Colors

**Primary Colors:**
- `brandColors.primary` - Main brand color (#1890ff)
- `brandColors.secondary` - Secondary brand color (#722ed1)

**Status Colors:**
- `brandColors.success` - Success state (#52c41a)
- `brandColors.warning` - Warning state (#faad14)
- `brandColors.error` - Error state (#ff4d4f)
- `brandColors.info` - Info state (#1890ff)

**Text Colors:**
- `brandColors.text.primary` - Main text (#262626)
- `brandColors.text.secondary` - Secondary text (#595959)
- `brandColors.text.tertiary` - Tertiary text (#8c8c8c)
- `brandColors.text.disabled` - Disabled text (#bfbfbf)

**Status Background Colors:**
- `brandColors.status.submitted` - Submitted tasks (#e0f5ff)
- `brandColors.status.deadlineWarning` - Deadline warning (#fcf5cc)
- `brandColors.status.paymentComplete` - Payment complete (#e0f5ff)

### Spacing

```typescript
import { spacing } from '../../../shared/styles/theme'

// Use spacing values
margin: ${spacing.md}  // 16px
padding: ${spacing.lg}  // 24px
```

### Border Radius

```typescript
import { borderRadius } from '../../../shared/styles/theme'

border-radius: ${borderRadius.md}  // 8px
```

### Shadows

```typescript
import { shadows } from '../../../shared/styles/theme'

box-shadow: ${shadows.md}  // Medium shadow
```

## Best Practices

1. **Always use theme constants** instead of hardcoded colors/values
2. **Use CSS classes** for simple text styling when possible
3. **Use theme object** in styled-components for dynamic styling
4. **Keep consistency** - all headings should use the default h1-h6 styles
5. **Use semantic color names** - prefer `brandColors.text.primary` over `#262626`

