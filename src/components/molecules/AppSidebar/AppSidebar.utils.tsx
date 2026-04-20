import React from "react";
import Icon from "../../atoms/Icon";
import type { IconSource } from "../../atoms/Icon";
import type { AppSidebarTrailingPreset } from "./AppSidebar.types";

export function cls(...parts: Array<string | undefined | false>): string {
  return parts.filter(Boolean).join(" ");
}

const lockSvg = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden>
    <rect x="5" y="11" width="14" height="10" rx="2" ry="2" />
    <path d="M8 11V7a4 4 0 0 1 8 0v4" />
  </svg>
);

const checkSvg = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden>
    <path d="M20 6L9 17l-5-5" />
  </svg>
);

export function renderTrailingIcon(
  trailing: AppSidebarTrailingPreset | IconSource | React.ReactNode | undefined,
  size: number
): React.ReactNode | null {
  if (trailing == null || trailing === "none") return null;
  if (trailing === "lock") {
    return <Icon src={lockSvg} decorative width={size} height={size} color="currentColor" className="app-sidebar__trailing-icon" />;
  }
  if (trailing === "check") {
    return <Icon src={checkSvg} decorative width={size} height={size} color="currentColor" className="app-sidebar__trailing-icon" />;
  }
  if (React.isValidElement(trailing)) {
    return <span className="app-sidebar__trailing-custom">{trailing}</span>;
  }
  return (
    <Icon src={trailing as IconSource} decorative width={size} height={size} className="app-sidebar__trailing-icon" />
  );
}
