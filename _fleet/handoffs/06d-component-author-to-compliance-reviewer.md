# Handoff: component-author (agent D) -> compliance-reviewer

- **Task:** Sprint 2 Slice D — new `FormField` (+ `useFormField`) and `PageHeader` molecules
- **Status:** ready

## Objective
Run QUALITY_CHECKLIST A/B/C against `src/components/molecules/FormField/` and `src/components/molecules/PageHeader/` and issue a PASS/FAIL verdict with file:line evidence.

## Output format
Verdict per `_fleet/QUALITY_CHECKLIST.md` → "Verdict format" (Accessibility / Security / Responsiveness PASS|FAIL with `[PASS]/[FAIL] Ax …(file:line)` bullets + ranked fix list), appended to the Sprint 2 verdict file the orchestrator names (e.g. `_fleet/VERDICT-sprint2.md`).

## Sources and tools
- Brief: `_fleet/handoffs/06-orchestrator-sprint2-brief.md` (Slice D) + conventions in `_fleet/handoffs/05-orchestrator-sprint1-brief.md`.
- Code: the two dirs above (types → config → index → css → stories → test).
- Composed components (read-only): `src/components/atoms/Button/`, `src/components/atoms/Icon/`, `src/components/molecules/Popover/` (DropdownMenu*), `src/components/molecules/List/` (`isSafeHref`), `src/components/molecules/Breadcrumb/`, `src/components/molecules/Tabs/` (stories only).
- Commands: `npx vitest run src/components/molecules/FormField src/components/molecules/PageHeader` (30 tests); `npx vitest run` (full, 365/365 at handoff incl. parallel slices); `npx tsc --noEmit -p tsconfig.json 2>&1 | grep -E "FormField|PageHeader"` (prints nothing).
- Storybook: `Design System/Molecules/FormField`, `Design System/Molecules/PageHeader` — check 375/768/1440 and dark/mist themes.

## Boundaries
- Review only the two Slice D dirs. Do not edit `src/index.tsx` (orchestrator wires the barrel lines below), Sprint 1 components, `.storybook/`, `dist/`, `package.json`.
- Pre-existing, out of scope (already escalated in `_fleet/VERDICT-portal.md`): dark focus-ring token contrast, Button md height 34px on fine pointers.
- Stop after one verdict; route fixes back to component-author.

## Context digest
- **FormField** id resolution: `label htmlFor` = `htmlFor ?? child.props.id ?? "form-field-" + useId()` (non-alphanumerics stripped, React 19 ids contain `«»`). `id` injected only if the child has none; `aria-describedby` / `aria-invalid` / `aria-required` injected only when the child prop is `undefined` (`FormField/index.tsx:86-91`). Non-element / Fragment children are rendered untouched (use `useFormField()`).
- **Deviation (additive, deliberate):** `aria-describedby` = hint + error **+ counter** id when `counter` is set, so the "12 of 100" readout is heard on focus. Over-limit is also announced once via a separate polite live region (`index.tsx:159-163`). Brief said "hint + error ids" — if the reviewer wants strict spec, drop `counterId` from `describedBy` at `index.tsx:73`.
- Error `role="alert"` only once the error value differs from its first-render value (`useAnnounceOnChange`, `index.tsx:31-38`, applied `:131`). Errors present at mount are visible + described but not announced. Error carries an icon (not colour alone).
- `required` → visible `*` (`aria-hidden`) + `.sr-only` " required" inside the label, plus `aria-required` on the child → SR reads "required" in name and state (as the brief specifies). `optional` is ignored when `required`.
- `useFormField()` returns `FormFieldContextValue | null` (null outside a FormField so controls stay usable stand-alone): `{ id, labelId, hintId, errorId, counterId, describedBy, invalid, required }`.
- **PageHeader** root is a `<div>`, not `<header>` (a `<header>` outside `<main>` becomes a second `banner` landmark). Title `h1` default, `titleAs` h1–h6.
- Secondaries: first `maxVisibleActions` (default 2) = `<Button variant="outlineSecondary" size="md">` (AGENTS "page alt action" = outlineSecondary; md chosen over sm for target size); overflow = `DropdownMenu` (controlled so `<a role="menuitem">` link items can close it). Trigger is `DropdownMenuTrigger` styled with tokens.css button classes (`PageHeader.config.ts`) because `Button` cannot be nested inside the trigger `<button>`. Visible trigger text = `moreActionsLabel` (label-in-name 2.5.3).
- ≤ 640px collapse is JS (`useMatchMedia`, local, no ui-common-hooks) → `inlineCount = 0`; SSR/no-matchMedia defaults to desktop. Primary is a single ReactNode slot — "exactly one primary" is a documented contract, not runtime-enforced.
- Hrefs go through `isSafeHref` (List) for both inline Buttons and menu links (`PageHeader/index.tsx:42-44, 89, 126`).

## Self-check evidence (QUALITY_CHECKLIST A/B/C)
**A — Accessibility**
- A1 keyboard: label click focuses control (`FormField.test.tsx` "clicking the label…"); More menu Enter/Arrow/Escape (`PageHeader.test.tsx` "supports keyboard…"), arrow nav + focus-return come from Popover (`Popover/index.tsx` DropdownMenuContent / Popover effect).
- A2 targets: PageHeader action buttons 44px on coarse pointers `PageHeader/PageHeader.css:109-113`; 34px (≥ 24px, 2.5.8) on fine pointers.
- A3 focus: inline actions + More trigger use `btn-base:focus-visible` (tokens.css:840); menu items `ds-dropdown-menu__item:focus-visible` (Popover.css). FormField adds no focusables.
- A4 contrast (computed, WCAG formula, tokens.css values):

  | Theme / bg | text-primary (label, title) | text-secondary (hint, counter, optional, description, meta) | danger-strong (error, `*`, over-limit) |
  |---|---|---|---|
  | classic page #e0e0e0 | 14.72 | 4.91 | 5.41 |
  | classic surface #fff | 19.44 | 6.48 | 7.14 |
  | mist page #ededed | 16.60 | 5.54 | 6.10 |
  | mist surface #fafafa | 18.62 | 6.21 | 6.84 |
  | dark page #111827 | 16.12 | 8.10 | 9.35 |
  | dark surface #1F2937 | 13.34 | 6.71 | 7.73 |
  Colour never sole carrier: error has icon + text (`FormField/index.tsx:131-145`), over-limit has sr text (`:151-154`), required has "*"+sr text.
- A5 forms: `<label htmlFor>` `FormField/index.tsx:107`; describedby/invalid/required injection `:86-91`; error alert-on-change `:131`; counter polite live `:160`.
- A7 overlays: More trigger `aria-haspopup="menu"` + `aria-expanded` (test "renders the primary action…").
- A10: decorative svgs `aria-hidden` (`FormField/index.tsx:135`, `PageHeader/index.tsx` MoreIcon); `Icon` without `alt` is decorative.

**B — Security**
- B1: no `dangerouslySetInnerHTML` / `innerHTML` / `eval` / `new Function` in either dir (grep clean). All slots render as React nodes.
- Hrefs: `javascript:` and tab-obfuscated `java\tscript:` dropped (`PageHeader.test.tsx` "drops unsafe hrefs").
- B3 focus: menu focus management delegated to Popover (outside-click + Escape dismiss).

**C — Responsiveness**
- C1/C4: FormField horizontal collapses at ≤ 640px `FormField/FormField.css:27-35`; all columns `minmax(0, …)` + `overflow-wrap:anywhere` → no overflow at 375px.
- C2/C7: PageHeader stacks actions under heading at ≤ 640px `PageHeader/PageHeader.css:116-129`; secondaries → menu (`PageHeader/index.tsx:77-81`, test "collapses every secondary…"); one primary stays.
- C3: tabs row `overflow-x:auto` `PageHeader.css:100-106`.
- C6: tokens only — both themes inherit; `forced-colors` mapping for danger-coloured text `FormField.css:130-136`. No animations in either component (nothing to reduce).

## Failed approaches
- `aria-label` on `DropdownMenuContent` is overridden by Popover's own `aria-labelledby={triggerId}` — removed; menu is named by the trigger text.
- `TabsList` takes `ariaLabel` (not `aria-label`) — `aria-label` fails tsc (required prop).
- `useId().replace(/:/g,"")` left `«»` in React 19 ids — now strips all non `[A-Za-z0-9_-]`.

## Artifacts
| Path | What it is | State |
|------|-----------|-------|
| src/components/molecules/FormField/FormField.types.ts | props, layout/counter/context types | final |
| src/components/molecules/FormField/FormField.config.ts | defaults, layouts, sr text | final |
| src/components/molecules/FormField/index.tsx | FormField + useFormField | final |
| src/components/molecules/FormField/FormField.css | tokens-only styles | final |
| src/components/molecules/FormField/FormField.stories.tsx | Playground + 6 stories | final |
| src/components/molecules/FormField/FormField.test.tsx | 17 tests | final |
| src/components/molecules/PageHeader/PageHeader.types.ts | props, action, titleAs | final |
| src/components/molecules/PageHeader/PageHeader.config.ts | defaults, compact query, button classes | final |
| src/components/molecules/PageHeader/index.tsx | PageHeader | final |
| src/components/molecules/PageHeader/PageHeader.css | tokens-only styles | final |
| src/components/molecules/PageHeader/PageHeader.stories.tsx | Playground + 6 stories | final |
| src/components/molecules/PageHeader/PageHeader.test.tsx | 13 tests | final |

## Barrel exports needed
```ts
export { FormField, useFormField } from "./components/molecules/FormField";
export type { FormFieldProps, FormFieldLayout, FormFieldCounter, FormFieldContextValue } from "./components/molecules/FormField";
export { PageHeader } from "./components/molecules/PageHeader";
export type { PageHeaderProps, PageHeaderAction, PageHeaderTitleAs } from "./components/molecules/PageHeader";
```

## Acceptance criteria
- Verdict covers A, B, C for both components with file:line evidence.
- `npx vitest run` green; tsc prints nothing for the two paths.
- No legacy aliases (AppShell / Avatar / Tooltip / TextInput export / variant="outlined"|"filled") — stories import `Input` from `atoms/TextInput` (dir name only).

## Open questions
- Counter in `aria-describedby` (additive vs brief) — keep or strip?
- **Defect report, not fixed (outside my slice):** `Button` with `href` does not sanitize the URL (`src/components/atoms/Button/index.tsx:215-221` renders `href` as-is), unlike `ListItem`. PageHeader guards its own hrefs; other consumers do not get that protection.
- Minor (Popover): `PopoverContent` always sets `aria-labelledby` after `...rest`, so a consumer `aria-label` on `DropdownMenuContent` is ignored silently (`src/components/molecules/Popover/index.tsx`, content div props).

## Iteration 2 (response to `_fleet/VERDICT-sprint2.md` Part 1, Slice D)
Verification: `npx vitest run` passes 462/462 across 42 files (this slice now has 22 FormField and 15 PageHeader tests, and the Combobox suite is unchanged and green). `npx tsc --noEmit -p tsconfig.json | grep -E "FormField|PageHeader|Combobox"` prints nothing.

**P1: FormField + Combobox (Combobox edit approved by the coordinator, kept minimal)**
- New opt-out marker: `FORM_FIELD_CONSUMER_KEY` (`src/components/molecules/FormField/FormField.config.ts:18`). For a child whose component type carries this flag (`index.tsx:49`), FormField skips `cloneElement` injection (`index.tsx:127`). That keeps any `id` / `aria-*` props the consumer passes to Combobox explicit.
- Combobox reads `useFormField()` (`src/components/molecules/Combobox/index.tsx:54`). Inside a field:
  - The `aria-describedby` / `aria-invalid` / `aria-required` props come out of the wrapper `rest` (`:65`) and go on the `role="combobox"` trigger. Explicit props win, otherwise field values apply (`:262-268`).
  - The trigger gets `aria-labelledby` = the field label id (`:261`).
  - The field id is applied to the trigger's DOM node in a layout effect (`:68-78`), because `PopoverTrigger` hard-sets its own `id` after `...rest`.
  - The wrapper drops a duplicate id (`:238`).
  - The flag is set at `:366`.
  - Outside a FormField, Combobox behaves exactly as before.
- Dev-only `console.warn` (`FormField/index.tsx:107-125`; the selector is at `FormField.config.ts:21`). It fires after mount when no labelable element carries the field id and no descendant has `aria-labelledby` pointing at the label.
- Tests are in `FormField.test.tsx`:
  - `:242-268`: warns for a non-labelable child, stays silent for native controls and for `useFormField` consumers.
  - `:270+`: for a Combobox, the name comes from the label, the description is hint plus error, invalid and required are set, `label.htmlFor` resolves to the combobox, the wrapper has no id or describedby, explicit aria props win, and select still works.
- The new `WithCombobox` story and the supported-children list are in the component docs and JSDoc (`index.tsx:56-63`).

**P2: PageHeader focus at the 640px crossover**
- `useMatchMedia` now takes `onBeforeChange`, which runs before the state update while focus is still on the old layout (`PageHeader/index.tsx:23-36`). It records a pending focus target (`:95-96`), and a layout effect on `compact` applies it (`:100-115`):
  - When collapsing, if focus was on an inline secondary, it moves to "More actions" (`:106`).
  - When expanding, if focus was on the trigger and the trigger unmounts, it moves to the first restored secondary (`:114`).
- Decision: when the trigger survives the expansion (actions still overflow), focus stays on it. Moving focus away from a control that still exists would be an unexpected context change. Focus anywhere else on the page is never touched.
- Tests: `PageHeader.test.tsx:198` (collapse, then expand with the trigger unmounting) and `:217` (the trigger survives, and outside focus is left alone).

**P3: error role decided in render.** `useAnnounceOnChange` is now a latching ref evaluated during render (`FormField/index.tsx:37-41`), so `role="alert"` and the new text arrive in the same commit (`:175`). The existing alert tests still pass.

**P4: counter deviation documented.** The JSDoc at `FormField/index.tsx:64-66` states that putting the counter in `aria-describedby` is intentional and goes beyond the brief.

**Visual notes from the coordinator's Chrome check at 1485px**
- **FormField horizontal widths: fixed, CSS only.** The cause was the story container: `.sb-stack` is a flex column with `align-items: flex-start`, so each FormField shrank to fit its own content. The control column therefore varied with hint length (228px vs 260px). The fix has two parts:
  - The root now has `width: 100%` (`FormField/FormField.css:5-11`).
  - In horizontal layout, the control's direct child gets `width:100%` / `max-width:100%` (`FormField.css:26-31`).
  Every row now has the same label and control tracks. Not re-measured in a browser; jsdom tests still pass (FormField 22, PageHeader 15).
- **Breadcrumb separators hugging the next item: Breadcrumb defect, not fixed (outside my slice).** In `src/components/molecules/Breadcrumb/Breadcrumb.css`, `.ds-breadcrumb__item:not(:last-child)::after` has `margin-left` + `padding-left: var(--space-1)` but no right spacing, and `.ds-breadcrumb__list` has `gap: 0`. The "/" therefore touches the following item. PageHeader adds no breadcrumb styling beyond a `min-width:0` wrapper (`PageHeader.css:14`). Suggested fix for the queue: add `margin-right: var(--space-1)` to the separator, or a `column-gap` on the list.
