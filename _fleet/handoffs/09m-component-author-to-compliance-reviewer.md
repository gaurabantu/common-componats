# Handoff: component-author (agent M) -> compliance-reviewer

- **Task:** Sprint 5 Slice M: redesign the Storybook Theme showcase (`Design System/Theme showcase`) to match the reference presentation, cover all 10 themes side by side via nested `data-theme`, add an interaction-state matrix per theme, apply a theme globally on click, and copy tokens to the clipboard.
- **Status:** ready (no commit, per brief)

## Objective
Review Slice M (`src/ThemeShowcase.stories.tsx`, `src/ThemeShowcase.css`, `src/ThemeShowcase.test.tsx`) against `_fleet/QUALITY_CHECKLIST.md` A/B/C, and record a PASS/FAIL per dimension in `_fleet/VERDICT-sprint5.md`.

## Output format
Add a Slice M section to `_fleet/VERDICT-sprint5.md` with:
- one verdict line each for A11y, Security and Responsiveness;
- for each defect, a `file:line` or a command plus its output, and a severity (P1/P2/P3);
- a separate "external" list for the token and library defects listed under Open questions. Those are outside Slice M and must not fail Slice M.

## Sources and tools
- Slice files: `src/ThemeShowcase.stories.tsx` (1143 lines), `src/ThemeShowcase.css` (876), `src/ThemeShowcase.test.tsx` (186).
- Briefs: `_fleet/handoffs/09-orchestrator-theming-brief.md` (Slice M) and `_fleet/handoffs/05-orchestrator-sprint1-brief.md` (conventions).
- Tests: `npx vitest run src/ThemeShowcase.test.tsx` gives 13/13. Full suite: `npx vitest run`.
- Typecheck: `npx tsc --noEmit -p tsconfig.json 2>&1 | grep ThemeShowcase` prints nothing. The repo has 5 tsc errors elsewhere that I did not touch: useRipple and FeedbackStates stories.
- Browser evidence is in `_fleet/evidence/09m/`. It has 18 full-page PNGs named `{story|docs}-{light|dark|infinia-dark}-{375|768|1440}.png`, plus the scripts in `_fleet/evidence/09m/scripts/`. These are a small Chrome DevTools Protocol helper (`cdp.cjs`, which needs `node_modules/ws` and Google Chrome) and four checks: `sb.cjs` (overflow, light-surface scan, contrast labels), `axe.cjs` (axe-core in Chrome for all 10 themes), `e2e2.cjs` (tile click → global theme + focus + live region) and `nestprobe.cjs` (nested-theme token resolution). To run them:
  1. Start Storybook with `npx storybook dev -p 6126 --ci --no-open`.
  2. Run `node cdp.cjs sb.cjs` (env: `VM=story|docs`, `THEMES=…`, `WIDTHS=…`, `NOSHOT=1`).
- Storybook ids: `design-system-theme-showcase--docs` (the docs page renders only the `Playground` story), plus `--playground`, `--gallery` (kept for old links), `--compare-themes`, `--palette` and `--interaction-states`.
- Do not use `storybook-static/`. I built into the scratchpad (`npx storybook build -o <scratch>`, exit 0) so I would not touch the tracked output or `.storybook/downloads`.

## Boundaries
- I edited only Slice M files: `src/ThemeShowcase.stories.tsx` (rewritten), `src/ThemeShowcase.css` (new) and `src/ThemeShowcase.test.tsx` (new co-located test).
- `src/portal/pages/Themes.mdx` is **unchanged**. It still renders `ThemesPage` (Slice L's `FoundationPages.tsx`), which already links to the showcase. Embedding the full showcase there would duplicate the Theme lab.
- I did not touch `.storybook/**`, `src/portal/**`, `tokens.css`, `src/components/**`, `src/index.tsx` or `package.json`. The showcase is Storybook-only, so it needs no barrel export.
- Out of scope for this review: token values (Slice N) and Storybook chrome or persistence (Slice L). The token and library defects that the showcase now *surfaces* are listed under Open questions.

## Context digest
- **Layout** (borrowed qualities only; no reference names or copy). The page is built in `ThemeShowcase()` (stories.tsx:937):
  - a hero with an eyebrow, a tight title, a lead line, metadata chips and a "Copy `<html>` snippet" action;
  - a **signature card** with a 46/26/14/9/5 proportion bar (page / surface / ink / primary / accent);
  - an **"Every theme" grid** of 10 tiles. Each tile renders in its own nested theme with a signature bar, a sample button and link, a 6-state mini strip and status dots. The selected tile gets an accent ring and an "Active" flag;
  - a **palette explorer** with underline `Tabs` filters, labelled swatch strips (step label, resolved hex, live WCAG ratio) and a right-hand detail panel (sticky at ≥1024px) with Copy token and Copy value;
  - a **States** section with a static state matrix and live library components.
- **Nested themes.** `ThemeScope` (stories.tsx:118) sets `data-theme` (classic → `data-theme="classic"`) on a wrapper. My first probe showed that the pre-Sprint-5 `tokens.css` did **not** support this: 1791 token mismatches, e.g. a nested classic region inside dark kept `--color-bg-page:#111827`. Slice N then rebased the base blocks onto `:root, [data-theme], .theme-*` and moved green after the base. `nestprobe.cjs` now reports **0 mismatches** for every theme nested under the light, dark, infinia-dark, green and mist documents. The test at test.tsx "tokens.css re-declares the base palette on any nested [data-theme]" guards that contract.
- **Global apply.** `applyGlobalTheme` (stories.tsx:88) emits `UPDATE_GLOBALS {theme}` on the preview channel, which works in both story and docs mode. Outside Storybook it falls back to `<html data-theme>`. "Current theme" follows `<html data-theme>` through a MutationObserver (stories.tsx:70-82), so it tracks the toolbar on every page type.
- **Remount.** Slice L's `withTheme` decorator creates a new `Bridge` component on every render (`.storybook/preview.tsx:54-63`), so a globals change **remounts** the story. That would drop the live-region message and keyboard focus. I park both in `pendingApply` (stories.tsx:930) and replay them on the next mount within 1.5s, with a test for it.
- **Values on screen are computed, not stored.** Swatch hex captions and ratios come from `getComputedStyle` at runtime (`resolveSwatches`, stories.tsx:319). Alpha values are composited over `--color-bg-surface`, and the ratio uses the WCAG formula. There is no hex in the slice code: `grep -nE "#[0-9a-fA-F]{3,8}\b" src/ThemeShowcase.css src/ThemeShowcase.stories.tsx` finds nothing.
- **The state matrix uses real Buttons.** Hover and pressed are frozen by pointing `--button-primary-default-bg` at the hover/active token (css:771-778). Focus uses the same `--button-primary-focus-ring` outline as Button (css:779). Disabled uses the real `disabled` prop. The Menu-row specimens are painted from the state tokens. Live components in prop-driven states: Button ×5, Tabs (selected and disabled trigger), SegmentedControl (disabled option), List (selected and disabled row), Checkbox (checked, indeterminate, disabled), Input (default, `status="error"`, disabled), Badge ×7, interactive selectable Card, and a text-selection paragraph.
- **Tokens consumed.** All of these exist once Slice N lands; each has a fallback chain in the alias block at css:23-46:
  - Slice N state tokens: `--color-state-hover-bg`, `--color-state-hover-fg`, `--color-state-active-bg`, `--color-state-selected-bg`, `--color-state-selected-fg`, `--color-state-selected-subtle-bg`, `--color-state-selected-border`, `--color-state-selected-text`, `--color-state-disabled-bg`, `--color-state-disabled-fg`, `--color-selection-bg`, `--color-selection-fg`.
  - Existing tokens: `--color-theme-*`, `--color-bg-{page,surface,elevated,sidebar}`, `--color-fill-muted`, `--color-surface-inverse`, `--color-text-{primary,secondary,disabled,link,on-inverse}`, `--color-border-{default,subtle,strong}`, `--color-focus-ring`, `--color-{success,warning,danger,info}-{strong,fill}`, `--color-brand-secondary`, `--button-primary-*`, `--space-*`, `--radius-*`, `--shadow-xs/sm`, `--border-width-*`, `--text-*`, `--duration-fast`, `--easing-default`, `--size-touch-target`, `--size-icon-dense`, `--button-height-{xs,md}`.
  - A swatch whose token is not declared shows "fallback" in place of the hex value. Today only **infinia-light and infinia-dark: `--color-selection-bg`** shows it.

### Self-check, QUALITY_CHECKLIST A / B / C
- **A1 keyboard:** tiles, swatches, the matrix scroll region (`tabIndex=0`, stories.tsx:716), Tabs, the detail buttons and the live components are all native controls. The matrix specimen Buttons are `inert` (stories.tsx:706) and carry an sr-only state label, so there are no dead tab stops.
- **A3 focus:** `.ts-tile:focus-visible` css:312, `.ts-swatch:focus-visible` css:524 and `.ts-matrix-scroll:focus-visible` css:721 all use `--color-focus-ring`.
- **A state:** tiles and swatches use `aria-pressed` (stories.tsx:435 and the Swatch at :495). Tile names start with the visible theme name, which satisfies label-in-name (2.5.3).
- **A contrast:**
  - axe-core in Chrome over all 10 themes reports **0 violations in slice markup**.
  - The remaining violations sit only inside library `Badge` / `Button` in the live section, or are intentional ratio displays of failing token pairs (see Open questions).
  - Disabled specimens carry `aria-disabled` (stories.tsx:423) and are exempt under 1.4.3.
  - The "Active" flag uses the selected-fill pair (css:409).
- **A live region:** a polite `role="status"` region (stories.tsx:1069) announces copy, copy failure and theme-applied messages. It clears and re-sets so repeated messages are read again.
- **A axe (jsdom):** test "has no axe violations" (color-contrast is checked in Chrome instead).
- **A touch:** swatch min-height is `--size-touch-target` (css:512), tiles are at least 200px tall, and the coarse-pointer tile meta is 44px (css:841).
- **B:** no `dangerouslySetInnerHTML`, `eval` or `new Function`, and no inline handlers. The clipboard goes through the existing `copyText` (CodeBlock.utils). Channel emit is inside try/catch.
- **C1/C2 (0px horizontal overflow at 375/768/1440, story and docs, light/dark/infinia-dark):**
  - `documentElement.scrollWidth === innerWidth` in every case.
  - The matrix scrolls inside its own region. css:714 adds `position: relative` so the absolutely positioned sr-only labels cannot widen the page; this was a 674px bug that is now fixed.
  - Grids use `minmax(min(100%, …), 1fr)`, and at ≤640px there are 2 swatch columns (css:827).
- **C dark:** the light-surface scan (background luminance > 0.8) in dark and infinia-dark finds only swatch chips and signature segments that paint light tokens on purpose. No slice surface stays white, in story or docs mode.
- **C motion / forced colours:** `prefers-reduced-motion` is handled at css:847 and `forced-colors` at css:859 (selection outlines use Highlight).

### Tests
- **Before:** baseline `npx vitest run` was 992 tests in 67 files at sprint start.
- **After:** 1261 in 70 files, all green. That count includes Slice L and N tests landing in parallel.
- **This slice:** 13 tests in `src/ThemeShowcase.test.tsx`. They cover colour maths, ThemeScope, the tokens contract, 10 tiles plus active state, `UPDATE_GLOBALS` emit and announce, the `<html>` fallback, remount replay of focus and announcement, swatch copy plus live region plus detail panel, Tabs filtering, matrix columns and live components, and axe.

## Failed approaches
- **Workaround before Slice N landed:** a three-element scope (`data-theme="classic"` reset → `.theme-blue` on the same element as the theme attribute → green one level deeper), plus a `.ts-scope-reset` list of 28 theme-only tokens set to `initial`. This cut mismatches from 1791 to 256; the rest were `--switch-focus-ring`, the app-shell focus ring and the infinia role tokens. I dropped it once Slice N's base-selector fix produced 0 mismatches with a plain nested `data-theme`.
- **Bad count from my first nested-token probe:** it reported 0 diffs because its colour-normalising helper was wrong. A manual spot-check, html dark → nested classic `--color-bg-page:#111827`, proved the real breakage; the probe was then rewritten (`nestprobe.cjs`).
- **The default autodocs page rendered the full showcase twice** (Primary + Stories): 20 tiles, heavy. I replaced it with a custom `docs.page` (Title / Description / Primary, stories.tsx:1090) and tagged the extra stories `!autodocs`.
- **The `<Controls/>` ArgsTable overflowed a 375px docs page by 31px.** It is Storybook's table, so I removed it from the docs page; the `sections` control is still in the canvas Controls panel.
- **The "theme applied" announcement and focus were lost** after a tile click in Storybook, because the decorator remounts the story. I fixed this with the `pendingApply` replay (verified by `e2e2.cjs`: theme dark, focused tile dark, status "Dark theme applied to every page.").
- **The tile "Live" Badge and the "Active" solid Badge failed contrast** (library Badge, e.g. classic success soft 2.99:1). I replaced them with token-painted elements inside tiles.

## Artifacts
| Path | What it is | State |
|------|-----------|-------|
| `src/ThemeShowcase.stories.tsx` | Showcase (ThemeScope, colour maths, palette explorer, state matrix, live components, 5 stories + custom docs page) | final |
| `src/ThemeShowcase.css` | Slice-scoped `ts-*` styles, tokens only, state aliases on `.ts-root, .ts-scope` | final |
| `src/ThemeShowcase.test.tsx` | 13 vitest tests | final |
| `_fleet/evidence/09m/*.png` | 18 full-page screenshots (story/docs × light/dark/infinia-dark × 375/768/1440) | final |
| `_fleet/evidence/09m/scripts/*` | CDP helper + sweep / axe / e2e / nesting probe scripts | final |

## Acceptance criteria
- `npx vitest run src/ThemeShowcase.test.tsx`: 13 pass. Full `npx vitest run` is green.
- `tsc` reports nothing for `ThemeShowcase`.
- At 375, 768 and 1440 in the story and docs views, for light, dark and infinia-dark: no horizontal overflow and no white surface from the slice inside a dark theme.
- Selecting a tile updates the toolbar global, the preview `<html>` and the manager. The theme survives navigation, focus returns to the tile, and the polite status announces the change.
- Clicking a swatch copies `var(--token)` and announces "Copied …".
- axe-core in Chrome reports no slice-owned violations in any of the 10 themes.

## Open questions
These are for the orchestrator to route to Slices N and L. They are not Slice M defects. The showcase surfaces them through its live ratios and live components.

**Slice N: token defects (ratios computed in Chrome):**
1. **P1** — dark `--color-surface-inverse` / `--color-text-on-inverse` = **1.00:1**. Both resolve to white because surface-inverse is `var(--color-brand-primary)` = #FFF and text-on-inverse = text-on-primary = #FFF.
2. **P2** — dark `--color-theme-primary` (#3b82f6) with `--color-theme-text` (#fff) = 3.67:1. Library consumers hit this: Badge solid primary 3.67, and Button outlinePrimary / link text on surface 3.99.
3. **P2** — dark `--color-info-fill` / `--color-info-strong` = 4.21:1.
4. **P2** — infinia-light `--color-state-selected-border` #FFD400 on white = 1.43:1. This breaks N's own 3:1 contract.
5. **P2** — infinia `--color-border-default` is 1.88:1 (light) and 2.59:1 (dark) against the surface. WCAG 1.4.11 asks for 3:1 on control boundaries.
6. **P3** — infinia `--color-selection-bg` / `-fg` are not declared as tokens (only a `::selection` rule), so the "every theme defines the set" guard misses infinia.

**Slice N: library components (`src/components/**`):**
7. **P2** — Badge soft tones fail AA in the light themes:
   - success: #28a745 on #e9fff4, 2.99:1, because it uses state-success instead of success-strong;
   - primary: 4.36 classic, 3.88 custom, 4.09–4.27 green;
   - warning: 4.28 (#92700a on #fff6dd);
   - infinia-light success: 3.53.
8. **P2** — Badges in dark:
   - warning: **1.93:1** (#906f1a on #78350f);
   - primary soft: 3.42;
   - info: 4.07.
9. **P2 (Storybook-only)** — a disabled primary `Button` renders with *enabled* colours inside `#storybook-root` / `.docblock-preview`. The `#storybook-root :is(button,a).btn-primary {… !important}` rules in tokens.css (around line 1511) outrank `:is(button,a).btn-primary:is(:disabled,…)` on ID specificity. Fix: add `:not(:disabled, [aria-disabled="true"])` to those ID-scoped rules. This makes the matrix "Disabled" column look like "Default" until it is fixed.

**Slice L:**
10. **P2** — `.storybook/preview.tsx:54-63` `withTheme` re-creates `Bridge` per render, so every theme change remounts the story and focus drops to `<body>` (2.4.3) for every story. The showcase works around this; other stories do not. Fix: use Storybook's `useEffect` from `@storybook/preview-api` directly in the decorator, or hoist the component.
11. **P3** — the autodocs ArgsTable overflows a 375px docs page (406px scrollWidth, e.g. any component docs page).

**Decisions for the reviewer:**
- I keep the deliberate "Aa" sample on failing token swatches (items 1–3) so the failure stays visible. axe flags those three glyphs in dark (they are `aria-hidden`; the visible ratio label states the failure).
- `Gallery` is kept as a story for old `--gallery` links, but `Playground` is the docs primary. The skill asks for Playground first; I put it first.
