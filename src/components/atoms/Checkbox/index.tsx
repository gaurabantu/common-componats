import React from 'react';
import { CheckboxProps } from './Checkbox.types';
import {
  defaultCheckboxColorClass,
  defaultLabelColorClass,
  defaultCheckboxInputLabelSpacing,
} from './Checkbox.config';
import { cls } from './Checkbox.utils';

const Checkbox = React.memo<CheckboxProps>(function Checkbox({
  label,
  name,
  value,
  checked = false,
  disabled = false,
  onChange,
  checkboxColorClass = defaultCheckboxColorClass,
  labelColorClass = defaultLabelColorClass,
  inputLabelSpacingClass = defaultCheckboxInputLabelSpacing,
  className = '',
  shape = "default",
  rounded = "3",
  withShadow = false,
  ariaLabel,
  ariaLabelledBy,
}) {
  const checkboxId = `${name}-${value}`;
  const hasVisibleLabel = label.trim().length > 0;
  const colors = {
    brand: "var(--color-brand-primary, #0D0D0D)",
    textPrimary: "var(--color-text-primary, #0D0D0D)",
    textSecondary: "var(--color-text-secondary, #757575)",
    bgSurface: "var(--color-bg-surface, #FFFFFF)",
    borderDefault: "var(--color-border-default, #999999)",
    accentLavender: "var(--color-accent-lavender-10, #EEE7FF)",
    focusRing: "var(--button-primary-focus-ring, #3B82F6)",
    shadow: "var(--shadow-sm, 0 2px 8px rgba(0, 0, 0, 0.08))",
  } as const;

  const roundedStyle =
    rounded === "0" ? 0
      : rounded === "1" ? "var(--radius-xs, 2px)"
        : rounded === "2" ? "var(--radius-sm, 3px)"
          : rounded === "3" ? "var(--radius-base, 4px)"
            : rounded === "4" ? "var(--radius-md, 6px)"
              : rounded === "5" ? "var(--radius-lg, 8px)"
                : "9999px";

  const wrapperStyle: React.CSSProperties = {
    display: "flex",
    alignItems: "flex-start",
    gap: 8,
    width: shape === "box" ? "100%" : "auto",
    padding: shape === "box" ? "12px" : 0,
    border: shape === "box" ? `1.5px solid ${checked ? colors.brand : colors.borderDefault}` : "none",
    borderRadius: shape === "box" ? roundedStyle : undefined,
    backgroundColor: shape === "box"
      ? checked ? colors.accentLavender : colors.bgSurface
      : "transparent",
    boxShadow: shape === "box" && withShadow && !disabled ? colors.shadow : "none",
    cursor: disabled ? "not-allowed" : "pointer",
    opacity: disabled ? 0.6 : 1,
    userSelect: "none",
    pointerEvents: disabled ? "none" : "auto",
  };

  const inputStyle: React.CSSProperties = {
    width: 18,
    height: 18,
    margin: "2px 0 0 0",
    flexShrink: 0,
    accentColor: colors.brand,
    cursor: disabled ? "not-allowed" : "pointer",
  };

  const labelStyle: React.CSSProperties = {
    color: disabled ? colors.textSecondary : colors.textPrimary,
    lineHeight: 1.5,
    cursor: disabled ? "not-allowed" : "pointer",
  };

  return (
    <label
      htmlFor={checkboxId}
      className={cls(className)}
      style={wrapperStyle}
    >
      <input
        type="checkbox"
        id={checkboxId}
        name={name}
        value={value}
        checked={checked}
        disabled={disabled}
        onChange={onChange}
        aria-label={!hasVisibleLabel && ariaLabel ? ariaLabel : undefined}
        aria-labelledby={
          hasVisibleLabel
            ? `${checkboxId}-label`
            : !ariaLabel && ariaLabelledBy
              ? ariaLabelledBy
              : undefined
        }
        className={cls(shape === "default" ? checkboxColorClass : "", inputLabelSpacingClass)}
        style={inputStyle}
      />
      <span
        id={`${checkboxId}-label`}
        className={cls(labelColorClass)}
        style={labelStyle}
        aria-hidden={!hasVisibleLabel ? true : undefined}
      >
        {label}
      </span>
    </label>
  );
});

export default Checkbox;
