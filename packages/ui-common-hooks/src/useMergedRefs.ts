import { useMemo } from "react";
import type * as React from "react";

export function mergeRefs<T>(...refs: Array<React.Ref<T> | undefined>): React.RefCallback<T> {
  return (value): void =>
    refs.forEach((ref) => {
      if (!ref) return;
      assignRef(ref, value);
    });
}

export function assignRef<T>(instance: React.Ref<T> | undefined, value: T | null): void {
  if (!instance) return;
  if (typeof instance === "function") {
    instance(value);
    return;
  }
  instance.current = value;
}

/**
 * Compose multiple refs (`@radix-ui/react-compose-refs`).
 * Returned callback refreshes whenever any incoming ref identity changes (`useMemo` dependency list mirrors arguments).
 */
export function useMergedRefs<T>(...refs: Array<React.Ref<T> | undefined>): React.RefCallback<T> {
  return useMemo(() => mergeRefs(...refs), refs);
}
