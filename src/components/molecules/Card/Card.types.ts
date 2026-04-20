import type React from "react";

/** §26 — bordered (static), elevated (interactive), withIndicator (selected row). Legacy: outlined, filled */
export type CardVariantName =
  | "bordered"
  | "elevated"
  | "withIndicator"
  | "outlined"
  | "filled";

/** Root padding rhythm — matches common card density patterns (see shadcn Card `size`). */
export type CardSize = "default" | "sm";

export interface CardProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "title"> {
  /** Compact padding and gaps (`sm`) vs default dashboard density. Ignored when `padding` is set. */
  size?: CardSize;
  title?: React.ReactNode;
  subtitle?: React.ReactNode;
  extra?: React.ReactNode;
  cover?: React.ReactNode;
  actions?: React.ReactNode;
  actionsAlign?: "left" | "center" | "right" | "between";
  footer?: React.ReactNode;
  /** @deprecated Prefer `variant="bordered"` — default true only affects legacy `outlined` */
  bordered?: boolean;
  hoverable?: boolean;
  variant?: CardVariantName;
  /** Shadow tier when elevated / withIndicator */
  elevation?: "none" | "sm" | "md" | "lg";
  /** Left bar — only when `variant` resolves to `withIndicator` and `selected` is true (§26) */
  selected?: boolean;
  /** Padding — token string or number (px); overrides `size` default padding */
  padding?: number | string;
  /** Radius token string or number (px) */
  radius?: number | string;
}

export interface CardContextValue {
  size: CardSize;
  /** Resolved horizontal/section padding as a CSS length */
  paddingCss: string;
}

export interface CardHeaderProps extends React.HTMLAttributes<HTMLDivElement> {}

export interface CardTitleProps extends React.HTMLAttributes<HTMLHeadingElement> {
  /** Heading level for accessibility (default 3). */
  as?: "h2" | "h3" | "h4" | "h5" | "h6" | "div";
}

export interface CardDescriptionProps extends React.HTMLAttributes<HTMLParagraphElement> {
  as?: "p" | "div";
}

export interface CardActionProps extends React.HTMLAttributes<HTMLDivElement> {}

export interface CardContentProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Use for full-bleed media — removes horizontal padding (still respects vertical rhythm). */
  noPadding?: boolean;
}

export interface CardFooterProps extends React.HTMLAttributes<HTMLDivElement> {
  /** When false, footer has no top border (e.g. subtle metadata under content). */
  borderTop?: boolean;
}
