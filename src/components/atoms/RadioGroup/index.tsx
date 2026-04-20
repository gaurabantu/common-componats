
import React from 'react';
import { RadioButtonProps, RadioGroupProps } from './RadioGroup.types';
import {
  defaultRadioColorClass,
  defaultLabelColorClass,
} from './RadioGroup.config';
import { cls } from './RadioGroup.utils';
import TextView from '../TextView';



const RadioButton: React.FC<RadioButtonProps & { itemMarginClass: string; tabIndex?: number }> = ({
  label,
  subLabel,
  name,
  value,
  checked = false,
  disabled = false,
  onChange,
  radioColorClass = defaultRadioColorClass,
  labelColorClass = defaultLabelColorClass,
  itemMarginClass,
  tabIndex,
  shape = "default",
  rounded = "3",
  withShadow = false
}) => {
  const isBox = shape === "box";
  const id = `${name}-${value}`;
  const colors = {
    brand: "var(--color-brand-primary, #0D0D0D)",
    textPrimary: "var(--color-text-primary, #0D0D0D)",
    textSecondary: "var(--color-text-secondary, #757575)",
    bgSurface: "var(--color-bg-surface, #FFFFFF)",
    borderDefault: "var(--color-border-default, #999999)",
    accentLavender: "var(--color-accent-lavender-10, #EEE7FF)",
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
    gap: 10,
    width: isBox ? "100%" : undefined,
    minWidth: isBox ? "160px" : undefined,
    padding: isBox ? "12px" : 0,
    border: isBox ? `1.5px solid ${checked ? colors.brand : colors.borderDefault}` : "none",
    borderRadius: isBox ? roundedStyle : undefined,
    backgroundColor: isBox
      ? checked ? colors.accentLavender : colors.bgSurface
      : "transparent",
    boxShadow: isBox && withShadow && !disabled ? colors.shadow : "none",
    cursor: disabled ? "not-allowed" : "pointer",
    userSelect: "none",
    opacity: disabled ? 0.6 : 1,
    pointerEvents: disabled ? "none" : "auto",
  };

  const inputStyle: React.CSSProperties = {
    flexShrink: 0,
    width: 16,
    height: 16,
    margin: "2px 0 0 0",
    accentColor: colors.brand,
    cursor: disabled ? "not-allowed" : "pointer",
  };

  const labelStyle: React.CSSProperties = {
    color: disabled ? colors.textSecondary : colors.textPrimary,
    lineHeight: 1.5,
    whiteSpace: "normal",
    wordBreak: "break-word",
  };

  return (
    <label
      htmlFor={id}
      className={cls(itemMarginClass)}
      style={wrapperStyle}
    >
      <input
        id={id}
        className={cls(radioColorClass)}
        type="radio"
        name={name}
        value={value}
        checked={checked}
        disabled={disabled}
        onChange={onChange}
        tabIndex={tabIndex}
        style={inputStyle}
      />

      <div style={{ display: "flex", flexDirection: "column", flex: 1, minWidth: 0 }}>
        <span
          className={cls(labelColorClass)}
          style={labelStyle}
        >
          {label}
        </span>

        {subLabel && (
          <TextView
            as="small"
            style={{
              marginTop: 4,
              color: colors.textSecondary,
              fontStyle: "italic",
            }}
          >
            {subLabel}
          </TextView>
        )}
      </div>
    </label>
  );
};


const RadioGroup: React.FC<RadioGroupProps> = ({
  options,
  name,
  selectedValue,
  onChange,
  layout = "vertical",
  columns = 3,
  minWidth = "160px",
  gap = "12px",
  radioColorClass,
  labelColorClass,
  ariaLabelledBy
}) => {
  const labelledById = ariaLabelledBy ?? `${name}-label`;
  const fixedGridStyle =
    layout === "grid"
      ? {
        display: "grid",
        gap,
        gridTemplateColumns: `repeat(${columns}, minmax(${minWidth}, 1fr))`
      }
      : {};

  const autoGridStyle =
    layout === "grid-auto"
      ? {
        display: "grid",
        gap,
        gridTemplateColumns: `repeat(auto-fit, minmax(${minWidth}, 1fr))`
      }
      : {};

  const finalStyle: React.CSSProperties = {
    display: layout === "vertical" ? "flex" : layout === "horizontal" ? "flex" : undefined,
    flexDirection: layout === "vertical" ? "column" : layout === "horizontal" ? "row" : undefined,
    alignItems: layout === "horizontal" ? "flex-start" : undefined,
    gap: layout === "horizontal" ? gap : undefined,
    ...fixedGridStyle,
    ...autoGridStyle
  };
  const itemMarginClass = "";

  const hasCheckedValue = options.some(opt => opt.value === selectedValue);
  const firstEnabledIndex = options.findIndex(opt => !opt.disabled);

  return (
    <fieldset
      className=""
      style={finalStyle}
      aria-labelledby={labelledById}
    >
      <legend id={labelledById} className="visually-hidden">
        {name}
      </legend>

      {options.map((opt, index) => {
        const isChecked = selectedValue === opt.value;

        let tabIndex = -1;
        if (isChecked) {
          tabIndex = 0;
        } else if (!hasCheckedValue && index === firstEnabledIndex) {
          tabIndex = 0;
        }

        return (
          <RadioButton
            key={opt.value}
            name={name}
            label={opt.label}
            subLabel={opt.subLabel}
            value={opt.value}
            checked={isChecked}
            onChange={() => onChange(opt.value)}
            radioColorClass={radioColorClass}
            labelColorClass={labelColorClass}
            itemMarginClass={itemMarginClass}
            shape={opt.shape}
            rounded={opt.rounded}
            withShadow={opt.withShadow}
            disabled={opt.disabled ?? false}
            tabIndex={tabIndex}
          />
        );
      })}
    </fieldset>
  );
};


export default RadioGroup;