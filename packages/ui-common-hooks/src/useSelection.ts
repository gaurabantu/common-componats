import { useCallback, useMemo, useState } from "react";
import type { Dispatch, SetStateAction } from "react";

import { useLatest } from "./useLatest";

export type SelectionMode = "single" | "multiple";

export interface UseSelectionOptions {
  mode: SelectionMode;
  selectedKeys?: readonly string[];
  defaultSelectedKeys?: readonly string[];
  onSelectionChange?: (keys: readonly string[]) => void;
}

export interface UseSelectionResult {
  readonly selectedKeys: readonly string[];
  readonly selectedSet: ReadonlySet<string>;
  setSelectedKeys: Dispatch<SetStateAction<readonly string[]>>;
  toggleKey: (key: string) => void;
  reset: () => void;
}

function coerceKeys(mode: SelectionMode, keys: readonly string[]) {
  const unique = Array.from(new Set(keys));
  return mode === "single" ? unique.slice(0, 1) : unique;
}

/**
 * Controlled/uncontrolled keyed selection resembling DataTable/`react-aria` selection primitives.
 *
 * Controlled when **`selectedKeys !== undefined`**.
 */
export function useSelection(options: UseSelectionOptions): UseSelectionResult {
  const notifier = useLatest(options.onSelectionChange ?? (() => undefined));
  const controlled = options.selectedKeys !== undefined;

  const [uncontrolledKeys, setUncontrolledKeys] = useState(() =>
    coerceKeys(options.mode, options.defaultSelectedKeys ?? [])
  );

  const selectedKeys = useMemo(() => {
    if (controlled) return coerceKeys(options.mode, options.selectedKeys ?? []);
    return coerceKeys(options.mode, uncontrolledKeys);
  }, [controlled, options.mode, options.selectedKeys, uncontrolledKeys]);

  const selectedSet = useMemo(() => new Set(selectedKeys), [selectedKeys]);

  const commit = useCallback(
    (next: readonly string[]) => {
      const normalized = coerceKeys(options.mode, next);
      if (!controlled) setUncontrolledKeys(normalized);
      notifier.current(normalized);
    },
    [controlled, notifier, options.mode]
  );

  const setSelectedKeys = useCallback(
    (incoming: SetStateAction<readonly string[]>) => {
      const resolved =
        typeof incoming === "function"
          ? (incoming as (prev: readonly string[]) => readonly string[])(selectedKeys)
          : incoming;
      commit(resolved);
    },
    [commit, selectedKeys]
  );

  const toggleKey = useCallback(
    (key: string) => {
      if (options.mode === "single") {
        commit(selectedKeys.includes(key) ? [] : [key]);
        return;
      }
      const mutable = new Set(selectedKeys);
      if (mutable.has(key)) mutable.delete(key);
      else mutable.add(key);
      commit(Array.from(mutable));
    },
    [commit, options.mode, selectedKeys]
  );

  const reset = useCallback(() => commit([]), [commit]);

  return {
    selectedKeys,
    selectedSet,
    setSelectedKeys,
    toggleKey,
    reset,
  };
}
