# Project AI memory

This project uses `ui-common-components` (v0.0.2) + `ui-common-hooks` (v0.3.0) together with the UX Governance design system.

**Read every file under `docs/`** in the order defined in [`docs/README.md`](./README.md) (including `docs/design-system/` and `docs/internal/`). Do not skip internal docs.

---

## Read these files first (then continue through the full tree)

1. [`../AGENTS.md`](../AGENTS.md) — **root entry point** (start here)
2. [`README.md`](./README.md) — full reading order + flow diagram
3. [`AGENTS.md`](./AGENTS.md) — this file (AI memory)
4. [`AI_USAGE_GUIDE.md`](./AI_USAGE_GUIDE.md) — Always/Never rules + workflow
5. [`UI_COMPONENTS_GUIDE.md`](./UI_COMPONENTS_GUIDE.md) — component selection + APIs
6. [`FEEDBACK_STATES_GUIDE.md`](./FEEDBACK_STATES_GUIDE.md) — FeedbackStates + animations
7. [`HOOKS_GUIDE.md`](./HOOKS_GUIDE.md) — ui-common-hooks reference
8. [`design-system/README.md`](./design-system/README.md)
9. [`design-system/DESIGN_SYSTEM.md`](./design-system/DESIGN_SYSTEM.md) — principles + rules (§22a zones)
10. [`design-system/DESIGN_SYSTEM_TOKENS_REFERENCE.md`](./design-system/DESIGN_SYSTEM_TOKENS_REFERENCE.md) — token/CSS tables
11. [`design-system/tokens.md`](./design-system/tokens.md)
12. [`design-system/THEMES.md`](./design-system/THEMES.md)
13. [`design-system/COMPONENT_AUDIT.md`](./design-system/COMPONENT_AUDIT.md)
14. [`internal/README.md`](./internal/README.md)
15. [`internal/DOC_INDEX.md`](./internal/DOC_INDEX.md)
16. [`internal/APP_TOPBAR_SYSTEM.md`](./internal/APP_TOPBAR_SYSTEM.md)
17. [`internal/SIDEBAR_NAVIGATION_SYSTEM.md`](./internal/SIDEBAR_NAVIGATION_SYSTEM.md)
18. [`internal/PACKAGES.md`](./internal/PACKAGES.md)
19. [`internal/AI_UNIVERSAL_DESIGN_RULES.md`](./internal/AI_UNIVERSAL_DESIGN_RULES.md)
20. [`COMPOSITION_RULES_1.md`](./COMPOSITION_RULES_1.md) — zones + CTA hierarchy (FRD examples)

---

## Core usage rules

- Import from `ui-common-components` (or subpaths: `/charts`, `/shell`, `/table`) before building custom UI.
- Import `ui-common-components/design-system/tokens.css` once at app root.
- Import `ui-common-hooks` for hooks.
- Do not use Bootstrap. Do not hardcode token values.
- Follow WCAG 2.2 AA. Support `[data-theme="dark"]`.
- Follow **DESIGN_SYSTEM §22a** zone structure for every new screen ([`COMPOSITION_RULES_1.md`](./COMPOSITION_RULES_1.md) for FRD examples).

---

## Export names AI must remember

### Components

| Export | Source | Notes |
|--------|--------|-------|
| `DashboardShell` | `ui-common-components/shell` | `AppShell` is legacy alias — prefer `DashboardShell` |
| `AppSidebar` | `ui-common-components/shell` | |
| `AppTopbar` | `ui-common-components/shell` | |
| `Avtar` | `ui-common-components` | Not `Avatar` |
| `ToolTip` | `ui-common-components` | Not `Tooltip` |
| `Input` | `ui-common-components` | Not `TextInput` |
| `InputSearch` | `ui-common-components` | |
| `Card` | `ui-common-components` | Compound: `CardHeader`, `CardTitle`, `CardDescription`, `CardAction`, `CardContent`, `CardFooter` |
| `Table` | `ui-common-components/table` | Data API; `TableRoot`, `TableHeader`, `TableBody`, `TableRow`, `TableHead`, `TableCell` for semantic |
| `EmptyState` | `ui-common-components` | Default export from FeedbackStates; `image`, `icon`, `action`, `extra`, `size`, `align`, `tone` |
| `ErrorState` | `ui-common-components` | Named; `image`, `icon`, `hideIcon`, `details`, `onRetry`, `extra`, `tone`, `aria-live` |
| `OfflineBanner` | `ui-common-components` | Named; slim bar (no `image`) or full panel (with `image`) |
| `FeedbackState` | `ui-common-components` | `variant="empty"\|"success"\|"info"\|"error"\|"offline"` |
| `NoDataAnimation` | `ui-common-components` | CSS-animated SVG illustration |
| `NoSearchResultsAnimation` | `ui-common-components` | CSS-animated SVG |
| `ErrorAnimation` | `ui-common-components` | CSS-animated SVG |
| `OfflineAnimation` | `ui-common-components` | CSS-animated SVG |
| `SuccessAnimation` | `ui-common-components` | CSS-animated SVG |
| `InfoAnimation` | `ui-common-components` | CSS-animated SVG |

### Hooks (`ui-common-hooks`)

| Export | Purpose |
|--------|---------|
| `useAsyncContentPhase` | Phase machine: loading→offline→error→empty→ready |
| `useOnlineStatus` | `{ online: boolean }` |
| `useDebounce` | Debounced value |
| `useDebouncedCallback` | Debounced function |
| `useToggle` | `{ value, toggle, setTrue, setFalse }` |
| `useLocalStorage` | localStorage + cross-tab sync |
| `useEventListener` | Typed window/element listener |
| `usePrevious` | Previous render value |
| `useMount` / `useUnmount` | Lifecycle callbacks |
| `useClientTableState` | search + sort + pagination bundle |
| `usePagination` | Page state + `slicePage()` |
| `useSelection` | Keyed single/multi selection |
| `useMergedRefs` | Compose multiple refs |
| `useFocusTrap` | Tab cycle in container |
| `useDismissableLayer` | Escape + outside click |
| `useMediaQuery` | CSS media query → boolean |
| `usePrefersReducedMotion` | Reduced motion preference |
| `useDebounceClick` | Async submit mutex |
| `useLongPress` | Pointer long-press |
| `useSwipe` | Swipe with threshold |
| `useAsyncData` | Keyed fetch with abort |
| `useControllableState` | Controlled/uncontrolled |
| `useLatest` | Newest value ref |
| `useIsomorphicLayoutEffect` | SSR-safe layout effect |

### Token border naming

- `--color-border-default` → structural outlines (inputs, strong chrome)
- `--color-border-subtle` → decorative separators (card, modal, tabs, divider, button-group)

---

## FeedbackStates tone matrix

| Component | Allowed tones |
|-----------|--------------|
| `EmptyState` | `neutral`, `info`, `success`, `warning` |
| `ErrorState` | `neutral`, `info`, `success`, `warning`, `danger` |
| `OfflineBanner` | `neutral`, `warning` |

---

## CTA hierarchy (COMPOSITION_RULES_1)

| Slot | `variant` | `size` |
|------|-----------|--------|
| Page primary action | `primary` | `md`/`lg` |
| Page alt action | `outlineSecondary` | `sm` |
| EmptyState `action` | `primary` | `md` |
| EmptyState `extra` | `ghost` | `sm` |
| ErrorState retry | `outlinePrimary` | `md` |
| ErrorState `extra` | `ghost` | `sm` |
| Row actions | `ghost` | `sm` |
| Footer export | `ghost` | `sm` |
