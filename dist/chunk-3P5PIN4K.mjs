/* ucs:component-css */
import "./styles/components/atoms/ucs-choice-controls.css";
import "./styles/components/atoms/Checkbox/Checkbox.css";
// src/components/atoms/Checkbox/index.tsx
import React, { useCallback, useEffect, useId, useLayoutEffect, useRef } from "react";

// src/components/atoms/Checkbox/Checkbox.config.ts
var defaultCheckboxColorClass = "";
var defaultLabelColorClass = "text-body text-text-primary cursor-pointer";
var defaultCheckboxInputLabelSpacing = "";
var CHECKBOX_DEFAULTS = {
  size: "md"
};

// src/components/atoms/Checkbox/Checkbox.utils.ts
function cls(...classes) {
  return classes.filter(Boolean).join(" ");
}

// src/components/atoms/Checkbox/index.tsx
import { jsx, jsxs } from "react/jsx-runtime";
var useIsomorphicLayoutEffect = typeof window !== "undefined" ? useLayoutEffect : useEffect;
var CheckboxGlyph = () => /* @__PURE__ */ jsx("svg", { className: "ucs-cc-checkbox-check", "aria-hidden": true, viewBox: "0 0 12 12", children: /* @__PURE__ */ jsx("path", { className: "ucs-cc-checkbox-checkpath", d: "M2.75 6.05 L5.15 9.05 L9.95 3.25" }) });
var DashGlyph = () => /* @__PURE__ */ jsx("svg", { className: "ucs-cc-checkbox-dash", "aria-hidden": true, viewBox: "0 0 12 12", children: /* @__PURE__ */ jsx("path", { className: "ucs-cc-checkbox-dashpath", d: "M3 6 H9" }) });
var CheckboxBase = React.forwardRef(function Checkbox({
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
    brand: "var(--color-control-checked-border, var(--color-brand-primary))",
    textPrimary: "var(--color-text-primary)",
    textSecondary: "var(--color-text-secondary)",
    bgSurface: "var(--color-bg-surface)",
    borderDefault: "var(--color-border-default)",
    accentLavender: "var(--color-selected-bg, var(--color-accent-lavender-10))",
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
      className: cls("ucs-cc-checkbox-label", labelColorClass, hideLabel && "sr-only"),
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
      className: cls("ucs-cc-checkbox-root", className),
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
            className: cls(
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
var Checkbox2 = React.memo(CheckboxBase);
Checkbox2.displayName = "Checkbox";
var Checkbox_default = Checkbox2;

export {
  Checkbox_default
};
//# sourceMappingURL=chunk-3P5PIN4K.mjs.map