# Handoff: component-author (Sprint 1, agent C) -> compliance-reviewer

- **Task:** Sprint 1 slice C. New Spinner and Skeleton atoms, new Pagination molecule, and a backward-compatible Checkbox upgrade.
- **Status:** ready

## Objective
Verify that Spinner, Skeleton/SkeletonGroup, Pagination and the upgraded Checkbox pass `_fleet/QUALITY_CHECKLIST.md` A (WCAG 2.2 AA), B (Security) and C (Responsiveness) in the classic, dark and mist themes. Then return a PASS/FAIL verdict with file:line evidence.

## Output format
Use the same verdict file shape as `_fleet/VERDICT-portal.md`: per component, per dimension (A/B/C), PASS or FAIL with file:line evidence, plus a list of accepted-with-reason items and escalations. Suggested path: `_fleet/VERDICT-sprint1-c.md`. Alternatively, fold the results into the orchestrator's combined Sprint 1 verdict.

## Sources and tools
- Brief: `_fleet/handoffs/05-orchestrator-sprint1-brief.md`. Checklist: `_fleet/QUALITY_CHECKLIST.md`. Token values: `src/design-system/tokens.css` (classic block about line 320, dark about line 469, mist about line 586).
- Tests: `npx vitest run src/components/atoms/Spinner src/components/atoms/Skeleton src/components/atoms/Checkbox src/components/molecules/Pagination` (5 files, 90 tests). Full suite: `npx vitest run` (36 files, 310 tests at handoff time, including other agents' work).
- Typecheck: `npx tsc --noEmit -p tsconfig.json 2>&1 | grep -E "Spinner|Skeleton|Checkbox|Pagination"` prints nothing.
- Contrast script (sRGB linearisation formula, token hex values hard-coded from tokens.css): `/private/tmp/claude-501/-Users-gaurabkumar-Documents-my-code-common-componant-main/0c33ed4c-4f8f-4a6e-aa70-65b6626f7eea/scratchpad/contrast.py`. Run it with `python3 -I <path>`. The scratchpad is session-scoped; if it is gone, recompute from the numbers below.
- Storybook (`npm run storybook`). Titles: `Design System/Atoms/Spinner`, `Design System/Atoms/Skeleton`, `Design System/Atoms/Checkbox`, `Design System/Molecules/Pagination`. The stories render only once the orchestrator wires the barrel; story files import by relative path, so they work regardless.
- Do NOT run `npm run build`, because it overwrites the tracked `dist/`.

## Boundaries
- Out of scope: `src/index.tsx` barrel wiring (the orchestrator owns it, and the exact lines are below), `src/entries/*`, `src/portal/*`, `.storybook/*`, `package.json`, `dist/`.
- Out of scope: the shared `src/components/atoms/ucs-choice-controls.css` (also used by RadioGroup). It was NOT edited. All new Checkbox styling is in `Checkbox/Checkbox.css`.
- Out of scope: the `Select` atom internals and Table's own internal pagination/skeleton. Table still uses its own; migrating it is a follow-up.
- Stop after the verdict. Fixes go back to component-author, with a maximum of 3 loop iterations.

## Context digest
- **Reference style followed:** IconBox, List and StatCard. That means `ds-*` classes, data-attributes for variants, `forwardRef` + `displayName`, defaults in `*.config.ts`, and types re-exported from `index.tsx`. Each component ships its own visually-hidden CSS class, so nothing depends on the global `.sr-only` being loaded.
- **Pagination current page uses `--color-brand-primary` bg + `--color-bg-surface` text, not `--button-primary-*`.** The button tokens give white on #3b82f6 = 3.68:1 in dark (fails 4.5:1 for 14px text). The pair I chose gives 19.44 (classic) and 14.68 (dark), and matches Checkbox's checked face. Trade-off: the current page stays noir in the green/custom interaction themes instead of taking the theme colour.
- **Pagination prev/next at the boundaries use `aria-disabled="true"`, not `disabled`.** This keeps keyboard focus on the button when you reach page 1 or the last page. The click is guarded in `go()` (`molecules/Pagination/index.tsx` about line 92). The `disabled` prop alone uses native `disabled` on every control.
- **Pagination compact layout uses one DOM.** The `status` `<li>` ("Page 3 of 12") is always rendered but `display:none` above 480px. At ≤480px, CSS hides the `data-kind=page|ellipsis|first|last` items (`Pagination.css:156`). The `compact` prop stops page items from rendering at all. Because there is no duplicate prev/next, tests get unique roles. The status `<li>` is `aria-live="polite"` only when no `showTotal` region exists, which avoids double announcements.
- **The page-size control reuses the `Select` atom** with `animatedChevron={false}`. The default `animatedChevron` calls `event.currentTarget.blur()` on change (`atoms/Select/index.tsx` handleChange), which drops keyboard focus to `<body>`. A test asserts the select keeps focus after a change. The label is a real `<label htmlFor>` (`Pagination/index.tsx:207`).
- **Page links:** `getPageHref` output goes through `isSafePageHref` (WHATWG URL parse, http/https/relative only, `Pagination.utils.ts`). Unsafe values fall back to `<button>`. `onPageChange(page, event)` gains an optional event argument so SPA consumers can `preventDefault()`. The spec signature `onPageChange(page)` is still satisfied.
- **Checkbox id behaviour change (only intentional change):** when `id` is absent, the id is now `ucs-cb-${useId()}` instead of `${name}-${value}`, per the spec. No code or test in the repo depended on the old id (checked by grep). Every other prop, the DOM order and the inline styles are unchanged. The visible additions are: the label span gains class `ucs-cc-checkbox-label`, the root label gains `data-size` and `min-height: var(--space-3)` (24px, WCAG 2.5.8), and `gap: 8` became `var(--space-1, 8px)`.
- **Checkbox `aria-checked="mixed"`** is set only while `indeterminate` is true, alongside the DOM `.indeterminate` property. The property is re-synced every render, because a native click clears it. ARIA-in-HTML discourages `aria-checked` on native checkboxes. axe's `aria-conditional-checkbox-attr` accepts `mixed` when it matches `.indeterminate`, but the reviewer should confirm with axe.
- **Contrast numbers computed (ratio, token pair):**
  - Spinner, ring vs track:
    - primary: 16.60 (classic/mist, #0d0d0d/#ededed), 10.31 (dark, #fff/#374151)
    - muted: 5.54 (classic), 4.71 (dark)
    - inverse at 12% track: 14.35 on noir, 4.05 on green #15803d, 4.15 on custom #e11d48, 3.11 on dark-theme blue #3b82f6 (lowest, passes 3:1)
    - current at 20% track: 12.48 (classic text), 7.21 (dark text), 4.12 for #0066cc on white
  - Checkbox:
    - error / required text (danger-strong): 7.14 (classic), 6.84 (mist), 7.73 (dark)
    - description: 6.48 (classic), 6.71 (dark)
    - face border: 3.45 (classic), 3.38 (dark)
    - indeterminate fill vs surface: 19.44 (classic), 14.68 (dark)
  - Pagination:
    - page text: 19.44 (classic), 13.34 (dark)
    - total / ellipsis (text-secondary): 6.48 (classic), 6.21 (mist), 6.71 (dark)
    - focus ring: 5.57 (classic), **2.64 (dark, #0066cc on #1F2937)**. This is the token issue already escalated in LEDGER row 6, not introduced here.
  - Skeleton base vs surface: 1.13 / 1.20 / 1.42. Decorative and `aria-hidden`, so exempt from 1.4.11.

### Self-check evidence (QUALITY_CHECKLIST A/B/C)
Paths are relative to `src/components/`.

**A, Accessibility**
- A1 keyboard: Pagination controls are native `<button>`/`<a href>`. Tab/Enter/Space are covered by the test "is keyboard operable" in `molecules/Pagination/Pagination.test.tsx`. Checkbox Space toggle is tested ("toggles with the keyboard"). Spinner and Skeleton are non-interactive.
- A2 targets:
  - Pagination min 40px (md) and 36px (sm), set at `molecules/Pagination/Pagination.css:4` and `:18`. They become 44px under `(pointer: coarse)` (`:174`). Gap between targets is 8px (`:34`).
  - Checkbox row min-height is 24px (`atoms/Checkbox/Checkbox.css:8`). The face is 16/18/22px, but the whole label row is the hit area.
- A3 focus: `molecules/Pagination/Pagination.css:79` uses `outline: 2px solid var(--color-focus-ring)` with `:focus-visible`. Checkbox keeps the existing `:focus-visible` ring in `ucs-choice-controls.css`.
- A4 contrast: see the numbers above. State is not colour-only:
  - Pagination current page: `aria-current` plus fill plus 600 weight.
  - Checkbox error: text message, and a dashed face border in forced-colors (`Checkbox.css:105`).
  - Required: a "*" glyph.
- A5 forms:
  - Checkbox description and error are linked via `aria-describedby` (`atoms/Checkbox/index.tsx:178`), with `aria-invalid` at `:179`.
  - Error uses `role="alert"` (assertive) at `:213`.
  - `required` is native (implicit `aria-required`) at `:167`, and the visible "*" is `aria-hidden` at `:145`.
  - The page-size Select has a `<label htmlFor>` at `molecules/Pagination/index.tsx:207`.
- A9 motion:
  - `atoms/Spinner/Spinner.css:74` swaps rotation for a slow opacity pulse.
  - `atoms/Skeleton/Skeleton.css:76` turns the shimmer off.
  - `molecules/Pagination/Pagination.css:180` turns transitions off.
  - Forced-colors blocks: `Spinner.css:80`, `Skeleton.css:84`, `Pagination.css:186`, `Checkbox.css:105`.
- A10 semantics:
  - Spinner: `role="status"` with a visually hidden label (`atoms/Spinner/index.tsx:30`). When `decorative`, it gets `aria-hidden` and no role (`:31`).
  - Skeleton blocks: `aria-hidden` (`atoms/Skeleton/index.tsx:49,72`).
  - SkeletonGroup: `role="status"` + `aria-busy="true"` (`:92-93`).
  - Pagination: `<nav aria-label>` at `molecules/Pagination/index.tsx:154-156`, `aria-current` at `:110`, ellipsis text for screen readers at `:183`, live total at `:164`.
  - Checkbox: `aria-checked="mixed"` at `atoms/Checkbox/index.tsx:180`, and `.indeterminate` set at `:76`.

**B, Security**
- No `dangerouslySetInnerHTML`, `innerHTML`, `eval` or `new Function`. Checked by grep over all four dirs, which returned 0 hits.
- `getPageHref` is filtered by `isSafePageHref` (`molecules/Pagination/index.tsx:116`). Tests cover `javascript:`, `java\tscript:`, ` JAVASCRIPT:`, `data:` and `vbscript:`.
- No inline `<style>`/`<script>`. The only inline `style` values are Skeleton dimensions and the existing Checkbox wrapper styles. No secrets, and stories use fictional data.

**C, Responsiveness**
- Pagination: `flex-wrap` throughout. Compact layout applies automatically at `max-width: 480px` (`Pagination.css:156`), so it fits at 375px.
- Skeleton: `max-width: 100%` (`Skeleton.css:12`).
- Checkbox: `min-width: 0` on the text column.
- Dark mode contrast: see above.
- Verify at 375, 768 and 1440 in Storybook.

## Failed approaches
- I first drafted the Pagination compact layout as a second list of prev/next buttons, toggled by CSS. I dropped it before running tests: jsdom loads no CSS, so tests would see duplicate "Previous page" buttons, and the duplicate DOM was redundant anyway. I replaced it with the single-DOM status `<li>` approach.
- I first styled the current page with `--button-primary-default-bg/text`. The contrast script showed 3.68:1 in dark, so I switched to the brand-primary/bg-surface pair (see the digest).
- I considered importing `isSafeHref` from `../List`. I rejected it because it would side-effect-import `List.css` into every Pagination consumer. Instead, a local `isSafePageHref` lives in `Pagination.utils.ts`, restricted to http/https (no mailto/tel for page links).

## Artifacts
| Path | What it is | State |
|------|-----------|-------|
| src/components/atoms/Spinner/Spinner.types.ts | SpinnerProps, SpinnerSize, SpinnerTone | final |
| src/components/atoms/Spinner/Spinner.config.ts | SPINNER_DEFAULTS, SPINNER_SIZES, SPINNER_TONES | final |
| src/components/atoms/Spinner/Spinner.css | ring/track tokens, sizes 16/20/24/32, reduced-motion pulse, forced-colors | final |
| src/components/atoms/Spinner/index.tsx | Spinner (forwardRef) | final |
| src/components/atoms/Spinner/Spinner.stories.tsx | Playground, Sizes, Tones, InlineWithText, Decorative | final |
| src/components/atoms/Spinner/Spinner.test.tsx | 13 tests | final |
| src/components/atoms/Skeleton/Skeleton.types.ts | SkeletonProps, SkeletonGroupProps, SkeletonShape, SkeletonDimension | final |
| src/components/atoms/Skeleton/Skeleton.config.ts | SKELETON_DEFAULTS, SKELETON_SHAPES, SKELETON_LAST_LINE_WIDTH | final |
| src/components/atoms/Skeleton/Skeleton.css | shapes, shimmer, reduced-motion, forced-colors | final |
| src/components/atoms/Skeleton/index.tsx | Skeleton (default + named), SkeletonGroup | final |
| src/components/atoms/Skeleton/Skeleton.stories.tsx | Playground, Shapes, CardPlaceholder, Static | final |
| src/components/atoms/Skeleton/Skeleton.test.tsx | 9 tests | final |
| src/components/molecules/Pagination/Pagination.types.ts | PaginationProps, PaginationSize, PaginationRange, PaginationItem, PaginationLabels | final |
| src/components/molecules/Pagination/Pagination.config.ts | PAGINATION_DEFAULTS, PAGINATION_SIZES, PAGINATION_LABELS (i18n defaults) | final |
| src/components/molecules/Pagination/Pagination.utils.ts | getPaginationRange, getPageCount, clampPage, getItemRange, isSafePageHref (pure) | final |
| src/components/molecules/Pagination/Pagination.utils.test.ts | 20 tests (0 items, 1 page, siblings/boundaries near the edges, boundary 0, clamping, constant strip length, exhaustive invariants for counts 1-30) | final |
| src/components/molecules/Pagination/Pagination.css | targets, compact at ≤480px, coarse pointer 44px, focus, forced-colors | final |
| src/components/molecules/Pagination/index.tsx | Pagination (forwardRef to `<nav>`) | final |
| src/components/molecules/Pagination/Pagination.stories.tsx | Playground, WithTotalAndPageSize, FirstAndLast, Sizes, Compact, FewPages, Links, Disabled | final |
| src/components/molecules/Pagination/Pagination.test.tsx | 26 tests | final |
| src/components/atoms/Checkbox/Checkbox.types.ts | + indeterminate, description, size, error, required, id; CheckboxSize; 3 props marked @deprecated | final |
| src/components/atoms/Checkbox/Checkbox.config.ts | + CHECKBOX_DEFAULTS, CHECKBOX_SIZES (existing exports kept) | final |
| src/components/atoms/Checkbox/Checkbox.css | NEW: sizes, indeterminate dash, description, error, required marker, forced-colors | final |
| src/components/atoms/Checkbox/index.tsx | forwardRef + memo, useId, indeterminate sync, describedby/invalid/required | final |
| src/components/atoms/Checkbox/Checkbox.stories.tsx | + docs description, new argTypes, Indeterminate, WithDescription, WithError, Sizes | final |
| src/components/atoms/Checkbox/Checkbox.test.tsx | 4 original tests unchanged + 18 new (22 total) | final |

## Barrel exports needed
Add these to `src/index.tsx`. `CheckBox` and `CheckboxProps` are already exported, so add only the new type for Checkbox.
```ts
// Values
export { default as Spinner } from "./components/atoms/Spinner";
export { default as Skeleton, SkeletonGroup } from "./components/atoms/Skeleton";
export { default as Pagination, getPaginationRange, getPageCount, getItemRange } from "./components/molecules/Pagination";

// Types
export type { SpinnerProps, SpinnerSize, SpinnerTone } from "./components/atoms/Spinner";
export type { SkeletonProps, SkeletonGroupProps, SkeletonShape, SkeletonDimension } from "./components/atoms/Skeleton";
export type {
  PaginationProps,
  PaginationSize,
  PaginationRange,
  PaginationItem,
  PaginationLabels,
} from "./components/molecules/Pagination";
export type { CheckboxSize } from "./components/atoms/Checkbox/Checkbox.types";
```
The util exports (`getPaginationRange`, `getPageCount`, `getItemRange`) are optional. Drop them if the orchestrator prefers a component-only surface.

## Acceptance criteria
- `npx vitest run` is green. Slice C contributes 90 tests across 5 files.
- The tsc grep for slice paths prints nothing.
- Every A/B/C item above is confirmed or reported as FAIL with file:line. The axe run on the 4 Storybook pages has 0 violations, or each violation is justified.
- The 4 original Checkbox tests pass unmodified (lines 1-30 of `Checkbox.test.tsx`).
- No legacy aliases (`AppShell`, `Avatar`, `Tooltip`, `TextInput`, `variant="outlined"`/`"filled"`) appear in slice C files. grep found 0 hits.

## Open questions
- **Select atom focus loss (escalate):** with the default `animatedChevron`, `Select` blurs itself on every change (`src/components/atoms/Select/index.tsx`, `handleChange`), dropping keyboard focus. This is a WCAG 2.4.3 / 3.2.2 concern for every Select consumer. Pagination works around it.
- **Select page-size height:** Select `sm` is about 30px and `md` about 38px (`--button-height-sm/lg`). That is under the 36/40px Pagination target and the 44px guideline. It still clears the 24px WCAG minimum, and it is not fixable from Pagination without overriding Select styles.
- **Dark focus ring 2.64:1:** a pre-existing token issue (`--color-focus-ring: #0066cc` in dark), already escalated.
- **Checkbox `aria-checked="mixed"` on a native input:** confirm with axe. If it is flagged, drop the attribute and rely on `.indeterminate`, which browsers already expose as mixed.
- **Table select-all:** `src/components/molecules/Table/parts/TableHeader.tsx:33` could now pass `indeterminate={someSelected && !allSelected}`. This is not done, because Table is outside the slice.

## Iteration 2 (fixes for `_fleet/VERDICT-sprint1.md`, Slice C)
- **P1, Checkbox focus loss (fixed).** The component now always renders the same root, the `ucs-cc-checkbox-field` `<div>`, and toggles only the error `<p role="alert">` (`src/components/atoms/Checkbox/index.tsx:209-216`). The `<input>` is no longer remounted. New test at `src/components/atoms/Checkbox/Checkbox.test.tsx:159` ("keeps the same focused input when an error appears and clears"). It asserts the same node and `document.activeElement` after adding `error`, then again after clearing it.
  - Side effect: the outermost element is now always a `<div>`. `className` still goes on the `<label>`, as before.
- **P2, SkeletonGroup `aria-busy` (fixed).** `aria-busy` is removed from the status node, which is now `role="status"` only (`src/components/atoms/Skeleton/index.tsx:94`).
  - The consumer pattern (put `aria-busy` on the container being loaded) is documented in the JSDoc (`Skeleton/index.tsx:82-86`, `Skeleton/Skeleton.types.ts`), in the story docs description, and in a new `LoadingContainer` story (`Skeleton/Skeleton.stories.tsx:96`).
  - Tests: `Skeleton/Skeleton.test.tsx:60` asserts there is no `aria-busy`, and `:73` covers the consumer container. No `busyTargetId` was added, to keep it simple.
- **P3, `aria-checked="mixed"` removed.** The component relies on the native `.indeterminate` property (`Checkbox/index.tsx`, the input attributes near `:178`). The JSDoc and story text are updated. The test at `Checkbox.test.tsx:67` still asserts `.indeterminate === true` and `toBePartiallyChecked()`, and now also asserts there is no `aria-checked` attribute.
- **Verification:**
  - Slice C: 92/92 tests across 5 files.
  - tsc grep for slice paths: 0 lines.
  - Full `npx vitest run`: 363/366. The 3 failures are all in `src/components/molecules/Toast/Toast.test.tsx` (slice A, currently being reworked for its own P1 live-region fix). Slice C never touches that folder.
