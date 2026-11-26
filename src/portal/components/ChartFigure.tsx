import React, { useId, useRef } from "react";
import { useElementWidth, useInViewOnce } from "./motion";

export interface ChartTableColumn {
  key: string;
  label: string;
  /** Right-aligned numeric column. */
  numeric?: boolean;
}

export interface ChartFigureProps {
  title: string;
  description: React.ReactNode;
  /** Data source line under the chart (where the numbers come from). */
  source: React.ReactNode;
  /** Chart height in px (reserved before the chart mounts → no layout shift). */
  height?: number;
  /** Rows + columns for the accessible data-table fallback. */
  table: { columns: ChartTableColumn[]; rows: Record<string, string | number>[] };
  /** Renders the chart at the measured width once the figure is in view. */
  children: (width: number) => React.ReactNode;
  className?: string;
}

/**
 * Chart frame for the portal: titled `<figure>`, the SVG chart (decorative for AT — it has no
 * accessible structure of its own), and the same numbers as a real `<table>` in a disclosure.
 * The chart mounts when the figure scrolls into view so the library's own entrance animation
 * (which honours reduced motion) plays where the reader can see it.
 */
export function ChartFigure({ title, description, source, height = 260, table, children, className }: ChartFigureProps) {
  const id = useId();
  const frameRef = useRef<HTMLDivElement>(null);
  const width = useElementWidth(frameRef);
  const inView = useInViewOnce(frameRef);
  return (
    <figure className={["pt-chart", className].filter(Boolean).join(" ")} aria-labelledby={`${id}-t`} aria-describedby={`${id}-d`}>
      <div className="pt-chart__head">
        <h3 id={`${id}-t`} className="pt-chart__title">
          {title}
        </h3>
        <p id={`${id}-d`} className="pt-chart__desc">
          {description}
        </p>
      </div>
      <div ref={frameRef} className="pt-chart__frame" style={{ minHeight: height }} aria-hidden="true">
        {inView ? children(width) : null}
      </div>
      <figcaption className="pt-chart__source">{source}</figcaption>
      <details className="pt-chart__data">
        <summary>View data table</summary>
        <div className="pt-table-scroll" tabIndex={0} role="region" aria-label={`${title} data`}>
          <table className="pt-data-table">
            <caption className="pt-sr-only">{title}</caption>
            <thead>
              <tr>
                {table.columns.map((c) => (
                  <th key={c.key} scope="col" data-numeric={c.numeric ? "true" : undefined}>
                    {c.label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {table.rows.map((r, i) => (
                <tr key={i}>
                  {table.columns.map((c, ci) =>
                    ci === 0 ? (
                      <th key={c.key} scope="row">
                        {r[c.key]}
                      </th>
                    ) : (
                      <td key={c.key} data-numeric={c.numeric ? "true" : undefined}>
                        {r[c.key]}
                      </td>
                    ),
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </details>
    </figure>
  );
}
