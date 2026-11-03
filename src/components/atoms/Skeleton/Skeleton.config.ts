import type { SkeletonShape } from "./Skeleton.types";

export const SKELETON_DEFAULTS: {
  shape: SkeletonShape;
  lines: number;
  animated: boolean;
  groupLabel: string;
} = {
  shape: "text",
  lines: 1,
  animated: true,
  groupLabel: "Loading content",
};

export const SKELETON_SHAPES: readonly SkeletonShape[] = ["text", "rect", "circle"] as const;

/** Width of the final line of a multi-line text skeleton. */
export const SKELETON_LAST_LINE_WIDTH = "60%";
