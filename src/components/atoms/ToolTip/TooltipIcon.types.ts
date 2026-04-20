import React from "react";
import type { IconSource } from "../Icon";

export type TooltipPlacement = "top" | "bottom" | "left" | "right";

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
}