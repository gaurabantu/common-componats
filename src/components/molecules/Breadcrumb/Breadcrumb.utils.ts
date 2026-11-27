export interface CollapseRange {
  /** Whether the middle is hidden behind the "…" button. */
  collapsed: boolean;
  /** Number of leading segments shown. */
  before: number;
  /** Number of trailing segments shown. */
  after: number;
  /** Number of hidden segments. */
  hidden: number;
}

/**
 * Decide which segments stay visible. Collapses only when it hides at least one segment and
 * `total > maxItems`. `before` / `after` are clamped to ≥ 0 and so that something is hidden.
 */
export function getCollapseRange(
  total: number,
  maxItems: number | undefined,
  itemsBefore: number,
  itemsAfter: number,
): CollapseRange {
  const before = Math.max(0, Math.floor(itemsBefore));
  const after = Math.max(0, Math.floor(itemsAfter));
  const none: CollapseRange = { collapsed: false, before: total, after: 0, hidden: 0 };
  if (maxItems === undefined || !Number.isFinite(maxItems) || total <= maxItems) return none;
  if (before + after >= total) return none;
  return { collapsed: true, before, after, hidden: total - before - after };
}
