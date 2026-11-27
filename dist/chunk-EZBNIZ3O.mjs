/* ucs:component-css */
import "./styles/components/atoms/Select/Select.css";
import {
  FORM_FIELD_CONSUMER_KEY,
  useFormField
} from "./chunk-GJBU4OKB.mjs";

// src/components/atoms/Select/index.tsx
import { forwardRef, useId, useRef, useState } from "react";

// src/components/atoms/Select/Select.config.ts
var defaultSelectOptions = {
  placeholder: "Select an option",
  liveSearch: false,
  customClass: "",
  showIcons: true
  // NEW: default to show icons
};
var selectHeightTokens = {
  sm: "var(--button-height-sm)",
  md: "var(--button-height-lg)",
  lg: "3rem"
};
function isPickerOpenKey(event) {
  if (event.key === " " || event.key === "Spacebar" || event.key === "F4")
    return true;
  return event.altKey && (event.key === "ArrowDown" || event.key === "ArrowUp");
}
var selectStatusTokens = {
  error: "var(--color-danger-strong)",
  warning: "var(--color-warning-strong)",
  success: "var(--color-success-strong)"
};

// src/components/atoms/Select/index.tsx
import { Fragment, jsx, jsxs } from "react/jsx-runtime";
var getOptionDataAttributes = (option) => {
  const dataAttrs = {};
  if (option.icon) {
    dataAttrs["data-icon"] = typeof option.icon === "string" ? option.icon : "custom-icon";
  }
  if (option.iconPosition) {
    dataAttrs["data-icon-position"] = option.iconPosition;
  }
  return dataAttrs;
};
var renderOptionContent = (option, showIcons = true) => {
  if (!showIcons || !option.icon) {
    return option.label;
  }
  const iconElement = typeof option.icon === "string" ? option.icon + " " : option.icon;
  if (option.iconPosition === "right") {
    return /* @__PURE__ */ jsxs(Fragment, { children: [
      option.label,
      " ",
      iconElement
    ] });
  }
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    iconElement,
    " ",
    option.label
  ] });
};
function findOptionInSelect(value, options, groups) {
  if (groups == null ? void 0 : groups.length) {
    for (const g of groups) {
      const o = g.options.find((opt) => opt.value === value);
      if (o)
        return o;
    }
    return void 0;
  }
  return options == null ? void 0 : options.find((opt) => opt.value === value);
}
var Select = forwardRef((props, ref) => {
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
  const field = useFormField();
  const generatedId = useId();
  const selectId = id || (field == null ? void 0 : field.id) || generatedId;
  const messageId = `${selectId}-message`;
  const useGroups = Boolean(groups && groups.length > 0);
  const [pickerOpen, setPickerOpen] = useState(false);
  const pickerOpenRef = useRef(false);
  const setOpen = (next) => {
    if (pickerOpenRef.current === next)
      return;
    pickerOpenRef.current = next;
    setPickerOpen(next);
  };
  const handleChange = (event) => {
    const selectedValue = event.target.value;
    const selectedOption = findOptionInSelect(selectedValue, options, groups);
    setOpen(false);
    onChange == null ? void 0 : onChange(event);
    onValueChange == null ? void 0 : onValueChange(selectedValue, selectedOption);
  };
  const handleMouseDown = (event) => {
    onMouseDown == null ? void 0 : onMouseDown(event);
    if (!event.defaultPrevented && event.button === 0 && !event.currentTarget.disabled)
      setOpen(true);
  };
  const handleKeyDown = (event) => {
    onKeyDown == null ? void 0 : onKeyDown(event);
    setOpen(!event.defaultPrevented && isPickerOpenKey(event));
  };
  const handleBlur = (event) => {
    setOpen(false);
    onBlur == null ? void 0 : onBlur(event);
  };
  const isDisabled = rest.disabled;
  const resolvedStatus = error ? "error" : status;
  const helperMessage = error || helperText;
  const errorShown = Boolean(error);
  const initialError = useRef(error);
  const errorChanged = useRef(false);
  if (!errorChanged.current && error !== initialError.current)
    errorChanged.current = true;
  const describedBy = [ariaDescribedByProp != null ? ariaDescribedByProp : field == null ? void 0 : field.describedBy, helperMessage ? messageId : void 0].filter(Boolean).join(" ") || void 0;
  const ariaInvalid = ariaInvalidProp != null ? ariaInvalidProp : errorShown || resolvedStatus === "error" || Boolean(field == null ? void 0 : field.invalid);
  const ariaRequired = ariaRequiredProp != null ? ariaRequiredProp : (field == null ? void 0 : field.required) && !required ? true : void 0;
  const isInvalid = ariaInvalid === true || ariaInvalid === "true" || resolvedStatus === "error";
  const visualStatus = isInvalid ? "error" : resolvedStatus;
  const statusToken = visualStatus ? selectStatusTokens[visualStatus] : void 0;
  const borderColor = statusToken != null ? statusToken : "var(--color-border-default)";
  const footerColor = resolvedStatus ? selectStatusTokens[resolvedStatus] : "var(--color-text-secondary)";
  const sizeConfig = {
    sm: { minHeight: selectHeightTokens.sm, paddingX: 10, fontSize: "var(--text-small-size, 12px)" },
    md: { minHeight: selectHeightTokens.md, paddingX: 12, fontSize: "var(--text-body-size, 16px)" },
    lg: { minHeight: selectHeightTokens.lg, paddingX: 16, fontSize: "var(--text-body-size, 16px)" }
  };
  const currentSize = sizeConfig[size];
  const radiusValue = rounded === "0" ? 0 : rounded === "1" ? "var(--radius-xs, 2px)" : rounded === "2" ? "var(--radius-sm, 3px)" : rounded === "3" ? "var(--radius-base, 4px)" : rounded === "4" ? "var(--radius-md, 6px)" : rounded === "5" ? "var(--radius-lg, 8px)" : "9999px";
  const wrapperStyle = fullWidth ? void 0 : { width: "auto", display: "inline-block" };
  const wrapperClass = [customClass, fullWidth ? "ds-select-root--full" : ""].filter(Boolean).join(" ");
  const labelStyle = {
    display: "block",
    marginBottom: 8,
    color: isDisabled ? "var(--color-text-secondary)" : "var(--color-text-primary)",
    fontSize: "var(--text-secondary-size, 14px)",
    fontWeight: 500,
    lineHeight: 1.5,
    cursor: isDisabled ? "not-allowed" : "default"
  };
  const selectStyle = {
    display: "block",
    width: "100%",
    minWidth: 0,
    minHeight: currentSize.minHeight,
    padding: `0 ${currentSize.paddingX + 18}px 0 ${currentSize.paddingX}px`,
    boxSizing: "border-box",
    borderRadius: radiusValue,
    border: `1.5px solid ${borderColor}`,
    backgroundColor: isDisabled ? "var(--color-bg-page)" : "var(--color-bg-surface)",
    color: isDisabled ? "var(--color-text-secondary)" : "var(--color-text-primary)",
    appearance: "none",
    WebkitAppearance: "none",
    MozAppearance: "none",
    fontSize: currentSize.fontSize,
    lineHeight: 1.5,
    cursor: isDisabled ? "not-allowed" : "pointer",
    transition: "border-color 150ms, background-color 150ms"
  };
  const helperStyle = {
    marginTop: 8,
    marginBottom: 0,
    color: footerColor,
    fontSize: "var(--text-small-size, 12px)",
    lineHeight: 1.5
  };
  return /* @__PURE__ */ jsxs("div", { className: wrapperClass || void 0, style: wrapperStyle, children: [
    label && /* @__PURE__ */ jsxs("label", { htmlFor: selectId, style: labelStyle, children: [
      label,
      required ? /* @__PURE__ */ jsx("span", { className: "ds-select__required", "aria-hidden": "true", children: "*" }) : null
    ] }),
    /* @__PURE__ */ jsx(
      "div",
      {
        className: `ucs-select-shell${animatedChevron !== false ? " ucs-select-shell--chevron-animated" : " ds-select-shell--chevron-static"}`,
        "data-open": animatedChevron !== false && pickerOpen ? "true" : void 0,
        children: /* @__PURE__ */ jsxs(
          "select",
          {
            ref,
            id: selectId,
            className: className ? `ds-select ${className}` : "ds-select",
            "data-size": size,
            "data-invalid": isInvalid ? "true" : void 0,
            "data-status": visualStatus,
            style: style ? { ...selectStyle, ...style } : selectStyle,
            "aria-invalid": ariaInvalid,
            "aria-describedby": describedBy,
            "aria-required": ariaRequired,
            required,
            value,
            ...rest,
            onChange: handleChange,
            onMouseDown: handleMouseDown,
            onKeyDown: handleKeyDown,
            onBlur: handleBlur,
            children: [
              placeholder && /* @__PURE__ */ jsx("option", { value: "", disabled: !allowPlaceholderSelection, children: placeholder }),
              useGroups ? groups.map((group) => /* @__PURE__ */ jsx("optgroup", { label: group.label, children: group.options.map((opt, index) => {
                var _a;
                const dataAttributes = getOptionDataAttributes(opt);
                return /* @__PURE__ */ jsx(
                  "option",
                  {
                    value: opt.value,
                    disabled: opt.disabled,
                    ...dataAttributes,
                    children: renderOptionContent(opt, showIcons)
                  },
                  `${group.label}-${(_a = opt.value) != null ? _a : "no-value"}-${opt.label}-${index}`
                );
              }) }, group.label)) : options.map((opt, index) => {
                var _a;
                const dataAttributes = getOptionDataAttributes(opt);
                return /* @__PURE__ */ jsx(
                  "option",
                  {
                    value: opt.value,
                    disabled: opt.disabled,
                    ...dataAttributes,
                    children: renderOptionContent(opt, showIcons)
                  },
                  `${(_a = opt.value) != null ? _a : "no-value"}-${opt.label}-${index}`
                );
              })
            ]
          }
        )
      }
    ),
    helperMessage && /* @__PURE__ */ jsx(
      "p",
      {
        id: messageId,
        className: "ds-select__message",
        "data-status": resolvedStatus,
        role: errorShown && errorChanged.current ? "alert" : void 0,
        style: helperStyle,
        children: helperMessage
      }
    )
  ] });
});
Select.displayName = "Select";
Select[FORM_FIELD_CONSUMER_KEY] = true;
var Select_default = Select;

export {
  Select_default
};
//# sourceMappingURL=chunk-EZBNIZ3O.mjs.map