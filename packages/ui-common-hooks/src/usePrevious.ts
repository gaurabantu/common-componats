import { useEffect, useRef } from "react";

/**
 * Returns the value from the **previous render**.  On the first render it returns `undefined`.
 *
 * @example
 * const prevCount = usePrevious(count);
 * useEffect(() => {
 *   if (prevCount !== undefined && count !== prevCount) console.log("changed");
 * }, [count, prevCount]);
 */
export function usePrevious<T>(value: T): T | undefined {
  const ref = useRef<T | undefined>(undefined);

  useEffect(() => {
    ref.current = value;
  });

  return ref.current;
}
