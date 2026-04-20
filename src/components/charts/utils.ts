import type { ChartDataPoint, ChartDataSeries } from "./Chart.types";

/** Get min/max for numeric values across series */
export function getValueExtent(
  data: ChartDataPoint[],
  series: ChartDataSeries[],
  stacked = false
): [number, number] {
  let min = Infinity;
  let max = -Infinity;
  if (stacked) {
    min = 0;
    for (const row of data) {
      let sum = 0;
      for (const s of series) {
        const v = row[s.dataKey];
        sum += typeof v === "number" ? (v as number) : 0;
      }
      if (sum > max) max = sum;
    }
  } else {
    for (const row of data) {
      for (const s of series) {
        const v = row[s.dataKey];
        if (typeof v === "number") {
          const n = v as number;
          if (n < min) min = n;
          if (n > max) max = n;
        }
      }
    }
  }
  if (min === Infinity) min = 0;
  if (max === -Infinity) max = 100;
  if (min === max) max = min + 1;
  return [min, max];
}

/** Linear scale */
export function scaleLinear(
  domain: [number, number],
  range: [number, number]
): (v: number) => number {
  const [d0, d1] = domain;
  const [r0, r1] = range;
  const k = (r1 - r0) / (d1 - d0);
  return (v: number) => r0 + (v - d0) * k;
}

/** Create SVG path for line (monotone) */
export function linePath(
  points: { x: number; y: number }[],
  curve: "linear" | "monotone" | "step" | "stepBefore" | "stepAfter"
): string {
  if (points.length === 0) return "";
  if (points.length === 1) return `M ${points[0].x} ${points[0].y}`;

  if (curve === "linear") {
    return points.map((p, i) => (i === 0 ? `M ${p.x} ${p.y}` : `L ${p.x} ${p.y}`)).join(" ");
  }

  if (curve === "step" || curve === "stepBefore" || curve === "stepAfter") {
    const parts: string[] = [`M ${points[0].x} ${points[0].y}`];
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

  // monotone: Catmull-Rom / cubic bezier approximation
  const d: string[] = [`M ${points[0].x} ${points[0].y}`];
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

/** Create SVG path for area (closed path under line) */
export function areaPath(
  points: { x: number; y: number }[],
  baseY: number,
  curve: "linear" | "monotone" | "step" | "stepBefore" | "stepAfter"
): string {
  if (points.length === 0) return "";
  const line = linePath(points, curve);
  const close = `L ${points[points.length - 1].x} ${baseY} L ${points[0].x} ${baseY} Z`;
  return line + " " + close;
}

/** Convert angle to radians */
export function degToRad(deg: number): number {
  return (deg * Math.PI) / 180;
}

/** Polar to Cartesian (0° = 12 o'clock, 90° = 3 o'clock, clockwise) */
export function polarToCartesian(
  cx: number,
  cy: number,
  r: number,
  angleDeg: number
): { x: number; y: number } {
  const rad = degToRad(angleDeg - 90);
  return { x: cx + r * Math.cos(rad), y: cy + r * Math.sin(rad) };
}

/** SVG arc path for pie slice (angles in degrees, 0 = 12 o'clock, clockwise) */
export function arcPath(
  cx: number,
  cy: number,
  r: number,
  startAngleDeg: number,
  endAngleDeg: number,
  innerRadius = 0
): string {
  const span = endAngleDeg - startAngleDeg;
  if (span <= 0) return "";

  const start = polarToCartesian(cx, cy, r, startAngleDeg);
  const end = polarToCartesian(cx, cy, r, endAngleDeg);
  const largeArc = span >= 180 ? 1 : 0;
  const sweep = 1; // clockwise

  if (innerRadius <= 0) {
    return `M ${cx} ${cy} L ${start.x} ${start.y} A ${r} ${r} 0 ${largeArc} ${sweep} ${end.x} ${end.y} Z`;
  }

  const innerStart = polarToCartesian(cx, cy, innerRadius, startAngleDeg);
  const innerEnd = polarToCartesian(cx, cy, innerRadius, endAngleDeg);
  const innerLargeArc = span >= 180 ? 1 : 0;
  return `M ${innerStart.x} ${innerStart.y} L ${start.x} ${start.y} A ${r} ${r} 0 ${largeArc} ${sweep} ${end.x} ${end.y} L ${innerEnd.x} ${innerEnd.y} A ${innerRadius} ${innerRadius} 0 ${innerLargeArc} 0 ${innerStart.x} ${innerStart.y} Z`;
}
