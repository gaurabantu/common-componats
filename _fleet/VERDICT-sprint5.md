# VERDICT — Sprint 5 (slices L, M, N) + Sprint 5b (Slice O) — compliance-reviewer

**Current status (iteration 2, 2026-11-26):** L PASS / PASS / PASS · M PASS / PASS / PASS · N **PASS / PASS / PASS** (was A11y FAIL) · O PASS / PASS / PASS.
**Release gate cleared for L, M, N and O.** The iteration 1 record below is kept as history; the Iteration 2 and Slice O sections at the end supersede it.

---

# Iteration 1 (history)

Date: 2026-11-26. Reviewer is read-only: no `src/**` or `.storybook/**` file was edited. All probes ran from the session scratchpad
(`/private/tmp/claude-501/-Users-gaurabkumar-Documents-my-code-common-componant-main/02963ba5-1f2e-4c0f-8730-08349ed6f92f/scratchpad/review/probe{1..8}.cjs`)
against the running Storybook dev server at http://localhost:6006 (headless Chrome, puppeteer-core). Ratios use the WCAG formula, alpha
composited over the real backdrop.

Inputs: `_fleet/handoffs/09-orchestrator-theming-brief.md` (incl. addenda), `09l/09m/09n-component-author-to-compliance-reviewer.md`,
`_fleet/QUALITY_CHECKLIST.md`. Slice O changes (portal Overview, `src/portal/data.ts`, `portal.css` dashboard parts, storySort,
`package.json` framer-motion/gsap) are out of scope and were not graded.

## Summary

| Slice | Accessibility | Security | Responsiveness |
|---|---|---|---|
| L — Storybook theming infra | **PASS** (1 confirmed P2 non-blocking, pre-existing) | **PASS** | **PASS** (1 P3, pre-existing) |
| M — Theme showcase | **PASS** | **PASS** | **PASS** |
| N — State tokens + dark-surface audit | **FAIL** | **PASS** | **PASS** |

Gate evidence:
- `npx vitest run` gives **70 files / 1261 tests passing** (exit 0).
- `npx tsc --noEmit -p tsconfig.json` errors only in `src/components/common/useRipple.tsx` (1), `src/stories/molecules/FeedbackStateVariants.stories.tsx` (2) and `src/stories/molecules/FeedbackStates.realworld.stories.tsx` (2). These predate the sprint and no slice touched them.
- `npm audit --omit=dev` finds 0 vulnerabilities.
- Full-tree `npm audit` reports 17 high and 4 critical advisories, all in dev tooling (`next`, `@storybook/core`, `@babel/core`), all pre-existing. L/M/N added no dependency: the only `package.json` diff is Slice O's.

---

# Slice L — Storybook theming infrastructure

## Accessibility: PASS
- [PASS] A4 Contrast, manager selected sidebar row in all 10 themes (probe3, `.sidebar-item[data-selected=true]` composited; style from the orchestrator's `--sb-sel-*` block at the end of `.storybook/brand/infinia-manager-brand.css`):
  - text on fill: light/blue/mist 17.86, dark 12.32, green/green-mist 18.57, custom 17.69, blue-mist 17.86, infinia-light 17.66, infinia-dark 14.69;
  - icon on fill: 4.28 to 10.26.
  - The infinia-dark 1.43:1 white-on-#ffd400 row from the 09l handoff (Open question 1) is **resolved** by the tint (now 14.69).
- [PASS] A4 Contrast, docs chrome. axe-core (wcag2a/aa/21aa/22aa, story content excluded) on Button autodocs, Colors MDX and Welcome MDX in light, dark, mist, infinia-light and infinia-dark: **0 violations** (probe8).
- [PASS] A3 Focus, docs. `:focus-visible` uses a 2px `--color-focus-ring` outline on ArgsTable inputs, Show code and frame toolbar buttons (`.storybook/preview.css:294-302`). The manager rule is unchanged (`.storybook/brand/infinia-manager-brand.css:44-45`).
- [PASS] C6/A4 Dark islands: 0 flagged elements (manager + preview) for dark and infinia-dark on 5 page types. Command: `node _fleet/scripts/theme-scan/scan.mjs http://localhost:6006`, run from the scratchpad copy so it resolves puppeteer-core. In light and mist the only flags are the classic Noir `btn-primary` (#0d0d0d), which is by design.
- [PASS] Persistence. After a load with `globals=theme:infinia-dark`, reloading with no `globals` gives manager=infinia-dark and preview=infinia-dark, and the next navigation keeps preview=infinia-dark (scan.mjs PERSIST lines).
- [CONFIRMED, P2, non-blocking, pre-existing] A1 / 2.4.3 Focus order. `withTheme` defines a new `Bridge` component on every render (`.storybook/preview.tsx:54-63`; the same pattern is at HEAD `preview.tsx:26-34`), so a theme change remounts the story.
  - Repro (probe1): focus the Input in `design-system-atoms-input--default`, then emit `updateGlobals {theme:"dark"}`. Result: `sameNode:false, oldNodeConnected:false, activeElement: BODY`.
  - Impact: in-story focus and component state are lost on every theme switch.
  - Why non-blocking: the only in-story trigger, the showcase tiles, already works around it (`src/ThemeShowcase.stories.tsx:930`), and it is not part of the Slice L acceptance criteria.
  - Fix: hoist the decorator body (call `useEffect` from `@storybook/preview-api` directly in `withTheme` and return `<Story/>`).
- [MISSING] Manager focus after a keyboard theme switch from the toolbar menu. Tried: focus the toolbar button, press Enter, focus the menu item, press Enter. In headless Chrome the selection did not register (theme stayed light), and the viewport control behaved the same, so this is a harness limit, not evidence of a defect. Needs a manual check.

## Security: PASS
- [PASS] B1/B4 grep of `.storybook/**`, `src/portal/pages/FoundationPages.tsx` and `src/portal/portal.css` for `dangerouslySetInnerHTML|innerHTML|outerHTML|document.write|eval(|new Function|insertAdjacentHTML|document.cookie` finds nothing.
- [PASS] B5/B7 Storage and URL are treated as untrusted:
  - whitelist plus try/catch in `.storybook/theme-bridge.ts:100-136` and `.storybook/manager-head.html:21-41`;
  - namespaced key `ui-common-components:storybook-theme`;
  - only whitelisted ids reach `setAttribute`.
  - The inline `<script>` in manager-head is Storybook shell code, not component output (a pre-existing pattern).

## Responsiveness: PASS
- [PASS] C6 `color-scheme: dark` for dark and infinia-dark (`.storybook/preview.tsx:25-28,38`, `.storybook/manager.ts:70`). `parameters.backgrounds` values are all CSS variables (`.storybook/preview.tsx:132-139`).
- [CONFIRMED, P3, pre-existing, not caused by L] C1 The autodocs ArgsTable overflows a 375px docs page: Button docs scrollWidth 624, Input docs 765 (probe4).
  - Deleting all 25 `#storybook-docs` rules from L's `preview.css` at runtime leaves both widths unchanged (probe5), so this is Storybook's own ArgsTable.
  - Optional fix in L's scope: `#storybook-docs .docblock-argstable { display:block; overflow-x:auto }`.

## Observations (optional, not defects)
- The sidebar selected-row edge is 1.04 to 1.33:1 in the light themes (2.43 dark, 3.00 infinia-dark). Selection is still conveyed by the tint, weight 600 and accent icon. This is the user-directed style applied by the orchestrator, so no action for L.
- `_fleet/scripts/theme-scan/switch.mjs` crashes on the current server: its start page `overview-component-inventory--docs` has no `.sidebar-item[data-selected=true]` (probably renamed by Slice O). probe3 replaces it.

---

# Slice M — Theme showcase

## Accessibility: PASS
- [PASS] A1 Keyboard: tile → focus → Enter (probe4 TILE). Result: `theme:"green"`, focus stays on `[data-ts-tile=green]`, `aria-pressed="true"`, polite status "Green theme applied to every page.". Tiles are `<button>`; the accessible name starts with the visible name ("Green theme, light, active. Apply to every page.", 2.5.3).
- [PASS] A5/A10 Swatch copy by keyboard (probe4 SWATCH): Enter on `.ts-swatch` writes `var(--color-theme-primary)` to the clipboard and the polite region announces "Copied var(--color-theme-primary)" (`src/ThemeShowcase.stories.tsx:1069`).
- [PASS] A3 Focus: `.ts-tile`, `.ts-swatch` and `.ts-matrix-scroll` use `:focus-visible` with `--color-focus-ring`; there is no `outline:none` in `src/ThemeShowcase.css` (grep clean).
- [PASS] A1 The matrix specimens are `inert` with `tabIndex={-1}` (`src/ThemeShowcase.stories.tsx:706-707`). The scroll region is focusable and named (`:716`).
- [PASS] A4 axe in all 10 themes, scoped to `.ts-root` (probe8): every slice-owned node passes. The failing nodes are:
  - (a) inside library `Badge`/`Button`, which is a Slice N defect (below);
  - (b) the deliberate `aria-hidden` "Aa" samples on failing token pairs (dark: 3.67 / 4.21 / 3.67, `src/ThemeShowcase.stories.tsx:520,650-651`). These are **accepted with reason**: they are decorative, hidden from assistive technology, and the visible ratio label states the failure.
- [PASS] A9 `prefers-reduced-motion` at `src/ThemeShowcase.css:847`, `forced-colors` at `:859`.

## Security: PASS
- [PASS] B1/B4 grep of `src/ThemeShowcase.*` is clean. The clipboard uses the existing `copyText`. Inline `style` props are static `var(--token)` strings built from a constant token list (`src/ThemeShowcase.stories.tsx:302-305`); they are not user input.
- [PASS] B7 No hex values and no secrets: `grep -nE "#[0-9a-fA-F]{3,8}\b" src/ThemeShowcase.css src/ThemeShowcase.stories.tsx` finds nothing.

## Responsiveness: PASS
- [PASS] C1/C7 `documentElement.scrollWidth === innerWidth` at 375, 768 and 1440 for the Playground story and the Docs page in light, dark and infinia-dark (probe4, 18 cases). At 375 the underline Tabs triggers extend past the viewport inside their own scroll strip (C3 "Tabs scroll"); the page does not overflow.
- [PASS] C6 No light-surface islands in dark/infinia-dark (the scan.mjs showcase docs page has 0 flags).

## External (surfaced by M, not M defects)
- The "Disabled" column of the state matrix looks like "Default" in Storybook. Root cause is in N (fix item 2).

---

# Slice N — Interaction-state tokens + dark-surface audit

## Accessibility: FAIL
- [PASS] State-token contract: `npx vitest run src/design-system` is green (part of the 1261). In Chrome, selected-border on surface is light 5.17, green 5.02, custom 4.70 and dark 5.77; dark selected-fg on selected-bg is 5.17.
- [PASS] Infinia unchanged (user decision). probe7 resolved all 298 custom properties declared at HEAD under `<html data-theme=infinia-light|infinia-dark>`, with HEAD `tokens.css` against the working copy: **0 values changed**. The rendered primary Button is identical once transitions settle. `INFINIA_LIGHT`/`INFINIA_DARK` in `.storybook/manager-palettes.ts` hash the same as HEAD (sha1 9cd6b5b6…).
- [FAIL, P1] A4/C6 Dark: **`--color-surface-inverse` / `--color-text-on-inverse` = 1.00:1**, and **`--color-brand-primary` / `--color-text-on-primary` = 1.00:1** (probe2, Chrome-resolved under `data-theme=dark`). Both resolve to #FFFFFF on #FFFFFF.
  - Cause: dark `--color-brand-primary: #FFFFFF` (`src/design-system/tokens.css:633`) while `--color-text-on-primary` stays #ffffff and `--color-surface-inverse`/`--color-text-on-inverse` alias them (`tokens.css:328-329`).
  - Consumer: the Table `brand` header (`src/components/molecules/Table/Table.css:205-211`) renders invisible white-on-white text in dark.
  - The defect is pre-existing (HEAD `tokens.css:509`), but a white island with invisible text in a dark theme is exactly what the Sprint 5 dark-surface audit had to close (brief item 2, Slice N). N's handoff Open question 6 acknowledges it without fixing it.
  - Fix: in the dark block, set `--color-text-on-primary: #111111` (as infinia-dark does at `tokens.css:1252`) **or** give `--color-surface-inverse`/`--color-text-on-inverse` their own dark pair (e.g. `#363636`/`#ffffff`, as at `tokens.css:1255-1256`), then re-check Spinner/Badge consumers.
- [FAIL, P1, pre-existing] A4 Badge soft and solid tones below 4.5:1 (probe2 and probe8, normal 11px text):
  - success soft 2.99 in every non-Infinia light theme (`src/components/atoms/Badge/Badge.css:88-90`, fg `--color-state-success` #28a745 on `--color-accent-mint-10`);
  - warning soft 4.28 in light (`Badge.css:109-111`) and **1.93 in dark**;
  - primary soft 4.37 classic, 4.27 green, 4.20 mist, 3.88 custom, 4.09 green-mist, 3.42 dark (`Badge.css:65-69`);
  - primary solid 3.67 in dark (`Badge.css:74-75`);
  - info soft 4.07 in dark (`Badge.css:151-153`).
  - Fix: point the soft fg at the `--color-*-strong` tokens (≥5.18 on page per N's own table) or add `--color-badge-*-soft-fg` per theme.
- [FAIL, P1, pre-existing] A4 Dark `--color-theme-primary` #3b82f6 (`tokens.css:689`) with `--color-theme-text` #fff (`:693`) = **3.68:1** (Badge solid primary). As text on the dark surface it is **3.99:1** (library Button `outlinePrimary` and `link`, probe8 dark). The primary *Button* fill was fixed via its own token (5.17), but the theme-primary pair still fails for every other consumer.
  - Fix: dark `--color-theme-primary: #2563eb` for fills plus a `#60a5fa`-class text token, or route those consumers to `--color-state-selected-bg/-text`.
- [FAIL, P1, pre-existing] A4 Dark `--color-info-strong` (#60a5fa) on `--color-info-fill` (18% color-mix) = **4.20:1** (`tokens.css:676-677`).
  - Fix: lower the mix to about 12%, or use `#93c5fd` for strong.
- [FAIL, P2, pre-existing, Storybook-only] Brief item 4 (interaction states visible). `#storybook-root :is(button, a).btn-primary {… !important}` (`src/design-system/tokens.css:1506-1512`, and the same pattern for the other variants at :1514-1559, :1612) outranks the disabled rule `:is(button,a).btn-primary:is(:disabled,[aria-disabled=true]) {… !important}` (`:1654-1658`) and the non-important hover/active rules (`:1646-1653`) by ID specificity. Measured (probe1, probe4):
  - disabled primary Button: light bg #0d0d0d = enabled (token #2b2b2b); dark #2563eb = enabled (token #1e3a8a);
  - hover: bg unchanged (#0d0d0d vs token #1a1a1a; #2563eb vs token #1d4ed8).
  - Consumer apps are unaffected: there is no `#storybook-root`, and the later disabled rule wins at equal specificity.
  - Fix: add `:not(:disabled, [aria-disabled="true"])` to the ID-scoped and `.docblock-preview` selectors, and drop `!important` for hover/active or mirror them under the same scopes.

## Security: PASS
- [PASS] B1/B4/B5 Changes are CSS and token-only plus string values in `src/components/molecules/Calendar/Calendar.config.ts`. Grep of the touched component directories finds no `dangerouslySetInnerHTML`/`innerHTML`/`eval`, and `git diff HEAD -- src/components` adds no hex.

## Responsiveness: PASS
- [PASS] C6 Dark `color-scheme` is set. Nested `[data-theme]` isolation is covered by the vitest cascade tests (green). The mobile `@media (max-width:640px)` and forced-colors overrides now also target `[data-theme]`, per the handoff. No new motion.

## Escalated to user (Infinia look locked by user decision; recorded, not FAIL)
- infinia-light `--color-state-selected-border` / tab indicator #ffd400 on #fff = 1.43:1 (probe2/probe1).
- infinia `--color-border-default` on surface: 1.88:1 light (`tokens.css:1047`), 2.59:1 dark (`:1276`) (1.4.11).
- infinia-light Calendar selected day `--color-day-selected-fg` = `--color-text-on-primary` #fff on #ffd400 = 1.43:1 (`tokens.css:1192-1193`).
- infinia-light Badge success soft 3.53:1 (probe8). Infinia-only, under the same lock.
- infinia `--color-selection-bg/-fg` are not declared as tokens; Infinia keeps the browser default (P3 doc gap).
- Closed: infinia-dark Storybook selected row, now 14.69:1 via the orchestrator's tint.

---

## Ranked fix list

P1 (blocks ship):
1. **[component-author — Slice N]** Dark inverse and on-primary pairs are 1.00:1 (`src/design-system/tokens.css:633`, `:328-329`; consumer `src/components/molecules/Table/Table.css:205-211`). A4, C6.
2. **[component-author — Slice N]** Badge soft and solid tones below 4.5:1 (`src/components/atoms/Badge/Badge.css:65-69, 74-75, 88-90, 109-111, 151-153`). A4. Pre-existing.
3. **[component-author — Slice N]** Dark `--color-theme-primary`/`--color-theme-text` 3.68:1, and theme-primary text on surface 3.99:1 (`tokens.css:689,693`). A4. Pre-existing.
4. **[component-author — Slice N]** Dark `--color-info-strong` on `--color-info-fill` 4.20:1 (`tokens.css:676-677`). A4. Pre-existing.

P2 (should fix before ship):
5. **[component-author — Slice N]** Storybook-scoped `!important` Button rules hide the disabled and hover/active states (`tokens.css:1506-1559, 1612` vs `:1646-1658`). Brief item 4, A4. This also fixes the Slice M matrix "Disabled" column.
6. **[component-author — Slice L]** `withTheme` remounts the story on every theme change: focus goes to `<body>` and state is lost (`.storybook/preview.tsx:54-63`). A1/2.4.3. Non-blocking for L.

P3 (nice to have):
7. **[component-author — Slice L]** Autodocs ArgsTable overflows at 375px (624/765px) because of Storybook's own table. Wrap it in a scroll container in `.storybook/preview.css`. C1.
8. **[component-author — Slice L]** Repoint `_fleet/scripts/theme-scan/switch.mjs` at an existing page id (it crashes on the current server). Ownership of `_fleet/scripts` may need the orchestrator.
9. **[user decision]** Infinia escalations listed above.

Iteration routing: **Slice N** returns for iteration 2 (items 1-5). L and M pass; items 6-8 can ride along optionally.


---

# Iteration 2 — Slices L and N re-review, M recheck (2026-11-26)

Gate: `npx vitest run` gives **75 files / 1521 tests passing** (this total includes the orchestrator's chart tests). `tsc` errors only in the three older files (`useRipple.tsx` 1, `FeedbackStateVariants.stories.tsx` 2, `FeedbackStates.realworld.stories.tsx` 2). The server restart was picked up: every probe below ran against the restarted dev server on 6006.

## Slice L — Accessibility PASS · Security PASS · Responsiveness PASS
- [PASS] A1 / 2.4.3, fix-list item 6. Repro (probe1): focus the Input in `design-system-atoms-input--default`, then emit `updateGlobals {theme:"dark"}`. Result: `sameNode:true, oldNodeConnected:true, activeElement: INPUT`. Iteration 1 gave `false/false/BODY`. The decorator now uses Storybook's `useEffect` (`.storybook/preview.tsx:61-67`).
- [PASS] C1, fix-list item 7. Button docs and Input docs at 375px both have page scrollWidth **375** (were 624 / 765). Deleting the 26 `#storybook-docs` rules at runtime restores 624 / 765 (probe5), so L's rule (`.storybook/preview.css:318-331`) is what fixes it.
- [PASS] Fix-list item 8. `node _fleet/scripts/theme-scan/switch.mjs http://localhost:6006` (run from the scratchpad copy) completes for all 10 themes. Selected-row text is 12.25–18.57:1, which matches my probe3 within rounding.
- Regression: the dark-island and persistence results from iteration 1 still hold. L's handoff reports a re-run, and I spot-checked showcase and Input: no new flags.

## Slice N — Accessibility PASS (was FAIL) · Security PASS · Responsiveness PASS
Each item re-measured in Chrome (probe2, probe1, hover.cjs):

| Iteration-1 item | Before | Now |
|---|---|---|
| 1 dark inverse pair / brand on-primary (Table brand header) | 1.00 / 1.00 | **9.37 / 17.74** |
| 2 Badge tones, all 8 non-Infinia themes (Badge gallery, every text node) | min 1.93 (dark warning), 2.99 (success soft) | **0 nodes < 4.5** |
| 3 dark theme-primary / theme-text | 3.68 | **6.98** |
| 4 dark info-strong on info-fill | 4.20 | **5.92** |
| 5 Storybook disabled primary Button | = enabled colours | light `#2b2b2b`/`#b3b3b3`, dark `#1e3a8a` (= tokens) |
| 5 Storybook hover / active primary Button | = rest | light `#1a1a1a` / `#000`, dark `#1d4ed8` / `#1e40af`, infinia-light `#ebc400` / `#c7a600` |

- **No regressions from the dark on-primary / accent swap.** `review/sweep.cjs` ran axe color-contrast on the first story of all 71 `Design System/*` components in light and dark, then swapped HEAD's `tokens.css` and `Badge.css` into the same page and ran it again.
  - **0 nodes fail now that passed at HEAD.**
  - **21 nodes are fixed:** DataTable 10, List 4, ButtonGroup 3, PageHeader 2, ErrorState 1, governance dashboard 1.
  - Still failing, and identical at HEAD (pre-existing, not N's scope): Calendar playground 3 nodes (light and dark) and Form playground 1 node (dark). Logged as P3 below.
  - Limitation: only the first story per component is covered, plus the targeted Badge/Button probes.
- **Infinia exactly as at HEAD.**
  - probe7: 0 of 298 HEAD custom properties resolve differently under infinia-light or infinia-dark.
  - probe11: HEAD vs current `tokens.css` + `Badge.css` rendered on a static page. All 18 Badge variant×tone and 18 Button variant×(enabled, disabled) combinations are identical outside Storybook.
  - Inside `#storybook-root`, only the 7 *disabled* Infinia Buttons changed. They now show Infinia's own existing disabled tokens, where before the Storybook `!important` rule painted the enabled colours. Hover and active also became visible.
  - This is the intended item-5 fix, which N disclosed. It changes what Storybook *displays* for Infinia's disabled and hover states, not any Infinia token. **Informational for the user**, not a defect.
- Infinia escalations (selected-border 1.43, border-default 1.88/2.59, Calendar selected day 1.43, Badge success 3.53) remain locked by the user, as before.
- New pre-existing item reported by N: classic and dark `--button-success-bg #28a745` with white text = **3.13:1** (A4). It is outside fix-list 1–5 and present at HEAD, so it is logged as P2 for the next sprint and does not fail N.

## Slice M — PASS (unchanged)
- [P3 cleanup, not a FAIL] The park-and-replay remount workaround at `src/ThemeShowcase.stories.tsx:926-971` is dead code now that L's decorator no longer remounts. Its comment at `:926-927` is stale. Its own "still mounted" branch makes it harmless.
- The matrix "Disabled" column now renders the real disabled colours (fixed by N item 5).

---

# Sprint 5b — Slice O (Dashboard + Components gallery + motion), with the orchestrator's landing-layout and chart changes

Inputs: `_fleet/handoffs/10-orchestrator-portal-dashboard-brief.md` (incl. the addendum), `_fleet/handoffs/10o-component-author-to-compliance-reviewer.md`, and the orchestrator's later changes:
- `.storybook/manager.ts` `infinia/landing-layout` addon;
- `package.json` `portal:stats` scripts;
- `BarChart.tsx` clip and gap changes;
- `--pt-chart-*` palette;
- ChartFigure layout;
- growth chart switched to LineChart.

## Accessibility: PASS
- [PASS] A10 / 1.1.1 Charts (`review/dash.cjs`, re-run after the chart change). All 5 dashboard charts are a `<figure>` named by `aria-labelledby` ("Components by category", "Library growth across releases", "Compliance by dimension", "Theme coverage", "Automated tests at each compliance gate"). Each has `aria-describedby`, `aria-hidden` SVGs, and a real `<table>` fallback with 7–11 `<th>` (`src/portal/components/ChartFigure.tsx`).
- [PASS] A9 Reduced motion. With `prefers-reduced-motion: reduce` emulated, the KPIs read their final values at first paint (72 / 26 / 10 / 354 / 1,323 / 7 / 5 of 5). The only inline-styled elements are 7 layout wrappers at opacity 1, with no transform tweens. GSAP is gated by `gsap.matchMedia("(prefers-reduced-motion: no-preference)")` (`src/portal/components/motion.tsx:53-66`). Framer Motion uses `MotionConfig reducedMotion="user"`.
- [PASS] A1 Gallery keyboard (`review/gal.cjs`, 1440 and 375).
  - Tablist ArrowRight moves All → Actions → Forms → Display, and the polite count reads "Showing 12 of 73".
  - Tab order: search (`aria-label` "Search components") → tabpanel → card button → its "… documentation" link → next card.
  - Space on a card sets `aria-pressed=true` and fills the panel. At 1440 focus stays on the card; at 375 focus moves to `#pt-detail-title`.
  - The card focus ring is a solid `--color-focus-ring` outline.
- [PASS] A4 axe (wcag2a/aa/21aa/22aa) on `.pt-root` for Dashboard and Components, in light, dark, infinia-light and infinia-dark at 375/768/1440: **0 violations**, except infinia-light Badge success soft 3.53:1 (1 node on Dashboard, 51–52 on Components). That is the user-locked Infinia item, escalated, not O's.
- [PASS] Landing layout, A1 and A2 (`review/land.cjs`, `land375*.cjs`):
  - **1440.** `/` lands on `overview-dashboard--docs` with 0 sidebar rows visible. The first manager Tab stop is **"Show sidebar"**, then the toolbar (Theme picker included), then the preview. The "Browse components" / "Get started" CTAs are links (`target=_top`).
  - Activating "Browse components" with Enter goes to `overview-components--docs` with the sidebar back (23 rows).
  - Button docs → sidebar "Dashboard" (hidden) → **Back** (sidebar 74 rows) → **Forward** (hidden) → **Back** (74 rows).
  - **375.** The mobile "Open navigation menu" opens the drawer from the Dashboard (23 rows) and from Button docs (74 rows). Page scrollWidth is 375 everywhere.
- [ACCEPTED with reason, P3] A4 / 1.4.11 Light chart series contrast on the surface:
  - light: `--pt-chart-2` #f47230 = 2.88:1 and `--pt-chart-3` #00b894 = 2.54:1 on #fff (2.76 / 2.43 on mist #fafafa);
  - dark steps ≥ 4.27 on #1f2937.
  - Every chart carries a text legend and a real data table, so the marks are not the only source of the values. Stacked segments get a 2px surface gap (`BarChart.tsx`). Accepted as is.
  - Optional: darken the light orange and aqua steps (about #c2410c / #00876a) to reach 3:1.

## Security: PASS
- [PASS] B1/B4 grep of `DashboardPage.tsx`, `ComponentsPage.tsx`, `WelcomePage.tsx`, `OverviewPages.tsx`, `src/portal/components/**`, `BarChart.tsx` and `manager.ts` for `dangerouslySetInnerHTML|innerHTML|outerHTML|eval(|new Function|insertAdjacentHTML|document.cookie` finds nothing. The only hit is a string literal in `Showcase.tsx:211`.
- [PASS] B4 `framer-motion` and `gsap` are **devDependencies only**: `dependencies` and `peerDependencies` contain neither, and they are imported only by `src/portal/components/motion.tsx` and `src/portal/pages/ComponentsPage.tsx`. `npm audit` totals are unchanged (35, all pre-existing dev tooling) and include no advisory for either package.
- [PASS] Motion libraries are not in the library bundle. `npx tsup --config tsup.config.ts --out-dir <scratch>/review/tsup-out` exits 0. In the output, **0** `.js/.mjs/.css/.d.ts` files mention `framer-motion|gsap`, and **0** sourcemaps contain `src/portal`. The tracked `dist/` is untouched (`git status --short dist` is empty). tsup entries are `index/charts/shell/table/openui` only (`tsup.config.ts:5-11`).
- [PASS] B5 The generator (`generate-portal-stats.mjs`) uses `execFileSync` with fixed argv (`:29`, `:124`; no shell). `rmSync` only removes its own `mkdtempSync` directory (`:120`, `:142`). Chart clip ids are sanitized (`useId().replace(/[^a-zA-Z0-9_-]/g, "")`). Portal links are same-app via `portalLinkProps` (`src/portal/navigation.ts:29-38`).

## Responsiveness: PASS
- [PASS] C1/C6 Dashboard and Components in light, dark, infinia-light and infinia-dark at 375/768/1440: page scrollWidth equals the viewport in all 24 cases. Dashboard has **0** light islands in the dark themes. Charts size to their container.
- [OBSERVATION, P3] C7 "7th KPI tile wraps alone at 1440" — **not reproduced at 1440 now**. The landing addon hides the sidebar, so the KPI grid has 7 columns at manager widths 1280, 1440 and 1920. Measured preview widths:
  - 1100–1299: 6 + 1 (lone "WCAG 2.2 AA reviews passed");
  - 900–1099: 5 + 2;
  - 768: 4 + 3;
  - 375: 2+2+2+1.
  - The orchestrator's sighting matches the old layout (1440 minus the sidebar ≈ 1140 preview), and it still happens when a user opens the sidebar on the Dashboard or uses a ~1100–1270px window. It is cosmetic: no content loss, no overflow.
  - Optional fix in `portal.css`: a 4-column grid from 64rem to 85rem (4 + 3), or let the WCAG tile span 2 columns in the 6-column band.
- [P3] On the Dashboard at 375, the desktop "Show sidebar" toolbar button is exposed but does nothing visible (Storybook uses the mobile drawer there). The working control, "Open navigation menu", is also present. Optional: hide "Show sidebar" below Storybook's mobile breakpoint.

## "Numbers are real"
| KPI | Shown | Source checked | Verdict |
|---|---|---|---|
| Components | 72 | `INVENTORY` minus legacy (`dashboardData.ts:60-61`); completeness test green | real |
| Hooks | 26 | 26 distinct `use*` names in `packages/ui-common-hooks/src/index.ts` | real |
| Themes | 10 | `THEMES` = toolbar items | real |
| Design tokens | 354 | parsed live from `tokens.css` | real (live) |
| Automated tests | **1,323** | `portal-stats.json` `tests.total` from a real run on 2026-11-26 | **real but stale**: the suite is 1521 today (see P2 below) |
| Releases | 7 | `RELEASES` (latest v0.0.7 = `package.json` version) | real |
| WCAG reviews passed | 5 / 5 | `COMPLIANCE_REVIEWS` cites VERDICT-portal and sprint1–4 lines; `complianceSources.test.ts` re-reads them | real (Sprint 5 is not yet counted, which is correct while this review is open) |

- [P2] The test KPI freezes. `prebuild-storybook` now runs `portal:stats:fast` (`package.json`), which passes `--skip-tests`, and the generator then keeps the previous totals (`generate-portal-stats.mjs:292`). Every Storybook build will publish 1,323 until someone runs `npm run portal:stats` by hand. The tile does show "run 2026-11-26", but the count is already 198 behind on that same date.
  - Fix: run the full `portal:stats` in the release/CI build (or before deploy), or make `--skip-tests` fail when the test file count differs from `portal-stats.json`.

---

## Ranked fix list (iteration 2 + Slice O) — nothing blocks ship

P2 (should fix before ship):
1. **[orchestrator — package.json scripts / Slice O generator]** The test-count KPI goes stale because `prebuild-storybook` runs `portal:stats:fast` (`generate-portal-stats.mjs:292` keeps previous totals). Shows 1,323 vs 1,521 actual. Accuracy of the "real data" requirement.
2. **[component-author — Slice N, next sprint]** Classic and dark `--button-success-bg #28a745` + white = 3.13:1 (A4; pre-existing, reported by N).

P3 (nice to have):
3. **[component-author — Slice O]** KPI grid orphan (6+1 at 1100–1299px preview, 5+2 at 900–1099) in `src/portal/portal.css` (Slice O KPI grid block). C7, cosmetic.
4. **[orchestrator — manager.ts]** The "Show sidebar" toolbar button is a no-op on the Dashboard at 375px (the mobile drawer is the working control).
5. **[component-author — Slice M]** Remove the dead remount workaround and its stale comment (`src/ThemeShowcase.stories.tsx:926-971`).
6. **[orchestrator — portal.css]** Light `--pt-chart-2/3` are 2.88 / 2.54:1 (accepted with legend + table). They are also raw hex in a "tokens only" block (`src/portal/portal.css:1160-1171`). Consider `--color-chart-*` tokens in `tokens.css` (Slice N file).
7. **[component-author — library owner]** Older contrast failures found by the sweep, identical at HEAD: Calendar playground 3 nodes (light and dark), Form playground 1 node (dark).
8. **[user decision]** Infinia escalations unchanged (selected-border 1.43, border-default 1.88/2.59, Calendar selected day 1.43, Badge success 3.53). Note that Storybook now shows Infinia's real disabled, hover and active Button colours (N item 5).
