# AI Agent Instructions — ui-common-components

> **This is the single entry point for any AI tool (Cursor, Claude, ChatGPT, Gemini, Copilot, etc.).**
> Read this file first, then follow the reading order below before generating any code.

---

## What this repo is

`ui-common-components` is a production React component library + companion hooks package for SaaS, dashboard, and enterprise applications. It includes:

- 80+ typed React components (forms, layout, data, navigation, charts, feedback)
- `ui-common-hooks` workspace package — 25 typed hooks
- UX Governance design system (CSS token-driven, WCAG 2.2 AA, dark-mode ready)
- Storybook with live controls for every component

**Package name:** `ui-common-components` (v0.0.2)  
**Hooks package:** `ui-common-hooks` (v0.3.0)  
**React:** 18+  
**TypeScript:** 5.x  

---

## Required reading order (do not skip any file)

```
1. AGENTS.md                                   ← this file
2. docs/README.md                              ← doc map + flow diagram
3. docs/AGENTS.md                              ← AI memory + export names
4. docs/AI_USAGE_GUIDE.md                      ← Always/Never rules + workflow
5. docs/UI_COMPONENTS_GUIDE.md                 ← component selection + APIs
6. docs/FEEDBACK_STATES_GUIDE.md               ← FeedbackStates + animations
7. docs/HOOKS_GUIDE.md                         ← ui-common-hooks reference
8. docs/design-system/README.md                ← design-system folder index
9. docs/design-system/DESIGN_SYSTEM.md         ← design governance
10. docs/design-system/tokens.md               ← token import + reference
11. docs/internal/README.md                    ← internal folder index
12. docs/internal/DOC_INDEX.md                 ← full internal map
13. docs/internal/APP_TOPBAR_SYSTEM.md         ← AppTopbar notes
14. docs/internal/SIDEBAR_NAVIGATION_SYSTEM.md ← AppSidebar notes
15. docs/internal/PACKAGES.md                  ← dependency rationale
16. docs/internal/AI_UNIVERSAL_DESIGN_RULES.md ← portable AI rules
17. COMPOSITION_RULES_1.md                     ← zones, CTA hierarchy, density rules
```

---

## Quick-start for AI code generation

### Setup (every app that uses this library)

```tsx
// 1. Install
// npm install ui-common-components ui-common-hooks

// 2. Import tokens once at app root
import "ui-common-components/design-system/tokens.css";
import "ui-common-components/index.css";

// 3. Optional dark mode
// <html data-theme="dark">
```

### Import paths

```tsx
import { Button, TextInput, Modal }  from "ui-common-components";
import { LineChart, BarChart }        from "ui-common-components/charts";
import { DashboardShell, AppTopbar }  from "ui-common-components/shell";
import { Table }                      from "ui-common-components/table";
import { useDebounce, useToggle }     from "ui-common-hooks";
```

---

## Critical export names (AI must know these)

| Correct name | Notes |
|---|---|
| `DashboardShell` | Shell layout; `AppShell` is legacy alias — use `DashboardShell` |
| `Avtar` | Avatar component (not `Avatar`) |
| `ToolTip` | Tooltip (not `Tooltip`) |
| `Input` | Single-line input (not `TextInput`) |
| `InputSearch` | Search input |
| `EmptyState` | Default export from `FeedbackStates` |
| `ErrorState` | Named export from `FeedbackStates` |
| `OfflineBanner` | Named export from `FeedbackStates` |
| `FeedbackState` | Variant-driven union component |
| `Card` | Default + compound parts: `CardHeader`, `CardTitle`, `CardDescription`, `CardAction`, `CardContent`, `CardFooter` |
| `Table` | Data-driven (columns/data); `TableRoot`, `TableHeader`, `TableBody`, `TableRow`, `TableHead`, `TableCell` for semantic HTML |

---

## The 5 visual zones (COMPOSITION_RULES_1 — apply to every screen)

Before writing any code, define zones:

```
ZONE 1: AppTopbar — page title + primary CTA
ZONE 2: Notification strip (OfflineBanner sticky / alert)
ZONE 3: Filters / tabs / breadcrumb
ZONE 4: Main content — Table | EmptyState | ErrorState | Charts | Form
ZONE 5: Pagination / footer / secondary actions
```

### CTA hierarchy rule

| Position | Variant | Size | Rule |
|---|---|---|---|
| Zone 1 main action | `primary` | `md` or `lg` | One per zone max |
| Zone 1 alt action | `outlineSecondary` | `sm` | Lower weight |
| Zone 4 EmptyState action | `primary` | `md` | Same goal as Zone 1 |
| Zone 4 EmptyState extra | `ghost` | `sm` | Escape hatches only |
| Zone 4 ErrorState retry | `outlinePrimary` | `md` | Recovery, not destructive |
| Zone 4 ErrorState extra | `ghost` | `sm` | |
| Row actions (Edit/Delete) | `ghost` | `sm` | Lowest hierarchy |
| Zone 5 Export / footer | `ghost` | `sm` | |

**Never** place two `variant="primary"` buttons at the same size and position (competing CTAs).

---

## FeedbackStates — when and how to use

### Use `EmptyState` when
- A list, table, or grid has no data
- A search or filter returned 0 results
- A section is intentionally empty (onboarding)

### Use `ErrorState` when
- An API call failed
- An action could not be completed
- A zone/widget cannot render its data

### Use `OfflineBanner` when
- Browser reports offline (`navigator.onLine === false`)
- Slim bar (Zone 2) = no `image` prop → sticky warning strip
- Full panel (Zone 4) = with `image` prop → content-area replacement

### Use `FeedbackState` (variant router) when
- Switching states from `useAsyncContentPhase` phase machine
- `variant="empty" | "success" | "info" | "error" | "offline"`

### Animations (CSS-only, no runtime deps)
```tsx
import {
  NoDataAnimation, NoSearchResultsAnimation,
  ErrorAnimation, OfflineAnimation,
  SuccessAnimation, InfoAnimation,
} from "ui-common-components";

// Pass to `image` prop on EmptyState / ErrorState / OfflineBanner / FeedbackState
<EmptyState image={<NoDataAnimation size={120} />} title="No records" />
<FeedbackState variant="offline" image={<OfflineAnimation size={110} />} />
```

---

## ui-common-hooks — when and how to use

```tsx
import {
  // Phase machine (drives which FeedbackState to show)
  useAsyncContentPhase,      // phase: "loading"|"offline"|"error"|"empty"|"ready"
  useOnlineStatus,           // { online: boolean }

  // Data / state
  useAsyncData,              // { data, loading, error } with AbortController
  useClientTableState,       // search + sort + pagination bundle
  useDebounce,               // debounced value (400ms default)
  useDebouncedCallback,      // debounced function
  useLocalStorage,           // localStorage with cross-tab sync

  // UI state
  useToggle,                 // { value, toggle, setTrue, setFalse }
  useControllableState,      // controlled/uncontrolled value
  usePagination,             // page state + slicePage()
  useSelection,              // single/multi keyed selection

  // DOM / refs
  useMergedRefs,             // merge multiple refs onto one node
  useFocusTrap,              // Tab cycle within a container
  useDismissableLayer,       // Escape + outside click
  useEventListener,          // typed window/element event listener

  // Responsive / media
  useMediaQuery,             // "(min-width: 768px)" → boolean
  usePrefersReducedMotion,   // "prefers-reduced-motion" → boolean

  // Gestures
  useDebounceClick,          // async submit mutex
  useLongPress,              // pointer long-press
  useSwipe,                  // swipe threshold
  useTouchHandler,           // tap heuristic

  // Lifecycle
  useMount, useUnmount,      // mount / unmount side-effects
  usePrevious,               // previous render value
  useLatest,                 // latest value ref
  useIsomorphicLayoutEffect, // SSR-safe layout effect
} from "ui-common-hooks";
```

---

## Accessibility checklist (verify before generating code)

- [ ] All interactive elements ≥ 44×44px touch target
- [ ] Focus rings visible (`--color-focus-ring` token)
- [ ] Color contrast ≥ 4.5:1 for text
- [ ] Form `<label>` associated with every input
- [ ] Tables have `<TableHead>` with column headers
- [ ] Modals have `aria-label` or `aria-labelledby`
- [ ] Live regions: `aria-live="polite"` for status, `"assertive"` for errors
- [ ] Error messages linked via `aria-describedby`
- [ ] `EmptyState` / `ErrorState` have `aria-labelledby` + `aria-describedby` (built-in via `useId`)

---

## Always / Never rules

### Always
- Use `ui-common-components` before building custom UI
- Import `tokens.css` once at app root
- Use CSS variable tokens, never hardcode hex/px values
- Define 5 visual zones before writing code (COMPOSITION_RULES_1)
- Use `DashboardShell` for dashboard layouts (not raw flex + sidebar)
- Pair `FeedbackState`/`EmptyState`/`ErrorState` with `useAsyncContentPhase`
- Set `aria-live` appropriately on feedback components

### Never
- Use Bootstrap with this library
- Hardcode colors, spacing, radii, or shadows
- Create multiple equal-weight `variant="primary"` CTAs at the same level
- Skip reading `docs/internal/` — it is required, not optional
- Use `AppShell` in new code (legacy alias; use `DashboardShell`)
- Use `dangerouslySetInnerHTML`

---

## Storybook

```bash
npm run storybook        # http://localhost:6006
npm run build-storybook  # static build → storybook-static/
```

Stories live under `src/stories/`. Each component has a **Playground** story with full Storybook controls (argTypes) so every prop is configurable via the Controls panel — same experience as shown in the Calendar/Card documentation.

---

## Development

```bash
npm run build            # build library + types
npm run test             # run vitest
npm run storybook        # start Storybook dev server
npm run build -w ui-common-hooks  # build hooks package
npm run test -w ui-common-hooks   # test hooks package
```
