import type React from "react";
import type { AppSidebarProps } from "../AppSidebar/AppSidebar.types";

/** Element used for the scrolling content slot. `main` (default) exposes the `main` landmark. */
export type DashboardShellContentElement = "main" | "div";

/** Sidebar config — `AppSidebarProps` with `fixed` optional (the shell defaults it to `true`). */
export type DashboardShellSidebarProps = Omit<AppSidebarProps, "fixed"> & { fixed?: boolean };

export interface DashboardShellProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "children" | "className"> {
  /**
   * Props for `AppSidebar`. **`fixed`** here means the **sidebar rail** is viewport-fixed (left), not
   * that the main column or `AppTopbar` are CSS-fixed. When `fixed`, the main column uses
   * **`margin-inline-start: var(--app-sidebar-offset)`** from `AppSidebar` — do not hard-code rail width.
   *
   * Responsive: `AppSidebar` collapses to its rail below `collapseBelowWidth` (default 1024) and becomes an
   * overlay drawer below `drawerOverlayBelowWidth` (the shell defaults this to **768**).
   */
  sidebar: DashboardShellSidebarProps;
  /**
   * Top of the main column (commonly `<AppTopbar />`, which renders the `banner` landmark). Pinned
   * **above** the scrolling `children` region — it does not scroll with `children`.
   */
  topbar?: React.ReactNode;
  /** Main page body: **only this** scrolls vertically inside the shell. */
  children: React.ReactNode;
  /** Root element class — merged last (escape hatch). */
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
  /**
   * Element for the content slot. Default `"main"` (landmark + skip-link target). Use `"div"` only when
   * `children` already render their own `<main>` (a page must have exactly one `main` landmark).
   */
  contentAs?: DashboardShellContentElement;
  /** `id` of the content slot (skip-link target). Defaults to a generated, unique id. */
  mainId?: string;
  /** Optional accessible name for the content landmark (e.g. the page title). */
  mainLabel?: string;
  /** Visible-on-focus skip link text (WCAG 2.4.1 Bypass Blocks). Default "Skip to main content". */
  skipLinkLabel?: string;
  /** Hide the built-in skip link (only when the host app already provides one). Default `false`. */
  hideSkipLink?: boolean;
}

/** @deprecated Use `DashboardShellProps`. */
export type AppShellProps = DashboardShellProps;
