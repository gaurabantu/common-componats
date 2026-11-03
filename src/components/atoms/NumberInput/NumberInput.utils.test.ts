import { describe, expect, it } from "vitest";
import {
  clamp,
  cleanFloat,
  countDecimals,
  formatForEditing,
  formatLocaleNumber,
  getNumberLocaleInfo,
  isNegativeInput,
  parseLocaleNumber,
  roundToPrecision,
  stepValue,
} from "./NumberInput.utils";

const NBSP = " ";
const NNBSP = " ";

describe("getNumberLocaleInfo", () => {
  it("derives separators from formatToParts", () => {
    expect(getNumberLocaleInfo("en-US")).toMatchObject({ group: ",", decimal: "." });
    expect(getNumberLocaleInfo("de-DE")).toMatchObject({ group: ".", decimal: "," });
    expect(getNumberLocaleInfo("fr-FR").decimal).toBe(",");
    expect([NBSP, NNBSP, " "]).toContain(getNumberLocaleInfo("fr-FR").group);
  });

  it("collects currency / percent literals and compact suffixes", () => {
    expect(getNumberLocaleInfo("en-US", { style: "currency", currency: "USD" }).literals).toContain("$");
    expect(getNumberLocaleInfo("en-US", { style: "percent" }).percent).toBe(true);
    const compact = getNumberLocaleInfo("en-US", { notation: "compact" }).compact.map((c) => c.suffix);
    expect(compact).toEqual(expect.arrayContaining(["K", "M", "B", "T"]));
  });

  it("collects native digits", () => {
    expect(getNumberLocaleInfo("ar-EG").digits[3]).toBe("٣");
  });
});

describe("parseLocaleNumber — en-US", () => {
  const p = (s: string, o?: Intl.NumberFormatOptions) => parseLocaleNumber(s, "en-US", o);
  it.each([
    ["1,234.56", 1234.56],
    ["1234.56", 1234.56],
    ["-1,234", -1234],
    ["−5", -5],
    ["+7", 7],
    [".5", 0.5],
    ["5.", 5],
    ["(12.5)", -12.5],
    ["  42  ", 42],
    ["12,345", 12345],
    ["1,234,567.8", 1234567.8],
    ["1,5", 1.5], // lone separator not followed by 3 digits = decimal typed the other way
  ])("%s → %s", (input, expected) => {
    expect(p(input)).toBe(expected);
  });

  it("empty is null, garbage is NaN", () => {
    expect(p("")).toBeNull();
    expect(p("   ")).toBeNull();
    expect(p("abc")).toBeNaN();
    expect(p("1.2.3")).toBeNaN();
    expect(p("12abc")).toBeNaN();
    expect(p("-")).toBeNaN();
    expect(p(".")).toBeNaN();
  });

  it("strips currency symbols and codes", () => {
    const usd = { style: "currency", currency: "USD" } as const;
    expect(p("$1,234.50", usd)).toBe(1234.5);
    expect(p("-$5.00", usd)).toBe(-5);
    expect(p("USD 12", usd)).toBe(12);
  });

  it("percent values are fractions", () => {
    const pct = { style: "percent" } as const;
    expect(p("25%", pct)).toBe(0.25);
    expect(p("25", pct)).toBe(0.25);
    expect(p("12.5 %", pct)).toBe(0.125);
    expect(p("7", pct)).toBe(0.07);
  });

  it("compact suffixes multiply (case-insensitive)", () => {
    const c = { notation: "compact" } as const;
    expect(p("1.2K", c)).toBe(1200);
    expect(p("3M", c)).toBe(3_000_000);
    expect(p("2.5b", c)).toBe(2_500_000_000);
    expect(p("950", c)).toBe(950);
  });
});

describe("parseLocaleNumber — other locales", () => {
  it.each([
    ["de-DE", "1.234,56", 1234.56],
    ["de-DE", "1234,5", 1234.5],
    ["de-DE", "1.234", 1234],
    ["de-DE", "1.234.567", 1234567],
    ["de-DE", "1.5", 1.5],
    ["de-DE", "-0,75", -0.75],
    ["fr-FR", `1${NNBSP}234,56`, 1234.56],
    ["fr-FR", `1${NBSP}234,56`, 1234.56],
    ["fr-FR", "1 234,56", 1234.56],
    ["de-CH", "1’234.5", 1234.5],
    ["en-IN", "12,34,567.8", 1234567.8],
  ])("%s %s → %s", (locale, input, expected) => {
    expect(parseLocaleNumber(input, locale)).toBe(expected);
  });

  it("parses currency in the locale's position", () => {
    const eur = { style: "currency", currency: "EUR" } as const;
    expect(parseLocaleNumber(`12,50${NBSP}€`, "de-DE", eur)).toBe(12.5);
    expect(parseLocaleNumber("€ 1.000,00", "de-DE", eur)).toBe(1000);
  });

  it("parses native digits (ar-EG) and compact ja-JP", () => {
    expect(parseLocaleNumber(formatLocaleNumber(1234.5, "ar-EG"), "ar-EG")).toBe(1234.5);
    expect(parseLocaleNumber("1.2万", "ja-JP", { notation: "compact" })).toBe(12000);
  });

  it("round-trips formatted output", () => {
    const cases: [string, Intl.NumberFormatOptions | undefined, number][] = [
      ["en-US", undefined, -9876543.21],
      ["de-DE", undefined, 1234567.891],
      ["fr-FR", undefined, 0.5],
      ["en-IN", undefined, 12345678.9],
      ["en-US", { style: "currency", currency: "USD" }, 1234.5],
      ["de-DE", { style: "currency", currency: "EUR" }, -42.1],
      ["ja-JP", { style: "currency", currency: "JPY" }, 1500],
      ["en-US", { style: "percent", maximumFractionDigits: 2 }, 0.1234],
      ["de-DE", { style: "percent" }, 0.5],
      ["en-US", { style: "unit", unit: "kilogram" }, 12.5],
    ];
    for (const [locale, opts, v] of cases) {
      expect(parseLocaleNumber(formatLocaleNumber(v, locale, opts), locale, opts)).toBe(v);
    }
  });
});

describe("formatLocaleNumber / formatForEditing", () => {
  it("formats with options and precision", () => {
    expect(formatLocaleNumber(1234.5, "en-US", { style: "currency", currency: "USD" })).toBe("$1,234.50");
    expect(formatLocaleNumber(1234.5, "de-DE", { style: "currency", currency: "EUR" })).toMatch(/^1\.234,50\s€$/);
    expect(formatLocaleNumber(0.25, "en-US", { style: "percent" })).toBe("25%");
    expect(formatLocaleNumber(3, "en-US", undefined, 2)).toBe("3.00");
    expect(formatLocaleNumber(1234, "en-US", { notation: "compact" })).toBe("1.2K");
  });

  it("never throws on bad options", () => {
    expect(() => formatLocaleNumber(1, "en-US", { style: "currency", currency: "NOT-A-CODE" })).not.toThrow();
    expect(() => parseLocaleNumber("1", "en-US", { style: "currency", currency: "NOT-A-CODE" })).not.toThrow();
  });

  it("edit format: no grouping, locale decimal, percent ×100", () => {
    expect(formatForEditing(1234567.5, "en-US")).toBe("1234567.5");
    expect(formatForEditing(1234.5, "de-DE")).toBe("1234,5");
    expect(formatForEditing(0.07, "en-US", { style: "percent" })).toBe("7");
    expect(formatForEditing(1.23456, "en-US", undefined, 2)).toBe("1.23");
    expect(formatForEditing(-0.1, "en-US")).toBe("-0.1");
  });
});

describe("stepping and rounding", () => {
  it("cleanFloat / countDecimals / roundToPrecision / clamp", () => {
    expect(cleanFloat(0.1 + 0.2)).toBe(0.3);
    expect(countDecimals(1e-7)).toBe(7);
    expect(countDecimals(2.125)).toBe(3);
    expect(countDecimals(10)).toBe(0);
    expect(roundToPrecision(1.005, 2)).toBe(1.01);
    expect(roundToPrecision(1.236, 2)).toBe(1.24);
    expect(roundToPrecision(1.236)).toBe(1.236);
    expect(clamp(5, 0, 3)).toBe(3);
    expect(clamp(-1, 0)).toBe(0);
    expect(clamp(2)).toBe(2);
  });

  it("stepValue is float-safe and clamped", () => {
    expect(stepValue(0.2, { step: 0.1, direction: 1 })).toBe(0.3);
    expect(stepValue(0.3, { step: 0.1, direction: -1 })).toBe(0.2);
    expect(stepValue(9, { step: 1, direction: 1, max: 10, multiplier: 10 })).toBe(10);
    expect(stepValue(1, { step: 1, direction: -1, min: 0, multiplier: 10 })).toBe(0);
    expect(stepValue(1.25, { step: 0.01, direction: 1, precision: 2 })).toBe(1.26);
    expect(stepValue(null, { step: 1, direction: 1, min: 5 })).toBe(5);
    expect(stepValue(null, { step: 1, direction: -1 })).toBe(0);
    expect(stepValue(null, { step: 1, direction: 1, max: -3 })).toBe(-3);
  });
});

describe("parseLocaleNumber — rejects malformed input (iteration 2)", () => {
  it.each([
    ["en-US", "1,2345"],
    ["en-US", "1,234,5"],
    ["en-US", "12,3,456"],
    ["en-US", "1234,567"],
    ["en-US", "1,234.5,6"],
    ["en-US", "1-2"],
    ["en-US", "--5"],
    ["en-US", "-5-"],
    ["en-US", "-(5)"],
    ["en-US", "(5"],
    ["en-US", "1e3"],
    ["en-US", "0x10"],
    ["en-US", "Infinity"],
    ["en-US", "1,"],
    ["de-DE", "1.2345"],
    ["de-DE", "1.234.5"],
    ["fr-FR", "1 2345,5"],
    ["en-IN", "1,234,567"],
    ["en-IN", "12,3,456"],
  ])("%s %s → NaN", (locale, input) => {
    expect(parseLocaleNumber(input, locale)).toBeNaN();
  });

  it("decimal heuristic only for a single separator + 1–2 digits", () => {
    expect(parseLocaleNumber("1,5", "en-US")).toBe(1.5);
    expect(parseLocaleNumber("10,25", "en-US")).toBe(10.25);
    expect(parseLocaleNumber("12,34", "en-US")).toBe(12.34);
    expect(parseLocaleNumber("1,234", "en-US")).toBe(1234);
    expect(parseLocaleNumber("1.5", "de-DE")).toBe(1.5);
  });

  it("accepts one sign in a leading / trailing / accounting position", () => {
    expect(parseLocaleNumber("-5", "en-US")).toBe(-5);
    expect(parseLocaleNumber("5-", "en-US")).toBe(-5);
    expect(parseLocaleNumber("\u22125", "en-US")).toBe(-5);
    expect(parseLocaleNumber("(1,234.50)", "en-US")).toBe(-1234.5);
    expect(parseLocaleNumber("($5.00)", "en-US", { style: "currency", currency: "USD", currencySign: "accounting" })).toBe(-5);
    expect(parseLocaleNumber("-$5.00", "en-US", { style: "currency", currency: "USD" })).toBe(-5);
    expect(parseLocaleNumber("-1.2K", "en-US", { notation: "compact" })).toBe(-1200);
  });

  it("still accepts every valid format", () => {
    expect(parseLocaleNumber("1.234,56", "de-DE")).toBe(1234.56);
    expect(parseLocaleNumber("1\u202F234,5", "fr-FR")).toBe(1234.5);
    expect(parseLocaleNumber("1\u00A0234,5", "fr-FR")).toBe(1234.5);
    expect(parseLocaleNumber("1’234.5", "de-CH")).toBe(1234.5);
    expect(parseLocaleNumber("1'234.5", "de-CH")).toBe(1234.5);
    expect(parseLocaleNumber("1,23,456", "en-IN")).toBe(123456);
    expect(parseLocaleNumber("١٢٣", "ar-EG")).toBe(123);
    expect(parseLocaleNumber("25%", "en-US", { style: "percent" })).toBe(0.25);
    expect(parseLocaleNumber("$1,234.50", "en-US", { style: "currency", currency: "USD" })).toBe(1234.5);
    expect(parseLocaleNumber("1.2K", "en-US", { notation: "compact" })).toBe(1200);
  });

  it("isNegativeInput", () => {
    expect(isNegativeInput("-5", "en-US")).toBe(true);
    expect(isNegativeInput("(5)", "en-US")).toBe(true);
    expect(isNegativeInput("-0", "en-US")).toBe(true);
    expect(isNegativeInput("5", "en-US")).toBe(false);
    expect(isNegativeInput("1-2", "en-US")).toBe(false);
  });
});
