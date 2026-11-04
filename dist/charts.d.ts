import React__default from 'react';

/** Single data point for Cartesian charts (Line, Bar, Area) */
interface ChartDataPoint {
    [key: string]: string | number | undefined;
}
/** Data series config: which keys to plot and their display options */
interface ChartDataSeries {
    dataKey: string;
    name?: string;
    color?: string;
    strokeWidth?: number;
    /**
     * Which Y axis this series is plotted against (Line / Area / Bar / Composed).
     * Any `"right"` series turns on a second, independently scaled Y axis on the right.
     * @default "left"
     */
    yAxis?: ChartYAxisSide;
    /** SVG dash pattern for line strokes, e.g. `"5 5"` (Line / Composed line series). */
    strokeDasharray?: string;
}
/** Y axis a series is bound to. */
type ChartYAxisSide = "left" | "right";
/** Formats a numeric value (Y tick or tooltip value). `dataKey` is set for tooltip values. */
type ChartValueFormatter = (value: number, dataKey?: string) => string;
/** Formats an X-axis tick from the raw `xAxisKey` value of the datum. */
type ChartXTickFormatter = (value: string | number | undefined, index: number) => string;
/** Formats the tooltip heading from the raw `xAxisKey` value of the hovered datum. */
type ChartLabelFormatter = (value: string | number | undefined, datum: ChartDataPoint, index: number) => string;
/**
 * Axis / formatting props shared by the cartesian charts (Line, Bar, Area, Composed).
 * All optional; omitting them keeps the pre-0.0.4 rendering.
 */
interface CartesianAxisProps {
    /**
     * Formats Y-axis tick labels **and** tooltip values (`(value, dataKey) => string`).
     * Passing it turns the Y axis on (see `showYAxis`).
     */
    valueFormatter?: ChartValueFormatter;
    /** Y tick labels only (left axis); overrides `valueFormatter` for ticks. */
    yTickFormatter?: (value: number) => string;
    /** Right Y axis tick labels (dual-axis charts). Falls back to `yTickFormatter` → `valueFormatter`. */
    rightYTickFormatter?: (value: number) => string;
    /** Formats X tick labels from the raw `xAxisKey` value. */
    xTickFormatter?: ChartXTickFormatter;
    /** Formats the tooltip heading. Defaults to the raw `xAxisKey` value. */
    labelFormatter?: ChartLabelFormatter;
    /** Alias of `labelFormatter` (recharts naming). `labelFormatter` wins when both are set. */
    tooltipLabelFormatter?: ChartLabelFormatter;
    /**
     * Rotation of X tick labels in degrees (e.g. `-45`). Rotated labels are end-anchored at the
     * tick; increase `margin.bottom` (≈ 60) so they are not clipped. @default 0
     */
    xTickAngle?: number;
    /**
     * Show every (n+1)-th X tick label — recharts `interval` semantics: `0` = all, `1` = every other.
     * `"auto"` skips labels so they don't overlap at the chart width. @default 0
     */
    xTickInterval?: number | "auto";
    /**
     * Render Y-axis tick labels. Defaults to `true` when `valueFormatter` / `yTickFormatter` is set
     * or a series uses `yAxis: "right"`, otherwise `false` (pre-0.0.4 look).
     */
    showYAxis?: boolean;
    /** Approximate number of Y ticks (nice-rounded). @default 5 */
    yTickCount?: number;
}
/** Chart theme for light/dark backgrounds */
type ChartTheme = "light" | "dark";
/** Single row in a cartesian chart tooltip */
interface ChartTooltipItem {
    name: string;
    value: number;
    color: string;
    /** Pre-formatted value text; rendered instead of `value` when set. */
    displayValue?: string;
}
/** Easing presets for chart entrance (CSS-like names; implemented in `useChartAnimation.ts`). */
type ChartEasingPreset = "linear" | "ease-in" | "ease-out" | "ease-in-out" | "default";
/**
 * Optional entrance animation (line stroke draw, area fill fade, bar grow, pie scale).
 * Respects `prefers-reduced-motion` in the browser.
 */
interface ChartAnimationConfig {
    /** @default true */
    enabled?: boolean;
    /** Duration in milliseconds @default ~750 line/area/pie, ~600 bar */
    durationMs?: number;
    easing?: ChartEasingPreset;
    /** Bar chart: grow bars in sequence (left to right) */
    barStagger?: boolean;
}
/** `true` = default animation; `false` = off; object = fine-tune */
type ChartAnimationOption = boolean | ChartAnimationConfig;
/** Shared chart layout props */
interface ChartLayoutProps {
    width?: number | string;
    height?: number | string;
    margin?: {
        top?: number;
        right?: number;
        bottom?: number;
        left?: number;
    };
    showGrid?: boolean;
    gridColor?: string;
    showTooltip?: boolean;
    showLegend?: boolean;
    legendPosition?: "top" | "bottom" | "left" | "right";
    /** Theme for tooltip, legend, axis labels. Use "dark" on dark surfaces. */
    theme?: ChartTheme;
    /**
     * Tooltip follows the pointer with edge clamping (no centered jump).
     * @default true
     */
    tooltipFollowPointer?: boolean;
    /**
     * Fade/slide-in and smooth position transitions.
     * @default true
     */
    tooltipAnimation?: boolean;
    /**
     * Vertical crosshair + highlighted points at the active x (Line / Area only).
     * @default true
     */
    showCrosshair?: boolean;
    /**
     * Entrance animation: stroke draw (line / area outline), fill fade (area), bar grow, pie donut scale-out.
     * `true` = defaults; `false` = static; passes design tokens timings via `{ durationMs, easing }`.
     * Honors `prefers-reduced-motion`.
     */
    chartAnimation?: ChartAnimationOption;
    className?: string;
    style?: React__default.CSSProperties;
}
/** Theme-based colors for tooltip, legend, axis, grid */
declare const CHART_THEME_COLORS: {
    light: {
        tooltipBg: string;
        tooltipBorder: string;
        tooltipText: string;
        legendText: string;
        axisText: string;
        gridColor: string;
    };
    dark: {
        tooltipBg: string;
        tooltipBorder: string;
        tooltipText: string;
        legendText: string;
        axisText: string;
        gridColor: string;
    };
};
/** Default color palette (design system tokens) */
declare const CHART_COLORS: string[];

interface LineChartProps extends ChartLayoutProps, CartesianAxisProps {
    data: ChartDataPoint[];
    xAxisKey?: string;
    series: ChartDataSeries[];
    colors?: string[];
    curve?: "linear" | "monotone" | "step" | "stepBefore" | "stepAfter";
    dotSize?: number;
    showDots?: boolean;
    strokeWidth?: number;
}
declare const _default$3: React__default.NamedExoticComponent<LineChartProps>;

/** Unambiguous bar direction (see `BarChartProps.orientation`). */
type BarChartOrientation = "vertical-bars" | "horizontal-bars";
interface BarChartProps extends ChartLayoutProps, CartesianAxisProps {
    data: ChartDataPoint[];
    xAxisKey?: string;
    series: ChartDataSeries[];
    colors?: string[];
    /**
     * Bar direction — **library semantics, the opposite of recharts' `layout`**:
     * - `"vertical"` (default) = vertical bars / columns, categories along the X axis
     *   (recharts `layout="horizontal"`).
     * - `"horizontal"` = horizontal bars, categories down the left edge
     *   (recharts `layout="vertical"`).
     *
     * Prefer the unambiguous `orientation` prop; when both are set `orientation` wins.
     */
    layout?: "vertical" | "horizontal";
    /**
     * Unambiguous alias of `layout`: `"vertical-bars"` = columns (categories on X),
     * `"horizontal-bars"` = bars growing left→right (categories on Y). Wins over `layout`.
     */
    orientation?: BarChartOrientation;
    barSize?: number;
    barGap?: number;
    barCategoryGap?: number | string;
    radius?: number | [number, number, number, number];
    /**
     * Stack series on top of each other (positive values up, negatives down).
     * With dual axes, left- and right-axis series form two side-by-side stacks.
     */
    stacked?: boolean;
    /**
     * Per-bar colour (recharts `<Cell>` equivalent). Return `undefined` to fall back to
     * `colorKey` → `series.color` → `colors`.
     */
    getBarColor?: (datum: ChartDataPoint, index: number, dataKey: string) => string | undefined;
    /**
     * Name of a datum field holding a per-bar colour (e.g. `"fill"` or `"color"`).
     * Used when `getBarColor` is not set or returns `undefined`.
     */
    colorKey?: string;
}
declare const _default$2: React__default.NamedExoticComponent<BarChartProps>;

interface PieChartDataPoint {
    name: string;
    value: number;
    /** Per-slice colour; overrides `colors[i]`. */
    color?: string;
}
/** Slice info passed to `PieChartProps.labelFormatter`. */
interface PieLabelInfo {
    name: string;
    value: number;
    /** Share of the total, 0–100. */
    percent: number;
    index: number;
}
/** Ready-made slice label: `"Name (42%)"`. */
declare const pieLabelNamePercent: ({ name, percent }: PieLabelInfo) => string;
interface PieChartProps extends Omit<ChartLayoutProps, "showGrid"> {
    data: PieChartDataPoint[];
    innerRadius?: number | string;
    outerRadius?: number | string;
    colors?: string[];
    showLabels?: boolean;
    showLabelLine?: boolean;
    paddingAngle?: number;
    /**
     * Where the sweep starts, in degrees. **Library convention: 0° = 12 o'clock, increasing
     * clockwise** (recharts uses 0° = 3 o'clock counter-clockwise). Semi-donut gauge:
     * `startAngle={-90} endAngle={90}`. @default 0
     */
    startAngle?: number;
    /** Where the sweep ends (same convention). `endAngle < startAngle` sweeps counter-clockwise. @default 360 */
    endAngle?: number;
    /** Content centred over the chart (e.g. a total inside a donut). Not interactive. */
    centerLabel?: React__default.ReactNode;
    /**
     * Text for each slice label when `showLabels` is on. Default `"42%"`.
     * Use `pieLabelNamePercent` for `"Name (42%)"`.
     */
    labelFormatter?: (slice: PieLabelInfo) => string;
    /** `"inside"` (default) centres labels in the ring; `"outside"` draws them beyond the rim (with `showLabelLine`). */
    labelPosition?: "inside" | "outside";
    /** Formats slice values in the tooltip and legend (`(value, name) => string`). */
    valueFormatter?: (value: number, name?: string) => string;
}
declare const _default$1: React__default.NamedExoticComponent<PieChartProps>;

interface AreaChartProps extends ChartLayoutProps, CartesianAxisProps {
    data: ChartDataPoint[];
    xAxisKey?: string;
    series: ChartDataSeries[];
    colors?: string[];
    /** Stack all series on the left axis (`yAxis: "right"` is ignored while stacked). */
    stacked?: boolean;
    curve?: "linear" | "monotone" | "step" | "stepBefore" | "stepAfter";
    strokeWidth?: number;
}
declare const _default: React__default.NamedExoticComponent<AreaChartProps>;

type Curve = "linear" | "monotone" | "step" | "stepBefore" | "stepAfter";
/** How a ComposedChart series is drawn. */
type ComposedSeriesType = "bar" | "line" | "area" | "range";
interface ComposedChartSeries extends ChartDataSeries {
    /**
     * - `bar` — grouped (or `stackedBars`) bars
     * - `line` — line (use `strokeDasharray` for dashed)
     * - `area` — filled area down to the zero line
     * - `range` — confidence / min–max band filled **between `dataKey` (lower) and `upperDataKey` (upper)**
     */
    type: ComposedSeriesType;
    /** `range` only: datum key of the upper bound (`dataKey` is the lower bound). */
    upperDataKey?: string;
    /** Fill opacity for `area` (default 0.3) and `range` (default 0.2) series. */
    fillOpacity?: number;
    /** Per-series curve for `line` / `area` / `range` (defaults to the chart `curve`). */
    curve?: Curve;
    /** Dots on `line` series (defaults to the chart `showDots`). */
    showDots?: boolean;
}
interface ComposedChartProps extends ChartLayoutProps, CartesianAxisProps {
    data: ChartDataPoint[];
    xAxisKey?: string;
    series: ComposedChartSeries[];
    colors?: string[];
    curve?: Curve;
    /** @default true */
    showDots?: boolean;
    dotSize?: number;
    strokeWidth?: number;
    barSize?: number;
    barGap?: number;
    barCategoryGap?: number | string;
    radius?: number;
    /** Stack all `bar` series that share an axis. */
    stackedBars?: boolean;
}
/**
 * Mixed bar + line + area chart with optional dual Y axes and range (confidence) bands —
 * the native-SVG counterpart of recharts `ComposedChart`.
 */
declare const ComposedChart: React__default.NamedExoticComponent<ComposedChartProps>;

interface ChartTooltipProps {
    theme: ChartTheme;
    open: boolean;
    pointerX: number;
    pointerY: number;
    containerWidth: number;
    containerHeight: number;
    label: string;
    items: ChartTooltipItem[];
    animation?: boolean;
    followPointer?: boolean;
}
declare const ChartTooltip: React__default.NamedExoticComponent<ChartTooltipProps>;

export { _default as AreaChart, AreaChartProps, _default$2 as BarChart, BarChartOrientation, BarChartProps, CHART_COLORS, CHART_THEME_COLORS, CartesianAxisProps, ChartAnimationConfig, ChartAnimationOption, ChartDataPoint, ChartDataSeries, ChartEasingPreset, ChartLabelFormatter, ChartLayoutProps, ChartTheme, ChartTooltip, ChartTooltipItem, ChartTooltipProps, ChartValueFormatter, ChartXTickFormatter, ChartYAxisSide, ComposedChart, ComposedChartProps, ComposedChartSeries, ComposedSeriesType, _default$3 as LineChart, LineChartProps, _default$1 as PieChart, PieChartDataPoint, PieChartProps, PieLabelInfo, pieLabelNamePercent };
