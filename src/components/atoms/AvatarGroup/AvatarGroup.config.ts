import type { AvatarGroupSize, AvatarGroupSpacing } from "./AvatarGroup.types";

export const AVATAR_GROUP_DEFAULTS: { max: number; size: AvatarGroupSize; spacing: AvatarGroupSpacing } = {
  max: 4,
  size: "md",
  spacing: "normal",
};

export const AVATAR_GROUP_SIZES: readonly AvatarGroupSize[] = ["xs", "sm", "md", "lg"] as const;
export const AVATAR_GROUP_SPACINGS: readonly AvatarGroupSpacing[] = ["tight", "normal", "loose"] as const;

/** Avatar takes a numeric px `size`; presets map onto it. */
export const AVATAR_GROUP_SIZE_PX: Record<AvatarGroupSize, number> = { xs: 24, sm: 32, md: 40, lg: 48 };

/** Max hidden names spelled out in the chip's accessible name before "and N others". */
export const AVATAR_GROUP_MAX_SPOKEN_NAMES = 10;

export function resolveAvatarSize(size: AvatarGroupSize | number): number {
  return typeof size === "number" ? size : AVATAR_GROUP_SIZE_PX[size];
}

/** "Show 3 more: Ana, Ben, Cy" / "Show 12 more: A, B, … and 2 others" / "Show 5 more". */
export function overflowLabel(hiddenCount: number, hiddenNames: string[]): string {
  const base = `Show ${hiddenCount} more`;
  if (hiddenNames.length === 0) return base;
  const spoken = hiddenNames.slice(0, AVATAR_GROUP_MAX_SPOKEN_NAMES);
  const rest = hiddenCount - spoken.length;
  return `${base}: ${spoken.join(", ")}${rest > 0 ? ` and ${rest} other${rest === 1 ? "" : "s"}` : ""}`;
}
