# VERDICT — Sprint 6 (slices P, Q, R, S, T + orchestrator wiring W) — compliance-reviewer

**Current status (iteration 2, FINAL, 2026-11-27):** P, Q, R, S, T and W all PASS / PASS / PASS. Release gate CONDITIONAL PASS: the commit, then `portal:stats`, must give 1964/1964 (see "Iteration 2" at the end of this file). The iteration-1 status below is kept for history.

**Iteration-1 status (superseded):** P PASS / PASS / PASS · Q PASS / PASS / PASS · R PASS / PASS / PASS · **S FAIL** / PASS / PASS · T PASS / PASS / PASS · W PASS / PASS / PASS.
**Release gate: blocked by two items.**
1. P1 fix 1 (Slice S): Rating target size.
2. P1 fix 2 (orchestrator / release owner): the test suite went red during this review. At 11:06, `package.json` was bumped from 0.0.7 to **0.0.10**, `dist/` was rebuilt and `ui-common-components-0.0.8/0.0.9/0.0.10.tgz` were packed. This happened while the review was open and Slice S was failing, and `src/portal/data.ts` was not updated to match.

Everything else is P2/P3 and does not block ship. Backward compatibility passes for every slice.

Date: 2026-11-27. The reviewer is read-only: no `src/**` file was edited. All probes ran from the session scratchpad
(`/private/tmp/claude-501/-Users-gaurabkumar-Documents-my-code-common-componant-main/84074698-fada-4af3-a3f9-7aced4c428a2/scratchpad/review/`:
`sweep.cjs`, `probe2.cjs`–`probe9.cjs`, `compat.tsx`, `props.ts`, `vars.py`), against the running Storybook dev server on :6006 (headless Chrome, puppeteer-core, axe-core 4.x from `node_modules`).

Inputs: `_fleet/handoffs/11-orchestrator-sprint6-brief.md`, `11p/11q/11r/11s/11t-component-author-to-compliance-reviewer.md`, `_fleet/QUALITY_CHECKLIST.md`, `docs/AGENTS.md`, `docs/AI_USAGE_GUIDE.md` (Always/Never), plus `git diff` for `src/index.tsx`, `src/entries/shell.ts`, `src/portal/data.ts`, `src/portal/components/previews.tsx` and `src/portal/components/dashboardData.test.ts`.

## Summary

| Slice | Accessibility | Security | Responsiveness | Back-compat |
|---|---|---|---|---|
| P — DashboardShell, Form, ToolTip wrapper, FeedbackStates story | **PASS** (2 P2, 1 pre-existing) | **PASS** | **PASS** | **PASS** |
| Q — OtpBox, Hyperlink, Spinner | **PASS** | **PASS** (1 P2, functional) | **PASS** | **PASS** |
| R — Breadcrumb, ButtonGroup, test suites + bug fixes | **PASS** | **PASS** | **PASS** | **PASS** |
| S — Menu, AvatarGroup, Rating, Timeline | **FAIL** (Rating, WCAG 2.5.8) | **PASS** | **PASS** | n/a (new) |
| T — TagInput, TimePicker, BottomSheet | **PASS** | **PASS** | **PASS** | **PASS** (53 existing Drawer tests unedited) |
| W — barrel, `entries/shell`, portal gallery | **PASS** | **PASS** | **PASS** | **PASS** — but **release gate FAIL** (suite red after the 0.0.10 bump, P1) |

## Gate evidence (re-measured, not taken from handoffs)
- `npx vitest run` at the start of the review (10:39) gave **92 files / 1945 tests passing**, exit 0, which matches the orchestrator.
- **Re-run at 11:12, after changes made during the review window: 1946 passed / 1 failed (1947).** The failure is `src/portal/components/dashboardData.test.ts` › "growth is ordered oldest → newest and ends at the current package version": `expected '0.0.7' to be '0.0.10'`.
  - Cause: `package.json` `version` was changed to `0.0.10` (mtime 11:06:17), and `dist/*` was rebuilt (11:06:18). `ui-common-components-0.0.8.tgz` (10:50), `-0.0.9.tgz` (10:55) and `-0.0.10.tgz` (11:06) were packed.
  - Meanwhile `src/portal/data.ts:10,219` still says `0.0.7`.
  - None of the five slice handoffs or the W wiring mention this. The reviewer made no writes outside the scratchpad and `_fleet/`.
- **Late DatePicker change.** `src/components/atoms/DatePicker/{index.tsx,DatePicker.types.ts,DatePicker.test.tsx}` changed at 11:05, after the Slice R handoff and after my first read. It adds FormField-consumer wiring and optional `id`/`name`/`ariaLabel`, and is additive. I reviewed it:
  - the label is not overridden inside FormField;
  - `aria-describedby` merges `field.describedBy`;
  - the change is additive to `DatePickerProps`;
  - axe re-run on 4 DatePicker stories × 3 themes gives 0 violations;
  - the DatePicker tests are green in the re-run.
  It is accepted and folded into Slice R. Its owner should be recorded in a handoff.
- `npx tsc --noEmit -p tsconfig.json` gives **5 errors** (unchanged in the 11:12 re-run), all in files nobody touched: `useRipple.tsx` (1), `FeedbackStates.realworld.stories.tsx` (2) and `FeedbackStateVariants.stories.tsx` (2). The pre-sprint baseline was 6.
- **Library build.** `npx tsup --config tsup.config.ts --out-dir <scratch>/tsup-out` exits 0, with DTS emitted for all 5 entries. At 10:51 `git status --short dist` was empty, so my build did not touch `dist/`. The later `dist/` rebuild at 11:06 is the external release step described above.
- **Dependencies.** No dependency changes: the only `package.json` diff is the external `version` bump, and `package-lock.json` is unchanged. `npm audit --omit=dev` finds 0 vulnerabilities. Full-tree totals are 35 (17 high, 4 critical), the same as Sprint 5 and all in dev tooling.
- **Undefined tokens.** Every `var(--x)` in changed or new `src/components` CSS/TS resolves to a declared custom property (`vars.py`, 0 unresolved).
- **Banned APIs.** Grep across the full change set for `dangerouslySetInnerHTML|innerHTML|outerHTML|insertAdjacentHTML|document.write|eval(|new Function|document.cookie|window.location|localStorage|process.env`, for `console.log/debug/info` outside tests, for hex in CSS, and for secrets finds **0 hits**.
- **axe sweep** (`sweep.cjs`; tags wcag2a/2aa/21a/21aa/22aa, scoped to `#storybook-root`). It covered all 128 stories of the Sprint 6 components plus touched Calendar/DatePicker/AppSidebar stories, each in light, dark and infinia-light: **384 runs, 344 clean.** All 40 runs with violations come from pre-existing markup or story content, not from code the sprint changed. Each is triaged below:
  - ToolTip `aria-prohibited-attr`: 21 runs (P2, pre-existing);
  - DashboardShell `scrollable-region-focusable`: 12 runs (accepted P3);
  - AppSidebar collapsed-rail `aria-valid-attr-value`: 3 runs (pre-existing);
  - Calendar default outside-month days `color-contrast`: 3 runs (pre-existing, already logged in Sprint 5);
  - FeedbackStates `Empty` dark `color-contrast` 4.31: 1 run (pre-existing library pairing).
- **Overflow** (`documentElement.scrollWidth` at 375/768/1440, 384 checks): 1 case, the AppSidebar `collapsed-rail` story at 375, scrollWidth 419. That story and `AppSidebar.css` are unchanged from HEAD, and R's `index.tsx` diff touches only href sanitising and `onExpandedChange`. Logged as pre-existing P3.
- **Sprint 5 carry-over closed.** The "Form playground 1 node (dark)" contrast item (VERDICT-sprint5 P3 #7) now gives 0 nodes, thanks to Slice P's badge fix (`src/components/molecules/Form/Form.css:35`).

## Backward compatibility (sprint rule), all slices: PASS
- **Exports.** `compat.tsx` imports every name exported at HEAD from every modified module path. That covers default exports, named components, the DatePicker utils (22 names), `defaultLinkColor`/`hyperlinkBaseClass`, `SPINNER_*`, `defaultTooltipOptions`, `DRAWER_*`, `getFocusable`/`trapTabKey`, `AppShell`, `Sheet`, and all `*Props` types. **tsc reports 0 missing names.** The only diagnostic is TS2742 portability, which is unrelated.
- **Props.** `props.ts` asserts `Exclude<HEAD prop keys, keyof current props> = never` for Hyperlink, OtpBox, Spinner, TooltipIconProps, Breadcrumb, BreadcrumbItem, ButtonGroup (+ context), Drawer, Form and DashboardShell. **tsc is clean**, so no prop was removed.
- **Values.** Old prop values still type-check: Spinner sizes xs–lg; OtpBox `outlined|filled|underlined|boxes`; Breadcrumb `slash|chevron`; ToolTip placements including `auto`.
- **Paths.** No file was deleted (`git status` has no `D`). `DashboardShell/DashboardShell.tsx` is a re-export shim (`:5-11`), so the barrel and `entries/shell.ts` paths resolve.
- **Tests.** Existing tests are unedited apart from additive lines: an added import in Hyperlink/Spinner/ToolTip tests and the Spinner size `it.each` widened to `xl` (`git diff` shows no removed assertions).
- **Intended behaviour changes**, all disclosed and accepted:
  - Breadcrumb `current={false}` without href is now non-current;
  - Calendar has one Tab stop with an arrow grid, and uses `aria-pressed` instead of `aria-selected`;
  - Hyperlink drops unsafe hrefs (`javascript:` and similar);
  - Form default gap is 16px instead of 18px;
  - ToolTip is portalled;
  - OtpBox shows its incomplete-code message on blur (see ruling 7);
  - DashboardShell renders `<main>` (see ruling 8).

---

## Rulings on the open decisions

| # | Decision | Ruling | Reason / evidence |
|---|---|---|---|
| 1 | Rating `precision={0.5}` half-star targets 14×28 (md) | **FAIL, P1** | Measured (`probe2`, HalfPrecision story at `lg`): hit areas **18×36 px, centre spacing 18 px**. At md they are 14×28 with 14 px spacing. Both are under 24 px and the 24 px circles intersect, so **WCAG 2.5.8 (AA) fails**. Keyboard operability does not satisfy the "equivalent control" exception. The same SC also fails at `size="sm"` with full precision (20×20, spacing 22). Fix is in the S section and fix list item 1. |
| 2 | BottomSheet handle not focused on open | **Accept** | Initial focus goes to the dialog's first header control, which is the APG dialog pattern; the measured active element on open is `Close`. Shift+Tab reaches "Resize sheet", Enter cycles the snaps, ArrowUp moves to snap 1, and the polite status reads "Resize sheet: 90%" (`probe4`/`probe6`). Focus returns to the trigger after a swipe dismiss (`probe6`). The handle is a secondary control, so making it the initial focus would hide the content. |
| 3 | TimePicker listbox never flips upward | **Accept, P3 follow-up** | At a 375×360 viewport with the field near the bottom, the open listbox ends at 551 px with `innerHeight` 360. However, the document grows, and arrow navigation scrolls the active option into view (`scrollIntoView({block:"nearest"})`, `TimePicker/index.tsx:148`). Measured: active option at 316–360, `inView:true`. Rendering inline is required so the list stays inside Drawer/Modal focus traps. Optional: flip when `spaceBelow < min(15rem, spaceAbove)`. |
| 4 | TagInput duplicate check is case-sensitive | **Accept** | Case rules depend on the data (`iOS` vs `IOS`, SKU codes). It is documented at `TagInput.types.ts:39`, and `validate(tag, existing)` already lets a consumer reject case-insensitive duplicates. Verified: "Alpha" is added next to "alpha", while an exact duplicate is rejected with `role=alert` "\"alpha\" is already added", `aria-invalid` and `aria-describedby` (`probe5`). Optional P3: a `caseSensitive` prop or a recipe in the docs. |
| 5 | ButtonGroup cascade does not reach wrapped Buttons | **Accept** | The brief explicitly allows "clone children with props" (brief, Slice R). `useButtonGroupContext` is exported from the barrel (`src/index.tsx:35`), so wrappers can read the group. Making Button read the context would create the cycle Button → ButtonGroup → Button (`ButtonGroup/index.tsx:11`). P3: move the context to `src/components/common/` before any Button consumption. |
| 6 | Hyperlink `asChild` + `disabled` keeps the child's href | **Accept** (residual P3) | Router links (Next `<Link>`) require `href`. The kept href is still sanitised (`Hyperlink/index.tsx:109`); clicks are swallowed, the link gets `tabIndex=-1`, `role=link` and `aria-disabled` (`:110-117`). Residual: middle-click or "open in new tab" from the context menu still navigates, because there is no `auxclick` handler. That is acceptable because `disabled` is a UX state, not access control; optionally add `onAuxClick` preventDefault. **A separate P2 defect affects asChild:** see Q. |
| 7 | OtpBox built-in validation message only after blur | **Accept** | Verified (`probe3`): there is no alert while typing "123". After focus leaves the group: `role="alert"` "Please enter correct OTP", `aria-invalid="true"`, and `aria-describedby` on the cells (`OtpBox/index.tsx:139-140,294-299,341-343`). It replaces an alert announced on every keystroke, which is a 4.1.3 nuisance. 3.3.1 is still met, and an explicit `error` still shows immediately. Product teams should get a changelog note. |
| 8 | DashboardShell renders `<main>`; consumers with their own `<main>` must pass `contentAs="div"` | **Accept** (P3 doc) | It is an a11y gain (2.4.1 skip link + 1.3.1 landmark), verified as 1 `main`, 1 `banner` and 1 `navigation` per page (`probe2`). No prop or export changed. No repo consumer nests `<main>`: grep of `GettingStartedPage.tsx`, `DesignSystemDashboard.stories.tsx` and docs finds 0. The README's `<main>` is in the *manual* layout without the shell (`README.md:212`). P3: README / release note should mention `contentAs="div"`. |
| 9 | `atoms/ToolTip` and `atoms/AvatarGroup` import from molecules | **Accept** | There is precedent: `atoms/DatePicker` → `molecules/Calendar` + `Popover/layering`, and `atoms/Select`/`NumberInput` → `molecules/FormField`. There is no cycle: `molecules/Popover` imports only `atoms/Button`, `molecules/Tooltip` imports no atoms, and nothing imports `atoms/ToolTip` or `atoms/AvatarGroup` internally. The tsup scratch build exits 0. |
| 10 | Barrel `DropdownMenu*` stays on the Popover menu; new Menu exported as `Menu*` only | **Accept** (escalate to user) | Repointing `DropdownMenu*` would change the behaviour and props of an existing export, which the sprint rule forbids. The `Menu*` exports are additive (`src/index.tsx:140-154`). Swapping is a major-version decision for the user. P3: document that the deep-import `DropdownMenu*` aliases at `molecules/Menu/index.tsx` are a different family from the barrel `DropdownMenu*`. |

---

# Slice P — DashboardShell, Form, ToolTip wrapper, FeedbackStates story

## Accessibility: PASS
- [PASS] A1 / 2.4.1 Skip link. In `probe2`, the first Tab focuses "Skip to main content", which is visible (rect 224×78 at 16,16). Enter moves focus to `MAIN#ds-shell-main-…`, and PageDown/ArrowDown then scroll it (scrollTop 0 → 635, `probe9`). The implementation is at `DashboardShell/index.tsx:107-134` and `DashboardShell.css:22-48`.
- [PASS] A7 / 1.3.1 Landmarks. Measured: 1 `main`, 1 `banner`, `navigation` "Main navigation". `contentAs="div"` is the escape hatch (`DashboardShell.types.ts:44-48`).
- [ACCEPTED, P3] axe `scrollable-region-focusable` on `<main tabIndex=-1>` in all 4 shell stories (12 runs). Story content has 0 focusables. The skip link gives a keyboard route to focus and scroll `main` (verified), and real pages contain focusable content. The same plain scrolling div existed at HEAD. Optional: add a link to the story content, or document `hideSkipLink` + empty content as unsupported.
- [PASS] A5 / 3.3.1 Form error summary. Submitting the empty form moves focus to `.ds-form-error-summary` (`role="alert"`, `aria-labelledby` h2). Both links resolve (`#err-name`, `#err-email`), and clicking the first focuses `INPUT#err-name` (`probe3`; `Form/index.tsx:108-112,128-134,169-193`).
- [PASS] A5 / A8 Form loading. `aria-busy="true"`, the fieldset is disabled, and a polite status reads "Saving profile…". The loading Button exposes `aria-disabled="true"` (`probe3`).
- [P2, should fix] Form `disabled`. The fieldset is disabled, but the actions sit outside it, so the Disabled story's **Save button stays enabled** (`disabled:false`, no `aria-disabled`). Its submit is silently swallowed (`Form/index.tsx:116-120,208-213`; story `Form.stories.tsx:233-235`). The control's exposed state does not match its behaviour, and keyboard/AT users get no feedback. Fix: when `disabled` (not `loading`), wrap the actions in the same `<fieldset disabled>` or a second one, **or** have the story and docs pass `disabled` to the action Button. Non-blocking.
- [PASS] A1 / 1.4.13 ToolTip:
  - Tab focus opens the bubble (`aria-describedby` → `role=tooltip`, portalled to `BODY`).
  - Escape closes it and focus stays on the trigger.
  - Hover opens it, and it stays open while the pointer moves onto the bubble (`probe3`).
  - Tap opens it under touch emulation (`probe6`, C5 fallback).
- [P2, pre-existing, should fix] ToolTip trigger is `<span tabIndex=0 aria-label>` with no role. axe `aria-prohibited-attr` (4.1.2) fires in all 7 ToolTip stories × 3 themes (`atoms/ToolTip/index.tsx:130-139`). The markup is identical at HEAD (HEAD `index.tsx:246-259`), so this does not fail P. Because P rewrote the wrapper, the fix is cheap: `role="button"` (Enter/Space toggles), or `role="img"` plus a focusable wrapper. Related P3: the name and the description are the same text, so it is announced twice (also at HEAD).
- [PASS] A3 Focus rings use `--color-focus-ring` with forced-colors fallbacks (`DashboardShell.css:42-48,99-103`; `Form.css:118-121,145-149,195-201`; `ToolTip.css:10-13,25-29`). The `outline:none` on `.ds-shell__content:focus` is on a non-tabbable programmatic target (tabIndex −1), which is accepted.
- [PASS] A4 axe color-contrast is 0 on all Form, DashboardShell and ToolTip stories in light, dark and infinia-light. The dark Form badge is fixed (`Form.css:35`).
- [PASS] A9 The shell margin transition is removed under reduced motion (`DashboardShell.css:93-97`).
- [P3, library, pre-existing] FeedbackStates `Empty` in dark: Button `outlinePrimary`/`link` text #60a5fa on #333d4d = **4.31:1** (axe, 2 nodes). These are existing EmptyState/Button colours surfaced by the new story; the story itself adds no styling.

## Security: PASS
- [PASS] B1 The Form summary hrefs are in-page `#id` only (`Form/index.tsx:184`), and the skip-link href is `#` plus a generated id. No HTML sinks (grep clean).
- [PASS] B6 `onSubmitValues` reads `FormData` and does not validate it; validation stays the consumer's job.

## Responsiveness: PASS
- [PASS] C1/C2 DashboardShell at 375/768/1024/1440 has scrollWidth equal to the viewport. The inset clears the rail: 64 px rail at 375/768, 320 px sidebar at 1024/1440 (`probe2`). There is no fixed `marginLeft`; the inset uses `--app-sidebar-offset` (`DashboardShell.css:67-70`).
- [PASS] C4 Form is a single column below 641 px, with sm/md/lg columns (`Form.css:79-106`) and full-width actions at ≤640 (`Form.css:178-193`). No overflow in any Form story at 375/768/1440.
- [PASS] C6 Tokens only (hex grep clean); dark contrast is clean.

---

# Slice Q — OtpBox, Hyperlink, Spinner

## Accessibility: PASS
- [PASS] A5 OtpBox. `role="group"` is labelled by the visible label (`aria-labelledby` id), each cell is named "Digit n of 6", and the error is wired through `aria-invalid` and `aria-describedby` (`probe3`; `OtpBox/index.tsx:314-343`). `autocomplete` is `one-time-code` on cell 1 and `off` on the rest (B6).
- [PASS] A1 OtpBox handles arrow keys, Home/End, Backspace/Delete and paste (`OtpBox/index.tsx:183-243`), covered by 27 tests.
- [PASS] A10 Hyperlink new tab. The accessible text is "Opens in new tab (opens in new tab)", with `target=_blank` and `rel="noopener noreferrer"` (`probe3`). Disabled renders no href, `aria-disabled="true"` and `tabindex=-1`.
- [PASS] A9 Spinner. Under reduced motion there is no rotation or scale, only an opacity pulse (`Spinner.css:145-157`). Forced colours keep the segments visible (`:159-170`). `role=status` is set unless the spinner is decorative (`Spinner/index.tsx:56-69`).
- [PASS] A4 axe color-contrast is 0 on all 33 OtpBox/Hyperlink/Spinner stories × 3 themes.

## Security: PASS
- [PASS] B1 Hyperlink sanitises hrefs after the merge, so neither `...rest` nor an asChild child can bring back `javascript:` (`Hyperlink/index.tsx:106-123`). New-tab and external links merge `rel`.
- [PASS] B2 OtpBox `mask` renders "•", logs nothing, and drops `pattern` while masked (`OtpBox/index.tsx:291`).
- [P2, functional, should fix] **Hyperlink `asChild` with a non-string href breaks router links.** `sanitizeHref` returns `undefined` for anything that is not a string (`Hyperlink/index.tsx:14-16`), and `enforce` overwrites the child's href with it (`:109`, applied to asChild at `:133`). A Next `<Link href={{ pathname: "/docs" }}>` therefore receives `href={undefined}`, and Next throws on a missing href. That is the brief's headline asChild use case. Breadcrumb's asChild already passes non-string hrefs through (`Breadcrumb/index.tsx:248`). Fix: only sanitise when `typeof href === "string"`, and otherwise pass the child's href through unchanged, or sanitise `href.protocol` when it is present. Add a test with an object href.

## Responsiveness: PASS
- [PASS] C4 OtpBox at 375: scrollWidth 375 with 40 px cells in the Sizes story (`OtpBox.css:208-234`).
- [PASS] C1 No overflow in any Q story at 375/768/1440.
- [OBSERVATION, P3] `hyperlinkBaseClass` (deprecated) changed value from Tailwind utilities to `"ds-hyperlink"` (`Hyperlink.config.ts`). The import still resolves, but anyone styling their own `<a>` with that constant now depends on `Hyperlink.css` being loaded. Worth a changelog line.

---

# Slice R — Breadcrumb, ButtonGroup, test suites and bug fixes

## Accessibility: PASS
- [PASS] A1 / 2.4.3 Breadcrumb collapse at 375 (Mobile and Collapsed stories). The "…" button is named "Show 4 more" and is 44×44. Enter expands to 6 items and focus moves to the first revealed link, "Billing". scrollWidth stays 375 (`probe4`; `Breadcrumb/index.tsx:152-172,177-187`).
- [PASS] A10 `aria-current="page"` is on the current item. Custom separators are `aria-hidden`, and the CSS slash has empty alt text (`Breadcrumb.css:50`).
- [PASS] A1 Calendar keyboard grid. There is exactly 1 tabbable day. ArrowDown moves 2026-11-27 → 12-04, and PageDown moves to 2027-01-04 across the month boundary (`probe4`; `Calendar/index.tsx:300-377`).
- [PASS] A5/A7 DatePicker. The visible label is no longer overridden. The range inputs are named "{label}, Start date"/"End date". It sets `aria-invalid`, `aria-required` and `aria-describedby`; the toggle has `aria-haspopup="dialog"` (matching the `role="dialog"` popover at `:605` and the single-picker popover) and `aria-expanded`; focus is restored by `closePopover` (`DatePicker/index.tsx:126-131`). axe is 0 on the DatePicker default, range and error stories.
- [PASS] A1 ButtonGroup keeps native buttons. Cascaded `disabled` adds `aria-disabled` on the `role=group` (`ButtonGroup/index.tsx:103-116`). axe is 0 on all 11 ButtonGroup stories × 3 themes.
- [PRE-EXISTING, P3, not R] Calendar outside-month days have contrast 2.0 (light), 2.52 (dark) and 2.29 (infinia-light) (axe, 3 nodes). This is the same item already logged in VERDICT-sprint5 P3 #7.
- [PRE-EXISTING, P3, not R] AppSidebar collapsed rail: `aria-controls="sb-…-sub-chat"` points at a submenu that is not rendered while collapsed (axe `aria-valid-attr-value`; `AppSidebar/index.tsx:435`, HEAD `:433`).

## Security: PASS
- [PASS] B1 Breadcrumb sanitises hrefs (`Breadcrumb/index.tsx:248,273-279`); unsafe ones render as text with a dev warning. AppSidebar falls back to `<button>` for unsafe nav and footer hrefs (`AppSidebar/index.tsx:358,692`), which fixes a real XSS-class gap.

## Responsiveness: PASS
- [PASS] C2 Breadcrumb auto-collapses at ≤640 px (`Breadcrumb/index.tsx:133-147`) and truncates crumbs at 12rem.
- [PASS] C1 No overflow in any Breadcrumb, ButtonGroup, DatePicker or Calendar story at 375/768/1440.
- [PRE-EXISTING, P3, not R] The AppSidebar `collapsed-rail` story has scrollWidth **419 at 375**. The story and `AppSidebar.css` are unchanged, and R's diff does not touch layout.

---

# Slice S — Menu, AvatarGroup, Rating, Timeline

## Accessibility: FAIL
- [FAIL, P1] **A2 / C5 Rating target size (WCAG 2.2 SC 2.5.8, AA)**, measured in Chrome (`probe2`; `probe6` with touch emulation, where `(pointer: coarse)` is true):

  | Story / mode | Hit area | Centre spacing | 2.5.8 |
  |---|---|---|---|
  | HalfPrecision (`lg`, precision 0.5) | 18 × 36 | 18 | **fail** |
  | `md`, precision 0.5 (by CSS, `--rating-size` 28 / 2) | 14 × 28 | 14 | **fail** |
  | Sizes `sm`, precision 1 | 20 × 20 | 22 (gap 2px) | **fail** |
  | Sizes `md` / `lg`, precision 1 | 28 / 36 | 32 / 40 | pass |
  | Coarse pointer, any size | unchanged (20 / 28 / 36; halves 18) | — | below the 44 px house rule that Menu, BottomSheet and TimePicker all apply |

  - Sources: half-width labels at `src/components/atoms/Rating/Rating.css:93-94` (`data-part` start/end, rendered at `index.tsx:142-149`), `sm` at `Rating.css:18` (`--rating-size:1.25rem; gap:0.125rem`), and no `@media (pointer: coarse)` block.
  - Keyboard access is fine (native radios), but 2.5.8's "equivalent" exception requires another *pointer* target that meets the size, not a keyboard path.
  - **Fix:**
    - (a) For precision 0.5, render **one full-star label per star**, and pick the half from the pointer position (`offsetX < width/2` on `pointermove`/`click`, mirrored in RTL). Keep the two visually hidden radios per star for keyboard and forms, so each pointer target stays ≥ 28 px at md.
    - (b) `sm`: either a ≥ 4 px gap (centres ≥ 24 px) or a hit area padded to 24 px.
    - (c) Add `@media (pointer: coarse) { .ds-rating { --rating-size: max(var(--rating-size), 2.75rem); } }` or pad the hit area to 44 px.
    - (d) Add a test asserting the hit-area geometry, or at least that precision 0.5 renders one label per star.
- [PASS] A1/A7 Menu (`probe4`):
  - Enter on the trigger opens the menu with focus on "Edit" and `aria-expanded=true`; the panel is portalled to `BODY`.
  - ArrowDown → "Duplicate"; End → "Delete".
  - ArrowRight on "Share" opens the submenu (2 menus) with focus on "Email link".
  - Escape closes one level and focus returns to "Share"; a second Escape closes the menu and focus returns to the "Actions" trigger.
  - EdgeFlip at 375×600 keeps the panel in view.
- [PASS] A2 Menu rows are 36 px on fine pointers and **44 px under touch emulation** (`probe6`; `Menu.css:83-90`).
- [PASS] A7 AvatarGroup popover path. The chip has `aria-haspopup="dialog"` and the name "Show 3 more: Eli Roth, Fay Ito, Gil Moss". Enter opens the dialog "3 more people" (3 items) with focus in the list, and Escape returns focus to the chip (`probe8`, story loaded with `args=onOverflowClick:!null`).
- [P2, story, should fix] **AvatarGroup stories never show the default popover.** The global `actions: { argTypesRegex: "^on[A-Z].*" }` (`.storybook/preview.tsx:108`) injects an `onOverflowClick` action into every AvatarGroup story. Every chip therefore renders the plain-button branch (`AvatarGroup/index.tsx:81-86`), which does nothing visible (`probe7`: no `aria-haspopup`, Enter opens nothing). Fix in `AvatarGroup.stories.tsx` (meta, around `:30-37`): set `argTypes: { onOverflowClick: { action: false, control: false } }` with `args: { onOverflowClick: undefined }`, or `parameters: { actions: { argTypesRegex: null } }`. Keep `WithOverflowHandler` as the only story with the handler.
- [PASS] A10 Timeline uses `<ol>` and `<time dateTime>`, with hidden status words (`Timeline/index.tsx:54-78`). axe is 0 on all Timeline, Menu, AvatarGroup and Rating stories × 3 themes, so contrast is clean too.
- [P3] Timeline `orientation="horizontal"` always renders `role=region tabIndex=0` (`Timeline/index.tsx:127-129`), even when nothing scrolls: measured `scrollable:false` at 1280 and at 375, where it collapses to vertical. That is an extra empty Tab stop. Optionally make it focusable only while `scrollWidth > clientWidth`.

## Security: PASS
- [PASS] B1 Menu link rows drop unsafe hrefs (`Menu/index.tsx:528`), and `_blank` adds `noopener noreferrer` (`:609`).
- [PASS] B3 Escape is handled in the capture phase through the shared floating-layer stack, so one Escape closes one level and a host Modal ignores it (`Menu/index.tsx:304-320`); an outside press closes the menu (`:322-335`). Inside a modal Drawer, the ownership focus guard accepts focus in portals rendered from the drawer's React tree (`Drawer/index.tsx:172-200`).

## Responsiveness: PASS
- [PASS] C1 No overflow in any S story at 375/768/1440. The Menu panel is capped at `min(20rem, 100vw - 16px)` (`Menu.css:40`). Timeline gets horizontal or alternate layout only at ≥641 px.
- [PASS] C6 Reduced-motion and forced-colors blocks are present (`Menu.css:211,222`; `Rating.css:115-142`; `Timeline.css:245,251`).

---

# Slice T — TagInput, TimePicker, BottomSheet on Drawer

## Accessibility: PASS
- [PASS] A1/A5 TagInput (`probe5`). Typing "alpha,beta" plus Enter creates both chips, and the polite status says "Added beta". Remove buttons are named "Remove design" and are 44×44. A duplicate gets `role=alert`, `aria-invalid` and `aria-describedby` (`TagInput/index.tsx:108-140,451-456`).
- [PASS] A1/A7 TimePicker. The combobox has `aria-expanded`, `aria-controls` and `aria-activedescendant` (`TimePicker/index.tsx:366-382`). Alt+ArrowDown opens the listbox, and the active option is scrolled into view (`:148`).
- [PASS] A1/A7 BottomSheet. Initial focus goes to Close, the handle is reachable with Shift+Tab, ArrowUp/Enter change the snap with a polite announcement, and focus returns to the trigger after a swipe dismiss, for both the snap and the non-snap sheet (`probe4`, `probe6`). Without snap points the handle is `aria-hidden`, and the alternatives are the X button and Escape (2.5.7). The 53 existing Drawer tests pass unedited.
- [PASS] A2 Under touch emulation, the handle is 132×44 and TimePicker buttons are 42 px inside a 44 px field (`TimePicker.css:210-215`; the 2 px is the field border, and 2.5.8 is met). Options use `--size-touch-target`.
- [PASS] A4 axe is 0 on all TagInput, TimePicker and BottomSheet/DrawerWithHandle stories × 3 themes.
- [P3] The handle declares `aria-keyshortcuts="ArrowUp ArrowDown Home End"` (`Drawer/index.tsx:468`). That attribute is meant for shortcuts that activate or focus an element, not for keys used inside it. Prefer `aria-describedby` hint text ("Use arrow keys to resize").

## Security: PASS
- [PASS] B1 Tags, options and messages render as text nodes. The only inline styles are drag `translate` and `--ds-drawer-extent` set through `element.style`, which is CSP-safe (no `<style>` and no string-built CSS rules).
- [PASS] B3 Swipe dismiss goes through `requestClose` and honours `onBeforeClose` (`Drawer/index.tsx:292-298`). Escape inside either picker does not close the parent Drawer (`TagInput/index.tsx:236-243`, `TimePicker/index.tsx:284-289`).
- [PASS] B6 `validate` is documented as UX only, and both pickers use `autoComplete="off"`.

## Responsiveness: PASS
- [PASS] C1/C4 No overflow in any T story at 375/768/1440. The listboxes take the field width.
- [PASS] C5 Swipe gestures use pointer events with `touch-action:none` on the handle (`Drawer.css:251`). Dragging with the mouse past the threshold dismisses the sheet (`probe6`).

---

# W — orchestrator barrel and portal wiring

## Accessibility: PASS / Security: PASS / Responsiveness: PASS
- [PASS] The barrel lines match the five handoffs' "Barrel exports needed" (`git diff -- src/index.tsx`), with additions only. The two replaced type lines (`HyperlinkProps` via `./components/atoms/Hyperlink`; `OtpBox*` extended) still export every old name, and tsc and the tsup scratch build are clean.
- [PASS] `src/entries/shell.ts` adds only the two new DashboardShell types.
- [FAIL, P1 — release gate] **The test suite is red after the external release bump.** `package.json` is `0.0.10`, but `src/portal/data.ts:10,219` (version / RELEASES) still says `0.0.7`, so `dashboardData.test.ts` fails with "expected '0.0.7' to be '0.0.10'".
  - The bump, the `dist/` rebuild and three tarballs (0.0.8–0.0.10) were produced **during this open review, with Slice S failing**. That contradicts the ledger's release plan, which bumps only after a PASS.
  - Fix: either revert to the pre-review version until the gate clears, or add the RELEASES entries and version in `src/portal/data.ts`, then re-run `npm run portal:stats` and `npx vitest run`.
  - Do not ship the 0.0.8–0.0.10 tarballs: they contain the Rating 2.5.8 defect.
- [PASS at 10:39] Gallery and stats. `portal-stats.json` was regenerated, and at review start `dashboardData.test.ts` passed (17/17). The one test edit excludes `Design System/Molecules/FeedbackStates` as an overview page (`dashboardData.test.ts:157`). That is acceptable because its members are linked individually (`src/portal/data.ts:153-156`).
- [P2, should fix — docs drift] **ToolTip is now `@deprecated`, but the AI-facing docs still prescribe it.** `docs/AGENTS.md:56` says "`ToolTip` … Not `Tooltip`", and `.claude/skills/compliance-review/SKILL.md:176` lists `Tooltip` as a *legacy alias*. Agents following these files will keep generating the deprecated wrapper, and reviewers would flag the canonical one. Fix: update `docs/AGENTS.md`, `docs/AI_USAGE_GUIDE.md`/README export tables and the skill's legacy list (`Tooltip` is canonical, `ToolTip` is deprecated). This needs an orchestrator decision because skill files are fleet-owned.
- [P3] README should mention `contentAs="div"` next to the DashboardShell example (ruling 8), and document the two `DropdownMenu` families (ruling 10).

---

## Ranked fix list

P1 (blocks ship):
1. **[component-author — Slice S]** Rating pointer targets fail WCAG 2.5.8: precision 0.5 halves are 18×36 (lg) and 14×28 (md); `sm` is 20×20 with a 2 px gap; there is no coarse-pointer sizing (`src/components/atoms/Rating/Rating.css:18,93-94`, `src/components/atoms/Rating/index.tsx:142-149`). A2/C5. Fix (a)–(d) in the Slice S section.

2. **[orchestrator / release owner]** The test suite is red: `package.json` 0.0.10 vs `src/portal/data.ts:10,219` 0.0.7 (`dashboardData.test.ts` "ends at the current package version"). The version bump, `dist/` rebuild and 0.0.8–0.0.10 tarballs were made before the gate cleared. Revert or complete the release bookkeeping, and do not distribute those tarballs.

P2 (should fix before ship):
3. **[component-author — Slice Q]** Hyperlink `asChild` replaces a non-string (UrlObject) child href with `undefined`, which breaks Next `<Link href={{…}}>` (`src/components/atoms/Hyperlink/index.tsx:14-16,109,133`). Sanitise strings only; add a test.
4. **[component-author — Slice P]** Form `disabled` leaves the action Button enabled while submit is silently swallowed (`src/components/molecules/Form/index.tsx:116-120,208-213`; `Form.stories.tsx:233-235`). A1/4.1.2.
5. **[component-author — Slice P]** ToolTip trigger `<span tabIndex=0 aria-label>` has no role: axe `aria-prohibited-attr` in 21 runs (`src/components/atoms/ToolTip/index.tsx:130-139`). A10/4.1.2. Pre-existing, but P owns the rewritten wrapper.
6. **[component-author — Slice S]** AvatarGroup stories inherit an `onOverflowClick` action from `.storybook/preview.tsx:108`, so the default popover is never shown (`src/components/atoms/AvatarGroup/AvatarGroup.stories.tsx:30-43`).
7. **[orchestrator]** Docs and skill still say `ToolTip` is canonical and `Tooltip` is legacy (`docs/AGENTS.md:56`, `.claude/skills/compliance-review/SKILL.md:176`); update after the deprecation.

P3 (nice to have):
8. **[component-author — Slice P]** DashboardShell stories: add a focusable element to the content, or note that `hideSkipLink` + content without focusables leaves `main` unscrollable by keyboard (axe `scrollable-region-focusable`, `DashboardShell/index.tsx:125-134`). ToolTip announces the same text as name and description.
9. **[component-author — Slice Q]** Hyperlink asChild+disabled: add `onAuxClick` preventDefault (`Hyperlink/index.tsx:110-117`). Add a changelog line for the `hyperlinkBaseClass` value change.
10. **[component-author — Slice R]** Move the ButtonGroup context to `src/components/common/` before Button ever consumes it (`ButtonGroup/index.tsx:11,21`).
11. **[component-author — Slice S]** Timeline horizontal region: make it focusable only when it actually scrolls (`Timeline/index.tsx:127-129`).
12. **[component-author — Slice T]** TimePicker flip when space below is short (`TimePicker.css:152-158`). Replace the handle's `aria-keyshortcuts` with a described hint (`Drawer/index.tsx:468`). Optional TagInput `caseSensitive` prop or a docs recipe.
13. **[orchestrator]** README: `contentAs="div"` note; the two `DropdownMenu` families; the barrel swap to the APG Menu is a major-version **user decision**.
14. **[component-author — library owner, pre-existing]** Calendar outside-month day contrast 2.0/2.52/2.29; AppSidebar collapsed-rail `aria-controls` dangling IDREF and 419 px overflow at 375; FeedbackStates `Empty` dark Button text 4.31:1.

**Iteration routing:** **Slice S returns for iteration 2 (item 1; item 6 can ride along).** **The orchestrator owns item 2** (red suite / premature release). P, Q, R and T pass, and the W wiring code passes. Items 3–7 are P2 and should land before release, but they do not fail a dimension.

---
---

# Iteration 2 (2026-11-27): FINAL

**Final status:** P PASS / PASS / PASS · Q PASS / PASS / PASS · R PASS / PASS / PASS · **S PASS / PASS / PASS** · T PASS / PASS / PASS · W PASS / PASS / PASS · Orchestrator changes (DatePicker, Accordion) PASS / PASS / PASS.
**Release gate: CONDITIONAL PASS.** The remaining red test is structural before the commit. Conditions are listed under "Release gate" below.

The reviewer stayed read-only: no `src/**` file was edited. New probes are in the scratchpad `review/` folder: `probe10.cjs`–`probe14.cjs` and `sweep2.out`. The 0.0.11 tarball was extracted to `scratchpad/tgz11/`.

## Gate evidence (re-measured)
- **`npx vitest run`, 4 runs.** Three runs gave **1963 passed / 1 failed (1964)**: at 11:20 (before the Accordion edit), at about 11:30 and at about 11:40 (both after it). The single failure was always `dashboardData.test.ts` › "growth … ends at the current package version", `expected '0.0.7' to be '0.0.11'`. This matches the orchestrator's 1963/1964.
  - One extra run at 11:28 gave 1962/1964. It took 64 s instead of 28–41 s because it ran alongside the headless-Chrome axe sweep. The second failure was not captured and did not recur in the two runs without load. Logged as an unattributed timing flake under load (P3, see the fix list).
- **`npx tsc --noEmit`: 5 errors**, all pre-existing and identical to iteration 1: `useRipple.tsx` (1), `FeedbackStates.realworld.stories.tsx` (2), `FeedbackStateVariants.stories.tsx` (2).
- **Dependencies.** `package-lock.json` is unchanged. `npm audit --omit=dev` finds 0 vulnerabilities.
- **Banned APIs and hex colours.** Grep over the iteration-2 change set (Rating, ToolTip, Hyperlink, DatePicker, Form, Accordion, AvatarGroup stories) finds 0 hits.
- **axe** (`sweep2.out`, wcag2a/2aa/21a/21aa/22aa): 42 stories × light, dark and infinia-light, **126 runs**. Coverage: Rating ×7, AvatarGroup ×6, ToolTip ×8, Form ×7, Hyperlink (as-child, disabled, playground) and DatePicker ×11. **123 runs are clean.**
  - The **21 ToolTip `aria-prohibited-attr` runs from iteration 1 are gone.**
  - The 3 remaining runs are a new `target-size` result on ToolTip *Placements*, triaged below as a story-layout P3.
- **Overflow** at 375, 768 and 1440 for the same 42 stories: 0 cases.

## Rulings on the iteration-1 P1 / P2 items

| # | Item (owner) | Ruling | Evidence |
|---|---|---|---|
| 1 | P1: Rating WCAG 2.5.8 (component-author, S) | **CLOSED** | `probe10`, measured in Chrome:<br>- Each star now has one hit target and there are 0 `[data-part]` halves. sm is 20×20 with a **24 px pitch**, md is 28×28 (32 px pitch) and lg is 36×36 (40 px pitch). HalfPrecision lg is 36×36 with 10 radios kept. sm now meets the spacing exception, and md/lg meet the size rule.<br>- Under touch emulation (`(pointer: coarse)` true), every interactive size is **44×44 with a 48 px pitch**; readOnly stays at 28, which is fine because it is not interactive. scrollWidth stays 375.<br>- Clicking the left quarter of star 2 gives **1.5** with focus on the "1.5 stars" radio, and the right quarter gives **2**. ArrowRight then gives 2.5 and the focus ring is drawn on the star (`outline-style: solid`). Tapping the left part of star 3 gives **2.5**.<br>- Code: `atoms/Rating/index.tsx:104-113,153-170`, `Rating.css:19,86-99,102`. axe is 0 on all 7 Rating stories × 3 themes. |
| 2 | P1: suite red after the release bump (orchestrator) | **CLOSED as a defect; converted into a release-gate condition** | `package.json` is 0.0.11. `src/portal/data.ts:10` (`PRODUCT.version`) and `:219` (RELEASES 0.0.11) match it, and RELEASES now has 0.0.8, 0.0.9, 0.0.10 and 0.0.11 (`:219-260`). The 0.0.8–0.0.10 releases were cut on user instruction and are treated as a user decision, not a defect. The single remaining failure is confirmed to be structural (see "Release gate"). |
| 3 | P2: Hyperlink `asChild` object href (component-author, Q) | **CLOSED** | `atoms/Hyperlink/index.tsx:19-35`:<br>- Strings are checked with `isSafeHref`.<br>- Objects pass through unless their `href`/`pathname` string fails `isSafeHref`, or their normalised `protocol` fails when parsed by WHATWG URL (`utils/safeHref.ts:9-16`). Mixed case, tabs and leading whitespace in `protocol` are normalised by the URL parser before the check.<br>- Other types are dropped.<br>- The plain `<a>` path is still typed `string`.<br>- 5 new tests (`Hyperlink.test.tsx:220-252`). axe is 0 on the as-child, disabled and playground stories. |
| 4 | P2: Form `disabled` leaves Save enabled (component-author, P) | **CLOSED** | `probe10`:<br>- **Disabled** story: the actions fieldset has `disabled=true`, `aria-disabled="true"` and `data-state="disabled"`, and Save matches `:disabled`.<br>- **Loading** story: the fieldset is not natively disabled, with `aria-disabled="true"` and `data-state="loading"`, and Save has `aria-disabled="true"`. Enter on the focused Save **keeps focus on Save** and submit is blocked.<br>- **Default** story: Save is enabled.<br>The `aria-disabled` choice while loading follows the accepted Sprint 4 focus-safe Button pattern, so it is accepted (`molecules/Form/index.tsx:209-226`). axe is 0 on all 7 Form stories × 3 themes. |
| 5 | P2: ToolTip trigger has no role (component-author, P) | **CLOSED** | `probe11`, on Default and WithLabel:<br>- Tab focuses `SPAN role=button`, named "Helpful hint here", and the bubble opens (`data-state=open`, `aria-describedby`).<br>- Escape closes it and focus stays on the trigger.<br>- Enter opens, a second Enter closes, Space opens, and Escape closes. No page scroll happens on Space (`scrollY` 0).<br>- Code: `atoms/ToolTip/index.tsx:115-122,151-154`.<br>The iteration-1 axe `aria-prohibited-attr` (21 runs) is now 0. New side effect: see P3 #16. |
| 6 | P2: AvatarGroup stories never show the popover (component-author, S) | **CLOSED** | `probe10`:<br>- Playground, Sizes, Spacing and Children chips are `BUTTON aria-haspopup="dialog"`, named "Show 3 more: Eli Roth, Fay Ito, Gil Moss" (Children: "Show 1 more: Kai Berg").<br>- Enter opens the dialog "3 more people" with focus in the list, and Escape returns focus to the chip.<br>- WithOverflowHandler still renders the plain-handler button with no `aria-haspopup`. ServerTotal keeps its non-interactive "45 more people" span, which is by design.<br>- `.storybook/` is untouched (`AvatarGroup.stories.tsx:36-41`). |
| 7 | P2: ToolTip / Tooltip docs drift (orchestrator) | **PARTLY CLOSED; the rest is escalated to the user (non-blocking)** | `docs/AGENTS.md:56` now says `Tooltip` is canonical and `ToolTip` is a deprecated wrapper. Grep of `docs/`, `README.md` and `.claude/skills` finds no other "Not `Tooltip`" prescription. `.claude/skills/compliance-review/SKILL.md:176` still lists `Tooltip` as a legacy alias. That file is harness config, so the orchestrator deliberately left it for the user. **Owner: orchestrator → user.** This reviewer did not apply that line against `Tooltip` in this review. |

## Orchestrator changes (owner recorded as orchestrator; answers my iteration-1 open question)

### DatePicker: FormField consumer, `id`/`name`/`ariaLabel`, Escape one layer, Enter closes. Verdict: PASS / PASS / PASS
- **Owner: orchestrator** (released in 0.0.10/0.0.11, needed for the ConsolAINew date-field migration). I reviewed the FormField wiring in iteration 1 and accepted it. It is unchanged and folded in here.
- [PASS] A1 / B3 **Escape closes one layer.**
  - Code: a capture-phase document listener (`atoms/DatePicker/index.tsx:146-159`) acts only when the event target is inside the field or the popover, and is ignored if the event is already handled or IME is composing. It calls `preventDefault` plus `stopPropagation`, then `closePopover`, which returns focus to the toggle if focus was inside the popover (`:135-140`).
  - The Drawer's Escape listener runs in the **bubble** phase and skips `defaultPrevented` events (`molecules/Drawer/index.tsx:240-251`). Modal also skips them (`Modal/index.tsx:158`). So the capture-phase listener always runs first.
  - Chrome (`probe12`, TypeToSelect story): the first Escape closes the popover and focus stays in the input. A document bubble-phase listener **did not receive** that event. The second Escape, with the popover closed, reaches the bubble phase with `defaultPrevented:false`, so a host Drawer closes only on the second press.
  - jsdom test: `DatePicker.test.tsx:214-232` (inside a real Drawer, `onOpenChange` is not called on the 1st Escape and is called with `false` on the 2nd).
- [PASS] A1 **Enter applies and closes.** Typing "2026-03-15" then Enter gives value `15-03-2026` (the story's format) and the popover closes (`probe12`; `index.tsx:540-545,572-577,744-748`; test `:234-243`).
- [PASS] A4/C1 axe is 0 on all 11 DatePicker stories × 3 themes, with no overflow at 375/768/1440.
- [P3, pre-existing] On Enter, the input calls `blur()`, so focus lands on `<body>` (measured `ae: BODY`). The `blur()` calls are at HEAD `index.tsx:495,524,686`; only `setIsOpen(false)` is new. Inside a modal Drawer this drops focus out of the dialog until the next Tab. Suggest keeping focus on the input (drop the `blur()`; apply on Enter, close the popover, keep focus) in a later release.
- [P3, doc] Because the capture listener stops propagation, a consumer's own `onKeyDown` for Escape on the input does not see the press that closes the calendar. This is acceptable and is the intended one-layer behaviour; worth a JSDoc line.

### Accordion: `inert` on closed animated panels under React 18. Verdict: PASS / PASS / PASS
- **Owner: orchestrator.** Found in Chrome on ConsolAINew (React 18.3.1). The bug was present at HEAD (`git show HEAD:…/Accordion/index.tsx:279`, `inert={… ? true : undefined}`): React 18 drops `inert={true}`, so closed, animated, `aria-hidden` panels kept focusable content (2.4.3 / 4.1.2 hidden-focusable).
- The fix (working tree, mtime 11:22:22) sets and removes the `inert` attribute on the DOM node through a ref plus a layout effect (`molecules/Accordion/index.tsx:261-274`, `ref` at `:285`). The JSX `inert` prop is removed.
  - The hooks run **before** the `keepMounted` early return (`:268-279`), so hook order is stable.
  - `useLayoutEffect` falls back to `useEffect` on the server, so there is no SSR warning.
  - The multiple-value toggle copies the array first (`:122`), so a controlled array is not mutated.
- [PASS] Chrome on Storybook (React 19.1.2; this confirms the DOM path but cannot reproduce React 18), `probe13`: closed panels have `inert` plus `aria-hidden="true"`; opening a panel removes `inert`; motion-none unmounts closed panels as before. Accordion tests pass 17/17, including `toHaveAttribute("inert")` (`Accordion.test.tsx:40-47`). The full suite after the edit is still 1963/1964 (same single failure).
- **Not in the 0.0.11 tarball.** The extracted `package/dist/index.mjs:2329` still has `inert: useInertWhenClosed ? true : void 0`. React 18 consumers of 0.0.11, **including ConsolAINew**, keep the focusable-closed-panel bug until the next release. See release condition 3.

## New findings in iteration 2
- [P3, story, pre-existing layout, newly visible] **ToolTip *Placements*: axe `target-size`** (4 nodes × 3 themes).
  - Now that the trigger has `role="button"`, axe treats it as a target. The four 16×16 triggers sit **16 px apart, centre to centre, with 0 gap**: the story's Tailwind `flex gap-4 p-8` classes (`ToolTip.stories.tsx:44`, unchanged from HEAD) do not render in this Storybook.
  - Every isolated use passes 2.5.8 through the spacing exception (Default and WithLabel have one 16 px trigger; LargeIcon is 24×24) (`probe14`).
  - This is a composition issue in the story, not a component FAIL. Fix: inline `style={{ display: "flex", gap: 16 }}` in the story. Optionally add a JSDoc note: keep 24 px between adjacent default-size icons, or use `size >= 24`.

## Release gate: CONDITIONAL PASS
The remaining failure is **confirmed to be the only one**, and it is **acceptable before the commit**, under the conditions below.
- **Why it is structural.** `generate-portal-stats.mjs` builds `growth` from git: "the last commit of each `package.json` version" (`src/portal/components/stats/generate-portal-stats.mjs:10,29,79-81`). The committed `portal-stats.json` therefore ends at 0.0.7 (commit bcfadf6), and no regeneration can produce a 0.0.11 point until a commit with `"version": "0.0.11"` exists.
- **The other release data is consistent:** `package.json` 0.0.11, `data.ts` `PRODUCT.version` 0.0.11, RELEASES 0.0.8–0.0.11 (summaries match the shipped changes), and the extracted tarball's `package.json` is 0.0.11.
- **The tarball contains every iteration-2 fix:** `ds-rating__hit`, `ds-form-actions-fieldset`, the `placeholder.invalid` protocol check, the ToolTip Space/`Spacebar` toggle, and AvatarGroup. Its `dist/index.css` has 0 `data-part` rules. The tarball was packed at 11:19:02, after the last slice source edit (11:16:06).

Conditions:
1. **[orchestrator]** After the 0.0.11 commit, run `npm run portal:stats`, commit the regenerated `portal-stats.json`, and confirm that `npx vitest run` gives **1964/1964** before tagging or publishing anything from the commit. If the test still fails after the commit, that is a real defect and reopens the gate.
2. **[orchestrator]** `dist/` in the working tree is the 0.0.11 build (11:18:57) and **predates the Accordion edit** (11:22:22). If `dist/` is committed with 0.0.11, it is the 0.0.11 artefact and must not be described as including the Accordion fix.
3. **[orchestrator → user, P2]** Cut the next release (0.0.12) with the Accordion `inert` fix soon. ConsolAINew runs React 18.3.1, so it still has focusable closed panels on 0.0.11. The 0.0.8–0.0.10 tarballs were the user's decision. They also carry the Rating 2.5.8 defect, so consumers should be on 0.0.11 or later.

---

## Ranked fix list (iteration 2, final)

P0 / P1: **none open.** Both iteration-1 P1 items are closed (Rating fixed; the suite-red item became release conditions 1–2).

P2 (should fix, non-blocking):
1. **[orchestrator → user]** Release 0.0.12 with the Accordion `inert` fix for React 18 consumers (ConsolAINew), since 0.0.11 `dist/index.mjs:2329` still uses the JSX prop (release condition 3).
2. **[orchestrator → user]** `.claude/skills/compliance-review/SKILL.md:176` still lists `Tooltip` as a legacy alias. It needs a user decision because it is harness config (iteration-1 item 7, remainder).

P3 (nice to have):
3. **[component-author, Slice P]** ToolTip *Placements* story: replace the non-rendering Tailwind `gap-4` with an inline gap of at least 8 px (`src/components/atoms/ToolTip/ToolTip.stories.tsx:44`). Optional JSDoc note on spacing for adjacent 16 px triggers.
4. **[orchestrator]** DatePicker Enter calls `blur()`, so focus goes to `<body>` (pre-existing, `src/components/atoms/DatePicker/index.tsx:543,575,747`). Keep focus on the input. Add a JSDoc line saying Escape is consumed while the calendar is open.
5. **[orchestrator]** One full-suite run under heavy parallel load (11:28, 64 s) had a second failure that was not recorded and did not recur in 2 later runs. Watch CI for a timing-sensitive test.
6. Iteration-1 P3 items 8–14 carry over unchanged (DashboardShell story focusable, Hyperlink `onAuxClick`, ButtonGroup context location, Timeline region focusability, TimePicker flip / `aria-keyshortcuts` / TagInput `caseSensitive`, README notes, pre-existing Calendar/AppSidebar/FeedbackStates items). Item 13's `contentAs="div"` note is now in RELEASES 0.0.9 (`src/portal/data.ts`); README still pending.

**Iteration routing:** no slice returns. Sprint 6 is **PASS on all three dimensions for every slice**. The release gate passes subject to conditions 1–3, all owned by the orchestrator.
