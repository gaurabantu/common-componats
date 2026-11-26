# Handoff: component-author (Slice O, Sprint 5b) -> compliance-reviewer

- **Task:** Storybook portal: Overview/Dashboard (graphs + stats from real repo data), Overview/Components gallery (live previews + detail panel), GSAP + Framer Motion (devDependencies only, reduced-motion safe), Welcome/Overview polish.
- **Status:** ready. Not committed.

## Objective
Verify Slice O against `_fleet/QUALITY_CHECKLIST.md` A/B/C and the deliverables + gate in `_fleet/handoffs/10-orchestrator-portal-dashboard-brief.md`. Return PASS/FAIL per dimension with reproducible evidence.

## Output format
Add a "Sprint 5b — Slice O" section to `_fleet/VERDICT-sprint5.md` (or a new `_fleet/VERDICT-sprint5b.md`): A / B / C verdicts (PASS | FAIL), plus "numbers are real" and "motion libs not in dist". Each finding needs a `file:line` or a command and its output.

## Sources and tools
- Brief: `_fleet/handoffs/10-orchestrator-portal-dashboard-brief.md`. Theming infra I built on: `09l-…` (docs container, theme persistence). State tokens I used: `09n-…` (`--color-state-hover-bg`, `--color-state-selected-border`, `--color-state-selected-text`, `--color-state-selected-subtle-bg`).
- Tests: `npx vitest run src/portal` (103 tests, 7 files). Full suite: `npx vitest run`.
- Stats generator: `node src/portal/components/stats/generate-portal-stats.mjs [--skip-tests]`. It runs vitest with the JSON reporter, reads git, and rewrites `portal-stats.json`.
- Library build without touching the tracked `dist/`: `npx tsup --config tsup.config.ts --out-dir <tmp>`, then `grep -cE 'framer-motion|gsap' <tmp>/*.js <tmp>/*.mjs`.
- Storybook: the dev server is already on http://localhost:6006; do not start another one there. For a static build, use `npx storybook build -o <tmp>`.
- Headless scripts (puppeteer-core 23 + system Chrome) are in the session scratchpad `/private/tmp/claude-501/-Users-gaurabkumar-Documents-my-code-common-componant-main/02963ba5-1f2e-4c0f-8730-08349ed6f92f/scratchpad/cdp/`. They are short; recreate them if that directory is gone:
  - `oshot.mjs <base> <storyId> <themes> <widths>`: full-page screenshot. It flags light (luminance > 0.8) backgrounds inside `.pt-root` in dark themes, horizontal overflow, reveal items still hidden after scrolling, and console errors.
  - `ointeract.mjs <base>`: count-up and hero with motion on and reduced, card click via the card body, keyboard tab filter, hover lift, Tab order, and 375px focus move.
  - `oflag.mjs <url>`: lists the flagged light elements per card.
  - `olanding.mjs <base>/`: shows which page the bare URL lands on.

## Boundaries
- I own only: `src/portal/pages/{WelcomePage,OverviewPages,DashboardPage,ComponentsPage}.tsx`, `Dashboard.mdx`, `Components.mdx`, the deleted `ComponentInventory.mdx`, new files under `src/portal/components/`, `src/portal/data.ts`, `src/portal/portal.css` (the Slice O block starts at the line with the "Slice O" header comment, about :1150), `.storybook/preview.tsx:177` (storySort only), and `package.json` / `package-lock.json` (2 devDependencies).
- Not touched: `src/ThemeShowcase.*`, `Themes.mdx` (Slice M), `tokens.css`, component source. Other diffs in `preview.tsx` and `portal.css` come from Slice L.
- Out of scope: the library's own chart internals (see Open questions 3).

## Context digest
- **Where every dashboard number comes from.** Mapping table: `src/portal/components/dashboardData.ts:1-17`.
  - Components = 72. `INVENTORY` rows minus the legacy alias. Completeness is enforced: every `Design System/Atoms|Molecules/*` story title must be in the gallery (`dashboardData.test.ts`).
  - Hooks = 26. Runtime `use*` exports of `packages/ui-common-hooks/src/index.ts`, read by the generator.
  - Themes = 10. `THEMES` (`data.ts`).
  - Tokens. Distinct custom properties parsed at runtime from `tokens.css?raw`. It showed 324 and later 354, because another slice edited `tokens.css` during my run; the figure is live.
  - Tests = 1,323 in 75 files. `vitest --reporter=json`, stored in `portal-stats.json`.
  - Releases = 7. `RELEASES`.
  - WCAG = 5/5 reviews passed, 14 rounds. `COMPLIANCE_REVIEWS` (`data.ts:451`).
  - Charts:
    - By category: from `INVENTORY`.
    - Growth: git, last commit of each `package.json` version; component folders plus charts modules, and runtime exports of `src/index.tsx`. There is no git commit for v0.0.5, so it is absent.
    - Compliance: first-round vs final passes per dimension (A 0→5, B 3→5, C 4→5).
    - Theme coverage: tokens each theme sets in its own `tokens.css` blocks.
    - Tests at each gate: vitest totals quoted in the verdict files (143 / 448 / 474 / 703 / 784), then today's count.
- **Compliance data is a hand summary with citations.** Each row cites `VERDICT-*.md:line`. `src/portal/components/complianceSources.test.ts` re-reads every cited line and checks:
  - every first-round FAIL is written on a cited line, and no FAIL appears where we claim PASS;
  - a FINAL line says PASS;
  - the test totals match the cited lines.
- **Props in the detail panel are extracted, not typed by hand.** The generator walks the TypeScript AST of `src/components/**`. It covers the interfaces named by `props: "…"` in `INVENTORY`, follows `extends` / `Omit` / unions one level per hop (depth up to 3), merges discriminated-union literals, and records the `@deprecated` flag. All 72 interfaces resolve.
- **Motion.** All of it is in `src/portal/components/motion.tsx`.
  - GSAP runs inside `gsap.matchMedia("(prefers-reduced-motion: no-preference)")` (`:53-66`) and is reverted on unmount or on a switch to reduced motion. The tweens are the count-up (`:88`, ScrollTrigger once), `Reveal` (`:143`) and `useHeroIntro` (`:175`).
  - Only transform and opacity are animated, with `clearProps`. The longest tween is 0.5s; `MAX_DURATION` = 0.6 is asserted in `motion.test.tsx`.
  - The count-up reserves its final width (`ch` + tabular-nums), and screen readers always get the final value through `.pt-sr-only`.
  - Framer Motion runs in the gallery (`ComponentsPage.tsx:255-300`): `MotionConfig reducedMotion="user"`, `useReducedMotion()` gates `initial`, `layout`, `exit` and `whileHover`. Stagger is capped at 10×0.03s, and duration + stagger stays ≤ 0.6s (tested).
  - Charts mount when they scroll into view, so the library's own reduced-motion-aware entrance animation plays then.
- **Gallery a11y pattern** (`ComponentsPage.tsx`).
  - Previews are `aria-hidden` + `inert` (`:56-66`): they are pictures, and nothing inside them is focusable.
  - Each card has one native `<button aria-pressed aria-controls="pt-detail">` stretched over the card (CSS `::after`). The Docs link sits above it (z-index 2) and is the next Tab stop.
  - Category filter = library `Tabs` (APG tablist). The count is a `role=status aria-live=polite` region.
  - At ≤ 71.99rem the panel stacks below the grid; selecting a card moves focus to the panel `<h2 tabindex=-1>` (`:214-222`).
  - 27 previews are "schematic" (overlays, shell, composites built from real parts). The panel says so with a badge.
- **Chart colours** (`portal.css`, Slice O block `:1157-1166`): `--pt-chart-1` = `--color-state-selected-text` (the theme's own accent), `-2` = `--color-success-strong`, `-3` = `--color-warning-strong`.
  - Contrast on `--color-bg-surface` measured in headless Chrome for all 10 themes: ≥ 6.29, ≥ 5.41 and ≥ 6.55 respectively.
  - In infinia-dark, `-3` switches to `--color-text-secondary` because amber was too close to the yellow accent.
- **Landing page:** `storySort` `.storybook/preview.tsx:177` puts Dashboard first, so `http://localhost:6006/` lands on `?path=/docs/overview-dashboard--docs` (verified).
- **ComponentInventory.mdx was replaced by Overview/Components.** Old deep links to `overview-component-inventory--docs` now 404. Repo links were updated in `WelcomePage.tsx` and nothing else referenced it. `InventoryPage` was removed from `OverviewPages.tsx`.

## Verification evidence
- **vitest.** Baseline before starting: 1260 tests / 70 files. After: **1323 / 75 files, all green**. New tests:
  - `dashboardData.test.ts`: 17
  - `complianceSources.test.ts`: 21
  - `motion.test.tsx`: 6
  - `pages/ComponentsPage.test.tsx`: 14
  - `pages/DashboardPage.test.tsx`: 5
- **tsc.** `npx tsc --noEmit -p tsconfig.json | grep -E "src/portal|\.storybook"` prints nothing. The 8 remaining repo errors are pre-existing: `useRipple.tsx` and `src/stories/molecules/FeedbackStates*`.
- **Library build.** `npx tsup … --out-dir <scratch>` exit 0. `grep -cE 'framer-motion|gsap'` over the built `*.js` / `*.mjs` = **0**. Sourcemaps contain no `src/portal`. `tsup.config.ts` entries are unchanged (index/charts/shell/table/openui; none import `src/portal`).
- **Storybook build.** `npx storybook build -o <scratch>` exit 0, and the static `index.json` contains both new pages.
- **Headless Chrome matrix** (`oshot.mjs`, dev server). Dashboard, Components and Welcome × light / dark / infinia-light / infinia-dark × 375 / 768 / 1440:
  - horizontal overflow 0 everywhere;
  - reveal items still hidden after scrolling: 0;
  - no console errors besides the harness's own WebSocket 403 / 404;
  - Dashboard and Welcome: 0 light islands in the dark themes.
  - Components dark: 15-16 flagged elements, all intentional component pixels rather than surfaces (`oflag.mjs`): search glyphs 13px, the radio dot, ColorPicker white swatch (data), ProgressBar fill, Stepper current marker, and the inverse tooltip bubble in the ToolTip/Tooltip schematics.
- **Motion vs reduced motion** (`ointeract.mjs`, 1440):
  - Motion on, at 80ms: KPI digits mid-count ["21","7","3","93","2","1"] while the sr-only text already holds the finals; hero opacity 0→1; 16 inline animated styles. At +2s all values are final and opacity is 1.
  - Emulated reduced motion, at 80ms: digits already final, hero opacity 1, **0** inline animated styles. On the gallery at 375 with reduced motion: 0 inline card transforms.
- **Gallery interaction:**
  - clicking a card's description selects it (panel = Slider, `aria-pressed` = Slider);
  - ArrowRight×5 in the tablist selects "Overlays (6)": 6 cards, status "Showing 6 of 73", and the selection moves to Modal;
  - hover lift `matrix(…, -3)`;
  - Tab from a card button goes to its Docs link;
  - at 375, selecting moves focus to `#pt-detail-title` (panel top 16px), scrollWidth 375.

## Self-check (QUALITY_CHECKLIST A/B/C)
- **A — Accessibility.**
  - Figures: each chart is a `<figure aria-labelledby aria-describedby>` with an SVG frame marked `aria-hidden` and a real `<table>` fallback in a `<details>` (`ChartFigure.tsx:37-82`).
  - Count-up gives the final value to assistive tech (`motion.tsx:115-123`).
  - Gallery buttons: `aria-pressed` + `aria-controls` (`ComponentsPage.tsx:300-307`).
  - Live count region; tabs from the library `Tabs`.
  - Focus rings use `--color-focus-ring` (`portal.css` `.pt-gcard:has(...:focus-visible)` :1522, `.pt-gcard__docs:focus-visible` :1606, the summaries, `.pt-new-card`).
  - 44px targets: Docs link and summaries `min-height: 2.75rem` (:1296 / :1372 / :1595).
  - Chart contrast ≥ 5.41 (see digest).
- **B — Security.**
  - No `dangerouslySetInnerHTML`, `eval` or `new Function` in new files (grep is empty).
  - Links go through `portalLinkProps` (same-app `./?path=` with `target=_top`).
  - The generator only uses `execFileSync` with fixed argv (no shell) and writes a single JSON file.
- **C — Responsiveness.**
  - Matrix above.
  - Chart grid is 2→1 columns at 64rem; gallery is grid + sticky panel → stacked at 72rem; KPI tiles are 2-up at ≤ 30rem.
  - Charts get a measured numeric width (`useElementWidth`).
  - Dark themes hold contrast; reduced motion is honoured (evidence above).
- **Legacy-name grep on new files.** `Tooltip` appears in `previews.tsx:419` as the key for the canonical molecule export `Tooltip` (a separate component from the atom `ToolTip`). `AppShell` appears at `previews.tsx:544-546` only as the legacy inventory row showing "AppShell → DashboardShell". The Avatar story title `Design System/Atoms/Avatar` is the existing story id; the gallery name is `Avtar`.

## Failed approaches
- **vitest `?raw` CSS is an empty string**, because CSS processing is off. My first token test passed with 0 = 0. Tests now read `tokens.css` with `fs` (`dashboardData.test.ts`). Any portal test that imports `TOKENS_CSS` gets "" in vitest.
- **The library chart box has a fixed height while its HTML legend renders below the SVG**, so the legend overlapped "View data table". Fixed portal-side with `.pt-chart__frame > div { height: auto !important }` (end of `portal.css`). The SVG keeps its height via the viewBox ratio.
- **A `monotone` curve overshot flat segments** (v0.0.6 = v0.0.7 looked like a dip), so growth and tests use `linear`.
- **Making the whole card a `<button>` / Card `interactive` would nest interactive content** (previews, Docs link). I switched to the stretched-button pattern.
- **A naive `--x:` regex in the token test also matched selectors** (`.select--chevron-animated:`). It is now anchored to `[\s{;]`.
- **Serving the static build from a background `python -m http.server` was blocked by the sandbox.** The landing check was done on the 6006 dev server instead; the static build was verified only through its exit code and `index.json`.

## Artifacts
| Path | What it is | State |
|------|-----------|-------|
| `src/portal/pages/DashboardPage.tsx` + `Dashboard.mdx` | NEW Overview/Dashboard | final |
| `src/portal/pages/ComponentsPage.tsx` + `Components.mdx` | NEW Overview/Components gallery + detail panel | final |
| `src/portal/pages/ComponentInventory.mdx` | DELETED (replaced by Components) | final |
| `src/portal/components/motion.tsx` | GSAP CountUp / Reveal / hero intro, in-view + width hooks | final |
| `src/portal/components/ChartFigure.tsx` | figure + data-table fallback | final |
| `src/portal/components/dashboardData.ts` | derived KPI / chart data with source map | final |
| `src/portal/components/previews.tsx` | 73 live / schematic previews | final |
| `src/portal/components/stats/generate-portal-stats.mjs` | build-time generator | final |
| `src/portal/components/stats/portal-stats.json` | generated (tests 1323/1323, growth, 72 props interfaces) | generated |
| `src/portal/components/{dashboardData,complianceSources}.test.ts`, `motion.test.tsx`, `src/portal/pages/{Components,Dashboard}Page.test.tsx` | 63 new tests | final |
| `src/portal/data.ts` | `props` field, 7 missing components (ContextMenu, ToggleButton, ToggleGroup, Slider, ColorPicker, LoadingOverlay, ComposedChart), Avatar→Avtar row, `COMPLIANCE_REVIEWS` | final |
| `src/portal/pages/WelcomePage.tsx` | hero intro, CountUp KPIs, Reveal, links → Components | final |
| `src/portal/pages/OverviewPages.tsx` | InventoryPage removed; exports table says 10 themes + ComposedChart | final |
| `src/portal/portal.css` | Slice O block (chips, hero, charts, timeline, gallery, panel, previews) | final |
| `.storybook/preview.tsx:177` | storySort: Dashboard, Components first | final |
| `package.json:128-129`, `package-lock.json` | devDependencies `framer-motion ^12.43.0`, `gsap ^3.15.1` | final |

## Acceptance criteria
- `npx vitest run` → 1323 passed. `npx vitest run src/portal` → 103 passed.
- `grep -cE 'framer-motion|gsap'` on a fresh tsup build = 0, and both packages appear only under `devDependencies`.
- The `oshot.mjs` matrix shows 0 overflow and 0 hidden-after-scroll items. The only light elements flagged in dark themes are the intentional component pixels listed above.
- With reduced motion emulated, the KPI digits are final on first paint and no inline transform/opacity styles exist.
- Each KPI's `title` attribute names its source, and the numbers match the sources (tests assert this).

## Open questions
1. **Regeneration is manual.** I could not add an npm script (package.json scope is devDependencies only) or put the generator in `scripts/` (not owned). Suggest the orchestrator add `"prebuild-storybook": "… && node src/portal/components/stats/generate-portal-stats.mjs"` (or a `--skip-tests` variant in CI) and move the script to `scripts/`. Until then, the test count and growth go stale after new tests or releases. Component folders and hooks are checked against the working tree by `dashboardData.test.ts`.
2. **The old URL `overview-component-inventory--docs` is gone.** Add a redirect or note it in the release notes if external links exist.
3. **Library chart gaps found (report only):**
   - the chart SVGs have no accessible name or role (the portal hides them and supplies tables);
   - the HTML legend overflows the fixed-height chart box;
   - charts do not size to their container (fixed 400-unit viewBox unless given a numeric width).
4. **Tokens count changed 324 → 354 mid-run** because another slice edited `tokens.css`. This is expected; the figure is live.
