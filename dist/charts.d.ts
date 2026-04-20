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
}
/** Chart theme for light/dark backgrounds */
type ChartTheme = "light" | "dark";
/** Single row in a cartesian chart tooltip */
interface ChartTooltipItem {
    name: string;
    value: number;
    color: string;
}
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

interface LineChartProps extends ChartLayoutProps {
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

interface BarChartProps extends ChartLayoutProps {
    data: ChartDataPoint[];
    xAxisKey?: string;
    series: ChartDataSeries[];
    colors?: string[];
    layout?: "vertical" | "horizontal";
    barSize?: number;
    barGap?: number;
    barCategoryGap?: number | string;
    radius?: number | [number, number, number, number];
}
declare const _default$2: React__default.NamedExoticComponent<BarChartProps>;

interface PieChartDataPoint {
    name: string;
    value: number;
}
interface PieChartProps extends Omit<ChartLayoutProps, "showGrid"> {
    data: PieChartDataPoint[];
    innerRadius?: number | string;
    outerRadius?: number | string;
    colors?: string[];
    showLabels?: boolean;
    showLabelLine?: boolean;
    paddingAngle?: number;
}
declare const _default$1: React__default.NamedExoticComponent<PieChartProps>;

interface AreaChartProps extends ChartLayoutProps {
    data: ChartDataPoint[];
    xAxisKey?: string;
    series: ChartDataSeries[];
    colors?: string[];
    stacked?: boolean;
    curve?: "linear" | "monotone" | "step" | "stepBefore" | "stepAfter";
    strokeWidth?: number;
}
declare const _default: React__default.NamedExoticComponent<AreaChartProps>;

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

export { _default as AreaChart, AreaChartProps, _default$2 as BarChart, BarChartProps, CHART_COLORS, CHART_THEME_COLORS, ChartDataPoint, ChartDataSeries, ChartLayoutProps, ChartTheme, ChartTooltip, ChartTooltipItem, ChartTooltipProps, _default$3 as LineChart, LineChartProps, _default$1 as PieChart, PieChartDataPoint, PieChartProps };
