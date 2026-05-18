import { useEffect, useRef } from "react";

/**
 * Run `callback` exactly once, on mount.  Stable even in React 18 strict-mode double-invocation
 * by using an internal guard ref.
 *
 * @example
 * useMount(() => analytics.track("page_view"));
 */
export function useMount(callback: () => void): void {
  const called = useRef(false);
  useEffect(() => {
    if (called.current) return;
    called.current = true;
    callback();
    // callback is intentionally excluded — callers must stabilise it themselves or pass
    // a function reference that doesn't change across renders.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}

/**
 * Run `callback` on unmount (cleanup only).
 *
 * @example
 * useUnmount(() => subscription.unsubscribe());
 */
export function useUnmount(callback: () => void): void {
  const callbackRef = useRef(callback);
  useEffect(() => {
    callbackRef.current = callback;
  });
  useEffect(() => () => callbackRef.current(), []);
}
