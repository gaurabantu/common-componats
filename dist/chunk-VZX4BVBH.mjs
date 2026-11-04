import {
  TextInputSearch_default,
  search_default
} from "./chunk-QWEACOCP.mjs";

// src/components/atoms/TextView/index.tsx
import React from "react";

// src/components/atoms/TextView/TextView.config.ts
var variantClassMap = {
  h1: "text-h1",
  h2: "text-h2",
  h3: "text-h3",
  h4: "text-h4",
  body: "text-body",
  secondary: "text-secondary",
  small: "text-small",
  micro: "text-micro"
};
var fontSizeClassMap = {
  h1: "text-h1",
  h2: "text-h2",
  h3: "text-h3",
  h4: "text-h4",
  body: "text-body",
  secondary: "text-secondary",
  small: "text-small",
  micro: "text-micro"
};
var fontWeightClassMap = {
  normal: "font-normal",
  medium: "font-medium",
  semibold: "font-semibold",
  bold: "font-bold",
  extrabold: "font-extrabold"
};
var lineHeightClassMap = {
  none: "leading-none",
  tight: "leading-tight",
  snug: "leading-snug",
  normal: "leading-normal",
  relaxed: "leading-relaxed",
  loose: "leading-loose"
};
var letterSpacingClassMap = {
  tighter: "tracking-tighter",
  tight: "tracking-tight",
  normal: "tracking-normal",
  wide: "tracking-wide",
  wider: "tracking-wider",
  widest: "tracking-widest"
};
var defaultTagByVariant = {
  h1: "h1",
  h2: "h2",
  h3: "h3",
  h4: "h4",
  body: "span",
  secondary: "span",
  small: "small",
  micro: "small"
};
var colorClassMap = {
  primary: "text-text-primary",
  secondary: "text-text-secondary",
  hint: "text-text-secondary",
  disabled: "text-text-secondary",
  success: "text-state-success",
  warning: "text-state-warning",
  error: "text-state-error",
  inherit: ""
};
var alignClassMap = {
  left: "text-start",
  center: "text-center",
  right: "text-end",
  justify: "text-justify"
};
var transformClassMap = {
  none: "normal-case",
  uppercase: "uppercase",
  lowercase: "lowercase",
  capitalize: "capitalize"
};
var decorationClassMap = {
  none: "no-underline",
  underline: "underline",
  "line-through": "line-through"
};

// src/components/atoms/TextView/TextView.utils.ts
var cls = (...classes) => classes.filter(Boolean).join(" ");

// src/components/atoms/TextView/index.tsx
var SEMANTIC_COLORS = [
  "primary",
  "secondary",
  "hint",
  "disabled",
  "success",
  "warning",
  "error",
  "inherit"
];
function isSemanticColor(color) {
  return SEMANTIC_COLORS.includes(color);
}
function isTokenFontSize(v) {
  return typeof v === "string" && v in fontSizeClassMap;
}
function isTokenFontWeight(v) {
  return typeof v === "string" && v in fontWeightClassMap;
}
var TextView = React.memo(function TextView2({
  as,
  children,
  variant = "body",
  color = "primary",
  fontSize,
  fontWeight,
  lineHeight,
  letterSpacing,
  align = "left",
  transform = "none",
  decoration = "none",
  className = "",
  truncate = false,
  style,
  ...restProps
}) {
  const resolvedVariant = variant;
  const fallbackTag = defaultTagByVariant[resolvedVariant] || "span";
  const Component = as || fallbackTag;
  const useFontSizeStyle = typeof fontSize === "string" && fontSize.length > 0 && !isTokenFontSize(fontSize);
  const sizeClass = isTokenFontSize(fontSize) ? fontSizeClassMap[fontSize] : variantClassMap[resolvedVariant];
  const useFontWeightStyle = typeof fontWeight === "number" || typeof fontWeight === "string" && fontWeight.length > 0 && !isTokenFontWeight(fontWeight);
  const weightClass = isTokenFontWeight(fontWeight) ? fontWeightClassMap[fontWeight] : "";
  const useColorStyle = typeof color === "string" && color.length > 0 && !isSemanticColor(color);
  const colorClass = !useColorStyle && color ? colorClassMap[color] : "";
  const finalClassName = cls(
    "font-sans",
    sizeClass,
    weightClass,
    lineHeight && lineHeightClassMap[lineHeight],
    letterSpacing && letterSpacingClassMap[letterSpacing],
    colorClass,
    alignClassMap[align],
    transformClassMap[transform],
    decorationClassMap[decoration],
    truncate && "truncate",
    className
  );
  const finalStyle = useColorStyle || useFontSizeStyle || useFontWeightStyle ? {
    ...style,
    ...useColorStyle ? { color } : null,
    ...useFontSizeStyle ? { fontSize } : null,
    ...useFontWeightStyle ? { fontWeight } : null
  } : style;
  return React.createElement(
    Component,
    { className: finalClassName, style: finalStyle, ...restProps },
    children
  );
});
var TextView_default = TextView;

// src/components/atoms/Checkbox/index.tsx
import React2, { useCallback, useEffect, useId, useLayoutEffect, useRef } from "react";

// src/components/atoms/Checkbox/Checkbox.config.ts
var defaultCheckboxColorClass = "";
var defaultLabelColorClass = "text-body text-text-primary cursor-pointer";
var defaultCheckboxInputLabelSpacing = "";
var CHECKBOX_DEFAULTS = {
  size: "md"
};

// src/components/atoms/Checkbox/Checkbox.utils.ts
function cls2(...classes) {
  return classes.filter(Boolean).join(" ");
}

// src/components/atoms/Checkbox/index.tsx
import { jsx, jsxs } from "react/jsx-runtime";
var useIsomorphicLayoutEffect = typeof window !== "undefined" ? useLayoutEffect : useEffect;
var CheckboxGlyph = () => /* @__PURE__ */ jsx("svg", { className: "ucs-cc-checkbox-check", "aria-hidden": true, viewBox: "0 0 12 12", children: /* @__PURE__ */ jsx("path", { className: "ucs-cc-checkbox-checkpath", d: "M2.75 6.05 L5.15 9.05 L9.95 3.25" }) });
var DashGlyph = () => /* @__PURE__ */ jsx("svg", { className: "ucs-cc-checkbox-dash", "aria-hidden": true, viewBox: "0 0 12 12", children: /* @__PURE__ */ jsx("path", { className: "ucs-cc-checkbox-dashpath", d: "M3 6 H9" }) });
var CheckboxBase = React2.forwardRef(function Checkbox({
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
}, forwardedRef) {
  const generatedId = useId();
  const checkboxId = id != null ? id : `ucs-cb-${generatedId}`;
  const labelId = `${checkboxId}-label`;
  const descriptionId = description ? `${checkboxId}-description` : void 0;
  const errorId = error ? `${checkboxId}-error` : void 0;
  const describedBy = [ariaDescribedByAttr, descriptionId, errorId].filter(Boolean).join(" ") || void 0;
  const hasVisibleLabel = label !== void 0 && label !== null && label !== false && !(typeof label === "string" && label.trim().length === 0);
  const resolvedAriaLabel = ariaLabel != null ? ariaLabel : ariaLabelAttr;
  const resolvedAriaLabelledBy = ariaLabelledBy != null ? ariaLabelledBy : ariaLabelledByAttr;
  const inputRef = useRef(null);
  const setRefs = useCallback(
    (node) => {
      inputRef.current = node;
      if (typeof forwardedRef === "function")
        forwardedRef(node);
      else if (forwardedRef)
        forwardedRef.current = node;
    },
    [forwardedRef]
  );
  useIsomorphicLayoutEffect(() => {
    if (inputRef.current)
      inputRef.current.indeterminate = indeterminate;
  });
  const colors = {
    brand: "var(--color-brand-primary)",
    textPrimary: "var(--color-text-primary)",
    textSecondary: "var(--color-text-secondary)",
    bgSurface: "var(--color-bg-surface)",
    borderDefault: "var(--color-border-default)",
    accentLavender: "var(--color-accent-lavender-10)",
    shadow: "var(--shadow-sm, 0 2px 8px rgba(0, 0, 0, 0.08))"
  };
  const isOn = checked || indeterminate;
  const roundedStyle = rounded === "0" ? 0 : rounded === "1" ? "var(--radius-xs, 2px)" : rounded === "2" ? "var(--radius-sm, 3px)" : rounded === "3" ? "var(--radius-base, 4px)" : rounded === "4" ? "var(--radius-md, 6px)" : rounded === "5" ? "var(--radius-lg, 8px)" : "9999px";
  const wrapperStyle = {
    display: "flex",
    alignItems: "flex-start",
    gap: "var(--space-1, 8px)",
    width: shape === "box" ? "100%" : "auto",
    padding: shape === "box" ? "12px" : 0,
    border: shape === "box" ? `1.5px solid ${error ? "var(--color-danger-strong)" : isOn ? colors.brand : colors.borderDefault}` : "none",
    borderRadius: shape === "box" ? roundedStyle : void 0,
    backgroundColor: shape === "box" ? isOn ? colors.accentLavender : colors.bgSurface : "transparent",
    boxShadow: shape === "box" && withShadow && !disabled ? colors.shadow : "none",
    cursor: disabled ? "not-allowed" : "pointer",
    opacity: disabled ? 0.6 : 1,
    userSelect: "none",
    pointerEvents: disabled ? "none" : "auto",
    ...shape === "box" ? {
      transition: "border-color 0.22s ease, background-color 0.22s ease, box-shadow 0.2s ease"
    } : {}
  };
  const labelStyle = {
    color: disabled ? colors.textSecondary : colors.textPrimary,
    lineHeight: 1.5,
    cursor: disabled ? "not-allowed" : "pointer"
  };
  const labelNode = /* @__PURE__ */ jsxs(
    "span",
    {
      id: labelId,
      className: cls2("ucs-cc-checkbox-label", labelColorClass, hideLabel && "sr-only"),
      style: labelStyle,
      "aria-hidden": !hasVisibleLabel ? true : void 0,
      children: [
        label,
        required && hasVisibleLabel ? /* @__PURE__ */ jsx("span", { className: "ucs-cc-checkbox-required", "aria-hidden": "true", children: "*" }) : null
      ]
    }
  );
  const control = /* @__PURE__ */ jsxs(
    "label",
    {
      htmlFor: checkboxId,
      className: cls2("ucs-cc-checkbox-root", className),
      style: wrapperStyle,
      "data-size": size,
      "data-hide-label": hideLabel ? "true" : void 0,
      children: [
        /* @__PURE__ */ jsx(
          "input",
          {
            ...nativeProps,
            ref: setRefs,
            type: "checkbox",
            id: checkboxId,
            name,
            value,
            checked,
            disabled,
            required: required || void 0,
            onChange,
            readOnly: onChange ? void 0 : true,
            "aria-label": !hasVisibleLabel && resolvedAriaLabel ? resolvedAriaLabel : void 0,
            "aria-labelledby": hasVisibleLabel ? labelId : !resolvedAriaLabel && resolvedAriaLabelledBy ? resolvedAriaLabelledBy : void 0,
            "aria-describedby": describedBy,
            "aria-invalid": error ? true : void 0,
            "data-indeterminate": indeterminate ? "true" : void 0,
            className: "peer ucs-cc-checkbox-native"
          }
        ),
        /* @__PURE__ */ jsxs(
          "span",
          {
            "aria-hidden": "true",
            className: cls2(
              "ucs-cc-checkbox-face",
              shape === "default" ? checkboxColorClass : "",
              inputLabelSpacingClass
            ),
            children: [
              /* @__PURE__ */ jsx(CheckboxGlyph, {}),
              /* @__PURE__ */ jsx(DashGlyph, {})
            ]
          }
        ),
        description ? /* @__PURE__ */ jsxs("span", { className: "ucs-cc-checkbox-text", children: [
          labelNode,
          /* @__PURE__ */ jsx("span", { id: descriptionId, className: "ucs-cc-checkbox-description", children: description })
        ] }) : labelNode
      ]
    }
  );
  return /* @__PURE__ */ jsxs("div", { className: "ucs-cc-checkbox-field", "data-size": size, "data-shape": shape, children: [
    control,
    error ? /* @__PURE__ */ jsx("p", { id: errorId, className: "ucs-cc-checkbox-error", role: "alert", children: error }) : null
  ] });
});
CheckboxBase.displayName = "Checkbox";
var Checkbox2 = React2.memo(CheckboxBase);
Checkbox2.displayName = "Checkbox";
var Checkbox_default = Checkbox2;

// src/components/molecules/FormField/index.tsx
import React3, { createContext, useContext, useEffect as useEffect2, useId as useId2, useMemo, useRef as useRef2 } from "react";

// src/components/molecules/FormField/FormField.config.ts
var FORM_FIELD_DEFAULTS = {
  layout: "vertical",
  optionalLabel: "(optional)"
};
var FORM_FIELD_REQUIRED_SR_TEXT = "required";
var FORM_FIELD_CONSUMER_KEY = "__dsFormFieldConsumer";
var FORM_FIELD_LABELABLE_SELECTOR = 'input:not([type="hidden"]), select, textarea, button, meter, output, progress';

// src/components/molecules/FormField/index.tsx
import { Fragment, jsx as jsx2, jsxs as jsxs2 } from "react/jsx-runtime";
function cls3(...parts) {
  return parts.filter(Boolean).join(" ");
}
function hasContent(node) {
  return node !== void 0 && node !== null && node !== false && node !== "";
}
var LABELABLE_TAGS = /* @__PURE__ */ new Set(["input", "select", "textarea", "button", "meter", "output", "progress"]);
var FormFieldContext = createContext(null);
function useFormField() {
  return useContext(FormFieldContext);
}
function useAnnounceOnChange(value) {
  const initial = useRef2(value);
  const changed = useRef2(false);
  if (!changed.current && value !== initial.current)
    changed.current = true;
  return changed.current;
}
function isDev() {
  var _a;
  const env = (_a = globalThis.process) == null ? void 0 : _a.env;
  return (env == null ? void 0 : env.NODE_ENV) !== "production";
}
function isFormFieldConsumer(type) {
  return Boolean(type && (typeof type === "object" || typeof type === "function") && type[FORM_FIELD_CONSUMER_KEY]);
}
var FormField = React3.forwardRef(function FormField2({
  label,
  htmlFor,
  hint,
  error,
  required = false,
  optional = false,
  counter,
  layout = FORM_FIELD_DEFAULTS.layout,
  group = false,
  hideLabel = false,
  children,
  className,
  ...rest
}, ref) {
  var _a, _b;
  const reactId = useId2().replace(/[^a-zA-Z0-9_-]/g, "");
  const child = React3.isValidElement(children) && children.type !== React3.Fragment ? children : null;
  const childProps = (_a = child == null ? void 0 : child.props) != null ? _a : {};
  const childId = typeof childProps.id === "string" && childProps.id ? childProps.id : void 0;
  const controlId = (_b = htmlFor != null ? htmlFor : childId) != null ? _b : `form-field-${reactId}`;
  const labelId = `${controlId}-label`;
  const showHint = hasContent(hint);
  const showError = hasContent(error);
  const hintId = showHint ? `${controlId}-hint` : void 0;
  const errorId = showError ? `${controlId}-error` : void 0;
  const counterId = counter ? `${controlId}-counter` : void 0;
  const describedBy = [hintId, errorId, counterId].filter(Boolean).join(" ") || void 0;
  const invalid = showError;
  const overLimit = counter ? counter.value > counter.max : false;
  const announceError = useAnnounceOnChange(error);
  const ctx = useMemo(
    () => ({ id: controlId, labelId, hintId, errorId, counterId, describedBy, invalid, required, group }),
    [controlId, labelId, hintId, errorId, counterId, describedBy, invalid, required, group]
  );
  const controlRef = useRef2(null);
  useEffect2(() => {
    var _a2;
    if (!isDev() || group)
      return;
    const root = controlRef.current;
    if (!root)
      return;
    const target = Array.from(root.querySelectorAll("[id]")).find((el) => el.id === controlId);
    const labelled = (_a2 = target == null ? void 0 : target.matches(FORM_FIELD_LABELABLE_SELECTOR)) != null ? _a2 : false;
    const byLabelledBy = Array.from(root.querySelectorAll("[aria-labelledby]")).some(
      (el) => {
        var _a3;
        return ((_a3 = el.getAttribute("aria-labelledby")) != null ? _a3 : "").split(/\s+/).includes(labelId);
      }
    );
    if (!labelled && !byLabelledBy) {
      console.warn(
        `[FormField] No labelable focusable element with id="${controlId}" (and no aria-labelledby="${labelId}") was found inside the field, so the label is not associated with the control. Use Input / TextArea / Select / Combobox / a native control, or wire a custom control with useFormField().`
      );
    }
  }, [controlId, labelId, group]);
  const isCompositeWrapper = htmlFor !== void 0 && child !== null && typeof child.type === "string" && !LABELABLE_TAGS.has(child.type);
  let control = children;
  if (child && !group && !isCompositeWrapper && !isFormFieldConsumer(child.type)) {
    const inject = {};
    if (childProps.id === void 0)
      inject.id = controlId;
    if (childProps["aria-describedby"] === void 0 && describedBy)
      inject["aria-describedby"] = describedBy;
    if (childProps["aria-invalid"] === void 0 && invalid)
      inject["aria-invalid"] = true;
    if (childProps["aria-required"] === void 0 && required)
      inject["aria-required"] = true;
    control = Object.keys(inject).length > 0 ? React3.cloneElement(child, inject) : child;
  }
  const LabelTag = group ? "span" : "label";
  const optionalText = !required && optional ? typeof optional === "string" ? optional : FORM_FIELD_DEFAULTS.optionalLabel : null;
  return /* @__PURE__ */ jsx2(FormFieldContext.Provider, { value: ctx, children: /* @__PURE__ */ jsxs2(
    "div",
    {
      ref,
      className: cls3("ds-form-field", className),
      "data-layout": layout,
      "data-invalid": invalid ? "true" : void 0,
      "data-group": group ? "true" : void 0,
      "data-hide-label": hideLabel ? "true" : void 0,
      ...group ? { role: "group", "aria-labelledby": labelId, "aria-describedby": describedBy } : {},
      ...rest,
      children: [
        /* @__PURE__ */ jsx2("div", { className: "ds-form-field__label-col", children: /* @__PURE__ */ jsxs2(
          LabelTag,
          {
            id: labelId,
            htmlFor: group ? void 0 : controlId,
            className: "ds-form-field__label",
            children: [
              label,
              required ? /* @__PURE__ */ jsxs2(Fragment, { children: [
                /* @__PURE__ */ jsx2("span", { className: "ds-form-field__required", "aria-hidden": "true", children: "*" }),
                /* @__PURE__ */ jsxs2("span", { className: "sr-only", children: [
                  " ",
                  FORM_FIELD_REQUIRED_SR_TEXT
                ] })
              ] }) : null,
              optionalText ? /* @__PURE__ */ jsx2("span", { className: "ds-form-field__optional", children: optionalText }) : null
            ]
          }
        ) }),
        /* @__PURE__ */ jsxs2("div", { className: "ds-form-field__control-col", children: [
          /* @__PURE__ */ jsx2("div", { ref: controlRef, className: "ds-form-field__control", children: control }),
          showHint || showError || counter ? /* @__PURE__ */ jsxs2("div", { className: "ds-form-field__messages", children: [
            /* @__PURE__ */ jsxs2("div", { className: "ds-form-field__texts", children: [
              showHint ? /* @__PURE__ */ jsx2("p", { id: hintId, className: "ds-form-field__hint", children: hint }) : null,
              showError ? /* @__PURE__ */ jsxs2("p", { id: errorId, className: "ds-form-field__error", role: announceError ? "alert" : void 0, children: [
                /* @__PURE__ */ jsxs2(
                  "svg",
                  {
                    className: "ds-form-field__error-icon",
                    viewBox: "0 0 16 16",
                    "aria-hidden": "true",
                    focusable: "false",
                    children: [
                      /* @__PURE__ */ jsx2("circle", { cx: "8", cy: "8", r: "6.25", fill: "none", stroke: "currentColor", strokeWidth: "1.5" }),
                      /* @__PURE__ */ jsx2("path", { d: "M8 4.75v3.75", stroke: "currentColor", strokeWidth: "1.5", strokeLinecap: "round" }),
                      /* @__PURE__ */ jsx2("circle", { cx: "8", cy: "11", r: "0.9", fill: "currentColor" })
                    ]
                  }
                ),
                /* @__PURE__ */ jsx2("span", { children: error })
              ] }) : null
            ] }),
            counter ? /* @__PURE__ */ jsxs2("span", { id: counterId, className: "ds-form-field__counter", "data-over": overLimit ? "true" : void 0, children: [
              /* @__PURE__ */ jsxs2("span", { "aria-hidden": "true", children: [
                counter.value,
                "/",
                counter.max
              ] }),
              /* @__PURE__ */ jsxs2("span", { className: "sr-only", children: [
                counter.value,
                " of ",
                counter.max,
                overLimit ? `, ${counter.value - counter.max} over the limit` : ""
              ] })
            ] }) : null
          ] }) : null,
          counter ? /* @__PURE__ */ jsx2("span", { className: "sr-only", "aria-live": "polite", children: overLimit ? `Limit of ${counter.max} exceeded` : "" }) : null
        ] })
      ]
    }
  ) });
});
FormField.displayName = "FormField";

// src/components/atoms/Select/index.tsx
import { forwardRef, useId as useId3, useRef as useRef3, useState } from "react";

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
import { Fragment as Fragment2, jsx as jsx3, jsxs as jsxs3 } from "react/jsx-runtime";
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
    return /* @__PURE__ */ jsxs3(Fragment2, { children: [
      option.label,
      " ",
      iconElement
    ] });
  }
  return /* @__PURE__ */ jsxs3(Fragment2, { children: [
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
  const generatedId = useId3();
  const selectId = id || (field == null ? void 0 : field.id) || generatedId;
  const messageId = `${selectId}-message`;
  const useGroups = Boolean(groups && groups.length > 0);
  const [pickerOpen, setPickerOpen] = useState(false);
  const pickerOpenRef = useRef3(false);
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
  const initialError = useRef3(error);
  const errorChanged = useRef3(false);
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
  return /* @__PURE__ */ jsxs3("div", { className: wrapperClass || void 0, style: wrapperStyle, children: [
    label && /* @__PURE__ */ jsxs3("label", { htmlFor: selectId, style: labelStyle, children: [
      label,
      required ? /* @__PURE__ */ jsx3("span", { className: "ds-select__required", "aria-hidden": "true", children: "*" }) : null
    ] }),
    /* @__PURE__ */ jsx3(
      "div",
      {
        className: `ucs-select-shell${animatedChevron !== false ? " ucs-select-shell--chevron-animated" : " ds-select-shell--chevron-static"}`,
        "data-open": animatedChevron !== false && pickerOpen ? "true" : void 0,
        children: /* @__PURE__ */ jsxs3(
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
              placeholder && /* @__PURE__ */ jsx3("option", { value: "", disabled: !allowPlaceholderSelection, children: placeholder }),
              useGroups ? groups.map((group) => /* @__PURE__ */ jsx3("optgroup", { label: group.label, children: group.options.map((opt, index) => {
                var _a;
                const dataAttributes = getOptionDataAttributes(opt);
                return /* @__PURE__ */ jsx3(
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
                return /* @__PURE__ */ jsx3(
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
    helperMessage && /* @__PURE__ */ jsx3(
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

// src/components/molecules/Table/TablePrimitives.tsx
import { forwardRef as forwardRef2 } from "react";

// src/components/molecules/Table/Table.utils.ts
var cls4 = (...classes) => {
  return classes.filter(Boolean).join(" ");
};

// src/components/molecules/Table/TablePrimitives.tsx
import { jsx as jsx4 } from "react/jsx-runtime";
var TableRoot = forwardRef2(function TableRoot2({
  className,
  containerClassName,
  scroll = true,
  stickyHeader = false,
  stickyFirstColumn = false,
  maxHeight,
  flush = false,
  children,
  ...rest
}, ref) {
  const table = /* @__PURE__ */ jsx4(
    "table",
    {
      ref,
      className: cls4(
        "table-ui",
        stickyHeader && "table-ui--sticky-header",
        stickyFirstColumn && "table-ui--sticky-first-col",
        className
      ),
      ...rest,
      children
    }
  );
  if (!scroll)
    return table;
  return /* @__PURE__ */ jsx4(
    "div",
    {
      className: cls4("table-ui-wrap", flush && "table-ui-wrap--flush", containerClassName),
      style: maxHeight !== void 0 ? { maxHeight: typeof maxHeight === "number" ? `${maxHeight}px` : maxHeight, overflowY: "auto" } : void 0,
      children: table
    }
  );
});
TableRoot.displayName = "TableRoot";
var TableCaption = forwardRef2(
  function TableCaption2({ className, ...rest }, ref) {
    return /* @__PURE__ */ jsx4("caption", { ref, className: cls4("table-ui-caption", className), ...rest });
  }
);
TableCaption.displayName = "TableCaption";
var TableHeader = forwardRef2(
  function TableHeader2({ className, ...rest }, ref) {
    return /* @__PURE__ */ jsx4("thead", { ref, className: cls4("table-ui-thead", className), ...rest });
  }
);
TableHeader.displayName = "TableHeader";
var TableBody = forwardRef2(function TableBody2({ className, ...rest }, ref) {
  return /* @__PURE__ */ jsx4("tbody", { ref, className: cls4("table-ui-tbody", className), ...rest });
});
TableBody.displayName = "TableBody";
var TableFooter = forwardRef2(
  function TableFooter2({ className, ...rest }, ref) {
    return /* @__PURE__ */ jsx4("tfoot", { ref, className: cls4("table-ui-tfoot", className), ...rest });
  }
);
TableFooter.displayName = "TableFooter";
var TableRow = forwardRef2(function TableRow2({ className, selected, ...rest }, ref) {
  return /* @__PURE__ */ jsx4(
    "tr",
    {
      ref,
      className: cls4("table-ui-tr", selected && "table-ui-tr--selected", className),
      "aria-selected": selected === void 0 ? void 0 : selected,
      "data-state": selected ? "selected" : void 0,
      ...rest
    }
  );
});
TableRow.displayName = "TableRow";
var TableHead = forwardRef2(function TableHead2({ className, scope = "col", casing = "upper", wrap = false, ...rest }, ref) {
  return /* @__PURE__ */ jsx4(
    "th",
    {
      ref,
      className: cls4(
        "table-ui-th",
        casing === "none" && "table-ui-th--casing-none",
        wrap && "table-ui-th--wrap",
        className
      ),
      scope,
      ...rest
    }
  );
});
TableHead.displayName = "TableHead";
var TableCell = forwardRef2(function TableCell2({ className, ...rest }, ref) {
  return /* @__PURE__ */ jsx4("td", { ref, className: cls4("table-ui-td", className), ...rest });
});
TableCell.displayName = "TableCell";

// src/components/molecules/Table/Table.tsx
import { useMemo as useMemo2, useState as useState2, useCallback as useCallback2, useEffect as useEffect3 } from "react";

// src/components/molecules/Table/Table.config.ts
var tableConfig = {
  default: {
    table: "table-base table-layout-auto",
    thead: {
      primary: "table-thead table-thead-theme-primary",
      secondary: "table-thead table-thead-theme-primary",
      light: "table-thead table-thead-theme-light",
      dark: "table-thead table-thead-theme-dark",
      success: "table-thead table-thead-theme-primary",
      warning: "table-thead table-thead-theme-light",
      danger: "table-thead table-thead-theme-primary",
      info: "table-thead table-thead-theme-light"
    },
    th: "",
    td: "",
    striped: "table-striped",
    hover: "table-hover",
    compact: {
      th: "table-compact",
      td: "table-compact"
    }
  }
};

// src/components/molecules/Table/parts/TableHeader.tsx
import { jsx as jsx5, jsxs as jsxs4 } from "react/jsx-runtime";
function TableHeader3({
  expandable,
  selectionMode,
  allSelected,
  visibleColumns,
  sortState,
  onSort,
  onSelectAll,
  className
}) {
  return /* @__PURE__ */ jsx5("thead", { className, children: /* @__PURE__ */ jsxs4("tr", { children: [
    expandable && /* @__PURE__ */ jsx5("th", { scope: "col", style: { width: 40 }, "aria-label": "Expand" }),
    selectionMode === "multiple" && /* @__PURE__ */ jsx5("th", { scope: "col", style: { width: 48 }, "aria-label": "Select all", children: /* @__PURE__ */ jsx5(
      Checkbox_default,
      {
        name: "table-select-all",
        value: "all",
        label: "",
        ariaLabel: "Select all rows",
        checked: allSelected,
        onChange: (e) => onSelectAll(e.target.checked)
      }
    ) }),
    selectionMode === "single" && /* @__PURE__ */ jsx5("th", { scope: "col", style: { width: 48 }, "aria-label": "Select" }),
    visibleColumns.map((col) => /* @__PURE__ */ jsxs4(
      "th",
      {
        scope: "col",
        className: cls4(
          col.align === "center" && "text-center",
          col.align === "right" && "text-end",
          col.sortable && "table-sortable"
        ),
        style: {
          width: typeof col.width === "number" ? `${col.width}px` : col.width,
          minWidth: typeof col.minWidth === "number" ? `${col.minWidth}px` : col.minWidth
        },
        tabIndex: col.sortable ? 0 : void 0,
        onClick: () => col.sortable && onSort(col.key),
        onKeyDown: (e) => {
          if (!col.sortable)
            return;
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            onSort(col.key);
          }
        },
        "aria-sort": col.sortable && sortState.key === col.key ? sortState.dir === "asc" ? "ascending" : sortState.dir === "desc" ? "descending" : "none" : void 0,
        children: [
          col.headerRender ? col.headerRender(col) : col.header,
          col.sortable && /* @__PURE__ */ jsx5("span", { className: "table-sort-icon", "aria-hidden": true, children: sortState.key !== col.key || !sortState.dir ? " \u2195" : sortState.dir === "asc" ? " \u25B2" : " \u25BC" })
        ]
      },
      col.key
    ))
  ] }) });
}

// src/components/molecules/Table/parts/TableRow.tsx
import React5 from "react";

// src/components/molecules/Table/parts/TableCell.tsx
import { jsx as jsx6 } from "react/jsx-runtime";
function TableCell3({ align = "left", children }) {
  return /* @__PURE__ */ jsx6(
    "td",
    {
      className: cls4(
        align === "center" && "text-center",
        align === "right" && "text-end"
      ),
      children
    }
  );
}

// src/components/molecules/Table/parts/TableRow.tsx
import { jsx as jsx7, jsxs as jsxs5 } from "react/jsx-runtime";
function TableRow3({
  row,
  rowIndex,
  rowKeyValue,
  selectionMode,
  selected,
  expandable,
  isExpanded,
  visibleColumns,
  onRowClick,
  onToggleSelect,
  onToggleExpand,
  hover = true,
  renderCell
}) {
  var _a, _b, _c, _d;
  return /* @__PURE__ */ jsxs5(React5.Fragment, { children: [
    /* @__PURE__ */ jsxs5(
      "tr",
      {
        className: cls4(selected && "table-row-selected"),
        onClick: () => {
          onRowClick == null ? void 0 : onRowClick(row, rowIndex);
          if (selectionMode === "single")
            onToggleSelect(rowKeyValue, row);
        },
        style: { cursor: hover || onRowClick ? "pointer" : void 0 },
        children: [
          expandable && /* @__PURE__ */ jsx7("td", { style: { width: 40 }, children: /* @__PURE__ */ jsx7(
            "button",
            {
              type: "button",
              className: cls4("table-expand-btn", isExpanded && "table-expand-btn-expanded"),
              "aria-expanded": isExpanded,
              "aria-label": isExpanded ? "Collapse row details" : "Expand row details",
              onClick: (e) => {
                e.stopPropagation();
                onToggleExpand(rowKeyValue);
              },
              children: /* @__PURE__ */ jsx7("span", { className: "table-expand-btn-icon", "aria-hidden": true, children: "\u25B6" })
            }
          ) }),
          selectionMode === "multiple" && /* @__PURE__ */ jsx7("td", { onClick: (e) => e.stopPropagation(), children: /* @__PURE__ */ jsx7(
            Checkbox_default,
            {
              name: "table-row",
              value: rowKeyValue,
              label: "",
              ariaLabel: `Select row ${String((_b = row[(_a = visibleColumns[0]) == null ? void 0 : _a.key]) != null ? _b : rowKeyValue)}`,
              checked: selected,
              onChange: () => onToggleSelect(rowKeyValue, row)
            }
          ) }),
          selectionMode === "single" && /* @__PURE__ */ jsx7("td", { className: "text-center", children: /* @__PURE__ */ jsx7(
            "input",
            {
              type: "radio",
              name: "table-row-select",
              checked: selected,
              onChange: () => onToggleSelect(rowKeyValue, row),
              onClick: (e) => e.stopPropagation(),
              "aria-label": `Select row ${String((_d = row[(_c = visibleColumns[0]) == null ? void 0 : _c.key]) != null ? _d : rowKeyValue)}`
            }
          ) }),
          visibleColumns.map((col) => /* @__PURE__ */ jsx7(TableCell3, { align: col.align, children: renderCell(col, row, rowIndex) }, col.key))
        ]
      }
    ),
    expandable && isExpanded && /* @__PURE__ */ jsx7("tr", { className: "table-expanded-row", children: /* @__PURE__ */ jsx7(
      "td",
      {
        colSpan: visibleColumns.length + (selectionMode !== "none" ? 1 : 0) + (expandable ? 1 : 0),
        children: expandable.expandedRowRender(row, rowIndex)
      }
    ) })
  ] });
}

// src/components/molecules/Table/Table.tsx
import { jsx as jsx8, jsxs as jsxs6 } from "react/jsx-runtime";
function getRowKey(row, index, rowKey) {
  var _a, _b;
  if (typeof rowKey === "function")
    return rowKey(row, index);
  if (rowKey && row && typeof row === "object" && rowKey in row) {
    const v = row[rowKey];
    return String(v != null ? v : index);
  }
  const r = row;
  return String((_b = (_a = r == null ? void 0 : r.id) != null ? _a : r == null ? void 0 : r.key) != null ? _b : index);
}
function isNumericLike(value) {
  if (typeof value === "number")
    return Number.isFinite(value);
  if (typeof value !== "string")
    return false;
  const trimmed = value.trim();
  if (!trimmed)
    return false;
  return Number.isFinite(Number(trimmed));
}
function toNumber(value) {
  return typeof value === "number" ? value : Number(String(value).trim());
}
function defaultSorter(a, b, sortType = "auto") {
  if (a == null && b == null)
    return 0;
  if (a == null)
    return 1;
  if (b == null)
    return -1;
  const shouldUseNumericSort = sortType === "number" || sortType === "auto" && isNumericLike(a) && isNumericLike(b);
  if (shouldUseNumericSort) {
    return toNumber(a) - toNumber(b);
  }
  return String(a).localeCompare(String(b));
}
function TableInner({
  columns,
  data,
  rowKey = "id",
  selectionMode = "none",
  selectedRowKeys,
  selectedRow,
  onSelectionChange,
  onRowSelect,
  onRowClick,
  expandable,
  searchable = true,
  searchPlaceholder = "Search...",
  searchProps,
  searchColumns,
  toolbar,
  toolbarLeft,
  toolbarRight,
  pagination = true,
  loading = false,
  loadingVariant = "overlay",
  loadingRows = 6,
  emptyText = "No data",
  emptyComponent,
  striped = true,
  bordered = false,
  verticalDivider = false,
  hover = true,
  compact = false,
  headerColor = "light",
  customHeaderClass,
  stickyHeader = false,
  scroll,
  className = "",
  footer,
  showSearch,
  size = "md",
  tableLayout = "auto",
  variant = "default",
  theme = "light"
}) {
  var _a, _b, _c, _d;
  const config = tableConfig.default;
  const [searchValue, setSearchValue] = useState2("");
  const [sortState, setSortState] = useState2({ key: "", dir: null });
  const [currentPage, setCurrentPage] = useState2(1);
  const paginationConfig = typeof pagination === "object" ? pagination : {};
  const pageSizeOptions = (_a = paginationConfig.pageSizeOptions) != null ? _a : [5, 10, 15, 25, 50];
  const [itemsPerPage, setItemsPerPage] = useState2((_b = paginationConfig.pageSize) != null ? _b : 10);
  const selectedSet = useMemo2(() => {
    const keys = selectedRowKeys != null ? selectedRowKeys : selectedRow;
    if (!keys)
      return /* @__PURE__ */ new Set();
    const arr = Array.isArray(keys) ? keys : [keys];
    return new Set(arr);
  }, [selectedRowKeys, selectedRow]);
  const expandedSet = useMemo2(() => {
    if (!(expandable == null ? void 0 : expandable.expandedRowKeys))
      return /* @__PURE__ */ new Set();
    return new Set(expandable.expandedRowKeys);
  }, [expandable == null ? void 0 : expandable.expandedRowKeys]);
  const visibleColumns = useMemo2(() => columns.filter((c) => !c.hidden), [columns]);
  const filteredData = useMemo2(() => {
    if (!searchValue.trim())
      return data;
    const lower = searchValue.toLowerCase();
    const keysToSearch = (searchColumns == null ? void 0 : searchColumns.length) ? searchColumns : visibleColumns.map((c) => c.key);
    return data.filter(
      (row) => keysToSearch.some((k) => {
        const v = row[k];
        return String(v != null ? v : "").toLowerCase().includes(lower);
      })
    );
  }, [data, searchValue, searchColumns, visibleColumns]);
  const sortedData = useMemo2(() => {
    var _a2;
    if (!sortState.key || !sortState.dir)
      return filteredData;
    const col = visibleColumns.find((c) => c.key === sortState.key);
    if (!(col == null ? void 0 : col.sortable))
      return filteredData;
    const sorter = (_a2 = col.sorter) != null ? _a2 : (a, b) => {
      var _a3;
      return defaultSorter(
        a[col.key],
        b[col.key],
        (_a3 = col.sortType) != null ? _a3 : "auto"
      );
    };
    const sorted = [...filteredData].sort((a, b) => {
      const v = sorter(a, b, col.key);
      return sortState.dir === "asc" ? v : -v;
    });
    return sorted;
  }, [filteredData, sortState, visibleColumns]);
  const totalItems = sortedData.length;
  const totalPages = Math.max(1, Math.ceil(totalItems / itemsPerPage));
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedData = pagination ? sortedData.slice(startIndex, startIndex + itemsPerPage) : sortedData;
  useEffect3(() => {
    setCurrentPage((p) => p > totalPages ? totalPages : p < 1 ? 1 : p);
  }, [totalPages]);
  const handleSort = useCallback2(
    (key) => {
      const col = visibleColumns.find((c) => c.key === key);
      if (!(col == null ? void 0 : col.sortable))
        return;
      setSortState((prev) => ({
        key,
        dir: prev.key !== key ? "asc" : prev.dir === "asc" ? "desc" : prev.dir === "desc" ? null : "asc"
      }));
    },
    [visibleColumns]
  );
  const handleSelectRow = useCallback2(
    (key, row) => {
      if (selectionMode === "single") {
        const keys = [key];
        onSelectionChange == null ? void 0 : onSelectionChange(keys, [row]);
        onRowSelect == null ? void 0 : onRowSelect(key);
      } else if (selectionMode === "multiple") {
        const newSet = new Set(selectedSet);
        if (newSet.has(key))
          newSet.delete(key);
        else
          newSet.add(key);
        const keys = Array.from(newSet);
        const rows = data.filter((r) => keys.includes(getRowKey(r, data.indexOf(r), rowKey)));
        onSelectionChange == null ? void 0 : onSelectionChange(keys, rows);
      }
    },
    [selectionMode, selectedSet, data, rowKey, onSelectionChange, onRowSelect]
  );
  const handleSelectAll = useCallback2(
    (checked) => {
      if (selectionMode !== "multiple")
        return;
      const keys = checked ? paginatedData.map((r, i) => getRowKey(r, startIndex + i, rowKey)) : [];
      const rows = checked ? paginatedData : [];
      onSelectionChange == null ? void 0 : onSelectionChange(keys, rows);
    },
    [selectionMode, paginatedData, startIndex, rowKey, onSelectionChange]
  );
  const allSelected = selectionMode === "multiple" && paginatedData.length > 0 && paginatedData.every((r, i) => selectedSet.has(getRowKey(r, startIndex + i, rowKey)));
  const handleExpand = useCallback2(
    (key) => {
      if (!(expandable == null ? void 0 : expandable.onExpandedRowsChange))
        return;
      const newSet = new Set(expandedSet);
      if (newSet.has(key))
        newSet.delete(key);
      else
        newSet.add(key);
      expandable.onExpandedRowsChange(Array.from(newSet));
    },
    [expandable, expandedSet]
  );
  const getHeaderClass = () => customHeaderClass || config.thead[headerColor] || config.thead.light;
  const renderCell = (column, row, rowIndex) => {
    if (column.render) {
      const val2 = row[column.key];
      return column.render(val2, row, rowIndex);
    }
    const val = row[column.key];
    return /* @__PURE__ */ jsx8(TextView_default, { as: "span", children: val != null ? String(val) : "" });
  };
  const renderPageNumbers = () => {
    const pages = [];
    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++)
        pages.push(i);
    } else {
      pages.push(1);
      if (currentPage <= 4) {
        for (let i = 2; i <= Math.min(5, totalPages - 1); i++)
          pages.push(i);
        pages.push("...");
      } else if (currentPage >= totalPages - 3) {
        pages.push("...");
        for (let i = Math.max(2, totalPages - 4); i <= totalPages; i++)
          pages.push(i);
      } else {
        pages.push("...");
        for (let i = currentPage - 1; i <= currentPage + 1; i++)
          pages.push(i);
        pages.push("...");
      }
      if (totalPages > 1 && !pages.includes(totalPages))
        pages.push(totalPages);
    }
    return pages;
  };
  const shouldUseSkeleton = loading && loadingVariant === "skeleton";
  const showLoadingOverlay = loading && loadingVariant !== "skeleton";
  const extraColumnsCount = (expandable ? 1 : 0) + (selectionMode !== "none" ? 1 : 0);
  const tableInlineStyle = (scroll == null ? void 0 : scroll.x) ? { minWidth: typeof scroll.x === "number" ? `${scroll.x}px` : scroll.x } : void 0;
  const tableContent = /* @__PURE__ */ jsxs6(
    "table",
    {
      className: cls4(
        config.table,
        tableLayout === "fixed" && "table-layout-fixed",
        variant === "minimal" && "table-variant-minimal",
        (bordered || variant === "bordered") && "table-bordered",
        verticalDivider && "table-vertical-divider",
        stickyHeader && "table-sticky-header",
        striped && config.striped,
        hover && config.hover,
        compact && "table-compact",
        size === "sm" && "table-size-sm",
        size === "lg" && "table-size-lg",
        className
      ),
      style: tableInlineStyle,
      children: [
        /* @__PURE__ */ jsx8(
          TableHeader3,
          {
            expandable: Boolean(expandable),
            selectionMode,
            allSelected,
            visibleColumns,
            sortState,
            onSort: handleSort,
            onSelectAll: handleSelectAll,
            className: getHeaderClass()
          }
        ),
        /* @__PURE__ */ jsx8("tbody", { className: "table-tbody", children: shouldUseSkeleton ? Array.from({ length: Math.max(1, loadingRows) }).map((_, idx) => /* @__PURE__ */ jsx8("tr", { className: "table-skeleton-row", "aria-hidden": "true", children: Array.from({ length: visibleColumns.length + extraColumnsCount }).map((__, cellIdx) => /* @__PURE__ */ jsx8("td", { children: /* @__PURE__ */ jsx8("div", { className: "table-skeleton-line" }) }, `table-skeleton-cell-${idx}-${cellIdx}`)) }, `table-skeleton-row-${idx}`)) : paginatedData.map((row, idx) => {
          const rk = getRowKey(row, startIndex + idx, rowKey);
          return /* @__PURE__ */ jsx8(
            TableRow3,
            {
              row,
              rowIndex: startIndex + idx,
              rowKeyValue: rk,
              selectionMode,
              selected: selectedSet.has(rk),
              expandable,
              isExpanded: expandedSet.has(rk),
              visibleColumns,
              onRowClick,
              onToggleSelect: handleSelectRow,
              onToggleExpand: handleExpand,
              hover,
              renderCell
            },
            rk
          );
        }) }),
        footer && /* @__PURE__ */ jsx8("tfoot", { children: /* @__PURE__ */ jsx8("tr", { children: footer }) })
      ]
    }
  );
  const showSearchBar = searchable && showSearch !== false;
  const showPagination = Boolean(pagination) && totalItems > 0;
  const searchMaxWidth = (_c = searchProps == null ? void 0 : searchProps.maxWidth) != null ? _c : 280;
  const searchSize = (_d = searchProps == null ? void 0 : searchProps.size) != null ? _d : "sm";
  const searchBar = showSearchBar && /* @__PURE__ */ jsx8("div", { style: { marginBottom: 0, maxWidth: typeof searchMaxWidth === "number" ? `${searchMaxWidth}px` : searchMaxWidth, flex: toolbarRight ? "0 1 auto" : "1 1 auto" }, children: /* @__PURE__ */ jsx8(
    TextInputSearch_default,
    {
      leftIcon: search_default,
      leftIconHeight: 18,
      leftIconWidth: 18,
      placeholder: searchPlaceholder,
      value: searchValue,
      onChange: setSearchValue,
      size: searchSize,
      fullWidth: true,
      showClearButton: searchProps == null ? void 0 : searchProps.showClearButton,
      showSearchButton: searchProps == null ? void 0 : searchProps.showSearchButton,
      searchButtonDisplay: searchProps == null ? void 0 : searchProps.searchButtonDisplay,
      searchActionButtonProps: searchProps == null ? void 0 : searchProps.searchActionButtonProps
    }
  ) });
  const leftContent = toolbarLeft != null ? toolbarLeft : showSearchBar ? searchBar : null;
  const hasToolbar = toolbar || leftContent || toolbarRight;
  const toolbarContent = toolbar != null ? toolbar : hasToolbar ? /* @__PURE__ */ jsxs6("div", { className: "table-toolbar", children: [
    leftContent && /* @__PURE__ */ jsx8("div", { className: "table-toolbar-left", children: leftContent }),
    toolbarRight && /* @__PURE__ */ jsx8("div", { className: "table-toolbar-right", children: toolbarRight })
  ] }) : null;
  const wrapperClass = cls4("table-wrapper", theme === "dark" && "table-theme-dark");
  const scrollWrapperStyle = (scroll == null ? void 0 : scroll.y) ? {
    maxHeight: typeof scroll.y === "number" ? `${scroll.y}px` : scroll.y,
    overflowY: "auto",
    overflowX: "auto"
  } : { overflowX: "auto" };
  return /* @__PURE__ */ jsxs6("div", { className: wrapperClass, style: { position: "relative" }, "aria-busy": loading, children: [
    toolbarContent,
    showLoadingOverlay && /* @__PURE__ */ jsx8(
      "div",
      {
        className: "table-loading-overlay",
        role: "status",
        "aria-live": "polite",
        "aria-busy": "true",
        children: /* @__PURE__ */ jsx8(TextView_default, { children: "Loading..." })
      }
    ),
    /* @__PURE__ */ jsx8(
      "div",
      {
        className: cls4(stickyHeader && "table-scroll-body", "table-scroll-wrapper"),
        style: scrollWrapperStyle,
        role: "region",
        "aria-label": "Data table",
        children: sortedData.length === 0 && !loading ? emptyComponent != null ? emptyComponent : /* @__PURE__ */ jsx8("div", { className: "table-empty", children: /* @__PURE__ */ jsx8(TextView_default, { as: "p", children: emptyText }) }) : tableContent
      }
    ),
    showPagination && totalPages > 1 && /* @__PURE__ */ jsxs6("div", { className: "table-pagination", children: [
      /* @__PURE__ */ jsxs6("div", { className: "table-pagination-nav", children: [
        /* @__PURE__ */ jsx8(
          "button",
          {
            type: "button",
            className: "table-pagination-btn",
            onClick: () => setCurrentPage((p) => Math.max(1, p - 1)),
            disabled: currentPage === 1,
            "aria-label": "Previous page",
            children: "\u2039"
          }
        ),
        renderPageNumbers().map(
          (page, i) => page === "..." ? /* @__PURE__ */ jsx8("span", { className: "table-pagination-ellipsis", children: "\u2026" }, `ellipsis-${i}`) : /* @__PURE__ */ jsx8(
            "button",
            {
              type: "button",
              className: cls4(
                "table-pagination-page",
                currentPage === page && "active"
              ),
              onClick: () => setCurrentPage(page),
              children: page
            },
            page
          )
        ),
        /* @__PURE__ */ jsx8(
          "button",
          {
            type: "button",
            className: "table-pagination-btn",
            onClick: () => setCurrentPage((p) => Math.min(totalPages, p + 1)),
            disabled: currentPage === totalPages,
            "aria-label": "Next page",
            children: "\u203A"
          }
        )
      ] }),
      /* @__PURE__ */ jsxs6("div", { style: { display: "flex", alignItems: "center", gap: 8 }, children: [
        /* @__PURE__ */ jsx8(TextView_default, { as: "small", style: { color: "var(--color-text-secondary)" }, children: "Show" }),
        /* @__PURE__ */ jsx8("div", { style: { minWidth: 70 }, children: /* @__PURE__ */ jsx8(
          Select_default,
          {
            options: pageSizeOptions.map((n) => ({ label: String(n), value: String(n) })),
            value: String(itemsPerPage),
            size: "sm",
            onValueChange: (v) => {
              setItemsPerPage(Number(v));
              setCurrentPage(1);
            }
          }
        ) }),
        /* @__PURE__ */ jsxs6(TextView_default, { as: "small", style: { color: "var(--color-text-secondary)" }, children: [
          "of ",
          totalItems,
          " ",
          totalItems === 1 ? "item" : "items"
        ] })
      ] })
    ] })
  ] });
}
function Table(props) {
  return /* @__PURE__ */ jsx8(TableInner, { ...props });
}

// src/components/molecules/Table/index.tsx
var Table2 = Object.assign(Table, {
  Root: TableRoot,
  Caption: TableCaption,
  Header: TableHeader,
  Body: TableBody,
  Footer: TableFooter,
  Row: TableRow,
  Head: TableHead,
  Cell: TableCell
});
var Table_default = Table2;

export {
  TextView_default,
  Checkbox_default,
  FORM_FIELD_CONSUMER_KEY,
  useFormField,
  FormField,
  Select_default,
  TableRoot,
  TableCaption,
  TableHeader,
  TableBody,
  TableFooter,
  TableRow,
  TableHead,
  TableCell,
  Table_default
};
//# sourceMappingURL=chunk-VZX4BVBH.mjs.map