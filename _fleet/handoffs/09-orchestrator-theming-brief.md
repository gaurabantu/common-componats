# Sprint 5 — Theme presentation, dark-theme surfaces, interaction states (shared brief)

Same conventions, boundaries, quality bar and handoff rules as `_fleet/handoffs/05-orchestrator-sprint1-brief.md` (read it first). Started 2026-11-26.

## User request (verbatim intent)
1. The Storybook **Theme showcase** (`Design System/Theme showcase`, deployed at
   https://gaurabantu.github.io/common-componats/?path=/docs/design-system-theme-showcase--docs&globals=theme:infinia-dark)
   looks plain next to the reference https://forma-design-system-dusan.dusandsg.chatgpt.site/#icons
   (also see `#colors`). Make the presentation as polished as the reference.
2. With a dark theme selected, **some areas stay white and some go dark** — not consistent. Observed by the
   orchestrator with `infinia-dark`: sidebar is dark, but the Storybook toolbar strip and the whole Docs page
   (`.sbdocs` wrapper, title, description, preview frame chrome) stay white, while the embedded story is dark;
   Cards inside the showcase render with no visible surface/border.
3. **The theme selected in the toolbar must auto-apply everywhere** — every story, every Docs/MDX page, the
   manager chrome, and survive navigation and reload.
4. **Every theme** (light, blue, dark, green, mist, custom, blue-mist, green-mist, infinia-light, infinia-dark)
   needs proper **hover / selected / active / focus / text-selection** colours derived from its own palette
   (today several are missing, inherited from the wrong theme, or low contrast).

## Reference look (Forma) — what to borrow, not copy
No Forma names, logos, copy or exact layout. Borrow the *qualities*: small uppercase eyebrow
(`FOUNDATIONS / THEMES`), large tight title, one-line lead, metadata chips (`10 themes`, `WCAG 2.2 AA`, …),
a "signature" proportion bar for the palette, underline tabs to filter, labelled swatch strips (step + hex
caption), generous whitespace, 1px hairline borders, 8–12px radii, quiet shadows, selected tile with accent
ring, a right-hand detail panel for the selected item, and a copy-to-clipboard affordance on swatches/tokens.
All colours come from tokens (`var(--color-*)`) — no hex in story/app code.

## Slices (parallel — file ownership is exclusive; do not edit another slice's files, report instead)

### Slice L — Storybook theming infrastructure
Owns: `.storybook/**`, `src/portal/portal.css`, `src/portal/components/**`, `src/portal/pages/*.tsx`.
- Docs pages (autodocs + MDX portal pages) must follow the theme: `.sbdocs`, `.sbdocs-wrapper`, `.sbdocs-content`,
  titles, paragraphs, tables (ArgsTable), code/source blocks, `.docs-story` frame + its toolbar — all on
  `--color-bg-page` / `--color-bg-surface` / `--color-text-*` / `--color-border-*`. No white islands in any dark theme.
- Manager chrome (toolbar strip, panel, addons, search) must match the theme for all 10 (see `manager.ts`,
  `manager-palettes.ts`, `manager-head.html`, `theme-bridge.ts`).
- Theme auto-applies on every page type and **persists across reload** (e.g. initialise from URL globals, else
  a remembered last choice via try/catch localStorage). Keep the `data-theme` on `<html>` contract.
- `parameters.backgrounds` default must not paint a fixed light canvas over a dark theme.
- Remove hardcoded white/hex in `src/portal/pages/FoundationPages.tsx` and portal components.
- Verify in a local Storybook (`npm run storybook` or `build-storybook` + static server) in headless Chrome for
  `light`, `dark`, `infinia-dark`, `mist`: no element with a light background inside a dark theme (script a
  check: walk visible elements, flag computed background luminance > 0.8 while theme is dark).

### Slice M — Theme showcase redesign
Owns: `src/ThemeShowcase.stories.tsx`, `src/portal/pages/Themes.mdx` (+ a new co-located
`src/ThemeShowcase.css` if needed).
- Rebuild the showcase in the reference style above. Must cover **all 10 themes** (infinia-light/dark are missing today).
- Render each theme side by side using a **nested `data-theme` wrapper** (tokens.css supports `[data-theme=x]` on
  any element; classic = `data-theme="classic"`), so users can compare all themes at once, plus a "current theme"
  section that follows the toolbar.
- Per theme: signature bar, swatch strip (brand / surfaces / text / border / status), and an **interaction-state
  matrix** (default, hover, selected, active/pressed, focus-visible, disabled) using real library components
  (Button, Tabs, SegmentedControl, List/menu item, Checkbox, Input, Badge, Card).
- Clicking a theme card applies it globally (Storybook `useGlobals` / `updateGlobals` → `theme`).
- Copy-token-to-clipboard on swatches with a polite live-region confirmation. Responsive to 375px.
- Uses tokens Slice N adds — coordinate by reading `src/design-system/tokens.css` once N lands; until then use
  existing tokens and list in your handoff which new token names you consume.

### Slice N — Interaction-state tokens + dark-surface audit
Owns: `src/design-system/tokens.css`, `tailwind.preset.js`, `tailwind.config.js`, `app/globals.css`, and component
CSS/TSX under `src/components/**` (style-only changes; no API changes).
- Define a complete, consistent interaction-state token set for every theme, derived from that theme's palette,
  e.g. `--color-state-hover-bg`, `--color-state-selected-bg`, `--color-state-selected-fg`, `--color-state-selected-border`,
  `--color-state-active-bg`, `--color-focus-ring`, `--color-selection-bg` / `--color-selection-fg` (`::selection`).
  Reuse/alias existing names (`--color-theme-hover`, `--color-theme-surface-hover`, `--color-theme-active`) rather
  than duplicating; document the set in the tokens.css header. AA contrast: selected-fg on selected-bg ≥ 4.5:1,
  focus ring ≥ 3:1 against adjacent surface, hover bg distinguishable from rest bg in every theme.
- Known escalations to close here: dark + green-mist focus ring <3:1, dark `--color-border-strong` not overridden,
  dark primary Button text 3.68:1, light `--color-warning-strong`/`--color-success-strong` on bg-page.
- Audit components for hardcoded light surfaces / hex / `bg-white` / `#fff` / Tailwind palette classes that ignore
  the theme (start: `grep -rnE "#fff\b|#ffffff|white|bg-white|bg-gray-|text-gray-" src/components`) and move
  hover/selected/active styles of interactive components (Tabs, List, Menu/Dropdown, Select options, Combobox,
  Table rows, Pagination, SegmentedControl, Sidebar nav, Checkbox/Radio, Calendar/DateRangePicker days) onto the
  new state tokens.
- Add/extend `src/design-system/darkThemeFills.test.ts` (or a new test) asserting every theme block defines
  every state token, and a contrast test for the AA pairs above.

## Gate
vitest green (baseline: run `npx vitest run` before you start and record the count), `tsc` clean for touched
files, `npm run build-storybook` succeeds, quality checklist A/B/C self-cleared.
Handoffs: `_fleet/handoffs/09{l|m|n}-component-author-to-compliance-reviewer.md`.

## Addendum (user, 2026-11-26, mid-run)
- **Infinia themes (infinia-light, infinia-dark) are approved as-is — do not change their look** (tokens or manager palette). Additions must alias the colours they already use.
- The other 8 themes: the Storybook sidebar selected row currently shows the Infinia olive fill (#6b5900) with white text. Every theme's selected and hover states (sidebar, toolbar, tabs, toggles, components) must use **that theme's own accent**, in the same filled style as Infinia, with text at ≥4.5:1. Routed to L (manager) and N (tokens).
- (later, user) Infinia selected sidebar row must be the **light tint** style of the Infinia app nav (pale yellow fill, hairline yellow border, dark text, olive icon), not the solid olive/yellow fill. Orchestrator applied this inline to all 10 themes via `--sb-sel-*` in `.storybook/brand/infinia-manager-brand.css` (end of file); also fixes the infinia-dark 1.43:1 white-on-yellow row.
