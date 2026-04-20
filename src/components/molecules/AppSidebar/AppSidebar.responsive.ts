"use client";

import { useSyncExternalStore } from "react";

/**
 * `true` when viewport width is **strictly below** `collapseBelowWidth`
 * (e.g. `1024` → CSS `(max-width: 1023px)` — tablet portrait & mobile).
 * Server snapshot is `false`; client updates after hydration.
 */
export function useBelowWidth(collapseBelowWidth: number, enabled: boolean): boolean {
  const q = `(max-width: ${Math.max(0, collapseBelowWidth - 1)}px)`;

  return useSyncExternalStore(
    (onStoreChange) => {
      if (typeof window === "undefined" || !enabled) {
        return () => {};
      }
      const mq = window.matchMedia(q);
      mq.addEventListener("change", onStoreChange);
      return () => mq.removeEventListener("change", onStoreChange);
    },
    () => {
      if (!enabled || typeof window === "undefined") return false;
      return window.matchMedia(q).matches;
    },
    () => false
  );
}
