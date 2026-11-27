/* ucs:component-css */
import "./styles/components/atoms/Button/Button.css";
import {
  Icon_default
} from "./chunk-6JJMOGWW.mjs";
import {
  useRipple
} from "./chunk-55QUGZRT.mjs";
import {
  isSafeHref
} from "./chunk-2SUDH5VN.mjs";

// src/components/atoms/Button/index.tsx
import React from "react";

// src/components/atoms/Button/Button.config.ts
var variantClasses = {
  default: "btn-primary",
  primary: "btn-primary",
  secondary: "btn-secondary",
  outlinePrimary: "btn-outline-primary",
  outlineSecondary: "btn-outline-secondary",
  success: "btn-success",
  danger: "btn-danger",
  warning: "btn-warning",
  link: "btn-link",
  ghost: "btn-ghost"
};
var sizeClasses = {
  xxs: "btn-size-xxs",
  xs: "btn-size-xs",
  sm: "btn-size-sm",
  md: "btn-size-md",
  lg: "btn-size-lg"
};
var textSizeClasses = {
  sm: "btn-text-size-sm",
  md: "btn-text-size-md",
  lg: "btn-text-size-lg"
};
var iconOnlySizeClasses = {
  xxs: "btn-icon-only-xxs",
  xs: "btn-icon-only-xs",
  sm: "btn-icon-only-sm",
  md: "btn-icon-only-md",
  lg: "btn-icon-only-lg"
};
var radiusClass = "btn-rounded-md";
var defaultIconWithLabelSizeBySize = {
  xxs: { width: "0.625rem", height: "0.625rem" },
  xs: { width: "0.75rem", height: "0.75rem" },
  sm: { width: "0.8125rem", height: "0.8125rem" },
  md: { width: "0.875rem", height: "0.875rem" },
  lg: { width: "1rem", height: "1rem" }
};
var defaultIconOnlySizeBySize = {
  xxs: { width: "0.6875rem", height: "0.6875rem" },
  xs: { width: "0.8125rem", height: "0.8125rem" },
  sm: { width: "1rem", height: "1rem" },
  md: { width: "1.125rem", height: "1.125rem" },
  lg: { width: "1.5rem", height: "1.5rem" }
};
var defaultIconConfig = {
  width: defaultIconWithLabelSizeBySize.lg.width,
  height: defaultIconWithLabelSizeBySize.lg.height,
  color: "currentColor"
};

// src/components/atoms/Button/index.tsx
import { Fragment, jsx, jsxs } from "react/jsx-runtime";
function isDev() {
  var _a;
  const env = (_a = globalThis.process) == null ? void 0 : _a.env;
  return (env == null ? void 0 : env.NODE_ENV) !== "production";
}
var ANCHOR_ONLY_ATTRS = ["target", "rel", "download", "hrefLang", "ping", "referrerPolicy", "media"];
var VALID_VARIANTS = [
  "default",
  "primary",
  "secondary",
  "outlinePrimary",
  "outlineSecondary",
  "success",
  "danger",
  "warning",
  "link",
  "ghost"
];
function getVariantClass(v) {
  if (v === void 0 || v === null || v === "")
    return variantClasses.primary;
  if (VALID_VARIANTS.includes(v))
    return variantClasses[v];
  return variantClasses.primary;
}
var ButtonImpl = React.forwardRef(function Button({
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
  unstyled = false,
  loadingText = "Loading",
  href,
  ...rest
}, ref) {
  var _a, _b, _c, _d;
  const hasText = !!children && (typeof children === "string" ? children.trim().length > 0 : React.Children.count(children) > 0);
  const isIconOnly = !!icon && !hasText;
  const isExpandable = expandOnHover && !!icon && hasText;
  const variantClassNames = getVariantClass(variant);
  const resolvedVariant = variant == null || variant === "" ? "primary" : variant;
  const dsVariant = VALID_VARIANTS.includes(resolvedVariant) ? resolvedVariant : "primary";
  const sizeKey = (size != null ? size : "lg") in sizeClasses ? size : "lg";
  const sizeClassNames = isIconOnly ? (_a = iconOnlySizeClasses[sizeKey]) != null ? _a : iconOnlySizeClasses.lg : (_b = sizeClasses[sizeKey]) != null ? _b : sizeClasses.lg;
  const textSizeClassNames = textSize && textSize in textSizeClasses ? textSizeClasses[textSize] : "";
  const restAria = rest;
  const hasExplicitName = !!(ariaLabel || restAria["aria-label"] || restAria["aria-labelledby"]);
  const computedAriaLabel = (_c = ariaLabel != null ? ariaLabel : restAria["aria-label"]) != null ? _c : isIconOnly && !restAria["aria-labelledby"] ? "Button" : void 0;
  const unsafeHref = href != null && !isSafeHref(href);
  const linkHref = href != null && !unsafeHref ? href : void 0;
  React.useEffect(() => {
    if (!isDev())
      return;
    if (isIconOnly && !hasExplicitName) {
      console.warn(
        '[Button] Icon-only button has no accessible name. Pass `ariaLabel` (e.g. ariaLabel="Close"); falling back to "Button".'
      );
    }
  }, [isIconOnly, hasExplicitName]);
  React.useEffect(() => {
    if (!isDev() || !unsafeHref)
      return;
    console.warn(
      `[Button] Refused unsafe href ${JSON.stringify(href)} (only http, https, mailto, tel, relative and # links are allowed). Rendering a <button> instead.`
    );
  }, [unsafeHref, href]);
  const loadingId = React.useId();
  const styleOverrides = {};
  if (backgroundColor)
    styleOverrides.backgroundColor = backgroundColor;
  if (borderColor)
    styleOverrides.borderColor = borderColor;
  if (textColor)
    styleOverrides.color = textColor;
  if (width !== void 0)
    styleOverrides.width = typeof width === "number" ? `${width}px` : width;
  if (height !== void 0)
    styleOverrides.height = typeof height === "number" ? `${height}px` : height;
  if (gradient) {
    styleOverrides["--button-gradient-bg"] = gradient;
    styleOverrides["--button-gradient-hover-bg"] = gradientHover || gradient;
    styleOverrides["--button-gradient-active-bg"] = gradientActive || gradientHover || gradient;
  }
  const baseClass = unstyled ? ["btn-unstyled", loading ? "btn-loading" : "", className].filter(Boolean).join(" ") : [
    "btn-base",
    variantClassNames,
    sizeClassNames,
    textSizeClassNames,
    loading ? "btn-loading" : "",
    gradient ? "btn-gradient" : "",
    variantClass != null ? variantClass : "",
    (_d = classOverrides.variant) != null ? _d : "",
    rounded !== void 0 ? `btn-rounded-${rounded}` : radiusClass,
    fullWidth || block ? "btn-full-width" : "",
    isExpandable ? "btn-expand-on-hover" : "",
    className
  ].filter(Boolean).join(" ");
  const iconSizeDefaults = isIconOnly ? defaultIconOnlySizeBySize[sizeKey] : defaultIconWithLabelSizeBySize[sizeKey];
  const finalIconWidth = iconWidth != null ? iconWidth : iconSizeDefaults.width;
  const finalIconHeight = iconHeight != null ? iconHeight : iconSizeDefaults.height;
  if (isExpandable) {
    const iconW = typeof finalIconWidth === "number" ? `${finalIconWidth}px` : finalIconWidth;
    styleOverrides["--btn-expand-pad"] = `calc((var(--button-height-${sizeKey}) - ${iconW}) / 2 - 1.5px)`;
    styleOverrides["--btn-expand-pad-open"] = `var(--button-padding-x-${sizeKey})`;
  }
  const gapPx = Math.min(16, Math.max(0, iconGap));
  const gapSnap = [0, 4, 8, 12, 16].reduce((a, b) => Math.abs(b - gapPx) < Math.abs(a - gapPx) ? b : a);
  const iconGapClass = !hasText || isExpandable || gapSnap === 8 ? "" : iconPosition === "left" ? `btn-icon-gap-right-${gapSnap}` : `btn-icon-gap-left-${gapSnap}`;
  const renderIcon = () => {
    if (!icon)
      return null;
    const wrapperClass = [
      hasText && iconPosition === "left" && "btn-icon-left",
      hasText && iconPosition === "right" && "btn-icon-right",
      iconGapClass
    ].filter(Boolean).join(" ");
    if (loading) {
      const dim = (v) => typeof v === "number" ? `${v}px` : v;
      return /* @__PURE__ */ jsx(
        "span",
        {
          className: ["btn-spinner-slot", wrapperClass].filter(Boolean).join(" "),
          style: { width: dim(finalIconWidth), height: dim(finalIconHeight) },
          "aria-hidden": "true",
          children: /* @__PURE__ */ jsx("span", { className: "btn-spinner", "aria-hidden": "true" })
        }
      );
    }
    return /* @__PURE__ */ jsx("span", { className: wrapperClass || void 0, children: /* @__PURE__ */ jsx(
      Icon_default,
      {
        src: icon,
        width: finalIconWidth,
        height: finalIconHeight,
        preserveColors: preserveIconColor,
        color: iconColor || "currentColor",
        className: "btn-icon-inner"
      }
    ) });
  };
  const hasOverrides = Object.keys(styleOverrides).length > 0;
  const { style: restStyle, onPointerDown: restOnPointerDown, ...restWithoutStyle } = rest;
  const mergedStyle = hasOverrides ? { ...restStyle, ...styleOverrides } : restStyle;
  const content = /* @__PURE__ */ jsxs(Fragment, { children: [
    loading && !icon && /* @__PURE__ */ jsx("span", { className: "btn-spinner", "aria-hidden": "true" }),
    icon && iconPosition === "left" && renderIcon(),
    isExpandable ? /* @__PURE__ */ jsx("span", { className: "btn-expand-label", children }) : children,
    icon && iconPosition === "right" && renderIcon(),
    loading && // Referenced by aria-describedby: the name stays the label ("Save"), the state is described ("Loading").
    /* @__PURE__ */ jsx("span", { id: loadingId, className: "sr-only", "aria-hidden": "true", children: loadingText })
  ] });
  const nativeDisabled = Boolean(rest.disabled);
  const isDisabled = nativeDisabled || loading;
  const ariaBusy = loading ? true : restAria["aria-busy"];
  const describedBy = [restAria["aria-describedby"], loading ? loadingId : void 0].filter(Boolean).join(" ") || void 0;
  const rippleEnabled = ripple !== false && !isDisabled && !unstyled;
  const rippleApi = useRipple(rippleEnabled);
  const pointerDown = (e) => {
    rippleApi.onPointerDown(e);
    restOnPointerDown == null ? void 0 : restOnPointerDown(e);
  };
  const innerClass = [
    "btn-ripple-inner",
    fullWidth || block ? "btn-ripple-inner--full" : ""
  ].filter(Boolean).join(" ");
  const surfaceClass = rippleEnabled ? `${baseClass} ucs-ripple-parent`.trim() : baseClass;
  const body = rippleEnabled ? /* @__PURE__ */ jsxs(Fragment, { children: [
    rippleApi.RippleOverlay,
    /* @__PURE__ */ jsx("span", { className: innerClass, children: content })
  ] }) : content;
  if (linkHref !== void 0) {
    const { onClick, rel, ...linkRest } = restWithoutStyle;
    const finalRel = rel != null ? rel : linkRest.target === "_blank" ? "noopener noreferrer" : void 0;
    return /* @__PURE__ */ jsx(
      "a",
      {
        ...linkRest,
        ref,
        href: nativeDisabled ? void 0 : linkHref,
        rel: finalRel,
        className: surfaceClass,
        style: mergedStyle,
        "aria-label": computedAriaLabel != null ? computedAriaLabel : void 0,
        "aria-disabled": isDisabled || void 0,
        "aria-busy": ariaBusy,
        "aria-describedby": describedBy,
        "data-variant": dsVariant,
        "data-raw-variant": variant,
        onPointerDown: rippleEnabled ? pointerDown : restOnPointerDown,
        onClick: (e) => {
          if (isDisabled) {
            e.preventDefault();
            e.stopPropagation();
            return;
          }
          onClick == null ? void 0 : onClick(e);
        },
        children: body
      }
    );
  }
  const buttonRest = { ...restWithoutStyle };
  if (isExpandable && buttonRest.title == null && typeof children === "string")
    buttonRest.title = children;
  if (unsafeHref)
    for (const attr of ANCHOR_ONLY_ATTRS)
      delete buttonRest[attr];
  const { onClick: buttonOnClick, ...buttonAttrs } = buttonRest;
  return /* @__PURE__ */ jsx(
    "button",
    {
      ...unsafeHref ? { type: "button" } : null,
      ...buttonAttrs,
      ref,
      className: surfaceClass,
      style: mergedStyle,
      disabled: nativeDisabled,
      "aria-label": computedAriaLabel != null ? computedAriaLabel : void 0,
      "aria-disabled": loading && !nativeDisabled ? true : buttonAttrs["aria-disabled"],
      "aria-busy": ariaBusy,
      "aria-describedby": describedBy,
      "data-variant": dsVariant,
      "data-raw-variant": variant,
      onPointerDown: rippleEnabled ? pointerDown : restOnPointerDown,
      onClick: (e) => {
        if (loading) {
          e.preventDefault();
          e.stopPropagation();
          return;
        }
        buttonOnClick == null ? void 0 : buttonOnClick(e);
      },
      children: body
    }
  );
});
var Button2 = React.memo(ButtonImpl);
Button2.displayName = "Button";
ButtonImpl.displayName = "Button";
var Button_default = Button2;

export {
  Button_default
};
//# sourceMappingURL=chunk-XIOFTDBU.mjs.map