<!--
  DEPRECATED (2026-07-02): The duplicate §1–14 summary that previously appeared above this document
  was removed. Use DESIGN_SYSTEM_TOKENS_REFERENCE.md for tables and this file for rules.
-->

# UX Governance Design System

> **Version:** 2.0.0 | **Updated:** 2026-07-02 | **Compliance:** WCAG 2.2 AA | **Platforms:** Web (Desktop-First 1440px) · Mobile App (iOS & Android) · Responsive Web
>
> **Doc maintenance:** Principles and governance rules only. Token/CSS tables → [`DESIGN_SYSTEM_TOKENS_REFERENCE.md`](./DESIGN_SYSTEM_TOKENS_REFERENCE.md). Themes → [`THEMES.md`](./THEMES.md).
>
> **Purpose:** This is the single source of truth for all UI/UX decisions across our product ecosystem. Every developer, product manager, designer, and AI agent (Claude, Anythink, Stitch, etc.) must reference this document when generating FRDs, building components, creating mockups, or reviewing designs. If it's not in this document, it doesn't ship.

---

## How to Use This Document

**For Developers:** Use the token tables and CSS variable references to implement components. Every value has a token — never hard-code hex, px, or font values directly. Import `tokens.css` once at app root (see [`tokens.md`](./tokens.md) — do not copy-paste CSS blocks).

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
22a. [Screen Zones (Canonical)](#22a-screen-zones-canonical)
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
35a. [Interaction glossary & feedback routing (agents)](#35a-interaction-glossary-feedback-routing-flows-agents)
36. [CSS Variables Reference](#36-css-variables-reference) → [`DESIGN_SYSTEM_TOKENS_REFERENCE.md`](./DESIGN_SYSTEM_TOKENS_REFERENCE.md)
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
| `--color-border-focus` | `#0066CC` (default); `#0D0D0D` on `green` | Primary focus ring (keyboard/mouse) |
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
| `--color-brand-secondary` | `#FF4D00` | Accents, emphasis, secondary interactive highlights (default **focus** border is `--color-border-focus` / `--color-focus-ring`, not this token) |
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

### FeedbackStates SVG illustrations

> **Last verified against library:** 2026-07-02 · `FeedbackStates.animations.tsx`, `FeedbackStates.css`

The **`NoDataAnimation`**, **`ErrorAnimation`**, **`OfflineAnimation`**, and related exports are **decorative** — they must not convey information alone.

| Requirement | Implementation |
|-------------|----------------|
| Decorative | Default `aria-hidden="true"` on every illustration SVG |
| Meaning in text | `title` / `description` on `EmptyState`, `ErrorState`, `OfflineBanner` carry the message |
| Reduced motion | `@media (prefers-reduced-motion: reduce)` disables all `.ds-feedback-illustration` keyframes in `FeedbackStates.css` |
| No JS gate required | CSS-only disable is sufficient; optional `usePrefersReducedMotion` from `ui-common-hooks` for custom wrappers |

Full API and AI acceptance criteria: **[`FEEDBACK_STATES_GUIDE.md`](../FEEDBACK_STATES_GUIDE.md)** § Motion & reduced motion.

---

## 19. Button States

> **Last verified against library:** 2026-07-02 · `Button` stories

### Primary (Fill) — Maximum 1 per screen

| State | Background | Border | Text | Focus Ring |
|-------|-----------|--------|------|------------|
| Default | `#0D0D0D` | `#0D0D0D` | `#FFFFFF` | — |
| Hover | `#1A1A1A` | `#1A1A1A` | `#FFFFFF` | — |
| Active/Pressed | `#000000` | `#000000` | `#FFFFFF` | — |
| Focus | `#0D0D0D` | `#0D0D0D` | `#FFFFFF` | `var(--color-border-focus)` 2px offset (default `#0066CC`; `green` as in `tokens.css`) |
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
- **Focus ring:** Use `var(--color-border-focus)` / `var(--color-focus-ring)` from `tokens.css` (default **`#0066CC`**; **`#0D0D0D`** on `green`). Do not remove focus styles.
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

> **Last verified against library:** 2026-07-02 · `DashboardShell`, `AppTopbar`, form/toolbar stories

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

## 22a. Screen Zones (Canonical)

> **Last verified against library:** 2026-07-02 · [`FeedbackStates.realworld.stories.tsx`](../../src/stories/molecules/FeedbackStates.realworld.stories.tsx), `DashboardShell` + `AppTopbar`

> **Rule Type:** UX Governance Rule | **Applies To:** All dashboard / admin screens. **Single source of truth** for zone numbering — overrides any older doc that placed the primary CTA in Zone 2.

Every screen uses **five vertical zones**. Define them **before** writing JSX. Full FRD examples: [`COMPOSITION_RULES_1.md`](../COMPOSITION_RULES_1.md). CTA hierarchy: same file + root [`AGENTS.md`](../../AGENTS.md).

```
┌──────────────────────────────────────────┐
│ ZONE 1: AppTopbar                        │  Page title, search, profile, **primary CTA**
├──────────────────────────────────────────┤
│ ZONE 2: Alerts / notification strip      │  `OfflineBanner` sticky (no `image`), inline banners
├──────────────────────────────────────────┤
│ ZONE 3: Filters / tabs / breadcrumb      │  Tabs, date range, search filters
├──────────────────────────────────────────┤
│ ZONE 4: Main content                     │  Table, charts, form, `EmptyState`, `ErrorState`
├──────────────────────────────────────────┤
│ ZONE 5: Pagination / footer              │  Page controls, row count, secondary actions
└──────────────────────────────────────────┘
```

| Zone | Components | Notes |
|------|------------|-------|
| **1** | `AppTopbar`, `DashboardShell` header | One **`primary`** CTA max (`md`/`lg`); alt actions → `outlineSecondary` `sm` |
| **2** | `OfflineBanner` (compact, no `image`), future Toast strip | Sticky under topbar; omit when no alert |
| **3** | `Tabs`, filters, `InputSearch`, `DatePicker` | Inputs only — not mixed with action buttons (see §22) |
| **4** | `Table`, charts, `Card`, `EmptyState`, `ErrorState`, `FeedbackState` | Main focus; empty/error replaces table body |
| **5** | Pagination, export links | `ghost` `sm` for footer actions |

**Do not** put the page primary CTA in Zone 2 — it belongs in **Zone 1** (`AppTopbar` actions). Zone 2 is for **system/status** strips only.

Feedback placement detail: [`FEEDBACK_STATES_GUIDE.md`](../FEEDBACK_STATES_GUIDE.md) · §34.

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
| Focus Ring | `--switch-focus-ring` | `var(--color-border-focus)` 2px, 2px offset (default `#0066CC`; `green` `#0D0D0D`) |
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

> **Last verified against library:** 2026-07-02 · `Input`, `Select`, `DatePicker`

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
| `variant` | Enum | `bordered` · `elevated` · `withIndicator` (React prop name; Figma/Stitch may label this **type**) |
| `elevation` | Enum | `none` · `sm` · `md` · `lg` — shadow tier when `variant` is `elevated` or `withIndicator` |
| `state` | Enum | `default` · `hover` · `focus` · `active` · `disabled` |
| `indicator` | Enum | `none` · `left` — use `variant="withIndicator"` + `selected` in code |
| `interactive` | Boolean | `false` (bordered) · `true` (elevated, with-indicator) — use `hoverable` in code |

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
| Focus | `--shadow-sm` | `--border-medium` (2px) solid `--color-border-focus` (default `#0066CC`) | Focus ring visible (keyboard nav) |
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
| **Focus** | Not focusable | 2px `var(--color-border-focus)` outline, 2px offset | 2px `var(--color-border-focus)` outline, 2px offset |
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
| Contrast | Card border (#999999) on page bg (#E0E0E0) = 1.3:1 — acceptable for decorative borders. Default focus ring (`#0066CC` via `--color-border-focus`) on white meets AA for focus visibility. |

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

> **Last verified against library:** 2026-07-02 · `Modal`, `AlertDialog`

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

> **Last verified against library:** 2026-07-02 · `AppSidebar`, `AppTopbar`, `Tabs`

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

> **Last verified against library:** 2026-07-02 · `FeedbackStates` module

> **Library implementation:** Use **`EmptyState`**, **`ErrorState`**, **`OfflineBanner`**, and **`FeedbackState`** from `ui-common-components` — not custom one-off layouts. Full API, props, animations, and zone mapping: **[`FEEDBACK_STATES_GUIDE.md`](../FEEDBACK_STATES_GUIDE.md)**. Zone placement (5 visual zones, CTA hierarchy): **[`COMPOSITION_RULES_1.md`](../COMPOSITION_RULES_1.md)**. Pair with **`useAsyncContentPhase`** from `ui-common-hooks` when switching loading → empty → error → offline → ready.

### Empty states (`EmptyState` / `FeedbackState variant="empty"`)

**Do not** build a full-page empty layout from raw Ion Mist blocks. The shipped **`EmptyState`** shell is a **centered feedback panel** (max-width card) that uses governance tokens:

| Aspect | Rule |
|--------|------|
| Background | `--color-fill-muted` (light: `--color-mist-40`; dark: `--color-surface-mist`) — **not** a full-bleed `--color-mist-60` page wash |
| Border | `--color-border-subtle` hairline (`--border-width-thin`) |
| Radius | `--radius-card` |
| Layout | Centered by default; `align="start"` for left-aligned widget empty states |
| Title / body | `title` + `description` — use **`TextView`** semantics in stories/apps; heading weight aligns with H3 scale |
| Icon | Optional `icon` (32px class scale on `size="lg"`) **or** `image` slot with built-in animations (`NoDataAnimation`, `NoSearchResultsAnimation`, …) |
| Tone | `neutral` \| `info` \| `success` \| `warning` — tints via `--color-*-fill` / `--color-*-strong` tokens ([`tokens.md`](./tokens.md)) |
| Size | `sm` \| `md` \| `lg`; `compact` for inside **`CardContent`** |
| Actions | `action` = primary CTA (`Button variant="primary" size="md"`); `extra` = escape hatch (`Button variant="ghost" size="sm"`) — **[§21](#21-action-hierarchy-rules)** |
| Zone | **Zone 4** — replaces table/chart/form content when there is no data |

**Legacy note:** Older specs described a mandatory full Ion Mist (`--color-mist-60`) empty **page** background. That remains valid for **page chrome** (`data-theme="mist"`) but **not** for the `EmptyState` panel itself.

### Error states (`ErrorState` / `FeedbackState variant="error"`)

| Aspect | Rule |
|--------|------|
| Default tone | `danger` (also `neutral`, `info`, `success`, `warning` for widget-level errors) |
| Retry | `onRetry` → **`Button variant="outlinePrimary" size="md"`** |
| Diagnostics | Optional `details` block (monospace, `--radius-control`) |
| Live region | Default `role="alert"` + `aria-live="assertive"`; use `polite` for non-critical widget errors |
| Illustration | `ErrorAnimation` or custom `image` |
| Zone | **Zone 4** content replacement, or **compact** inside a card section |

### Offline (`OfflineBanner` / `FeedbackState variant="offline"`)

| Mode | When | Zone |
|------|------|------|
| **Slim bar** | No `image` prop — sticky notification | **Zone 2** (`sticky`, `compact`) |
| **Full panel** | With `image` (e.g. `OfflineAnimation`) | **Zone 4** — replaces main content |

Use **`useOnlineStatus`** + **`useAsyncContentPhase`** (`requireNetwork: true`) to drive offline vs ready.

### Unified router (`FeedbackState`)

When phase is driven by data fetching, prefer one component:

```tsx
<FeedbackState variant={phase} image={…} onRetry={…} />
```

Variants: `empty` \| `success` \| `info` \| `error` \| `offline`. See **[`FEEDBACK_STATES_GUIDE.md`](../FEEDBACK_STATES_GUIDE.md)**.

### Loading states

- **Content areas:** **`Table`** skeleton mode, or app-level placeholder blocks using `--color-mist-40` + shimmer (standalone **`Skeleton`** primitive — **not shipped yet**; see §35 interim notes)
- **Buttons:** Inline spinner on **`Button`** (`loading` prop) — button width must not change
- **Full page:** Centered spinner + “Loading…” in **`TextView`** secondary style, or skeleton layout
- **Phase machine:** While `useAsyncContentPhase` returns `"loading"`, show skeleton/spinner — **not** `EmptyState`

### Inline field errors (forms)

- Red border: `--border-width-thick` + `--color-border-error` + message below field — **[§25](#25-form-inputs)**
- Do **not** use `EmptyState` / `ErrorState` for single-field validation

### Transient errors (no Toast yet)

When an action fails but the user stays on the page, prefer **`ErrorState`** inline or **`AlertDialog`**. For async success/failure after navigation, see **§35** interim patterns until **`Toast`** ships.

---

## 35. Feedback & Notifications

> **Last verified against library:** 2026-07-02 · interim patterns (Toast not shipped)

### Toast / Snackbar — **spec only (not shipped in v0.0.2)**

> **Status:** There is **no `Toast` component** in `ui-common-components` yet. §35 below is the **target spec** for a future release. Until then, use the **interim patterns** in the table — do **not** build ad-hoc toast DOM or third-party snackbars that ignore tokens.

| Property | Target value (when shipped) |
|----------|----------------------------|
| Background | `--color-noir-100` |
| Text | `--color-text-on-primary` |
| Radius | `--radius-lg` |
| Shadow | `--shadow-md` |
| Z-Index | `--z-toast` |
| Duration | 5 seconds auto-dismiss (manual dismiss optional) |
| Position | Bottom-center (mobile), bottom-right (web desktop) |
| Max Width | 560px (web), full-width minus `--space-2` (mobile) |

#### Semantic variants (target)

| Type | Left accent | Icon |
|------|-------------|------|
| Success | `--color-state-success` 4px bar | check-circle |
| Warning | `--color-state-warning` 4px bar | alert-triangle |
| Error | `--color-state-error` 4px bar | alert-circle |
| Info | `--color-state-info` 4px bar | info |

**Target rules (future):** max 3 stacked toasts; optional ghost action on toast; never silent success; error toasts include actionable copy.

#### Interim patterns (use today)

| Need | Use instead of Toast |
|------|----------------------|
| Async success, user still on screen | Inline success near action; **`EmptyState` / `FeedbackState variant="success"`** for completed empty views; **`TextView`** + `--color-success-strong` helper text |
| Async success, user navigated away | **`AlertDialog`** acknowledgement (lightweight) or persist status in page header |
| Async / background error | **`ErrorState`** in Zone 4; **`OfflineBanner`** slim strip (Zone 2) for connectivity |
| Non-blocking warning | **`OfflineBanner`** (`tone="warning"`, no `image`) or compact inline banner with `--color-warning-soft` |
| Must acknowledge error | **`AlertDialog`** `variant="error"` or blocking **`Modal`** |
| Field validation | Inline error under input — **[§25](#25-form-inputs)** |
| Destructive confirm | **`AlertDialog`** — **[§27](#27-modal--dialog)** |

Component selection details: **[`UI_COMPONENTS_GUIDE.md`](../UI_COMPONENTS_GUIDE.md)** (Feedback states + Notifications).

**Rules (apply now):**
- Success feedback: always show — never silently succeed
- Error feedback: always show — include actionable guidance
- Do not stack multiple competing primary CTAs while showing interim banners — **[§21](#21-action-hierarchy-rules)**

---

## 35a. Interaction glossary, feedback routing, flows (agents)

> **Last verified against library:** 2026-07-02 · agent routing table, FeedbackStates v0.0.2

> **Purpose:** Shared vocabulary and routing rules for **agents and humans** (FRDs, codegen, design review). Reduces one-off decisions per screen. Use with **§18 Animation & Motion**, **[§27 Modal / Dialog](#27-modal--dialog)**, **[§34 Empty States & Loading States](#34-empty-states--loading-states)**, **[§35 Feedback & Notifications](#35-feedback--notifications)**, and the **shipped library guide** **[`FEEDBACK_STATES_GUIDE.md`](../FEEDBACK_STATES_GUIDE.md)** (`EmptyState`, `ErrorState`, `OfflineBanner`, `FeedbackState`, `useAsyncContentPhase`).

### B0 — Library components (use these, not custom empty/error UI)

| Component | Import | When |
|-----------|--------|------|
| `EmptyState` | `ui-common-components` | No data, zero search results, intentional blank section |
| `ErrorState` | `ui-common-components` | API/section failure with optional `onRetry` |
| `OfflineBanner` | `ui-common-components` | Offline — slim Zone 2 strip or Zone 4 full panel (`image`) |
| `FeedbackState` | `ui-common-components` | Phase router: `variant="empty"\|"success"\|"info"\|"error"\|"offline"` |
| `useAsyncContentPhase` | `ui-common-hooks` | `loading → offline → error → empty → ready` |
| `Toast` | — | **Not shipped** — use §35 interim patterns |

### B1 — Interaction glossary

| Term | Definition | Notes |
|------|------------|--------|
| **Hover** | Pointer resting on a target without activating it. Optional affordance: surface tint, shadow lift, border emphasis. | **Web pointer** only. **Never** the only way to discover an action (touch has no hover). |
| **Focus** | Target is active for keyboard or assistive tech (`:focus-visible`). | Use **`--color-border-focus` / `--color-focus-ring`** (**§3 Focus**, **§31**). Required on controls, dialogs, composite widgets. |
| **Press / active** | Pointer or key down while activating (`:active`). Often one step darker than hover. | **§19 Button States**. On **touch**, this is the main transient feedback — use where **hover** does not exist (see **§26 Cards** mobile note). |
| **Select** | A durable choice: list/table row, tab, radio, checkbox, combobox value. | Distinct from hover; typically **`--color-border-selected`** or component-specific selected styling. |
| **Expand / collapse** | Shows or hides more content (`Accordion`, expandable **Table** rows, trees). | Motion obeys **§18**; respect **`prefers-reduced-motion`**. |
| **Dismiss** | Closes an ephemeral layer: **Modal** (Cancel, backdrop if allowed, Escape if allowed), **Toast** *(future)*, **Popover** / **Dropdown** (outside click / Escape), **`OfflineBanner`** `onDismiss`. | **Destructive** flows require an explicit safe exit — see **B3** and **[§27](#27-modal--dialog)**. |

**Mobile and touch (align with §32):**

- **Do not require hover** for core actions; pair with **visible control**, **press/active**, or **selection** state.
- Touch targets **≥ 44×44px** minimum (**§31**).

### B2 — Feedback map (surface selection)

| Situation | Prefer (shipped) | Escalate / avoid |
|-----------|------------------|-------------------|
| **Success — async / off-screen action** | Inline success near action; **`FeedbackState variant="success"`** when view is empty-after-success. **Future:** Toast (**§35**). | Never silent success. Avoid toast-like custom DOM until **`Toast`** ships. |
| **Success — field-level** | Inline validation / helper (muted success). | Usually **not** a full **`EmptyState`**. |
| **Error — field validation** | **Inline** + **`--border-width-thick`** + message (**§25**). | **`ErrorState`** only for section/page failures, not per-field. |
| **Error — section or page load failed** | **`ErrorState`** or **`FeedbackState variant="error"`** with **`onRetry`** + optional **`ErrorAnimation`** (**§34**, **[`FEEDBACK_STATES_GUIDE.md`](../FEEDBACK_STATES_GUIDE.md)**). **Future:** error Toast. | Full-screen block only for hard stops. |
| **Error — must acknowledge** | **`AlertDialog`** `variant="error"` or blocking **`Modal`**. | Use sparingly. |
| **Offline** | **`OfflineBanner`** slim (Zone 2) or full panel (Zone 4 with `image`); **`FeedbackState variant="offline"`**. | Do not duplicate offline strip + full panel without hierarchy. |
| **Warning — non-blocking** | **`OfflineBanner`** `tone="warning"` or compact inline banner (`--color-warning-soft`). **Future:** warning Toast. | If user **must** choose → **`Modal`** / **`AlertDialog`**. |
| **Confirmation — safe** | **`Modal`** or **`AlertDialog`** (info / success acknowledgement). **[§27](#27-modal--dialog)**. | Single clear primary (**§21**). |
| **Confirmation — destructive / irreversible** | **`AlertDialog`** destructive pattern — **[§27](#27-modal--dialog)**. | Never red-filled primary. |
| **Long-running / processing** | **`Table`** skeleton / button **`loading`**, **`ProgressBar`**. **Future:** Toast on completion only. | Avoid notification spam during progress. |

**Rules of thumb:** **`ErrorState` / `EmptyState`** = persistent zone content. **Inline** = field or action-adjacent. **`Modal` / `AlertDialog`** = interrupt when consequence requires. **Toast** = *future* transient layer (**§35** interim table until shipped).

### B3 — Flow patterns (retry, destructive vs info)

#### Retry flow

1. **When:** Loads fail (network, API, segment error) — **[§34](#34-empty-states--loading-states)** + **[`FEEDBACK_STATES_GUIDE.md`](../FEEDBACK_STATES_GUIDE.md)**.
2. **Layout:** **`ErrorState`** or **`FeedbackState variant="error"`** — `title`, `description`, optional **`ErrorAnimation`** `image`, tone `danger` default.
3. **Primary action:** **`onRetry`** → **`Button variant="outlinePrimary" size="md"`** with loading state on re-fetch (**§19**).
4. **Guardrails:** Debounce duplicate retries; swap Retry for Sign in / Contact support when retry will not succeed (403, revoked token).
5. **Transient vs inline:** Prefer **`ErrorState`** while user is on that page. **Future Toast** only when failure surfaces after navigation (§35 interim: **`AlertDialog`** or return-route banner).

#### Destructive vs info modal — cross-reference **[§27](#27-modal--dialog)**

| Scenario | Approach | Details in §27 |
|----------|----------|----------------|
| Delete, revoke access, discard unsaved edits, exit without saving | **Destructive** modal semantics | Variant table (**Modal / Destructive**); **Destructive Modal — NO RED BUTTONS**; Cancel left, destructive **Outlined/Ghost** right; backdrop dismiss **off** unless product explicitly overrides (library **`AlertDialog`**: **`destructive`** defaults **`closeOnBackdropClick`** unset → **false**). |
| Alert, acknowledgement, moderate-risk confirm | **Info** / **`AlertDialog`** non-destructive | **Modal / Info**; Escape and backdrop behaviour per **[§27](#27-modal--dialog)** rules. |
| Timed toast equivalent | **§35 interim** (inline banner / **`AlertDialog`**) until **`Toast`** ships | Success / warning / error / info accent patterns in **§35** target spec |

**Agents:** Prefer **`FEEDBACK_STATES_GUIDE.md`**, **§34**, and **§35** interim table over custom empty/error UI. **`Modal`** / **`AlertDialog`** in **`UI_COMPONENTS_GUIDE.md`** mirror **§27** button rules.

---

## 36. CSS Variables Reference

> **Last verified against library:** 2026-07-02

Full token tables and the legacy `:root` CSS snapshot live in **[`DESIGN_SYSTEM_TOKENS_REFERENCE.md`](./DESIGN_SYSTEM_TOKENS_REFERENCE.md)**.

**Runtime source of truth:** `src/design-system/tokens.css` — import once at app root:

```ts
import "ui-common-components/design-system/tokens.css";
```

For theme keys, contrast notes, and QA checklist see **[`THEMES.md`](./THEMES.md)**. For import rules and feedback token map see **[`tokens.md`](./tokens.md)**.

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
9. **Focus ring:** Follow `tokens.css` — default blue `#0066CC` on classic light; `green` uses `#0D0D0D` for focus tokens, not brand orange.
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
- `Toast` — notification toasts / snackbars (**planned — not in v0.0.2**; use §35 interim patterns)
- `Nav` — navigation components (sidebar, tab bar, app bar)
- `Badge` — status badges, chips, tags
- `Avatar` — user avatars
- `Icon` — icon wrappers
- `Empty` — **`EmptyState`**, **`ErrorState`**, **`OfflineBanner`**, **`FeedbackState`** (see [`FEEDBACK_STATES_GUIDE.md`](../FEEDBACK_STATES_GUIDE.md))
- `Loading` — table skeleton, button loading (**standalone `Skeleton` — planned**)
- `Form` — form groups, field wrappers

---

## 42. Theme System — Interaction Layer Colour Override

> **Last verified against library:** 2026-07-02 · `tokens.css` theme blocks — see also [`THEMES.md`](./THEMES.md)

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

### Focus — tokens (`v2.0.0` runtime)

- **Default (classic light, `blue`, `dark`):** `--color-border-focus` and `--color-focus-ring` are **`#0066CC`** (strong on structural gray borders). **`--color-brand-secondary`** remains **`#FF4D00`** for accents, not the default focus border.
- **Green (light):** focus in `tokens.css` is **`#0D0D0D`** on mint (no orange; brand orange stays on `--color-brand-secondary` where used).
- **Combined themes** (`blue-mist`, `green-mist`, etc.): may set a tinted `--color-focus-ring` in `tokens.css` — do not use low-contrast values.

| Token | Default (light) | Themed? |
|-------|-----------------|---------|
| `--color-border-focus` | `#0066CC` | **Yes** — e.g. `#0D0D0D` on `green` |
| `--color-focus-ring` | Usually matches `--color-border-focus` | **Yes** in named theme blocks |

**Implementation:** use `outline-color: var(--color-focus-ring, var(--color-border-focus))` (see component CSS). For Tailwind, prefer a token that maps to `var(--color-focus-ring)` from `tokens.css`, not `ring-[var(--color-theme-primary)]` for primary CTA fill colour.

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

  /* Default focus — blue; `green` theme overrides in tokens.css */
  --color-border-focus: #0066CC;
  --color-focus-ring: #0066CC;
}

/* ─── Blue Theme ─── */
:root[data-theme="blue"],
.theme-blue {
  --color-theme-primary: #1A56DB;
  --color-theme-hover: #1E40AF;
  --color-theme-active: #1E3A8A;
  --color-theme-disabled: #93B4F5;
  --color-theme-text: #FFFFFF;
  /* focus: default #0066CC from :root; optional theme tint in real tokens.css */
}

/* ─── Green Theme ─── */
:root[data-theme="green"],
.theme-green {
  --color-theme-primary: #15803D;
  --color-theme-hover: #166534;
  --color-theme-active: #14532D;
  --color-theme-disabled: #86EFAC;
  --color-theme-text: #FFFFFF;
  /* In repo tokens.css: green → #0D0D0D for --color-border-focus */
}

/* ─── Custom Theme (example) ─── */
:root[data-theme="custom"],
.theme-custom {
  --color-theme-primary: var(--custom-brand-color);
  --color-theme-hover: var(--custom-brand-darker);
  --color-theme-active: var(--custom-brand-darkest);
  --color-theme-disabled: var(--custom-brand-lighter);
  --color-theme-text: #FFFFFF; /* or #0D0D0D if brand is light */
  /* --color-focus-ring: see tokens.css; do not set to a failing contrast */
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
| Focus ring (typical) | `var(--color-border-focus)` / `var(--color-focus-ring)` (default `#0066CC`; `green` as in `tokens.css`) |
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
| "Change the focus ring to match the theme" | **REFUSE** ad hoc | Do not bind focus to `var(--color-theme-primary)`. Use or extend a **named** `data-theme` in `tokens.css` (e.g. `blue-mist`). Default focus is `#0066CC`; `green` has a dedicated focus token in `tokens.css`. |
| "Theme the border colours" | **REFUSE** | Borders are structural — `--color-border-*` tokens are locked |
| "Use a random colour for the primary" | **REFUSE** | All theme values must be tokens. No arbitrary hex without a token definition. |
| "Change the sidebar background" | **REFUSE** | Sidebar bg is structural (`--color-brand-primary` or `--color-bg-surface`), not themed |
| "Make the page background green" | **REFUSE** | Page bg `--color-bg-page` is locked at `#E0E0E0` |

### What the User Says → What Actually Happens

| User Says | Action |
|-----------|--------|
| "Make it blue" | Set `--color-theme-primary: #1A56DB` + derived hover/active/disabled. Buttons, CTAs, switch ON tracks change. Default **focus** stays **`#0066CC`** in `tokens.css` unless a named block says otherwise. Everything else structural stays. |
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
6. **Focus ring:** Do NOT derive from `--color-theme-primary`. Use `tokens.css` (`#0066CC` default; `green` as defined there). Add new tints only in reviewed theme blocks.

**Contrast check formula:** Theme primary bg → theme text must achieve ≥4.5:1. If the brand colour is too light (e.g., yellow, light green), flip text to `#0D0D0D`.

---

### AI Rules for Theming — Strict

1. **Theme ONLY affects the six `--color-theme-*` tokens** plus approved theme blocks in `tokens.css`. Structural tokens stay locked.
2. **Default focus** uses `--color-border-focus` / `--color-focus-ring` (typically `#0066CC`); **not** `var(--color-theme-primary)`. `green` sets a dedicated focus colour in `tokens.css`.
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
- [ ] Focus still uses `tokens.css` (default blue; `green` as defined) — not ad-hoc theme primary?
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
