import type { Meta, StoryObj } from "@storybook/react";
import { LineChart, BarChart, PieChart, AreaChart } from "./index";

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

const meta: Meta = {
  title: "Design System/Molecules/Charts",
  tags: ["autodocs"],
  parameters: { layout: "padded", storyMedium: true },
};

export default meta;

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
