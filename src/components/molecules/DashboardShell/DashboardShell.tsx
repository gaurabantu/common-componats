"use client";

import React from "react";
import AppSidebar from "../AppSidebar";
import type { AppSidebarProps } from "../AppSidebar/AppSidebar.types";
import AppTopbar from "../AppTopbar";

/**
 * Layout contract (keep these separate):
 *
 * - **`sidebar.fixed` (AppSidebar)** — Only the **left rail** may use viewport `position: fixed` and
 *   `--app-sidebar-offset`. This does **not** fix the main column or lock page content.
 *
 * - **`topbar` (e.g. AppTopbar)** — Placed **above** the scroll slot. It stays at the top of the main
 *   column via **flex** (`shrink-0`), not by fixing the whole main area.
 *
 * - **`children`** — **Only** this area scrolls (`overflow-y-auto`). Main content is never “fixed”.
 *
 * `pinTopbar` may set `sticky={false}` on `AppTopbar` to avoid sticky vs nested scroll bugs; the bar
 * remains pinned by layout, not by removing scroll from `children`.
 */

function cls(...parts: (string | false | undefined)[]): string {
  return parts.filter(Boolean).join(" ");
}

function isAppTopbarElement(node: React.ReactElement): boolean {
  const t = node.type as React.ElementType & { displayName?: string; name?: string };
  return t === AppTopbar || t?.displayName === "AppTopbar" || t?.name === "AppTopbar";
}

/** See module comment — avoids `sticky` fighting scroll containers; top bar still pinned by flex. */
function prepareTopbar(topbar: React.ReactNode, pinTopbar: boolean): React.ReactNode {
  if (!pinTopbar || !React.isValidElement(topbar) || !isAppTopbarElement(topbar)) {
    return topbar;
  }
  return React.cloneElement(topbar as React.ReactElement<{ sticky?: boolean }>, { sticky: false });
}

/** Shell height is bounded; body does not scroll — only the **content** slot below the top bar does. */
const DEFAULT_ROOT_CLASSNAME =
  "flex flex-nowrap h-[100dvh] max-h-[100dvh] min-h-0 w-full min-w-0 max-w-[100vw] items-stretch overflow-hidden bg-[var(--color-bg-page)] text-[var(--color-text-primary)]";

/**
 * Main column: no `w-full` here — in a row flex, `width: 100%` can force a wrap and drop the column
 * below the sidebar on tablet widths.
 */
const DEFAULT_INSET_CLASSNAME =
  "isolate flex min-h-0 min-w-0 flex-1 flex-col overflow-hidden";

/** Top bar sits above the scroll region; does not participate in content overflow. */
const DEFAULT_TOPBAR_WRAPPER_CLASSNAME = "relative z-10 min-w-0 shrink-0";

const DEFAULT_CONTENT_CLASSNAME =
  "min-w-0 w-full min-h-0 flex-1 basis-0 overflow-y-auto overscroll-y-contain";

export type DashboardShellProps = {
  /**
   * Props for `AppSidebar`. **`fixed`** here means the **sidebar rail** is viewport-fixed (left), not
   * that the main column or `AppTopbar` are CSS-fixed. When `fixed`, the main column uses
   * **`margin-inline-start: var(--app-sidebar-offset)`** from `AppSidebar` — do not hard-code rail width.
   */
  sidebar: Omit<AppSidebarProps, "fixed"> & { fixed?: boolean };
  /**
   * Top of the main column (commonly `<AppTopbar />`). Pinned **above** the scrolling `children`
   * region — it does not scroll with `children`.
   */
  topbar?: React.ReactNode;
  /** Main page body: **only this** scrolls vertically inside the shell. */
  children: React.ReactNode;
  className?: string;
  insetClassName?: string;
  insetStyle?: React.CSSProperties;
  /** Wrapper around `topbar` (defaults to zero margin/padding). */
  topbarClassName?: string;
  topbarStyle?: React.CSSProperties;
  /** Main content section under the top bar (scrolls independently; defaults include overflow-y auto). */
  contentClassName?: string;
  contentStyle?: React.CSSProperties;
  /**
   * When `true` (default), `<AppTopbar />` gets **`sticky={false}`** to avoid `position: sticky`
   * conflicting with iframe/nested scrollers. The bar stays at the top via **flex layout**, not via
   * `sticky`. Set `false` only if you must set `AppTopbar`’s `sticky` yourself.
   */
  pinTopbar?: boolean;
};

/**
 * Dashboard shell: viewport-fixed **sidebar rail** + main column with **`margin-inline-start`**
 * from `--app-sidebar-offset`. **Top bar** above, **scrollable `children`** below — main content is
 * never locked; only the left rail uses `fixed` (when `sidebar.fixed` is true).
 */
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
  pinTopbar = true,
}: DashboardShellProps) {
  const { fixed: fixedProp, className: sidebarClassName, classNames: sidebarClassNames, ...restSidebar } =
    sidebar;

  const fixed = fixedProp !== false;

  const topbarNode = prepareTopbar(topbar, pinTopbar);

  const renderInset = (style?: React.CSSProperties) => (
    <div className={cls(DEFAULT_INSET_CLASSNAME, insetClassName)} style={style}>
      {topbar ? (
        <div className={cls(DEFAULT_TOPBAR_WRAPPER_CLASSNAME, topbarClassName)} style={topbarStyle}>
          {topbarNode}
        </div>
      ) : null}
      <div className={cls(DEFAULT_CONTENT_CLASSNAME, contentClassName)} style={contentStyle}>
        {children}
      </div>
    </div>
  );

  if (!fixed) {
    return (
      <div className={cls(DEFAULT_ROOT_CLASSNAME, className)}>
        <AppSidebar
          {...restSidebar}
          fixed={false}
          className={sidebarClassName}
          classNames={sidebarClassNames}
        />
        {renderInset({
          flex: "1 1 0%",
          maxHeight: "100%",
          minHeight: 0,
          alignSelf: "stretch",
          ...insetStyle,
        })}
      </div>
    );
  }

  return (
    <div className={cls(DEFAULT_ROOT_CLASSNAME, className)}>
      <AppSidebar
        {...restSidebar}
        fixed
        className={sidebarClassName}
        classNames={sidebarClassNames}
      />
      {renderInset({
        marginInlineStart: "var(--app-sidebar-offset, 0px)",
        transition: "margin-inline-start 200ms ease",
        minHeight: 0,
        flex: "1 1 0%",
        maxHeight: "100%",
        alignSelf: "stretch",
        ...insetStyle,
      })}
    </div>
  );
}

export default DashboardShell;

/** @deprecated Use `DashboardShell` — same component, clearer name for dashboard layouts. */
export const AppShell = DashboardShell;

export type AppShellProps = DashboardShellProps;
