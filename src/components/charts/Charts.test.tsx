import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import LineChart from "./LineChart";
import BarChart from "./BarChart";
import AreaChart from "./AreaChart";
import PieChart, { pieLabelNamePercent } from "./PieChart";
import ComposedChart from "./ComposedChart";
import { niceTicks, xTickIndices } from "./cartesian";

const data = [
  { name: "2026-01-01", a: 1000, b: 20 },
  { name: "2026-02-01", a: 2500, b: 35 },
  { name: "2026-03-01", a: 1800, b: 10 },
  { name: "2026-04-01", a: 3000, b: 50 },
];
const series = [
  { dataKey: "a", name: "Revenue" },
  { dataKey: "b", name: "Margin" },
];
const money = (v: number) => `$${(v / 1000).toFixed(1)}k`;

function texts(container: HTMLElement, selector: string): string[] {
  return Array.from(container.querySelectorAll(`${selector} text`)).map((t) => t.textContent ?? "");
}

describe("cartesian helpers", () => {
  it("niceTicks rounds domain and ticks", () => {
    const { domain, ticks } = niceTicks(3, 97, 5);
    expect(domain).toEqual([0, 100]);
    expect(ticks).toEqual([0, 20, 40, 60, 80, 100]);
  });

  it("xTickIndices honours numeric interval and auto", () => {
    expect(xTickIndices(["a", "b", "c", "d", "e"], 1, 50)).toEqual([0, 2, 4]);
    expect(xTickIndices(["a", "b", "c"], 0, 50)).toEqual([0, 1, 2]);
    // 10-char labels (~65px) in 20px slots → skip.
    expect(xTickIndices(new Array(6).fill("abcdefghij"), "auto", 20).length).toBeLessThan(6);
  });
});

describe("LineChart", () => {
  it("keeps the pre-0.0.4 look by default (no Y axis)", () => {
    const { container } = render(<LineChart data={data} series={series} chartAnimation={false} />);
    expect(container.querySelector(".ds-chart-y-axis")).toBeNull();
    expect(texts(container, ".ds-chart-x-axis")).toEqual(data.map((d) => d.name));
  });

  it("valueFormatter formats Y ticks and tooltip values; labelFormatter formats tooltip heading", () => {
    const { container } = render(
      <LineChart
        data={data}
        series={[{ dataKey: "a", name: "Revenue" }]}
        valueFormatter={money}
        labelFormatter={(v) => `Month of ${v}`}
        chartAnimation={false}
        tooltipAnimation={false}
      />,
    );
    const yTicks = texts(container, ".ds-chart-y-axis--left");
    expect(yTicks.length).toBeGreaterThan(2);
    expect(yTicks.every((t) => t.startsWith("$"))).toBe(true);
    fireEvent.mouseMove(container.querySelector("svg")!, { clientX: 40, clientY: 50 });
    const tip = screen.getByRole("tooltip");
    expect(tip).toHaveTextContent("Month of 2026-01-01");
    expect(tip).toHaveTextContent("$1.0k");
  });

  it("tooltipLabelFormatter is an alias of labelFormatter", () => {
    const { container } = render(
      <LineChart data={data} series={series} tooltipLabelFormatter={() => "ALIAS"} chartAnimation={false} />,
    );
    fireEvent.mouseMove(container.querySelector("svg")!, { clientX: 40, clientY: 50 });
    expect(screen.getByRole("tooltip")).toHaveTextContent("ALIAS");
  });

  it("xTickFormatter, xTickAngle and xTickInterval shape X labels", () => {
    const { container } = render(
      <LineChart
        data={data}
        series={series}
        xTickFormatter={(v) => String(v).slice(5, 7)}
        xTickAngle={-45}
        xTickInterval={1}
        chartAnimation={false}
      />,
    );
    expect(texts(container, ".ds-chart-x-axis")).toEqual(["01", "03"]);
    const first = container.querySelector(".ds-chart-x-axis text")!;
    expect(first.getAttribute("transform")).toMatch(/^rotate\(-45 /);
    expect(container.querySelector(".ds-chart-x-axis")!.getAttribute("text-anchor")).toBe("end");
  });

  it("series yAxis: 'right' renders a second axis with its own formatter", () => {
    const { container } = render(
      <LineChart
        data={data}
        series={[{ dataKey: "a" }, { dataKey: "b", yAxis: "right" }]}
        rightYTickFormatter={(v) => `${v}%`}
        chartAnimation={false}
      />,
    );
    expect(container.querySelector(".ds-chart-y-axis--left")).not.toBeNull();
    const right = texts(container, ".ds-chart-y-axis--right");
    expect(right.length).toBeGreaterThan(1);
    expect(right.every((t) => t.endsWith("%"))).toBe(true);
  });

  it("showYAxis={false} hides the axis even with a formatter", () => {
    const { container } = render(
      <LineChart data={data} series={series} valueFormatter={money} showYAxis={false} chartAnimation={false} />,
    );
    expect(container.querySelector(".ds-chart-y-axis")).toBeNull();
  });
});

describe("AreaChart", () => {
  it("formats tooltip values and Y ticks", () => {
    const { container } = render(
      <AreaChart data={data} series={[{ dataKey: "a" }]} valueFormatter={money} chartAnimation={false} />,
    );
    expect(texts(container, ".ds-chart-y-axis--left").every((t) => t.startsWith("$"))).toBe(true);
    fireEvent.mouseMove(container.querySelector("svg")!, { clientX: 40, clientY: 50 });
    expect(screen.getByRole("tooltip")).toHaveTextContent("$1.0k");
  });

  it("supports a right axis when not stacked", () => {
    const { container } = render(
      <AreaChart data={data} series={[{ dataKey: "a" }, { dataKey: "b", yAxis: "right" }]} chartAnimation={false} />,
    );
    expect(container.querySelector(".ds-chart-y-axis--right")).not.toBeNull();
  });
});

describe("BarChart", () => {
  const bars = (c: HTMLElement) => Array.from(c.querySelectorAll<SVGRectElement>('[data-testid="ds-chart-bar"]'));

  it("getBarColor colours individual bars", () => {
    const { container } = render(
      <BarChart
        data={data}
        series={[{ dataKey: "a" }]}
        getBarColor={(d) => ((d.a as number) > 2000 ? "var(--color-state-success)" : undefined)}
        chartAnimation={false}
      />,
    );
    const fills = bars(container).map((r) => r.getAttribute("fill"));
    expect(fills[1]).toBe("var(--color-state-success)");
    expect(fills[0]).toBe("var(--button-primary-default-bg)");
  });

  it("colorKey reads a colour field on each datum", () => {
    const d = [
      { name: "x", v: 1, fill: "var(--color-state-error)" },
      { name: "y", v: 2, fill: "var(--color-state-warning)" },
    ];
    const { container } = render(<BarChart data={d} series={[{ dataKey: "v" }]} colorKey="fill" chartAnimation={false} />);
    expect(bars(container).map((r) => r.getAttribute("fill"))).toEqual(["var(--color-state-error)", "var(--color-state-warning)"]);
  });

  it("stacked bars share an x position and stack vertically", () => {
    const { container } = render(<BarChart data={data} series={series} stacked chartAnimation={false} />);
    const r = bars(container);
    expect(r).toHaveLength(8);
    expect(r[0].getAttribute("x")).toBe(r[1].getAttribute("x"));
    const bottomOfSecond = Number(r[1].getAttribute("y")) + Number(r[1].getAttribute("height"));
    expect(bottomOfSecond).toBeCloseTo(Number(r[0].getAttribute("y")), 5);
  });

  it("orientation='horizontal-bars' is the same as layout='horizontal' (categories on the left)", () => {
    const a = render(<BarChart data={data} series={[{ dataKey: "a" }]} orientation="horizontal-bars" chartAnimation={false} />);
    const b = render(<BarChart data={data} series={[{ dataKey: "a" }]} layout="horizontal" chartAnimation={false} />);
    expect(a.container.querySelector(".ds-chart-category-axis")).not.toBeNull();
    expect(a.container.innerHTML).toBe(b.container.innerHTML);
  });

  it("orientation='vertical-bars' wins over layout", () => {
    const { container } = render(
      <BarChart data={data} series={[{ dataKey: "a" }]} layout="horizontal" orientation="vertical-bars" chartAnimation={false} />,
    );
    expect(container.querySelector(".ds-chart-category-axis")).toBeNull();
    expect(container.querySelector(".ds-chart-x-axis")).not.toBeNull();
  });

  it("bars grow from zero (tallest bar ≈ plot height, none zero-height)", () => {
    const { container } = render(<BarChart data={data} series={[{ dataKey: "a" }]} width={400} height={300} chartAnimation={false} />);
    const hs = bars(container).map((r) => Number(r.getAttribute("height")));
    expect(Math.min(...hs)).toBeGreaterThan(0);
  });

  it("tooltip uses valueFormatter and labelFormatter; Y ticks formatted", () => {
    const { container } = render(
      <BarChart
        data={data}
        series={[{ dataKey: "a", name: "Revenue" }]}
        valueFormatter={money}
        labelFormatter={(v) => `L:${v}`}
        chartAnimation={false}
      />,
    );
    expect(texts(container, ".ds-chart-y-axis--left").every((t) => t.startsWith("$"))).toBe(true);
    fireEvent.mouseMove(bars(container)[3], { clientX: 10, clientY: 10 });
    const tip = screen.getByRole("tooltip");
    expect(tip).toHaveTextContent("L:2026-04-01");
    expect(tip).toHaveTextContent("$3.0k");
  });

  it("dual axes on vertical bars", () => {
    const { container } = render(
      <BarChart data={data} series={[{ dataKey: "a" }, { dataKey: "b", yAxis: "right" }]} chartAnimation={false} />,
    );
    expect(container.querySelector(".ds-chart-y-axis--right")).not.toBeNull();
  });

  it("xTickAngle rotates category labels", () => {
    const { container } = render(<BarChart data={data} series={[{ dataKey: "a" }]} xTickAngle={-30} chartAnimation={false} />);
    expect(container.querySelector(".ds-chart-x-axis text")!.getAttribute("transform")).toMatch(/rotate\(-30/);
  });
});

describe("PieChart", () => {
  const pie = [
    { name: "A", value: 50 },
    { name: "B", value: 50, color: "var(--color-state-error)" },
  ];

  it("renders centerLabel content", () => {
    render(<PieChart data={pie} innerRadius="60%" centerLabel={<strong>Total 100</strong>} chartAnimation={false} />);
    expect(screen.getByText("Total 100")).toBeInTheDocument();
  });

  it("labelFormatter supports 'name (xx%)' via pieLabelNamePercent, outside position", () => {
    render(
      <PieChart data={pie} showLabels labelFormatter={pieLabelNamePercent} labelPosition="outside" chartAnimation={false} />,
    );
    expect(screen.getByText("A (50%)")).toBeInTheDocument();
    expect(screen.getByText("B (50%)")).toBeInTheDocument();
  });

  it("per-datum colour and valueFormatter in legend", () => {
    const { container } = render(
      <PieChart data={pie} valueFormatter={(v) => `${v} AED`} chartAnimation={false} />,
    );
    expect(screen.getByText("A: 50 AED")).toBeInTheDocument();
    expect(container.querySelectorAll("path")[1].getAttribute("fill")).toBe("var(--color-state-error)");
  });

  it("startAngle/endAngle sweep a half circle starting at 9 o'clock", () => {
    const { container } = render(
      <PieChart data={[{ name: "A", value: 1 }]} startAngle={-90} endAngle={90} width={400} height={300} chartAnimation={false} />,
    );
    const d = container.querySelector("path")!.getAttribute("d")!;
    // cx=200, or = 0.8 * 140 = 112 → start point x = 88 (9 o'clock), end x = 312 (3 o'clock)
    const nums = d.match(/-?\d+(\.\d+)?(e-?\d+)?/g)!.map(Number);
    expect(nums[2]).toBeCloseTo(88, 3);
    expect(nums[nums.length - 2]).toBeCloseTo(312, 3);
  });
});

describe("ComposedChart", () => {
  const cdata = [
    { m: "Jan", actual: 10, forecast: 12, lo: 9, hi: 15 },
    { m: "Feb", actual: 14, forecast: 13, lo: 10, hi: 17 },
    { m: "Mar", actual: 11, forecast: 15, lo: 11, hi: 19 },
  ];

  it("renders bar, line, area and range series together", () => {
    const { container } = render(
      <ComposedChart
        data={cdata}
        xAxisKey="m"
        series={[
          { type: "range", dataKey: "lo", upperDataKey: "hi", name: "Confidence" },
          { type: "bar", dataKey: "actual" },
          { type: "line", dataKey: "forecast", strokeDasharray: "5 5" },
          { type: "area", dataKey: "forecast", name: "Area" },
        ]}
        chartAnimation={false}
      />,
    );
    expect(container.querySelectorAll('[data-series-type="bar"]')).toHaveLength(3);
    expect(container.querySelector('[data-series-type="line"] path')!.getAttribute("stroke-dasharray")).toBe("5 5");
    expect(container.querySelector('[data-series-type="range"]')).not.toBeNull();
    expect(container.querySelector('[data-series-type="area"]')).not.toBeNull();
  });

  it("dual axis + range tooltip shows 'lo – hi'", () => {
    const { container } = render(
      <ComposedChart
        data={cdata}
        xAxisKey="m"
        series={[
          { type: "bar", dataKey: "actual" },
          { type: "range", dataKey: "lo", upperDataKey: "hi", name: "Band", yAxis: "right" },
        ]}
        valueFormatter={(v) => `${v}u`}
        chartAnimation={false}
      />,
    );
    expect(container.querySelector(".ds-chart-y-axis--right")).not.toBeNull();
    fireEvent.mouseMove(container.querySelector('[data-series-type="bar"]')!, { clientX: 5, clientY: 5 });
    const tip = screen.getByRole("tooltip");
    expect(tip).toHaveTextContent("Jan");
    expect(tip).toHaveTextContent("9u – 15u");
    expect(tip).toHaveTextContent("10u");
  });

  it("stackedBars stacks bar series", () => {
    const { container } = render(
      <ComposedChart
        data={cdata}
        xAxisKey="m"
        stackedBars
        series={[
          { type: "bar", dataKey: "actual" },
          { type: "bar", dataKey: "forecast" },
        ]}
        chartAnimation={false}
      />,
    );
    const r = container.querySelectorAll('[data-series-type="bar"]');
    expect(r[0].getAttribute("x")).toBe(r[1].getAttribute("x"));
  });
});
