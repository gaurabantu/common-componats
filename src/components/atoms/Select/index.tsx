"use client";
import React, { forwardRef, useId } from "react";
import type { SelectOption, SelectOptionGroup, SelectProps } from "./Select.types";
import { defaultSelectOptions } from "./Select.config";

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
    ...rest
  } = props;

  const generatedId = useId();
  const selectId = id || generatedId;

  const useGroups = Boolean(groups && groups.length > 0);

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = event.target.value;
    const selectedOption = findOptionInSelect(selectedValue, options, groups);
    onChange?.(event);
    onValueChange?.(selectedValue, selectedOption);
  };

  const isDisabled = rest.disabled;
  const resolvedStatus = status ?? (error ? "error" : undefined);
  const helperMessage = error || helperText;

  const borderColor =
    resolvedStatus === "error"
      ? "var(--color-state-error, #DC3545)"
      : resolvedStatus === "warning"
        ? "var(--color-state-warning, #FFC107)"
        : resolvedStatus === "success"
          ? "var(--color-state-success, #28A745)"
          : "var(--color-border-default, #999999)";

  const footerColor =
    resolvedStatus === "error"
      ? "var(--color-state-error, #DC3545)"
      : resolvedStatus === "warning"
        ? "var(--color-state-warning, #FFC107)"
        : resolvedStatus === "success"
          ? "var(--color-state-success, #28A745)"
          : "var(--color-text-secondary, #757575)";

  const sizeConfig = {
    sm: { minHeight: 36, paddingX: 12, fontSize: "var(--text-small-size, 12px)" },
    md: { minHeight: 44, paddingX: 14, fontSize: "var(--text-body-size, 16px)" },
    lg: { minHeight: 48, paddingX: 16, fontSize: "var(--text-body-size, 16px)" },
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
      ? "var(--color-text-secondary, #757575)"
      : "var(--color-text-primary, #0D0D0D)",
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
      ? "var(--color-bg-page, #F3F4F6)"
      : "var(--color-bg-surface, #FFFFFF)",
    color: isDisabled
      ? "var(--color-text-secondary, #757575)"
      : "var(--color-text-primary, #0D0D0D)",
    outline: "none",
    appearance: "none",
    WebkitAppearance: "none",
    MozAppearance: "none",
    fontSize: currentSize.fontSize,
    lineHeight: 1.5,
    cursor: isDisabled ? "not-allowed" : "pointer",
    backgroundImage:
      "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 20 20' fill='none'%3E%3Cpath d='M5 7.5L10 12.5L15 7.5' stroke='%23757575' stroke-width='1.8' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E\")",
    backgroundRepeat: "no-repeat",
    backgroundPosition: `right ${currentSize.paddingX}px center`,
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
        </label>
      )}

      <select
        ref={ref}
        id={selectId}
        className={className}
        style={selectStyle}
        aria-invalid={!!error || resolvedStatus === "error"}
        value={value}
        onChange={handleChange}
        {...rest}
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
      {helperMessage && <p style={helperStyle}>{helperMessage}</p>}
    </div>
  );
});

Select.displayName = "Select";

export default Select;