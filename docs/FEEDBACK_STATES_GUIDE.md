# Feedback States Guide

Reference for `EmptyState`, `ErrorState`, `OfflineBanner`, `FeedbackState`, and the animated SVG illustration set.

**Governance:** [`design-system/DESIGN_SYSTEM.md`](./design-system/DESIGN_SYSTEM.md) §22a (canonical zones) · §34 (empty/loading/error rules) · §35a (agent feedback routing) · [`COMPOSITION_RULES_1.md`](./COMPOSITION_RULES_1.md) (FRD examples + CTA hierarchy).

---

## Overview

The `FeedbackStates` module replaces ad-hoc "no data" / "error" / "offline" patterns with a consistent, accessible, and composable set of components.

| Component | When to use |
|-----------|-------------|
| `EmptyState` | List/table/grid has no data; search returned 0 results; intentionally empty section |
| `ErrorState` | API failed; action could not complete; widget cannot render |
| `OfflineBanner` | Browser is offline — slim strip (Zone 2) or full panel (Zone 4) |
| `FeedbackState` | Variant router when state is driven by `useAsyncContentPhase` phase machine |

---

## Import

```tsx
import {
  EmptyState,
  ErrorState,
  OfflineBanner,
  FeedbackState,
  NoDataAnimation,
  NoSearchResultsAnimation,
  ErrorAnimation,
  OfflineAnimation,
  SuccessAnimation,
  InfoAnimation,
} from "ui-common-components";

import type {
  EmptyStateProps,
  ErrorStateProps,
  OfflineBannerProps,
  FeedbackStateProps,
  FeedbackVisualTone,
  FeedbackSize,
  FeedbackStateVariant,
} from "ui-common-components";
```

---

## EmptyState

```tsx
<EmptyState
  title="No results found"
  description="Try adjusting your filters or search terms."
  image={<NoSearchResultsAnimation size={120} />}
  tone="neutral"
  size="md"
  align="center"
  action={<Button variant="primary" size="md">Add first item</Button>}
  extra={<Button variant="ghost" size="sm">Import CSV</Button>}
/>
```

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `title` | `ReactNode` | — | Main heading (Zone 4 headline) |
| `description` | `ReactNode` | — | Supporting text below heading |
| `icon` | `ReactNode` | — | Small glyph / emoji above title |
| `iconLabel` | `string` | — | When icon conveys meaning, add `iconLabel` for screen readers |
| `image` | `ReactNode` | — | Large illustration above title. Use `<NoDataAnimation />` or custom. |
| `action` | `ReactNode` | — | Primary CTA — use `<Button variant="primary" size="md">` |
| `extra` | `ReactNode` | — | Secondary/tertiary actions — use `<Button variant="ghost" size="sm">` |
| `tone` | `FeedbackVisualTone` | `"neutral"` | Visual accent: `"neutral"`, `"info"`, `"success"`, `"warning"` |
| `size` | `FeedbackSize` | `"md"` | `"sm"` / `"md"` / `"lg"` — controls padding and icon scale |
| `align` | `"start" \| "center"` | `"center"` | Text and content alignment |
| `compact` | `boolean` | `false` | Reduces vertical padding (use inside cards, panels) |
| `role` | `string` | `"region"` | ARIA role |
| `className` | `string` | — | Additional class names |

### Tone → visual meaning

| `tone` | Use for |
|--------|---------|
| `"neutral"` | No data, empty list, blank slate |
| `"info"` | Guidance, onboarding, first-use tips |
| `"success"` | Completed action, nothing left to do |
| `"warning"` | Limited data, stale results |

---

## ErrorState

```tsx
<ErrorState
  title="Failed to load data"
  description="An unexpected error occurred. Please try again."
  tone="danger"
  size="md"
  align="center"
  image={<ErrorAnimation size={120} />}
  onRetry={() => refetch()}
  retryLabel="Try again"
  details="Error 500: Internal Server Error"
  extra={<Button variant="ghost" size="sm">Contact support</Button>}
  aria-live="assertive"
/>
```

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `title` | `ReactNode` | `"Something went wrong"` | Error heading |
| `description` | `ReactNode` | — | Supporting message |
| `image` | `ReactNode` | — | Large illustration (use `<ErrorAnimation />`) |
| `icon` | `ReactNode` | — | Override the default tone-matched icon |
| `hideIcon` | `boolean` | `false` | Hide the default icon entirely |
| `details` | `ReactNode` | — | Collapsible technical details / stack trace |
| `onRetry` | `() => void` | — | Renders a retry button when provided |
| `retryLabel` | `string` | `"Try again"` | Label for retry button |
| `extra` | `ReactNode` | — | Secondary actions (ghost buttons) |
| `tone` | `FeedbackVisualTone` | `"danger"` | `"neutral"`, `"info"`, `"success"`, `"warning"`, `"danger"` |
| `size` | `FeedbackSize` | `"md"` | `"sm"` / `"md"` / `"lg"` |
| `align` | `"start" \| "center"` | `"center"` | Text alignment |
| `compact` | `boolean` | `false` | Reduced padding (inside cards) |
| `role` | `"alert" \| "status" \| "region"` | `"alert"` | Live region role |
| `aria-live` | `"assertive" \| "polite" \| "off"` | auto (follows `role`) | Screen reader live region policy |
| `className` | `string` | — | |

---

## OfflineBanner

The component has **two display modes** determined by the `image` prop:

- **Slim bar (default):** no `image` → compact horizontal strip, sticks to top of Zone 2
- **Full panel:** with `image` → full content-area panel like EmptyState, used in Zone 4

```tsx
// Slim bar — Zone 2 (sticky notification strip)
<OfflineBanner
  tone="warning"
  sticky
  compact
  message="You're offline. Changes may not be saved."
  onRetry={handleRetry}
  onDismiss={() => setDismissed(true)}
/>

// Full panel — Zone 4 (replaces main content area)
<OfflineBanner
  image={<OfflineAnimation size={110} />}
  headline="No internet connection"
  message="Check your connection and try again."
  onRetry={handleRetry}
  tone="warning"
/>
```

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `headline` | `ReactNode` | `"No internet connection."` | Banner heading |
| `message` | `ReactNode` | — | Supporting guidance |
| `leadingIcon` | `ReactNode` | default wifi-off SVG | Icon before text in slim mode |
| `image` | `ReactNode` | — | Large illustration → activates full-panel mode |
| `tone` | `"neutral" \| "warning"` | `"neutral"` | Visual accent |
| `sticky` | `boolean` | `false` | `position: sticky; top: 0` |
| `compact` | `boolean` | `false` | Slim mode: reduce height |
| `actionLabel` | `string` | `"Retry"` | Retry button label |
| `onRetry` | `() => void` | — | Renders retry button when provided |
| `onDismiss` | `() => void` | — | Renders dismiss (×) button when provided |
| `dismissLabel` | `string` | `"Dismiss"` | Accessible label for dismiss button |
| `role` | `"status"` | `"status"` | ARIA live region role |
| `className` | `string` | — | |

---

## FeedbackState (variant router)

Use `FeedbackState` when a single component needs to switch between states driven by `useAsyncContentPhase`:

```tsx
import { FeedbackState } from "ui-common-components";
import { useAsyncContentPhase, useOnlineStatus } from "ui-common-hooks";

function UserList() {
  const { online } = useOnlineStatus();
  const { data, loading, error } = useAsyncData("users", fetchUsers);
  const { phase } = useAsyncContentPhase({
    items: data,
    loading,
    error,
    requireNetwork: true,
  });

  if (phase === "loading") return <Skeleton />;
  if (phase !== "ready")
    return (
      <FeedbackState
        variant={phase}                 // "empty" | "error" | "offline"
        title={phase === "offline" ? "No connection" : undefined}
        image={
          phase === "offline" ? <OfflineAnimation size={110} /> :
          phase === "error"   ? <ErrorAnimation size={110} /> :
          <NoDataAnimation size={120} />
        }
        onRetry={phase === "error" ? () => refetch() : undefined}
      />
    );

  return <Table columns={cols} data={data} />;
}
```

### Variants

| `variant` | Delegates to | Default tone | Default icon injected |
|-----------|-------------|--------------|----------------------|
| `"empty"` | `EmptyState` | `"neutral"` | none |
| `"success"` | `EmptyState` | `"success"` | ✓ checkmark SVG |
| `"info"` | `EmptyState` | `"info"` | ℹ info SVG |
| `"error"` | `ErrorState` | `"danger"` | none |
| `"offline"` | `OfflineBanner` | `"neutral"` | none |

All props from the underlying component pass through (except `variant`).

---

## Animated SVG illustrations

All animations are **pure CSS — zero runtime dependencies**, theme-aware via CSS variables, and safe for `prefers-reduced-motion` environments.

### Available animations

| Export | Visual | Best with |
|--------|--------|-----------|
| `NoDataAnimation` | Floating inbox tray with lines | `EmptyState` — no data |
| `NoSearchResultsAnimation` | Rocking magnifier + ✕ | `EmptyState` — empty search |
| `ErrorAnimation` | Pulsing shield with ✕ | `ErrorState` |
| `OfflineAnimation` | Wifi-off with animated slash | `OfflineBanner` (full panel) |
| `SuccessAnimation` | Checkmark circle draw | `EmptyState` variant="success" |
| `InfoAnimation` | Info badge pulse | `EmptyState` variant="info" |

### Usage

```tsx
import { NoDataAnimation, ErrorAnimation, OfflineAnimation } from "ui-common-components";

// Pass to image prop
<EmptyState
  image={<NoDataAnimation size={120} />}
  title="No users yet"
/>

<ErrorState
  image={<ErrorAnimation size={120} />}
  title="Failed to load"
/>

<OfflineBanner
  image={<OfflineAnimation size={110} />}
  headline="You're offline"
/>
```

### Animation props

```ts
interface IllustrationProps {
  size?: number;          // width + height in px (default 120)
  className?: string;
  "aria-hidden"?: boolean | "true" | "false"; // default: "true"
}
```

---

## Motion & reduced motion (§18)

Feedback SVG illustrations are **decorative only**. They must never be the sole carrier of status — always pair with `title` / `description` (or `OfflineBanner` `headline`).

| Rule | Detail |
|------|--------|
| **`aria-hidden`** | Default `"true"` on all six animation components. Set `"false"` only if you also provide visible text that duplicates the meaning (rare). |
| **No autoplay policy violation** | Loops are CSS-only, muted, and decorative — not video/audio. |
| **`prefers-reduced-motion: reduce`** | Keyframes disabled via `.ds-feedback-illustration` in `FeedbackStates.css` — static SVG remains visible. |
| **Hook (optional)** | `usePrefersReducedMotion()` from `ui-common-hooks` if you wrap illustrations in custom motion logic. |

Governance: [`design-system/DESIGN_SYSTEM.md`](./design-system/DESIGN_SYSTEM.md) §18.

### AI review — acceptance criteria

Before merging FeedbackStates usage, verify:

- [ ] `title` (and `description` when helpful) present — animation alone is insufficient
- [ ] Illustration uses library export (`NoDataAnimation`, etc.) or omits `image` — no third-party Lottie without reduced-motion handling
- [ ] Decorative SVGs have `aria-hidden="true"` (default on library animations)
- [ ] With OS “Reduce motion” enabled, illustration shows **static** art (no pulsing/floating/bouncing)
- [ ] `ErrorState` / offline messaging still exposed via `role="alert"` or `role="status"` + `aria-live` as appropriate
- [ ] No animation substitutes for loading state — use skeleton/table loading or explicit loading UI

---

## Zone mapping (DESIGN_SYSTEM §22a)

Canonical zone definitions live in **`design-system/DESIGN_SYSTEM.md` §22a**. This table maps FeedbackStates components to zones (matches Storybook real-world stories):

| Zone | Component mode | Notes |
|------|---------------|-------|
| Zone 2 | `OfflineBanner` slim (no `image`) | `sticky` top bar, compact |
| Zone 4 | `EmptyState` | Full content replacement |
| Zone 4 | `ErrorState` | Full content replacement |
| Zone 4 | `OfflineBanner` full panel (with `image`) | When content area is offline |
| Inside `CardContent` | `EmptyState` compact / `ErrorState` compact | Widget-level feedback |

---

## Accessibility

- Both `EmptyState` and `ErrorState` use `useId` internally to set `aria-labelledby` and `aria-describedby`.
- `ErrorState` defaults `role="alert"` and `aria-live="assertive"` — override with `role="status"` + `aria-live="polite"` for non-critical errors.
- `OfflineBanner` defaults `role="status"` and `aria-atomic="true"`.
- Animated SVGs are `aria-hidden="true"` by default — they are decorative; see **Motion & reduced motion** above.
- Touch targets: all action buttons are ≥ 44×44px.

---

## Storybook stories

| Story file | Location |
|------------|----------|
| EmptyState Playground | `Design System / Molecules / Feedback states / EmptyState` |
| ErrorState Playground | `Design System / Molecules / Feedback states / ErrorState` |
| OfflineBanner Playground | `Design System / Molecules / Feedback states / OfflineBanner` |
| FeedbackState Variants | `Design System / Molecules / Feedback states / FeedbackState` |
| Real-world (DashboardShell) | `Design System / Molecules / Feedback states / Real World` |

Every story has a **Controls** panel where all props are configurable.
