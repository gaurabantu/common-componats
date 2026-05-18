import { useCallback, useState } from "react";
import type { SetStateAction } from "react";

import { useLatest } from "./useLatest";

export interface UseControllableStateOptions<T> {
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
export function useControllableState<T>(
  options: UseControllableStateOptions<T>
): readonly [T, (nextValue: SetStateAction<T>, ...payload: unknown[]) => void] {
  const { value, defaultValue, onChange } = options;
  const onChangeLatest = useLatest(onChange ?? (() => undefined));

  const isControlled = value !== undefined;
  const [internalValue, setInternalValue] = useState<T>(() =>
    typeof defaultValue === "function" ? (defaultValue as () => T)() : defaultValue
  );

  const state = isControlled ? (value as T) : internalValue;

  const setValue = useCallback(
    (nextValue: SetStateAction<T>, ...payload: unknown[]) => {
      const lookup =
        typeof nextValue === "function" ? (nextValue as (prev: T) => T)(state) : nextValue;

      if (!isControlled) {
        setInternalValue(lookup);
      }
      onChangeLatest.current?.(lookup, ...payload);
    },
    [isControlled, onChangeLatest, state]
  );

  return [state, setValue] as const;
}
