import { useLayoutEffect, useRef } from "react";

/**
 * Returns a mutable ref whose `.current` is always the latest `value`.
 * Pattern used by ahooks/useMemoizedFn internals and TanStack Query's `ensureQueryFn`:
 * avoids stale closures in effects, subscriptions, or timeout callbacks without widening deps arrays.
 *
 * Uses `useLayoutEffect` so the ref updates before subsequent layout reads in the same commit.
 */
export function useLatest<T>(value: T) {
  const ref = useRef(value);
  useLayoutEffect(() => {
    ref.current = value;
  }, [value]);
  return ref;
}
