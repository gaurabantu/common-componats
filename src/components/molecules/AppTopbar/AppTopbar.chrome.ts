import type React from "react";
import type { AppTopbarTokens } from "./AppTopbar.types";

const TOKENS_CSS_VARS: Record<keyof AppTopbarTokens, string> = {
  bg: "--app-topbar-bg",
  bgElevated: "--app-topbar-bg-elevated",
  text: "--app-topbar-text",
  textMuted: "--app-topbar-text-muted",
  border: "--app-topbar-border",
  hover: "--app-topbar-hover",
  activeBg: "--app-topbar-active-bg",
  focusRing: "--app-topbar-focus-ring",
  shadow: "--app-topbar-shadow",
};

export function mergeTopbarTokensStyle(
  tokens: AppTopbarTokens | undefined,
  base?: React.CSSProperties
): React.CSSProperties {
  if (!tokens || Object.keys(tokens).length === 0) {
    return base ?? {};
  }
  const vars: Record<string, string> = {};
  (Object.entries(tokens) as [keyof AppTopbarTokens, string | undefined][]).forEach(([key, val]) => {
    if (val === undefined || val === "") return;
    const cssVar = TOKENS_CSS_VARS[key];
    if (cssVar) vars[cssVar] = val;
  });
  return { ...vars, ...base };
}
