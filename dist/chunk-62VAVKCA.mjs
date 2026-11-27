/* ucs:component-css */
import "./styles/components/molecules/Tooltip/Tooltip.css";
import {
  TOOLTIP_DEFAULTS,
  computeTooltipPosition
} from "./chunk-CS56N245.mjs";
import {
  DEFAULT_TOOLTIP_Z,
  resolveLayerZIndex
} from "./chunk-M6JALQW7.mjs";

// src/components/molecules/Tooltip/index.tsx
import React, {
  cloneElement,
  isValidElement,
  useCallback,
  useEffect,
  useId,
  useLayoutEffect,
  useRef,
  useState
} from "react";
import { createPortal } from "react-dom";
import { Fragment, jsx, jsxs } from "react/jsx-runtime";
function cls(...parts) {
  return parts.filter(Boolean).join(" ");
}
function compose(theirs, ours) {
  return (event) => {
    theirs == null ? void 0 : theirs(event);
    ours(event);
  };
}
function setRef(ref, value) {
  if (typeof ref === "function")
    ref(value);
  else if (ref && typeof ref === "object")
    ref.current = value;
}
function getElementRef(element) {
  const major = parseInt(React.version, 10);
  if (major >= 19)
    return element.props.ref;
  return element.ref;
}
var useIsoLayoutEffect = typeof window !== "undefined" ? useLayoutEffect : useEffect;
var Tooltip = React.forwardRef(function Tooltip2({
  children,
  content,
  side = TOOLTIP_DEFAULTS.side,
  align = TOOLTIP_DEFAULTS.align,
  delay = TOOLTIP_DEFAULTS.delay,
  closeDelay = TOOLTIP_DEFAULTS.closeDelay,
  open: openProp,
  defaultOpen = false,
  onOpenChange,
  disabled = false,
  maxWidth = TOOLTIP_DEFAULTS.maxWidth,
  variant = TOOLTIP_DEFAULTS.variant,
  zIndex,
  className,
  style,
  id: idProp,
  onPointerEnter: onBubblePointerEnter,
  onPointerLeave: onBubblePointerLeave,
  ...rest
}, forwardedRef) {
  var _a, _b, _c;
  const reactId = useId();
  const tooltipId = idProp != null ? idProp : `ds-tooltip-${reactId.replace(/:/g, "")}`;
  const isControlled = openProp !== void 0;
  const [innerOpen, setInnerOpen] = useState(defaultOpen);
  const open = !disabled && (isControlled ? Boolean(openProp) : innerOpen);
  const [mounted, setMounted] = useState(false);
  const [position, setPosition] = useState(null);
  const [autoZ, setAutoZ] = useState(void 0);
  const triggerRef = useRef(null);
  const bubbleRef = useRef(null);
  const openTimer = useRef(null);
  const closeTimer = useRef(null);
  const hoveringRef = useRef(false);
  const focusedRef = useRef(false);
  const openRef = useRef(open);
  openRef.current = open;
  useEffect(() => setMounted(true), []);
  const clearTimers = useCallback(() => {
    if (openTimer.current)
      clearTimeout(openTimer.current);
    if (closeTimer.current)
      clearTimeout(closeTimer.current);
    openTimer.current = null;
    closeTimer.current = null;
  }, []);
  useEffect(() => clearTimers, [clearTimers]);
  const setOpen = useCallback(
    (next) => {
      if (disabled && next)
        return;
      if (next === openRef.current)
        return;
      if (!isControlled)
        setInnerOpen(next);
      onOpenChange == null ? void 0 : onOpenChange(next);
    },
    [disabled, isControlled, onOpenChange]
  );
  const scheduleOpen = useCallback(
    (ms) => {
      if (closeTimer.current) {
        clearTimeout(closeTimer.current);
        closeTimer.current = null;
      }
      if (openRef.current)
        return;
      if (ms <= 0) {
        if (openTimer.current)
          clearTimeout(openTimer.current);
        openTimer.current = null;
        setOpen(true);
        return;
      }
      if (openTimer.current)
        return;
      openTimer.current = setTimeout(() => {
        openTimer.current = null;
        setOpen(true);
      }, ms);
    },
    [setOpen]
  );
  const scheduleClose = useCallback(
    (ms) => {
      if (hoveringRef.current || focusedRef.current)
        return;
      if (openTimer.current) {
        clearTimeout(openTimer.current);
        openTimer.current = null;
      }
      if (closeTimer.current)
        clearTimeout(closeTimer.current);
      const run = () => {
        closeTimer.current = null;
        if (!hoveringRef.current && !focusedRef.current)
          setOpen(false);
      };
      if (ms <= 0)
        run();
      else
        closeTimer.current = setTimeout(run, ms);
    },
    [setOpen]
  );
  useEffect(() => {
    if (!open)
      return void 0;
    const onKeyDown = (event) => {
      if (event.key !== "Escape" || event.isComposing)
        return;
      event.preventDefault();
      event.stopPropagation();
      clearTimers();
      setOpen(false);
    };
    document.addEventListener("keydown", onKeyDown, true);
    return () => document.removeEventListener("keydown", onKeyDown, true);
  }, [open, clearTimers, setOpen]);
  const updatePosition = useCallback(() => {
    const trigger2 = triggerRef.current;
    const bubble2 = bubbleRef.current;
    if (!trigger2 || !bubble2 || typeof window === "undefined")
      return;
    const r = trigger2.getBoundingClientRect();
    const next = computeTooltipPosition(
      r,
      bubble2.offsetWidth,
      bubble2.offsetHeight,
      side,
      align,
      { width: window.innerWidth, height: window.innerHeight }
    );
    setPosition(
      (prev) => prev && prev.top === next.top && prev.left === next.left && prev.side === next.side ? prev : next
    );
  }, [side, align]);
  useIsoLayoutEffect(() => {
    if (!open) {
      setPosition(null);
      return void 0;
    }
    updatePosition();
    if (zIndex === void 0) {
      const z = resolveLayerZIndex(triggerRef.current, void 0, "--z-tooltip-top", DEFAULT_TOOLTIP_Z);
      setAutoZ(typeof z === "number" ? z : void 0);
    }
    window.addEventListener("resize", updatePosition);
    window.addEventListener("scroll", updatePosition, true);
    return () => {
      window.removeEventListener("resize", updatePosition);
      window.removeEventListener("scroll", updatePosition, true);
    };
  }, [open, updatePosition, content, zIndex]);
  const child = React.Children.only(children);
  if (!isValidElement(child))
    return null;
  const childProps = child.props;
  const childRef = getElementRef(child);
  const describedBy = disabled ? childProps["aria-describedby"] : cls(childProps["aria-describedby"], tooltipId) || void 0;
  const trigger = cloneElement(child, {
    ref: (node) => {
      triggerRef.current = node;
      setRef(childRef, node);
    },
    "aria-describedby": describedBy,
    onPointerEnter: compose(
      childProps.onPointerEnter,
      (event) => {
        var _a2;
        if (event.pointerType === "touch")
          return;
        triggerRef.current = (_a2 = event.currentTarget) != null ? _a2 : triggerRef.current;
        hoveringRef.current = true;
        scheduleOpen(delay);
      }
    ),
    onPointerLeave: compose(
      childProps.onPointerLeave,
      (event) => {
        if (event.pointerType === "touch")
          return;
        hoveringRef.current = false;
        scheduleClose(closeDelay);
      }
    ),
    onFocus: compose(childProps.onFocus, (event) => {
      var _a2;
      triggerRef.current = (_a2 = event.currentTarget) != null ? _a2 : triggerRef.current;
      focusedRef.current = true;
      scheduleOpen(0);
    }),
    onBlur: compose(childProps.onBlur, () => {
      focusedRef.current = false;
      scheduleClose(hoveringRef.current ? closeDelay : 0);
    })
  });
  const maxWidthValue = typeof maxWidth === "number" ? `${maxWidth}px` : maxWidth;
  const bubble = mounted && !disabled ? createPortal(
    /* @__PURE__ */ jsx(
      "div",
      {
        ref: (node) => {
          bubbleRef.current = node;
          setRef(forwardedRef, node);
        },
        ...rest,
        id: tooltipId,
        role: "tooltip",
        hidden: !open,
        className: cls("ds-tooltip", className),
        "data-variant": variant,
        "data-side": (_a = position == null ? void 0 : position.side) != null ? _a : side,
        "data-align": align,
        "data-state": open ? "open" : "closed",
        "data-positioned": position ? "true" : "false",
        style: {
          ...zIndex !== void 0 ? { zIndex } : autoZ !== void 0 ? { zIndex: autoZ } : null,
          ...style,
          top: (_b = position == null ? void 0 : position.top) != null ? _b : 0,
          left: (_c = position == null ? void 0 : position.left) != null ? _c : 0,
          ["--ds-tooltip-max-width"]: maxWidthValue
        },
        onPointerEnter: (event) => {
          onBubblePointerEnter == null ? void 0 : onBubblePointerEnter(event);
          hoveringRef.current = true;
          if (closeTimer.current) {
            clearTimeout(closeTimer.current);
            closeTimer.current = null;
          }
        },
        onPointerLeave: (event) => {
          onBubblePointerLeave == null ? void 0 : onBubblePointerLeave(event);
          hoveringRef.current = false;
          scheduleClose(closeDelay);
        },
        children: content
      }
    ),
    document.body
  ) : null;
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    trigger,
    bubble
  ] });
});
Tooltip.displayName = "Tooltip";
var Tooltip_default = Tooltip;

export {
  Tooltip,
  Tooltip_default
};
//# sourceMappingURL=chunk-62VAVKCA.mjs.map