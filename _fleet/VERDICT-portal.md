# Compliance verdict — Storybook Design System Portal + new/changed components

- **Reviewer:** compliance-reviewer (read-only; no source edits — only this file and the LEDGER row were written)
- **Date:** 2026-11-03
- **Brief:** `_fleet/handoffs/04-component-author-to-compliance-reviewer.md`
- **Scope:** IconBox, List/ListItem, StatCard, CodeBlock (new); Card `interactive`/`selected`, Tabs.css, Badge.css danger-soft, tokens.css (`--color-danger-strong`, `a.btn-base`); `src/portal/**`; `.storybook/main.ts`, `.storybook/preview.tsx`; `scripts/prepare-storybook-downloads.mjs`.
- **Iteration 1 overall:** Accessibility FAIL · Security PASS · Responsiveness FAIL
- **Iteration 3 overall (FINAL):** Accessibility **PASS** · Security **PASS** · Responsiveness **PASS** → ships. One residual is accepted with a reason (fine-pointer token chip 32px); see "Iteration 3".
- **Iteration 2 overall:** Accessibility **FAIL** (A2 only) · Security **FAIL** (B1 only) · Responsiveness **FAIL** (C5 only, same defect as A2) → back to component-author for iteration 3 of 3. Two small fixes remain; see "Iteration 2" below.

# Iteration 3 — final re-audit (2026-11-03)

**Evidence**
- `npx vitest run`: **143 passed, 29 files** (now matches the handoff).
- axe harness re-run on the same 15 pages and 9 component cases: **0 violations**. The `javascript:` bypass case now renders no `<a>` at all.
- Node repro against the new `isSafeHref` logic: these all return `false`:
  - `"java\tscript:alert(1)"`
  - `"java\nscript:alert(1)"`
  - `"\x01javascript:alert(1)"`
  - `"  JAVASCRIPT:alert(1)"`
  - `vbscript:`
  - `data:text/html`

  `https:`, `/docs`, `#top` and `mailto:` return `true`. `//host` returns `true`, which is fine: it resolves to https.

## Accessibility (iteration 3): PASS
- [PASS] A2 CodeBlock copy button — `min-width: 44px; height: 44px` (`src/components/molecules/CodeBlock/CodeBlock.css:70-71`). It fits the 48px header. Floating mode: the button covers 8–52px from the right edge and the `<pre>` reserves 56px (`:128`), so the button never overlaps the code.
- [ACCEPTED WITH REASON] A2 Token chip — 44px under `@media (pointer: coarse)` (`src/portal/portal.css`, last rule) and 32px on fine pointers (`portal.css:596`). Reason: it is a desktop copy affordance in the Storybook-only portal. It passes WCAG 2.2 SC 2.5.8 (24px) at 32px, and touch devices get the full 44px house target.

## Security (iteration 3): PASS
- [PASS] B1 `isSafeHref` — WHATWG `new URL(href, "https://relative.invalid/")` checked against an allow-list (`http: https: mailto: tel:`), returning false if parsing throws (`src/components/molecules/List/index.tsx:8-22`). Regression cases are in `List.test.tsx:80-83`. The control-character bypass is closed.

## Responsiveness (iteration 3): PASS
- [PASS] C5 Touch — same evidence as A2. The copy button is 44×44 on all pointers; the token chip is 44px on coarse pointers (fine-pointer 32px accepted above).

## Ranked fix list (iteration 3)
None blocking. Still escalated to the user (outside this verdict, unchanged):
- the small segmented Tabs height (`Tabs.css:361-363`)
- the dark and green-mist `--color-focus-ring` tokens
- `--color-text-secondary` on the page background, and `--color-border-default`
- Storybook GHSA-f2ph-cmg5-wxc8


# Iteration 2 — re-audit (2026-11-03)

I re-checked every fix in the code instead of relying on the iteration-2 table in the handoff. Items the handoff escalates to the user stay out of this verdict, as before: small segmented Tabs at 22px (`Tabs.css:361-363`, a pre-existing uncommitted user change), the dark and green-mist focus-ring tokens, text-secondary on page / border-default, and the Storybook advisory.

**Evidence**
- `npx vitest run`: **143 passed**, but in **29** test files, not the 30 the handoff states. The test count matches; the file-count claim is off by one.
- axe harness re-run on the same 15 pages and component cases, plus 2 new cases (unselected interactive Card, `javascript:` bypass href): **0 violations** on every page and case. The 3 critical rules from iteration 1 are gone.
- I recomputed contrast for every changed value (WCAG formula, `color-mix` resolved in sRGB).
- Real-browser 375px / IDREF / h1 sweep: this is **producer evidence**. I can't reproduce it (no headless browser installed). Nothing in the CSS contradicts it.

## Accessibility (iteration 2): FAIL — A2 only
- [PASS] A3/A4 CodeBlock focus ring — `--code-focus` = mist-40 on the dark panel: 11.76:1 on the noir-80 header, 17.8:1 on the noir-100 body. Light tone uses the theme ring: 5.57:1 on #fff, 5.11:1 on #f5f5f5 (`src/components/molecules/CodeBlock/CodeBlock.css:10,29,91-94,136-139`).
- [PASS] A4 CodeBlock light "Copied" — `--code-copied` = success-strong: 5.33:1 Classic, 7.64:1 dark (`CodeBlock.css:11,30,101-103`).
- [PASS] A4 CodeBlock light muted text — 72% text-primary mix: 7.63:1 Classic, 6.93:1 mist, 5.76:1 dark (`CodeBlock.css:26`).
- [PASS] A4 StatCard neutral delta — text-primary: 17.8:1 / 14.7:1 / 9.37:1 (`src/components/molecules/StatCard/StatCard.css:92-96`).
- [PASS] A4 Dark danger — `--color-danger-strong: #fca5a5` on the dark danger fill = 5.77:1 (`src/design-system/tokens.css:493`). Applies to Badge danger-soft and the StatCard down delta.
- [PASS] A6 Brand-slot matrix — now a real `<table>` with `<caption>`, `th scope="col"` and `th scope="row"`, and sr-only token text in each cell. It sits in a focusable, labelled scroll region (`src/portal/pages/FoundationPages.tsx:364-389`). axe is clean.
- [PASS] A10 Filters — `FilterGroup` = `role="group"` + `aria-label` with `Button aria-pressed` true/false. Button spreads `...rest` into the DOM (`Button/index.tsx:68,245`) (`src/portal/components/Portal.tsx:236-262`). Used at `OverviewPages.tsx:211` and `FoundationPages.tsx:497`. Library Tabs now sets `aria-controls` only on the selected tab (`src/components/molecules/Tabs/index.tsx:355`). axe `aria-valid-attr-value` is clean.
- [PASS] A10 Card pressed state — `aria-pressed={selectedProp}` whenever `selected` is passed (`src/components/molecules/Card/index.tsx:329`). Harness check: selected → `"true"`, `selected={false}` → `"false"`, omitted → absent. The single-select toggle groups (`Showcase.tsx:54-61,168`) now expose both states. Radio semantics would be nicer but this is no longer a defect.
- [PASS] A10 Navigation is links — Welcome tiles are `<a class="pt-tile-link" {...portalLinkProps}>` around a non-focusable Card surface, so the `h3` stays in heading navigation (`src/portal/pages/WelcomePage.tsx:127-145`). Focus ring on the link: 4.22:1 on the Classic page (`portal.css:1096-1099`). Inventory "View" uses `portalLinkProps` (`OverviewPages.tsx:253`).
- [PASS] A10 Motion toggle — `aria-pressed` removed; the label alone carries the state (`FoundationPages.tsx:291`). Typography samples use `as="p"` (`FoundationPages.tsx:155`), so there is one h1 per page.
- [PASS] C6/forced-colors — selected outline uses `Highlight` (`Card.css:147-152`, `List.css:145-150`).
- [FAIL] A2 Touch targets (house rule ≥44×44px, AGENTS.md / QUALITY_CHECKLIST A2; WCAG 2.5.8's 24px is met) — still short in two places. The CodeBlock copy button is **40×40** (`src/components/molecules/CodeBlock/CodeBlock.css:70-71`); the 48px header doesn't help because the hit area is the button. The token chip is **min-height 32px** (`src/portal/portal.css:596`). Fix: `min-width/height: 44px` on the copy button (the 48px header already fits it), and on the token chip either `min-height: 44px` under `@media (pointer: coarse)` or a transparent `::before` hit-area expander. The other option is to record an explicit acceptance with a reason, which the checklist allows.

## Security (iteration 2): FAIL — B1 only
- [PASS] B1/B4/B5/B7 — still clean: grep for `dangerouslySetInnerHTML|innerHTML|eval|new Function` finds nothing in scope, no new dependencies, `npm audit --omit=dev` = 0.
- [FAIL] B1 `isSafeHref` can be bypassed with control characters (`src/components/molecules/List/index.tsx:8-13`). The guard claims to block `javascript:`/`data:`, but it tests the raw string. The WHATWG URL parser strips ASCII tab/newline anywhere and leading C0 control characters, so these all return `isSafe=true` while resolving to `protocol: "javascript:"`. Reproduced with `node -e` and `new URL(h, "https://x.test/")`:
  `"java\tscript:alert(1)"`, `"java\nscript:alert(1)"`, `"\x01javascript:alert(1)"`.
  React 19.1.2 (installed here) replaces the URL with a throwing stub, so the repo's own Storybook is not exploitable. The peer range is `react >=18` (`package.json` peerDependencies), and React 18 only warns, so React 18 consumers who pass untrusted `href` values are exposed. The function promises a protection it doesn't deliver. Fix: `const u = new URL(href, "https://base.invalid/"); return ["http:","https:","mailto:","tel:"].includes(u.protocol)` (with a try/catch returning false), or strip `/[\u0000- ]/g` before the scheme test. Add the three strings above to `List.test.tsx:75-78` as `false` cases.

## Responsiveness (iteration 2): FAIL — C5 only
- [PASS] C1/C3/C4/C6/C7 — no layout regressions in the changed CSS. The slot table is in an `overflow-x:auto` region with `min-width: 34rem` (`portal.css:1106-1117`), so the intentional table scroll is allowed. `.pt-tile-link` is `display:block`. Producer evidence: 375px scrollWidth ≤375 on all 15 pages.
- [FAIL] C5 Touch — same two defects as A2 (doubly enforced): `CodeBlock.css:70-71` (40px), `portal.css:596` (32px). The `size="xs"` row actions are fixed: `Showcase.tsx` has no `size="xs"` left.

## Ranked fix list (iteration 2)
1. [component-author] P1 — Harden `isSafeHref` against tab/newline/C0 bypasses (URL-parse or strip controls) and add the 3 regression cases (`src/components/molecules/List/index.tsx:8-13`, `List.test.tsx:75-78`)
2. [component-author] P2 — CodeBlock copy button 40px → 44px (`src/components/molecules/CodeBlock/CodeBlock.css:70-71`; floating-copy padding at `:128` should grow to match)
3. [component-author] P2 — Token chip 32px → 44px hit area on coarse pointers (`src/portal/portal.css:596`), or record an explicit acceptance
4. [component-author] P3 — Fix the handoff's test-file count (29, not 30)

---
# Iteration 1 (history)

## Evidence run
| Check | Result |
|---|---|
| `npx vitest run` | **29 files / 139 tests passed** (matches the handoff claim) |
| axe-core 4.x in jsdom, run on all 15 portal pages + 7 component cases (scratch config outside the repo; `color-contrast` disabled because jsdom has no layout) | 3 critical rule failures: `aria-valid-attr-value` on InventoryPage + AllTokensPage, `aria-required-children`/`aria-required-parent` (63 nodes) on ThemesPage. The other 12 pages and all component cases came back clean. |
| Contrast | I calculated every ratio with the WCAG relative-luminance formula from the token hex values in `src/design-system/tokens.css`, and resolved `color-mix()` in sRGB. |
| grep `dangerouslySetInnerHTML\|innerHTML\|outerHTML\|document.write\|insertAdjacentHTML\|eval(\|new Function` over scope | Nothing found in code. The only hit is a string literal at `Showcase.tsx:211`. |
| `npm audit --omit=dev` | 0 vulnerabilities |
| `npm audit` (full tree) | 4 critical / 17 high. All are in devDependencies and none were added by this change (the `package.json` diff only adds scripts). |
| 375px reflow | **Not re-measured in a browser.** No headless browser is installed. I did a static CSS review: no fixed widths over 343px, every multi-column grid collapses at ≤30–64rem, and `.pt-slot-matrix` has `overflow-x:auto`. That review agrees with the handoff's scrollWidth=375 claim. |

## Accessibility: FAIL
- [PASS] A1 Keyboard — Interactive Card: `role="button"`, `tabIndex=0`, Enter/Space call `.click()` only when target===currentTarget (`src/components/molecules/Card/index.tsx:327-339`). Covered by `Card.test.tsx:51-63`. Copy controls are native `<button>`. The scrollable `<pre>` is focusable (`CodeBlock/index.tsx:102`).
- [PASS] A3 Focus visibility (light themes) — No `outline:none` and no `:focus` (non-visible) selector in scope. Every focus rule uses `:focus-visible` with `--color-focus-ring`: `Card.css` (new rule), `List.css:95-98`, `CodeBlock.css:85-88,130-133`, `portal.css:636-638,1050-1052`.
- [FAIL] A3/A4 Focus ring contrast — CodeBlock copy button in the header, **default `tone="dark"`**: `--color-focus-ring` #0066cc on header `--color-noir-80` #323232 = **2.30:1**, below 3:1 for non-text (`src/components/molecules/CodeBlock/CodeBlock.css:85-88`, header bg `:34`, `--code-header-bg` `:8`). Fix: inside `.ds-code` (dark tone) use a light ring, e.g. `outline-color: var(--code-fg)` (#f5f5f5 on #323232 = 11.76:1), or a 2-ring (light outer + focus-ring inner).
- [FAIL] A4 Contrast — CodeBlock `tone="light"` "Copied" state: `--color-accent-mint-40` #a0e7c4 on `--color-bg-surface` #fff = **1.43:1** for the visible "Copied" label and check icon (`CodeBlock.css:95-97`, light header bg `:24`). Fix: in `[data-tone="light"]` use `--color-success-strong` (#1a7a4f on #fff = 5.33:1).
- [FAIL] A4 Contrast — StatCard neutral delta (`trend:"neutral"`): `--color-text-secondary` #757575 on `--color-fill-muted` #f5f5f5 = **4.23:1** (Classic), **3.49:1** in mist / blue-mist / green-mist (fill-muted = #e0e0e0), and **4.06:1** dark (#9CA3AF on #374151). This is 12px/600 text, so 4.5:1 applies (`src/components/molecules/StatCard/StatCard.css:92-95`). Seen live in the portal at `src/portal/components/Showcase.tsx:135`. Fix: `color: var(--color-text-primary)` (17.8:1 / 14.7:1 / 9.37:1).
- [FAIL] A4 Contrast (dark mode) — danger text on danger fill: dark `--color-danger-strong` #F87171 on `--color-danger-fill` (20% mix on #1F2937 = #4a3743) = **3.96:1** (`src/design-system/tokens.css:492,494`). Affects the changed Badge danger-soft (`src/components/atoms/Badge/Badge.css:128-131`; the old dark value was 3.46:1, so better but still failing) and the StatCard "down" delta (`StatCard.css:87-90`). The light-theme fix is verified: #a3293d on #ffe9ec = 6.16:1 (`tokens.css:365`). Fix: set dark `--color-danger-strong` to #FCA5A5 (5.77:1 on the current fill).
- [FAIL] A4 Contrast — CodeBlock `tone="light"` line numbers / language chip (`--code-muted` = `--color-text-secondary`) on `--code-bg` = `--color-fill-muted`: **4.23:1** Classic, **3.49:1** mist themes (`CodeBlock.css:22`, applied at `:139-146` and `:48-57`). Fix: map light `--code-muted` to a token that reaches ≥4.5:1 on fill-muted in every theme, e.g. a `color-mix(text-primary 72%, fill-muted)` like the portal's `--pt-text-on-page`.
- [FAIL] A4 Focus ring (dark / green-mist themes, **pre-existing global token — escalate**) — `--color-focus-ring` #0066cc on dark surface #1F2937 = **2.64:1** (`tokens.css:517`). green-mist #06b6d4 on #fafafa = **2.33:1** (`tokens.css:657`). Every in-scope focus ring inherits these (Card interactive, List link, CodeBlock, portal links/tokens). The tokens are not new; recorded because the in-scope components depend on them.
- [KNOWN / ESCALATED] A4 — `--color-text-secondary` on `--color-bg-page` = 3.49:1 (`tokens.css:327,330`). The portal avoids it with `--pt-text-on-page` (`src/portal/portal.css:26`, 6.93:1 Classic / 7.34:1 mist / 8.75:1 dark). `--color-border-default` on surface = 2.85:1 (`tokens.css:336`), used by `List.css:19` (bordered), `IconBox.css:51` (outline tone) and the Card bordered border (`Card/index.tsx:164`). Product decision pending, not counted against this verdict.
- [PASS] A4 Colour not sole carrier — StatCard trend = arrow SVG + visually hidden "Increased/Decreased/No change" (`StatCard/index.tsx:77-78`, `StatCard.config.ts:4-8`). Tabs active label is now `--color-text-primary` (19.4:1) plus a 2px indicator (`Tabs.css:9-12`), verified. List selected = background + inset bar + `aria-current`.
- [PASS] A5 Forms — `InputSearch ariaLabel` (`OverviewPages.tsx:203-210`, `FoundationPages.tsx:481`). `Input label="Rule name"` (`Showcase.tsx:88`). Polite status regions for result counts (`OverviewPages.tsx:221`, `FoundationPages.tsx:493`) and copy (`CodeBlock/index.tsx:121-123`).
- [FAIL] A6 Tables — Brand-slot matrix uses `role="table"` / `columnheader` / `rowheader` / `cell` with **no `role="row"`**. axe flags `aria-required-children` (critical) and `aria-required-parent` on 63 nodes, so assistive tech cannot build the grid (`src/portal/pages/FoundationPages.tsx:364-375`). The cells (`:373`) are also empty, with only a `title`, so they have no accessible content. Fix: wrap each header row and theme row in `<div role="row">` (use `display: contents` to keep the CSS grid), and give each cell a text alternative (e.g. visually hidden token value), or render a real `<table>`.
- [N/A] A7 Overlays — no Modal/Popover/DropdownMenu in scope.
- [PASS] A8 Feedback — CodeBlock copy status is `role="status" aria-live="polite"` (`CodeBlock/index.tsx:121`).
- [PASS] A9 Motion — `prefers-reduced-motion` handled in `List.css:141-143`, `CodeBlock.css:158-160`, `portal.css:766-768,1070-1076`. The Motion demo only plays when the user presses a button (`FoundationPages.tsx:291`); nothing auto-plays.
- [FAIL] A10 Semantics — Tabs used as a filter with no `TabsContent`: each `role="tab"` emits `aria-controls` pointing to a tabpanel that does not exist. axe flags `aria-valid-attr-value` (critical) (`src/portal/pages/OverviewPages.tsx:212-219`, `src/portal/pages/FoundationPages.tsx:485-491`; the emitter is `Tabs/index.tsx:353`). Fix: use a filter control without tab semantics (RadioGroup / segmented radio, or toggle buttons with `aria-pressed`), or render one `TabsContent` that wraps the filtered list.
- [FAIL] A10 Semantics — Interactive Card exposes `aria-pressed` only when `selected` is true (`src/components/molecules/Card/index.tsx:329`). Unselected tiles are announced as plain "button" and the selected one as "toggle button, pressed", so the on/off state is missing in one of the two states (WCAG 4.1.2). The portal uses this pattern for **single-select** groups (`src/portal/components/Showcase.tsx:54-61` process options; `:166-177` theme list), which should be radio semantics. Fix (library): when `actsAsButton` and `selected` is explicitly passed, emit `aria-pressed={selected}` (true/false). Fix (portal): give the single-select groups `role="radiogroup"` with radio items (`role="radio"` + `aria-checked`), or use the library RadioGroup.
- [FAIL] A10 Semantics (answers the brief's open question) — navigation tiles are buttons, not links: Welcome "What's in the box" tiles (`src/portal/pages/WelcomePage.tsx:127-141`) and Inventory "View" buttons (`OverviewPages.tsx:243-252`) call `navigateTo()` from `onClick`. They have no href, so open-in-new-tab, copy-link and the screen-reader links list don't work. Inside `role="button"` the `<h3 className="pt-tile__title">` (`WelcomePage.tsx:130`) is also flattened out of heading navigation, and the long `aria-label` (`:127`) replaces the content. **Recommendation: links.** Render each tile as `<a {...portalLinkProps(title)}>` with the Card as a non-interactive surface (stretched-link pattern, heading kept outside the anchor name), and pass `portalLinkProps` to the Inventory `<Button>` as the hero CTAs already do (`WelcomePage.tsx:94`).
- [PASS] A10 Decorative icons — portal icon factory defaults `aria-hidden` + `focusable="false"` (`src/portal/icons.tsx:18-19`). IconBox is `aria-hidden` unless `label` is set, in which case it gets `role="img"` (`IconBox/index.tsx:27-29`). Copy buttons have accessible names that include the visible text (`CodeBlock/index.tsx:70`, `Portal.tsx:142`).
- [FAIL] A2 Touch targets (house rule ≥44×44px, AGENTS.md; WCAG 2.5.8's 24px minimum is met) — segmented `size="sm"` trigger `min-height: calc(--button-height-xs − 4px)` = **22px** (`src/components/molecules/Tabs/Tabs.css:361-363`; this new rule was not listed in the handoff and is used at `OverviewPages.tsx:212`). CodeBlock copy button **32×32** (`CodeBlock.css:64-65`). `Button size="xs"` (26px) for row actions (`Showcase.tsx:76,81,151`). Token chip `min-height: 24px` (`src/portal/portal.css:596`). Fix: ≥44px hit area on coarse pointers, e.g. `@media (pointer: coarse) { min-height: 44px }` or an invisible `::before` hit-area expander. Use `size="sm"` instead of `xs`.

## Security: PASS
- [PASS] B1 XSS — grep is clean (see Evidence). CodeBlock renders `code` as text nodes only (`CodeBlock/index.tsx:106-117`). ListItem title, description and meta are JSX children. The token parser output goes into text and React style objects, never HTML (`FoundationPages.tsx:505`).
- [PASS] B2 DOM manipulation — the only manual DOM write is the clipboard fallback textarea, which is created, used and removed in one call (`CodeBlock/CodeBlock.utils.ts:15-28`). It is never rendered and never logs.
- [PASS] B3 Focus security — no overlays in scope. The Card keyboard handler ignores events from descendants (`Card/index.tsx:334`).
- [PASS] B4 No `eval` / `new Function` (grep clean). No new runtime or dev dependencies (`git diff package.json` only adds `prepare:downloads`, `prestorybook`, `prebuild-storybook`). `npm audit --omit=dev` = 0.
- [KNOWN / ESCALATED — pre-existing] B4 Full-tree audit: 4 critical / 17 high, all dev tooling. The relevant one for the **publicly deployed** portal is `storybook` 8.0.0–8.6.18, GHSA-f2ph-cmg5-wxc8 "Missing origin validation in Storybook preview allows code injection". The portal relies on the preview channel (`src/portal/navigation.ts:23-25`, `.storybook/preview.tsx:18-22`). This was not introduced by this change (`^8.6.18` is already at HEAD). Recommend upgrading to the patched Storybook 8.6.x before the next portal deploy.
- [PASS] B5 CSP — no inline HTML handlers, no `<style>`/`<script>` in output (grep clean). Dynamic styles are React style objects (set through the CSSOM). `window.location.href` is read behind a `typeof window` guard (`OverviewPages.tsx:57`). `target="_blank"` gets `rel="noopener noreferrer"` (`List/index.tsx:70`). Portal links use `_top` with a same-origin relative href (`navigation.ts:13-15,31-32`).
- [PASS] B7 Secrets — no keys, tokens or PII in scope; the portal data is fictional. The download script copies a fixed whitelist of 5 repo files and nothing else (`scripts/prepare-storybook-downloads.mjs:39-80,87-103`). The output dir is gitignored (`.gitignore` +`.storybook/downloads/`).
- [N/A] B6 — no auth or validation forms in scope.

## Responsiveness: FAIL
- [PASS] C1 Breakpoints (static review; browser re-measure MISSING — no headless browser available) — page frame `max-width:78rem; width:100%` with reduced padding at ≤48rem (`portal.css:43-57`). All grids use `auto-fit, minmax(≤20rem)` (`portal.css:173-182`). Hero, specimen and theme lab go to one column at 64/48/56rem (`portal.css:215,723,808`). The option grid collapses at 30rem (`portal.css:343`). Scale rows collapse at 40rem (`portal.css:664-671`). The slot matrix scrolls (`portal.css:890`). Nothing contradicts the handoff's scrollWidth=375 result.
- [PASS] C3 Data display — ListItem trail drops below the body at ≤40rem and the meta text wraps (`List.css:124-139`). CodeBlock scrolls internally, or soft-wraps with `wrap` (`CodeBlock.css:109-128`). StatCard has `min-width:0` (`StatCard.css:7`).
- [PASS] C4 Forms — search inputs `fullWidth` (`OverviewPages.tsx:209`, `FoundationPages.tsx:481`).
- [FAIL] C5 Touch — same defects as A2 (doubly enforced): `Tabs.css:361-363` (22px), `CodeBlock.css:64-65` (32px), `Showcase.tsx:76,81,151` (`size="xs"`), `portal.css:596` (24px). Hover-only reveal of the copy icon on the token chip (`portal.css:614-634`) still leaves a tappable button with a full accessible name, so it passes.
- [PASS] C6 Theme — no hex literals in `portal.css` or the new components' CSS (grep clean). Every colour comes from a `var(--color-*)` token. Reduced motion is covered (see A9). The dark-mode contrast failures are listed under A4.
- [PASS] C7 Composition — one `primary` per page zone: Welcome hero `Get started` (`WelcomePage.tsx:94`), Downloads header (`OverviewPages.tsx:66`), Adoption section `Read the guide` (`WelcomePage.tsx:201`). The embedded example screens (`Showcase.tsx:100,129`) each have their own single primary inside a labelled group. Optional: demote those to `outlinePrimary` so the hero reads as one CTA.

## Ranked fix list
P1 — blocks ship
1. [component-author] CodeBlock dark-header focus ring 2.30:1 → use a light ring on dark tone (`src/components/molecules/CodeBlock/CodeBlock.css:85-88`)
2. [component-author] CodeBlock light-tone "Copied" 1.43:1 → `--color-success-strong` under `[data-tone="light"]` (`CodeBlock.css:95-97`)
3. [component-author] StatCard neutral delta 4.23 / 3.49 / 4.06:1 → `--color-text-primary` (`src/components/molecules/StatCard/StatCard.css:92-95`)
4. [component-author] Dark `--color-danger-strong` 3.96:1 on danger fill → #FCA5A5 (`src/design-system/tokens.css:492`; affects `Badge.css:128-131`, `StatCard.css:87-90`)
5. [component-author] Tabs-as-filter dangling `aria-controls` (axe critical) → radio/toggle filter or a single TabsContent (`src/portal/pages/OverviewPages.tsx:212-219`, `src/portal/pages/FoundationPages.tsx:485-491`)
6. [component-author] Slot matrix `role="table"` without rows (axe critical) → add `role="row"` wrappers + cell text (`src/portal/pages/FoundationPages.tsx:364-375`)
7. [component-author] Card `aria-pressed` missing when unselected → `aria-pressed={selected}` when `selected` is passed (`src/components/molecules/Card/index.tsx:329`); single-select portal groups → radiogroup/radio (`src/portal/components/Showcase.tsx:54-61,166-177`)
8. [component-author] CodeBlock light-tone line numbers / lang chip 4.23 / 3.49:1 → stronger `--code-muted` (`CodeBlock.css:22`)
9. [component-author] ESCALATE (pre-existing token): dark focus ring 2.64:1 (`tokens.css:517`), green-mist focus ring 2.33:1 (`tokens.css:657`)

P2 — should fix before ship
10. [component-author] Navigation tiles / "View" → real links with `portalLinkProps` (`src/portal/pages/WelcomePage.tsx:127-141`, `src/portal/pages/OverviewPages.tsx:243-252`)
11. [component-author] Touch targets below 44px → coarse-pointer hit areas (`src/components/molecules/Tabs/Tabs.css:361-363`, `src/components/molecules/CodeBlock/CodeBlock.css:64-65`, `src/portal/portal.css:596`); `xs` → `sm` (`src/portal/components/Showcase.tsx:76,81,151`)
12. [component-author] ESCALATE (pre-existing dep): upgrade Storybook past GHSA-f2ph-cmg5-wxc8 before the next public portal deploy (`package.json` devDependencies `storybook ^8.6.18`)

P3 — nice to have (optional)
13. [component-author] Motion "Play/Reset" changes its label and also sets `aria-pressed` (APG: a toggle's label should not change) → drop `aria-pressed` or keep the label fixed (`src/portal/pages/FoundationPages.tsx:291`)
14. [component-author] Optional: `ListItem href` passes any URL protocol straight through (React 18 still renders `javascript:` URLs). Consider allowing only http(s)/relative/mailto (`src/components/molecules/List/index.tsx:65-69`)
15. [component-author] Optional: in `forced-colors` the selected Card/ListItem looks the same as unselected (`box-shadow` is dropped, border is forced) → add `@media (forced-colors: active)` with a 2px `Highlight` outline (`Card/index.tsx:161-189`, `List.css:44-47`)
16. [component-author] Optional: `interactive` without `onClick` still shows pointer and hover affordance but is not focusable. Gate `data-card-interactive` on `actsAsButton` or document it (`Card/index.tsx:325`)
