/* ucs:component-css */
import "./styles/components/atoms/TextView/TextView.css";
// src/components/atoms/TextView/index.tsx
import React from "react";

// src/components/atoms/TextView/TextView.config.ts
var variantClassMap = {
  h1: "tv-h1",
  h2: "tv-h2",
  h3: "tv-h3",
  h4: "tv-h4",
  body: "tv-body",
  secondary: "tv-secondary",
  small: "tv-small",
  micro: "tv-micro"
};
var fontSizeClassMap = {
  h1: "tv-h1",
  h2: "tv-h2",
  h3: "tv-h3",
  h4: "tv-h4",
  body: "tv-body",
  secondary: "tv-secondary",
  small: "tv-small",
  micro: "tv-micro"
};
var fontWeightClassMap = {
  normal: "font-normal",
  medium: "font-medium",
  semibold: "font-semibold",
  bold: "font-bold",
  extrabold: "font-extrabold"
};
var lineHeightClassMap = {
  none: "leading-none",
  tight: "leading-tight",
  snug: "leading-snug",
  normal: "leading-normal",
  relaxed: "leading-relaxed",
  loose: "leading-loose"
};
var letterSpacingClassMap = {
  tighter: "tracking-tighter",
  tight: "tracking-tight",
  normal: "tracking-normal",
  wide: "tracking-wide",
  wider: "tracking-wider",
  widest: "tracking-widest"
};
var defaultTagByVariant = {
  h1: "h1",
  h2: "h2",
  h3: "h3",
  h4: "h4",
  body: "span",
  secondary: "span",
  small: "small",
  micro: "small"
};
var colorClassMap = {
  primary: "tv-color-primary",
  secondary: "tv-color-secondary",
  hint: "tv-color-secondary",
  disabled: "tv-color-secondary",
  success: "tv-color-success",
  warning: "tv-color-warning",
  error: "tv-color-error",
  inherit: ""
};
var alignClassMap = {
  left: "text-start",
  center: "text-center",
  right: "text-end",
  justify: "text-justify"
};
var transformClassMap = {
  none: "normal-case",
  uppercase: "uppercase",
  lowercase: "lowercase",
  capitalize: "capitalize"
};
var decorationClassMap = {
  none: "no-underline",
  underline: "underline",
  "line-through": "line-through"
};

// src/components/atoms/TextView/TextView.utils.ts
var cls = (...classes) => classes.filter(Boolean).join(" ");

// src/components/atoms/TextView/index.tsx
var SEMANTIC_COLORS = [
  "primary",
  "secondary",
  "hint",
  "disabled",
  "success",
  "warning",
  "error",
  "inherit"
];
function isSemanticColor(color) {
  return SEMANTIC_COLORS.includes(color);
}
function isTokenFontSize(v) {
  return typeof v === "string" && v in fontSizeClassMap;
}
function isTokenFontWeight(v) {
  return typeof v === "string" && v in fontWeightClassMap;
}
var TextView = React.memo(function TextView2({
  as,
  children,
  variant = "body",
  color = "primary",
  fontSize,
  fontWeight,
  lineHeight,
  letterSpacing,
  align = "left",
  transform = "none",
  decoration = "none",
  className = "",
  truncate = false,
  style,
  ...restProps
}) {
  const resolvedVariant = variant;
  const fallbackTag = defaultTagByVariant[resolvedVariant] || "span";
  const Component = as || fallbackTag;
  const useFontSizeStyle = typeof fontSize === "string" && fontSize.length > 0 && !isTokenFontSize(fontSize);
  const sizeClass = isTokenFontSize(fontSize) ? fontSizeClassMap[fontSize] : variantClassMap[resolvedVariant];
  const useFontWeightStyle = typeof fontWeight === "number" || typeof fontWeight === "string" && fontWeight.length > 0 && !isTokenFontWeight(fontWeight);
  const weightClass = isTokenFontWeight(fontWeight) ? fontWeightClassMap[fontWeight] : "";
  const useColorStyle = typeof color === "string" && color.length > 0 && !isSemanticColor(color);
  const colorClass = !useColorStyle && color ? colorClassMap[color] : "";
  const finalClassName = cls(
    "font-sans",
    sizeClass,
    weightClass,
    lineHeight && lineHeightClassMap[lineHeight],
    letterSpacing && letterSpacingClassMap[letterSpacing],
    colorClass,
    alignClassMap[align],
    transformClassMap[transform],
    decorationClassMap[decoration],
    truncate && "truncate",
    className
  );
  const finalStyle = useColorStyle || useFontSizeStyle || useFontWeightStyle ? {
    ...style,
    ...useColorStyle ? { color } : null,
    ...useFontSizeStyle ? { fontSize } : null,
    ...useFontWeightStyle ? { fontWeight } : null
  } : style;
  return React.createElement(
    Component,
    { className: finalClassName, style: finalStyle, ...restProps },
    children
  );
});
var TextView_default = TextView;

export {
  TextView_default
};
//# sourceMappingURL=chunk-QLCAIULL.mjs.map