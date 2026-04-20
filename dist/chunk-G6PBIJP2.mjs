import {
  Icon_default,
  TextInputSearch_default
} from "./chunk-2PE7SU3L.mjs";

// src/components/atoms/Button/index.tsx
import React from "react";

// src/components/atoms/Button/Button.config.ts
var variantClasses = {
  default: "btn-primary",
  primary: "btn-primary",
  secondary: "btn-secondary",
  outlinePrimary: "btn-outline-primary",
  outlineSecondary: "btn-outline-secondary",
  success: "btn-success",
  danger: "btn-danger",
  warning: "btn-warning",
  link: "btn-link",
  ghost: "btn-ghost"
};
var sizeClasses = {
  xxs: "btn-size-xxs",
  xs: "btn-size-xs",
  sm: "btn-size-sm",
  md: "btn-size-md",
  lg: "btn-size-lg"
};
var iconOnlySizeClasses = {
  xxs: "btn-icon-only-xxs",
  xs: "btn-icon-only-xs",
  sm: "btn-icon-only-sm",
  md: "btn-icon-only-md",
  lg: "btn-icon-only-lg"
};
var radiusClass = "btn-rounded-md";
var defaultIconConfig = {
  width: 20,
  height: 20,
  color: "currentColor"
};

// src/components/atoms/Button/index.tsx
import { Fragment, jsx, jsxs } from "react/jsx-runtime";
var VALID_VARIANTS = [
  "default",
  "primary",
  "secondary",
  "outlinePrimary",
  "outlineSecondary",
  "success",
  "danger",
  "warning",
  "link",
  "ghost"
];
function getVariantClass(v) {
  if (v === void 0 || v === null || v === "")
    return variantClasses.primary;
  if (VALID_VARIANTS.includes(v))
    return variantClasses[v];
  return variantClasses.primary;
}
var Button = React.memo(function Button2({
  children,
  variant = "primary",
  variantClass,
  size = "lg",
  width,
  height,
  rounded,
  classOverrides = {},
  borderColor,
  backgroundColor,
  textColor,
  gradient,
  gradientHover,
  gradientActive,
  textSize,
  icon,
  iconPosition = "left",
  iconWidth,
  iconHeight,
  iconColor,
  iconGap = 8,
  fullWidth = false,
  block = false,
  loading = false,
  className = "",
  ariaLabel,
  preserveIconColor = false,
  href,
  ...rest
}) {
  var _a, _b, _c;
  const hasText = !!children && (typeof children === "string" ? children.trim().length > 0 : React.Children.count(children) > 0);
  const isIconOnly = !!icon && !hasText;
  const variantClassNames = getVariantClass(variant);
  const resolvedVariant = variant == null || variant === "" ? "primary" : variant;
  const dsVariant = VALID_VARIANTS.includes(resolvedVariant) ? resolvedVariant : "primary";
  const sizeKey = (size != null ? size : "lg") in sizeClasses ? size : "lg";
  const sizeClassNames = isIconOnly ? (_a = iconOnlySizeClasses[sizeKey]) != null ? _a : iconOnlySizeClasses.lg : (_b = sizeClasses[sizeKey]) != null ? _b : sizeClasses.lg;
  const computedAriaLabel = ariaLabel != null ? ariaLabel : isIconOnly ? "Button" : void 0;
  const styleOverrides = {};
  if (backgroundColor)
    styleOverrides.backgroundColor = backgroundColor;
  if (borderColor)
    styleOverrides.borderColor = borderColor;
  if (textColor)
    styleOverrides.color = textColor;
  if (width !== void 0)
    styleOverrides.width = typeof width === "number" ? `${width}px` : width;
  if (height !== void 0)
    styleOverrides.height = typeof height === "number" ? `${height}px` : height;
  if (gradient) {
    styleOverrides["--button-gradient-bg"] = gradient;
    styleOverrides["--button-gradient-hover-bg"] = gradientHover || gradient;
    styleOverrides["--button-gradient-active-bg"] = gradientActive || gradientHover || gradient;
  }
  const hasOverrides = Object.keys(styleOverrides).length > 0;
  const baseClass = [
    "btn-base",
    variantClassNames,
    sizeClassNames,
    loading ? "btn-loading" : "",
    gradient ? "btn-gradient" : "",
    variantClass != null ? variantClass : "",
    (_c = classOverrides.variant) != null ? _c : "",
    rounded !== void 0 ? `btn-rounded-${rounded}` : radiusClass,
    fullWidth || block ? "btn-full-width" : "",
    className
  ].filter(Boolean).join(" ");
  const finalIconWidth = iconWidth != null ? iconWidth : defaultIconConfig.width;
  const finalIconHeight = iconHeight != null ? iconHeight : defaultIconConfig.height;
  const gapPx = Math.min(16, Math.max(0, iconGap));
  const gapSnap = [0, 4, 8, 12, 16].reduce((a, b) => Math.abs(b - gapPx) < Math.abs(a - gapPx) ? b : a);
  const iconGapClass = !hasText || gapSnap === 8 ? "" : iconPosition === "left" ? `btn-icon-gap-right-${gapSnap}` : `btn-icon-gap-left-${gapSnap}`;
  const renderIcon = () => {
    if (!icon)
      return null;
    const wrapperClass = [
      hasText && iconPosition === "left" && "btn-icon-left",
      hasText && iconPosition === "right" && "btn-icon-right",
      iconGapClass
    ].filter(Boolean).join(" ");
    return /* @__PURE__ */ jsx("span", { className: wrapperClass || void 0, children: /* @__PURE__ */ jsx(
      Icon_default,
      {
        src: icon,
        width: finalIconWidth,
        height: finalIconHeight,
        preserveColors: preserveIconColor,
        color: iconColor || "currentColor",
        className: "btn-icon-inner"
      }
    ) });
  };
  const { style: restStyle, ...restWithoutStyle } = rest;
  const mergedStyle = hasOverrides ? { ...restStyle, ...styleOverrides } : restStyle;
  const content = /* @__PURE__ */ jsxs(Fragment, { children: [
    loading && /* @__PURE__ */ jsx("span", { className: "btn-spinner", "aria-hidden": "true" }),
    icon && iconPosition === "left" && renderIcon(),
    children,
    icon && iconPosition === "right" && renderIcon()
  ] });
  const isDisabled = Boolean(rest.disabled) || loading;
  if (href) {
    const { onClick, ...linkRest } = restWithoutStyle;
    return /* @__PURE__ */ jsx(
      "a",
      {
        ...linkRest,
        href: isDisabled ? void 0 : href,
        className: baseClass,
        style: mergedStyle,
        "aria-label": computedAriaLabel != null ? computedAriaLabel : void 0,
        "aria-disabled": isDisabled || void 0,
        "data-variant": dsVariant,
        "data-raw-variant": variant,
        onClick: (e) => {
          if (isDisabled) {
            e.preventDefault();
            e.stopPropagation();
            return;
          }
          onClick == null ? void 0 : onClick(e);
        },
        children: content
      }
    );
  }
  const buttonRest = restWithoutStyle;
  return /* @__PURE__ */ jsx(
    "button",
    {
      ...buttonRest,
      className: baseClass,
      style: mergedStyle,
      disabled: isDisabled,
      "aria-label": computedAriaLabel != null ? computedAriaLabel : void 0,
      "data-variant": dsVariant,
      "data-raw-variant": variant,
      children: content
    }
  );
});
var Button_default = Button;

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
  textColor = "var(--color-text-primary, #0D0D0D)",
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
      border: "2px solid var(--color-bg-surface, #FFFFFF)",
      backgroundColor: statusColor || (status === "online" ? "var(--color-state-success, #28A745)" : status === "busy" ? "var(--color-state-error, #DC3545)" : status === "away" ? "var(--color-state-warning, #FFC107)" : status === "offline" ? "var(--color-text-secondary, #757575)" : "transparent")
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
              background: "var(--color-bg-surface, #FFFFFF)"
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
import React5, { useCallback as useCallback2, useEffect, useId as useId2, useLayoutEffect as useLayoutEffect2, useMemo, useRef as useRef2, useState as useState2 } from "react";
import { createPortal as createPortal2 } from "react-dom";

// src/components/molecules/AppSidebar/AppSidebar.utils.tsx
import React3 from "react";
import { jsx as jsx3, jsxs as jsxs3 } from "react/jsx-runtime";
function cls(...parts) {
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
import React4, { useCallback, useId, useLayoutEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { jsx as jsx4, jsxs as jsxs4 } from "react/jsx-runtime";
function AppSidebarTooltipHost({ collapsed, label, children }) {
  const tipId = useId();
  const [visible, setVisible] = useState(false);
  const [coords, setCoords] = useState({ top: 0, left: 0 });
  const hostRef = useRef(null);
  const position = useCallback(() => {
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
  useLayoutEffect(() => {
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
  const tooltip = visible && typeof document !== "undefined" ? createPortal(
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
import { Fragment as Fragment2, jsx as jsx5, jsxs as jsxs5 } from "react/jsx-runtime";
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
  const baseId = useId2().replace(/:/g, "");
  const panelId = `app-sidebar-panel-${baseId}`;
  const navRef = useRef2(null);
  const drawerFocusSentinel = useRef2(false);
  const prevNarrowRef = useRef2(null);
  const isNarrow = useBelowWidth(collapseBelowWidth, responsive);
  const isMobileDrawerViewport = useBelowWidth(drawerOverlayBelowWidth, responsive);
  const sections = useMemo(
    () => normalizeSections(sectionsProp, itemsProp),
    [sectionsProp, itemsProp]
  );
  const visibleFooterActions = useMemo(() => {
    if (!(footerActions == null ? void 0 : footerActions.length))
      return [];
    if (maxFooterActions == null)
      return footerActions;
    return footerActions.slice(0, Math.max(0, maxFooterActions));
  }, [footerActions, maxFooterActions]);
  const [uncontrolledCollapsed, setUncontrolledCollapsed] = useState2(() => {
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
  useLayoutEffect2(() => {
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
  useLayoutEffect2(() => {
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
  const [uncontrolledActive, setUncontrolledActive] = useState2(defaultActiveItemId);
  const activeItemId = activeItemIdProp !== void 0 ? activeItemIdProp : uncontrolledActive;
  const [internalExpanded, setInternalExpanded] = useState2(() => {
    var _a2, _b2;
    const s = new Set(getInitialExpandedSet(sections));
    defaultExpandedIds == null ? void 0 : defaultExpandedIds.forEach((id) => s.add(id));
    (_b2 = (_a2 = readAppSidebarPersist(persistenceKey)) == null ? void 0 : _a2.expanded) == null ? void 0 : _b2.forEach((id) => s.add(id));
    return s;
  });
  const expandedSet = useMemo(() => {
    if (expandedIdsProp != null)
      return new Set(expandedIdsProp);
    return internalExpanded;
  }, [expandedIdsProp, internalExpanded]);
  useEffect(() => {
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
  useEffect(() => {
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
  const setCollapsed = useCallback2(
    (next) => {
      if (collapsedProp === void 0)
        setUncontrolledCollapsed(next);
      onCollapsedChange == null ? void 0 : onCollapsedChange(next);
    },
    [collapsedProp, onCollapsedChange]
  );
  useEffect(() => {
    if (!showDrawerOverlay || !lockBodyScrollWhenDrawer || typeof document === "undefined")
      return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [showDrawerOverlay, lockBodyScrollWhenDrawer]);
  useEffect(() => {
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
  useLayoutEffect2(() => {
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
  const toggleExpand = useCallback2(
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
  const handleSelect = useCallback2(
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
    const inactiveCls = cls(
      "app-sidebar__link",
      opts.nested && "app-sidebar__link--nested",
      isActive && "app-sidebar__link--active"
    );
    const inner = /* @__PURE__ */ jsxs5(Fragment2, { children: [
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
    const parentInner = /* @__PURE__ */ jsxs5(Fragment2, { children: [
      renderItemIcon(item.icon),
      /* @__PURE__ */ jsx5("span", { className: "app-sidebar__item-label", children: item.label }),
      /* @__PURE__ */ jsx5(
        "span",
        {
          className: cls("app-sidebar__chevron", isOpen && "app-sidebar__chevron--open"),
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
        className: cls(
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
    return /* @__PURE__ */ jsxs5(Fragment2, { children: [
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
    const body = /* @__PURE__ */ jsxs5(Fragment2, { children: [
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
  const backdrop = showDrawerOverlay && typeof document !== "undefined" ? createPortal2(
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
  return /* @__PURE__ */ jsxs5(Fragment2, { children: [
    backdrop,
    /* @__PURE__ */ jsxs5(
      "aside",
      {
        ...rest,
        id: panelId,
        className: cls(
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
          header ? /* @__PURE__ */ jsxs5("div", { className: cls("app-sidebar__header", classNames == null ? void 0 : classNames.header), children: [
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
              header.trailing ? /* @__PURE__ */ jsx5("div", { className: cls("app-sidebar__header-trailing", classNames == null ? void 0 : classNames.headerTrailing), children: header.trailing }) : null
            ] })
          ] }) : showCollapseToggle ? /* @__PURE__ */ jsx5("div", { className: cls("app-sidebar__header", classNames == null ? void 0 : classNames.header), children: /* @__PURE__ */ jsx5(
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
              className: cls("app-sidebar__nav", classNames == null ? void 0 : classNames.nav),
              "aria-label": navLabel,
              children: sections.map((s, i) => renderSection(s, i))
            }
          ),
          footerSlot ? /* @__PURE__ */ jsx5("div", { className: cls("app-sidebar__footer", classNames == null ? void 0 : classNames.footer), children: footerSlot }) : user || visibleFooterActions.length > 0 ? /* @__PURE__ */ jsx5("div", { className: cls("app-sidebar__footer", classNames == null ? void 0 : classNames.footer), children: /* @__PURE__ */ jsxs5(
            "div",
            {
              className: cls(
                "app-sidebar__footer-row",
                footerLayout === "utilitiesFirst" && "app-sidebar__footer-row--utilities-first",
                classNames == null ? void 0 : classNames.footerRow
              ),
              children: [
                profileWrapped ? /* @__PURE__ */ jsx5("div", { className: cls("app-sidebar__footer-profile", classNames == null ? void 0 : classNames.footerProfile), children: profileWrapped }) : null,
                visibleFooterActions.length > 0 ? /* @__PURE__ */ jsx5(
                  "div",
                  {
                    className: cls("app-sidebar__footer-utilities", classNames == null ? void 0 : classNames.footerUtilities),
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
import { useEffect as useEffect3, useId as useId3, useMemo as useMemo2, useRef as useRef4, useState as useState3 } from "react";

// src/components/molecules/AppTopbar/AppTopbarMenu.tsx
import React6, { useEffect as useEffect2, useLayoutEffect as useLayoutEffect3, useRef as useRef3 } from "react";
import { createPortal as createPortal3 } from "react-dom";
import { Fragment as Fragment3, jsx as jsx6, jsxs as jsxs6 } from "react/jsx-runtime";
function cls2(...parts) {
  return parts.filter(Boolean).join(" ");
}
function AppTopbarMenu({ id, open, onClose, triggerRef, items, theme }) {
  const menuRef = useRef3(null);
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
  useLayoutEffect3(() => {
    if (!open)
      return;
    positionMenu();
  }, [open]);
  useEffect2(() => {
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
  useEffect2(() => {
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
  useEffect2(() => {
    if (!open || !menuRef.current)
      return;
    const first = menuRef.current.querySelector(
      'button[role="menuitem"]:not([disabled]), a[role="menuitem"]'
    );
    first == null ? void 0 : first.focus();
  }, [open]);
  if (!open || typeof document === "undefined")
    return null;
  return createPortal3(
    /* @__PURE__ */ jsx6(
      "div",
      {
        ref: menuRef,
        id,
        role: "menu",
        "aria-orientation": "vertical",
        className: cls2("app-topbar-menu", theme === "dark" && "app-topbar-menu--dark"),
        children: items.map((item) => {
          const content = /* @__PURE__ */ jsxs6(Fragment3, { children: [
            item.icon ? /* @__PURE__ */ jsx6("span", { className: "app-topbar-menu__icon", "aria-hidden": true, children: /* @__PURE__ */ jsx6(Icon_default, { src: item.icon, width: 18, height: 18, color: "currentColor", decorative: true }) }) : null,
            /* @__PURE__ */ jsx6("span", { className: "app-topbar-menu__label", children: item.label })
          ] });
          const className = cls2(
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
import { Fragment as Fragment4, jsx as jsx7, jsxs as jsxs7 } from "react/jsx-runtime";
var TOPBAR_SEARCH_ICON = /* @__PURE__ */ jsxs7("svg", { viewBox: "0 0 24 24", width: 18, height: 18, fill: "none", "aria-hidden": true, children: [
  /* @__PURE__ */ jsx7("circle", { cx: "11", cy: "11", r: "7", stroke: "currentColor", strokeWidth: "2" }),
  /* @__PURE__ */ jsx7("path", { d: "M20 20l-4.3-4.3", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round" })
] });
var MENU_ICON = /* @__PURE__ */ jsx7("svg", { viewBox: "0 0 20 20", width: 20, height: 20, fill: "none", "aria-hidden": true, children: /* @__PURE__ */ jsx7("path", { d: "M3 5h14M3 10h14M3 15h14", stroke: "currentColor", strokeWidth: "1.5", strokeLinecap: "round" }) });
function cls3(...parts) {
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
  var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j, _k, _l;
  const rootId = useId3();
  const baseId = rootId.replace(/[^a-zA-Z0-9_-]/g, "");
  const searchInputId = (_a = search == null ? void 0 : search.inputId) != null ? _a : `app-topbar-search-${baseId}`;
  const menuDomId = useMemo2(() => `app-topbar-menu-root-${baseId}`, [baseId]);
  const isNarrow = useBelowWidth(collapseCenterBelowWidth, responsive);
  const hasMenuItems = Boolean(mobileMenuItems && mobileMenuItems.length > 0);
  const showHamburger = isNarrow && (hasMenuItems || Boolean(onMobileMenuClick));
  const hasCenterContent = centerSlot != null || search != null;
  const hideCenterColumn = isNarrow && search != null && centerSlot == null;
  const showCenterCell = hasCenterContent && !hideCenterColumn;
  const [mobileSearchOpen, setMobileSearchOpen] = useState3(false);
  const [menuOpen, setMenuOpen] = useState3(false);
  const menuTriggerWrapRef = useRef4(null);
  useEffect3(() => {
    if (!isNarrow) {
      setMobileSearchOpen(false);
      setMenuOpen(false);
    }
  }, [isNarrow]);
  useEffect3(() => {
    if (!mobileSearchOpen)
      return;
    const onKey = (e) => {
      if (e.key === "Escape")
        setMobileSearchOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [mobileSearchOpen]);
  useEffect3(() => {
    if (!mobileSearchOpen || !hideCenterColumn)
      return;
    const id = requestAnimationFrame(() => {
      var _a2;
      (_a2 = document.getElementById(searchInputId)) == null ? void 0 : _a2.focus();
    });
    return () => cancelAnimationFrame(id);
  }, [mobileSearchOpen, hideCenterColumn, searchInputId]);
  useEffect3(() => {
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
      size: "sm",
      fullWidth: true,
      leftIcon: TOPBAR_SEARCH_ICON,
      leftIconHeight: 18,
      leftIconWidth: 18,
      leftIconColor: "var(--app-topbar-text-muted)",
      showClearButton: (_e = search.showClearButton) != null ? _e : hideCenterColumn,
      containerClassName: "text-input-search-wrapper app-topbar__search"
    }
  ) : null;
  const handleHamburgerClick = () => {
    setMobileSearchOpen(false);
    if (hasMenuItems) {
      setMenuOpen((o) => !o);
      return;
    }
    onMobileMenuClick == null ? void 0 : onMobileMenuClick();
  };
  return /* @__PURE__ */ jsxs7(Fragment4, { children: [
    /* @__PURE__ */ jsxs7(
      "header",
      {
        className: cls3(
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
          /* @__PURE__ */ jsxs7("div", { className: cls3("app-topbar__inner", classNames == null ? void 0 : classNames.inner), children: [
            /* @__PURE__ */ jsxs7("div", { className: cls3("app-topbar__left", classNames == null ? void 0 : classNames.left), children: [
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
              /* @__PURE__ */ jsx7("div", { className: "app-topbar__context", children: /* @__PURE__ */ jsx7(TitleTag, { className: cls3("app-topbar__title", classNames == null ? void 0 : classNames.title), children: title }) })
            ] }),
            showCenterCell ? /* @__PURE__ */ jsx7(
              "div",
              {
                className: cls3(
                  "app-topbar__center",
                  search && !centerSlot && "app-topbar__center--expands",
                  classNames == null ? void 0 : classNames.center
                ),
                children: centerSlot != null ? centerSlot : searchField
              }
            ) : null,
            /* @__PURE__ */ jsxs7("div", { className: cls3("app-topbar__right", classNames == null ? void 0 : classNames.right), children: [
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
                      className: cls3("app-topbar__badge", showCountChip && "app-topbar__badge--count"),
                      "aria-hidden": true,
                      children: showCountChip ? count > 99 ? "99+" : count : null
                    }
                  ) : null
                ] }, action.id);
              }),
              profile ? profile.onClick ? /* @__PURE__ */ jsx7(
                "button",
                {
                  type: "button",
                  className: "app-topbar__profile",
                  "aria-label": (_f = profile.menuLabel) != null ? _f : profile.name ? `Account menu for ${profile.name}` : "Account menu",
                  onClick: profile.onClick,
                  children: (_h = profile.avatar) != null ? _h : /* @__PURE__ */ jsx7(Avatar_default, { size: 32, shape: "circle", name: (_g = profile.name) != null ? _g : "User", ...profile.avatarProps })
                }
              ) : /* @__PURE__ */ jsx7(
                "span",
                {
                  className: "app-topbar__profile app-topbar__profile--static",
                  "aria-label": (_j = (_i = profile.menuLabel) != null ? _i : profile.name) != null ? _j : "Profile",
                  children: (_l = profile.avatar) != null ? _l : /* @__PURE__ */ jsx7(Avatar_default, { size: 32, shape: "circle", name: (_k = profile.name) != null ? _k : "User", ...profile.avatarProps })
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
function cls4(...parts) {
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
  const renderInset = (style) => /* @__PURE__ */ jsxs8("div", { className: cls4(DEFAULT_INSET_CLASSNAME, insetClassName), style, children: [
    topbar ? /* @__PURE__ */ jsx8("div", { className: cls4(DEFAULT_TOPBAR_WRAPPER_CLASSNAME, topbarClassName), style: topbarStyle, children: topbarNode }) : null,
    /* @__PURE__ */ jsx8("div", { className: cls4(DEFAULT_CONTENT_CLASSNAME, contentClassName), style: contentStyle, children })
  ] });
  if (!fixed) {
    return /* @__PURE__ */ jsxs8("div", { className: cls4(DEFAULT_ROOT_CLASSNAME, className), children: [
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
  return /* @__PURE__ */ jsxs8("div", { className: cls4(DEFAULT_ROOT_CLASSNAME, className), children: [
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
  Button_default,
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
//# sourceMappingURL=chunk-G6PBIJP2.mjs.map