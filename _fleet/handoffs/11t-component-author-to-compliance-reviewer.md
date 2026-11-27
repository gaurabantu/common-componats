# Handoff: component-author (Sprint 6 Slice T) -> compliance-reviewer

- **Task:** New `TagInput` and `TimePicker` molecules; bottom-sheet behaviour (handle, swipe-to-dismiss, snap points) on `Drawer` plus a `BottomSheet` preset export.
- **Status:** ready (barrel wiring pending, done by the orchestrator)

## Objective
Verify Slice T (TagInput, TimePicker, Drawer bottom-sheet + `BottomSheet`) against `_fleet/QUALITY_CHECKLIST.md` A/B/C and the Sprint 6 backward-compatibility rule, once the orchestrator has added the barrel lines below.

## Output format
Add a "Slice T" section to `_fleet/VERDICT-sprint6.md` in the checklist's verdict format (`## Accessibility / Security / Responsiveness: PASS|FAIL`, one `[PASS]/[FAIL]` line per item with `file:line`, then a ranked fix list tagged `[component-author]`).

## Sources and tools
- Code: `src/components/molecules/TagInput/**`, `src/components/molecules/TimePicker/**`, `src/components/molecules/Drawer/**` (diff: `git diff -- src/components/molecules/Drawer`; new file `Drawer.sheet.test.tsx`).
- Tests: `npx vitest run src/components/molecules/TagInput src/components/molecules/TimePicker src/components/molecules/Drawer` → 4 files, 136/136 (TagInput 27, TimePicker 36, Drawer 37 + layers 16 unchanged, Drawer.sheet 20 new).
- Typecheck: `npx tsc --noEmit -p tsconfig.json 2>&1 | grep -E "molecules/(Drawer|TagInput|TimePicker)"` → empty.
- Contrast script (resolves tokens.css vars per theme): `/private/tmp/claude-501/-Users-gaurabkumar-Documents-my-code-common-componant-main/84074698-fada-4af3-a3f9-7aced4c428a2/scratchpad/contrast.py src/design-system/tokens.css` (scratchpad, may be cleared).
- Storybook: `Design System/Molecules/TagInput`, `…/TimePicker`, `…/Drawer` → stories `BottomSheetSwipe`, `BottomSheetSnapPoints`, `DrawerWithHandle` (use 375px viewport + touch emulation for swipe).

## Boundaries
- Do not edit `src/index.tsx`, `src/entries/*`, `src/portal/**`, `package.json`, `dist/`; do not run `npm run build`.
- Out of scope: other slices (P/Q/R/S); the 2 failing `src/portal/components/dashboardData.test.ts` tests (stale portal stats/gallery, caused by new component dirs from all slices; see Open questions).
- Stop at the verdict. Fixes go back to component-author.

## Context digest
- **TagInput** (`molecules/TagInput`): `forwardRef` to the root `<div>`; the text box gets the id / aria. Chips reuse `atoms/Badge` (`shape="pill"`, `onDismiss`, `dismissLabel="Remove {tag}"`; Badge's dismiss button already has a 44px hit area). Badge has no ref, so chips are `<li data-tag-index>` and keyboard focus is found by querying the `<li>`'s `button`. Enter / a delimiter (default `[","]`, typed or IME-inserted, handled in `onChange`) / a paste containing delimiters, `\n`, `\r` or `\t` creates tags. Rejected text (duplicate, `maxTags`, `validate` string) stays in the box and shows a `role="alert"` message. Add / remove go to a polite `role="status"` region. Suggestions use the APG combobox pattern with an inline `position:absolute` listbox (not portalled, so it works inside Drawer / Modal focus traps). Duplicate check is an exact, case-sensitive match after trimming. `name` → one hidden input with the tags joined by `,`.
- **TimePicker** (`molecules/TimePicker`): `forwardRef` to the `<input role="combobox">`. The value is always 24-hour `"HH:mm"` or `null`. The box text has fixed segment positions (`HH:mm` / `hh:mm AM`), so the caret decides the segment: [0-2] hour, [3-5] minute, 6+ period. With the list closed, ArrowUp / ArrowDown step that segment: hours wrap the day; minutes snap to `step` and wrap within the hour, like a native time input; period adds 12h. Stepping skips unavailable times. Alt+ArrowDown or the clock button (tabIndex -1, mousedown prevented) opens the list. While it is open, arrows skip disabled options, Home/End work, Enter picks, and Escape closes with `preventDefault` + `stopPropagation`, so an enclosing Drawer stays open. Typing while the list is open highlights an exact match, otherwise nothing, so Enter commits the typed text. Option labels come from `Intl.DateTimeFormat` (U+202F/U+00A0 normalised to a space); AM/PM come from `formatToParts`. `format` defaults to the locale hour cycle. Outside-click is handled by blur: option and button mousedown keep focus, so no document listener is needed.
- **Drawer bottom sheet**: all new props are opt-in and ignored unless `side="bottom"`: `handle` (default false), `handleLabel` ("Resize sheet"), `swipeToDismiss` (default = `handle`), `snapPoints`, `defaultSnap` (0, reapplied on each open), `snap` (controlled), `onSnapChange(index, point)`. A plain `Drawer side="bottom"` renders exactly as before; all 53 existing Drawer tests pass unedited. With `snapPoints` the handle is a `<button>` (click cycles = single-pointer alternative to dragging, WCAG 2.5.7; ArrowUp/Down/Home/End; announces "Resize sheet: 90%" politely). Without snaps it is an `aria-hidden` pointer-only grip; the X button and Escape are the alternatives. The handle is in the Tab order but is skipped for initial focus (`Drawer/index.tsx:211-217`). Drag uses the CSS `translate` property, not `transform`: the enter animation's `fill-mode: both` pins `transform`. Swipe dismiss goes through `requestClose` → `onBeforeClose`. If vetoed, the sheet slides back after `DRAWER_EXIT_FALLBACK_MS` (`Drawer/index.tsx:292-298`). Dismiss rule: drag > 25% of height, or flick ≥ 24px at > 0.5 px/ms (`Drawer.config.ts`).
- `BottomSheet` = `forwardRef` preset: `<Drawer {...props} handle={handle ?? true} side="bottom" />` (`Drawer/index.tsx`, bottom of file). `BottomSheetProps = Omit<DrawerProps, "side">`.
- Story export name `BottomSheet` already existed in `Drawer.stories.tsx` (Sheet demo). Kept it for story-ID stability and imported the component as `BottomSheetComponent`.

### Self-check — A (Accessibility)
- A1 keyboard: TagInput Enter / delimiter / Backspace / ArrowLeft-Right / Home / End / Delete (`TagInput/index.tsx:205-305`); TimePicker segment arrows + list keys (`TimePicker/index.tsx:252-309`); sheet handle arrows (`Drawer/index.tsx` `handleHandleKeyDown`). Escape inside both pickers does not close a parent Drawer (`TagInput/index.tsx:236-243`, `TimePicker/index.tsx:284-289`). Tests cover all of these.
- A2 targets: options `min-height: var(--size-touch-target)` 44px (`TagInput.css` `.ds-tag-input__option`, `TimePicker.css` `.ds-time-picker__option`); chip remove 44px (Badge); TimePicker buttons ≥ 32px desktop, 44px coarse (`TimePicker.css:210`); sheet handle 132×24px desktop, 44px tall coarse (`Drawer.css:235-284`). All ≥ 24px (2.5.8).
- A3 focus: field ring `:has(input:focus-visible)` with `--color-focus-ring` (`TagInput.css:60`, `TimePicker.css:55`) plus a fallback without `:has` (`:122`, `:93`); active option outline (`TagInput.css` / `TimePicker.css` `[data-active]`); handle `button.ds-drawer__handle:focus-visible` (`Drawer.css:276`).
- A4 contrast (computed from tokens.css; classic / dark / mist): text-secondary on surface (placeholder, clock/clear glyphs, handle bar) 6.48 / 6.71 / 6.21; text-primary on elevated (options) 19.44 / 13.34 / 19.44; text-primary on option-active-bg 17.15 / 11.05 / 16.66; on selected-bg 15.63 / 9.88 / 15.63; danger-strong errors 7.14 (prior verdict) / 7.73 / –; focus ring on surface 5.57 / 5.77 / 5.33. Disabled options are struck through, so colour is not the only cue (`TimePicker.css:199`).
- A5 forms: own `<label htmlFor>` or FormField id; `aria-describedby` = field hint/error + own message id; `aria-invalid`, `aria-required`; FormField consumer flag (`TagInput/index.tsx:466`, `TimePicker/index.tsx:470`); tests "FormField consumer" in both.
- A5/A10 live: validation `role="alert"` (`TagInput/index.tsx:451`, `TimePicker/index.tsx:459`); add/remove polite status (`TagInput/index.tsx:456`); snap status (`Drawer/index.tsx:482`).
- A7: combobox `aria-expanded` / `aria-controls` / `aria-activedescendant` (`TagInput/index.tsx:405-409`, `TimePicker/index.tsx:366-382`). Drawer modal semantics unchanged.
- A9 motion: `prefers-reduced-motion` turns off field transitions (`TagInput.css:220`, `TimePicker.css:240`) and snap / drag-release transitions (`Drawer.css:325`). Forced colours handled (`TagInput.css:205`, `TimePicker.css:217`, `Drawer.css:340`).

### Self-check — B (Security)
- B1/B4/B5: none of the three dirs contains `dangerouslySetInnerHTML`, `innerHTML`, `eval` or `new Function` (grep returned nothing). Tags, labels and messages render as text nodes. No new dependencies. Only inline styles are the existing `--ds-drawer-extent` var and drag `translate` / extent set through `element.style`. No `<style>` tags.
- B3: pickers keep focus inside Drawer / Modal traps (inline listbox, no portal). Swipe dismiss respects `onBeforeClose`.
- B6: `validate` is documented as UX only (`TagInput.types.ts`). Both pickers use `autoComplete="off"`.
- B7: stories use fictional data (`ops@example.com`).

### Self-check — C (Responsiveness)
- C1/C4: both roots are `width:100%; min-width:0`. Chips wrap, and long tags truncate inside the chip (`TagInput.css` `.ds-tag-input__chip > *`). The text box is `flex: 1 1 6rem` (`TagInput.css:105`). Listboxes take the field width (`left:0; right:0`) and scroll at 15rem max height. Sheet snap heights use `min(extent, 100dvh)` (existing rule).
- C5: `(pointer: coarse)` sets 44px heights. Swipe uses pointer events with `touch-action: none` on the handle (`Drawer.css:251`).
- C6: tokens only, so dark mode follows the theme. Contrast above.

## Failed approaches
- Translating the sheet with `transform` while dragging did nothing: the enter keyframes (`fill-mode: both`) override `transform`. Switched to the CSS `translate` property, which composes with the exit animation, so a swipe dismiss slides out from where the finger left off.
- Velocity tests that used `performance.now` `mockReturnValueOnce` were flaky because React / testing-library also call `now()`. Replaced with a `mockImplementation(() => t)` clock (`Drawer.sheet.test.tsx` `timedDrag`).
- jsdom has no `PointerEvent`, so `fireEvent.pointer*` dropped `clientY`. Polyfilled locally in `Drawer.sheet.test.tsx` `beforeAll` (not in the global setup).
- TS lib lacks `resolvedOptions().hourCycle`. Cast locally (`TimePicker.utils.ts:31`).

## Artifacts
| Path | What it is | State |
|------|-----------|-------|
| src/components/molecules/TagInput/TagInput.types.ts | props, size, labels, validate result | final |
| src/components/molecules/TagInput/TagInput.config.ts | defaults, sizes, chip size map, i18n labels | final |
| src/components/molecules/TagInput/TagInput.utils.ts | splitTags / splitPending / containsSeparator / filterSuggestions | final |
| src/components/molecules/TagInput/index.tsx | component (forwardRef root div, FormField consumer) | final |
| src/components/molecules/TagInput/TagInput.css | tokens-only styles | final |
| src/components/molecules/TagInput/TagInput.stories.tsx | Playground + validation, suggestions, sizes, states, FormField, mobile | final |
| src/components/molecules/TagInput/TagInput.test.tsx | 27 tests | final |
| src/components/molecules/TimePicker/TimePicker.types.ts | props, size, format, segment, labels | final |
| src/components/molecules/TimePicker/TimePicker.config.ts | defaults, sizes, labels | final |
| src/components/molecules/TimePicker/TimePicker.utils.ts | parse / format / Intl / segment / options helpers | final |
| src/components/molecules/TimePicker/index.tsx | component (forwardRef input, FormField consumer) | final |
| src/components/molecules/TimePicker/TimePicker.css | tokens-only styles | final |
| src/components/molecules/TimePicker/TimePicker.stories.tsx | Playground + controlled, 24h, business hours, sizes, states, locales, FormField | final |
| src/components/molecules/TimePicker/TimePicker.test.tsx | 36 tests | final |
| src/components/molecules/Drawer/Drawer.types.ts | + handle/snap props, `BottomSheetProps` | final |
| src/components/molecules/Drawer/Drawer.config.ts | + `BOTTOM_SHEET_DEFAULTS`, gesture thresholds | final |
| src/components/molecules/Drawer/Drawer.utils.ts | + `resolveSnapPx`, `nearestSnapIndex` | final |
| src/components/molecules/Drawer/index.tsx | + handle, drag, snaps, `BottomSheet` export | final |
| src/components/molecules/Drawer/Drawer.css | + handle / snap transition / sr-only / reduced-motion / forced-colors | final |
| src/components/molecules/Drawer/Drawer.stories.tsx | + argTypes, `BottomSheetSwipe`, `BottomSheetSnapPoints`, `DrawerWithHandle` | final |
| src/components/molecules/Drawer/Drawer.sheet.test.tsx | 20 new tests (existing Drawer tests untouched) | final |

## Barrel exports needed
Replace `src/index.tsx:136`:
```ts
export { default as Drawer, Sheet, BottomSheet } from "./components/molecules/Drawer";
```
Replace `src/index.tsx:349`:
```ts
export type { DrawerProps, DrawerSide, DrawerSize, SheetProps, BottomSheetProps } from "./components/molecules/Drawer";
```
Add:
```ts
export { default as TagInput } from "./components/molecules/TagInput";
export { default as TimePicker } from "./components/molecules/TimePicker";
export type { TagInputProps, TagInputSize, TagInputLabels, TagInputValidateResult } from "./components/molecules/TagInput";
export type { TimePickerProps, TimePickerSize, TimePickerFormat, TimePickerSegment, TimePickerLabels } from "./components/molecules/TimePicker";
```
(Mirror these in whichever `src/entries/*` file carries Drawer / form controls, if any.)

## Acceptance criteria
- Slice tests 136/136 green. Full `npx vitest run`: 1911/1913 at time of writing; the only failures are the 2 portal inventory tests (see Open questions).
- tsc prints nothing for the three dirs.
- No legacy aliases (AppShell / Avatar / Tooltip / TextInput / outlined / filled) and no hex in new code (grep returned nothing).
- Existing `Drawer` / `Sheet` behaviour and all 53 existing Drawer tests are unchanged.
- Verdict A/B/C for Slice T recorded with `file:line` evidence.

## Open questions
- **Portal inventory (orchestrator):** `src/portal/components/dashboardData.test.ts` fails 2 tests ("component folders per layer" 26≠28; gallery missing 7 stories including `Molecules/TagInput` and `Molecules/TimePicker`). Fix: run `npm run portal:stats` and add gallery entries after all slices land. `src/portal` is outside my ownership.
- Reviewer to decide: the sheet handle is in the Tab order but not the initial focus. Is that acceptable, or should it be `tabIndex=-1` with ArrowUp/Down on the panel instead? I recommend keeping it; it is the keyboard route to resizing.
- Optional, not a defect: TagInput duplicate detection is case-sensitive. A `caseInsensitiveDuplicates` flag could follow if product asks.
- Optional, not a defect: TimePicker listbox is inline below the field (no flip). Near the viewport bottom it can extend below the fold inside a scroll container. Popover-based flip positioning is a possible follow-up.
