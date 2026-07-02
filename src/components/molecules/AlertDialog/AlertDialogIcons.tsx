import React from "react";

const iconSize = 56;

type AlertDialogIconSvgProps = {
  animated?: boolean;
  color?: string;
  bgColor?: string;
};

export function SuccessIconSvg({
  animated,
  color = "var(--color-state-success)",
  bgColor = "color-mix(in srgb, var(--color-state-success) 10%, transparent)",
}: AlertDialogIconSvgProps) {
  return (
    <svg
      width={iconSize}
      height={iconSize}
      viewBox="0 0 56 56"
      fill="none"
      className={animated ? "alert-dialog-svg--success" : ""}
    >
      <circle cx="28" cy="28" r="26" fill={bgColor} />
      <path
        className={animated ? "alert-dialog-checkmark" : ""}
        d="M16 28l8 8 16-16"
        stroke={color}
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </svg>
  );
}

export function ErrorIconSvg({
  animated,
  color = "var(--color-state-error)",
  bgColor = "color-mix(in srgb, var(--color-state-error) 10%, transparent)",
}: AlertDialogIconSvgProps) {
  return (
    <svg
      width={iconSize}
      height={iconSize}
      viewBox="0 0 56 56"
      fill="none"
      className={animated ? "alert-dialog-svg--error" : ""}
    >
      <circle cx="28" cy="28" r="26" fill={bgColor} />
      <path d="M28 18v14" stroke={color} strokeWidth="3" strokeLinecap="round" />
      <circle cx="28" cy="38" r="2.5" fill={color} />
    </svg>
  );
}

export function WarningIconSvg({
  animated,
  color = "var(--color-state-warning)",
  bgColor = "color-mix(in srgb, var(--color-state-warning) 10%, transparent)",
}: AlertDialogIconSvgProps) {
  return (
    <svg
      width={iconSize}
      height={iconSize}
      viewBox="0 0 56 56"
      fill="none"
      className={animated ? "alert-dialog-svg--warning" : ""}
    >
      <path
        d="M28 12L44 42H12L28 12z"
        fill={bgColor}
        stroke={color}
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <path d="M28 22v10" stroke={color} strokeWidth="2.5" strokeLinecap="round" />
      <circle cx="28" cy="38" r="2" fill={color} />
    </svg>
  );
}
