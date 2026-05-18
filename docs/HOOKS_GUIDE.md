# Hooks Guide — ui-common-hooks

Complete reference for all 25 typed React hooks in the `ui-common-hooks` package.

---

## Install

```bash
npm install ui-common-hooks
```

Peer: `react >= 18`. Tree-shakable ESM + CJS, `sideEffects: false`.

```tsx
import { useDebounce, useToggle, useAsyncContentPhase } from "ui-common-hooks";
```

---

## Hook catalog

### Phase 1 — Gestures & submits

| Hook | Purpose |
|------|---------|
| `useDebounceClick` | Async submit mutex + `isProcessing` guard (prevents double-submit) |
| `useLatest` | Ref mirroring newest render value (stable identity across renders) |
| `useAsyncData` | Keyed `{ data, loading, error }` with `AbortSignal` staleness guards |
| `useLongPress` | Pointer long-press detection with drift cancellation |
| `useSwipe` | Pointer swipe thresholds + direction + timeout |
| `useTouchHandler` | Tap heuristic vs scroll/movement jitter |

### Phase 2 — Overlay & refs

| Hook | Purpose |
|------|---------|
| `useControllableState` | Controlled vs. internal state pattern (`value` / `defaultValue` / `onChange`) |
| `useFocusTrap` | Keeps Tab cycling inside dialogs / popovers (a11y) |
| `useDismissableLayer` | Escape + capture-phase outside pointer dismissal |
| `useMergedRefs` | Compose multiple forwarded refs onto one DOM node |

### Phase 3 — Responsive & SSR

| Hook | Purpose |
|------|---------|
| `useMediaQuery` | `window.matchMedia` subscriptions — reactive boolean |
| `usePrefersReducedMotion` | `prefers-reduced-motion` shorthand |
| `useIsomorphicLayoutEffect` | `useLayoutEffect` in browser, `useEffect` in SSR |

### Phase 4 — Table & selection

| Hook | Purpose |
|------|---------|
| `usePagination` | Page math, `slicePage()`, `totalsFor()` helpers |
| `useSelection` | Single & multi keyed selection state buckets |
| `useClientTableState` | Bundled filter + numeric-aware sort + pagination for headless grids |

### Network & feedback state routing

| Hook | Purpose |
|------|---------|
| `useOnlineStatus` | Mirrors `navigator.onLine` + `online`/`offline` events → `{ online: boolean }` |
| `useAsyncContentPhase` | Phase machine: `loading → offline → error → empty → ready` |

### Utility hooks (Phase 5)

| Hook | Purpose |
|------|---------|
| `useDebounce` | Returns debounced version of a value |
| `useDebouncedCallback` | Returns a debounced version of a callback |
| `useToggle` | Boolean state with `toggle`, `setTrue`, `setFalse`, `set` |
| `useEventListener` | Typed `window`, `document`, or element event listener with auto-cleanup |
| `usePrevious` | Previous render value (undefined on first render) |
| `useMount` | Runs callback exactly once on mount (Strict Mode safe) |
| `useUnmount` | Runs callback on unmount (guaranteed cleanup) |
| `useLocalStorage` | `useState` backed by `localStorage` with JSON serialization and cross-tab sync |

---

## Usage examples

### `useDebounce`

```tsx
import { useDebounce } from "ui-common-hooks";

function SearchBar() {
  const [query, setQuery] = useState("");
  const debouncedQuery = useDebounce(query, 400); // 400ms default

  useEffect(() => {
    if (debouncedQuery) search(debouncedQuery);
  }, [debouncedQuery]);

  return <InputSearch value={query} onValueChange={setQuery} />;
}
```

### `useDebouncedCallback`

```tsx
import { useDebouncedCallback } from "ui-common-hooks";

const handleSave = useDebouncedCallback(async (value: string) => {
  await api.save(value);
}, 600);
```

### `useToggle`

```tsx
import { useToggle } from "ui-common-hooks";

const [isOpen, { toggle, setTrue, setFalse }] = useToggle(false);

<Button onClick={toggle}>Toggle</Button>
<Modal isOpen={isOpen} onClose={setFalse} />
```

### `useLocalStorage`

```tsx
import { useLocalStorage } from "ui-common-hooks";

const [theme, setTheme] = useLocalStorage("app-theme", "light");
// Updates persist across browser refreshes and sync across tabs
```

### `useEventListener`

```tsx
import { useEventListener } from "ui-common-hooks";

// Attach to window
useEventListener("keydown", (e) => {
  if (e.key === "Escape") closeModal();
});

// Attach to a DOM ref
const ref = useRef<HTMLDivElement>(null);
useEventListener("click", handleClick, ref);
```

### `usePrevious`

```tsx
import { usePrevious } from "ui-common-hooks";

const prevCount = usePrevious(count);
// undefined on first render
```

### `useMount` / `useUnmount`

```tsx
import { useMount, useUnmount } from "ui-common-hooks";

useMount(() => {
  analytics.track("page_view");
});

useUnmount(() => {
  subscription.unsubscribe();
});
```

### `useOnlineStatus`

```tsx
import { useOnlineStatus } from "ui-common-hooks";

const { online } = useOnlineStatus();

if (!online) return <OfflineBanner sticky compact message="You are offline." />;
```

### `useAsyncContentPhase`

The primary hook for wiring `EmptyState`, `ErrorState`, and `OfflineBanner`.

```tsx
import { useAsyncContentPhase } from "ui-common-hooks";
import { FeedbackState, NoDataAnimation, ErrorAnimation, OfflineAnimation } from "ui-common-components";

function UserTable() {
  const { data, loading, error } = useAsyncData("users", fetchUsers);
  const { phase } = useAsyncContentPhase({
    items: data,
    loading,
    error,
    requireNetwork: true,   // enables offline phase check
  });

  if (phase === "loading") return <Skeleton />;

  if (phase !== "ready") {
    return (
      <FeedbackState
        variant={phase}
        image={
          phase === "offline" ? <OfflineAnimation size={110} /> :
          phase === "error"   ? <ErrorAnimation size={110} /> :
          <NoDataAnimation size={120} />
        }
        onRetry={phase === "error" ? () => refetch() : undefined}
      />
    );
  }

  return <Table columns={cols} data={data} />;
}
```

### `useClientTableState`

```tsx
import { useClientTableState } from "ui-common-hooks";

const { search, setSearch, pageRows, toggleSort, sortState, pagination } =
  useClientTableState({
    data: invoices,
    searchColumns: ["customer", "id", "status"],
    pageSize: 20,
  });

return (
  <>
    <InputSearch value={search} onValueChange={setSearch} />
    <Table columns={columns} data={pageRows} />
    <Pager {...pagination} />
  </>
);
```

### `useMediaQuery`

```tsx
import { useMediaQuery } from "ui-common-hooks";

const isDesktop = useMediaQuery("(min-width: 1024px)");
const isMobile  = useMediaQuery("(max-width: 767px)");
```

### `useMergedRefs`

```tsx
import { useMergedRefs } from "ui-common-hooks";

const MyInput = forwardRef<HTMLInputElement, Props>((props, forwardedRef) => {
  const internalRef = useRef<HTMLInputElement>(null);
  const ref = useMergedRefs(forwardedRef, internalRef);
  return <input ref={ref} {...props} />;
});
```

### `useFocusTrap` + `useDismissableLayer`

```tsx
import { useFocusTrap, useDismissableLayer } from "ui-common-hooks";

const containerRef = useRef<HTMLDivElement>(null);

useFocusTrap({ active: isOpen, containerRef });
useDismissableLayer({
  referenceRef: containerRef,
  enabled: isOpen,
  onDismiss: () => setIsOpen(false),
});

return (
  <div ref={containerRef} role="dialog" aria-modal="true">
    {/* Tab-cycles within this container when isOpen */}
  </div>
);
```

### `useDebounceClick`

```tsx
import { useDebounceClick } from "ui-common-hooks";

const [save, isProcessing] = useDebounceClick(async () => {
  await api.save(formData);
});

<Button variant="primary" loading={isProcessing} onClick={() => save()}>
  Save changes
</Button>
```

### `usePagination`

```tsx
import { usePagination } from "ui-common-hooks";

const { page, setPage, pageSize, totalPages, slicePage } = usePagination({
  total: items.length,
  pageSize: 10,
});

const visible = slicePage(items);
```

### `useSelection`

```tsx
import { useSelection } from "ui-common-hooks";

const { selected, toggle, selectAll, clearAll, isSelected } = useSelection<string>();

<CheckBox checked={isSelected(row.id)} onChange={() => toggle(row.id)} />
```

### `useAsyncData`

```tsx
import { useAsyncData } from "ui-common-hooks";

const { data, loading, error, refetch } = useAsyncData("key", async (signal) => {
  const res = await fetch("/api/users", { signal });
  return res.json();
});
```

---

## Type exports

```ts
import type {
  UseAsyncContentPhaseOptions,
  UseAsyncContentPhaseResult,
  UseClientTableStateOptions,
  UsePaginationOptions,
  UseSelectionResult,
  UseDebouncedCallbackOptions,
  UseToggleResult,
  UseLocalStorageOptions,
} from "ui-common-hooks";
```

---

## Development

```bash
npm run build -w ui-common-hooks   # build package
npm run test -w ui-common-hooks    # run vitest
```

Storybook stories for all hooks live at `src/stories/hooks/UICommonHooks.stories.tsx`. Run `npm run storybook` and navigate to **Design System / Hooks / ui-common-hooks** to see live demos and controls for every hook.
