import type { SegmentedControlSize } from "./SegmentedControl.types";

export const SEGMENTED_CONTROL_DEFAULTS: { size: SegmentedControlSize; fullWidth: boolean } = {
  size: "md",
  fullWidth: false,
};

export const SEGMENTED_CONTROL_SIZES: readonly SegmentedControlSize[] = ["sm", "md"] as const;

/** Keys that move (and select) within the group. Horizontal arrows flip in RTL. */
export const SEGMENTED_NEXT_KEYS = ["ArrowRight", "ArrowDown"] as const;
export const SEGMENTED_PREV_KEYS = ["ArrowLeft", "ArrowUp"] as const;
