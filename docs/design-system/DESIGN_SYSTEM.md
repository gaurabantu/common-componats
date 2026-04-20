# UX Governance — Developer Design System Reference
> **Version:** 1.0 | **Viewport:** Desktop-First 1440px | **Compliance:** WCAG 2.2 AA
> All hex values are reference examples. Implementation **must** use CSS variable tokens.

---

## 1. Font

| Property | Value |
|---|---|
| Family | `Inter` |
| Fallback Stack | `-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif` |
| Weights Used | 400 (Regular), 500 (Medium), 600 (Semi-Bold), 700 (Bold), 800 (Extra-Bold) |
| CSS Variable | `var(--font-family)` |
| Import | `@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');` |

---

## 2. Typography Scale

| Token | Size | Weight | Line-Height | Usage |
|---|---:|---:|---:|---|
| `--text-h1-size` | 32px | 800 | 1.5 | Page titles, hero headings |
| `--text-h2-size` | 25px | 800 | 1.5 | Section headers |
| H3 | 18px | 500 | 1.5 | Subsection headers |
| H4 | 16px | 500 | 1.5 | Card titles, labels |
| Body | 16px | 400 | 1.5 | Paragraph text |
| Secondary | 14px | 400 | 1.5 | Captions, helper text |
| Small / Caption | 12px | 400 | 1.5 | Timestamps, metadata |
| Micro | 10px | 600 | 1.2 | Badges, tracking labels |

---

## 3. Colour Tokens — Brand & Semantic

| Token | CSS Variable | Hex | Usage |
|---|---|---|---|
| color/brand/primary | `--color-brand-primary` | `#0D0D0D` | Primary brand colour, headers |
| color/brand/secondary | `--color-brand-secondary` | `#FF4D00` | Accent for interactive states, focus rings |
| color/brand/link | `--color-brand-link` | `#002475` | Linked text, navigational links |
| color/text/primary | `--color-text-primary` | `#0D0D0D` | Main body text |
| color/text/secondary | `--color-text-secondary` | `#757575` | Sub-headers, labels, secondary text |
| color/text/on-accent | `--color-text-on-accent` | `#0D0D0D` | Text on accent-10 backgrounds |
| color/bg/page | `--color-bg-page` | `#E0E0E0` | Default application background |
| color/bg/surface | `--color-bg-surface` | `#FFFFFF` | Cards, modals, workspaces |
| color/surface/mist | `--color-surface-mist` | `var(--color-mist-60)` (light) | Subtle neutral fills: badges, chips, muted status — **not** `--color-bg-page` |
| color/interactive/row-hover | `--color-interactive-row-hover` | `var(--color-mist-20)` (light) | List/table row hover on `--color-bg-surface`; dark themes override in `tokens.css` |
| color/border/default | `--color-border-default` | `#999999` | Standard UI borders (inputs, cards, tables, popovers) |
| color/border/subtle | `--color-border-subtle` | `var(--color-mist-60)` (light) | Decorative separators: modal header/footer rules, card footer, tabs underline, button-group hairline, default `Divider`; softer than `--color-border-default` (see Modal §) |
| color/state/success | `--color-state-success` | `#28A745` | Positive status, success feedback |
| color/state/warning | `--color-state-warning` | `#FFC107` | Alerts, non-critical warnings |
| color/state/error | `--color-state-error` | `#DC3545` | Critical errors, destructive actions |

### Themes (`tokens.css`)

| Variant | How to enable | Summary |
|--------|----------------|---------|
| Classic blue (light) — default | No attribute needed; or `data-theme="blue"` / class `theme-blue` on `<html>` (same tokens as `:root`) | Gray page, neutral borders, blue primary (`#2563EB`), noir/lavender accents. |
| Green (light) | `data-theme="green"` or class `theme-green` | Green primary CTA uses `--color-theme-primary` `#15803D`, hover `#166534`, active `#14532D`, disabled `#86EFAC`. Mint page (`#ecfdf5`), teal text. |
| Green (dark) | `data-theme="green-dark"` or class `theme-green-dark` | Deep teal surfaces; lighter emerald primary with dark label text. |
| Dark (neutral / blue CTA) | `data-theme="dark"` or class `dark` | Slate surfaces; blue primary tokens. |

Do **not** combine conflicting `data-theme` values on the same root. For dark + green brand, use **`green-dark`**.

Primary **focus rings** stay `#FF4D00` in the green light theme so keyboard focus stays highly visible (WCAG 2.2 AA).

---

## 4. Colour Families

### Core Noir (Black Family)
| Variation | Hex | RGB | Usage |
|---|---|---|---|
| Noir-100 | `#0D0D0D` | R:13 G:13 B:13 | Primary text, main backgrounds |
| Noir-80 | `#323232` | R:50 G:50 B:50 | Secondary backgrounds, hover |
| Noir-60 | `#666666` | R:102 G:102 B:102 | Disabled elements, tertiary text |
| Noir-40 | `#999999` | R:153 G:153 B:153 | Borders, dividers |
| Noir-20 | `#CCCCCC` | R:204 G:204 B:204 | Light borders, subtle backgrounds |

### Neutron Ash (Gray Family)
| Variation | Hex | RGB | Usage |
|---|---|---|---|
| Gray-100 | `#4A4A4A` | R:74 G:74 B:74 | Secondary text emphasis |
| Gray-80 | `#757575` | R:117 G:117 B:117 | Primary secondary text, labels |
| Gray-60 | `#A0A0A0` | R:160 G:160 B:160 | Placeholder text, hints |
| Gray-40 | `#CCCCCC` | R:204 G:204 B:204 | Light dividers, inactive states |
| Gray-20 | `#E8E8E8` | R:232 G:232 B:232 | Subtle background tint |

### Ion Mist (Light Gray Family)
| Variation | Hex | RGB | Usage |
|---|---|---|---|
| Mist-100 | `#D9D9D9` | R:217 G:217 B:217 | Card borders, strong dividers |
| Mist-80 | `#E0E0E0` | R:224 G:224 B:224 | Card backgrounds, overlays |
| Mist-60 | `#EDEDED` | R:237 G:237 B:237 | Primary surface colour |
| Mist-40 | `#F5F5F5` | R:245 G:245 B:245 | Slight background tint |
| Mist-20 | `#FAFAFA` | R:250 G:250 B:250 | Almost white surfaces |

---

## 5. Accent Colours

| Token | CSS Variable | Hex-10 | Hex-40 | Allowed Usage |
|---|---|---|---|---|
| color/accent/lavender-10 | `--color-accent-lavender-10` | `#EEE7FF` | `#B9A7FF` | Avatar bg, row highlight |
| color/accent/lavender-40 | `--color-accent-lavender-40` | `#B9A7FF` | `#B9A7FF` | Selected outline, avatar ring |
| color/accent/sky-10 | `--color-accent-sky-10` | `#E6F2FF` | `#A0D2FF` | Info badges, avatar bg |
| color/accent/mint-10 | `--color-accent-mint-10` | `#E9FFF4` | `#A0E7C4` | Success-support badges, avatar bg |
| color/accent/amber-10 | `--color-accent-amber-10` | `#FFF6DD` | `#FFD966` | Warning-support tag bg |
| color/accent/rose-10 | `--color-accent-rose-10` | `#FFE9EC` | `#FFB3BD` | Error-support tags and badges |

> **Rule:** Accent colours must not be used for page backgrounds, headers, primary buttons, or navigation. Use only as contained component styling inside the main content area.

---

## 6. Spacing — 8pt Grid

| Token | CSS Variable | Value | Usage Example |
|---|---|---:|---|
| space-1 | `--space-1` | 8px | Tight padding, icon gaps |
| space-2 | `--space-2` | 16px | Standard padding, input padding |
| space-3 | `--space-3` | 24px | Card padding, section gaps |
| space-4 | `--space-4` | 32px | Large section spacing |
| space-5 | `--space-5` | 40px | Page margin, hero spacing |
| space-6 | `--space-6` | 48px | Major section separation |
| space-7 | `--space-7` | 56px | Oversized gaps |
| space-8 | `--space-8` | 64px | Maximum standard spacing |

> **Grid:** 12-column layout. Gutter: `--grid-gutter: 24px`. All spacing must be 8px increments.

---

## 7. Corner Radii

| Token | CSS Variable | Value | Usage |
|---|---|---:|---|
| radius/xs | `--radius-xs` | 2px | Badges, chips, tags |
| radius/sm | `--radius-sm` | 3px | Small interactive elements |
| radius/base | `--radius-base` | 4px | Inputs, small cards |
| radius/md | `--radius-md` | 6px | Buttons |
| radius/lg | `--radius-lg` | 8px | Cards, modals, panels |
| radius/card | `--radius-card` | 10px | Large cards, containers |
| circular | — | 50% | Avatars, status dots |

---

## 8. Drop Shadows

| Token | CSS Value | Usage |
|---|---|---|
| shadow/none | `none` | Flat surfaces, border-only separation |
| shadow/xs | `0 1px 2px rgba(0,0,0,0.06)` | List-item hover, badges, chips |
| shadow/sm | `0 2px 8px rgba(0,0,0,0.08)` | Content cards, input focus |
| shadow/md | `0 4px 16px rgba(0,0,0,0.10)` | Dropdowns, popovers, date-pickers |
| shadow/lg | `0 8px 32px rgba(0,0,0,0.12)` | Modals, side-drawers, palettes |
| shadow/xl | `0 16px 48px rgba(0,0,0,0.16)` | Full-screen overlays |

---

## 9. Stroke & Border Weight

| Token | CSS Value | Usage |
|---|---|---|
| border/none | `0px` | Elements separated by bg colour or shadow |
| border/thin | `1px solid` | Decorative dividers, separators |
| border/default | `1.5px solid` | Input fields, selects, textareas |
| border/medium | `2px solid` | Focus rings, active tabs, selected states |
| border/thick | `3px solid` | High-emphasis focus, critical error fields |

> Interactive borders should use accessible contrast. Decorative dividers can be lighter.

---

## 10. Button States

### Primary (Fill)
| State | Background | Border | Text | Focus Ring |
|---|---|---|---|---|
| Default | `#0D0D0D` | `#0D0D0D` | `#FFFFFF` | — |
| Hover | `#1A1A1A` | `#1A1A1A` | `#FFFFFF` | — |
| Active | `#000000` | `#000000` | `#FFFFFF` | — |
| Focus | `#0D0D0D` | `#0D0D0D` | `#FFFFFF` | `#FF4D00` |
| Disabled | `#2B2B2B` | `#2B2B2B` | `#B3B3B3` | — |

### Secondary (Outline)
| State | Background | Border | Text |
|---|---|---|---|
| Default | `#FFFFFF` | `1.5px #0D0D0D` | `#0D0D0D` |

### Ghost (Transparent)
| State | Background | Text |
|---|---|---|
| Default | `transparent` | `#0D0D0D` |

> Minimum touch target: 44x44px. Radius: `--radius-md`.

### CSS Variables (Primary Button)
```css
--button-primary-default-bg:    #0D0D0D;
--button-primary-default-text:  #FFFFFF;
--button-primary-hover-bg:      #1A1A1A;
--button-primary-active-bg:     #000000;
--button-primary-disabled-bg:   #2B2B2B;
--button-primary-disabled-text: #B3B3B3;
--button-primary-focus-ring:    #FF4D00;
```

---

## 11. Icon System

| Property | Value |
|---|---|
| Library | **Lucide** (outline style) |
| Stroke Width | 1.5–2px |
| Size — Dense | 16px |
| Size — UI Default | 20px |
| Size — Primary | 24px |
| Colour | `currentColor` |

---

## 12. Grid System

| Property | Value |
|---|---|
| Columns | `--grid-columns: 12` |
| Gutter | `--grid-gutter: 24px` |
| Breakpoint | Desktop-first: 1440px |
| Unit | 8px increments |

---

## 13. Accessibility — WCAG 2.2 AA

| Requirement | Standard |
|---|---|
| Text contrast | >= 4.5:1 against background |
| Non-text UI contrast | >= 3:1 |
| Focus indicator | 2px minimum visible outline |
| Focus appearance | 2px outline offset, >= 3:1 contrast |
| Touch target | >= 44x44px |
| Colour-only indicators | Never; pair with shape/text/weight |

---

## 14. Full CSS Variable Map

Use the library token system as the source of truth. Refer to `README.md` for the current token blocks already exported by the library, including:

- brand, text, background, border, state, and accent tokens
- primary button tokens
- spacing tokens
- radius tokens
- typography tokens
- grid tokens
- shadow tokens
- dark mode overrides
# UX Governance Design System

> **Version:** 2.0.0 | **Updated:** 2026-04-01 | **Compliance:** WCAG 2.2 AA | **Platforms:** Web (Desktop-First 1440px) · Mobile App (iOS & Android) · Responsive Web
>
> **Purpose:** This is the single source of truth for all UI/UX decisions across our product ecosystem. Every developer, product manager, designer, and AI agent (Claude, Anythink, Stitch, etc.) must reference this document when generating FRDs, building components, creating mockups, or reviewing designs. If it's not in this document, it doesn't ship.

---

## How to Use This Document

**For Developers:** Use the token tables and CSS variable references to implement components. Every value has a token — never hard-code hex, px, or font values directly. Copy the CSS variables block (Section 25) into your project root.

**For Product Managers:** Use the component rules, spacing system, and governance rules to write accurate FRDs. When describing a button, reference "Primary Fill button (Section 19)" not "a black button." When specifying spacing, say "space-3 (24px) padding" not "some padding."

**For AI Agents (Claude / Stitch / Codegen):** When generating code, designs, or FRDs from this system — always use token names, never raw values. Follow the platform-specific adaptation rules in Section 28. Respect the "Do / Don't" rules as hard constraints, not suggestions.

**For Designers:** Use the colour families, typography composites, and component states as your Figma/Sketch source of truth. All accent colours are contained-use only. All shadows are semantic. One Primary Fill button per screen.

---

## Table of Contents

1. [Design Principles](#1-design-principles)
2. [Font Family](#2-font-family)
3. [Font Size](#3-font-size)
4. [Font Weight](#4-font-weight)
5. [Line Height](#5-line-height)
6. [Typography Composites](#6-typography-composites)
7. [Spacing — 8pt Grid](#7-spacing--8pt-grid)
8. [Sizing](#8-sizing)
9. [Border Radius](#9-border-radius)
10. [Border Width](#10-border-width)
11. [Border Colour](#11-border-colour)
12. [Opacity](#12-opacity)
13. [Box Shadow](#13-box-shadow)
14. [Colour — Brand & Semantic](#14-colour--brand--semantic)
15. [Colour Families](#15-colour-families)
16. [Accent Colours](#16-accent-colours)
17. [Z-Index Scale](#17-z-index-scale)
18. [Animation & Motion](#18-animation--motion)
19. [Button States](#19-button-states)
20. [Button Size System](#20-button-size-system)
21. [Action Hierarchy Rules](#21-action-hierarchy-rules)
22. [Layout Composition Rules](#22-layout-composition-rules)
23. [Visual Hierarchy & AI Enforcement Rules](#23-visual-hierarchy--ai-enforcement-rules)
24. [Switch / Toggle](#24-switch--toggle)
25. [Form Inputs](#25-form-inputs)
26. [Cards](#26-cards)
27. [Modal / Dialog](#27-modal--dialog)
28. [Icon System](#28-icon-system)
29. [Grid System](#29-grid-system)
30. [Responsive Breakpoints](#30-responsive-breakpoints)
31. [Accessibility — WCAG 2.2 AA](#31-accessibility--wcag-22-aa)
32. [Platform-Specific Adaptation Rules](#32-platform-specific-adaptation-rules)
33. [Navigation Patterns](#33-navigation-patterns)
34. [Empty States & Loading States](#34-empty-states--loading-states)
35. [Feedback & Notifications](#35-feedback--notifications)
36. [CSS Variables Reference](#36-css-variables-reference)
37. [Governance Rules Summary](#37-governance-rules-summary)
38. [Persistent Primary CTA After Hero Exit — Web Only](#38-persistent-primary-cta-after-hero-exit--web-only)
39. [CTA Button Background Contrast Rule](#39-cta-button-background-contrast-rule)
40. [FRD Generation Cheatsheet](#40-frd-generation-cheatsheet)
41. [Component Naming Convention](#41-component-naming-convention)
42. [Theme System — Interaction Layer Colour Override](#42-theme-system--interaction-layer-colour-override)

---

## 1. Design Principles

These five principles govern every decision. When two rules conflict, higher-numbered principles yield to lower-numbered ones.

1. **Accessibility First** — WCAG 2.2 AA is the floor, not the ceiling. Every interactive element must be keyboard-navigable, screen-reader-friendly, and meet contrast ratios.
2. **Token-Driven** — No magic numbers. Every colour, size, spacing, radius, and shadow has a token. Components consume tokens, never raw values.
3. **Platform-Coherent, Not Platform-Identical** — Web, iOS, and Android share the same design language (colour, typography, spacing grid) but respect platform-native patterns for navigation, gestures, and system UI.
4. **Density Before Decoration** — Favour information density and scannability over decorative whitespace. Desktop-first: density > efficiency > scannability > professionalism.
5. **Constrained Creativity** — Accent colours, shadows, and radii have strict usage rules. Creative expression happens within the system, not around it.

---

## 2. Font Family

| Token | Value | Rule |
|-------|-------|------|
| `--font-family` | `'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif` | **Only typeface allowed.** No other font is permitted anywhere in the product. |

**Web Import:**
```css
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');
```

**Mobile (iOS):** Bundle Inter via asset catalog. Fallback: SF Pro Display.
**Mobile (Android):** Bundle Inter via res/font. Fallback: Roboto.

The system font stack (`-apple-system`, `BlinkMacSystemFont`, `Segoe UI`) is the fallback chain — it should never be visible to users if assets load correctly.

---

## 3. Font Size

| Token | px | rem | Usage |
|-------|-----|------|-------|
| `--text-h1-size` | `32px` | `2rem` | Page titles, hero headings |
| `--text-h2-size` | `25px` | `1.5625rem` | Section headers |
| `--text-h3-size` | `18px` | `1.125rem` | Subsection headers |
| `--text-h4-size` | `16px` | `1rem` | Card titles, labels |
| `--text-body-size` | `16px` | `1rem` | Paragraph text (base) |
| `--text-secondary-size` | `14px` | `0.875rem` | Captions, helper text, secondary info |
| `--text-caption-size` | `12px` | `0.75rem` | Timestamps, metadata, small labels |
| `--text-micro-size` | `10px` | `0.625rem` | Badges, tracking labels, dense metadata |

**Full type scale (px):** 8 · 10 · 12 · 14 · 16 · 18 · 20 · 22 · 24 · 26 · 28 · 30 · 32

**Rule:** On mobile screens (<768px), H1 scales down to 26px and H2 to 22px. Body text remains 16px (never go below 14px on mobile for readability).

---

## 4. Font Weight

| Token | Value | Usage |
|-------|-------|-------|
| `--weight-regular` | `400` | Body text, secondary text, captions |
| `--weight-medium` | `500` | H3, H4, labels, buttons, nav items |
| `--weight-semibold` | `600` | Emphasis, micro badges, code labels |
| `--weight-bold` | `700` | Section sub-headers, card titles |
| `--weight-extrabold` | `800` | H1, H2, page-level headers only |

**Rule:** Never use weight 800 for anything other than H1 and H2. If a PM specifies "bold heading" in an FRD, map it to 700 for card titles or 800 for page headers — nothing else.

---

## 5. Line Height

| Token | Value | Usage |
|-------|-------|-------|
| `--leading-body` | `1.5` | Default for body text, H1–H4, inputs, buttons |
| `--leading-micro` | `1.2` | Badges, micro labels, dense metadata |
| `--leading-tight` | `1` | Type scale display specimens only (never in production UI) |

---

## 6. Typography Composites

These are the only valid text style combinations. Do not mix-and-match outside this table.

| Style | Font | Size | Weight | Line Height | Platform Notes |
|-------|------|------|--------|-------------|----------------|
| H1 | Inter | 32px | 800 | 1.5 | Mobile: 26px |
| H2 | Inter | 25px | 800 | 1.5 | Mobile: 22px |
| H3 | Inter | 18px | 500 | 1.5 | — |
| H4 | Inter | 16px | 500 | 1.5 | — |
| Body | Inter | 16px | 400 | 1.5 | — |
| Secondary | Inter | 14px | 400 | 1.5 | — |
| Caption | Inter | 12px | 400 | 1.5 | — |
| Micro | Inter | 10px | 600 | 1.2 | Mobile: minimum 11px |

---

## 7. Spacing — 8pt Grid

All spacing must be multiples of 8px. No arbitrary values. No exceptions.

| Token | Value | Usage |
|-------|-------|-------|
| `--space-0` | `4px` | Micro-gap (icon-to-text inside a button, tight inline elements) |
| `--space-1` | `8px` | Tight padding, icon gaps, inline spacing |
| `--space-2` | `16px` | Standard padding, input internal padding |
| `--space-3` | `24px` | Card padding, section gaps, grid gutter |
| `--space-4` | `32px` | Large section spacing |
| `--space-5` | `40px` | Page margin, hero spacing |
| `--space-6` | `48px` | Major section separation |
| `--space-7` | `56px` | Oversized gaps |
| `--space-8` | `64px` | Maximum standard spacing |

**Note:** `--space-0` (4px) is the only sub-8px value allowed, strictly for micro-adjustments within components (e.g., gap between icon and label inside a button). It is not a general-purpose spacing token.

**FRD Language:** When writing an FRD, always use token names: "Card content area uses `space-3` padding" — never "24px padding" or "some padding."

---

## 8. Sizing

| Token | Value | Usage |
|-------|-------|-------|
| `--size-icon-dense` | `16px` | Inline text icons, metadata, dense contexts |
| `--size-icon-ui` | `20px` | Buttons, form controls (default icon size) |
| `--size-icon-primary` | `24px` | Navigation, key actions, hero icons |
| `--size-icon-large` | `32px` | Empty states, feature highlights |
| `--size-avatar-dense` | `32px` | Dense avatar in list rows |
| `--size-avatar-standard` | `40px` | Standard avatar in content areas |
| `--size-touch-target` | `44px` | WCAG minimum touch/click target |
| `--size-sidebar` | `320px` | Application sidebar navigation width (web desktop) |
| `--size-viewport-desktop` | `1440px` | Desktop-first breakpoint |
| `--size-indicator-bar` | `4px` | Left indicator bar width in content list cards |
| `--size-status-dot` | `8px` | Status indicator dot |
| `--size-bottom-nav-height` | `56px` | Mobile bottom navigation bar height |
| `--size-app-bar-height` | `56px` | Mobile app bar / top bar height |

---

## 9. Border Radius

| Token | Value | Usage |
|-------|-------|-------|
| `--radius-xs` | `2px` | Badges, chips, tags, indicator bars |
| `--radius-sm` | `3px` | Small interactive elements |
| `--radius-base` | `4px` | Inputs, small cards, dropdown menus |
| `--radius-md` | `6px` | Buttons (standard button radius) |
| `--radius-lg` | `8px` | Cards, modals, panels, large ,Table,buttons |
| `--radius-card` | `10px` | Large cards, containers |
| `--radius-circle` | `50%` | Avatars, status dots (circular only) |
| `--radius-pill` | `9999px` | Switch tracks, pill badges, FABs |

**Rules:**
- Buttons & inputs: only 2, 3, 4, 6, or 8px
- Cards & modals: only 4, 8, or 10px
- Never exceed 8px for standard rectangular UI. Only `50%` for circles and `9999px` for pills.
- Mobile bottom sheets use `--radius-card` (10px) on top corners only.

---

## 10. Border Width

| Token | Value | Usage | WCAG |
|-------|-------|-------|------|
| `--border-none` | `0px` | Elements separated by bg colour or shadow | — |
| `--border-thin` | `1px` | Decorative dividers, separators, table rules | Decorative only |
| `--border-default` | `1.5px` | Input fields, selects, textareas, toggles, switches | SC 1.4.11 (≥3:1) |
| `--border-medium` | `2px` | Focus rings, active tabs, selected states, avatar rings | SC 2.4.7 |
| `--border-thick` | `3px` | High-emphasis keyboard focus, critical errors | SC 2.4.13 |

**Contrast Rule:**
- `#999999` on `#FFFFFF` = 2.85:1 → decorative dividers only
- `#757575` on `#FFFFFF` = 4.6:1 → interactive component boundaries
- `#0D0D0D` on `#FFFFFF` = 18.9:1 → high-contrast borders

---

## 11. Border Colour

| Token | Value | Usage |
|-------|-------|-------|
| `--color-border-default` | `#999999` | Standard UI borders and dividers (Noir-40) |
| `--color-border-interactive` | `#757575` | Interactive component borders (≥3:1 on white) |
| `--color-border-strong` | `#0D0D0D` | High-contrast interactive borders |
| `--color-border-focus` | `#FF4D00` | Primary focus ring (keyboard/mouse) |
| `--color-border-selected` | `#B9A7FF` | Selected state outline (Lavender-40) |
| `--color-border-error` | `#DC3545` | Critical error field border (3px thick) |

---

## 12. Opacity

| Token | Value | Usage |
|-------|-------|-------|
| `--opacity-disabled` | `0.5` | Disabled buttons, switches + `cursor: not-allowed` (web) / dimmed state (mobile) |
| `--opacity-shadow-xs` | `0.06` | `rgba(0,0,0,0.06)` |
| `--opacity-shadow-sm` | `0.08` | `rgba(0,0,0,0.08)` |
| `--opacity-shadow-md` | `0.10` | `rgba(0,0,0,0.10)` |
| `--opacity-shadow-lg` | `0.12` | `rgba(0,0,0,0.12)` |
| `--opacity-shadow-xl` | `0.16` | `rgba(0,0,0,0.16)` |
| `--opacity-overlay` | `0.5` | Modal/dialog backdrop overlay |
| `--opacity-dark-bg-ring` | `0.08` | `rgba(255,255,255,0.08)` replaces shadow on dark/coloured bg |
| `--opacity-sidebar-inactive` | `0.6` | Inactive subtitle text on dark headers |
| `--opacity-sidebar-desc` | `0.7` | Inactive description text on dark headers |

---

## 13. Box Shadow

Shadow colour is **always** `#000000` at varying opacity. Never tint shadows. Never stack shadow tokens.

| Token | CSS Value | Usage |
|-------|-----------|-------|
| `--shadow-none` | `none` | Flat surfaces separated by colour fill or 1px border |
| `--shadow-xs` | `0 1px 2px rgba(0,0,0,0.06)` | List-item hover lift, badges, chips, switch thumb |
| `--shadow-sm` | `0 2px 8px rgba(0,0,0,0.08)` | Content cards, input focus state |
| `--shadow-md` | `0 4px 16px rgba(0,0,0,0.10)` | Dropdown menus, popovers, tooltips |
| `--shadow-lg` | `0 8px 32px rgba(0,0,0,0.12)` | Modals, side-drawers, command palettes |
| `--shadow-xl` | `0 16px 48px rgba(0,0,0,0.16)` | Full-screen overlays, floating panels |

**Rules:**
- Elevation is **semantic**, not decorative: Card = `shadow-sm`, Dropdown = `shadow-md`, Modal = `shadow-lg`
- On dark/coloured backgrounds: use `1px border + rgba(255,255,255,0.08) inner ring` instead of shadows
- Never stack two shadow tokens on one element
- On mobile: shadows render slightly heavier — test on real devices

---

## 14. Colour — Brand & Semantic

### Brand

| Token | Hex | Usage |
|-------|-----|-------|
| `--color-brand-primary` | `#0D0D0D` | Primary brand, headers, key elements ("Core Noir") |
| `--color-brand-secondary` | `#FF4D00` | Interactive focus states, focus rings, emphasis |
| `--color-brand-link` | `#002475` | Linked text, navigational links (web only) |

### Text

| Token | Hex | Usage |
|-------|-----|-------|
| `--color-text-primary` | `#0D0D0D` | Main body text and primary content |
| `--color-text-secondary` | `#757575` | Sub-headers, labels, secondary text |
| `--color-text-on-accent` | `#0D0D0D` | Text on accent-10 backgrounds (avatars, badges) |
| `--color-text-disabled` | `#B3B3B3` | Disabled button/form text |
| `--color-text-on-primary` | `#FFFFFF` | Text on primary (dark) button backgrounds |
| `--color-text-on-primary-inverse` | `#0D0D0D` | Text on inverse (light) button backgrounds |
| `--color-text-link` | `#002475` | Hyperlink text colour (web); underline on hover |

### Background

| Token | Hex | Usage |
|-------|-----|-------|
| `--color-bg-page` | `#E0E0E0` | Default application background |
| `--color-bg-surface` | `#FFFFFF` | Card surfaces, modals, workspaces |
| `--color-surface-mist` | `var(--color-mist-60)` (light themes) | Subtle neutral fills; see §3 semantic table |
| `--color-interactive-row-hover` | `var(--color-mist-20)` (light themes) | Hover/focus background for rows on `--color-bg-surface` |
| `--color-bg-elevated` | `#FFFFFF` | Elevated surfaces (modals, popovers, bottom sheets) |
| `--color-bg-overlay` | `rgba(0,0,0,0.5)` | Modal/dialog backdrop |

### State

| Token | Hex | Usage |
|-------|-----|-------|
| `--color-state-success` | `#28A745` | Positive status, success feedback |
| `--color-state-warning` | `#FFC107` | Alerts, non-critical warnings |
| `--color-state-error` | `#DC3545` | Critical errors, destructive actions |
| `--color-state-info` | `#002475` | Informational messages, tips |

---

## 15. Colour Families

### Core Noir (Black Family) — Structural Backbone

| Variation | Hex | RGB | Usage |
|-----------|-----|-----|-------|
| Noir-100 | `#0D0D0D` | 13, 13, 13 | Primary text, main backgrounds |
| Noir-80 | `#323232` | 50, 50, 50 | Secondary backgrounds, hover states |
| Noir-60 | `#666666` | 102, 102, 102 | Disabled elements, tertiary text |
| Noir-40 | `#999999` | 153, 153, 153 | Borders, dividers |
| Noir-20 | `#CCCCCC` | 204, 204, 204 | Light borders, subtle backgrounds |

### Neutron Ash (Gray Family) — Communication Layer

| Variation | Hex | RGB | Usage |
|-----------|-----|-----|-------|
| Gray-100 | `#4A4A4A` | 74, 74, 74 | Secondary text emphasis |
| Gray-80 | `#757575` | 117, 117, 117 | Primary secondary text, labels |
| Gray-60 | `#A0A0A0` | 160, 160, 160 | Placeholder text, hints |
| Gray-40 | `#CCCCCC` | 204, 204, 204 | Light dividers, inactive states |
| Gray-20 | `#E8E8E8` | 232, 232, 232 | Subtle background tint |

### Ion Mist (Light Gray Family) — Surface & Separation

| Variation | Hex | RGB | Usage |
|-----------|-----|-----|-------|
| Mist-100 | `#D9D9D9` | 217, 217, 217 | Card borders, strong dividers |
| Mist-80 | `#E0E0E0` | 224, 224, 224 | Card backgrounds, overlays |
| Mist-60 | `#EDEDED` | 237, 237, 237 | Primary surface colour |
| Mist-40 | `#F5F5F5` | 245, 245, 245 | Slight background tint, code blocks |
| Mist-20 | `#FAFAFA` | 250, 250, 250 | Almost white surfaces, row stripe |

---

## 16. Accent Colours

> Accent colours must **NOT** be used for: page backgrounds, headers, primary buttons, or global navigation. Use only as **contained component styling** inside the main content area.

| Token | Tint (-10) | Border (-40) | Usage |
|-------|-----------|-------------|-------|
| Lavender | `#EEE7FF` | `#B9A7FF` | Avatar bg, row highlight, selected state |
| Sky | `#E6F2FF` | `#A0D2FF` | Info badges, avatar bg |
| Mint | `#E9FFF4` | `#A0E7C4` | Success-support badges, avatar bg |
| Amber | `#FFF6DD` | `#FFD966` | Warning-support tags |
| Rose | `#FFE9EC` | `#FFB3BD` | Error-support tags/badges |

**Pattern:** Pair `-10` tint background with `-40` border for controlled emphasis.
**Text on accent backgrounds:** Always `#0D0D0D`. Never white, never the accent colour itself.

**Accent Foreground Tokens (for badge/tag text on white backgrounds):**

| Token | Hex | Paired With |
|-------|-----|-------------|
| `--color-accent-lavender-fg` | `#5B36A3` | Lavender-10/40 badges |
| `--color-accent-sky-fg` | `#1A6BB5` | Sky-10/40 badges |
| `--color-accent-mint-fg` | `#1A7A4F` | Mint-10/40 badges |
| `--color-accent-amber-fg` | `#8A6D00` | Amber-10/40 badges |
| `--color-accent-rose-fg` | `#A3293D` | Rose-10/40 badges |

Use these for badge/tag label text when the badge needs to read on a white or near-white surface. On accent-10 tint backgrounds, use `#0D0D0D` as before.

---

## 17. Z-Index Scale

Consistent layering across platforms. Every positioned element must use a token from this scale.

| Token | Value | Usage |
|-------|-------|-------|
| `--z-base` | `0` | Default document flow |
| `--z-raised` | `10` | Cards with hover lift, sticky elements |
| `--z-dropdown` | `100` | Dropdown menus, popovers, tooltips |
| `--z-sticky` | `200` | Sticky headers, persistent nav bars |
| `--z-drawer` | `300` | Side drawers, mobile slide-out panels |
| `--z-modal` | `400` | Modals, dialog overlays |
| `--z-toast` | `500` | Toast notifications, snackbars |
| `--z-tooltip-top` | `600` | Tooltips that must overlay modals |

**Rule:** Never use arbitrary z-index values like `999` or `9999`. If a component doesn't fit these tiers, the layout is wrong — fix the stacking context, not the number.

---

## 18. Animation & Motion

| Token | Value | Usage |
|-------|-------|-------|
| `--duration-instant` | `100ms` | Colour changes, opacity shifts |
| `--duration-fast` | `200ms` | Button state changes, hover effects |
| `--duration-normal` | `300ms` | Modals, dropdowns, panel slides |
| `--duration-slow` | `500ms` | Page transitions, complex animations |
| `--easing-default` | `cubic-bezier(0.4, 0, 0.2, 1)` | Standard easing (Material-aligned) |
| `--easing-enter` | `cubic-bezier(0, 0, 0.2, 1)` | Elements entering the viewport |
| `--easing-exit` | `cubic-bezier(0.4, 0, 1, 1)` | Elements leaving the viewport |

**Rules:**
- Always respect `prefers-reduced-motion: reduce` — disable all non-essential animation
- Mobile: favour slide transitions for navigation; fade for content changes
- Never animate colour alone as a state indicator (accessibility)
- Loading spinners must include `aria-label="Loading"` or equivalent

---

## 19. Button States

### Primary (Fill) — Maximum 1 per screen

| State | Background | Border | Text | Focus Ring |
|-------|-----------|--------|------|------------|
| Default | `#0D0D0D` | `#0D0D0D` | `#FFFFFF` | — |
| Hover | `#1A1A1A` | `#1A1A1A` | `#FFFFFF` | — |
| Active/Pressed | `#000000` | `#000000` | `#FFFFFF` | — |
| Focus | `#0D0D0D` | `#0D0D0D` | `#FFFFFF` | `#FF4D00` 2px offset |
| Disabled | `#2B2B2B` | `#2B2B2B` | `#B3B3B3` | — (50% opacity) |
| Loading | `#0D0D0D` | `#0D0D0D` | spinner `#FFFFFF` | — |

### Secondary (Outlined)

| State | Background | Border | Text |
|-------|-----------|--------|------|
| Default | `#FFFFFF` | `1.5px solid #0D0D0D` | `#0D0D0D` |
| Hover | `#F5F5F5` | `2px solid #0D0D0D` | `#0D0D0D` |
| Disabled | `transparent` | `2px solid #E0E0E0` | `#B3B3B3` (50% opacity) |

### Ghost (Transparent)

| State | Background | Border | Text |
|-------|-----------|--------|------|
| Default | `transparent` | `2px solid transparent` | `#0D0D0D` |
| Hover | `#F5F5F5` | `2px solid transparent` | `#0D0D0D` |
| Disabled | `transparent` | `2px solid transparent` | `#B3B3B3` (50% opacity) |

### Destructive (Error Action)

| State | Background | Border | Text |
|-------|-----------|--------|------|
| Default | `#DC3545` | `#DC3545` | `#FFFFFF` |
| Hover | `#C82333` | `#C82333` | `#FFFFFF` |
| Disabled | `#DC3545` at 50% opacity | — | `#FFFFFF` at 50% opacity |

### Button Rules (All Platforms)
- **Primary Fill:** Maximum 1 per screen. The single most important action.
- **Hierarchy:** Fill → Outlined → Ghost → Destructive (for dangerous actions only)
- **Icon size:** Always 20px (`--size-icon-ui`) inside buttons
- **Focus ring:** Always `#FF4D00`. Never change. Never remove.
- **Disabled:** 50% opacity + `cursor: not-allowed` (web) / dimmed + non-tappable (mobile)
- **Min touch target:** 44×44px on all platforms
- **Radius:** `--radius-md` (6px) is default. Allowed: 2, 3, 4, 6, 8px.
- **Loading state:** Replace label text with a spinner; keep button width stable (no layout shift).
- **Mobile:** Buttons in bottom action areas should be full-width at screen edge minus `--space-2` margin.

---

## 20. Button Size System

Buttons have three fixed height tiers tied directly to action hierarchy. Never mix sizes arbitrarily.

| Token | Height | Usage | Hierarchy |
|-------|--------|-------|-----------|
| `--button-height-lg` | `44px` | Primary actions — the single most important CTA on screen | Primary |
| `--button-height-md` | `40px` | Secondary actions — supporting actions alongside the primary | Secondary |
| `--button-height-sm` | `36px` | Tertiary actions — low-priority, supplementary actions | Tertiary |

### Size-to-Style Mapping

| Tier | Height | Style | Alignment |
|------|--------|-------|-----------|
| Primary | 44px (lg) | Fill (`#0D0D0D`) | Left-aligned in action row |
| Secondary | 40px (md) | Outlined | Right-aligned, grouped together |
| Tertiary | 36px (sm) | Ghost | Right-aligned, lowest visual weight |

**Rules:**
- Primary button is ALWAYS 44px (lg). This also satisfies the WCAG touch target minimum.
- Never use `--button-height-lg` for a secondary or tertiary action.
- Never use `--button-height-sm` for a primary action.
- All three tiers must maintain minimum 44×44px tappable area (small buttons add invisible padding on mobile).

---

## 21. Action Hierarchy Rules

> **Rule Type:** UX Governance Rule | **Applies To:** Every screen across all platforms.

Every screen must have a clear, unambiguous action hierarchy. If a user cannot instantly identify the primary action, the hierarchy is broken.

### The Rules

1. **Every screen MUST have exactly ONE Primary Action.** No exceptions. If you have two equally important actions, one of them isn't primary — demote it.
2. **Primary action MUST be visually dominant:**
   - Largest size (`--button-height-lg`, 44px)
   - Highest contrast (Fill style, Core Noir `#0D0D0D`)
   - Left-aligned in the action row
3. **Secondary actions:**
   - Grouped together in a single cluster
   - Right-aligned in the action row
   - Use Outlined style (`--button-height-md`, 40px)
4. **Tertiary actions:**
   - Use Ghost style (`--button-height-sm`, 36px)
   - Lowest visual weight — should not draw attention
5. **If multiple actions compete visually → reduce to 1 primary only.** If two buttons look equally important, the hierarchy is wrong. Fix it before shipping.

### Do
- Assign one clear primary action per screen before designing anything else
- Make the primary action the first scannable element in the action area
- Group all secondary actions together, visually separated from the primary
- Use size + style + position together to reinforce hierarchy

### Don't
- Do not place two Fill-style buttons on the same screen
- Do not make secondary buttons the same size as the primary
- Do not scatter actions across the screen — group them in a dedicated action row
- Do not rely on colour alone to differentiate hierarchy — size and position must also differ

---

## 22. Layout Composition Rules

> **Rule Type:** UX Governance Rule | **Applies To:** All screens with inputs + actions (forms, filters, search, toolbars).

Inputs and actions must live in separate visual rows. Mixing them in a single row creates ambiguous hierarchy and cluttered layouts.

### Standard Layout Pattern

```
┌─────────────────────────────────────────────────┐
│  Row 1: Inputs / Filters                        │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐      │
│  │ Input A  │  │ Input B  │  │ Select C │      │
│  └──────────┘  └──────────┘  └──────────┘      │
├─────────────────────────────────────────────────┤
│  Row 2: Actions                                  │
│  ┌──────────┐              ┌────────┐┌────────┐ │
│  │ Primary  │              │ Sec. A ││ Sec. B │ │
│  │  (Fill)  │              │(Outl.) ││(Outl.) │ │
│  └──────────┘              └────────┘└────────┘ │
│  ← Left                            Right →      │
└─────────────────────────────────────────────────┘
```

### The Rules

1. **Inputs and actions MUST be in separate rows.** Never place a button inline with an input field in the same row (search bars with an attached button are the only exception).
2. **Row 1 = Inputs / Filters:** All user input fields, dropdowns, date pickers, search fields.
3. **Row 2 = Actions:** All buttons and action triggers.
4. **Action Row Alignment:**
   - Primary CTA → left-aligned (first thing the eye hits in LTR layouts)
   - Secondary actions → right-aligned as a grouped cluster
5. **Do NOT place all controls (inputs + buttons) in a single row.** This flattens the hierarchy and makes scanning difficult.
6. **Spacing between rows:**
   - Between input row and action row: `--space-3` (24px)
   - Between individual inputs: `--space-2` (16px)
   - Between grouped secondary buttons: `--space-1` (8px)

### Mobile Adaptation
- Input rows stack vertically (one input per row, full width)
- Action row: Primary button full-width, secondary buttons below as a row
- Spacing between stacked inputs: `--space-2` (16px)

---

## 23. Visual Hierarchy & AI Enforcement Rules

> **Rule Type:** AI Governance Rule | **Applies To:** All AI-generated UI (Claude Code, Stitch, Codegen, or any automated tool).

These rules ensure that AI tools produce layouts with correct visual hierarchy every time, without human intervention for basic structure.

### Visual Hierarchy Priority (Highest → Lowest)

```
1. Primary CTA        → Largest, highest contrast, left-aligned
2. Input Fields        → Standard size, neutral borders
3. Secondary Actions   → Medium size, outlined, right-aligned
4. Tertiary Actions    → Small size, ghost, lowest weight
5. Labels / Metadata   → Smallest text, secondary colour
```

### Visual Weight Is Controlled By (In Order)

1. **Size** — larger elements draw more attention
2. **Colour contrast** — higher contrast against background = more weight
3. **Spacing** — more surrounding whitespace = more prominence
4. **Position** — top-left (LTR) is scanned first

**Rule:** If two elements on the same screen appear to have equal visual weight, the hierarchy is incorrect. One must be visually dominant.

### AI Generation Rules — MANDATORY

When any AI tool generates UI from this design system:

1. **Assign one Primary CTA before starting layout generation.** The primary action must be decided first — everything else flows from it.
2. **Apply layout structure rules (Section 22) BEFORE applying styles.** Structure first, then tokens.
3. **Do not infer hierarchy from context.** Follow the defined rules strictly — the AI must not guess which button should be primary based on label text.
4. **Do not place multiple high-emphasis (Fill) buttons on one screen.** If the prompt asks for two primary buttons, use one Fill + one Outlined.
5. **Always group secondary actions together** in a right-aligned cluster in the action row.
6. **Validate all spacing against 8pt grid tokens.** If a generated value is not in the `--space-*` scale, replace it with the nearest valid token.
7. **Reject layouts that violate hierarchy or grouping rules.** If the generated layout places inputs and actions in the same row, restructure into separate rows before outputting.

### AI Verification Checklist

After generating any UI, the AI must self-check:
- [ ] Exactly 1 Primary Fill button on screen?
- [ ] Primary is largest (44px), left-aligned in action row?
- [ ] Secondary buttons are grouped, right-aligned, Outlined style?
- [ ] Inputs and actions are in separate rows?
- [ ] All spacing values are valid 8pt grid tokens?
- [ ] Visual weight follows the priority order above?
- [ ] No two elements compete for equal visual dominance?

### Layout Template — Standard Filter/Action Screen

```
┌─────────────────────────────────────────┐
│  Page Title (H1)                        │
├─────────────────────────────────────────┤
│  Filters Row                            │
│  [ Input ] [ Input ] [ Dropdown ]       │
│                                  24px ↕ │
│  Actions Row                            │
│  [ ■ Primary CTA ]    [ Sec A ][ Sec B ]│
│    ← Left                    Right →    │
├─────────────────────────────────────────┤
│  Content Area                           │
│  (Cards / Table / List)                 │
└─────────────────────────────────────────┘
```

---

## 24. Switch / Toggle

### Track & Thumb Tokens

| Property | Token | Value |
|----------|-------|-------|
| Track (On) | `--switch-track-on` | `#0D0D0D` |
| Track (Off) | `--switch-track-off` | `#E0E0E0` |
| Thumb | `--switch-thumb` | `#FFFFFF` |
| Border (On) | `--switch-border-on` | `#0D0D0D` 1.5px |
| Border (Off) | `--switch-border-off` | `#999999` 1.5px |
| Focus Ring | `--switch-focus-ring` | `#FF4D00` 2px, 2px offset |
| Disabled | — | 50% opacity + `cursor: not-allowed` |

### Size Variants

| Size | Track | Thumb | Usage | Meets 44px? |
|------|-------|-------|-------|-------------|
| Small (sm) | 36×20px | 14px | Dense tables, settings lists | No — add padding to reach 44px tap area |
| Default (md) | 44×24px | 18px | Forms, standard UI | Yes |
| Large (lg) | 56×32px | 24px | Mobile / accessibility emphasis | Yes |

### Accent Colour Variants (contained areas only)

| Variant | On Track | Off Track |
|---------|---------|----------|
| Lavender | `#B9A7FF` | `#EEE7FF` |
| Sky | `#A0D2FF` | `#E6F2FF` |
| Mint | `#A0E7C4` | `#E9FFF4` |
| Amber | `#FFD966` | `#FFF6DD` |
| Rose | `#FFB3BD` | `#FFE9EC` |

### Semantic State Variants

| Variant | On Track | Off Track |
|---------|---------|----------|
| Success | `#28A745` | `#E9FFF4` |
| Warning | `#FFC107` | `#FFF6DD` |
| Error | `#DC3545` | `#FFE9EC` |

### Switch Rules
- Use primary `#0D0D0D` track for structural/navigation toggles
- Accent colour tracks only inside contained content areas
- Always pair with clear text labels — never use a standalone switch
- Use `role="switch"` + `aria-checked` for web screen readers
- iOS: use native `UISwitch` styled to match tokens; Android: use `MaterialSwitch` styled to match tokens
- Off-state border: `#999999` 1.5px is **required**
- Do not mix switch sizes within the same settings group
- Switches are for instant toggles — use buttons for confirmation-required actions

---

## 25. Form Inputs

### Text Input / Textarea / Select

| State | Background | Border | Text | Placeholder |
|-------|-----------|--------|------|-------------|
| Default | `#FFFFFF` | `1.5px solid #999999` | `#0D0D0D` | `#A0A0A0` |
| Hover | `#FFFFFF` | `1.5px solid #757575` | `#0D0D0D` | `#A0A0A0` |
| Focus | `#FFFFFF` | `2px solid #0D0D0D` | `#0D0D0D` | `#A0A0A0` |
| Error | `#FFFFFF` | `3px solid #DC3545` | `#0D0D0D` | — |
| Disabled | `#F5F5F5` | `1.5px solid #CCCCCC` | `#B3B3B3` | `#CCCCCC` |

### Form Rules
- Labels: always **above** the input (top-aligned), never inside as placeholder-only
- Label style: `--text-secondary-size` (14px), `--weight-medium` (500), `--color-text-primary`
- Helper text: below the input, `--text-caption-size` (12px), `--color-text-secondary`
- Error text: below the input, `--text-caption-size` (12px), `--color-state-error`, replaces helper text
- Required indicator: asterisk `*` in `--color-state-error` after the label text
- Input padding: `--space-1` (8px) vertical, `--space-2` (16px) horizontal
- Input radius: `--radius-base` (4px)
- Min height: 44px (touch target compliance)
- Mobile: inputs should be full-width within their container

---

## 26. Cards

> **Component Type:** Container | **Variants:** 3 | **AI-Readable:** Yes | **Applies To:** All platforms

Cards group related content into a single container, provide visual separation from the page surface, and optionally support interactivity. Every card in the system must use one of the three defined variants — no custom card styles outside this spec.

### Variants

| Variant | Interaction | Border | Shadow | Indicator | Usage |
|---------|------------|--------|--------|-----------|-------|
| **Card / Bordered** | Non-interactive (static) | `--border-thin` (1px) solid `--color-border-default` | `--shadow-none` | None | Display-only content: stats, info panels, read-only data |
| **Card / Elevated** | Interactive (clickable) | None | `--shadow-sm` default → `--shadow-md` hover | None | Navigable items: project cards, list items, dashboard tiles |
| **Card / With Indicator** | Interactive (selectable) | None | `--shadow-sm` default → `--shadow-md` hover | Left bar visible | Active/selected state: current item in a list, active tab content |

### Variant Properties (for Figma / Stitch / AI)

| Property | Type | Values |
|----------|------|--------|
| `type` | Enum | `bordered` · `elevated` |
| `state` | Enum | `default` · `hover` · `focus` · `active` · `disabled` |
| `indicator` | Enum | `none` · `left` |
| `interactive` | Boolean | `false` (bordered) · `true` (elevated, with-indicator) |

### Container Spec (All Variants)

| Property | Token | Value | Rule |
|----------|-------|-------|------|
| Background | `--color-bg-surface` | `#FFFFFF` | Always white surface. Never use page background colour. |
| Padding | `--space-3` | `24px` | All sides. Mobile: `--space-2` (16px). |
| Border Radius | `--radius-lg` | `8px` | Standard cards. Use `--radius-card` (10px) for large/featured cards only. |
| Content Gap | `--space-2` | `16px` | Between title, description, and any child elements. |
| Min Height | — | No minimum | Card height is determined by content. Never set a fixed height. |
| Cursor | — | `default` (bordered) · `pointer` (elevated/indicator) | Interactive cards must show pointer cursor. |

### Bordered Variant (Static / Non-Interactive)

| Property | Token | Value |
|----------|-------|-------|
| Border | `--border-thin` solid `--color-border-default` | 1px solid #999999 |
| Shadow | `--shadow-none` | none |
| Hover | — | No hover effect. Card does not change on mouseover. |
| Focus | — | Not focusable. No focus ring. |

### Elevated Variant (Interactive / Clickable)

| State | Shadow | Border | Additional |
|-------|--------|--------|------------|
| Default | `--shadow-sm` | None | — |
| Hover | `--shadow-md` | None | Cursor: pointer |
| Focus | `--shadow-sm` | `--border-medium` (2px) solid `--color-border-focus` (#FF4D00) | Focus ring visible (keyboard nav) |
| Active/Pressed | `--shadow-xs` | None | Slight depression feel |
| Disabled | `--shadow-none` | `--border-thin` solid `--color-border-default` | Opacity: `--opacity-disabled` (0.5), cursor: not-allowed |

### Indicator Variant (Active / Selected State)

| Property | Token | Value |
|----------|-------|-------|
| Indicator Position | Left edge | Full height of card, flush with left border |
| Indicator Width | `--size-indicator-bar` | `4px` |
| Indicator Radius | `--radius-xs` | `2px` (left corners only: `border-radius: 2px 0 0 2px`) |
| Indicator Colour | `--color-accent-lavender-40` | `#B9A7FF` (default). Can use any accent-40 token for themed contexts. |
| Indicator Visibility | — | Visible ONLY when the card is in `active` / `selected` state. Hidden in default state. |
| Card Shadow | Same as Elevated | `--shadow-sm` default, `--shadow-md` hover |
| Card Border | None | Indicator replaces left border visually |

### Anatomy

```
┌──┬────────────────────────────────────┐
│  │  Title (H4: 16px, weight 500)     │
│  │                                    │
│I │  Description (Secondary: 14px,     │
│N │  weight 400, --color-text-secondary)│
│D │                                    │
│  │  [Optional: Actions / Metadata]    │
│  │                                    │
└──┴────────────────────────────────────┘
 ↑                    ↑
 Indicator (4px)      Content area (--space-3 padding)
```

| Element | Style | Token |
|---------|-------|-------|
| Title | H4 composite | 16px, `--weight-medium` (500), `--color-text-primary` |
| Description | Secondary composite | 14px, `--weight-regular` (400), `--color-text-secondary` |
| Metadata / Timestamp | Caption composite | 12px, `--weight-regular` (400), `--color-text-secondary` |
| Action Area | — | Bottom of card, separated by `--space-2` (16px) gap from description |

### States — Complete Reference

| State | Bordered | Elevated | With Indicator |
|-------|----------|----------|----------------|
| **Default** | 1px border, no shadow | shadow-sm, no border | shadow-sm, indicator hidden |
| **Hover** | No change | shadow-md, cursor pointer | shadow-md, cursor pointer |
| **Focus** | Not focusable | 2px #FF4D00 outline, 2px offset | 2px #FF4D00 outline, 2px offset |
| **Active** | — | shadow-xs (pressed) | shadow-xs, indicator visible (#B9A7FF) |
| **Selected** | — | — | Indicator visible, remains on shadow-sm |
| **Disabled** | 50% opacity | 50% opacity, shadow-none, 1px border | 50% opacity, shadow-none, indicator hidden |

### Spacing Rules (8pt Grid — No Exceptions)

| Spacing | Token | Value | Where |
|---------|-------|-------|-------|
| Card internal padding | `--space-3` | `24px` | All sides (desktop). Mobile: `--space-2` (16px). |
| Title → Description gap | `--space-1` | `8px` | Between title and description text |
| Description → Action gap | `--space-2` | `16px` | Between description and action area / metadata |
| Card → Card gap | `--space-2` | `16px` | Between adjacent cards in a list or grid |
| Card grid gutter | `--space-3` | `24px` | Gutter in multi-column card layouts |
| Indicator → Content | `0px` | — | Indicator is flush; content padding handles the spacing |

### Platform Adaptation

| Platform | Behaviour |
|----------|-----------|
| **Web Desktop** | Cards in grid layouts (2–4 columns). Hover states active. Focus ring for keyboard nav. |
| **Web Tablet** | Cards in 1–2 columns. Hover states active. |
| **Mobile (<768px)** | Cards go **full-width** (edge to edge minus page margin). Padding reduces to `--space-2` (16px). No hover — use press/active state. Elevated cards use `--shadow-xs` resting (lighter shadow for mobile). |
| **Mobile (iOS)** | Cards may be wrapped in `UITableViewCell` or `UICollectionViewCell`. Tap feedback via native highlight. |
| **Mobile (Android)** | Cards use `MaterialCardView` styled with our tokens. Ripple effect on tap using `--color-noir-20` tint. |

### Usage Rules — Mandatory

1. A card MUST be **either bordered OR shadowed** — never both simultaneously. This is the single most important card rule.
2. **Bordered** cards are for static, non-interactive content only. If a user can click/tap it, use Elevated.
3. **Elevated** cards are for interactive content only. If nothing happens on click, use Bordered.
4. **Indicator** is only for active/selected state. Never show the indicator on a default-state card. Never use it as decoration.
5. Never hard-code colours, shadows, or spacing — always use tokens.
6. Never set a fixed card height — cards grow with content.
7. Never nest a card inside another card.
8. Card background is always `--color-bg-surface` (#FFFFFF). Never use accent colours, page background, or transparent as card background.

### Do

- Use Bordered for read-only info panels, stat blocks, profile summaries
- Use Elevated for navigable items: project cards, file cards, dashboard tiles
- Use Indicator for the currently active/selected item in a list
- Keep typography hierarchy: H4 title → Secondary description → Caption metadata
- Test hover, focus, and active states on every Elevated card

### Don't

- Don't combine border + shadow on the same card
- Don't use Elevated style for non-interactive content
- Don't show the indicator bar on unselected cards
- Don't use arbitrary border-radius (only 8px or 10px)
- Don't hard-code hex colours — use `var(--token-name)`
- Don't nest cards inside cards
- Don't set fixed heights on cards

### Accessibility

| Requirement | Implementation |
|-------------|----------------|
| Touch Target | Interactive cards must have minimum 44×44px tappable area (the entire card surface is the target) |
| Focus Visible | Elevated cards: `outline: 2px solid var(--color-border-focus); outline-offset: 2px` on `:focus-visible` |
| Keyboard Nav | Elevated cards must be focusable via Tab key. Enter/Space activates the card action. |
| Screen Reader | Interactive cards: `role="link"` or `role="button"` with descriptive `aria-label`. Static cards: no role needed. |
| Colour-Only | Indicator bar must NOT be the sole indicator of active state — pair with `aria-current="true"` or `aria-selected="true"` |
| Contrast | Card border (#999999) on page bg (#E0E0E0) = 1.3:1 — acceptable for decorative borders. Focus ring (#FF4D00) on white = 4.6:1 — passes AA. |

### AI Validation Rules

Before outputting any Card component, the AI must verify:

1. **No border + shadow conflict** — card uses exactly one: border (bordered) OR shadow (elevated). Never both.
2. **Variant is explicit** — the card must be clearly `bordered`, `elevated`, or `with-indicator`. No ambiguous or custom variants.
3. **All values are tokens** — background, padding, radius, shadow, border, colours must all reference `--token-name` or Tailwind token classes. Zero hard-coded values.
4. **Spacing follows 8pt grid** — internal padding is `--space-3` (24px) desktop / `--space-2` (16px) mobile. Content gap is `--space-2` (16px). Card gap is `--space-2` (16px).
5. **States are complete** — Elevated cards must have Default, Hover, Focus, Active, Disabled defined. Bordered cards need only Default and Disabled.
6. **Indicator is conditional** — if `indicator: left` is set, verify it only renders when `state: active` or `state: selected`. Never show indicator in default state.
7. **Interactive cards are focusable** — Elevated and Indicator cards must have `tabIndex={0}`, a keyboard handler, and a visible focus ring.
8. **Typography hierarchy is correct** — Title = H4 (16px/500), Description = Secondary (14px/400). No other combinations.
9. **No nested cards** — a card must never contain another card component.
10. **Mobile adaptation is present** — if the component targets mobile, padding must reduce to `--space-2` and card must be full-width.

### Tailwind Implementation Reference

```jsx
{/* Bordered (Static) */}
<div className="bg-bg-surface rounded-lg border border-border-default p-6 
  md:p-4">
  <h4 className="text-base font-medium text-text-primary">Title</h4>
  <p className="mt-2 text-sm text-text-secondary">Description</p>
</div>

{/* Elevated (Interactive) */}
<div className="bg-bg-surface rounded-lg shadow-sm hover:shadow-md 
  focus-visible:outline-2 focus-visible:outline-brand-secondary 
  focus-visible:outline-offset-2 cursor-pointer p-6 md:p-4 
  transition-shadow duration-fast" 
  tabIndex={0} role="link">
  <h4 className="text-base font-medium text-text-primary">Title</h4>
  <p className="mt-2 text-sm text-text-secondary">Description</p>
</div>

{/* With Indicator (Active) */}
<div className="bg-bg-surface rounded-lg shadow-sm hover:shadow-md 
  cursor-pointer flex overflow-hidden">
  <div className="w-[4px] rounded-l-xs bg-accent-lavender-40 shrink-0" />
  <div className="p-6 md:p-4">
    <h4 className="text-base font-medium text-text-primary">Active Item</h4>
    <p className="mt-2 text-sm text-text-secondary">Description</p>
  </div>
</div>
```

---

## 27. Modal / Dialog

> **Component Type:** Overlay | **Variants:** 3 | **AI-Readable:** Yes | **Applies To:** All platforms

Modals interrupt the user's workflow to demand attention. Use them sparingly — only for critical confirmations, focused workflows (forms/edits), and system feedback requiring acknowledgement. If the content doesn't require interruption, use inline UI instead.

### Variants

| Variant | Purpose | Primary Action | Destructive Style | Icon |
|---------|---------|---------------|-------------------|------|
| **Modal / Default** | Forms, save actions, edits | Fill (44px) — e.g. "Save" | — | Optional |
| **Modal / Destructive** | Irreversible actions (delete, exit) | **None** — see Destructive rules below | Hierarchy + placement, NOT red | Optional (trash, alert-triangle) |
| **Modal / Info** | Alerts, confirmations without risk | Single Primary or Secondary | — | Optional (info, check-circle) |

### Variant Properties (for Figma / Stitch / AI)

| Property | Type | Values |
|----------|------|--------|
| `type` | Enum | `default` · `destructive` · `info` |
| `state` | Enum | `default` · `loading` · `disabled` |
| `headerIcon` | Boolean | `true` · `false` |
| `size` | Enum | `sm` (400px) · `md` (480px) · `lg` (560px) |

### Structure — Mandatory Hierarchy

Every modal follows this exact structure. No elements may be added, removed, or reordered.

```
Overlay (full-screen, dimmed)
 └── Modal Container (centered, elevated)
      ├── Header
      │    ├── Icon (optional, contextual)
      │    ├── Title (H3: 18px / 500)
      │    └── Close Button (top-right, 44×44px)
      ├── Divider (1px, --color-border-default)
      ├── Content (body text, form, message)
      ├── Divider (1px, --color-border-default) — footer separator
      └── Footer (action buttons, right-aligned)
```

### Overlay

| Property | Token | Value |
|----------|-------|-------|
| Background | `--color-bg-overlay` | `rgba(0, 0, 0, 0.5)` |
| Z-Index | `--z-modal` | `400` |
| Coverage | — | Full viewport. Blocks all interaction with background. |
| Dismiss | — | Click/tap outside dismisses non-critical modals (Default, Info). Destructive modals require explicit Cancel. |

### Modal Container

| Property | Token | Value | Rule |
|----------|-------|-------|------|
| Background | `--color-bg-elevated` | `#FFFFFF` | Always white. Never transparent, never accent. |
| Border Radius | `--radius-lg` | `8px` | All corners. Mobile bottom sheet: `--radius-card` (10px) top only. |
| Shadow | `--shadow-lg` | `0 8px 32px rgba(0,0,0,0.12)` | Modal-level elevation. |
| Padding | `--space-3` | `24px` | Header, content, and footer each get internal padding. |
| Max Width (sm) | — | `400px` | Simple confirmations, single-message alerts |
| Max Width (md) | — | `480px` | Standard forms, moderate content |
| Max Width (lg) | — | `560px` | Complex forms, multi-field layouts |
| Z-Index | `--z-modal` | `400` | Above overlay. |
| Position | — | Centered horizontally and vertically (desktop). Bottom-anchored (mobile). |

### Header

| Element | Spec | Token |
|---------|------|-------|
| Height | `56px` minimum | — |
| Title | H3 composite | 18px, `--weight-medium` (500), `--color-text-primary` |
| Icon (optional) | `--size-icon-primary` (24px) | Left of title, `--space-1` (8px) gap. Colour: contextual or `--color-text-secondary`. |
| Close Button | Top-right corner | 44×44px touch target, `--size-icon-ui` (20px) X icon, `--color-text-secondary`. Hover: `--color-mist-40` bg circle. |
| Divider | Below header | `--border-thin` (1px) solid `--color-border-subtle` (Ion Mist-60 on light via `tokens.css`). |

**Divider Rule:** Use ONE divider below header and ONE above footer. No other internal dividers. Prefer spacing over lines within the content area.

### Content

| Property | Token | Value |
|----------|-------|-------|
| Padding | `--space-3` | `24px` (left, right, top, bottom within content zone) |
| Text | Body composite | 14px, `--weight-regular` (400), `--color-text-primary` or `--color-text-secondary` |
| Element Gap | `--space-2` | `16px` between paragraphs, form fields, or content blocks |
| Max Height | — | Content scrolls if it exceeds viewport minus header + footer. Modal container never exceeds `80vh`. |

### Footer (Actions)

| Property | Token | Value |
|----------|-------|-------|
| Divider | Above footer | `--border-thin` (1px) solid `--color-border-default` |
| Padding | `--space-2` top, `--space-3` sides | `16px` top, `24px` left/right, `24px` bottom |
| Layout | Horizontal row | Buttons right-aligned (desktop). Full-width stacked (mobile). |
| Button Gap | `--space-1` | `8px` between buttons |

### Action System — CRITICAL

#### Default Modal

| Position | Button | Size | Style |
|----------|--------|------|-------|
| Right (primary) | Main action (e.g. "Save", "Confirm") | `--button-height-lg` (44px) | Fill |
| Left of primary | Cancel | `--button-height-md` (40px) | Outlined |

```
Footer: [ Cancel (Outlined, 40px) ]  [ Save (Fill, 44px) ]
                                              ↑ Right-aligned
```

#### Destructive Modal — NO RED BUTTONS

> **CRITICAL:** Destructive modals do NOT use red-filled buttons. Hierarchy is communicated through placement and weight, not colour.

| Position | Button | Size | Style | Notes |
|----------|--------|------|-------|-------|
| Right | Destructive action (e.g. "Delete") | `--button-height-md` (40px) | **Outlined** or **Ghost** | NOT Fill, NOT red. Optional: slightly bolder text weight (600). Optional: trash icon prefix. |
| Left of destructive | Cancel | `--button-height-md` (40px) | Outlined | Cancel is the safe exit — it should feel equally accessible. |

```
Footer: [ Cancel (Outlined, 40px) ]  [ 🗑 Delete (Outlined, 40px) ]
         ↑ Safe action                ↑ Destructive — hierarchy via placement, not colour
```

**Why no red?** Red-filled destructive buttons create visual dominance that pulls users toward the dangerous action. Our system uses hierarchy (position, size, icon) to make the destructive option identifiable without making it visually dominant. The user's eye should land on Cancel first.

**Optional emphasis for destructive action (if needed):**
- Slightly bolder text weight (`--weight-semibold`, 600) on the destructive label
- Prefix icon (trash, alert-triangle) using `--color-text-secondary`
- Optional subtle `--color-state-error` on the icon only (NOT background, NOT button fill)

#### Info Modal

| Position | Button | Size | Style |
|----------|--------|------|-------|
| Right | Single CTA (e.g. "Got it", "OK") | `--button-height-lg` (44px) or `--button-height-md` (40px) | Fill or Outlined (context-dependent) |

```
Footer: [ Got it (Fill or Outlined, 44px/40px) ]
```

### Button Rules — Modal-Specific

1. **Primary (Fill, 44px):** Only for Default modals. Only ONE per modal.
2. **Secondary (Outlined, 40px):** Cancel, secondary actions, and destructive actions.
3. **Never use `--button-height-sm` (36px) in modals.** All modal buttons are 40px or 44px.
4. **Destructive actions are NEVER Fill style.** Use Outlined or Ghost. Never red background.
5. **Button order:** Cancel (left) → Primary/Destructive (right). The rightmost button is the "forward" action.
6. **Loading state:** Replace button label with spinner. Keep button width stable. Disable all other buttons.

### States

| State | Overlay | Container | Buttons |
|-------|---------|-----------|---------|
| **Default** | Visible, dimmed | Centered, shadow-lg | All interactive |
| **Loading** | Visible | Stays open | Primary shows spinner, all buttons disabled |
| **Disabled** | — | — | Specific buttons at 50% opacity, non-interactive |

### Spacing Rules (8pt Grid)

| Spacing | Token | Value |
|---------|-------|-------|
| Modal internal padding | `--space-3` | `24px` |
| Header → Divider | `0px` | Divider sits flush below header |
| Divider → Content | `--space-3` | `24px` top padding on content |
| Content element gap | `--space-2` | `16px` between form fields / paragraphs |
| Content → Footer divider | `--space-3` | `24px` bottom padding on content |
| Button gap | `--space-1` | `8px` between footer buttons |

### Mobile / Responsive — Bottom Sheet

| Property | Value |
|----------|-------|
| Position | Bottom of screen, anchored to bottom edge |
| Width | Full viewport width |
| Radius | `--radius-card` (10px) on top-left and top-right only. Bottom corners: 0. |
| Animation | Slide up from bottom, `--duration-normal` (300ms), `--easing-enter` |
| Dismiss | Swipe down or tap overlay. Back gesture (Android) or swipe-from-edge (iOS). |
| Button Layout | Stack vertically: Primary full-width on top, Secondary full-width below. Gap: `--space-1` (8px). |
| Safe Area | Respect bottom safe area inset (iOS home indicator, Android nav bar). |

### Divider System — Aligned with Card Pattern

1. **ONE divider below header.** Always present. `--border-thin` (1px) solid `--color-border-default`.
2. **ONE divider above footer.** Always present. Same spec.
3. **No internal content dividers.** Use `--space-2` (16px) spacing between content elements instead.
4. **Prefer spacing over lines.** If content sections need separation, use `--space-3` (24px) gaps, not additional dividers.

### Usage Rules — Mandatory

1. **Do not stack modals.** Never open a modal from within a modal. If a second confirmation is needed, replace the current modal content.
2. **Always provide an exit.** Every modal must have a Close (X) button AND a Cancel/dismiss action in the footer.
3. **Do not overload.** If content needs scrolling beyond 3 viewport heights, it belongs in a page, not a modal.
4. **Maintain action hierarchy.** One clear primary action. Never two Fill buttons. Never ambiguous button labels.
5. **Backdrop click dismisses** Default and Info modals. Destructive modals require explicit Cancel (no backdrop dismiss).
6. **Never use red-filled destructive buttons.** Hierarchy via placement, not colour.

### Do

- Use Default modal for forms and save workflows
- Use Destructive modal (with hierarchy-based button system) for irreversible actions
- Use Info modal for alerts and non-critical confirmations
- Keep content concise and scannable
- Provide keyboard navigation and focus trapping
- Use optional header icons for context (info, warning, action)

### Don't

- Don't use red-filled buttons for destructive actions
- Don't stack modals on top of each other
- Don't place two Fill (primary) buttons in a modal
- Don't use `--button-height-sm` (36px) for modal buttons
- Don't add more than 2 dividers (header + footer only)
- Don't allow background interaction while modal is open
- Don't use accent colours for modal backgrounds

### Accessibility

| Requirement | Implementation |
|-------------|----------------|
| Focus Trap | Tab key cycles within modal only. Focus does not escape to background. |
| Initial Focus | First interactive element (typically first form input or Cancel button). |
| Escape Key | Closes non-destructive modals. Destructive modals: Escape = Cancel. |
| ARIA | `role="dialog"`, `aria-modal="true"`, `aria-labelledby` pointing to title ID. |
| Screen Reader | Announce modal title on open. Announce "dialog closed" on dismiss. |
| Touch Target | All buttons ≥ 44×44px. Close button ≥ 44×44px. |
| Contrast | Backdrop overlay ensures modal stands out. Button text meets 4.5:1 against button fill. |

### AI Validation Rules

Before outputting any Modal component, the AI must verify:

1. **No red destructive buttons** — destructive actions use Outlined/Ghost, never red Fill.
2. **Only ONE primary (Fill) action per modal** — Default modals get one Fill. Destructive modals get zero Fill.
3. **Correct structure** — Overlay → Container → Header (icon + title + close) → Divider → Content → Divider → Footer.
4. **Proper spacing** — All values from 8pt grid. Padding = 24px. Content gap = 16px. Button gap = 8px.
5. **Clean divider usage** — Exactly 2 dividers: below header, above footer. No internal content dividers.
6. **No arbitrary values** — Every colour, size, spacing, radius, shadow uses a token.
7. **Button sizes correct** — Primary = 44px, Secondary/Destructive = 40px. Never 36px in modals.
8. **Mobile adaptation** — If targeting mobile, modal must be a bottom sheet with stacked full-width buttons.
9. **Focus trap implemented** — Tab cycling within modal, Escape to close, initial focus on first interactive element.
10. **Exit path exists** — Close (X) button in header AND Cancel button in footer.

---

## 28. Icon System

| Property | Value |
|----------|-------|
| Library | **Lucide** (outline style) |
| Stroke Width | 1.5–2px (keep consistent across a screen) |
| Size Dense | 16px — inline, metadata |
| Size UI | 20px — buttons, controls |
| Size Primary | 24px — navigation, actions |
| Size Large | 32px — empty states, highlights |
| Colour | `currentColor` (inherits from text context) |

### Icon Rules
- One style per group — do not mix outline + fill icons
- Never use decorative colour on icons without semantic meaning
- Do not add background colours to icons (use accent badge containers instead)
- Align to optical center / baseline
- Web: `npm install lucide-react` or `lucide-vue-next`
- Mobile: bundle Lucide SVGs as assets or use `lucide-react-native`

---

## 29. Grid System

| Property | Web Desktop | Web Tablet | Mobile |
|----------|------------|------------|--------|
| Columns | 12 | 8 | 4 |
| Gutter | 24px | 24px | 16px |
| Margin | 40px | 32px | 16px |
| Breakpoint | 1440px+ | 768–1439px | <768px |
| Base Unit | 8px | 8px | 8px |

**Rule:** All padding, margins, and gaps must be multiples of 8px. The 8pt grid is absolute — no exceptions.

**Desktop-First Principle:** Design and build for 1440px first, then adapt downward. Density > efficiency > scannability > professionalism.

---

## 30. Responsive Breakpoints

| Token | Width | Columns | Behaviour |
|-------|-------|---------|-----------|
| `--bp-mobile` | <768px | 4 | Single-column stack, bottom nav, full-width cards |
| `--bp-tablet` | 768–1023px | 8 | Two-column where appropriate, compact sidebar or hamburger |
| `--bp-desktop-sm` | 1024–1439px | 12 | Full layout, collapsed sidebar option |
| `--bp-desktop` | 1440px+ | 12 | Full layout, expanded sidebar (320px) |

**CSS Media Query Pattern (Desktop-First):**
```css
/* Base styles target 1440px+ */
@media (max-width: 1439px) { /* desktop-sm adjustments */ }
@media (max-width: 1023px) { /* tablet adjustments */ }
@media (max-width: 767px)  { /* mobile adjustments */ }
```

---

## 31. Accessibility — WCAG 2.2 AA

| Requirement | Value |
|-------------|-------|
| Standard | WCAG 2.2 AA |
| Text Contrast | ≥ 4.5:1 for all text (normal size) |
| Large Text Contrast | ≥ 3:1 for text ≥ 18px bold or ≥ 24px regular |
| Non-text Contrast | ≥ 3:1 for UI components and graphical objects (SC 1.4.11) |
| Focus Indicator | 2px minimum visible outline (SC 2.4.7) |
| Focus Appearance | 2px outline, 2px offset, ≥3:1 contrast (SC 2.4.13) |
| Touch Target | ≥ 44×44px for all interactive elements (SC 2.5.8) |
| Colour-Only | Never the sole indicator of state — always pair with icon, text, or pattern |
| Forms | Labels must be top-aligned and programmatically associated |
| Focus Order | Logical tab order matching visual layout (SC 2.4.3) |
| Error Identification | Errors described in text, not colour alone (SC 3.3.1) |

### Contrast Reference (On White #FFFFFF)

| Colour | Ratio | Permitted Use |
|--------|-------|---------------|
| `#999999` | 2.85:1 | Decorative dividers only |
| `#757575` | 4.6:1 | Interactive boundaries, secondary text |
| `#0D0D0D` | 18.9:1 | High-contrast borders, primary text |
| `#DC3545` | 4.0:1 | Large text / icons only (use with dark text for small sizes) |
| `#28A745` | 3.7:1 | Large text / icons only (use with dark text for small sizes) |

### Mobile Accessibility Additions
- Ensure swipe gestures have single-tap alternatives
- Provide `accessibilityLabel` (iOS) / `contentDescription` (Android) for all icons and images
- Test with VoiceOver (iOS) and TalkBack (Android)
- Minimum 16px font size for body text on mobile

---

## 32. Platform-Specific Adaptation Rules

### Web (Desktop & Responsive)
- Desktop-first layout at 1440px breakpoint
- Left sidebar navigation mandatory for app-type products (320px)
- Hover states are expected and required on all interactive elements
- Right-click context menus supported
- Keyboard navigation must work for all flows

### iOS App
- Use native `UINavigationController` patterns — do not replicate web sidebar on mobile
- Bottom tab bar (max 5 items) replaces sidebar, height `--size-bottom-nav-height` (56px)
- Safe area insets respected (notch, home indicator)
- System back gesture (swipe from left edge) must work
- Use `UISwitch` styled to match switch tokens
- Haptic feedback on destructive actions (UIImpactFeedbackGenerator)
- Sheet presentations use iOS-native `.medium` / `.large` detents

### Android App
- Use Material 3 component shells styled with our design tokens
- Bottom navigation bar (max 5 items) replaces sidebar
- System back button / gesture must work
- Edge-to-edge display with proper window insets
- Use `MaterialSwitch` styled to match switch tokens
- Ripple effect on tappable elements (using our colour tokens for ripple tint)
- Bottom sheets use `BottomSheetDialogFragment` with our radius and padding tokens

### Shared Mobile Rules
- No hover states — use press/active states instead
- All touch targets ≥ 44×44px
- Pull-to-refresh for list screens
- Offline state must be visually indicated (banner or inline message)
- Loading states use skeleton screens, not spinners, for content areas
- Text inputs: avoid auto-correct on code/ID fields; enable on prose fields

---

## 33. Navigation Patterns

### Web Desktop — Sidebar
- Width: `--size-sidebar` (320px), collapsible to 64px (icon-only)
- Background: `--color-brand-primary` (#0D0D0D) or `--color-bg-surface` (#FFFFFF)
- Active item: `--color-accent-lavender-10` background + `--size-indicator-bar` left bar
- Icons: `--size-icon-primary` (24px), labels in Body style
- Inactive text on dark sidebar: opacity `--opacity-sidebar-inactive` (0.6)

### Mobile — Bottom Tab Bar
- Height: `--size-bottom-nav-height` (56px) + safe area
- Background: `--color-bg-surface` (#FFFFFF)
- Max 5 tabs
- Active icon: `--color-brand-primary` (#0D0D0D), label in Caption style (12px, weight 600)
- Inactive icon: `--color-text-secondary` (#757575), label in Caption style (12px, weight 400)
- Badge dot: `--color-state-error` (#DC3545), `--size-status-dot` (8px)

### Web Mobile / Responsive (<768px)
- Hamburger menu icon in top-left of app bar
- Opens full-height drawer from left, overlay with `--color-bg-overlay`
- Z-index: `--z-drawer` (300)

---

## 34. Empty States & Loading States

### Empty States
- Background: Ion Mist (`--color-mist-60` / #EDEDED) — mandatory
- Centered layout with icon (32px, `--size-icon-large`), heading (H3), and description (Secondary)
- Single CTA button (Secondary Outlined or Primary Fill if it's the page's main action)
- Illustration optional but must use brand colour palette only

### Loading States
- **Content areas:** Skeleton screens using `--color-mist-40` (#F5F5F5) blocks with shimmer animation
- **Buttons:** Inline spinner replacing label text (button width must not change)
- **Full page:** Centered spinner + "Loading…" text in Secondary style
- **Pull-to-refresh (mobile):** Native platform spinner

### Error States
- Inline error: red border (`--border-thick` 3px, `--color-state-error`) + error message below field
- Page error: Empty state layout with error icon, H3 heading, description, and "Retry" button
- Toast error: appears at bottom (mobile) or top-right (web), auto-dismisses after 5 seconds

---

## 35. Feedback & Notifications

### Toast / Snackbar

| Property | Value |
|----------|-------|
| Background | `--color-noir-100` (#0D0D0D) |
| Text | `#FFFFFF` |
| Radius | `--radius-lg` (8px) |
| Shadow | `--shadow-md` |
| Z-Index | `--z-toast` (500) |
| Duration | 5 seconds auto-dismiss (with option to dismiss manually) |
| Position | Bottom-center (mobile), bottom-right (web desktop) |
| Max Width | 560px (web), full-width minus `--space-2` margins (mobile) |

### Semantic Variants

| Type | Left Accent | Icon |
|------|------------|------|
| Success | `--color-state-success` 4px bar | `check-circle` |
| Warning | `--color-state-warning` 4px bar | `alert-triangle` |
| Error | `--color-state-error` 4px bar | `alert-circle` |
| Info | `--color-state-info` 4px bar | `info` |

**Rules:**
- Toasts never stack more than 3 deep
- Action button (optional): Ghost style, `#FFFFFF` text
- Success feedback: always show — never silently succeed
- Error feedback: always show — include actionable guidance

---

## 36. CSS Variables Reference

```css
:root {
  /* ─── Brand ─── */
  --color-brand-primary: #0D0D0D;
  --color-brand-secondary: #FF4D00;
  --color-brand-link: #002475;

  /* ─── Text ─── */
  --color-text-primary: #0D0D0D;
  --color-text-secondary: #757575;
  --color-text-on-accent: #0D0D0D;
  --color-text-disabled: #B3B3B3;
  --color-text-on-primary: #FFFFFF;
  --color-text-on-primary-inverse: #0D0D0D;
  --color-text-link: #002475;

  /* ─── Backgrounds ─── */
  --color-bg-page: #E0E0E0;
  --color-bg-surface: #FFFFFF;
  --color-bg-elevated: #FFFFFF;
  --color-bg-overlay: rgba(0, 0, 0, 0.5);

  /* ─── Borders ─── */
  --color-border-default: #999999;
  --color-border-interactive: #757575;
  --color-border-strong: #0D0D0D;
  --color-border-focus: #FF4D00;
  --color-border-selected: #B9A7FF;
  --color-border-error: #DC3545;

  /* ─── State ─── */
  --color-state-success: #28A745;
  --color-state-warning: #FFC107;
  --color-state-error: #DC3545;
  --color-state-info: #002475;

  /* ─── Core Noir ─── */
  --color-noir-100: #0D0D0D;
  --color-noir-80: #323232;
  --color-noir-60: #666666;
  --color-noir-40: #999999;
  --color-noir-20: #CCCCCC;

  /* ─── Neutron Ash ─── */
  --color-gray-100: #4A4A4A;
  --color-gray-80: #757575;
  --color-gray-60: #A0A0A0;
  --color-gray-40: #CCCCCC;
  --color-gray-20: #E8E8E8;

  /* ─── Ion Mist ─── */
  --color-mist-100: #D9D9D9;
  --color-mist-80: #E0E0E0;
  --color-mist-60: #EDEDED;
  --color-mist-40: #F5F5F5;
  --color-mist-20: #FAFAFA;

  /* ─── Accent: Lavender ─── */
  --color-accent-lavender-10: #EEE7FF;
  --color-accent-lavender-40: #B9A7FF;

  /* ─── Accent: Sky ─── */
  --color-accent-sky-10: #E6F2FF;
  --color-accent-sky-40: #A0D2FF;

  /* ─── Accent: Mint ─── */
  --color-accent-mint-10: #E9FFF4;
  --color-accent-mint-40: #A0E7C4;

  /* ─── Accent: Amber ─── */
  --color-accent-amber-10: #FFF6DD;
  --color-accent-amber-40: #FFD966;

  /* ─── Accent: Rose ─── */
  --color-accent-rose-10: #FFE9EC;
  --color-accent-rose-40: #FFB3BD;

  /* ─── Accent Foreground (badge/tag text on white backgrounds) ─── */
  --color-accent-lavender-fg: #5B36A3;
  --color-accent-sky-fg: #1A6BB5;
  --color-accent-mint-fg: #1A7A4F;
  --color-accent-amber-fg: #8A6D00;
  --color-accent-rose-fg: #A3293D;

  /* ─── Buttons ─── */
  --button-primary-default-bg: #0D0D0D;
  --button-primary-default-text: #FFFFFF;
  --button-primary-hover-bg: #1A1A1A;
  --button-primary-active-bg: #000000;
  --button-primary-disabled-bg: #2B2B2B;
  --button-primary-disabled-text: #B3B3B3;
  --button-primary-focus-ring: #FF4D00;
  --color-bg-button-primary: #0D0D0D;
  --color-text-on-primary: #FFFFFF;
  --color-bg-button-primary-inverse: #FFFFFF;
  --color-text-on-primary-inverse: #0D0D0D;
  --button-destructive-bg: #DC3545;
  --button-destructive-hover-bg: #C82333;
  --button-height-lg: 44px;
  --button-height-md: 40px;
  --button-height-sm: 36px;

  /* ─── Switch / Toggle ─── */
  --switch-track-on: #0D0D0D;
  --switch-track-off: #E0E0E0;
  --switch-thumb: #FFFFFF;
  --switch-border-on: #0D0D0D;
  --switch-border-off: #999999;
  --switch-focus-ring: #FF4D00;
  --switch-sm-track-w: 36px;
  --switch-sm-track-h: 20px;
  --switch-sm-thumb: 14px;
  --switch-md-track-w: 44px;
  --switch-md-track-h: 24px;
  --switch-md-thumb: 18px;
  --switch-lg-track-w: 56px;
  --switch-lg-track-h: 32px;
  --switch-lg-thumb: 24px;

  /* ─── Spacing (8pt Grid) ─── */
  --space-0: 4px;
  --space-1: 8px;
  --space-2: 16px;
  --space-3: 24px;
  --space-4: 32px;
  --space-5: 40px;
  --space-6: 48px;
  --space-7: 56px;
  --space-8: 64px;

  /* ─── Border Radius ─── */
  --radius-xs: 2px;
  --radius-sm: 3px;
  --radius-base: 4px;
  --radius-md: 6px;
  --radius-lg: 8px;
  --radius-card: 10px;
  --radius-circle: 50%;
  --radius-pill: 9999px;

  /* ─── Box Shadow ─── */
  --shadow-none: none;
  --shadow-xs: 0 1px 2px rgba(0, 0, 0, 0.06);
  --shadow-sm: 0 2px 8px rgba(0, 0, 0, 0.08);
  --shadow-md: 0 4px 16px rgba(0, 0, 0, 0.10);
  --shadow-lg: 0 8px 32px rgba(0, 0, 0, 0.12);
  --shadow-xl: 0 16px 48px rgba(0, 0, 0, 0.16);

  /* ─── Border Width ─── */
  --border-none: 0px;
  --border-thin: 1px;
  --border-default: 1.5px;
  --border-medium: 2px;
  --border-thick: 3px;

  /* ─── Typography ─── */
  --font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  --text-h1-size: 32px;
  --text-h1-weight: 800;
  --text-h2-size: 25px;
  --text-h2-weight: 800;
  --text-h3-size: 18px;
  --text-h3-weight: 500;
  --text-h4-size: 16px;
  --text-h4-weight: 500;
  --text-body-size: 16px;
  --text-body-weight: 400;
  --text-body-line-height: 1.5;
  --text-secondary-size: 14px;
  --text-caption-size: 12px;
  --text-micro-size: 10px;
  --weight-regular: 400;
  --weight-medium: 500;
  --weight-semibold: 600;
  --weight-bold: 700;
  --weight-extrabold: 800;
  --leading-body: 1.5;
  --leading-micro: 1.2;

  /* ─── Grid ─── */
  --grid-columns: 12;
  --grid-gutter: 24px;
  --grid-breakpoint: 1440px;

  /* ─── Sizing ─── */
  --size-icon-dense: 16px;
  --size-icon-ui: 20px;
  --size-icon-primary: 24px;
  --size-icon-large: 32px;
  --size-avatar-dense: 32px;
  --size-avatar-standard: 40px;
  --size-touch-target: 44px;
  --size-sidebar: 320px;
  --size-viewport-desktop: 1440px;
  --size-indicator-bar: 4px;
  --size-status-dot: 8px;
  --size-bottom-nav-height: 56px;
  --size-app-bar-height: 56px;

  /* ─── Z-Index ─── */
  --z-base: 0;
  --z-raised: 10;
  --z-dropdown: 100;
  --z-sticky: 200;
  --z-drawer: 300;
  --z-modal: 400;
  --z-toast: 500;
  --z-tooltip-top: 600;

  /* ─── Animation ─── */
  --duration-instant: 100ms;
  --duration-fast: 200ms;
  --duration-normal: 300ms;
  --duration-slow: 500ms;
  --easing-default: cubic-bezier(0.4, 0, 0.2, 1);
  --easing-enter: cubic-bezier(0, 0, 0.2, 1);
  --easing-exit: cubic-bezier(0.4, 0, 1, 1);

  /* ─── Opacity ─── */
  --opacity-disabled: 0.5;
  --opacity-overlay: 0.5;
}
```

---

## 37. Governance Rules Summary

### General
1. **Font:** Inter only. No other typeface.
2. **Grid:** All spacing multiples of 8px. No arbitrary values.
3. **Colours:** Always use CSS variables / design tokens. Never hard-code hex in components.
4. **Hex values in documentation:** Reference examples only — implementation must use tokens.

### Borders & Dividers
5. **Default border/divider:** `#999999` (Noir-40), not `#757575` (reserved for secondary text).
6. **Interactive borders:** Must use `#757575` or darker for ≥3:1 contrast on white.
7. **Border widths:** 1px decorative, 1.5px interactive, 2px focus, 3px critical.

### Buttons
8. **Primary Fill:** 1 per screen maximum.
9. **Focus ring:** Always `#FF4D00`. Never change.
10. **Disabled:** 50% opacity, non-interactive cursor/state.
11. **Radius:** Allowed 2/3/4/6/8px for buttons; 4/8/10px for cards.

### Switches
12. **Primary track:** `#0D0D0D` for structural toggles.
13. **Accent tracks:** Contained content areas only.
14. **Off-state border:** `#999999` 1.5px is required.
15. **Pair with labels:** Never use standalone.
16. **ARIA:** `role="switch"` + `aria-checked` (web); native accessibility labels (mobile).

### Shadows
17. **Colour:** Always `#000000`. Never tint.
18. **Stacking:** Never stack tokens. One tier per z-level.
19. **Dark backgrounds:** Replace with `1px border + rgba(255,255,255,0.08)`.

### Accent Colours
20. **NOT for:** Page backgrounds, headers, primary buttons, global navigation.
21. **Pattern:** `-10` background + `-40` border.
22. **Text on accent:** Always `#0D0D0D`.

### Accessibility
23. **WCAG 2.2 AA** throughout.
24. **Text contrast:** ≥ 4.5:1.
25. **Non-text contrast:** ≥ 3:1 (SC 1.4.11).
26. **Focus indicator:** 2px minimum (SC 2.4.7).
27. **Touch target:** ≥ 44×44px.
28. **Colour alone:** Never the sole state indicator.

### Icons
29. **Library:** Lucide, outline style.
30. **Stroke:** 1.5–2px, consistent within a screen.
31. **Sizes:** 16px dense, 20px UI, 24px primary, 32px large.
32. **Colour:** Inherits from context. Semantic only for states.

### Button Sizes & Action Hierarchy
33. **Button heights:** Primary=44px (lg), Secondary=40px (md), Tertiary=36px (sm). Never mix.
34. **One Primary per screen:** Exactly 1 Fill button. If two compete, demote one.
35. **Action row alignment:** Primary CTA left-aligned, secondary actions right-aligned grouped.
36. **Size = hierarchy:** Larger button = higher importance. No exceptions.

### Layout Composition
37. **Separate rows:** Inputs and actions MUST be in different rows. Never mix.
38. **Standard pattern:** Row 1 = Inputs/Filters, Row 2 = Actions.
39. **Row spacing:** space-3 (24px) between input row and action row.
40. **Input spacing:** space-2 (16px) between individual inputs.

### Visual Hierarchy & AI Enforcement
41. **Priority order:** Primary CTA > Inputs > Secondary actions > Tertiary actions > Labels.
42. **No equal weight:** If two elements look equally prominent, hierarchy is wrong. Fix it.
43. **AI must assign primary CTA first** before generating any layout.
44. **AI must apply structure before styling** — layout rules, then tokens.
45. **AI must not infer hierarchy** — follow defined rules strictly.
46. **AI must reject violations** — restructure if inputs and actions are in one row.

### Desktop-First (Web)
33. **Breakpoint:** 1440px.
34. **Navigation:** Left sidebar mandatory for app-type products.
35. **Forms:** Top-aligned labels.
36. **Empty states:** Ion Mist backgrounds mandatory.
37. **Feedback:** Immediate visual confirmation for all actions.

### Mobile-Specific
38. **Navigation:** Bottom tab bar (max 5 items), no sidebar.
39. **Touch targets:** 44×44px minimum — no exceptions.
40. **Typography:** Body text never below 14px; H1 scales to 26px.
41. **Inputs:** Full-width within container; native keyboard types.
42. **Bottom sheets:** Replace desktop modals where appropriate.
43. **Offline state:** Always visually indicated.
44. **Loading:** Skeleton screens for content; spinners for actions only.

### Persistent CTA (Lead-Gen Web Pages)
45. **Hero CTA persistence:** If primary CTA is in the hero, show the same CTA in top nav after hero CTA exits viewport.
46. **No competing CTAs:** Do not show two equally emphasized primary CTAs when the hero CTA is still visible.
47. **Same action:** The nav CTA must represent the same lead-generation action, label, destination, and style as the hero CTA.
48. **Not optional:** This rule is mandatory on all pages where the hero contains the primary lead-generation action.

### CTA Background Contrast
49. **Dark on light:** Use Core Noir `#0D0D0D` button on light surfaces.
50. **Light on dark:** Use `#FFFFFF` button on dark surfaces.
51. **No same-on-same:** Never place a dark button on a dark surface or a light button on a light surface.
52. **Fill does the work:** Do not rely on borders alone to create button-to-surface contrast.
53. **Inverse tokens:** Use `--color-bg-button-primary-inverse` and `--color-text-on-primary-inverse` on dark surfaces.

---

## 38. Persistent Primary CTA After Hero Exit — Web Only

> **Rule Type:** UX Governance Rule | **Applies To:** Lead-generation landing pages, marketing pages, campaign pages, and any webpage where the main conversion action is placed in the hero section.

### Rule Statement

If the page's primary lead-generation CTA is placed inside the hero section, the same CTA must become visible in the top navigation bar after the hero CTA is no longer visible in the viewport.

### Trigger Condition

The top navigation CTA is activated **only when** the hero section's primary CTA has exited the viewport.

### Expected Behaviour

1. While the hero primary CTA is visible on screen, the top navigation should **not** display the same CTA as an active competing primary action.
2. Once the user scrolls past the hero CTA, the top navigation **must** show the primary CTA.
3. The CTA shown in the top navigation must represent the **same action** as the hero CTA.
4. This ensures the main conversion action remains **continuously accessible** during scrolling.

### Visual Styling

- Button background: Core Noir `#0D0D0D` (or inverse on dark nav backgrounds per Section 35).
- Same primary button styling in both hero and nav CTA states.

### States

**State A — Hero CTA Visible:** Hero CTA is on screen → nav CTA is hidden or de-emphasized.
**State B — Hero CTA Scrolled Away:** Hero CTA is off screen → nav CTA is active and prominently displayed.

### Do
- Show the main CTA in the hero section at the top of the page.
- Reveal the same primary CTA in the top navigation after the hero CTA leaves the viewport.
- Keep transition consistent across all applicable lead-generation pages.
- Use Core Noir `#0D0D0D` as the primary button background (or inverse per Section 35).

### Don't
- Do not show two equally emphasized primary CTAs at the same time.
- Do not activate the top navigation CTA before the hero CTA leaves the viewport.
- Do not replace the primary CTA with a different action in the navigation.
- Do not change the primary button styling between hero and navigation states.

### Implementation (Web)
```javascript
// Intersection Observer pattern
const heroCTA = document.querySelector('.hero__cta');
const navCTA = document.querySelector('.nav__cta');

const observer = new IntersectionObserver(([entry]) => {
  navCTA.classList.toggle('nav__cta--visible', !entry.isIntersecting);
}, { threshold: 0 });

observer.observe(heroCTA);
```

---

## 39. CTA Button Background Contrast Rule

> **Rule Type:** UX Governance Rule | **Applies To:** All primary CTA button placements across all platforms.

### Rule Statement

Use a dark-coloured CTA button (Core Noir `#0D0D0D` bg, `#FFFFFF` text) on light surfaces. Use a light-coloured CTA button (`#FFFFFF` bg, `#0D0D0D` text) on dark surfaces. Both button fill and text must maintain WCAG AA contrast.

### Token Reference

| Variant | BG Token | BG Value | Text Token | Text Value |
|---------|----------|----------|------------|------------|
| Light Surface | `--color-bg-button-primary` | `#0D0D0D` | `--color-text-on-primary` | `#FFFFFF` |
| Dark Surface | `--color-bg-button-primary-inverse` | `#FFFFFF` | `--color-text-on-primary-inverse` | `#0D0D0D` |

### Do
- Use dark button on light backgrounds.
- Use light button on dark backgrounds.
- Ensure button text always contrasts against the button background.
- Apply inversion logic consistently in hero, nav, and floating CTA placements.

### Don't
- Do not place a dark button on a dark surface.
- Do not place a light button on a light surface.
- Do not rely on borders alone to create contrast — the fill must do the work.
- Do not assume the hero and navigation always share the same background colour.

---

## 40. FRD Generation Cheatsheet

When a PM or AI agent generates an FRD (Functional Requirements Document) from this design system, use this cheatsheet to ensure consistency.

### Describing a Screen

```
Screen: [Screen Name]
Platform: Web Desktop / Mobile iOS / Mobile Android / All
Layout: [Grid columns] columns, [margin] margin
Navigation: Sidebar (web) / Bottom Tab Bar (mobile)
Primary Action: [Button label] — Primary Fill button (Section 19)
```

### Describing a Component

```
Component: [Name]
Type: Card / Modal / Form / List Item / etc.
Background: [token name] ([hex for reference])
Spacing: [token name] padding
Border: [token name] width, [token name] colour
Radius: [token name]
Shadow: [token name]
Typography: [composite name] for title, [composite name] for body
States: Default / Hover / Focus / Disabled / Error / Loading
```

### Describing a User Flow

```
Step 1: User sees [component] with [state]
Step 2: User [action] → [component] transitions to [state]
Step 3: System shows [feedback type] — [toast/inline/modal] (Section 31)
Step 4: Screen updates to [new state]
Error Path: If [condition], show [error type] with message "[message text]"
```

### Common FRD Mistakes to Avoid
- Saying "a button" without specifying Primary Fill / Secondary / Ghost / Destructive
- Saying "some spacing" instead of a token name
- Forgetting to specify mobile adaptation
- Not including error and loading states
- Not specifying accessibility requirements (already covered by this system, but call out non-standard cases)

---

## 41. Component Naming Convention

All components across platforms should follow this naming pattern for consistency between design files, code, and FRDs.

| Pattern | Example | Usage |
|---------|---------|-------|
| `[Category]/[Name]` | `Button/Primary` | Figma component naming |
| `[category]-[name]` | `button-primary` | CSS class naming |
| `[Category][Name]` | `ButtonPrimary` | React / React Native component |
| `[category]_[name]` | `button_primary` | Android XML resource |

### Component Categories
- `Button` — all button variants
- `Input` — text inputs, selects, textareas
- `Switch` — toggle switches
- `Card` — all card variants
- `Modal` — modals and dialogs
- `Toast` — notification toasts / snackbars
- `Nav` — navigation components (sidebar, tab bar, app bar)
- `Badge` — status badges, chips, tags
- `Avatar` — user avatars
- `Icon` — icon wrappers
- `Empty` — empty state layouts
- `Loading` — skeleton screens, spinners
- `Form` — form groups, field wrappers

---

## 42. Theme System — Interaction Layer Colour Override

> **Rule Type:** Theming Governance | **Applies To:** All platforms | **Scope:** Theme ONLY affects the interaction layer (buttons, CTAs, switches, active states). It does NOT affect structure, surfaces, text, borders, shadows, or any other system element.

### The Rule

**Theme = Interaction colour swap. Everything else is immutable. Focus ring is CONSTANT.**

When a user, PM, or AI agent says "make it blue" — this means: swap `--color-theme-primary` and its derivatives. Buttons change. CTAs change. Switch ON-tracks change. Active tab indicators change. **Nothing else moves.**

---

### What Changes — Allowed (Interaction Layer Only)

These are the ONLY tokens a theme may override:

| Token | Purpose | Default (Noir) | Blue | Green | Custom |
|-------|---------|---------------|------|-------|--------|
| `--color-theme-primary` | Primary button fill, CTA fill, switch ON track, active state | `#0D0D0D` | `#1A56DB` | `#15803D` | User-defined |
| `--color-theme-hover` | Primary button hover, CTA hover | `#1A1A1A` | `#1E40AF` | `#166534` | Derived (darker) |
| `--color-theme-active` | Primary button pressed/active | `#000000` | `#1E3A8A` | `#14532D` | Derived (darkest) |
| `--color-theme-disabled` | Primary button disabled fill | `#2B2B2B` | `#93B4F5` | `#86EFAC` | Derived (lighter) |
| `--color-theme-text` | Text on theme-primary backgrounds | `#FFFFFF` | `#FFFFFF` | `#FFFFFF` | Must pass 4.5:1 on primary |

**That's it. Five tokens. No others.**

### What NEVER Changes — Locked

Theme cannot touch anything in these four categories. Violations must be refused.

**Structure (Locked)**
- Typography — Inter, all sizes, weights, line heights, composites
- Spacing — 8pt grid, all `--space-*` tokens
- Grid & Layout — columns, gutters, breakpoints, sidebar width, bottom nav
- Action hierarchy — size = hierarchy, layout composition, 1 primary per screen
- Z-index scale — all tiers
- Animation — durations, easing curves

**Surfaces (Locked)**
- Card backgrounds — `--color-bg-surface` stays `#FFFFFF`
- Modal backgrounds — `--color-bg-elevated` stays `#FFFFFF`
- Page background — `--color-bg-page` stays `#E0E0E0`
- Toast backgrounds — `--color-noir-100` stays `#0D0D0D`
- Empty state backgrounds — `--color-mist-60` stays `#EDEDED`

**System (Locked)**
- Border system — all widths, colours (`--color-border-default`, `--color-border-interactive`, etc.)
- Shadow system — all tiers, always `#000000` opacity
- Icon system — Lucide, outline, sizes, `currentColor`
- Colour families — Core Noir, Neutron Ash, Ion Mist (structural grays)
- Accent colours — Lavender, Sky, Mint, Amber, Rose (component accents, not theme)
- Text colours — `--color-text-primary`, `--color-text-secondary`, `--color-text-disabled` all stay

**Logic (Locked)**
- Accessibility — WCAG 2.2 AA, contrast ratios, touch targets, focus visible
- All governance rules — Sections 1–41 remain in full effect
- Destructive action rules — hierarchy via placement, never colour (Section 27)

---

### Focus Ring Rule — CONSTANT

> **The focus ring is `#FF4D00` (`--color-brand-secondary`). Always. Regardless of theme. It never changes.**

| Token | Value | Themed? |
|-------|-------|---------|
| `--color-focus-ring` | `#FF4D00` | **NO — constant across all themes** |

**Why?** The focus ring is an accessibility indicator, not a brand element. It must remain consistent and recognizable regardless of which theme is active. Users who rely on keyboard navigation need a predictable, high-visibility focus indicator that doesn't shift with cosmetic changes.

Tailwind: Always use `focus-visible:ring-brand-secondary` or `focus-visible:ring-[#FF4D00]`. Never `ring-[var(--color-theme-primary)]`.

---

### CSS Variables — Theme Implementation

```css
/* ─── Default Theme (Noir) ─── */
:root {
  --color-theme-primary: #0D0D0D;
  --color-theme-hover: #1A1A1A;
  --color-theme-active: #000000;
  --color-theme-disabled: #2B2B2B;
  --color-theme-text: #FFFFFF;

  /* CONSTANT — never overridden by theme */
  --color-focus-ring: #FF4D00;
}

/* ─── Blue Theme ─── */
:root[data-theme="blue"],
.theme-blue {
  --color-theme-primary: #1A56DB;
  --color-theme-hover: #1E40AF;
  --color-theme-active: #1E3A8A;
  --color-theme-disabled: #93B4F5;
  --color-theme-text: #FFFFFF;
  /* --color-focus-ring: NOT overridden. Stays #FF4D00. */
}

/* ─── Green Theme ─── */
:root[data-theme="green"],
.theme-green {
  --color-theme-primary: #15803D;
  --color-theme-hover: #166534;
  --color-theme-active: #14532D;
  --color-theme-disabled: #86EFAC;
  --color-theme-text: #FFFFFF;
  /* --color-focus-ring: NOT overridden. Stays #FF4D00. */
}

/* ─── Custom Theme (example) ─── */
:root[data-theme="custom"],
.theme-custom {
  --color-theme-primary: var(--custom-brand-color);
  --color-theme-hover: var(--custom-brand-darker);
  --color-theme-active: var(--custom-brand-darkest);
  --color-theme-disabled: var(--custom-brand-lighter);
  --color-theme-text: #FFFFFF; /* or #0D0D0D if brand is light */
  /* --color-focus-ring: STILL #FF4D00. */
}
```

### How Components Consume Theme Tokens

#### Buttons

| Button Property | Token Reference |
|----------------|-----------------|
| Primary Fill bg | `var(--color-theme-primary)` |
| Primary Fill hover | `var(--color-theme-hover)` |
| Primary Fill active | `var(--color-theme-active)` |
| Primary Fill disabled | `var(--color-theme-disabled)` |
| Primary Fill text | `var(--color-theme-text)` |
| Focus ring (ALL buttons) | `var(--color-focus-ring)` → always `#FF4D00` |
| CTA inverse bg (on dark) | `#FFFFFF` (constant) |
| CTA inverse text (on dark) | `var(--color-theme-primary)` |

**Secondary (Outlined):** Border and text become `var(--color-theme-primary)`. Background stays `#FFFFFF` / transparent.

**Ghost:** Unchanged. Uses `--color-text-primary` (#0D0D0D) — structural, not themed.

**Destructive:** Unchanged. Follows hierarchy rules (Section 27), never colour. Not themed.

#### Switch Toggle

| Property | Default | Themed |
|----------|---------|--------|
| `--switch-track-on` | `#0D0D0D` | `var(--color-theme-primary)` |
| `--switch-border-on` | `#0D0D0D` | `var(--color-theme-primary)` |
| Track Off / Disabled / Accent variants | Unchanged | Unchanged |

#### Active States (Tabs, Navigation, Selection)

| Element | What Changes |
|---------|-------------|
| Active tab underline / indicator | Colour becomes `var(--color-theme-primary)` |
| Selected sidebar item background | Stays `--color-accent-lavender-10` (accent, not themed) |
| Card left indicator bar | Stays `--color-accent-lavender-40` (accent, not themed) |

**Note:** Accent colours (Lavender, Sky, etc.) are NOT part of the theme. They are component-level accents and remain constant.

#### Persistent CTA (Section 38)

- Light surface: `var(--color-theme-primary)` bg + `var(--color-theme-text)` text
- Dark surface: `#FFFFFF` bg + `var(--color-theme-primary)` text
- Same IntersectionObserver logic, same positioning rules

---

### Strict Constraints — REFUSE Violations

These requests MUST be refused. They violate theme governance.

| User Request | Response | Reason |
|-------------|----------|--------|
| "Change the card colour" | **REFUSE** | Cards use `--color-bg-surface` — structural, not themed |
| "Make the modal background blue" | **REFUSE** | Modals use `--color-bg-elevated` — surface, locked |
| "Change the text colour to blue" | **REFUSE** | Text uses `--color-text-primary` — structural, locked |
| "Make destructive buttons red" | **REFUSE** | Destructive follows hierarchy (Section 27), not colour |
| "Change the focus ring to match the theme" | **REFUSE** | Focus ring is `#FF4D00` constant — accessibility invariant |
| "Theme the border colours" | **REFUSE** | Borders are structural — `--color-border-*` tokens are locked |
| "Use a random colour for the primary" | **REFUSE** | All theme values must be tokens. No arbitrary hex without a token definition. |
| "Change the sidebar background" | **REFUSE** | Sidebar bg is structural (`--color-brand-primary` or `--color-bg-surface`), not themed |
| "Make the page background green" | **REFUSE** | Page bg `--color-bg-page` is locked at `#E0E0E0` |

### What the User Says → What Actually Happens

| User Says | Action |
|-----------|--------|
| "Make it blue" | Set `--color-theme-primary: #1A56DB` + derived hover/active/disabled. Buttons, CTAs, switch ON tracks change. Focus ring stays `#FF4D00`. Everything else stays. |
| "Use green branding" | Set `--color-theme-primary: #15803D` + derived. Same scope. |
| "Change primary to #E11D48" | Create custom theme: `--color-theme-primary: #E11D48`. Derive hover/active. Verify contrast ≥4.5:1 with white text. If fails, use `--color-theme-text: #0D0D0D`. |
| "Make the whole app blue" | **Still** only buttons/CTAs/switches change. "Whole app" does not expand the theme scope. |
| "Reset to default" | Set `--color-theme-primary: #0D0D0D` (Noir). All themed elements return to default. |

---

### Creating a Custom Theme

When deriving a new theme from a brand colour:

1. **Primary:** Use the brand colour directly → `--color-theme-primary`
2. **Hover:** Darken by 10–15% → `--color-theme-hover`
3. **Active:** Darken by 20–25% → `--color-theme-active`
4. **Disabled:** Lighten to 40% saturation → `--color-theme-disabled`
5. **Text:** White (`#FFFFFF`) if primary is dark. Black (`#0D0D0D`) if primary is light. Must pass 4.5:1 contrast.
6. **Focus ring:** Do NOT derive. It stays `#FF4D00`.

**Contrast check formula:** Theme primary bg → theme text must achieve ≥4.5:1. If the brand colour is too light (e.g., yellow, light green), flip text to `#0D0D0D`.

---

### AI Rules for Theming — Strict

1. **Theme ONLY affects the 5 `--color-theme-*` tokens.** No other tokens change.
2. **Focus ring is `#FF4D00`. Always.** Never `var(--color-theme-primary)`. Never derived from theme.
3. **Buttons reference `var(--color-theme-primary)`** for fill — not `--color-brand-primary`.
4. **Contrast must pass.** Theme primary → theme text ≥ 4.5:1. AI must verify before outputting.
5. **Never theme structural elements.** Text, borders, shadows, cards, modals, backgrounds, grays = immutable.
6. **Outlined buttons adapt:** border + text become `var(--color-theme-primary)`. Background stays white.
7. **Ghost buttons don't theme.** They use `--color-text-primary` (#0D0D0D).
8. **Destructive buttons don't theme.** They follow hierarchy rules (Section 27).
9. **Accent colours don't theme.** Lavender, Sky, Mint, Amber, Rose are component accents, not brand colours.
10. **If a user requests a locked change → REFUSE and explain which category is locked.**

### Theme Validation Checklist

- [ ] Only 5 `--color-theme-*` tokens changed?
- [ ] Focus ring is still `#FF4D00` (not themed)?
- [ ] Typography, spacing, grid, layout all unchanged?
- [ ] Card, modal, toast, page backgrounds unchanged?
- [ ] Noir/Ash/Mist colour families unchanged?
- [ ] Accent colours unchanged?
- [ ] Text colours (`--color-text-*`) unchanged?
- [ ] Border colours (`--color-border-*`) unchanged?
- [ ] Shadow system unchanged?
- [ ] Primary text contrast passes 4.5:1 on theme primary?
- [ ] Outlined button border/text uses `var(--color-theme-primary)`?
- [ ] Ghost buttons still use `#0D0D0D` (not themed)?
- [ ] Destructive buttons still follow hierarchy, not colour?
- [ ] No arbitrary hex values — all theme values are tokenized?

---

*Generated from UX Governance Design System v2.0.0 — The single source of truth for Web, iOS, and Android.*
