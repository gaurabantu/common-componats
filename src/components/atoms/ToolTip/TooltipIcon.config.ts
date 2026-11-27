import type { TooltipSide } from "../../molecules/Tooltip/Tooltip.types";
import type { TooltipPlacement } from "./TooltipIcon.types";

export const defaultTooltipOptions = {
  placement: "auto" as const,
  delay: 60,
  closeDelay: 80,
  size: 16,
  color: "currentColor",
  maxWidth: 240,
  variant: "dark" as const,
};

/**
 * Legacy `placement` → canonical `Tooltip` `side`. `auto` maps to `top`: the canonical Tooltip
 * flips to the opposite side on viewport collision, which covers the old auto-placement.
 */
export const PLACEMENT_TO_SIDE: Record<TooltipPlacement, TooltipSide> = {
  auto: "top",
  top: "top",
  bottom: "bottom",
  left: "left",
  right: "right",
};
