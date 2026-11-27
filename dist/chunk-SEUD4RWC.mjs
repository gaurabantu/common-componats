// src/components/charts/cartesian.tsx
import { jsx, jsxs } from "react/jsx-runtime";
var AXIS_FONT_SIZE = 11;
var APPROX_CHAR_W = 6.5;
var defaultNumberFormat = typeof Intl !== "undefined" ? new Intl.NumberFormat(void 0, { maximumFractionDigits: 2 }) : null;
function defaultFormatNumber(v) {
  if (!Number.isFinite(v))
    return "";
  return defaultNumberFormat ? defaultNumberFormat.format(v) : String(Math.round(v * 100) / 100);
}
function num(row, key) {
  const v = row == null ? void 0 : row[key];
  if (typeof v === "number")
    return Number.isFinite(v) ? v : 0;
  if (typeof v === "string" && v.trim() !== "") {
    const n = Number(v);
    return Number.isFinite(n) ? n : 0;
  }
  return 0;
}
function niceNum(range, round) {
  const exp = Math.floor(Math.log10(range));
  const f = range / 10 ** exp;
  let nf;
  if (round)
    nf = f < 1.5 ? 1 : f < 3 ? 2 : f < 7 ? 5 : 10;
  else
    nf = f <= 1 ? 1 : f <= 2 ? 2 : f <= 5 ? 5 : 10;
  return nf * 10 ** exp;
}
function niceTicks(min, max, count = 5) {
  let lo = Math.min(min, max);
  let hi = Math.max(min, max);
  if (lo === hi) {
    hi = lo === 0 ? 1 : lo + Math.abs(lo) * 0.5;
    if (lo > 0)
      lo = 0;
  }
  const n = Math.max(2, Math.round(count));
  const step = niceNum(niceNum(hi - lo, false) / (n - 1), true);
  const nLo = Math.floor(lo / step) * step;
  const nHi = Math.ceil(hi / step) * step;
  const ticks = [];
  const decimals = Math.max(0, -Math.floor(Math.log10(step)) + 1);
  for (let t = nLo; t <= nHi + step / 2; t += step) {
    ticks.push(Number(t.toFixed(decimals)));
  }
  return { domain: [nLo, nHi], ticks };
}
function resolveAxes(props, series) {
  var _a, _b, _c, _d;
  const hasRight = series.some((s) => s.yAxis === "right");
  const vf = props.valueFormatter;
  const leftTickFormat = (_a = props.yTickFormatter) != null ? _a : vf ? (v) => vf(v) : defaultFormatNumber;
  const rightTickFormat = (_b = props.rightYTickFormatter) != null ? _b : leftTickFormat;
  const showYAxis = (_c = props.showYAxis) != null ? _c : Boolean(vf) || Boolean(props.yTickFormatter) || hasRight;
  return {
    showYAxis,
    hasRight,
    leftTickFormat,
    rightTickFormat,
    labelFormat: (_d = props.labelFormatter) != null ? _d : props.tooltipLabelFormatter,
    valueFormatter: vf
  };
}
function tooltipLabel(row, index, xAxisKey, labelFormat) {
  const raw = row[xAxisKey];
  return labelFormat ? labelFormat(raw, row, index) : String(raw != null ? raw : "");
}
function tooltipValue(vf, value, dataKey) {
  return vf ? vf(value, dataKey) : void 0;
}
function xTickIndices(labels, interval, slotWidth, angle = 0) {
  const n = labels.length;
  if (n === 0)
    return [];
  let step = 1;
  if (interval === "auto") {
    const maxChars = labels.reduce((m, l) => Math.max(m, l.length), 0);
    const textW = maxChars * APPROX_CHAR_W;
    const rad = Math.abs(angle) * Math.PI / 180;
    const footprint = rad > 0.05 ? Math.min(textW, (AXIS_FONT_SIZE + 3) / Math.sin(rad)) : textW;
    step = Math.max(1, Math.ceil((footprint + 4) / Math.max(1, slotWidth)));
  } else if (typeof interval === "number" && interval > 0) {
    step = Math.floor(interval) + 1;
  }
  const out = [];
  for (let i = 0; i < n; i += step)
    out.push(i);
  return out;
}
function XAxisLabels({
  positions,
  labels,
  indices,
  y,
  angle = 0,
  color
}) {
  const rotated = Math.abs(angle) > 0.01;
  return /* @__PURE__ */ jsx(
    "g",
    {
      className: "ds-chart-x-axis",
      fill: color,
      fontSize: AXIS_FONT_SIZE,
      textAnchor: rotated ? angle < 0 ? "end" : "start" : "middle",
      children: indices.map((i) => {
        const x = positions[i];
        if (x === void 0)
          return null;
        if (!rotated) {
          return /* @__PURE__ */ jsx("text", { x, y, children: labels[i] }, i);
        }
        const ry = y - 6;
        return /* @__PURE__ */ jsx("text", { x, y: ry, dy: "0.71em", transform: `rotate(${angle} ${x} ${ry})`, children: labels[i] }, i);
      })
    }
  );
}
function YAxisLabels({
  ticks,
  scale,
  x,
  side,
  format,
  color
}) {
  return /* @__PURE__ */ jsx(
    "g",
    {
      className: `ds-chart-y-axis ds-chart-y-axis--${side}`,
      fill: color,
      fontSize: AXIS_FONT_SIZE,
      textAnchor: side === "left" ? "end" : "start",
      children: ticks.map((t) => /* @__PURE__ */ jsx("text", { x: side === "left" ? x - 6 : x + 6, y: scale(t), dominantBaseline: "middle", children: format(t) }, t))
    }
  );
}
function ChartLegend({
  items,
  position,
  textColor
}) {
  return /* @__PURE__ */ jsx(
    "div",
    {
      className: "ds-chart-legend",
      style: {
        display: "flex",
        flexWrap: "wrap",
        gap: 12,
        justifyContent: position === "left" ? "flex-start" : position === "right" ? "flex-end" : "center",
        marginTop: position === "top" ? 0 : 8,
        marginBottom: position === "bottom" ? 0 : 8,
        fontSize: 12
      },
      children: items.map((it) => /* @__PURE__ */ jsxs("div", { style: { display: "flex", alignItems: "center", gap: 6 }, children: [
        /* @__PURE__ */ jsx(
          "span",
          {
            "aria-hidden": true,
            style: {
              width: 12,
              height: it.shape === "line" ? 3 : 12,
              borderRadius: 2,
              background: it.color,
              opacity: it.shape === "band" ? 0.35 : 1
            }
          }
        ),
        /* @__PURE__ */ jsx("span", { style: { color: textColor }, children: it.label })
      ] }, it.key))
    }
  );
}
function buildValueAxis(extent, range, visible, tickCount = 5) {
  let domain = extent;
  let ticks = [];
  if (visible) {
    const nice = niceTicks(extent[0], extent[1], tickCount);
    domain = nice.domain;
    ticks = nice.ticks;
  }
  const [d0, d1] = domain;
  const span = d1 - d0 || 1;
  const k = (range[1] - range[0]) / span;
  return { domain, ticks, scale: (v) => range[0] + (v - d0) * k };
}
function seriesOnSide(series, side) {
  return series.filter((s) => {
    var _a;
    return ((_a = s.yAxis) != null ? _a : "left") === side;
  });
}

export {
  defaultFormatNumber,
  num,
  niceTicks,
  resolveAxes,
  tooltipLabel,
  tooltipValue,
  xTickIndices,
  XAxisLabels,
  YAxisLabels,
  ChartLegend,
  buildValueAxis,
  seriesOnSide
};
//# sourceMappingURL=chunk-SEUD4RWC.mjs.map