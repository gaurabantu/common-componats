import * as ReactNs from 'react';
import { SetStateAction, useLayoutEffect, Dispatch, RefObject } from 'react';

/**
 * Returns a mutable ref whose `.current` is always the latest `value`.
 * Pattern used by ahooks/useMemoizedFn internals and TanStack Query's `ensureQueryFn`:
 * avoids stale closures in effects, subscriptions, or timeout callbacks without widening deps arrays.
 *
 * Uses `useLayoutEffect` so the ref updates before subsequent layout reads in the same commit.
 */
declare function useLatest<T>(value: T): ReactNs.RefObject<T>;

interface UseDebounceClickOptions {
    /**
     * After a synchronous handler returns, ignore further invokes for this many milliseconds.
     * Use when handlers are synchronous but downstream work may still duplicate (avoid double submits).
     * @default 0 (no cooldown; only sequential calls are guarded by the in-flight mutex)
     */
    syncCooldownMs?: number;
}
/**
 * Prevents overlapping invocations of the wrapped handler (`ahooks`/use-lock style).
 * Tracks `isProcessing` while an async promise is pending or while an optional synchronous cooldown applies.
 *
 * For double-submit UX, prefer async handlers (return `Promise`) and disable the triggering `Button`
 * via `disabled={isProcessing}` or `loading` from your UI library.
 *
 * Tuple return matches common ergonomics `[run, pending]` (`useMutation`-like).
 */
declare function useDebounceClick<TArgs extends unknown[]>(handler: (...args: TArgs) => void | Promise<unknown>, options?: UseDebounceClickOptions): [(...args: TArgs) => void, boolean];

interface UseAsyncDataResult<T> {
    data: T | undefined;
    loading: boolean;
    error: Error | undefined;
}
interface UseAsyncDataOptions {
    /** When false, skips fetching while keeping existing `data` if any. Default true */
    enabled?: boolean;
}
/**
 * Fetches keyed async data with `AbortController`: changing `key` aborts stale requests before applying results
 * (`React.useEffect` stale-response guard pattern; similar spirit to TanStack Query / SWR keyed requests).
 *
 * Pass stable key material (serialized query params); keep `fetcher` inline — it is referenced via ref.
 *
 * Abort errors are swallowed and do not set `error`.
 */
declare function useAsyncData<T>(key: string | number | bigint | boolean | null | undefined, fetcher: (signal: AbortSignal) => Promise<T>, options?: UseAsyncDataOptions): UseAsyncDataResult<T>;

interface UseLongPressOptions {
    /**
     * Delay before invoking `onLongPress` (`react-use`/material-style long press).
     * @default 500
     */
    ms?: number;
    onLongPress: (event: ReactNs.PointerEvent) => void;
    /**
     * Cancel if pointer moves beyond this Euclidean distance from the down point (helps vs scroll jitter).
     * @default 10
     */
    moveThreshold?: number;
}
type UseLongPressReturn = Pick<ReactNs.DOMAttributes<Element>, "onPointerDown" | "onPointerMove" | "onPointerUp" | "onPointerLeave" | "onPointerCancel">;
/**
 * Pointer-events long press (Chrome/Safari touch + mouse parity); cancel on scroll-like movement / release.
 * Compose returned handlers onto a single interactive element (`role`, `tabIndex`, and `touch-action` are app concerns).
 *
 * Prefer `touch-action: manipulation` CSS on interactive targets where needed to minimize browser zoom delay.
 */
declare function useLongPress(options: UseLongPressOptions): UseLongPressReturn;

interface UseSwipeOptions {
    /** Minimum swipe distance along one axis (`react-swipeable`-style thresholds). @default 40 */
    threshold?: number;
    /** Max duration since pointer down for a swipe to count (`react-use` gestures). @default 600 */
    timeoutMs?: number;
    onSwipeLeft?: (event: ReactNs.PointerEvent) => void;
    onSwipeRight?: (event: ReactNs.PointerEvent) => void;
    onSwipeUp?: (event: ReactNs.PointerEvent) => void;
    onSwipeDown?: (event: ReactNs.PointerEvent) => void;
}
type UseSwipeReturn = Pick<ReactNs.DOMAttributes<Element>, "onPointerDown" | "onPointerMove" | "onPointerUp" | "onPointerCancel">;
/**
 * Axis swipe detection via Pointer Events; uses `setPointerCapture` for consistent `pointermove` delivery.
 *
 * Typical CSS: constrain scroll vs swipe (`touch-action`) on the swipe surface (often `touch-action: pan-y` for horizontal swipes).
 */
declare function useSwipe(options: UseSwipeOptions): UseSwipeReturn;

interface UseTouchHandlerOptions {
    /** Max movement (px) to still classify as tap vs intentional scroll/fling (`react-use`/mobile tap heuristics). @default 12 */
    maxMove?: number;
    /** Milliseconds pointer was down before classify as tap. @default 450 */
    maxDurationMs?: number;
    onTap: (event: ReactNs.PointerEvent) => void;
    /**
     * Which pointer kinds participate. Defaults to touch-first mobile ergonomics (`['touch','pen']`).
     * Include `'mouse'` to treat primary-button clicks similarly.
     * @default ['touch', 'pen']
     */
    pointerTypes?: readonly ("touch" | "mouse" | "pen")[];
}
type UseTouchHandlerReturn = Pick<ReactNs.DOMAttributes<Element>, "onPointerDown" | "onPointerMove" | "onPointerUp" | "onPointerCancel">;
/**
 * Tap vs subtle scroll jitter: activates when pointer down/move delta and duration thresholds are respected.
 *
 * Returned handlers omit `preventDefault`; pair with deliberate `touch-action` / `preventDefault()` if you disable native scrolling.
 *
 * Mirrors ideas from `react-tappable`/`react-use`/mobile menu libraries that delay recognizers slightly.
 */
declare function useTouchHandler(options: UseTouchHandlerOptions): UseTouchHandlerReturn;

interface UseControllableStateOptions<T> {
    /** Controlled value. Omit to run uncontrolled mode with `defaultValue`. */
    value?: T;
    /** Initial/uncontrolled snapshot. Functions run once during mount (`useState`-style laziness). */
    defaultValue: T | (() => T);
    onChange?: (value: T, ...payload: unknown[]) => void;
}
/**
 * Radix/`@radix-ui/react-use-controllable-state` ergonomics — sync `value`/`defaultValue` with `onChange`.
 * Controlled mode is active when **`value !== undefined`**; if legitimate values include `undefined`, model them with `null`.
 */
declare function useControllableState<T>(options: UseControllableStateOptions<T>): readonly [T, (nextValue: SetStateAction<T>, ...payload: unknown[]) => void];

interface UseFocusTrapOptions {
    active: boolean;
    containerRef: ReactNs.RefObject<HTMLElement | null>;
    autoFocusFirst?: boolean;
    restoreFocus?: boolean;
}
/**
 * Focus scope for modal shells — keeps `Tab` / `Shift+Tab` within `containerRef`.
 * Use `[data-focus-trap-skip]` on decorative portals if they mount inside container but shouldn’t steal focus cues.
 *
 * Compose with {@link useDismissableLayer} for Escape/outside-dismiss semantics (`Modal`, `Popover`, menus).
 */
declare function useFocusTrap(options: UseFocusTrapOptions): void;

interface UseDismissableLayerOptions {
    referenceRef: ReactNs.RefObject<HTMLElement | null>;
    enabled: boolean;
    onDismiss: () => void;
    /** Listen for `Escape` (default true). */
    dismissOnEscape?: boolean;
    /** Pointer down outside triggers dismiss (capture phase matches Radix `DismissableLayer`). Default true */
    dismissOnPointerDownOutside?: boolean;
}
/**
 * Attaches listeners on `document` (pointerdown capture + keydown escape) to dismiss overlays when interacting outside the layer.
 *
 * Use with portaled Dropdown/Modal surfaces by pointing `referenceRef` at the elevated node (typically the overlay root element).
 *
 * Mirrors **Radix DismissableLayer** / **`react-aria`/Spectrum** layering concepts without bundling `@floating-ui/dom`.
 */
declare function useDismissableLayer(options: UseDismissableLayerOptions): void;

declare function mergeRefs<T>(...refs: Array<ReactNs.Ref<T> | undefined>): ReactNs.RefCallback<T>;
declare function assignRef<T>(instance: ReactNs.Ref<T> | undefined, value: T | null): void;
/**
 * Compose multiple refs (`@radix-ui/react-compose-refs`).
 * Returned callback refreshes whenever any incoming ref identity changes (`useMemo` dependency list mirrors arguments).
 */
declare function useMergedRefs<T>(...refs: Array<ReactNs.Ref<T> | undefined>): ReactNs.RefCallback<T>;

/**
 * Subscribes to `window.matchMedia` with layout-safe listener wiring.
 *
 * SSR / first paint mirrors `defaultState` (`false`) until the effect aligns with the viewport.
 *
 * Mirrors `window.matchMedia` usage from **`usehooks-ts`** / **`@react-hook/media-query`**.
 */
declare function useMediaQuery(query: string, defaultState?: boolean): boolean;

/**
 * Mirrors `prefers-reduced-motion` ergonomics (`usehooks-ts`, Framer Motion `useReducedMotion`).
 * Forward `defaultState` to align SSR/hydration with `useMediaQuery`.
 */
declare function usePrefersReducedMotion(defaultState?: boolean): boolean;

/** Safe `useLayoutEffect` fallback for SSR (matches floating-ui/Radix pattern). */
declare const useIsomorphicLayoutEffect: typeof useLayoutEffect;

interface UsePaginationResult {
    /** 1-indexed page */
    page: number;
    setPage: Dispatch<SetStateAction<number>>;
    pageSize: number;
    setPageSize: Dispatch<SetStateAction<number>>;
    /** Always ≥ 1 */
    totalPages: number;
    slicePage: <T>(items: readonly T[]) => readonly T[];
    offset: number;
    limit: number;
}
declare function totalsFor(totalItems: number, pageSize: number): number;
/**
 * Page math / slicing primitives for headless data views (TanStack-like ergonomics without the query core).
 *
 * Changing `pageSize` jumps back to **page 1**, matching spreadsheet / admin table UX.
 */
declare function usePagination(args: {
    totalItems: number;
    initialPage?: number;
    initialPageSize?: number;
}): UsePaginationResult;

type SelectionMode = "single" | "multiple";
interface UseSelectionOptions {
    mode: SelectionMode;
    selectedKeys?: readonly string[];
    defaultSelectedKeys?: readonly string[];
    onSelectionChange?: (keys: readonly string[]) => void;
}
interface UseSelectionResult {
    readonly selectedKeys: readonly string[];
    readonly selectedSet: ReadonlySet<string>;
    setSelectedKeys: Dispatch<SetStateAction<readonly string[]>>;
    toggleKey: (key: string) => void;
    reset: () => void;
}
/**
 * Controlled/uncontrolled keyed selection resembling DataTable/`react-aria` selection primitives.
 *
 * Controlled when **`selectedKeys !== undefined`**.
 */
declare function useSelection(options: UseSelectionOptions): UseSelectionResult;

interface UseOnlineStatusResult {
    /** Mirrors `navigator.onLine` plus `online` / `offline` window events */
    online: boolean;
}
/**
 * Subscribes to browser connectivity (`navigator.onLine` + `"online"` / `"offline"`).
 *
 * First client paint defaults to **`defaultOnline`** (usually **`true`**) until the effect aligns with `navigator.onLine`.
 */
declare function useOnlineStatus(defaultOnline?: boolean): UseOnlineStatusResult;

type AsyncContentPhase = "loading" | "offline" | "error" | "empty" | "ready";
interface UseAsyncContentPhaseOptions<T> {
    /**
     * List data (tables, grids). `undefined` / `null` treated like “no rows” once not loading —
     * pass explicit `loading: true` while the request is inflight.
     */
    items: readonly T[] | null | undefined;
    loading?: boolean;
    error?: unknown;
    /**
     * When true, emits **`offline`** phase whenever browser reports disconnected (paired with banners / overlays).
     * @default false
     */
    requireNetwork?: boolean;
}
interface UseAsyncContentPhaseResult {
    phase: AsyncContentPhase;
    online: boolean;
    isEmpty: boolean;
    /** True while `error` is non-nullish */
    hasError: boolean;
}
/**
 * Picks what to render for typical data surfaces: **`OfflineBanner`** → spinner → **`ErrorState`** → **`EmptyState`** → content.
 *
 * Phase priority: **`loading`** → **`offline`** (only when `requireNetwork`) → **`error`** → **`empty`** → **`ready`**.
 */
declare function useAsyncContentPhase<T>(options: UseAsyncContentPhaseOptions<T>): UseAsyncContentPhaseResult;

type ClientSortDirection = "asc" | "desc" | null;
interface ClientSortState {
    key: string;
    dir: ClientSortDirection;
}
interface UseClientTableStateOptions<T extends Record<string, unknown>> {
    data: readonly T[];
    /** When omitted, searches all enumerable string keys present on rows */
    searchColumns?: readonly string[];
    initialSort?: ClientSortState;
    /** Passes through to {@link usePagination} */
    pageSize?: number;
}
interface UseClientTableStateResult<T> {
    search: string;
    setSearch: (value: string) => void;
    sortState: ClientSortState;
    setSortState: Dispatch<SetStateAction<ClientSortState>>;
    toggleSort: (columnKey: string) => void;
    filteredRows: readonly T[];
    sortedRows: readonly T[];
    pageRows: readonly T[];
    pagination: ReturnType<typeof usePagination>;
}
/**
 * Batteries-included client filtering/sorting/pagination bundle mirroring ergonomics baked into `<Table>`
 * (`InputSearch`, column sort cycling, slicing) for headless or virtualized adapters.
 *
 * Sorting heuristic matches numeric-aware auto detection from `DefaultSorter`.
 */
declare function useClientTableState<T extends Record<string, unknown>>(options: UseClientTableStateOptions<T>): UseClientTableStateResult<T>;

/**
 * Returns a debounced copy of `value` that only updates after `delay` ms of silence.
 * Useful for search inputs, filter queries, and any expensive reactive computation.
 *
 * @example
 * const debouncedQuery = useDebounce(query, 300);
 * useEffect(() => fetch(`/api?q=${debouncedQuery}`), [debouncedQuery]);
 */
declare function useDebounce<T>(value: T, delay: number): T;
interface UseDebouncedCallbackOptions {
    /**
     * When true, invoke the callback immediately on the leading edge of the timeout,
     * then ignore calls until the delay expires.
     * @default false
     */
    leading?: boolean;
}
/**
 * Returns a stable debounced wrapper around `callback`.  Safe to use in event handlers
 * without re-creating handlers on every render.
 *
 * @example
 * const save = useDebouncedCallback((text: string) => api.save(text), 500);
 */
declare function useDebouncedCallback<T extends (...args: Parameters<T>) => void>(callback: T, delay: number, options?: UseDebouncedCallbackOptions): T;

interface UseToggleResult {
    /** Current boolean value */
    value: boolean;
    /** Flip current value */
    toggle: () => void;
    /** Set to `true` */
    setTrue: () => void;
    /** Set to `false` */
    setFalse: () => void;
    /** Set to explicit value */
    set: (next: boolean) => void;
}
/**
 * Boolean state with stable toggle, setTrue, and setFalse helpers.
 * Useful for modals, dropdowns, accordions, and any show/hide state.
 *
 * @example
 * const { value: open, toggle, setFalse: close } = useToggle(false);
 * return <Modal open={open} onClose={close} />;
 */
declare function useToggle(initialValue?: boolean): UseToggleResult;

/**
 * Attach a typed event listener to any `EventTarget` — `window`, `document`,
 * a ref element, or a custom target — with automatic cleanup.
 *
 * @example
 * // Window-level keyboard shortcut
 * useEventListener("keydown", (e) => { if (e.key === "Escape") close(); });
 *
 * @example
 * // Element-level scroll
 * const ref = useRef<HTMLDivElement>(null);
 * useEventListener("scroll", handleScroll, ref);
 */
declare function useEventListener<K extends string, T extends EventTarget = Window>(eventName: K, handler: (event: T extends Window ? WindowEventMap[keyof WindowEventMap] : Event) => void, elementRef?: RefObject<T> | T | null, options?: boolean | AddEventListenerOptions): void;

/**
 * Returns the value from the **previous render**.  On the first render it returns `undefined`.
 *
 * @example
 * const prevCount = usePrevious(count);
 * useEffect(() => {
 *   if (prevCount !== undefined && count !== prevCount) console.log("changed");
 * }, [count, prevCount]);
 */
declare function usePrevious<T>(value: T): T | undefined;

/**
 * Run `callback` exactly once, on mount.  Stable even in React 18 strict-mode double-invocation
 * by using an internal guard ref.
 *
 * @example
 * useMount(() => analytics.track("page_view"));
 */
declare function useMount(callback: () => void): void;
/**
 * Run `callback` on unmount (cleanup only).
 *
 * @example
 * useUnmount(() => subscription.unsubscribe());
 */
declare function useUnmount(callback: () => void): void;

interface UseLocalStorageOptions<T> {
    /** Custom serializer. Default: `JSON.stringify` */
    serialize?: (value: T) => string;
    /** Custom deserializer. Default: `JSON.parse` */
    deserialize?: (raw: string) => unknown;
}
/**
 * `useState` backed by `localStorage` with JSON serialization.  Syncs across
 * tabs via the `"storage"` event.  SSR-safe: uses `initialValue` on the server.
 *
 * @example
 * const [theme, setTheme] = useLocalStorage("theme", "light");
 */
declare function useLocalStorage<T>(key: string, initialValue: T, options?: UseLocalStorageOptions<T>): [T, Dispatch<SetStateAction<T>>, () => void];

export { AsyncContentPhase, ClientSortDirection, ClientSortState, SelectionMode, UseAsyncContentPhaseOptions, UseAsyncContentPhaseResult, UseAsyncDataOptions, UseAsyncDataResult, UseClientTableStateOptions, UseClientTableStateResult, UseControllableStateOptions, UseDebounceClickOptions, UseDebouncedCallbackOptions, UseDismissableLayerOptions, UseFocusTrapOptions, UseLocalStorageOptions, UseLongPressOptions, UseLongPressReturn, UseOnlineStatusResult, UsePaginationResult, UseSelectionOptions, UseSelectionResult, UseSwipeOptions, UseSwipeReturn, UseToggleResult, UseTouchHandlerOptions, UseTouchHandlerReturn, assignRef, mergeRefs, totalsFor, useAsyncContentPhase, useAsyncData, useClientTableState, useControllableState, useDebounce, useDebounceClick, useDebouncedCallback, useDismissableLayer, useEventListener, useFocusTrap, useIsomorphicLayoutEffect, useLatest, useLocalStorage, useLongPress, useMediaQuery, useMergedRefs, useMount, useOnlineStatus, usePagination, usePrefersReducedMotion, usePrevious, useSelection, useSwipe, useToggle, useTouchHandler, useUnmount };
