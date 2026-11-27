/* ucs:component-css */
import "./styles/components/atoms/ucs-choice-controls.css";
import {
  TextView_default
} from "./chunk-QLCAIULL.mjs";

// src/components/atoms/RadioGroup/RadioGroup.config.ts
var defaultRadioColorClass = "";
var defaultLabelColorClass = "title-2";

// src/components/atoms/RadioGroup/RadioGroup.utils.ts
function cls(...classes) {
  return classes.filter(Boolean).join(" ");
}

// src/components/atoms/RadioGroup/index.tsx
import { jsx, jsxs } from "react/jsx-runtime";
var RadioButton = ({
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
    brand: "var(--color-control-checked-border, var(--color-brand-primary))",
    textPrimary: "var(--color-text-primary)",
    textSecondary: "var(--color-text-secondary)",
    bgSurface: "var(--color-bg-surface)",
    borderDefault: "var(--color-border-default)",
    accentLavender: "var(--color-selected-bg, var(--color-accent-lavender-10))",
    shadow: "var(--shadow-sm, 0 2px 8px rgba(0, 0, 0, 0.08))"
  };
  const roundedStyle = rounded === "0" ? 0 : rounded === "1" ? "var(--radius-xs, 2px)" : rounded === "2" ? "var(--radius-sm, 3px)" : rounded === "3" ? "var(--radius-base, 4px)" : rounded === "4" ? "var(--radius-md, 6px)" : rounded === "5" ? "var(--radius-lg, 8px)" : "9999px";
  const wrapperStyle = {
    display: "flex",
    alignItems: "flex-start",
    gap: 10,
    width: isBox ? "100%" : void 0,
    minWidth: isBox ? "160px" : void 0,
    padding: isBox ? "12px" : 0,
    border: isBox ? `1.5px solid ${checked ? colors.brand : colors.borderDefault}` : "none",
    borderRadius: isBox ? roundedStyle : void 0,
    backgroundColor: isBox ? checked ? colors.accentLavender : colors.bgSurface : "transparent",
    boxShadow: isBox && withShadow && !disabled ? colors.shadow : "none",
    cursor: disabled ? "not-allowed" : "pointer",
    userSelect: "none",
    opacity: disabled ? 0.6 : 1,
    pointerEvents: disabled ? "none" : "auto",
    ...isBox ? {
      transition: "border-color 0.22s ease, background-color 0.22s ease, box-shadow 0.2s ease"
    } : {}
  };
  const labelStyle = {
    color: disabled ? colors.textSecondary : colors.textPrimary,
    lineHeight: 1.5,
    whiteSpace: "normal",
    wordBreak: "break-word"
  };
  return /* @__PURE__ */ jsxs(
    "label",
    {
      htmlFor: id,
      className: cls("ucs-cc-radio-root", itemMarginClass),
      style: wrapperStyle,
      children: [
        /* @__PURE__ */ jsx(
          "input",
          {
            id,
            type: "radio",
            name,
            value,
            checked,
            disabled,
            onChange,
            tabIndex,
            className: "peer ucs-cc-radio-native"
          }
        ),
        /* @__PURE__ */ jsx(
          "span",
          {
            "aria-hidden": "true",
            className: cls("ucs-cc-radio-face", radioColorClass),
            children: /* @__PURE__ */ jsx("span", { className: "ucs-cc-radio-dot" })
          }
        ),
        /* @__PURE__ */ jsxs("div", { style: { display: "flex", flexDirection: "column", flex: 1, minWidth: 0 }, children: [
          /* @__PURE__ */ jsx(
            "span",
            {
              className: cls(labelColorClass),
              style: labelStyle,
              children: label
            }
          ),
          subLabel && /* @__PURE__ */ jsx(
            TextView_default,
            {
              as: "small",
              style: {
                marginTop: 4,
                color: colors.textSecondary,
                fontStyle: "italic"
              },
              children: subLabel
            }
          )
        ] })
      ]
    }
  );
};
var RadioGroup = ({
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
  const labelledById = ariaLabelledBy != null ? ariaLabelledBy : `${name}-label`;
  const fixedGridStyle = layout === "grid" ? {
    display: "grid",
    gap,
    gridTemplateColumns: `repeat(${columns}, minmax(${minWidth}, 1fr))`
  } : {};
  const autoGridStyle = layout === "grid-auto" ? {
    display: "grid",
    gap,
    gridTemplateColumns: `repeat(auto-fit, minmax(${minWidth}, 1fr))`
  } : {};
  const finalStyle = {
    display: layout === "vertical" ? "flex" : layout === "horizontal" ? "flex" : void 0,
    flexDirection: layout === "vertical" ? "column" : layout === "horizontal" ? "row" : void 0,
    alignItems: layout === "horizontal" ? "flex-start" : void 0,
    gap: layout === "horizontal" ? gap : void 0,
    ...fixedGridStyle,
    ...autoGridStyle
  };
  const itemMarginClass = "";
  const hasCheckedValue = options.some((opt) => opt.value === selectedValue);
  const firstEnabledIndex = options.findIndex((opt) => !opt.disabled);
  return /* @__PURE__ */ jsxs(
    "fieldset",
    {
      className: "",
      style: finalStyle,
      "aria-labelledby": labelledById,
      children: [
        /* @__PURE__ */ jsx("legend", { id: labelledById, className: "visually-hidden", children: name }),
        options.map((opt, index) => {
          var _a;
          const isChecked = selectedValue === opt.value;
          let tabIndex = -1;
          if (isChecked) {
            tabIndex = 0;
          } else if (!hasCheckedValue && index === firstEnabledIndex) {
            tabIndex = 0;
          }
          return /* @__PURE__ */ jsx(
            RadioButton,
            {
              name,
              label: opt.label,
              subLabel: opt.subLabel,
              value: opt.value,
              checked: isChecked,
              onChange: () => onChange(opt.value),
              radioColorClass,
              labelColorClass,
              itemMarginClass,
              shape: opt.shape,
              rounded: opt.rounded,
              withShadow: opt.withShadow,
              disabled: (_a = opt.disabled) != null ? _a : false,
              tabIndex
            },
            opt.value
          );
        })
      ]
    }
  );
};
var RadioGroup_default = RadioGroup;

export {
  RadioGroup_default
};
//# sourceMappingURL=chunk-IBWFNWV3.mjs.map