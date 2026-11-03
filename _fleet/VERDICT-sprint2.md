# Compliance verdict — Sprint 2 (page patterns)

- **Reviewer:** compliance-reviewer (read-only; this file and the LEDGER row are the only writes)
- **Date:** 2026-11-03
- **Brief:** `_fleet/handoffs/06-orchestrator-sprint2-brief.md`, plus the slice handoffs `06d` (FormField, PageHeader) and `06f` (Tooltip), plus the user-requested token changes in `src/design-system/tokens.css`
- **FINAL (2026-11-03):** Slice D **PASS / PASS / PASS** (iteration 2), slice E **PASS / PASS / PASS** (iteration 3), slice F PASS and tokens PASS (Part 1) → **Sprint 2 ships.** Only P3 follow-ups remain; see "Final round".
- **Part 1 result (D, F, tokens):** Accessibility **FAIL** · Security **PASS** · Responsiveness **PASS** → slice D goes back to component-author (2 fixes). Slice F and the tokens pass.
- **Part 2 iteration 2 result (slice E, current):** Accessibility **PASS** · Security **FAIL** (the CSV `;` guard still fails in non-first columns) · Responsiveness **PASS** → back to component-author slice E for one P2 fix (iteration 3 of 3).
- **Part 2 iteration 1 result:** Accessibility **FAIL** · Security **FAIL** · Responsiveness **PASS** → slice E goes back to component-author (2 × P2 a11y, 1 × P2 security, 1 × P2 functional, plus P3 tidy-ups).

# Final round — slice D iteration 2, slice E iteration 3, Breadcrumb change (2026-11-03)

**Evidence**
- `npx vitest run`: **474 passed / 42 files**.
- Scratch harness, 43 cases:
  - every Combobox and Breadcrumb story;
  - Combobox inside and outside FormField, open and closed;
  - the D wiring and focus probes;
  - the full-line CSV locale simulation.
- **axe: 0 violations.**

## Slice E (iteration 3): Accessibility PASS · Security PASS · Responsiveness PASS
- [PASS] **CSV `;` bypass closed in every column.** `neutralizeSeparatedTriggers` (`src/components/molecules/DataTable/DataTable.utils.ts:133-145`) inserts `'` after every `;`/`；` that precedes a trigger, on top of the leading-character guard (`:153`). My full-line simulation (payload in column 2, RFC parse with `;` delimiter and quotes honoured only at field start) now gives a safe field for every repro:

  | Payload | `;`-locale field | Result |
  |---|---|---|
  | `x;=cmd\|' /C calc'!A0` | `'=cmd\|' /C calc'!A0"` | ok |
  | `a;=1+1` | `'=1+1"` | ok |
  | `a; =1+1` | `' =1+1"` | ok |
  | `a;＝1+1` | `'＝1+1"` | ok |
  | `a;+1` | `'+1"` | ok |
  | `a;@SUM(1)` | `'@SUM(1)"` | ok |
  | `a；=1+1` | `a；'=1+1` | ok |
  | `=1+1` | `'=1+1` | ok |

  In the comma locale, numbers stay unprefixed. `red; green` is quoted only. The producer's full-line test at `DataTable.test.tsx:515` is the right tripwire. Iteration-2 items are unchanged and still pass.
- **Output-change note (accepted):** `x;=cmd…` now exports as `x;'=cmd…` rather than `'x;=cmd…`. That is a visible apostrophe inside the cell text, which is the standard OWASP trade-off. Mention it in the DataTable docs.

## Slice D (iteration 2): Accessibility PASS · Security PASS · Responsiveness PASS
- [PASS] P1 FormField + Combobox:
  - `label for` resolves to the `role="combobox"` trigger. The trigger has `aria-labelledby` = field label, `aria-describedby` = hint + error, and `aria-invalid` / `aria-required` are set (harness: `WIRE Combobox | label-for resolves to: BUTTON combobox | … aria-labelledby=form-field-…-label`).
  - Explicit props still win (`src/components/molecules/Combobox/index.tsx:54-78,238,261-268`).
  - FormField skips cloneElement for `FORM_FIELD_CONSUMER_KEY` children (`FormField/index.tsx:49,127`).
  - The dev warning covers non-labelable children (`:107-125`).
  - Input, TextArea, Select and native controls remain correctly wired.
- [PASS] **No regression to Combobox outside FormField:**
  - The trigger keeps its own `popover-trigger-…` id and its placeholder `aria-label`.
  - `aria-describedby` passed by a consumer still lands on the wrapper, exactly as before (harness).
  - No broken IDREFs when open; axe is clean on every Combobox story; the Combobox suite is green.
- [PASS] P2 PageHeader focus at 640px: collapse → "More actions" (harness `PHFOCUS → BUTTON More actions`). Expand → first restored secondary when the trigger unmounts, and focus stays on the trigger when it survives (`PageHeader/index.tsx:23-36,95-115`; tests `PageHeader.test.tsx:198,217`).
- [PASS] P3 Error role latched in render (`FormField/index.tsx:37-41,175`); counter deviation documented (`:64-66`).
- [PASS] Horizontal FormField widths: `width:100%` on the root plus a full-width control child (`FormField.css:5-11,25-31`). This is CSS only, so no overflow risk at 375px (`min-width:0` stays and the ≤ 640px collapse is unchanged).
- [P3 follow-ups — not blocking]
  1. **Invalid IDREF inside FormField while the Combobox is open.** The layout effect rewrites the trigger's DOM id (`Combobox/index.tsx:68-78`), but `PopoverContent` still points `aria-labelledby` at the old `popover-trigger-…` id (`Popover/index.tsx:238`). Harness, open state: `DIV[aria-labelledby=popover-trigger-«r2»]` doesn't resolve. That element is `role="none"` (`Combobox/index.tsx:298`), so there is no AT impact today, but it is invalid markup and would become a real defect if the content role ever changes. Fix: let `PopoverTrigger` accept an `id` override, or point the content's `aria-labelledby` at the current trigger id.
  2. Inside a FormField the listbox is still named "Options" (`Combobox/index.tsx:329,346`). Use `aria-labelledby={field.labelId}` when there's no own `label`.
  3. `Combobox` now imports `../FormField` (index), so every Combobox consumer side-loads `FormField.css`. The selectors are scoped, so there is no visual effect; DataTable avoided the same pattern for `List`. Consider moving the context and hook into a CSS-free `FormField.context.ts`.

## Breadcrumb separator change (coordinator): PASS
- [PASS] `margin-left` and `margin-right` are both `var(--space-1)` (`src/components/molecules/Breadcrumb/Breadcrumb.css:37-45`). Contrast is unchanged: the separator is `--color-text-secondary`, ≥ 4.91:1 on every page and surface in all 7 themes. **RTL:** the spacing is symmetric, so physical `margin-left/right` mirror correctly with no logical-property gap. axe is clean on all Breadcrumb stories.
- [OPTIONAL, pre-existing] The separator is generated `content: "/"` (`:47-49`), which some screen readers read as "slash". Use `content: "/" / ""` to give it empty alt text. Not introduced by this change.

## Final ranked fix list (all P3, non-blocking)
- [component-author D] Combobox-in-FormField popover `aria-labelledby` IDREF (`Combobox/index.tsx:68-78`, `Popover/index.tsx:238`)
- [component-author D] Combobox listbox name from the field label (`Combobox/index.tsx:329,346`)
- [component-author D] CSS-free FormField context module to avoid `FormField.css` side-loading (`Combobox/index.tsx:5-6`)
- [component-author E] Doc note on the `x;'=…` output change (DataTable stories/JSDoc)
- [component-author] Breadcrumb separator alt text (pre-existing, optional)

---

## Evidence run (Part 1)
| Check | Result |
|---|---|
| `npx vitest run` | **451 passed** (448 in the brief; the parallel slice-E rework adds tests). |
| `npx tsc --noEmit` grep for FormField / PageHeader / molecules/Tooltip | nothing |
| Barrel (`src/index.tsx:113-115,317-319`) | `FormField`, `useFormField`, `PageHeader`, `Tooltip` resolve. The legacy `ToolTip` (`:55`) is unchanged, and there are no type-name collisions. |
| axe-core 4.11.1 (jsdom, `color-contrast` off) on **every story** of FormField, PageHeader and Tooltip, plus PageHeader compact and an open Tooltip | **0 violations** |
| Behaviour probes (scratch harness outside the repo) | FormField wiring per control; PageHeader focus on collapse; Tooltip Escape — details below |
| Contrast | Tokens parsed per theme from `tokens.css` (`var()`/`color-mix` resolved) for classic, green, dark, mist, custom, blue-mist and green-mist |
| Security grep (`dangerouslySetInnerHTML\|innerHTML\|eval(\|new Function\|ui-common-hooks` imports, hex in CSS) | clean |
| 375px | Coordinator's Chrome evidence: all 15 stories docW 375. Static CSS review agrees. |

## Token changes (user-requested): PASS
- [PASS] Focus ring ≥ 3:1 on every page, surface, elevated surface, fill-muted, row-hover, the four tone fills and lavender-10, in **all 7 themes**. The minimum per theme is:

  | Theme | Ring | Lowest ratio (on) |
  |---|---|---|
  | classic | #0066cc | 4.22 (page) |
  | custom | #0066cc | 4.22 (page) |
  | mist | #0066cc | 4.22 (fill-muted) |
  | green | #0d0d0d | 14.72 (page) |
  | blue-mist | #7c3aed | 4.32 (fill-muted) |
  | green-mist | #0e7490 (`tokens.css:665`) | **4.06** (fill-muted); 4.47 on lavender-10 |
  | dark | #60a5fa (`tokens.css:522-523`) | **3.85** (warning fill); 3.91 lavender-10, 3.94 success fill, 4.05 fill-muted, 4.21 info, 4.30 danger, 5.77 surface, 6.98 page |

  The Button ring (`--button-primary-focus-ring`) resolves to the same values; its minimum on page, surface or elevated is ≥ 4.22.
- [PASS] Dark primary label: white on #2563eb / #1d4ed8 / #1e40af = **5.17 / 6.70 / 8.72:1** (`tokens.css:529-532`). Note: `--color-theme-primary` stays #3b82f6 (white on it = 3.68:1). Any component that puts white text on `--color-theme-primary` directly in dark still fails. That item was escalated in Sprint 1; it is no longer a Button issue.
- [PASS] The colour-mix ring workaround is gone. Alert (`Alert.css:10`), Toast (`Toast.css:7,59`), FilterBar (`FilterBar.css:5`) and DataTable (`DataTable.css:5`) now use `var(--color-focus-ring)`. Raw ring on the dark Alert/Toast tone fills is 3.85–4.30:1. Optional: the comments at `FilterBar.css:4` and `DataTable.css:4` still describe the old mix. Fix in Part 2.

## Accessibility (Part 1): FAIL
**Slice D — FormField**
- [PASS] A5 `<label htmlFor>` plus injected `id` / `aria-describedby` (hint + error + counter) / `aria-invalid` / `aria-required`, only when the child doesn't set them (`src/components/molecules/FormField/index.tsx:84-92,107`). Harness (with hint, error, required): `Input`, `TextArea`, `Select` and a native `<input>` all get the label association plus all four attributes on the native element.
- [FAIL] A5 — **FormField + `Combobox` produces a mislabelled, undescribed field.** The injected `id` lands on Combobox's wrapper `<div>` (`src/components/molecules/Combobox/index.tsx:206`), so `<label for>` points at a non-labelable element. The actual `role="combobox"` element gets no `aria-describedby`, `aria-invalid` or `aria-required`, and its accessible name is its placeholder ("Select…"). Harness: `label-for resolves to: DIV | control: id=popover-trigger-«r1i» aria-describedby=null aria-invalid=null aria-label=Select…`. Combobox is a library control and does not read `useFormField()`, so the documented escape hatch doesn't help either. Fix (preferred): Combobox reads `useFormField()` and applies `aria-labelledby={labelId}` / `aria-describedby` / `aria-invalid` / `aria-required` to its combobox element. Combobox is outside slice D's folder, so the coordinator needs to approve it. Interim: document the supported children (Input, TextArea, Select, native controls, and custom controls via `useFormField`) in the FormField JSDoc and stories, and add a dev-only `console.warn` when the injected id resolves to a non-labelable element.
- [PASS] A4 Label/text-primary, hint/counter/optional/text-secondary and error/danger-strong on page and surface: minimum **4.91:1** (classic page), ≥ 5.54 mist themes, ≥ 6.71 dark. The error has an icon plus text, and required has "*" plus sr " required" (`index.tsx:109-116,131-145`).
- [PASS] Over-limit counter announced once via a polite region (`index.tsx:159-163`).
- [OPTIONAL] Error `role="alert"` is added through an effect plus state (`index.tsx:31-38,131`), so the first error appears in one commit and `role="alert"` is added in a second. Whether AT announces an element that *becomes* an alert is engine-dependent, and jsdom batches both commits so I could not show a gap. A deterministic alternative is to decide in render (`announce = error !== initialRef.current`) so the role and content land in the same commit.
- [OPTIONAL] `required` gives "Name required" in the name plus the required state, so some screen readers say "required" twice. This follows the brief.

**Slice D — PageHeader**
- [PASS] A1/A7 More-actions trigger `aria-haspopup="menu"` / `aria-expanded` with Arrow/Home/End navigation from Popover. Link items are `role="menuitem"` and are included in the arrow navigation (`Popover/index.tsx:299`, `PageHeader/index.tsx:129-143`). Hrefs are filtered through `isSafeHref` (`:42-44,89,126`).
- [PASS] A4 Description/meta text-secondary ≥ 4.91:1 everywhere. The title is text-primary.
- [FAIL] A1 / WCAG 2.4.3 — **keyboard focus is lost when the viewport crosses 640px.** The collapse is JS-driven: `useMatchMedia` → `inlineCount = 0` (`src/components/molecules/PageHeader/index.tsx:22-40,77-83`), so the focused inline secondary `<Button>` unmounts. Harness: focus "Export", switch matchMedia to ≤ 640px → `document.activeElement = BODY`. This happens on device rotation and on desktop zoom of about 200% or more (WCAG 1.4.10 reflow scenario). Fix: if `document.activeElement` is inside `.ds-page-header__actions` when `compact` flips, move focus to the More-actions trigger after the commit. Alternatively, render the inline buttons always and hide them with CSS at ≤ 640px (that also removes the SSR first-paint jump), plus the same focus hand-off.

**Slice F — Tooltip**
- [PASS] WCAG 1.4.13: dismissable by Escape without moving pointer or focus, hoverable with a bubble pointer handler plus an 8px bridge, persistent with no auto-hide (`src/components/molecules/Tooltip/index.tsx:147-180,284-296`, `Tooltip.css:49-76`).
- [PASS] `role="tooltip"`, and the trigger's `aria-describedby` is merged with any existing ids. The bubble is always mounted (`hidden`), so the IDREF always resolves (`index.tsx:225-229,262-271`). Harness: `aria-describedby=ds-tooltip-«…»` present.
- [PASS] A4 Dark variant 13.34–19.44:1; light variant 13.34–19.44:1 in all 7 themes.
- [PASS] A9 Reduced motion (`Tooltip.css:91-95`); forced-colors boundary (`:98-105`).
- [OPTIONAL] Touch: hover opening is skipped for `pointerType === "touch"` (`index.tsx:233`), and iOS Safari does not focus `<button>` on tap. Tooltips therefore don't appear on iOS button triggers. Acceptable as long as tooltip content is supplementary (names come from `aria-label`); state that in the story docs.

## Security (Part 1): PASS
- [PASS] B1 Every slot renders as React nodes; grep is clean. PageHeader hrefs use the WHATWG-based `isSafeHref` (List), covering inline Buttons and menu links (`PageHeader/index.tsx:42-44`).
- [PASS] B4/B5 No new dependencies and no `ui-common-hooks` import (the only hit is a comment, `PageHeader/index.tsx:21`). No hex colours. Tooltip timers and listeners are cleaned up (`Tooltip/index.tsx:112,169-180`).
- Out of scope (escalated): `Button href` unsanitised (`src/components/atoms/Button/index.tsx:215-221`).

## Responsiveness (Part 1): PASS
- [PASS] C1/C4 FormField horizontal layout collapses at ≤ 640px (`FormField.css:27-35`), with `minmax(0, …)` columns and `overflow-wrap:anywhere`.
- [PASS] C2/C7 PageHeader actions stack and secondaries go to the menu at ≤ 640px (`PageHeader.css:116-128`; `index.tsx:81`). One primary slot (`:188`). Tabs row scrolls (`PageHeader.css:101-106`). Coarse-pointer 44px (`:109-113`).
- [PASS] C1 Tooltip `max-width: min(var, 100vw − space-2)` (`Tooltip.css:10`) plus flip and clamp (`tooltipPosition.ts`).
- [ACCEPTED WITH REASON] C5 PageHeader buttons are 34px on fine pointers (Button md, pre-existing), meeting WCAG 2.5.8.

## Verdicts on the open items
1. **FormField counter in `aria-describedby`:** **keep it.** It is additive, it gives "12 of 100" on focus, and over-limit has its own one-time polite announcement. Document the deviation from the brief in the FormField JSDoc.
2. **PageHeader root `div` vs `header`:** **accepted.** A `<header>` outside `<main>` would create a second `banner` landmark. The `h1` provides page structure. Advise consumers to place PageHeader inside `<main>`.
3. **PageHeader JS-driven mobile collapse and SSR:** SSR defaults to desktop. Initial state is `false` on both server and client, so there is **no hydration mismatch**, only a first-paint layout change on phones. That part is acceptable. The **focus loss when the breakpoint flips is not acceptable** (FAIL A1 above). The CSS-driven variant fixes both.
4. **Tooltip Escape consuming the trigger's Escape handler:** **accepted.** It matches the APG two-step model: the first Escape closes the tooltip and the second reaches the trigger. Harness: trigger handler called 1× after 2 Escapes. Side effect to document: a hover-opened tooltip also consumes the first Escape meant for whatever has focus (for example an open listbox elsewhere). That is still one press, and it satisfies 1.4.13 "dismissable".
5. **Tooltip light-variant border 2.62:1 (classic/custom/green) and 2.95:1 (mist themes) against the page:** **accepted.** 1.4.11 covers visual information needed to identify UI components and states. A tooltip bubble is not an operable component, and its text (≥ 13.34:1) carries the meaning. `--shadow-md` also delineates it. On surfaces it is 3.31–3.45:1, and in dark ≥ 3.38:1.
6. **Button `href` not sanitised:** out of scope (escalated).

## Ranked fix list (Part 1)
**Slice D — component-author**
1. [component-author D] P1 — FormField + Combobox labelling/description. Combobox should consume `useFormField()` (coordinator approval needed, since Combobox is outside slice D). Interim: supported-children docs plus a dev warning (`src/components/molecules/FormField/index.tsx:84-92`, `src/components/molecules/Combobox/index.tsx:206`).
2. [component-author D] P2 — PageHeader focus hand-off to the More-actions trigger when `compact` flips while an inline secondary has focus, or a CSS-driven collapse (`src/components/molecules/PageHeader/index.tsx:77-83`).
3. [component-author D] P3 optional — FormField error role decided in render (`FormField/index.tsx:31-38`); FormField JSDoc note on the counter deviation.

**Slice F — component-author**
1. [component-author F] P3 optional — story docs: tooltip content must be supplementary (iOS tap doesn't focus buttons), and hover tooltips consume the first Escape.

**Tokens**
- None. Optional: update the stale colour-mix comments in `FilterBar.css:4` and `DataTable.css:4` during Part 2.

## Part 2 — Slice E (FilterBar, DataTable)
Reviewed from `06e` including "Iteration 1b (pre-review)" and its round 2.

### Part 2 — Iteration 2 re-audit (slice E)
**Evidence**
- `npx vitest run`: **473 passed / 42 files** (matches).
- axe: 0 violations on all FilterBar and DataTable stories (re-run).
- tsc and the security grep are clean.

**Re-verified**
- [FAIL] **CSV `;` bypass — fixed only when the cell is in the first column.** The new `hasFormulaTrigger` prefixes the *whole cell* with `'` and quotes it (`src/components/molecules/DataTable/DataTable.utils.ts:129-153`). I simulated how a semicolon-locale spreadsheet reads the exported line: RFC-4180 parsing with `;` as the delimiter, where quotes only open at the start of a field. In any column after the first, the cell's opening quote sits mid-field (after `Alice,`), so the `;` still splits it and the part after it starts with the trigger:

  | Cell value (col 2) | Exported line | `;`-locale fields | Result |
  |---|---|---|---|
  | `x;=cmd\|' /C calc'!A0` | `Alice,"'x;=cmd\|' /C calc'!A0"` | `Alice,"'x` · `=cmd\|' /C calc'!A0"` | **formula** |
  | `a;=1+1` | `Alice,"'a;=1+1"` | `…'a` · `=1+1"` | **formula** |
  | `a;＝1+1` (full-width `=`) | `Alice,"'a;＝1+1"` | `…'a` · `＝1+1"` | **formula** |
  | `a;+1`, `a;@SUM(1)` | quoted, whole-cell `'` | segment starts `+` / `@` | **formula** |
  | `a；=1+1` (full-width `；`) | `Alice,'a；=1+1` | one field | ok |
  | `a; =1+1` | split | ` =1+1"` (leading space → text) | ok |

  In the comma locale every case is safe. Fix: neutralise **each** trigger that follows a separator, not just the cell start. For example, after the whole-cell check:
  `text = text.replace(/([;；])(\s*)(?=[=+\-@\t\r＝＋－＠])/g, "$1$2'")`
  That exports `Alice,"a;'=1+1"`, and the `;`-locale field becomes `'=1+1"`, which is text. Also add a test that parses the `toCsv` output with `;` as the delimiter and asserts no field starts with a trigger. Testing `escapeCsvCell` in isolation can't catch this, because the bypass only appears once the cell sits behind a comma in a full line.
- [PASS] `csvHeader` fallback: `<b>Name</b>` → `n` (key), `csvHeader: "=Value"` → `'=Value` (guarded), numeric header `7` → `7` (`DataTable.utils.ts:156-161`).
- [PASS] "Selection cleared" announced **exactly once** in the server-mode sequence. Harness (all polite regions, changes only):
  1. `1 row selected`
  2. **`Selection cleared`**
  3. `Loading…`
  4. `""`
  5. `Loading…`
  6. `""`

  It is not repeated after the load or on page 2 (`DataTable/index.tsx:224-244`, 1500ms fallback at `:41`).
- [PASS] Result count persists while loading: `30 results` stays through `Loading…` and then updates to `15 results` (`DataTable/index.tsx:421,454`).
- [PASS] FilterBar focus hand-off at 768px. Harness with a live matchMedia mock:
  - Status select focused → collapse → focus goes to the **"Filters" trigger**, and expand → back to the **Status select**.
  - Combobox round-trip → back to the combobox.
  - Focus on search is left untouched.
  - Code: `src/components/molecules/FilterBar/index.tsx:187-204,251`.
- [PASS] "Region: All" with the name kept: the visible text is `Region: All`, the accessible name comes via `aria-labelledby` and is "Region", and there is no `aria-label`. The label is visually hidden with the standard clip pattern, not `display:none` (`FilterBar/index.tsx:258-259,312`; `FilterBar.css:51-62`).
- [PASS] Dev warning: `findMissingTableMarkup` (`DataTable.utils.ts:212`) warns once, guarded by `typeof process !== "undefined"` (`DataTable/index.tsx:43-45,327-338`). With the current Table: 0 warnings.
- [PASS] Bidi stripping: `invoice‮fdp` → `invoicefdp.csv`, `a⁦b⁩.csv` → `ab.csv` (`DataTable.utils.ts:177-179`).
- [PASS] Comments: `FilterBar.css:4` and `DataTable.css:4` now read "Follows --color-focus-ring (≥ 3:1 in every theme)".

**Ranked fix list (iteration 2)**
1. [component-author E] P2 — per-separator CSV formula guard plus a full-line `;`-delimiter parse test (`src/components/molecules/DataTable/DataTable.utils.ts:129-153`)

### Iteration 1 (history)

### Evidence run (Part 2)
| Check | Result |
|---|---|
| `npx vitest run` | **462 passed / 42 files** (the brief says 460; parallel work adds tests) |
| tsc grep FilterBar / DataTable | nothing |
| Barrel | `FilterBar`, `DataTable`, `toCsv`, `escapeCsvCell` resolve |
| axe-core 4.11.1 on **every story** of FilterBar and DataTable (60ms settle each) | **0 violations** |
| Behaviour probes (scratch harness) | CSV / filename table, live-region sequence, region naming, indeterminate survival, collapse focus — below |
| Security grep (`dangerouslySetInnerHTML\|innerHTML\|outerHTML\|eval(\|new Function`, `ui-common-hooks` imports, hex) | clean (the only `ui-common-hooks` hit is a comment, `FilterBar/index.tsx:27`) |
| Contrast | Recomputed for all 7 themes from current `tokens.css`. Ring = raw `--color-focus-ring` (≥ 3.85:1, see Part 1). Result count/hint/placeholder text-secondary ≥ 4.71:1 on every surface, page and fill-muted. Trigger border `border-default` on the page is below 3:1 in light themes (2.62 / 2.95); it is the known repo-wide item and the triggers carry text, so it is not counted. |
| 375 / 1485px | Producer's headless-Chrome evidence (iteration 1b) plus the coordinator's sweep. Static CSS review agrees. |

### Accessibility (Part 2): FAIL
- [PASS] A6/A10 **Scroll region keyboard-reachable and named.** Harness: exactly **1** `region`, named by the caption ("Customers"), `tabindex="0"`, containing the table. `<table aria-labelledby>` resolves to the caption, and Table's hard-coded `aria-label="Data table"` is removed (`src/components/molecules/DataTable/index.tsx:249-268,466-469`). The `scroll.y` path moves the role/name/tabindex onto Table's own scroller (`:254-259`). Covered by the slice tests.
- [PASS] A1 Select-all partial state: `indeterminate=true` + `data-indeterminate` after a partial selection, and it **survives a Table-internal re-render** (expand-row toggle; same node, still `true`) (`index.tsx:274-282`).
- [PASS] A1 Focus after removal (chip → next chip/previous/search, Clear all → search, bulk Clear → select-all) — slice tests, code at `FilterBar/index.tsx:145-172`, `DataTable/index.tsx:224-237`. The bulk-bar slot is always mounted, so selecting rows doesn't move the table.
- [PASS] A5/A10 **Result count:** FilterBar's polite atomic region is always mounted (`FilterBar/index.tsx:342-344`), so only changes are announced. **"Selection cleared":** announced on the filter change that clears the selection (harness: live text goes `1 row selected` → `Selection cleared`) (`DataTable/index.tsx:110-117,445-451`).
- [FAIL] A10 — **the stale "Selection cleared" note is re-announced after every load.** `selectionNote` is only reset when rows are selected again (`DataTable/index.tsx:208,218`). While `loading`, the live region shows "Loading…", and afterwards it falls back to the old note (`:445-451`). Harness (server mode): `Selection cleared` → loading `Loading…` → loaded `Selection cleared` → page 2 loaded `Selection cleared` again. Screen-reader users hear a selection change that didn't happen on every refetch or page change. Fix: clear `selectionNote` once it has been shown (when the next `loading` starts, on any page/sort change, or after a short timeout).
- [FAIL] A1 / 2.4.3 — **FilterBar loses focus when the viewport crosses 768px.** The collapse is JS-driven (`useMediaQuery`, `FilterBar/index.tsx:28-42,81,182-183`), so the focused inline filter unmounts into the "Filters" popover. Harness: focus the Status select, flip matchMedia → `document.activeElement = BODY`. This is the same pattern as PageHeader in Part 1 (rotation or about 200% desktop zoom). Fix: when `narrow` flips with focus inside the inline filters, move focus to the "Filters" trigger.
- [PASS with recommendation, P3] **Multi-select empty label (coordinator's Chrome observation).**
  - Contrast **passes**: the placeholder uses `--color-text-secondary` (`Combobox.css:96-98`) on the trigger's surface. That is 6.48 classic / 6.21 mist themes / 6.71 dark, and ≥ 4.71 on the hover fill. The disabled state (opacity .55) is exempt.
  - The labels are inconsistent. Select uses `` `${f.label}: All` `` (`FilterBar/index.tsx:195`), but multi uses `f.placeholder ?? f.label` → "Region" (`:210`).
  - Recommendation: use `` `${f.label}: All` `` for multi too. **Don't just change the placeholder.** With no `label`, Combobox takes its accessible name from the placeholder (`Combobox/index.tsx:262`), so the name would then read "Region: All" even after values are picked. Instead, always pass `label={f.label}` and visually hide Combobox's label when `showLabels` is false, so the name stays "Region" (via `aria-labelledby`) and the placeholder becomes "Region: All".
- [PASS] A3/A9 Focus rings use `var(--color-focus-ring)`; reduced motion and forced-colors blocks are present (`FilterBar.css:218-230`, `DataTable.css:163-175`).
- [OPTIONAL] In server mode the result count goes to "" while loading and back to the same "N results" afterwards (harness LIVE3 → LIVE4), so an unchanged count is re-announced on every page change. Keep the last count while `loading`.

### Security (Part 2): FAIL
- [PASS] B1/B4/B5 Text-node rendering only. The single `setAttribute` uses `useId` values (`DataTable/index.tsx:255-268`). No new deps, no inline handlers. The download anchor is transient and the Blob URL is revoked (`DataTable.utils.ts:158-172`).
- [PASS] CSV formula guard for cells **starting with** a trigger: `=` `+` `-` `@` TAB CR and their full-width forms are prefixed with `'`. Header cells are guarded. Real numbers stay unprefixed (`-5` → `-5`) while numeric strings are prefixed (`"-5"` → `'-5`). RFC-4180 quoting works for `"`, `,`, CR, LF (`DataTable.utils.ts:112,132-139`). Harness covers all of these.
- [FAIL] B (CSV injection) — **separator bypass for semicolon-locale spreadsheets.** The guard only tests the first character of the whole cell, and `;` is neither guarded nor quoted. Harness: `escapeCsvCell("x;=cmd|' /C calc'!A0")` → `x;=cmd|' /C calc'!A0` (unchanged), and `"a;=1+1"` → `a;=1+1`. Excel in locales whose list separator is `;` (for example de-DE, fr-FR, nl-NL) splits on `;` when the file is opened directly, so the second field starts with `=` and is evaluated. Quoting does not protect here, because the quote is not at the start of a `;`-separated field. Fix: also neutralise triggers after a `;` inside a cell, e.g. `text = text.replace(/;(\s*)(?=[=+\-@\t\r＝＋－＠])/g, ";$1'")`, and add the two harness strings as tests. Optional extra: offer `exportCsv: { delimiter }`.
- [PASS] Filename sanitising: path separators, reserved characters, control characters and leading dots are stripped and `.csv` is enforced. `../../etc/passwd` → `_.._etc_passwd.csv`, `...` → `export.csv`, `a\0b` → `a_b.csv`. [OPTIONAL] Bidi overrides are not stripped: `rep‮fdp.csv` passes through and displays as `repvsc.pdf` in some download UIs. Add `‪-‮⁦-⁩` to the strip class. Browsers also sanitise `download`, so this is defence in depth.

### Functional (affects a stated requirement — CSV of visible columns)
- [FAIL] **CSV headers become React-element JSON when `header` is JSX.** `toCsv` passes `c.header` (a `ReactNode`) to `escapeCsvCell` → `JSON.stringify` (`DataTable.utils.ts:114-125,143`). Harness: `header: <span>Name</span>` exports as `"{""type"":""span"",""key"":null,""props"":{""children"":""Name""},…}"`. Fix: add `csvHeader?: string` to `DataTableColumn`, fall back to the header only when it is a string or number, else use `key`.

### Responsiveness (Part 2): PASS
- [PASS] C1/C3 The root, caption, toolbar, bulk bar and pagination are `max-width:100%` / `min-width:0`. The table scrolls inside the single region (`DataTable.css:3-13,147-153`; `[data-scroll-owner="self"] > .table-wrapper` rule). Producer CDP at 375px: document scrollWidth = 375 on four stories, and the region scrolls internally.
- [PASS] C2/C4 FilterBar is one row at 1485px (`.ds-filter-bar__filters { display: contents }`). Filters move into the popover and search goes full width at ≤ 768px (`FilterBar.css:201-210`). The panel is `min(…, 100vw − space-2)`.
- [PASS] C5 Own targets are 38px on fine pointers and 44px under `pointer: coarse` (`FilterBar.css:212-216`, `DataTable.css:157-161`); Badge dismiss is 44px. Accepted, as with earlier slices (≥ 24px, WCAG 2.5.8).

### Assessments requested
- **DataTable patching Table's markup:** **acceptable as an interim. It is robust in practice but fragile by design.**
  - What holds:
    - The effect runs after every DataTable render (`index.tsx:249`). It only sets ARIA and tabindex attributes and a class.
    - React doesn't restore Table's constant `aria-label`, because it diffs props, not the DOM.
    - The patched state survived a Table-internal re-render in the harness.
    - The sort mirror listens for exactly the keys Table uses: click, and Enter/Space on the `th` (`Table/parts/TableHeader.tsx:58-65`). Header index arithmetic accounts for the expand and select columns (`DataTable/index.tsx:154-167`).
  - Where it is fragile: it relies on `.table-scroll-wrapper`, `thead input[type="checkbox"]`, the header-cell order and Table's sort cycle. Any Table refactor makes it **fail silently**: the region falls back to "Data table" and becomes unfocusable, select-all loses its partial state, and sort desyncs.
  - Mitigation, needed before more consumers depend on it (P3): add a dev-only `console.warn` when the selectors don't match, and keep the existing slice tests (one named focusable region, indeterminate, cross-page sort) as the tripwire. The Table backlog items (`caption`/`aria-label`, focusable region, `indeterminate` header, controlled sort) remove the patches.
- **Using Table's skeleton instead of the `Skeleton` atom:** **accepted.** The rows are `aria-hidden`, the header stays, reduced motion is respected, and it avoids exposing empty rows. The duplication is a Table backlog item.

### Tidy item
- [P3] Stale comments still describe the removed colour-mix: `src/components/molecules/FilterBar/FilterBar.css:4` and `src/components/molecules/DataTable/DataTable.css:4`. Replace them with "Follows --color-focus-ring (≥ 3:1 in every theme)".

### Ranked fix list (Part 2) — slice E, component-author
1. [component-author E] P2 — CSV `;`-separator formula bypass: guard triggers after `;` plus tests (`src/components/molecules/DataTable/DataTable.utils.ts:132-139`)
2. [component-author E] P2 — CSV header serialisation for JSX headers (`csvHeader` / string-only fallback) (`DataTable.utils.ts:141-147`)
3. [component-author E] P2 — clear the stale "Selection cleared" note after it has been announced (`src/components/molecules/DataTable/index.tsx:208-218,445-451`)
4. [component-author E] P2 — FilterBar focus hand-off to the "Filters" trigger when the ≤ 768px collapse happens with focus inline (`src/components/molecules/FilterBar/index.tsx:81,182-183`)
5. [component-author E] P3 — multi-select "Region: All" via a visually hidden `label` plus the placeholder (`FilterBar/index.tsx:207-210`)
6. [component-author E] P3 — dev warnings when the Table-markup patches don't match (`DataTable/index.tsx:249-282`)
7. [component-author E] P3 — keep the last result count while loading; strip bidi controls from CSV filenames (`DataTable.utils.ts:150-154`)
8. [component-author E] P3 — stale colour-mix comments (`FilterBar.css:4`, `DataTable.css:4`)
