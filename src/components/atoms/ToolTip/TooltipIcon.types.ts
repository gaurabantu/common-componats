import React from "react";
import type { IconSource } from "../Icon";

export type TooltipPlacement = "auto" | "top" | "bottom" | "left" | "right";

/**
 * Props of the legacy icon tooltip (`ToolTip`).
 * @deprecated Use `Tooltip` (`TooltipProps`) from the Tooltip molecule — `ToolTip` is now a thin wrapper over it.
 */
export interface TooltipIconProps
  extends Omit<React.HTMLAttributes<HTMLSpanElement>, "content"> {
  tooltipText: string;
  content?: React.ReactNode;
  children?: React.ReactNode;
  placement?: TooltipPlacement;
  tooltipContentIcon?: IconSource;
  delay?: number;
  closeDelay?: number;
  size?: number;
  color?: string;
  className?: string;
  iconToolTip?: IconSource;
  maxWidth?: number | string;
  variant?: "dark" | "light";
  /**
   * Stacking order of the bubble (number or CSS value). @default "var(--z-tooltip-top, 600)" —
   * above Modal / Drawer / Popover — lifted one above the highest z-index among the trigger's
   * ancestors (the bubble is portalled to `<body>` by the canonical `Tooltip`).
   */
  zIndex?: number | string;
}