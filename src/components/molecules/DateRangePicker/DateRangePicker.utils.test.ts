import { describe, expect, it } from "vitest";
import {
  addDays,
  clampRange,
  createDateFormatter,
  createDefaultRangePresets,
  formatRange,
  fromIsoDay,
  getTabbable,
  isCompleteRange,
  isOutOfBounds,
  isSameRange,
  orderRange,
  startOfQuarter,
  toIsoDay,
} from "./DateRangePicker.utils";

const d = (y: number, m: number, day: number) => new Date(y, m - 1, day);
const fmt = createDateFormatter("en-US");

describe("DateRangePicker utils", () => {
  it("orderRange sorts and normalises to midnight", () => {
    const r = orderRange(new Date(2026, 10, 9, 15, 30), d(2026, 11, 2));
    expect(toIsoDay(r.from)).toBe("2026-11-02");
    expect(toIsoDay(r.to)).toBe("2026-11-09");
    expect(r.to.getHours()).toBe(0);
  });

  it("clampRange keeps, trims, or rejects", () => {
    const min = d(2026, 11, 5);
    const max = d(2026, 11, 20);
    expect(clampRange({ from: d(2026, 11, 6), to: d(2026, 11, 8) }, min, max)).toEqual({
      from: d(2026, 11, 6),
      to: d(2026, 11, 8),
    });
    expect(clampRange({ from: d(2026, 11, 1), to: d(2026, 11, 30) }, min, max)).toEqual({ from: min, to: max });
    expect(clampRange({ from: d(2026, 10, 1), to: d(2026, 11, 4) }, min, max)).toBeNull();
    expect(clampRange({ from: d(2026, 11, 21), to: d(2026, 12, 1) }, min, max)).toBeNull();
    expect(clampRange({ from: d(2026, 11, 1), to: d(2026, 11, 2) })).toEqual({ from: d(2026, 11, 1), to: d(2026, 11, 2) });
  });

  it("isOutOfBounds is day-precise", () => {
    expect(isOutOfBounds(new Date(2026, 10, 5, 23), d(2026, 11, 5), d(2026, 11, 5))).toBe(false);
    expect(isOutOfBounds(d(2026, 11, 4), d(2026, 11, 5))).toBe(true);
    expect(isOutOfBounds(d(2026, 11, 6), undefined, d(2026, 11, 5))).toBe(true);
  });

  it("formatRange handles empty, single day, partial and full ranges", () => {
    expect(formatRange({}, fmt)).toBeNull();
    expect(formatRange(undefined, fmt)).toBeNull();
    expect(formatRange({ from: d(2026, 11, 3), to: d(2026, 11, 3) }, fmt)).toBe("Nov 3, 2026");
    expect(formatRange({ from: d(2026, 11, 3) }, fmt)).toBe("Nov 3, 2026 – …");
    expect(formatRange({ from: d(2026, 11, 1), to: d(2026, 11, 7) }, fmt)).toBe("Nov 1, 2026 – Nov 7, 2026");
  });

  it("createDateFormatter honours locale and survives a bad tag", () => {
    expect(createDateFormatter("de-DE")(d(2026, 11, 3))).toBe("03.11.2026");
    expect(() => createDateFormatter("not a locale!!")(d(2026, 11, 3))).not.toThrow();
  });

  it("isSameRange / isCompleteRange", () => {
    expect(isSameRange({ from: d(2026, 1, 1), to: d(2026, 1, 2) }, { from: new Date(2026, 0, 1, 9), to: d(2026, 1, 2) })).toBe(true);
    expect(isSameRange({ from: d(2026, 1, 1) }, { from: d(2026, 1, 1), to: d(2026, 1, 2) })).toBe(false);
    expect(isSameRange({}, {})).toBe(true);
    expect(isCompleteRange({ from: d(2026, 1, 1) })).toBe(false);
    expect(isCompleteRange({ from: d(2026, 1, 1), to: d(2026, 1, 1) })).toBe(true);
  });

  it("default presets are period-to-date relative to now", () => {
    const now = () => new Date(2026, 10, 3, 14, 5); // Tue 3 Nov 2026
    const p = Object.fromEntries(createDefaultRangePresets(now).map((x) => [x.label, x.range()]));
    expect(Object.keys(p)).toEqual(["Today", "Last 7 days", "Last 30 days", "This month", "This quarter", "Year to date"]);
    const iso = (r: { from: Date; to: Date }) => `${toIsoDay(r.from)}/${toIsoDay(r.to)}`;
    expect(iso(p["Today"])).toBe("2026-11-03/2026-11-03");
    expect(iso(p["Last 7 days"])).toBe("2026-10-28/2026-11-03");
    expect(iso(p["Last 30 days"])).toBe("2026-10-05/2026-11-03");
    expect(iso(p["This month"])).toBe("2026-11-01/2026-11-03");
    expect(iso(p["This quarter"])).toBe("2026-10-01/2026-11-03");
    expect(iso(p["Year to date"])).toBe("2026-01-01/2026-11-03");
  });

  it("startOfQuarter / addDays cross boundaries", () => {
    expect(toIsoDay(startOfQuarter(d(2026, 3, 31)))).toBe("2026-01-01");
    expect(toIsoDay(startOfQuarter(d(2026, 12, 31)))).toBe("2026-10-01");
    expect(toIsoDay(addDays(d(2026, 3, 1), -1))).toBe("2026-02-28");
  });

  it("toIsoDay / fromIsoDay round-trip; bad input is null", () => {
    expect(toIsoDay(fromIsoDay("2026-02-09")!)).toBe("2026-02-09");
    expect(fromIsoDay("09/02/2026")).toBeNull();
    expect(fromIsoDay(null)).toBeNull();
  });

  it("getTabbable skips tabindex=-1 and disabled", () => {
    const root = document.createElement("div");
    const make = (tag: string, id: string, attrs: Record<string, string> = {}) => {
      const el = document.createElement(tag);
      el.id = id;
      Object.entries(attrs).forEach(([k, v]) => el.setAttribute(k, v));
      root.appendChild(el);
    };
    make("button", "a");
    make("button", "b", { tabindex: "-1" });
    make("button", "c", { disabled: "" });
    make("span", "d", { tabindex: "0" });
    expect(getTabbable(root).map((el) => el.id)).toEqual(["a", "d"]);
  });
});
