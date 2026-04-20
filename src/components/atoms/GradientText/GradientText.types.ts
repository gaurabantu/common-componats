import type React from "react";

export interface GradientTextProps {
  children: React.ReactNode;
  /** Render element. Default: span */
  as?: keyof React.JSX.IntrinsicElements;
  /** Custom gradient. Defaults to brand primary -> brand secondary. */
  gradient?: string;
  /** Fallback text color for environments without background-clip support. */
  fallbackColor?: string;
  className?: string;
  style?: React.CSSProperties;
}
