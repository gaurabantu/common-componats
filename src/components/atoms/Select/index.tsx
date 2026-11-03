"use client";
import React, { forwardRef, useId, useRef, useState } from "react";
import type { SelectOption, SelectOptionGroup, SelectProps } from "./Select.types";
import { defaultSelectOptions, isPickerOpenKey, selectHeightTokens, selectStatusTokens } from "./Select.config";
import { useFormField } from "../../molecules/FormField";
import { FORM_FIELD_CONSUMER_KEY } from "../../molecules/FormField/FormField.config";
import "./Select.css";

// Helper function to get data attributes for options
const getOptionDataAttributes = (option: SelectOption) => {
  const dataAttrs: Record<string, string> = {};
  if (option.icon) {
    dataAttrs["data-icon"] = typeof option.icon === "string" ? option.icon : "custom-icon";
  }
  if (option.iconPosition) {
    dataAttrs["data-icon-position"] = option.iconPosition;
  }
  return dataAttrs;
};

const renderOptionContent = (
  option: SelectOption,
  showIcons: boolean = true
): React.ReactNode => {
  if (!showIcons || !option.icon) {
    return option.label;
  }

  const iconElement = typeof option.icon === "string" ? option.icon + " " : option.icon;

  if (option.iconPosition === "right") {
    return (
      <>
        {option.label} {iconElement}
      </>
    );
  }

  return (
    <>
      {iconElement} {option.label}
    </>
  );
};

function findOptionInSelect(
  value: string,
  options: SelectOption[] | undefined,
  groups: SelectOptionGroup[] | undefined
): SelectOption | undefined {
  if (groups?.length) {
    for (const g of groups) {
      const o = g.options.find((opt) => opt.value === value);
      if (o) return o;
    }
    return undefined;
  }
  return options?.find((opt) => opt.value === value);
}

const Select = forwardRef<HTMLSelectElement, SelectProps>((props, ref) => {
  const {
    label,
    options = [],
    groups,
    placeholder = defaultSelectOptions.placeholder,
    customClass = defaultSelectOptions.customClass,
    className = "",
    error,
    helperText,
    id,
    showIcons = defaultSelectOptions.showIcons,
    onValueChange,
    onChange,
    value,
    fullWidth = true,
    size = "md",
    rounded = "4",
    status,
    allowPlaceholderSelection = true,
    animatedChevron = true,
    required,
    style,
    onMouseDown,
    onKeyDown,
    onBlur,
    "aria-describedby": ariaDescribedByProp,
    "aria-invalid": ariaInvalidProp,
    "aria-required": ariaRequiredProp,
    liveSearch: _liveSearch,
    ...rest
  } = props;

  /*
   * Inside a FormField the field id / description / state are read from context (FormField skips
   * cloneElement for consumers, see FORM_FIELD_CONSUMER_KEY below). Explicit props always win.
   */
  const field = useFormField();
  const generatedId = useId();
  const selectId = id || field?.id || generatedId;
  const messageId = `${selectId}-message`;

  const useGroups = Boolean(groups && groups.length > 0);

  /*
   * Picker state for the animated chevron. Root cause of the old blur-on-change: the chevron was
   * keyed on `:focus-within` (focus is not "open"), so the component called `blur()` after every
   * change to reset it — dropping keyboard focus. The open state is now tracked explicitly and the
   * control is never blurred.
   */
  const [pickerOpen, setPickerOpen] = useState(false);
  const pickerOpenRef = useRef(false);
  const setOpen = (next: boolean) => {
    if (pickerOpenRef.current === next) return;
    pickerOpenRef.current = next;
    setPickerOpen(next);
  };

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = event.target.value;
    const selectedOption = findOptionInSelect(selectedValue, options, groups);
    setOpen(false);
    onChange?.(event);
    onValueChange?.(selectedValue, selectedOption);
  };

  const handleMouseDown = (event: React.MouseEvent<HTMLSelectElement>) => {
    onMouseDown?.(event);
    if (!event.defaultPrevented && event.button === 0 && !event.currentTarget.disabled) setOpen(true);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLSelectElement>) => {
    onKeyDown?.(event);
    setOpen(!event.defaultPrevented && isPickerOpenKey(event));
  };

  const handleBlur = (event: React.FocusEvent<HTMLSelectElement>) => {
    setOpen(false);
    onBlur?.(event);
  };

  const isDisabled = rest.disabled;
  // An error message always means the error status (status alone can still be set without a message).
  const resolvedStatus = error ? "error" : status;
  const helperMessage = error || helperText;
  const errorShown = Boolean(error);

  // Announce an error only when it changes after the first render (same latch as FormField).
  const initialError = useRef(error);
  const errorChanged = useRef(false);
  if (!errorChanged.current && error !== initialError.current) errorChanged.current = true;

  const describedBy =
    [ariaDescribedByProp ?? field?.describedBy, helperMessage ? messageId : undefined]
      .filter(Boolean)
      .join(" ") || undefined;
  const ariaInvalid =
    ariaInvalidProp ?? (errorShown || resolvedStatus === "error" || Boolean(field?.invalid));
  const ariaRequired = ariaRequiredProp ?? (field?.required && !required ? true : undefined);

  // Any invalid Select (own `error`, `status="error"`, FormField error, explicit aria-invalid) gets the
  // error border; `--color-danger-strong` keeps >= 3:1 on the surface (state-error is the bright accent).
  const isInvalid = ariaInvalid === true || ariaInvalid === "true" || resolvedStatus === "error";

  // Status colours use the `-strong` semantic tokens (text >= 4.5:1, borders >= 3:1 on the surface in
  // every theme); the raw `--color-state-*` accents fail (warning 1.63:1 on white).
  const visualStatus: "error" | "warning" | "success" | undefined = isInvalid ? "error" : resolvedStatus;
  const statusToken = visualStatus ? selectStatusTokens[visualStatus] : undefined;
  const borderColor = statusToken ?? "var(--color-border-default)";
  // The message follows the Select's own status/error (a FormField error is rendered by FormField itself).
  const footerColor = resolvedStatus ? selectStatusTokens[resolvedStatus] : "var(--color-text-secondary)";

  const sizeConfig = {
    sm: { minHeight: selectHeightTokens.sm, paddingX: 10, fontSize: "var(--text-small-size, 12px)" },
    md: { minHeight: selectHeightTokens.md, paddingX: 12, fontSize: "var(--text-body-size, 16px)" },
    lg: { minHeight: selectHeightTokens.lg, paddingX: 16, fontSize: "var(--text-body-size, 16px)" },
  } as const;

  const currentSize = sizeConfig[size];

  const radiusValue =
    rounded === "0"
      ? 0
      : rounded === "1"
        ? "var(--radius-xs, 2px)"
        : rounded === "2"
          ? "var(--radius-sm, 3px)"
          : rounded === "3"
            ? "var(--radius-base, 4px)"
            : rounded === "4"
              ? "var(--radius-md, 6px)"
              : rounded === "5"
                ? "var(--radius-lg, 8px)"
                : "9999px";

  const wrapperStyle: React.CSSProperties = {
    width: fullWidth ? "100%" : "auto",
    display: fullWidth ? "block" : "inline-block",
  };

  const labelStyle: React.CSSProperties = {
    display: "block",
    marginBottom: 8,
    color: isDisabled
      ? "var(--color-text-secondary)"
      : "var(--color-text-primary)",
    fontSize: "var(--text-secondary-size, 14px)",
    fontWeight: 500,
    lineHeight: 1.5,
    cursor: isDisabled ? "not-allowed" : "default",
  };

  const selectStyle: React.CSSProperties = {
    display: "block",
    width: "100%",
    minWidth: 0,
    minHeight: currentSize.minHeight,
    padding: `0 ${currentSize.paddingX + 18}px 0 ${currentSize.paddingX}px`,
    boxSizing: "border-box",
    borderRadius: radiusValue,
    border: `1.5px solid ${borderColor}`,
    backgroundColor: isDisabled
      ? "var(--color-bg-page)"
      : "var(--color-bg-surface)",
    color: isDisabled
      ? "var(--color-text-secondary)"
      : "var(--color-text-primary)",
    appearance: "none",
    WebkitAppearance: "none",
    MozAppearance: "none",
    fontSize: currentSize.fontSize,
    lineHeight: 1.5,
    cursor: isDisabled ? "not-allowed" : "pointer",
    transition: "border-color 150ms, background-color 150ms",
  };


  const helperStyle: React.CSSProperties = {
    marginTop: 8,
    marginBottom: 0,
    color: footerColor,
    fontSize: "var(--text-small-size, 12px)",
    lineHeight: 1.5,
  };

  return (
    <div className={customClass} style={wrapperStyle}>
      {label && (
        <label htmlFor={selectId} style={labelStyle}>
          {label}
          {required ? (
            <span className="ds-select__required" aria-hidden="true">
              *
            </span>
          ) : null}
        </label>
      )}

      <div
        className={`ucs-select-shell${animatedChevron !== false ? " ucs-select-shell--chevron-animated" : " ds-select-shell--chevron-static"}`}
        data-open={animatedChevron !== false && pickerOpen ? "true" : undefined}
      >
        <select
          ref={ref}
          id={selectId}
          className={className ? `ds-select ${className}` : "ds-select"}
          data-size={size}
          data-invalid={isInvalid ? "true" : undefined}
          data-status={visualStatus}
          style={style ? { ...selectStyle, ...style } : selectStyle}
          aria-invalid={ariaInvalid}
          aria-describedby={describedBy}
          aria-required={ariaRequired}
          required={required}
          value={value}
          {...rest}
          onChange={handleChange}
          onMouseDown={handleMouseDown}
          onKeyDown={handleKeyDown}
          onBlur={handleBlur}
        >
        {placeholder && (
          <option value="" disabled={!allowPlaceholderSelection}>
            {placeholder}
          </option>
        )}
        {useGroups
          ? groups!.map((group) => (
              <optgroup key={group.label} label={group.label}>
                {group.options.map((opt, index) => {
                  const dataAttributes = getOptionDataAttributes(opt);
                  return (
                    <option
                      key={`${group.label}-${opt.value ?? "no-value"}-${opt.label}-${index}`}
                      value={opt.value}
                      disabled={opt.disabled}
                      {...dataAttributes}
                    >
                      {renderOptionContent(opt, showIcons)}
                    </option>
                  );
                })}
              </optgroup>
            ))
          : options.map((opt, index) => {
              const dataAttributes = getOptionDataAttributes(opt);
              return (
                <option
                  key={`${opt.value ?? "no-value"}-${opt.label}-${index}`}
                  value={opt.value}
                  disabled={opt.disabled}
                  {...dataAttributes}
                >
                  {renderOptionContent(opt, showIcons)}
                </option>
              );
            })}
        </select>
      </div>
      {helperMessage && (
        <p
          id={messageId}
          className="ds-select__message"
          data-status={resolvedStatus}
          role={errorShown && errorChanged.current ? "alert" : undefined}
          style={helperStyle}
        >
          {helperMessage}
        </p>
      )}
    </div>
  );
});

Select.displayName = "Select";

/** Tells FormField this control wires itself via `useFormField()` (no cloneElement injection). */
(Select as unknown as Record<string, unknown>)[FORM_FIELD_CONSUMER_KEY] = true;

export default Select;