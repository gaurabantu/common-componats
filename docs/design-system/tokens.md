# Design tokens — quick reference

> **Version:** 2.0.0 · Narrative rules: [`DESIGN_SYSTEM.md`](./DESIGN_SYSTEM.md) · Tables: [`DESIGN_SYSTEM_TOKENS_REFERENCE.md`](./DESIGN_SYSTEM_TOKENS_REFERENCE.md) · Themes: [`THEMES.md`](./THEMES.md)

## Runtime source of truth

In this repo, tokens live in:

**`src/design-system/tokens.css`**

Consumers should import the published path **once** at app root:

```ts
import "ui-common-components/design-system/tokens.css";
```

Bundled apps may also load **`ui-common-components/index.css`** for component-level CSS (see root `README.md`).

Smaller JS graphs are available via subpath imports (`ui-common-components/charts`, `/shell`, `/table`); see **Import paths (bundle size)** in [`../UI_COMPONENTS_GUIDE.md`](../UI_COMPONENTS_GUIDE.md).

## What to use in code

- **Spacing:** `--space-0` … `--space-8` (8pt grid; see design system for allowed micro-gap rules).
- **Borders (colour):** `--color-border-default` (structural); `--color-border-subtle` (decorative / hairline); **roles:** `--color-border-interactive`, `--color-border-strong`, `--color-border-selected`, `--color-border-error`; **default focus outline:** `--color-border-focus` (default **`#0066CC`** on classic light / dark — contrasts with gray borders). **Orange** `#FF4D00` is **`--color-brand-secondary`**, not the default focus border. **`green` (light)** uses **`#0D0D0D`** for focus (structural contrast on mint).
- **Border (width only):** `--border-width-thin` … `--border-width-thick` — pair with `solid` and a border colour, e.g. `border: var(--border-width-thin) solid var(--color-border-default)`.
- **Shorthand stroke (library):** `--border-thin` / `--border-default` are `*px solid` for `border: var(--border-thin) var(--color-border-default)`.
- **Focus:** **`--color-border-focus`** and **`--color-focus-ring`** default to **`#0066CC`** (classic light / `blue` / `dark`). **`--color-focus-ring`** is overridden in some themes (`green`, `green-mist` pairings, `blue-mist`, etc.). **Primary filled** buttons use `--button-primary-focus-ring` (usually `var(--color-border-focus)`).
- **Text:** `--text-caption-size` (alias of `--text-small-size`); **roles:** `--color-text-disabled`, `--color-text-on-primary`, `--color-text-on-primary-inverse`, `--color-text-link`.
- **State:** `--color-state-success`, `--color-state-warning`, `--color-state-error`, `--color-state-info` — base semantic colours.
- **Feedback / status (EmptyState, ErrorState, OfflineBanner, illustrations):** layered tokens mapped from state + accent families:
  - **Surfaces:** `--color-fill-muted` (panel wash, Ion Mist on light), `--color-fill-surface` (solid inset blocks).
  - **Danger:** `--color-danger-strong` → `--color-state-error`; `--color-danger-fill` → `--color-accent-rose-10`.
  - **Success:** `--color-success-strong` → `--color-accent-mint-fg` (light) / `--color-state-success` (dark); `--color-success-fill` → `--color-accent-mint-10`.
  - **Info:** `--color-info-strong` → `--color-accent-sky-fg` (light) / `--color-state-info` (dark); `--color-info-fill` → `--color-accent-sky-10`.
  - **Warning:** `--color-warning-strong` → `--color-accent-amber-fg` (light) / `--color-state-warning` (dark); `--color-warning-fill` → `--color-accent-amber-10`; `--color-warning-soft` → translucent banner wash.
  - **Radius:** `--radius-control` — alias of `--radius-md` (6px) for compact controls inside feedback molecules.
- **Accents:** tint/mid/foreground, e.g. `--color-accent-sky-40` and `--color-accent-sky-fg` (see `tokens.css`).
- **Switch:** `--switch-track-on` / `off`, `--switch-thumb`, `--switch-border-on` / `off`, `--switch-focus-ring` (defaults to `var(--color-border-focus)`).
- **Motion / opacity / layout:** `--duration-*`, `--easing-*`, `--opacity-*`, `--size-icon-*`, `--size-avatar-*`, `--grid-breakpoint`, etc.
- **Primary / interaction theme (§42):** `--color-theme-primary`, `--color-theme-hover`, `--color-theme-active`, `--color-theme-disabled`, `--color-theme-text`, `--color-theme-surface-hover` — the six **brand** slots; named theme blocks may also change surfaces (e.g. `mist`).
- **Z-index:** `--z-base` through `--z-tooltip-top` — avoid ad-hoc `9999`.
- **Buttons:** `--button-height-lg` (44px) through `--button-height-xxs` — size encodes hierarchy; **destructive** aliases: `--button-destructive-bg` / `--button-destructive-hover-bg` align with danger fills.

### Theme `data-theme` (and `theme-*` classes)

| Key | Role |
|-----|------|
| (default) / `blue` / `.theme-blue` | Classic light: blue **interaction**; Noir **filled** CTA. |
| `green` / `.theme-green` | Green **interaction**; remapped button/link tokens. |
| `dark` / `.dark` | Dark neutral surfaces. |
| `mist` / `.theme-mist` | Ion Mist page/sidebar/surfaces. |
| `custom` / `.theme-custom` | Rose example (§42 slots). |
| `blue-mist` / `.theme-blue-mist` | Blue interaction + Mist backgrounds; theme **focus** (`--color-focus-ring`). |
| `green-mist` / `.theme-green-mist` | Green interaction + Mist backgrounds; theme **focus** (`--color-focus-ring`). |

**Dashboard shell (`AppTopbar`, `AppSidebar`):** Named themes set **`--app-shell-topbar-*`** and **`--app-sidebar-*`** on the document root so the left rail and header track **`data-theme`** automatically. Prefer importing **`tokens.css`** once on `<html>` and omitting `tokens` / `mergeTopbarTokensStyle` overrides unless you must support a bespoke host palette.

Do **not** set conflicting `data-theme` on the same root. The header of **`src/design-system/tokens.css`** also documents `data-theme` values.

**Storybook only:** the manager sidebar uses a hex snapshot adapter (`.storybook/manager-palettes.ts`) because Storybook's JS theme API cannot parse `var(--token)`. Preview iframe and all consumer apps use **`tokens.css` directly** — see [`THEMES.md`](./THEMES.md) § Theming architecture.

### Feedback / status token map (v2.0.0)

| Token | Light (classic blue) source | Used for |
|-------|----------------------------|----------|
| `--color-fill-muted` | `--color-mist-40` | Empty/error panel background wash |
| `--color-fill-surface` | `--color-bg-surface` | Detail blocks, inset surfaces |
| `--color-danger-strong` | `--color-state-error` | Error icons, illustration strokes |
| `--color-danger-fill` | `--color-accent-rose-10` | Error panel tint |
| `--color-success-strong` | `--color-accent-mint-fg` | Success icons |
| `--color-success-fill` | `--color-accent-mint-10` | Success panel tint |
| `--color-info-strong` | `--color-accent-sky-fg` | Info icons |
| `--color-info-fill` | `--color-accent-sky-10` | Info panel tint |
| `--color-warning-strong` | `--color-accent-amber-fg` | Warning icons, offline emphasis |
| `--color-warning-fill` | `--color-accent-amber-10` | Warning panel tint |
| `--color-warning-soft` | `color-mix(…)` of warning fill | Sticky offline banner wash |
| `--radius-control` | `--radius-md` (6px) | Compact controls inside feedback UI |

**Dark (`data-theme="dark"`):** strong colours use `--color-state-*`; fills use **`color-mix(in srgb, state 18–20%, var(--color-bg-surface))`** — not light accent `-10` washes; `--color-fill-muted` → `--color-surface-mist`; `--color-border-subtle` → `--color-surface-mist`.

**Mist family (`mist`, `blue-mist`, `green-mist`):** `--color-fill-muted` → `--color-mist-80` for panel contrast on `#EDEDED` page.

Component reference: [`../FEEDBACK_STATES_GUIDE.md`](../FEEDBACK_STATES_GUIDE.md).

## Do not

- Hard-code hex or raw px in components when a token exists.
- Tint shadows — use the `--shadow-*` scale only.
- Duplicate a second copy of `:root` in app code; extend via overriding CSS variables **after** importing `tokens.css` if needed.
