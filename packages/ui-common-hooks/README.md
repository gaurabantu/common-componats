# ui-common-hooks

Typed React hooks aligned with **Radix UI**, **TanStack**, **ahooks**, **`react-use`**, and **`react-swipeable`** patterns — without importing those packages at runtime.

Companion to `ui-common-components`: hook-only (`sideEffects: false`), tree-shakable ESM + CJS builds.

**Version:** 0.3.0 | **Hooks:** 25 | **React:** 18+

---

## Install

```bash
npm install ui-common-hooks
```

Peer: `react >= 18`.

---

## Hook catalog

### Phase 1 — Gestures & submits

| Hook | Purpose |
|------|---------|
| `useDebounceClick` | Mutex + `isProcessing` for async submits / double-submit guard |
| `useLatest` | Ref mirroring newest render value |
| `useAsyncData` | Keyed `{ data, loading, error }` with `AbortSignal` staleness guards |
| `useLongPress` | Pointer long-press with drift cancellation |
| `useSwipe` | Pointer swipe thresholds + timeouts |
| `useTouchHandler` | Tap heuristic vs scroll/movement jitter |

### Phase 2 — Overlay & refs

| Hook | Purpose |
|------|---------|
| `useControllableState` | Controlled vs internal state (`value` / `defaultValue` / `onChange`) |
| `useFocusTrap` | Keeps Tab cycling inside dialogs / popovers |
| `useDismissableLayer` | Escape + capture-phase outside pointer dismissal |
| `useMergedRefs` | Compose forwarded refs (+ `mergeRefs` / `assignRef` helpers) |

### Phase 3 — Responsive & SSR

| Hook | Purpose |
|------|---------|
| `useMediaQuery` | `window.matchMedia` subscriptions |
| `usePrefersReducedMotion` | `prefers-reduced-motion` shorthand |
| `useIsomorphicLayoutEffect` | `useLayoutEffect` only in browser documents |

### Phase 4 — Table & selection

| Hook | Purpose |
|------|---------|
| `usePagination` | Page math / `slicePage` / `totalsFor` helpers |
| `useSelection` | Single & multi keyed selection buckets |
| `useClientTableState` | Bundled filter + numeric-aware sort + pagination for headless grids |

### Network & feedback routing

| Hook | Purpose |
|------|---------|
| `useOnlineStatus` | Mirrors `navigator.onLine` + `online`/`offline` events |
| `useAsyncContentPhase` | `loading → offline → error → empty → ready` phase machine |

### Phase 5 — Utility

| Hook | Purpose |
|------|---------|
| `useDebounce` | Debounced value (400ms default) |
| `useDebouncedCallback` | Debounced callback function |
| `useToggle` | `{ value, toggle, setTrue, setFalse, set }` boolean state |
| `useEventListener` | Typed `window` / `document` / element event listener with auto-cleanup |
| `usePrevious` | Previous render value (undefined on first render) |
| `useMount` | Callback once on mount — Strict Mode safe |
| `useUnmount` | Callback on unmount (guaranteed cleanup) |
| `useLocalStorage` | `localStorage` with JSON serialization + cross-tab sync |

---

## Usage snapshots

### `useDebounce` — search input

```tsx
const debouncedQuery = useDebounce(query, 400);
useEffect(() => { if (debouncedQuery) search(debouncedQuery); }, [debouncedQuery]);
```

### `useToggle` — modal / drawer

```tsx
const [isOpen, { toggle, setFalse }] = useToggle(false);
<Button onClick={toggle}>Open</Button>
<Modal isOpen={isOpen} onClose={setFalse} />
```

### `useLocalStorage` — persisted state

```tsx
const [theme, setTheme] = useLocalStorage("app-theme", "light");
```

### `useEventListener` — keyboard shortcuts

```tsx
useEventListener("keydown", (e) => {
  if (e.key === "Escape") closeModal();
});
```

### `useDebounceClick` — async submit guard

```tsx
const [save, isProcessing] = useDebounceClick(async () => api.save(form));
<Button loading={isProcessing} onClick={() => save()}>Save</Button>
```

### `useDismissableLayer` + `useFocusTrap` — dialog

```tsx
const ref = useRef<HTMLDivElement>(null);
useDismissableLayer({ referenceRef: ref, enabled: open, onDismiss: () => setOpen(false) });
useFocusTrap({ active: open, containerRef: ref });
return <div ref={ref} role="dialog" aria-modal="true">{/* ... */}</div>;
```

### `useClientTableState` — data table

```tsx
const { search, setSearch, pageRows, toggleSort, sortState, pagination } =
  useClientTableState({
    data: invoices,
    searchColumns: ["customer", "id"],
    pageSize: 10,
  });
```

### `useAsyncContentPhase` — feedback state machine

```tsx
import { FeedbackState, NoDataAnimation, ErrorAnimation, OfflineAnimation }
  from "ui-common-components";
import { useAsyncContentPhase } from "ui-common-hooks";

const { phase } = useAsyncContentPhase({ items, loading, error, requireNetwork: true });

if (phase === "loading") return <Skeleton />;
if (phase !== "ready")
  return (
    <FeedbackState
      variant={phase}
      image={
        phase === "offline" ? <OfflineAnimation size={110} /> :
        phase === "error"   ? <ErrorAnimation size={110} /> :
        <NoDataAnimation size={120} />
      }
      onRetry={phase === "error" ? refetch : undefined}
    />
  );
return <Table columns={cols} data={items} />;
```

---

## Full documentation

See [`docs/HOOKS_GUIDE.md`](../../docs/HOOKS_GUIDE.md) in the repository root for examples covering every hook.

---

## Development

```bash
npm run build -w ui-common-hooks   # build ESM + CJS + types
npm run test -w ui-common-hooks    # run vitest
```

Storybook demos: `npm run storybook` → **Design System / Hooks / ui-common-hooks**

---

## License

MIT
