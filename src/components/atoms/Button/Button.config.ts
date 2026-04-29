/**
 * Button variants and sizes via CSS classes (no inline styles).
 * Classes are defined in design-system/tokens.css.
 *
 * - primary / secondary = fill (background color)
 * - outlinePrimary / outlineSecondary = outline only (border + text, no fill)
 * - success / danger / warning = fill (semantic colors)
 * - link = no background, no border (text link only)
 */

export type ButtonVariant =
  | "default"
  | "primary"
  | "secondary"
  | "outlinePrimary"
  | "outlineSecondary"
  | "success"
  | "danger"
  | "warning"
  | "link"
  | "ghost";

/** §20: xxs=inline 24 · xs=section 28 · sm=tertiary 32 · md=secondary/outlined 36 · lg=primary 40 (2px vertical padding) */
export type ButtonSize = "xxs" | "xs" | "sm" | "md" | "lg";

/** Variant → CSS class name (tokens.css). "default" = primary. */
export const variantClasses: Record<ButtonVariant, string> = {
  default: "btn-primary",
  primary: "btn-primary",
  secondary: "btn-secondary",
  outlinePrimary: "btn-outline-primary",
  outlineSecondary: "btn-outline-secondary",
  success: "btn-success",
  danger: "btn-danger",
  warning: "btn-warning",
  link: "btn-link",
  ghost: "btn-ghost",
};

/** Size → CSS class (with text) */
export const sizeClasses: Record<ButtonSize, string> = {
  xxs: "btn-size-xxs",
  xs: "btn-size-xs",
  sm: "btn-size-sm",
  md: "btn-size-md",
  lg: "btn-size-lg",
};

/** Icon-only size → CSS class */
export const iconOnlySizeClasses: Record<ButtonSize, string> = {
  xxs: "btn-icon-only-xxs",
  xs: "btn-icon-only-xs",
  sm: "btn-icon-only-sm",
  md: "btn-icon-only-md",
  lg: "btn-icon-only-lg",
};

export const radiusClass = "btn-rounded-md";

/**
 * Icon beside label — smaller than standalone UI icons (cap-height vs font-size).
 * Icon-only tiles use `defaultIconOnlySizeBySize` instead.
 */
export const defaultIconWithLabelSizeBySize: Record<
  ButtonSize,
  { width: number; height: number }
> = {
  xxs: { width: 10, height: 10 },
  xs: { width: 12, height: 12 },
  sm: { width: 13, height: 13 },
  md: { width: 14, height: 14 },
  lg: { width: 16, height: 16 },
};

/** Icon-only: slightly larger glyphs inside square hit targets (better balance vs text+icon). */
export const defaultIconOnlySizeBySize: Record<
  ButtonSize,
  { width: number; height: number }
> = {
  xxs: { width: 12, height: 12 },
  xs: { width: 14, height: 14 },
  sm: { width: 18, height: 18 },
  md: { width: 20, height: 20 },
  lg: { width: 24, height: 24 },
};

/** @deprecated Use `defaultIconWithLabelSizeBySize` — same map. */
export const defaultIconSizeBySize = defaultIconWithLabelSizeBySize;

/** Back-compat default — `lg` with label (16px). */
export const defaultIconConfig = {
  width: defaultIconWithLabelSizeBySize.lg.width,
  height: defaultIconWithLabelSizeBySize.lg.height,
  color: "currentColor",
};
