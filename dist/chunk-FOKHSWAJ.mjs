/* ucs:component-css */
import "./styles/components/atoms/Slider/Slider.css";
// src/components/atoms/Slider/index.tsx
import { useId, useRef, useState } from "react";
import { Fragment, jsx, jsxs } from "react/jsx-runtime";
function cls(...parts) {
  return parts.filter(Boolean).join(" ");
}
function clamp(v, lo, hi) {
  return Math.min(hi, Math.max(lo, v));
}
function Slider(props) {
  var _a;
  const {
    min = 0,
    max = 100,
    step = 1,
    disabled = false,
    label,
    ariaLabel,
    "aria-labelledby": ariaLabelledBy,
    showValue = false,
    valueFormatter,
    showMinMax = false,
    size = "md",
    id: idProp,
    name,
    className
  } = props;
  const reactId = useId().replace(/:/g, "");
  const baseId = idProp != null ? idProp : `slider-${reactId}`;
  const labelId = `${baseId}-label`;
  const fmt = (v) => valueFormatter ? valueFormatter(v) : String(v);
  const span = max - min || 1;
  const pct = (v) => (clamp(v, min, max) - min) / span * 100;
  const isRange = props.range === true;
  const [internal, setInternal] = useState(() => {
    var _a2, _b;
    if (isRange) {
      const d = (_a2 = props.defaultValue) != null ? _a2 : [min, max];
      return [clamp(d[0], min, max), clamp(d[1], min, max)];
    }
    return clamp((_b = props.defaultValue) != null ? _b : min, min, max);
  });
  const current = props.value !== void 0 ? props.value : internal;
  const latest = useRef(current);
  latest.current = current;
  const emit = (next) => {
    var _a2, _b, _c, _d;
    if (props.value === void 0)
      setInternal(next);
    latest.current = next;
    if (isRange) {
      const p = props;
      (_a2 = p.onValueChange) == null ? void 0 : _a2.call(p, next);
      (_b = p.onChange) == null ? void 0 : _b.call(p, next);
    } else {
      const p = props;
      (_c = p.onValueChange) == null ? void 0 : _c.call(p, next);
      (_d = p.onChange) == null ? void 0 : _d.call(p, next);
    }
  };
  const commit = () => {
    var _a2, _b;
    if (isRange)
      (_a2 = props.onValueCommit) == null ? void 0 : _a2.call(props, latest.current);
    else
      (_b = props.onValueCommit) == null ? void 0 : _b.call(props, latest.current);
  };
  const commitHandlers = {
    onPointerUp: commit,
    onKeyUp: (e) => {
      if (["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown", "PageUp", "PageDown", "Home", "End"].includes(e.key))
        commit();
    }
  };
  const hasLabel = label != null && label !== false;
  let control;
  let valueText;
  if (isRange) {
    const [lo, hi] = current;
    const thumbLabels = (_a = props.thumbLabels) != null ? _a : ["Minimum", "Maximum"];
    valueText = `${fmt(lo)} \u2013 ${fmt(hi)}`;
    const useLabelledBy = hasLabel || !ariaLabel && Boolean(ariaLabelledBy);
    const groupLabelId = hasLabel ? labelId : ariaLabelledBy;
    const thumbName = (i) => ariaLabel ? `${ariaLabel} ${thumbLabels[i].toLowerCase()}` : thumbLabels[i];
    const common = {
      type: "range",
      min,
      max,
      step,
      disabled,
      name,
      className: "ucs-slider__input",
      ...commitHandlers
    };
    control = /* @__PURE__ */ jsxs(Fragment, { children: [
      /* @__PURE__ */ jsx("div", { className: "ucs-slider__track", "aria-hidden": "true", children: /* @__PURE__ */ jsx("div", { className: "ucs-slider__fill", style: { left: `${pct(lo)}%`, width: `${Math.max(0, pct(hi) - pct(lo))}%` } }) }),
      /* @__PURE__ */ jsx(
        "input",
        {
          ...common,
          id: `${baseId}-low`,
          value: lo,
          "aria-label": useLabelledBy ? void 0 : thumbName(0),
          "aria-labelledby": useLabelledBy ? `${groupLabelId} ${baseId}-low-name` : void 0,
          "aria-valuetext": fmt(lo),
          style: { zIndex: lo >= max - step / 2 ? 3 : 2 },
          onChange: (e) => emit([Math.min(Number(e.target.value), hi), hi])
        }
      ),
      /* @__PURE__ */ jsx(
        "input",
        {
          ...common,
          id: `${baseId}-high`,
          value: hi,
          "aria-label": useLabelledBy ? void 0 : thumbName(1),
          "aria-labelledby": useLabelledBy ? `${groupLabelId} ${baseId}-high-name` : void 0,
          "aria-valuetext": fmt(hi),
          style: { zIndex: 2 },
          onChange: (e) => emit([lo, Math.max(Number(e.target.value), lo)])
        }
      ),
      useLabelledBy && /* @__PURE__ */ jsxs(Fragment, { children: [
        /* @__PURE__ */ jsx("span", { id: `${baseId}-low-name`, hidden: true, children: thumbLabels[0] }),
        /* @__PURE__ */ jsx("span", { id: `${baseId}-high-name`, hidden: true, children: thumbLabels[1] })
      ] })
    ] });
  } else {
    const v = current;
    valueText = fmt(v);
    control = /* @__PURE__ */ jsxs(Fragment, { children: [
      /* @__PURE__ */ jsx("div", { className: "ucs-slider__track", "aria-hidden": "true", children: /* @__PURE__ */ jsx("div", { className: "ucs-slider__fill", style: { left: 0, width: `${pct(v)}%` } }) }),
      /* @__PURE__ */ jsx(
        "input",
        {
          type: "range",
          id: baseId,
          className: "ucs-slider__input",
          min,
          max,
          step,
          value: v,
          name,
          disabled,
          "aria-label": hasLabel ? void 0 : ariaLabel != null ? ariaLabel : ariaLabelledBy ? void 0 : "Value",
          "aria-labelledby": hasLabel || ariaLabel ? void 0 : ariaLabelledBy,
          "aria-valuetext": valueFormatter ? fmt(v) : void 0,
          onChange: (e) => emit(Number(e.target.value)),
          ...commitHandlers
        }
      )
    ] });
  }
  return /* @__PURE__ */ jsxs(
    "div",
    {
      className: cls(
        "ucs-slider",
        `ucs-slider--${size}`,
        isRange && "ucs-slider--range",
        disabled && "ucs-slider--disabled",
        className
      ),
      role: isRange ? "group" : void 0,
      "aria-labelledby": isRange && hasLabel ? labelId : void 0,
      "aria-label": isRange && !hasLabel ? ariaLabel : void 0,
      children: [
        (hasLabel || showValue) && /* @__PURE__ */ jsxs("div", { className: "ucs-slider__header", children: [
          hasLabel ? isRange ? /* @__PURE__ */ jsx("span", { id: labelId, children: label }) : /* @__PURE__ */ jsx("label", { id: labelId, htmlFor: baseId, children: label }) : /* @__PURE__ */ jsx("span", {}),
          showValue && /* @__PURE__ */ jsx("output", { className: "ucs-slider__value", htmlFor: isRange ? `${baseId}-low ${baseId}-high` : baseId, "aria-live": "off", children: valueText })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "ucs-slider__control", children: control }),
        showMinMax && /* @__PURE__ */ jsxs("div", { className: "ucs-slider__minmax", "aria-hidden": "true", children: [
          /* @__PURE__ */ jsx("span", { children: fmt(min) }),
          /* @__PURE__ */ jsx("span", { children: fmt(max) })
        ] })
      ]
    }
  );
}
Slider.displayName = "Slider";
var Slider_default = Slider;

export {
  Slider_default
};
//# sourceMappingURL=chunk-FOKHSWAJ.mjs.map