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

/** §20: xxs=inline 1.5rem · xs=section 1.75rem · sm=tertiary 2rem · md=secondary 2.25rem · lg=primary 2.5rem */
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
  { width: number | string; height: number | string }
> = {
  xxs: { width: "0.625rem", height: "0.625rem" },
  xs: { width: "0.75rem", height: "0.75rem" },
  sm: { width: "0.8125rem", height: "0.8125rem" },
  md: { width: "0.875rem", height: "0.875rem" },
  lg: { width: "1rem", height: "1rem" },
};

/** Icon-only: slightly larger glyphs inside square hit targets (better balance vs text+icon). */
export const defaultIconOnlySizeBySize: Record<
  ButtonSize,
  { width: number | string; height: number | string }
> = {
  xxs: { width: "0.75rem", height: "0.75rem" },
  xs: { width: "0.875rem", height: "0.875rem" },
  sm: { width: "1.125rem", height: "1.125rem" },
  md: { width: "1.25rem", height: "1.25rem" },
  lg: { width: "1.5rem", height: "1.5rem" },
};

/** @deprecated Use `defaultIconWithLabelSizeBySize` — same map. */
export const defaultIconSizeBySize = defaultIconWithLabelSizeBySize;

/** Back-compat default — `lg` with label (16px). */
export const defaultIconConfig = {
  width: defaultIconWithLabelSizeBySize.lg.width,
  height: defaultIconWithLabelSizeBySize.lg.height,
  color: "currentColor",
};
