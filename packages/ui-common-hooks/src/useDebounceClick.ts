import { useCallback, useRef, useState } from "react";
import { useLatest } from "./useLatest";

function isPromiseLike<T>(value: unknown): value is PromiseLike<T> {
  return (
    typeof value === "object" &&
    value !== null &&
    "then" in value &&
    typeof (value as PromiseLike<T>).then === "function"
  );
}

export interface UseDebounceClickOptions {
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
export function useDebounceClick<TArgs extends unknown[]>(
  handler: (...args: TArgs) => void | Promise<unknown>,
  options?: UseDebounceClickOptions
): [(...args: TArgs) => void, boolean] {
  const handlerRef = useLatest(handler);
  const cooldownRef = useLatest(options?.syncCooldownMs ?? 0);
  const mutexRef = useRef(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const run = useCallback((...args: TArgs) => {
    if (mutexRef.current) return;
    mutexRef.current = true;
    setIsProcessing(true);

    const releaseSoon = () => {
      mutexRef.current = false;
      setIsProcessing(false);
    };

    const releaseAfterCooldown = () => {
      const ms = cooldownRef.current;
      if (typeof ms === "number" && ms > 0) {
        window.setTimeout(releaseSoon, ms);
      } else {
        releaseSoon();
      }
    };

    try {
      const result = handlerRef.current(...args);
      if (isPromiseLike(result)) {
        void result.then(() => releaseSoon()).catch(() => releaseSoon());
        return;
      }
      releaseAfterCooldown();
    } catch {
      releaseSoon();
    }
  }, [handlerRef, cooldownRef]);

  return [run, isProcessing];
}
