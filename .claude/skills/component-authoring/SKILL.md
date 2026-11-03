---
name: component-authoring
description: |
  Use when building, extending, or migrating a React component in ui-common-components (atoms/molecules/charts), writing its Storybook stories, or adding a hook to ui-common-hooks. Triggers on requests to "build component", "add story", "create hook", "migrate AppShell/Avatar/Tooltip/TextInput", or "add variant".
---

Serves the component-author agent. Scope: canonical component file pattern
({Name}.types.ts + {Name}.config.ts + index.tsx + {Name}.stories.tsx + {Name}.test.tsx
+ optional {Name}.css), barrel export in src/index.tsx, TypeScript prop discipline
(read *.types.ts before generating — never invent props), Tailwind+CSS-variable tokens
(never hardcode hex/px), Storybook 8.6 Playground-first stories with argTypes on meta,
WCAG 2.2 AA baseline, legacy export-name migration (Avtar not Avatar, ToolTip not
Tooltip, Input not TextInput, DashboardShell not AppShell, variant="bordered" not
"outlined"/"filled"), and self-check against _fleet/QUALITY_CHECKLIST.md sections A, B, C
before marking the build done. The agent reads AGENTS.md (root) and follows its 20-file
reading order and Always/Never rules — this skill extends, never restates, that file.
## 1. Canonical component dir — author every file, in this order
Every new/migrated component lives in `src/components/{atoms|molecules|charts}/{Name}/`
and is barrel-exported from `src/index.tsx` (idempotent — never duplicate an export).
Read an existing dir first (e.g. `src/components/atoms/Button/`) to match house style.
File contract (all required unless marked optional):

- `{Name}.types.ts` — public API surface. Define the **prop interface** (e.g.
  `ButtonProps`), every **variant union** (e.g. `"primary" | "ghost" | …`), every
  **size union** (`"sm" | "md" | …`), and any sub-unions (`tone`, `shape`).
  Re-export the unions from this file — `*.config.ts` and consumers import them here.
- `{Name}.config.ts` — pure maps, no React. `variantClasses: Record<Variant,string>`
  (variant → CSS class from `tokens.css`), `sizeClasses: Record<Size,string>`,
  and `defaultProps` (the values used when a prop is omitted — e.g. Button defaults
  `variant` to `"primary"`, `size` to `"lg"`). This is the single place to change
  how a variant looks; never duplicate these maps in `index.tsx`.
- `index.tsx` — the component. `forwardRef`, set `displayName`, read classes from
  `*.config.ts`, merge `className` last (consumer escape hatch, never the primary
  styling path). Spread `...rest` for native HTML attrs. Render with tokens via the
  config classes — do not inline hex/px.
- `{Name}.stories.tsx` — **Playground story first** (see §4). Then one story per
  variant and per size. Title under `Design System/{Atoms|Molecules|Charts}/{Name}`.
- `{Name}.test.tsx` — vitest + jsdom. Three test classes, all required: (a)
  **rendering** — renders with default props, renders each variant, renders
  disabled/loading; (b) **a11y** — has an accessible name (icon-only uses
  `ariaLabel`), focus ring renders, role correct; (c) **interaction** — click
  fires `onClick`, `disabled` blocks click, `loading` blocks click and shows
  spinner, keyboard `Enter`/`Space` activate.
- `{Name}.css` (optional) — component-scoped styles. Only when a visual needs
  CSS `:hover`/`:focus-visible`/`@media` that a class in `tokens.css` doesn't
  already cover. Scope selectors to `.btn-*` / `.card-*` (never tag selectors).
  Use `var(--color-*)` / `var(--space-*)` / `var(--radius-*)` / `var(--shadow-*)`
  only.

## 2. Prop discovery — types-first, never invent
Before writing any JSX that uses a library component (yours or an existing one),
discover the real props. Order:
1. Read `node_modules/ui-common-components/dist/index.d.ts` for the **published**
   API (use this when consuming; it is the contract). If the package isn't
   installed, read the component's own `{Name}.types.ts` in `src/components/`.
2. Map the user's intent → props using the intent tables in `AGENTS.md` →
   "Card — intent → props", "Button — intent → props", "Badge — intent → props".
   Do NOT guess from generic React/Tailwind habits — `variant` means different
   things per component (Card=`bordered|elevated|withIndicator`,
   Button=`primary|ghost|…`, Badge=`neutral|danger|…`,
   Input=`outlined|filled|borderless|underlined`).
3. If a prop doesn't exist in `.types.ts`, do not use it. File a gap — do not
   paper over it with `className`/`style`/Tailwind. That is the #1 historical
   failure (was 3/10, now 8/10 after docs improved — don't regress it).

## 3. Token usage — CSS variables, never hex/px
Read `src/design-system/tokens.css` for the full token list; reference it, don't
restate. The always-true rules:
- Colors: `var(--color-*)` (e.g. `--color-bg-page`, `--color-text-primary`,
  `--color-brand-primary`, `--color-danger-strong`, `--color-border-default`,
  `--color-focus-ring`). NEVER hardcode hex (`#fff`, `#999`).
- Spacing: `var(--space-*)`. NEVER hardcode px padding/margin.
- Radii: `var(--radius-*)`. NEVER hardcode `border-radius`.
- Shadows: `var(--shadow-*)`. NEVER hardcode `box-shadow`.
- Tailwind utilities are for **layout** only (flex, grid, gap, `min-w-0`,
  `overflow-hidden`). NEVER use Tailwind for visual properties a prop covers
  (`variant`, `elevation`, `tone`, `size`, `rounded`, `borderTop`).
- Escape-hatch discipline: `backgroundColor`/`borderColor`/`textColor`/
  `classOverrides` exist on Button for one-off brand overrides — do not use them
  unless the user explicitly requests a one-off. Prefer `variant` + `size` +
  `rounded`. (Follow AGENTS.md → "Always/Never rules".)

## 4. Story authoring — Playground-first
Every component story must export **Playground** as the first story, with
`argTypes` on `meta` (not on the story) so the Controls panel is the live prop
catalog. Pattern (see `src/components/atoms/Button/Button.stories.tsx`):
```tsx
const meta: Meta<typeof Button> = {
  title: "Design System/Atoms/Button",
  component: Button,
  tags: ["autodocs"],
  argTypes: { variant: { control: "select", options: [...] }, ... },
};
export default meta;
export const Playground: StoryObj<typeof Button> = { args: { children: "Click", variant: "primary", size: "lg" } };
export const Primary = { args: { ... } };
// ...one story per variant
```
- Use the Storybook decorator classes from `.storybook/preview.css` for layout:
  `sb-page` (story canvas), `sb-card`/`sb-card-header`/`sb-card-title` (grouping),
  `sb-stack` (vertical stack), `sb-grid` (grid), `sb-inline` (row), `sb-divider`.
- Test in both themes: toggle `[data-theme="dark"]` (Storybook theme toolbar).
- Test at all viewports: 375 (mobile), 768 (tablet), 1440 (desktop) via the
  viewport toolbar.

## 5. Legacy migration table
When migrating legacy code, apply this table. Verify the canonical name by
checking `src/index.tsx` barrel exports — the export that is NOT marked
`@deprecated` is the canonical one.
| Legacy | Canonical | Notes |
|---|---|---|
| `AppShell` | `DashboardShell` | `AppShell` is exported as a `@deprecated` alias |
| `Avatar` | `Avtar` | spelling is intentional in this library |
| `Tooltip` | `ToolTip` | spelling is intentional |
| `TextInput` | `Input` | `InputSearch` is separate (search input) |
| `variant="outlined"` (Card) | `variant="bordered"` | also `"filled"` → `"bordered"` |
Grep your generated code for the legacy names before handing off — the
compliance-reviewer will grep for them too.

## 6. Pre-handoff self-check — QUALITY_CHECKLIST.md sections A, B, C
Before marking the build done, walk the new component through
`_fleet/QUALITY_CHECKLIST.md` (the testable checklist — do not restate it here).
For each dimension, record **file:line evidence** of the pass (or fix the fail):
- **A (Accessibility, A1-A10):** keyboard-reachable? focus ring via `--color-focus-ring`?
  contrast ≥4.5:1 (use the formula: relative luminance
  `L = 0.2126*R+0.7152*G+0.0722*B` with sRGB linearization, ratio
  `(L1+0.05)/(L2+0.05)`)? 44×44px touch target? label/aria-label on inputs?
  `aria-live` on feedback states?
- **B (Security, B1-B7):** no `dangerouslySetInnerHTML`? no `eval`/`new Function`?
  no inline handlers? Modal traps focus (via `useFocusTrap`)? Popover dismisses
  on outside-click + Escape (via `useDismissableLayer`)?
- **C (Responsiveness, C1-C7):** renders at 375/768/1440? no fixed width breaking
  below 375? dark mode holds contrast? `prefers-reduced-motion` respected?
Write the evidence (e.g. `A3 focus ring — src/components/X/index.tsx:42 (uses
--color-focus-ring)`) into the handoff notes for compliance-reviewer to verify.
Run `npm test -- --run` for the touched files — must pass before handoff.
