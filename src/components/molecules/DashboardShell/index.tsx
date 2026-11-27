"use client";

import React from "react";
import AppSidebar from "../AppSidebar";
import AppTopbar from "../AppTopbar";
import { DASHBOARD_SHELL_CLASSES, DASHBOARD_SHELL_DEFAULTS } from "./DashboardShell.config";
import type { DashboardShellProps } from "./DashboardShell.types";
import "./DashboardShell.css";

export type {
  DashboardShellProps,
  AppShellProps,
  DashboardShellContentElement,
  DashboardShellSidebarProps,
} from "./DashboardShell.types";

/**
 * Layout contract (keep these separate):
 *
 * - **`sidebar.fixed` (AppSidebar)** — Only the **left rail** may use viewport `position: fixed` and
 *   `--app-sidebar-offset`. This does **not** fix the main column or lock page content.
 * - **`topbar` (e.g. AppTopbar)** — Placed **above** the scroll slot. It stays at the top of the main
 *   column via **flex** (`flex-shrink: 0`), not by fixing the whole main area.
 * - **`children`** — **Only** this area scrolls (`overflow-y: auto`). Rendered inside `<main>` by default.
 *
 * `pinTopbar` may set `sticky={false}` on `AppTopbar` to avoid sticky vs nested scroll bugs; the bar
 * remains pinned by layout, not by removing scroll from `children`.
 */

function cls(...parts: (string | false | undefined | null)[]): string {
  return parts.filter(Boolean).join(" ");
}

function isAppTopbarElement(node: React.ReactElement): boolean {
  const t = node.type as React.ElementType & { displayName?: string; name?: string };
  return t === AppTopbar || t?.displayName === "AppTopbar" || t?.name === "AppTopbar";
}

/** Avoids `sticky` fighting scroll containers; top bar still pinned by flex. */
function prepareTopbar(topbar: React.ReactNode, pinTopbar: boolean): React.ReactNode {
  if (!pinTopbar || !React.isValidElement(topbar) || !isAppTopbarElement(topbar)) {
    return topbar;
  }
  return React.cloneElement(topbar as React.ReactElement<{ sticky?: boolean }>, { sticky: false });
}

/**
 * Dashboard shell: viewport-fixed **sidebar rail** + main column with **`margin-inline-start`**
 * from `--app-sidebar-offset`. **Top bar** above, **scrollable `children`** below in the `main`
 * landmark, plus a skip link that moves focus past the navigation (WCAG 2.4.1).
 *
 * Responsive: the sidebar collapses to its rail below 1024px and becomes an overlay drawer below
 * 768px (`AppSidebar` publishes the matching offset, so the main column always fills the rest).
 */
const DashboardShell = React.forwardRef<HTMLDivElement, DashboardShellProps>(function DashboardShell(
  {
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
  },
  ref,
) {
  const generatedId = React.useId().replace(/:/g, "");
  const contentId = mainId ?? `ds-shell-main-${generatedId}`;
  const contentRef = React.useRef<HTMLElement>(null);

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

  const handleSkip = (event: React.MouseEvent<HTMLAnchorElement>) => {
    const target = contentRef.current;
    if (!target) return;
    event.preventDefault();
    target.focus();
    if (typeof target.scrollIntoView === "function") target.scrollIntoView({ block: "start" });
  };

  return (
    <div
      {...rest}
      ref={ref}
      className={cls(DASHBOARD_SHELL_CLASSES.root, className)}
      data-sidebar-fixed={fixed ? "true" : "false"}
    >
      {hideSkipLink ? null : (
        <a href={`#${contentId}`} className={DASHBOARD_SHELL_CLASSES.skipLink} onClick={handleSkip}>
          {skipLinkLabel}
        </a>
      )}
      <AppSidebar
        {...restSidebar}
        drawerOverlayBelowWidth={drawerOverlayBelowWidth}
        fixed={fixed}
        className={sidebarClassName}
        classNames={sidebarClassNames}
      />
      <div className={cls(DASHBOARD_SHELL_CLASSES.inset, insetClassName)} style={insetStyle}>
        {topbar ? (
          <div className={cls(DASHBOARD_SHELL_CLASSES.topbar, topbarClassName)} style={topbarStyle}>
            {topbarNode}
          </div>
        ) : null}
        <ContentTag
          ref={contentRef as React.Ref<HTMLDivElement>}
          id={contentId}
          tabIndex={-1}
          aria-label={mainLabel}
          className={cls(DASHBOARD_SHELL_CLASSES.content, contentClassName)}
          style={contentStyle}
        >
          {children}
        </ContentTag>
      </div>
    </div>
  );
});

DashboardShell.displayName = "DashboardShell";

export default DashboardShell;

/** @deprecated Use `DashboardShell` — same component, clearer name for dashboard layouts. */
export const AppShell = DashboardShell;
