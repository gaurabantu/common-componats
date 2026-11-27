import type { RatingPrecision, RatingSize } from "./Rating.types";

export const RATING_DEFAULTS: { max: number; precision: RatingPrecision; size: RatingSize; label: string } = {
  max: 5,
  precision: 1,
  size: "md",
  label: "Rating",
};

export const RATING_SIZES: readonly RatingSize[] = ["sm", "md", "lg"] as const;
export const RATING_PRECISIONS: readonly RatingPrecision[] = [1, 0.5] as const;

/** "1 star", "2.5 stars". */
export function defaultRatingLabel(value: number): string {
  return `${value} star${value === 1 ? "" : "s"}`;
}

/** "4 out of 5 stars" — the read-only accessible name. */
export function readOnlyRatingLabel(value: number, max: number): string {
  return `${value} out of ${max} stars`;
}

/** Round to the nearest `precision` step, clamped to [0, max]. */
export function roundRating(value: number, precision: RatingPrecision, max: number): number {
  if (!Number.isFinite(value)) return 0;
  const rounded = Math.round(value / precision) * precision;
  return Math.min(Math.max(rounded, 0), max);
}

/** Fill state of icon `index` (1-based) for `value`. */
export function iconFill(index: number, value: number): "empty" | "half" | "full" {
  const diff = value - (index - 1);
  if (diff >= 1) return "full";
  if (diff >= 0.5) return "half";
  return "empty";
}
