/* ucs:component-css */
import "./styles/components/atoms/ToolTip/ToolTip.css";
import {
  Icon_default
} from "./chunk-6JJMOGWW.mjs";
import {
  Tooltip_default
} from "./chunk-62VAVKCA.mjs";
import {
  DEFAULT_TOOLTIP_Z,
  resolveLayerZIndex
} from "./chunk-M6JALQW7.mjs";

// src/components/atoms/ToolTip/index.tsx
import React, { useCallback, useEffect, useRef, useState } from "react";

// src/components/atoms/ToolTip/TooltipIcon.config.ts
var defaultTooltipOptions = {
  placement: "auto",
  delay: 60,
  closeDelay: 80,
  size: 16,
  color: "currentColor",
  maxWidth: 240,
  variant: "dark"
};
var PLACEMENT_TO_SIDE = {
  auto: "top",
  top: "top",
  bottom: "bottom",
  left: "left",
  right: "right"
};

// src/assets/tooltip-icon.svg
var tooltip_icon_default = 'data:image/svg+xml,<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">%0A<path d="M7.2 12H8.8V7.2H7.2V12ZM8 5.6C8.22667 5.6 8.4168 5.5232 8.5704 5.3696C8.72347 5.21653 8.8 5.02667 8.8 4.8C8.8 4.57333 8.72347 4.3832 8.5704 4.2296C8.4168 4.07653 8.22667 4 8 4C7.77333 4 7.58347 4.07653 7.4304 4.2296C7.2768 4.3832 7.2 4.57333 7.2 4.8C7.2 5.02667 7.2768 5.21653 7.4304 5.3696C7.58347 5.5232 7.77333 5.6 8 5.6ZM8 16C6.89333 16 5.85333 15.7899 4.88 15.3696C3.90667 14.9499 3.06 14.38 2.34 13.66C1.62 12.94 1.05013 12.0933 0.6304 11.12C0.210133 10.1467 0 9.10667 0 8C0 6.89333 0.210133 5.85333 0.6304 4.88C1.05013 3.90667 1.62 3.06 2.34 2.34C3.06 1.62 3.90667 1.04987 4.88 0.6296C5.85333 0.209867 6.89333 0 8 0C9.10667 0 10.1467 0.209867 11.12 0.6296C12.0933 1.04987 12.94 1.62 13.66 2.34C14.38 3.06 14.9499 3.90667 15.3696 4.88C15.7899 5.85333 16 6.89333 16 8C16 9.10667 15.7899 10.1467 15.3696 11.12C14.9499 12.0933 14.38 12.94 13.66 13.66C12.94 14.38 12.0933 14.9499 11.12 15.3696C10.1467 15.7899 9.10667 16 8 16ZM8 14.4C9.78667 14.4 11.3 13.78 12.54 12.54C13.78 11.3 14.4 9.78667 14.4 8C14.4 6.21333 13.78 4.7 12.54 3.46C11.3 2.22 9.78667 1.6 8 1.6C6.21333 1.6 4.7 2.22 3.46 3.46C2.22 4.7 1.6 6.21333 1.6 8C1.6 9.78667 2.22 11.3 3.46 12.54C4.7 13.78 6.21333 14.4 8 14.4Z" fill="%23666666"/>%0A</svg>%0A';

// src/components/atoms/ToolTip/index.tsx
import { jsx, jsxs } from "react/jsx-runtime";
function cls(...parts) {
  return parts.filter(Boolean).join(" ");
}
function setRef(ref, value) {
  if (typeof ref === "function")
    ref(value);
  else if (ref && typeof ref === "object")
    ref.current = value;
}
function renderTooltipMedia(media) {
  if (!media)
    return null;
  if (React.isValidElement(media))
    return media;
  if (typeof media !== "string" && !(typeof media === "object" && media !== null && ("src" in media || "default" in media))) {
    return null;
  }
  return /* @__PURE__ */ jsx(Icon_default, { src: media, width: 16, height: 16, decorative: true, preserveColors: true });
}
var ToolTip = React.forwardRef(function ToolTip2({
  tooltipText,
  content,
  children,
  tooltipContentIcon,
  placement = defaultTooltipOptions.placement,
  delay = defaultTooltipOptions.delay,
  closeDelay = defaultTooltipOptions.closeDelay,
  size = defaultTooltipOptions.size,
  color = defaultTooltipOptions.color,
  iconToolTip = tooltip_icon_default,
  className = "",
  maxWidth = defaultTooltipOptions.maxWidth,
  variant = defaultTooltipOptions.variant,
  zIndex,
  style,
  onMouseEnter,
  onMouseLeave,
  onPointerEnter,
  onKeyDown,
  role,
  ...rest
}, forwardedRef) {
  var _a, _b;
  const [open, setOpenState] = useState(false);
  const [layerZ, setLayerZ] = useState(`var(--z-tooltip-top, ${DEFAULT_TOOLTIP_Z})`);
  const triggerRef = useRef(null);
  const timerRef = useRef(null);
  const pointerSeenRef = useRef(false);
  const clearTimer = () => {
    if (timerRef.current)
      clearTimeout(timerRef.current);
    timerRef.current = null;
  };
  useEffect(() => clearTimer, []);
  const setOpen = useCallback(
    (next) => {
      clearTimer();
      if (next && zIndex === void 0) {
        setLayerZ(resolveLayerZIndex(triggerRef.current, void 0, "--z-tooltip-top", DEFAULT_TOOLTIP_Z));
      }
      setOpenState(next);
    },
    [zIndex]
  );
  const handleMouseEnter = (event) => {
    onMouseEnter == null ? void 0 : onMouseEnter(event);
    if (pointerSeenRef.current)
      return;
    clearTimer();
    timerRef.current = setTimeout(() => setOpen(true), delay);
  };
  const handleMouseLeave = (event) => {
    onMouseLeave == null ? void 0 : onMouseLeave(event);
    if (pointerSeenRef.current)
      return;
    clearTimer();
    timerRef.current = setTimeout(() => setOpen(false), closeDelay);
  };
  const handlePointerEnter = (event) => {
    pointerSeenRef.current = true;
    onPointerEnter == null ? void 0 : onPointerEnter(event);
  };
  const handleKeyDown = (event) => {
    onKeyDown == null ? void 0 : onKeyDown(event);
    if (event.defaultPrevented)
      return;
    if (event.key === "Enter" || event.key === " " || event.key === "Spacebar") {
      event.preventDefault();
      setOpen(!open);
    }
  };
  const body = /* @__PURE__ */ jsxs("span", { className: "ds-tooltip-icon__body", "data-has-media": tooltipContentIcon ? "true" : void 0, children: [
    renderTooltipMedia(tooltipContentIcon),
    /* @__PURE__ */ jsx("span", { children: content != null ? content : tooltipText })
  ] });
  return /* @__PURE__ */ jsx(
    Tooltip_default,
    {
      content: body,
      open,
      onOpenChange: setOpen,
      side: (_a = PLACEMENT_TO_SIDE[placement]) != null ? _a : "top",
      delay,
      closeDelay,
      maxWidth,
      variant,
      zIndex: zIndex != null ? zIndex : layerZ,
      children: /* @__PURE__ */ jsx(
        "span",
        {
          ...rest,
          ref: (node) => {
            triggerRef.current = node;
            setRef(forwardedRef, node);
          },
          className: cls("ds-tooltip-icon", className),
          style: { color, ...style },
          role: role != null ? role : "button",
          "aria-label": tooltipText,
          tabIndex: (_b = rest.tabIndex) != null ? _b : 0,
          onKeyDown: handleKeyDown,
          onMouseEnter: handleMouseEnter,
          onMouseLeave: handleMouseLeave,
          onPointerEnter: handlePointerEnter,
          children: children || /* @__PURE__ */ jsx(Icon_default, { src: iconToolTip, width: size, height: size, decorative: true })
        }
      )
    }
  );
});
ToolTip.displayName = "ToolTip";
var ToolTip_default = ToolTip;

export {
  ToolTip_default
};
//# sourceMappingURL=chunk-FMZV2AOE.mjs.map