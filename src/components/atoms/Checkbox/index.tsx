"use client";

import React, { useCallback, useEffect, useId, useLayoutEffect, useRef } from "react";
import { CheckboxProps } from "./Checkbox.types";
import {
  CHECKBOX_DEFAULTS,
  defaultCheckboxColorClass,
  defaultLabelColorClass,
  defaultCheckboxInputLabelSpacing,
} from "./Checkbox.config";
import { cls } from "./Checkbox.utils";
import "../ucs-choice-controls.css";
import "./Checkbox.css";

const useIsomorphicLayoutEffect = typeof window !== "undefined" ? useLayoutEffect : useEffect;

const CheckboxGlyph = () => (
  <svg className="ucs-cc-checkbox-check" aria-hidden viewBox="0 0 12 12">
    <path className="ucs-cc-checkbox-checkpath" d="M2.75 6.05 L5.15 9.05 L9.95 3.25" />
  </svg>
);

const DashGlyph = () => (
  <svg className="ucs-cc-checkbox-dash" aria-hidden viewBox="0 0 12 12">
    <path className="ucs-cc-checkbox-dashpath" d="M3 6 H9" />
  </svg>
);

const CheckboxBase = React.forwardRef<HTMLInputElement, CheckboxProps>(function Checkbox(
  {
    label,
    name,
    value,
    checked = false,
    disabled = false,
    onChange,
    indeterminate = false,
    description,
    size = CHECKBOX_DEFAULTS.size,
    error,
    required = false,
    id,
    checkboxColorClass = defaultCheckboxColorClass,
    labelColorClass = defaultLabelColorClass,
    inputLabelSpacingClass = defaultCheckboxInputLabelSpacing,
    className = "",
    shape = "default",
    rounded = "3",
    withShadow = false,
    ariaLabel,
    ariaLabelledBy,
    hideLabel = false,
    "aria-label": ariaLabelAttr,
    "aria-labelledby": ariaLabelledByAttr,
    "aria-describedby": ariaDescribedByAttr,
    ...nativeProps
  },
  forwardedRef,
) {
  const generatedId = useId();
  const checkboxId = id ?? `ucs-cb-${generatedId}`;
  const labelId = `${checkboxId}-label`;
  const descriptionId = description ? `${checkboxId}-description` : undefined;
  const errorId = error ? `${checkboxId}-error` : undefined;
  const describedBy = [ariaDescribedByAttr, descriptionId, errorId].filter(Boolean).join(" ") || undefined;
  const hasVisibleLabel =
    label !== undefined &&
    label !== null &&
    label !== false &&
    !(typeof label === "string" && label.trim().length === 0);
  const resolvedAriaLabel = ariaLabel ?? ariaLabelAttr;
  const resolvedAriaLabelledBy = ariaLabelledBy ?? ariaLabelledByAttr;

  const inputRef = useRef<HTMLInputElement | null>(null);
  const setRefs = useCallback(
    (node: HTMLInputElement | null) => {
      inputRef.current = node;
      if (typeof forwardedRef === "function") forwardedRef(node);
      else if (forwardedRef) forwardedRef.current = node;
    },
    [forwardedRef],
  );

  // `indeterminate` is a DOM property only (no HTML attribute). Re-sync every render because a
  // user click clears it natively even when the parent keeps `indeterminate` true.
  useIsomorphicLayoutEffect(() => {
    if (inputRef.current) inputRef.current.indeterminate = indeterminate;
  });

  const colors = {
    brand: "var(--color-brand-primary)",
    textPrimary: "var(--color-text-primary)",
    textSecondary: "var(--color-text-secondary)",
    bgSurface: "var(--color-bg-surface)",
    borderDefault: "var(--color-border-default)",
    accentLavender: "var(--color-accent-lavender-10)",
    shadow: "var(--shadow-sm, 0 2px 8px rgba(0, 0, 0, 0.08))",
  } as const;

  const isOn = checked || indeterminate;

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
    gap: "var(--space-1, 8px)",
    width: shape === "box" ? "100%" : "auto",
    padding: shape === "box" ? "12px" : 0,
    border:
      shape === "box"
        ? `1.5px solid ${error ? "var(--color-danger-strong)" : isOn ? colors.brand : colors.borderDefault}`
        : "none",
    borderRadius: shape === "box" ? roundedStyle : undefined,
    backgroundColor:
      shape === "box"
        ? isOn
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

  const labelNode = (
    <span
      id={labelId}
      className={cls("ucs-cc-checkbox-label", labelColorClass, hideLabel && "sr-only")}
      style={labelStyle}
      aria-hidden={!hasVisibleLabel ? true : undefined}
    >
      {label}
      {required && hasVisibleLabel ? (
        <span className="ucs-cc-checkbox-required" aria-hidden="true">
          *
        </span>
      ) : null}
    </span>
  );

  const control = (
    <label
      htmlFor={checkboxId}
      className={cls("ucs-cc-checkbox-root", className)}
      style={wrapperStyle}
      data-size={size}
      data-hide-label={hideLabel ? "true" : undefined}
    >
      <input
        {...nativeProps}
        ref={setRefs}
        type="checkbox"
        id={checkboxId}
        name={name}
        value={value}
        checked={checked}
        disabled={disabled}
        required={required || undefined}
        onChange={onChange}
        readOnly={onChange ? undefined : true}
        aria-label={!hasVisibleLabel && resolvedAriaLabel ? resolvedAriaLabel : undefined}
        aria-labelledby={
          hasVisibleLabel
            ? labelId
            : !resolvedAriaLabel && resolvedAriaLabelledBy
              ? resolvedAriaLabelledBy
              : undefined
        }
        aria-describedby={describedBy}
        aria-invalid={error ? true : undefined}
        data-indeterminate={indeterminate ? "true" : undefined}
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
        <DashGlyph />
      </span>
      {description ? (
        <span className="ucs-cc-checkbox-text">
          {labelNode}
          <span id={descriptionId} className="ucs-cc-checkbox-description">
            {description}
          </span>
        </span>
      ) : (
        labelNode
      )}
    </label>
  );

  // Always the same wrapper: toggling `error` must not remount the <input> (keeps keyboard focus).
  return (
    <div className="ucs-cc-checkbox-field" data-size={size} data-shape={shape}>
      {control}
      {error ? (
        <p id={errorId} className="ucs-cc-checkbox-error" role="alert">
          {error}
        </p>
      ) : null}
    </div>
  );
});

CheckboxBase.displayName = "Checkbox";

const Checkbox = React.memo(CheckboxBase);
Checkbox.displayName = "Checkbox";

export default Checkbox;
export type { CheckboxProps, CheckboxSize } from "./Checkbox.types";
