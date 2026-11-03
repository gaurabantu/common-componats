# Handoff: component-author (agent E, Sprint 2) -> compliance-reviewer

- **Task:** Sprint 2 Slice E: build `FilterBar` and `DataTable` (brief `_fleet/handoffs/06-orchestrator-sprint2-brief.md`, conventions `05-orchestrator-sprint1-brief.md`)
- **Status:** ready

## Objective
Review `src/components/molecules/FilterBar/` and `src/components/molecules/DataTable/` against `_fleet/QUALITY_CHECKLIST.md` A, B and C. Return a PASS/FAIL verdict with file:line evidence for each dimension.

## Output format
Use the verdict format at the end of `_fleet/QUALITY_CHECKLIST.md`: `## Accessibility: PASS/FAIL`, `## Security: PASS/FAIL`, `## Responsiveness: PASS/FAIL`, with one `[PASS]/[FAIL] <id> — evidence (file:line)` line per checked item, then a ranked fix list. Write it to `_fleet/VERDICT-sprint2-E.md` (or the sprint verdict file the orchestrator names). Label anything optional as optional.

## Sources and tools
- Code: `src/components/molecules/FilterBar/*`, `src/components/molecules/DataTable/*`.
- Composed components (read them, do not edit): `molecules/Table/` (Table.tsx, parts/*), `molecules/Pagination/`, `molecules/Popover/`, `molecules/Combobox/`, `molecules/FeedbackStates/`, `atoms/{Select,Checkbox,Badge,Button,TextInputSearch}/`.
- Tokens: `src/design-system/tokens.css`. Classic is `:root`/blue at about line 320; dark at about 469; mist/blue-mist/green-mist at 586/610/649.
- Commands:
  - `npx vitest run src/components/molecules/FilterBar src/components/molecules/DataTable` gives 57 tests (FilterBar 21, DataTable 36).
  - `npx vitest run` was 448/448 across 42 files at handoff. The count includes the parallel D/F slices.
  - `npx tsc --noEmit -p tsconfig.json 2>&1 | grep -E "FilterBar|DataTable"` prints nothing. The 5 remaining tsc errors are pre-existing, in `useRipple.tsx` and `src/stories/molecules/FeedbackState*.stories.tsx`.
- Contrast script: `/private/tmp/claude-501/-Users-gaurabkumar-Documents-my-code-common-componant-main/0c33ed4c-4f8f-4a6e-aa70-65b6626f7eea/scratchpad/contrast.py` (WCAG relative luminance; `color-mix(in srgb, A p%, B)` = per channel `A*p + B*(1-p)`).
- Storybook: `Design System/Molecules/FilterBar` and `Design System/Molecules/DataTable`. Use viewports `mobile375`, tablet and Desktop 1440.

## Boundaries
- Out of scope: fixing `Table`, `Popover`, `Combobox`, `Select`, `InputSearch` or any Sprint 1 component. Their defects are listed under "Defects found in composed components". Route them to their owners; they do not block this slice unless you judge they make a Slice E item fail.
- Not done here: wiring `src/index.tsx`. The orchestrator does that with the lines below. Also not done: `npm run build`, edits to `.storybook/`, `dist/`, `package.json`, `src/portal/`.
- Stop condition: verdict written. Do not refactor the slice yourself. Send FAILs back to component-author with file:line.

## Context digest
- **DataTable passes `Table` through instead of re-implementing it.** `DataTableProps` = `Omit<TableProps, managed keys>` plus its own props (`DataTable.types.ts`, `DataTableManagedTableProps`). Striped, compact, stickyHeader, expandable, onRowClick, size, variant, theme and the rest go straight through. Table always gets `searchable={false}` and `pagination={false}` (DataTable/index.tsx:420-437). FilterBar and Pagination replace those features.
- **Client sort across pages (deliberate coupling).** Table has no controlled sort, so slicing data per page would sort only the current page. DataTable mirrors Table's header state machine (asc, desc, none) by listening to clicks and Enter/Space on header cells (index.tsx:150-166). It pre-sorts the full filtered set with a copy of Table's comparator (`DataTable.utils.ts` `compareValues` / `sortRows` / `nextSortDirection`). Table's re-sort of the slice is stable, so the order does not change. The test "sorts across all pages" proves it (row 99 lives on page 2 unsorted and comes first under desc). In server mode the same mirror drives `onSortChange` so the consumer can re-fetch. Table still re-sorts the current page locally there.
- **Selection across pages.** Table only knows the page slice, and its header select-all replaces the selection. `mergePageSelection` (DataTable.utils.ts:97) keeps off-page keys and takes on-page membership from Table. Rows resolve from a cache of every row seen (index.tsx:201-207), so server-mode selections on other pages still reach `bulkActions[].onClick(rows, { clearSelection })`.
- **Caption.** `caption` is required. Table has no caption/aria-label prop and hard-codes `aria-label="Data table"` on its scroll region (Table.tsx:388). DataTable sets `aria-labelledby` = caption id on that region and on `<table>` in a layout effect (index.tsx:237-243). `aria-labelledby` wins in accessible-name computation. This sets an attribute only; no content is injected.
- **Skeleton: deviation from the brief, on purpose.** Loading uses Table's own `loading` + `loadingVariant="skeleton"` (index.tsx:431-434). Its skeleton rows are `aria-hidden`, the header stays and it respects reduced motion. The brief also says "pass through its props instead of duplicating features". Placeholder rows built from the `Skeleton` atom would be exposed to assistive tech as empty rows. So `Skeleton` is not imported directly. Table's `.table-skeleton-line` duplicating the atom is listed as a Table defect.
- **FilterBar overflow panel uses checkbox groups, not Combobox, for `multi` filters.** Combobox portals its list to `<body>`. The outer Popover's outside-mousedown handler would then close the panel on every option click (FilterBar/index.tsx:222-224 comment). Inline `multi` filters still use `Combobox multiple`.
- **Select focus.** Every `Select` passes `animatedChevron={false}` (FilterBar/index.tsx:194), as the orchestrator instructed. The test "select filter change … keeping focus" asserts focus stays on the select.
- **CSV.** `escapeCsvCell` (DataTable.utils.ts:132):
  - Formula guard: prefixes `'` when a cell starts with `= + - @`, TAB, CR or their full-width forms (U+FF1D/FF0B/FF0D/FF20). The guard runs before RFC-4180 quoting.
  - Quoting: a cell is quoted when it contains `"`, `,`, CR or LF, and inner quotes are doubled. Records end in CRLF.
  - Real JS numbers are never prefixed (`-5` stays `-5`). Numeric strings are prefixed, which is the OWASP-recommended behaviour.
  - Headers are guarded too.
  - Filename is sanitized (`sanitizeCsvFilename`: path separators, reserved and control chars become `_`, `.csv` is appended).
  - Download uses a Blob URL with a UTF-8 BOM, then revokes the URL. With `exportCsv.onExport` the consumer gets the CSV string instead.
  - Rows exported: client mode = every filtered and sorted row (all pages); server mode = `data`. Columns = visible and `exportable !== false`.

## Self-check (QUALITY_CHECKLIST A/B/C) with evidence
**A. Accessibility**
- A1 keyboard:
  - Search, Select, Combobox, the More filters trigger, chip dismiss buttons and Clear all are all native buttons/inputs.
  - Sorting works from the keyboard. Test "sorts from the keyboard (Enter on a focused header)" covers it; the mirror is at DataTable/index.tsx:150 plus the onKeyDown at line 416.
  - Popovers close on Escape (FilterBar test "Escape closes the popover"). Focus returns to the trigger (test "closes with Done, returning focus").
- A1 focus after removal:
  - Chip dismiss moves focus to the next chip, then the previous chip, then search (FilterBar/index.tsx:145-158).
  - Clear all focuses search (FilterBar/index.tsx:165-172).
  - Bulk "Clear" focuses the select-all checkbox (DataTable/index.tsx:224-229).
  - All three have tests.
- A2 targets:
  - Own triggers have `min-height: --button-height-lg` (38px) and switch to `--size-touch-target` (44px) under `pointer: coarse` (FilterBar.css:212-216, DataTable.css:157-161).
  - Badge dismiss is 44px (Badge.css:204-205).
  - Gaps between chips and between toolbar items are `--space-1` (8px) (FilterBar.css:173-176).
  - Buttons use `size="md"`.
- A3 focus: own `:focus-visible` rings at FilterBar.css:89-92 and DataTable.css:61-64 use `color-mix(focus-ring 60%, text-primary)` (FilterBar.css:5, DataTable.css:5), the same workaround as slice 05a. Ring numbers are in the contrast table.
- A4 contrast: see the table below. Colour is never the only signal: chips carry "Label: Value" text, the overflow count is also exposed as text (", 2 active"), and the bulk bar is text.
- A5 labels:
  - Search label "Search" comes through InputSearch's `ariaLabel`.
  - Select gets `aria-label={f.label}`, or a visible `<label>` with `showLabels`.
  - Combobox trigger name = placeholder = label.
  - Overflow `multi` filters are `<fieldset><legend>`, and so is the column menu ("Show columns").
  - Tests query every control by role and name.
- A5 / A10 live regions (polite, always mounted, so only changes are announced):
  - FilterBar result count (FilterBar/index.tsx:342).
  - DataTable loading and selection status (DataTable/index.tsx:398).
  - EmptyState role=status. ErrorState role=alert when `onRetry` is set.
- A6 tables: Table renders `th scope="col"` and `aria-sort`. The caption names the table and region (test "names the table and its scroll region with the caption").
- A7 overlays: PopoverTrigger has `aria-haspopup="dialog"` and `aria-expanded` (tests assert both). Content is `role="dialog"`, labelled by the trigger.
- A9 motion: `prefers-reduced-motion` turns off transitions (FilterBar.css:218, DataTable.css:163). Table's skeleton pulse respects it (Table.css:419).
- `forced-colors` blocks: FilterBar.css:224, DataTable.css:169.

**B. Security**
- B1: no `dangerouslySetInnerHTML` or `innerHTML`. All strings render as text nodes. Only `setAttribute("aria-labelledby", id)` with a `useId` value (DataTable/index.tsx:241-242).
- B4: no `eval` or `new Function`. No new dependencies. No `ui-common-hooks` import; `useMediaQuery` is local (FilterBar/index.tsx:27-42).
- B5: no inline handlers. The only inline style is `display:none` on the transient download anchor (DataTable.utils.ts:158-172). No `window.location` or cookie access.
- CSV injection: covered under CSV in the digest. Tests "guards formula injection…", "escapeCsvCell", "toCsv guards headers", "sanitizeCsvFilename".
- B7: stories use fictional data (`@example.com`).

**C. Responsiveness**
- At ≤ 768px FilterBar collapses every filter into the "Filters" popover (matchMedia, FilterBar/index.tsx:81 and 182-183) and search goes full width (FilterBar.css:201-210). The panel width is `min(5×space-8, 100vw - space-2)`.
- At ≤ 640px the bulk actions wrap to their own line (DataTable.css:150-155).
- Table keeps its horizontal scroll wrapper, and Pagination collapses at ≤ 480px (its own behaviour).
- Every container sets `min-width: 0` with `flex-wrap`. No fixed widths.
- **MISSING:** visual check in a real browser at 375/768/1440 and in dark theme. Tried: no browser or Storybook run in this session (tests run in jsdom only). Please verify with the `Mobile` stories and the theme toolbar.

### Contrast (computed from tokens.css)
| Pair | classic | dark | mist | blue-mist | green-mist |
|---|---|---|---|---|---|
| trigger/caption text `text-primary` on `bg-surface` | 19.44 | 13.34 | 18.62 | 18.62 | 18.62 |
| hover / bulk-bar text `text-primary` on `fill-muted` | 17.83 | 9.37 | 14.72 | 14.72 | 14.72 |
| result count `text-secondary` on surface / page | 6.48 / 4.91 | 6.71 / 8.10 | 6.21 / 5.54 | same as mist | same as mist |
| bulk "·" separator (aria-hidden) `text-secondary` on `fill-muted` | 5.95 | 4.71 | 4.91 | 4.91 | 4.91 |
| overflow count bubble `bg-surface` on `text-primary` | 19.44 | 13.34 | 18.62 | 18.62 | 18.62 |
| focus ring `mix(ring 60%, text-primary)` on surface / page / elevated / fill-muted | 10.01 / 7.58 / 10.01 / 9.18 | 5.25 / 6.35 / 5.25 / 3.69 | 9.59 / 8.55 / 10.01 / 7.58 | 9.74 / 8.68 / 10.16 / 7.70 | 5.36 / 4.78 / 5.60 / 4.24 |
| raw `--color-focus-ring` on surface (for reference) | 5.57 | **2.64** | 5.33 | 5.46 | **2.33** |
| trigger border `border-default` on surface / page | 3.45 / **2.62** | 3.38 / 4.08 | 3.31 / **2.95** | same as mist | same as mist |

Trigger border on the *page* background is below 3:1 in the light themes. The triggers keep a visible text label and icon, so SC 1.4.11 does not need the boundary to identify the control. On a card or surface the border passes. This is the repo-wide `border-default` issue already escalated in `_fleet/VERDICT-portal.md`. The bulk-bar border is decorative and uses `border-default`, because `border-strong` is not remapped in dark (it would be 1.89:1).

## Defects found in composed components (not edited; report to owners)
1. **Table: no caption or name prop.** The scroll region hard-codes `aria-label="Data table"` (Table.tsx:384-389), which gives duplicate landmark names on multi-table pages. The region also has no `tabIndex=0`, so keyboard users cannot scroll a horizontally overflowing table (axe `scrollable-region-focusable`, WCAG 2.1.1). DataTable works around the name only.
2. **Table: no controlled sort** (`sortState` / `defaultSort` / `onSortChange`) (Table.tsx:98, 159-170). DataTable mirrors the state machine. If Table's cycle (Table.tsx:163-167) or `defaultSorter` (Table.tsx:39-53) changes, `DataTable.utils.ts` must change with it. A controlled sort API would let the mirror be deleted.
3. **Table: header select-all has no indeterminate state** (parts/TableHeader.tsx:33-40), even though Checkbox now supports `indeterminate`. Also, `handleSelectRow` resolves `rows` from the current `data` only (Table.tsx:183), so rows on other pages are dropped from the callback.
4. **Table: skeleton rows re-implement the Skeleton atom** (`.table-skeleton-line`, Table.tsx:285-294).
5. **Table: focus rings use `--button-primary-focus-ring` / `--color-brand-primary`, not `--color-focus-ring`** (Table.css:338, 370, 505). Rows show `cursor: pointer` whenever `hover` is set, even without `onRowClick` (parts/TableRow.tsx:46).
6. **Popover: nested popovers close their parent.** A portalled child (for example Combobox inside PopoverContent) counts as an outside mousedown (Popover/index.tsx, `onDocMouse` in PopoverContent).
7. **Combobox: no arrow-key navigation in the listbox.** Options are Tab-reachable buttons, which does not follow the ARIA APG combobox/listbox pattern (Combobox/index.tsx `renderOptionRow`).
8. **InputSearch: defaults `id="search"`** (TextInputSearch/index.tsx, props default), which duplicates IDs when two instances omit `id`. FilterBar always passes a `useId` id.
9. **Select blurs on change** unless `animatedChevron={false}` (atoms/Select/index.tsx handleChange). Already escalated in 05c. Worked around here.

## Failed approaches
- First design sliced pages before Table without a sort mirror. That sorted only the visible page (wrong under client paging), so it was replaced by the mirror and pre-sort.
- Considered `DropdownMenu` for the column menu. `DropdownMenuItem` closes the menu on every select and has no checkbox-item role, so it moved to Popover + fieldset of Checkbox.
- Considered Combobox inside the overflow popover. It was rejected because of Popover defect 6.
- Test fixes only (no product changes): a selector that matched both label and placeholder, and the CSV newline expectation (an embedded LF stays inside a quoted cell).

## Artifacts
| Path | What it is | State |
|------|-----------|-------|
| src/components/molecules/FilterBar/FilterBar.types.ts | Props, filter/value/labels types | final |
| src/components/molecules/FilterBar/FilterBar.config.ts | Defaults, collapse query, i18n labels | final |
| src/components/molecules/FilterBar/FilterBar.utils.ts | Pure value/chip helpers | final |
| src/components/molecules/FilterBar/index.tsx | Component (forwardRef, displayName) | final |
| src/components/molecules/FilterBar/FilterBar.css | Token-only styles | final |
| src/components/molecules/FilterBar/FilterBar.stories.tsx | Playground + 5 stories | final |
| src/components/molecules/FilterBar/FilterBar.test.tsx | 21 tests | final |
| src/components/molecules/DataTable/DataTable.types.ts | Props incl. Table pass-through | final |
| src/components/molecules/DataTable/DataTable.config.ts | Defaults, i18n labels | final |
| src/components/molecules/DataTable/DataTable.utils.ts | Filter, sort mirror, selection merge, CSV | final |
| src/components/molecules/DataTable/index.tsx | Component (generic forwardRef, displayName) | final |
| src/components/molecules/DataTable/DataTable.css | Token-only styles | final |
| src/components/molecules/DataTable/DataTable.stories.tsx | Playground + 8 stories (client, server sim, loading, empty, no results, error, persisted columns, mobile) | final |
| src/components/molecules/DataTable/DataTable.test.tsx | 36 tests | final |

## Barrel exports needed
Add to `src/index.tsx` (orchestrator):
```ts
export { default as FilterBar } from "./components/molecules/FilterBar";
export type {
  FilterBarProps,
  FilterBarFilter,
  FilterBarFilterType,
  FilterBarFilterValue,
  FilterBarOption,
  FilterBarValue,
  FilterBarLabels,
} from "./components/molecules/FilterBar";

export { default as DataTable, toCsv, escapeCsvCell } from "./components/molecules/DataTable";
export type {
  DataTableProps,
  DataTableColumn,
  DataTableRow,
  DataTableServerPagination,
  DataTableSort,
  DataTableSortDirection,
  DataTableBulkAction,
  DataTableBulkActionHelpers,
  DataTableError,
  DataTableExportOptions,
  DataTableFilterBarProps,
  DataTableLabels,
} from "./components/molecules/DataTable";
```
No conflict: `src/index.tsx` has no `DataTable` or `FilterBar` export today (checked with grep). `Table/index.tsx` uses `DataTable` only as a local import name and does not export it.

## Acceptance criteria
- A, B and C each PASS, or each FAIL has file:line and a fix, in the verdict file.
- `npx vitest run` is green and `tsc` prints nothing for the two paths.
- Grep shows no legacy alias, hex, `dangerouslySetInnerHTML`, `eval` or `ui-common-hooks` in the two directories. Pixel values appear only inside `@media` queries and comments.

## Open questions
- ~~Is the Table sort mirror acceptable as an interim?~~ **Resolved (orchestrator):** accepted for now. See the backlog note in Iteration 1b.
- ~~Should selection be cleared when filters change?~~ **Resolved (orchestrator):** yes. Implemented in Iteration 1b.
- Is using Table's built-in skeleton instead of importing `Skeleton` acceptable? See the Context digest.

## Iteration 1b (pre-review)
Trigger: the orchestrator's real-browser sweep (Chrome, 375px iframe). `design-system-molecules-datatable--persisted-columns` had document scrollWidth 467. The table's intrinsic width widened the DataTable root, the caption and the toolbar. Root cause: `.sb-stack` is `flex-direction: column; align-items: flex-start`, so the root shrink-wrapped to the table's min-content width. Table's own `overflow-x` wrapper never got narrower than the table.

Changes:
- **Overflow containment** (DataTable.css):
  - Root: `min-width: 0; max-width: 100%; align-self: stretch` (lines 3-13).
  - Caption: `min-width: 0; max-width: 100%; overflow-wrap: anywhere`, so the text wraps (about 22-26).
  - Toolbar (about 36), bulk bar (about 119), the FilterBar child and pagination: `max-width: 100%`.
- **Keyboard-reachable scroll region:**
  - `.ds-data-table__table` is now the horizontal scroller: `overflow-x: auto; max-width: 100%` (DataTable.css:147-153).
  - Its focus ring is `:focus-visible` with the `--ds-data-table-ring` color-mix ring (DataTable.css:159-162; forced-colors at about 204).
  - Markup: `role="region"`, `aria-labelledby={captionId}` (name = caption text), `tabIndex={0}` (DataTable/index.tsx:434-436).
  - The layout effect now demotes Table's unreachable inner region (`role="presentation"`, removes its hard-coded `aria-label="Data table"`), so there is exactly one landmark named by the caption. `<table>` keeps `aria-labelledby` = caption.
  - This works around Table defect 1. It does not fix it: Table used without DataTable is still unreachable.
- **Selection clears on filter/search change:**
  - `handleFilterChange` (DataTable/index.tsx:109-117) clears the selection when it is non-empty and puts "Selection cleared" (`labels.selectionStatus(0)`) into the existing always-mounted polite region.
  - The note is wiped the next time rows are selected.
  - It covers FilterBar selects, combobox, overflow panel, debounced search, Clear all, chip dismiss and the EmptyState "Clear filters". All of these go through `handleFilterChange`.
  - Not covered: a parent changing a controlled `filterBar.value` programmatically without a FilterBar interaction.
  - New prop `preserveSelectionOnFilter?: boolean`, default `false` (DataTable.types.ts, index.tsx:74).
- **Tests (+3, DataTable now 39):**
  - "wraps the table in one keyboard-reachable scroll region named by the caption": exactly one `region`, named "Customers", `tabindex="0"`, contains the table, focusable.
  - "clears the selection when filters or search change and announces it": covers both the select filter and search.
  - "keeps the selection with preserveSelectionOnFilter".
- **Scroll owner (refined in round 2):**
  - By default `.ds-data-table__table` (`data-scroll-owner="self"`) is the only scroller. Table's clipping `.table-wrapper` is set to `width: fit-content; min-width: 100%` (DataTable.css, the `[data-scroll-owner="self"] > .table-wrapper` rule). Its inner `overflow-x` wrapper therefore never overflows, and arrow keys on the focused region actually scroll it.
  - With `scroll.y`, Table has to scroll vertically itself. In that case Table's `.table-scroll-wrapper` stays the single region: the layout effect gives it `aria-labelledby` = caption and `tabindex="0"` plus a focus ring (`.ds-data-table__inner-scroll`), and our wrapper drops role and tabindex.
  - New test: "with scroll.y, Table's own scroller becomes the single focusable, named region".

### Iteration 1b, round 2 (coordinator's 1485px Chrome check)
1. **FilterBar row broke (Status above Plan).** The cause was my flex rules, not the Select atom. `.ds-filter-bar__filters` was a nested wrapping flex container, and Chrome sized its intrinsic width to the sum of its children's min-widths (measured 264px), so the second control wrapped. Fixes:
   - `.ds-filter-bar__filters { display: contents }` (FilterBar.css, comment above the rule). Search, controls, the More trigger and `extra` are now items of one `align-items: flex-end` row.
   - Root `align-self: stretch; max-width: 100%` so it fills `sb-stack`-style `align-items: flex-start` parents.
   - Toolbar buttons (Export, bulk-bar buttons, story `extra` buttons) moved to `size="lg"` (38px), matching search, Select and Combobox (`--button-height-lg`).
   - Measured at 1485: search (16,56,384×38), Status (408,56,192×38), Plan (608,56,192×38), `extra` at y=56 h=38, all one row. The FilterBar Playground shows three filters in one row.
2. **Bulk bar layout shift.** A `.ds-data-table__bulk-slot` is always mounted when `selectable`. Its fixed height is `--ds-data-table-bulk-height` (target + 2×space-0 + 2×border). Details:
   - While nothing is selected it shows a hint, "Select rows to apply bulk actions" (`labels.bulkHint`, text-secondary, ≥ 4.91:1).
   - The bar never wraps (`flex-wrap: nowrap; overflow-x: auto` inside the bar), so its height cannot change. The old ≤ 640px wrap rule was removed.
   - Measured in Chrome by clicking 3 checkboxes at their on-screen centres: first-row top stayed at 252px after each click (252/252/252) and 3 rows were checked.
   - Tests: "keeps the bulk-bar slot mounted (same node) before and after selecting" (also clicks 3 rows), and "does not render the slot when not selectable".
3. **Select-all partial state.** The layout effect sets `.indeterminate` plus `data-indeterminate="true"` on Table's header input when `selection.length > 0` and the current page is not fully selected. That includes "selected only on other pages". The DOM property exposes `mixed`; the Checkbox atom draws its dash from the data attribute. It is re-applied every render because Checkbox resets the property in its own child layout effect.
   - Chrome: `indeterminate: true`, and the dash is visible in the screenshot.
   - Test: "marks select-all indeterminate for a partial selection" covers partial, full page, off-page and cleared states, and uses `toBePartiallyChecked`.
   - Caveat: this is still an attribute patch on Table's DOM. A Table `indeterminate` header prop is on the backlog.
- **Verification (real browser).** I built Storybook into the scratchpad (not `dist/`), served it locally, and drove it with headless Chrome over CDP (`scratchpad/tools/cdp.mjs`).
  - At 375px, document `scrollWidth` = 375 (no page overflow) on `--persisted-columns`, `--mobile`, `--playground` and `--client-mode`. Caption right edge 359. The table scrolls inside the region (scrollWidth 451-763 vs 343 client width). Region focused, `tabindex=0`, exactly 1 region.
  - At 1485px, the FilterBar is one row, as above.
- Tests: slice 64/64 (FilterBar 21, DataTable 43). Full `npx vitest run` 460/460 across 42 files. tsc prints nothing for FilterBar/DataTable.

### Backlog (for Table's owner)
- **Table: controlled sort prop** (`sortState` / `defaultSort` / `onSortChange`). Once it exists, delete DataTable's sort mirror (`DataTable.utils.ts` `compareValues` / `sortRows` / `nextSortDirection`, and `handleHeaderActivation` in index.tsx).
- Table: `caption` / `aria-label` prop, and a focusable (`tabIndex=0`) scroll region (defect 1). Then remove DataTable's region demotion / promotion in the layout effect.
- Table: header select-all `indeterminate` (defect 3). Then remove DataTable's `data-indeterminate` patch.

## Iteration 2
Trigger: `_fleet/VERDICT-sprint2.md` Part 2 (A11y FAIL, Security FAIL, Responsiveness PASS). Fixes in ranked order, in slice E folders only.

**P2**
1. **CSV `;` bypass (security).**
   - `hasFormulaTrigger` (`DataTable/DataTable.utils.ts:136`) flags a cell when the whole text starts with a trigger, or when any `;`- or full-width `；`-separated segment starts with one after optional whitespace (`SEGMENT_TRIGGER`, :129). Triggers are `= + - @`, TAB, CR and the full-width `＝ ＋ － ＠`.
   - When that fires, `escapeCsvCell` (:147) prefixes the whole cell with `'`. It also now quotes any cell that contains `;`, so semicolon-delimited locales keep the cell whole.
   - `escapeCsvCell("x;=cmd|' /C calc'!A0")` returns `"'x;=cmd|' /C calc'!A0"`. Plain `red; green` is quoted but not prefixed.
   - Tests: "guards formulas hidden behind ;…", 10 cases including full-width.
2. **JSX headers (functional).**
   - New column option `csvHeader?: string` (`DataTable.types.ts:14`).
   - `csvHeaderText` (`DataTable.utils.ts:157`) uses `csvHeader`, else `header` when it is a string or number, else the column `key`. It never emits element JSON.
   - Test: "exports JSX headers as csvHeader or the column key…".
3. **Stale "Selection cleared" (A10).**
   - The note is one-shot. `raiseSelectionNote` (`DataTable/index.tsx:226`) resets two refs, `noteSeen` and `noteConsumed` (:224-240).
   - Once the note has been in the live region, any load marks it consumed, and it is not shown again when the load ends. The state is then dropped (:244), and a 1500 ms fallback timer also clears it (`SELECTION_NOTE_MS`, :41).
   - A load that starts in the same batch shows "Selection cleared. Loading…" once.
   - Tests:
     - The server-mode sequence, filter → loading → loaded → page 2 loading → loaded, gives exactly `["Selection cleared", "Loading…", "", "Loading…", ""]`.
     - The same-batch load.
     - The timer fallback.
4. **FilterBar focus across 768px (A1/A3).**
   - The root records the last focus inside the bar (`trackFocus` / `trackBlur`, `FilterBar/index.tsx:187-202`), as either a `[data-filter-id]` control (:251) or the trigger (`triggerRef`, :183).
   - A layout effect on `narrow` (:204) handles both directions:
     - On collapse, if a focused inline filter was unmounted, focus goes to the "Filters" trigger.
     - On expand, if focus was on the trigger, or lost with it, focus goes back to the original filter control, or to the first one.
   - Focus outside the filters (for example search) is left alone.
   - Tests: Select restore, Combobox restore, focus outside untouched. They use a live matchMedia mock.

**P3**
5. **Multi filters show "Region: All".**
   - Combobox always gets `label={f.label}` (`FilterBar/index.tsx:258`) and placeholder `` `${label}: All` `` (:259).
   - The label is visually hidden unless `showLabels` (`data-show-labels`, :312; `FilterBar.css:52`).
   - The accessible name is the label through `aria-labelledby`. The trigger has no `aria-label`, so the name never becomes the placeholder.
   - Test: "multi filters read '{label}: All' while the accessible name stays the label".
6. **Dev-only markup warning.**
   - `findMissingTableMarkup` (`DataTable.utils.ts:212`) checks `.table-wrapper` and `.table-scroll-wrapper`. When there are rows it also checks `table thead th`, plus the select-all input when `selectable`.
   - DataTable warns once with `console.warn` when the check fails and `process.env.NODE_ENV !== "production"` (`index.tsx:43, 328-338`).
   - Test: the util reports missing selectors, and the current Table produces no warning.
7. **Count and filename.**
   - The FilterBar result count keeps the last settled count while loading (`lastResultCount`, `index.tsx:421, 454`). Test: 42 → loading 42 → 42.
   - `sanitizeCsvFilename` strips U+202A–U+202E and U+2066–U+2069 (`DataTable.utils.ts:177-179`). Test: `invoice‮fdp.csv` → `invoicefdp.csv`.
8. **Comments.** `FilterBar.css:4` and `DataTable.css:4` now read "Follows --color-focus-ring (≥ 3:1 in every theme)".

**Verification**
- Slice tests 75/75 (FilterBar 25, DataTable 50). Full `npx vitest run` 473/473 across 42 files. tsc prints nothing for FilterBar/DataTable.
- Headless Chrome on a scratchpad Storybook build (not `dist/`):
  - 1485px: search, "Status: All" and "Plan: All" sit on one 38px row.
  - 375px: page scrollWidth 375 on `--persisted-columns` and `--playground`, and the table scrolls inside the focused region.
  - Three consecutive checkbox clicks: rows stay at top 252/252/252, 3 rows are checked, and select-all is indeterminate.

## Iteration 3
Trigger: `_fleet/VERDICT-sprint2.md` Part 2, iteration 2. The P2 was that the `;` CSV guard only protected the first column. In a `;` locale, a later cell's opening quote is not at the start of its field (`Alice,"'x;=cmd…"`), so the split field `=cmd|' /C calc'!A0"` is a formula.

**Fix** (`src/components/molecules/DataTable/DataTable.utils.ts`):
- `SEPARATED_TRIGGER` (:133) is `/([;；])(?=[\s"]*[=+\-@\t\r＝＋－＠])/g`. `neutralizeSeparatedTriggers` (:141) inserts `'` directly after every `;` or `；` that is followed by a trigger. The lookahead skips any whitespace or quote characters in between. The split field therefore always starts with `'`, whatever column the cell is in.
- `escapeCsvCell` (:153) is now three steps:
  1. A leading trigger gets a `'` prefix. `hasFormulaTrigger` (:136) is back to checking only the start of the cell.
  2. The separator guard runs.
  3. RFC 4180 quoting runs, for `"`, `,`, `;`, CR and LF.
- Real numbers are untouched and the comma-locale output keeps its shape. Example: `"x;'=cmd|' /C calc'!A0",Alice,-5`.
- This replaces the Iteration 2 whole-cell prefix: `x;=cmd…` is now `x;'=cmd…`, not `'x;=cmd…`.

**Test** ("no field of the full toCsv output starts with a trigger when split by a ; locale", `DataTable.test.tsx:515`):
- Builds CSV with `toCsv` from these repros, each placed in the first and in a non-first column, plus a header that contains `a;=HEADER`:
  - `x;=cmd|' /C calc'!A0`
  - `a;=1+1`
  - `a;＝1+1`
  - `a;+1`
  - `a;@SUM(1)`
  - `a; -2+3`
  - `a;\t=1`
  - `a;"=1"`
  - `=1+1`
  - `@SUM(1)`
- Splits each line with a `;` splitter that honours quotes only at field start.
- Asserts that no field, raw or `trimStart()`-ed, matches a trigger.
- Also asserts the exact comma-locale lines, so numbers stay unprefixed.
- Iteration 2 unit expectations were updated to the new output.

**Verification:** DataTable 51/51, full `npx vitest run` 474/474 across 42 files, tsc prints nothing for FilterBar/DataTable.
