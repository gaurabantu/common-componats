# Sprint 6 — Structural gaps, thin-prop upgrades, new components (shared brief)

Same conventions, boundaries, quality bar and handoff rules as `_fleet/handoffs/05-orchestrator-sprint1-brief.md` — **read it first** (sections "Conventions", "Handoff", "Final reply"). Started 2026-11-27.

## User request
"Do all steps" of the orchestrator's audit:
1. Fix structural gaps (empty/partial component dirs, duplicate tooltips, missing tests/stories).
2. Improve thin-prop components (Hyperlink, Spinner, Breadcrumb, ButtonGroup, OtpBox).
3. Add new high-priority components (Menu/DropdownMenu, AvatarGroup, TagInput, TimePicker, BottomSheet behaviour, Timeline, Rating).

## Sprint-wide rules (in addition to the Sprint 1 conventions)
- **Backward compatibility is mandatory.** Every existing export name, default export, prop name and import path in `src/index.tsx` / `src/entries/*` must keep working. Renamed/replaced props stay as `@deprecated` aliases. Existing tests must stay green without edits, unless a test asserts a bug you were asked to fix (say so in the handoff).
- React is 19 but peer range is `>=18` → keep using `forwardRef` (matches reference components).
- Do NOT edit `src/index.tsx` or `src/entries/*`; list exact barrel lines in your handoff under **"Barrel exports needed"**. The orchestrator wires them.
- Stay inside your slice's files. If you need a change elsewhere, report it in **Open questions**.
- Handoff file name: `_fleet/handoffs/11{p|q|r|s|t}-component-author-to-compliance-reviewer.md`.
- Run `npx vitest run <your dirs>` and the full `npx vitest run` before handing off; record counts.

## Slices (parallel, exclusive file ownership)

### Slice P — Structural: DashboardShell, Form, Tooltip consolidation, FeedbackStates story
Owns: `src/components/molecules/{DashboardShell,Form,FeedbackStates}/**`, `src/components/atoms/ToolTip/**`, `src/components/molecules/Tooltip/**` (only if needed for consolidation).
- **DashboardShell**: bring to canonical pattern (`DashboardShell.types.ts`, `.config.ts`, `index.tsx`, `.css` if styles exist, `.stories.tsx`, `.test.tsx`). **Keep `DashboardShell.tsx` as a re-export shim** — barrel imports `./components/molecules/DashboardShell/DashboardShell` (default + `AppShell` + `DashboardShellProps`/`AppShellProps`). Skip-link to main, landmark roles, responsive collapse ≤768px.
- **Form**: `Form.types.ts`, `Form.config.ts`, tests. Add `onSubmit` (renders a real `<form>`; `noValidate` option), `loading`/`disabled` (wrap fields in `<fieldset disabled>` + `aria-busy`), `errorSummary` (array of `{ fieldId, message }` → role=alert list of in-page links that focus the field; WCAG 3.3.1), responsive `columns` (`number | { base, sm, md, lg }`), `classNames`/`styles` slot objects (`shell, card, content, fields`) — keep the 8 existing `*ClassName`/`*Style` props as `@deprecated`. Move inline styles to `Form.css` with tokens.
- **Tooltip consolidation**: `molecules/Tooltip` is canonical. Re-implement `atoms/ToolTip` (`ToolTip` default export, `TooltipIconProps`) as a thin wrapper over `molecules/Tooltip` with identical public props; JSDoc `@deprecated Use Tooltip`. Existing ToolTip tests stay green.
- **FeedbackStates**: add `FeedbackStates.stories.tsx` covering every exported state.

### Slice Q — OtpBox, Hyperlink, Spinner (structure + prop upgrades)
Owns: `src/components/atoms/{OtpBox,Hyperlink,Spinner}/**`.
- **OtpBox**: `OtpBox.types.ts`, `.config.ts`, tests; move inline styles to `OtpBox.css` tokens; `forwardRef` (imperative `focus()`/`clear()` via `useImperativeHandle` is fine); add `onComplete(value)`, full-code paste distribution, `autoFocus`, `name` (hidden input for form submission), `id`, `autoComplete="one-time-code"` on first cell, `inputMode` per type, group label (`role="group"` + `aria-labelledby`), per-cell `aria-label` ("Digit 2 of 6"), error wired via `aria-describedby`/`aria-invalid`, arrow/backspace/home/end navigation. Keep `OtpBoxProps`, `OtpBoxVariant`, `OtpBoxSize` exports from `atoms/OtpBox`.
- **Hyperlink**: extend `AnchorHTMLAttributes<HTMLAnchorElement>`; `forwardRef`; `asChild` (render the single child, e.g. Next `<Link>`, merging props — implement a small local Slot); `variant: default | subtle | inline | standalone`; `underline: always | hover | none`; `size: sm | md | lg`; `leadingIcon` / `trailingIcon`; `external` (auto when `openInNewTab`) → `rel="noopener noreferrer"`, external icon + visually hidden "(opens in new tab)"; sanitize `href` with `src/utils/safeHref.ts` (existing); `disabled` → `aria-disabled`, no href, not focusable-click.
- **Spinner**: add `variant: ring | dots | bars`, `thickness: thin | regular | thick`, `speed: slow | normal | fast`, `delay` ms (render nothing until elapsed, avoids flicker), `size: "xl"`; reduced-motion fallback; keep current props/defaults.

### Slice R — Breadcrumb + ButtonGroup upgrades; missing tests (Badge, DatePicker, Accordion, AppSidebar, Calendar)
Owns: `src/components/molecules/{Breadcrumb,ButtonGroup,Accordion,AppSidebar,Calendar}/**`, `src/components/atoms/{Badge,DatePicker}/**`.
- **Breadcrumb**: `items?: { label, href?, icon?, current? }[]` data API (children still supported); `maxItems` + `itemsBeforeCollapse`/`itemsAfterCollapse` → middle collapses into an "…" button that expands (or a menu) — accessible name "Show N more"; responsive auto-collapse ≤640px; `separator` accepts `"slash" | "chevron" | ReactNode`; `asChild`/`renderLink` on items for router links; href sanitized (`src/utils/safeHref.ts`); `aria-current="page"`.
- **ButtonGroup**: `attached` (joined borders/radii), `size`, `variant`, `disabled` cascading to child `Button`s via context (child props win), `fullWidth`. Coordinate only through context; if Button must read the context, report in Open questions with the exact patch (Button is not your file) — or make the group clone children with props.
- **Tests only** (fix real bugs you find, minimal diff): `Badge.test.tsx`, `DatePicker.test.tsx`, `Accordion.test.tsx`, `AppSidebar.test.tsx`, `Calendar.test.tsx`, plus Breadcrumb and ButtonGroup tests. Cover roles/names, keyboard, callbacks, a11y attrs.

### Slice S — New: Menu (DropdownMenu), AvatarGroup, Rating, Timeline
Owns: new dirs `src/components/molecules/{Menu,Timeline}/**`, `src/components/atoms/{AvatarGroup,Rating}/**`; delete the empty dir `src/components/atoms/Dropdown/`.
- **Menu**: APG menu-button pattern. `Menu` (trigger + content), items, checkbox/radio items, groups with labels, separators, submenus, disabled, shortcuts (use `atoms/Kbd`), `danger` item, typeahead, Home/End, Escape returns focus, portal + flip positioning (reuse `molecules/Tooltip/tooltipPosition.ts` or Popover utilities by import, don't edit them). Export alias `DropdownMenu`.
- **AvatarGroup**: wraps `atoms/Avatar`; `max` → "+N" overflow (button with accessible name listing hidden names or opening a popover), `size`, `spacing`, `total`; `role="group"` + label.
- **Rating**: radio-group pattern; `value`/`defaultValue`/`onChange`, `max`, `precision` (1 | 0.5), `readOnly` (renders as `role="img"` with "4 out of 5 stars"), `disabled`, `size`, `icon` override, `name` for forms, `getLabelText`; forced-colors safe.
- **Timeline**: ordered list; items with `title`, `description`, `timestamp` (`<time dateTime>`), `icon`, `status` tone, `orientation: vertical | horizontal` (horizontal scrolls, collapses to vertical ≤640px), `align: start | alternate`, `pending` last item.

### Slice T — New: TagInput, TimePicker; BottomSheet behaviour on Drawer
Owns: new dirs `src/components/molecules/{TagInput,TimePicker}/**`, and `src/components/molecules/Drawer/**` (BottomSheet only).
- **TagInput**: chips + text input; Enter/comma/paste-splits create tags, Backspace on empty removes last (announce), arrow keys move between chips, chip remove buttons labelled; `value`/`defaultValue`/`onChange`, `maxTags`, `allowDuplicates`, `validate(tag) → string | true`, `suggestions` (combobox listbox, `aria-activedescendant`), `delimiters`, `disabled`, `readOnly`, `size`, FormField consumer (see `molecules/FormField` `useFormField`/`FORM_FIELD_CONSUMER_KEY` as Select does). Reuse `atoms/Badge` for chips if it fits.
- **TimePicker**: input + listbox popover; `value` as `"HH:mm"` string, `format: 12 | 24`, `step` minutes, `min`/`max`, `disabledTimes`, segment keyboard (ArrowUp/Down on hour/minute/period), `clearable`, `size`, FormField consumer; locale label via `Intl.DateTimeFormat`.
- **BottomSheet on Drawer** (`Sheet` alias exists, `side="bottom"`): add drag handle, swipe-down-to-dismiss (pointer events, threshold + velocity), optional `snapPoints` (e.g. `["40%", "90%"]`) with `defaultSnap`/`onSnapChange`, handle is a button ("Resize sheet", keyboard ArrowUp/Down cycles snaps), reduced motion. Export `BottomSheet` = Drawer preset `side="bottom"`. All existing Drawer tests stay green.
