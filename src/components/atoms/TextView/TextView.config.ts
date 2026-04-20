import {
  FontSize,
  FontWeight,
  LetterSpacing,
  LineHeight,
  TextAlign,
  TextColor,
  TextDecoration,
  TextTag,
  TextTransform,
  TextVariant,
} from "./TextView.types";

export const variantClassMap: Record<TextVariant, string> = {
  h1: "text-h1",
  h2: "text-h2",
  h3: "text-h3",
  h4: "text-h4",
  body: "text-body",
  secondary: "text-secondary",
  small: "text-small",
  micro: "text-micro",
};

/** Same as variant for fontSize override (design token scale). */
export const fontSizeClassMap: Record<FontSize, string> = {
  h1: "text-h1",
  h2: "text-h2",
  h3: "text-h3",
  h4: "text-h4",
  body: "text-body",
  secondary: "text-secondary",
  small: "text-small",
  micro: "text-micro",
};

export const fontWeightClassMap: Record<FontWeight, string> = {
  normal: "font-normal",
  medium: "font-medium",
  semibold: "font-semibold",
  bold: "font-bold",
  extrabold: "font-extrabold",
};

export const lineHeightClassMap: Record<LineHeight, string> = {
  none: "leading-none",
  tight: "leading-tight",
  snug: "leading-snug",
  normal: "leading-normal",
  relaxed: "leading-relaxed",
  loose: "leading-loose",
};

export const letterSpacingClassMap: Record<LetterSpacing, string> = {
  tighter: "tracking-tighter",
  tight: "tracking-tight",
  normal: "tracking-normal",
  wide: "tracking-wide",
  wider: "tracking-wider",
  widest: "tracking-widest",
};

export const defaultTagByVariant: Record<TextVariant, TextTag> = {
  h1: "h1",
  h2: "h2",
  h3: "h3",
  h4: "h4",
  body: "span",
  secondary: "span",
  small: "small",
  micro: "small",
};

export const colorClassMap: Record<TextColor, string> = {
  primary: "text-text-primary",
  secondary: "text-text-secondary",
  hint: "text-text-secondary",
  disabled: "text-text-secondary",
  success: "text-state-success",
  warning: "text-state-warning",
  error: "text-state-error",
  inherit: "",
};

export const alignClassMap: Record<TextAlign, string> = {
  left: "text-start",
  center: "text-center",
  right: "text-end",
  justify: "text-justify",
};

export const transformClassMap: Record<TextTransform, string> = {
  none: "normal-case",
  uppercase: "uppercase",
  lowercase: "lowercase",
  capitalize: "capitalize",
};

export const decorationClassMap: Record<TextDecoration, string> = {
  none: "no-underline",
  underline: "underline",
  "line-through": "line-through",
};
