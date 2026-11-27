/* ucs:component-css */
import "./styles/components/molecules/Calendar/Calendar.css";
// src/components/molecules/Calendar/index.tsx
import { useEffect, useMemo, useRef, useState } from "react";

// src/components/molecules/Calendar/Calendar.config.ts
var defaultCalendarOptions = {
  firstDayOfWeek: 0,
  // Sunday
  fullWidth: true,
  showWeekNumbers: false,
  mode: "single",
  animation: "slide",
  cellHoverAnimation: true,
  /** shadcn-like: bordered card, no heavy shadow */
  variant: "outlined",
  elevation: "none",
  bordered: true,
  hoverable: false,
  size: "md"
};
var getElevationShadow = (elevation) => {
  switch (elevation) {
    case "none":
      return "none";
    case "sm":
      return "var(--shadow-sm)";
    case "lg":
      return "var(--shadow-lg)";
    case "md":
    default:
      return "var(--shadow-md)";
  }
};
var resolveElevation = (elevation, variant) => {
  if (elevation !== void 0)
    return elevation;
  switch (variant) {
    case "elevated":
      return "md";
    case "filled":
      return "sm";
    case "outlined":
    default:
      return "none";
  }
};
var defaultTheme = {
  // Interaction-state roles (tokens.css): theme accent in every theme; Infinia pins the previous
  // primary-button fill / 8% mix / on-primary text, so it renders unchanged.
  primary: "var(--color-day-selected-bg, var(--button-primary-default-bg))",
  primaryHover: "var(--color-day-hover-bg, color-mix(in srgb, var(--button-primary-default-bg) 8%, transparent))",
  primaryText: "var(--color-day-selected-fg, var(--color-text-on-primary))",
  rangeBackground: "var(--color-accent-sky-10)",
  todayBackground: "var(--color-accent-amber-10)",
  todayRing: "color-mix(in srgb, var(--color-state-warning) 50%, transparent)",
  text: "var(--color-text-primary)",
  textSecondary: "var(--color-text-secondary)",
  textDisabled: "var(--color-text-disabled)",
  background: "var(--color-bg-surface)",
  border: "var(--color-border-default)",
  selectBorder: "var(--color-border-default)",
  focusRing: "color-mix(in srgb, var(--color-focus-ring) 25%, transparent)",
  padding: 12,
  gap: 2,
  cellSize: 36,
  borderRadius: 8,
  cellRadius: 6,
  navButtonSize: 28,
  cellFontSize: 14,
  weekdayFontSize: 11,
  fontFamily: "var(--font-family), system-ui, sans-serif",
  maxWidth: 320
};
var sizeOverrides = {
  sm: {
    padding: 12,
    gap: 4,
    cellSize: 32,
    borderRadius: 12,
    cellRadius: 8,
    navButtonSize: 28,
    cellFontSize: 12,
    weekdayFontSize: 10,
    maxWidth: 280
  },
  md: {},
  lg: {
    padding: 24,
    gap: 8,
    cellSize: 48,
    borderRadius: 20,
    cellRadius: 12,
    navButtonSize: 44,
    cellFontSize: 16,
    weekdayFontSize: 12,
    maxWidth: 380
  }
};
var getResolvedTheme = (theme, size) => {
  const sizeTheme = size ? sizeOverrides[size] : {};
  return {
    ...defaultTheme,
    ...sizeTheme,
    ...theme
  };
};
var toCssValue = (v) => {
  if (v === void 0)
    return void 0;
  return typeof v === "number" ? `${v}px` : String(v);
};
var themeToCssVars = (theme) => {
  const vars = {};
  if (theme.primary)
    vars["--cal-primary"] = theme.primary;
  if (theme.primaryHover)
    vars["--cal-primary-hover"] = theme.primaryHover;
  if (theme.primaryText)
    vars["--cal-primary-text"] = theme.primaryText;
  if (theme.rangeBackground)
    vars["--cal-range-bg"] = theme.rangeBackground;
  if (theme.todayBackground)
    vars["--cal-today-bg"] = theme.todayBackground;
  if (theme.todayRing)
    vars["--cal-today-ring"] = theme.todayRing;
  if (theme.text)
    vars["--cal-text"] = theme.text;
  if (theme.textSecondary)
    vars["--cal-text-secondary"] = theme.textSecondary;
  if (theme.textDisabled)
    vars["--cal-text-disabled"] = theme.textDisabled;
  if (theme.background)
    vars["--cal-bg"] = theme.background;
  if (theme.border)
    vars["--cal-border"] = theme.border;
  if (theme.selectBorder)
    vars["--cal-select-border"] = theme.selectBorder;
  if (theme.focusRing)
    vars["--cal-focus-ring"] = theme.focusRing;
  if (theme.padding !== void 0)
    vars["--cal-padding"] = toCssValue(theme.padding);
  if (theme.gap !== void 0)
    vars["--cal-gap"] = toCssValue(theme.gap);
  if (theme.cellSize !== void 0) {
    const cs = toCssValue(theme.cellSize);
    vars["--cal-cell-size"] = cs;
    vars["--cell-size"] = cs;
  }
  if (theme.borderRadius !== void 0)
    vars["--cal-radius"] = toCssValue(theme.borderRadius);
  if (theme.cellRadius !== void 0)
    vars["--cal-cell-radius"] = toCssValue(theme.cellRadius);
  if (theme.navButtonSize !== void 0)
    vars["--cal-nav-size"] = toCssValue(theme.navButtonSize);
  if (theme.cellFontSize !== void 0)
    vars["--cal-cell-font"] = toCssValue(theme.cellFontSize);
  if (theme.weekdayFontSize !== void 0)
    vars["--cal-weekday-font"] = toCssValue(theme.weekdayFontSize);
  if (theme.fontFamily)
    vars["--cal-font"] = theme.fontFamily;
  if (theme.maxWidth !== void 0)
    vars["--cal-max-width"] = toCssValue(theme.maxWidth);
  if (theme.boxShadow)
    vars["--cal-shadow"] = theme.boxShadow;
  return vars;
};

// src/components/atoms/DatePicker/DatePicker.utils.ts
var isValidDate = (dateStr, format = "MM/DD/YYYY") => {
  if (!dateStr || dateStr.trim() === "") {
    return false;
  }
  const cleanStr = dateStr.replace(/[^\d/\-.]/g, "").trim();
  const separators = ["/", "-", "."];
  let parts = [];
  let foundSeparator = "";
  for (const sep of separators) {
    if (cleanStr.includes(sep)) {
      parts = cleanStr.split(sep);
      foundSeparator = sep;
      break;
    }
  }
  if (!foundSeparator && cleanStr.length >= 6) {
    const formatUpper2 = format.toUpperCase();
    if ((formatUpper2 === "MM/DD/YYYY" || formatUpper2 === "MM-DD-YYYY" || formatUpper2 === "MM.DD.YYYY") && cleanStr.length === 8) {
      parts = [
        cleanStr.substring(0, 2),
        // month
        cleanStr.substring(2, 4),
        // day
        cleanStr.substring(4, 8)
        // year
      ];
    } else if ((formatUpper2 === "DD/MM/YYYY" || formatUpper2 === "DD-MM-YYYY" || formatUpper2 === "DD.MM.YYYY") && cleanStr.length === 8) {
      parts = [
        cleanStr.substring(0, 2),
        // day
        cleanStr.substring(2, 4),
        // month
        cleanStr.substring(4, 8)
        // year
      ];
    } else if ((formatUpper2 === "MM/DD/YYYY" || formatUpper2 === "MM-DD-YYYY" || formatUpper2 === "MM.DD.YYYY") && cleanStr.length === 8) {
      parts = [
        cleanStr.substring(0, 2),
        // month
        cleanStr.substring(2, 4),
        // day
        cleanStr.substring(4, 8)
        // year
      ];
    } else if (formatUpper2 === "YYYY-MM-DD" && cleanStr.length === 8) {
      parts = [
        cleanStr.substring(0, 4),
        // year
        cleanStr.substring(4, 6),
        // month
        cleanStr.substring(6, 8)
        // day
      ];
    } else if (cleanStr.length === 6) {
      if (formatUpper2 === "MM/DD/YYYY" || formatUpper2 === "MM/DD/YY") {
        parts = [
          cleanStr.substring(0, 2),
          // month
          cleanStr.substring(2, 4),
          // day
          cleanStr.substring(4, 6)
          // year (2-digit)
        ];
      } else if (formatUpper2 === "DD/MM/YYYY" || formatUpper2 === "DD/MM/YY") {
        parts = [
          cleanStr.substring(0, 2),
          // day
          cleanStr.substring(2, 4),
          // month
          cleanStr.substring(4, 6)
          // year (2-digit)
        ];
      }
    }
  }
  if (parts.length !== 3) {
    return false;
  }
  const formatUpper = format.toUpperCase();
  let month, day, year;
  try {
    if (formatUpper === "MM/DD/YYYY" || formatUpper === "MM-DD-YYYY" || formatUpper === "MM.DD.YYYY") {
      month = parseInt(parts[0], 10);
      day = parseInt(parts[1], 10);
      year = parseInt(parts[2], 10);
    } else if (formatUpper === "DD/MM/YYYY" || formatUpper === "DD-MM-YYYY" || formatUpper === "DD.MM.YYYY") {
      day = parseInt(parts[0], 10);
      month = parseInt(parts[1], 10);
      year = parseInt(parts[2], 10);
    } else if (formatUpper === "YYYY/MM/DD" || formatUpper === "YYYY-MM-DD" || formatUpper === "YYYY.MM.DD") {
      year = parseInt(parts[0], 10);
      month = parseInt(parts[1], 10);
      day = parseInt(parts[2], 10);
    } else if (formatUpper === "MM/DD/YY" || formatUpper === "MM-DD-YY" || formatUpper === "MM.DD.YY") {
      month = parseInt(parts[0], 10);
      day = parseInt(parts[1], 10);
      const shortYear = parseInt(parts[2], 10);
      year = shortYear < 50 ? 2e3 + shortYear : 1900 + shortYear;
    } else if (formatUpper === "DD/MM/YY" || formatUpper === "DD-MM-YY" || formatUpper === "DD.MM.YY") {
      day = parseInt(parts[0], 10);
      month = parseInt(parts[1], 10);
      const shortYear = parseInt(parts[2], 10);
      year = shortYear < 50 ? 2e3 + shortYear : 1900 + shortYear;
    } else {
      month = parseInt(parts[0], 10);
      day = parseInt(parts[1], 10);
      year = parseInt(parts[2], 10);
    }
    if (isNaN(month) || isNaN(day) || isNaN(year)) {
      return false;
    }
    if (month < 1 || month > 12) {
      return false;
    }
    const daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    if (month === 2) {
      const isLeapYear = year % 4 === 0 && year % 100 !== 0 || year % 400 === 0;
      daysInMonth[1] = isLeapYear ? 29 : 28;
    }
    if (day < 1 || day > daysInMonth[month - 1]) {
      return false;
    }
    if (formatUpper.includes("YYYY")) {
      if (year < 1e3 || year > 9999) {
        return false;
      }
      const yearStr = formatUpper.startsWith("YYYY") ? parts[0] : parts[2];
      if (yearStr.length !== 4) {
        return false;
      }
    } else if (formatUpper.includes("YY")) {
      if (year < 1900 || year > 2099) {
        return false;
      }
    }
    const date = new Date(year, month - 1, day);
    const isValid = date.getFullYear() === year && date.getMonth() === month - 1 && date.getDate() === day;
    return isValid;
  } catch (error) {
    return false;
  }
};
var formatDateString = (dateStr, fromFormat = "MM/DD/YYYY", toFormat = "DD-MM-YYYY") => {
  if (!dateStr || !isValidDate(dateStr, fromFormat)) {
    return dateStr;
  }
  try {
    const cleanStr = dateStr.replace(/[^\d/\-.]/g, "").trim();
    const separators = ["/", "-", "."];
    let parts = [];
    for (const sep of separators) {
      if (cleanStr.includes(sep)) {
        parts = cleanStr.split(sep);
        break;
      }
    }
    if (parts.length === 1 && cleanStr.length === 8) {
      const fromUpper2 = fromFormat.toUpperCase();
      if (fromUpper2 === "MM/DD/YYYY") {
        parts = [cleanStr.substring(0, 2), cleanStr.substring(2, 4), cleanStr.substring(4, 8)];
      } else if (fromUpper2 === "DD/MM/YYYY") {
        parts = [cleanStr.substring(0, 2), cleanStr.substring(2, 4), cleanStr.substring(4, 8)];
      } else if (fromUpper2 === "YYYY-MM-DD") {
        parts = [cleanStr.substring(0, 4), cleanStr.substring(4, 6), cleanStr.substring(6, 8)];
      }
    }
    if (parts.length !== 3) {
      return dateStr;
    }
    let month, day, year;
    const fromUpper = fromFormat.toUpperCase();
    if (fromUpper === "MM/DD/YYYY" || fromUpper === "MM-DD-YYYY" || fromUpper === "MM.DD.YYYY") {
      month = parts[0];
      day = parts[1];
      year = parts[2];
    } else if (fromUpper === "DD/MM/YYYY" || fromUpper === "DD-MM-YYYY" || fromUpper === "DD.MM.YYYY") {
      day = parts[0];
      month = parts[1];
      year = parts[2];
    } else if (fromUpper === "YYYY/MM/DD" || fromUpper === "YYYY-MM-DD" || fromUpper === "YYYY.MM.DD") {
      year = parts[0];
      month = parts[1];
      day = parts[2];
    } else if (fromUpper === "MM/DD/YY" || fromUpper === "MM-DD-YY" || fromUpper === "MM.DD.YY") {
      month = parts[0];
      day = parts[1];
      const shortYear = parseInt(parts[2], 10);
      year = shortYear < 50 ? `20${parts[2].padStart(2, "0")}` : `19${parts[2].padStart(2, "0")}`;
    } else if (fromUpper === "DD/MM/YY" || fromUpper === "DD-MM-YY" || fromUpper === "DD.MM.YY") {
      day = parts[0];
      month = parts[1];
      const shortYear = parseInt(parts[2], 10);
      year = shortYear < 50 ? `20${parts[2].padStart(2, "0")}` : `19${parts[2].padStart(2, "0")}`;
    } else {
      month = parts[0];
      day = parts[1];
      year = parts[2];
    }
    month = month.padStart(2, "0");
    day = day.padStart(2, "0");
    if (year.length === 2) {
      const shortYear = parseInt(year, 10);
      year = shortYear < 50 ? `20${year}` : `19${year}`;
    }
    const toUpper = (toFormat || "DD-MM-YYYY").trim().toUpperCase();
    if (toUpper === "MM/DD/YYYY") {
      return `${month}/${day}/${year}`;
    } else if (toUpper === "DD/MM/YYYY") {
      return `${day}/${month}/${year}`;
    } else if (toUpper === "YYYY-MM-DD") {
      return `${year}-${month}-${day}`;
    } else if (toUpper === "MM-DD-YYYY") {
      return `${month}-${day}-${year}`;
    } else if (toUpper === "DD-MM-YYYY") {
      return `${day}-${month}-${year}`;
    } else if (toUpper === "DD.MM.YYYY") {
      return `${day}.${month}.${year}`;
    } else if (toUpper === "MM.DD.YYYY") {
      return `${month}.${day}.${year}`;
    } else if (toUpper === "YYYY/MM/DD") {
      return `${year}/${month}/${day}`;
    } else if (toUpper === "MMMM DD, YYYY") {
      const monthNames = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December"
      ];
      const monthName = monthNames[parseInt(month, 10) - 1];
      return `${monthName} ${parseInt(day, 10)}, ${year}`;
    } else if (toUpper === "DD MMMM YYYY") {
      const monthNames = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December"
      ];
      const monthName = monthNames[parseInt(month, 10) - 1];
      return `${parseInt(day, 10)} ${monthName} ${year}`;
    } else if (toUpper === "DD MMM YYYY") {
      const monthNames = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec"
      ];
      const monthName = monthNames[parseInt(month, 10) - 1];
      return `${parseInt(day, 10)} ${monthName} ${year}`;
    } else if (toUpper === "MM/DD/YY") {
      const shortYear = year.substring(2);
      return `${month}/${day}/${shortYear}`;
    } else if (toUpper === "DD/MM/YY") {
      const shortYear = year.substring(2);
      return `${day}/${month}/${shortYear}`;
    } else if (toUpper === "DD-MM-YY") {
      const shortYear = year.substring(2);
      return `${day}-${month}-${shortYear}`;
    } else if (toUpper === "MM-DD-YY") {
      const shortYear = year.substring(2);
      return `${month}-${day}-${shortYear}`;
    }
    return `${day}-${month}-${year}`;
  } catch (error) {
    console.error("Error formatting date:", error);
    return dateStr;
  }
};
var parseFlexible8DigitDate = (digits, preferredFormat = "MM/DD/YYYY") => {
  if (!digits || digits.replace(/\D/g, "").length !== 8)
    return null;
  const d = digits.replace(/\D/g, "");
  const yyyyFirst = d.substring(0, 4);
  const dd = d.substring(0, 2);
  const mm = d.substring(2, 4);
  const yyyy = d.substring(4, 8);
  const yearFirst = parseInt(yyyyFirst, 10);
  const isLikelyYYYYMMDD = yearFirst >= 1900 && yearFirst <= 2100;
  if (isLikelyYYYYMMDD) {
    const asYYYYMMDD = `${yyyyFirst}-${d.substring(4, 6)}-${d.substring(6, 8)}`;
    if (isValidDate(asYYYYMMDD, "YYYY-MM-DD")) {
      return parseDate(asYYYYMMDD, "YYYY-MM-DD");
    }
  }
  const asDDMM = `${dd}/${mm}/${yyyy}`;
  const asMMDD = `${mm}/${dd}/${yyyy}`;
  const validDDMM = isValidDate(asDDMM, "DD/MM/YYYY");
  const validMMDD = isValidDate(asMMDD, "MM/DD/YYYY");
  const pref = preferredFormat.toUpperCase();
  if (pref.includes("DD") && pref.indexOf("DD") < pref.indexOf("MM")) {
    if (validDDMM)
      return parseDate(asDDMM, "DD/MM/YYYY");
    if (validMMDD)
      return parseDate(asMMDD, "MM/DD/YYYY");
  } else {
    if (validMMDD)
      return parseDate(asMMDD, "MM/DD/YYYY");
    if (validDDMM)
      return parseDate(asDDMM, "DD/MM/YYYY");
  }
  return null;
};
var parseFlexible6DigitDate = (digits, preferredFormat = "MM/DD/YYYY") => {
  if (!digits || digits.replace(/\D/g, "").length !== 6)
    return null;
  const d = digits.replace(/\D/g, "");
  const p1 = d.substring(0, 2);
  const p2 = d.substring(2, 4);
  const yy = d.substring(4, 6);
  const str = `${p1}/${p2}/${yy}`;
  const validDDMM = isValidDate(str, "DD/MM/YY");
  const validMMDD = isValidDate(str, "MM/DD/YY");
  const pref = preferredFormat.toUpperCase();
  if (pref.includes("DD") && pref.indexOf("DD") < pref.indexOf("MM")) {
    if (validDDMM)
      return parseDate(str, "DD/MM/YY");
    if (validMMDD)
      return parseDate(str, "MM/DD/YY");
  } else {
    if (validMMDD)
      return parseDate(str, "MM/DD/YY");
    if (validDDMM)
      return parseDate(str, "DD/MM/YY");
  }
  return null;
};
var parseFlexibleDate = (input, preferredFormat = "MM/DD/YYYY") => {
  const trimmed = input.trim().replace(/[^\d/\-.]/g, "");
  const digitsOnly = trimmed.replace(/\D/g, "");
  if (digitsOnly.length === 8) {
    const r = parseFlexible8DigitDate(trimmed, preferredFormat);
    if (r)
      return r;
  }
  if (digitsOnly.length === 6) {
    const r = parseFlexible6DigitDate(trimmed, preferredFormat);
    if (r)
      return r;
  }
  if (isValidDate(trimmed, preferredFormat)) {
    return parseDate(trimmed, preferredFormat);
  }
  if (isValidDate(trimmed, "YYYY-MM-DD")) {
    return parseDate(trimmed, "YYYY-MM-DD");
  }
  if (isValidDate(trimmed, "DD/MM/YYYY")) {
    return parseDate(trimmed, "DD/MM/YYYY");
  }
  if (isValidDate(trimmed, "MM/DD/YYYY")) {
    return parseDate(trimmed, "MM/DD/YYYY");
  }
  return null;
};
var parseDate = (dateStr, format = "MM/DD/YYYY") => {
  if (!isValidDate(dateStr, format)) {
    return null;
  }
  try {
    const cleanStr = dateStr.replace(/[^\d/\-.]/g, "").trim();
    const separators = ["/", "-", "."];
    let parts = [];
    for (const sep of separators) {
      if (cleanStr.includes(sep)) {
        parts = cleanStr.split(sep);
        break;
      }
    }
    if (parts.length === 1 && cleanStr.length === 8) {
      const formatUpper2 = format.toUpperCase();
      if (formatUpper2 === "MM/DD/YYYY" || formatUpper2 === "MM-DD-YYYY" || formatUpper2 === "MM.DD.YYYY") {
        parts = [cleanStr.substring(0, 2), cleanStr.substring(2, 4), cleanStr.substring(4, 8)];
      } else if (formatUpper2 === "DD/MM/YYYY" || formatUpper2 === "DD-MM-YYYY" || formatUpper2 === "DD.MM.YYYY") {
        parts = [cleanStr.substring(0, 2), cleanStr.substring(2, 4), cleanStr.substring(4, 8)];
      } else if (formatUpper2 === "YYYY-MM-DD") {
        parts = [cleanStr.substring(0, 4), cleanStr.substring(4, 6), cleanStr.substring(6, 8)];
      }
    }
    if (parts.length !== 3) {
      return null;
    }
    let month, day, year;
    const formatUpper = format.toUpperCase();
    if (formatUpper === "MM/DD/YYYY" || formatUpper === "MM-DD-YYYY" || formatUpper === "MM.DD.YYYY") {
      month = parseInt(parts[0], 10);
      day = parseInt(parts[1], 10);
      year = parseInt(parts[2], 10);
    } else if (formatUpper === "DD/MM/YYYY" || formatUpper === "DD-MM-YYYY" || formatUpper === "DD.MM.YYYY") {
      day = parseInt(parts[0], 10);
      month = parseInt(parts[1], 10);
      year = parseInt(parts[2], 10);
    } else if (formatUpper === "YYYY/MM/DD" || formatUpper === "YYYY-MM-DD" || formatUpper === "YYYY.MM.DD") {
      year = parseInt(parts[0], 10);
      month = parseInt(parts[1], 10);
      day = parseInt(parts[2], 10);
    } else if (formatUpper === "MM/DD/YY" || formatUpper === "MM-DD-YY" || formatUpper === "MM.DD.YY") {
      month = parseInt(parts[0], 10);
      day = parseInt(parts[1], 10);
      const shortYear = parseInt(parts[2], 10);
      year = shortYear < 50 ? 2e3 + shortYear : 1900 + shortYear;
    } else if (formatUpper === "DD/MM/YY" || formatUpper === "DD-MM-YY" || formatUpper === "DD.MM.YY") {
      day = parseInt(parts[0], 10);
      month = parseInt(parts[1], 10);
      const shortYear = parseInt(parts[2], 10);
      year = shortYear < 50 ? 2e3 + shortYear : 1900 + shortYear;
    } else {
      month = parseInt(parts[0], 10);
      day = parseInt(parts[1], 10);
      year = parseInt(parts[2], 10);
    }
    return new Date(year, month - 1, day);
  } catch (error) {
    return null;
  }
};
var isDateInRange = (dateStr, minDate, maxDate, format = "MM/DD/YYYY") => {
  const date = parseDate(dateStr, format);
  if (!date)
    return false;
  if (minDate) {
    const min = parseDate(minDate, format);
    if (min && date < min)
      return false;
  }
  if (maxDate) {
    const max = parseDate(maxDate, format);
    if (max && date > max)
      return false;
  }
  return true;
};
var normalizeDate = (date) => {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
};
var isSameDay = (a, b) => {
  if (!a || !b)
    return false;
  return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();
};
var isBeforeDay = (a, b) => {
  if (!a || !b)
    return false;
  return normalizeDate(a).getTime() < normalizeDate(b).getTime();
};
var isAfterDay = (a, b) => {
  if (!a || !b)
    return false;
  return normalizeDate(a).getTime() > normalizeDate(b).getTime();
};
var isBetweenDays = (target, start, end) => {
  if (!target || !start || !end)
    return false;
  const time = normalizeDate(target).getTime();
  const startTime = normalizeDate(start).getTime();
  const endTime = normalizeDate(end).getTime();
  return time > startTime && time < endTime;
};
var addMonths = (date, months) => {
  return new Date(date.getFullYear(), date.getMonth() + months, 1);
};
var startOfMonth = (date) => {
  return new Date(date.getFullYear(), date.getMonth(), 1);
};
var MONTH_NAMES = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December"
];
var getMonthOptions = () => {
  return MONTH_NAMES.map((name, index) => ({ value: index, label: name }));
};
var getYearOptions = (centerYear, range = 50) => {
  const start = centerYear - range;
  const end = centerYear + range;
  const years = [];
  for (let y = start; y <= end; y++) {
    years.push({ value: y, label: String(y) });
  }
  return years;
};
var formatDateForDisplay = (date, format = "DD-MM-YYYY") => {
  if (!date)
    return "";
  const resolvedFormat = (format || "DD-MM-YYYY").trim() || "DD-MM-YYYY";
  const yyyy = date.getFullYear();
  const mm = `${date.getMonth() + 1}`.padStart(2, "0");
  const dd = `${date.getDate()}`.padStart(2, "0");
  return formatDateString(`${yyyy}-${mm}-${dd}`, "YYYY-MM-DD", resolvedFormat);
};
var getCalendarDays = (month) => {
  const firstOfMonth = startOfMonth(month);
  const firstWeekday = firstOfMonth.getDay();
  const days = [];
  for (let index = 0; index < 42; index += 1) {
    const dayOffset = index - firstWeekday;
    const date = new Date(firstOfMonth.getFullYear(), firstOfMonth.getMonth(), 1 + dayOffset);
    days.push({
      date,
      inCurrentMonth: date.getMonth() === firstOfMonth.getMonth()
    });
  }
  return days;
};

// src/components/molecules/Calendar/Calendar.utils.ts
var WEEKDAY_LABELS_SUNDAY = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
var WEEKDAY_LABELS_MONDAY = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
var getWeekdayLabels = (firstDayOfWeek) => {
  return firstDayOfWeek === 1 ? WEEKDAY_LABELS_MONDAY : WEEKDAY_LABELS_SUNDAY;
};
var getCalendarDaysWithFirstDay = (month, firstDayOfWeek) => {
  if (firstDayOfWeek === 0)
    return getCalendarDays(month);
  const firstOfMonth = startOfMonth(month);
  const firstWeekday = firstOfMonth.getDay();
  const startOffset = (firstWeekday - 1 + 7) % 7;
  const result = [];
  for (let i = 0; i < 42; i++) {
    const dayOffset = i - startOffset;
    const date = new Date(
      firstOfMonth.getFullYear(),
      firstOfMonth.getMonth(),
      1 + dayOffset
    );
    result.push({
      date,
      inCurrentMonth: date.getMonth() === firstOfMonth.getMonth()
    });
  }
  return result;
};
var getWeekNumber = (date) => {
  const d = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
  const dayNum = d.getUTCDay() || 7;
  d.setUTCDate(d.getUTCDate() + 4 - dayNum);
  const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
  return Math.ceil(((d.getTime() - yearStart.getTime()) / 864e5 + 1) / 7);
};

// src/components/molecules/Calendar/index.tsx
import { jsx, jsxs } from "react/jsx-runtime";
function ChevronLeft({ size = 16 }) {
  return /* @__PURE__ */ jsx("svg", { width: size, height: size, viewBox: "0 0 24 24", fill: "none", "aria-hidden": "true", children: /* @__PURE__ */ jsx(
    "path",
    {
      d: "M15 18l-6-6 6-6",
      stroke: "currentColor",
      strokeWidth: "2",
      strokeLinecap: "round",
      strokeLinejoin: "round"
    }
  ) });
}
function ChevronRight({ size = 16 }) {
  return /* @__PURE__ */ jsx("svg", { width: size, height: size, viewBox: "0 0 24 24", fill: "none", "aria-hidden": "true", children: /* @__PURE__ */ jsx(
    "path",
    {
      d: "M9 18l6-6-6-6",
      stroke: "currentColor",
      strokeWidth: "2",
      strokeLinecap: "round",
      strokeLinejoin: "round"
    }
  ) });
}
function ChevronDownSmall({ size = 14 }) {
  return /* @__PURE__ */ jsx("svg", { width: size, height: size, viewBox: "0 0 20 20", fill: "none", "aria-hidden": "true", children: /* @__PURE__ */ jsx(
    "path",
    {
      d: "M5 7.5L10 12.5L15 7.5",
      stroke: "currentColor",
      strokeWidth: "2",
      strokeLinecap: "round",
      strokeLinejoin: "round"
    }
  ) });
}
var pad2 = (n) => String(n).padStart(2, "0");
var toDayKey = (d) => `${d.getFullYear()}-${pad2(d.getMonth() + 1)}-${pad2(d.getDate())}`;
var toMonthKey = (d) => `${d.getFullYear()}-${pad2(d.getMonth() + 1)}`;
var shiftMonthClamped = (d, delta) => {
  const target = new Date(d.getFullYear(), d.getMonth() + delta, 1);
  const last = new Date(target.getFullYear(), target.getMonth() + 1, 0).getDate();
  return new Date(target.getFullYear(), target.getMonth(), Math.min(d.getDate(), last));
};
var Calendar = ({
  month: monthProp,
  hideNavigation = false,
  captionLayout = "menus",
  value,
  onChange,
  defaultValue,
  minDate,
  maxDate,
  disabled = false,
  readOnly = false,
  showWeekNumbers = defaultCalendarOptions.showWeekNumbers,
  fullWidth = defaultCalendarOptions.fullWidth,
  className = "",
  dateCellRender,
  onMonthChange,
  onYearChange,
  firstDayOfWeek = defaultCalendarOptions.firstDayOfWeek,
  mode = defaultCalendarOptions.mode,
  rangeValue,
  onRangeChange,
  disabledDate,
  animation = defaultCalendarOptions.animation,
  cellHoverAnimation = defaultCalendarOptions.cellHoverAnimation,
  variant = defaultCalendarOptions.variant,
  elevation: elevationProp,
  bordered = defaultCalendarOptions.bordered,
  hoverable = defaultCalendarOptions.hoverable,
  radius,
  size = defaultCalendarOptions.size,
  theme: themeProp,
  style: styleProp,
  styles: stylesProp
}) => {
  var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j, _k, _l, _m, _n, _o, _p, _q, _r, _s, _t, _u, _v, _w;
  const [isHovered, setIsHovered] = useState(false);
  const resolvedElevation = resolveElevation(elevationProp, variant);
  const boxShadow = (_a = themeProp == null ? void 0 : themeProp.boxShadow) != null ? _a : hoverable && isHovered ? getElevationShadow("lg") : getElevationShadow(resolvedElevation);
  const theme = useMemo(
    () => getResolvedTheme(themeProp, size),
    [themeProp, size]
  );
  const cssVars = useMemo(() => themeToCssVars(theme), [theme]);
  const isControlled = value !== void 0;
  const isRangeControlled = rangeValue !== void 0;
  const minParsed = useMemo(() => {
    var _a2;
    if (!minDate)
      return null;
    if (minDate instanceof Date)
      return minDate;
    return (_a2 = parseDate(minDate, "YYYY-MM-DD")) != null ? _a2 : parseDate(minDate, "MM/DD/YYYY");
  }, [minDate]);
  const maxParsed = useMemo(() => {
    var _a2;
    if (!maxDate)
      return null;
    if (maxDate instanceof Date)
      return maxDate;
    return (_a2 = parseDate(maxDate, "YYYY-MM-DD")) != null ? _a2 : parseDate(maxDate, "MM/DD/YYYY");
  }, [maxDate]);
  const [internalValue, setInternalValue] = useState(
    defaultValue != null ? defaultValue : null
  );
  const [internalRange, setInternalRange] = useState([null, null]);
  const selectedDate = isControlled ? value : internalValue;
  const selectedRange = isRangeControlled ? rangeValue : internalRange;
  const isMonthControlled = monthProp !== void 0;
  const [internalMonth, setInternalMonth] = useState(
    () => startOfMonth(
      monthProp || selectedDate || selectedRange[0] || selectedRange[1] || /* @__PURE__ */ new Date()
    )
  );
  const visibleMonth = isMonthControlled ? startOfMonth(monthProp) : internalMonth;
  const goToMonth = (next) => {
    const m = startOfMonth(next);
    if (!isMonthControlled) {
      setInternalMonth(m);
    }
    onMonthChange == null ? void 0 : onMonthChange(m);
  };
  useEffect(() => {
    if (isMonthControlled)
      return;
    const anchor = selectedDate || selectedRange[0] || selectedRange[1] || /* @__PURE__ */ new Date();
    setInternalMonth(startOfMonth(anchor));
  }, [isMonthControlled, selectedDate, selectedRange[0], selectedRange[1]]);
  const calendarDays = useMemo(
    () => getCalendarDaysWithFirstDay(visibleMonth, firstDayOfWeek),
    [visibleMonth, firstDayOfWeek]
  );
  const rootRef = useRef(null);
  const [focusedDate, setFocusedDate] = useState(null);
  const pendingFocusRef = useRef(null);
  const weekdayLabels = useMemo(
    () => getWeekdayLabels(firstDayOfWeek),
    [firstDayOfWeek]
  );
  const monthOptions = getMonthOptions();
  const centerYear = visibleMonth.getFullYear();
  const yearOptions = getYearOptions(centerYear);
  const isDisabledDate = (date) => {
    if (disabled || readOnly)
      return false;
    if (minParsed && isBeforeDay(date, minParsed))
      return true;
    if (maxParsed && isAfterDay(date, maxParsed))
      return true;
    if (disabledDate == null ? void 0 : disabledDate(date))
      return true;
    return false;
  };
  const handleDateSelect = (date) => {
    if (isDisabledDate(date))
      return;
    if (readOnly || disabled)
      return;
    if (mode === "single") {
      const next = date;
      if (!isControlled)
        setInternalValue(next);
      onChange == null ? void 0 : onChange(next);
      return;
    }
    const [start, end] = selectedRange;
    if (!start || start && end) {
      const next = [date, null];
      if (!isRangeControlled)
        setInternalRange(next);
      onRangeChange == null ? void 0 : onRangeChange(next);
    } else if (isBeforeDay(date, start)) {
      const next = [date, start];
      if (!isRangeControlled)
        setInternalRange(next);
      onRangeChange == null ? void 0 : onRangeChange(next);
    } else {
      const next = [start, date];
      if (!isRangeControlled)
        setInternalRange(next);
      onRangeChange == null ? void 0 : onRangeChange(next);
    }
  };
  const handleMonthChange = (monthIndex) => {
    isInitialMountRef.current = false;
    const next = new Date(visibleMonth.getFullYear(), monthIndex, 1);
    slideDirectionRef.current = next.getTime() > visibleMonth.getTime() ? "next" : "prev";
    goToMonth(next);
  };
  const handleYearChange = (year) => {
    isInitialMountRef.current = false;
    const next = new Date(year, visibleMonth.getMonth(), 1);
    slideDirectionRef.current = next.getTime() > visibleMonth.getTime() ? "next" : "prev";
    goToMonth(next);
    onYearChange == null ? void 0 : onYearChange(next);
  };
  const slideDirectionRef = useRef("next");
  const isInitialMountRef = useRef(true);
  const [captionPick, setCaptionPick] = useState(null);
  const captionMenusRef = useRef(null);
  const monthShortLabels = useMemo(
    () => Array.from(
      { length: 12 },
      (_, m) => new Date(2024, m, 1).toLocaleDateString(void 0, { month: "short" })
    ),
    []
  );
  const visibleMonthTime = visibleMonth.getTime();
  useEffect(() => {
    setCaptionPick(null);
  }, [visibleMonthTime]);
  useEffect(() => {
    if (!captionPick)
      return;
    const onPointerDown = (e) => {
      var _a2;
      if ((_a2 = captionMenusRef.current) == null ? void 0 : _a2.contains(e.target))
        return;
      setCaptionPick(null);
    };
    const onKey = (e) => {
      if (e.key === "Escape")
        setCaptionPick(null);
    };
    document.addEventListener("mousedown", onPointerDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onPointerDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [captionPick]);
  const handlePrevMonth = () => {
    isInitialMountRef.current = false;
    slideDirectionRef.current = "prev";
    goToMonth(addMonths(visibleMonth, -1));
  };
  const handleNextMonth = () => {
    isInitialMountRef.current = false;
    slideDirectionRef.current = "next";
    goToMonth(addMonths(visibleMonth, 1));
  };
  const today = /* @__PURE__ */ new Date();
  const [rangeStart, rangeEnd] = selectedRange;
  const isInVisibleMonth = (d) => !!d && d.getMonth() === visibleMonth.getMonth() && d.getFullYear() === visibleMonth.getFullYear();
  const tabbableKey = (() => {
    const candidates = [focusedDate, selectedDate, rangeStart, rangeEnd, today];
    const hit = candidates.find((d) => isInVisibleMonth(d) && !isDisabledDate(d));
    if (hit)
      return toDayKey(hit);
    const firstEnabled = calendarDays.find((d) => d.inCurrentMonth && !isDisabledDate(d.date));
    return firstEnabled ? toDayKey(firstEnabled.date) : toDayKey(visibleMonth);
  })();
  useEffect(() => {
    var _a2;
    const pending = pendingFocusRef.current;
    if (!pending)
      return;
    const el = (_a2 = rootRef.current) == null ? void 0 : _a2.querySelector(`[data-date="${pending.key}"]`);
    if (el) {
      pendingFocusRef.current = null;
      el.focus();
    } else if (pending.month === toMonthKey(visibleMonth)) {
      pendingFocusRef.current = null;
    }
  });
  const focusDay = (target) => {
    setFocusedDate(target);
    pendingFocusRef.current = { key: toDayKey(target), month: toMonthKey(target) };
    if (!isInVisibleMonth(target)) {
      isInitialMountRef.current = false;
      slideDirectionRef.current = target.getTime() > visibleMonth.getTime() ? "next" : "prev";
      goToMonth(target);
    }
  };
  const handleDayKeyDown = (from, e) => {
    const y = from.getFullYear();
    const m = from.getMonth();
    const d = from.getDate();
    const weekOffset = (from.getDay() - firstDayOfWeek + 7) % 7;
    let next;
    let step = 0;
    switch (e.key) {
      case "ArrowLeft":
        step = -1;
        next = new Date(y, m, d - 1);
        break;
      case "ArrowRight":
        step = 1;
        next = new Date(y, m, d + 1);
        break;
      case "ArrowUp":
        step = -7;
        next = new Date(y, m, d - 7);
        break;
      case "ArrowDown":
        step = 7;
        next = new Date(y, m, d + 7);
        break;
      case "Home":
        next = new Date(y, m, d - weekOffset);
        break;
      case "End":
        next = new Date(y, m, d + 6 - weekOffset);
        break;
      case "PageUp":
        next = shiftMonthClamped(from, e.shiftKey ? -12 : -1);
        break;
      case "PageDown":
        next = shiftMonthClamped(from, e.shiftKey ? 12 : 1);
        break;
      default:
        return;
    }
    e.preventDefault();
    for (let i = 0; step !== 0 && isDisabledDate(next) && i < 42; i++) {
      next = new Date(next.getFullYear(), next.getMonth(), next.getDate() + step);
    }
    if (isDisabledDate(next))
      return;
    focusDay(next);
  };
  const animClass = animation === "none" || isInitialMountRef.current ? "" : animation === "slide" ? slideDirectionRef.current === "prev" ? "calendar-anim-slide-prev" : "calendar-anim-slide-next" : animation === "fade" ? "calendar-anim-fade" : animation === "scale" ? "calendar-anim-scale" : "";
  const resolvedRadius = radius !== void 0 ? typeof radius === "number" ? `${radius}px` : radius : (_b = theme.borderRadius) != null ? _b : 16;
  const resolvedBackground = variant === "filled" ? "var(--color-bg-page)" : (_c = theme.background) != null ? _c : "var(--color-bg-surface)";
  const containerStyle = {
    ...cssVars,
    width: fullWidth ? "100%" : "auto",
    maxWidth: (_d = theme.maxWidth) != null ? _d : 336,
    padding: (_e = theme.padding) != null ? _e : 20,
    borderRadius: resolvedRadius,
    border: bordered ? `1px solid ${(_f = theme.border) != null ? _f : "var(--color-border-soft, rgba(153, 153, 153, 0.3))"}` : "1px solid transparent",
    background: resolvedBackground,
    boxShadow: (_g = theme.boxShadow) != null ? _g : boxShadow,
    fontFamily: theme.fontFamily,
    overflow: captionLayout === "menus" ? "visible" : "hidden",
    transition: "box-shadow 180ms ease, transform 180ms ease, border-color 180ms ease",
    transform: hoverable && isHovered ? "translateY(-2px)" : "translateY(0)",
    ...stylesProp == null ? void 0 : stylesProp.root,
    ...styleProp
  };
  const headerStyle = {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,
    gap: 8,
    ...stylesProp == null ? void 0 : stylesProp.header
  };
  const navButtonStyle = {
    width: (_h = theme.navButtonSize) != null ? _h : 36,
    height: (_i = theme.navButtonSize) != null ? _i : 36,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    border: "none",
    borderRadius: (_j = theme.cellRadius) != null ? _j : 10,
    background: "transparent",
    color: (_k = theme.text) != null ? _k : "var(--color-text-primary)",
    cursor: disabled ? "not-allowed" : "pointer",
    fontSize: 20,
    fontWeight: 500,
    ...stylesProp == null ? void 0 : stylesProp.navButton
  };
  const selectStyle = {
    flex: 1,
    padding: "8px 12px",
    border: `1px solid ${(_l = theme.selectBorder) != null ? _l : "var(--color-border-soft, rgba(0, 0, 0, 0.1))"}`,
    borderRadius: (_m = theme.cellRadius) != null ? _m : 10,
    fontSize: (_n = theme.cellFontSize) != null ? _n : 14,
    fontWeight: 600,
    color: (_o = theme.text) != null ? _o : "var(--color-text-primary)",
    backgroundColor: (_p = theme.background) != null ? _p : "var(--color-bg-surface)",
    cursor: disabled ? "not-allowed" : "pointer",
    ...stylesProp == null ? void 0 : stylesProp.select
  };
  const gridGap = (_q = theme.gap) != null ? _q : 6;
  const gridStyle = {
    display: "grid",
    gridTemplateColumns: showWeekNumbers ? "28px repeat(7, minmax(0, 1fr))" : "repeat(7, minmax(0, 1fr))",
    gap: gridGap
  };
  const weekdayGridStyle = {
    display: "grid",
    gridTemplateColumns: showWeekNumbers ? "28px repeat(7, minmax(0, 1fr))" : "repeat(7, minmax(0, 1fr))",
    gap: gridGap
  };
  const weekdayHeaderStyle = {
    textAlign: "center",
    fontSize: (_r = theme.weekdayFontSize) != null ? _r : 11,
    fontWeight: 600,
    letterSpacing: "0.5px",
    textTransform: "uppercase",
    color: (_s = theme.textSecondary) != null ? _s : "var(--color-text-secondary)",
    padding: "10px 0",
    ...stylesProp == null ? void 0 : stylesProp.weekday
  };
  const cellBaseStyle = {
    minHeight: "var(--cell-size, 2.25rem)",
    width: "var(--cell-size, 2.25rem)",
    minWidth: "var(--cell-size, 2.25rem)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    border: "none",
    borderRadius: (_t = theme.cellRadius) != null ? _t : 10,
    fontSize: (_u = theme.cellFontSize) != null ? _u : 14,
    cursor: "default",
    ...stylesProp == null ? void 0 : stylesProp.cell
  };
  const captionLabel = visibleMonth.toLocaleDateString(void 0, {
    month: "long",
    year: "numeric"
  });
  return /* @__PURE__ */ jsxs(
    "div",
    {
      ref: rootRef,
      className: `calendar-root calendar-root--variant-${variant} ${captionLayout === "label" ? "calendar-root--caption-label" : ""} ${captionLayout === "menus" ? "calendar-root--caption-menus" : ""} ${className}`.trim(),
      style: containerStyle,
      onMouseEnter: () => hoverable && setIsHovered(true),
      onMouseLeave: () => hoverable && setIsHovered(false),
      children: [
        !hideNavigation && /* @__PURE__ */ jsxs("div", { style: headerStyle, children: [
          /* @__PURE__ */ jsx(
            "button",
            {
              type: "button",
              onClick: handlePrevMonth,
              disabled,
              style: navButtonStyle,
              className: "calendar-nav-btn",
              "aria-label": "Previous month",
              children: /* @__PURE__ */ jsx(ChevronLeft, {})
            }
          ),
          captionLayout === "label" ? /* @__PURE__ */ jsx(
            "div",
            {
              className: "calendar-caption-label",
              style: {
                flex: 1,
                minWidth: 0,
                textAlign: "center",
                fontSize: (_v = theme.cellFontSize) != null ? _v : 14,
                fontWeight: 600,
                color: (_w = theme.text) != null ? _w : "var(--color-text-primary)"
              },
              children: captionLabel
            }
          ) : captionLayout === "menus" ? /* @__PURE__ */ jsxs(
            "div",
            {
              ref: captionMenusRef,
              style: { display: "flex", gap: 8, flex: 1, minWidth: 0, position: "relative" },
              children: [
                /* @__PURE__ */ jsxs("div", { style: { flex: "1.25 1 0", minWidth: 0, position: "relative" }, children: [
                  /* @__PURE__ */ jsxs(
                    "button",
                    {
                      type: "button",
                      disabled: disabled || readOnly,
                      className: "calendar-caption-btn",
                      "aria-haspopup": "dialog",
                      "aria-expanded": captionPick === "month",
                      "aria-label": "Choose month",
                      onClick: () => {
                        if (disabled || readOnly)
                          return;
                        setCaptionPick((p) => p === "month" ? null : "month");
                      },
                      children: [
                        /* @__PURE__ */ jsx("span", { children: monthShortLabels[visibleMonth.getMonth()] }),
                        /* @__PURE__ */ jsx(ChevronDownSmall, {})
                      ]
                    }
                  ),
                  captionPick === "month" && /* @__PURE__ */ jsx(
                    "div",
                    {
                      className: "calendar-caption-popup calendar-caption-popup--month",
                      role: "dialog",
                      "aria-label": "Month",
                      children: /* @__PURE__ */ jsx("div", { className: "calendar-month-grid", children: monthShortLabels.map((lbl, m) => {
                        const selected = m === visibleMonth.getMonth();
                        return /* @__PURE__ */ jsx(
                          "button",
                          {
                            type: "button",
                            className: selected ? "calendar-month-grid__btn is-selected" : "calendar-month-grid__btn",
                            onClick: () => {
                              handleMonthChange(m);
                              setCaptionPick(null);
                            },
                            children: lbl
                          },
                          m
                        );
                      }) })
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxs("div", { style: { flex: "1 1 0", minWidth: 0, position: "relative" }, children: [
                  /* @__PURE__ */ jsxs(
                    "button",
                    {
                      type: "button",
                      disabled: disabled || readOnly,
                      className: "calendar-caption-btn",
                      "aria-haspopup": "dialog",
                      "aria-expanded": captionPick === "year",
                      "aria-label": "Choose year",
                      onClick: () => {
                        if (disabled || readOnly)
                          return;
                        setCaptionPick((p) => p === "year" ? null : "year");
                      },
                      children: [
                        /* @__PURE__ */ jsx("span", { children: visibleMonth.getFullYear() }),
                        /* @__PURE__ */ jsx(ChevronDownSmall, {})
                      ]
                    }
                  ),
                  captionPick === "year" && /* @__PURE__ */ jsx(
                    "div",
                    {
                      className: "calendar-caption-popup calendar-caption-popup--year",
                      role: "dialog",
                      "aria-label": "Year",
                      children: /* @__PURE__ */ jsx("div", { className: "calendar-year-list", children: yearOptions.map((opt) => {
                        const selected = opt.value === visibleMonth.getFullYear();
                        return /* @__PURE__ */ jsx(
                          "button",
                          {
                            type: "button",
                            className: selected ? "calendar-year-list__btn is-selected" : "calendar-year-list__btn",
                            onClick: () => {
                              handleYearChange(opt.value);
                              setCaptionPick(null);
                            },
                            children: opt.label
                          },
                          opt.value
                        );
                      }) })
                    }
                  )
                ] })
              ]
            }
          ) : /* @__PURE__ */ jsxs("div", { style: { display: "flex", gap: 8, flex: 1, minWidth: 0 }, children: [
            /* @__PURE__ */ jsx(
              "select",
              {
                value: visibleMonth.getMonth(),
                onChange: (e) => handleMonthChange(parseInt(e.target.value, 10)),
                disabled,
                style: selectStyle,
                className: "calendar-select",
                "aria-label": "Select month",
                children: monthOptions.map((opt) => /* @__PURE__ */ jsx("option", { value: opt.value, children: opt.label }, opt.value))
              }
            ),
            /* @__PURE__ */ jsx(
              "select",
              {
                value: visibleMonth.getFullYear(),
                onChange: (e) => handleYearChange(parseInt(e.target.value, 10)),
                disabled,
                style: selectStyle,
                className: "calendar-select",
                "aria-label": "Select year",
                children: yearOptions.map((opt) => /* @__PURE__ */ jsx("option", { value: opt.value, children: opt.label }, opt.value))
              }
            )
          ] }),
          /* @__PURE__ */ jsx(
            "button",
            {
              type: "button",
              onClick: handleNextMonth,
              disabled,
              style: navButtonStyle,
              className: "calendar-nav-btn",
              "aria-label": "Next month",
              children: /* @__PURE__ */ jsx(ChevronRight, {})
            }
          )
        ] }),
        /* @__PURE__ */ jsxs("div", { style: weekdayGridStyle, children: [
          showWeekNumbers && /* @__PURE__ */ jsx("div", { style: weekdayHeaderStyle, "aria-hidden": "true", children: "#" }),
          weekdayLabels.map((label) => /* @__PURE__ */ jsx("div", { style: weekdayHeaderStyle, children: label }, label))
        ] }),
        /* @__PURE__ */ jsx(
          "div",
          {
            className: animClass,
            children: Array.from({ length: 6 }, (_, rowIdx) => {
              var _a2, _b2;
              const rowDays = calendarDays.slice(rowIdx * 7, (rowIdx + 1) * 7);
              const firstDayOfRow = rowDays[0];
              const weekNum = firstDayOfRow ? getWeekNumber(firstDayOfRow.date) : null;
              return /* @__PURE__ */ jsxs("div", { style: gridStyle, children: [
                showWeekNumbers && /* @__PURE__ */ jsx(
                  "div",
                  {
                    style: {
                      ...cellBaseStyle,
                      fontSize: (_a2 = theme.weekdayFontSize) != null ? _a2 : 11,
                      color: (_b2 = theme.textSecondary) != null ? _b2 : "var(--color-text-secondary)"
                    },
                    children: weekNum
                  }
                ),
                rowDays.map((day) => {
                  var _a3, _b3, _c2, _d2, _e2, _f2, _g2, _h2;
                  const isSelected = mode === "single" ? isSameDay(day.date, selectedDate) : isSameDay(day.date, rangeStart) || isSameDay(day.date, rangeEnd);
                  const isInRange = mode === "range" && rangeStart && rangeEnd && isBetweenDays(day.date, rangeStart, rangeEnd);
                  const isToday = isSameDay(day.date, today);
                  const isDisabled = isDisabledDate(day.date);
                  const isSelectable = !disabled && !readOnly && !isDisabled;
                  const cellStyle = {
                    ...cellBaseStyle,
                    cursor: isSelectable ? "pointer" : "default",
                    color: isDisabled ? (_a3 = theme.textDisabled) != null ? _a3 : "var(--color-text-disabled)" : !day.inCurrentMonth ? (_b3 = theme.textSecondary) != null ? _b3 : "var(--color-text-secondary)" : isSelected ? (_c2 = theme.primaryText) != null ? _c2 : "var(--button-primary-default-text)" : (_d2 = theme.text) != null ? _d2 : "var(--color-text-primary)",
                    background: isSelected ? (_e2 = theme.primary) != null ? _e2 : "var(--button-primary-default-bg)" : isInRange ? (_f2 = theme.rangeBackground) != null ? _f2 : "var(--color-accent-sky-10)" : isToday ? (_g2 = theme.todayBackground) != null ? _g2 : "var(--color-accent-amber-10)" : "transparent",
                    fontWeight: isSelected ? 700 : isToday ? 600 : 500,
                    boxShadow: isToday && !isSelected ? `inset 0 0 0 2px ${(_h2 = theme.todayRing) != null ? _h2 : "var(--color-today-ring, rgba(245, 158, 11, 0.5))"}` : void 0
                  };
                  return /* @__PURE__ */ jsx(
                    "button",
                    {
                      type: "button",
                      onClick: () => handleDateSelect(day.date),
                      disabled: isDisabled,
                      style: cellStyle,
                      className: `calendar-cell ${!day.inCurrentMonth ? "calendar-cell--outside" : ""} ${isSelectable && cellHoverAnimation ? "calendar-cell--hoverable" : ""}`,
                      "aria-label": day.date.toLocaleDateString(),
                      "aria-pressed": isSelected,
                      "aria-current": isToday ? "date" : void 0,
                      "aria-disabled": disabled || readOnly ? true : void 0,
                      "data-outside": !day.inCurrentMonth ? "true" : void 0,
                      "data-date": toDayKey(day.date),
                      tabIndex: toDayKey(day.date) === tabbableKey ? 0 : -1,
                      onFocus: () => setFocusedDate(day.date),
                      onKeyDown: (e) => handleDayKeyDown(day.date, e),
                      children: dateCellRender ? dateCellRender(day.date) : day.date.getDate()
                    },
                    day.date.toISOString()
                  );
                })
              ] }, rowIdx);
            })
          },
          visibleMonth.getFullYear() + "-" + visibleMonth.getMonth()
        )
      ]
    }
  );
};
var Calendar_default = Calendar;

export {
  parseFlexibleDate,
  parseDate,
  isDateInRange,
  isBeforeDay,
  isAfterDay,
  addMonths,
  startOfMonth,
  formatDateForDisplay,
  Calendar_default
};
//# sourceMappingURL=chunk-7KXTIFH2.mjs.map