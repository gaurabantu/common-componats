# UI Components Guide

Practical component selection and usage guidance for apps that consume `ui-common-components`.

For installation and token import, use [`../README.md`](../README.md). For AI doc order and workflow, use [`AI_USAGE_GUIDE.md`](./AI_USAGE_GUIDE.md).

## Export names to remember

- `Avtar` is the public avatar export name.
- `ToolTip` is the public tooltip export name.
- `GridItem` is exported alongside `Grid`.
- `Input` and `InputSearch` are the public input names.

## Import paths (bundle size)

The package supports a **main entry** and **subpaths** so consumers can ship less JavaScript when a feature only needs one area.

| Module | Typical imports |
|--------|-------------------|
| `ui-common-components` | Full surface: forms, layout, shell, table, charts, etc. |
| `ui-common-components/charts` | `LineChart`, `BarChart`, `PieChart`, `AreaChart`, `ChartTooltip`, chart theme helpers, and chart-related types |
| `ui-common-components/shell` | `DashboardShell`, `AppShell`, `AppSidebar`, `AppTopbar`, `mergeSidebarTokensStyle`, `mergeTopbarTokensStyle`, persist helpers, shell types |
| `ui-common-components/table` | Data `Table` (`columns` / `data`), semantic primitives (`TableRoot`, `TableHeader`, `TableBody`, `TableRow`, `TableHead`, `TableCell`, …), and types |

Use the **main entry** when a file mixes many areas (e.g. form + modal + card). Use **subpaths** on dashboard-only shells, analytics-only charts, or data-only tables so the bundler does not pull the whole library into that chunk.

## Choose by use case

### Forms and input

- `Input`: validated single-line input, sensitive fields, password fields, masked values
- `InputSearch`: search fields for headers, tables, filters, and command-like search bars
- `TextArea`: long-form text, descriptions, notes, comments
- `Select`: native `<select>` for compact, plain-text option lists (optional `<optgroup>` via `groups`)
- `Combobox`: searchable, icon rows, grouped sections, single or multi-select (custom listbox + `Popover`)
- `CheckBox`: single boolean choices
- `Switch`: on/off toggle (settings, feature flags); use `CheckBox` for lists and forms where a box fits better
- `RadioGroup`: mutually exclusive options
- `OtpBox`: OTP and verification code entry
- `DatePicker`: single date or date-range entry (popover uses `Calendar`; range mode can show paired months)
- `Calendar`: standalone token-based calendar (caption layout, controlled month, optional nav hide)

### Display and status

- `Badge`, `Chip`, `Tag`: compact labels, filters, and metadata (variants and tones via props)

### Actions and decisions

- `Button`: all primary, secondary, outline, danger, warning, link, and ghost actions
- `ButtonGroup`: segmented actions with optional `ButtonGroupSeparator` and `ButtonGroupText` (horizontal or vertical)
- `Modal`: general dialog content and confirmation flows
- `AlertDialog`: destructive, warning, success, or acknowledgement flows
- `Popover`, `DropdownMenu`: anchored panels and menus (`PopoverTrigger` / `PopoverContent`, `DropdownMenuTrigger` / `DropdownMenuContent` / `DropdownMenuItem`)

### Layout, navigation, and content

- `TextView`: semantic typography and token-based text styling
- `GradientText`: highlight text for premium or emphasis moments
- `Card`: grouped content blocks; prefer **`CardHeader` / `CardTitle` / `CardContent` / `CardFooter`** (and `CardAction` / `CardDescription`) for structured layouts, or legacy `title` / `children` props; **`size`** for compact density
- `Form`: centered form shell with title, description, actions, footer, and stacked/grid layouts
- `Grid`, `GridItem`: responsive layout sections
- `Table`: searchable, sortable, selectable **data** tables; use **`TableRoot`** + **`TableHeader`** / **`TableBody`** / **`TableRow`** / **`TableCell`** for hand-authored markup (shadcn-style composition)
- `Tabs`: tabbed regions (`TabsList`, `TabsTrigger`, `TabsContent`)
- `Accordion`: expandable sections (`AccordionItem`, `AccordionTrigger`, `AccordionContent`)
- `Stepper`: step indicators and wizard flows (`StepperStep`)
- `Breadcrumb`: hierarchy trails (`BreadcrumbItem`)
- `FileUpload`, `Dropzone`: drag-and-drop and picker flows with optional security helpers
- `AppSidebar`: dashboard/sidebar navigation with sections, nested items, footer profile/actions, responsive drawer behavior
- `AppTopbar`: dashboard top bar with title, center search, right-side actions, mobile search expansion, and optional hamburger menu
- `DashboardShell`: recommended wrapper when `AppSidebar` + `AppTopbar` + main must track sidebar width (`AppShell` alias)
- `Divider`: content separation (default line uses `--color-border-subtle`; pass `color` to override)
- `ProgressBar`: progress and status display
- `ToolTip`: hover/focus help content
- `Hyperlink`: links with external-tab support
- `Icon`: image or inline icon rendering
- `Avtar`: user avatars with image or initials fallback

### Data visualization

- `LineChart`: multi-series trends over time (optional crosshair / pointer-following tooltip)
- `BarChart`: category comparison
- `PieChart`: part-to-whole or donut visuals
- `AreaChart`: stacked or overlapping area trends (optional crosshair / pointer-following tooltip)
- `ChartTooltip`: shared tooltip primitive (charts use it internally; export for advanced composition)

## Component catalog

### `Input`

Use for validated business inputs and standard form fields.

Common patterns:

- Email: `validation="email"`
- Password: `type="password" showToggleIcon`
- Sensitive values: `mask` and `disableClipboard`
- Verified fields: `showVerifiedStatus`
- Compact search-like fields: `variant="outlined"` with `prefix`/`suffix`

Key props:

- `validation`
- `mask`
- `maskOptions`
- `showToggleIcon`
- `disableClipboard`
- `allowClear`
- `prefix`
- `suffix`
- `onPressEnter`
- `status`
- `variant`

### `InputSearch`

Use for search bars in topbars, tables, filters, and dashboard tools.

Key props:

- `value`
- `onChange`
- `onSearch`
- `placeholder`
- `showClearButton`
- `showSearchButton`
- `leftIcon`
- `suffix`

### `TextArea`

Use for descriptions, free text, comments, and notes.

Reach for it when you need:

- multi-line input
- max length handling
- character count
- sanitization-oriented text entry

### `Select`

Use for **short, fixed** option lists when a **native** control is enough (mobile-friendly, minimal JS).

- Flat list: `options`
- Sections: `groups` (renders `<optgroup>`; ignores `options`)

Icons in `SelectOption` are **text-only** in the dropdown (browser limitation). For **icons in the panel**, search, or multi-select, use **`Combobox`**.

Key props:

- `options` or `groups`
- `value`
- `onValueChange`
- `placeholder`
- `status`
- `size`

### `Combobox`

Use when you need **search**, **icon + label** rows, **grouped sections** in the panel, or **multi-select**. Built with `Popover` + `role="listbox"` (not a native `<select>`).

Exports: `Combobox` (from the main package entry).

Types (for props and data): `ComboboxProps`, `ComboboxOption`, `ComboboxGroup`.

**Data shape**

- Flat: `options: ComboboxOption[]` where each item has `value`, `label`, optional `disabled`, optional `icon` (React node, shown in the list and in the trigger for a single selection).
- Grouped: `groups: ComboboxGroup[]` with `{ label: string; options: ComboboxOption[] }` (flat `options` is ignored).

**Key props**

- `label`, `placeholder`, `value` / `defaultValue`, `onValueChange` (second argument can be the selected option(s)).
- `searchable`, `searchPlaceholder` — filter options by label/value in the panel.
- `multiple` — `value` becomes `string[]`; checkmarks for selected rows.
- `size`: `"sm"` | `"md"` | `"lg"`, `error`, `helperText`, `fullWidth`, `disabled`, `listMinWidth`.

**When to use `Select` instead**

- Native mobile pickers, minimal JS, or only plain-text options → **`Select`**. **`Combobox`** adds bundle size; use it only when you need search, icons in the list, groups in the custom panel, or multi-select UX.

**Storybook**

- **Design System → Molecules → Combobox** — search, icons, groups, multi-select examples.

### `CheckBox` and `RadioGroup`

Use `CheckBox` for boolean choices.
Use `RadioGroup` for one-of-many selection.

Useful props:

- `shape`
- `rounded`
- `withShadow`
- `layout` on `RadioGroup`
- `columns` and `gap` on `RadioGroup`

### `OtpBox`

Use for login verification, signup confirmation, and security code entry.

Recommended default:

- `variant="boxes"`
- `length={6}`

### `DatePicker`

Use for date entry and date-range entry instead of raw text dates.

Implementation notes:

- Opens a popover that renders the shared **`Calendar`** component (not a third-party date library).
- Single mode: one calendar. Range mode: two calendars with shared month navigation when configured.
- Pair with **`Calendar`** props indirectly via `DatePicker` / calendar wiring in your app; for full control (caption layout, `month`, `hideNavigation`), use **`Calendar`** standalone or extend stories as reference.

### `Calendar`

Use when you need a visible month grid without the `DatePicker` field, or to customize calendar behavior beyond the picker.

Key ideas:

- **`captionLayout`**: `"label"` (month/year title) vs `"dropdown"` (month/year selects), aligned with common design-system calendar patterns.
- **Controlled `month`**: drive the visible month from parent state for sync’d range views or external filters.
- **`hideNavigation`**: hide prev/next when navigation is handled elsewhere.
- Token-driven sizing via CSS variables (e.g. cell size); supports light/dark via design tokens.

### `Badge`, `Chip`, and `Tag`

Use for status, counts, filters, and inline labels instead of ad-hoc styled spans.

- **`Badge`**: general emphasis and status chips.
- **`Chip`**: interactive or dismissible chip patterns where provided by the API.
- **`Tag`**: lightweight textual tags.

### `Tabs`

Use for switching panels of related content without full page navigation.

Exports: `Tabs`, `TabsList`, `TabsTrigger`, `TabsContent`.

**Visual & layout**

- **`variant`**: `line` (underline indicator, default), `minimal` (soft fill on active), `segmented` (single rounded track, sliding pill — shadcn-style).
- **`orientation`**: `horizontal` | `vertical`.
- **`listLayout`**: `wrap` (default) | `nowrap` (single row, horizontal scroll) | `equal` (equal-width tabs on one row).
- **`size`**: `sm` | `md`.
- **`triggerLayout`**: `inline` (icon + label on one row, default) vs `stacked` (icon above label); applies to triggers that pass `icon`.
- **`triggerAlign`**: `start` | `center` (default) | `end` — horizontal alignment of icon+label inside each trigger (LTR); can be overridden per `TabsTrigger`.

**Behavior & motion**

- **`activationMode`**: `automatic` (arrow keys move focus and select; default) vs `manual` (arrows move focus only; Enter/Space or click to select) — align with Radix-style expectations.
- **`contentAnimation`**: `none` | `fade` | `fade-slide` (panel enter animation; default `fade`).

**Theming (optional)**

- `dividerColor`, `dividerWidth`, `indicatorColor`, `indicatorWidth`, `inactiveTextColor`, `activeTextColor`, `tabFontSize` — tune strip and indicator to match your shell.

**Storybook**

- **Design System → Molecules → Tabs** — variants, layouts, and activation modes.

### `Accordion`

Use for FAQ, settings groups, and progressive disclosure.

Exports: `Accordion`, `AccordionItem`, `AccordionTrigger`, `AccordionContent`.

Consider:

- `type` (single vs multiple open items) and motion variants from props
- trigger/content composition for rich headers

### `ButtonGroup`

Use to group related actions (toolbar, editor controls, segmented filters) with optional separators and inline labels.

Exports: `ButtonGroup`, `ButtonGroupSeparator`, `ButtonGroupText`.

- Set **`orientation`** for horizontal vs vertical stacks.
- Child **`Button`** components receive segmented styling when composed inside the group.

### `Stepper`

Use for checkout, onboarding, and multi-step flows with a **horizontal** track and round **markers** per step.

Exports: `Stepper`, `StepperStep`.

Types: `StepperProps`, `StepperStepProps`, `StepperAppearance`, `StepperSize`, `StepperTrackMode`, `StepperContextValue`.

**`Stepper` props**

- **`value`** / **`defaultValue`** / **`onValueChange`** — controlled or uncontrolled step index (0-based).
- **`linear`** — when `true`, steps after the current one are not clickable (use app “Next” to advance); previous steps stay clickable.
- **`trackMode`**: `continuous` (single progress fill along the stem), `segments` (tint each gap when the step before is complete), `none` (neutral gaps only).
- **`progressValue`** — `0–100` for the continuous bar when you need custom completion (defaults from active index).
- **`appearance`**: `default` | `emphasized` — thicker stem, gradient fill, stronger ring on the current step.
- **`size`**: `sm` | `md`, **`scrollable`** — horizontal scroll when there are many steps, **`ariaLabel`** — for the `<nav>` landmark.

**`StepperStep` props**

- **`label`** (required), optional **`description`** under the label.
- **`icon`** — centered in the round marker (e.g. preview eye); use with **`markerText`** / step index as needed.
- **`markerText`** — short text or number inside the circle when `icon` is not set (default is `stepIndex + 1`).
- **`showCheckWhenComplete`** — default `true` (checkmark when complete); set `false` to keep `icon` / `markerText` after the step is done.
- **`disabled`** — disable that step’s control.

**Storybook**

- **Design System → Molecules → Stepper** — track modes, sizes, scrollable, **Stepper · Icons** (custom markers + preview patterns).

### `Breadcrumb`

Use for hierarchy and wayfinding below the top bar or above page titles.

Exports: `Breadcrumb`, `BreadcrumbItem`.

### `Popover` and `DropdownMenu`

Use `Popover` for anchored non-modal panels; use `DropdownMenu` for compact action lists.

Exports: `Popover`, `PopoverTrigger`, `PopoverContent`, `DropdownMenu`, `DropdownMenuTrigger`, `DropdownMenuContent`, `DropdownMenuItem`.

### `FileUpload` and `Dropzone`

Use for file selection with optional validation helpers (filename, buffer sniffing, security checks) exported alongside the UI.

See types for `FileUploadProps`, `DropzoneProps`, and security-related exports.

### `Button`

Use for all actions before creating custom clickable UI.

Variants:

- `primary`
- `secondary`
- `outlinePrimary`
- `outlineSecondary`
- `success`
- `danger`
- `warning`
- `link`
- `ghost`

Useful props:

- `size`
- `loading`
- `icon`
- `iconPosition`
- `rounded`
- `gradient`
- `gradientHover`
- `gradientActive`

### `Modal` and `AlertDialog`

Use `Modal` for general custom content.
Use `AlertDialog` for warning/success/error/confirmation flows with clearer intent.

Use these instead of building custom overlays.

### `TextView`

Use for app typography instead of ad-hoc heading and paragraph styling.

Useful props:

- `as`
- `variant`
- `color`
- `fontWeight`
- `align`
- `truncate`

### `Card`

Use to group related content, metrics, or settings sections.

**Compound API** (aligned with common card patterns such as [shadcn/ui Card](https://ui.shadcn.com/docs/components/radix/card)):

- `CardHeader` — title row with optional top-right action area
- `CardTitle` — heading (`as` defaults to `h3`)
- `CardDescription` — muted helper text (`as` defaults to `p`)
- `CardAction` — top-right slot (e.g. button or badge)
- `CardContent` — main body; use `noPadding` for full-bleed media
- `CardFooter` — bottom actions or metadata; set `borderTop={false}` for a softer footer

Also supported: **`size="default" | "sm"`** (denser padding and typography when `sm`), plus existing props (`title`, `subtitle`, `cover`, `actions`, `variant`, `elevation`, etc.) for backward compatibility. Prefer the compound API for new screens.

Static namespace: `Card.Header`, `Card.Title`, … are aliases on the default export.

### `Form`

Use when you want a structured, centered form shell with:

- title
- description
- badge
- actions
- footer
- stacked or grid field layout

Useful props:

- `layout`
- `columns`
- `gap`
- `maxWidth`
- `actions`
- `footer`

### `Grid` and `GridItem`

Use for responsive dashboard and settings layouts.

Useful props:

- `columns`
- `gap`
- `autoFit`
- `minItemWidth`
- `span`
- `rowSpan`

### `Table`

Use for data-heavy views that need searching, sorting, selection, or expandable rows.

Useful props:

- `columns`
- `data`
- `searchable`
- `pagination`
- `selectionMode`
- `expandable`
- `striped`
- `hover`
- `stickyHeader`
- `variant`
- `theme`

**Semantic / compositional API** (same structure as [shadcn/ui Table](https://ui.shadcn.com/docs/components/radix/table)): use **`TableRoot`** (scroll wrapper + `<table>`), **`TableCaption`**, **`TableHeader`** (`<thead>`), **`TableBody`**, **`TableFooter`**, **`TableRow`**, **`TableHead`** (`<th>`, defaults `scope="col"`), **`TableCell`**. The default export **`Table`** is still the data-driven component; static aliases: **`Table.Root`**, **`Table.Caption`**, **`Table.Header`**, **`Table.Body`**, **`Table.Footer`**, **`Table.Row`**, **`Table.Head`**, **`Table.Cell`**. For TanStack Table + complex grids, compose primitives with your own row model; or use the built-in **`Table`** with `columns` + `data`.

### `AppSidebar`

**Governance:** [`internal/SIDEBAR_NAVIGATION_SYSTEM.md`](./internal/SIDEBAR_NAVIGATION_SYSTEM.md) (advanced shell notes for layout, hierarchy, profile, and collapse).

Use for SaaS and dashboard left navigation.

`AppSidebar` manages the **rail itself**. If you also need the **right-side top bar + content area** to resize automatically when the rail collapses or expands, use **`DashboardShell`**. `DashboardShell` is a **layout helper only** and does not decide page visuals, card spacing, or content hierarchy. (The legacy export **`AppShell`** is the same component — prefer **`DashboardShell`** in all new code and docs.)

Best when you need:

- sectioned navigation with `sections`
- nested routes via `children`
- collapsed rail behavior
- responsive drawer behavior on narrow screens
- footer profile and utility actions
- token overrides via `tokens`

Useful props:

- `sections`
- `items`
- `activeItemId`
- `collapsed`
- `defaultCollapsed`
- `showCollapseToggle`
- `widthExpanded`
- `widthCollapsed`
- `fixed` (default `false`; use `fixed` / `fixed={true}` for viewport-fixed dashboard rails)
- `responsive`
- `collapseBelowWidth`
- `drawerOverlayBelowWidth` (default `768`: viewports below = fixed overlay drawer; between that and `collapseBelowWidth` = in-flow rail — use flex wrapper + `main { flex: 1; min-width: 0 }`)
- `publishLayoutOffsetVar` (advanced/manual layout only; **`DashboardShell`** handles this for you)
- `persistenceKey`
- `header`
- `user`
- `footerActions`
- `footerLayout`
- `footerSlot`
- `tokens`
- `classNames`

Utility export:

- `mergeSidebarTokensStyle`

### `DashboardShell`

**Recommended** dashboard wrapper when you want built-in shell behavior: **`AppSidebar` + managed right column** with correct **`margin-inline-start: var(--app-sidebar-offset)`** when `sidebar.fixed` is true (default), so the right side stays **full width of the remaining space** when the rail collapses or expands. The shell is **viewport-height locked**: the **top bar does not scroll** with the page, **main content** scrolls in its column, and the **sidebar nav list** scrolls inside the rail (header/footer stay put).

`DashboardShell` is for **layout coordination**, not visual styling. Use it to keep left/right shell behavior aligned; use your page content + [`design-system/DESIGN_SYSTEM.md`](./design-system/DESIGN_SYSTEM.md) for the actual design.

Use when you need:

- sidebar + top bar + page content working as one layout
- automatic right-side width tracking on collapse / expand
- mobile overlay over content, but desktop/tablet content aligned with the rail
- a content area you can style yourself without hard-coded sidebar math
- zero-default spacing on the right content section until you add your own padding / background

Useful props:

- `sidebar`
- `topbar`
- `contentClassName`
- `contentStyle`
- `topbarClassName`
- `topbarStyle`
- `insetClassName`
- `insetStyle`

Notes:

- Pass **`sidebar={{ ...AppSidebarProps }}`** (omit `fixed` or set explicitly).
- **`fixed: false`:** flex row only (no CSS offset variable needed).
- Content area defaults to **0 margin / 0 padding** so it can span full width.
- Do **not** hard-code **`320px`** on the main column — that reproduces the collapsed gap shown when margins do not track the rail.

### `AppTopbar`

**Governance:** [`internal/APP_TOPBAR_SYSTEM.md`](./internal/APP_TOPBAR_SYSTEM.md) (advanced shell notes for regions, search, actions, profile, and responsive behavior).

Use for dashboard page context and top-level actions.

Best when you need:

- page title
- center search
- action icons with badges
- account/profile trigger
- mobile hamburger menu
- mobile expandable search panel

Useful props:

- `title`
- `search`
- `centerSlot`
- `actions`
- `profile`
- `mobileMenuItems`
- `onMobileMenuClick`
- `mobileSearchTriggerLabel`
- `responsive`
- `collapseCenterBelowWidth`
- `tokens`

Utility export:

- `mergeTopbarTokensStyle`

### `Icon`, `ToolTip`, `Hyperlink`, `Divider`, `ProgressBar`, `Avtar`, `GradientText`

Use these as supporting building blocks instead of recreating small UI primitives.

Highlights:

- `Icon`: accepts string URLs, imported assets, or inline React SVG
- `ToolTip`: lightweight help text for actions and labels
- `Hyperlink`: external-tab support built in
- `Divider`: visual separation (defaults to `--color-border-subtle`)
- `ProgressBar`: linear or circular progress
- `Avtar`: user identity surfaces
- `GradientText`: accent-driven text emphasis

For calendar UI, see **`Calendar`** and **`DatePicker`** above.

### Charts

All charts are native SVG and ship without a charting dependency.

Use:

- `LineChart` for trend lines
- `BarChart` for comparison
- `PieChart` for composition
- `AreaChart` for layered trend views

Shared expectations:

- token-friendly colors
- interactive tooltips (pointer-aligned, clamped position) and legend support
- optional tooltip motion and pointer-follow behavior where exposed on chart props
- on `LineChart` / `AreaChart`, optional crosshair or active-point emphasis when enabled
- `ChartTooltip` exported for advanced or custom tooltip composition
- configurable size and layout
- dashboard-safe integration without external chart libraries

## Common component patterns

- Email field: `Input validation="email"`
- Password field: `Input type="password" showToggleIcon`
- Sensitive entry: `Input mask disableClipboard`
- Search bar: `InputSearch onSearch={...}`
- OTP: `OtpBox variant="boxes" length={6}`
- Dates: `DatePicker` (or standalone `Calendar` for custom flows)
- Settings or metrics panels: `Card` compound API (`CardHeader`, `CardTitle`, `CardContent`, …) or legacy card props
- Tabbed settings or content: `Tabs` + `TabsList` / `TabsTrigger` / `TabsContent` (`variant`, `listLayout`, `activationMode` as needed)
- FAQ / collapsible sections: `Accordion`
- Segmented actions: `ButtonGroup`
- Wizard steps: `Stepper` + `StepperStep` (`trackMode`, `appearance`, `icon` / `markerText` on steps for rich markers)
- Rich dropdown (search, icons, multi): `Combobox`; simple native list: `Select` (or `groups` for `<optgroup>`)
- Page trail: `Breadcrumb` + `BreadcrumbItem`
- Anchored menu: `Popover` or `DropdownMenu`
- File pickers: `FileUpload` / `Dropzone`
- Confirmation flow: `Modal` or `AlertDialog`
- Searchable data table: `Table searchable`
- Dashboard shell: `DashboardShell` with `AppSidebar` + `AppTopbar`
- Responsive layout: `Grid` + `GridItem`

## Notes

- Import from `ui-common-components` for the full kit, or from `ui-common-components/charts`, `/shell`, or `/table` when only that area is needed (smaller bundles).
- The public navigation primitives are `AppSidebar` and `AppTopbar`.
- Charts are native SVG only.
- For visual rules, see [`design-system/DESIGN_SYSTEM.md`](./design-system/DESIGN_SYSTEM.md).
- For dependency explanations, see [`internal/PACKAGES.md`](./internal/PACKAGES.md).
