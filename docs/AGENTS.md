# Project AI memory

This project uses `ui-common-components` together with the UX Governance design system.

**Read every file under `docs/`** in the order defined in [`docs/README.md`](./README.md) (including `docs/design-system/` and `docs/internal/`). Do not skip internal docs.

## Read these files first (then continue through the full tree)

- [`docs/README.md`](./README.md) — entry point, full reading order, flow diagram
- [`docs/AGENTS.md`](./AGENTS.md) — this file
- [`docs/AI_USAGE_GUIDE.md`](./AI_USAGE_GUIDE.md)
- [`docs/UI_COMPONENTS_GUIDE.md`](./UI_COMPONENTS_GUIDE.md)
- [`docs/design-system/README.md`](./design-system/README.md)
- [`docs/design-system/DESIGN_SYSTEM.md`](./design-system/DESIGN_SYSTEM.md)
- [`docs/design-system/tokens.md`](./design-system/tokens.md)
- [`docs/internal/README.md`](./internal/README.md)
- [`docs/internal/DOC_INDEX.md`](./internal/DOC_INDEX.md)
- [`docs/internal/APP_TOPBAR_SYSTEM.md`](./internal/APP_TOPBAR_SYSTEM.md)
- [`docs/internal/SIDEBAR_NAVIGATION_SYSTEM.md`](./internal/SIDEBAR_NAVIGATION_SYSTEM.md)
- [`docs/internal/PACKAGES.md`](./internal/PACKAGES.md)
- [`docs/internal/AI_UNIVERSAL_DESIGN_RULES.md`](./internal/AI_UNIVERSAL_DESIGN_RULES.md)

## Core usage rules

- Import components from `ui-common-components`, or use subpaths when a screen only needs one heavy area: `ui-common-components/charts`, `ui-common-components/shell`, `ui-common-components/table` (smaller JS than the main entry).
- Import `ui-common-components/design-system/tokens.css` once in the app root.
- Prefer library components over custom UI.
- Do not use Bootstrap with this library.
- Prefer token-based theming and WCAG 2.2 AA compliant behavior.

## Export names to remember

- Dashboard shell layout: `DashboardShell` (legacy alias: `AppShell` — prefer `DashboardShell` in new code)
- `Card`: compound subcomponents `CardHeader`, `CardTitle`, `CardDescription`, `CardAction`, `CardContent`, `CardFooter`; also `Card.Header`, `Card.Title`, … on the default export
- `Table`: default export = data table (`columns` / `data`); `TableRoot`, `TableHeader`, `TableBody`, `TableFooter`, `TableRow`, `TableHead`, `TableCell`, `TableCaption` for semantic HTML; `Table.Root`, `Table.Body`, … on the same export
- Tokens: `--color-border-default` = structural outlines; `--color-border-subtle` = decorative separators (modal/card/tabs/button-group/divider default), defined in `tokens.css`
- Avatar export: `Avtar`
- Tooltip export: `ToolTip`
- `GridItem` is exported alongside `Grid`
