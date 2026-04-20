import { ProgressBarSize } from "./ProgresBar.types";

export const DEFAULT_COLOR = "var(--color-brand-primary)";
export const DEFAULT_HEIGHT = "1rem";
export const DEFAULT_WIDTH = "100%";
export const DEFAULT_ARIA_LABEL = "Progress";
export const DEFAULT_TYPE = "line";
export const DEFAULT_SIZE: ProgressBarSize = "lg";

export const SIZE_DIMENSIONS: Record<ProgressBarSize, number> = {
  xs: 32,
  sm: 45,
  md: 70,
  lg: 90,
};
