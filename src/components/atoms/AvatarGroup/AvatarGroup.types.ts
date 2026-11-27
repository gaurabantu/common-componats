import type { HTMLAttributes, ReactNode } from "react";
import type { AvatarProps } from "../Avatar/Avatar.types";

/** Preset avatar edge: `xs` 24px · `sm` 32px · `md` 40px (Avatar default) · `lg` 48px. A number = px. */
export type AvatarGroupSize = "xs" | "sm" | "md" | "lg";

/** How far avatars overlap: `tight` 40% · `normal` 25% · `loose` 10% of the avatar edge. */
export type AvatarGroupSpacing = "tight" | "normal" | "loose";

/** One person. `name` is the accessible name (and the initials source). */
export interface AvatarGroupItem extends Omit<AvatarProps, "size" | "className" | "style"> {
  id?: string | number;
  name?: string;
}

export interface AvatarGroupProps extends Omit<HTMLAttributes<HTMLDivElement>, "children"> {
  /** Data API. Ignored when `children` are passed. */
  items?: AvatarGroupItem[];
  /** `Avtar` / `Avatar` elements (their `name` / `alt` props name the overflow list). */
  children?: ReactNode;
  /** Avatars shown before the "+N" chip (the chip is extra). @default 4 */
  max?: number;
  /**
   * Total number of people when it exceeds the items you pass (e.g. server-side count).
   * The chip shows `total - visible`.
   */
  total?: number;
  size?: AvatarGroupSize | number;
  spacing?: AvatarGroupSpacing;
  /** Accessible name of the group. @default "{count} people" */
  label?: string;
  /**
   * Called when the "+N" chip is activated. When provided, the chip is a plain button (no popover);
   * otherwise the chip opens a popover listing the hidden people.
   */
  onOverflowClick?: () => void;
  /** Custom overflow chip content. @default "+N" */
  renderOverflow?: (hiddenCount: number) => ReactNode;
}
