# Handoff: component-author -> compliance-reviewer

- **Task:** Audit the new/changed library components and the Storybook Design System Portal for WCAG 2.2 AA, security and responsiveness.
- **Status:** ready

## Objective
Produce a PASS/FAIL verdict per dimension (A Accessibility, B Security, C Responsiveness) for the artifacts below, with file:line evidence for every failure and a ranked fix list naming the owner.

## Output format
Write `_fleet/VERDICT-portal.md` using the "Verdict format" section of `_fleet/QUALITY_CHECKLIST.md`
(## Accessibility: PASS / FAIL · ## Security: PASS / FAIL · ## Responsiveness: PASS / FAIL · ## Ranked fix list).
Each failure: rule id (e.g. A3), file:line, why it fails, concrete fix, owner (`component-author` for src/components/**, `component-author` for src/portal/**).

## Sources and tools
- Checklist: `_fleet/QUALITY_CHECKLIST.md` (A1–A10, B1–B7, C1–C7)
- New components (full canonical dirs): `src/components/atoms/IconBox/`, `src/components/molecules/List/`, `src/components/molecules/StatCard/`, `src/components/molecules/CodeBlock/`
- Changed components: `src/components/molecules/Card/{index.tsx,Card.types.ts,Card.css}` (new `interactive` prop, bordered `selected` outline), `src/components/molecules/Tabs/Tabs.css` (indicator default), `src/components/atoms/Badge/Badge.css` (danger soft), `src/design-system/tokens.css` (search `--color-danger-strong`, `a.btn-base:not(.btn-link)`)
- Barrel: `src/index.tsx` (tail — new exports)
- Portal (Storybook-only, not shipped): `src/portal/**` — pages in `src/portal/pages/*.tsx`, shared UI in `src/portal/components/`, CSS `src/portal/portal.css`, nav `src/portal/navigation.ts`, token parser `src/portal/tokens/`
- Storybook config: `.storybook/main.ts`, `.storybook/preview.tsx`; download script `scripts/prepare-storybook-downloads.mjs`
- Commands: `npx vitest run` (expect 139 passing), `git diff --stat`, `grep -rn dangerouslySetInnerHTML src/portal src/components/{atoms/IconBox,molecules/List,molecules/StatCard,molecules/CodeBlock}`

## Boundaries
- Review only the paths above. Pre-existing components not listed are out of scope.
- Read-only: do not edit source. Do not run `npm run build` (it overwrites tracked `dist/`).
- Known, intentionally NOT fixed (product decision pending with the user) — record as findings but mark "known / escalated": `--color-text-secondary` on `--color-bg-page` = 3.49:1 and `--color-border-default` on surface = 2.85:1 (Classic theme).

## Context digest
- Portal pages are MDX docs pages wrapping React pages in `<Unstyled>`; they compose only library components plus layout CSS.
- Card `interactive` + `onClick` → `role="button"`, `tabIndex=0`, Enter/Space activation, `aria-pressed` when `selected`; children of interactive cards must be non-interactive.
- CodeBlock renders code as text nodes (no highlighting HTML); copy uses Clipboard API with execCommand fallback; status in a polite live region.
- StatCard trend = arrow + visually-hidden text ("Increased"/"Decreased"), never colour alone.
- Tabs fix: active label previously used `--color-border-default` (#999, 2.9:1); now `--color-text-primary` with 2px indicator.
- Danger fix: light `--color-danger-strong` → `--color-accent-rose-fg` (6.16:1 on danger fill; was 3.91:1).
- Responsiveness verified: all 15 portal pages have scrollWidth = 375 at a 375px iframe.

## Failed approaches
- Token parser initially dropped the typography section: comments in tokens.css contain literal `{}` and the word "@import". Fixed (braces neutralised in comments; `@import` stripped only at line start) with regression tests in `src/portal/tokens/parseTokens.test.ts`.

## Artifacts
| Path | What it is | State |
|------|-----------|-------|
| src/components/atoms/IconBox/ | New atom (types, config, index, css, stories, test) | final |
| src/components/molecules/List/ | New molecule List/ListItem | final |
| src/components/molecules/StatCard/ | New molecule | final |
| src/components/molecules/CodeBlock/ | New molecule (+ utils) | final |
| src/components/molecules/Card/ | `interactive`, bordered `selected` | final |
| src/components/molecules/Tabs/Tabs.test.tsx | New tests (Tabs had none) | final |
| src/portal/ | Storybook portal (15 pages) | final |

## Acceptance criteria
- `_fleet/VERDICT-portal.md` exists with all three dimension headings and a ranked fix list.
- Every FAIL cites rule id + file:line + fix + owner.
- `npx vitest run` result recorded.

## Open questions
- Whether interactive Card tiles that navigate (Welcome "What's in the box") should be links rather than buttons — reviewer to give a recommendation.

---

## Iteration 2 — fixes for `_fleet/VERDICT-portal.md` (2026-11-03)

| Verdict item | Fix | Where |
|---|---|---|
| CodeBlock focus ring 2.30:1 (dark tone) | `--code-focus` = mist-40 in dark tone, theme ring in light | `CodeBlock.css` (`.ds-code`, `:focus-visible` rules) |
| CodeBlock "Copied" 1.43:1 (light) | `--code-copied` = `--color-success-strong` in light tone | `CodeBlock.css` |
| CodeBlock light muted (line numbers/lang) | `--code-muted` = 72% text-primary mix over `--code-bg` | `CodeBlock.css` light block |
| CodeBlock copy target 32px | 40px button in 48px header | `CodeBlock.css` |
| StatCard neutral delta < 4.5:1 | `color: var(--color-text-primary)` | `StatCard.css` |
| Dark danger 3.96:1 | dark `--color-danger-strong: #fca5a5` | `tokens.css` dark block |
| Filter Tabs → missing panels | Replaced with `FilterGroup` (toggle buttons, `role=group`, `aria-pressed`) | `src/portal/components/Portal.tsx`, Inventory + All Tokens pages |
| Tabs (library) aria-controls → unmounted panels | only the selected tab sets `aria-controls` (+ test) | `src/components/molecules/Tabs/index.tsx`, `Tabs.test.tsx` |
| Brand-slot matrix `role=table` without rows | real `<table>` with caption, `th[scope]`, sr-only cell text; scroll region | `FoundationPages.tsx` ThemesPage, `portal.css` |
| Card pressed state only when selected | `aria-pressed` true/false whenever `selected` is passed (+ tests) | `Card/index.tsx` |
| Welcome tiles / Inventory View were buttons that navigate | real links via `portalLinkProps` (tile = `<a>` wrapping a non-focusable Card surface) | `WelcomePage.tsx`, `OverviewPages.tsx`, `portal.css .pt-tile-link` |
| `Button size="xs"` row actions in mock | `sm` | `Showcase.tsx` |
| Token chip 24px | 32px min-height | `portal.css .pt-token` |
| Motion Play/Reset aria-pressed + label change | aria-pressed removed | `FoundationPages.tsx` |
| ListItem href any scheme | `isSafeHref` blocks non http(s)/mailto/tel schemes (+ test) | `List/index.tsx` |
| Forced-colors selected state | `@media (forced-colors: active)` outlines | `Card.css`, `List.css` |
| Extra h1 on Typography page (found in browser sweep) | type samples rendered `as="p"` | `FoundationPages.tsx` |

**Not changed — escalated to the user:** small segmented Tabs 22px height (`Tabs.css:361-363` — pre-existing uncommitted user change, not from this work); pre-existing focus-ring tokens in dark (2.64:1) / green-mist (2.33:1); `--color-text-secondary` on page and `--color-border-default` (known); Storybook 8.6.x advisory GHSA-f2ph-cmg5-wxc8 (upgrade decision).

**Browser evidence (Chrome, real layout, 375px iframe):** all 15 pages scrollWidth ≤ 375; 0 broken aria-controls/labelledby/describedby IDREFs inside `.pt-root`; exactly one h1 per page; only unnamed-by-text controls are Switches named via `<label for>`.

`npx vitest run`: 143 passed (30 files).
