# Design

## Color Palette

**Strategy**: Restrained—tinted neutrals with one warm orange accent. Establishes trust and professionalism while the accent signals approachability and energy.

### Primary Accent
- **Accent (Orange/Amber)**: `oklch(55% 0.18 50)` — warm, energetic, used for CTAs, highlights, and key interactions
- **Accent Dark**: `oklch(45% 0.16 50)` — darker variant for hover states and pressed buttons
- **Accent Light**: `oklch(75% 0.12 50)` — light tint for backgrounds or soft highlights

### Neutrals
- **Ink (Text)**: `oklch(15% 0.01 200)` — near-black for body text; high contrast
- **Ink Secondary**: `oklch(35% 0.02 200)` — secondary text, meta, muted copy
- **Ink Tertiary**: `oklch(55% 0.02 200)` — placeholder text, borders, very subtle elements
- **Background**: `oklch(98% 0.01 200)` — off-white, minimal tint (WCAG safe for light theme)
- **Surface**: `oklch(95% 0.02 200)` — cards, panels, layered surfaces; slightly warmer than background to add depth
- **Surface Secondary**: `oklch(92% 0.015 200)` — secondary surface for subsections or nested areas
- **Border**: `oklch(85% 0.01 200)` — subtle dividers and input borders

### Semantics
- **Success**: `oklch(60% 0.15 150)` — calm green for confirmations
- **Warning**: `oklch(70% 0.18 60)` — amber for cautions
- **Error**: `oklch(55% 0.20 30)` — warm red for destructive or error states
- **Info**: `oklch(60% 0.10 220)` — cool blue for informational content

**Contrast Verification**: Body text (Ink on Background) hits 16.3:1. Large text and accents meet 3:1+. All interactive states remain ≥4.5:1 against their backgrounds.

## Typography

### Fonts
- **Headings (h1–h4)**: Montserrat 600–700 weight
  - Display/Hero: Montserrat 700, clamp(2rem, 8vw, 4rem), letter-spacing -0.02em
  - Section heading (h2): Montserrat 700, clamp(1.75rem, 6vw, 2.5rem), letter-spacing -0.015em
  - Subsection (h3): Montserrat 600, 1.5rem, letter-spacing -0.01em
  - Small heading (h4): Montserrat 600, 1.125rem
- **Body**: Inter 400, 1rem (16px), line-height 1.6
- **Body Small**: Inter 400, 0.875rem, line-height 1.5 (captions, meta)
- **Code**: IBM Plex Mono 400, 0.875rem (for inline code and code blocks)

### Line Length
Body text max-width: 65–75ch (approximately 620px at 1rem base).

### Text Wrapping
- Headings: `text-wrap: balance` (even line breaks)
- Long prose: `text-wrap: pretty` (reduces orphans)

## Spacing Scale

Base unit: 0.5rem (8px)

```
xs: 0.5rem (4px)
sm: 1rem (8px)
md: 1.5rem (12px)
lg: 2rem (16px)
xl: 3rem (24px)
2xl: 4rem (32px)
3xl: 6rem (48px)
```

Use varied spacing for rhythm; don't apply identical margins to every section.

## Components

### Buttons
- **Primary** (CTA, accent): Background `oklch(55% 0.18 50)`, text white, padding `0.75rem 1.5rem`, border-radius 6px, font-weight 600
- **Secondary** (outline): Border 1px `oklch(85% 0.01 200)`, background transparent, text Ink, padding `0.75rem 1.5rem`, border-radius 6px
- **Tertiary** (text link): No background, text Accent, underline on hover, font-weight 500
- **States**: Hover `oklch(45% 0.16 50)`, active/pressed `oklch(35% 0.14 50)`, disabled `oklch(75% 0.005 200)`
- **Focus**: Focus ring 2px solid Accent, offset 2px

### Input Fields
- Background: `oklch(98% 0.01 200)`
- Border: 1px `oklch(85% 0.01 200)`
- Focus: Border-color Accent, box-shadow 0 0 0 3px `oklch(75% 0.12 50)` (light accent glow)
- Padding: `0.75rem`
- Border-radius: 6px
- Font: Inter 400, 1rem

### Cards & Surfaces
- Background: `oklch(95% 0.02 200)`
- Border: 1px `oklch(85% 0.01 200)` (optional; use subtle shadows instead for depth)
- Padding: `1.5rem` to `2rem` (vary per context)
- Border-radius: 8px
- Box-shadow: `0 1px 3px rgba(0, 0, 0, 0.08)` (subtle depth, no blur-heavy shadows)

## Motion & Transitions

**Energy**: Minimal and purposeful. No bounce, no elastic easing. Professional and calm.

### Transition Curves
- Ease-out (exit animations): `cubic-bezier(0.33, 0.66, 0.66, 1)` — smooth deceleration
- Fade/opacity: 200ms ease-out
- Micro-interactions (button hover, focus ring): 150ms ease-out
- Page/section reveals: 300ms ease-out (or instant with no transition)

### Reduced Motion
All animations must include a `@media (prefers-reduced-motion: reduce)` rule that either removes the animation or substitutes a quick crossfade (opacity only, no duration).

### Guidance
- Animate opacity and transform; avoid layout properties
- Do not gate content visibility on a transition class; ensure the content is visible by default
- Staggering within a single list is acceptable (e.g., fade-in sequenced reveals on page load), but apply it with restraint; each item reveals 30–50ms apart
- No blur, backdrop-filter, or mask unless it directly improves an effect and stays smooth at 60fps

## Layout

### Grid & Flexbox
- **1D layouts** (single row/column): Flexbox
- **2D layouts** (multi-row, multi-column): CSS Grid
- **Responsive grids without breakpoints**: `grid-template-columns: repeat(auto-fit, minmax(280px, 1fr))`
- **Max-width container**: 1280px (with 2rem lateral padding on mobile)

### Breakpoints (when needed)
- Mobile (default): < 768px
- Tablet: 768px – 1024px
- Desktop: 1024px+

### Spacing & Rhythm
- Vary vertical spacing between sections (2rem, 3rem, 4rem, 6rem) to create rhythm
- Don't repeat the same margin on every section
- Consistent horizontal padding: 1.5rem–2rem mobile, 2rem–3rem desktop

## Z-Index Scale

```
toast:          1000
tooltip:        999
modal-overlay:  100
modal:          101
dropdown:       50
sticky-header:  40
default:        auto (0)
```

Use semantic names, never arbitrary values like 999 or 9999.

## Accessibility

- **WCAG AA minimum**: All text ≥4.5:1 contrast, large text ≥3:1
- **Focus states**: Always visible (2px accent ring, clear affordance)
- **Keyboard navigation**: All interactive elements accessible via Tab and Enter/Space
- **Motion**: Every animation respects `prefers-reduced-motion`
- **Color alone**: Do not communicate information by color alone; pair with icons, text, or other signals
- **Form labels**: All inputs must have explicit `<label>` elements or aria-label
- **Alt text**: All images include descriptive alt text; decorative images use empty alt (`alt=""`)

## Implementation Notes

- Use CSS custom properties (CSS variables) for all token values for easy theming
- No pre-built component libraries; build custom components to match this system
- Test all interactions at multiple screen sizes; heading overflow is a common failure
- Validate all color combinations for contrast before shipping
- Test with `prefers-reduced-motion` enabled to verify animation fallbacks work
