import type { Meta, StoryObj } from "@storybook/react";
import { LineChart, BarChart, PieChart, AreaChart, ComposedChart, pieLabelNamePercent } from "./index";

const lineData = [
  { name: "Jan", uv: 4000, pv: 2400, amt: 2400 },
  { name: "Feb", uv: 3000, pv: 1398, amt: 2210 },
  { name: "Mar", uv: 2000, pv: 9800, amt: 2290 },
  { name: "Apr", uv: 2780, pv: 3908, amt: 2000 },
  { name: "May", uv: 1890, pv: 4800, amt: 2181 },
  { name: "Jun", uv: 2390, pv: 3800, amt: 2500 },
];

const barData = [
  { name: "A", uv: 4000, pv: 2400 },
  { name: "B", uv: 3000, pv: 1398 },
  { name: "C", uv: 2000, pv: 9800 },
  { name: "D", uv: 2780, pv: 3908 },
  { name: "E", uv: 1890, pv: 4800 },
];

const pieData = [
  { name: "Group A", value: 400 },
  { name: "Group B", value: 300 },
  { name: "Group C", value: 300 },
  { name: "Group D", value: 200 },
];

const meta: Meta<typeof LineChart> = {
  title: "Design System/Molecules/Charts",
  component: LineChart,
  tags: ["autodocs"],
  parameters: { layout: "padded", storyMedium: true },
  argTypes: {
    height: { control: { type: "number", min: 120, max: 600 } },
    width: { control: "text" },
    theme: { control: "radio", options: ["light", "dark"] },
    showGrid: { control: "boolean" },
    showLegend: { control: "boolean" },
    showTooltip: { control: "boolean" },
    showCrosshair: { control: "boolean" },
    legendPosition: { control: "select", options: ["top", "bottom", "left", "right"] },
    curve: { control: "select", options: ["linear", "monotone", "step", "stepBefore", "stepAfter"] },
    showDots: { control: "boolean" },
    strokeWidth: { control: { type: "number", min: 1, max: 6 } },
    dotSize: { control: { type: "number", min: 0, max: 12 } },
    chartAnimation: { control: "boolean" },
    data: { control: false },
    series: { control: false },
    xAxisKey: { control: "text" },
    colors: { control: false },
  },
};

export default meta;

type Story = StoryObj<typeof LineChart>;

export const Playground: Story = {
  render: (args) => <LineChart {...args} />,
  args: {
    data: lineData,
    xAxisKey: "name",
    series: [
      { dataKey: "uv", name: "UV" },
      { dataKey: "pv", name: "PV" },
    ],
    width: "100%",
    height: 300,
    showGrid: true,
    showTooltip: true,
    showLegend: true,
    legendPosition: "bottom",
    theme: "light",
    chartAnimation: true,
    showDots: true,
    curve: "monotone",
  },
};

export const LineChartDefault: StoryObj<typeof LineChart> = {
  render: (args) => <LineChart {...args} />,
  args: {
    data: lineData,
    xAxisKey: "name",
    series: [
      { dataKey: "uv", name: "UV" },
      { dataKey: "pv", name: "PV" },
    ],
    width: "100%",
    height: 300,
    showGrid: true,
    showTooltip: true,
    showLegend: true,
    legendPosition: "bottom",
  },
};

export const LineChartCustomColors: StoryObj<typeof LineChart> = {
  render: (args) => <LineChart {...args} />,
  args: {
    data: lineData,
    xAxisKey: "name",
    series: [
      { dataKey: "uv", name: "UV", color: "var(--color-accent-lavender-40)" },
      { dataKey: "pv", name: "PV", color: "var(--color-state-success)" },
    ],
    colors: ["var(--color-accent-lavender-40)", "var(--color-state-success)", "var(--color-state-warning)"],
    curve: "monotone",
    dotSize: 6,
    showDots: true,
    strokeWidth: 3,
    height: 320,
  },
};

export const BarChartDefault: StoryObj<typeof BarChart> = {
  render: (args) => <BarChart {...args} />,
  args: {
    data: barData,
    xAxisKey: "name",
    series: [
      { dataKey: "uv", name: "UV" },
      { dataKey: "pv", name: "PV" },
    ],
    layout: "vertical",
    barSize: 24,
    barGap: 8,
    radius: 4,
    height: 300,
  },
};

export const BarChartHorizontal: StoryObj<typeof BarChart> = {
  render: (args) => <BarChart {...args} />,
  args: {
    data: barData,
    xAxisKey: "name",
    series: [{ dataKey: "uv", name: "UV" }],
    layout: "horizontal",
    barSize: 20,
    height: 280,
  },
};

export const PieChartDefault: StoryObj<typeof PieChart> = {
  render: (args) => <PieChart {...args} />,
  args: {
    data: pieData,
    innerRadius: 0,
    outerRadius: "80%",
    showLabels: false,
    paddingAngle: 0,
    width: 320,
    height: 320,
  },
};

export const PieChartDonut: StoryObj<typeof PieChart> = {
  render: (args) => <PieChart {...args} />,
  args: {
    data: pieData,
    innerRadius: "60%",
    outerRadius: "80%",
    showLabels: true,
    paddingAngle: 2,
    width: 320,
    height: 320,
  },
};

export const AreaChartDefault: StoryObj<typeof AreaChart> = {
  render: (args) => <AreaChart {...args} />,
  args: {
    data: lineData,
    xAxisKey: "name",
    series: [
      { dataKey: "uv", name: "UV" },
      { dataKey: "pv", name: "PV" },
    ],
    stacked: false,
    curve: "monotone",
    strokeWidth: 2,
    height: 300,
  },
};

export const AreaChartStacked: StoryObj<typeof AreaChart> = {
  render: (args) => <AreaChart {...args} />,
  args: {
    data: lineData,
    xAxisKey: "name",
    series: [
      { dataKey: "uv", name: "UV" },
      { dataKey: "pv", name: "PV" },
    ],
    stacked: true,
    curve: "monotone",
    height: 300,
  },
};

/** Entrance animation (default `chartAnimation: true`); use `false` for static / tests. */
export const ChartAnimationsAnimated: StoryObj = {
  render: () => (
    <div style={{ display: "grid", gap: 32, maxWidth: 900 }}>
      <div>
        <h3 style={{ fontSize: 14, marginBottom: 8 }}>Line + area (stroke draw / fill fade)</h3>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 24 }}>
          <LineChart
            data={lineData}
            xAxisKey="name"
            series={[
              { dataKey: "uv", name: "UV" },
              { dataKey: "pv", name: "PV" },
            ]}
            height={220}
            chartAnimation={{ durationMs: 900, easing: "ease-out" }}
          />
          <AreaChart
            data={lineData}
            xAxisKey="name"
            series={[{ dataKey: "uv", name: "UV" }]}
            height={220}
            chartAnimation={{ durationMs: 850, easing: "ease-out" }}
          />
        </div>
      </div>
      <div>
        <h3 style={{ fontSize: 14, marginBottom: 8 }}>Bar (grow; stagger optional)</h3>
        <BarChart
          data={barData}
          xAxisKey="name"
          series={[
            { dataKey: "uv", name: "UV" },
            { dataKey: "pv", name: "PV" },
          ]}
          height={260}
          chartAnimation={{ durationMs: 700, barStagger: true }}
        />
      </div>
      <div>
        <h3 style={{ fontSize: 14, marginBottom: 8 }}>Pie / donut (scale-in)</h3>
        <PieChart
          data={pieData}
          innerRadius="55%"
          outerRadius="80%"
          showLabels
          width={300}
          height={300}
          chartAnimation={{ durationMs: 750, easing: "ease-out" }}
        />
      </div>
    </div>
  ),
};

export const ChartAnimationsOff: StoryObj<typeof LineChart> = {
  render: (args) => <LineChart {...args} />,
  args: {
    data: lineData,
    xAxisKey: "name",
    series: [{ dataKey: "uv", name: "UV" }],
    chartAnimation: false,
    height: 240,
    showLegend: true,
  },
};

// ---------------------------------------------------------------------------
// 0.0.4 — formatters, axes, per-bar colours, stacked bars, pie angles, ComposedChart
// ---------------------------------------------------------------------------

const money = (v: number) => `$${(v / 1000).toFixed(1)}k`;

const dailyData = Array.from({ length: 14 }, (_, i) => ({
  date: `2026-03-${String(i + 1).padStart(2, "0")}`,
  revenue: 2000 + Math.round(Math.sin(i / 2) * 900 + i * 120),
  margin: 18 + Math.round(Math.cos(i / 3) * 6),
}));

/** `valueFormatter` (Y ticks + tooltip), `xTickFormatter`, `labelFormatter`, `xTickAngle`, `xTickInterval`. */
export const LineChartFormatters: StoryObj<typeof LineChart> = {
  render: (args) => <LineChart {...args} />,
  args: {
    data: dailyData,
    xAxisKey: "date",
    series: [{ dataKey: "revenue", name: "Revenue" }],
    valueFormatter: money,
    xTickFormatter: (v) => String(v).slice(5),
    labelFormatter: (v) =>
      new Date(String(v)).toLocaleDateString(undefined, { weekday: "long", day: "numeric", month: "long" }),
    xTickAngle: -45,
    xTickInterval: "auto",
    margin: { top: 10, right: 20, bottom: 60, left: 56 },
    height: 320,
  },
};

/** Series with `yAxis: "right"` get an independently scaled right axis. */
export const LineChartDualAxis: StoryObj<typeof LineChart> = {
  render: (args) => <LineChart {...args} />,
  args: {
    data: dailyData,
    xAxisKey: "date",
    series: [
      { dataKey: "revenue", name: "Revenue" },
      { dataKey: "margin", name: "Margin %", yAxis: "right", strokeDasharray: "5 5" },
    ],
    yTickFormatter: money,
    rightYTickFormatter: (v) => `${v}%`,
    valueFormatter: (v, key) => (key === "margin" ? `${v}%` : money(v)),
    xTickFormatter: (v) => String(v).slice(8),
    margin: { top: 10, right: 48, bottom: 30, left: 56 },
    height: 320,
  },
};

/** Per-bar colours via `getBarColor` (recharts `<Cell>`), formatted value axis. */
export const BarChartPerBarColors: StoryObj<typeof BarChart> = {
  render: (args) => <BarChart {...args} />,
  args: {
    data: barData,
    xAxisKey: "name",
    series: [{ dataKey: "pv", name: "PV" }],
    getBarColor: (d) => ((d.pv as number) > 4000 ? "var(--color-state-error)" : "var(--color-state-success)"),
    valueFormatter: money,
    showLegend: false,
    margin: { top: 10, right: 20, bottom: 30, left: 56 },
    height: 300,
  },
};

export const BarChartStacked: StoryObj<typeof BarChart> = {
  render: (args) => <BarChart {...args} />,
  args: {
    data: barData,
    xAxisKey: "name",
    series: [
      { dataKey: "uv", name: "UV" },
      { dataKey: "pv", name: "PV" },
    ],
    stacked: true,
    valueFormatter: money,
    margin: { top: 10, right: 20, bottom: 30, left: 56 },
    height: 300,
  },
};

/**
 * `orientation="horizontal-bars"` — unambiguous alias for `layout="horizontal"`
 * (library `layout` is the opposite of recharts' `layout`). Categories sit on the left.
 */
export const BarChartHorizontalBars: StoryObj<typeof BarChart> = {
  render: (args) => <BarChart {...args} />,
  args: {
    data: [
      { name: "Revenue", count: 42 },
      { name: "Intercompany", count: 18 },
      { name: "FX", count: 9 },
      { name: "Equity", count: 4 },
    ],
    xAxisKey: "name",
    series: [{ dataKey: "count", name: "Anomalies" }],
    orientation: "horizontal-bars",
    showYAxis: true,
    margin: { top: 10, right: 20, bottom: 30, left: 96 },
    height: 260,
  },
};

/** Donut with `centerLabel`, `"name (xx%)"` outside labels, semi-circle via `startAngle`/`endAngle`. */
export const PieChartDonutAndAngles: StoryObj = {
  render: () => (
    <div style={{ display: "flex", flexWrap: "wrap", gap: 24 }}>
      <PieChart
        data={pieData}
        innerRadius="60%"
        outerRadius="75%"
        width={360}
        height={320}
        showLabels
        labelPosition="outside"
        labelFormatter={pieLabelNamePercent}
        valueFormatter={(v) => `${v} AED`}
        legendPosition="bottom"
        centerLabel={
          <div>
            <div style={{ fontSize: "var(--text-small-size)", color: "var(--color-text-secondary)" }}>Total</div>
            <div style={{ fontWeight: 600 }}>1,200</div>
          </div>
        }
      />
      <PieChart
        data={pieData}
        innerRadius="55%"
        startAngle={-90}
        endAngle={90}
        width={360}
        height={320}
        legendPosition="bottom"
        centerLabel={<strong>Gauge</strong>}
      />
    </div>
  ),
};

const forecastData = [
  { m: "Jan", actual: 120, forecast: 118, lo: 110, hi: 126 },
  { m: "Feb", actual: 132, forecast: 130, lo: 120, hi: 140 },
  { m: "Mar", actual: 128, forecast: 136, lo: 124, hi: 150 },
  { m: "Apr", forecast: 142, lo: 126, hi: 160 },
  { m: "May", forecast: 150, lo: 130, hi: 172 },
];

/** Bar + dashed line + confidence band (`type: "range"` between `dataKey` and `upperDataKey`). */
export const ComposedChartForecast: StoryObj<typeof ComposedChart> = {
  render: (args) => <ComposedChart {...args} />,
  args: {
    data: forecastData,
    xAxisKey: "m",
    series: [
      { type: "range", dataKey: "lo", upperDataKey: "hi", name: "80% confidence" },
      { type: "bar", dataKey: "actual", name: "Actual" },
      { type: "line", dataKey: "forecast", name: "Forecast", strokeDasharray: "5 5" },
    ],
    valueFormatter: (v) => `${v}k`,
    margin: { top: 10, right: 20, bottom: 30, left: 48 },
    height: 320,
  },
};

export const ComposedChartDualAxis: StoryObj<typeof ComposedChart> = {
  render: (args) => <ComposedChart {...args} />,
  args: {
    data: dailyData.slice(0, 8),
    xAxisKey: "date",
    series: [
      { type: "bar", dataKey: "revenue", name: "Revenue" },
      { type: "line", dataKey: "margin", name: "Margin %", yAxis: "right" },
    ],
    yTickFormatter: money,
    rightYTickFormatter: (v) => `${v}%`,
    valueFormatter: (v, key) => (key === "margin" ? `${v}%` : money(v)),
    xTickFormatter: (v) => String(v).slice(5),
    margin: { top: 10, right: 48, bottom: 30, left: 56 },
    height: 320,
  },
};
