# Handoff: component-author (agent K) -> compliance-reviewer

- **Task:** Sprint 4 Slice K — Select upgrade (focus retention, heights, form completeness, status/error), `src/components/atoms/Select/` only.
- **Status:** ready

## Objective
Verify the upgraded `Select` against `_fleet/QUALITY_CHECKLIST.md` A/B/C and the Slice K brief (`_fleet/handoffs/08-orchestrator-sprint4-brief.md`), and confirm backward compatibility for its consumers (Pagination, FilterBar, Table, DataTable, FormField).

## Output format
Section of `_fleet/VERDICT-sprint4.md` for Slice K: PASS/FAIL per dimension (A, B, C), each defect with file:line or a command + output, severity P1-P3. Non-defect suggestions labelled optional.

## Sources and tools
- Code: `src/components/atoms/Select/{index.tsx,Select.types.ts,Select.config.ts,Select.css,Select.test.tsx,Select.stories.tsx}`.
- Brief: `_fleet/handoffs/08-orchestrator-sprint4-brief.md` (Slice K) and `_fleet/handoffs/05-orchestrator-sprint1-brief.md` (conventions).
- Pattern reference for FormField wiring: `src/components/molecules/Combobox/index.tsx:54-78,261-268`; FormField: `src/components/molecules/FormField/index.tsx:126-134`.
- Commands: `npx vitest run src/components/atoms/Select src/components/molecules/{Pagination,FilterBar,FormField,DataTable,Table}` (196/196 green); `npx tsc --noEmit -p tsconfig.json 2>&1 | grep atoms/Select` (prints nothing).
- Real-browser checks still needed (jsdom cannot open a native picker): Storybook "Design System/Atoms/Select" -> "Focus retention after change", "Heights — toolbar alignment", "Native form", "In FormField".

## Boundaries
- Only `src/components/atoms/Select/` was edited. `tokens.css`, Pagination, FilterBar, Table, FormField, Button, `src/index.tsx` untouched.
- Do not re-review Button (Slice J). The 4 current full-suite failures (Modal confirmLoading, 3 Wizard loading tests: `toBeDisabled()` vs `aria-disabled="true"`) come from Slice J's in-progress Button `loading` change, not from Select (Modal/Wizard do not render Select).
- Stop after one verdict pass; route Pagination/FilterBar follow-ups to the orchestrator (they are other components).

## Context digest
- **Root cause of blur-on-change:** the animated chevron's "open" state was modelled with CSS `:focus-within` (`src/design-system/tokens.css:1441`). Focus is not "picker open", so after a pick the chevron stayed rotated; the old `handleChange` called `event.currentTarget.blur()` to reset it, dropping keyboard focus. Fix: track picker state explicitly (`index.tsx:111-139`: open on primary mouse down and Space/F4/Alt+Arrow, closed on change, blur and any other key), expose it as `data-open` on `.ucs-select-shell` (`index.tsx:273`), and in `Select.css:18-24` neutralise the tokens.css focus-within rotation with a higher-specificity rule (0,4,1 vs 0,2,1) and rotate on `[data-open="true"]`. No `blur()` anywhere. Chevron animation and `prefers-reduced-motion` handling (tokens.css:1445) kept.
- Known heuristic limit: if the user opens the picker and dismisses it without changing the value (same option / click away inside the popup), browsers fire no event, so the chevron can stay "up" until the next blur/key/change. Cosmetic only; focus is never lost. `:open` was considered but not used (classic `<select>` support uncertain; a wrong `@supports` branch would kill rotation).
- **Heights:** Select already used the same tiers as `Input` (`TextInput.config.ts:33,47,61`): sm `--button-height-sm` (30px), md `--button-height-lg` (38px), lg `3rem`. Tiers now live in `Select.config.ts` `selectHeightTokens`; lg went from a raw `48` to `3rem` (token parity with Input). `data-size` added on `<select>`. The brief's 36/40 target comes from Pagination's hard-coded `--pagination-target: 36px / 40px` (`Pagination/Pagination.css:4,18`), which predates the compact token scale (uncommitted tokens.css diff: button-height-sm/md/lg 2/2.25/2.5rem -> 1.875/2.125/2.375rem). Changing Select md to 40px would break Input/Button alignment, so the mismatch is a Pagination defect (see Open questions).
- Inline `minHeight` is kept as the exact token string because `Table/Table.test.tsx:89` asserts `minHeight: "var(--button-height-sm)"`; a `--ds-select-height` CSS-variable hook was tried and reverted for this reason.
- **FormField:** Select sets `FORM_FIELD_CONSUMER_KEY` (`index.tsx:347-348`) and reads `useFormField()` (`index.tsx:98`): id = explicit `id` ?? field id ?? `useId()`; `aria-describedby` = (explicit ?? field.describedBy) + own message id; `aria-invalid` = explicit ?? (error || status=error || field.invalid); field `required` -> `aria-required` only (parity with the old cloneElement injection, no native validation added). Explicit props win.
- `error` string forces the error status, sets `aria-invalid`, renders the message with id `${id}-message` linked by `aria-describedby`; `role="alert"` only when the error changes after first render (same latch as FormField).

## Failed approaches
- `minHeight: var(--ds-select-height, <token>)` as a container override hook: broke `Table.test.tsx:89` (exact inline-style assertion). Reverted; containers can override via `style` (now merged).
- First consumer probe (re-running Pagination/FilterBar tests with Select forced to `animatedChevron`) failed to load because sibling-relative imports were not rewritten; fixed by rewriting every `./` import. Probe files were deleted afterwards.

## Barrel exports needed
`src/index.tsx` already exports Select (`export { default as Select }`, `SelectProps` etc.). Add only the new type:
```ts
export type { SelectSize } from "./components/atoms/Select/Select.types";
```
Optional (config helper, not required by consumers): `export { selectHeightTokens } from "./components/atoms/Select/Select.config";`

## Behaviour changes
1. Select no longer blurs after a change (default `animatedChevron`); focus stays on the control in every mode. The old test "blurs after change..." was inverted (`Select.test.tsx:25`). Consumers that relied on the blur (e.g. to trigger `onBlur` validation on change) will now see `onBlur` only when the user leaves.
2. Animated chevron rotates while the picker is open (`data-open="true"` on `.ucs-select-shell`), not while merely focused.
3. Visible keyboard focus ring: inline `outline: none` removed; `.ds-select:focus-visible` draws a 2px `--color-focus-ring` outline (forced-colors: Highlight). Previously no focus indicator existed.
4. `<select>` gets class `ds-select` (consumer `className` appended) and `data-size`.
5. Consumer `style` is merged over the built-in styles; previously it replaced all of them (rest spread came after `style`).
6. `error` now wins over `status` (e.g. `status="warning" error="x"` renders error colours; previously warning border + aria-invalid).
7. Message `<p>` gets `id`, class `ds-select__message`, `data-status`, and is linked via `aria-describedby` (helperText too); `role="alert"` when an error appears/changes after mount.
8. Inside `FormField`, Select wires itself via `useFormField()` instead of cloneElement (same resulting id / aria-describedby / aria-invalid / aria-required; own error appended to the description).
9. `required` + own `label` renders an `aria-hidden` `*` marker.
10. `size="lg"` min-height `48` -> `3rem` (identical at a 16px root).
11. Deprecated `liveSearch` is no longer forwarded to the DOM (it produced an unknown-attribute warning).
12. Consumer `onMouseDown` / `onKeyDown` / `onBlur` are composed with the internal handlers (they used to override nothing because none existed; they still fire exactly once).
13. (Coordinator fix, Chrome) Any invalid Select gets the error border: the border is chosen from the resolved invalid state (own `error`, `status="error"`, FormField error via `useFormField()`, or explicit `aria-invalid="true"`) and `<select>` carries `data-invalid="true"` as a styling hook (`index.tsx` `isInvalid`). Previously a Select inside an erroring FormField had `aria-invalid` but a grey `--color-border-default` border. Test: `Select.test.tsx` "shows the invalid styling (data-invalid + danger border) for a FormField error".
14. (Coordinator fix) Error border and error message colour changed from `--color-state-error` (bright #dc3545 / dark #F87171) to `--color-danger-strong`, matching FormField / Checkbox / Alert: 7.14:1 classic (#a3293d on #fff), 7.73:1 dark (#fca5a5 on #1F2937) — text >= 4.5:1, border >= 3:1. Warning/success colours unchanged.
15. (VERDICT-sprint4 P1/P2) Every status now uses the `-strong` tokens for both border and message (`Select.config.ts` `selectStatusTokens`): error `--color-danger-strong`, warning `--color-warning-strong`, success `--color-success-strong`. No `--color-state-*` remains in Select. Classic on #fff / dark on #1F2937: warning 4.92 / 8.79, success 5.33 / 7.64, danger 7.14 / 7.73. The border follows the visual status (any invalid state -> error); the message follows Select's own `status`/`error`. `<select>` now also carries `data-status` (error/warning/success, omitted when none). Tests: `Select.test.tsx` "status tokens (contrast)".
16. (Optional item, done) Chevron glyph is now a CSS mask painted with `--color-text-secondary` (6.48:1 classic, 6.71:1 dark; was hard-coded #757575, 3.19:1 dark), for both modes (`Select.css`); forced-colors paints it CanvasText. `animatedChevron={false}` no longer sets an inline `background-image` on `<select>`; its shell gets class `ds-select-shell--chevron-static` and the glyph sits at `--ucs-select-chevron-inset` (14px) like the animated one (up to 4px further left on sm/md than before).

## Self-check (QUALITY_CHECKLIST A/B/C)
- **A keyboard / focus:** focus retained after change — `index.tsx:119-124` (no blur), tests `Select.test.tsx` "focus retention after change" (mouse + keyboard x5 modes + FormField). Focus ring — `Select.css:8-11` (`--color-focus-ring`): 5.57:1 classic, 5.77:1 dark (#60a5fa on #1F2937), 5.46:1 violet, 5.13:1 teal, 19.44:1 green — all >= 3:1.
- **A name / description / state:** native `<label for>` (`index.tsx:260-268`); `aria-describedby` / `aria-invalid` / `aria-required` `index.tsx:153-159,281-283`; required marker `aria-hidden` `index.tsx:264`, colour `--color-danger-strong` 7.14:1 classic / 7.73:1 dark.
- **A live feedback:** `role="alert"` on post-mount error `index.tsx:335`.
- **A target size:** sm 30px / md 38px / lg 48px >= 24px (WCAG 2.5.8); unchanged from before.
- **A forced-colors:** `Select.css:32-40`.
- **B security:** no `dangerouslySetInnerHTML`, `eval`, or inline string handlers in `src/components/atoms/Select/*` (grep clean); no new dependencies; no `ui-common-hooks` import.
- **C responsive:** `fullWidth` default 100% width / `minWidth: 0` (`index.tsx:203-204,222`), no fixed widths; reduced motion via tokens.css:1445-1449 (transition none); dark-mode contrast above.

## Artifacts
| Path | What it is | State |
|------|-----------|-------|
| src/components/atoms/Select/index.tsx | picker-state chevron (no blur), FormField consumer, aria wiring, required marker, data-size, style merge | final |
| src/components/atoms/Select/Select.types.ts | `SelectSize`, `required`, docs for error/size/animatedChevron | final |
| src/components/atoms/Select/Select.config.ts | `selectHeightTokens`, `isPickerOpenKey` | final |
| src/components/atoms/Select/Select.css | new — focus ring, data-open chevron override, required marker, forced-colors | final |
| src/components/atoms/Select/Select.test.tsx | 4 -> 44 tests (1 inverted) | final |
| src/components/atoms/Select/Select.stories.tsx | docs description, extra argTypes, FocusRetention, ToolbarAlignment, InNativeForm, InFormField | final |

## Acceptance criteria
- `npx vitest run src/components/atoms/Select` -> 44/44 pass; with consumers (Pagination, FilterBar, FormField, DataTable, Table) 196/196 together.
- Full `npx vitest run`: 772 pass / 4 fail (776); the 4 failures are Slice J Button-loading assertions in Modal/Wizard tests, not Select.
- `npx tsc --noEmit -p tsconfig.json 2>&1 | grep atoms/Select` prints nothing.
- In a real browser: after picking (mouse and keyboard), `document.activeElement` is the select and the chevron returns to rest; Tab focus shows the ring.

## Open questions
- **Pagination / FilterBar workaround:** `animatedChevron={false}` (`Pagination/index.tsx:215`, `FilterBar/index.tsx:241`) can now be removed. Verified by re-running both test files (51 tests) with Select forced to `animatedChevron: true` via `vi.mock`, plus a sanity probe confirming the animated shell rendered and focus stayed after `selectOptions` — all green. Removal is a visual change (overlay chevron instead of background-image), owner's call.
- **Pagination height mismatch** is Pagination's: `--pagination-target: 40px / 36px` (`Pagination.css:4,18`) are pre-compact px values. Suggest tokens there (e.g. `var(--button-height-lg)` / `var(--button-height-md)`), or pass `style={{ minHeight: "var(--pagination-target)" }}` to its Select (style now merges).
- Static chevron SVG (`animatedChevron={false}`, `index.tsx` backgroundImage) and tokens.css overlay chevron hard-code stroke `#757575` (pre-existing, not tokenisable in a data URI; does not invert in dark). Optional follow-up: mask-image + `background-color: var(--color-text-secondary)`.
