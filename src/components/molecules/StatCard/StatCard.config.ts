import type { StatTrend } from "./StatCard.types";

/** Screen-reader prefix per trend — paired with the visual arrow so meaning never depends on colour. */
export const STAT_TREND_LABEL: Record<StatTrend, string> = {
  up: "Increased",
  down: "Decreased",
  neutral: "No change",
};

export const STAT_CARD_DEFAULTS = {
  iconTone: "neutral" as const,
};
