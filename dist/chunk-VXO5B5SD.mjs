/* ucs:component-css */
import "./styles/components/molecules/Drawer/Drawer.css";
import {
  getFocusable,
  nearestSnapIndex,
  resolveSnapPx,
  trapTabKey
} from "./chunk-R3MWLFBP.mjs";
import {
  runGuardedClose
} from "./chunk-V2S4I5H5.mjs";
import {
  acquireBodyScrollLock,
  releaseBodyScrollLock
} from "./chunk-63D2ARDU.mjs";
import {
  OverlayLayerContext,
  isTopLayer,
  popLayer,
  pushLayer
} from "./chunk-FPB2PMES.mjs";

// src/components/molecules/Drawer/index.tsx
import React, { useCallback, useContext, useEffect, useId, useRef, useState } from "react";
import { createPortal } from "react-dom";

// src/components/molecules/Drawer/Drawer.config.ts
var DRAWER_DEFAULTS = {
  side: "right",
  size: "md",
  showCloseButton: true,
  closeLabel: "Close",
  closeOnBackdropClick: true,
  closeOnEscape: true,
  modal: true,
  returnFocus: true
};
var DRAWER_WIDTHS = {
  sm: "20rem",
  md: "25rem",
  lg: "35rem",
  xl: "50rem",
  full: "100vw"
};
var DRAWER_HEIGHTS = {
  sm: "15rem",
  md: "22.5rem",
  lg: "30rem",
  xl: "40rem",
  full: "100dvh"
};
var DRAWER_EXIT_FALLBACK_MS = 320;
var BOTTOM_SHEET_DEFAULTS = {
  handleLabel: "Resize sheet",
  defaultSnap: 0
};
var SHEET_DRAG_SLOP_PX = 6;
var SHEET_DISMISS_DISTANCE_RATIO = 0.25;
var SHEET_DISMISS_VELOCITY = 0.5;
var SHEET_FLICK_MIN_PX = 24;

// src/components/molecules/Drawer/index.tsx
import { jsx, jsxs } from "react/jsx-runtime";
function CloseGlyph() {
  return /* @__PURE__ */ jsx("svg", { viewBox: "0 0 16 16", width: "16", height: "16", "aria-hidden": true, focusable: "false", children: /* @__PURE__ */ jsx(
    "path",
    {
      d: "M4 4l8 8M12 4l-8 8",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: "1.75",
      strokeLinecap: "round"
    }
  ) });
}
var Drawer = React.forwardRef(function Drawer2({
  open,
  onOpenChange,
  side = DRAWER_DEFAULTS.side,
  size = DRAWER_DEFAULTS.size,
  title,
  description,
  headerActions,
  onBeforeClose,
  bodyScroll = true,
  bodyClassName,
  children,
  footer,
  showCloseButton = DRAWER_DEFAULTS.showCloseButton,
  closeLabel = DRAWER_DEFAULTS.closeLabel,
  closeOnBackdropClick = DRAWER_DEFAULTS.closeOnBackdropClick,
  closeOnEscape = DRAWER_DEFAULTS.closeOnEscape,
  modal = DRAWER_DEFAULTS.modal,
  initialFocusRef,
  returnFocus = DRAWER_DEFAULTS.returnFocus,
  className,
  id,
  handle = false,
  handleLabel = BOTTOM_SHEET_DEFAULTS.handleLabel,
  swipeToDismiss,
  snapPoints,
  defaultSnap = BOTTOM_SHEET_DEFAULTS.defaultSnap,
  snap: snapProp,
  onSnapChange
}, forwardedRef) {
  const autoId = useId();
  const layerId = `drawer-${autoId}`;
  const parentLayerId = useContext(OverlayLayerContext);
  const baseId = id != null ? id : `ds-drawer-${autoId.replace(/:/g, "")}`;
  const titleId = `${baseId}-title`;
  const descriptionId = `${baseId}-description`;
  const panelRef = useRef(null);
  const bodyRef = useRef(null);
  const lastFocusedRef = useRef(null);
  const ownedFocusTargetRef = useRef(null);
  const onOpenChangeRef = useRef(onOpenChange);
  onOpenChangeRef.current = onOpenChange;
  const returnFocusRef = useRef(returnFocus);
  returnFocusRef.current = returnFocus;
  const initialFocusRefRef = useRef(initialFocusRef);
  initialFocusRefRef.current = initialFocusRef;
  const [present, setPresent] = useState(open);
  if (open && !present)
    setPresent(true);
  const [bodyScrollable, setBodyScrollable] = useState(false);
  const isSheet = side === "bottom";
  const snapList = isSheet && snapPoints && snapPoints.length > 0 ? snapPoints : null;
  const showHandle = isSheet && handle;
  const canSwipe = showHandle && (swipeToDismiss != null ? swipeToDismiss : handle);
  const clampSnap = (i) => snapList ? Math.min(Math.max(0, Math.round(i)), snapList.length - 1) : 0;
  const [innerSnap, setInnerSnap] = useState(() => clampSnap(defaultSnap));
  const [prevOpen, setPrevOpen] = useState(open);
  if (open !== prevOpen) {
    setPrevOpen(open);
    if (open)
      setInnerSnap(clampSnap(defaultSnap));
  }
  const snapIndex = clampSnap(snapProp != null ? snapProp : innerSnap);
  const [snapAnnouncement, setSnapAnnouncement] = useState("");
  const dragRef = useRef(null);
  const suppressHandleClickRef = useRef(false);
  const setPanelRef = useCallback(
    (node) => {
      panelRef.current = node;
      if (typeof forwardedRef === "function")
        forwardedRef(node);
      else if (forwardedRef)
        forwardedRef.current = node;
    },
    [forwardedRef]
  );
  const onBeforeCloseRef = useRef(onBeforeClose);
  onBeforeCloseRef.current = onBeforeClose;
  const guardPendingRef = useRef(false);
  const openRef = useRef(open);
  openRef.current = open;
  const requestClose = useCallback(() => {
    runGuardedClose(
      onBeforeCloseRef.current,
      () => onOpenChangeRef.current(false),
      guardPendingRef,
      () => openRef.current
    );
  }, []);
  useEffect(() => {
    if (open || !present)
      return void 0;
    const panel = panelRef.current;
    const animationName = panel && typeof window !== "undefined" ? window.getComputedStyle(panel).animationName : "";
    if (!animationName || animationName === "none") {
      setPresent(false);
      return void 0;
    }
    const timer = setTimeout(() => setPresent(false), DRAWER_EXIT_FALLBACK_MS);
    return () => clearTimeout(timer);
  }, [open, present]);
  useEffect(() => {
    if (!open)
      return void 0;
    pushLayer(layerId, parentLayerId);
    return () => popLayer(layerId);
  }, [open, layerId, parentLayerId]);
  useEffect(() => {
    if (!open || !modal)
      return void 0;
    const onFocusIn = (e) => {
      var _a;
      const panel = panelRef.current;
      const target = e.target;
      if (!panel || !(target instanceof Node))
        return;
      if (panel.contains(target)) {
        ownedFocusTargetRef.current = null;
        lastFocusedRef.current = target;
        return;
      }
      const owned = ownedFocusTargetRef.current === target;
      ownedFocusTargetRef.current = null;
      if (owned)
        return;
      if (!isTopLayer(layerId))
        return;
      const allowed = target instanceof Element ? target : target.parentElement;
      if (allowed == null ? void 0 : allowed.closest("[data-overlay-allow]"))
        return;
      const fallback = lastFocusedRef.current && panel.contains(lastFocusedRef.current) ? lastFocusedRef.current : (_a = getFocusable(panel)[0]) != null ? _a : panel;
      fallback.focus({ preventScroll: true });
    };
    document.addEventListener("focusin", onFocusIn);
    return () => document.removeEventListener("focusin", onFocusIn);
  }, [open, modal, layerId]);
  useEffect(() => {
    var _a, _b, _c;
    if (!open)
      return void 0;
    const previous = typeof document !== "undefined" ? document.activeElement : null;
    const panel = panelRef.current;
    if (panel) {
      panel.style.translate = "";
      const target = (_c = (_b = (_a = initialFocusRefRef.current) == null ? void 0 : _a.current) != null ? _b : getFocusable(panel).find((el) => !el.hasAttribute("data-drawer-handle"))) != null ? _c : panel;
      target.focus({ preventScroll: true });
    }
    return () => {
      if (returnFocusRef.current && previous && previous !== document.body && previous.isConnected && typeof previous.focus === "function") {
        previous.focus({ preventScroll: true });
      }
    };
  }, [open]);
  useEffect(() => {
    if (!open || !modal)
      return void 0;
    acquireBodyScrollLock();
    return () => releaseBodyScrollLock();
  }, [open, modal]);
  useEffect(() => {
    if (!open || !closeOnEscape)
      return void 0;
    const onKeyDown = (e) => {
      if (e.key !== "Escape" || e.defaultPrevented || e.isComposing)
        return;
      if (!isTopLayer(layerId))
        return;
      e.preventDefault();
      e.stopPropagation();
      requestClose();
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open, closeOnEscape, requestClose, layerId]);
  useEffect(() => {
    const body = bodyRef.current;
    if (!present || !body)
      return void 0;
    const measure = () => setBodyScrollable(body.scrollHeight > body.clientHeight + 1);
    measure();
    if (typeof ResizeObserver === "undefined")
      return void 0;
    const observer = new ResizeObserver(measure);
    observer.observe(body);
    Array.from(body.children).forEach((child) => observer.observe(child));
    return () => observer.disconnect();
  }, [present, children]);
  if (!present || typeof document === "undefined")
    return null;
  const state = open ? "open" : "closed";
  const extent = snapList ? snapList[snapIndex] : side === "left" || side === "right" ? DRAWER_WIDTHS[size] : DRAWER_HEIGHTS[size];
  const changeSnap = (next) => {
    var _a;
    if (!snapList)
      return;
    const target = clampSnap(next);
    (_a = panelRef.current) == null ? void 0 : _a.style.setProperty("--ds-drawer-extent", snapList[target]);
    if (target === snapIndex)
      return;
    if (snapProp === void 0)
      setInnerSnap(target);
    setSnapAnnouncement(`${handleLabel}: ${snapList[target]}`);
    onSnapChange == null ? void 0 : onSnapChange(target, snapList[target]);
  };
  const resetDragOffset = () => {
    const panel = panelRef.current;
    if (panel)
      panel.style.translate = "";
  };
  const swipeDismiss = () => {
    requestClose();
    setTimeout(() => {
      if (openRef.current)
        resetDragOffset();
    }, DRAWER_EXIT_FALLBACK_MS);
  };
  const handlePointerDown = (e) => {
    var _a, _b;
    if (!open || !canSwipe && !snapList)
      return;
    if (e.pointerType === "mouse" && e.button !== 0)
      return;
    const panel = panelRef.current;
    if (!panel)
      return;
    dragRef.current = {
      pointerId: e.pointerId,
      startY: e.clientY,
      startTime: typeof performance !== "undefined" ? performance.now() : Date.now(),
      startHeight: panel.getBoundingClientRect().height,
      startSnap: snapIndex,
      moved: false
    };
    (_b = (_a = e.currentTarget).setPointerCapture) == null ? void 0 : _b.call(_a, e.pointerId);
  };
  const handlePointerMove = (e) => {
    const drag = dragRef.current;
    const panel = panelRef.current;
    if (!drag || !panel || e.pointerId !== drag.pointerId)
      return;
    const dy = e.clientY - drag.startY;
    if (!drag.moved && Math.abs(dy) < SHEET_DRAG_SLOP_PX)
      return;
    drag.moved = true;
    panel.dataset.dragging = "true";
    if (snapList) {
      const vh = window.innerHeight;
      const px = snapList.map((p) => resolveSnapPx(p, vh)).filter((n) => !Number.isNaN(n));
      const minPx = px.length ? Math.min(...px) : drag.startHeight;
      const maxPx = px.length ? Math.max(...px) : drag.startHeight;
      const wanted = drag.startHeight - dy;
      const height = Math.min(Math.max(wanted, minPx), maxPx);
      panel.style.setProperty("--ds-drawer-extent", `${height}px`);
      panel.style.translate = canSwipe && wanted < minPx ? `0 ${minPx - wanted}px` : "";
    } else {
      panel.style.translate = `0 ${Math.max(0, dy)}px`;
    }
  };
  const endDrag = (e, cancelled) => {
    var _a, _b;
    const drag = dragRef.current;
    const panel = panelRef.current;
    if (!drag || e.pointerId !== drag.pointerId)
      return;
    dragRef.current = null;
    if ((_b = (_a = e.currentTarget).hasPointerCapture) == null ? void 0 : _b.call(_a, e.pointerId))
      e.currentTarget.releasePointerCapture(e.pointerId);
    if (!panel || !drag.moved)
      return;
    delete panel.dataset.dragging;
    suppressHandleClickRef.current = true;
    const dy = cancelled ? 0 : e.clientY - drag.startY;
    const now = typeof performance !== "undefined" ? performance.now() : Date.now();
    const velocity = dy / Math.max(1, now - drag.startTime);
    const flickDown = dy >= SHEET_FLICK_MIN_PX && velocity > SHEET_DISMISS_VELOCITY;
    const flickUp = -dy >= SHEET_FLICK_MIN_PX && -velocity > SHEET_DISMISS_VELOCITY;
    if (snapList) {
      const vh = window.innerHeight;
      const px = snapList.map((p) => resolveSnapPx(p, vh));
      const valid = px.filter((n) => !Number.isNaN(n));
      const minPx = valid.length ? Math.min(...valid) : drag.startHeight;
      const wanted = drag.startHeight - dy;
      const overshoot = minPx - wanted;
      if (canSwipe && overshoot > 0 && (overshoot > minPx * SHEET_DISMISS_DISTANCE_RATIO || flickDown)) {
        swipeDismiss();
        return;
      }
      let target = nearestSnapIndex(wanted, px);
      if (target === drag.startSnap && flickDown)
        target = drag.startSnap - 1;
      if (target === drag.startSnap && flickUp)
        target = drag.startSnap + 1;
      resetDragOffset();
      changeSnap(target);
      return;
    }
    if (canSwipe && (dy > drag.startHeight * SHEET_DISMISS_DISTANCE_RATIO || flickDown)) {
      swipeDismiss();
      return;
    }
    resetDragOffset();
  };
  const handleHandleClick = () => {
    if (suppressHandleClickRef.current) {
      suppressHandleClickRef.current = false;
      return;
    }
    if (snapList)
      changeSnap((snapIndex + 1) % snapList.length);
  };
  const handleHandleKeyDown = (e) => {
    if (!snapList)
      return;
    const last = snapList.length - 1;
    const next = e.key === "ArrowUp" || e.key === "ArrowRight" ? Math.min(last, snapIndex + 1) : e.key === "ArrowDown" || e.key === "ArrowLeft" ? Math.max(0, snapIndex - 1) : e.key === "Home" ? 0 : e.key === "End" ? last : null;
    if (next === null)
      return;
    e.preventDefault();
    changeSnap(next);
  };
  const gestureHandlers = {
    onPointerDown: handlePointerDown,
    onPointerMove: handlePointerMove,
    onPointerUp: (e) => endDrag(e, false),
    onPointerCancel: (e) => endDrag(e, true)
  };
  const handlePanelKeyDown = (e) => {
    if (modal && panelRef.current)
      trapTabKey(e.nativeEvent, panelRef.current);
  };
  const handleAnimationEnd = (e) => {
    if (!open && e.target === e.currentTarget)
      setPresent(false);
  };
  return createPortal(
    /* @__PURE__ */ jsx(OverlayLayerContext.Provider, { value: layerId, children: /* @__PURE__ */ jsxs(
      "div",
      {
        className: "ds-drawer-root",
        "data-modal": modal ? "true" : "false",
        onFocusCapture: (e) => {
          ownedFocusTargetRef.current = e.target;
        },
        children: [
          modal ? /* @__PURE__ */ jsx(
            "div",
            {
              className: "ds-drawer__backdrop",
              "data-state": state,
              "aria-hidden": "true",
              onMouseDown: (e) => e.preventDefault(),
              onClick: closeOnBackdropClick && open ? () => {
                if (isTopLayer(layerId))
                  requestClose();
              } : void 0
            }
          ) : null,
          /* @__PURE__ */ jsxs(
            "div",
            {
              ref: setPanelRef,
              id: baseId,
              role: "dialog",
              "aria-modal": modal ? true : void 0,
              "aria-labelledby": titleId,
              "aria-describedby": description != null ? descriptionId : void 0,
              tabIndex: -1,
              className: ["ds-drawer", className].filter(Boolean).join(" "),
              "data-side": side,
              "data-size": size,
              "data-state": state,
              "data-handle": showHandle ? "true" : void 0,
              "data-snap": snapList ? snapIndex : void 0,
              style: { "--ds-drawer-extent": extent },
              onKeyDown: handlePanelKeyDown,
              onAnimationEnd: handleAnimationEnd,
              children: [
                showHandle && snapList ? /* @__PURE__ */ jsx(
                  "button",
                  {
                    type: "button",
                    className: "ds-drawer__handle",
                    "data-drawer-handle": "",
                    "aria-label": handleLabel,
                    "aria-keyshortcuts": "ArrowUp ArrowDown Home End",
                    onClick: handleHandleClick,
                    onKeyDown: handleHandleKeyDown,
                    ...gestureHandlers,
                    children: /* @__PURE__ */ jsx("span", { className: "ds-drawer__handle-bar", "aria-hidden": "true" })
                  }
                ) : showHandle ? (
                  // Pointer-only grip (swipe-to-dismiss); keyboard users close with the X button or Escape.
                  /* @__PURE__ */ jsx("div", { className: "ds-drawer__handle", "data-drawer-handle": "", "aria-hidden": "true", ...gestureHandlers, children: /* @__PURE__ */ jsx("span", { className: "ds-drawer__handle-bar" }) })
                ) : null,
                showHandle && snapList ? /* @__PURE__ */ jsx("span", { className: "ds-drawer__sr", role: "status", "aria-live": "polite", "aria-atomic": "true", children: snapAnnouncement }) : null,
                /* @__PURE__ */ jsxs("div", { className: "ds-drawer__header", children: [
                  /* @__PURE__ */ jsxs("div", { className: "ds-drawer__heading", children: [
                    /* @__PURE__ */ jsx("h2", { id: titleId, className: "ds-drawer__title", children: title }),
                    description != null ? /* @__PURE__ */ jsx("div", { id: descriptionId, className: "ds-drawer__description", children: description }) : null
                  ] }),
                  headerActions != null && headerActions !== false ? /* @__PURE__ */ jsx("div", { className: "ds-drawer__header-actions", children: headerActions }) : null,
                  showCloseButton ? /* @__PURE__ */ jsx(
                    "button",
                    {
                      type: "button",
                      className: "ds-drawer__close",
                      "aria-label": closeLabel,
                      onClick: requestClose,
                      children: /* @__PURE__ */ jsx(CloseGlyph, {})
                    }
                  ) : null
                ] }),
                /* @__PURE__ */ jsx(
                  "div",
                  {
                    ref: bodyRef,
                    className: ["ds-drawer__body", bodyClassName].filter(Boolean).join(" "),
                    tabIndex: bodyScroll && bodyScrollable ? 0 : void 0,
                    "data-scrollable": bodyScroll && bodyScrollable ? "true" : void 0,
                    "data-body-scroll": bodyScroll ? void 0 : "false",
                    children
                  }
                ),
                footer != null ? /* @__PURE__ */ jsx("div", { className: "ds-drawer__footer", children: footer }) : null
              ]
            }
          )
        ]
      }
    ) }),
    document.body
  );
});
Drawer.displayName = "Drawer";
var Sheet = Drawer;
var BottomSheet = React.forwardRef(function BottomSheet2({ handle = true, ...props }, ref) {
  return /* @__PURE__ */ jsx(Drawer, { ...props, handle, side: "bottom", ref });
});
BottomSheet.displayName = "BottomSheet";
var Drawer_default = Drawer;

export {
  Sheet,
  BottomSheet,
  Drawer_default
};
//# sourceMappingURL=chunk-VXO5B5SD.mjs.map