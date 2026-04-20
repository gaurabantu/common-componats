"use client";

import React, { useCallback, useId, useMemo, useState } from "react";
import type { SwitchProps } from "./Switch.types";
import "./Switch.css";

function cls(...parts: (string | false | undefined)[]): string {
  return parts.filter(Boolean).join(" ");
}

const COLORS = {
  trackOff: "var(--color-mist-80, #e0e0e0)",
  trackOn: "var(--color-theme-primary, var(--color-brand-primary, #0d0d0d))",
  thumb: "var(--color-bg-surface, #ffffff)",
  border: "var(--color-border-default, #999999)",
  text: "var(--color-text-primary, #0d0d0d)",
  textMuted: "var(--color-text-secondary, #757575)",
} as const;

const SIZE_STYLES = {
  sm: {
    track: { width: 40, height: 22, padding: 2, thumb: 18 },
    hitPadding: 8,
  },
  md: {
    track: { width: 48, height: 28, padding: 3, thumb: 22 },
    hitPadding: 8,
  },
} as const;

/**
 * Toggle switch — boolean on/off control.
 *
 * Follows the [ARIA switch pattern](https://www.w3.org/WAI/ARIA/apg/patterns/switch/)
 * (same semantics as Radix UI Switch / MUI Switch): `role="switch"`, `aria-checked`,
 * native `<button>` activation (pointer + Space/Enter), visible focus ring.
 */
const Switch = React.memo<SwitchProps>(function Switch({
  checked: checkedProp,
  defaultChecked = false,
  onCheckedChange,
  disabled = false,
  id: idProp,
  name,
  value = "on",
  uncheckedValue = "off",
  label,
  labelPosition = "end",
  "aria-label": ariaLabel,
  className,
  switchClassName,
  size = "md",
}) {
  const reactId = useId();
  const switchId = idProp ?? `switch-${reactId.replace(/:/g, "")}`;
  const labelId = `${switchId}-label`;

  const isControlled = checkedProp !== undefined;
  const [internalChecked, setInternalChecked] = useState(defaultChecked);
  const checked = isControlled ? Boolean(checkedProp) : internalChecked;

  const setChecked = useCallback(
    (next: boolean) => {
      if (!isControlled) {
        setInternalChecked(next);
      }
      onCheckedChange?.(next);
    },
    [isControlled, onCheckedChange],
  );

  const toggle = useCallback(() => {
    if (disabled) return;
    setChecked(!checked);
  }, [checked, disabled, setChecked]);

  const s = SIZE_STYLES[size];
  const { width: tw, height: th, padding: pad, thumb: thumbSize } = s.track;
  const thumbTravel = tw - thumbSize - pad * 2;
  const thumbX = checked ? thumbTravel : 0;

  const hasVisibleLabel = label != null && label !== false;

  const trackStyle = useMemo(
    (): React.CSSProperties => ({
      position: "relative",
      width: tw,
      height: th,
      borderRadius: 9999,
      backgroundColor: checked ? COLORS.trackOn : COLORS.trackOff,
      border: `1px solid ${checked ? "transparent" : COLORS.border}`,
      transition: "background-color 160ms ease, border-color 160ms ease",
      flexShrink: 0,
    }),
    [checked, th, tw],
  );

  const thumbStyle = useMemo(
    (): React.CSSProperties => ({
      position: "absolute",
      left: pad,
      top: pad,
      width: thumbSize,
      height: thumbSize,
      borderRadius: "50%",
      backgroundColor: COLORS.thumb,
      boxShadow: "0 1px 3px rgba(0,0,0,0.2)",
      transform: `translateX(${thumbX}px)`,
      transition: "transform 160ms ease",
    }),
    [pad, thumbSize, thumbX],
  );

  const buttonStyle = useMemo(
    (): React.CSSProperties => ({
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      padding: s.hitPadding,
      margin: 0,
      minWidth: tw + s.hitPadding * 2,
      minHeight: th + s.hitPadding * 2,
      border: "none",
      background: "transparent",
      cursor: disabled ? "not-allowed" : "pointer",
      opacity: disabled ? 0.55 : 1,
      borderRadius: "var(--radius-lg, 8px)",
      boxSizing: "border-box",
    }),
    [disabled, s.hitPadding, th, tw],
  );

  const labelStyle: React.CSSProperties = {
    color: disabled ? COLORS.textMuted : COLORS.text,
    fontSize: "var(--text-body-size, 16px)",
    lineHeight: 1.5,
    userSelect: "none",
    cursor: disabled ? "not-allowed" : "pointer",
  };

  const switchEl = (
    <button
      type="button"
      id={switchId}
      role="switch"
      aria-checked={checked}
      aria-disabled={disabled}
      disabled={disabled}
      aria-label={hasVisibleLabel ? undefined : ariaLabel ?? "Toggle"}
      className={cls("ucs-switch__control", switchClassName)}
      style={buttonStyle}
      onClick={toggle}
      data-state={checked ? "checked" : "unchecked"}
      data-disabled={disabled ? "" : undefined}
    >
      <span aria-hidden style={trackStyle}>
        <span style={thumbStyle} />
      </span>
    </button>
  );

  const labelEl =
    hasVisibleLabel ? (
      <label id={labelId} htmlFor={switchId} style={labelStyle}>
        {label}
      </label>
    ) : null;

  const rowStyle: React.CSSProperties = {
    display: "inline-flex",
    alignItems: "center",
    gap: "var(--space-2, 8px)",
    maxWidth: "100%",
  };

  return (
    <div className={cls("ucs-switch", className)} style={rowStyle}>
      {name ? (
        <input type="hidden" name={name} value={checked ? value : uncheckedValue} readOnly aria-hidden />
      ) : null}
      {hasVisibleLabel && labelPosition === "start" ? labelEl : null}
      {switchEl}
      {hasVisibleLabel && labelPosition === "end" ? labelEl : null}
    </div>
  );
});

Switch.displayName = "Switch";

export default Switch;
export type { SwitchProps, SwitchSize } from "./Switch.types";
