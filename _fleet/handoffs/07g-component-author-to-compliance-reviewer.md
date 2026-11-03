# Handoff: component-author (agent G) -> compliance-reviewer

- **Task:** Sprint 3 Slice G — `DateRangePicker` (`src/components/molecules/DateRangePicker/`) + `NumberInput` (`src/components/atoms/NumberInput/`)
- **Status:** ready

## Objective
Verify DateRangePicker and NumberInput against `_fleet/QUALITY_CHECKLIST.md` A / B / C and the Slice G spec, and issue a PASS / FAIL verdict with file:line or command evidence.

## Output format
The standard compliance verdict (per dimension A / B / C: PASS | FAIL; each finding with `file:line` or command + output; defects only for correctness / stated requirements, style notes labelled optional), appended to the Sprint 3 verdict file the orchestrator names (e.g. `_fleet/VERDICT-sprint3.md`).

## Sources and tools
- Spec: `_fleet/handoffs/07-orchestrator-sprint3-brief.md` (Slice G) + conventions in `_fleet/handoffs/05-orchestrator-sprint1-brief.md`.
- Code: the two dirs above (files under Artifacts). Composed / reused: `react-day-picker` v9.14 `DayPicker` (`node_modules/react-day-picker/dist/esm/DayPicker.js`), `../FormField` (`useFormField`, `FORM_FIELD_CONSUMER_KEY`), `../Modal/overlayStack.ts`.
- Tokens: `src/design-system/tokens.css` (classic `:root,[data-theme=blue]` ~L319, dark ~L469, mist / blue-mist / green-mist ~L588-666, green ~L284).
- Commands:
  - `npx vitest run src/components/molecules/DateRangePicker src/components/atoms/NumberInput` → 98 tests (DRP 23 + 10 utils, NumberInput 27 + 38 utils).
  - `npx vitest run` → 51 files / 661 tests green at handoff (474 before Sprint 3; slices H / I add theirs in parallel).
  - `npx tsc --noEmit -p tsconfig.json 2>&1 | grep -E "DateRangePicker|NumberInput"` → prints nothing.
- Real browser: I bundled a harness with esbuild + headless Chrome (scratch only, not in the repo). Storybook: `Design System/Molecules/DateRangePicker`, `Design System/Atoms/NumberInput`. Check 375 / 768 / 1440 and the dark / mist / green themes there.

## Boundaries
- I did not edit `src/index.tsx`, `src/entries/*`, `src/portal/`, `.storybook/`, `package.json` or `dist/`. The orchestrator wires the exports below.
- Out of scope, left unchanged: legacy `atoms/DatePicker`, `molecules/Calendar` (they do not use react-day-picker and have no APG grid keyboard, so I did not reuse their components; DRP uses `DayPicker` directly), `atoms/TextInput`.
- Slices H (SegmentedControl / Wizard) and I (CommandPalette / Kbd) are reviewed from their own handoffs.
- Stop after the verdict and route fixes back to component-author.

## Context digest
- **DRP value model.** `value` / `defaultValue` is `{ from?, to? }`. `onChange` fires only with a complete range (second day click or a preset) or `{}` on clear. The first click is an internal draft: it is announced and shown as "start of range", and it is discarded on Escape or outside click. I used my own two-click logic (`index.tsx:300-311`) because RDP's `addToRange` makes a one-day "complete" range on the first click.
- **DRP focus.** Opening uses RDP `autoFocus`, which focuses the selected start, else today, else the first enabled day. Escape, a day pick, a preset pick and the trigger toggle all call `close(true)`, which focuses the trigger *before* the dialog unmounts (`index.tsx:204-213`). Clear moves focus to the trigger before its own button unmounts (`:320-324`). Outside pointer-down leaves focus where the user clicked; a 0 ms timer (in a ref, so the effect cleanup cannot cancel it) falls back to the trigger if focus ends up on `<body>` (`:252-273`). On the responsive 2↔1 month switch, a media-query callback first moves `month` to the month of the focused day. A layout effect then refocuses the same `[data-day]` button, else the grid tab stop, else the dialog (`:286-298`). This is tested (`DateRangePicker.test.tsx` "keeps focus on the same day…").
- **Overlay stack.** The DRP pushes a layer while open, with `parentLayerId` from `OverlayLayerContext`. Escape and outside click act only when `isTopLayer` (`index.tsx:231-273`). It is tested inside a `Drawer`: the first Escape closes only the picker, the second closes the drawer.
- **Popover** is not portalled. It is absolutely positioned under the trigger with `width: max-content` and flips to `data-align="end"` when it would overflow the right edge (`:276-284`). At ≤ 900px the presets become a wrapping row. At ≤ 640px it is `position: fixed`, docked to the bottom with `--z-modal`, with one month centred. Being in-tree keeps it inside an enclosing Drawer's focus ownership. The cost is that an `overflow: hidden` ancestor can clip it on desktop (see Open questions).
- **NumberInput edit model.** When blurred, the field shows `Intl.NumberFormat(locale, formatOptions)` with `precision` applied. When focused it shows a plain number (no grouping or affixes, locale decimal, percent ×100), so the caret never jumps. Typing fires `onChange` with every valid parse, or `null` when empty. Invalid text never fires and reverts on blur. Blur and Enter clamp to `[min, max]` and round to `precision` (`clampOnBlur`). Percent values are fractions (0.25 shows 25%). `allowNegative={false}` strips minus signs and raises the lower bound to ≥ 0.
- **Steppers** are `tabIndex=-1`: the arrow keys are the keyboard path, as in APG spinbutton practice. They keep focus in the input via `pointerdown` `preventDefault`. Press-and-hold waits 400 ms, then repeats every 60 ms, and stops on release anywhere or at a bound. An AT `click` with `detail === 0` steps once. The steppers have `aria-label` "Increase" / "Decrease" and `aria-controls` pointing at the input.
- **FormField (both components).** Each sets the `FORM_FIELD_CONSUMER_KEY` flag, so FormField skips cloneElement injection, and each reads `useFormField()`. The field `id`, `aria-describedby` (the field's ids plus the component's own error id when outside a field), `aria-invalid` and `aria-required` go on the focusable element: the DRP trigger `<button>`, the NumberInput `<input>`. Explicit props win. The DRP trigger name is `aria-labelledby="<label id> <value id>"`, which reads as "Billing period, Nov 1 – Nov 7". A component's own `label` and `error` render only outside a FormField. The error uses `role="alert"` only after it changes post-mount, the same rule as FormField.
- **Parsing** (`NumberInput.utils.ts`) derives the group, decimal, minus and native digits from `formatToParts`. It also gets the currency, percent, unit and literal affixes and the compact suffixes (K/M/B/T, 万…) with their multipliers. It accepts accounting parentheses and any minus variant. A heuristic treats a lone "group" char not followed by exactly 3 digits as a decimal ("1,5" → 1.5 in en-US, "1.5" → 1.5 in de-DE, while "1.234" → 1234). The return value is `null` for empty input and `NaN` for invalid input.

## Self-check (QUALITY_CHECKLIST A / B / C) — file:line evidence
**A Accessibility**
- A1 keyboard, DRP. The trigger is a native button; ArrowDown opens it (`DateRangePicker/index.tsx:455-462`). The grid keys come from RDP (arrows, Home/End, PageUp/Down, Shift+PageUp/Down). The Tab trap skips `tabindex=-1` roving days (`:326-344`, `DateRangePicker.utils.ts` `getTabbable`). Escape: `:237-249`. Tests: "ArrowDown on the trigger opens; arrows move focus", "Tab and Shift+Tab are trapped".
- A1 keyboard, NumberInput. ArrowUp/Down ±step, Shift ×10, PageUp/Down ×10, Home/End → min/max (only when bounded), Enter commits (`NumberInput/index.tsx:259-301`). Test: "ArrowUp/Down ±step, Shift ×10…".
- A2 targets. DRP trigger, day cells, nav and preset buttons are `--button-height-lg` (38px, ≥ 24px per 2.5.8) and 44px under `(pointer: coarse)` (`DateRangePicker.css:417-422`). NumberInput steppers measure 38×36 on desktop in Chrome and 44px when coarse (`NumberInput.css:169-174`).
- A3 focus. `--color-focus-ring` 2px outline on the trigger (`DateRangePicker.css:58`), clear button (`:113`), presets (`:212`) and dialog fallback (`:168`). Days get a two-tone ring, the ring plus a surface-coloured inner border (`:356-370`), so it stays visible on a selected fill (green theme ring #0d0d0d = fill). NumberInput puts the ring on the field via `:has(:focus-visible)` (`NumberInput.css:51`) and falls back to the input (`:90-95`). Positive tabindex is never used.
- A4 contrast: see the table below. Every pair passes except the decorative range-band fill. Today is shown by bold + underline, not colour (`DateRangePicker.css:328`). The range middle is shown by fill plus top/bottom `--color-border-default` edges (≥ 3.38:1 vs the popover, `:335-344`) plus the label "in range". Endpoints use an inverse fill.
- A5 forms. Label association, `aria-describedby`, `aria-invalid` and `aria-required` are wired as described in the digest (DRP `index.tsx:401-421`, NumberInput `index.tsx:310-318`). Tests: "wires id, label, description, invalid and required from FormField…" and "explicit props win" in both test files. FormField's dev warning does not fire.
- A7 overlays. `role="dialog"` with `aria-modal="true"` and `aria-label` (`DateRangePicker/index.tsx:484-486`). The trigger has `aria-haspopup="dialog"`, `aria-expanded` and `aria-controls` (`:448-450`). Focus returns to the trigger as described in the digest.
- A10 / live regions. The DRP has a polite `aria-atomic` region (`:558`) that announces "Start date …", "Selected … to …", "Last 7 days: …" and "Dates cleared.". RDP's caption is already `role="status"`. Day labels are localised full dates plus "today" and "start of range" / "end of range" / "in range" (`:373-389`). NumberInput uses `aria-valuenow/min/max/valuetext`, and valuetext includes string prefix/suffix (`index.tsx:362-365`). The affix slots are `aria-hidden`.
- A9 motion. The RDP animation is off by default, and only colour transitions remain, which are disabled under `prefers-reduced-motion` (`DateRangePicker.css:447`, `NumberInput.css:190`). `forced-colors` mappings: `DateRangePicker.css:424-445` (Highlight endpoints and band edges, pressed preset) and `NumberInput.css:176-188`.

**B Security**
- B1: no `dangerouslySetInnerHTML`, `innerHTML`, `eval` or `new Function` in either dir (`grep -rnE "dangerouslySetInnerHTML|innerHTML|eval\(|new Function" src/components/atoms/NumberInput src/components/molecules/DateRangePicker` → nothing). All labels, presets and errors render as React text nodes.
- B: the `[data-day="${iso}"]` selector input is always `toIsoDay` output, digits and dashes only (`DateRangePicker/index.tsx:294`). Intl constructors are wrapped in try/catch, so a bad locale or currency code cannot throw (`NumberInput.utils.ts` `safeNumberFormat`, `formatLocaleNumber`; DRP `safeDateTimeFormat`). Tests: "never throws on bad options", "survives a bad tag".
- Escape and outside-click dismissal on the DRP are scoped to the top layer. Focus is trapped while the dialog is open, and nothing escapes to the background.

**C Responsiveness**
- C1 / C2: checked in headless Chrome at 500 (the minimum headless width), 768 and 1440, in the blue and dark themes. `documentElement.scrollWidth === innerWidth` at every width, so there is no horizontal overflow. The popover measures 725×300 at 1440 and 596×363 at 768 (two months, presets in a row), and 484×405 at ≤ 640 (one month, docked). Rules: `DateRangePicker.css:383-415`. Both roots are `width: 100%; min-width: 0`, the value text ellipsises, and the input is `min-width: 0`.
- C dark mode: see the table.

## Contrast (computed in Chrome from resolved tokens, WCAG formula)
| Pair (use) | blue/classic | dark | mist | blue-mist | green-mist | green |
|---|---|---|---|---|---|---|
| text-primary / bg-surface (field text) | 19.44 | 13.34 | 18.62 | 18.62 | 18.62 | 19.44 |
| text-primary / bg-elevated (popover, days) | 19.44 | 13.34 | 19.44 | 19.44 | 19.44 | 19.44 |
| text-secondary / bg-surface (placeholder, affix, icon) | 6.48 | 6.71 | 6.21 | 6.21 | 6.21 | 6.48 |
| bg-elevated on text-primary (selected endpoint text) | 19.44 | 13.34 | 19.44 | 19.44 | 19.44 | 19.44 |
| text-primary / fill-muted (in-range day text) | 17.83 | 9.37 | 14.72 | 14.72 | 14.72 | 17.83 |
| border-default / bg-surface (field border, UI ≥ 3) | 3.45 | 3.38 | 3.31 | 3.31 | 3.31 | 3.45 |
| border-default / bg-elevated (range band edge, nav border) | 3.45 | 3.38 | 3.45 | 3.45 | 3.45 | 3.45 |
| focus-ring / bg-page (trigger, field ring) | 4.22 | 6.98 | 4.75 | 4.87 | 4.58 | 14.72 |
| focus-ring / bg-elevated (day, preset ring) | 5.57 | 5.77 | 5.57 | 5.70 | 5.36 | 19.44 |
| state-error / bg-surface (invalid border) | 4.53 | 5.31 | 4.34 | 4.34 | 4.34 | 4.53 |
| danger-strong / bg-page (error text) | 5.41 | 9.35 | 6.10 | 6.10 | 6.10 | 5.41 |

Known low pairs, handled by design:
- The ring against a selected fill measures 1.00 in green and 2.31 in dark. This is why the day ring is two-tone, with an inner border in `--color-bg-elevated`.
- The range-band fill against the popover surface is about 1.1–1.3. The band is identified by its ≥ 3.38:1 edges and the "in range" label, not by the fill.
- Disabled days and steppers (`--color-text-disabled`) are exempt under 1.4.3, and disabled days are also struck through.

## Barrel exports needed
```ts
// Atoms
export { default as NumberInput, parseLocaleNumber, formatLocaleNumber } from "./components/atoms/NumberInput";
export type { NumberInputProps, NumberInputSize } from "./components/atoms/NumberInput";
// Molecules
export { default as DateRangePicker, DEFAULT_RANGE_PRESETS, createDefaultRangePresets } from "./components/molecules/DateRangePicker";
export type { DateRange, CompleteDateRange, DateRangePreset, DateRangePickerProps, DateRangeWeekStart } from "./components/molecules/DateRangePicker";
```
(`index.tsx` also re-exports `formatForEditing`, `getNumberLocaleInfo` and `stepValue`. Those are optional for the barrel.) Name-clash check done at handoff: `grep -n "DateRange\b\|NumberInput" src/index.tsx` printed nothing, so `DateRange` is free (re-check if slices H / I are wired first).

## Failed approaches
- First draft relied on RDP's built-in `onSelect` range: the first click produced `{from: d, to: d}` (complete), so "first click = start, second = end" could not be detected. Replaced by own draft logic using `triggerDate`.
- Reusing `Drawer.utils` `getFocusable` for the Tab trap: its selector matches `button` with `tabindex="-1"` (RDP roving days), so Tab at the real last stop escaped the dialog. Wrote `getTabbable` (excludes `-1`).
- Outside-click refocus timer cleared by the effect cleanup that runs when `open` flips false → focus stayed on body. Timer moved to a ref cleared only on unmount.
- In a real browser the absolutely-positioned popover shrink-wrapped to the 360px container and wrapped the two months vertically (jsdom can't show this); fixed with `width: max-content` + viewport `max-width`.
- The day focus ring at `outline-offset: 1px` vanished against neighbouring/selected fills in the green theme (ring = fill colour) → two-tone ring.

## Artifacts
| Path | What it is | State |
|------|-----------|-------|
| src/components/molecules/DateRangePicker/DateRangePicker.types.ts | Public types | final |
| src/components/molecules/DateRangePicker/DateRangePicker.config.ts | Defaults, narrow query, messages | final |
| src/components/molecules/DateRangePicker/DateRangePicker.utils.ts | Pure date helpers, presets, `getTabbable` | final |
| src/components/molecules/DateRangePicker/index.tsx | Component | final |
| src/components/molecules/DateRangePicker/DateRangePicker.css | Styles (rdp-* scoped) | final |
| src/components/molecules/DateRangePicker/DateRangePicker.stories.tsx | Playground + WithPresets, MinMax, Locales, InFormField, States | final |
| src/components/molecules/DateRangePicker/DateRangePicker.test.tsx | 23 component tests | final |
| src/components/molecules/DateRangePicker/DateRangePicker.utils.test.ts | 10 util tests | final |
| src/components/atoms/NumberInput/NumberInput.types.ts | Public types | final |
| src/components/atoms/NumberInput/NumberInput.config.ts | Defaults, repeat timings | final |
| src/components/atoms/NumberInput/NumberInput.utils.ts | Locale parse / format / step | final |
| src/components/atoms/NumberInput/index.tsx | Component | final |
| src/components/atoms/NumberInput/NumberInput.css | Styles | final |
| src/components/atoms/NumberInput/NumberInput.stories.tsx | Playground + Formats, Sizes, States, InFormField | final |
| src/components/atoms/NumberInput/NumberInput.test.tsx | 27 component tests | final |
| src/components/atoms/NumberInput/NumberInput.utils.test.ts | 38 util tests (en-US, de-DE, fr-FR NBSP/NNBSP, de-CH, en-IN, ar-EG digits, ja-JP compact, currency/percent/unit round-trips) | final |

## Acceptance criteria
- Both dirs follow the canonical pattern; no legacy aliases (`grep -nE "AppShell|TextInput|\bTooltip\b|outlined|filled"` in both dirs → nothing).
- `npx vitest run` green; slice tests 98/98; tsc grep empty.
- A / B / C each PASS or every failure accepted with a reason.

## Open questions
- The DRP popover is not portalled, so an `overflow: hidden` ancestor such as a card with clipped corners can clip it on desktop. Portalling would need the Drawer/Modal ownership handshake. Accept this, or request a portal in a follow-up?
- "This month" and "This quarter" presets run period-to-date (start → today) rather than to the full period end. I chose this so they never select future days. Confirm the product intent.
- NumberInput steppers are not tab stops (APG practice; the arrow keys cover keyboard users). If the reviewer reads A1 as "every interactive element in the Tab order", say so and I will make them tabbable.
- Atom → molecule import: NumberInput imports `useFormField` from `molecules/FormField`, which side-loads `FormField.css`. This is the same pattern as the existing Sprint 2 P3 note on Combobox.

---

## Iteration 2 (response to `_fleet/VERDICT-sprint3.md` Slice G)

**Status:** ready for re-review. Slice suites: 131 tests (DRP 38, NumberInput 93). Five shuffled passes are all green: `for i in 1..5; npx vitest run <dirs> --sequence.shuffle`. Vitest 4.0.18 has no `--repeat` CLI flag (`CACError: Unknown option --repeat`), so I used the loop instead. Full `npx vitest run`: 52 files, 703 tests. The tsc grep for slice paths prints nothing.

### 1. P2: `aria-required` on the DRP trigger (fixed)
- The trigger no longer sets `aria-required`. An explicit `aria-required` prop is destructured and dropped (`DateRangePicker/index.tsx:146-147`); it is not allowed on a `<button>`.
- "Required" is conveyed through the accessible name. Inside FormField, the field label (with sr " required") is part of `aria-labelledby`. Outside FormField, the new `required` prop renders a visible `*` plus an sr " required" in the component's own label, and in the hidden `ariaLabel` name (`index.tsx` label block; type doc in `DateRangePicker.types.ts`).
- Tests in `DateRangePicker.test.tsx`:
  - "wires id, label…" now asserts no `aria-required` and that the name matches /required/.
  - "never puts aria-required on the trigger, even when passed explicitly".
  - "axe: no aria-allowed-attr / ARIA violations inside FormField (closed and open)" runs **axe-core** in jsdom with rules aria-allowed-attr, aria-required-attr, aria-valid-attr(-value), aria-prohibited-attr, button-name, label, nested-interactive, aria-dialog-name and duplicate-id-aria. It reports 0 violations both before and after opening.

### 2. P2: NumberInput malformed input (fixed)
- I rewrote `parseLocaleNumber` (`NumberInput.utils.ts:164-…`).
  - **Group positions** are validated per locale. `getNumberLocaleInfo` now reads `primaryGroupSize` / `secondaryGroupSize` from `formatToParts(1234567890)`: 3/3 for most locales, 3/2 for en-IN. The last group must equal the primary size, middle groups the secondary size, and the first group must have 1..max digits (`:251`). A separator inside the fraction is rejected.
  - **Decimal heuristic** is narrowed to a single separator followed by 1–2 digits with no decimal present ("1,5", "10,25", "12,34" in en-US; "1.5" in de-DE). Three digits means grouping; four or more is rejected. This is documented in the function's JSDoc.
  - **Sign:** one minus (any variant) in a leading or trailing position, or accounting parentheses (`:210-224`). Interior, repeated or mixed signs return NaN ("1-2", "--5", "-5-", "-(5)"). Parentheses are no longer stripped as currency "literals", so `currencySign: "accounting"` output parses.
  - **Space groups** (fr NBSP / U+202F / space) are recognised only between digits. de-CH `'` and `’` are aliases.
  - New `isNegativeInput()`. `-0` keeps its sign (the value is negated after `cleanFloat`).
- **Component** (`NumberInput/index.tsx:188-220, 345`): rejected text is kept as typed, `aria-invalid="true"` is set while focused, and `onChange` is never called. On blur or Enter, NaN reverts to the last valid value. A minus with `allowNegative={false}` no longer flips the sign: the text is rejected, then clamped to `min ?? 0` on blur when `clampOnBlur` is on, or reverted when it is off. Incomplete prefixes typed mid-entry ("-", "1,", "(5", "12.") are not flagged.
- **Tests:**
  - 19 rejection cases (en-US, de-DE, fr-FR, en-IN), the heuristic boundaries, valid sign positions (including accounting currency and compact), a re-run of every valid format (de, fr NBSP/NNBSP, de-CH both apostrophes, en-IN, Arabic-Indic, percent, currency, compact), and `isNegativeInput` (`NumberInput.utils.test.ts`, "iteration 2" block).
  - Component tests: malformed `1,2345`, `1,234,5` and `1-2` each keep the text, set aria-invalid, make no onChange call, and revert on blur. `-5` with `allowNegative={false}` is invalid, then clamps to 0 on blur. The same with `clampOnBlur={false}` reverts. Incomplete prefixes are not flagged.

### 3. Docked popover inside a transformed Sheet (fixed, verified in Chrome)
- At ≤ 640px the popover is **portalled to `<body>`** (`renderPopover`, `index.tsx:454`), so a transformed Drawer or Sheet panel is no longer the containing block for `position: fixed`. Desktop stays in-tree.
- **Kept working across the portal:**
  - Drawer focus ownership still holds, because React focus events bubble through portals to Drawer's `onFocusCapture`.
  - Tab inside the dialog calls `stopPropagation`, so Drawer's panel `trapTabKey` cannot pull focus back (`:352`).
  - Outside-click detection also checks the portalled dialog (`:271`).
  - The trigger subtree's `data-theme` / `dir` are copied onto the portalled dialog (`:533`).
  - Popover CSS variables (`--ds-drp-cell` / control height, including the coarse-pointer 44px) are declared on `.ds-date-range-picker__popover` too.
  - RDP `autoFocus` is applied only on the opening mount (`:576`). A portal ↔ in-tree remount on a responsive switch therefore keeps focus on the same day through the existing restore effect, instead of jumping to the selected day.
- **Headless Chrome check** (500×800, the minimum headless width; harness only), with the DRP in an open `side="bottom" size="sm"` Drawer: the panel's computed transform is `matrix(1, 0, 0, 1, 0, 0)`, which is the leftover transform that caused the issue. The popover's parent is `<body>`, with `position: fixed`, rect left 8 / right 492 / bottom 705 against viewport height 713 (8px inset), so it is docked to the viewport, not the panel. Focus is inside the dialog.
- **Tests:**
  - "≤ 640px: the docked popover is portalled to <body>…" (inside a bottom Drawer: Tab not hijacked, an inside pointer-down does not close, Escape closes and focus returns to the trigger).
  - "…inherits the trigger subtree's data-theme".
  - "switching wide → narrow moves the popover to the portal and keeps focus on the same day" (and back).

### Docs
- "Avoid `overflow: hidden` ancestors (desktop popover is in-tree; portalling on desktop is a P3 follow-up)" is now documented in the component JSDoc (`index.tsx` header), the story `docs.description.component`, and the `DateRangePicker.css` header.

### Still open (P3)
- Portalling on desktop, which would remove the `overflow: hidden` limitation.
