/* ucs:component-css */
import "./styles/components/molecules/DashboardShell/DashboardShell.css";
import {
  AppTopbar_default
} from "./chunk-N3RCO3KW.mjs";
import {
  AppSidebar
} from "./chunk-PZZ7WEYC.mjs";

// src/components/molecules/DashboardShell/index.tsx
import React from "react";

// src/components/molecules/DashboardShell/DashboardShell.config.ts
var DASHBOARD_SHELL_DEFAULTS = {
  pinTopbar: true,
  contentAs: "main",
  skipLinkLabel: "Skip to main content",
  hideSkipLink: false,
  /** Sidebar rail is viewport-fixed unless `sidebar.fixed === false`. */
  sidebarFixed: true,
  /** Below this width (px) the expanded sidebar becomes an overlay drawer (CSS `max-width: 767px`). */
  drawerOverlayBelowWidth: 768
};
var DASHBOARD_SHELL_CLASSES = {
  root: "ds-shell",
  skipLink: "ds-shell__skip",
  inset: "ds-shell__inset",
  topbar: "ds-shell__topbar",
  content: "ds-shell__content"
};

// src/components/molecules/DashboardShell/index.tsx
import { jsx, jsxs } from "react/jsx-runtime";
function cls(...parts) {
  return parts.filter(Boolean).join(" ");
}
function isAppTopbarElement(node) {
  const t = node.type;
  return t === AppTopbar_default || (t == null ? void 0 : t.displayName) === "AppTopbar" || (t == null ? void 0 : t.name) === "AppTopbar";
}
function prepareTopbar(topbar, pinTopbar) {
  if (!pinTopbar || !React.isValidElement(topbar) || !isAppTopbarElement(topbar)) {
    return topbar;
  }
  return React.cloneElement(topbar, { sticky: false });
}
var DashboardShell = React.forwardRef(function DashboardShell2({
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
  pinTopbar = DASHBOARD_SHELL_DEFAULTS.pinTopbar,
  contentAs = DASHBOARD_SHELL_DEFAULTS.contentAs,
  mainId,
  mainLabel,
  skipLinkLabel = DASHBOARD_SHELL_DEFAULTS.skipLinkLabel,
  hideSkipLink = DASHBOARD_SHELL_DEFAULTS.hideSkipLink,
  ...rest
}, ref) {
  const generatedId = React.useId().replace(/:/g, "");
  const contentId = mainId != null ? mainId : `ds-shell-main-${generatedId}`;
  const contentRef = React.useRef(null);
  const {
    fixed: fixedProp,
    className: sidebarClassName,
    classNames: sidebarClassNames,
    drawerOverlayBelowWidth = DASHBOARD_SHELL_DEFAULTS.drawerOverlayBelowWidth,
    ...restSidebar
  } = sidebar;
  const fixed = fixedProp !== false;
  const topbarNode = prepareTopbar(topbar, pinTopbar);
  const ContentTag = contentAs;
  const handleSkip = (event) => {
    const target = contentRef.current;
    if (!target)
      return;
    event.preventDefault();
    target.focus();
    if (typeof target.scrollIntoView === "function")
      target.scrollIntoView({ block: "start" });
  };
  return /* @__PURE__ */ jsxs(
    "div",
    {
      ...rest,
      ref,
      className: cls(DASHBOARD_SHELL_CLASSES.root, className),
      "data-sidebar-fixed": fixed ? "true" : "false",
      children: [
        hideSkipLink ? null : /* @__PURE__ */ jsx("a", { href: `#${contentId}`, className: DASHBOARD_SHELL_CLASSES.skipLink, onClick: handleSkip, children: skipLinkLabel }),
        /* @__PURE__ */ jsx(
          AppSidebar,
          {
            ...restSidebar,
            drawerOverlayBelowWidth,
            fixed,
            className: sidebarClassName,
            classNames: sidebarClassNames
          }
        ),
        /* @__PURE__ */ jsxs("div", { className: cls(DASHBOARD_SHELL_CLASSES.inset, insetClassName), style: insetStyle, children: [
          topbar ? /* @__PURE__ */ jsx("div", { className: cls(DASHBOARD_SHELL_CLASSES.topbar, topbarClassName), style: topbarStyle, children: topbarNode }) : null,
          /* @__PURE__ */ jsx(
            ContentTag,
            {
              ref: contentRef,
              id: contentId,
              tabIndex: -1,
              "aria-label": mainLabel,
              className: cls(DASHBOARD_SHELL_CLASSES.content, contentClassName),
              style: contentStyle,
              children
            }
          )
        ] })
      ]
    }
  );
});
DashboardShell.displayName = "DashboardShell";
var DashboardShell_default = DashboardShell;
var AppShell = DashboardShell;

export {
  DashboardShell_default,
  AppShell
};
//# sourceMappingURL=chunk-T7R7BVRJ.mjs.map