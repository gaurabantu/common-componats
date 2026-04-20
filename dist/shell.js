"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/entries/shell.ts
var shell_exports = {};
__export(shell_exports, {
  AppShell: () => AppShell,
  AppSidebar: () => AppSidebar,
  AppTopbar: () => AppTopbar_default,
  DashboardShell: () => DashboardShell_default,
  mergeSidebarTokensStyle: () => mergeSidebarTokensStyle,
  mergeTopbarTokensStyle: () => mergeTopbarTokensStyle,
  readAppSidebarPersist: () => readAppSidebarPersist,
  writeAppSidebarPersist: () => writeAppSidebarPersist
});
module.exports = __toCommonJS(shell_exports);

// src/components/molecules/AppSidebar/index.tsx
var import_react6 = __toESM(require("react"));
var import_react_dom2 = require("react-dom");

// src/components/atoms/Icon/index.tsx
var import_react = __toESM(require("react"));
var import_jsx_runtime = require("react/jsx-runtime");
function resolveSrc(src) {
  if (typeof src === "string")
    return src;
  if (import_react.default.isValidElement(src))
    return null;
  if (typeof src === "object" && src !== null) {
    if ("src" in src && typeof src.src === "string")
      return src.src;
    if ("default" in src && typeof src.default === "string")
      return src.default;
  }
  return null;
}
function isSvgSource(url) {
  const u = url.toLowerCase();
  return u.includes(".svg") || url.startsWith("data:image/svg+xml");
}
function cssUrl(href) {
  return `url(${JSON.stringify(href)})`;
}
var Icon = import_react.default.memo(function Icon2({
  src,
  alt = "",
  color = "currentColor",
  width = 16,
  height = 16,
  className = "",
  style = {},
  preserveColors = false,
  decorative,
  title,
  ...rest
}) {
  const resolvedSrc = resolveSrc(src);
  const isDecorative = decorative != null ? decorative : !alt;
  const wrapperStyle = {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    width: typeof width === "number" ? width : width,
    height: typeof height === "number" ? height : height,
    verticalAlign: "middle",
    lineHeight: 0,
    flexShrink: 0,
    ...style
  };
  const wrapperProps = {
    className,
    style: wrapperStyle,
    role: isDecorative ? void 0 : "img",
    "aria-hidden": isDecorative ? true : void 0,
    "aria-label": isDecorative ? void 0 : alt,
    title: typeof title === "string" ? title : alt || void 0,
    ...rest
  };
  if (import_react.default.isValidElement(src)) {
    const size = typeof width === "number" ? width : 16;
    const childProps = src.props;
    const childStyle = (childProps == null ? void 0 : childProps.style) || {};
    const mergedStyle = {
      width: size,
      height: size,
      color: !preserveColors ? color : void 0,
      ...childStyle
    };
    const child = import_react.default.cloneElement(src, {
      width: size,
      height: size,
      style: mergedStyle
    });
    return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { ...wrapperProps, children: child });
  }
  if (!resolvedSrc) {
    return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { ...wrapperProps });
  }
  const isSvg = isSvgSource(resolvedSrc);
  if (isSvg && !preserveColors) {
    const maskRef = cssUrl(resolvedSrc);
    return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
      "span",
      {
        ...wrapperProps,
        style: {
          ...wrapperStyle,
          display: "inline-block",
          backgroundColor: color,
          WebkitMaskImage: maskRef,
          maskImage: maskRef,
          WebkitMaskRepeat: "no-repeat",
          maskRepeat: "no-repeat",
          WebkitMaskPosition: "center",
          maskPosition: "center",
          WebkitMaskSize: "contain",
          maskSize: "contain"
        }
      }
    );
  }
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { ...wrapperProps, children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
    "img",
    {
      src: resolvedSrc,
      alt: isDecorative ? "" : alt,
      width: typeof width === "number" ? width : void 0,
      height: typeof height === "number" ? height : void 0,
      style: { width, height, objectFit: "contain", display: "block" },
      loading: "lazy",
      decoding: "async"
    }
  ) });
});
var Icon_default = Icon;

// src/components/atoms/Avatar/index.tsx
var import_react2 = __toESM(require("react"));

// src/components/atoms/Avatar/Avatar.config.ts
var defaultAvatarSize = 40;
var defaultStatusPosition = "bottom-right";
var defaultBackgroundColor = "var(--color-accent-lavender-10)";
var defaultIconColor = "var(--color-text-on-accent)";

// src/components/atoms/Avatar/index.tsx
var import_jsx_runtime2 = require("react/jsx-runtime");
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
      return /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
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
      return /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("span", { style: { fontSize: `${size / 2.5}px`, fontWeight: 600 }, children: "?" });
    if (typeof icon === "string") {
      return /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
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
    if (import_react2.default.isValidElement(icon)) {
      return import_react2.default.cloneElement(icon, {
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
  return /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)(
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
        src ? /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
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
        ) : /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
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
        status !== "none" && /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("span", { style: getStatusStyle() })
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

// src/components/molecules/AppSidebar/AppSidebar.utils.tsx
var import_react3 = __toESM(require("react"));
var import_jsx_runtime3 = require("react/jsx-runtime");
function cls(...parts) {
  return parts.filter(Boolean).join(" ");
}
var lockSvg = /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("svg", { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", "aria-hidden": true, children: [
  /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("rect", { x: "5", y: "11", width: "14", height: "10", rx: "2", ry: "2" }),
  /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("path", { d: "M8 11V7a4 4 0 0 1 8 0v4" })
] });
var checkSvg = /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("svg", { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", "aria-hidden": true, children: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("path", { d: "M20 6L9 17l-5-5" }) });
function renderTrailingIcon(trailing, size) {
  if (trailing == null || trailing === "none")
    return null;
  if (trailing === "lock") {
    return /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(Icon_default, { src: lockSvg, decorative: true, width: size, height: size, color: "currentColor", className: "app-sidebar__trailing-icon" });
  }
  if (trailing === "check") {
    return /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(Icon_default, { src: checkSvg, decorative: true, width: size, height: size, color: "currentColor", className: "app-sidebar__trailing-icon" });
  }
  if (import_react3.default.isValidElement(trailing)) {
    return /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("span", { className: "app-sidebar__trailing-custom", children: trailing });
  }
  return /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(Icon_default, { src: trailing, decorative: true, width: size, height: size, className: "app-sidebar__trailing-icon" });
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
var import_react4 = __toESM(require("react"));
var import_react_dom = require("react-dom");
var import_jsx_runtime4 = require("react/jsx-runtime");
function AppSidebarTooltipHost({ collapsed, label, children }) {
  const tipId = (0, import_react4.useId)();
  const [visible, setVisible] = (0, import_react4.useState)(false);
  const [coords, setCoords] = (0, import_react4.useState)({ top: 0, left: 0 });
  const hostRef = (0, import_react4.useRef)(null);
  const position = (0, import_react4.useCallback)(() => {
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
  (0, import_react4.useLayoutEffect)(() => {
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
  const child = import_react4.default.cloneElement(children, {
    "aria-describedby": visible ? tipId : void 0
  });
  const tooltip = visible && typeof document !== "undefined" ? (0, import_react_dom.createPortal)(
    /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
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
  return /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)(
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

// src/components/molecules/AppSidebar/AppSidebar.responsive.ts
var import_react5 = require("react");
function useBelowWidth(collapseBelowWidth, enabled) {
  const q = `(max-width: ${Math.max(0, collapseBelowWidth - 1)}px)`;
  return (0, import_react5.useSyncExternalStore)(
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
var import_jsx_runtime5 = require("react/jsx-runtime");
var NAV_ICON = 24;
var TRAIL_ICON = 24;
var FOOTER_ACTION_ICON = 18;
var chevronRailLeft = /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("svg", { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", "aria-hidden": true, children: /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("path", { d: "M15 6l-6 6 6 6" }) });
var chevronRailRight = /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("svg", { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", "aria-hidden": true, children: /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("path", { d: "M9 6l6 6-6 6" }) });
var chevronNested = /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("svg", { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", "aria-hidden": true, children: /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("path", { d: "M9 6l6 6-6 6" }) });
function renderItemIcon(icon) {
  if (icon == null)
    return null;
  if (import_react6.default.isValidElement(icon)) {
    return /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("span", { className: "app-sidebar__item-icon", children: icon });
  }
  return /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("span", { className: "app-sidebar__item-icon", children: /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(Icon_default, { src: icon, decorative: true, width: NAV_ICON, height: NAV_ICON, color: "currentColor" }) });
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
  const baseId = (0, import_react6.useId)().replace(/:/g, "");
  const panelId = `app-sidebar-panel-${baseId}`;
  const navRef = (0, import_react6.useRef)(null);
  const drawerFocusSentinel = (0, import_react6.useRef)(false);
  const prevNarrowRef = (0, import_react6.useRef)(null);
  const isNarrow = useBelowWidth(collapseBelowWidth, responsive);
  const isMobileDrawerViewport = useBelowWidth(drawerOverlayBelowWidth, responsive);
  const sections = (0, import_react6.useMemo)(
    () => normalizeSections(sectionsProp, itemsProp),
    [sectionsProp, itemsProp]
  );
  const visibleFooterActions = (0, import_react6.useMemo)(() => {
    if (!(footerActions == null ? void 0 : footerActions.length))
      return [];
    if (maxFooterActions == null)
      return footerActions;
    return footerActions.slice(0, Math.max(0, maxFooterActions));
  }, [footerActions, maxFooterActions]);
  const [uncontrolledCollapsed, setUncontrolledCollapsed] = (0, import_react6.useState)(() => {
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
  (0, import_react6.useLayoutEffect)(() => {
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
  (0, import_react6.useLayoutEffect)(() => {
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
  const [uncontrolledActive, setUncontrolledActive] = (0, import_react6.useState)(defaultActiveItemId);
  const activeItemId = activeItemIdProp !== void 0 ? activeItemIdProp : uncontrolledActive;
  const [internalExpanded, setInternalExpanded] = (0, import_react6.useState)(() => {
    var _a2, _b2;
    const s = new Set(getInitialExpandedSet(sections));
    defaultExpandedIds == null ? void 0 : defaultExpandedIds.forEach((id) => s.add(id));
    (_b2 = (_a2 = readAppSidebarPersist(persistenceKey)) == null ? void 0 : _a2.expanded) == null ? void 0 : _b2.forEach((id) => s.add(id));
    return s;
  });
  const expandedSet = (0, import_react6.useMemo)(() => {
    if (expandedIdsProp != null)
      return new Set(expandedIdsProp);
    return internalExpanded;
  }, [expandedIdsProp, internalExpanded]);
  (0, import_react6.useEffect)(() => {
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
  (0, import_react6.useEffect)(() => {
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
  const setCollapsed = (0, import_react6.useCallback)(
    (next) => {
      if (collapsedProp === void 0)
        setUncontrolledCollapsed(next);
      onCollapsedChange == null ? void 0 : onCollapsedChange(next);
    },
    [collapsedProp, onCollapsedChange]
  );
  (0, import_react6.useEffect)(() => {
    if (!showDrawerOverlay || !lockBodyScrollWhenDrawer || typeof document === "undefined")
      return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [showDrawerOverlay, lockBodyScrollWhenDrawer]);
  (0, import_react6.useEffect)(() => {
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
  (0, import_react6.useLayoutEffect)(() => {
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
  const toggleExpand = (0, import_react6.useCallback)(
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
  const handleSelect = (0, import_react6.useCallback)(
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
    const inner = /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)(import_jsx_runtime5.Fragment, { children: [
      renderItemIcon(item.icon),
      /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("span", { className: "app-sidebar__item-label", children: item.label }),
      trailing ? /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(
        "span",
        {
          className: "app-sidebar__trailing-wrap",
          ...item.trailingLabel ? { role: "img", "aria-label": item.trailingLabel } : { "aria-hidden": true },
          children: trailing
        }
      ) : null
    ] });
    const control = item.href && !item.disabled ? /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(
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
    ) : /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(
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
    return /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(AppSidebarTooltipHost, { collapsed, label: item.label, children: control });
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
    const parentInner = /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)(import_jsx_runtime5.Fragment, { children: [
      renderItemIcon(item.icon),
      /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("span", { className: "app-sidebar__item-label", children: item.label }),
      /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(
        "span",
        {
          className: cls("app-sidebar__chevron", isOpen && "app-sidebar__chevron--open"),
          "aria-hidden": true,
          children: chevronNested
        }
      ),
      trailing ? /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(
        "span",
        {
          className: "app-sidebar__trailing-wrap",
          ...item.trailingLabel ? { role: "img", "aria-label": item.trailingLabel } : { "aria-hidden": true },
          children: trailing
        }
      ) : null
    ] });
    const parentBtn = /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(
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
    return /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)(import_jsx_runtime5.Fragment, { children: [
      /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(AppSidebarTooltipHost, { collapsed, label: item.label, children: parentBtn }),
      isOpen && !collapsed ? /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("ul", { id: submenuId, className: "app-sidebar__list app-sidebar__list--nested", role: "list", children: [
        item.children.map((child) => {
          var _a2;
          return /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("li", { className: "app-sidebar__item", children: !((_a2 = child.children) == null ? void 0 : _a2.length) ? renderLeaf(child, level + 1, { nested: true }) : renderBranch(child, level + 1) }, child.id);
        }),
        item.createAction ? /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("li", { className: "app-sidebar__item", children: /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)(
          "button",
          {
            type: "button",
            className: "app-sidebar__create",
            onClick: item.createAction.onClick,
            children: [
              item.createAction.icon ? /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("span", { className: "app-sidebar__item-icon", children: import_react6.default.isValidElement(item.createAction.icon) ? item.createAction.icon : /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(
                Icon_default,
                {
                  src: item.createAction.icon,
                  decorative: true,
                  width: 20,
                  height: 20,
                  color: "currentColor"
                }
              ) }) : /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("span", { "aria-hidden": true, className: "app-sidebar__item-label", style: { flex: "none", width: 24 }, children: "+" }),
              /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("span", { children: item.createAction.label })
            ]
          }
        ) }) : null
      ] }) : null
    ] });
  };
  const renderSection = (section, idx) => /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("div", { className: "app-sidebar__section", "data-tier": section.tier, "data-grouping": section.grouping, children: [
    idx > 0 && section.grouping === "divider" ? /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("div", { role: "separator", className: "app-sidebar__section-divider" }) : null,
    section.grouping === "label" && section.label ? /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("div", { className: "app-sidebar__section-label", children: section.label }) : null,
    /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("ul", { className: "app-sidebar__list", role: "list", children: section.items.map((item) => {
      var _a2;
      return /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("li", { className: "app-sidebar__item", children: !((_a2 = item.children) == null ? void 0 : _a2.length) ? renderLeaf(item, 0, {}) : renderBranch(item, 0) }, item.id);
    }) })
  ] }, section.id);
  const roleLine = (_a = user == null ? void 0 : user.role) != null ? _a : user == null ? void 0 : user.description;
  const profileTip = user && collapsed ? [user.name, roleLine].filter(Boolean).join(" \xB7 ") : "";
  let profileWrapped = null;
  if (user) {
    const body = /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)(import_jsx_runtime5.Fragment, { children: [
      /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("div", { className: "app-sidebar__profile-avatar", children: user.avatar ? user.avatar : /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(Avatar_default, { size: 34, shape: "circle", name: user.name, ...user.avatarProps }) }),
      /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("div", { className: "app-sidebar__profile-text", children: [
        /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("p", { className: "app-sidebar__profile-name", children: user.name }),
        roleLine ? /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("p", { className: "app-sidebar__profile-role", children: roleLine }) : null
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("span", { className: "app-sidebar__profile-arrow", "aria-hidden": true, children: chevronNested })
    ] });
    const control = user.onClick ? /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(
      "button",
      {
        type: "button",
        className: "app-sidebar__profile",
        onClick: user.onClick,
        "aria-label": (_b = user.profileRowLabel) != null ? _b : `${user.name}, open account menu`,
        children: body
      }
    ) : /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(
      "div",
      {
        className: "app-sidebar__profile app-sidebar__profile--static",
        role: "group",
        "aria-label": (_c = user.profileRowLabel) != null ? _c : user.name,
        children: body
      }
    );
    profileWrapped = collapsed && profileTip ? /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(AppSidebarTooltipHost, { collapsed: true, label: profileTip, children: control }) : control;
  }
  const rootStyle = mergeSidebarTokensStyle(tokens, {
    width,
    minWidth: width,
    maxWidth: width,
    ...style
  });
  const backdrop = showDrawerOverlay && typeof document !== "undefined" ? (0, import_react_dom2.createPortal)(
    /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(
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
  return /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)(import_jsx_runtime5.Fragment, { children: [
    backdrop,
    /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)(
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
          header ? /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("div", { className: cls("app-sidebar__header", classNames == null ? void 0 : classNames.header), children: [
            showCollapseToggle ? /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(
              "button",
              {
                type: "button",
                className: "app-sidebar__collapse",
                "aria-label": collapseToggleLabel,
                "aria-expanded": !collapsed,
                "aria-controls": isNarrow ? panelId : void 0,
                onClick: () => setCollapsed(!collapsed),
                children: /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(Icon_default, { src: collapsed ? chevronRailRight : chevronRailLeft, decorative: true, width: 22, height: 22 })
              }
            ) : null,
            /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("div", { className: "app-sidebar__header-body", children: [
              /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("div", { className: "app-sidebar__header-main", children: [
                header.icon ? /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("div", { className: "app-sidebar__header-icon", children: header.icon }) : null,
                /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("div", { className: "app-sidebar__header-text", children: [
                  /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("p", { className: "app-sidebar__title", children: header.title }),
                  header.subtitle ? /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("p", { className: "app-sidebar__subtitle", children: header.subtitle }) : null
                ] })
              ] }),
              header.trailing ? /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("div", { className: cls("app-sidebar__header-trailing", classNames == null ? void 0 : classNames.headerTrailing), children: header.trailing }) : null
            ] })
          ] }) : showCollapseToggle ? /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("div", { className: cls("app-sidebar__header", classNames == null ? void 0 : classNames.header), children: /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(
            "button",
            {
              type: "button",
              className: "app-sidebar__collapse",
              "aria-label": collapseToggleLabel,
              "aria-expanded": !collapsed,
              "aria-controls": isNarrow ? panelId : void 0,
              onClick: () => setCollapsed(!collapsed),
              children: /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(Icon_default, { src: collapsed ? chevronRailRight : chevronRailLeft, decorative: true, width: 22, height: 22 })
            }
          ) }) : null,
          /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(
            "nav",
            {
              ref: navRef,
              className: cls("app-sidebar__nav", classNames == null ? void 0 : classNames.nav),
              "aria-label": navLabel,
              children: sections.map((s, i) => renderSection(s, i))
            }
          ),
          footerSlot ? /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("div", { className: cls("app-sidebar__footer", classNames == null ? void 0 : classNames.footer), children: footerSlot }) : user || visibleFooterActions.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("div", { className: cls("app-sidebar__footer", classNames == null ? void 0 : classNames.footer), children: /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)(
            "div",
            {
              className: cls(
                "app-sidebar__footer-row",
                footerLayout === "utilitiesFirst" && "app-sidebar__footer-row--utilities-first",
                classNames == null ? void 0 : classNames.footerRow
              ),
              children: [
                profileWrapped ? /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("div", { className: cls("app-sidebar__footer-profile", classNames == null ? void 0 : classNames.footerProfile), children: profileWrapped }) : null,
                visibleFooterActions.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(
                  "div",
                  {
                    className: cls("app-sidebar__footer-utilities", classNames == null ? void 0 : classNames.footerUtilities),
                    role: "group",
                    "aria-label": "Utility actions",
                    children: visibleFooterActions.map((action) => {
                      const iconNode = import_react6.default.isValidElement(action.icon) ? action.icon : /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(
                        Icon_default,
                        {
                          src: action.icon,
                          decorative: true,
                          width: FOOTER_ACTION_ICON,
                          height: FOOTER_ACTION_ICON,
                          color: "currentColor"
                        }
                      );
                      const node = action.href ? /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(
                        "a",
                        {
                          href: action.href,
                          className: "app-sidebar__action",
                          "aria-label": action.label,
                          onClick: action.onClick,
                          children: iconNode
                        }
                      ) : /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(
                        "button",
                        {
                          type: "button",
                          className: "app-sidebar__action",
                          "aria-label": action.label,
                          onClick: action.onClick,
                          children: iconNode
                        }
                      );
                      return /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(AppSidebarTooltipHost, { collapsed, label: action.label, children: node }, action.id);
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

// src/components/molecules/DashboardShell/DashboardShell.tsx
var import_react11 = __toESM(require("react"));

// src/components/molecules/AppTopbar/index.tsx
var import_react10 = require("react");

// src/components/atoms/Button/index.tsx
var import_react7 = __toESM(require("react"));

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
var import_jsx_runtime6 = require("react/jsx-runtime");
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
var Button = import_react7.default.memo(function Button2({
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
  const hasText = !!children && (typeof children === "string" ? children.trim().length > 0 : import_react7.default.Children.count(children) > 0);
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
    return /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("span", { className: wrapperClass || void 0, children: /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(
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
  const content = /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)(import_jsx_runtime6.Fragment, { children: [
    loading && /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("span", { className: "btn-spinner", "aria-hidden": "true" }),
    icon && iconPosition === "left" && renderIcon(),
    children,
    icon && iconPosition === "right" && renderIcon()
  ] });
  const isDisabled = Boolean(rest.disabled) || loading;
  if (href) {
    const { onClick, ...linkRest } = restWithoutStyle;
    return /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(
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
  return /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(
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

// src/components/atoms/TextInput/TextInput.tsx
var import_react8 = require("react");

// src/utils/uiPanValidators.ts
var EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
var PAN_REGEX = /^[A-Z]{5}\d{4}[A-Z]$/;
var AADHAAR_REGEX = /^\d{12}$/;
var TAN_REGEX = /^[A-Z]{4}\d{5}[A-Z]$/;
var PASSPORT_REGEX = /^[A-Z][1-9]\d{6}$/i;
var PINCODE_REGEX = /^\d{6}$/;
var ENTITY_NAME_REGEX = /^[A-Za-z0-9 .,&()'/-]{2,100}$/;
function toDigits(value) {
  return (value != null ? value : "").replace(/\D/g, "");
}
function isValidEmail(value) {
  return EMAIL_REGEX.test((value != null ? value : "").trim());
}
function isMobile(value, isdCode = "+91") {
  const digits = toDigits(value);
  if (isdCode === "+91") {
    return /^[6-9]\d{9}$/.test(digits);
  }
  return /^\d{6,15}$/.test(digits);
}
function isPanNumber(value) {
  return PAN_REGEX.test((value != null ? value : "").trim().toUpperCase());
}
function isAadhaar(value) {
  return AADHAAR_REGEX.test(toDigits(value));
}
function isAlphanumeric(value) {
  return /^[A-Za-z0-9 ]+$/.test((value != null ? value : "").trim());
}
function isNumeric(value) {
  return /^\d+$/.test((value != null ? value : "").trim());
}
function isPincode(value) {
  return PINCODE_REGEX.test(toDigits(value));
}
function isAlphabetic(value) {
  return /^[A-Za-z ]+$/.test((value != null ? value : "").trim());
}
function isAcknowledgementNumber(value) {
  return /^[A-Z0-9]{8,20}$/.test((value != null ? value : "").trim().toUpperCase());
}
function isTAN(value) {
  return TAN_REGEX.test((value != null ? value : "").trim().toUpperCase());
}
function isIndianPassport(value) {
  return PASSPORT_REGEX.test((value != null ? value : "").trim().toUpperCase());
}
function isIndianTIN(value) {
  return /^[A-Z0-9]{8,20}$/.test((value != null ? value : "").trim().toUpperCase());
}
function isValidSTDCode(value) {
  return /^0?\d{2,5}$/.test(toDigits(value));
}
function isValidLandlineNumber(value) {
  return /^\d{6,11}$/.test(toDigits(value));
}
function isEntityName(value) {
  return ENTITY_NAME_REGEX.test((value != null ? value : "").trim());
}
var Masker = class {
  constructor(visibleCount = 4, options = {}) {
    var _a, _b;
    this.visibleCount = Math.max(0, visibleCount);
    this.options = {
      maskChar: (_a = options.maskChar) != null ? _a : "*",
      maskFrom: (_b = options.maskFrom) != null ? _b : "start",
      maskPattern: options.maskPattern
    };
  }
  maskString(value) {
    const input = value != null ? value : "";
    if (!input)
      return "";
    if (input.length <= this.visibleCount)
      return input;
    const maskLength = input.length - this.visibleCount;
    const masked = this.options.maskChar.repeat(maskLength);
    if (this.options.maskFrom === "end") {
      return `${input.slice(0, this.visibleCount)}${masked}`;
    }
    return `${masked}${input.slice(-this.visibleCount)}`;
  }
};

// src/assets/visibility_on.svg
var visibility_on_default = 'data:image/svg+xml,<svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">%0A<mask id="mask0_2141_81048" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="18" height="18">%0A<rect width="18" height="18" fill="%23D9D9D9"/>%0A</mask>%0A<g mask="url(%23mask0_2141_81048)">%0A<path d="M9.0022 11.5577C9.85208 11.5577 10.5739 11.2603 11.1676 10.6654C11.7614 10.0706 12.0583 9.34819 12.0583 8.49831C12.0583 7.64844 11.7608 6.92662 11.166 6.33287C10.5711 5.73912 9.8487 5.44225 8.99883 5.44225C8.14895 5.44225 7.42714 5.73969 6.83339 6.33456C6.23964 6.92944 5.94277 7.65181 5.94277 8.50169C5.94277 9.35156 6.2402 10.0734 6.83508 10.6671C7.42995 11.2609 8.15233 11.5577 9.0022 11.5577ZM9.00052 10.525C8.43802 10.525 7.95989 10.3281 7.56614 9.93438C7.17239 9.54063 6.97552 9.0625 6.97552 8.5C6.97552 7.9375 7.17239 7.45938 7.56614 7.06563C7.95989 6.67188 8.43802 6.475 9.00052 6.475C9.56302 6.475 10.0411 6.67188 10.4349 7.06563C10.8286 7.45938 11.0255 7.9375 11.0255 8.5C11.0255 9.0625 10.8286 9.54063 10.4349 9.93438C10.0411 10.3281 9.56302 10.525 9.00052 10.525ZM9.00052 13.75C7.42164 13.75 5.97764 13.3288 4.66852 12.4864C3.35939 11.6442 2.31445 10.5361 1.5337 9.16206C1.4712 9.05431 1.42552 8.94575 1.39664 8.83638C1.36789 8.727 1.35352 8.61475 1.35352 8.49963C1.35352 8.3845 1.36789 8.27237 1.39664 8.16325C1.42552 8.05412 1.4712 7.94569 1.5337 7.83794C2.31445 6.46394 3.35939 5.35581 4.66852 4.51356C5.97764 3.67119 7.42164 3.25 9.00052 3.25C10.5794 3.25 12.0234 3.67119 13.3325 4.51356C14.6416 5.35581 15.6866 6.46394 16.4673 7.83794C16.5298 7.94569 16.5755 8.05425 16.6044 8.16362C16.6331 8.273 16.6475 8.38525 16.6475 8.50037C16.6475 8.6155 16.6331 8.72762 16.6044 8.83675C16.5755 8.94587 16.5298 9.05431 16.4673 9.16206C15.6866 10.5361 14.6416 11.6442 13.3325 12.4864C12.0234 13.3288 10.5794 13.75 9.00052 13.75ZM9.00052 12.625C10.413 12.625 11.7099 12.2531 12.8911 11.5094C14.0724 10.7656 14.9755 9.7625 15.6005 8.5C14.9755 7.2375 14.0724 6.23438 12.8911 5.49062C11.7099 4.74687 10.413 4.375 9.00052 4.375C7.58802 4.375 6.29114 4.74687 5.10989 5.49062C3.92864 6.23438 3.02552 7.2375 2.40052 8.5C3.02552 9.7625 3.92864 10.7656 5.10989 11.5094C6.29114 12.2531 7.58802 12.625 9.00052 12.625Z" fill="%23212121"/>%0A</g>%0A</svg>%0A';

// src/assets/visibility_off.svg
var visibility_off_default = 'data:image/svg+xml,<svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">%0A<mask id="mask0_8283_202257" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="18" height="18">%0A<rect width="18" height="18" fill="%23D9D9D9"/>%0A</mask>%0A<g mask="url(%23mask0_8283_202257)">%0A<path d="M11.1601 6.46375C11.4649 6.76862 11.7004 7.13906 11.8668 7.57506C12.0332 8.01119 12.0961 8.44894 12.0556 8.88831C12.0556 9.03256 12.0037 9.15469 11.9 9.25469C11.7961 9.35469 11.6721 9.40469 11.5278 9.40469C11.3836 9.40469 11.2614 9.35469 11.1614 9.25469C11.0614 9.15469 11.0114 9.03256 11.0114 8.88831C11.0596 8.55856 11.0324 8.24606 10.9301 7.95081C10.8277 7.65569 10.6702 7.40187 10.4577 7.18937C10.2452 6.97687 9.989 6.81556 9.689 6.70544C9.389 6.59531 9.07262 6.56669 8.73987 6.61956C8.59562 6.62444 8.47112 6.57612 8.36637 6.47462C8.2615 6.37325 8.20669 6.25044 8.20194 6.10619C8.19706 5.96194 8.24344 5.83737 8.34106 5.7325C8.43869 5.62775 8.55962 5.573 8.70387 5.56825C9.14037 5.51825 9.57906 5.57519 10.0199 5.73906C10.4608 5.90306 10.8409 6.14462 11.1601 6.46375ZM9.00238 4.4965C8.736 4.4965 8.47469 4.5095 8.21844 4.5355C7.96219 4.56137 7.70712 4.60412 7.45325 4.66375C7.29362 4.6965 7.14988 4.67369 7.022 4.59531C6.89412 4.51694 6.80619 4.40419 6.75819 4.25706C6.71006 4.10519 6.72594 3.96075 6.80581 3.82375C6.88556 3.68675 7.00137 3.60187 7.15325 3.56912C7.45525 3.497 7.76031 3.44606 8.06844 3.41631C8.37669 3.38644 8.688 3.3715 9.00238 3.3715C10.6139 3.3715 12.0942 3.79025 13.4433 4.62775C14.7923 5.46525 15.8298 6.59844 16.5556 8.02731C16.6056 8.12244 16.6419 8.21831 16.6646 8.31494C16.6872 8.41156 16.6985 8.51375 16.6985 8.6215C16.6985 8.72925 16.6891 8.83144 16.6704 8.92806C16.6516 9.02469 16.6173 9.12056 16.5673 9.21569C16.3375 9.69644 16.0582 10.1447 15.7293 10.5606C15.4004 10.9765 15.0384 11.3585 14.6431 11.7066C14.5269 11.8105 14.394 11.8535 14.2445 11.8356C14.0949 11.8179 13.972 11.7431 13.8759 11.6114C13.7798 11.4796 13.7399 11.3383 13.7563 11.1874C13.7726 11.0364 13.8389 10.909 13.9552 10.8051C14.2937 10.4984 14.6024 10.1631 14.8813 9.79919C15.1601 9.43519 15.4005 9.04262 15.6024 8.6215C14.9774 7.359 14.0743 6.35587 12.893 5.61212C11.7118 4.86837 10.4149 4.4965 9.00238 4.4965ZM9.00238 13.8715C7.4235 13.8715 5.97638 13.4496 4.661 12.6059C3.34563 11.7621 2.3 10.6508 1.52413 9.27194C1.46163 9.17681 1.41594 9.07344 1.38706 8.96181C1.35819 8.85031 1.34375 8.73687 1.34375 8.6215C1.34375 8.50612 1.35625 8.39456 1.38125 8.28681C1.40625 8.17919 1.45 8.07394 1.5125 7.97106C1.79138 7.46144 2.10725 6.97606 2.46012 6.51494C2.813 6.05394 3.21875 5.64075 3.67738 5.27537L1.98406 3.57044C1.88031 3.45894 1.82912 3.3265 1.8305 3.17312C1.832 3.01975 1.88706 2.88875 1.99569 2.78013C2.10431 2.6715 2.23606 2.61719 2.39094 2.61719C2.54569 2.61719 2.67738 2.6715 2.786 2.78013L15.2188 15.2129C15.3226 15.3167 15.3777 15.4453 15.3839 15.5986C15.3902 15.7519 15.3351 15.8868 15.2188 16.0032C15.1101 16.1118 14.9784 16.1661 14.8235 16.1661C14.6688 16.1661 14.5371 16.1118 14.4284 16.0032L11.789 13.3868C11.3466 13.5579 10.892 13.6815 10.4251 13.7575C9.95837 13.8335 9.48413 13.8715 9.00238 13.8715ZM4.46788 6.06569C4.02838 6.40519 3.63338 6.78906 3.28288 7.21731C2.93238 7.64569 2.63888 8.11375 2.40237 8.6215C3.02737 9.884 3.9305 10.8871 5.11175 11.6309C6.293 12.3746 7.58988 12.7465 9.00238 12.7465C9.3245 12.7465 9.64156 12.7249 9.95356 12.6816C10.2656 12.6384 10.5754 12.5716 10.8832 12.4812L9.93406 11.509C9.78219 11.5754 9.6305 11.6203 9.479 11.6438C9.32763 11.6674 9.16875 11.6792 9.00238 11.6792C8.15138 11.6792 7.429 11.3824 6.83525 10.7886C6.2415 10.1949 5.94462 9.4725 5.94462 8.6215C5.94462 8.45512 5.95762 8.29625 5.98362 8.14487C6.00962 7.99337 6.05337 7.84169 6.11487 7.68981L4.46788 6.06569Z" fill="%23212121"/>%0A</g>%0A</svg>%0A';

// src/assets/error.svg
var error_default = 'data:image/svg+xml,<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">%0A<mask id="mask0_992_11734" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="16" height="16">%0A<rect width="16" height="16" fill="%23D9D9D9"/>%0A</mask>%0A<g mask="url(%23mask0_992_11734)">%0A<path d="M8.00065 11.334C8.18954 11.334 8.34798 11.27 8.47598 11.142C8.60354 11.0144 8.66732 10.8562 8.66732 10.6673C8.66732 10.4784 8.60354 10.32 8.47598 10.192C8.34798 10.0644 8.18954 10.0007 8.00065 10.0007C7.81176 10.0007 7.65354 10.0644 7.52598 10.192C7.39798 10.32 7.33398 10.4784 7.33398 10.6673C7.33398 10.8562 7.39798 11.0144 7.52598 11.142C7.65354 11.27 7.81176 11.334 8.00065 11.334ZM7.33398 8.66732H8.66732V4.66732H7.33398V8.66732ZM8.00065 14.6673C7.07843 14.6673 6.21176 14.4922 5.40065 14.142C4.58954 13.7922 3.88398 13.3173 3.28398 12.7173C2.68398 12.1173 2.2091 11.4118 1.85932 10.6006C1.5091 9.78954 1.33398 8.92287 1.33398 8.00065C1.33398 7.07843 1.5091 6.21176 1.85932 5.40065C2.2091 4.58954 2.68398 3.88398 3.28398 3.28398C3.88398 2.68398 4.58954 2.20887 5.40065 1.85865C6.21176 1.50887 7.07843 1.33398 8.00065 1.33398C8.92287 1.33398 9.78954 1.50887 10.6006 1.85865C11.4118 2.20887 12.1173 2.68398 12.7173 3.28398C13.3173 3.88398 13.7922 4.58954 14.142 5.40065C14.4922 6.21176 14.6673 7.07843 14.6673 8.00065C14.6673 8.92287 14.4922 9.78954 14.142 10.6006C13.7922 11.4118 13.3173 12.1173 12.7173 12.7173C12.1173 13.3173 11.4118 13.7922 10.6006 14.142C9.78954 14.4922 8.92287 14.6673 8.00065 14.6673ZM8.00065 13.334C9.48954 13.334 10.7507 12.8173 11.784 11.784C12.8173 10.7507 13.334 9.48954 13.334 8.00065C13.334 6.51176 12.8173 5.25065 11.784 4.21732C10.7507 3.18398 9.48954 2.66732 8.00065 2.66732C6.51176 2.66732 5.25065 3.18398 4.21732 4.21732C3.18398 5.25065 2.66732 6.51176 2.66732 8.00065C2.66732 9.48954 3.18398 10.7507 4.21732 11.784C5.25065 12.8173 6.51176 13.334 8.00065 13.334Z" fill="%23D4362E"/>%0A</g>%0A</svg>%0A';

// src/assets/success.svg
var success_default = 'data:image/svg+xml,<svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">%0A<path d="M6.66667 13.3333C5.74444 13.3333 4.87778 13.1582 4.06667 12.808C3.25556 12.4582 2.55 11.9833 1.95 11.3833C1.35 10.7833 0.875111 10.0778 0.525333 9.26667C0.175111 8.45555 0 7.58889 0 6.66667C0 5.74444 0.175111 4.87778 0.525333 4.06667C0.875111 3.25556 1.35 2.55 1.95 1.95C2.55 1.35 3.25556 0.874889 4.06667 0.524667C4.87778 0.174889 5.74444 0 6.66667 0C7.38889 0 8.07222 0.105555 8.71667 0.316667C9.36111 0.527778 9.95555 0.822222 10.5 1.2L9.53333 2.18333C9.11111 1.91667 8.66111 1.70822 8.18333 1.558C7.70555 1.40822 7.2 1.33333 6.66667 1.33333C5.18889 1.33333 3.93067 1.85267 2.892 2.89133C1.85289 3.93044 1.33333 5.18889 1.33333 6.66667C1.33333 8.14444 1.85289 9.40289 2.892 10.442C3.93067 11.4807 5.18889 12 6.66667 12C8.14444 12 9.40289 11.4807 10.442 10.442C11.4807 9.40289 12 8.14444 12 6.66667C12 6.46667 11.9889 6.26667 11.9667 6.06667C11.9444 5.86667 11.9111 5.67222 11.8667 5.48333L12.95 4.4C13.0722 4.75556 13.1667 5.12222 13.2333 5.5C13.3 5.87778 13.3333 6.26667 13.3333 6.66667C13.3333 7.58889 13.1582 8.45555 12.808 9.26667C12.4582 10.0778 11.9833 10.7833 11.3833 11.3833C10.7833 11.9833 10.0778 12.4582 9.26667 12.808C8.45555 13.1582 7.58889 13.3333 6.66667 13.3333ZM5.73333 9.73333L2.9 6.9L3.83333 5.96667L5.73333 7.86667L12.4 1.18333L13.3333 2.11667L5.73333 9.73333Z" fill="%233C9718"/>%0A</svg>%0A';

// src/assets/close.svg
var close_default = 'data:image/svg+xml,<svg width="13" height="13" viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg">%0A<path d="M6.34425 7.398L1.27125 12.4713C1.13275 12.6096 0.958667 12.6804 0.749 12.6838C0.5395 12.6869 0.36225 12.6161 0.21725 12.4713C0.0724167 12.3263 0 12.1506 0 11.9443C0 11.7379 0.0724167 11.5623 0.21725 11.4173L5.2905 6.34425L0.21725 1.27125C0.0789167 1.13275 0.00808339 0.958667 0.00475006 0.749001C0.00158339 0.539501 0.0724167 0.36225 0.21725 0.21725C0.36225 0.0724167 0.537917 0 0.74425 0C0.950583 0 1.12625 0.0724167 1.27125 0.21725L6.34425 5.2905L11.4173 0.21725C11.5558 0.0789167 11.7298 0.00808339 11.9395 0.00475006C12.149 0.00158339 12.3263 0.0724167 12.4713 0.21725C12.6161 0.36225 12.6885 0.537917 12.6885 0.74425C12.6885 0.950584 12.6161 1.12625 12.4713 1.27125L7.398 6.34425L12.4713 11.4173C12.6096 11.5558 12.6804 11.7298 12.6838 11.9395C12.6869 12.149 12.6161 12.3263 12.4713 12.4713C12.3263 12.6161 12.1506 12.6885 11.9443 12.6885C11.7379 12.6885 11.5623 12.6161 11.4173 12.4713L6.34425 7.398Z" fill="%23212121"/>%0A</svg>%0A';

// src/assets/search.svg
var search_default = 'data:image/svg+xml,<svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">%0A<mask id="mask0_7433_74974" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="18" height="18">%0A<rect width="18" height="18" fill="%23D9D9D9"/>%0A</mask>%0A<g mask="url(%23mask0_7433_74974)">%0A<path d="M7.14894 11.7119C5.86819 11.7119 4.78356 11.2677 3.89506 10.3794C3.00669 9.49087 2.5625 8.40625 2.5625 7.1255C2.5625 5.84475 3.00669 4.76012 3.89506 3.87162C4.78356 2.98325 5.86819 2.53906 7.14894 2.53906C8.42969 2.53906 9.51431 2.98325 10.4028 3.87162C11.2912 4.76012 11.7354 5.84475 11.7354 7.1255C11.7354 7.66112 11.6455 8.17269 11.4657 8.66019C11.2859 9.14769 11.0459 9.57169 10.7459 9.93219L15.0614 14.2477C15.1653 14.3514 15.2184 14.4819 15.2208 14.6392C15.2232 14.7964 15.1701 14.9294 15.0614 15.038C14.9528 15.1466 14.8211 15.2009 14.6662 15.2009C14.5114 15.2009 14.3797 15.1466 14.2711 15.038L9.95563 10.7225C9.58063 11.0321 9.14937 11.2744 8.66187 11.4494C8.17437 11.6244 7.67006 11.7119 7.14894 11.7119ZM7.14894 10.5871C8.11531 10.5871 8.93381 10.2517 9.60444 9.581C10.2752 8.91037 10.6106 8.09187 10.6106 7.1255C10.6106 6.15912 10.2752 5.34062 9.60444 4.67C8.93381 3.99925 8.11531 3.66387 7.14894 3.66387C6.18256 3.66387 5.36406 3.99925 4.69344 4.67C4.02269 5.34062 3.68731 6.15912 3.68731 7.1255C3.68731 8.09187 4.02269 8.91037 4.69344 9.581C5.36406 10.2517 6.18256 10.5871 7.14894 10.5871Z" fill="%23212121"/>%0A</g>%0A</svg>%0A';

// src/components/atoms/TextInput/TextInput.tsx
var import_jsx_runtime7 = require("react/jsx-runtime");
var TextInput = (0, import_react8.forwardRef)(({
  id: idProp,
  label = "",
  type = "text",
  placeholder,
  validation = "none",
  required = false,
  value = "",
  onChange,
  onErrorChange,
  onVerifiedChange,
  errorMessage = "",
  maxLength,
  fullWidth = true,
  disabled = false,
  borderColorClass = "",
  className = "",
  rounded = "3",
  ariaLabel,
  pattern,
  showVerifiedStatus = false,
  isVerified = false,
  mask = false,
  maskOptions = {},
  showToggleIcon = false,
  disableClipboard = false,
  toggleIcon = visibility_on_default,
  toggleOffIcon = visibility_off_default,
  errorIcon = error_default,
  verifiedIcon = success_default,
  toggleIconSize = 18,
  statusIconSize = 16,
  isdCode = "+91",
  allowClear = false,
  onClear,
  prefix,
  suffix,
  showCount = false,
  onPressEnter,
  status: statusProp,
  variant = "outlined",
  size = "md",
  ...rest
}, ref) => {
  var _a, _b;
  const [error, setError] = (0, import_react8.useState)(null);
  const [verified, setVerified] = (0, import_react8.useState)(isVerified);
  const [showValue, setShowValue] = (0, import_react8.useState)(false);
  const [displayValue, setDisplayValue] = (0, import_react8.useState)(value || "");
  const [isFocused, setIsFocused] = (0, import_react8.useState)(false);
  const actualValueRef = (0, import_react8.useRef)(value || "");
  const inputRef = (0, import_react8.useRef)(null);
  (0, import_react8.useImperativeHandle)(ref, () => inputRef.current, []);
  const validationFunctions = {
    name: isAlphabetic,
    email: isValidEmail,
    mobile: (val) => isMobile(val, isdCode),
    businessPID: isPanNumber,
    businessAID: isAadhaar,
    businessTAN: (val) => isTAN(val.toUpperCase()),
    acknowledgementNumber: (val) => isAcknowledgementNumber(val.toUpperCase()),
    businessPassport: isIndianPassport,
    businessTIN: isIndianTIN,
    stdCode: isValidSTDCode,
    landline: isValidLandlineNumber,
    alphanumeric: isAlphanumeric,
    numeric: isNumeric,
    pincode: isPincode,
    entityName: isEntityName
  };
  const reactId = (0, import_react8.useId)();
  const inputId = (idProp == null ? void 0 : idProp.trim()) ? idProp : `text-input-${reactId}`;
  (0, import_react8.useEffect)(() => {
    actualValueRef.current = value || "";
    updateDisplayValue(value || "");
  }, [value]);
  (0, import_react8.useEffect)(() => {
    setVerified(isVerified);
  }, [isVerified]);
  (0, import_react8.useEffect)(() => {
    if (errorMessage && actualValueRef.current) {
      setError(errorMessage);
    } else if (!errorMessage) {
      setError(null);
    }
  }, [errorMessage]);
  const resolvedMaxLength = (0, import_react8.useMemo)(() => {
    if (maxLength !== void 0)
      return maxLength;
    switch (validation) {
      case "name":
        return 50;
      case "email":
        return 100;
      case "mobile": {
        if (isdCode === "+91") {
          return 10;
        }
        return 15;
      }
      case "businessPID":
        return 10;
      case "businessAID":
        return 12;
      case "businessTAN":
        return 10;
      case "businessPassport":
        return 8;
      case "businessTIN":
        return 20;
      case "acknowledgementNumber":
        return 20;
      case "stdCode":
        return 8;
      case "landline":
        return 15;
      case "numeric":
        return 200;
      case "alphanumeric":
        return 500;
      case "pincode":
        return 6;
      case "headerSearch":
        return 200;
      default:
        return 255;
    }
  }, [maxLength, validation, isdCode]);
  const maskValue = (val) => {
    if (!mask || !val)
      return val;
    try {
      const masker = new Masker(4, {
        maskChar: "*",
        maskFrom: "start",
        maskPattern: [1, 1],
        ...maskOptions
      });
      const maskedString = masker.maskString(val);
      if (validation === "businessAID") {
        return formatAadhaarDisplay(maskedString);
      }
      return maskedString;
    } catch (error2) {
      console.warn("Masking failed, showing plain text");
      return val;
    }
  };
  const normalizeSpaces = (value2) => {
    return value2.replace(/\s{2,}/g, " ");
  };
  const updateDisplayValue = (val) => {
    if (mask && !showValue && val) {
      setDisplayValue(maskValue(val));
    } else {
      setDisplayValue(formatDisplayValue(val));
    }
  };
  const removeAllSpaces = (input) => {
    return input.replace(/\s/g, "");
  };
  const trimSpaces = (input) => {
    return input.trim();
  };
  const formatAadhaarDisplay = (val) => {
    const cleaned = removeAllSpaces(val);
    if (cleaned.length <= 4)
      return cleaned;
    if (cleaned.length <= 8)
      return `${cleaned.slice(0, 4)} ${cleaned.slice(4)}`;
    return `${cleaned.slice(0, 4)} ${cleaned.slice(4, 8)} ${cleaned.slice(8, 12)}`;
  };
  const formatDisplayValue = (val) => {
    if (validation === "custom") {
      return val;
    }
    const cleaned = removeAllSpaces(val);
    if (validation === "mobile") {
      return cleaned.toUpperCase();
    }
    if (validation === "businessAID") {
      return formatAadhaarDisplay(cleaned);
    }
    if (validation === "businessPID") {
      return cleaned.toUpperCase();
    }
    if (validation === "businessTIN") {
      return cleaned.toUpperCase();
    }
    if (validation === "businessTAN") {
      return cleaned.toUpperCase();
    }
    if (validation === "acknowledgementNumber") {
      return cleaned.toUpperCase();
    }
    if (validation === "stdCode" || validation === "landline") {
      return cleaned;
    }
    if (validation === "pincode") {
      return cleaned;
    }
    if (validation === "numeric") {
      return cleaned;
    }
    if (validation === "email") {
      return trimSpaces(val);
    }
    if (validation === "name") {
      return normalizeSpaces(val);
    }
    if (validation === "alphanumeric") {
      return normalizeSpaces(val);
    }
    if (validation === "entityName") {
      return val;
    }
    return trimSpaces(val);
  };
  const resolvePattern = (pattern2) => {
    if (!pattern2)
      return null;
    if (pattern2 instanceof RegExp)
      return pattern2;
    try {
      return new RegExp(pattern2);
    } catch (e) {
      console.warn("Invalid regex pattern:", pattern2);
      return null;
    }
  };
  const validateInput = (val) => {
    if (validation === "none" || validation === "headerSearch")
      return null;
    let cleanedVal = val;
    if (validation === "custom") {
      cleanedVal = trimSpaces(val);
    } else {
      cleanedVal = removeAllSpaces(val);
    }
    if (cleanedVal === "")
      return null;
    let isValid = false;
    const validatorFn = validationFunctions[validation];
    if (validatorFn) {
      if (validation === "entityName") {
        isValid = validatorFn(val);
      } else {
        isValid = validatorFn(cleanedVal);
      }
      if (!isValid) {
        if (validation === "mobile") {
          if (isdCode === "+91") {
            return errorMessage || "Invalid mobile number";
          } else {
            return errorMessage || "Invalid mobile number";
          }
        }
        if (validation === "businessAID")
          return errorMessage || "Invalid Aadhaar format";
        if (validation === "businessPID")
          return errorMessage || "Invalid PAN format";
        if (validation === "businessTAN")
          return errorMessage || "Invalid TAN format";
        if (validation === "businessPassport")
          return errorMessage || "Invalid Passport format";
        if (validation === "businessTIN")
          return errorMessage || "Invalid TIN format";
        if (validation === "acknowledgementNumber")
          return errorMessage || "Invalid Acknowledgement Number format";
        if (validation === "stdCode")
          return errorMessage || "Invalid STD code";
        if (validation === "landline")
          return errorMessage || "Invalid landline number";
        if (validation === "entityName")
          return errorMessage || "Invalid Entity Name";
        return errorMessage || `Invalid ${validation} format`;
      }
    } else if (validation === "custom" && pattern) {
      const regex = resolvePattern(pattern);
      if (!regex)
        return "Invalid pattern";
      isValid = regex.test(cleanedVal);
      if (!isValid)
        return errorMessage || "Invalid format";
    } else {
      return null;
    }
    if (showVerifiedStatus && isValid && cleanedVal !== "") {
      setVerified(true);
      onVerifiedChange == null ? void 0 : onVerifiedChange(true);
    } else if (showVerifiedStatus && !isValid) {
      setVerified(false);
      onVerifiedChange == null ? void 0 : onVerifiedChange(false);
    }
    return null;
  };
  const handleClipboardEvents = (e) => {
    if (disableClipboard) {
      e.preventDefault();
      return false;
    }
    return true;
  };
  const handleContextMenu = (e) => {
    if (disableClipboard) {
      e.preventDefault();
    }
  };
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      onPressEnter == null ? void 0 : onPressEnter(e);
    }
    if (disableClipboard) {
      const isCtrlPressed = e.ctrlKey || e.metaKey;
      if (isCtrlPressed) {
        const key = e.key.toLowerCase();
        if (key === "c" || key === "x" || key === "v") {
          e.preventDefault();
        }
      }
      if (e.key === "F10" || e.shiftKey && e.key === "F10") {
        e.preventDefault();
      }
    }
  };
  const handleClear = (e) => {
    var _a2;
    e.preventDefault();
    e.stopPropagation();
    if (disabled)
      return;
    actualValueRef.current = "";
    setDisplayValue("");
    setError(null);
    setShowValue(false);
    onChange == null ? void 0 : onChange("");
    onErrorChange == null ? void 0 : onErrorChange(null);
    onClear == null ? void 0 : onClear();
    (_a2 = inputRef.current) == null ? void 0 : _a2.focus();
  };
  const handleChange = (e) => {
    if (disabled)
      return;
    let inputValue = e.target.value;
    if (mask && !showValue) {
      const currentActual = actualValueRef.current;
      const currentDisplay = displayValue;
      const inputWithoutSpaces = removeAllSpaces(inputValue);
      const currentWithoutSpaces = removeAllSpaces(currentDisplay);
      if (inputWithoutSpaces.length < currentWithoutSpaces.length) {
        const newActual = currentActual.slice(0, inputWithoutSpaces.length);
        actualValueRef.current = newActual;
        updateDisplayValue(newActual);
        onChange == null ? void 0 : onChange(newActual);
      } else if (inputWithoutSpaces.length > currentWithoutSpaces.length) {
        const newChars = inputWithoutSpaces.slice(currentWithoutSpaces.length);
        if ((validation === "mobile" || validation === "businessAID" || validation === "pincode" || validation === "numeric" || validation === "stdCode" || validation === "landline") && !/^\d+$/.test(newChars)) {
          return;
        }
        const newActual = (currentActual + newChars).slice(0, resolvedMaxLength);
        actualValueRef.current = newActual;
        updateDisplayValue(newActual);
        onChange == null ? void 0 : onChange(newActual);
      }
    } else {
      let cleanedInput = inputValue;
      if (validation === "name") {
        cleanedInput = normalizeSpaces(cleanedInput);
      } else if (validation === "alphanumeric" || validation === "none") {
        cleanedInput = normalizeSpaces(cleanedInput);
      } else if (validation === "custom") {
        cleanedInput = inputValue;
      } else {
        cleanedInput = removeAllSpaces(cleanedInput);
      }
      if ((validation === "businessAID" || validation === "pincode" || validation === "numeric" || validation === "stdCode" || validation === "landline") && cleanedInput && !/^\d+$/.test(cleanedInput)) {
        return;
      }
      if (validation === "businessTIN") {
        if (cleanedInput && !/^[a-zA-Z0-9]*$/.test(cleanedInput))
          return;
        cleanedInput = cleanedInput.toUpperCase();
      }
      if (validation === "businessTAN") {
        if (cleanedInput && !/^[a-zA-Z0-9]*$/.test(cleanedInput))
          return;
        cleanedInput = cleanedInput.toUpperCase();
      }
      if (validation === "acknowledgementNumber") {
        if (cleanedInput && !/^[a-zA-Z0-9]*$/.test(cleanedInput))
          return;
        cleanedInput = cleanedInput.toUpperCase();
      }
      if (validation === "alphanumeric" && cleanedInput && !isAlphanumeric(cleanedInput)) {
        return;
      }
      if (validation === "entityName") {
        cleanedInput = inputValue;
      }
      const actualValue = cleanedInput.slice(0, resolvedMaxLength);
      const formattedDisplayValue = formatDisplayValue(actualValue);
      actualValueRef.current = actualValue;
      setDisplayValue(formattedDisplayValue);
      onChange == null ? void 0 : onChange(actualValue);
    }
    if (showVerifiedStatus && verified) {
      setVerified(false);
      onVerifiedChange == null ? void 0 : onVerifiedChange(false);
    }
    const err = validateInput(actualValueRef.current);
    setError(err);
    onErrorChange == null ? void 0 : onErrorChange(err);
  };
  const handleToggleVisibility = () => {
    const newShowValue = !showValue;
    setShowValue(newShowValue);
    if (newShowValue) {
      const formattedValue = formatDisplayValue(actualValueRef.current);
      setDisplayValue(formattedValue);
    } else {
      setDisplayValue(maskValue(actualValueRef.current));
    }
  };
  const handleBlur = () => {
    setIsFocused(false);
    let actualValue = actualValueRef.current;
    if (validation === "name") {
      const normalized = normalizeSpaces(actualValueRef.current).trim();
      actualValueRef.current = normalized;
      setDisplayValue(normalized);
      actualValue = normalized;
      onChange == null ? void 0 : onChange(normalized);
    }
    if (validation === "custom") {
      const trimmed = actualValueRef.current.trim();
      actualValueRef.current = trimmed;
      setDisplayValue(trimmed);
      actualValue = trimmed;
      onChange == null ? void 0 : onChange(trimmed);
    }
    const err = validateInput(actualValue);
    setError(err);
    onErrorChange == null ? void 0 : onErrorChange(err);
    if (mask && !showValue) {
      setDisplayValue(maskValue(actualValue));
    } else {
      setDisplayValue(formatDisplayValue(actualValue));
    }
  };
  const handleFocus = () => {
    setIsFocused(true);
  };
  const roundedStyle = rounded === "0" ? 0 : rounded === "1" ? "var(--radius-xs, 2px)" : rounded === "2" ? "var(--radius-sm, 3px)" : rounded === "3" ? "var(--radius-base, 4px)" : rounded === "4" ? "var(--radius-md, 6px)" : rounded === "5" ? "var(--radius-lg, 8px)" : "9999px";
  const getInputType = () => {
    if (showValue)
      return "text";
    if (type === "password" && showToggleIcon)
      return "password";
    return type;
  };
  const hasValue = ((_a = displayValue == null ? void 0 : displayValue.trim()) != null ? _a : "") !== "";
  const resolvedStatus = statusProp != null ? statusProp : error ? "error" : verified ? "success" : void 0;
  const sizeConfig = {
    sm: {
      minHeight: 32,
      horizontalPadding: 10,
      addonPadding: 8,
      fontSize: "var(--text-small-size)"
    },
    md: {
      minHeight: 40,
      horizontalPadding: 12,
      addonPadding: 10,
      fontSize: "var(--text-body-size)"
    },
    lg: {
      minHeight: 48,
      horizontalPadding: 14,
      addonPadding: 12,
      fontSize: "var(--text-body-size)"
    }
  };
  const currentSize = sizeConfig[size];
  const shouldShowToggle = showToggleIcon && type === "password";
  const colors = {
    textPrimary: "var(--color-text-primary, #0D0D0D)",
    textSecondary: "var(--color-text-secondary, #757575)",
    bgSurface: "var(--color-bg-surface, #FFFFFF)",
    bgPage: "var(--color-bg-page, #F3F4F6)",
    borderDefault: "var(--color-border-default, #999999)",
    stateError: "var(--color-state-error, #DC3545)",
    stateWarning: "var(--color-state-warning, #FFC107)",
    stateSuccess: "var(--color-state-success, #28A745)"
  };
  const resolvedBorderColor = resolvedStatus === "error" ? colors.stateError : resolvedStatus === "warning" ? colors.stateWarning : resolvedStatus === "success" ? colors.stateSuccess : isFocused ? "var(--button-primary-focus-ring, #3B82F6)" : colors.borderDefault;
  const wrapperStyle = variant === "filled" ? {
    minHeight: currentSize.minHeight,
    borderRadius: roundedStyle,
    boxSizing: "border-box",
    backgroundColor: colors.bgPage,
    border: `1.5px solid ${resolvedBorderColor}`
  } : variant === "borderless" ? {
    minHeight: currentSize.minHeight,
    borderRadius: roundedStyle,
    boxSizing: "border-box",
    backgroundColor: "transparent",
    border: "1px solid transparent"
  } : variant === "underlined" ? {
    minHeight: currentSize.minHeight,
    borderRadius: 0,
    boxSizing: "border-box",
    backgroundColor: "transparent",
    border: "0 solid transparent",
    borderBottomWidth: 1.5,
    borderBottomColor: resolvedBorderColor
  } : {
    minHeight: currentSize.minHeight,
    borderRadius: roundedStyle,
    boxSizing: "border-box",
    backgroundColor: colors.bgSurface,
    border: `1.5px solid ${resolvedBorderColor}`
  };
  const resolvedSuffix = suffix !== void 0 ? suffix : type === "search" ? /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(Icon_default, { src: search_default, alt: "", width: 16, height: 16 }) : null;
  const hasRightAddons = Boolean(resolvedSuffix || allowClear && hasValue && !disabled || shouldShowToggle);
  const charCount = (_b = displayValue == null ? void 0 : displayValue.length) != null ? _b : 0;
  const countMax = validation === "businessAID" ? resolvedMaxLength + 2 : resolvedMaxLength;
  const fieldWrapperStyle = {
    ...wrapperStyle,
    display: "grid",
    alignItems: "center",
    overflow: "hidden",
    width: fullWidth ? "100%" : "auto",
    gridTemplateColumns: `${prefix ? "auto " : ""}minmax(0, 1fr)${hasRightAddons ? " auto" : ""}`,
    transition: "border-color 150ms, box-shadow 150ms, background-color 150ms"
  };
  const inputElementStyle = {
    height: currentSize.minHeight,
    fontSize: currentSize.fontSize,
    lineHeight: 1.5,
    boxSizing: "border-box",
    display: "block",
    width: "100%",
    minWidth: 0,
    margin: 0,
    border: "none",
    outline: "none",
    boxShadow: "none",
    borderRadius: 0,
    background: "transparent",
    appearance: "none",
    WebkitAppearance: "none",
    color: colors.textPrimary,
    caretColor: colors.textPrimary,
    paddingTop: 0,
    paddingBottom: 0,
    paddingLeft: prefix ? 0 : currentSize.horizontalPadding,
    paddingRight: hasRightAddons ? 0 : currentSize.horizontalPadding
  };
  return /* @__PURE__ */ (0, import_jsx_runtime7.jsxs)("div", { className: `${fullWidth ? "w-full" : "inline-block"} ${className}`, children: [
    label && /* @__PURE__ */ (0, import_jsx_runtime7.jsxs)(
      "label",
      {
        htmlFor: inputId,
        className: "block text-[length:var(--text-secondary-size)] font-medium text-[var(--color-text-primary)] mb-2",
        style: {
          color: disabled ? colors.textSecondary : colors.textPrimary,
          cursor: disabled ? "not-allowed" : void 0
        },
        children: [
          label,
          required && /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("span", { className: "text-[var(--color-state-error)] ml-0.5", children: "*" })
        ]
      }
    ),
    /* @__PURE__ */ (0, import_jsx_runtime7.jsxs)(
      "div",
      {
        className: [
          disabled ? "opacity-50 cursor-not-allowed" : "",
          borderColorClass
        ].join(" "),
        style: fieldWrapperStyle,
        children: [
          prefix && /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(
            "div",
            {
              style: {
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                alignSelf: "stretch",
                flexShrink: 0,
                color: colors.textSecondary,
                paddingLeft: currentSize.addonPadding,
                paddingRight: currentSize.addonPadding
              },
              children: prefix
            }
          ),
          /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(
            "input",
            {
              ref: inputRef,
              id: inputId,
              type: getInputType(),
              disabled,
              value: displayValue,
              onChange: handleChange,
              onFocus: handleFocus,
              onBlur: handleBlur,
              onCopy: handleClipboardEvents,
              onCut: handleClipboardEvents,
              onPaste: handleClipboardEvents,
              onContextMenu: handleContextMenu,
              onKeyDown: handleKeyDown,
              maxLength: validation === "businessAID" ? resolvedMaxLength + 2 : resolvedMaxLength,
              "aria-label": ariaLabel || label,
              "aria-invalid": resolvedStatus === "error",
              "aria-required": required,
              placeholder,
              className: "disabled:cursor-not-allowed",
              style: inputElementStyle,
              ...rest
            }
          ),
          hasRightAddons && /* @__PURE__ */ (0, import_jsx_runtime7.jsxs)(
            "div",
            {
              style: {
                display: "flex",
                alignItems: "center",
                alignSelf: "stretch",
                flexShrink: 0,
                height: "100%"
              },
              children: [
                resolvedSuffix && /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(
                  "div",
                  {
                    style: {
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      alignSelf: "stretch",
                      flexShrink: 0,
                      color: colors.textSecondary,
                      paddingLeft: currentSize.addonPadding,
                      paddingRight: currentSize.addonPadding
                    },
                    children: resolvedSuffix
                  }
                ),
                allowClear && hasValue && !disabled && /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(
                  "button",
                  {
                    type: "button",
                    onClick: handleClear,
                    className: "shrink-0 text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]",
                    style: {
                      all: "unset",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      height: "100%",
                      minWidth: currentSize.minHeight,
                      paddingLeft: currentSize.addonPadding,
                      paddingRight: currentSize.addonPadding,
                      boxSizing: "border-box",
                      cursor: "pointer",
                      color: "inherit",
                      flexShrink: 0
                    },
                    "aria-label": "Clear",
                    children: /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(Icon_default, { src: close_default, alt: "", height: 14, width: 14, "aria-hidden": true })
                  }
                ),
                shouldShowToggle && /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(
                  "button",
                  {
                    type: "button",
                    onClick: handleToggleVisibility,
                    className: "shrink-0 text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]",
                    style: {
                      all: "unset",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      height: "100%",
                      minWidth: currentSize.minHeight,
                      paddingLeft: currentSize.addonPadding,
                      paddingRight: currentSize.addonPadding,
                      boxSizing: "border-box",
                      cursor: "pointer",
                      color: "inherit",
                      flexShrink: 0
                    },
                    "aria-label": showValue ? "Hide value" : "Show value",
                    tabIndex: disabled ? -1 : 0,
                    disabled,
                    children: /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(
                      Icon_default,
                      {
                        src: showValue ? toggleOffIcon : toggleIcon,
                        alt: showValue ? "Hide" : "Show",
                        height: toggleIconSize,
                        width: toggleIconSize
                      }
                    )
                  }
                )
              ]
            }
          )
        ]
      }
    ),
    (showCount || showVerifiedStatus || error) && /* @__PURE__ */ (0, import_jsx_runtime7.jsxs)(
      "div",
      {
        style: {
          display: "flex",
          justifyContent: "flex-end",
          alignItems: "center",
          gap: 12,
          marginTop: 6,
          flexWrap: "wrap"
        },
        children: [
          /* @__PURE__ */ (0, import_jsx_runtime7.jsxs)(
            "div",
            {
              style: {
                display: "flex",
                alignItems: "center",
                gap: 6,
                minWidth: 0
              },
              children: [
                showVerifiedStatus && verified && /* @__PURE__ */ (0, import_jsx_runtime7.jsxs)(
                  "div",
                  {
                    style: {
                      display: "flex",
                      alignItems: "center",
                      gap: 6,
                      fontSize: "var(--text-small-size, 12px)",
                      color: colors.stateSuccess
                    },
                    children: [
                      /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(Icon_default, { src: verifiedIcon, alt: "", height: statusIconSize, width: statusIconSize, "aria-hidden": true }),
                      /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("span", { children: "Verified" })
                    ]
                  }
                ),
                error && /* @__PURE__ */ (0, import_jsx_runtime7.jsxs)(
                  "div",
                  {
                    style: {
                      display: "flex",
                      alignItems: "center",
                      gap: 6,
                      fontSize: "var(--text-small-size, 12px)",
                      color: colors.stateError
                    },
                    children: [
                      /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(Icon_default, { src: errorIcon, alt: "", height: statusIconSize, width: statusIconSize, "aria-hidden": true }),
                      /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("span", { children: error })
                    ]
                  }
                )
              ]
            }
          ),
          showCount && /* @__PURE__ */ (0, import_jsx_runtime7.jsxs)(
            "span",
            {
              style: {
                fontSize: "var(--text-small-size, 12px)",
                color: colors.textSecondary,
                flexShrink: 0
              },
              children: [
                charCount,
                " / ",
                countMax
              ]
            }
          )
        ]
      }
    )
  ] });
});
var TextInput_default = TextInput;

// src/components/atoms/TextInputSearch/index.tsx
var import_jsx_runtime8 = require("react/jsx-runtime");
var TextInputSearch = ({
  id = "search",
  leftIcon = search_default,
  leftIconHeight = 18,
  leftIconWidth = 18,
  leftIconColor = "var(--color-text-primary)",
  placeholder = "Search...",
  value = "",
  onChange = () => {
  },
  onSearch,
  errorMessage = "",
  size = "sm",
  fullWidth = true,
  disabled = false,
  className = "",
  containerClassName = "text-input-search-wrapper",
  containerStyle = {},
  ariaLabel = "Search input",
  showClearButton = false,
  showSearchButton = false,
  searchButtonLabel = "Search",
  suffix
}) => {
  const errorId = `${id}-error`;
  const labelId = `${id}-label`;
  const resolvedSize = size || "sm";
  const handleSearch = () => {
    if (disabled)
      return;
    onSearch == null ? void 0 : onSearch(value);
  };
  const searchEnterButton = resolvedSize === "lg" ? { fontSize: "var(--text-body-size)", paddingX: 12 } : resolvedSize === "md" ? { fontSize: "var(--text-body-size)", paddingX: 10 } : { fontSize: "var(--text-small-size)", paddingX: 8 };
  const suffixForInput = suffix !== void 0 ? suffix : showSearchButton ? /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(
    "button",
    {
      type: "button",
      onClick: handleSearch,
      disabled,
      className: "shrink-0 font-medium text-[var(--color-brand-primary)] hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--button-primary-focus-ring,var(--color-brand-primary))]",
      style: {
        all: "unset",
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        alignSelf: "stretch",
        boxSizing: "border-box",
        cursor: disabled ? "not-allowed" : "pointer",
        fontSize: searchEnterButton.fontSize,
        lineHeight: 1.2,
        paddingLeft: searchEnterButton.paddingX,
        paddingRight: searchEnterButton.paddingX,
        whiteSpace: "nowrap"
      },
      children: searchButtonLabel
    }
  ) : null;
  return /* @__PURE__ */ (0, import_jsx_runtime8.jsxs)(
    "div",
    {
      className: containerClassName.trim(),
      style: {
        width: fullWidth ? "100%" : "auto",
        ...containerStyle
      },
      role: "search",
      "aria-labelledby": labelId,
      children: [
        /* @__PURE__ */ (0, import_jsx_runtime8.jsx)("label", { id: labelId, htmlFor: id, className: "visually-hidden", children: ariaLabel }),
        /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(
          TextInput_default,
          {
            id,
            type: "search",
            placeholder,
            validation: "headerSearch",
            value,
            onChange,
            errorMessage,
            size: resolvedSize,
            fullWidth,
            disabled,
            variant: "outlined",
            rounded: "3",
            allowClear: showClearButton,
            prefix: leftIcon ? /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(
              Icon_default,
              {
                src: leftIcon,
                height: leftIconHeight,
                width: leftIconWidth,
                color: leftIconColor,
                "aria-hidden": "true"
              }
            ) : void 0,
            suffix: suffixForInput,
            onPressEnter: handleSearch,
            ariaLabel,
            "aria-invalid": !!errorMessage,
            "aria-describedby": errorMessage ? errorId : void 0,
            className
          }
        ),
        errorMessage && /* @__PURE__ */ (0, import_jsx_runtime8.jsx)("span", { id: errorId, role: "alert", className: "visually-hidden", children: errorMessage })
      ]
    }
  );
};
var TextInputSearch_default = TextInputSearch;

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

// src/components/molecules/AppTopbar/AppTopbarMenu.tsx
var import_react9 = __toESM(require("react"));
var import_react_dom3 = require("react-dom");
var import_jsx_runtime9 = require("react/jsx-runtime");
function cls2(...parts) {
  return parts.filter(Boolean).join(" ");
}
function AppTopbarMenu({ id, open, onClose, triggerRef, items, theme }) {
  const menuRef = (0, import_react9.useRef)(null);
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
  (0, import_react9.useLayoutEffect)(() => {
    if (!open)
      return;
    positionMenu();
  }, [open]);
  (0, import_react9.useEffect)(() => {
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
  (0, import_react9.useEffect)(() => {
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
  (0, import_react9.useEffect)(() => {
    if (!open || !menuRef.current)
      return;
    const first = menuRef.current.querySelector(
      'button[role="menuitem"]:not([disabled]), a[role="menuitem"]'
    );
    first == null ? void 0 : first.focus();
  }, [open]);
  if (!open || typeof document === "undefined")
    return null;
  return (0, import_react_dom3.createPortal)(
    /* @__PURE__ */ (0, import_jsx_runtime9.jsx)(
      "div",
      {
        ref: menuRef,
        id,
        role: "menu",
        "aria-orientation": "vertical",
        className: cls2("app-topbar-menu", theme === "dark" && "app-topbar-menu--dark"),
        children: items.map((item) => {
          const content = /* @__PURE__ */ (0, import_jsx_runtime9.jsxs)(import_jsx_runtime9.Fragment, { children: [
            item.icon ? /* @__PURE__ */ (0, import_jsx_runtime9.jsx)("span", { className: "app-topbar-menu__icon", "aria-hidden": true, children: /* @__PURE__ */ (0, import_jsx_runtime9.jsx)(Icon_default, { src: item.icon, width: 18, height: 18, color: "currentColor", decorative: true }) }) : null,
            /* @__PURE__ */ (0, import_jsx_runtime9.jsx)("span", { className: "app-topbar-menu__label", children: item.label })
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
          const node = item.href && !item.disabled ? /* @__PURE__ */ (0, import_jsx_runtime9.jsx)(
            "a",
            {
              ...common,
              href: item.href,
              onClick: () => {
                onClose();
              },
              children: content
            }
          ) : /* @__PURE__ */ (0, import_jsx_runtime9.jsx)(
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
          return /* @__PURE__ */ (0, import_jsx_runtime9.jsx)(import_react9.default.Fragment, { children: node }, item.id);
        })
      }
    ),
    document.body
  );
}

// src/components/molecules/AppTopbar/index.tsx
var import_jsx_runtime10 = require("react/jsx-runtime");
var TOPBAR_SEARCH_ICON = /* @__PURE__ */ (0, import_jsx_runtime10.jsxs)("svg", { viewBox: "0 0 24 24", width: 18, height: 18, fill: "none", "aria-hidden": true, children: [
  /* @__PURE__ */ (0, import_jsx_runtime10.jsx)("circle", { cx: "11", cy: "11", r: "7", stroke: "currentColor", strokeWidth: "2" }),
  /* @__PURE__ */ (0, import_jsx_runtime10.jsx)("path", { d: "M20 20l-4.3-4.3", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round" })
] });
var MENU_ICON = /* @__PURE__ */ (0, import_jsx_runtime10.jsx)("svg", { viewBox: "0 0 20 20", width: 20, height: 20, fill: "none", "aria-hidden": true, children: /* @__PURE__ */ (0, import_jsx_runtime10.jsx)("path", { d: "M3 5h14M3 10h14M3 15h14", stroke: "currentColor", strokeWidth: "1.5", strokeLinecap: "round" }) });
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
  const rootId = (0, import_react10.useId)();
  const baseId = rootId.replace(/[^a-zA-Z0-9_-]/g, "");
  const searchInputId = (_a = search == null ? void 0 : search.inputId) != null ? _a : `app-topbar-search-${baseId}`;
  const menuDomId = (0, import_react10.useMemo)(() => `app-topbar-menu-root-${baseId}`, [baseId]);
  const isNarrow = useBelowWidth(collapseCenterBelowWidth, responsive);
  const hasMenuItems = Boolean(mobileMenuItems && mobileMenuItems.length > 0);
  const showHamburger = isNarrow && (hasMenuItems || Boolean(onMobileMenuClick));
  const hasCenterContent = centerSlot != null || search != null;
  const hideCenterColumn = isNarrow && search != null && centerSlot == null;
  const showCenterCell = hasCenterContent && !hideCenterColumn;
  const [mobileSearchOpen, setMobileSearchOpen] = (0, import_react10.useState)(false);
  const [menuOpen, setMenuOpen] = (0, import_react10.useState)(false);
  const menuTriggerWrapRef = (0, import_react10.useRef)(null);
  (0, import_react10.useEffect)(() => {
    if (!isNarrow) {
      setMobileSearchOpen(false);
      setMenuOpen(false);
    }
  }, [isNarrow]);
  (0, import_react10.useEffect)(() => {
    if (!mobileSearchOpen)
      return;
    const onKey = (e) => {
      if (e.key === "Escape")
        setMobileSearchOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [mobileSearchOpen]);
  (0, import_react10.useEffect)(() => {
    if (!mobileSearchOpen || !hideCenterColumn)
      return;
    const id = requestAnimationFrame(() => {
      var _a2;
      (_a2 = document.getElementById(searchInputId)) == null ? void 0 : _a2.focus();
    });
    return () => cancelAnimationFrame(id);
  }, [mobileSearchOpen, hideCenterColumn, searchInputId]);
  (0, import_react10.useEffect)(() => {
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
  const searchField = search ? /* @__PURE__ */ (0, import_jsx_runtime10.jsx)(
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
  return /* @__PURE__ */ (0, import_jsx_runtime10.jsxs)(import_jsx_runtime10.Fragment, { children: [
    /* @__PURE__ */ (0, import_jsx_runtime10.jsxs)(
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
          /* @__PURE__ */ (0, import_jsx_runtime10.jsxs)("div", { className: cls3("app-topbar__inner", classNames == null ? void 0 : classNames.inner), children: [
            /* @__PURE__ */ (0, import_jsx_runtime10.jsxs)("div", { className: cls3("app-topbar__left", classNames == null ? void 0 : classNames.left), children: [
              showHamburger ? /* @__PURE__ */ (0, import_jsx_runtime10.jsx)("div", { ref: menuTriggerWrapRef, className: "app-topbar__menu", children: /* @__PURE__ */ (0, import_jsx_runtime10.jsx)(
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
              /* @__PURE__ */ (0, import_jsx_runtime10.jsx)("div", { className: "app-topbar__context", children: /* @__PURE__ */ (0, import_jsx_runtime10.jsx)(TitleTag, { className: cls3("app-topbar__title", classNames == null ? void 0 : classNames.title), children: title }) })
            ] }),
            showCenterCell ? /* @__PURE__ */ (0, import_jsx_runtime10.jsx)(
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
            /* @__PURE__ */ (0, import_jsx_runtime10.jsxs)("div", { className: cls3("app-topbar__right", classNames == null ? void 0 : classNames.right), children: [
              hideCenterColumn && search ? /* @__PURE__ */ (0, import_jsx_runtime10.jsx)(
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
                return /* @__PURE__ */ (0, import_jsx_runtime10.jsxs)("span", { className: "app-topbar__action-wrap", children: [
                  /* @__PURE__ */ (0, import_jsx_runtime10.jsx)(
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
                  hasBadge ? /* @__PURE__ */ (0, import_jsx_runtime10.jsx)(
                    "span",
                    {
                      className: cls3("app-topbar__badge", showCountChip && "app-topbar__badge--count"),
                      "aria-hidden": true,
                      children: showCountChip ? count > 99 ? "99+" : count : null
                    }
                  ) : null
                ] }, action.id);
              }),
              profile ? profile.onClick ? /* @__PURE__ */ (0, import_jsx_runtime10.jsx)(
                "button",
                {
                  type: "button",
                  className: "app-topbar__profile",
                  "aria-label": (_f = profile.menuLabel) != null ? _f : profile.name ? `Account menu for ${profile.name}` : "Account menu",
                  onClick: profile.onClick,
                  children: (_h = profile.avatar) != null ? _h : /* @__PURE__ */ (0, import_jsx_runtime10.jsx)(Avatar_default, { size: 32, shape: "circle", name: (_g = profile.name) != null ? _g : "User", ...profile.avatarProps })
                }
              ) : /* @__PURE__ */ (0, import_jsx_runtime10.jsx)(
                "span",
                {
                  className: "app-topbar__profile app-topbar__profile--static",
                  "aria-label": (_j = (_i = profile.menuLabel) != null ? _i : profile.name) != null ? _j : "Profile",
                  children: (_l = profile.avatar) != null ? _l : /* @__PURE__ */ (0, import_jsx_runtime10.jsx)(Avatar_default, { size: 32, shape: "circle", name: (_k = profile.name) != null ? _k : "User", ...profile.avatarProps })
                }
              ) : null,
              rightSlot
            ] })
          ] }),
          hideCenterColumn && mobileSearchOpen && search ? /* @__PURE__ */ (0, import_jsx_runtime10.jsx)("div", { id: `${searchInputId}-panel`, className: "app-topbar__mobile-search", children: searchField }) : null
        ]
      }
    ),
    hasMenuItems ? /* @__PURE__ */ (0, import_jsx_runtime10.jsx)(
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
var import_jsx_runtime11 = require("react/jsx-runtime");
function cls4(...parts) {
  return parts.filter(Boolean).join(" ");
}
function isAppTopbarElement(node) {
  const t = node.type;
  return t === AppTopbar_default || (t == null ? void 0 : t.displayName) === "AppTopbar" || (t == null ? void 0 : t.name) === "AppTopbar";
}
function prepareTopbar(topbar, pinTopbar) {
  if (!pinTopbar || !import_react11.default.isValidElement(topbar) || !isAppTopbarElement(topbar)) {
    return topbar;
  }
  return import_react11.default.cloneElement(topbar, { sticky: false });
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
  const renderInset = (style) => /* @__PURE__ */ (0, import_jsx_runtime11.jsxs)("div", { className: cls4(DEFAULT_INSET_CLASSNAME, insetClassName), style, children: [
    topbar ? /* @__PURE__ */ (0, import_jsx_runtime11.jsx)("div", { className: cls4(DEFAULT_TOPBAR_WRAPPER_CLASSNAME, topbarClassName), style: topbarStyle, children: topbarNode }) : null,
    /* @__PURE__ */ (0, import_jsx_runtime11.jsx)("div", { className: cls4(DEFAULT_CONTENT_CLASSNAME, contentClassName), style: contentStyle, children })
  ] });
  if (!fixed) {
    return /* @__PURE__ */ (0, import_jsx_runtime11.jsxs)("div", { className: cls4(DEFAULT_ROOT_CLASSNAME, className), children: [
      /* @__PURE__ */ (0, import_jsx_runtime11.jsx)(
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
  return /* @__PURE__ */ (0, import_jsx_runtime11.jsxs)("div", { className: cls4(DEFAULT_ROOT_CLASSNAME, className), children: [
    /* @__PURE__ */ (0, import_jsx_runtime11.jsx)(
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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  AppShell,
  AppSidebar,
  AppTopbar,
  DashboardShell,
  mergeSidebarTokensStyle,
  mergeTopbarTokensStyle,
  readAppSidebarPersist,
  writeAppSidebarPersist
});
//# sourceMappingURL=shell.js.map