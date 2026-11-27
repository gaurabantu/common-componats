/* ucs:component-css */
import "./styles/components/molecules/Menu/Menu.css";
import {
  Kbd_default,
  toAriaKeyShortcuts,
  useIsMac
} from "./chunk-CATLDOA2.mjs";
import {
  computePopoverPosition,
  renderSlot
} from "./chunk-KILC4OUR.mjs";
import {
  isSafeHref
} from "./chunk-2SUDH5VN.mjs";
import {
  computeTooltipPosition
} from "./chunk-CS56N245.mjs";
import {
  FloatingLayerContext,
  isTopFloatingLayer,
  popFloatingLayer,
  pushFloatingLayer,
  resolveLayerZIndex
} from "./chunk-M6JALQW7.mjs";

// src/components/molecules/Menu/index.tsx
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

// src/components/molecules/Menu/Menu.config.ts
var MENU_DEFAULTS = {
  placement: "bottom-start",
  loop: true,
  variant: "default"
};
var SUBMENU_OPEN_DELAY = 100;
var TYPEAHEAD_TIMEOUT = 500;
var SUBMENU_OVERLAP = 4;
var MENU_ROW_ROLES = ["menuitem", "menuitemcheckbox", "menuitemradio"];

// src/components/molecules/Menu/Menu.utils.ts
var ENABLED_ROW_SELECTOR = MENU_ROW_ROLES.map((r) => `[role="${r}"]:not([aria-disabled="true"])`).join(", ");
function getEnabledMenuItems(panel) {
  if (!panel)
    return [];
  return Array.from(panel.querySelectorAll(ENABLED_ROW_SELECTOR));
}
function getItemText(el) {
  var _a, _b;
  const explicit = el.getAttribute("data-text-value");
  if (explicit)
    return explicit.trim().toLowerCase();
  const label = (_a = el.querySelector(".ds-menu__label-text")) != null ? _a : el;
  return ((_b = label.textContent) != null ? _b : "").trim().toLowerCase();
}
function findTypeaheadIndex(items, buffer, current) {
  if (!buffer || items.length === 0)
    return -1;
  const query = buffer.toLowerCase();
  const repeated = query.split("").every((ch) => ch === query[0]);
  const search = repeated ? query[0] : query;
  const start = repeated ? current + 1 : Math.max(current, 0);
  for (let step = 0; step < items.length; step += 1) {
    const index = (start + step) % items.length;
    if (getItemText(items[index]).startsWith(search))
      return index;
  }
  return -1;
}
function isPrintableKey(e) {
  return e.key.length === 1 && e.key !== " " && !e.ctrlKey && !e.metaKey && !e.altKey;
}

// src/components/molecules/Menu/index.tsx
import { Fragment, jsx, jsxs } from "react/jsx-runtime";
function cls(...parts) {
  return parts.filter(Boolean).join(" ");
}
function useStableId(prefix) {
  return `${prefix}-${useId().replace(/:/g, "")}`;
}
var MenuRootContext = createContext(null);
var MenuLevelContext = createContext(null);
var MenuSubContext = createContext(null);
var MenuRadioContext = createContext(null);
function useMenuRoot(component) {
  const ctx = useContext(MenuRootContext);
  if (!ctx)
    throw new Error(`${component} must be used within <Menu>`);
  return ctx;
}
function setRef(ref, value) {
  if (typeof ref === "function")
    ref(value);
  else if (ref && typeof ref === "object")
    ref.current = value;
}
function focusEdge(panel, edge) {
  if (!panel || edge === "none")
    return;
  const items = getEnabledMenuItems(panel);
  const target = edge === "last" ? items[items.length - 1] : items[0];
  (target != null ? target : panel).focus({ preventScroll: true });
}
function Menu({ children, open: openProp, defaultOpen = false, onOpenChange }) {
  const triggerId = useStableId("ds-menu-trigger");
  const contentId = useStableId("ds-menu-content");
  const triggerRef = useRef(null);
  const intentRef = useRef("first");
  const isControlled = openProp !== void 0;
  const [inner, setInner] = useState(defaultOpen);
  const open = isControlled ? Boolean(openProp) : inner;
  const prevOpen = useRef(open);
  const setOpen = useCallback(
    (next, intent = "first") => {
      intentRef.current = intent;
      if (!isControlled)
        setInner(next);
      onOpenChange == null ? void 0 : onOpenChange(next);
    },
    [isControlled, onOpenChange]
  );
  const close = useCallback(
    (reason) => {
      var _a;
      if (reason !== "outside")
        (_a = triggerRef.current) == null ? void 0 : _a.focus({ preventScroll: true });
      setOpen(false);
    },
    [setOpen]
  );
  useEffect(() => {
    if (prevOpen.current && !open && typeof window !== "undefined") {
      const el = triggerRef.current;
      const id = window.requestAnimationFrame(() => {
        const active = document.activeElement;
        if (el && el.isConnected && (!active || active === document.body))
          el.focus({ preventScroll: true });
      });
      prevOpen.current = open;
      return () => window.cancelAnimationFrame(id);
    }
    prevOpen.current = open;
    return void 0;
  }, [open]);
  const value = useMemo(
    () => ({ open, setOpen, close, triggerId, contentId, triggerRef, intentRef }),
    [open, setOpen, close, triggerId, contentId]
  );
  return /* @__PURE__ */ jsx(MenuRootContext.Provider, { value, children });
}
var MenuTrigger = forwardRef(function MenuTrigger2({ children, asChild = false, onClick, onKeyDown, type = "button", className, ...rest }, ref) {
  var _a;
  const ctx = useMenuRoot("MenuTrigger");
  const setRefs = useCallback(
    (el) => {
      ctx.triggerRef.current = el;
      setRef(ref, el);
    },
    [ctx.triggerRef, ref]
  );
  const triggerProps = {
    ...rest,
    id: (_a = rest.id) != null ? _a : ctx.triggerId,
    "aria-haspopup": "menu",
    "aria-expanded": ctx.open,
    "aria-controls": ctx.open ? ctx.contentId : void 0,
    "data-state": ctx.open ? "open" : "closed",
    onClick: (e) => {
      onClick == null ? void 0 : onClick(e);
      if (e.defaultPrevented)
        return;
      ctx.setOpen(!ctx.open, "first");
    },
    onKeyDown: (e) => {
      onKeyDown == null ? void 0 : onKeyDown(e);
      if (e.defaultPrevented)
        return;
      if (e.key === "Enter" || e.key === " " || e.key === "ArrowDown") {
        e.preventDefault();
        ctx.setOpen(true, "first");
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        ctx.setOpen(true, "last");
      }
    }
  };
  if (asChild) {
    return renderSlot(children, { ...triggerProps, className }, setRefs, "MenuTrigger");
  }
  return /* @__PURE__ */ jsx("button", { ...triggerProps, ref: setRefs, type, className: cls("ds-menu__trigger", className), children });
});
function MenuPanel({
  kind,
  panelId,
  labelledById,
  anchorRef,
  intentRef,
  placement = MENU_DEFAULTS.placement,
  onClose,
  loop = MENU_DEFAULTS.loop,
  zIndex,
  children,
  className,
  style,
  onKeyDown,
  onMouseDownCapture,
  ...rest
}) {
  var _a;
  const root = useMenuRoot("MenuContent");
  const panelRef = useRef(null);
  const insideTreeRef = useRef(false);
  const typeahead = useRef({ buffer: "" });
  const [openSubId, setOpenSubId] = useState(null);
  const [layerZ, setLayerZ] = useState("var(--z-popover, 450)");
  const [pos, setPos] = useState({
    top: 0,
    left: 0
  });
  const parentLayerId = useContext(FloatingLayerContext);
  const onCloseRef = useRef(onClose);
  onCloseRef.current = onClose;
  const updatePosition = useCallback(() => {
    const anchor = anchorRef.current;
    const panel2 = panelRef.current;
    if (!anchor || !panel2 || typeof window === "undefined")
      return;
    const r = anchor.getBoundingClientRect();
    const w = panel2.offsetWidth || 160;
    const h = panel2.offsetHeight || 80;
    if (kind === "root") {
      const res2 = computePopoverPosition(r, w, h, placement);
      setPos({ top: res2.top, left: res2.left, maxHeight: res2.maxHeight, side: res2.top < r.top ? "top" : "bottom" });
      return;
    }
    const vp = { width: window.innerWidth, height: window.innerHeight };
    const res = computeTooltipPosition(r, w, h, "right", "start", vp);
    const left = res.side === "right" ? res.left - SUBMENU_OVERLAP * 3 : res.side === "left" ? res.left + SUBMENU_OVERLAP * 3 : res.left;
    setPos({ top: res.top - SUBMENU_OVERLAP, left, maxHeight: vp.height - 16, side: res.side });
  }, [anchorRef, kind, placement]);
  useLayoutEffect(() => {
    setLayerZ(resolveLayerZIndex(anchorRef.current, zIndex));
    updatePosition();
    const id = requestAnimationFrame(updatePosition);
    return () => cancelAnimationFrame(id);
  }, [anchorRef, zIndex, updatePosition]);
  useEffect(() => {
    window.addEventListener("resize", updatePosition);
    window.addEventListener("scroll", updatePosition, true);
    return () => {
      window.removeEventListener("resize", updatePosition);
      window.removeEventListener("scroll", updatePosition, true);
    };
  }, [updatePosition]);
  useEffect(() => {
    pushFloatingLayer(panelId, parentLayerId);
    return () => popFloatingLayer(panelId);
  }, [panelId, parentLayerId]);
  useEffect(() => {
    const onKey = (e) => {
      if (e.key !== "Escape" || e.isComposing || e.defaultPrevented)
        return;
      if (!isTopFloatingLayer(panelId))
        return;
      e.preventDefault();
      onCloseRef.current("escape");
    };
    document.addEventListener("keydown", onKey, true);
    return () => document.removeEventListener("keydown", onKey, true);
  }, [panelId]);
  useEffect(() => {
    if (kind !== "root")
      return void 0;
    const onDown = (e) => {
      var _a2, _b;
      const inside = insideTreeRef.current;
      insideTreeRef.current = false;
      if (inside)
        return;
      const t = e.target;
      if (((_a2 = anchorRef.current) == null ? void 0 : _a2.contains(t)) || ((_b = panelRef.current) == null ? void 0 : _b.contains(t)))
        return;
      onCloseRef.current("outside");
    };
    document.addEventListener("mousedown", onDown);
    return () => document.removeEventListener("mousedown", onDown);
  }, [kind, anchorRef]);
  useEffect(() => {
    focusEdge(panelRef.current, intentRef.current);
    const ta = typeahead.current;
    return () => {
      if (ta.timer)
        clearTimeout(ta.timer);
    };
  }, [intentRef]);
  const handleKeyDown = (e) => {
    onKeyDown == null ? void 0 : onKeyDown(e);
    if (e.defaultPrevented)
      return;
    const panel2 = panelRef.current;
    if (!panel2 || e.target.closest('[role="menu"]') !== panel2)
      return;
    const items = getEnabledMenuItems(panel2);
    const current = items.indexOf(document.activeElement);
    const focusAt = (i) => {
      var _a2;
      return (_a2 = items[i]) == null ? void 0 : _a2.focus({ preventScroll: false });
    };
    switch (e.key) {
      case "ArrowDown": {
        e.preventDefault();
        if (items.length === 0)
          return;
        const next = current < 0 ? 0 : current + 1;
        focusAt(next >= items.length ? loop ? 0 : items.length - 1 : next);
        return;
      }
      case "ArrowUp": {
        e.preventDefault();
        if (items.length === 0)
          return;
        const prev = current < 0 ? items.length - 1 : current - 1;
        focusAt(prev < 0 ? loop ? items.length - 1 : 0 : prev);
        return;
      }
      case "Home":
      case "PageUp":
        e.preventDefault();
        focusAt(0);
        return;
      case "End":
      case "PageDown":
        e.preventDefault();
        focusAt(items.length - 1);
        return;
      case "Tab":
        e.preventDefault();
        root.close("tab");
        return;
      case "ArrowLeft":
        if (kind === "sub") {
          e.preventDefault();
          onClose("arrow");
        }
        return;
      default: {
        if (!isPrintableKey(e))
          return;
        const t = e.target;
        if (t.tagName === "INPUT" || t.tagName === "TEXTAREA" || t.isContentEditable)
          return;
        const ta = typeahead.current;
        ta.buffer += e.key;
        if (ta.timer)
          clearTimeout(ta.timer);
        ta.timer = setTimeout(() => {
          ta.buffer = "";
        }, TYPEAHEAD_TIMEOUT);
        const match = findTypeaheadIndex(items, ta.buffer, current);
        if (match >= 0) {
          e.preventDefault();
          focusAt(match);
        }
      }
    }
  };
  const levelValue = useMemo(() => ({ openSubId, setOpenSubId }), [openSubId]);
  const ariaLabel = rest["aria-label"];
  const panel = /* @__PURE__ */ jsx(
    "div",
    {
      ...rest,
      ref: panelRef,
      id: panelId,
      role: "menu",
      "aria-orientation": "vertical",
      "aria-labelledby": ariaLabel ? rest["aria-labelledby"] : (_a = rest["aria-labelledby"]) != null ? _a : labelledById,
      tabIndex: -1,
      className: cls("ds-menu", kind === "sub" && "ds-menu--sub", className),
      "data-side": pos.side,
      style: {
        position: "fixed",
        top: pos.top,
        left: pos.left,
        maxHeight: pos.maxHeight,
        zIndex: zIndex != null ? zIndex : layerZ,
        ...style
      },
      onMouseDownCapture: (e) => {
        insideTreeRef.current = true;
        onMouseDownCapture == null ? void 0 : onMouseDownCapture(e);
      },
      onKeyDown: handleKeyDown,
      children: /* @__PURE__ */ jsx(FloatingLayerContext.Provider, { value: panelId, children: /* @__PURE__ */ jsx(MenuLevelContext.Provider, { value: levelValue, children }) })
    }
  );
  if (typeof document === "undefined")
    return null;
  return createPortal(panel, document.body);
}
function MenuContent({ placement = MENU_DEFAULTS.placement, ...props }) {
  const root = useMenuRoot("MenuContent");
  if (!root.open)
    return null;
  return /* @__PURE__ */ jsx(
    MenuPanel,
    {
      ...props,
      kind: "root",
      panelId: root.contentId,
      labelledById: root.triggerId,
      anchorRef: root.triggerRef,
      intentRef: root.intentRef,
      placement,
      onClose: root.close
    }
  );
}
var CheckIndicator = /* @__PURE__ */ jsx("svg", { viewBox: "0 0 16 16", width: "14", height: "14", focusable: "false", children: /* @__PURE__ */ jsx("path", { d: "M3.5 8.5l3 3 6-7", fill: "none", stroke: "currentColor", strokeWidth: "1.8", strokeLinecap: "round", strokeLinejoin: "round" }) });
var RadioIndicator = /* @__PURE__ */ jsx("svg", { viewBox: "0 0 16 16", width: "14", height: "14", focusable: "false", children: /* @__PURE__ */ jsx("circle", { cx: "8", cy: "8", r: "3.5", fill: "currentColor" }) });
var ChevronRight = /* @__PURE__ */ jsx("svg", { viewBox: "0 0 16 16", width: "14", height: "14", focusable: "false", children: /* @__PURE__ */ jsx("path", { d: "M6 3.5L10.5 8 6 12.5", fill: "none", stroke: "currentColor", strokeWidth: "1.6", strokeLinecap: "round", strokeLinejoin: "round" }) });
var MenuRow = forwardRef(function MenuRow2({
  children,
  itemRole,
  checked,
  indicator,
  sub,
  trailing,
  onActivate,
  variant = MENU_DEFAULTS.variant,
  disabled = false,
  icon,
  description,
  shortcut,
  textValue,
  href,
  target,
  rel,
  className,
  onClick,
  onKeyDown,
  onPointerMove,
  onFocus,
  ...rest
}, ref) {
  const level = useContext(MenuLevelContext);
  const isMac = useIsMac("auto");
  const keys = Array.isArray(shortcut) && shortcut.every((k) => typeof k === "string") ? shortcut : null;
  const linkHref = href && !disabled && isSafeHref(href) ? href : void 0;
  const isCheckable = itemRole !== "menuitem";
  const typeaheadText = textValue != null ? textValue : typeof children === "string" ? children : void 0;
  const common = {
    ...rest,
    role: itemRole,
    tabIndex: -1,
    "aria-disabled": disabled || void 0,
    "aria-checked": isCheckable ? Boolean(checked) : void 0,
    "aria-haspopup": sub ? "menu" : void 0,
    "aria-expanded": sub ? sub.open : void 0,
    "aria-controls": sub && sub.open ? sub.contentId : void 0,
    "aria-keyshortcuts": keys ? toAriaKeyShortcuts(keys, isMac) : void 0,
    id: sub ? sub.triggerId : rest.id,
    "data-text-value": typeaheadText,
    "data-variant": variant,
    "data-disabled": disabled ? "true" : void 0,
    "data-state": isCheckable ? checked ? "checked" : "unchecked" : sub ? sub.open ? "open" : "closed" : void 0,
    className: cls("ds-menu__item", className),
    onClick: (e) => {
      onClick == null ? void 0 : onClick(e);
      if (e.defaultPrevented)
        return;
      if (disabled) {
        e.preventDefault();
        return;
      }
      onActivate(e);
    },
    onKeyDown: (e) => {
      onKeyDown == null ? void 0 : onKeyDown(e);
      if (e.defaultPrevented)
        return;
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        if (!disabled)
          e.currentTarget.click();
      }
    },
    onPointerMove: (e) => {
      onPointerMove == null ? void 0 : onPointerMove(e);
      if (e.pointerType === "touch" || disabled)
        return;
      if (document.activeElement !== e.currentTarget)
        e.currentTarget.focus({ preventScroll: true });
    },
    onFocus: (e) => {
      onFocus == null ? void 0 : onFocus(e);
      if (level && level.openSubId && level.openSubId !== (sub == null ? void 0 : sub.id))
        level.setOpenSubId(null);
    }
  };
  const body = /* @__PURE__ */ jsxs(Fragment, { children: [
    isCheckable ? /* @__PURE__ */ jsx("span", { className: "ds-menu__indicator", "aria-hidden": "true", children: checked ? indicator : null }) : null,
    icon != null ? /* @__PURE__ */ jsx("span", { className: "ds-menu__icon", "aria-hidden": "true", children: icon }) : null,
    /* @__PURE__ */ jsxs("span", { className: "ds-menu__label", children: [
      /* @__PURE__ */ jsx("span", { className: "ds-menu__label-text", children }),
      description != null ? /* @__PURE__ */ jsx("span", { className: "ds-menu__description", children: description }) : null
    ] }),
    shortcut != null ? /* @__PURE__ */ jsx("span", { className: "ds-menu__shortcut", "aria-hidden": "true", children: keys ? /* @__PURE__ */ jsx(Kbd_default, { keys, size: "sm" }) : shortcut }) : null,
    trailing
  ] });
  if (linkHref) {
    return /* @__PURE__ */ jsx(
      "a",
      {
        ...common,
        ref,
        href: linkHref,
        target,
        rel: target === "_blank" ? cls(rel, "noopener noreferrer") : rel,
        children: body
      }
    );
  }
  return /* @__PURE__ */ jsx("div", { ...common, ref, children: body });
});
var MenuItem = forwardRef(function MenuItem2({ onSelect, closeOnSelect = true, ...rest }, ref) {
  const root = useMenuRoot("MenuItem");
  return /* @__PURE__ */ jsx(
    MenuRow,
    {
      ...rest,
      ref,
      itemRole: "menuitem",
      onActivate: (e) => {
        onSelect == null ? void 0 : onSelect(e);
        if (closeOnSelect && !e.defaultPrevented)
          root.close("select");
      }
    }
  );
});
var MenuCheckboxItem = forwardRef(function MenuCheckboxItem2({ checked: checkedProp, defaultChecked = false, onCheckedChange, onSelect, closeOnSelect = false, ...rest }, ref) {
  const root = useMenuRoot("MenuCheckboxItem");
  const isControlled = checkedProp !== void 0;
  const [inner, setInner] = useState(defaultChecked);
  const checked = isControlled ? Boolean(checkedProp) : inner;
  return /* @__PURE__ */ jsx(
    MenuRow,
    {
      ...rest,
      ref,
      itemRole: "menuitemcheckbox",
      checked,
      indicator: CheckIndicator,
      onActivate: (e) => {
        const next = !checked;
        if (!isControlled)
          setInner(next);
        onCheckedChange == null ? void 0 : onCheckedChange(next);
        onSelect == null ? void 0 : onSelect(e);
        if (closeOnSelect && !e.defaultPrevented)
          root.close("select");
      }
    }
  );
});
var MenuRadioGroup = forwardRef(function MenuRadioGroup2({ children, value: valueProp, defaultValue, onValueChange, label, ...rest }, ref) {
  const isControlled = valueProp !== void 0;
  const [inner, setInner] = useState(defaultValue);
  const value = isControlled ? valueProp : inner;
  const setValue = useCallback(
    (v) => {
      if (!isControlled)
        setInner(v);
      onValueChange == null ? void 0 : onValueChange(v);
    },
    [isControlled, onValueChange]
  );
  const ctx = useMemo(() => ({ value, setValue }), [value, setValue]);
  return /* @__PURE__ */ jsx(MenuRadioContext.Provider, { value: ctx, children: /* @__PURE__ */ jsx(MenuGroup, { ...rest, ref, label, children }) });
});
var MenuRadioItem = forwardRef(function MenuRadioItem2({ value, onSelect, closeOnSelect = false, ...rest }, ref) {
  const root = useMenuRoot("MenuRadioItem");
  const group = useContext(MenuRadioContext);
  if (!group)
    throw new Error("MenuRadioItem must be used within <MenuRadioGroup>");
  return /* @__PURE__ */ jsx(
    MenuRow,
    {
      ...rest,
      ref,
      itemRole: "menuitemradio",
      checked: group.value === value,
      indicator: RadioIndicator,
      onActivate: (e) => {
        group.setValue(value);
        onSelect == null ? void 0 : onSelect(e);
        if (closeOnSelect && !e.defaultPrevented)
          root.close("select");
      }
    }
  );
});
var MenuGroup = forwardRef(function MenuGroup2({ children, label, className, ...rest }, ref) {
  const labelId = useStableId("ds-menu-group");
  return /* @__PURE__ */ jsxs(
    "div",
    {
      ...rest,
      ref,
      role: "group",
      "aria-labelledby": label != null ? labelId : rest["aria-labelledby"],
      className: cls("ds-menu__group", className),
      children: [
        label != null ? /* @__PURE__ */ jsx(MenuLabel, { id: labelId, children: label }) : null,
        children
      ]
    }
  );
});
var MenuLabel = forwardRef(function MenuLabel2({ className, ...rest }, ref) {
  return /* @__PURE__ */ jsx("div", { ...rest, ref, className: cls("ds-menu__group-label", className) });
});
var MenuSeparator = forwardRef(function MenuSeparator2({ className, ...rest }, ref) {
  return /* @__PURE__ */ jsx("div", { ...rest, ref, role: "separator", "aria-orientation": "horizontal", className: cls("ds-menu__separator", className) });
});
function MenuSub({ children }) {
  const level = useContext(MenuLevelContext);
  if (!level)
    throw new Error("MenuSub must be used within <MenuContent> or <MenuSubContent>");
  const id = useStableId("ds-menu-sub");
  const triggerId = `${id}-trigger`;
  const contentId = `${id}-content`;
  const triggerRef = useRef(null);
  const intentRef = useRef("first");
  const open = level.openSubId === id;
  const { setOpenSubId } = level;
  const setOpen = useCallback(
    (next, intent = "first") => {
      intentRef.current = intent;
      setOpenSubId((current) => next ? id : current === id ? null : current);
    },
    [id, setOpenSubId]
  );
  const value = useMemo(
    () => ({ id, open, setOpen, triggerId, contentId, triggerRef, intentRef }),
    [id, open, setOpen, triggerId, contentId]
  );
  return /* @__PURE__ */ jsx(MenuSubContext.Provider, { value, children });
}
var MenuSubTrigger = forwardRef(function MenuSubTrigger2({ onKeyDown, onPointerEnter, onPointerLeave, disabled = false, ...rest }, ref) {
  const sub = useContext(MenuSubContext);
  if (!sub)
    throw new Error("MenuSubTrigger must be used within <MenuSub>");
  const timer = useRef(void 0);
  useEffect(() => () => clearTimeout(timer.current), []);
  const openWithFocus = () => {
    if (sub.open)
      focusEdge(document.getElementById(sub.contentId), "first");
    else
      sub.setOpen(true, "first");
  };
  return /* @__PURE__ */ jsx(
    MenuRow,
    {
      ...rest,
      ref: (el) => {
        sub.triggerRef.current = el;
        setRef(ref, el);
      },
      disabled,
      itemRole: "menuitem",
      sub: { id: sub.id, open: sub.open, contentId: sub.contentId, triggerId: sub.triggerId },
      trailing: /* @__PURE__ */ jsx("span", { className: "ds-menu__chevron", "aria-hidden": "true", children: ChevronRight }),
      onKeyDown: (e) => {
        onKeyDown == null ? void 0 : onKeyDown(e);
        if (e.defaultPrevented || disabled)
          return;
        if (e.key === "ArrowRight") {
          e.preventDefault();
          openWithFocus();
        }
      },
      onPointerEnter: (e) => {
        onPointerEnter == null ? void 0 : onPointerEnter(e);
        if (disabled || e.pointerType === "touch")
          return;
        clearTimeout(timer.current);
        timer.current = setTimeout(() => sub.setOpen(true, "none"), SUBMENU_OPEN_DELAY);
      },
      onPointerLeave: (e) => {
        onPointerLeave == null ? void 0 : onPointerLeave(e);
        clearTimeout(timer.current);
      },
      onActivate: (e) => {
        const keyboard = e.nativeEvent.detail === 0;
        if (keyboard)
          openWithFocus();
        else
          sub.setOpen(true, "none");
      }
    }
  );
});
function MenuSubContent(props) {
  const sub = useContext(MenuSubContext);
  if (!sub)
    throw new Error("MenuSubContent must be used within <MenuSub>");
  if (!sub.open)
    return null;
  return /* @__PURE__ */ jsx(
    MenuPanel,
    {
      ...props,
      kind: "sub",
      panelId: sub.contentId,
      labelledById: sub.triggerId,
      anchorRef: sub.triggerRef,
      intentRef: sub.intentRef,
      onClose: (reason) => {
        var _a;
        sub.setOpen(false);
        if (reason === "escape" || reason === "arrow")
          (_a = sub.triggerRef.current) == null ? void 0 : _a.focus({ preventScroll: true });
      }
    }
  );
}
Menu.displayName = "Menu";
MenuTrigger.displayName = "MenuTrigger";
MenuContent.displayName = "MenuContent";
MenuItem.displayName = "MenuItem";
MenuCheckboxItem.displayName = "MenuCheckboxItem";
MenuRadioGroup.displayName = "MenuRadioGroup";
MenuRadioItem.displayName = "MenuRadioItem";
MenuGroup.displayName = "MenuGroup";
MenuLabel.displayName = "MenuLabel";
MenuSeparator.displayName = "MenuSeparator";
MenuSub.displayName = "MenuSub";
MenuSubTrigger.displayName = "MenuSubTrigger";
MenuSubContent.displayName = "MenuSubContent";
var Menu_default = Menu;

export {
  Menu,
  MenuTrigger,
  MenuContent,
  MenuItem,
  MenuCheckboxItem,
  MenuRadioGroup,
  MenuRadioItem,
  MenuGroup,
  MenuLabel,
  MenuSeparator,
  MenuSub,
  MenuSubTrigger,
  MenuSubContent,
  Menu_default
};
//# sourceMappingURL=chunk-U5Y5C6E5.mjs.map