---
name: compliance-review
description: |
  Use when auditing a ui-common-components component against the design system, or reviewing a PR/diff for compliance. Triggers on "audit component", "review PR", "check accessibility", "check security", "check responsiveness", "WCAG check", or "compliance review".
---

Serves the compliance-reviewer agent. Scope: read-only verification across three
first-class dimensions — Accessibility (WCAG 2.2 AA, A1-A10), Security (B1-B7), and
Responsiveness (C1-C7) — plus the AGENTS.md Always/Never rules and export-name gotchas.
Primary input is _fleet/QUALITY_CHECKLIST.md (the testable checklist); secondary inputs
are AGENTS.md and docs/design-system/COMPONENT_AUDIT.md. The agent produces a verdict
file in the format specified at the bottom of QUALITY_CHECKLIST.md: PASS/FAIL per
dimension, file:line evidence per failure, checklist item id (A4, B1, C2) per finding,
and a ranked fix list naming the owning producer (component-author or screen-composer).
The reviewer never edits source — its only write is the verdict file. A FAIL on any
dimension bounces the artifact back to the producer via the fleet's iteration loop.
## 0. Primary input
`_fleet/QUALITY_CHECKLIST.md` is the testable checklist (A1-A10, B1-B7, C1-C7)
and the source of truth for the verdict format (bottom of that file). Read it
first on every review. This skill encodes the **workflow** for checking each
item; it does not restate the items. Secondary inputs: `AGENTS.md` (Always/Never
rules, export-name gotchas, intent tables), `docs/design-system/COMPONENT_AUDIT.md`.

## 1. Accessibility review (A1-A10) — WCAG 2.2 AA
Run each item; cite `file:line` for pass or fail.

- **A1 Keyboard operability:** Tab through every interactive element in the
  target (render it, or read the JSX and trace the tab order). Verify `Enter`
  activates buttons/links, `Space` activates buttons, `Escape` closes
  `Modal`/`AlertDialog`/`Popover`/`DropdownMenu`/`Combobox` (these use
  `useDismissableLayer` — grep for the hook to confirm it's wired). Verify Tab
  cycles within `Modal`/`Popover` (uses `useFocusTrap` — grep to confirm) and
  does NOT escape to background. Verify no keyboard trap (Tab can leave any
  container). Verify arrow-key nav on `Tabs`/`Combobox`/`Stepper`/`Calendar`
  per ARIA APG.
- **A2 Touch targets:** measure interactive elements — ≥44×44px, ≥8px gap
  between adjacent. Check the `size` prop on `Button` (`sm` min on mobile,
  never `xxs`/`xs` for primary actions).
- **A3 Focus visibility:** grep for `outline: none` / `outline-none` without a
  replacement — fail. Verify `:focus-visible` is used (not `:focus`). Verify
  focus ring uses `--color-focus-ring` token. Verify no positive `tabindex`
  unless justified.
- **A4 Color & contrast:** **calculate** the ratio — do not eyeball.
  Relative luminance: linearize each sRGB channel
  (`c <= 0.03928 ? c/12.92 : ((c+0.055)/1.055)^2.4`), then
  `L = 0.2126*R + 0.7152*G + 0.0722*B`. Ratio = `(L1+0.05)/(L2+0.05)` where L1
  is the lighter. Pass if ≥4.5:1 (normal text) or ≥3:1 (large text ≥24px or
  ≥19px bold, and non-text UI per WCAG 1.4.11). Verify color is not the sole
  carrier of meaning (badges pair color + text/icon). Verify dark mode
  (`[data-theme="dark"]`) maintains ratios — recompute with dark-theme tokens.
- **A5 Forms & labels:** every `Input`/`TextArea`/`Select`/`Combobox`/`OtpBox`/
  `DatePicker` has a `<label>` (or `aria-label`/`aria-labelledby`) associated
  via `id`. Errors linked via `aria-describedby`. Required fields have
  `aria-required="true"` + visible indicator. `aria-live="polite"` on status,
  `"assertive"` on errors.
- **A6 Tables:** `Table` has `TableHead` with `<th scope="col">`. Row headers
  `<th scope="row">` when needed. Caption or `aria-label` describes content.
- **A7 Overlays & dialogs:** `Modal`/`AlertDialog` have `aria-label` or
  `aria-labelledby`. `Popover`/`DropdownMenu` triggers have `aria-haspopup`
  and `aria-expanded`. Background has `aria-hidden="true"` or `inert` while
  open. Focus returns to trigger on close.
- **A8 Feedback states:** `EmptyState`/`ErrorState` have `aria-labelledby` +
  `aria-describedby` (built-in via `useId` — verify). `OfflineBanner` has
  `role="status"` + `aria-live="polite"`. `FeedbackState` announces changes.
- **A9 Motion:** `prefers-reduced-motion` respected (grep for
  `usePrefersReducedMotion` or `@media (prefers-reduced-motion)`). No auto-play
  >5s without pause. CSS animations degrade when reduced.
- **A10 Screen reader semantics:** icon-only buttons have `ariaLabel`.
  Decorative icons have `aria-hidden="true"`. Live regions announce dynamic
  changes.

## 2. Security review (B1-B7)
- **B1 XSS:** grep the target for `dangerouslySetInnerHTML`, `innerHTML`,
  `outerHTML`, `document.write` — any hit is a FAIL (AGENTS.md Never rule).
  Verify `TextView`/`GradientText`/`Hyperlink` content is text-interpolated.
  Verify `Modal`/`AlertDialog` titles/descriptions are text, not parsed HTML.
- **B2 Input sanitization:** verify `Input`/`TextArea`/`Combobox` render values
  via JSX (auto-escaped) — no manual DOM manipulation (`appendChild`,
  `insertAdjacentHTML`). Verify `OtpBox` with `mask` masks and doesn't log.
  Verify `Input` with `disableClipboard` blocks copy on sensitive fields.
  Verify `FileUpload`/`Dropzone` validates type/size/count.
- **B3 Focus security:** verify `Modal`/`AlertDialog` trap focus
  (`useFocusTrap` wired) and restore focus to trigger on close. Verify
  `Popover`/`DropdownMenu` dismiss on outside-click + Escape
  (`useDismissableLayer`). Verify no focusable elements in background while
  modal open (`inert` or `aria-hidden` on siblings).
- **B4 Dependency & supply chain:** verify no new deps without an entry in
  `docs/internal/PACKAGES.md`. Run `npm audit` — fail on high/critical.
  Verify peer deps declared in `package.json`. Grep for `eval`, `new Function`,
  `Function(` — any hit is a FAIL (CSP violation).
- **B5 CSP friendliness:** grep for inline handlers (`onclick=`, `onload=`
  as HTML attributes — React's `onClick` is fine). Grep for inline `<style>`
  or `<script>` blocks in output. Verify CSS animations use classes/tokens,
  not inline `style` with dynamic JS strings. Verify `window.location`/
  `document.cookie` access is guarded.
- **B6 Form & validation security:** verify client-side validation is
  documented as not a substitute for server-side. Verify password fields use
  `type="password"` + `showToggleIcon`. Verify `autocomplete` attributes
  (`"off"` for OTP, `"current-password"` for login).
- **B7 Secrets hygiene:** grep for hardcoded API keys/tokens/passwords/PII in
  source, stories, tests. Verify stories use mock data. Verify `.env` not
  committed and `process.env.*` is typed/guarded.

## 3. Responsiveness review (C1-C7)
- **C1 Breakpoints:** test at 375px, 768px, 1440px (Storybook viewport
  toolbar, or render in a browser). Check for horizontal scrollbars at 375
  (except intentional `Table` scroll). Verify no fixed `width`/`maxWidth`
  breaking below 375. Verify `Grid` uses responsive columns. Verify
  `DashboardShell` collapses sidebar — no fixed `marginLeft: 320` gap.
- **C2 Navigation responsiveness:** `AppSidebar` collapses to rail/drawer on
  mobile. `AppTopbar` search expands full-width + hamburger appears.
  `Breadcrumb` truncates/wraps. `Stepper` goes vertical/condensed on mobile.
- **C3 Data display:** `Table` scrolls horizontally or stacks. `Tabs` wrap or
  scroll. Charts resize via container width (no fixed pixel dims). `Card`
  content reflows; `CardAction` doesn't overflow.
- **C4 Forms:** fields stack vertically on mobile. Inputs full-width or
  max-width-constrained. `OtpBox` fits 375px. `DatePicker` popover stays in
  viewport.
- **C5 Touch & interaction:** ≥44×44px on mobile. `Button` `sm` min for
  primary actions on mobile. Hover-only interactions (`ToolTip`, `Popover`
  hover triggers) have a tap fallback. Gestures wired where expected.
- **C6 Theme & preference:** dark mode renders — no hardcoded light-only
  colors (grep for hex in CSS — should be `var(--color-*)`).
  `prefers-reduced-motion` reduces/disables animations. `useMediaQuery` for
  JS-driven responsive logic (not `window.innerWidth` polling).
  `forced-colors` doesn't break layout.
- **C7 Density & composition:** 5-zone layout holds at all breakpoints (zones
  stack, don't disappear). CTA hierarchy preserved (one `variant="primary"`
  per zone max — count them). `size="sm"` for compact density where
  `COMPOSITION_RULES_1.md` dictates. No horizontal scrollbar at 375.

## 4. PR-diff scoping
When reviewing a git diff (work type 6), scope the check to lines touched by
the diff — but flag regressions in surrounding code if the change introduces
them. Use `git diff main...feature -- <path>` to scope. For each added/modified
line, run the relevant checklist items. For context lines, only flag if the
change breaks an invariant they relied on (e.g., removing a `useFocusTrap`
import breaks focus-trap for the whole component, not just the touched line).

## 5. Verdict-file format
Produce the verdict in the exact format specified at the bottom of
`_fleet/QUALITY_CHECKLIST.md` (reproduced here for the agent; do not deviate):
```
## Accessibility: PASS / FAIL
- [PASS] A1 Keyboard — Tab order verified (src/components/X/index.tsx:42)
- [FAIL] A4 Contrast — Button ghost variant text #999 on #fff = 2.85:1 (src/components/X/index.tsx:88) — use token --color-text-secondary

## Security: PASS / FAIL
- [PASS] B1 XSS — no dangerouslySetInnerHTML (grep clean)
- [FAIL] B4 Deps — npm audit reports 1 high (lodash@4.17.20) — upgrade or document

## Responsiveness: PASS / FAIL
- [PASS] C1 Breakpoints — tested 375/768/1440, no horizontal scroll
- [FAIL] C7 Density — two variant="primary" in Zone 1 (app/dashboard/page.tsx:45, :52) — demote one to outlineSecondary

## Ranked fix list
1. [component-author] Fix contrast in X (src/components/X/index.tsx:88)
2. [screen-composer] Demote competing CTA (app/dashboard/page.tsx:52)
```
Every FAIL cites `file:line` and the checklist item id (A4, B1, C2). Every fix
in the ranked list names the owning agent (`component-author` or
`screen-composer`). The verdict file is the reviewer's ONLY write — never edit
source. A FAIL on any dimension bounces the artifact back via the iteration
loop (max 3).

## 6. Ranked-fix-list prioritization rubric
Rank fixes by ship-blocking severity:
- **P0 — blocks ship:** security XSS/accessibility blocker (e.g.
  `dangerouslySetInnerHTML`, no focus trap on Modal, keyboard-inaccessible
  primary action). Fix immediately or the artifact does not ship.
- **P1 — blocks ship:** accessibility contrast failure (<4.5:1 text),
  focus-restore failure, responsiveness breakage (horizontal scroll at 375,
  fixed width breaking layout). Fix before ship.
- **P2 — should fix before ship:** code quality (escape-hatch `className` on
  a prop-covered visual), missing story, legacy alias (`AppShell`/`Avatar`/
  `Tooltip`/`TextInput`/`variant="outlined"`), missing `aria-live` on a
  non-critical feedback state.
- **P3 — nice to have:** nitpicks, doc gaps, story polish.
Order the fix list P0 → P3. Within a priority, group by owning agent so each
producer gets a contiguous block of work.
