import type React from "react";
import type { AppSidebarTokens } from "./AppSidebar.types";

/** Maps token keys to CSS custom properties used in `AppSidebar.css`. */
const TOKENS_CSS_VARS: Record<keyof AppSidebarTokens, string> = {
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
  sidebarCreateDash: "--sidebar-create-dash",
};

/**
 * Merge design tokens into `style` for the sidebar root (CSS variables).
 * Keeps layout “practical”: one object overrides global Noir without forking CSS.
 */
export function mergeSidebarTokensStyle(
  tokens: AppSidebarTokens | undefined,
  base?: React.CSSProperties
): React.CSSProperties {
  if (!tokens || Object.keys(tokens).length === 0) {
    return base ?? {};
  }
  const vars: Record<string, string> = {};
  (Object.entries(tokens) as [keyof AppSidebarTokens, string | undefined][]).forEach(([key, val]) => {
    if (val === undefined || val === "") return;
    const cssVar = TOKENS_CSS_VARS[key];
    if (cssVar) vars[cssVar] = val;
  });
  return { ...vars, ...base };
}
