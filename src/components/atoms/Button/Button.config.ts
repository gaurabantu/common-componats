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

/** §20: xxs=inline 28px · xs=section 32 · sm=tertiary 36 · md=secondary/outlined 40 · lg=primary 44 */
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

export const defaultIconConfig = {
  width: 20,
  height: 20,
  color: "currentColor",
};
