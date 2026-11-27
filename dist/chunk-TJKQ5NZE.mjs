/* ucs:component-css */
import "./styles/components/molecules/LoadingOverlay/LoadingOverlay.css";
import {
  Spinner_default
} from "./chunk-5YRQQZSX.mjs";

// src/components/molecules/LoadingOverlay/index.tsx
import React, { useCallback, useEffect, useRef } from "react";
import { createPortal } from "react-dom";

// src/components/molecules/LoadingOverlay/LoadingOverlay.config.ts
var LOADING_OVERLAY_DEFAULTS = {
  visible: true,
  fullScreen: false,
  blocking: true,
  ariaLabel: "Loading",
  backdrop: "surface",
  blockingSpinnerSize: "lg",
  veilSpinnerSize: "sm"
};

// src/components/molecules/LoadingOverlay/index.tsx
import { jsx, jsxs } from "react/jsx-runtime";
var LoadingOverlay = React.forwardRef(function LoadingOverlay2({
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
}, forwardedRef) {
  const rootRef = useRef(null);
  const setRootRef = useCallback(
    (node) => {
      rootRef.current = node;
      if (typeof forwardedRef === "function")
        forwardedRef(node);
      else if (forwardedRef)
        forwardedRef.current = node;
    },
    [forwardedRef]
  );
  useEffect(() => {
    var _a;
    if (!visible || !blocking || fullScreen)
      return void 0;
    const parent = (_a = rootRef.current) == null ? void 0 : _a.parentElement;
    if (!parent)
      return void 0;
    const previous = parent.getAttribute("aria-busy");
    parent.setAttribute("aria-busy", "true");
    return () => {
      if (previous == null)
        parent.removeAttribute("aria-busy");
      else
        parent.setAttribute("aria-busy", previous);
    };
  }, [visible, blocking, fullScreen]);
  if (!visible)
    return null;
  const hasLabel = label != null && label !== false && label !== "";
  const size = spinnerSize != null ? spinnerSize : blocking ? LOADING_OVERLAY_DEFAULTS.blockingSpinnerSize : LOADING_OVERLAY_DEFAULTS.veilSpinnerSize;
  const overlay = /* @__PURE__ */ jsx(
    "div",
    {
      ...rest,
      ref: setRootRef,
      className: ["ds-loading-overlay", className].filter(Boolean).join(" "),
      "data-blocking": blocking ? "true" : "false",
      "data-fullscreen": fullScreen ? "true" : "false",
      "data-backdrop": backdrop,
      style: {
        ...zIndex != null ? { "--ds-loading-overlay-z": zIndex } : null,
        ...style
      },
      children: /* @__PURE__ */ jsxs("div", { className: "ds-loading-overlay__content", role: "status", "aria-live": "polite", children: [
        /* @__PURE__ */ jsx(Spinner_default, { size, tone: "primary", decorative: true }),
        hasLabel ? /* @__PURE__ */ jsx("span", { className: "ds-loading-overlay__label", children: label }) : /* @__PURE__ */ jsx("span", { className: "sr-only", children: ariaLabel }),
        children
      ] })
    }
  );
  if (fullScreen) {
    return typeof document !== "undefined" ? createPortal(overlay, document.body) : null;
  }
  return overlay;
});
LoadingOverlay.displayName = "LoadingOverlay";
var LoadingOverlay_default = LoadingOverlay;

export {
  LoadingOverlay_default
};
//# sourceMappingURL=chunk-TJKQ5NZE.mjs.map