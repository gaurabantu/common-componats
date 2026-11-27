/* ucs:component-css */
import "./styles/components/molecules/Popover/Popover.css";
import {
  computePopoverPosition,
  renderSlot
} from "./chunk-KILC4OUR.mjs";
import {
  useRipple
} from "./chunk-55QUGZRT.mjs";
import {
  FloatingLayerContext,
  isTopFloatingLayer,
  popFloatingLayer,
  pushFloatingLayer,
  resolveLayerZIndex
} from "./chunk-M6JALQW7.mjs";

// src/components/molecules/Popover/index.tsx
import React, {
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

// src/components/molecules/Popover/menuNavigation.ts
var MENU_ITEM_SELECTOR = [
  '[role="menuitem"]',
  '[role="menuitemcheckbox"]',
  '[role="menuitemradio"]'
].map((r) => `${r}:not([disabled]):not([aria-disabled="true"])`).join(", ");
var LISTBOX_OPTION_SELECTOR = '[role="option"]:not([aria-disabled="true"])';
function getMenuItems(root, selector = MENU_ITEM_SELECTOR) {
  return Array.from(root.querySelectorAll(selector));
}
function handleMenuKeyNavigation(e, selector = MENU_ITEM_SELECTOR) {
  var _a, _b;
  const root = e.currentTarget;
  const items = getMenuItems(root, selector);
  if (items.length === 0)
    return false;
  const i = items.indexOf(document.activeElement);
  let next = -1;
  switch (e.key) {
    case "ArrowDown":
      next = i < 0 ? 0 : (i + 1) % items.length;
      break;
    case "ArrowUp":
      next = i < 0 ? items.length - 1 : (i - 1 + items.length) % items.length;
      break;
    case "Home":
      next = 0;
      break;
    case "End":
      next = items.length - 1;
      break;
    default: {
      if (e.key.length !== 1 || e.ctrlKey || e.metaKey || e.altKey || e.key === " ")
        return false;
      const t = e.target;
      if (t.isContentEditable || t.tagName === "INPUT" || t.tagName === "TEXTAREA" || t.tagName === "SELECT") {
        return false;
      }
      const ch = e.key.toLowerCase();
      for (let step = 1; step <= items.length; step += 1) {
        const candidate = items[(Math.max(i, -1) + step + items.length) % items.length];
        if (((_a = candidate.textContent) != null ? _a : "").trim().toLowerCase().startsWith(ch)) {
          next = items.indexOf(candidate);
          break;
        }
      }
      if (next < 0)
        return false;
    }
  }
  e.preventDefault();
  (_b = items[next]) == null ? void 0 : _b.focus();
  return true;
}

// src/components/molecules/Popover/index.tsx
import { jsx, jsxs } from "react/jsx-runtime";
function cls(...parts) {
  return parts.filter(Boolean).join(" ");
}
function indentStyle(indent, style) {
  if (!indent || indent <= 0)
    return style;
  return {
    paddingInlineStart: `calc(0.75rem + ${Math.floor(indent)} * var(--space-2, 16px))`,
    ...style
  };
}
var PopoverContext = createContext(null);
function usePopoverContext(component) {
  const ctx = useContext(PopoverContext);
  if (!ctx) {
    throw new Error(`${component} must be used within <Popover>, <DropdownMenu> or <ContextMenu>`);
  }
  return ctx;
}
function restoreFocus(el) {
  if (!el || typeof document === "undefined" || !el.isConnected)
    return;
  const active = document.activeElement;
  if (active && active !== document.body && active !== document.documentElement && active.isConnected)
    return;
  el.focus();
}
var Popover = React.memo(function Popover2({
  children,
  open: openProp,
  defaultOpen = false,
  onOpenChange,
  placement = "bottom-start",
  anchorRef: anchorRefProp
}) {
  const reactId = useId();
  const base = reactId.replace(/:/g, "");
  const triggerId = `popover-trigger-${base}`;
  const contentId = `popover-content-${base}`;
  const triggerRef = useRef(null);
  const innerAnchorRef = useRef(null);
  const anchorRef = anchorRefProp != null ? anchorRefProp : innerAnchorRef;
  const isControlled = openProp !== void 0;
  const [innerOpen, setInnerOpen] = useState(defaultOpen);
  const open = isControlled ? Boolean(openProp) : innerOpen;
  const prevOpenRef = useRef(false);
  const returnFocusRef = useRef(null);
  const setOpen = useCallback(
    (next) => {
      if (!isControlled) {
        setInnerOpen(next);
      }
      onOpenChange == null ? void 0 : onOpenChange(next);
    },
    [isControlled, onOpenChange]
  );
  useLayoutEffect(() => {
    if (!prevOpenRef.current && open && typeof document !== "undefined") {
      returnFocusRef.current = document.activeElement;
    }
  }, [open]);
  useEffect(() => {
    var _a;
    if (prevOpenRef.current && !open) {
      const target = (_a = triggerRef.current) != null ? _a : returnFocusRef.current;
      requestAnimationFrame(() => restoreFocus(target));
    }
    prevOpenRef.current = open;
  }, [open]);
  const ctx = useMemo(
    () => ({
      open,
      setOpen,
      triggerId,
      contentId,
      triggerRef,
      anchorRef,
      placement
    }),
    [open, setOpen, triggerId, contentId, anchorRef, placement]
  );
  return /* @__PURE__ */ jsx(PopoverContext.Provider, { value: ctx, children });
});
var PopoverTrigger = forwardRef(function PopoverTrigger2({ children, className, hasPopup = "dialog", type = "button", onClick, asChild = false, ...rest }, ref) {
  const ctx = usePopoverContext("PopoverTrigger");
  const open = ctx.open;
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
  if (asChild) {
    return renderSlot(
      children,
      {
        ...rest,
        className,
        id: ctx.triggerId,
        "aria-expanded": open,
        "aria-controls": open ? ctx.contentId : void 0,
        "aria-haspopup": hasPopup,
        onClick: (e) => {
          onClick == null ? void 0 : onClick(e);
          if (e.defaultPrevented)
            return;
          ctx.setOpen(!open);
        }
      },
      setRefs,
      "PopoverTrigger"
    );
  }
  return /* @__PURE__ */ jsx(
    "button",
    {
      ...rest,
      ref: setRefs,
      type,
      id: ctx.triggerId,
      className: cls(className),
      "aria-expanded": open,
      "aria-controls": ctx.contentId,
      "aria-haspopup": hasPopup,
      onClick: (e) => {
        onClick == null ? void 0 : onClick(e);
        ctx.setOpen(!open);
      },
      children
    }
  );
});
var PopoverAnchor = forwardRef(function PopoverAnchor2({ children, asChild = false, ...rest }, ref) {
  const ctx = usePopoverContext("PopoverAnchor");
  const setRefs = useCallback(
    (el) => {
      ctx.anchorRef.current = el;
      if (typeof ref === "function")
        ref(el);
      else if (ref)
        ref.current = el;
    },
    [ctx.anchorRef, ref]
  );
  if (asChild)
    return renderSlot(children, rest, setRefs, "PopoverAnchor");
  return /* @__PURE__ */ jsx("div", { ...rest, ref: setRefs, children });
});
var ARROW_EDGE_PAD = 12;
var PopoverContent = React.memo(function PopoverContent2({
  children,
  className,
  role: roleProp,
  onKeyDown,
  onMouseDownCapture,
  style,
  showPointer = true,
  zIndex,
  ...rest
}) {
  var _a;
  const ctx = usePopoverContext("PopoverContent");
  const contentRef = useRef(null);
  const insideTreeRef = useRef(false);
  const [layerZ, setLayerZ] = useState("var(--z-popover, 450)");
  const [pos, setPos] = useState({
    top: 0,
    left: 0
  });
  const { anchorRef, triggerRef, setOpen } = ctx;
  const getAnchor = useCallback(
    () => {
      var _a2;
      return (_a2 = anchorRef.current) != null ? _a2 : triggerRef.current;
    },
    [anchorRef, triggerRef]
  );
  const updatePosition = useCallback(() => {
    var _a2;
    const anchor = getAnchor();
    const panel = contentRef.current;
    if (!anchor || !panel || typeof window === "undefined")
      return;
    const tr = anchor.getBoundingClientRect();
    const cw = panel.offsetWidth || 140;
    const ch = Math.max(panel.offsetHeight || 80, 80);
    const result = computePopoverPosition(tr, cw, ch, ctx.placement);
    if (!showPointer) {
      setPos(result);
      return;
    }
    const below = result.top >= tr.bottom - 4;
    const triggerCx = tr.left + tr.width / 2;
    const panelW = (_a2 = result.width) != null ? _a2 : cw;
    const arrowX = Math.min(
      Math.max(triggerCx - result.left, ARROW_EDGE_PAD),
      panelW - ARROW_EDGE_PAD
    );
    setPos({
      ...result,
      arrowEdge: below ? "top" : "bottom",
      arrowX
    });
  }, [ctx.placement, getAnchor, showPointer]);
  useLayoutEffect(() => {
    if (!ctx.open || zIndex !== void 0)
      return;
    setLayerZ(resolveLayerZIndex(getAnchor(), void 0));
  }, [ctx.open, zIndex, getAnchor]);
  useLayoutEffect(() => {
    if (!ctx.open)
      return;
    updatePosition();
    const id = requestAnimationFrame(() => updatePosition());
    return () => cancelAnimationFrame(id);
  }, [ctx.open, updatePosition]);
  useEffect(() => {
    if (!ctx.open)
      return;
    const onResize = () => updatePosition();
    window.addEventListener("resize", onResize);
    window.addEventListener("scroll", onResize, true);
    return () => {
      window.removeEventListener("resize", onResize);
      window.removeEventListener("scroll", onResize, true);
    };
  }, [ctx.open, updatePosition]);
  const layerId = ctx.contentId;
  const parentLayerId = useContext(FloatingLayerContext);
  useEffect(() => {
    if (!ctx.open)
      return void 0;
    pushFloatingLayer(layerId, parentLayerId);
    return () => popFloatingLayer(layerId);
  }, [ctx.open, layerId, parentLayerId]);
  useEffect(() => {
    if (!ctx.open)
      return;
    const onDocMouse = (e) => {
      var _a2, _b, _c;
      const inside = insideTreeRef.current;
      insideTreeRef.current = false;
      if (inside)
        return;
      const t = e.target;
      if (((_a2 = triggerRef.current) == null ? void 0 : _a2.contains(t)) || ((_b = anchorRef.current) == null ? void 0 : _b.contains(t)) || ((_c = contentRef.current) == null ? void 0 : _c.contains(t))) {
        return;
      }
      setOpen(false);
    };
    const onKey = (e) => {
      if (e.key !== "Escape" || e.isComposing || e.defaultPrevented)
        return;
      if (!isTopFloatingLayer(layerId))
        return;
      e.preventDefault();
      setOpen(false);
    };
    document.addEventListener("mousedown", onDocMouse);
    document.addEventListener("keydown", onKey, true);
    return () => {
      document.removeEventListener("mousedown", onDocMouse);
      document.removeEventListener("keydown", onKey, true);
    };
  }, [ctx.open, setOpen, triggerRef, anchorRef, layerId]);
  useEffect(() => {
    if (!ctx.open || !contentRef.current)
      return;
    const el = contentRef.current.querySelector(
      'button:not([disabled]), [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    el == null ? void 0 : el.focus();
  }, [ctx.open]);
  const role = roleProp != null ? roleProp : "dialog";
  if (!ctx.open)
    return null;
  const pointerStyle = showPointer && pos.arrowX != null ? { ["--popover-arrow-x"]: `${pos.arrowX}px` } : void 0;
  const labelledBy = (_a = rest["aria-labelledby"]) != null ? _a : rest["aria-label"] || !triggerRef.current ? void 0 : ctx.triggerId;
  const content = /* @__PURE__ */ jsx(
    "div",
    {
      ...rest,
      ref: contentRef,
      id: ctx.contentId,
      role: role === "none" ? void 0 : role,
      "aria-modal": role === "dialog" ? false : void 0,
      "aria-labelledby": labelledBy,
      className: cls(
        "ds-popover__content",
        showPointer && "ds-popover__content--with-pointer",
        className
      ),
      "data-arrow-edge": showPointer ? pos.arrowEdge : void 0,
      tabIndex: -1,
      style: {
        position: "fixed",
        top: pos.top,
        left: pos.left,
        width: pos.width,
        maxHeight: showPointer ? void 0 : pos.maxHeight,
        overflow: showPointer ? "visible" : "auto",
        zIndex: zIndex != null ? zIndex : layerZ,
        ...pointerStyle,
        ...style
      },
      onMouseDownCapture: (e) => {
        insideTreeRef.current = true;
        onMouseDownCapture == null ? void 0 : onMouseDownCapture(e);
      },
      onKeyDown: (e) => {
        onKeyDown == null ? void 0 : onKeyDown(e);
        if (e.key === "Escape" && !e.defaultPrevented) {
          e.preventDefault();
          setOpen(false);
        }
      },
      children: /* @__PURE__ */ jsx(FloatingLayerContext.Provider, { value: layerId, children: showPointer ? /* @__PURE__ */ jsx("div", { className: "ds-popover__content-scroll", style: { maxHeight: pos.maxHeight }, children }) : children })
    }
  );
  if (typeof document === "undefined")
    return null;
  return createPortal(content, document.body);
});
var DropdownMenu = Popover;
var DropdownMenuTrigger = forwardRef(
  function DropdownMenuTrigger2(props, ref) {
    return /* @__PURE__ */ jsx(PopoverTrigger, { ...props, ref, hasPopup: "menu" });
  }
);
var DropdownMenuContent = React.memo(function DropdownMenuContent2({
  children,
  className,
  showPointer = false,
  onKeyDown,
  ...rest
}) {
  const handleMenuKeyDown = useCallback(
    (e) => {
      onKeyDown == null ? void 0 : onKeyDown(e);
      if (e.defaultPrevented)
        return;
      handleMenuKeyNavigation(e);
    },
    [onKeyDown]
  );
  return /* @__PURE__ */ jsx(
    PopoverContent,
    {
      ...rest,
      showPointer,
      role: "menu",
      "aria-orientation": "vertical",
      className,
      onKeyDown: handleMenuKeyDown,
      children
    }
  );
});
var MenuRow = forwardRef(function MenuRow2({
  children,
  className,
  variant = "default",
  disabled = false,
  ripple = true,
  onClick,
  type = "button",
  onPointerDown,
  icon,
  description,
  shortcut,
  indent = 0,
  itemRole,
  checked,
  indicator,
  onActivate,
  style,
  ...rest
}, ref) {
  const rippleEnabled = ripple !== false && !disabled;
  const rippleApi = useRipple(rippleEnabled);
  const isCheckable = itemRole !== "menuitem";
  return /* @__PURE__ */ jsxs(
    "button",
    {
      ...rest,
      ref,
      type,
      role: itemRole,
      "aria-checked": isCheckable ? Boolean(checked) : void 0,
      disabled,
      "data-state": isCheckable ? checked ? "checked" : "unchecked" : void 0,
      style: indentStyle(indent, style),
      className: cls(
        "ds-dropdown-menu__item",
        variant === "danger" && "ds-dropdown-menu__item--danger",
        description != null && "ds-dropdown-menu__item--with-description",
        rippleEnabled && "ucs-ripple-parent",
        className
      ),
      onPointerDown: (e) => {
        rippleApi.onPointerDown(e);
        onPointerDown == null ? void 0 : onPointerDown(e);
      },
      onClick: (e) => {
        onClick == null ? void 0 : onClick(e);
        if (disabled)
          return;
        onActivate();
      },
      children: [
        rippleApi.RippleOverlay,
        /* @__PURE__ */ jsxs("span", { className: "ds-dropdown-menu__item-inner", children: [
          isCheckable ? /* @__PURE__ */ jsx("span", { className: "ds-dropdown-menu__indicator", "aria-hidden": "true", children: checked ? indicator : null }) : null,
          icon != null ? /* @__PURE__ */ jsx("span", { className: "ds-dropdown-menu__icon", "aria-hidden": "true", children: icon }) : null,
          description != null ? /* @__PURE__ */ jsxs("span", { className: "ds-dropdown-menu__item-text", children: [
            /* @__PURE__ */ jsx("span", { className: "ds-dropdown-menu__item-label", children }),
            /* @__PURE__ */ jsx("span", { className: "ds-dropdown-menu__item-description", children: description })
          ] }) : children,
          shortcut != null ? /* @__PURE__ */ jsx("span", { className: "ds-dropdown-menu__item-shortcut", "aria-hidden": "true", children: shortcut }) : null
        ] })
      ]
    }
  );
});
var CheckIndicator = /* @__PURE__ */ jsx("svg", { viewBox: "0 0 16 16", width: "14", height: "14", focusable: "false", children: /* @__PURE__ */ jsx(
  "path",
  {
    d: "M3.5 8.5l3 3 6-7",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "1.8",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }
) });
var RadioIndicator = /* @__PURE__ */ jsx("svg", { viewBox: "0 0 16 16", width: "14", height: "14", focusable: "false", children: /* @__PURE__ */ jsx("circle", { cx: "8", cy: "8", r: "3.5", fill: "currentColor" }) });
var DropdownMenuItem = React.memo(
  forwardRef(function DropdownMenuItem2({ onSelect, closeOnSelect = true, ...rest }, ref) {
    const ctx = usePopoverContext("DropdownMenuItem");
    return /* @__PURE__ */ jsx(
      MenuRow,
      {
        ...rest,
        ref,
        itemRole: "menuitem",
        onActivate: () => {
          onSelect == null ? void 0 : onSelect();
          if (closeOnSelect)
            ctx.setOpen(false);
        }
      }
    );
  })
);
var DropdownMenuCheckboxItem = React.memo(
  forwardRef(function DropdownMenuCheckboxItem2({
    checked: checkedProp,
    defaultChecked = false,
    onCheckedChange,
    onSelect,
    closeOnSelect = false,
    ...rest
  }, ref) {
    const ctx = usePopoverContext("DropdownMenuCheckboxItem");
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
        onActivate: () => {
          const next = !checked;
          if (!isControlled)
            setInner(next);
          onCheckedChange == null ? void 0 : onCheckedChange(next);
          onSelect == null ? void 0 : onSelect();
          if (closeOnSelect)
            ctx.setOpen(false);
        }
      }
    );
  })
);
var DropdownRadioGroupContext = createContext(null);
var DropdownMenuGroup = forwardRef(function DropdownMenuGroup2({ children, label, className, ...rest }, ref) {
  const labelId = `ds-menu-group-${useId().replace(/:/g, "")}`;
  return /* @__PURE__ */ jsxs(
    "div",
    {
      ...rest,
      ref,
      role: "group",
      "aria-labelledby": label != null ? labelId : rest["aria-labelledby"],
      className: cls("ds-dropdown-menu__group", className),
      children: [
        label != null ? /* @__PURE__ */ jsx(DropdownMenuLabel, { id: labelId, children: label }) : null,
        children
      ]
    }
  );
});
var DropdownMenuRadioGroup = forwardRef(
  function DropdownMenuRadioGroup2({ children, value: valueProp, defaultValue, onValueChange, label, ...rest }, ref) {
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
    const ctxValue = useMemo(() => ({ value, setValue }), [value, setValue]);
    return /* @__PURE__ */ jsx(DropdownRadioGroupContext.Provider, { value: ctxValue, children: /* @__PURE__ */ jsx(DropdownMenuGroup, { ...rest, ref, label, children }) });
  }
);
var DropdownMenuRadioItem = React.memo(
  forwardRef(function DropdownMenuRadioItem2({ value, onSelect, closeOnSelect = false, ...rest }, ref) {
    const ctx = usePopoverContext("DropdownMenuRadioItem");
    const group = useContext(DropdownRadioGroupContext);
    if (!group)
      throw new Error("DropdownMenuRadioItem must be used within <DropdownMenuRadioGroup>");
    return /* @__PURE__ */ jsx(
      MenuRow,
      {
        ...rest,
        ref,
        itemRole: "menuitemradio",
        checked: group.value === value,
        indicator: RadioIndicator,
        onActivate: () => {
          group.setValue(value);
          onSelect == null ? void 0 : onSelect();
          if (closeOnSelect)
            ctx.setOpen(false);
        }
      }
    );
  })
);
var DropdownMenuLabel = forwardRef(function DropdownMenuLabel2({ children, className, indent = 0, style, ...rest }, ref) {
  return /* @__PURE__ */ jsx(
    "div",
    {
      ...rest,
      ref,
      className: cls("ds-dropdown-menu__label", className),
      style: indentStyle(indent, style),
      children
    }
  );
});
var DropdownMenuSeparator = forwardRef(
  function DropdownMenuSeparator2({ className, ...rest }, ref) {
    return /* @__PURE__ */ jsx(
      "div",
      {
        ...rest,
        ref,
        role: "separator",
        "aria-orientation": "horizontal",
        className: cls("ds-dropdown-menu__separator", className)
      }
    );
  }
);
var Listbox = forwardRef(function Listbox2({ children, className, multiple = false, onKeyDown, onFocus, ...rest }, ref) {
  const rootRef = useRef(null);
  useLayoutEffect(() => {
    var _a;
    const root = rootRef.current;
    if (!root)
      return;
    const options = Array.from(root.querySelectorAll(LISTBOX_OPTION_SELECTOR));
    if (options.length === 0)
      return;
    const current = options.find((o) => o.getAttribute("tabindex") === "0");
    const target = (_a = current != null ? current : options.find((o) => o.getAttribute("aria-selected") === "true")) != null ? _a : options[0];
    for (const o of options)
      o.setAttribute("tabindex", o === target ? "0" : "-1");
  });
  return /* @__PURE__ */ jsx(
    "div",
    {
      ...rest,
      ref: (el) => {
        rootRef.current = el;
        if (typeof ref === "function")
          ref(el);
        else if (ref)
          ref.current = el;
      },
      role: "listbox",
      "aria-multiselectable": multiple || void 0,
      className: cls("ds-listbox", className),
      onFocus: (e) => {
        onFocus == null ? void 0 : onFocus(e);
        const root = rootRef.current;
        const t = e.target;
        if (!root || t.getAttribute("role") !== "option")
          return;
        for (const o of Array.from(root.querySelectorAll('[role="option"]'))) {
          o.setAttribute("tabindex", o === t ? "0" : "-1");
        }
      },
      onKeyDown: (e) => {
        onKeyDown == null ? void 0 : onKeyDown(e);
        if (e.defaultPrevented)
          return;
        handleMenuKeyNavigation(e, LISTBOX_OPTION_SELECTOR);
      },
      children
    }
  );
});
var ListboxOption = forwardRef(function ListboxOption2({
  children,
  className,
  selected = false,
  disabled = false,
  description,
  icon,
  trailing,
  indent = 0,
  onSelect,
  role = "option",
  onClick,
  onKeyDown,
  style,
  ...rest
}, ref) {
  const activate = () => {
    if (!disabled)
      onSelect == null ? void 0 : onSelect();
  };
  return /* @__PURE__ */ jsx(
    "div",
    {
      tabIndex: -1,
      ...rest,
      ref,
      role,
      "aria-selected": role === "menuitem" ? void 0 : selected,
      "aria-disabled": disabled || void 0,
      "data-selected": selected ? "true" : void 0,
      style: indentStyle(indent, style),
      className: cls(
        "ds-dropdown-menu__item",
        "ds-listbox__option",
        selected && "ds-listbox__option--selected",
        description != null && "ds-dropdown-menu__item--with-description",
        className
      ),
      onClick: (e) => {
        onClick == null ? void 0 : onClick(e);
        if (!e.defaultPrevented)
          activate();
      },
      onKeyDown: (e) => {
        onKeyDown == null ? void 0 : onKeyDown(e);
        if (e.defaultPrevented)
          return;
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          activate();
        }
      },
      children: /* @__PURE__ */ jsxs("span", { className: "ds-dropdown-menu__item-inner", children: [
        icon != null ? /* @__PURE__ */ jsx("span", { className: "ds-dropdown-menu__icon", "aria-hidden": "true", children: icon }) : null,
        /* @__PURE__ */ jsxs("span", { className: "ds-dropdown-menu__item-text", children: [
          /* @__PURE__ */ jsx("span", { className: "ds-dropdown-menu__item-label", children }),
          description != null ? /* @__PURE__ */ jsx("span", { className: "ds-dropdown-menu__item-description", children: description }) : null
        ] }),
        trailing != null ? /* @__PURE__ */ jsx("span", { className: "ds-dropdown-menu__item-shortcut", children: trailing }) : null
      ] })
    }
  );
});
var Popover_default = Popover;

export {
  getMenuItems,
  handleMenuKeyNavigation,
  indentStyle,
  PopoverContext,
  restoreFocus,
  Popover,
  PopoverTrigger,
  PopoverAnchor,
  PopoverContent,
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuCheckboxItem,
  DropdownMenuGroup,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  Listbox,
  ListboxOption,
  Popover_default
};
//# sourceMappingURL=chunk-UP5YH5MZ.mjs.map