import React from "react";

const iconSize = 56;

export function SuccessIconSvg({ animated, color = "#22c55e" }: { animated?: boolean; color?: string }) {
  return (
    <svg
      width={iconSize}
      height={iconSize}
      viewBox="0 0 56 56"
      fill="none"
      className={animated ? "alert-dialog-svg--success" : ""}
    >
      <circle cx="28" cy="28" r="26" fill={`${color}20`} />
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

export function ErrorIconSvg({ animated, color = "#ef4444" }: { animated?: boolean; color?: string }) {
  return (
    <svg
      width={iconSize}
      height={iconSize}
      viewBox="0 0 56 56"
      fill="none"
      className={animated ? "alert-dialog-svg--error" : ""}
    >
      <circle cx="28" cy="28" r="26" fill={`${color}20`} />
      <path d="M28 18v14" stroke={color} strokeWidth="3" strokeLinecap="round" />
      <circle cx="28" cy="38" r="2.5" fill={color} />
    </svg>
  );
}

export function WarningIconSvg({ animated, color = "#f59e0b" }: { animated?: boolean; color?: string }) {
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
        fill={`${color}20`}
        stroke={color}
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <path d="M28 22v10" stroke={color} strokeWidth="2.5" strokeLinecap="round" />
      <circle cx="28" cy="38" r="2" fill={color} />
    </svg>
  );
}
