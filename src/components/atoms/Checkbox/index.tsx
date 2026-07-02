import React from "react";
import { CheckboxProps } from "./Checkbox.types";
import {
  defaultCheckboxColorClass,
  defaultLabelColorClass,
  defaultCheckboxInputLabelSpacing,
} from "./Checkbox.config";
import { cls } from "./Checkbox.utils";
import "../ucs-choice-controls.css";

const CheckboxGlyph = () => (
  <svg className="ucs-cc-checkbox-check" aria-hidden viewBox="0 0 12 12">
    <path className="ucs-cc-checkbox-checkpath" d="M2.75 6.05 L5.15 9.05 L9.95 3.25" />
  </svg>
);

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
  className = "",
  shape = "default",
  rounded = "3",
  withShadow = false,
  ariaLabel,
  ariaLabelledBy,
}) {
  const checkboxId = `${name}-${value}`;
  const hasVisibleLabel = label.trim().length > 0;
  const colors = {
    brand: "var(--color-brand-primary)",
    textPrimary: "var(--color-text-primary)",
    textSecondary: "var(--color-text-secondary)",
    bgSurface: "var(--color-bg-surface)",
    borderDefault: "var(--color-border-default)",
    accentLavender: "var(--color-accent-lavender-10)",
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
    border:
      shape === "box"
        ? `1.5px solid ${checked ? colors.brand : colors.borderDefault}`
        : "none",
    borderRadius: shape === "box" ? roundedStyle : undefined,
    backgroundColor:
      shape === "box"
        ? checked
          ? colors.accentLavender
          : colors.bgSurface
        : "transparent",
    boxShadow: shape === "box" && withShadow && !disabled ? colors.shadow : "none",
    cursor: disabled ? "not-allowed" : "pointer",
    opacity: disabled ? 0.6 : 1,
    userSelect: "none",
    pointerEvents: disabled ? "none" : "auto",
    ...(shape === "box"
      ? {
          transition:
            "border-color 0.22s ease, background-color 0.22s ease, box-shadow 0.2s ease",
        }
      : {}),
  };

  const labelStyle: React.CSSProperties = {
    color: disabled ? colors.textSecondary : colors.textPrimary,
    lineHeight: 1.5,
    cursor: disabled ? "not-allowed" : "pointer",
  };

  return (
    <label
      htmlFor={checkboxId}
      className={cls("ucs-cc-checkbox-root", className)}
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
        readOnly={onChange ? undefined : true}
        aria-label={!hasVisibleLabel && ariaLabel ? ariaLabel : undefined}
        aria-labelledby={
          hasVisibleLabel
            ? `${checkboxId}-label`
            : !ariaLabel && ariaLabelledBy
              ? ariaLabelledBy
              : undefined
        }
        className="peer ucs-cc-checkbox-native"
      />
      <span
        aria-hidden="true"
        className={cls(
          "ucs-cc-checkbox-face",
          shape === "default" ? checkboxColorClass : "",
          inputLabelSpacingClass,
        )}
      >
        <CheckboxGlyph />
      </span>
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
