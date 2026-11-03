import { DATE_RANGE_SEPARATOR } from "./DateRangePicker.config";
import type { CompleteDateRange, DateRange, DateRangePreset } from "./DateRangePicker.types";

/** Local midnight of `d` (new Date instance). */
export function startOfDay(d: Date): Date {
  return new Date(d.getFullYear(), d.getMonth(), d.getDate());
}

export function addDays(d: Date, days: number): Date {
  return new Date(d.getFullYear(), d.getMonth(), d.getDate() + days);
}

export function startOfMonth(d: Date): Date {
  return new Date(d.getFullYear(), d.getMonth(), 1);
}

export function startOfQuarter(d: Date): Date {
  return new Date(d.getFullYear(), Math.floor(d.getMonth() / 3) * 3, 1);
}

export function startOfYear(d: Date): Date {
  return new Date(d.getFullYear(), 0, 1);
}

export function isSameDay(a: Date | undefined, b: Date | undefined): boolean {
  if (!a || !b) return a === b;
  return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();
}

export function isSameRange(a: DateRange | undefined, b: DateRange | undefined): boolean {
  return isSameDay(a?.from, b?.from) && isSameDay(a?.to, b?.to);
}

export function isCompleteRange(r: DateRange | undefined): r is CompleteDateRange {
  return Boolean(r?.from && r?.to);
}

/** Orders two days into `{ from, to }` (both normalised to local midnight). */
export function orderRange(a: Date, b: Date): CompleteDateRange {
  const x = startOfDay(a);
  const y = startOfDay(b);
  return x.getTime() <= y.getTime() ? { from: x, to: y } : { from: y, to: x };
}

/**
 * Clamps a complete range to `[min, max]` (day precision). Returns `null` when the range lies
 * entirely outside the bounds.
 */
export function clampRange(range: CompleteDateRange, min?: Date, max?: Date): CompleteDateRange | null {
  let { from, to } = orderRange(range.from, range.to);
  const lo = min ? startOfDay(min) : undefined;
  const hi = max ? startOfDay(max) : undefined;
  if (lo && to.getTime() < lo.getTime()) return null;
  if (hi && from.getTime() > hi.getTime()) return null;
  if (lo && from.getTime() < lo.getTime()) from = lo;
  if (hi && to.getTime() > hi.getTime()) to = hi;
  return { from, to };
}

/** True when `d` (day precision) is outside `[min, max]`. */
export function isOutOfBounds(d: Date, min?: Date, max?: Date): boolean {
  const t = startOfDay(d).getTime();
  return Boolean((min && t < startOfDay(min).getTime()) || (max && t > startOfDay(max).getTime()));
}

/** Default day formatter: `Intl.DateTimeFormat(locale, { dateStyle: "medium" })`. Falls back to the runtime locale on a bad tag. */
export function createDateFormatter(locale?: string): (d: Date) => string {
  let fmt: Intl.DateTimeFormat;
  try {
    fmt = new Intl.DateTimeFormat(locale, { dateStyle: "medium" });
  } catch {
    fmt = new Intl.DateTimeFormat(undefined, { dateStyle: "medium" });
  }
  return (d) => fmt.format(d);
}

/** Trigger text: `"from – to"`, `"from – …"` for a partial range, `null` when empty. */
export function formatRange(range: DateRange | undefined, format: (d: Date) => string): string | null {
  if (!range?.from && !range?.to) return null;
  const from = range.from ? format(range.from) : "…";
  const to = range.to ? format(range.to) : "…";
  if (range.from && range.to && isSameDay(range.from, range.to)) return from;
  return `${from}${DATE_RANGE_SEPARATOR}${to}`;
}

/**
 * Standard dashboard presets, relative to "now" at the moment `range()` is called.
 * "This month" / "This quarter" / "Year to date" run from the start of the period **to today**
 * (period-to-date), so they never select future days.
 */
export function createDefaultRangePresets(now: () => Date = () => new Date()): DateRangePreset[] {
  const today = () => startOfDay(now());
  return [
    { label: "Today", range: () => ({ from: today(), to: today() }) },
    { label: "Last 7 days", range: () => ({ from: addDays(today(), -6), to: today() }) },
    { label: "Last 30 days", range: () => ({ from: addDays(today(), -29), to: today() }) },
    { label: "This month", range: () => ({ from: startOfMonth(today()), to: today() }) },
    { label: "This quarter", range: () => ({ from: startOfQuarter(today()), to: today() }) },
    { label: "Year to date", range: () => ({ from: startOfYear(today()), to: today() }) },
  ];
}

/** Today, Last 7 days, Last 30 days, This month, This quarter, Year to date. */
export const DEFAULT_RANGE_PRESETS: DateRangePreset[] = createDefaultRangePresets();

/** `YYYY-MM-DD` in local time — matches react-day-picker's `data-day` attribute on day cells. */
export function toIsoDay(d: Date): string {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

/** Parses a `YYYY-MM-DD` string to local midnight (or `null`). */
export function fromIsoDay(s: string | null | undefined): Date | null {
  const m = s ? /^(\d{4})-(\d{2})-(\d{2})$/.exec(s) : null;
  if (!m) return null;
  return new Date(Number(m[1]), Number(m[2]) - 1, Number(m[3]));
}

const TABBABLE =
  "a[href], button:not([disabled]), input:not([disabled]):not([type='hidden']), select:not([disabled]), textarea:not([disabled]), [tabindex]";

/** Elements reachable with Tab (excludes `tabindex="-1"`, e.g. roving day buttons). */
export function getTabbable(container: HTMLElement): HTMLElement[] {
  return Array.from(container.querySelectorAll<HTMLElement>(TABBABLE)).filter(
    (el) => el.tabIndex >= 0 && el.getAttribute("tabindex") !== "-1" && !el.closest("[hidden], [inert]"),
  );
}
