import { useEffect } from "react";
import type * as React from "react";

import { useLatest } from "./useLatest";

export interface UseDismissableLayerOptions {
  referenceRef: React.RefObject<HTMLElement | null>;
  enabled: boolean;
  onDismiss: () => void;
  /** Listen for `Escape` (default true). */
  dismissOnEscape?: boolean;
  /** Pointer down outside triggers dismiss (capture phase matches Radix `DismissableLayer`). Default true */
  dismissOnPointerDownOutside?: boolean;
}

/**
 * Attaches listeners on `document` (pointerdown capture + keydown escape) to dismiss overlays when interacting outside the layer.
 *
 * Use with portaled Dropdown/Modal surfaces by pointing `referenceRef` at the elevated node (typically the overlay root element).
 *
 * Mirrors **Radix DismissableLayer** / **`react-aria`/Spectrum** layering concepts without bundling `@floating-ui/dom`.
 */
export function useDismissableLayer(options: UseDismissableLayerOptions): void {
  const {
    referenceRef,
    enabled,
    onDismiss,
    dismissOnEscape = true,
    dismissOnPointerDownOutside = true,
  } = options;

  const dismissLatest = useLatest(onDismiss);

  useEffect(() => {
    if (!enabled || typeof document === "undefined") return undefined;

    const handlePointerDown = (event: PointerEvent) => {
      if (!dismissOnPointerDownOutside) return;
      const node = referenceRef.current;
      const target = event.target;
      if (!(target instanceof Element) || !(node instanceof Element)) return;
      if (!node.contains(target)) {
        dismissLatest.current();
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (!dismissOnEscape) return;
      if (event.defaultPrevented) return;
      if (event.key !== "Escape") return;

      dismissLatest.current();
      event.preventDefault();
    };

    document.addEventListener("pointerdown", handlePointerDown, true);
    document.addEventListener("keydown", handleKeyDown, true);
    return () => {
      document.removeEventListener("pointerdown", handlePointerDown, true);
      document.removeEventListener("keydown", handleKeyDown, true);
    };
  }, [dismissLatest, dismissOnEscape, dismissOnPointerDownOutside, enabled, referenceRef]);
}
