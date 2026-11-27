import { MINUTES_PER_DAY } from "./TimePicker.config";
import type { TimePickerFormat, TimePickerSegment } from "./TimePicker.types";

const pad = (n: number) => String(n).padStart(2, "0");

/** Minutes since midnight → `"HH:mm"`. */
export function toHHmm(minutes: number): string {
  const m = ((minutes % MINUTES_PER_DAY) + MINUTES_PER_DAY) % MINUTES_PER_DAY;
  return `${pad(Math.floor(m / 60))}:${pad(m % 60)}`;
}

/** `"HH:mm"` → minutes since midnight, or `null` when malformed. */
export function fromHHmm(value: string | null | undefined): number | null {
  if (!value) return null;
  const match = /^(\d{1,2}):(\d{2})$/.exec(value.trim());
  if (!match) return null;
  const h = Number(match[1]);
  const m = Number(match[2]);
  if (h > 23 || m > 59) return null;
  return h * 60 + m;
}

/** Collapse the narrow / no-break spaces ICU puts before AM / PM into a plain space. */
function normaliseSpaces(s: string): string {
  return s.replace(/[  ]/g, " ");
}

/** Locale clock: 12 when the locale's hour cycle is h11 / h12, else 24. */
export function localeFormat(locale?: string): TimePickerFormat {
  try {
    const resolved = new Intl.DateTimeFormat(locale, { hour: "numeric" }).resolvedOptions() as Intl.ResolvedDateTimeFormatOptions & {
      hourCycle?: string;
    };
    const cycle = resolved.hourCycle;
    return cycle === "h11" || cycle === "h12" ? 12 : 24;
  } catch {
    return 24;
  }
}

/** Locale AM / PM strings via `Intl.DateTimeFormat#formatToParts` (falls back to "AM" / "PM"). */
export function getPeriodLabels(locale?: string): [string, string] {
  try {
    const fmt = new Intl.DateTimeFormat(locale, { hour: "numeric", hourCycle: "h12" });
    const part = (h: number) =>
      fmt.formatToParts(new Date(2000, 0, 1, h)).find((p) => p.type === "dayPeriod")?.value;
    const am = part(1);
    const pm = part(13);
    if (am && pm && am !== pm) return [normaliseSpaces(am), normaliseSpaces(pm)];
  } catch {
    /* fall through */
  }
  return ["AM", "PM"];
}

/** Text shown in the box: `"HH:mm"` (24) or `"hh:mm AM"` (12) — fixed segment positions for the keyboard. */
export function formatInputText(minutes: number, format: TimePickerFormat, periods: [string, string]): string {
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  if (format === 24) return `${pad(h)}:${pad(m)}`;
  const h12 = h % 12 === 0 ? 12 : h % 12;
  return `${pad(h12)}:${pad(m)} ${h < 12 ? periods[0] : periods[1]}`;
}

/** Option label via `Intl.DateTimeFormat` (e.g. "9:30 AM", "09:30", "9:30 vorm."). */
export function formatOptionLabel(minutes: number, format: TimePickerFormat, locale?: string): string {
  const date = new Date(2000, 0, 1, Math.floor(minutes / 60), minutes % 60);
  try {
    return normaliseSpaces(
      new Intl.DateTimeFormat(locale, {
        hour: format === 12 ? "numeric" : "2-digit",
        minute: "2-digit",
        hourCycle: format === 12 ? "h12" : "h23",
      }).format(date),
    );
  } catch {
    return formatInputText(minutes, format, ["AM", "PM"]);
  }
}

/**
 * Parse typed text: "9", "930", "0930", "9:30", "9.30", "21:30", "9pm", "9:30 p.m.", or the locale's
 * period strings. Returns minutes since midnight, or `null`.
 */
export function parseTimeText(text: string, periods: [string, string]): number | null {
  let t = text.trim().toLowerCase();
  if (!t) return null;
  let period: "am" | "pm" | null = null;
  const candidates: [string, "am" | "pm"][] = [
    [periods[0].toLowerCase(), "am"],
    [periods[1].toLowerCase(), "pm"],
    ["a.m.", "am"],
    ["p.m.", "pm"],
    ["am", "am"],
    ["pm", "pm"],
    ["a", "am"],
    ["p", "pm"],
  ];
  for (const [label, p] of candidates) {
    if (label && t.endsWith(label)) {
      period = p;
      t = t.slice(0, -label.length).trim();
      break;
    }
  }
  let h: number;
  let m: number;
  const sep = /^(\d{1,2})[:.](\d{1,2})$/.exec(t);
  if (sep) {
    h = Number(sep[1]);
    m = Number(sep[2]);
  } else if (/^\d{1,4}$/.test(t)) {
    if (t.length <= 2) {
      h = Number(t);
      m = 0;
    } else {
      h = Number(t.slice(0, t.length - 2));
      m = Number(t.slice(-2));
    }
  } else {
    return null;
  }
  if (m > 59) return null;
  if (period) {
    if (h < 1 || h > 12) return null;
    h = (h % 12) + (period === "pm" ? 12 : 0);
  } else if (h > 23) {
    return null;
  }
  return h * 60 + m;
}

/** Segment under the caret for the fixed-position input text. */
export function segmentAt(caret: number, format: TimePickerFormat): TimePickerSegment {
  if (caret <= 2) return "hour";
  if (format === 24 || caret <= 5) return "minute";
  return "period";
}

/** Selection range covering a segment in the input text. */
export function segmentRange(segment: TimePickerSegment, textLength: number): [number, number] {
  if (segment === "hour") return [0, 2];
  if (segment === "minute") return [3, 5];
  return [6, textLength];
}

/**
 * One ArrowUp (+1) / ArrowDown (−1) on a segment. Hours wrap around the day; minutes snap to `step`
 * and wrap within the hour (like a native time input); period toggles AM / PM.
 */
export function adjustSegment(minutes: number, segment: TimePickerSegment, delta: 1 | -1, step: number): number {
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  if (segment === "hour") return (((h + delta) % 24) + 24) % 24 * 60 + m;
  if (segment === "period") return (minutes + 12 * 60) % MINUTES_PER_DAY;
  const s = Math.min(Math.max(1, Math.round(step)), 60);
  let next = delta > 0 ? (Math.floor(m / s) + 1) * s : (Math.ceil(m / s) - 1) * s;
  if (next >= 60) next = 0;
  if (next < 0) next = Math.floor(59 / s) * s;
  return h * 60 + next;
}

export interface TimeConstraints {
  min: number | null;
  max: number | null;
  disabledTimes?: string[] | ((time: string) => boolean);
}

/** True when the time is outside `[min, max]` or listed / matched by `disabledTimes`. */
export function isTimeUnavailable(minutes: number, { min, max, disabledTimes }: TimeConstraints): boolean {
  if (min !== null && minutes < min) return true;
  if (max !== null && minutes > max) return true;
  if (!disabledTimes) return false;
  const hhmm = toHHmm(minutes);
  return typeof disabledTimes === "function" ? disabledTimes(hhmm) : disabledTimes.includes(hhmm);
}

/** Listbox option times: every `step` minutes from midnight, limited to `[min, max]`. */
export function buildOptions(step: number, min: number | null, max: number | null): number[] {
  const s = Math.max(1, Math.round(step));
  const out: number[] = [];
  for (let t = 0; t < MINUTES_PER_DAY; t += s) {
    if (min !== null && t < min) continue;
    if (max !== null && t > max) break;
    out.push(t);
  }
  return out;
}
