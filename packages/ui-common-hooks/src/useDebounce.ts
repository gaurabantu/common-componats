import { useEffect, useRef, useState } from "react";

/**
 * Returns a debounced copy of `value` that only updates after `delay` ms of silence.
 * Useful for search inputs, filter queries, and any expensive reactive computation.
 *
 * @example
 * const debouncedQuery = useDebounce(query, 300);
 * useEffect(() => fetch(`/api?q=${debouncedQuery}`), [debouncedQuery]);
 */
export function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);

  return debouncedValue;
}

export interface UseDebouncedCallbackOptions {
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
export function useDebouncedCallback<T extends (...args: Parameters<T>) => void>(
  callback: T,
  delay: number,
  options: UseDebouncedCallbackOptions = {}
): T {
  const { leading = false } = options;
  const callbackRef = useRef(callback);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const calledLeadingRef = useRef(false);

  useEffect(() => {
    callbackRef.current = callback;
  });

  const debounced = useRef((...args: Parameters<T>) => {
    if (timerRef.current !== null) clearTimeout(timerRef.current);

    if (leading && !calledLeadingRef.current) {
      calledLeadingRef.current = true;
      callbackRef.current(...args);
    }

    timerRef.current = setTimeout(() => {
      calledLeadingRef.current = false;
      if (!leading) callbackRef.current(...args);
    }, delay);
  });

  return debounced.current as unknown as T;
}
