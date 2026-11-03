import type { TooltipAlign, TooltipSide, TooltipVariant } from "./Tooltip.types";

export const TOOLTIP_DEFAULTS: {
  side: TooltipSide;
  align: TooltipAlign;
  delay: number;
  closeDelay: number;
  maxWidth: number;
  variant: TooltipVariant;
} = {
  side: "top",
  align: "center",
  delay: 300,
  closeDelay: 100,
  maxWidth: 240,
  variant: "dark",
};

/** Gap between trigger and bubble — mirrors `--space-1` (8px); the CSS hover bridge uses the same token. */
export const TOOLTIP_GAP = 8;
/** Minimum distance kept from the viewport edge. */
export const TOOLTIP_VIEWPORT_PADDING = 8;

export const TOOLTIP_SIDES: readonly TooltipSide[] = ["top", "right", "bottom", "left"] as const;
export const TOOLTIP_ALIGNS: readonly TooltipAlign[] = ["start", "center", "end"] as const;
export const TOOLTIP_VARIANTS: readonly TooltipVariant[] = ["dark", "light"] as const;
