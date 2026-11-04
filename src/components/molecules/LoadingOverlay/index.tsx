"use client";

import React, { useCallback, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import Spinner from "../../atoms/Spinner";
import { LOADING_OVERLAY_DEFAULTS } from "./LoadingOverlay.config";
import type { LoadingOverlayProps } from "./LoadingOverlay.types";
import "./LoadingOverlay.css";

/**
 * LoadingOverlay — covers its positioned parent (or the viewport with `fullScreen`) while work runs.
 *
 * - `blocking` (default): swallows pointer input over the covered area and marks the covered parent
 *   `aria-busy="true"` (container mode). It never moves focus.
 * - `blocking={false}`: a non-blocking veil (`pointer-events: none`) with a small status pill —
 *   the content underneath stays fully usable; focus is never trapped or moved.
 *
 * The status text (`label`, else `ariaLabel`) is exposed through a `role="status"` live region.
 */
const LoadingOverlay = React.forwardRef<HTMLDivElement, LoadingOverlayProps>(function LoadingOverlay(
  {
    visible = LOADING_OVERLAY_DEFAULTS.visible,
    fullScreen = LOADING_OVERLAY_DEFAULTS.fullScreen,
    blocking = LOADING_OVERLAY_DEFAULTS.blocking,
    label,
    ariaLabel = LOADING_OVERLAY_DEFAULTS.ariaLabel,
    spinnerSize,
    backdrop = LOADING_OVERLAY_DEFAULTS.backdrop,
    zIndex,
    className,
    style,
    children,
    ...rest
  },
  forwardedRef,
) {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const setRootRef = useCallback(
    (node: HTMLDivElement | null) => {
      rootRef.current = node;
      if (typeof forwardedRef === "function") forwardedRef(node);
      else if (forwardedRef) forwardedRef.current = node;
    },
    [forwardedRef],
  );

  // Blocking container mode: the covered parent is busy while the overlay is shown.
  useEffect(() => {
    if (!visible || !blocking || fullScreen) return undefined;
    const parent = rootRef.current?.parentElement;
    if (!parent) return undefined;
    const previous = parent.getAttribute("aria-busy");
    parent.setAttribute("aria-busy", "true");
    return () => {
      if (previous == null) parent.removeAttribute("aria-busy");
      else parent.setAttribute("aria-busy", previous);
    };
  }, [visible, blocking, fullScreen]);

  if (!visible) return null;

  const hasLabel = label != null && label !== false && label !== "";
  const size =
    spinnerSize ??
    (blocking ? LOADING_OVERLAY_DEFAULTS.blockingSpinnerSize : LOADING_OVERLAY_DEFAULTS.veilSpinnerSize);

  const overlay = (
    <div
      {...rest}
      ref={setRootRef}
      className={["ds-loading-overlay", className].filter(Boolean).join(" ")}
      data-blocking={blocking ? "true" : "false"}
      data-fullscreen={fullScreen ? "true" : "false"}
      data-backdrop={backdrop}
      style={
        {
          ...(zIndex != null ? { "--ds-loading-overlay-z": zIndex } : null),
          ...style,
        } as React.CSSProperties
      }
    >
      <div className="ds-loading-overlay__content" role="status" aria-live="polite">
        <Spinner size={size} tone="primary" decorative />
        {hasLabel ? (
          <span className="ds-loading-overlay__label">{label}</span>
        ) : (
          <span className="sr-only">{ariaLabel}</span>
        )}
        {children}
      </div>
    </div>
  );

  if (fullScreen) {
    return typeof document !== "undefined" ? createPortal(overlay, document.body) : null;
  }
  return overlay;
});

LoadingOverlay.displayName = "LoadingOverlay";

export default LoadingOverlay;
export type { LoadingOverlayProps, LoadingOverlayBackdrop } from "./LoadingOverlay.types";
