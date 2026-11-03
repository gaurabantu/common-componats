"use client";

import React from "react";
import Card from "../Card";
import IconBox from "../../atoms/IconBox";
import { STAT_CARD_DEFAULTS, STAT_TREND_LABEL } from "./StatCard.config";
import type { StatCardProps, StatTrend } from "./StatCard.types";
import "./StatCard.css";

function TrendArrow({ trend }: { trend: StatTrend }) {
  if (trend === "neutral") {
    return (
      <svg viewBox="0 0 12 12" aria-hidden focusable="false">
        <path d="M2 6h8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 12 12" aria-hidden focusable="false">
      <path
        d={trend === "up" ? "M6 10V2M2.5 5.5 6 2l3.5 3.5" : "M6 2v8M2.5 6.5 6 10l3.5-3.5"}
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/**
 * StatCard — KPI tile for dashboards and overview pages. Wraps `Card`, so `variant`,
 * `elevation`, `size`, and `hoverable` behave exactly as on Card.
 */
const StatCard = React.forwardRef<HTMLDivElement, StatCardProps>(function StatCard(
  {
    label,
    value,
    unit,
    icon,
    iconTone = STAT_CARD_DEFAULTS.iconTone,
    delta,
    description,
    footer,
    size = "default",
    ...cardProps
  },
  ref,
) {
  const trend: StatTrend = delta?.trend ?? "neutral";
  const deltaTone =
    trend === "neutral"
      ? "neutral"
      : (trend === "up") !== Boolean(delta?.invert)
        ? "success"
        : "danger";

  return (
    <Card ref={ref} size={size} {...cardProps}>
      <div className="ds-stat" data-size={size}>
        <div className="ds-stat__top">
          <p className="ds-stat__label">{label}</p>
          {icon ? (
            <IconBox tone={iconTone} size={size === "sm" ? "sm" : "md"}>
              {icon}
            </IconBox>
          ) : null}
        </div>
        <p className="ds-stat__value">
          {value}
          {unit ? <span className="ds-stat__unit">{unit}</span> : null}
        </p>
        {delta ? (
          <span className="ds-stat__delta">
            <span className="ds-stat__delta-value" data-tone={deltaTone}>
              <TrendArrow trend={trend} />
              <span className="ds-stat__sr">{STAT_TREND_LABEL[trend]} </span>
              {delta.value}
            </span>
            {delta.label ? <span>{delta.label}</span> : null}
          </span>
        ) : null}
        {description ? <p className="ds-stat__description">{description}</p> : null}
        {footer ? <div className="ds-stat__footer">{footer}</div> : null}
      </div>
    </Card>
  );
});

StatCard.displayName = "StatCard";

export default StatCard;
export type { StatCardProps, StatDelta, StatTrend } from "./StatCard.types";
