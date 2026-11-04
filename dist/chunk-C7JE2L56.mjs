// src/components/charts/Chart.types.ts
var CHART_THEME_COLORS = {
  light: {
    tooltipBg: "var(--color-bg-surface)",
    tooltipBorder: "var(--color-border-default)",
    tooltipText: "var(--color-text-primary)",
    legendText: "var(--color-text-secondary)",
    axisText: "var(--color-text-secondary)",
    gridColor: "var(--color-border-default)"
  },
  dark: {
    tooltipBg: "var(--color-bg-surface)",
    tooltipBorder: "var(--color-border-default)",
    tooltipText: "var(--color-text-primary)",
    legendText: "var(--color-text-secondary)",
    axisText: "var(--color-text-secondary)",
    gridColor: "var(--color-border-subtle)"
  }
};
var CHART_COLORS = [
  "var(--button-primary-default-bg)",
  "var(--color-state-success)",
  "var(--color-state-warning)",
  "var(--color-state-error)",
  "var(--color-accent-lavender-40)",
  "var(--color-accent-sky-10)",
  "var(--color-accent-mint-10)",
  "var(--color-accent-amber-10)"
];

// src/components/charts/ChartTooltip.tsx
import React, { useLayoutEffect, useRef, useState } from "react";
import { jsx, jsxs } from "react/jsx-runtime";
function cls(...parts) {
  return parts.filter(Boolean).join(" ");
}
var ChartTooltip = React.memo(function ChartTooltip2({
  theme,
  open,
  pointerX,
  pointerY,
  containerWidth,
  containerHeight,
  label,
  items,
  animation = true,
  followPointer = true
}) {
  const themeColors = CHART_THEME_COLORS[theme];
  const ref = useRef(null);
  const [pos, setPos] = useState({ left: 0, top: 0 });
  const [enter, setEnter] = useState(false);
  useLayoutEffect(() => {
    if (!open || !ref.current)
      return;
    const el = ref.current;
    const tw = el.offsetWidth;
    const th = el.offsetHeight;
    const pad = 8;
    const gap = 12;
    let left = pointerX + gap;
    let top = pointerY + gap;
    if (followPointer) {
      if (left + tw > containerWidth - pad) {
        left = pointerX - tw - gap;
      }
      if (top + th > containerHeight - pad) {
        top = pointerY - th - gap;
      }
      if (left < pad)
        left = pad;
      if (top < pad)
        top = pad;
    }
    left = Math.max(pad, Math.min(left, Math.max(pad, containerWidth - tw - pad)));
    top = Math.max(pad, Math.min(top, Math.max(pad, containerHeight - th - pad)));
    setPos({ left, top });
  }, [
    open,
    pointerX,
    pointerY,
    containerWidth,
    containerHeight,
    followPointer,
    label,
    items.length
  ]);
  React.useEffect(() => {
    if (!open) {
      setEnter(false);
      return;
    }
    setEnter(false);
    const id = requestAnimationFrame(() => setEnter(true));
    return () => cancelAnimationFrame(id);
  }, [open]);
  if (!open)
    return null;
  return /* @__PURE__ */ jsxs(
    "div",
    {
      ref,
      role: "tooltip",
      "data-chart-theme": theme,
      className: cls(
        "ds-chart-tooltip",
        animation && "ds-chart-tooltip--motion",
        animation && enter && "ds-chart-tooltip--enter"
      ),
      style: {
        left: pos.left,
        top: pos.top,
        background: themeColors.tooltipBg,
        border: `1px solid ${themeColors.tooltipBorder}`,
        color: themeColors.tooltipText
      },
      children: [
        /* @__PURE__ */ jsx(
          "div",
          {
            className: "ds-chart-tooltip__label",
            style: {
              borderBottomWidth: 1,
              borderBottomStyle: "solid",
              borderBottomColor: themeColors.tooltipBorder
            },
            children: label
          }
        ),
        /* @__PURE__ */ jsx("div", { className: "ds-chart-tooltip__rows", children: items.map((item, i) => {
          var _a;
          return /* @__PURE__ */ jsxs("div", { className: "ds-chart-tooltip__row", children: [
            /* @__PURE__ */ jsx("span", { className: "ds-chart-tooltip__dot", style: { background: item.color }, "aria-hidden": true }),
            /* @__PURE__ */ jsx("span", { className: "ds-chart-tooltip__name", style: { color: themeColors.legendText }, children: item.name }),
            /* @__PURE__ */ jsx("span", { className: "ds-chart-tooltip__value", children: (_a = item.displayValue) != null ? _a : item.value })
          ] }, `${item.name}-${i}`);
        }) })
      ]
    }
  );
});

// src/components/charts/LineChart.tsx
import React3, { useCallback, useMemo, useState as useState4 } from "react";

// src/components/charts/chartPrimitives.tsx
import { useLayoutEffect as useLayoutEffect2, useRef as useRef2, useState as useState2 } from "react";
import { jsx as jsx2 } from "react/jsx-runtime";
function AnimatedLineStroke({
  pathD,
  progress,
  color,
  strokeWidth
}) {
  const ref = useRef2(null);
  const [length, setLength] = useState2(0);
  useLayoutEffect2(() => {
    const el = ref.current;
    if (!el || !pathD) {
      setLength(0);
      return;
    }
    try {
      setLength(el.getTotalLength());
    } catch (e) {
      setLength(0);
    }
  }, [pathD]);
  const len = length || 1;
  const offset = len * (1 - progress);
  return /* @__PURE__ */ jsx2(
    "path",
    {
      ref,
      d: pathD,
      fill: "none",
      stroke: color,
      strokeWidth,
      strokeLinecap: "round",
      strokeLinejoin: "round",
      strokeDasharray: len,
      strokeDashoffset: offset
    }
  );
}

// src/components/charts/useChartAnimation.ts
import { useEffect, useState as useState3 } from "react";
var DEFAULT_MS_LINE = 800;
var DEFAULT_MS_BAR = 650;
var DEFAULT_MS_PIE = 750;
function resolveChartAnimation(option, kind) {
  var _a, _b;
  const base = kind === "bar" ? DEFAULT_MS_BAR : kind === "pie" ? DEFAULT_MS_PIE : DEFAULT_MS_LINE;
  if (option === false) {
    return { enabled: false, durationMs: base, easing: "ease-out", barStagger: false };
  }
  if (option === true || option === void 0) {
    return { enabled: true, durationMs: base, easing: "ease-out", barStagger: false };
  }
  const obj = option;
  return {
    enabled: obj.enabled !== false,
    durationMs: (_a = obj.durationMs) != null ? _a : base,
    easing: (_b = obj.easing) != null ? _b : "ease-out",
    barStagger: obj.barStagger === true
  };
}
function chartEase(t, preset) {
  const x = Math.min(1, Math.max(0, t));
  switch (preset) {
    case "linear":
      return x;
    case "ease-in":
      return x * x * x;
    case "ease-out":
      return 1 - (1 - x) ** 3;
    case "ease-in-out":
      return x < 0.5 ? 4 * x * x * x : 1 - (-2 * x + 2) ** 3 / 2;
    case "default":
    default:
      return 1 - (1 - x) ** 3;
  }
}
function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState3(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const fn = () => setReduced(mq.matches);
    mq.addEventListener("change", fn);
    return () => mq.removeEventListener("change", fn);
  }, []);
  return reduced;
}
function useChartAnimationProgress(enabled, durationMs, easing, resetKey) {
  const reduced = usePrefersReducedMotion();
  const [progress, setProgress] = useState3(() => !enabled || reduced ? 1 : 0);
  useEffect(() => {
    if (!enabled || reduced) {
      setProgress(1);
      return;
    }
    setProgress(0);
    const start = performance.now();
    let raf = 0;
    const tick = (now) => {
      const t = Math.min(1, (now - start) / Math.max(16, durationMs));
      setProgress(chartEase(t, easing));
      if (t < 1)
        raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [enabled, reduced, durationMs, easing, resetKey]);
  return reduced ? 1 : progress;
}
function barProgressForIndex(global, index, total, stagger) {
  if (!stagger || total <= 1)
    return global;
  const w = 0.55;
  const start = total > 1 ? index / (total - 1) * w : 0;
  if (global <= start)
    return 0;
  return Math.min(1, (global - start) / (1 - start));
}

// src/components/charts/utils.ts
function getValueExtent(data, series, stacked = false) {
  let min = Infinity;
  let max = -Infinity;
  if (stacked) {
    min = 0;
    for (const row of data) {
      let sum = 0;
      for (const s of series) {
        const v = row[s.dataKey];
        sum += typeof v === "number" ? v : 0;
      }
      if (sum > max)
        max = sum;
    }
  } else {
    for (const row of data) {
      for (const s of series) {
        const v = row[s.dataKey];
        if (typeof v === "number") {
          const n = v;
          if (n < min)
            min = n;
          if (n > max)
            max = n;
        }
      }
    }
  }
  if (min === Infinity)
    min = 0;
  if (max === -Infinity)
    max = 100;
  if (min === max)
    max = min + 1;
  return [min, max];
}
function linePath(points, curve) {
  if (points.length === 0)
    return "";
  if (points.length === 1)
    return `M ${points[0].x} ${points[0].y}`;
  if (curve === "linear") {
    return points.map((p, i) => i === 0 ? `M ${p.x} ${p.y}` : `L ${p.x} ${p.y}`).join(" ");
  }
  if (curve === "step" || curve === "stepBefore" || curve === "stepAfter") {
    const parts = [`M ${points[0].x} ${points[0].y}`];
    for (let i = 1; i < points.length; i++) {
      const prev = points[i - 1];
      const curr = points[i];
      if (curve === "step") {
        const midX = (prev.x + curr.x) / 2;
        parts.push(`L ${midX} ${prev.y}`);
        parts.push(`L ${midX} ${curr.y}`);
        parts.push(`L ${curr.x} ${curr.y}`);
      } else if (curve === "stepBefore") {
        parts.push(`L ${curr.x} ${prev.y}`);
        parts.push(`L ${curr.x} ${curr.y}`);
      } else {
        parts.push(`L ${prev.x} ${curr.y}`);
        parts.push(`L ${curr.x} ${curr.y}`);
      }
    }
    return parts.join(" ");
  }
  const d = [`M ${points[0].x} ${points[0].y}`];
  for (let i = 1; i < points.length; i++) {
    const p0 = points[Math.max(0, i - 2)];
    const p1 = points[i - 1];
    const p2 = points[i];
    const p3 = points[Math.min(points.length - 1, i + 1)];
    const cp1x = p1.x + (p2.x - p0.x) / 6;
    const cp1y = p1.y + (p2.y - p0.y) / 6;
    const cp2x = p2.x - (p3.x - p1.x) / 6;
    const cp2y = p2.y - (p3.y - p1.y) / 6;
    d.push(`C ${cp1x} ${cp1y} ${cp2x} ${cp2y} ${p2.x} ${p2.y}`);
  }
  return d.join(" ");
}
function areaPath(points, baseY, curve) {
  if (points.length === 0)
    return "";
  const line = linePath(points, curve);
  const close = `L ${points[points.length - 1].x} ${baseY} L ${points[0].x} ${baseY} Z`;
  return line + " " + close;
}
function degToRad(deg) {
  return deg * Math.PI / 180;
}
function polarToCartesian(cx, cy, r, angleDeg) {
  const rad = degToRad(angleDeg - 90);
  return { x: cx + r * Math.cos(rad), y: cy + r * Math.sin(rad) };
}
function arcPath(cx, cy, r, startAngleDeg, endAngleDeg, innerRadius = 0) {
  const span = endAngleDeg - startAngleDeg;
  if (span <= 0)
    return "";
  const start = polarToCartesian(cx, cy, r, startAngleDeg);
  const end = polarToCartesian(cx, cy, r, endAngleDeg);
  const largeArc = span >= 180 ? 1 : 0;
  const sweep = 1;
  if (innerRadius <= 0) {
    return `M ${cx} ${cy} L ${start.x} ${start.y} A ${r} ${r} 0 ${largeArc} ${sweep} ${end.x} ${end.y} Z`;
  }
  const innerStart = polarToCartesian(cx, cy, innerRadius, startAngleDeg);
  const innerEnd = polarToCartesian(cx, cy, innerRadius, endAngleDeg);
  const innerLargeArc = span >= 180 ? 1 : 0;
  return `M ${innerStart.x} ${innerStart.y} L ${start.x} ${start.y} A ${r} ${r} 0 ${largeArc} ${sweep} ${end.x} ${end.y} L ${innerEnd.x} ${innerEnd.y} A ${innerRadius} ${innerRadius} 0 ${innerLargeArc} 0 ${innerStart.x} ${innerStart.y} Z`;
}

// src/components/charts/cartesian.tsx
import { jsx as jsx3, jsxs as jsxs2 } from "react/jsx-runtime";
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
  return /* @__PURE__ */ jsx3(
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
          return /* @__PURE__ */ jsx3("text", { x, y, children: labels[i] }, i);
        }
        const ry = y - 6;
        return /* @__PURE__ */ jsx3("text", { x, y: ry, dy: "0.71em", transform: `rotate(${angle} ${x} ${ry})`, children: labels[i] }, i);
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
  return /* @__PURE__ */ jsx3(
    "g",
    {
      className: `ds-chart-y-axis ds-chart-y-axis--${side}`,
      fill: color,
      fontSize: AXIS_FONT_SIZE,
      textAnchor: side === "left" ? "end" : "start",
      children: ticks.map((t) => /* @__PURE__ */ jsx3("text", { x: side === "left" ? x - 6 : x + 6, y: scale(t), dominantBaseline: "middle", children: format(t) }, t))
    }
  );
}
function ChartLegend({
  items,
  position,
  textColor
}) {
  return /* @__PURE__ */ jsx3(
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
      children: items.map((it) => /* @__PURE__ */ jsxs2("div", { style: { display: "flex", alignItems: "center", gap: 6 }, children: [
        /* @__PURE__ */ jsx3(
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
        /* @__PURE__ */ jsx3("span", { style: { color: textColor }, children: it.label })
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

// src/components/charts/LineChart.tsx
import { jsx as jsx4, jsxs as jsxs3 } from "react/jsx-runtime";
var DEFAULT_COLORS = [
  "var(--button-primary-default-bg)",
  "var(--color-state-success)",
  "var(--color-state-warning)",
  "var(--color-state-error)",
  "var(--color-accent-lavender-40)"
];
var LineChartComponent = (props) => {
  var _a, _b, _c, _d;
  const {
    data,
    xAxisKey = "name",
    series,
    colors = DEFAULT_COLORS,
    curve = "monotone",
    dotSize = 4,
    showDots = true,
    strokeWidth = 2,
    width = "100%",
    height = 300,
    margin,
    showGrid = true,
    gridColor,
    showTooltip = true,
    showLegend = true,
    legendPosition = "bottom",
    theme = "light",
    tooltipFollowPointer = true,
    tooltipAnimation = true,
    showCrosshair = true,
    chartAnimation = true,
    className = "",
    style = {},
    xTickAngle = 0,
    xTickInterval = 0,
    yTickCount = 5,
    xTickFormatter
  } = props;
  const axes = resolveAxes(props, series);
  const animCfg = resolveChartAnimation(chartAnimation, "line");
  const animKey = useMemo(
    () => `${data.length}-${series.map((s) => s.dataKey).join(",")}-${xAxisKey}-${curve}`,
    [data.length, series, xAxisKey, curve]
  );
  const animProgress = useChartAnimationProgress(animCfg.enabled, animCfg.durationMs, animCfg.easing, animKey);
  const themeColors = CHART_THEME_COLORS[theme];
  const gridStroke = gridColor != null ? gridColor : themeColors.gridColor;
  const [tooltip, setTooltip] = useState4(null);
  const w = typeof width === "number" ? width : 400;
  const h = typeof height === "number" ? height : 300;
  const m = {
    top: (_a = margin == null ? void 0 : margin.top) != null ? _a : 10,
    right: (_b = margin == null ? void 0 : margin.right) != null ? _b : axes.hasRight && axes.showYAxis ? 48 : 20,
    bottom: (_c = margin == null ? void 0 : margin.bottom) != null ? _c : 30,
    left: (_d = margin == null ? void 0 : margin.left) != null ? _d : 40
  };
  const innerW = w - m.left - m.right;
  const innerH = h - m.top - m.bottom;
  const colorOf = (s, i) => {
    var _a2;
    return (_a2 = s.color) != null ? _a2 : colors[i % colors.length];
  };
  const xLabels = useMemo(
    () => data.map((d, i) => {
      var _a2;
      return xTickFormatter ? xTickFormatter(d[xAxisKey], i) : String((_a2 = d[xAxisKey]) != null ? _a2 : "");
    }),
    [data, xAxisKey, xTickFormatter]
  );
  const leftSeries = axes.hasRight ? seriesOnSide(series, "left") : series;
  const rightSeries = axes.hasRight ? seriesOnSide(series, "right") : [];
  const leftAxis = buildValueAxis(getValueExtent(data, leftSeries), [innerH, 0], axes.showYAxis, yTickCount);
  const rightAxis = axes.hasRight ? buildValueAxis(getValueExtent(data, rightSeries), [innerH, 0], axes.showYAxis, yTickCount) : leftAxis;
  const yScaleFor = (s) => s.yAxis === "right" && axes.hasRight ? rightAxis.scale : leftAxis.scale;
  const xScale = (i) => i / Math.max(1, data.length - 1) * innerW;
  const xPositions = data.map((_, i) => m.left + xScale(i));
  const paths = series.map((s, si) => {
    var _a2;
    const ys = yScaleFor(s);
    const points = data.map((d, i) => ({ x: m.left + xScale(i), y: m.top + ys(num(d, s.dataKey)) }));
    return {
      key: s.dataKey,
      path: linePath(points, curve),
      points,
      color: colorOf(s, si),
      width: (_a2 = s.strokeWidth) != null ? _a2 : strokeWidth,
      dash: s.strokeDasharray
    };
  });
  const { valueFormatter, labelFormat } = axes;
  const handleMouseMove = useCallback(
    (e) => {
      if (!showTooltip || data.length === 0)
        return;
      const rect = e.currentTarget.getBoundingClientRect();
      const scaleX = rect.width > 0 ? w / rect.width : 1;
      const x = (e.clientX - rect.left) * scaleX - m.left;
      const idx = Math.round(x / innerW * (data.length - 1));
      const clamped = Math.max(0, Math.min(idx, data.length - 1));
      const row = data[clamped];
      const items = series.map((s, i) => {
        var _a2, _b2;
        const v = num(row, s.dataKey);
        return {
          name: (_a2 = s.name) != null ? _a2 : s.dataKey,
          value: v,
          color: (_b2 = s.color) != null ? _b2 : colors[i % colors.length],
          displayValue: tooltipValue(valueFormatter, v, s.dataKey)
        };
      });
      setTooltip({
        pointerX: e.clientX - rect.left,
        pointerY: e.clientY - rect.top,
        cw: rect.width,
        ch: rect.height,
        label: tooltipLabel(row, clamped, xAxisKey, labelFormat),
        items,
        activeIndex: clamped
      });
    },
    [showTooltip, data, series, xAxisKey, colors, innerW, m.left, w, valueFormatter, labelFormat]
  );
  const handleMouseLeave = useCallback(() => setTooltip(null), []);
  const gridYs = axes.showYAxis ? leftAxis.ticks.map((t) => leftAxis.scale(t)) : [0.25, 0.5, 0.75].map((t) => innerH * t);
  const tickIdx = xTickIndices(xLabels, xTickInterval, innerW / Math.max(1, data.length - 1), xTickAngle);
  return /* @__PURE__ */ jsxs3(
    "div",
    {
      className,
      style: {
        width: typeof width === "string" ? width : w,
        height: typeof height === "string" ? height : h,
        position: "relative",
        ...style
      },
      children: [
        /* @__PURE__ */ jsxs3(
          "svg",
          {
            width: "100%",
            height: "100%",
            viewBox: `0 0 ${w} ${h}`,
            preserveAspectRatio: "xMidYMid meet",
            onMouseMove: handleMouseMove,
            onMouseLeave: handleMouseLeave,
            children: [
              showGrid && /* @__PURE__ */ jsxs3("g", { stroke: gridStroke, strokeDasharray: "3 3", strokeOpacity: 0.6, children: [
                gridYs.map((gy) => /* @__PURE__ */ jsx4("line", { x1: m.left, y1: m.top + gy, x2: m.left + innerW, y2: m.top + gy }, gy)),
                xLabels.slice(0, 6).map((_, i) => {
                  const idx = Math.floor(i / 5 * (data.length - 1));
                  return /* @__PURE__ */ jsx4("line", { x1: m.left + xScale(idx), y1: m.top, x2: m.left + xScale(idx), y2: m.top + innerH }, i);
                })
              ] }),
              paths.map(({ key, path: pathD, points, color, width: sw, dash }) => /* @__PURE__ */ jsxs3("g", { children: [
                dash ? /* @__PURE__ */ jsx4(
                  "path",
                  {
                    d: pathD,
                    fill: "none",
                    stroke: color,
                    strokeWidth: sw,
                    strokeDasharray: dash,
                    strokeLinecap: "round",
                    strokeLinejoin: "round",
                    opacity: animProgress
                  }
                ) : /* @__PURE__ */ jsx4(AnimatedLineStroke, { pathD, progress: animProgress, color, strokeWidth: sw }),
                showDots && points.map((p, i) => /* @__PURE__ */ jsx4(
                  "circle",
                  {
                    cx: p.x,
                    cy: p.y,
                    r: dotSize,
                    fill: color,
                    stroke: themeColors.tooltipBg,
                    strokeWidth: 1,
                    opacity: Math.min(1, animProgress * 2.5)
                  },
                  i
                ))
              ] }, key)),
              showTooltip && showCrosshair && tooltip !== null && data.length > 0 && /* @__PURE__ */ jsxs3("g", { className: "ds-chart-crosshair", pointerEvents: "none", children: [
                /* @__PURE__ */ jsx4(
                  "line",
                  {
                    x1: m.left + xScale(tooltip.activeIndex),
                    y1: m.top,
                    x2: m.left + xScale(tooltip.activeIndex),
                    y2: m.top + innerH,
                    stroke: themeColors.gridColor,
                    strokeWidth: 1,
                    strokeDasharray: "4 6",
                    opacity: 0.85
                  }
                ),
                series.map((s, si) => {
                  const row = data[tooltip.activeIndex];
                  const cx = m.left + xScale(tooltip.activeIndex);
                  const cy = m.top + yScaleFor(s)(num(row, s.dataKey));
                  return /* @__PURE__ */ jsx4(
                    "circle",
                    {
                      cx,
                      cy,
                      r: dotSize + 3,
                      fill: colorOf(s, si),
                      stroke: themeColors.tooltipBg,
                      strokeWidth: 2,
                      opacity: 0.95
                    },
                    `hit-${s.dataKey}`
                  );
                })
              ] }),
              axes.showYAxis && /* @__PURE__ */ jsx4(
                YAxisLabels,
                {
                  ticks: leftAxis.ticks,
                  scale: (v) => m.top + leftAxis.scale(v),
                  x: m.left,
                  side: "left",
                  format: axes.leftTickFormat,
                  color: themeColors.axisText
                }
              ),
              axes.showYAxis && axes.hasRight && /* @__PURE__ */ jsx4(
                YAxisLabels,
                {
                  ticks: rightAxis.ticks,
                  scale: (v) => m.top + rightAxis.scale(v),
                  x: m.left + innerW,
                  side: "right",
                  format: axes.rightTickFormat,
                  color: themeColors.axisText
                }
              ),
              /* @__PURE__ */ jsx4(
                XAxisLabels,
                {
                  positions: xPositions,
                  labels: xLabels,
                  indices: tickIdx,
                  y: m.top + innerH + 16,
                  angle: xTickAngle,
                  color: themeColors.axisText
                }
              )
            ]
          }
        ),
        showTooltip && tooltip && /* @__PURE__ */ jsx4(
          ChartTooltip,
          {
            theme,
            open: true,
            pointerX: tooltip.pointerX,
            pointerY: tooltip.pointerY,
            containerWidth: tooltip.cw,
            containerHeight: tooltip.ch,
            label: tooltip.label,
            items: tooltip.items,
            animation: tooltipAnimation,
            followPointer: tooltipFollowPointer
          }
        ),
        showLegend && /* @__PURE__ */ jsx4(
          ChartLegend,
          {
            position: legendPosition,
            textColor: themeColors.legendText,
            items: series.map((s, i) => {
              var _a2;
              return { key: s.dataKey, label: (_a2 = s.name) != null ? _a2 : s.dataKey, color: colorOf(s, i), shape: "line" };
            })
          }
        )
      ]
    }
  );
};
var LineChart_default = React3.memo(LineChartComponent);

// src/components/charts/BarChart.tsx
import React4, { useCallback as useCallback2, useMemo as useMemo2, useRef as useRef3, useState as useState5 } from "react";
import { Fragment, jsx as jsx5, jsxs as jsxs4 } from "react/jsx-runtime";
var DEFAULT_COLORS2 = [
  "var(--button-primary-default-bg)",
  "var(--color-state-success)",
  "var(--color-state-warning)",
  "var(--color-state-error)",
  "var(--color-accent-lavender-40)"
];
function valueExtent(data, series, stacked) {
  let lo = 0;
  let hi = 0;
  for (const row of data) {
    if (stacked) {
      let pos = 0;
      let neg = 0;
      for (const s of series) {
        const v = num(row, s.dataKey);
        if (v >= 0)
          pos += v;
        else
          neg += v;
      }
      hi = Math.max(hi, pos);
      lo = Math.min(lo, neg);
    } else {
      for (const s of series) {
        const v = num(row, s.dataKey);
        hi = Math.max(hi, v);
        lo = Math.min(lo, v);
      }
    }
  }
  if (lo === hi)
    hi = lo + 1;
  return [lo, hi];
}
var BarChartComponent = (props) => {
  var _a, _b, _c, _d;
  const {
    data,
    xAxisKey = "name",
    series,
    colors = DEFAULT_COLORS2,
    layout = "vertical",
    orientation,
    barSize = 24,
    barGap = 4,
    barCategoryGap = "10%",
    radius = 4,
    stacked = false,
    getBarColor,
    colorKey,
    width = "100%",
    height = 300,
    margin,
    showGrid = true,
    gridColor,
    showTooltip = true,
    showLegend = true,
    legendPosition = "bottom",
    theme = "light",
    tooltipFollowPointer = true,
    tooltipAnimation = true,
    chartAnimation = true,
    className = "",
    style = {},
    xTickAngle = 0,
    xTickInterval = 0,
    yTickCount = 5,
    xTickFormatter
  } = props;
  const horizontal = orientation ? orientation === "horizontal-bars" : layout === "horizontal";
  const axisSeries = horizontal ? series.map((s) => ({ ...s, yAxis: "left" })) : series;
  const axes = resolveAxes(props, axisSeries);
  const animCfg = resolveChartAnimation(chartAnimation, "bar");
  const animKey = useMemo2(
    () => `${data.length}-${series.map((s) => s.dataKey).join(",")}-${xAxisKey}-${horizontal}-${stacked}`,
    [data.length, series, xAxisKey, horizontal, stacked]
  );
  const animProgress = useChartAnimationProgress(animCfg.enabled, animCfg.durationMs, animCfg.easing, animKey);
  const themeColors = CHART_THEME_COLORS[theme];
  const gridStroke = gridColor != null ? gridColor : themeColors.gridColor;
  const containerRef = useRef3(null);
  const [tooltip, setTooltip] = useState5(null);
  const w = typeof width === "number" ? width : 400;
  const h = typeof height === "number" ? height : 300;
  const m = {
    top: (_a = margin == null ? void 0 : margin.top) != null ? _a : 10,
    right: (_b = margin == null ? void 0 : margin.right) != null ? _b : axes.hasRight && axes.showYAxis ? 48 : 20,
    bottom: (_c = margin == null ? void 0 : margin.bottom) != null ? _c : 30,
    left: (_d = margin == null ? void 0 : margin.left) != null ? _d : 40
  };
  const innerW = w - m.left - m.right;
  const innerH = h - m.top - m.bottom;
  const n = Math.max(1, data.length);
  const sideOf = (s) => axes.hasRight && s.yAxis === "right" ? "right" : "left";
  const valueRange = horizontal ? [0, innerW] : [innerH, 0];
  const leftAxis = buildValueAxis(
    valueExtent(data, axes.hasRight ? axisSeries.filter((s) => sideOf(s) === "left") : axisSeries, stacked),
    valueRange,
    axes.showYAxis,
    yTickCount
  );
  const rightAxis = axes.hasRight ? buildValueAxis(valueExtent(data, axisSeries.filter((s) => sideOf(s) === "right"), stacked), valueRange, axes.showYAxis, yTickCount) : leftAxis;
  const scaleFor = (s) => sideOf(s) === "right" ? rightAxis.scale : leftAxis.scale;
  const bandLen = horizontal ? innerH : innerW;
  const slot = bandLen / n;
  const catGap = typeof barCategoryGap === "string" && barCategoryGap.endsWith("%") ? slot * (parseFloat(barCategoryGap) / 100) : typeof barCategoryGap === "number" ? barCategoryGap : 8;
  const groupWidth = slot - catGap;
  const stackSides = axes.hasRight ? ["left", "right"] : ["left"];
  const barsPerGroup = stacked ? stackSides.length : series.length;
  const barWidth = Math.min(barSize, Math.max(2, (groupWidth - (barsPerGroup - 1) * barGap) / Math.max(1, barsPerGroup)));
  const totalBarWidth = barsPerGroup * barWidth + (barsPerGroup - 1) * barGap;
  const colorOf = (row, idx, s, si) => {
    var _a2;
    const custom = getBarColor == null ? void 0 : getBarColor(row, idx, s.dataKey);
    if (custom)
      return custom;
    if (colorKey) {
      const c = row[colorKey];
      if (typeof c === "string" && c)
        return c;
    }
    return (_a2 = s.color) != null ? _a2 : colors[si % colors.length];
  };
  const rects = [];
  data.forEach((row, idx) => {
    const growth = animCfg.barStagger ? barProgressForIndex(animProgress, idx, n, true) : animProgress;
    const groupStart = idx * slot + (slot - totalBarWidth) / 2;
    const cumPos = { left: 0, right: 0 };
    const cumNeg = { left: 0, right: 0 };
    series.forEach((s, si) => {
      const v = num(row, s.dataKey);
      const side = sideOf(s);
      let v0 = 0;
      let v1 = v;
      let pos = si;
      if (stacked) {
        pos = stackSides.indexOf(side);
        if (v >= 0) {
          v0 = cumPos[side];
          cumPos[side] += v;
        } else {
          v0 = cumNeg[side];
          cumNeg[side] += v;
        }
        v1 = v0 + v;
      }
      const sc = scaleFor(s);
      const a = sc(v0 * growth);
      const b = sc(v1 * growth);
      const offset = groupStart + pos * (barWidth + barGap);
      const fill = colorOf(row, idx, s, si);
      if (horizontal) {
        rects.push({ key: `${idx}-${s.dataKey}`, x: m.left + Math.min(a, b), y: m.top + offset, w: Math.abs(b - a), h: barWidth, fill, idx });
      } else {
        rects.push({ key: `${idx}-${s.dataKey}`, x: m.left + offset, y: m.top + Math.min(a, b), w: barWidth, h: Math.abs(b - a), fill, idx });
      }
    });
  });
  const categoryLabels = useMemo2(
    () => data.map((d, i) => {
      var _a2;
      return xTickFormatter ? xTickFormatter(d[xAxisKey], i) : String((_a2 = d[xAxisKey]) != null ? _a2 : "");
    }),
    [data, xAxisKey, xTickFormatter]
  );
  const { valueFormatter, labelFormat } = axes;
  const handleMouseMove = useCallback2(
    (e, idx) => {
      if (!showTooltip || !containerRef.current)
        return;
      const rect = containerRef.current.getBoundingClientRect();
      const row = data[idx];
      const items = series.map((s, i) => {
        var _a2;
        const v = num(row, s.dataKey);
        const custom = getBarColor == null ? void 0 : getBarColor(row, idx, s.dataKey);
        const keyed = colorKey && typeof row[colorKey] === "string" ? row[colorKey] : void 0;
        return {
          name: (_a2 = s.name) != null ? _a2 : s.dataKey,
          value: v,
          color: custom || keyed || s.color || colors[i % colors.length],
          displayValue: tooltipValue(valueFormatter, v, s.dataKey)
        };
      });
      setTooltip({
        pointerX: e.clientX - rect.left,
        pointerY: e.clientY - rect.top,
        cw: rect.width,
        ch: rect.height,
        label: tooltipLabel(row, idx, xAxisKey, labelFormat),
        items
      });
    },
    [showTooltip, data, series, xAxisKey, colors, getBarColor, colorKey, valueFormatter, labelFormat]
  );
  const handleMouseLeave = useCallback2(() => setTooltip(null), []);
  const r = Array.isArray(radius) ? radius[0] : radius;
  const bandCenters = data.map((_, i) => (horizontal ? m.top : m.left) + (i + 0.5) * slot);
  const tickIdx = horizontal ? data.map((_, i) => i) : xTickIndices(categoryLabels, xTickInterval, slot, xTickAngle);
  const gridLines = axes.showYAxis ? leftAxis.ticks.map((t) => leftAxis.scale(t)) : [0.25, 0.5, 0.75].map((t) => (horizontal ? innerW : innerH) * t);
  return /* @__PURE__ */ jsxs4(
    "div",
    {
      ref: containerRef,
      className,
      style: {
        width: typeof width === "string" ? width : w,
        height: typeof height === "string" ? height : h,
        position: "relative",
        ...style
      },
      children: [
        /* @__PURE__ */ jsxs4(
          "svg",
          {
            width: "100%",
            height: "100%",
            viewBox: `0 0 ${w} ${h}`,
            preserveAspectRatio: "xMidYMid meet",
            onMouseLeave: handleMouseLeave,
            children: [
              showGrid && /* @__PURE__ */ jsx5("g", { stroke: gridStroke, strokeDasharray: "3 3", strokeOpacity: 0.6, children: gridLines.map(
                (g) => horizontal ? /* @__PURE__ */ jsx5("line", { x1: m.left + g, y1: m.top, x2: m.left + g, y2: m.top + innerH }, g) : /* @__PURE__ */ jsx5("line", { x1: m.left, y1: m.top + g, x2: m.left + innerW, y2: m.top + g }, g)
              ) }),
              showTooltip && /* @__PURE__ */ jsx5("g", { className: "ds-chart-bar-bands", fill: "transparent", children: data.map(
                (_, idx) => horizontal ? /* @__PURE__ */ jsx5("rect", { x: m.left, y: m.top + idx * slot, width: innerW, height: slot, onMouseMove: (e) => handleMouseMove(e, idx) }, idx) : /* @__PURE__ */ jsx5("rect", { x: m.left + idx * slot, y: m.top, width: slot, height: innerH, onMouseMove: (e) => handleMouseMove(e, idx) }, idx)
              ) }),
              rects.map((b) => /* @__PURE__ */ jsx5(
                "rect",
                {
                  x: b.x,
                  y: b.y,
                  width: Math.max(0, b.w),
                  height: Math.max(0, b.h),
                  fill: b.fill,
                  rx: r,
                  ry: r,
                  "data-testid": "ds-chart-bar",
                  onMouseMove: (e) => handleMouseMove(e, b.idx)
                },
                b.key
              )),
              horizontal ? /* @__PURE__ */ jsxs4(Fragment, { children: [
                /* @__PURE__ */ jsx5("g", { className: "ds-chart-category-axis", fill: themeColors.axisText, fontSize: 11, textAnchor: "end", children: data.map((_, i) => /* @__PURE__ */ jsx5("text", { x: m.left - 6, y: bandCenters[i], dominantBaseline: "middle", children: categoryLabels[i] }, i)) }),
                axes.showYAxis && /* @__PURE__ */ jsx5("g", { className: "ds-chart-value-axis", fill: themeColors.axisText, fontSize: 11, textAnchor: "middle", children: leftAxis.ticks.map((t) => /* @__PURE__ */ jsx5("text", { x: m.left + leftAxis.scale(t), y: m.top + innerH + 16, children: axes.leftTickFormat(t) }, t)) })
              ] }) : /* @__PURE__ */ jsxs4(Fragment, { children: [
                axes.showYAxis && /* @__PURE__ */ jsx5(
                  YAxisLabels,
                  {
                    ticks: leftAxis.ticks,
                    scale: (v) => m.top + leftAxis.scale(v),
                    x: m.left,
                    side: "left",
                    format: axes.leftTickFormat,
                    color: themeColors.axisText
                  }
                ),
                axes.showYAxis && axes.hasRight && /* @__PURE__ */ jsx5(
                  YAxisLabels,
                  {
                    ticks: rightAxis.ticks,
                    scale: (v) => m.top + rightAxis.scale(v),
                    x: m.left + innerW,
                    side: "right",
                    format: axes.rightTickFormat,
                    color: themeColors.axisText
                  }
                ),
                /* @__PURE__ */ jsx5(
                  XAxisLabels,
                  {
                    positions: bandCenters,
                    labels: categoryLabels,
                    indices: tickIdx,
                    y: m.top + innerH + 16,
                    angle: xTickAngle,
                    color: themeColors.axisText
                  }
                )
              ] })
            ]
          }
        ),
        showTooltip && tooltip && /* @__PURE__ */ jsx5(
          ChartTooltip,
          {
            theme,
            open: true,
            pointerX: tooltip.pointerX,
            pointerY: tooltip.pointerY,
            containerWidth: tooltip.cw,
            containerHeight: tooltip.ch,
            label: tooltip.label,
            items: tooltip.items,
            animation: tooltipAnimation,
            followPointer: tooltipFollowPointer
          }
        ),
        showLegend && /* @__PURE__ */ jsx5(
          ChartLegend,
          {
            position: legendPosition,
            textColor: themeColors.legendText,
            items: series.map((s, i) => {
              var _a2, _b2;
              return { key: s.dataKey, label: (_a2 = s.name) != null ? _a2 : s.dataKey, color: (_b2 = s.color) != null ? _b2 : colors[i % colors.length], shape: "square" };
            })
          }
        )
      ]
    }
  );
};
var BarChart_default = React4.memo(BarChartComponent);

// src/components/charts/PieChart.tsx
import React5, { useCallback as useCallback3, useMemo as useMemo3, useRef as useRef4, useState as useState6 } from "react";
import { jsx as jsx6, jsxs as jsxs5 } from "react/jsx-runtime";
var DEFAULT_COLORS3 = [
  "var(--button-primary-default-bg)",
  "var(--color-state-success)",
  "var(--color-state-warning)",
  "var(--color-state-error)",
  "var(--color-accent-lavender-40)",
  "var(--color-accent-sky-10)",
  "var(--color-accent-mint-10)",
  "var(--color-accent-amber-10)"
];
var pieLabelNamePercent = ({ name, percent }) => `${name} (${Math.round(percent)}%)`;
var PieChartComponent = ({
  data,
  innerRadius = 0,
  outerRadius = "80%",
  colors = DEFAULT_COLORS3,
  showLabels = false,
  showLabelLine = true,
  paddingAngle = 0,
  startAngle = 0,
  endAngle = 360,
  centerLabel,
  labelFormatter,
  labelPosition = "inside",
  valueFormatter,
  width = "100%",
  height = 300,
  margin = { top: 10, right: 10, left: 10, bottom: 10 },
  showTooltip = true,
  showLegend = true,
  legendPosition = "right",
  theme = "light",
  tooltipFollowPointer = true,
  tooltipAnimation = true,
  chartAnimation = true,
  className = "",
  style = {}
}) => {
  var _a, _b, _c, _d;
  const animCfg = resolveChartAnimation(chartAnimation, "pie");
  const animKey = useMemo3(() => `${data.map((d) => d.value).join(",")}-${data.length}`, [data]);
  const animProgress = useChartAnimationProgress(
    animCfg.enabled,
    animCfg.durationMs,
    animCfg.easing,
    animKey
  );
  const scaleFactor = 0.08 + animProgress * 0.92;
  const themeColors = CHART_THEME_COLORS[theme];
  const containerRef = useRef4(null);
  const [hovered, setHovered] = useState6(null);
  const [tooltip, setTooltip] = useState6(null);
  const w = typeof width === "number" ? width : 400;
  const h = typeof height === "number" ? height : 300;
  const chartW = Math.max(200, typeof width === "number" ? width : 400);
  const chartH = Math.max(200, typeof height === "number" ? height : 300);
  const m = {
    top: (_a = margin == null ? void 0 : margin.top) != null ? _a : 10,
    right: (_b = margin == null ? void 0 : margin.right) != null ? _b : 10,
    bottom: (_c = margin == null ? void 0 : margin.bottom) != null ? _c : 10,
    left: (_d = margin == null ? void 0 : margin.left) != null ? _d : 10
  };
  const size = Math.min(chartW - m.left - m.right, chartH - m.top - m.bottom);
  const cx = chartW / 2;
  const cy = chartH / 2;
  const or = typeof outerRadius === "string" && outerRadius.endsWith("%") ? size / 2 * (parseFloat(outerRadius) / 100) : typeof outerRadius === "number" ? outerRadius : size / 2;
  const ir = typeof innerRadius === "string" && innerRadius.endsWith("%") ? size / 2 * (parseFloat(innerRadius) / 100) : typeof innerRadius === "number" ? innerRadius : 0;
  const total = data.reduce((s, d) => s + d.value, 0) || 1;
  const n = data.length;
  const sweep = Math.min(360, Math.abs(endAngle - startAngle)) || 360;
  const dir = endAngle < startAngle ? -1 : 1;
  const totalPaddingDeg = paddingAngle * Math.max(0, n - 1);
  const totalSliceDeg = Math.max(0, sweep - totalPaddingDeg);
  const colorAt = (i) => {
    var _a2, _b2;
    return (_b2 = (_a2 = data[i]) == null ? void 0 : _a2.color) != null ? _b2 : colors[i % colors.length];
  };
  let currentDeg = startAngle;
  const slices = data.map((d, i) => {
    const pct = d.value / total;
    const spanDeg = Math.max(0.5, pct * totalSliceDeg);
    const a = currentDeg;
    const b = currentDeg + dir * spanDeg;
    currentDeg = b + dir * (i < n - 1 ? paddingAngle : 0);
    return {
      ...d,
      startDeg: Math.min(a, b),
      endDeg: Math.max(a, b),
      color: colorAt(i)
    };
  });
  const labelText = (i) => {
    const d = data[i];
    const percent = d.value / total * 100;
    return labelFormatter ? labelFormatter({ name: d.name, value: d.value, percent, index: i }) : `${percent.toFixed(0)}%`;
  };
  const fmtValue = (v, name) => valueFormatter ? valueFormatter(v, name) : String(v);
  const handleSlicePointer = useCallback3(
    (e, i) => {
      var _a2, _b2;
      setHovered(i);
      if (!showTooltip || !containerRef.current)
        return;
      const rect = containerRef.current.getBoundingClientRect();
      const slice = data[i];
      const pct = slice.value / total * 100;
      setTooltip({
        pointerX: e.clientX - rect.left,
        pointerY: e.clientY - rect.top,
        cw: rect.width,
        ch: rect.height,
        label: `${slice.name} (${pct.toFixed(1)}%)`,
        items: [
          {
            name: "Value",
            value: slice.value,
            color: (_b2 = (_a2 = data[i]) == null ? void 0 : _a2.color) != null ? _b2 : colors[i % colors.length],
            displayValue: valueFormatter ? valueFormatter(slice.value, slice.name) : void 0
          }
        ]
      });
    },
    [showTooltip, data, colors, total, valueFormatter]
  );
  const handleMouseLeave = useCallback3(() => {
    setHovered(null);
    setTooltip(null);
  }, []);
  return /* @__PURE__ */ jsxs5(
    "div",
    {
      ref: containerRef,
      className,
      style: {
        width: typeof width === "string" ? width : w,
        height: typeof height === "string" ? height : h,
        minWidth: 280,
        minHeight: 280,
        position: "relative",
        display: "flex",
        flexDirection: "column",
        alignItems: legendPosition === "left" || legendPosition === "right" ? "stretch" : "center",
        ...style
      },
      children: [
        /* @__PURE__ */ jsxs5("div", { style: { display: "flex", alignItems: "center", flex: 1, minHeight: 260, position: "relative" }, children: [
          /* @__PURE__ */ jsx6(
            "svg",
            {
              width: "100%",
              height: "100%",
              viewBox: `0 0 ${chartW} ${chartH}`,
              preserveAspectRatio: "xMidYMid meet",
              style: { overflow: "visible" },
              onMouseLeave: handleMouseLeave,
              children: /* @__PURE__ */ jsxs5("g", { transform: `translate(${cx} ${cy}) scale(${scaleFactor}) translate(${-cx} ${-cy})`, children: [
                slices.map((slice, i) => /* @__PURE__ */ jsx6(
                  "path",
                  {
                    d: arcPath(cx, cy, or, slice.startDeg, slice.endDeg, ir),
                    fill: slice.color,
                    stroke: themeColors.tooltipBg,
                    strokeWidth: 2,
                    opacity: hovered !== null && hovered !== i ? 0.5 : 1,
                    onMouseEnter: (e) => handleSlicePointer(e, i),
                    onMouseMove: (e) => handleSlicePointer(e, i),
                    style: { cursor: "pointer" },
                    children: !showTooltip && /* @__PURE__ */ jsxs5("title", { children: [
                      slice.name,
                      ": ",
                      fmtValue(slice.value, slice.name),
                      " (",
                      (slice.value / total * 100).toFixed(1),
                      "%)"
                    ] })
                  },
                  i
                )),
                showLabels && labelPosition === "inside" && slices.map((slice, i) => {
                  const midDeg = (slice.startDeg + slice.endDeg) / 2;
                  const labelR = ir + (or - ir) * 0.5;
                  const { x: lx, y: ly } = polarToCartesian(cx, cy, labelR, midDeg);
                  return /* @__PURE__ */ jsx6(
                    "text",
                    {
                      x: lx,
                      y: ly,
                      textAnchor: "middle",
                      dominantBaseline: "middle",
                      fontSize: 11,
                      fill: themeColors.tooltipText,
                      opacity: animProgress,
                      style: { pointerEvents: "none" },
                      children: labelText(i)
                    },
                    i
                  );
                }),
                showLabels && labelPosition === "outside" && slices.map((slice, i) => {
                  const midDeg = (slice.startDeg + slice.endDeg) / 2;
                  const p0 = polarToCartesian(cx, cy, or, midDeg);
                  const p1 = polarToCartesian(cx, cy, or + 10, midDeg);
                  const pt = polarToCartesian(cx, cy, or + 14, midDeg);
                  const norm = (midDeg % 360 + 360) % 360;
                  const anchor = norm > 5 && norm < 175 ? "start" : norm > 185 && norm < 355 ? "end" : "middle";
                  return /* @__PURE__ */ jsxs5("g", { opacity: animProgress, style: { pointerEvents: "none" }, children: [
                    showLabelLine && /* @__PURE__ */ jsx6("line", { x1: p0.x, y1: p0.y, x2: p1.x, y2: p1.y, stroke: slice.color, strokeWidth: 1 }),
                    /* @__PURE__ */ jsx6(
                      "text",
                      {
                        x: pt.x,
                        y: pt.y,
                        textAnchor: anchor,
                        dominantBaseline: "middle",
                        fontSize: 11,
                        fill: themeColors.axisText,
                        children: labelText(i)
                      }
                    )
                  ] }, i);
                })
              ] })
            }
          ),
          centerLabel != null && centerLabel !== false && /* @__PURE__ */ jsx6(
            "div",
            {
              className: "ds-chart-pie-center",
              style: {
                position: "absolute",
                inset: 0,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                textAlign: "center",
                pointerEvents: "none",
                color: themeColors.tooltipText
              },
              children: centerLabel
            }
          )
        ] }),
        showTooltip && tooltip && /* @__PURE__ */ jsx6(
          ChartTooltip,
          {
            theme,
            open: true,
            pointerX: tooltip.pointerX,
            pointerY: tooltip.pointerY,
            containerWidth: tooltip.cw,
            containerHeight: tooltip.ch,
            label: tooltip.label,
            items: tooltip.items,
            animation: tooltipAnimation,
            followPointer: tooltipFollowPointer
          }
        ),
        showLegend && /* @__PURE__ */ jsx6(
          "div",
          {
            style: {
              display: "flex",
              flexWrap: "wrap",
              gap: 12,
              justifyContent: legendPosition === "left" ? "flex-start" : legendPosition === "right" ? "flex-end" : "center",
              marginTop: 8,
              fontSize: 12
            },
            children: data.map((d, i) => /* @__PURE__ */ jsxs5("div", { style: { display: "flex", alignItems: "center", gap: 6 }, children: [
              /* @__PURE__ */ jsx6(
                "span",
                {
                  style: {
                    width: 12,
                    height: 12,
                    borderRadius: 2,
                    background: colorAt(i)
                  }
                }
              ),
              /* @__PURE__ */ jsxs5("span", { style: { color: themeColors.legendText }, children: [
                d.name,
                ": ",
                fmtValue(d.value, d.name)
              ] })
            ] }, d.name))
          }
        )
      ]
    }
  );
};
var PieChart_default = React5.memo(PieChartComponent);

// src/components/charts/AreaChart.tsx
import React6, { useCallback as useCallback4, useMemo as useMemo4, useState as useState7 } from "react";
import { jsx as jsx7, jsxs as jsxs6 } from "react/jsx-runtime";
var DEFAULT_COLORS4 = [
  "var(--button-primary-default-bg)",
  "var(--color-state-success)",
  "var(--color-state-warning)",
  "var(--color-state-error)",
  "var(--color-accent-lavender-40)"
];
var AreaChartComponent = (props) => {
  var _a, _b, _c, _d;
  const {
    data,
    xAxisKey = "name",
    series,
    colors = DEFAULT_COLORS4,
    stacked = false,
    curve = "monotone",
    strokeWidth = 2,
    width = "100%",
    height = 300,
    margin,
    showGrid = true,
    gridColor,
    showTooltip = true,
    showLegend = true,
    legendPosition = "bottom",
    theme = "light",
    tooltipFollowPointer = true,
    tooltipAnimation = true,
    showCrosshair = true,
    chartAnimation = true,
    className = "",
    style = {},
    xTickAngle = 0,
    xTickInterval = 0,
    yTickCount = 5,
    xTickFormatter
  } = props;
  const axisSeries = stacked ? series.map((s) => ({ ...s, yAxis: "left" })) : series;
  const axes = resolveAxes(props, axisSeries);
  const animCfg = resolveChartAnimation(chartAnimation, "area");
  const animKey = useMemo4(
    () => `${data.length}-${series.map((s) => s.dataKey).join(",")}-${xAxisKey}-${stacked}-${curve}`,
    [data.length, series, xAxisKey, stacked, curve]
  );
  const animProgress = useChartAnimationProgress(animCfg.enabled, animCfg.durationMs, animCfg.easing, animKey);
  const themeColors = CHART_THEME_COLORS[theme];
  const gridStroke = gridColor != null ? gridColor : themeColors.gridColor;
  const [tooltip, setTooltip] = useState7(null);
  const w = typeof width === "number" ? width : 400;
  const h = typeof height === "number" ? height : 300;
  const m = {
    top: (_a = margin == null ? void 0 : margin.top) != null ? _a : 10,
    right: (_b = margin == null ? void 0 : margin.right) != null ? _b : axes.hasRight && axes.showYAxis ? 48 : 20,
    bottom: (_c = margin == null ? void 0 : margin.bottom) != null ? _c : 30,
    left: (_d = margin == null ? void 0 : margin.left) != null ? _d : 40
  };
  const innerW = w - m.left - m.right;
  const innerH = h - m.top - m.bottom;
  const colorOf = (s, i) => {
    var _a2;
    return (_a2 = s.color) != null ? _a2 : colors[i % colors.length];
  };
  const xLabels = useMemo4(
    () => data.map((d, i) => {
      var _a2;
      return xTickFormatter ? xTickFormatter(d[xAxisKey], i) : String((_a2 = d[xAxisKey]) != null ? _a2 : "");
    }),
    [data, xAxisKey, xTickFormatter]
  );
  const leftSeries = axes.hasRight ? seriesOnSide(axisSeries, "left") : series;
  const rightSeries = axes.hasRight ? seriesOnSide(axisSeries, "right") : [];
  const leftAxis = buildValueAxis(getValueExtent(data, leftSeries, stacked), [innerH, 0], axes.showYAxis, yTickCount);
  const rightAxis = axes.hasRight ? buildValueAxis(getValueExtent(data, rightSeries), [innerH, 0], axes.showYAxis, yTickCount) : leftAxis;
  const yScaleFor = (s) => !stacked && s.yAxis === "right" && axes.hasRight ? rightAxis.scale : leftAxis.scale;
  const xScale = (i) => i / Math.max(1, data.length - 1) * innerW;
  const xPositions = data.map((_, i) => m.left + xScale(i));
  const finalPaths = (() => {
    if (stacked) {
      const cum = new Array(data.length).fill(0);
      return series.map((s, si) => {
        const basePoints = data.map((_, i) => ({
          x: m.left + xScale(i),
          y: si === 0 ? m.top + innerH : m.top + leftAxis.scale(cum[i])
        }));
        const topPoints = data.map((row, i) => {
          cum[i] += num(row, s.dataKey);
          return { x: m.left + xScale(i), y: m.top + leftAxis.scale(cum[i]) };
        });
        const areaD = "M " + topPoints.map((p) => `${p.x} ${p.y}`).join(" L ") + " L " + [...basePoints].reverse().map((p) => `${p.x} ${p.y}`).join(" L ") + " Z";
        return { key: s.dataKey, areaPath: areaD, linePath: linePath(topPoints, curve), points: topPoints, color: colorOf(s, si) };
      });
    }
    return series.map((s, si) => {
      const ys = yScaleFor(s);
      const points = data.map((d, i) => ({ x: m.left + xScale(i), y: m.top + ys(num(d, s.dataKey)) }));
      const baseY = m.top + innerH;
      return {
        key: s.dataKey,
        areaPath: areaPath(points, baseY, curve),
        linePath: linePath(points, curve),
        points,
        color: colorOf(s, si)
      };
    });
  })();
  const { valueFormatter, labelFormat } = axes;
  const handleMouseMove = useCallback4(
    (e) => {
      if (!showTooltip || data.length === 0)
        return;
      const rect = e.currentTarget.getBoundingClientRect();
      const scaleX = rect.width > 0 ? w / rect.width : 1;
      const x = (e.clientX - rect.left) * scaleX - m.left;
      const idx = Math.round(x / innerW * (data.length - 1));
      const clamped = Math.max(0, Math.min(idx, data.length - 1));
      const row = data[clamped];
      const items = series.map((s, i) => {
        var _a2, _b2;
        const v = num(row, s.dataKey);
        return {
          name: (_a2 = s.name) != null ? _a2 : s.dataKey,
          value: v,
          color: (_b2 = s.color) != null ? _b2 : colors[i % colors.length],
          displayValue: tooltipValue(valueFormatter, v, s.dataKey)
        };
      });
      setTooltip({
        pointerX: e.clientX - rect.left,
        pointerY: e.clientY - rect.top,
        cw: rect.width,
        ch: rect.height,
        label: tooltipLabel(row, clamped, xAxisKey, labelFormat),
        items,
        activeIndex: clamped
      });
    },
    [showTooltip, data, series, xAxisKey, colors, innerW, m.left, w, valueFormatter, labelFormat]
  );
  const handleMouseLeave = useCallback4(() => setTooltip(null), []);
  const gridYs = axes.showYAxis ? leftAxis.ticks.map((t) => leftAxis.scale(t)) : [0.25, 0.5, 0.75].map((t) => innerH * t);
  const tickIdx = xTickIndices(xLabels, xTickInterval, innerW / Math.max(1, data.length - 1), xTickAngle);
  return /* @__PURE__ */ jsxs6(
    "div",
    {
      className,
      style: {
        width: typeof width === "string" ? width : w,
        height: typeof height === "string" ? height : h,
        position: "relative",
        ...style
      },
      children: [
        /* @__PURE__ */ jsxs6(
          "svg",
          {
            width: "100%",
            height: "100%",
            viewBox: `0 0 ${w} ${h}`,
            preserveAspectRatio: "xMidYMid meet",
            onMouseMove: handleMouseMove,
            onMouseLeave: handleMouseLeave,
            children: [
              showGrid && /* @__PURE__ */ jsx7("g", { stroke: gridStroke, strokeDasharray: "3 3", strokeOpacity: 0.6, children: gridYs.map((gy) => /* @__PURE__ */ jsx7("line", { x1: m.left, y1: m.top + gy, x2: m.left + innerW, y2: m.top + gy }, gy)) }),
              finalPaths.map(({ key, areaPath: ap, linePath: lp, color }) => /* @__PURE__ */ jsxs6("g", { children: [
                /* @__PURE__ */ jsx7("path", { d: ap, fill: color, fillOpacity: (stacked ? 0.8 : 0.3) * animProgress, stroke: "none" }),
                /* @__PURE__ */ jsx7(AnimatedLineStroke, { pathD: lp, progress: animProgress, color, strokeWidth })
              ] }, key)),
              showTooltip && showCrosshair && tooltip !== null && data.length > 0 && /* @__PURE__ */ jsxs6("g", { className: "ds-chart-crosshair", pointerEvents: "none", children: [
                /* @__PURE__ */ jsx7(
                  "line",
                  {
                    x1: m.left + xScale(tooltip.activeIndex),
                    y1: m.top,
                    x2: m.left + xScale(tooltip.activeIndex),
                    y2: m.top + innerH,
                    stroke: themeColors.gridColor,
                    strokeWidth: 1,
                    strokeDasharray: "4 6",
                    opacity: 0.85
                  }
                ),
                finalPaths.map(({ key, points, color }) => {
                  const p = points[tooltip.activeIndex];
                  if (!p)
                    return null;
                  return /* @__PURE__ */ jsx7(
                    "circle",
                    {
                      cx: p.x,
                      cy: p.y,
                      r: 6,
                      fill: color,
                      stroke: themeColors.tooltipBg,
                      strokeWidth: 2,
                      opacity: 0.92 * animProgress
                    },
                    `hit-${key}`
                  );
                })
              ] }),
              axes.showYAxis && /* @__PURE__ */ jsx7(
                YAxisLabels,
                {
                  ticks: leftAxis.ticks,
                  scale: (v) => m.top + leftAxis.scale(v),
                  x: m.left,
                  side: "left",
                  format: axes.leftTickFormat,
                  color: themeColors.axisText
                }
              ),
              axes.showYAxis && axes.hasRight && /* @__PURE__ */ jsx7(
                YAxisLabels,
                {
                  ticks: rightAxis.ticks,
                  scale: (v) => m.top + rightAxis.scale(v),
                  x: m.left + innerW,
                  side: "right",
                  format: axes.rightTickFormat,
                  color: themeColors.axisText
                }
              ),
              /* @__PURE__ */ jsx7(
                XAxisLabels,
                {
                  positions: xPositions,
                  labels: xLabels,
                  indices: tickIdx,
                  y: m.top + innerH + 16,
                  angle: xTickAngle,
                  color: themeColors.axisText
                }
              )
            ]
          }
        ),
        showTooltip && tooltip && /* @__PURE__ */ jsx7(
          ChartTooltip,
          {
            theme,
            open: true,
            pointerX: tooltip.pointerX,
            pointerY: tooltip.pointerY,
            containerWidth: tooltip.cw,
            containerHeight: tooltip.ch,
            label: tooltip.label,
            items: tooltip.items,
            animation: tooltipAnimation,
            followPointer: tooltipFollowPointer
          }
        ),
        showLegend && /* @__PURE__ */ jsx7(
          ChartLegend,
          {
            position: legendPosition,
            textColor: themeColors.legendText,
            items: series.map((s, i) => {
              var _a2;
              return { key: s.dataKey, label: (_a2 = s.name) != null ? _a2 : s.dataKey, color: colorOf(s, i), shape: "square" };
            })
          }
        )
      ]
    }
  );
};
var AreaChart_default = React6.memo(AreaChartComponent);

// src/components/charts/ComposedChart.tsx
import React7, { useCallback as useCallback5, useMemo as useMemo5, useRef as useRef5, useState as useState8 } from "react";
import { jsx as jsx8, jsxs as jsxs7 } from "react/jsx-runtime";
var ComposedChartComponent = (props) => {
  var _a, _b, _c, _d;
  const {
    data,
    xAxisKey = "name",
    series,
    colors = CHART_COLORS,
    curve = "monotone",
    showDots = true,
    dotSize = 3,
    strokeWidth = 2,
    barSize = 24,
    barGap = 4,
    barCategoryGap = "10%",
    radius = 4,
    stackedBars = false,
    width = "100%",
    height = 300,
    margin,
    showGrid = true,
    gridColor,
    showTooltip = true,
    showLegend = true,
    legendPosition = "bottom",
    theme = "light",
    tooltipFollowPointer = true,
    tooltipAnimation = true,
    showCrosshair = true,
    chartAnimation = true,
    className = "",
    style = {},
    xTickAngle = 0,
    xTickInterval = 0,
    yTickCount = 5,
    xTickFormatter
  } = props;
  const axes = resolveAxes(props, series);
  const animCfg = resolveChartAnimation(chartAnimation, "line");
  const animKey = useMemo5(
    () => `${data.length}-${series.map((s) => `${s.type}:${s.dataKey}`).join(",")}-${xAxisKey}`,
    [data.length, series, xAxisKey]
  );
  const progress = useChartAnimationProgress(animCfg.enabled, animCfg.durationMs, animCfg.easing, animKey);
  const themeColors = CHART_THEME_COLORS[theme];
  const gridStroke = gridColor != null ? gridColor : themeColors.gridColor;
  const containerRef = useRef5(null);
  const [tooltip, setTooltip] = useState8(null);
  const w = typeof width === "number" ? width : 400;
  const h = typeof height === "number" ? height : 300;
  const m = {
    top: (_a = margin == null ? void 0 : margin.top) != null ? _a : 10,
    right: (_b = margin == null ? void 0 : margin.right) != null ? _b : axes.hasRight && axes.showYAxis ? 48 : 20,
    bottom: (_c = margin == null ? void 0 : margin.bottom) != null ? _c : 30,
    left: (_d = margin == null ? void 0 : margin.left) != null ? _d : 40
  };
  const innerW = w - m.left - m.right;
  const innerH = h - m.top - m.bottom;
  const n = Math.max(1, data.length);
  const slot = innerW / n;
  const centers = data.map((_, i) => m.left + (i + 0.5) * slot);
  const sideOf = (s) => axes.hasRight && s.yAxis === "right" ? "right" : "left";
  const colorOf = (s, i) => {
    var _a2;
    return (_a2 = s.color) != null ? _a2 : colors[i % colors.length];
  };
  const extentFor = (side) => {
    let lo = Infinity;
    let hi = -Infinity;
    const ss = series.filter((s) => sideOf(s) === side);
    if (ss.length === 0)
      return [0, 1];
    const push = (v) => {
      if (v < lo)
        lo = v;
      if (v > hi)
        hi = v;
    };
    if (ss.some((s) => s.type === "bar" || s.type === "area"))
      push(0);
    for (const row of data) {
      let pos = 0;
      let neg = 0;
      for (const s of ss) {
        const v = num(row, s.dataKey);
        if (s.type === "bar" && stackedBars) {
          if (v >= 0)
            pos += v;
          else
            neg += v;
        } else
          push(v);
        if (s.type === "range" && s.upperDataKey)
          push(num(row, s.upperDataKey));
      }
      if (stackedBars) {
        push(pos);
        push(neg);
      }
    }
    if (lo === Infinity)
      return [0, 1];
    if (lo === hi)
      hi = lo + 1;
    return [lo, hi];
  };
  const leftAxis = buildValueAxis(extentFor("left"), [innerH, 0], axes.showYAxis, yTickCount);
  const rightAxis = axes.hasRight ? buildValueAxis(extentFor("right"), [innerH, 0], axes.showYAxis, yTickCount) : leftAxis;
  const axisOf = (s) => sideOf(s) === "right" ? rightAxis : leftAxis;
  const yOf = (s, v) => m.top + axisOf(s).scale(v);
  const zeroY = (s) => {
    const [d0, d1] = axisOf(s).domain;
    return yOf(s, Math.min(Math.max(0, d0), d1));
  };
  const barSeries = series.map((s, i) => ({ s, i })).filter(({ s }) => s.type === "bar");
  const stackSides = Array.from(new Set(barSeries.map(({ s }) => sideOf(s))));
  const barsPerGroup = stackedBars ? stackSides.length : barSeries.length;
  const catGap = typeof barCategoryGap === "string" && barCategoryGap.endsWith("%") ? slot * (parseFloat(barCategoryGap) / 100) : typeof barCategoryGap === "number" ? barCategoryGap : 8;
  const barWidth = Math.min(barSize, Math.max(2, (slot - catGap - (barsPerGroup - 1) * barGap) / Math.max(1, barsPerGroup)));
  const totalBarWidth = barsPerGroup * barWidth + Math.max(0, barsPerGroup - 1) * barGap;
  const bars = [];
  data.forEach((row, idx) => {
    const cumPos = {};
    const cumNeg = {};
    barSeries.forEach(({ s, i }, bi) => {
      var _a2, _b2;
      const v = num(row, s.dataKey);
      const side = sideOf(s);
      let v0 = 0;
      let pos = bi;
      if (stackedBars) {
        pos = stackSides.indexOf(side);
        if (v >= 0) {
          v0 = (_a2 = cumPos[side]) != null ? _a2 : 0;
          cumPos[side] = v0 + v;
        } else {
          v0 = (_b2 = cumNeg[side]) != null ? _b2 : 0;
          cumNeg[side] = v0 + v;
        }
      }
      const a = yOf(s, v0 * progress);
      const b = yOf(s, (v0 + v) * progress);
      bars.push({
        key: `${idx}-${s.dataKey}`,
        idx,
        x: m.left + idx * slot + (slot - totalBarWidth) / 2 + pos * (barWidth + barGap),
        y: Math.min(a, b),
        w: barWidth,
        h: Math.abs(b - a),
        fill: colorOf(s, i)
      });
    });
  });
  const pts = (s, key) => data.map((row, i) => ({ x: centers[i], y: yOf(s, num(row, key)) }));
  const xLabels = useMemo5(
    () => data.map((d, i) => {
      var _a2;
      return xTickFormatter ? xTickFormatter(d[xAxisKey], i) : String((_a2 = d[xAxisKey]) != null ? _a2 : "");
    }),
    [data, xAxisKey, xTickFormatter]
  );
  const { valueFormatter, labelFormat } = axes;
  const fmt = useCallback5(
    (v, key) => valueFormatter ? valueFormatter(v, key) : void 0,
    [valueFormatter]
  );
  const handleMove = useCallback5(
    (e, idx) => {
      if (!showTooltip || !containerRef.current)
        return;
      const rect = containerRef.current.getBoundingClientRect();
      const row = data[idx];
      const items = series.map((s, i) => {
        var _a2, _b2, _c2, _d2;
        const v = num(row, s.dataKey);
        if (s.type === "range" && s.upperDataKey) {
          const hi = num(row, s.upperDataKey);
          return {
            name: (_a2 = s.name) != null ? _a2 : `${s.dataKey}\u2013${s.upperDataKey}`,
            value: v,
            color: colorOf(s, i),
            displayValue: `${(_b2 = fmt(v, s.dataKey)) != null ? _b2 : v} \u2013 ${(_c2 = fmt(hi, s.upperDataKey)) != null ? _c2 : hi}`
          };
        }
        return { name: (_d2 = s.name) != null ? _d2 : s.dataKey, value: v, color: colorOf(s, i), displayValue: fmt(v, s.dataKey) };
      });
      setTooltip({
        pointerX: e.clientX - rect.left,
        pointerY: e.clientY - rect.top,
        cw: rect.width,
        ch: rect.height,
        label: tooltipLabel(row, idx, xAxisKey, labelFormat),
        items,
        activeIndex: idx
      });
    },
    // colorOf is derived from series/colors
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [showTooltip, data, series, colors, xAxisKey, labelFormat, fmt]
  );
  const gridYs = axes.showYAxis ? leftAxis.ticks.map((t) => leftAxis.scale(t)) : [0.25, 0.5, 0.75].map((t) => innerH * t);
  const tickIdx = xTickIndices(xLabels, xTickInterval, slot, xTickAngle);
  const ordered = (type) => series.map((s, i) => ({ s, i })).filter(({ s }) => s.type === type);
  return /* @__PURE__ */ jsxs7(
    "div",
    {
      ref: containerRef,
      className,
      style: {
        width: typeof width === "string" ? width : w,
        height: typeof height === "string" ? height : h,
        position: "relative",
        ...style
      },
      children: [
        /* @__PURE__ */ jsxs7("svg", { width: "100%", height: "100%", viewBox: `0 0 ${w} ${h}`, preserveAspectRatio: "xMidYMid meet", onMouseLeave: () => setTooltip(null), children: [
          showGrid && /* @__PURE__ */ jsx8("g", { stroke: gridStroke, strokeDasharray: "3 3", strokeOpacity: 0.6, children: gridYs.map((gy) => /* @__PURE__ */ jsx8("line", { x1: m.left, y1: m.top + gy, x2: m.left + innerW, y2: m.top + gy }, gy)) }),
          showTooltip && /* @__PURE__ */ jsx8("g", { fill: "transparent", children: data.map((_, idx) => /* @__PURE__ */ jsx8("rect", { x: m.left + idx * slot, y: m.top, width: slot, height: innerH, onMouseMove: (e) => handleMove(e, idx) }, idx)) }),
          ordered("range").map(({ s, i }) => {
            var _a2, _b2;
            if (!s.upperDataKey)
              return null;
            const c = (_a2 = s.curve) != null ? _a2 : curve;
            const upper = pts(s, s.upperDataKey);
            const lower = pts(s, s.dataKey);
            const upperD = linePath(upper, c);
            const lowerRev = linePath([...lower].reverse(), c).replace(/^M/, "L");
            return /* @__PURE__ */ jsx8(
              "path",
              {
                "data-series-type": "range",
                d: `${upperD} ${lowerRev} Z`,
                fill: colorOf(s, i),
                fillOpacity: ((_b2 = s.fillOpacity) != null ? _b2 : 0.2) * progress,
                stroke: "none",
                pointerEvents: "none"
              },
              `range-${s.dataKey}`
            );
          }),
          ordered("area").map(({ s, i }) => {
            var _a2, _b2, _c2;
            const c = (_a2 = s.curve) != null ? _a2 : curve;
            const p = pts(s, s.dataKey);
            if (p.length === 0)
              return null;
            const base = zeroY(s);
            const d = `${linePath(p, c)} L ${p[p.length - 1].x} ${base} L ${p[0].x} ${base} Z`;
            return /* @__PURE__ */ jsxs7("g", { "data-series-type": "area", pointerEvents: "none", children: [
              /* @__PURE__ */ jsx8("path", { d, fill: colorOf(s, i), fillOpacity: ((_b2 = s.fillOpacity) != null ? _b2 : 0.3) * progress, stroke: "none" }),
              /* @__PURE__ */ jsx8(AnimatedLineStroke, { pathD: linePath(p, c), progress, color: colorOf(s, i), strokeWidth: (_c2 = s.strokeWidth) != null ? _c2 : strokeWidth })
            ] }, `area-${s.dataKey}`);
          }),
          bars.map((b) => /* @__PURE__ */ jsx8(
            "rect",
            {
              "data-series-type": "bar",
              x: b.x,
              y: b.y,
              width: b.w,
              height: Math.max(0, b.h),
              fill: b.fill,
              rx: radius,
              ry: radius,
              onMouseMove: (e) => handleMove(e, b.idx)
            },
            b.key
          )),
          ordered("line").map(({ s, i }) => {
            var _a2, _b2, _c2;
            const p = pts(s, s.dataKey);
            const d = linePath(p, (_a2 = s.curve) != null ? _a2 : curve);
            const color = colorOf(s, i);
            const sw = (_b2 = s.strokeWidth) != null ? _b2 : strokeWidth;
            return /* @__PURE__ */ jsxs7("g", { "data-series-type": "line", pointerEvents: "none", children: [
              s.strokeDasharray ? /* @__PURE__ */ jsx8("path", { d, fill: "none", stroke: color, strokeWidth: sw, strokeDasharray: s.strokeDasharray, opacity: progress }) : /* @__PURE__ */ jsx8(AnimatedLineStroke, { pathD: d, progress, color, strokeWidth: sw }),
              ((_c2 = s.showDots) != null ? _c2 : showDots) && p.map((pt, k) => /* @__PURE__ */ jsx8("circle", { cx: pt.x, cy: pt.y, r: dotSize, fill: color, stroke: themeColors.tooltipBg, strokeWidth: 1, opacity: Math.min(1, progress * 2.5) }, k))
            ] }, `line-${s.dataKey}`);
          }),
          showTooltip && showCrosshair && tooltip !== null && data.length > 0 && /* @__PURE__ */ jsxs7("g", { className: "ds-chart-crosshair", pointerEvents: "none", children: [
            /* @__PURE__ */ jsx8(
              "line",
              {
                x1: centers[tooltip.activeIndex],
                y1: m.top,
                x2: centers[tooltip.activeIndex],
                y2: m.top + innerH,
                stroke: themeColors.gridColor,
                strokeWidth: 1,
                strokeDasharray: "4 6",
                opacity: 0.85
              }
            ),
            series.map(
              (s, i) => s.type === "line" || s.type === "area" ? /* @__PURE__ */ jsx8(
                "circle",
                {
                  cx: centers[tooltip.activeIndex],
                  cy: yOf(s, num(data[tooltip.activeIndex], s.dataKey)),
                  r: dotSize + 3,
                  fill: colorOf(s, i),
                  stroke: themeColors.tooltipBg,
                  strokeWidth: 2
                },
                `hit-${s.dataKey}`
              ) : null
            )
          ] }),
          axes.showYAxis && /* @__PURE__ */ jsx8(YAxisLabels, { ticks: leftAxis.ticks, scale: (v) => m.top + leftAxis.scale(v), x: m.left, side: "left", format: axes.leftTickFormat, color: themeColors.axisText }),
          axes.showYAxis && axes.hasRight && /* @__PURE__ */ jsx8(
            YAxisLabels,
            {
              ticks: rightAxis.ticks,
              scale: (v) => m.top + rightAxis.scale(v),
              x: m.left + innerW,
              side: "right",
              format: axes.rightTickFormat,
              color: themeColors.axisText
            }
          ),
          /* @__PURE__ */ jsx8(XAxisLabels, { positions: centers, labels: xLabels, indices: tickIdx, y: m.top + innerH + 16, angle: xTickAngle, color: themeColors.axisText })
        ] }),
        showTooltip && tooltip && /* @__PURE__ */ jsx8(
          ChartTooltip,
          {
            theme,
            open: true,
            pointerX: tooltip.pointerX,
            pointerY: tooltip.pointerY,
            containerWidth: tooltip.cw,
            containerHeight: tooltip.ch,
            label: tooltip.label,
            items: tooltip.items,
            animation: tooltipAnimation,
            followPointer: tooltipFollowPointer
          }
        ),
        showLegend && /* @__PURE__ */ jsx8(
          ChartLegend,
          {
            position: legendPosition,
            textColor: themeColors.legendText,
            items: series.map((s, i) => {
              var _a2;
              return {
                key: `${s.type}-${s.dataKey}`,
                label: (_a2 = s.name) != null ? _a2 : s.dataKey,
                color: colorOf(s, i),
                shape: s.type === "line" ? "line" : s.type === "range" ? "band" : "square"
              };
            })
          }
        )
      ]
    }
  );
};
var ComposedChart = React7.memo(ComposedChartComponent);
ComposedChart.displayName = "ComposedChart";
var ComposedChart_default = ComposedChart;

export {
  CHART_THEME_COLORS,
  CHART_COLORS,
  ChartTooltip,
  LineChart_default,
  BarChart_default,
  pieLabelNamePercent,
  PieChart_default,
  AreaChart_default,
  ComposedChart_default
};
//# sourceMappingURL=chunk-C7JE2L56.mjs.map