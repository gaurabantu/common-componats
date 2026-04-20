import React from "react";
import type { IconSource } from "../Icon";

// Defines overrides for specific styling parts
export interface ClassOverrides {
  variant?: string;
  size?: string;
  border?: string;
  background?: string;
  text?: string;
  radius?: string;
  [key: string]: string | undefined;
}

type ButtonBaseProps = {
  variant?:
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

  variantClass?: string; // full variant class override
  /** §20: default `lg` (44px) — primary screen CTAs; `md` = 40px outlined secondaries */
  size?: "xxs" | "xs" | "sm" | "md" | "lg";
  width?: string | number;
  height?: string | number;
  classOverrides?: ClassOverrides;
  borderColor?: string;
  backgroundColor?: string;
  textColor?: string;
  /** Gradient background for the button surface. */
  gradient?: string;
  /** Optional hover gradient override. Falls back to `gradient`. */
  gradientHover?: string;
  /** Optional active gradient override. Falls back to `gradientHover` or `gradient`. */
  gradientActive?: string;
  textSize?: "sm" | "md" | "lg";
  icon?: IconSource;  // URL, import, inline SVG, or React element
  iconPosition?: "left" | "right"; // Default: left
  iconWidth?: number; // Default: 15
  iconHeight?: number; // Default: 15
  iconColor?: string;
  iconGap?: number; // Used for SVG icons (gap between icon & text)
  fullWidth?: boolean;
  /** Disabled state (also applies when href is set) */
  disabled?: boolean;
  /** Alias of fullWidth (common API) */
  block?: boolean;
  /** Shows spinner + disables interaction */
  loading?: boolean;
  ariaLabel?: string;
  className?: string;
  enableWhen?: any;
  preserveIconColor?: boolean

  /** 
   * 🔹 Rounded prop for UX4G-style border radius classes
   * e.g. "0" | "1" | "2" | "3" | "4" | "5" | "pill" | "circle"
   * Defaults to "3" (large radius)
   */
  rounded?: "0" | "1" | "2" | "3" | "4" | "5" | "pill" | "circle";
};

type ButtonAsButton = ButtonBaseProps &
  Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "color"> & {
    href?: undefined;
  };

type ButtonAsLink = ButtonBaseProps &
  Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, "href" | "color" | "type"> & {
    href: string;
  };

/** When omitted or "default", uses primary. Custom colors override variant when provided. */
export type ButtonProps = ButtonAsButton | ButtonAsLink;
