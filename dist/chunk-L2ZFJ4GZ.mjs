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

export {
  getValueExtent,
  linePath,
  areaPath,
  polarToCartesian,
  arcPath
};
//# sourceMappingURL=chunk-L2ZFJ4GZ.mjs.map