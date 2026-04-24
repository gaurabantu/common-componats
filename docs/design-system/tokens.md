# Design tokens — quick reference

> **Version:** 2.0.0 · Narrative rules: [`DESIGN_SYSTEM.md`](./DESIGN_SYSTEM.md) · Public alias: [`UX-Governance-Design-System.md`](./UX-Governance-Design-System.md) · Components: [`../UI_COMPONENTS_GUIDE.md`](../UI_COMPONENTS_GUIDE.md)

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
- **Borders (colour):** `--color-border-default` (structural); `--color-border-subtle` (decorative / hairline); **roles:** `--color-border-interactive`, `--color-border-strong`, `--color-border-selected`, `--color-border-error`; **default focus outline:** `--color-border-focus` (default **`#0066CC`** on classic light / dark — contrasts with gray borders). **Orange** `#FF4D00` is **`--color-brand-secondary`**, not the default focus border. **`green` (light)** uses **`#0D0D0D`** for focus (structural contrast on mint). **`green-dark`** uses **`#E2E8F0`** (light focus ring on dark teal).
- **Border (width only):** `--border-width-thin` … `--border-width-thick` — pair with `solid` and a border colour, e.g. `border: var(--border-width-thin) solid var(--color-border-default)`.
- **Shorthand stroke (library):** `--border-thin` / `--border-default` are `*px solid` for `border: var(--border-thin) var(--color-border-default)`.
- **Focus:** **`--color-border-focus`** and **`--color-focus-ring`** default to **`#0066CC`** (classic light / `blue` / `dark`). **`--color-focus-ring`** is overridden in some themes (`green`, `green-mist` pairings, `blue-mist`, etc.). **Primary filled** buttons use `--button-primary-focus-ring` (usually `var(--color-border-focus)`).
- **Text:** `--text-caption-size` (alias of `--text-small-size`); **roles:** `--color-text-disabled`, `--color-text-on-primary`, `--color-text-on-primary-inverse`, `--color-text-link`.
- **State:** includes `--color-state-info`.
- **Accents:** tin/mid/foreground, e.g. `--color-accent-sky-40` and `--color-accent-sky-fg` (see `tokens.css`).
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
| `green-dark` / `.theme-green-dark` | Teal / emerald dark brand. |
| `mist` / `.theme-mist` | Ion Mist page/sidebar/surfaces. |
| `custom` / `.theme-custom` | Rose example (§42 slots). |
| `blue-mist` / `.theme-blue-mist` | Blue interaction + Mist backgrounds; theme **focus** (`--color-focus-ring`). |
| `green-mist` / `.theme-green-mist` | Green interaction + Mist backgrounds; theme **focus** (`--color-focus-ring`). |

Do **not** set conflicting `data-theme` on the same root. The header of **`src/design-system/tokens.css`** also documents `data-theme` values.

## Do not

- Hard-code hex or raw px in components when a token exists.
- Tint shadows — use the `--shadow-*` scale only.
- Duplicate a second copy of `:root` in app code; extend via overriding CSS variables **after** importing `tokens.css` if needed.
