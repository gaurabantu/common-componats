# Design tokens — quick reference

> Narrative rules and governance: [`DESIGN_SYSTEM.md`](./DESIGN_SYSTEM.md) · Component usage: [`../UI_COMPONENTS_GUIDE.md`](../UI_COMPONENTS_GUIDE.md)

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
- **Borders:** `--color-border-default` (structural UI outlines); `--color-border-subtle` (decorative separators — modal/header/footer rules, card footer, tabs underline, button-group hairline, default `Divider`; maps to Ion Mist-60 on light themes in `tokens.css`).
- **Focus ring (constant):** `--color-focus-ring` — do not replace with theme primary; accessibility invariant.
- **Primary / interaction theme (§42-style):** `--color-theme-primary`, `--color-theme-hover`, `--color-theme-active`, `--color-theme-disabled`, `--color-theme-text`, `--color-theme-surface-hover` — only these semantic theme slots are intended to swap for brand colour; structural borders, text greys, card surfaces stay as defined in `tokens.css`.
- **Z-index:** `--z-base` through `--z-tooltip-top` — avoid ad-hoc `9999`.
- **Buttons:** `--button-height-lg` (44px) through `--button-height-xxs` — size encodes hierarchy.

Optional HTML theme switches are documented in the header comments of **`tokens.css`** (e.g. `data-theme` attributes).

## Do not

- Hard-code hex or raw px in components when a token exists.
- Tint shadows — use the `--shadow-*` scale only.
- Duplicate a second copy of `:root` in app code; extend via overriding CSS variables **after** importing `tokens.css` if needed.
