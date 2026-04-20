export type TextTag =
  | "h1"
  | "h2"
  | "h3"
  | "h4"
  | "p"
  | "span"
  | "small"
  | "strong"
  | "em"
  | "label"
  | "div"
  | string;

export type TextVariant = "h1" | "h2" | "h3" | "h4" | "body" | "secondary" | "small" | "micro";

export type TextColor =
  | "primary"
  | "secondary"
  | "hint"
  | "disabled"
  | "success"
  | "warning"
  | "error"
  | "inherit";

export type TextAlign = "left" | "center" | "right" | "justify";
export type TextTransform = "none" | "uppercase" | "lowercase" | "capitalize";
export type TextDecoration = "none" | "underline" | "line-through";

/** Font size (design token scale). When set, overrides variant size. */
export type FontSize = TextVariant;

/** Font weight (matches design system). */
export type FontWeight = "normal" | "medium" | "semibold" | "bold" | "extrabold";

/** Line height. */
export type LineHeight = "none" | "tight" | "snug" | "normal" | "relaxed" | "loose";

/** Letter spacing. */
export type LetterSpacing = "tighter" | "tight" | "normal" | "wide" | "wider" | "widest";

export interface TextViewProps extends React.HTMLAttributes<HTMLElement> {
  /** Element/semantic override (e.g. render body style as a <p>) */
  as?: TextTag | React.ElementType;
  /** Visual style (MUI/AntD-like) */
  variant?: TextVariant;
  /** Text color: semantic token (primary, secondary, …) or any CSS color (e.g. #hex, rgb(), rgba()) */
  color?: TextColor | string;
  /** Font size override: token scale or any CSS size (e.g. 18px, 1.125rem) */
  fontSize?: FontSize | string;
  /** Font weight override: token name or numeric weight (e.g. 600) */
  fontWeight?: FontWeight | number | string;
  /** Line height override */
  lineHeight?: LineHeight;
  /** Letter spacing override */
  letterSpacing?: LetterSpacing;
  /** Alignment */
  align?: TextAlign;
  /** Text transform */
  transform?: TextTransform;
  /** Text decoration */
  decoration?: TextDecoration;
  /** Truncate to single line */
  truncate?: boolean;
}
