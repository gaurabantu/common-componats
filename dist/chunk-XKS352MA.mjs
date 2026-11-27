/* ucs:component-css */
import "./styles/components/molecules/StatCard/StatCard.css";
import {
  IconBox_default
} from "./chunk-AGZHGVMA.mjs";
import {
  Card_default
} from "./chunk-KTZ2QCMF.mjs";

// src/components/molecules/StatCard/index.tsx
import React from "react";

// src/components/molecules/StatCard/StatCard.config.ts
var STAT_TREND_LABEL = {
  up: "Increased",
  down: "Decreased",
  neutral: "No change"
};
var STAT_CARD_DEFAULTS = {
  iconTone: "neutral"
};

// src/components/molecules/StatCard/index.tsx
import { jsx, jsxs } from "react/jsx-runtime";
function TrendArrow({ trend }) {
  if (trend === "neutral") {
    return /* @__PURE__ */ jsx("svg", { viewBox: "0 0 12 12", "aria-hidden": true, focusable: "false", children: /* @__PURE__ */ jsx("path", { d: "M2 6h8", stroke: "currentColor", strokeWidth: "1.5", strokeLinecap: "round" }) });
  }
  return /* @__PURE__ */ jsx("svg", { viewBox: "0 0 12 12", "aria-hidden": true, focusable: "false", children: /* @__PURE__ */ jsx(
    "path",
    {
      d: trend === "up" ? "M6 10V2M2.5 5.5 6 2l3.5 3.5" : "M6 2v8M2.5 6.5 6 10l3.5-3.5",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: "1.5",
      strokeLinecap: "round",
      strokeLinejoin: "round"
    }
  ) });
}
var StatCard = React.forwardRef(function StatCard2({
  label,
  value,
  unit,
  icon,
  iconTone = STAT_CARD_DEFAULTS.iconTone,
  delta,
  description,
  footer,
  size = "default",
  ...cardProps
}, ref) {
  var _a;
  const trend = (_a = delta == null ? void 0 : delta.trend) != null ? _a : "neutral";
  const deltaTone = trend === "neutral" ? "neutral" : trend === "up" !== Boolean(delta == null ? void 0 : delta.invert) ? "success" : "danger";
  return /* @__PURE__ */ jsx(Card_default, { ref, size, ...cardProps, children: /* @__PURE__ */ jsxs("div", { className: "ds-stat", "data-size": size, children: [
    /* @__PURE__ */ jsxs("div", { className: "ds-stat__top", children: [
      /* @__PURE__ */ jsx("p", { className: "ds-stat__label", children: label }),
      icon ? /* @__PURE__ */ jsx(IconBox_default, { tone: iconTone, size: size === "sm" ? "sm" : "md", children: icon }) : null
    ] }),
    /* @__PURE__ */ jsxs("p", { className: "ds-stat__value", children: [
      value,
      unit ? /* @__PURE__ */ jsx("span", { className: "ds-stat__unit", children: unit }) : null
    ] }),
    delta ? /* @__PURE__ */ jsxs("span", { className: "ds-stat__delta", children: [
      /* @__PURE__ */ jsxs("span", { className: "ds-stat__delta-value", "data-tone": deltaTone, children: [
        /* @__PURE__ */ jsx(TrendArrow, { trend }),
        /* @__PURE__ */ jsxs("span", { className: "ds-stat__sr", children: [
          STAT_TREND_LABEL[trend],
          " "
        ] }),
        delta.value
      ] }),
      delta.label ? /* @__PURE__ */ jsx("span", { children: delta.label }) : null
    ] }) : null,
    description ? /* @__PURE__ */ jsx("p", { className: "ds-stat__description", children: description }) : null,
    footer ? /* @__PURE__ */ jsx("div", { className: "ds-stat__footer", children: footer }) : null
  ] }) });
});
StatCard.displayName = "StatCard";
var StatCard_default = StatCard;

export {
  StatCard_default
};
//# sourceMappingURL=chunk-XKS352MA.mjs.map