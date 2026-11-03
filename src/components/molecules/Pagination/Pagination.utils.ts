import type { PaginationItem, PaginationRange } from "./Pagination.types";

function range(start: number, end: number): number[] {
  const out: number[] = [];
  for (let i = start; i <= end; i += 1) out.push(i);
  return out;
}

function toInt(value: number | undefined, fallback: number): number {
  return typeof value === "number" && Number.isFinite(value) ? Math.floor(value) : fallback;
}

/** Pages needed for `totalItems` at `pageSize` (0 when there are no items). */
export function getPageCount(totalItems: number | undefined, pageSize: number | undefined): number {
  const total = Math.max(0, toInt(totalItems, 0));
  const size = toInt(pageSize, 0);
  if (total === 0 || size < 1) return 0;
  return Math.ceil(total / size);
}

/** Clamp a requested page into `[1, pageCount]` (0 when there are no pages). */
export function clampPage(page: number, pageCount: number): number {
  const count = Math.max(0, toInt(pageCount, 0));
  if (count === 0) return 0;
  return Math.min(Math.max(1, toInt(page, 1)), count);
}

/** 1-based inclusive item range shown on `page`. */
export function getItemRange(page: number, pageSize: number, totalItems: number): PaginationRange {
  const total = Math.max(0, toInt(totalItems, 0));
  const size = Math.max(1, toInt(pageSize, 1));
  const current = clampPage(page, Math.ceil(total / size));
  if (total === 0 || current === 0) return { from: 0, to: 0, total };
  const from = (current - 1) * size + 1;
  return { from, to: Math.min(current * size, total), total };
}

export interface PaginationRangeOptions {
  page: number;
  pageCount: number;
  /** @default 1 */
  siblingCount?: number;
  /** @default 1 */
  boundaryCount?: number;
}

/**
 * Compute the page strip: boundary pages at both ends, `siblingCount` pages around the
 * current page, and ellipses for the gaps. The strip has a constant length
 * (`2*boundary + 2*sibling + 3`) once `pageCount` is large enough, so controls do not
 * jump as the user pages. An ellipsis is only used when it hides at least two pages —
 * a single hidden page is shown as a page instead.
 */
export function getPaginationRange({
  page,
  pageCount,
  siblingCount = 1,
  boundaryCount = 1,
}: PaginationRangeOptions): PaginationItem[] {
  const count = Math.max(0, toInt(pageCount, 0));
  if (count === 0) return [];
  const current = clampPage(page, count);
  const siblings = Math.max(0, toInt(siblingCount, 1));
  const boundary = Math.max(0, toInt(boundaryCount, 1));

  const startPages = range(1, Math.min(boundary, count));
  const endPages = range(Math.max(count - boundary + 1, boundary + 1), count);

  const siblingsStart = Math.max(
    Math.min(current - siblings, count - boundary - siblings * 2 - 1),
    boundary + 2,
  );
  const siblingsEnd = Math.min(
    Math.max(current + siblings, boundary + siblings * 2 + 2),
    endPages.length > 0 ? endPages[0] - 2 : count - 1,
  );

  const pages: Array<number | "start-ellipsis" | "end-ellipsis"> = [...startPages];

  if (siblingsStart > boundary + 2) {
    pages.push("start-ellipsis");
  } else if (boundary + 1 < count - boundary) {
    pages.push(boundary + 1);
  }

  pages.push(...range(siblingsStart, siblingsEnd));

  if (siblingsEnd < count - boundary - 1) {
    pages.push("end-ellipsis");
  } else if (count - boundary > boundary) {
    pages.push(count - boundary);
  }

  pages.push(...endPages);

  // De-duplicate and drop out-of-range numbers (guards small counts / zero boundaries).
  const seen = new Set<number>();
  const items: PaginationItem[] = [];
  pages.forEach((entry, index) => {
    if (typeof entry === "number") {
      if (entry < 1 || entry > count || seen.has(entry)) return;
      seen.add(entry);
      items.push({ type: "page", page: entry });
      return;
    }
    const prev = pages[index - 1];
    const next = pages[index + 1];
    const from = typeof prev === "number" ? prev + 1 : 1;
    const to = typeof next === "number" ? next - 1 : count;
    if (to >= from) items.push({ type: "ellipsis", key: entry, from, to });
  });
  return items;
}

const SAFE_PROTOCOLS = new Set(["http:", "https:"]);

/**
 * Page links may only use http(s), relative paths, query strings or hashes — blocks
 * `javascript:`, `data:`, `vbscript:` … Parsed with the WHATWG URL parser so tab / newline
 * obfuscation ("java\tscript:") cannot slip through.
 */
export function isSafePageHref(href: unknown): href is string {
  if (typeof href !== "string" || href.trim() === "") return false;
  try {
    return SAFE_PROTOCOLS.has(new URL(href, "https://relative.invalid/").protocol);
  } catch {
    return false;
  }
}
