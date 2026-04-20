export type ProgressBarType = "line" | "circle";
export type ProgressBarSize = "xs" | "sm" | "md" | "lg";
export type ProgressBarAnimation = "none" | "smooth" | "pulse" | "stripes-flow";

export interface ProgressBarProps {
  value: number;
  type?: ProgressBarType;
  customColor?: string;
  gradient?: string;
  trackColor?: string;
  striped?: boolean;
  animated?: boolean;
  animation?: ProgressBarAnimation;
  showLabel?: boolean;
  label?: string;
  size?: ProgressBarSize;
  className?: string;
  height?: string;
  width?: string;
  ariaLabel?: string;
  stepCount?: number;
  formCount?: number;
  showValue?: boolean;
  strokeWidth?: number;
  rounded?: boolean;
}
