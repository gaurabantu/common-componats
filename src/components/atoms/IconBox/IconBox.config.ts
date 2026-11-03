import type { IconBoxShape, IconBoxSize, IconBoxTone } from "./IconBox.types";

export const ICON_BOX_DEFAULTS: { tone: IconBoxTone; size: IconBoxSize; shape: IconBoxShape } = {
  tone: "neutral",
  size: "md",
  shape: "rounded",
};

export const ICON_BOX_TONES: readonly IconBoxTone[] = [
  "neutral",
  "strong",
  "outline",
  "primary",
  "success",
  "warning",
  "danger",
  "info",
] as const;

export const ICON_BOX_SIZES: readonly IconBoxSize[] = ["sm", "md", "lg", "xl"] as const;
