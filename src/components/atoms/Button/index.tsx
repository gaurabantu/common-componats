import React from "react";
import { ButtonProps } from "./Button.types";
import {
  variantClasses,
  sizeClasses,
  iconOnlySizeClasses,
  radiusClass,
  defaultIconConfig,
  type ButtonVariant,
  type ButtonSize,
} from "./Button.config";
import Icon from "../Icon";

const VALID_VARIANTS: ButtonVariant[] = [
  "default",
  "primary",
  "secondary",
  "outlinePrimary",
  "outlineSecondary",
  "success",
  "danger",
  "warning",
  "link",
  "ghost",
];

function getVariantClass(v: string | undefined): string {
  if (v === undefined || v === null || v === "") return variantClasses.primary;
  if (VALID_VARIANTS.includes(v as ButtonVariant)) return variantClasses[v as ButtonVariant];
  return variantClasses.primary;
}

const Button = React.memo(function Button({
  children,
  variant = "primary",
  variantClass,
  size = "lg",
  width,
  height,
  rounded,
  classOverrides = {},
  borderColor,
  backgroundColor,
  textColor,
  gradient,
  gradientHover,
  gradientActive,
  textSize,
  icon,
  iconPosition = "left",
  iconWidth,
  iconHeight,
  iconColor,
  iconGap = 8,
  fullWidth = false,
  block = false,
  loading = false,
  className = "",
  ariaLabel,
  preserveIconColor = false,
  href,
  ...rest
}: ButtonProps) {
  const hasText = !!children && (
    typeof children === "string"
      ? children.trim().length > 0
      : React.Children.count(children) > 0
  );
  const isIconOnly = !!icon && !hasText;

  const variantClassNames = getVariantClass(variant);
  const resolvedVariant = variant == null || (variant as string) === "" ? "primary" : variant;
  const dsVariant = (VALID_VARIANTS.includes(resolvedVariant as ButtonVariant) ? resolvedVariant : "primary") as ButtonVariant;
  const sizeKey = ((size ?? "lg") in sizeClasses ? size : "lg") as ButtonSize;
  const sizeClassNames = isIconOnly
    ? iconOnlySizeClasses[sizeKey] ?? iconOnlySizeClasses.lg
    : sizeClasses[sizeKey] ?? sizeClasses.lg;

  /** Icon-only buttons need an explicit name; text buttons use visible children (do not override with aria-label). */
  const computedAriaLabel =
    ariaLabel ?? (isIconOnly ? "Button" : undefined);

  const styleOverrides: React.CSSProperties & Record<string, string> = {};
  if (backgroundColor) styleOverrides.backgroundColor = backgroundColor;
  if (borderColor) styleOverrides.borderColor = borderColor;
  if (textColor) styleOverrides.color = textColor;
  if (width !== undefined) styleOverrides.width = typeof width === "number" ? `${width}px` : width;
  if (height !== undefined) styleOverrides.height = typeof height === "number" ? `${height}px` : height;
  if (gradient) {
    styleOverrides["--button-gradient-bg"] = gradient;
    styleOverrides["--button-gradient-hover-bg"] = gradientHover || gradient;
    styleOverrides["--button-gradient-active-bg"] = gradientActive || gradientHover || gradient;
  }

  const hasOverrides = Object.keys(styleOverrides).length > 0;

  const baseClass = [
    "btn-base",
    variantClassNames,
    sizeClassNames,
    loading ? "btn-loading" : "",
    gradient ? "btn-gradient" : "",
    variantClass ?? "",
    classOverrides.variant ?? "",
    rounded !== undefined ? `btn-rounded-${rounded}` : radiusClass,
    fullWidth || block ? "btn-full-width" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const finalIconWidth = iconWidth ?? defaultIconConfig.width;
  const finalIconHeight = iconHeight ?? defaultIconConfig.height;

  const gapPx = Math.min(16, Math.max(0, iconGap));
  const gapSnap = [0, 4, 8, 12, 16].reduce((a, b) => (Math.abs(b - gapPx) < Math.abs(a - gapPx) ? b : a));
  const iconGapClass =
    !hasText || gapSnap === 8
      ? ""
      : iconPosition === "left"
        ? `btn-icon-gap-right-${gapSnap}`
        : `btn-icon-gap-left-${gapSnap}`;

  const renderIcon = () => {
    if (!icon) return null;
    const wrapperClass = [
      hasText && iconPosition === "left" && "btn-icon-left",
      hasText && iconPosition === "right" && "btn-icon-right",
      iconGapClass,
    ]
      .filter(Boolean)
      .join(" ");
    return (
      <span className={wrapperClass || undefined}>
        <Icon
          src={icon}
          width={finalIconWidth}
          height={finalIconHeight}
          preserveColors={preserveIconColor}
          color={iconColor || "currentColor"}
          className="btn-icon-inner"
        />
      </span>
    );
  };

  const { style: restStyle, ...restWithoutStyle } = rest;
  const mergedStyle = hasOverrides ? { ...restStyle, ...styleOverrides } : restStyle;

  const content = (
    <>
      {loading && <span className="btn-spinner" aria-hidden="true" />}
      {icon && iconPosition === "left" && renderIcon()}
      {children}
      {icon && iconPosition === "right" && renderIcon()}
    </>
  );

  const isDisabled = Boolean((rest as any).disabled) || loading;

  if (href) {
    const { onClick, ...linkRest } = restWithoutStyle as React.AnchorHTMLAttributes<HTMLAnchorElement>;
    return (
      <a
        {...linkRest}
        href={isDisabled ? undefined : href}
        className={baseClass}
        style={mergedStyle}
        aria-label={computedAriaLabel ?? undefined}
        aria-disabled={isDisabled || undefined}
        data-variant={dsVariant}
        data-raw-variant={variant}
        onClick={(e) => {
          if (isDisabled) {
            e.preventDefault();
            e.stopPropagation();
            return;
          }
          onClick?.(e);
        }}
      >
        {content}
      </a>
    );
  }

  const buttonRest = restWithoutStyle as React.ButtonHTMLAttributes<HTMLButtonElement>;
  return (
    <button
      {...buttonRest}
      className={baseClass}
      style={mergedStyle}
      disabled={isDisabled}
      aria-label={computedAriaLabel ?? undefined}
      data-variant={dsVariant}
      data-raw-variant={variant}
    >
      {content}
    </button>
  );
});

export default Button;
