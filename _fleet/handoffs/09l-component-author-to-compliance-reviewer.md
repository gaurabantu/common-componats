# Handoff: component-author (Slice L) -> compliance-reviewer

- **Task:** Sprint 5 Slice L: Storybook theming infrastructure (docs/manager follow the theme, theme persists, per-theme manager accents, portal hex cleanup)
- **Status:** ready (one item intentionally left alone and escalated: Infinia-dark selected-row text, see Open questions)

## Objective
Check Slice L against `_fleet/QUALITY_CHECKLIST.md` A/B/C and the Slice L bullets in `_fleet/handoffs/09-orchestrator-theming-brief.md`. Also check the mid-task user instruction: keep infinia-light/dark unchanged, and give each of the other 8 themes its own selection accent with text at least 4.5:1. Record PASS/FAIL per dimension in `_fleet/VERDICT-sprint5.md`.

## Output format
Add a Slice L section to `_fleet/VERDICT-sprint5.md` with an A / B / C verdict (PASS | FAIL). Every finding needs a repro command or a `file:line`.

## Sources and tools
- Brief: `_fleet/handoffs/09-orchestrator-theming-brief.md` (Slice L) + `_fleet/handoffs/05-orchestrator-sprint1-brief.md` (conventions).
- Changed files: see Artifacts (line pointers below).
- Headless scripts I used (puppeteer-core 23 + system Chrome), in the scratchpad (may be cleared — they are short, re-create if gone):
  - `/private/tmp/claude-501/-Users-gaurabkumar-Documents-my-code-common-componant-main/02963ba5-1f2e-4c0f-8730-08349ed6f92f/scratchpad/cdp/scan.mjs`: for each theme × page, loads `?path=…&globals=theme:X`. It walks the visible elements of the manager document and of the preview iframe. In dark themes it flags background luminance > 0.8; in light themes it flags < 0.05. It skips nested `[data-theme]` previews and `aria-hidden` swatches. After that it runs a persistence check: load with infinia-dark, then load a URL with no `globals=`, then navigate.
  - `…/scratchpad/cdp/switch.mjs`: one manager session. It starts on infinia-light and switches through all 10 themes via the manager channel (`updateGlobals`), then back to light. For each theme it records the selected sidebar row bg/fg/contrast, the hovered-row bg and the active toolbar colour.
  - Run: `npx storybook dev -p 6116 --ci --no-open`, then `node scan.mjs http://localhost:6116 <outDir>` and `node switch.mjs http://localhost:6116`. For the static build I used `npx storybook build -o <dir>` and served it under a sub-path (`/common-componats/`) with `python3 -m http.server` to mimic GitHub Pages.
- Tests: `npx vitest run src/portal/components/storybookTheme.test.ts`.

## Boundaries
- Slice L owns only `.storybook/**`, `src/portal/portal.css`, `src/portal/components/**`, `src/portal/pages/*.tsx`. Showcase content (`src/ThemeShowcase.*`, `Themes.mdx`) belongs to Slice M. Tokens and component CSS belong to Slice N. Do not attribute their defects here.
- Infinia palettes (`.storybook/manager-palettes.ts` `INFINIA_LIGHT` / `INFINIA_DARK`) and the Infinia token values must stay byte-identical. This is a user decision (2026-11-26).
- Dark-coloured primary buttons in light themes (classic `--button-primary-default-bg` #0d0d0d) are design. They are not "dark islands".
- Not committed (per instruction).

## Context digest
- **Root cause, white docs:** Storybook renders the Docs/MDX chrome (`.sbdocs-wrapper`, the Canvas frame `.sbdocs-preview` + its `.sb-bar` toolbar, ArgsTable, Show code, Source) with its own emotion theme, which defaults to light. Only the story inside was dark. Fix, two layers:
  - (1) `.storybook/docs-container.tsx` (new). `ThemedDocsContainer` watches `data-theme` on `<html>` (MutationObserver on that one attribute, no subtree). On change it rebuilds the emotion theme from the same hex adapter the manager uses. Wired at `.storybook/preview.tsx:126` (`parameters.docs.container`).
  - (2) `.storybook/preview.css:153-326` pins the docs surfaces, text, borders, ArgsTable, code chips, frame toolbar, hover and focus-visible to tokens. Selectors are prefixed with `#storybook-docs` so they beat emotion's single-class rules. They only target `.sbdocs-*` / `.docblock-*`, so story content (`.sb-unstyled`) is never restyled.
- **Persistence:**
  - Helpers in `.storybook/theme-bridge.ts:85-137`: `THEME_STORAGE_KEY = "ui-common-components:storybook-theme"`, namespaced because GitHub Pages shares one origin. `readStoredTheme` and `storeTheme` wrap storage in try/catch and whitelist values against `TOOLBAR_THEMES`. `readThemeFromSearch` parses `globals=theme:x`.
  - Preview: `.storybook/preview.tsx:36-38` paints the theme before React mounts, and `:73` seeds `initialGlobals.theme` (URL > stored > light). The toolbar, every story and every MDX page therefore start on the same theme.
  - Preview save: `applyPreviewTheme` (`:25`) stores the theme and sets `color-scheme` on every SET_GLOBALS / GLOBALS_UPDATED and from the decorator.
  - Manager: `.storybook/manager.ts:68-97` applies URL > stored > light on load and listens to both SET_GLOBALS and GLOBALS_UPDATED (before this change it listened to GLOBALS_UPDATED only).
  - `manager-head.html:16-40` paints the stored/URL theme before the manager bundle loads, so there is no light flash.
- **Per-theme manager accents (user feedback):**
  - `THEME_ACCENTS` (`.storybook/manager-palettes.ts:166-187`) and `resolveManagerPalette` (`:189`) give each of the 8 non-Infinia themes its own `colorSecondary` (sidebar selected fill, white text), `barSelectedColor`/`barHoverColor` (active toolbar, tabs), `booleanSelectedBg` and `colorPrimary`. Before, these themes used a grey `#5e5e5e` selected fill, and dark used `#a8b0bb` with white text (2.19:1).
  - Dark uses its own hover step `#2563eb` for the selected fill, because primary `#3b82f6` is only 3.68:1 with white.
  - The manager now remounts its theme whenever the theme id changes (`manager.ts:68-75`). The old code cached on a coarse family key. Infinia entries are returned untouched, and a unit test asserts `toBe(INFINIA_LIGHT)`.
- **Olive leak:** I could not reproduce Infinia olive leaking into classic, either locally or against the deployed bundle (I downloaded the deployed manager bundle: same palette code). Two things could have caused it and are now hardened: the coarse cache key, and the manager missing SET_GLOBALS. A unit test asserts that resolving infinia-light first does not affect light. The live switch run (below) goes infinia-light → all themes → light with no leak.
- **Deployment bug found and fixed:**
  - `manager-head.html` loaded `/design-system/tokens.css`, `/infinia-manager-brand.css` and `/infinia-icon.png` root-absolute. On GitHub Pages (`/common-componats/`) these 404 (verified: `https://gaurabantu.github.io/design-system/tokens.css` → 404). So the deployed manager had no tokens at all.
  - These paths and `brandImage` (`manager.ts`) are now relative. Verified 200 under a sub-path with the static build.
- **Manager chrome islands removed:**
  - The "Storybook 11 beta / What's new" toast was a light card in dark themes; it is disabled at `.storybook/main.ts:38-40`.
  - The addon tab count badge ("Controls 32") had a fixed light fill; it is now pinned to `--color-fill-muted`/`--color-text-primary` (`brand/infinia-manager-brand.css:66`).
  - Removed the blanket `[aria-selected=true]{color:var(--color-theme-primary)}` rule (`brand/infinia-manager-brand.css:49-55` comment). It would have painted yellow text on white in infinia-light once tokens actually load on Pages.
  - `color-scheme: dark` is set for dark and infinia-dark (manager + preview).
- **Text selection:** Slice N already ships `::selection` with `--color-selection-*` in tokens.css (Infinia excluded by design), so Slice L adds no `::selection` rule. Docs hover rows/buttons use `--color-state-hover-bg` (Slice N) with fallback `--color-theme-surface-hover`.
- **`parameters.backgrounds`:** the default stays `surface` = `var(--color-bg-surface)`. All values are CSS variables, so the canvas never paints a fixed light colour (comment at `preview.tsx:128-131`).
- **Portal:**
  - `FoundationPages.tsx:515`: the All-tokens colour dot used inline px (14/4) and the raw value. It now uses `.pt-token-dot` (`portal.css:906-913`, tokens/rem only) and paints `var(<token>)`.
  - The remaining hex in `FoundationPages.tsx:399-404` and `GettingStartedPage.tsx:136-138` are string literals inside `<CodeBlock code=…>`: consumer documentation showing how to declare a brand theme. They are not rendered colours, so I kept them on purpose.
  - The scan shows zero light-background elements on portal pages in dark/infinia-dark.

### Verification results
**Dark-island scan** (`scan.mjs`, 1440×900). Pages: button autodocs, Welcome MDX, Colors MDX, Theme showcase docs, button Playground story. Manager + iframe, flagged element counts:

| Theme | Before (manager / preview, worst page) | After, dev server | After, static build under `/common-componats/` |
|---|---|---|---|
| dark | 2 / 36 (`.sbdocs-wrapper` rgb(255,255,255), `.sb-bar`, ArgsTable `td`, textarea, What's-new toast, "32" badge) | 0 / 0 on all 5 pages | 0 / 0 on all 5 pages |
| infinia-dark | 2 / 36 (same set) | 0 / 0 on all 5 pages | 0 / 0 on all 5 pages |
| light | 1 / 2 (toast; dark-island flags = classic `btn-primary` #0d0d0d only) | 0 / ≤2, all `btn-primary` | same |
| mist | 1 / 2 (same) | 0 / ≤2, all `btn-primary` | same |

**Persistence (before → after):**
- Load with `globals=theme:infinia-dark`, then load a URL with no globals. Before: manager=null, preview=null (fell back to light). After: manager=infinia-dark, preview=infinia-dark.
- Then navigate to a story: preview=infinia-dark. The static build gives identical results.

**Sidebar selected / hover / toolbar, all 10 themes** (`switch.mjs`, one session, switching via channel; identical on dev and static builds):

| Theme | Selected bg | Selected fg | Contrast | Hovered row bg | Active toolbar fg |
|---|---|---|---|---|---|
| infinia-light (unchanged) | #6b5900 | #ffffff | 6.88 | rgb(255,226,82) | #6b5900 |
| light | #2563eb | #ffffff | 5.17 | rgb(247,249,254) | #2563eb |
| blue | #2563eb | #ffffff | 5.17 | rgb(247,249,254) | #2563eb |
| dark | #2563eb | #ffffff | 5.17 | rgb(8,32,86) | #60a5fa |
| green | #15803d | #ffffff | 5.02 | rgb(142,236,177) | #15803d |
| mist | #2563eb | #ffffff | 5.17 | rgb(247,249,254) | #2563eb |
| custom | #e11d48 | #ffffff | 4.70 | rgb(252,232,236) | #e11d48 |
| blue-mist | #1a56db | #ffffff | 6.18 | rgb(223,232,251) | #1a56db |
| green-mist | #15803d | #ffffff | 5.02 | rgb(142,236,177) | #15803d |
| infinia-dark (unchanged) | #ffd400 | #ffffff | **1.43** | rgb(77,64,0) | #ffd400 |
| light (after cycling back) | #2563eb | #ffffff | 5.17 | (same as light) | #2563eb |

Before the change, light/blue/green/mist/custom/blue-mist/green-mist all showed `#5e5e5e` and dark showed `#a8b0bb` (2.19:1).

**Tests and builds:**
- vitest baseline before starting: 992 tests / 67 files. Now: 1260 / 70 files, all green. That includes the parallel M/N tests; Slice L adds 33 tests in `src/portal/components/storybookTheme.test.ts`: per-theme contrast ≥4.5 white-on-selected, bar accent ≥4.5 on barBg, no Infinia brand hex in the 8 palettes, no stale palette, Infinia untouched, storage whitelist / tamper / throwing storage, URL parse.
- `npx tsc --noEmit -p tsconfig.json | grep -E "\.storybook|src/portal"` prints nothing. A strict standalone `tsc` over the 5 `.storybook/*.ts(x)` files is clean.
- `npx storybook build` exit 0 (output went to the scratchpad, so the tracked tree was not touched).

### Self-check (QUALITY_CHECKLIST A/B/C)
- **A, contrast:**
  - Selected-row text ≥4.5:1 in all 8 non-Infinia themes (table above; asserted in `storybookTheme.test.ts`).
  - Active toolbar/tab accent ≥4.5:1 on barBg (asserted).
  - Docs text uses `--color-text-primary`/`-secondary` on `--color-bg-page`/`-surface` (`preview.css:166-196`).
  - Docs links come from the docs theme's `colorSecondary` = bar accent (`docs-container.tsx:37`), not `--color-theme-primary`, which is #ffd400 in infinia-light.
- **A, focus:** visible `outline: 2px solid var(--color-focus-ring)` on ArgsTable inputs, Show code and frame toolbar buttons (`preview.css:294-302`). Manager focus rule unchanged (`brand/infinia-manager-brand.css:43-46`).
- **B, security:**
  - No `dangerouslySetInnerHTML`, eval or new Function.
  - localStorage is treated as untrusted: whitelist in `theme-bridge.ts:91-111` and `manager-head.html:21-36`; tamper test `storybookTheme.test.ts`.
  - All storage access sits in try/catch (private mode / sandboxed iframes).
  - The storage key is namespaced. The URL globals parse is whitelisted (`theme-bridge.ts:124-137`).
- **C, responsive/dark/motion:**
  - Dark themes: zero light islands (scan).
  - `color-scheme: dark` for native controls and scrollbars (`preview.tsx:25-29`, `manager.ts:69-70`).
  - No new motion.
  - The portal dot uses rem/tokens (`portal.css:906-913`).

## Failed approaches
- **Node 25 + jsdom storage:** in vitest, `window.localStorage.getItem is not a function`, because Node ≥22's partial global `localStorage` shadows jsdom's. The test installs an in-memory `Storage` via `Object.defineProperty(window, "localStorage", …)` (`storybookTheme.test.ts`). Expect the same if you write storage tests elsewhere.
- **ArgsTable chip rule:** a first version (`td span[class^="css-"]`) also put a muted chip behind the prop **name** in column 1. It is now `td:not(:first-child) …` (`preview.css:279`).
- **My own `::selection` rule:** I first added one to preview.css and the brand css. I removed it because Slice N's tokens.css rule already covers it and deliberately leaves Infinia on the browser default. Mine would have changed the Infinia look.
- **Docs link rule:** `.sbdocs-a { color: var(--color-link, var(--color-theme-primary)) }` was removed. `--color-link` does not exist, and the fallback would have been #ffd400 on white in infinia-light.

## Artifacts
| Path | What it is | State |
|------|-----------|-------|
| `.storybook/docs-container.tsx` | NEW: theme-following DocsContainer | final |
| `.storybook/preview.tsx` | initial theme (URL > stored > light), `initialGlobals.theme`, persistence, color-scheme, docs container, backgrounds note; `defaultValue` removed from globalTypes (initialGlobals is the source) | final |
| `.storybook/preview.css` | Docs/MDX chrome token overrides (`:153-326`) | final |
| `.storybook/manager.ts` | per-theme remount, SET_GLOBALS, persistence, relative brandImage | final |
| `.storybook/manager-palettes.ts` | `THEME_ACCENTS` + new `resolveManagerPalette`; Infinia entries untouched | final |
| `.storybook/theme-bridge.ts` | `isDarkToolbarTheme`, `isToolbarTheme`, storage + URL helpers | final |
| `.storybook/manager-head.html` | relative asset URLs (Pages fix) + pre-paint theme script | final |
| `.storybook/brand/infinia-manager-brand.css` | removed aria-selected colour rule; tab badge; color-scheme for both dark themes | final |
| `.storybook/main.ts` | `core.disableWhatsNewNotifications` | final |
| `src/portal/pages/FoundationPages.tsx` | token dot uses class + `var(token)` | final |
| `src/portal/portal.css` | `.pt-token-dot` | final |
| `src/portal/components/storybookTheme.test.ts` | NEW: 33 tests | final |

## Acceptance criteria
- `npx vitest run src/portal/components/storybookTheme.test.ts`: 33 pass. Full `npx vitest run` green.
- `scan.mjs` on dark and infinia-dark flags 0 elements (manager + preview) on autodocs, MDX portal, showcase docs and story canvas.
- Reloading a URL without `globals=` keeps the last theme in both the manager and the preview.
- `switch.mjs` table: every non-Infinia theme shows its own accent with selected-row contrast ≥4.5. Infinia rows match the "before" values exactly.
- Static build served under a sub-path loads `design-system/tokens.css`, `infinia-manager-brand.css` and `infinia-icon.png` with status 200.

## Open questions
1. **Infinia-dark selected sidebar row is white text on #ffd400 = 1.43:1** (fails WCAG 1.4.3). This is unchanged from before. Storybook hardcodes the selected-row text to `color.lightest` (#fff). I did **not** change it because the user explicitly said not to change the Infinia look. Minimal fix if the user agrees: a CSS rule `[data-theme="infinia-dark"] .sidebar-item[data-selected="true"], [data-theme="infinia-dark"] .sidebar-item[data-selected="true"] * { color: #111 }` (or `var(--color-theme-text)`), which gives 13.6:1 and keeps the yellow fill. **Escalate to user.**
2. Deployed-site effect: because tokens now actually load on GitHub Pages, the manager `html` background, sidebar search input and button focus outline become token-driven there too, including on Infinia themes. These are the token values; the Infinia palette itself is unchanged. Re-deploy needed to see any of this.
3. The Storybook-derived sidebar **hover** fill for green/green-mist is a fairly saturated mint (rgb(142,236,177)). Text on it is ≥4.5 (#0d0d0d). It could be softened by overriding `.sidebar-item:hover` with `--color-state-hover-bg` for non-Infinia themes. Optional: cosmetic.
4. The scan scripts live in the session scratchpad. If the fleet wants them permanently, someone with `_fleet/scripts/` ownership should copy them there.

---

## Iteration 2 (VERDICT-sprint5 Slice L items 6, 7, 8) — 2026-11-26

### Item 6: theme change remounted the story (focus dropped to `<body>`). FIXED
- **Cause:** the old `withTheme` declared a new `Bridge` component on every decorator call. Because the component type changed on each globals update, React unmounted and remounted the whole story.
- **Fix:** `.storybook/preview.tsx:61-67`.
  - `withTheme` now calls Storybook's decorator hook `useEffect` (imported as `useStorybookEffect` from `@storybook/preview-api`, `:9`) to run `applyPreviewTheme(theme)` and returns `<Story />` directly.
  - The unused React `useEffect` import was dropped (`:1`).
  - Only the decorator and its import were edited. I re-read the file immediately before editing, so Slice O's `storySort` block is untouched.
- **Verification** (headless Chrome, `scratchpad/cdp/focus.mjs`, dev server):
  - **Input story:** `design-system-atoms-input--default`. Focus the input, type, then emit `updateGlobals` to dark, infinia-dark and mist in turn. Every switch gives `sameNode:true, connected:true, activeElement: SAME INPUT`, the value is preserved, and `data-theme` is updated. Before (reviewer probe1): `sameNode:false, oldNodeConnected:false, activeElement: BODY`.
  - **Theme showcase tile:** `design-system-theme-showcase--gallery`. Keyboard-focus the "Dark" tile and press Enter. Result: theme=dark, focus stays on the **same** tile node (`sameNode:true, tileConnected:true`), and the live region reads "Dark theme applied to every page."
- **Slice M workaround:** the focus/announcement "park and replay" in `src/ThemeShowcase.stories.tsx:926-971` is now **unnecessary**, because no remount happens any more. I did not edit it.
  - It is harmless as it stands: its own "still mounted shortly after → drop the parked replay" branch (`:966`) fires.
  - M (or the orchestrator) can remove it to simplify. Its comment at `:926-927` describing the remount is now stale.

### Item 7: ArgsTable overflow at 375px (optional). FIXED (cheap, desktop untouched)
- `.storybook/preview.css:318-331`: under `@media (max-width: 48rem)`, `#storybook-docs .docblock-argstable { display:block; max-width:100%; overflow-x:auto }`. The table scrolls inside its own box instead of the page.
- Verification (`scratchpad/cdp/narrow.mjs`, dark theme, docs iframe):

| Viewport | Docs page | Page `scrollWidth` | Table display | Table width (visible / scroll) |
|---|---|---|---|---|
| 375 | Button docs | 375 (was 624) | block | 335 / 603 |
| 375 | Input docs | 375 (was 765) | block | 335 / 744 |
| 1440 | Button docs | 1440 | table (unchanged) | 1000 / 1000 |

### Item 8: `_fleet/scripts/theme-scan/switch.mjs` crashed when nothing was selected. FIXED
- Rewritten to be robust:
  - CLI: `node switch.mjs [baseUrl=http://localhost:6006] [themeSeq] [startPath=docs/overview-welcome--docs]`.
  - If the start page leaves no `.sidebar-item[data-selected=true]` (missing or renamed id), the script logs a note and clicks the first leaf (`data-nodetype` `document`/`docs`/`story`). If that also fails, it prints `n/a` rows instead of throwing.
  - It now **composites translucent fills** over their ancestors before computing contrast, because the orchestrator's selected-row style is a tint.
  - Screenshots only when `SHOTS=` is set; `CHROME=` overrides the Chrome path.
- **Verification run with a stale id** (`docs/overview-component-inventory--docs`): note printed, fallback selected `overview-dashboard--docs`, full table produced.
- **Default run, all 10 themes** (selected bg composited / fg / contrast):

| Theme | Selected bg | Selected fg | Contrast |
|---|---|---|---|
| infinia-light | rgb(253,248,220) | #111 | 17.66 |
| light | rgb(239,246,255) | #0d0d0d | 17.86 |
| blue | rgb(239,246,255) | #0d0d0d | 17.86 |
| dark | rgb(30,47,73) | #f3f4f6 | 12.25 |
| green | rgb(240,253,244) | #0d0d0d | 18.57 |
| mist | rgb(239,246,255) | #0d0d0d | 17.86 |
| custom | rgb(255,241,242) | #0d0d0d | 17.69 |
| blue-mist | rgb(239,246,255) | #0d0d0d | 17.86 |
| green-mist | rgb(240,253,244) | #0d0d0d | 18.57 |
| infinia-dark | rgb(46,40,15) | #fff | 14.72 |

  This matches the reviewer's probe3 within rounding (dark 12.25 vs 12.32: composited over a slightly different ancestor).
- Run it from a directory where `puppeteer-core` resolves (e.g. `scratchpad/cdp`), as before.

### Regression checks (iteration 2)
- Dark-island scan (dark, infinia-dark × button docs, Welcome, showcase docs, Input story): 0 flagged in the manager and preview. Persistence lines are unchanged: reload gives infinia-dark in both the manager and the preview.
- `npx vitest run`: 1519/1519 green (this total includes the other slices' concurrent additions).
- `tsc` grep for `.storybook|src/portal`: empty.
- `npx storybook build` (output to scratchpad): exit 0.
