/**
 * Locale-aware number parsing / formatting for NumberInput. Pure — no React, no DOM.
 *
 * Parsing contract (`parseLocaleNumber`):
 * - returns `null` for empty / whitespace-only input,
 * - returns `NaN` for input that is not a number in the given locale,
 * - otherwise the numeric value (for `style: "percent"` the fraction, e.g. "25 %" → 0.25).
 */

export interface NumberLocaleInfo {
  /** Grouping separator, e.g. "," (en), "." (de), U+202F (fr). */
  group: string;
  /** Decimal separator, e.g. "." (en), "," (de). */
  decimal: string;
  /** Locale minus sign. */
  minus: string;
  /** Locale digits 0-9 (e.g. Arabic-Indic for ar-EG). */
  digits: string[];
  /** Affix strings to ignore when parsing: currency symbols / codes, percent sign, unit labels, literals. */
  literals: string[];
  /** Compact-notation suffixes (e.g. "K", "M", "万") and their multipliers, longest first. */
  compact: { suffix: string; multiplier: number }[];
  /** True for `style: "percent"` — displayed value is value × 100. */
  percent: boolean;
  /** Digits in the group nearest the decimal (3 almost everywhere). */
  primaryGroupSize: number;
  /** Digits in the other groups (3, or 2 for Indian grouping: 12,34,567). */
  secondaryGroupSize: number;
}

const MINUS_CHARS = ["-", "−", "‒", "–", "﹣", "－"];
const SPACE_RE = /[\s   ‎‏؜]/g;

function escapeRegExp(s: string): string {
  return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function safeNumberFormat(locale: string | undefined, options: Intl.NumberFormatOptions): Intl.NumberFormat {
  try {
    return new Intl.NumberFormat(locale, options);
  } catch {
    try {
      return new Intl.NumberFormat(locale);
    } catch {
      return new Intl.NumberFormat();
    }
  }
}

/** Options that only affect affixes (kept when deriving separators). */
function affixOptions(options?: Intl.NumberFormatOptions): Intl.NumberFormatOptions {
  if (!options) return {};
  const { style, currency, currencyDisplay, currencySign, unit, unitDisplay } = options;
  return { style, currency, currencyDisplay, currencySign, unit, unitDisplay };
}

const infoCache = new Map<string, NumberLocaleInfo>();

/** Separators, digits, affixes and compact suffixes for `locale` + `options` (memoised). */
export function getNumberLocaleInfo(locale?: string, options?: Intl.NumberFormatOptions): NumberLocaleInfo {
  const key = `${locale ?? ""}|${JSON.stringify(options ?? {})}`;
  const cached = infoCache.get(key);
  if (cached) return cached;

  const parts = safeNumberFormat(locale, {
    ...affixOptions(options),
    useGrouping: true,
    minimumFractionDigits: 1,
    maximumFractionDigits: 1,
  }).formatToParts(-1234567.5);

  let group = ",";
  let decimal = ".";
  let minus = "-";
  const literals = new Set<string>();
  for (const p of parts) {
    if (p.type === "group") group = p.value;
    else if (p.type === "decimal") decimal = p.value;
    else if (p.type === "minusSign") minus = p.value;
    else if (p.type === "currency" || p.type === "percentSign" || p.type === "unit" || p.type === "literal") {
      // Parentheses / sign characters are sign syntax, never affixes to strip.
      const v = p.value.replace(SPACE_RE, "").replace(/[()+]/g, "");
      if (v && !MINUS_CHARS.includes(v)) literals.add(v);
    }
  }

  // Group sizes from a long integer (en: 1,234,567,890 → 3/3; en-IN: 1,23,45,67,890 → 3/2).
  const intGroups = safeNumberFormat(locale, { useGrouping: true, maximumFractionDigits: 0 })
    .formatToParts(1234567890)
    .filter((p) => p.type === "integer")
    .map((p) => p.value.length);
  const primaryGroupSize = intGroups.length > 1 ? intGroups[intGroups.length - 1] : 3;
  const secondaryGroupSize = intGroups.length > 2 ? intGroups[intGroups.length - 2] : primaryGroupSize;
  if (options?.style === "percent") literals.add("%");
  if (options?.style === "currency" && options.currency) literals.add(options.currency.toUpperCase());

  const plain = safeNumberFormat(locale, { useGrouping: false, maximumFractionDigits: 0 });
  const digits = Array.from({ length: 10 }, (_, i) => plain.format(i));

  const compact: { suffix: string; multiplier: number }[] = [];
  if (options?.notation === "compact") {
    const cf = safeNumberFormat(locale, {
      notation: "compact",
      compactDisplay: options.compactDisplay,
      maximumFractionDigits: 0,
    });
    const seen = new Set<string>();
    for (let exp = 3; exp <= 15; exp += 1) {
      const p = cf.formatToParts(10 ** exp);
      const suffix = p.filter((x) => x.type === "compact").map((x) => x.value.replace(SPACE_RE, "")).join("");
      const intText = p.filter((x) => x.type === "integer").map((x) => x.value).join("");
      const intValue = Number(
        intText
          .split("")
          .map((ch) => {
            const i = digits.indexOf(ch);
            return i >= 0 ? String(i) : ch;
          })
          .join(""),
      );
      if (!suffix || seen.has(suffix) || !intValue) continue;
      seen.add(suffix);
      compact.push({ suffix, multiplier: 10 ** exp / intValue });
    }
    compact.sort((a, b) => b.suffix.length - a.suffix.length);
  }

  const info: NumberLocaleInfo = {
    group,
    decimal,
    minus,
    digits,
    literals: Array.from(literals).sort((a, b) => b.length - a.length),
    compact,
    percent: options?.style === "percent",
    primaryGroupSize,
    secondaryGroupSize,
  };
  infoCache.set(key, info);
  return info;
}

/** Removes float noise (0.1 + 0.2 → 0.3). */
export function cleanFloat(n: number): number {
  return Number.isFinite(n) ? Number(n.toPrecision(15)) : n;
}

const GROUP_TOKEN = "\u0000";
const DIGIT_RUN = "[0-9]";

/**
 * Parses user text in `locale`: grouping and decimal separators (with group positions validated),
 * native digits, one minus sign in a leading or trailing position (any minus variant) or accounting
 * parentheses, currency / percent / unit affixes and compact suffixes ("1.2K").
 *
 * Rejected with `NaN`: misplaced groups ("1,2345", "1,234,5", "12,3,456"), separators in the fraction,
 * interior or repeated signs ("1-2", "--5", "-(5)"), exponents / hex / words.
 *
 * Decimal heuristic: a **single** group-separator char followed by **1–2 digits** and no decimal
 * separator is read as a decimal typed with the other convention ("1,5" / "10,25" in en-US → 1.5 /
 * 10.25; "1.5" in de-DE → 1.5). Three digits after it is grouping ("1,234" → 1234); four or more is
 * rejected.
 */
export function parseLocaleNumber(text: string, locale?: string, options?: Intl.NumberFormatOptions): number | null {
  const info = getNumberLocaleInfo(locale, options);
  if (text.replace(SPACE_RE, "") === "") return null;

  // Native digits → ASCII.
  let s = text
    .split("")
    .map((ch) => {
      const i = info.digits.indexOf(ch);
      return i >= 0 ? String(i) : ch;
    })
    .join("");

  // Group separator → token. Space-like groups (fr NBSP / U+202F) only count between digits;
  // apostrophe variants are aliases of each other (de-CH "’").
  const groupIsSpace = info.group.replace(SPACE_RE, "") === "";
  const groupIsApostrophe = /^['’]$/.test(info.group);
  if (groupIsSpace) {
    s = s.trim().replace(/([0-9])[\s\u00A0\u202F\u2009]+(?=[0-9])/g, `$1${GROUP_TOKEN}`);
  } else if (groupIsApostrophe) {
    s = s.replace(/['’]/g, GROUP_TOKEN);
  } else if (info.group !== info.decimal) {
    s = s.split(info.group).join(GROUP_TOKEN);
  }
  s = s.replace(SPACE_RE, "");

  // Compact suffix ("1.2K"), case-insensitive, at the end (before a trailing sign / paren).
  let multiplier = 1;
  for (const { suffix, multiplier: mul } of info.compact) {
    const re = new RegExp(`${escapeRegExp(suffix)}(?=[)\\-\u2212]?$)`, "i");
    if (re.test(s)) {
      multiplier = mul;
      s = s.replace(re, "");
      break;
    }
  }

  // Affixes (currency, %, units). The token never collides with them.
  for (const lit of info.literals) {
    if (lit === info.decimal) continue;
    s = s.split(lit).join("");
  }
  s = s.replace(/%/g, "");

  // Sign: accounting parentheses, or exactly one minus at the start or the end.
  let negative = false;
  const paren = /^\((.*)\)$/.exec(s);
  if (paren) {
    negative = true;
    s = paren[1];
  }
  for (const m of new Set([info.minus, ...MINUS_CHARS])) s = s.split(m).join("-");
  const signMatch = /^([-+]?)(.*?)(-?)$/.exec(s)!;
  if (signMatch[1] === "-" || signMatch[3] === "-") {
    if (negative || (signMatch[1] === "-" && signMatch[3] === "-")) return Number.NaN;
    negative = true;
  }
  s = signMatch[2];
  if (/[-+()]/.test(s)) return Number.NaN;

  // Split integer / fraction on the locale decimal (or "." when it is unambiguous).
  const decimal = info.decimal;
  let intPart = s;
  let fracPart: string | null = null;
  const decIdx = s.indexOf(decimal);
  if (decIdx >= 0) {
    intPart = s.slice(0, decIdx);
    fracPart = s.slice(decIdx + decimal.length);
  } else if (decimal !== "." && info.group !== "." && s.includes(".")) {
    // en-style decimal in a ","-decimal locale whose group is not "." (fr-FR "1.5").
    const i = s.indexOf(".");
    intPart = s.slice(0, i);
    fracPart = s.slice(i + 1);
  }
  if (fracPart !== null && !new RegExp(`^${DIGIT_RUN}*$`).test(fracPart)) return Number.NaN;

  // Validate grouping positions.
  if (intPart.includes(GROUP_TOKEN)) {
    const groups = intPart.split(GROUP_TOKEN);
    const allDigits = groups.every((g) => new RegExp(`^${DIGIT_RUN}+$`).test(g));
    if (!allDigits) return Number.NaN;
    const last = groups[groups.length - 1];
    if (groups.length === 2 && fracPart === null && last.length >= 1 && last.length <= 2) {
      // Decimal heuristic (see doc comment).
      fracPart = last;
      intPart = groups[0];
    } else {
      const { primaryGroupSize: p, secondaryGroupSize: q } = info;
      const middle = groups.slice(1, -1);
      const ok =
        last.length === p &&
        middle.every((g) => g.length === q) &&
        groups[0].length >= 1 &&
        groups[0].length <= (groups.length > 2 ? q : Math.max(p, q));
      if (!ok) return Number.NaN;
      intPart = groups.join("");
    }
  }

  if (!new RegExp(`^${DIGIT_RUN}*$`).test(intPart)) return Number.NaN;
  if (intPart === "" && (fracPart === null || fracPart === "")) return Number.NaN;
  let n = Number(`${intPart || "0"}.${fracPart || "0"}`) * multiplier;
  if (info.percent) n /= 100;
  n = cleanFloat(n);
  // Negate after cleaning so "-0" keeps its sign (needed to reject a typed minus when negatives are off).
  return negative ? -n : n;
}

/** True when `text` parses to a negative number (used to reject a typed minus when negatives are not allowed). */
export function isNegativeInput(text: string, locale?: string, options?: Intl.NumberFormatOptions): boolean {
  const n = parseLocaleNumber(text, locale, options);
  return n !== null && !Number.isNaN(n) && (n < 0 || Object.is(n, -0));
}

/** Display format (blurred field). `precision` fixes the fraction digits. Never throws. */
export function formatLocaleNumber(
  value: number,
  locale?: string,
  options?: Intl.NumberFormatOptions,
  precision?: number,
): string {
  const opts: Intl.NumberFormatOptions = { ...options };
  if (precision !== undefined) {
    opts.minimumFractionDigits = precision;
    opts.maximumFractionDigits = precision;
  }
  try {
    return new Intl.NumberFormat(locale, opts).format(value);
  } catch {
    return String(value);
  }
}

/**
 * Edit format (focused field): no grouping, no affixes, locale decimal separator, full precision.
 * Percent values are shown ×100 ("25" for 0.25) so typing matches what the user sees on blur.
 */
export function formatForEditing(value: number, locale?: string, options?: Intl.NumberFormatOptions, precision?: number): string {
  const shown = options?.style === "percent" ? cleanFloat(value * 100) : value;
  return safeNumberFormat(locale, {
    useGrouping: false,
    minimumFractionDigits: 0,
    maximumFractionDigits: precision !== undefined ? precision : 20,
  }).format(shown);
}

export function countDecimals(n: number): number {
  if (!Number.isFinite(n)) return 0;
  const s = String(n);
  const exp = /e-(\d+)$/i.exec(s);
  if (exp) {
    const mantissa = s.split(/e/i)[0];
    const frac = mantissa.split(".")[1]?.length ?? 0;
    return frac + Number(exp[1]);
  }
  return s.split(".")[1]?.length ?? 0;
}

export function roundToPrecision(n: number, precision?: number): number {
  if (precision === undefined || !Number.isFinite(n)) return n;
  const f = 10 ** precision;
  return cleanFloat(Math.round(cleanFloat(n * f)) / f);
}

export function clamp(n: number, min?: number, max?: number): number {
  let v = n;
  if (min !== undefined && v < min) v = min;
  if (max !== undefined && v > max) v = max;
  return v;
}

export interface StepOptions {
  step: number;
  /** +1 or -1. */
  direction: 1 | -1;
  /** 10 for Shift / PageUp / PageDown. */
  multiplier?: number;
  min?: number;
  max?: number;
  precision?: number;
}

/**
 * Next value after one step. An empty value (`null`) starts from `0` clamped to `[min, max]`.
 * Float-safe (0.1 + 0.2 → 0.3) and clamped.
 */
export function stepValue(value: number | null, { step, direction, multiplier = 1, min, max, precision }: StepOptions): number {
  if (value === null || !Number.isFinite(value)) return roundToPrecision(clamp(0, min, max), precision);
  const delta = step * multiplier * direction;
  const decimals = Math.min(20, Math.max(countDecimals(step), countDecimals(value), precision ?? 0));
  const next = Number((value + delta).toFixed(decimals));
  return clamp(roundToPrecision(next, precision), min, max);
}
