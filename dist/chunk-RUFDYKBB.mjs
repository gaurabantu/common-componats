/* ucs:component-css */
import "./styles/components/atoms/Rating/Rating.css";
// src/components/atoms/Rating/index.tsx
import React, { useId, useState } from "react";

// src/components/atoms/Rating/Rating.config.ts
var RATING_DEFAULTS = {
  max: 5,
  precision: 1,
  size: "md",
  label: "Rating"
};
function defaultRatingLabel(value) {
  return `${value} star${value === 1 ? "" : "s"}`;
}
function readOnlyRatingLabel(value, max) {
  return `${value} out of ${max} stars`;
}
function roundRating(value, precision, max) {
  if (!Number.isFinite(value))
    return 0;
  const rounded = Math.round(value / precision) * precision;
  return Math.min(Math.max(rounded, 0), max);
}
function iconFill(index, value) {
  const diff = value - (index - 1);
  if (diff >= 1)
    return "full";
  if (diff >= 0.5)
    return "half";
  return "empty";
}

// src/components/atoms/Rating/index.tsx
import { jsx, jsxs } from "react/jsx-runtime";
function cls(...parts) {
  return parts.filter(Boolean).join(" ");
}
var StarShape = /* @__PURE__ */ jsx("svg", { viewBox: "0 0 24 24", focusable: "false", className: "ds-rating__shape", children: /* @__PURE__ */ jsx(
  "path",
  {
    d: "M12 2.8l2.83 5.74 6.33.92-4.58 4.46 1.08 6.3L12 17.25l-5.66 2.97 1.08-6.3-4.58-4.46 6.33-.92L12 2.8z",
    strokeWidth: "1.5",
    strokeLinejoin: "round"
  }
) });
var Rating = React.forwardRef(function Rating2({
  value: valueProp,
  defaultValue,
  onChange,
  max = RATING_DEFAULTS.max,
  precision = RATING_DEFAULTS.precision,
  readOnly = false,
  disabled = false,
  size = RATING_DEFAULTS.size,
  icon,
  emptyIcon,
  name: nameProp,
  getLabelText = defaultRatingLabel,
  label,
  required = false,
  className,
  onMouseLeave,
  ...rest
}, ref) {
  var _a, _b, _c, _d;
  const autoName = `ds-rating-${useId().replace(/:/g, "")}`;
  const name = nameProp != null ? nameProp : autoName;
  const count = Math.max(1, Math.floor(max));
  const isControlled = valueProp !== void 0;
  const [inner, setInner] = useState(defaultValue != null ? defaultValue : 0);
  const value = isControlled ? valueProp != null ? valueProp : 0 : inner;
  const [hover, setHover] = useState(null);
  const shown = roundRating(readOnly || disabled ? value : hover != null ? hover : value, precision, count);
  const filledIcon = icon != null ? icon : StarShape;
  const outlineIcon = (_a = emptyIcon != null ? emptyIcon : icon) != null ? _a : StarShape;
  const renderIcon = (index) => {
    const fill = iconFill(index, shown);
    return /* @__PURE__ */ jsxs("span", { className: "ds-rating__icon", "data-fill": fill, "aria-hidden": "true", children: [
      /* @__PURE__ */ jsx("span", { className: "ds-rating__layer ds-rating__layer--empty", children: outlineIcon }),
      /* @__PURE__ */ jsx("span", { className: "ds-rating__layer ds-rating__layer--filled", children: filledIcon })
    ] });
  };
  const indices = Array.from({ length: count }, (_, i) => i + 1);
  const rootClass = cls("ds-rating", className);
  if (readOnly) {
    return /* @__PURE__ */ jsx(
      "div",
      {
        ...rest,
        ref,
        role: "img",
        "aria-label": (_b = rest["aria-label"]) != null ? _b : readOnlyRatingLabel(shown, count),
        className: rootClass,
        "data-size": size,
        "data-readonly": "true",
        onMouseLeave,
        children: indices.map((i) => /* @__PURE__ */ jsx("span", { className: "ds-rating__item", children: renderIcon(i) }, i))
      }
    );
  }
  const steps = (i) => precision === 0.5 ? [i - 0.5, i] : [i];
  const stepId = (step) => `${name}-${String(step).replace(".", "_")}`;
  const stepFromPointer = (e, i) => {
    if (precision !== 0.5)
      return i;
    const rect = e.currentTarget.getBoundingClientRect();
    if (!rect.width)
      return i;
    const rtl = typeof window !== "undefined" && window.getComputedStyle(e.currentTarget).direction === "rtl";
    const x = (e.clientX - rect.left) / rect.width;
    const startHalf = rtl ? x > 0.5 : x < 0.5;
    return startHalf ? i - 0.5 : i;
  };
  return /* @__PURE__ */ jsx(
    "div",
    {
      ...rest,
      ref,
      role: "radiogroup",
      "aria-label": rest["aria-labelledby"] ? rest["aria-label"] : (_d = (_c = rest["aria-label"]) != null ? _c : label) != null ? _d : RATING_DEFAULTS.label,
      "aria-disabled": disabled || void 0,
      "aria-required": required || void 0,
      className: rootClass,
      "data-size": size,
      "data-disabled": disabled ? "true" : void 0,
      onMouseLeave: (e) => {
        setHover(null);
        onMouseLeave == null ? void 0 : onMouseLeave(e);
      },
      children: indices.map((i) => /* @__PURE__ */ jsxs("span", { className: "ds-rating__item", "data-precision": precision, children: [
        renderIcon(i),
        steps(i).map((step) => /* @__PURE__ */ jsx(
          "input",
          {
            id: stepId(step),
            className: "ds-rating__input",
            type: "radio",
            name,
            value: step,
            checked: value === step,
            disabled,
            required,
            "aria-label": getLabelText(step),
            onChange: (e) => {
              if (!isControlled)
                setInner(step);
              onChange == null ? void 0 : onChange(step, e);
            }
          },
          step
        )),
        /* @__PURE__ */ jsx(
          "span",
          {
            className: "ds-rating__hit",
            "aria-hidden": "true",
            onPointerMove: (e) => {
              if (!disabled && e.pointerType !== "touch")
                setHover(stepFromPointer(e, i));
            },
            onMouseEnter: (e) => {
              if (!disabled)
                setHover(stepFromPointer(e, i));
            },
            onClick: (e) => {
              if (disabled)
                return;
              const input = document.getElementById(stepId(stepFromPointer(e, i)));
              if (!input)
                return;
              input.focus({ preventScroll: true });
              input.click();
            }
          }
        )
      ] }, i))
    }
  );
});
Rating.displayName = "Rating";
var Rating_default = Rating;

export {
  Rating,
  Rating_default
};
//# sourceMappingURL=chunk-RUFDYKBB.mjs.map