import React from "react";
import { useRipple } from "../../common/useRipple";
import { ButtonProps } from "./Button.types";
import {
  variantClasses,
  sizeClasses,
  iconOnlySizeClasses,
  textSizeClasses,
  radiusClass,
  defaultIconOnlySizeBySize,
  defaultIconWithLabelSizeBySize,
  type ButtonVariant,
  type ButtonSize,
  type ButtonTextSize,
} from "./Button.config";
import Icon from "../Icon";
import { isSafeHref } from "../../../utils/safeHref";
import "./Button.css";

/** Dev-only warnings (stripped of effect in production builds). */
function isDev(): boolean {
  const env = (globalThis as { process?: { env?: { NODE_ENV?: string } } }).process?.env;
  return env?.NODE_ENV !== "production";
}

/** Anchor-only attributes that must not leak onto the `<button>` fallback for an unsafe href. */
const ANCHOR_ONLY_ATTRS = ["target", "rel", "download", "hrefLang", "ping", "referrerPolicy", "media"] as const;

/** Element a Button ref resolves to: `<button>`, or `<a>` when `href` is safe. */
export type ButtonElement = HTMLButtonElement | HTMLAnchorElement;

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

const ButtonImpl = React.forwardRef<ButtonElement, ButtonProps>(function Button({
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
  ripple = true,
  expandOnHover = false,
  loadingText = "Loading",
  href,
  ...rest
}, ref) {
  const hasText = !!children && (
    typeof children === "string"
      ? children.trim().length > 0
      : React.Children.count(children) > 0
  );
  const isIconOnly = !!icon && !hasText;
  /** Icon-only at rest, icon + label on hover / focus (needs icon and label). */
  const isExpandable = expandOnHover && !!icon && hasText;

  const variantClassNames = getVariantClass(variant);
  const resolvedVariant = variant == null || (variant as string) === "" ? "primary" : variant;
  const dsVariant = (VALID_VARIANTS.includes(resolvedVariant as ButtonVariant) ? resolvedVariant : "primary") as ButtonVariant;
  const sizeKey = ((size ?? "lg") in sizeClasses ? size : "lg") as ButtonSize;
  const sizeClassNames = isIconOnly
    ? iconOnlySizeClasses[sizeKey] ?? iconOnlySizeClasses.lg
    : sizeClasses[sizeKey] ?? sizeClasses.lg;
  const textSizeClassNames =
    textSize && textSize in textSizeClasses
      ? textSizeClasses[textSize as ButtonTextSize]
      : "";

  /** Icon-only buttons need an explicit name; text buttons use visible children (do not override with aria-label). */
  const restAria = rest as { "aria-label"?: string; "aria-labelledby"?: string; "aria-describedby"?: string; "aria-busy"?: React.AriaAttributes["aria-busy"] };
  const hasExplicitName = !!(ariaLabel || restAria["aria-label"] || restAria["aria-labelledby"]);
  const computedAriaLabel =
    ariaLabel ?? restAria["aria-label"] ?? (isIconOnly && !restAria["aria-labelledby"] ? "Button" : undefined);

  /** Unsafe scheme (javascript:, data:, vbscript: …) → render a <button> instead of a link. */
  const unsafeHref = href != null && !isSafeHref(href);
  const linkHref = href != null && !unsafeHref ? href : undefined;

  React.useEffect(() => {
    if (!isDev()) return;
    if (isIconOnly && !hasExplicitName) {
      console.warn(
        "[Button] Icon-only button has no accessible name. Pass `ariaLabel` (e.g. ariaLabel=\"Close\"); falling back to \"Button\".",
      );
    }
  }, [isIconOnly, hasExplicitName]);

  React.useEffect(() => {
    if (!isDev() || !unsafeHref) return;
    console.warn(
      `[Button] Refused unsafe href ${JSON.stringify(href)} (only http, https, mailto, tel, relative and # links are allowed). Rendering a <button> instead.`,
    );
  }, [unsafeHref, href]);

  const loadingId = React.useId();

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

  const baseClass = [
    "btn-base",
    variantClassNames,
    sizeClassNames,
    textSizeClassNames,
    loading ? "btn-loading" : "",
    gradient ? "btn-gradient" : "",
    variantClass ?? "",
    classOverrides.variant ?? "",
    rounded !== undefined ? `btn-rounded-${rounded}` : radiusClass,
    fullWidth || block ? "btn-full-width" : "",
    isExpandable ? "btn-expand-on-hover" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const iconSizeDefaults =
    isIconOnly
      ? defaultIconOnlySizeBySize[sizeKey]
      : defaultIconWithLabelSizeBySize[sizeKey];
  const finalIconWidth = iconWidth ?? iconSizeDefaults.width;
  const finalIconHeight = iconHeight ?? iconSizeDefaults.height;

  if (isExpandable) {
    // Collapsed: square at the tier height (1.5px border each side); open: the tier's normal padding.
    const iconW = typeof finalIconWidth === "number" ? `${finalIconWidth}px` : finalIconWidth;
    styleOverrides["--btn-expand-pad"] = `calc((var(--button-height-${sizeKey}) - ${iconW}) / 2 - 1.5px)`;
    styleOverrides["--btn-expand-pad-open"] = `var(--button-padding-x-${sizeKey})`;
  }

  const gapPx = Math.min(16, Math.max(0, iconGap));
  const gapSnap = [0, 4, 8, 12, 16].reduce((a, b) => (Math.abs(b - gapPx) < Math.abs(a - gapPx) ? b : a));
  const iconGapClass =
    !hasText || isExpandable || gapSnap === 8
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
    if (loading) {
      // Spinner takes the icon's slot at the icon's size, so the button keeps its width.
      const dim = (v: number | string) => (typeof v === "number" ? `${v}px` : v);
      return (
        <span
          className={["btn-spinner-slot", wrapperClass].filter(Boolean).join(" ")}
          style={{ width: dim(finalIconWidth), height: dim(finalIconHeight) }}
          aria-hidden="true"
        >
          <span className="btn-spinner" aria-hidden="true" />
        </span>
      );
    }
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

  const hasOverrides = Object.keys(styleOverrides).length > 0;
  const { style: restStyle, onPointerDown: restOnPointerDown, ...restWithoutStyle } = rest;
  const mergedStyle = hasOverrides ? { ...restStyle, ...styleOverrides } : restStyle;

  const content = (
    <>
      {loading && !icon && <span className="btn-spinner" aria-hidden="true" />}
      {icon && iconPosition === "left" && renderIcon()}
      {isExpandable ? <span className="btn-expand-label">{children}</span> : children}
      {icon && iconPosition === "right" && renderIcon()}
      {loading && (
        // Referenced by aria-describedby: the name stays the label ("Save"), the state is described ("Loading").
        <span id={loadingId} className="sr-only" aria-hidden="true">
          {loadingText}
        </span>
      )}
    </>
  );

  /** Explicit `disabled` → native disabled (as before). `loading` alone stays focusable (aria-disabled). */
  const nativeDisabled = Boolean((rest as { disabled?: boolean }).disabled);
  const isDisabled = nativeDisabled || loading;
  const ariaBusy = loading ? true : restAria["aria-busy"];
  const describedBy =
    [restAria["aria-describedby"], loading ? loadingId : undefined].filter(Boolean).join(" ") || undefined;
  const rippleEnabled = ripple !== false && !isDisabled;
  const rippleApi = useRipple(rippleEnabled);

  const pointerDown =
    (e: React.PointerEvent<HTMLButtonElement & HTMLAnchorElement>) => {
      rippleApi.onPointerDown(e as React.PointerEvent<HTMLElement>);
      restOnPointerDown?.(e);
    };

  const innerClass = [
    "btn-ripple-inner",
    fullWidth || block ? "btn-ripple-inner--full" : "",
  ]
    .filter(Boolean)
    .join(" ");

  const surfaceClass =
    rippleEnabled ?
      `${baseClass} ucs-ripple-parent`.trim()
    : baseClass;

  const body =
    rippleEnabled ?
      <>
        {rippleApi.RippleOverlay}
        <span className={innerClass}>{content}</span>
      </>
    : (
        content
      );

  if (linkHref !== undefined) {
    const { onClick, rel, ...linkRest } = restWithoutStyle as React.AnchorHTMLAttributes<HTMLAnchorElement>;
    const finalRel = rel ?? (linkRest.target === "_blank" ? "noopener noreferrer" : undefined);
    return (
      <a
        {...linkRest}
        ref={ref as React.Ref<HTMLAnchorElement>}
        // Loading keeps href so the link stays focusable (clicks are swallowed below); disabled drops it.
        href={nativeDisabled ? undefined : linkHref}
        rel={finalRel}
        className={surfaceClass}
        style={mergedStyle}
        aria-label={computedAriaLabel ?? undefined}
        aria-disabled={isDisabled || undefined}
        aria-busy={ariaBusy}
        aria-describedby={describedBy}
        data-variant={dsVariant}
        data-raw-variant={variant}
        onPointerDown={rippleEnabled ? pointerDown : (restOnPointerDown as React.PointerEventHandler<HTMLAnchorElement>)}
        onClick={(e) => {
          if (isDisabled) {
            e.preventDefault();
            e.stopPropagation();
            return;
          }
          onClick?.(e);
        }}
      >
        {body}
      </a>
    );
  }

  const buttonRest = { ...(restWithoutStyle as Record<string, unknown>) };
  // Expand-on-hover buttons render icon-only inside table cells (tokens.css), so give them a
  // native tooltip from their label when the caller didn't set one.
  if (isExpandable && buttonRest.title == null && typeof children === "string") buttonRest.title = children;
  if (unsafeHref) for (const attr of ANCHOR_ONLY_ATTRS) delete buttonRest[attr];
  const { onClick: buttonOnClick, ...buttonAttrs } = buttonRest as React.ButtonHTMLAttributes<HTMLButtonElement>;
  return (
    <button
      {...(unsafeHref ? { type: "button" as const } : null)}
      {...buttonAttrs}
      ref={ref as React.Ref<HTMLButtonElement>}
      className={surfaceClass}
      style={mergedStyle}
      disabled={nativeDisabled}
      aria-label={computedAriaLabel ?? undefined}
      aria-disabled={loading && !nativeDisabled ? true : buttonAttrs["aria-disabled"]}
      aria-busy={ariaBusy}
      aria-describedby={describedBy}
      data-variant={dsVariant}
      data-raw-variant={variant}
      onPointerDown={rippleEnabled ? pointerDown : (restOnPointerDown as React.PointerEventHandler<HTMLButtonElement>)}
      onClick={(e) => {
        if (loading) {
          // Swallows mouse clicks and Enter / Space activation (both dispatch click); also blocks form submit.
          e.preventDefault();
          e.stopPropagation();
          return;
        }
        buttonOnClick?.(e);
      }}
    >
      {body}
    </button>
  );
});

/** Memoised + ref-forwarding: refs reach the rendered `<button>` / `<a>`. */
const Button = React.memo(ButtonImpl);
Button.displayName = "Button";
ButtonImpl.displayName = "Button";

export default Button;
