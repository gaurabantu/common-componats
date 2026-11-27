// src/components/molecules/AppSidebar/AppSidebar.responsive.ts
import { useSyncExternalStore } from "react";
function useBelowWidth(collapseBelowWidth, enabled) {
  const q = `(max-width: ${Math.max(0, collapseBelowWidth - 1)}px)`;
  return useSyncExternalStore(
    (onStoreChange) => {
      if (typeof window === "undefined" || !enabled) {
        return () => {
        };
      }
      const mq = window.matchMedia(q);
      mq.addEventListener("change", onStoreChange);
      return () => mq.removeEventListener("change", onStoreChange);
    },
    () => {
      if (!enabled || typeof window === "undefined")
        return false;
      return window.matchMedia(q).matches;
    },
    () => false
  );
}

export {
  useBelowWidth
};
//# sourceMappingURL=chunk-ML7OBPNX.mjs.map