import {
  Button_default,
  Icon_default,
  TextInputSearch_default,
  useRipple
} from "./chunk-PZS7NENM.mjs";

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

// src/components/molecules/Popover/popoverPosition.ts
var GAP = 8;
var VIEWPORT = 8;
function computePopoverPosition(triggerRect, contentWidth, contentHeight, placement) {
  const vw = typeof window !== "undefined" ? window.innerWidth : 1024;
  const vh = typeof window !== "undefined" ? window.innerHeight : 768;
  const cw = Math.min(contentWidth, vw - VIEWPORT * 2);
  const ch = Math.min(contentHeight, vh - VIEWPORT * 2);
  let top;
  let left;
  const placeBottom = placement.startsWith("bottom");
  const alignEnd = placement.endsWith("end");
  if (placeBottom) {
    top = triggerRect.bottom + GAP;
    if (top + ch > vh - VIEWPORT) {
      const above = triggerRect.top - GAP - ch;
      if (above >= VIEWPORT) {
        top = above;
      } else {
        top = Math.max(VIEWPORT, vh - VIEWPORT - ch);
      }
    }
  } else {
    top = triggerRect.top - GAP - ch;
    if (top < VIEWPORT) {
      const below = triggerRect.bottom + GAP;
      if (below + ch <= vh - VIEWPORT) {
        top = below;
      } else {
        top = VIEWPORT;
      }
    }
  }
  if (alignEnd) {
    left = triggerRect.right - cw;
  } else {
    left = triggerRect.left;
  }
  left = Math.min(Math.max(left, VIEWPORT), vw - VIEWPORT - cw);
  return {
    top,
    left,
    width: cw,
    maxHeight: Math.min(ch, vh - VIEWPORT * 2)
  };
}

// src/components/molecules/Popover/index.tsx
import { jsx, jsxs } from "react/jsx-runtime";
function cls(...parts) {
  return parts.filter(Boolean).join(" ");
}
var PopoverContext = createContext(null);
function usePopoverContext(component) {
  const ctx = useContext(PopoverContext);
  if (!ctx) {
    throw new Error(`${component} must be used within <Popover> or <DropdownMenu>`);
  }
  return ctx;
}
var Popover = React.memo(function Popover2({
  children,
  open: openProp,
  defaultOpen = false,
  onOpenChange,
  placement = "bottom-start"
}) {
  const reactId = useId();
  const base = reactId.replace(/:/g, "");
  const triggerId = `popover-trigger-${base}`;
  const contentId = `popover-content-${base}`;
  const triggerRef = useRef(null);
  const isControlled = openProp !== void 0;
  const [innerOpen, setInnerOpen] = useState(defaultOpen);
  const open = isControlled ? Boolean(openProp) : innerOpen;
  const prevOpenRef = useRef(false);
  const setOpen = useCallback(
    (next) => {
      if (!isControlled) {
        setInnerOpen(next);
      }
      onOpenChange == null ? void 0 : onOpenChange(next);
    },
    [isControlled, onOpenChange]
  );
  useEffect(() => {
    if (prevOpenRef.current && !open && triggerRef.current) {
      requestAnimationFrame(() => {
        var _a;
        return (_a = triggerRef.current) == null ? void 0 : _a.focus();
      });
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
      placement
    }),
    [open, setOpen, triggerId, contentId, placement]
  );
  return /* @__PURE__ */ jsx(PopoverContext.Provider, { value: ctx, children });
});
var PopoverTrigger = forwardRef(function PopoverTrigger2({ children, className, hasPopup = "dialog", type = "button", onClick, ...rest }, ref) {
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
var ARROW_EDGE_PAD = 12;
var PopoverContent = React.memo(function PopoverContent2({
  children,
  className,
  role: roleProp,
  onKeyDown,
  style,
  showPointer = true,
  ...rest
}) {
  const ctx = usePopoverContext("PopoverContent");
  const contentRef = useRef(null);
  const [pos, setPos] = useState({
    top: 0,
    left: 0
  });
  const updatePosition = useCallback(() => {
    var _a;
    const trigger = ctx.triggerRef.current;
    const panel = contentRef.current;
    if (!trigger || !panel || typeof window === "undefined")
      return;
    const tr = trigger.getBoundingClientRect();
    const cw = panel.offsetWidth || 140;
    const ch = Math.max(panel.offsetHeight || 80, 80);
    const result = computePopoverPosition(tr, cw, ch, ctx.placement);
    if (!showPointer) {
      setPos(result);
      return;
    }
    const below = result.top >= tr.bottom - 4;
    const triggerCx = tr.left + tr.width / 2;
    const panelW = (_a = result.width) != null ? _a : cw;
    const arrowX = Math.min(
      Math.max(triggerCx - result.left, ARROW_EDGE_PAD),
      panelW - ARROW_EDGE_PAD
    );
    setPos({
      ...result,
      arrowEdge: below ? "top" : "bottom",
      arrowX
    });
  }, [ctx.placement, ctx.triggerRef, showPointer]);
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
  useEffect(() => {
    if (!ctx.open)
      return;
    const onDocMouse = (e) => {
      var _a, _b;
      const t = e.target;
      if (((_a = ctx.triggerRef.current) == null ? void 0 : _a.contains(t)) || ((_b = contentRef.current) == null ? void 0 : _b.contains(t)))
        return;
      ctx.setOpen(false);
    };
    const onKey = (e) => {
      if (e.key === "Escape")
        ctx.setOpen(false);
    };
    document.addEventListener("mousedown", onDocMouse);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDocMouse);
      document.removeEventListener("keydown", onKey);
    };
  }, [ctx]);
  useEffect(() => {
    if (!ctx.open || !contentRef.current)
      return;
    const el = contentRef.current.querySelector(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    el == null ? void 0 : el.focus();
  }, [ctx.open]);
  const role = roleProp != null ? roleProp : "dialog";
  if (!ctx.open)
    return null;
  const pointerStyle = showPointer && pos.arrowX != null ? { ["--popover-arrow-x"]: `${pos.arrowX}px` } : void 0;
  const content = /* @__PURE__ */ jsx(
    "div",
    {
      ...rest,
      ref: contentRef,
      id: ctx.contentId,
      role: role === "none" ? void 0 : role,
      "aria-modal": role === "dialog" ? false : void 0,
      "aria-labelledby": ctx.triggerId,
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
        zIndex: "var(--z-dropdown, 100)",
        ...pointerStyle,
        ...style
      },
      onKeyDown: (e) => {
        onKeyDown == null ? void 0 : onKeyDown(e);
        if (e.key === "Escape")
          ctx.setOpen(false);
      },
      children: showPointer ? /* @__PURE__ */ jsx("div", { className: "ds-popover__content-scroll", style: { maxHeight: pos.maxHeight }, children }) : children
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
      var _a;
      onKeyDown == null ? void 0 : onKeyDown(e);
      if (e.defaultPrevented)
        return;
      if (e.key !== "ArrowDown" && e.key !== "ArrowUp" && e.key !== "Home" && e.key !== "End")
        return;
      const root = e.currentTarget;
      const items = Array.from(root.querySelectorAll('[role="menuitem"]:not([disabled])'));
      if (items.length === 0)
        return;
      const i = items.indexOf(document.activeElement);
      let next = i;
      if (e.key === "ArrowDown") {
        e.preventDefault();
        next = i < 0 ? 0 : (i + 1) % items.length;
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        next = i < 0 ? items.length - 1 : (i - 1 + items.length) % items.length;
      } else if (e.key === "Home") {
        e.preventDefault();
        next = 0;
      } else if (e.key === "End") {
        e.preventDefault();
        next = items.length - 1;
      }
      (_a = items[next]) == null ? void 0 : _a.focus();
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
var DropdownMenuItem = React.memo(function DropdownMenuItem2({
  children,
  className,
  onSelect,
  variant = "default",
  disabled = false,
  ripple = true,
  onClick,
  type = "button",
  onPointerDown,
  ...rest
}) {
  const ctx = usePopoverContext("DropdownMenuItem");
  const rippleEnabled = ripple !== false && !disabled;
  const rippleApi = useRipple(rippleEnabled);
  return /* @__PURE__ */ jsxs(
    "button",
    {
      ...rest,
      type,
      role: "menuitem",
      disabled,
      className: cls(
        "ds-dropdown-menu__item",
        variant === "danger" && "ds-dropdown-menu__item--danger",
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
        onSelect == null ? void 0 : onSelect();
        ctx.setOpen(false);
      },
      children: [
        rippleApi.RippleOverlay,
        /* @__PURE__ */ jsx("span", { className: "ds-dropdown-menu__item-inner", children })
      ]
    }
  );
});

// src/components/atoms/Avatar/index.tsx
import React2 from "react";

// src/components/atoms/Avatar/Avatar.config.ts
var defaultAvatarSize = 40;
var defaultStatusPosition = "bottom-right";
var defaultBackgroundColor = "var(--color-accent-lavender-10)";
var defaultIconColor = "var(--color-text-on-accent)";

// src/components/atoms/Avatar/index.tsx
import { jsx as jsx2, jsxs as jsxs2 } from "react/jsx-runtime";
var Avatar = ({
  src,
  alt = "",
  name,
  initials,
  icon,
  fallback,
  size = defaultAvatarSize,
  shape = "circle",
  rounded = "4",
  status = "online",
  statusColor,
  statusPosition = defaultStatusPosition,
  color,
  backgroundColor = defaultBackgroundColor,
  textColor = "var(--color-text-primary)",
  iconColor = defaultIconColor,
  iconSize,
  preserveColors = false,
  bordered = false,
  borderColor = "rgba(153, 153, 153, 0.35)",
  className = "",
  style
}) => {
  const statusSize = size / 5;
  const offset = statusSize / 6;
  const calculatedIconSize = iconSize || size / 2;
  const resolvedInitials = initials || (name == null ? void 0 : name.split(" ").filter(Boolean).slice(0, 2).map((part) => {
    var _a, _b;
    return (_b = (_a = part[0]) == null ? void 0 : _a.toUpperCase()) != null ? _b : "";
  }).join("")) || "";
  const resolvedBackgroundColor = color || backgroundColor;
  const getStatusStyle = () => {
    const baseStyle = {
      width: statusSize,
      height: statusSize,
      position: "absolute",
      borderRadius: "9999px",
      border: "2px solid var(--color-bg-surface)",
      backgroundColor: statusColor || (status === "online" ? "var(--color-state-success)" : status === "busy" ? "var(--color-state-error)" : status === "away" ? "var(--color-state-warning)" : status === "offline" ? "var(--color-text-secondary)" : "transparent")
    };
    switch (statusPosition) {
      case "top-left":
        return { ...baseStyle, top: offset, left: offset };
      case "top-right":
        return { ...baseStyle, top: offset, right: offset };
      case "bottom-left":
        return { ...baseStyle, bottom: offset, left: offset };
      case "bottom-right":
      default:
        return { ...baseStyle, bottom: offset, right: offset };
    }
  };
  const renderContent = () => {
    var _a, _b, _c, _d, _e;
    if (fallback)
      return fallback;
    if (resolvedInitials) {
      return /* @__PURE__ */ jsx2(
        "span",
        {
          style: {
            fontSize: `${Math.max(12, size / 2.6)}px`,
            fontWeight: 700,
            lineHeight: 1,
            letterSpacing: "0.02em"
          },
          children: resolvedInitials
        }
      );
    }
    if (!icon)
      return /* @__PURE__ */ jsx2("span", { style: { fontSize: `${size / 2.5}px`, fontWeight: 600 }, children: "?" });
    if (typeof icon === "string") {
      return /* @__PURE__ */ jsx2(
        Icon_default,
        {
          src: icon,
          color: iconColor,
          width: calculatedIconSize,
          height: calculatedIconSize,
          preserveColors
        }
      );
    }
    if (React2.isValidElement(icon)) {
      return React2.cloneElement(icon, {
        color: iconColor,
        width: ((_a = icon.props) == null ? void 0 : _a.width) || calculatedIconSize,
        height: ((_b = icon.props) == null ? void 0 : _b.height) || calculatedIconSize,
        size: calculatedIconSize,
        preserveColors: (_d = (_c = icon.props) == null ? void 0 : _c.preserveColors) != null ? _d : preserveColors,
        style: { color: iconColor, ...((_e = icon.props) == null ? void 0 : _e.style) || {} }
      });
    }
    return icon;
  };
  return /* @__PURE__ */ jsxs2(
    "div",
    {
      className,
      style: {
        position: "relative",
        width: size,
        height: size,
        flexShrink: 0,
        ...style
      },
      children: [
        src ? /* @__PURE__ */ jsx2(
          "img",
          {
            src,
            alt: alt || name || "avatar",
            width: size,
            height: size,
            style: {
              width: size,
              height: size,
              objectFit: "cover",
              display: "block",
              borderRadius: shape === "circle" ? "50%" : shape === "square" ? 0 : rounded === "0" ? 0 : rounded === "1" ? "var(--radius-xs, 2px)" : rounded === "2" ? "var(--radius-sm, 3px)" : rounded === "3" ? "var(--radius-base, 4px)" : rounded === "4" ? "var(--radius-md, 6px)" : "var(--radius-lg, 8px)",
              border: bordered ? `1.5px solid ${borderColor}` : void 0,
              boxSizing: "border-box",
              background: "var(--color-bg-surface)"
            }
          }
        ) : /* @__PURE__ */ jsx2(
          "div",
          {
            style: {
              width: size,
              height: size,
              backgroundColor: resolvedBackgroundColor,
              color: icon ? iconColor : textColor,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: shape === "circle" ? "50%" : shape === "square" ? 0 : rounded === "0" ? 0 : rounded === "1" ? "var(--radius-xs, 2px)" : rounded === "2" ? "var(--radius-sm, 3px)" : rounded === "3" ? "var(--radius-base, 4px)" : rounded === "4" ? "var(--radius-md, 6px)" : "var(--radius-lg, 8px)",
              border: bordered ? `1.5px solid ${borderColor}` : void 0,
              boxSizing: "border-box"
            },
            children: renderContent()
          }
        ),
        status !== "none" && /* @__PURE__ */ jsx2("span", { style: getStatusStyle() })
      ]
    }
  );
};
var Avatar_default = Avatar;

// src/components/molecules/AppSidebar/AppSidebar.chrome.ts
var TOKENS_CSS_VARS = {
  noir0: "--noir-0",
  noir1: "--noir-1",
  noir2: "--noir-2",
  noir3: "--noir-3",
  sidebarText: "--sidebar-text",
  sidebarTextMuted: "--sidebar-text-muted",
  sidebarHover: "--sidebar-hover",
  sidebarActiveBg: "--sidebar-active-bg",
  sidebarActiveTint: "--sidebar-active-tint",
  sidebarFocus: "--sidebar-focus",
  sidebarBorder: "--sidebar-border",
  sidebarBorderStrong: "--sidebar-border-strong",
  sidebarNavIcon: "--sidebar-nav-icon",
  sidebarNavIconActive: "--sidebar-nav-icon-active",
  sidebarUtilityIcon: "--sidebar-utility-icon",
  sidebarCreateDash: "--sidebar-create-dash"
};
function mergeSidebarTokensStyle(tokens, base) {
  if (!tokens || Object.keys(tokens).length === 0) {
    return base != null ? base : {};
  }
  const vars = {};
  Object.entries(tokens).forEach(([key, val]) => {
    if (val === void 0 || val === "")
      return;
    const cssVar = TOKENS_CSS_VARS[key];
    if (cssVar)
      vars[cssVar] = val;
  });
  return { ...vars, ...base };
}

// src/components/molecules/AppSidebar/AppSidebar.persist.ts
function readAppSidebarPersist(key) {
  if (!key || typeof window === "undefined")
    return null;
  try {
    return JSON.parse(window.localStorage.getItem(key) || "null");
  } catch (e) {
    return null;
  }
}
function writeAppSidebarPersist(key, collapsed, expanded) {
  try {
    window.localStorage.setItem(key, JSON.stringify({ collapsed, expanded }));
  } catch (e) {
  }
}

// src/components/molecules/AppSidebar/index.tsx
import React5, { useCallback as useCallback3, useEffect as useEffect2, useId as useId3, useLayoutEffect as useLayoutEffect3, useMemo as useMemo2, useRef as useRef3, useState as useState3 } from "react";
import { createPortal as createPortal3 } from "react-dom";

// src/components/molecules/AppSidebar/AppSidebar.utils.tsx
import React3 from "react";
import { jsx as jsx3, jsxs as jsxs3 } from "react/jsx-runtime";
function cls2(...parts) {
  return parts.filter(Boolean).join(" ");
}
var lockSvg = /* @__PURE__ */ jsxs3("svg", { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", "aria-hidden": true, children: [
  /* @__PURE__ */ jsx3("rect", { x: "5", y: "11", width: "14", height: "10", rx: "2", ry: "2" }),
  /* @__PURE__ */ jsx3("path", { d: "M8 11V7a4 4 0 0 1 8 0v4" })
] });
var checkSvg = /* @__PURE__ */ jsx3("svg", { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", "aria-hidden": true, children: /* @__PURE__ */ jsx3("path", { d: "M20 6L9 17l-5-5" }) });
function renderTrailingIcon(trailing, size) {
  if (trailing == null || trailing === "none")
    return null;
  if (trailing === "lock") {
    return /* @__PURE__ */ jsx3(Icon_default, { src: lockSvg, decorative: true, width: size, height: size, color: "currentColor", className: "app-sidebar__trailing-icon" });
  }
  if (trailing === "check") {
    return /* @__PURE__ */ jsx3(Icon_default, { src: checkSvg, decorative: true, width: size, height: size, color: "currentColor", className: "app-sidebar__trailing-icon" });
  }
  if (React3.isValidElement(trailing)) {
    return /* @__PURE__ */ jsx3("span", { className: "app-sidebar__trailing-custom", children: trailing });
  }
  return /* @__PURE__ */ jsx3(Icon_default, { src: trailing, decorative: true, width: size, height: size, className: "app-sidebar__trailing-icon" });
}

// src/components/molecules/AppSidebar/AppSidebar.tree.ts
function normalizeSections(sections, items) {
  if (sections && sections.length > 0)
    return sections;
  if (items && items.length > 0) {
    return [
      {
        id: "_flat-primary",
        tier: "primary",
        grouping: "spacing",
        items
      }
    ];
  }
  return [];
}
function findParentsInItems(items, targetId, chain) {
  var _a;
  for (const it of items) {
    if (it.id === targetId)
      return chain;
    if ((_a = it.children) == null ? void 0 : _a.length) {
      const hit = findParentsInItems(it.children, targetId, [...chain, it.id]);
      if (hit)
        return hit;
    }
  }
  return null;
}
function findParentIdsForActiveItem(sections, targetId) {
  for (const s of sections) {
    const p = findParentsInItems(s.items, targetId, []);
    if (p)
      return p;
  }
  return [];
}
function collectDefaultExpandedIds(items, out) {
  var _a, _b;
  for (const it of items) {
    if (((_a = it.children) == null ? void 0 : _a.length) && it.defaultExpanded)
      out.add(it.id);
    if ((_b = it.children) == null ? void 0 : _b.length)
      collectDefaultExpandedIds(it.children, out);
  }
}
function getInitialExpandedSet(sections) {
  const s = /* @__PURE__ */ new Set();
  for (const sec of sections)
    collectDefaultExpandedIds(sec.items, s);
  return s;
}

// src/components/molecules/AppSidebar/AppSidebarTooltipHost.tsx
import React4, { useCallback as useCallback2, useId as useId2, useLayoutEffect as useLayoutEffect2, useRef as useRef2, useState as useState2 } from "react";
import { createPortal as createPortal2 } from "react-dom";
import { jsx as jsx4, jsxs as jsxs4 } from "react/jsx-runtime";
function AppSidebarTooltipHost({ collapsed, label, children }) {
  const tipId = useId2();
  const [visible, setVisible] = useState2(false);
  const [coords, setCoords] = useState2({ top: 0, left: 0 });
  const hostRef = useRef2(null);
  const position = useCallback2(() => {
    const el = hostRef.current;
    if (!el)
      return;
    const r = el.getBoundingClientRect();
    const top = r.top + r.height / 2;
    const left = r.right + 8;
    setCoords((prev) => {
      if (Math.abs(prev.top - top) < 0.5 && Math.abs(prev.left - left) < 0.5)
        return prev;
      return { top, left };
    });
  }, []);
  useLayoutEffect2(() => {
    if (!visible || !collapsed)
      return;
    position();
    const onScroll = () => position();
    window.addEventListener("scroll", onScroll, true);
    window.addEventListener("resize", position);
    return () => {
      window.removeEventListener("scroll", onScroll, true);
      window.removeEventListener("resize", position);
    };
  }, [visible, collapsed, position]);
  if (!collapsed) {
    return children;
  }
  const child = React4.cloneElement(children, {
    "aria-describedby": visible ? tipId : void 0
  });
  const tooltip = visible && typeof document !== "undefined" ? createPortal2(
    /* @__PURE__ */ jsx4(
      "span",
      {
        id: tipId,
        role: "tooltip",
        className: "app-sidebar__floating-tip",
        style: {
          position: "fixed",
          top: coords.top,
          left: coords.left,
          transform: "translateY(-50%)",
          zIndex: 99999
        },
        children: label
      }
    ),
    document.body
  ) : null;
  return /* @__PURE__ */ jsxs4(
    "span",
    {
      ref: hostRef,
      className: "app-sidebar__tip-host",
      onMouseEnter: () => setVisible(true),
      onMouseLeave: () => setVisible(false),
      onFocusCapture: () => setVisible(true),
      onBlurCapture: () => setVisible(false),
      children: [
        child,
        tooltip
      ]
    }
  );
}

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

// src/components/molecules/AppSidebar/index.tsx
import { Fragment, jsx as jsx5, jsxs as jsxs5 } from "react/jsx-runtime";
var NAV_ICON = 24;
var TRAIL_ICON = 24;
var FOOTER_ACTION_ICON = 18;
var chevronRailLeft = /* @__PURE__ */ jsx5("svg", { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", "aria-hidden": true, children: /* @__PURE__ */ jsx5("path", { d: "M15 6l-6 6 6 6" }) });
var chevronRailRight = /* @__PURE__ */ jsx5("svg", { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", "aria-hidden": true, children: /* @__PURE__ */ jsx5("path", { d: "M9 6l6 6-6 6" }) });
var chevronNested = /* @__PURE__ */ jsx5("svg", { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", "aria-hidden": true, children: /* @__PURE__ */ jsx5("path", { d: "M9 6l6 6-6 6" }) });
function renderItemIcon(icon) {
  if (icon == null)
    return null;
  if (React5.isValidElement(icon)) {
    return /* @__PURE__ */ jsx5("span", { className: "app-sidebar__item-icon", children: icon });
  }
  return /* @__PURE__ */ jsx5("span", { className: "app-sidebar__item-icon", children: /* @__PURE__ */ jsx5(Icon_default, { src: icon, decorative: true, width: NAV_ICON, height: NAV_ICON, color: "currentColor" }) });
}
function AppSidebar({
  sections: sectionsProp,
  items: itemsProp,
  collapsed: collapsedProp,
  defaultCollapsed = false,
  onCollapsedChange,
  showCollapseToggle = true,
  collapseToggleLabel = "Toggle sidebar",
  widthExpanded = 320,
  widthCollapsed = 64,
  fixed = false,
  responsive = true,
  collapseBelowWidth = 1024,
  drawerOverlayBelowWidth = 768,
  publishLayoutOffsetVar = true,
  closeOnNavigateWhenNarrow = true,
  backdropCloseLabel = "Close navigation",
  lockBodyScrollWhenDrawer = true,
  header,
  activeItemId: activeItemIdProp,
  defaultActiveItemId = null,
  onItemSelect,
  navLabel = "Main navigation",
  user,
  footerActions,
  maxFooterActions,
  footerLayout = "profileFirst",
  footerSlot,
  tokens,
  classNames,
  persistenceKey,
  expandedIds: expandedIdsProp,
  defaultExpandedIds,
  onExpandedChange,
  className,
  style,
  ...rest
}) {
  var _a, _b, _c;
  const baseId = useId3().replace(/:/g, "");
  const panelId = `app-sidebar-panel-${baseId}`;
  const navRef = useRef3(null);
  const drawerFocusSentinel = useRef3(false);
  const prevNarrowRef = useRef3(null);
  const isNarrow = useBelowWidth(collapseBelowWidth, responsive);
  const isMobileDrawerViewport = useBelowWidth(drawerOverlayBelowWidth, responsive);
  const sections = useMemo2(
    () => normalizeSections(sectionsProp, itemsProp),
    [sectionsProp, itemsProp]
  );
  const visibleFooterActions = useMemo2(() => {
    if (!(footerActions == null ? void 0 : footerActions.length))
      return [];
    if (maxFooterActions == null)
      return footerActions;
    return footerActions.slice(0, Math.max(0, maxFooterActions));
  }, [footerActions, maxFooterActions]);
  const [uncontrolledCollapsed, setUncontrolledCollapsed] = useState3(() => {
    const pr = readAppSidebarPersist(persistenceKey);
    if ((pr == null ? void 0 : pr.collapsed) !== void 0)
      return pr.collapsed;
    return defaultCollapsed;
  });
  const collapsed = collapsedProp !== void 0 ? collapsedProp : uncontrolledCollapsed;
  const showDrawerOverlay = Boolean(
    fixed && responsive && isNarrow && !collapsed && isMobileDrawerViewport
  );
  const useViewportFixedChrome = Boolean(fixed);
  const sidebarWidthPx = collapsed ? widthCollapsed : widthExpanded;
  useLayoutEffect3(() => {
    if (typeof document === "undefined")
      return;
    const root = document.documentElement;
    if (!publishLayoutOffsetVar) {
      root.style.removeProperty("--app-sidebar-offset");
      return;
    }
    let offsetPx = 0;
    if (fixed) {
      if (!isNarrow) {
        offsetPx = sidebarWidthPx;
      } else if (isMobileDrawerViewport) {
        offsetPx = collapsed ? widthCollapsed : 0;
      } else {
        offsetPx = sidebarWidthPx;
      }
    }
    root.style.setProperty("--app-sidebar-offset", `${offsetPx}px`);
    return () => {
      root.style.removeProperty("--app-sidebar-offset");
    };
  }, [
    publishLayoutOffsetVar,
    fixed,
    isNarrow,
    isMobileDrawerViewport,
    collapsed,
    sidebarWidthPx,
    widthCollapsed
  ]);
  useLayoutEffect3(() => {
    if (!responsive || collapsedProp !== void 0)
      return;
    if (prevNarrowRef.current === null) {
      prevNarrowRef.current = isNarrow;
      if (isNarrow) {
        const pr = readAppSidebarPersist(persistenceKey);
        if ((pr == null ? void 0 : pr.collapsed) === void 0)
          setUncontrolledCollapsed(true);
      }
      return;
    }
    if (isNarrow && !prevNarrowRef.current) {
      setUncontrolledCollapsed(true);
    }
    prevNarrowRef.current = isNarrow;
  }, [isNarrow, responsive, collapsedProp, persistenceKey]);
  const [uncontrolledActive, setUncontrolledActive] = useState3(defaultActiveItemId);
  const activeItemId = activeItemIdProp !== void 0 ? activeItemIdProp : uncontrolledActive;
  const [internalExpanded, setInternalExpanded] = useState3(() => {
    var _a2, _b2;
    const s = new Set(getInitialExpandedSet(sections));
    defaultExpandedIds == null ? void 0 : defaultExpandedIds.forEach((id) => s.add(id));
    (_b2 = (_a2 = readAppSidebarPersist(persistenceKey)) == null ? void 0 : _a2.expanded) == null ? void 0 : _b2.forEach((id) => s.add(id));
    return s;
  });
  const expandedSet = useMemo2(() => {
    if (expandedIdsProp != null)
      return new Set(expandedIdsProp);
    return internalExpanded;
  }, [expandedIdsProp, internalExpanded]);
  useEffect2(() => {
    if (!activeItemId)
      return;
    const parents = findParentIdsForActiveItem(sections, activeItemId);
    if (parents.length === 0)
      return;
    if (expandedIdsProp != null) {
      const next = new Set(expandedIdsProp);
      let changed = false;
      parents.forEach((id) => {
        if (!next.has(id)) {
          next.add(id);
          changed = true;
        }
      });
      if (changed)
        onExpandedChange == null ? void 0 : onExpandedChange([...next]);
      return;
    }
    setInternalExpanded((prev) => {
      const n = new Set(prev);
      let changed = false;
      parents.forEach((id) => {
        if (!n.has(id)) {
          n.add(id);
          changed = true;
        }
      });
      return changed ? n : prev;
    });
  }, [activeItemId, sections, expandedIdsProp, onExpandedChange]);
  useEffect2(() => {
    if (!persistenceKey)
      return;
    if (typeof window === "undefined")
      return;
    const coll = collapsedProp !== void 0 ? collapsedProp : uncontrolledCollapsed;
    const ex = expandedIdsProp != null ? expandedIdsProp : [...internalExpanded];
    writeAppSidebarPersist(persistenceKey, coll, ex);
  }, [
    persistenceKey,
    collapsedProp,
    uncontrolledCollapsed,
    expandedIdsProp,
    internalExpanded
  ]);
  const setCollapsed = useCallback3(
    (next) => {
      if (collapsedProp === void 0)
        setUncontrolledCollapsed(next);
      onCollapsedChange == null ? void 0 : onCollapsedChange(next);
    },
    [collapsedProp, onCollapsedChange]
  );
  useEffect2(() => {
    if (!showDrawerOverlay || !lockBodyScrollWhenDrawer || typeof document === "undefined")
      return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [showDrawerOverlay, lockBodyScrollWhenDrawer]);
  useEffect2(() => {
    if (!showDrawerOverlay || typeof document === "undefined")
      return;
    const onKey = (e) => {
      if (e.key === "Escape") {
        e.stopPropagation();
        setCollapsed(true);
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [showDrawerOverlay, setCollapsed]);
  useLayoutEffect3(() => {
    if (!showDrawerOverlay) {
      drawerFocusSentinel.current = false;
      return;
    }
    if (drawerFocusSentinel.current)
      return;
    drawerFocusSentinel.current = true;
    const id = window.requestAnimationFrame(() => {
      var _a2;
      const panel = (_a2 = navRef.current) == null ? void 0 : _a2.closest(".app-sidebar");
      if (!panel)
        return;
      const first = panel.querySelector(
        "a.app-sidebar__link, button.app-sidebar__link, button.app-sidebar__parent, button.app-sidebar__create"
      );
      first == null ? void 0 : first.focus({ preventScroll: true });
    });
    return () => cancelAnimationFrame(id);
  }, [showDrawerOverlay]);
  const toggleExpand = useCallback3(
    (id) => {
      if (expandedIdsProp != null) {
        const n = new Set(expandedIdsProp);
        if (n.has(id))
          n.delete(id);
        else
          n.add(id);
        onExpandedChange == null ? void 0 : onExpandedChange([...n]);
        return;
      }
      setInternalExpanded((prev) => {
        const n = new Set(prev);
        if (n.has(id))
          n.delete(id);
        else
          n.add(id);
        return n;
      });
    },
    [expandedIdsProp, onExpandedChange]
  );
  const handleSelect = useCallback3(
    (item) => {
      var _a2;
      if (item.disabled)
        return;
      if (activeItemIdProp === void 0)
        setUncontrolledActive(item.id);
      onItemSelect == null ? void 0 : onItemSelect(item.id, item);
      (_a2 = item.onClick) == null ? void 0 : _a2.call(item, item.id, item);
      if (closeOnNavigateWhenNarrow && showDrawerOverlay) {
        setCollapsed(true);
      }
    },
    [activeItemIdProp, onItemSelect, closeOnNavigateWhenNarrow, showDrawerOverlay, setCollapsed]
  );
  const width = sidebarWidthPx;
  const renderLeaf = (item, level, opts) => {
    const isActive = activeItemId === item.id;
    const trailing = renderTrailingIcon(item.trailing, TRAIL_ICON);
    const inactiveCls = cls2(
      "app-sidebar__link",
      opts.nested && "app-sidebar__link--nested",
      isActive && "app-sidebar__link--active"
    );
    const inner = /* @__PURE__ */ jsxs5(Fragment, { children: [
      renderItemIcon(item.icon),
      /* @__PURE__ */ jsx5("span", { className: "app-sidebar__item-label", children: item.label }),
      trailing ? /* @__PURE__ */ jsx5(
        "span",
        {
          className: "app-sidebar__trailing-wrap",
          ...item.trailingLabel ? { role: "img", "aria-label": item.trailingLabel } : { "aria-hidden": true },
          children: trailing
        }
      ) : null
    ] });
    const control = item.href && !item.disabled ? /* @__PURE__ */ jsx5(
      "a",
      {
        href: item.href,
        className: inactiveCls,
        "aria-current": isActive ? "page" : void 0,
        onClick: (e) => {
          if (item.disabled) {
            e.preventDefault();
            return;
          }
          handleSelect(item);
        },
        children: inner
      }
    ) : /* @__PURE__ */ jsx5(
      "button",
      {
        type: "button",
        className: inactiveCls,
        disabled: item.disabled,
        "aria-current": isActive ? "page" : void 0,
        onClick: () => handleSelect(item),
        children: inner
      }
    );
    return /* @__PURE__ */ jsx5(AppSidebarTooltipHost, { collapsed, label: item.label, children: control });
  };
  const renderBranch = (item, level) => {
    const hasChildren = !!(item.children && item.children.length > 0);
    const submenuId = `sb-${baseId}-sub-${item.id}`;
    const isOpen = expandedSet.has(item.id);
    const isActive = activeItemId === item.id;
    if (!hasChildren) {
      return renderLeaf(item, level, { nested: level > 0 });
    }
    const trailing = renderTrailingIcon(item.trailing, TRAIL_ICON);
    const parentInner = /* @__PURE__ */ jsxs5(Fragment, { children: [
      renderItemIcon(item.icon),
      /* @__PURE__ */ jsx5("span", { className: "app-sidebar__item-label", children: item.label }),
      /* @__PURE__ */ jsx5(
        "span",
        {
          className: cls2("app-sidebar__chevron", isOpen && "app-sidebar__chevron--open"),
          "aria-hidden": true,
          children: chevronNested
        }
      ),
      trailing ? /* @__PURE__ */ jsx5(
        "span",
        {
          className: "app-sidebar__trailing-wrap",
          ...item.trailingLabel ? { role: "img", "aria-label": item.trailingLabel } : { "aria-hidden": true },
          children: trailing
        }
      ) : null
    ] });
    const parentBtn = /* @__PURE__ */ jsx5(
      "button",
      {
        type: "button",
        className: cls2(
          "app-sidebar__parent",
          level > 0 && "app-sidebar__link--nested",
          isActive && "app-sidebar__parent--active"
        ),
        "aria-expanded": isOpen,
        "aria-controls": submenuId,
        disabled: item.disabled,
        onClick: () => {
          if (item.disabled)
            return;
          toggleExpand(item.id);
        },
        children: parentInner
      }
    );
    return /* @__PURE__ */ jsxs5(Fragment, { children: [
      /* @__PURE__ */ jsx5(AppSidebarTooltipHost, { collapsed, label: item.label, children: parentBtn }),
      isOpen && !collapsed ? /* @__PURE__ */ jsxs5("ul", { id: submenuId, className: "app-sidebar__list app-sidebar__list--nested", role: "list", children: [
        item.children.map((child) => {
          var _a2;
          return /* @__PURE__ */ jsx5("li", { className: "app-sidebar__item", children: !((_a2 = child.children) == null ? void 0 : _a2.length) ? renderLeaf(child, level + 1, { nested: true }) : renderBranch(child, level + 1) }, child.id);
        }),
        item.createAction ? /* @__PURE__ */ jsx5("li", { className: "app-sidebar__item", children: /* @__PURE__ */ jsxs5(
          "button",
          {
            type: "button",
            className: "app-sidebar__create",
            onClick: item.createAction.onClick,
            children: [
              item.createAction.icon ? /* @__PURE__ */ jsx5("span", { className: "app-sidebar__item-icon", children: React5.isValidElement(item.createAction.icon) ? item.createAction.icon : /* @__PURE__ */ jsx5(
                Icon_default,
                {
                  src: item.createAction.icon,
                  decorative: true,
                  width: 20,
                  height: 20,
                  color: "currentColor"
                }
              ) }) : /* @__PURE__ */ jsx5("span", { "aria-hidden": true, className: "app-sidebar__item-label", style: { flex: "none", width: 24 }, children: "+" }),
              /* @__PURE__ */ jsx5("span", { children: item.createAction.label })
            ]
          }
        ) }) : null
      ] }) : null
    ] });
  };
  const renderSection = (section, idx) => /* @__PURE__ */ jsxs5("div", { className: "app-sidebar__section", "data-tier": section.tier, "data-grouping": section.grouping, children: [
    idx > 0 && section.grouping === "divider" ? /* @__PURE__ */ jsx5("div", { role: "separator", className: "app-sidebar__section-divider" }) : null,
    section.grouping === "label" && section.label ? /* @__PURE__ */ jsx5("div", { className: "app-sidebar__section-label", children: section.label }) : null,
    /* @__PURE__ */ jsx5("ul", { className: "app-sidebar__list", role: "list", children: section.items.map((item) => {
      var _a2;
      return /* @__PURE__ */ jsx5("li", { className: "app-sidebar__item", children: !((_a2 = item.children) == null ? void 0 : _a2.length) ? renderLeaf(item, 0, {}) : renderBranch(item, 0) }, item.id);
    }) })
  ] }, section.id);
  const roleLine = (_a = user == null ? void 0 : user.role) != null ? _a : user == null ? void 0 : user.description;
  const profileTip = user && collapsed ? [user.name, roleLine].filter(Boolean).join(" \xB7 ") : "";
  let profileWrapped = null;
  if (user) {
    const body = /* @__PURE__ */ jsxs5(Fragment, { children: [
      /* @__PURE__ */ jsx5("div", { className: "app-sidebar__profile-avatar", children: user.avatar ? user.avatar : /* @__PURE__ */ jsx5(Avatar_default, { size: 34, shape: "circle", name: user.name, ...user.avatarProps }) }),
      /* @__PURE__ */ jsxs5("div", { className: "app-sidebar__profile-text", children: [
        /* @__PURE__ */ jsx5("p", { className: "app-sidebar__profile-name", children: user.name }),
        roleLine ? /* @__PURE__ */ jsx5("p", { className: "app-sidebar__profile-role", children: roleLine }) : null
      ] }),
      /* @__PURE__ */ jsx5("span", { className: "app-sidebar__profile-arrow", "aria-hidden": true, children: chevronNested })
    ] });
    const control = user.onClick ? /* @__PURE__ */ jsx5(
      "button",
      {
        type: "button",
        className: "app-sidebar__profile",
        onClick: user.onClick,
        "aria-label": (_b = user.profileRowLabel) != null ? _b : `${user.name}, open account menu`,
        children: body
      }
    ) : /* @__PURE__ */ jsx5(
      "div",
      {
        className: "app-sidebar__profile app-sidebar__profile--static",
        role: "group",
        "aria-label": (_c = user.profileRowLabel) != null ? _c : user.name,
        children: body
      }
    );
    profileWrapped = collapsed && profileTip ? /* @__PURE__ */ jsx5(AppSidebarTooltipHost, { collapsed: true, label: profileTip, children: control }) : control;
  }
  const rootStyle = mergeSidebarTokensStyle(tokens, {
    width,
    minWidth: width,
    maxWidth: width,
    ...style
  });
  const backdrop = showDrawerOverlay && typeof document !== "undefined" ? createPortal3(
    /* @__PURE__ */ jsx5(
      "button",
      {
        type: "button",
        className: "app-sidebar__backdrop",
        "aria-label": backdropCloseLabel,
        onClick: () => setCollapsed(true)
      }
    ),
    document.body
  ) : null;
  return /* @__PURE__ */ jsxs5(Fragment, { children: [
    backdrop,
    /* @__PURE__ */ jsxs5(
      "aside",
      {
        ...rest,
        id: panelId,
        className: cls2(
          "app-sidebar",
          useViewportFixedChrome && "app-sidebar--fixed",
          collapsed && "app-sidebar--collapsed",
          responsive && isNarrow && "app-sidebar--narrow",
          showDrawerOverlay && "app-sidebar--drawer-open",
          classNames == null ? void 0 : classNames.root,
          className
        ),
        style: rootStyle,
        children: [
          header ? /* @__PURE__ */ jsxs5("div", { className: cls2("app-sidebar__header", classNames == null ? void 0 : classNames.header), children: [
            showCollapseToggle ? /* @__PURE__ */ jsx5(
              "button",
              {
                type: "button",
                className: "app-sidebar__collapse",
                "aria-label": collapseToggleLabel,
                "aria-expanded": !collapsed,
                "aria-controls": isNarrow ? panelId : void 0,
                onClick: () => setCollapsed(!collapsed),
                children: /* @__PURE__ */ jsx5(Icon_default, { src: collapsed ? chevronRailRight : chevronRailLeft, decorative: true, width: 22, height: 22 })
              }
            ) : null,
            /* @__PURE__ */ jsxs5("div", { className: "app-sidebar__header-body", children: [
              /* @__PURE__ */ jsxs5("div", { className: "app-sidebar__header-main", children: [
                header.icon ? /* @__PURE__ */ jsx5("div", { className: "app-sidebar__header-icon", children: header.icon }) : null,
                /* @__PURE__ */ jsxs5("div", { className: "app-sidebar__header-text", children: [
                  /* @__PURE__ */ jsx5("p", { className: "app-sidebar__title", children: header.title }),
                  header.subtitle ? /* @__PURE__ */ jsx5("p", { className: "app-sidebar__subtitle", children: header.subtitle }) : null
                ] })
              ] }),
              header.trailing ? /* @__PURE__ */ jsx5("div", { className: cls2("app-sidebar__header-trailing", classNames == null ? void 0 : classNames.headerTrailing), children: header.trailing }) : null
            ] })
          ] }) : showCollapseToggle ? /* @__PURE__ */ jsx5("div", { className: cls2("app-sidebar__header", classNames == null ? void 0 : classNames.header), children: /* @__PURE__ */ jsx5(
            "button",
            {
              type: "button",
              className: "app-sidebar__collapse",
              "aria-label": collapseToggleLabel,
              "aria-expanded": !collapsed,
              "aria-controls": isNarrow ? panelId : void 0,
              onClick: () => setCollapsed(!collapsed),
              children: /* @__PURE__ */ jsx5(Icon_default, { src: collapsed ? chevronRailRight : chevronRailLeft, decorative: true, width: 22, height: 22 })
            }
          ) }) : null,
          /* @__PURE__ */ jsx5(
            "nav",
            {
              ref: navRef,
              className: cls2("app-sidebar__nav", classNames == null ? void 0 : classNames.nav),
              "aria-label": navLabel,
              children: sections.map((s, i) => renderSection(s, i))
            }
          ),
          footerSlot ? /* @__PURE__ */ jsx5("div", { className: cls2("app-sidebar__footer", classNames == null ? void 0 : classNames.footer), children: footerSlot }) : user || visibleFooterActions.length > 0 ? /* @__PURE__ */ jsx5("div", { className: cls2("app-sidebar__footer", classNames == null ? void 0 : classNames.footer), children: /* @__PURE__ */ jsxs5(
            "div",
            {
              className: cls2(
                "app-sidebar__footer-row",
                footerLayout === "utilitiesFirst" && "app-sidebar__footer-row--utilities-first",
                classNames == null ? void 0 : classNames.footerRow
              ),
              children: [
                profileWrapped ? /* @__PURE__ */ jsx5("div", { className: cls2("app-sidebar__footer-profile", classNames == null ? void 0 : classNames.footerProfile), children: profileWrapped }) : null,
                visibleFooterActions.length > 0 ? /* @__PURE__ */ jsx5(
                  "div",
                  {
                    className: cls2("app-sidebar__footer-utilities", classNames == null ? void 0 : classNames.footerUtilities),
                    role: "group",
                    "aria-label": "Utility actions",
                    children: visibleFooterActions.map((action) => {
                      const iconNode = React5.isValidElement(action.icon) ? action.icon : /* @__PURE__ */ jsx5(
                        Icon_default,
                        {
                          src: action.icon,
                          decorative: true,
                          width: FOOTER_ACTION_ICON,
                          height: FOOTER_ACTION_ICON,
                          color: "currentColor"
                        }
                      );
                      const node = action.href ? /* @__PURE__ */ jsx5(
                        "a",
                        {
                          href: action.href,
                          className: "app-sidebar__action",
                          "aria-label": action.label,
                          onClick: action.onClick,
                          children: iconNode
                        }
                      ) : /* @__PURE__ */ jsx5(
                        "button",
                        {
                          type: "button",
                          className: "app-sidebar__action",
                          "aria-label": action.label,
                          onClick: action.onClick,
                          children: iconNode
                        }
                      );
                      return /* @__PURE__ */ jsx5(AppSidebarTooltipHost, { collapsed, label: action.label, children: node }, action.id);
                    })
                  }
                ) : null
              ]
            }
          ) }) : null
        ]
      }
    )
  ] });
}

// src/components/molecules/AppTopbar/AppTopbar.chrome.ts
var TOKENS_CSS_VARS2 = {
  bg: "--app-topbar-bg",
  bgElevated: "--app-topbar-bg-elevated",
  text: "--app-topbar-text",
  textMuted: "--app-topbar-text-muted",
  border: "--app-topbar-border",
  hover: "--app-topbar-hover",
  activeBg: "--app-topbar-active-bg",
  focusRing: "--app-topbar-focus-ring",
  shadow: "--app-topbar-shadow"
};
function mergeTopbarTokensStyle(tokens, base) {
  if (!tokens || Object.keys(tokens).length === 0) {
    return base != null ? base : {};
  }
  const vars = {};
  Object.entries(tokens).forEach(([key, val]) => {
    if (val === void 0 || val === "")
      return;
    const cssVar = TOKENS_CSS_VARS2[key];
    if (cssVar)
      vars[cssVar] = val;
  });
  return { ...vars, ...base };
}

// src/components/molecules/AppTopbar/index.tsx
import { useEffect as useEffect4, useId as useId4, useMemo as useMemo3, useRef as useRef5, useState as useState4 } from "react";

// src/components/molecules/AppTopbar/AppTopbarMenu.tsx
import React6, { useEffect as useEffect3, useLayoutEffect as useLayoutEffect4, useRef as useRef4 } from "react";
import { createPortal as createPortal4 } from "react-dom";
import { Fragment as Fragment2, jsx as jsx6, jsxs as jsxs6 } from "react/jsx-runtime";
function cls3(...parts) {
  return parts.filter(Boolean).join(" ");
}
function AppTopbarMenu({ id, open, onClose, triggerRef, items, theme }) {
  const menuRef = useRef4(null);
  const positionMenu = () => {
    const el = triggerRef.current;
    const menu = menuRef.current;
    if (!el || !menu)
      return;
    const rect = el.getBoundingClientRect();
    const mw = menu.offsetWidth || 220;
    let left = rect.left;
    if (left + mw > window.innerWidth - 16) {
      left = Math.max(16, window.innerWidth - 16 - mw);
    }
    if (left < 16)
      left = 16;
    const top = rect.bottom + 8;
    const maxH = window.innerHeight - top - 16;
    menu.style.position = "fixed";
    menu.style.top = `${top}px`;
    menu.style.left = `${left}px`;
    menu.style.zIndex = "70";
    menu.style.maxHeight = `${Math.max(120, maxH)}px`;
  };
  useLayoutEffect4(() => {
    if (!open)
      return;
    positionMenu();
  }, [open]);
  useEffect3(() => {
    if (!open)
      return;
    const onScrollResize = () => positionMenu();
    window.addEventListener("scroll", onScrollResize, true);
    window.addEventListener("resize", onScrollResize);
    return () => {
      window.removeEventListener("scroll", onScrollResize, true);
      window.removeEventListener("resize", onScrollResize);
    };
  }, [open]);
  useEffect3(() => {
    if (!open)
      return;
    const onDoc = (e) => {
      var _a, _b;
      const t = e.target;
      if ((_a = menuRef.current) == null ? void 0 : _a.contains(t))
        return;
      if ((_b = triggerRef.current) == null ? void 0 : _b.contains(t))
        return;
      onClose();
    };
    const onKey = (e) => {
      if (e.key === "Escape")
        onClose();
    };
    document.addEventListener("mousedown", onDoc);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDoc);
      document.removeEventListener("keydown", onKey);
    };
  }, [open, onClose, triggerRef]);
  useEffect3(() => {
    if (!open || !menuRef.current)
      return;
    const first = menuRef.current.querySelector(
      'button[role="menuitem"]:not([disabled]), a[role="menuitem"]'
    );
    first == null ? void 0 : first.focus();
  }, [open]);
  if (!open || typeof document === "undefined")
    return null;
  return createPortal4(
    /* @__PURE__ */ jsx6(
      "div",
      {
        ref: menuRef,
        id,
        role: "menu",
        "aria-orientation": "vertical",
        className: cls3("app-topbar-menu", theme === "dark" && "app-topbar-menu--dark"),
        children: items.map((item) => {
          const content = /* @__PURE__ */ jsxs6(Fragment2, { children: [
            item.icon ? /* @__PURE__ */ jsx6("span", { className: "app-topbar-menu__icon", "aria-hidden": true, children: /* @__PURE__ */ jsx6(Icon_default, { src: item.icon, width: 18, height: 18, color: "currentColor", decorative: true }) }) : null,
            /* @__PURE__ */ jsx6("span", { className: "app-topbar-menu__label", children: item.label })
          ] });
          const className = cls3(
            "app-topbar-menu__item",
            item.destructive && "app-topbar-menu__item--destructive",
            item.disabled && "app-topbar-menu__item--disabled"
          );
          const common = {
            role: "menuitem",
            className,
            tabIndex: item.disabled ? -1 : void 0
          };
          const node = item.href && !item.disabled ? /* @__PURE__ */ jsx6(
            "a",
            {
              ...common,
              href: item.href,
              onClick: () => {
                onClose();
              },
              children: content
            }
          ) : /* @__PURE__ */ jsx6(
            "button",
            {
              ...common,
              type: "button",
              disabled: item.disabled,
              onClick: () => {
                var _a;
                if (item.disabled)
                  return;
                (_a = item.onClick) == null ? void 0 : _a.call(item);
                onClose();
              },
              children: content
            }
          );
          return /* @__PURE__ */ jsx6(React6.Fragment, { children: node }, item.id);
        })
      }
    ),
    document.body
  );
}

// src/components/molecules/AppTopbar/index.tsx
import { Fragment as Fragment3, jsx as jsx7, jsxs as jsxs7 } from "react/jsx-runtime";
var TOPBAR_SEARCH_ICON = /* @__PURE__ */ jsxs7("svg", { viewBox: "0 0 24 24", width: 18, height: 18, fill: "none", "aria-hidden": true, children: [
  /* @__PURE__ */ jsx7("circle", { cx: "11", cy: "11", r: "7", stroke: "currentColor", strokeWidth: "2" }),
  /* @__PURE__ */ jsx7("path", { d: "M20 20l-4.3-4.3", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round" })
] });
var MENU_ICON = /* @__PURE__ */ jsx7("svg", { viewBox: "0 0 20 20", width: 20, height: 20, fill: "none", "aria-hidden": true, children: /* @__PURE__ */ jsx7("path", { d: "M3 5h14M3 10h14M3 15h14", stroke: "currentColor", strokeWidth: "1.5", strokeLinecap: "round" }) });
function cls4(...parts) {
  return parts.filter(Boolean).join(" ");
}
function actionAriaLabel(action) {
  const { label, badgeDot, badgeCount } = action;
  if (badgeDot && (badgeCount == null || badgeCount <= 0)) {
    return `${label}, unread`;
  }
  if (badgeCount != null && badgeCount > 0) {
    return `${label}, ${badgeCount} unread`;
  }
  return label;
}
var AppTopbar = ({
  theme = "light",
  title,
  titleAs = "h1",
  search,
  centerSlot,
  actions,
  profile,
  onMobileMenuClick,
  mobileMenuLabel = "Open menu",
  mobileMenuItems,
  mobileSearchTriggerLabel = "Search",
  leftSlot,
  rightSlot,
  sticky = true,
  zIndex = 50,
  collapseCenterBelowWidth = 1024,
  responsive = true,
  tokens,
  className,
  classNames
}) => {
  var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j, _k, _l, _m, _n, _o, _p;
  const rootId = useId4();
  const baseId = rootId.replace(/[^a-zA-Z0-9_-]/g, "");
  const searchInputId = (_a = search == null ? void 0 : search.inputId) != null ? _a : `app-topbar-search-${baseId}`;
  const menuDomId = useMemo3(() => `app-topbar-menu-root-${baseId}`, [baseId]);
  const isNarrow = useBelowWidth(collapseCenterBelowWidth, responsive);
  const hasMenuItems = Boolean(mobileMenuItems && mobileMenuItems.length > 0);
  const showHamburger = isNarrow && (hasMenuItems || Boolean(onMobileMenuClick));
  const hasCenterContent = centerSlot != null || search != null;
  const hideCenterColumn = isNarrow && search != null && centerSlot == null;
  const showCenterCell = hasCenterContent && !hideCenterColumn;
  const [mobileSearchOpen, setMobileSearchOpen] = useState4(false);
  const [menuOpen, setMenuOpen] = useState4(false);
  const menuTriggerWrapRef = useRef5(null);
  const hasProfileMenu = Boolean((profile == null ? void 0 : profile.menuItems) && profile.menuItems.length > 0);
  const [profileMenuOpen, setProfileMenuOpen] = useState4(false);
  useEffect4(() => {
    if (!isNarrow) {
      setMobileSearchOpen(false);
      setMenuOpen(false);
    }
  }, [isNarrow]);
  useEffect4(() => {
    if (!mobileSearchOpen)
      return;
    const onKey = (e) => {
      if (e.key === "Escape")
        setMobileSearchOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [mobileSearchOpen]);
  useEffect4(() => {
    if (!mobileSearchOpen || !hideCenterColumn)
      return;
    const id = requestAnimationFrame(() => {
      var _a2;
      (_a2 = document.getElementById(searchInputId)) == null ? void 0 : _a2.focus();
    });
    return () => cancelAnimationFrame(id);
  }, [mobileSearchOpen, hideCenterColumn, searchInputId]);
  useEffect4(() => {
    if (!search)
      return;
    const onKey = (e) => {
      if (e.defaultPrevented)
        return;
      const t = e.target;
      if (!t)
        return;
      if (t.tagName === "INPUT" || t.tagName === "TEXTAREA" || t.isContentEditable)
        return;
      const focusSearch = () => {
        var _a2;
        return (_a2 = document.getElementById(searchInputId)) == null ? void 0 : _a2.focus();
      };
      if (hideCenterColumn && !mobileSearchOpen) {
        if (e.key === "/" && !e.metaKey && !e.ctrlKey && !e.altKey) {
          e.preventDefault();
          setMobileSearchOpen(true);
          return;
        }
        if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
          e.preventDefault();
          setMobileSearchOpen(true);
          return;
        }
        return;
      }
      if (e.key === "/" && !e.metaKey && !e.ctrlKey && !e.altKey) {
        e.preventDefault();
        focusSearch();
        return;
      }
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        focusSearch();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [search, hideCenterColumn, mobileSearchOpen, searchInputId]);
  const TitleTag = titleAs;
  const rootStyle = mergeTopbarTokensStyle(tokens, {
    ...sticky ? { zIndex } : {}
  });
  const searchField = search ? /* @__PURE__ */ jsx7(
    TextInputSearch_default,
    {
      id: searchInputId,
      value: (_b = search.value) != null ? _b : "",
      onChange: search.onChange,
      onSearch: search.onSearch,
      placeholder: (_c = search.placeholder) != null ? _c : "Search...",
      ariaLabel: (_d = search.ariaLabel) != null ? _d : "Search",
      disabled: search.disabled,
      size: (_e = search.size) != null ? _e : "sm",
      fullWidth: true,
      leftIcon: TOPBAR_SEARCH_ICON,
      leftIconHeight: 18,
      leftIconWidth: 18,
      leftIconColor: "var(--app-topbar-text-muted)",
      showClearButton: (_f = search.showClearButton) != null ? _f : hideCenterColumn,
      containerClassName: "text-input-search-wrapper app-topbar__search"
    }
  ) : null;
  const handleHamburgerClick = () => {
    setMobileSearchOpen(false);
    setProfileMenuOpen(false);
    if (hasMenuItems) {
      setMenuOpen((o) => !o);
      return;
    }
    onMobileMenuClick == null ? void 0 : onMobileMenuClick();
  };
  return /* @__PURE__ */ jsxs7(Fragment3, { children: [
    /* @__PURE__ */ jsxs7(
      "header",
      {
        className: cls4(
          "app-topbar",
          theme === "dark" && "app-topbar--dark",
          sticky && "app-topbar--sticky",
          !showCenterCell && "app-topbar--no-center",
          hideCenterColumn && "app-topbar--narrow-search",
          mobileSearchOpen && hideCenterColumn && "app-topbar--mobile-search-open",
          classNames == null ? void 0 : classNames.root,
          className
        ),
        style: rootStyle,
        children: [
          /* @__PURE__ */ jsxs7("div", { className: cls4("app-topbar__inner", classNames == null ? void 0 : classNames.inner), children: [
            /* @__PURE__ */ jsxs7("div", { className: cls4("app-topbar__left", classNames == null ? void 0 : classNames.left), children: [
              showHamburger ? /* @__PURE__ */ jsx7("div", { ref: menuTriggerWrapRef, className: "app-topbar__menu", children: /* @__PURE__ */ jsx7(
                Button_default,
                {
                  type: "button",
                  variant: "ghost",
                  size: "md",
                  icon: MENU_ICON,
                  iconWidth: 20,
                  iconHeight: 20,
                  ariaLabel: mobileMenuLabel,
                  "aria-haspopup": hasMenuItems ? "menu" : void 0,
                  "aria-expanded": hasMenuItems ? menuOpen : void 0,
                  "aria-controls": hasMenuItems ? menuDomId : void 0,
                  onClick: handleHamburgerClick
                }
              ) }) : null,
              leftSlot,
              /* @__PURE__ */ jsx7("div", { className: "app-topbar__context", children: /* @__PURE__ */ jsx7(TitleTag, { className: cls4("app-topbar__title", classNames == null ? void 0 : classNames.title), children: title }) })
            ] }),
            showCenterCell ? /* @__PURE__ */ jsx7(
              "div",
              {
                className: cls4(
                  "app-topbar__center",
                  search && !centerSlot && "app-topbar__center--expands",
                  classNames == null ? void 0 : classNames.center
                ),
                children: centerSlot != null ? centerSlot : searchField
              }
            ) : null,
            /* @__PURE__ */ jsxs7("div", { className: cls4("app-topbar__right", classNames == null ? void 0 : classNames.right), children: [
              hideCenterColumn && search ? /* @__PURE__ */ jsx7(
                Button_default,
                {
                  type: "button",
                  variant: "ghost",
                  size: "md",
                  icon: TOPBAR_SEARCH_ICON,
                  iconWidth: 20,
                  iconHeight: 20,
                  ariaLabel: mobileSearchTriggerLabel,
                  "aria-expanded": mobileSearchOpen,
                  "aria-controls": mobileSearchOpen ? `${searchInputId}-panel` : void 0,
                  onClick: () => setMobileSearchOpen((s) => !s)
                }
              ) : null,
              actions == null ? void 0 : actions.map((action) => {
                var _a2;
                const variant = (_a2 = action.variant) != null ? _a2 : "ghost";
                const showDot = action.badgeDot;
                const count = action.badgeCount;
                const hasBadge = showDot || count != null && count > 0;
                const showCountChip = hasBadge && !showDot && count != null && count > 0;
                return /* @__PURE__ */ jsxs7("span", { className: "app-topbar__action-wrap", children: [
                  /* @__PURE__ */ jsx7(
                    Button_default,
                    {
                      type: "button",
                      variant,
                      size: "md",
                      icon: action.icon,
                      iconWidth: 20,
                      iconHeight: 20,
                      ariaLabel: actionAriaLabel(action),
                      disabled: action.disabled,
                      href: action.href,
                      onClick: action.onClick
                    }
                  ),
                  hasBadge ? /* @__PURE__ */ jsx7(
                    "span",
                    {
                      className: cls4("app-topbar__badge", showCountChip && "app-topbar__badge--count"),
                      "aria-hidden": true,
                      children: showCountChip ? count > 99 ? "99+" : count : null
                    }
                  ) : null
                ] }, action.id);
              }),
              profile && hasProfileMenu ? /* @__PURE__ */ jsxs7(DropdownMenu, { open: profileMenuOpen, onOpenChange: setProfileMenuOpen, placement: "bottom-end", children: [
                /* @__PURE__ */ jsx7(
                  DropdownMenuTrigger,
                  {
                    className: "app-topbar__profile",
                    "aria-label": (_g = profile.menuLabel) != null ? _g : profile.name ? `Account menu for ${profile.name}` : "Account menu",
                    onClick: () => setMenuOpen(false),
                    children: (_i = profile.avatar) != null ? _i : /* @__PURE__ */ jsx7(Avatar_default, { size: 32, shape: "circle", name: (_h = profile.name) != null ? _h : "User", ...profile.avatarProps })
                  }
                ),
                /* @__PURE__ */ jsx7(DropdownMenuContent, { showPointer: true, className: "app-topbar__profile-menu", children: profile.menuItems.map((item) => /* @__PURE__ */ jsxs7(
                  DropdownMenuItem,
                  {
                    variant: item.destructive ? "danger" : "default",
                    disabled: item.disabled,
                    onSelect: () => {
                      var _a2;
                      if (item.href && typeof window !== "undefined")
                        window.location.assign(item.href);
                      else
                        (_a2 = item.onClick) == null ? void 0 : _a2.call(item);
                    },
                    children: [
                      item.icon ? /* @__PURE__ */ jsx7("span", { className: "ds-dropdown-menu__icon", "aria-hidden": true, children: /* @__PURE__ */ jsx7(Icon_default, { src: item.icon, width: 16, height: 16, color: "currentColor", decorative: true }) }) : null,
                      item.label
                    ]
                  },
                  item.id
                )) })
              ] }) : profile ? profile.onClick ? /* @__PURE__ */ jsx7(
                "button",
                {
                  type: "button",
                  className: "app-topbar__profile",
                  "aria-label": (_j = profile.menuLabel) != null ? _j : profile.name ? `Account menu for ${profile.name}` : "Account menu",
                  onClick: profile.onClick,
                  children: (_l = profile.avatar) != null ? _l : /* @__PURE__ */ jsx7(Avatar_default, { size: 32, shape: "circle", name: (_k = profile.name) != null ? _k : "User", ...profile.avatarProps })
                }
              ) : /* @__PURE__ */ jsx7(
                "span",
                {
                  className: "app-topbar__profile app-topbar__profile--static",
                  "aria-label": (_n = (_m = profile.menuLabel) != null ? _m : profile.name) != null ? _n : "Profile",
                  children: (_p = profile.avatar) != null ? _p : /* @__PURE__ */ jsx7(Avatar_default, { size: 32, shape: "circle", name: (_o = profile.name) != null ? _o : "User", ...profile.avatarProps })
                }
              ) : null,
              rightSlot
            ] })
          ] }),
          hideCenterColumn && mobileSearchOpen && search ? /* @__PURE__ */ jsx7("div", { id: `${searchInputId}-panel`, className: "app-topbar__mobile-search", children: searchField }) : null
        ]
      }
    ),
    hasMenuItems ? /* @__PURE__ */ jsx7(
      AppTopbarMenu,
      {
        id: menuDomId,
        open: menuOpen,
        onClose: () => setMenuOpen(false),
        triggerRef: menuTriggerWrapRef,
        items: mobileMenuItems,
        theme
      }
    ) : null
  ] });
};
AppTopbar.displayName = "AppTopbar";
var AppTopbar_default = AppTopbar;

// src/components/molecules/DashboardShell/DashboardShell.tsx
import React8 from "react";
import { jsx as jsx8, jsxs as jsxs8 } from "react/jsx-runtime";
function cls5(...parts) {
  return parts.filter(Boolean).join(" ");
}
function isAppTopbarElement(node) {
  const t = node.type;
  return t === AppTopbar_default || (t == null ? void 0 : t.displayName) === "AppTopbar" || (t == null ? void 0 : t.name) === "AppTopbar";
}
function prepareTopbar(topbar, pinTopbar) {
  if (!pinTopbar || !React8.isValidElement(topbar) || !isAppTopbarElement(topbar)) {
    return topbar;
  }
  return React8.cloneElement(topbar, { sticky: false });
}
var DEFAULT_ROOT_CLASSNAME = "flex flex-nowrap h-[100dvh] max-h-[100dvh] min-h-0 w-full min-w-0 max-w-[100vw] items-stretch overflow-hidden bg-[var(--color-bg-page)] text-[var(--color-text-primary)]";
var DEFAULT_INSET_CLASSNAME = "isolate flex min-h-0 min-w-0 flex-1 flex-col overflow-hidden";
var DEFAULT_TOPBAR_WRAPPER_CLASSNAME = "relative z-10 min-w-0 shrink-0";
var DEFAULT_CONTENT_CLASSNAME = "min-w-0 w-full min-h-0 flex-1 basis-0 overflow-y-auto overscroll-y-contain";
function DashboardShell({
  sidebar,
  topbar,
  children,
  className,
  insetClassName,
  insetStyle,
  topbarClassName,
  topbarStyle,
  contentClassName,
  contentStyle,
  pinTopbar = true
}) {
  const { fixed: fixedProp, className: sidebarClassName, classNames: sidebarClassNames, ...restSidebar } = sidebar;
  const fixed = fixedProp !== false;
  const topbarNode = prepareTopbar(topbar, pinTopbar);
  const renderInset = (style) => /* @__PURE__ */ jsxs8("div", { className: cls5(DEFAULT_INSET_CLASSNAME, insetClassName), style, children: [
    topbar ? /* @__PURE__ */ jsx8("div", { className: cls5(DEFAULT_TOPBAR_WRAPPER_CLASSNAME, topbarClassName), style: topbarStyle, children: topbarNode }) : null,
    /* @__PURE__ */ jsx8("div", { className: cls5(DEFAULT_CONTENT_CLASSNAME, contentClassName), style: contentStyle, children })
  ] });
  if (!fixed) {
    return /* @__PURE__ */ jsxs8("div", { className: cls5(DEFAULT_ROOT_CLASSNAME, className), children: [
      /* @__PURE__ */ jsx8(
        AppSidebar,
        {
          ...restSidebar,
          fixed: false,
          className: sidebarClassName,
          classNames: sidebarClassNames
        }
      ),
      renderInset({
        flex: "1 1 0%",
        maxHeight: "100%",
        minHeight: 0,
        alignSelf: "stretch",
        ...insetStyle
      })
    ] });
  }
  return /* @__PURE__ */ jsxs8("div", { className: cls5(DEFAULT_ROOT_CLASSNAME, className), children: [
    /* @__PURE__ */ jsx8(
      AppSidebar,
      {
        ...restSidebar,
        fixed: true,
        className: sidebarClassName,
        classNames: sidebarClassNames
      }
    ),
    renderInset({
      marginInlineStart: "var(--app-sidebar-offset, 0px)",
      transition: "margin-inline-start 200ms ease",
      minHeight: 0,
      flex: "1 1 0%",
      maxHeight: "100%",
      alignSelf: "stretch",
      ...insetStyle
    })
  ] });
}
var DashboardShell_default = DashboardShell;
var AppShell = DashboardShell;

export {
  Popover,
  PopoverTrigger,
  PopoverContent,
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  Avatar_default,
  mergeSidebarTokensStyle,
  readAppSidebarPersist,
  writeAppSidebarPersist,
  AppSidebar,
  mergeTopbarTokensStyle,
  AppTopbar_default,
  DashboardShell_default,
  AppShell
};
//# sourceMappingURL=chunk-WTQVOSBL.mjs.map