import { clampPage, getItemRange, getPageCount, getPaginationRange } from "./Pagination.utils";
import type { PaginationItem } from "./Pagination.types";

/** Compact notation: page numbers, "…" for ellipses. */
const strip = (items: PaginationItem[]) => items.map((i) => (i.type === "page" ? i.page : "…"));

describe("getPaginationRange", () => {
  it("returns nothing for 0 pages", () => {
    expect(getPaginationRange({ page: 1, pageCount: 0 })).toEqual([]);
  });

  it("returns a single page for pageCount 1", () => {
    expect(strip(getPaginationRange({ page: 1, pageCount: 1 }))).toEqual([1]);
  });

  it("shows every page when they all fit", () => {
    expect(strip(getPaginationRange({ page: 1, pageCount: 2 }))).toEqual([1, 2]);
    expect(strip(getPaginationRange({ page: 3, pageCount: 5 }))).toEqual([1, 2, 3, 4, 5]);
    expect(strip(getPaginationRange({ page: 4, pageCount: 7 }))).toEqual([1, 2, 3, 4, 5, 6, 7]);
  });

  it("uses an end ellipsis near the start", () => {
    expect(strip(getPaginationRange({ page: 1, pageCount: 10 }))).toEqual([1, 2, 3, 4, 5, "…", 10]);
    expect(strip(getPaginationRange({ page: 4, pageCount: 10 }))).toEqual([1, 2, 3, 4, 5, "…", 10]);
  });

  it("uses both ellipses in the middle", () => {
    expect(strip(getPaginationRange({ page: 5, pageCount: 10 }))).toEqual([1, "…", 4, 5, 6, "…", 10]);
    expect(strip(getPaginationRange({ page: 6, pageCount: 10 }))).toEqual([1, "…", 5, 6, 7, "…", 10]);
  });

  it("uses a start ellipsis near the end", () => {
    expect(strip(getPaginationRange({ page: 7, pageCount: 10 }))).toEqual([1, "…", 6, 7, 8, 9, 10]);
    expect(strip(getPaginationRange({ page: 10, pageCount: 10 }))).toEqual([1, "…", 6, 7, 8, 9, 10]);
  });

  it("keeps a constant strip length once pageCount is large", () => {
    for (let p = 1; p <= 50; p += 1) {
      expect(getPaginationRange({ page: p, pageCount: 50 })).toHaveLength(7);
      expect(getPaginationRange({ page: p, pageCount: 50, siblingCount: 2, boundaryCount: 2 })).toHaveLength(11);
    }
  });

  it("never uses an ellipsis for a single hidden page", () => {
    // 1 … 3 would hide only page 2, so 2 is rendered instead.
    expect(strip(getPaginationRange({ page: 4, pageCount: 10 }))[1]).toBe(2);
    expect(strip(getPaginationRange({ page: 7, pageCount: 10 })).slice(-2)).toEqual([9, 10]);
  });

  it("honours siblingCount", () => {
    expect(strip(getPaginationRange({ page: 10, pageCount: 20, siblingCount: 2 }))).toEqual([
      1, "…", 8, 9, 10, 11, 12, "…", 20,
    ]);
    expect(strip(getPaginationRange({ page: 10, pageCount: 20, siblingCount: 0 }))).toEqual([1, "…", 10, "…", 20]);
  });

  it("honours boundaryCount", () => {
    expect(strip(getPaginationRange({ page: 10, pageCount: 20, boundaryCount: 2 }))).toEqual([
      1, 2, "…", 9, 10, 11, "…", 19, 20,
    ]);
  });

  it("handles boundaryCount 0", () => {
    expect(strip(getPaginationRange({ page: 10, pageCount: 20, boundaryCount: 0 }))).toEqual(["…", 9, 10, 11, "…"]);
  });

  it("clamps out-of-range pages", () => {
    expect(strip(getPaginationRange({ page: 99, pageCount: 10 }))).toEqual([1, "…", 6, 7, 8, 9, 10]);
    expect(strip(getPaginationRange({ page: -3, pageCount: 10 }))).toEqual([1, 2, 3, 4, 5, "…", 10]);
  });

  it("produces unique, ascending pages and in-range values", () => {
    for (let count = 1; count <= 30; count += 1) {
      for (let p = 1; p <= count; p += 1) {
        const pages = getPaginationRange({ page: p, pageCount: count, siblingCount: 1, boundaryCount: 1 })
          .filter((i) => i.type === "page")
          .map((i) => (i as { page: number }).page);
        expect(pages).toContain(p);
        expect(pages).toContain(1);
        expect(pages).toContain(count);
        expect([...pages].sort((a, b) => a - b)).toEqual(pages);
        expect(new Set(pages).size).toBe(pages.length);
      }
    }
  });

  it("describes the hidden span of each ellipsis", () => {
    const items = getPaginationRange({ page: 10, pageCount: 20 });
    const ellipses = items.filter((i) => i.type === "ellipsis");
    expect(ellipses).toEqual([
      { type: "ellipsis", key: "start-ellipsis", from: 2, to: 8 },
      { type: "ellipsis", key: "end-ellipsis", from: 12, to: 19 },
    ]);
  });
});

describe("getPageCount", () => {
  it("derives page count from totals", () => {
    expect(getPageCount(0, 10)).toBe(0);
    expect(getPageCount(1, 10)).toBe(1);
    expect(getPageCount(10, 10)).toBe(1);
    expect(getPageCount(11, 10)).toBe(2);
    expect(getPageCount(120, 25)).toBe(5);
  });

  it("guards invalid input", () => {
    expect(getPageCount(undefined, 10)).toBe(0);
    expect(getPageCount(50, 0)).toBe(0);
    expect(getPageCount(-5, 10)).toBe(0);
    expect(getPageCount(Number.NaN, 10)).toBe(0);
  });
});

describe("clampPage", () => {
  it("clamps into [1, pageCount] and returns 0 for no pages", () => {
    expect(clampPage(0, 5)).toBe(1);
    expect(clampPage(6, 5)).toBe(5);
    expect(clampPage(3, 5)).toBe(3);
    expect(clampPage(3, 0)).toBe(0);
  });
});

describe("getItemRange", () => {
  it("computes the 1-based inclusive range", () => {
    expect(getItemRange(1, 10, 95)).toEqual({ from: 1, to: 10, total: 95 });
    expect(getItemRange(3, 10, 95)).toEqual({ from: 21, to: 30, total: 95 });
    expect(getItemRange(10, 10, 95)).toEqual({ from: 91, to: 95, total: 95 });
  });

  it("returns zeros when there are no items", () => {
    expect(getItemRange(1, 10, 0)).toEqual({ from: 0, to: 0, total: 0 });
  });

  it("clamps the page", () => {
    expect(getItemRange(99, 10, 25)).toEqual({ from: 21, to: 25, total: 25 });
  });
});
