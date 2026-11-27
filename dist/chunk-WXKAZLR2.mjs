/* ucs:component-css */
import "./styles/components/molecules/ContextMenu/ContextMenu.css";
import {
  DropdownMenuCheckboxItem,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  PopoverContext,
  getMenuItems,
  handleMenuKeyNavigation,
  restoreFocus
} from "./chunk-UP5YH5MZ.mjs";
import {
  renderSlot
} from "./chunk-KILC4OUR.mjs";
import {
  FloatingLayerContext,
  isTopFloatingLayer,
  popFloatingLayer,
  pushFloatingLayer,
  resolveLayerZIndex
} from "./chunk-M6JALQW7.mjs";

// src/components/molecules/ContextMenu/index.tsx
import {
  createContext,
  forwardRef,
  useCallback,
  useContext,
  useEffect,
  useId,
  useLayoutEffect,
  useMemo,
  useRef,
  useState
} from "react";
import { createPortal } from "react-dom";

// src/components/molecules/ContextMenu/contextMenuPosition.ts
function computeContextMenuPosition(point, width, height, viewport, padding = 8) {
  const maxW = Math.max(0, viewport.width - padding * 2);
  const maxH = Math.max(0, viewport.height - padding * 2);
  const w = Math.min(width, maxW);
  const h = Math.min(height, maxH);
  let left = point.x;
  if (left + w > viewport.width - padding)
    left = point.x - w;
  let top = point.y;
  if (top + h > viewport.height - padding)
    top = point.y - h;
  left = Math.min(Math.max(left, padding), viewport.width - padding - w);
  top = Math.min(Math.max(top, padding), viewport.height - padding - h);
  return { top, left, maxHeight: maxH };
}

// src/components/molecules/ContextMenu/index.tsx
import { jsx } from "react/jsx-runtime";
function cls(...parts) {
  return parts.filter(Boolean).join(" ");
}
var ContextMenuContext = createContext(null);
function useContextMenu(component) {
  const ctx = useContext(ContextMenuContext);
  if (!ctx)
    throw new Error(`${component} must be used within <ContextMenu>`);
  return ctx;
}
function ContextMenu({
  children,
  open: openProp,
  defaultOpen = false,
  onOpenChange,
  position: positionProp,
  disabled = false
}) {
  const base = useId().replace(/:/g, "");
  const contentId = `context-menu-${base}`;
  const isControlled = openProp !== void 0;
  const [innerOpen, setInnerOpen] = useState(defaultOpen);
  const open = isControlled ? Boolean(openProp) : innerOpen;
  const [innerPosition, setInnerPosition] = useState(void 0);
  const position = positionProp != null ? positionProp : innerPosition;
  const triggerRef = useRef(null);
  const returnFocusRef = useRef(null);
  const restoreOnCloseRef = useRef(true);
  const prevOpenRef = useRef(false);
  const setOpen = useCallback(
    (next, opts) => {
      if (!next)
        restoreOnCloseRef.current = (opts == null ? void 0 : opts.restore) !== false;
      if (!isControlled)
        setInnerOpen(next);
      onOpenChange == null ? void 0 : onOpenChange(next);
    },
    [isControlled, onOpenChange]
  );
  useLayoutEffect(() => {
    if (!prevOpenRef.current && open && typeof document !== "undefined") {
      if (!returnFocusRef.current) {
        const active = document.activeElement;
        returnFocusRef.current = active && active !== document.body ? active : triggerRef.current;
      }
      restoreOnCloseRef.current = true;
    }
  }, [open]);
  useEffect(() => {
    if (prevOpenRef.current && !open) {
      const target = returnFocusRef.current;
      returnFocusRef.current = null;
      if (restoreOnCloseRef.current)
        requestAnimationFrame(() => restoreFocus(target));
    }
    prevOpenRef.current = open;
  }, [open]);
  const ctx = useMemo(
    () => ({
      open,
      setOpen,
      position,
      setPosition: setInnerPosition,
      contentId,
      triggerRef,
      returnFocusRef,
      disabled
    }),
    [open, setOpen, position, contentId, disabled]
  );
  const anchorRef = returnFocusRef;
  const popoverCtx = useMemo(
    () => ({
      open,
      setOpen: (next) => setOpen(next),
      triggerId: `${contentId}-trigger`,
      contentId,
      triggerRef,
      anchorRef,
      placement: "bottom-start"
    }),
    [open, setOpen, contentId, anchorRef]
  );
  return /* @__PURE__ */ jsx(ContextMenuContext.Provider, { value: ctx, children: /* @__PURE__ */ jsx(PopoverContext.Provider, { value: popoverCtx, children }) });
}
ContextMenu.displayName = "ContextMenu";
var ContextMenuTrigger = forwardRef(function ContextMenuTrigger2({ children, asChild = false, disabled: disabledProp = false, onContextMenu, onKeyDown, ...rest }, ref) {
  const ctx = useContextMenu("ContextMenuTrigger");
  const disabled = disabledProp || ctx.disabled;
  const setRefs = useCallback(
    (el) => {
      ctx.triggerRef.current = el;
      if (typeof ref === "function")
        ref(el);
      else if (ref)
        ref.current = el;
    },
    [ctx.triggerRef, ref]
  );
  const openAt = (point, invoker) => {
    var _a;
    ctx.setPosition(point);
    const active = typeof document !== "undefined" ? document.activeElement : null;
    ctx.returnFocusRef.current = active && active !== document.body && ((_a = ctx.triggerRef.current) == null ? void 0 : _a.contains(active)) ? active : invoker != null ? invoker : ctx.triggerRef.current;
    ctx.setOpen(true);
  };
  const handlers = {
    "data-state": ctx.open ? "open" : "closed",
    "aria-haspopup": "menu",
    onContextMenu: (e) => {
      onContextMenu == null ? void 0 : onContextMenu(e);
      if (disabled || e.defaultPrevented)
        return;
      e.preventDefault();
      openAt({ x: e.clientX, y: e.clientY }, e.currentTarget);
    },
    onKeyDown: (e) => {
      var _a;
      onKeyDown == null ? void 0 : onKeyDown(e);
      if (disabled || e.defaultPrevented)
        return;
      if (e.key === "F10" && e.shiftKey || e.key === "ContextMenu") {
        e.preventDefault();
        const target = (_a = e.target) != null ? _a : e.currentTarget;
        const r = target.getBoundingClientRect();
        openAt({ x: r.left, y: r.bottom }, target);
      }
    }
  };
  if (asChild) {
    return renderSlot(children, { ...rest, ...handlers }, setRefs, "ContextMenuTrigger");
  }
  return /* @__PURE__ */ jsx(
    "div",
    {
      ...rest,
      ...handlers,
      ref: setRefs,
      className: cls("ds-context-menu__trigger", rest.className),
      children
    }
  );
});
var ContextMenuContent = forwardRef(function ContextMenuContent2({
  children,
  className,
  zIndex,
  collisionPadding = 8,
  style,
  onKeyDown,
  onMouseDownCapture,
  onContextMenu,
  ...rest
}, ref) {
  var _a, _b, _c;
  const ctx = useContextMenu("ContextMenuContent");
  const { open, setOpen, position, contentId, triggerRef, returnFocusRef } = ctx;
  const contentRef = useRef(null);
  const insideTreeRef = useRef(false);
  const [placement, setPlacement] = useState(null);
  const [layerZ, setLayerZ] = useState("var(--z-popover, 450)");
  const point = useMemo(() => {
    var _a2;
    if (position)
      return position;
    const r = (_a2 = triggerRef.current) == null ? void 0 : _a2.getBoundingClientRect();
    return r ? { x: r.left, y: r.bottom } : { x: 0, y: 0 };
  }, [position, open, triggerRef]);
  const measure = useCallback(() => {
    const panel = contentRef.current;
    if (!panel || typeof window === "undefined")
      return;
    const next = computeContextMenuPosition(
      point,
      panel.offsetWidth,
      panel.offsetHeight,
      { width: window.innerWidth, height: window.innerHeight },
      collisionPadding
    );
    setPlacement(
      (prev) => prev && prev.top === next.top && prev.left === next.left && prev.maxHeight === next.maxHeight ? prev : next
    );
  }, [point, collisionPadding]);
  useLayoutEffect(() => {
    var _a2;
    if (!open) {
      setPlacement(null);
      return;
    }
    measure();
    if (zIndex === void 0) {
      setLayerZ(resolveLayerZIndex((_a2 = returnFocusRef.current) != null ? _a2 : triggerRef.current, void 0));
    }
  }, [open, measure, zIndex, returnFocusRef, triggerRef]);
  useEffect(() => {
    if (!open)
      return;
    const panel = contentRef.current;
    if (!panel)
      return;
    const first = getMenuItems(panel)[0];
    (first != null ? first : panel).focus({ preventScroll: true });
  }, [open]);
  const parentLayerId = useContext(FloatingLayerContext);
  useEffect(() => {
    if (!open)
      return void 0;
    pushFloatingLayer(contentId, parentLayerId);
    return () => popFloatingLayer(contentId);
  }, [open, contentId, parentLayerId]);
  useEffect(() => {
    if (!open)
      return void 0;
    const isInside = (t) => {
      var _a2;
      return t instanceof Node && !!((_a2 = contentRef.current) == null ? void 0 : _a2.contains(t));
    };
    const onMouseDown = (e) => {
      const inside = insideTreeRef.current;
      insideTreeRef.current = false;
      if (inside || isInside(e.target))
        return;
      setOpen(false, { restore: false });
    };
    const onKey = (e) => {
      if (e.key !== "Escape" || e.isComposing || e.defaultPrevented)
        return;
      if (!isTopFloatingLayer(contentId))
        return;
      e.preventDefault();
      setOpen(false);
    };
    const onScroll = (e) => {
      if (isInside(e.target))
        return;
      setOpen(false, { restore: false });
    };
    const onBlurOrResize = () => setOpen(false, { restore: false });
    document.addEventListener("mousedown", onMouseDown);
    document.addEventListener("keydown", onKey, true);
    window.addEventListener("scroll", onScroll, true);
    window.addEventListener("resize", onBlurOrResize);
    window.addEventListener("blur", onBlurOrResize);
    return () => {
      document.removeEventListener("mousedown", onMouseDown);
      document.removeEventListener("keydown", onKey, true);
      window.removeEventListener("scroll", onScroll, true);
      window.removeEventListener("resize", onBlurOrResize);
      window.removeEventListener("blur", onBlurOrResize);
    };
  }, [open, setOpen, contentId]);
  if (!open || typeof document === "undefined")
    return null;
  const label = (_a = rest["aria-label"]) != null ? _a : rest["aria-labelledby"] ? void 0 : "Context menu";
  return createPortal(
    /* @__PURE__ */ jsx(
      "div",
      {
        ...rest,
        ref: (el) => {
          contentRef.current = el;
          if (typeof ref === "function")
            ref(el);
          else if (ref)
            ref.current = el;
        },
        id: contentId,
        role: "menu",
        "aria-orientation": "vertical",
        "aria-label": label,
        tabIndex: -1,
        "data-state": "open",
        "data-positioned": placement ? "true" : "false",
        className: cls("ds-popover__content", "ds-context-menu__content", className),
        style: {
          position: "fixed",
          top: (_b = placement == null ? void 0 : placement.top) != null ? _b : point.y,
          left: (_c = placement == null ? void 0 : placement.left) != null ? _c : point.x,
          maxHeight: placement == null ? void 0 : placement.maxHeight,
          overflow: "auto",
          zIndex: zIndex != null ? zIndex : layerZ,
          ...style
        },
        onMouseDownCapture: (e) => {
          insideTreeRef.current = true;
          onMouseDownCapture == null ? void 0 : onMouseDownCapture(e);
        },
        onContextMenu: (e) => {
          onContextMenu == null ? void 0 : onContextMenu(e);
          e.preventDefault();
        },
        onKeyDown: (e) => {
          onKeyDown == null ? void 0 : onKeyDown(e);
          if (e.defaultPrevented)
            return;
          if (e.key === "Escape") {
            e.preventDefault();
            setOpen(false);
            return;
          }
          if (e.key === "Tab") {
            e.preventDefault();
            setOpen(false);
            return;
          }
          handleMenuKeyNavigation(e);
        },
        children: /* @__PURE__ */ jsx(FloatingLayerContext.Provider, { value: contentId, children })
      }
    ),
    document.body
  );
});
var ContextMenuItem = DropdownMenuItem;
var ContextMenuCheckboxItem = DropdownMenuCheckboxItem;
var ContextMenuRadioGroup = DropdownMenuRadioGroup;
var ContextMenuRadioItem = DropdownMenuRadioItem;
var ContextMenuLabel = DropdownMenuLabel;
var ContextMenuSeparator = DropdownMenuSeparator;
var ContextMenuGroup = DropdownMenuGroup;
var ContextMenu_default = ContextMenu;

export {
  computeContextMenuPosition,
  ContextMenu,
  ContextMenuTrigger,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuCheckboxItem,
  ContextMenuRadioGroup,
  ContextMenuRadioItem,
  ContextMenuLabel,
  ContextMenuSeparator,
  ContextMenuGroup,
  ContextMenu_default
};
//# sourceMappingURL=chunk-WXKAZLR2.mjs.map