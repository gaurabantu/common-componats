import { useMemo } from "react";

import { useOnlineStatus } from "./useOnlineStatus";

export type AsyncContentPhase = "loading" | "offline" | "error" | "empty" | "ready";

export interface UseAsyncContentPhaseOptions<T> {
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

export interface UseAsyncContentPhaseResult {
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
export function useAsyncContentPhase<T>(
  options: UseAsyncContentPhaseOptions<T>
): UseAsyncContentPhaseResult {
  const { items, loading = false, error, requireNetwork = false } = options;
  const { online } = useOnlineStatus();

  return useMemo(() => {
    const list = Array.isArray(items) ? items : [];
    const isEmptyPayload =
      loading === true ? false : items === undefined || items === null || list.length === 0;

    const hasErr = error !== undefined && error !== null;

    let phase: AsyncContentPhase;

    if (loading) phase = "loading";
    else if (requireNetwork && !online) phase = "offline";
    else if (hasErr) phase = "error";
    else if (isEmptyPayload) phase = "empty";
    else phase = "ready";

    return {
      phase,
      online,
      isEmpty: isEmptyPayload && !loading,
      hasError: hasErr,
    };
  }, [error, items, loading, online, requireNetwork]);
}
