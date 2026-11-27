# Handoff: component-author (Sprint 6 Slice P) -> compliance-reviewer

- **Task:** Sprint 6 Slice P: DashboardShell to the canonical pattern (skip link, landmarks, ≤768px collapse), Form upgrade (types/config/tests, onSubmit/noValidate, loading/disabled fieldset, errorSummary, responsive columns, slot objects), Tooltip consolidation (atoms/ToolTip wraps molecules/Tooltip), FeedbackStates co-located story.
- **Status:** ready. Barrel wiring is the orchestrator's job; the portal gallery/stats follow-up is listed under Open questions.

## Objective
Check that the Slice P components (DashboardShell, Form, ToolTip wrapper, FeedbackStates stories) pass QUALITY_CHECKLIST A/B/C and the Sprint 6 backward-compat rule, and record the result in `_fleet/VERDICT-sprint6.md`.

## Output format
A Slice P section in `_fleet/VERDICT-sprint6.md`: PASS/FAIL per dimension (A, B, C, back-compat). Give every defect `file:line` plus a reproducible command or output, and label each P1/P2/P3.

## Sources and tools
- Brief: `_fleet/handoffs/11-orchestrator-sprint6-brief.md` (Slice P). Conventions: `_fleet/handoffs/05-orchestrator-sprint1-brief.md`. Checklist: `_fleet/QUALITY_CHECKLIST.md`.
- Tests: `npx vitest run src/components/molecules/DashboardShell src/components/molecules/Form/ src/components/molecules/FeedbackStates src/components/atoms/ToolTip src/components/molecules/Tooltip` → **5 files, 88 tests pass**. The trailing `/` on `Form/` keeps the FormField suite out of the run.
- Typecheck: `npx tsc --noEmit -p tsconfig.json 2>&1 | grep -E "molecules/(DashboardShell|Form|FeedbackStates|Tooltip)/|atoms/ToolTip/"` prints nothing. The 6 remaining tsc errors are pre-existing or belong to other slices: useRipple, TimePicker, and src/stories/molecules/FeedbackStates*.
- Full suite: `npx vitest run` → 1839/1844. The 5 failures are not Slice P's: 3 are in `Calendar.test.tsx` (Slice R, in progress). 2 are in `src/portal/components/dashboardData.test.ts` (stale portal stats/gallery, caused by the new stories from slices P, S and T; see Open questions).
- Storybook: `Design System/Molecules/DashboardShell`, `Design System/Molecules/Form`, `Design System/Molecules/FeedbackStates`, `Design System/Atoms/ToolTip`.

## Boundaries
- Do not edit `src/index.tsx`, `src/entries/*`, `src/portal/*`, `.storybook/*`, `package.json` or `dist/`. Do not run `npm run build`.
- Out of scope: AppSidebar and AppTopbar internals (DashboardShell only composes them); the canonical `molecules/Tooltip` behaviour (unchanged, already reviewed in an earlier sprint); the pre-existing FeedbackStates components and the stories under `src/stories/molecules/`.
- Stop after one review pass per iteration (max 3 iterations, per the Sprint 6 plan).

## Context digest
- **DashboardShell**: implementation is in `index.tsx` (forwardRef, displayName). `DashboardShell.tsx` is now a re-export shim exporting default, `AppShell`, `DashboardShellProps` and `AppShellProps`, so the barrel and `entries/shell.ts` import paths still work. New props: `contentAs` (`"main"` default | `"div"`), `mainId`, `mainLabel`, `skipLinkLabel`, `hideSkipLink`; native div attributes pass through to the root.
  - Children now render inside `<main tabIndex=-1>`. That is a semantic change: a consumer that already renders its own `<main>` would end up with two, so `contentAs="div"` is the escape hatch. Of the repo consumers I checked, none renders a `<main>` inside the shell.
  - The Tailwind arbitrary-value classes and inline flex/transition styles moved to `DashboardShell.css`, keyed on `data-sidebar-fixed`.
  - Responsive collapse comes from AppSidebar: rail below 1024px, overlay drawer below 768px. The shell now sets `drawerOverlayBelowWidth: 768` explicitly (overridable via `sidebar`), and the main column follows `--app-sidebar-offset`.
- **Form**: still renders a real `<form>`, now with forwardRef to it. `onSubmit` keeps the native signature, for compatibility. New: `onSubmitValues(values, event)`, which collects FormData, turns repeated names into arrays and prevents default. Native `noValidate` passes through. Also new: `loading`, `loadingLabel`, `disabled`, `errorSummary`, `errorSummaryTitle`, `autoFocusErrorSummary`, `titleAs`, `classNames`, `styles`.
  - `columns` accepts `number | {base,sm,md,lg}`. Breakpoints are sm ≥641, md ≥768, lg ≥1024; sm starts at 641 so the old "1 column at ≤640" behaviour is unchanged. A number N maps to base 1 / sm N.
  - The 8 `*ClassName`/`*Style` props are `@deprecated`; the matching slot values merge after them. Legacy quirk kept: `className` goes on the `<form>`, `style` on the card.
  - The fieldset is always rendered, so toggling loading never remounts the fields. It has `role="presentation"`, and the actions sit outside it.
  - Summary autofocus fires only when the set of field ids changes after mount. It compares against the previous value, which makes it StrictMode-safe.
  - Visual change: when `gap` is omitted the default is now `var(--space-2)` (16px) instead of 18px, because tokens are required. A number `gap` is still treated as px.
- **ToolTip**: now a forwardRef wrapper around `molecules/Tooltip` in controlled mode. Public props are unchanged; JSDoc marks both it and `TooltipIconProps` `@deprecated`.
  - `placement` maps through `PLACEMENT_TO_SIDE`; `auto` becomes `top`, and the molecule flips on collision.
  - Pointer environments use the molecule's hover logic, which keeps the bubble hoverable (WCAG 1.4.13). Pure mouse events (jsdom/legacy) fall back to the old mouseenter/leave plus delay contract, so the existing tests pass.
  - When `zIndex` is omitted, the wrapper resolves it with `resolveLayerZIndex` at open time. That returns `var(--z-tooltip-top, 600)`, as the existing test expects, and lifts above stacked ancestors.
  - Behaviour change: the bubble is now portalled to `<body>` rather than nested in the trigger, and the old inline 120px min-width is gone (molecule CSS).
- **FeedbackStates**: new co-located `FeedbackStates.stories.tsx` titled `Design System/Molecules/FeedbackStates`. It covers EmptyState, ErrorState (alert and inline), OfflineBanner (3 configurations), all 5 `FeedbackState` variants, sizes, and all 6 animations, both via the map and as named exports. The older scenario stories stay under `Feedback states/*`.

## Self-check (QUALITY_CHECKLIST A/B/C), file:line evidence
- **A1 keyboard / bypass**: skip link is the first focus stop, at `molecules/DashboardShell/index.tsx:108`. It focuses `<main tabIndex=-1>` (`index.tsx:125-129`); covered by the test "activating the skip link moves focus". ToolTip trigger has `tabIndex 0` (`atoms/ToolTip/index.tsx:139`). Focus opens the tooltip immediately and Escape closes it without moving focus (tests in `ToolTip.test.tsx`). Form summary links focus their field (`molecules/Form/index.tsx:128-134,186`).
- **A3 focus ring**: all use `--color-focus-ring`. DashboardShell skip link at `DashboardShell.css:43`; error summary and its links at `Form.css:118,145`; ToolTip trigger at `atoms/ToolTip/ToolTip.css:10`. Forced-colors fallbacks: `DashboardShell.css:99`, `Form.css:195`, `ToolTip.css:26`.
- **A4 contrast** (computed from tokens.css). Light / dark / mist / green-mist / infinia-light:
  - error link `danger-strong` on `bg-surface`: 9.06 / 7.73 / 6.84 / 6.84 / 6.57.
  - skip link `text-primary` on `bg-surface`: 17.58 / 13.34 / 18.62 / 18.62 / 18.88.
  - focus ring on `bg-surface`: 12.28 / 5.77 / 5.33 / 5.13 / 6.88.
  - Form badge `brand-link` on `accent-lavender-10` was **3.91 in dark**, a pre-existing pairing. Fixed with `color: text-primary` in dark only (`Form.css:35`), giving 9.03. Light stays 10.72.
- **A5 target size**: skip link `min-height: 2.75rem` (`DashboardShell.css:28`). ToolTip icon is 16px inline: an inline target, unchanged and pre-existing (P3 if you disagree).
- **A6 names / roles**: `main` landmark with optional `aria-label` (`DashboardShell/index.tsx:125-129`). AppTopbar supplies the `banner` landmark and AppSidebar the `navigation`; the shell adds no duplicate. Error summary: `role="alert"`, `aria-labelledby` its h2 (`Form/index.tsx:173`).
- **A7 live / busy**: `aria-busy` (`Form/index.tsx:163`) plus polite status text "Submitting…" (`Form/index.tsx:214`).
- **WCAG 3.3.1**: the error summary meets it, at `Form/index.tsx:168-193`.
- **B1-B3 security**: no `dangerouslySetInnerHTML`, `eval` or `new Function` in the slice (grep found none). Summary hrefs are always in-page `#id`. The skip link href is `#` plus an internal id.
- **B popover**: tooltip dismissal (Escape, blur, leave) is inherited from `molecules/Tooltip`. Tests in `atoms/ToolTip/ToolTip.test.tsx` cover it.
- **C1/C2 responsive**:
  - Shell has `max-width: 100vw`, `min-width: 0` on the inset, and the margin follows the offset (`DashboardShell.css:7-17,68`). Drawer threshold 768 is checked by the test "forwards the 768px drawer breakpoint".
  - Form grid: 1 column below 641px, plus sm/md/lg media queries (`Form.css:78-104`); actions go full width at ≤640 (`Form.css:178-191`).
  - The FeedbackStates grid uses `minmax(min(100%, 18rem), 1fr)`.
  - Not run: a manual 375/768/1440 viewport pass in Storybook. Please verify.
- **C reduced motion**: shell margin transition is removed under `prefers-reduced-motion` (`DashboardShell.css:93`). The tooltip bubble's motion is handled by molecules/Tooltip.
- **Legacy names**: none in new code. `AppShell` and `AppShellProps` exist only as required `@deprecated` aliases. `Input` is imported from the `atoms/TextInput` directory, which is the canonical `Input` export.

## Failed approaches
- Asserting `data-side="top"` for `placement="auto"` in jsdom failed: zero-size rects make the molecule flip. The test checks `PLACEMENT_TO_SIDE.auto === "top"` instead.
- A first version passed only the user-supplied `zIndex` to the molecule. The existing test failed because the molecule sets no inline z-index when there is no stacked ancestor, which led to the open-time `resolveLayerZIndex` approach.
- A `mountedRef` approach to skip summary autofocus on mount would refocus under StrictMode's double effect run. Replaced with a previous-signature comparison.

## Artifacts
| Path | What it is | State |
|------|-----------|-------|
| src/components/molecules/DashboardShell/DashboardShell.types.ts | props, AppShellProps alias, content element / sidebar types | final |
| src/components/molecules/DashboardShell/DashboardShell.config.ts | defaults + slot classes | final |
| src/components/molecules/DashboardShell/index.tsx | implementation (forwardRef) | final |
| src/components/molecules/DashboardShell/DashboardShell.tsx | re-export shim (barrel path) | final |
| src/components/molecules/DashboardShell/DashboardShell.css | layout + skip link, tokens | final |
| src/components/molecules/DashboardShell/DashboardShell.stories.tsx | Playground, FixedRail, NoTopbar, Mobile | final |
| src/components/molecules/DashboardShell/DashboardShell.test.tsx | 13 tests | final |
| src/components/molecules/Form/Form.types.ts | public API | final |
| src/components/molecules/Form/Form.config.ts | defaults, breakpoints | final |
| src/components/molecules/Form/index.tsx | implementation (forwardRef) | final |
| src/components/molecules/Form/Form.css | all former inline styles moved here, plus summary, fieldset, responsive columns | final |
| src/components/molecules/Form/Form.stories.tsx | Playground, Default, GridLayout, ResponsiveColumns, WithErrorSummary, Loading, Disabled | final |
| src/components/molecules/Form/Form.test.tsx | 19 tests | final |
| src/components/atoms/ToolTip/index.tsx | deprecated thin wrapper over molecules/Tooltip | final |
| src/components/atoms/ToolTip/ToolTip.css | trigger styles + focus ring | final |
| src/components/atoms/ToolTip/TooltipIcon.config.ts | defaults + PLACEMENT_TO_SIDE | final |
| src/components/atoms/ToolTip/TooltipIcon.types.ts | `@deprecated` JSDoc, zIndex doc updated; props unchanged | final |
| src/components/atoms/ToolTip/ToolTip.test.tsx | 2 existing tests (unchanged) + 5 new; one added import line | final |
| src/components/atoms/ToolTip/ToolTip.stories.tsx | deprecation docs; CustomTrigger no longer nests a button in the focusable span | final |
| src/components/molecules/FeedbackStates/FeedbackStates.stories.tsx | every exported state + illustrations | final |

## Barrel exports needed
Existing lines in `src/index.tsx` and `src/entries/shell.ts` stay as they are and still resolve. There are no new runtime exports. Add these type exports:
```ts
// src/index.tsx (and src/entries/shell.ts for the first line)
export type { DashboardShellContentElement, DashboardShellSidebarProps } from "./components/molecules/DashboardShell/DashboardShell";
export type {
  FormLayout,
  FormColumns,
  FormColumnBreakpoint,
  FormResponsiveColumns,
  FormErrorSummaryItem,
  FormSlot,
  FormClassNames,
  FormStyles,
  FormSubmitValues,
  FormTitleElement,
} from "./components/molecules/Form";
export type { TooltipPlacement } from "./components/atoms/ToolTip/TooltipIcon.types";
```

## Acceptance criteria
- The slice vitest command passes (88/88), and the full suite has no Slice P failures.
- Existing import paths compile: the barrel's `./components/molecules/DashboardShell/DashboardShell` (default, AppShell, both props types), `./components/molecules/Form` (default, FormProps), `./components/atoms/ToolTip` (default) and `.../TooltipIcon.types` (TooltipIconProps).
- A/B/C evidence above verified in Storybook: Tab from page load shows the skip link, and Enter focuses main. The Form error summary is announced and its links focus fields. Loading disables all fields. ToolTip opens on hover/focus and closes on Escape. No horizontal overflow at 375px in light, dark or infinia-dark.
- No legacy names in new code; no hex or px colours in slice CSS.

## Open questions
- **Portal (orchestrator)**: `src/portal/components/dashboardData.test.ts` now fails on 2 checks. The new stories `Design System/Molecules/DashboardShell` and `Design System/Molecules/FeedbackStates` are missing from the gallery inventory; slices S and T add others. Folder counts are stale too. Fix: run `npm run portal:stats` and add gallery entries after barrel wiring.
- **Atom importing a molecule**: `atoms/ToolTip` now depends on `molecules/Tooltip` and `molecules/Popover/layering`, as the brief's consolidation requires. Flag it if layer purity matters for the per-entry tsup build.
- **ToolTip bubble rendering**: the bubble is now portalled to `<body>`, with no 120px min-width and molecule padding/typography. Visual parity with the old in-trigger bubble is close but not pixel-identical. Accepted per the brief's "molecules/Tooltip is canonical".
- **Form default gap**: changed from 18px to `var(--space-2)` (16px). Revert to `gap={18}` behaviour if pixel parity is required.

## Iteration 2 (fixes for VERDICT-sprint6 Slice P P2 items)
- **P2 #1, ToolTip trigger role (axe `aria-prohibited-attr`, 4.1.2).** The trigger is still a `<span>`, so the ref type and the `TooltipIconProps` surface are unchanged, but it now has `role="button"` (`src/components/atoms/ToolTip/index.tsx:151`). Enter and Space toggle the bubble; the consumer's `onKeyDown` runs first and can call `preventDefault` to opt out (`index.tsx:115-123,154`). Escape and focus/blur behave as before, via molecules/Tooltip. A consumer-supplied `role` overrides the default. The ConsolAINew usage `<ToolTip tooltipText=… size={12} maxWidth={320} />` is covered by a test. Not changed: the name and description are the same text when `content` is omitted (P3, identical at HEAD).
- **P2 #2, Form actions follow form state.** Actions and footer are now wrapped in their own `<fieldset class="ds-form-actions-fieldset">` (`src/components/molecules/Form/index.tsx:209-226`).
  - `disabled`: the fieldset uses native `disabled`, so the submit and other buttons report `disabled`. It also gets `aria-disabled="true"` and `data-state="disabled"`.
  - `loading`: the fieldset gets `aria-disabled="true"` and `data-state="loading"` (cursor: progress, `Form.css:74`). It is deliberately not natively disabled: a focused submit Button keeps focus (focus-safe loading from Sprint 4, where the Button's own `loading` exposes `aria-disabled`). Submit is still blocked in `handleSubmit`.
  - The inner `.ds-form-actions` div keeps its layout CSS, so there is no visual change. Types JSDoc updated.
- **Tests added:** Form +3 (disabled → Save `toBeDisabled`; loading → group aria-disabled, Save keeps focus, submit blocked; idle → enabled) and ToolTip +3 (role button + name, Enter/Space toggle + consumer onKeyDown, role override). Existing tests are unchanged.
- **Results:**
  - Slice dirs: 5 files, **94/94**. tsc prints nothing for slice paths.
  - Full `npx vitest run`: **1963/1964**. The single failure is `src/portal/components/dashboardData.test.ts`, "growth is ordered … ends at the current package version". That is portal stats versus package version (orchestrator scope), not Slice P. The earlier Calendar and gallery failures are gone.
