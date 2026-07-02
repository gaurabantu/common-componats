# Design System — Token & CSS Reference

> **Companion to:** [`DESIGN_SYSTEM.md`](./DESIGN_SYSTEM.md) (principles, component rules, governance)  
> **Runtime source of truth:** `src/design-system/tokens.css` (published as `ui-common-components/design-system/tokens.css`)  
> **Quick import guide:** [`tokens.md`](./tokens.md) · **Themes:** [`THEMES.md`](./THEMES.md)  
> **Last verified against library:** 2026-07-02 · `ui-common-components` v0.0.2

This file holds **tables and CSS dumps only**. Narrative rules, component behaviour, and governance live in **`DESIGN_SYSTEM.md`**. Do not duplicate rule prose here.

---

## Summary tables (§1–14 legacy quick reference)

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
| color/brand/secondary | `--color-brand-secondary` | `#FF4D00` | Accent, emphasis, secondary interactive highlights (not the default **keyboard** focus — use `--color-border-focus` / `--color-focus-ring`) |
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
| Classic blue (light) — default | No attribute; or `data-theme="blue"` / `theme-blue` on `<html>` | Gray page, neutral borders, blue **interaction** theme (`#2563EB` family); **filled** primary CTA remains Noir (see §10). |
| Green (light) | `data-theme="green"` or `theme-green` | Green **interaction** — `#15803D` / hover / active / disabled; remapped `button` / outline tokens in `tokens.css`. |
| Dark (neutral / blue CTA) | `data-theme="dark"` or `dark` | Slate surfaces; blue primary tokens. |
| Ion Mist (backgrounds) | `data-theme="mist"` or `theme-mist` | Lighter gray page, sidebar, and card surfaces. |
| Custom (example rose) | `data-theme="custom"` or `theme-custom` | Only the six `--color-theme-*` slots (§42) swap to the rose set. |
| Blue + Mist | `data-theme="blue-mist"` or `theme-blue-mist` | Blue **interaction** + Mist backgrounds; **focus ring** for outlines uses a brand tint via `--color-focus-ring` in `tokens.css`. |
| Green + Mist | `data-theme="green-mist"` or `theme-green-mist` | Green **interaction** + Mist backgrounds; **focus ring** brand tint. |

Do **not** combine conflicting `data-theme` values on the same root. Choose one named theme from `tokens.css` (for example **`dark`**, **`green`**, **`green-mist`**).

### Focus (v2.0.0)

- **`--color-border-focus`** / **`--color-focus-ring`:** default **`#0066CC`** on **classic light**, **`data-theme="blue"`**, and **`dark`** (strong contrast on gray structural borders `#999` / slate). **`#FF4D00`** remains **`--color-brand-secondary`** (accents), not the default focus border token.
- **Green (light):** `#0D0D0D` for `--color-border-focus` / `--color-focus-ring` (strong on mint).
- **Named** themes (`blue-mist`, `green-mist`, `custom`, etc.) may set a **tinted** `--color-focus-ring` per the theme block. Do not override focus tokens to a low-contrast colour.

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
| Focus | `#0D0D0D` | `#0D0D0D` | `#FFFFFF` | `var(--color-border-focus)` (default `#0066CC`; `green` `#0D0D0D`) |
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
--button-primary-focus-ring:    var(--color-border-focus); /* #0066CC default */
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


---

## Full CSS variables block (legacy snapshot)

> Prefer importing **`tokens.css`** at runtime. This block is a documentation snapshot; when in doubt, read `src/design-system/tokens.css`.

### `:root` snapshot

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
  --color-border-focus: #0066CC;
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
  --button-primary-focus-ring: var(--color-border-focus);
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
  --switch-focus-ring: var(--color-border-focus);
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

