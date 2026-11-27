/** Defaults applied when a prop is omitted. */
export const DASHBOARD_SHELL_DEFAULTS = {
  pinTopbar: true,
  contentAs: "main" as const,
  skipLinkLabel: "Skip to main content",
  hideSkipLink: false,
  /** Sidebar rail is viewport-fixed unless `sidebar.fixed === false`. */
  sidebarFixed: true,
  /** Below this width (px) the expanded sidebar becomes an overlay drawer (CSS `max-width: 767px`). */
  drawerOverlayBelowWidth: 768,
};

/** BEM-ish slot class names (styles live in `DashboardShell.css`, tokens only). */
export const DASHBOARD_SHELL_CLASSES = {
  root: "ds-shell",
  skipLink: "ds-shell__skip",
  inset: "ds-shell__inset",
  topbar: "ds-shell__topbar",
  content: "ds-shell__content",
} as const;
