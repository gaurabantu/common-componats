import type { HTMLAttributes, ReactNode } from "react";

export type BadgeVariant =
  | "neutral"
  | "primary"
  | "success"
  | "warning"
  | "danger"
  | "info";

/** Soft = tinted surface; solid = strong fill; outline = border emphasis */
export type BadgeTone = "soft" | "solid" | "outline";

/** `rounded` = tag/badge (token radius-xs); `pill` = chip */
export type BadgeShape = "rounded" | "pill";

export type BadgeSize = "sm" | "md";

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  children: ReactNode;
  variant?: BadgeVariant;
  tone?: BadgeTone;
  shape?: BadgeShape;
  size?: BadgeSize;
  /** Subtle elevation (shadow-xs) */
  elevated?: boolean;
  /** Leading status dot (e.g. live / unread) */
  dot?: boolean;
  /** Optional leading icon or node (compact; use with `md` for balance) */
  icon?: ReactNode;
  /** Renders a dismiss control; keep label meaningful for assistive tech */
  onDismiss?: () => void;
  dismissLabel?: string;
}

/** Alias — same props as `Badge` */
export type ChipProps = BadgeProps;
/** Alias — same props as `Badge` */
export type TagProps = BadgeProps;
