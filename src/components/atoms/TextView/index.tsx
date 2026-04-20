import React from "react";
import { FontSize, FontWeight, TextColor, TextTag, TextViewProps, TextVariant } from "./TextView.types";
import {
  alignClassMap,
  colorClassMap,
  decorationClassMap,
  defaultTagByVariant,
  fontSizeClassMap,
  fontWeightClassMap,
  letterSpacingClassMap,
  lineHeightClassMap,
  transformClassMap,
  variantClassMap,
} from "./TextView.config";
import { cls } from "./TextView.utils";

const SEMANTIC_COLORS: TextColor[] = [
  "primary", "secondary", "hint", "disabled", "success", "warning", "error", "inherit",
];

function isSemanticColor(color: string): color is TextColor {
  return SEMANTIC_COLORS.includes(color as TextColor);
}

function isTokenFontSize(v: unknown): v is FontSize {
  return typeof v === "string" && v in fontSizeClassMap;
}

function isTokenFontWeight(v: unknown): v is FontWeight {
  return typeof v === "string" && v in fontWeightClassMap;
}

const TextView = React.memo(function TextView({
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
}: TextViewProps) {
  const resolvedVariant: TextVariant = variant;
  const fallbackTag: TextTag = defaultTagByVariant[resolvedVariant] || "span";
  const Component = (as || fallbackTag) as React.ElementType;

  const useFontSizeStyle =
    typeof fontSize === "string" && fontSize.length > 0 && !isTokenFontSize(fontSize);
  const sizeClass = isTokenFontSize(fontSize)
    ? fontSizeClassMap[fontSize]
    : variantClassMap[resolvedVariant];

  const useFontWeightStyle =
    (typeof fontWeight === "number") ||
    (typeof fontWeight === "string" && fontWeight.length > 0 && !isTokenFontWeight(fontWeight));
  const weightClass = isTokenFontWeight(fontWeight)
    ? fontWeightClassMap[fontWeight]
    : "";

  const useColorStyle = typeof color === "string" && color.length > 0 && !isSemanticColor(color);
  const colorClass = !useColorStyle && color ? colorClassMap[color as TextColor] : "";

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

  const finalStyle =
    useColorStyle || useFontSizeStyle || useFontWeightStyle
      ? {
          ...style,
          ...(useColorStyle ? { color } : null),
          ...(useFontSizeStyle ? { fontSize } : null),
          ...(useFontWeightStyle ? { fontWeight } : null),
        }
      : style;

  return React.createElement(
    Component,
    { className: finalClassName, style: finalStyle, ...restProps },
    children
  );
});

export default TextView;
