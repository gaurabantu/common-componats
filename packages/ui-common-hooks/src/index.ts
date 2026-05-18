export { useLatest } from "./useLatest";

export { useDebounceClick } from "./useDebounceClick";
export type { UseDebounceClickOptions } from "./useDebounceClick";

export { useAsyncData } from "./useAsyncData";
export type { UseAsyncDataOptions, UseAsyncDataResult } from "./useAsyncData";

export { useLongPress } from "./useLongPress";
export type { UseLongPressOptions, UseLongPressReturn } from "./useLongPress";

export { useSwipe } from "./useSwipe";
export type { UseSwipeOptions, UseSwipeReturn } from "./useSwipe";

export { useTouchHandler } from "./useTouchHandler";
export type { UseTouchHandlerOptions, UseTouchHandlerReturn } from "./useTouchHandler";

export { useControllableState } from "./useControllableState";
export type { UseControllableStateOptions } from "./useControllableState";

export { useFocusTrap } from "./useFocusTrap";
export type { UseFocusTrapOptions } from "./useFocusTrap";

export { useDismissableLayer } from "./useDismissableLayer";
export type { UseDismissableLayerOptions } from "./useDismissableLayer";

export { mergeRefs, assignRef, useMergedRefs } from "./useMergedRefs";

export { useMediaQuery } from "./useMediaQuery";

export { usePrefersReducedMotion } from "./usePrefersReducedMotion";

export { useIsomorphicLayoutEffect } from "./useIsomorphicLayoutEffect";

export { usePagination, totalsFor } from "./usePagination";
export type { UsePaginationResult } from "./usePagination";

export { useSelection } from "./useSelection";
export type { SelectionMode, UseSelectionOptions, UseSelectionResult } from "./useSelection";

export { useOnlineStatus } from "./useOnlineStatus";
export type { UseOnlineStatusResult } from "./useOnlineStatus";

export { useAsyncContentPhase } from "./useAsyncContentPhase";
export type {
  AsyncContentPhase,
  UseAsyncContentPhaseOptions,
  UseAsyncContentPhaseResult,
} from "./useAsyncContentPhase";

export { useClientTableState } from "./useClientTableState";
export type {
  ClientSortDirection,
  ClientSortState,
  UseClientTableStateOptions,
  UseClientTableStateResult,
} from "./useClientTableState";

// ─── Phase 1 additions ────────────────────────────────────────────────────────

export { useDebounce, useDebouncedCallback } from "./useDebounce";
export type { UseDebouncedCallbackOptions } from "./useDebounce";

export { useToggle } from "./useToggle";
export type { UseToggleResult } from "./useToggle";

export { useEventListener } from "./useEventListener";

export { usePrevious } from "./usePrevious";

export { useMount, useUnmount } from "./useMount";

export { useLocalStorage } from "./useLocalStorage";
export type { UseLocalStorageOptions } from "./useLocalStorage";
