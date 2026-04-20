// DatePicker.utils.ts

export const cls = (...classes: (string | undefined | false)[]) => {
  return classes.filter(Boolean).join(' ');
};

/**
 * Validates if a date string is valid according to the specified format
 * Handles edge cases like "65676789" and other invalid inputs
 */
export const isValidDate = (dateStr: string, format: string = "MM/DD/YYYY"): boolean => {
  if (!dateStr || dateStr.trim() === "") {
    return false;
  }
  
  // Remove any non-numeric characters except slashes, dashes, and dots
  const cleanStr = dateStr.replace(/[^\d/\-.]/g, '').trim();
  
  // Split by common separators
  const separators = ['/', '-', '.'];
  let parts: string[] = [];
  let foundSeparator = '';
  
  for (const sep of separators) {
    if (cleanStr.includes(sep)) {
      parts = cleanStr.split(sep);
      foundSeparator = sep;
      break;
    }
  }
  
  // If no separator found, try to parse as concatenated numbers
  if (!foundSeparator && cleanStr.length >= 6) {
    const formatUpper = format.toUpperCase();
    
    if ((formatUpper === "MM/DD/YYYY" || formatUpper === "MM-DD-YYYY" || formatUpper === "MM.DD.YYYY") && cleanStr.length === 8) {
      // MMDDYYYY format (8 digits)
      parts = [
        cleanStr.substring(0, 2), // month
        cleanStr.substring(2, 4), // day
        cleanStr.substring(4, 8)  // year
      ];
    } else if ((formatUpper === "DD/MM/YYYY" || formatUpper === "DD-MM-YYYY" || formatUpper === "DD.MM.YYYY") && cleanStr.length === 8) {
      // DDMMYYYY format (8 digits)
      parts = [
        cleanStr.substring(0, 2), // day
        cleanStr.substring(2, 4), // month
        cleanStr.substring(4, 8)  // year
      ];
    } else if ((formatUpper === "MM/DD/YYYY" || formatUpper === "MM-DD-YYYY" || formatUpper === "MM.DD.YYYY") && cleanStr.length === 8) {
      // MMDDYYYY format (8 digits)
      parts = [
        cleanStr.substring(0, 2), // month
        cleanStr.substring(2, 4), // day
        cleanStr.substring(4, 8)  // year
      ];
    } else if (formatUpper === "YYYY-MM-DD" && cleanStr.length === 8) {
      // YYYYMMDD format (8 digits)
      parts = [
        cleanStr.substring(0, 4), // year
        cleanStr.substring(4, 6), // month
        cleanStr.substring(6, 8)  // day
      ];
    } else if (cleanStr.length === 6) {
      // Handle 2-digit year formats
      if (formatUpper === "MM/DD/YYYY" || formatUpper === "MM/DD/YY") {
        // MMDDYY format (6 digits)
        parts = [
          cleanStr.substring(0, 2), // month
          cleanStr.substring(2, 4), // day
          cleanStr.substring(4, 6)  // year (2-digit)
        ];
      } else if (formatUpper === "DD/MM/YYYY" || formatUpper === "DD/MM/YY") {
        // DDMMYY format (6 digits)
        parts = [
          cleanStr.substring(0, 2), // day
          cleanStr.substring(2, 4), // month
          cleanStr.substring(4, 6)  // year (2-digit)
        ];
      }
    }
  }
  
  // Validate we have exactly 3 parts
  if (parts.length !== 3) {
    return false;
  }
  
  const formatUpper = format.toUpperCase();
  let month: number, day: number, year: number;
  
  try {
    // Parse parts based on format
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
      // Convert 2-digit year to 4-digit
      year = shortYear < 50 ? 2000 + shortYear : 1900 + shortYear;
    } else if (formatUpper === "DD/MM/YY" || formatUpper === "DD-MM-YY" || formatUpper === "DD.MM.YY") {
      day = parseInt(parts[0], 10);
      month = parseInt(parts[1], 10);
      const shortYear = parseInt(parts[2], 10);
      // Convert 2-digit year to 4-digit
      year = shortYear < 50 ? 2000 + shortYear : 1900 + shortYear;
    } else {
      // Default to MM/DD/YYYY
      month = parseInt(parts[0], 10);
      day = parseInt(parts[1], 10);
      year = parseInt(parts[2], 10);
    }
    
    // Basic validation - check for NaN
    if (isNaN(month) || isNaN(day) || isNaN(year)) {
      return false;
    }
    
    // Validate month
    if (month < 1 || month > 12) {
      return false;
    }
    
    // Validate day based on month
    const daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    
    // Adjust for leap year
    if (month === 2) {
      const isLeapYear = (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0);
      daysInMonth[1] = isLeapYear ? 29 : 28;
    }
    
    if (day < 1 || day > daysInMonth[month - 1]) {
      return false;
    }
    
    // Validate year based on format
    if (formatUpper.includes("YYYY")) {
      // 4-digit year required
      if (year < 1000 || year > 9999) {
        return false;
      }
      // Check if year part is actually 4 digits
      const yearStr = parts[2];
      if (yearStr.length !== 4) {
        return false;
      }
    } else if (formatUpper.includes("YY")) {
      // 2-digit year - already converted to 4-digit
      // Just ensure it's a reasonable year
      if (year < 1900 || year > 2099) {
        return false;
      }
    }
    
    // Create a date object and verify it matches
    const date = new Date(year, month - 1, day);
    const isValid = date.getFullYear() === year && 
                   date.getMonth() === month - 1 && 
                   date.getDate() === day;
    
    return isValid;
    
  } catch (error) {
    return false;
  }
};

/**
 * Converts a date string from one format to another
 */
export const formatDateString = (
  dateStr: string, 
  fromFormat: string = "MM/DD/YYYY", 
  toFormat: string = "DD-MM-YYYY"
): string => {
  if (!dateStr || !isValidDate(dateStr, fromFormat)) {
    return dateStr; // Return original if invalid
  }
  
  try {
    // Parse the date based on fromFormat
    const cleanStr = dateStr.replace(/[^\d/\-.]/g, '').trim();
    const separators = ['/', '-', '.'];
    let parts: string[] = [];
    
    for (const sep of separators) {
      if (cleanStr.includes(sep)) {
        parts = cleanStr.split(sep);
        break;
      }
    }
    
    // Handle concatenated numbers (e.g., "01012026")
    if (parts.length === 1 && cleanStr.length === 8) {
      const fromUpper = fromFormat.toUpperCase();
      if (fromUpper === "MM/DD/YYYY") {
        parts = [cleanStr.substring(0, 2), cleanStr.substring(2, 4), cleanStr.substring(4, 8)];
      } else if (fromUpper === "DD/MM/YYYY") {
        parts = [cleanStr.substring(0, 2), cleanStr.substring(2, 4), cleanStr.substring(4, 8)];
      } else if (fromUpper === "YYYY-MM-DD") {
        parts = [cleanStr.substring(0, 4), cleanStr.substring(4, 6), cleanStr.substring(6, 8)];
      }
    }
    
    if (parts.length !== 3) {
      return dateStr;
    }
    
    let month: string, day: string, year: string;
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
      year = shortYear < 50 ? `20${parts[2].padStart(2, '0')}` : `19${parts[2].padStart(2, '0')}`;
    } else if (fromUpper === "DD/MM/YY" || fromUpper === "DD-MM-YY" || fromUpper === "DD.MM.YY") {
      day = parts[0];
      month = parts[1];
      const shortYear = parseInt(parts[2], 10);
      year = shortYear < 50 ? `20${parts[2].padStart(2, '0')}` : `19${parts[2].padStart(2, '0')}`;
    } else {
      // Default to MM/DD/YYYY
      month = parts[0];
      day = parts[1];
      year = parts[2];
    }
    
    // Pad single digits with leading zeros
    month = month.padStart(2, '0');
    day = day.padStart(2, '0');
    
    // Ensure year is 4 digits
    if (year.length === 2) {
      const shortYear = parseInt(year, 10);
      year = shortYear < 50 ? `20${year}` : `19${year}`;
    }
    
    // Convert to the desired format (trim to handle Storybook control whitespace)
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
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
      ];
      const monthName = monthNames[parseInt(month, 10) - 1];
      return `${monthName} ${parseInt(day, 10)}, ${year}`;
    } else if (toUpper === "DD MMMM YYYY") {
      const monthNames = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
      ];
      const monthName = monthNames[parseInt(month, 10) - 1];
      return `${parseInt(day, 10)} ${monthName} ${year}`;
    } else if (toUpper === "DD MMM YYYY") {
      const monthNames = [
        'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
        'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
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
    
    // Default: return in DD-MM-YYYY format (matches default dateFormat)
    return `${day}-${month}-${year}`;
    
  } catch (error) {
    console.error('Error formatting date:', error);
    return dateStr;
  }
};

/**
 * Tries to parse 8-digit input as YYYYMMDD, DDMMYYYY, or MMDDYYYY.
 * Returns the valid date. Prefers preferredFormat when multiple are valid.
 */
export const parseFlexible8DigitDate = (
  digits: string,
  preferredFormat: string = "MM/DD/YYYY"
): Date | null => {
  if (!digits || digits.replace(/\D/g, "").length !== 8) return null;
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
    if (validDDMM) return parseDate(asDDMM, "DD/MM/YYYY");
    if (validMMDD) return parseDate(asMMDD, "MM/DD/YYYY");
  } else {
    if (validMMDD) return parseDate(asMMDD, "MM/DD/YYYY");
    if (validDDMM) return parseDate(asDDMM, "DD/MM/YYYY");
  }
  return null;
};

/**
 * Tries to parse 6-digit input as both DDMMYY and MMDDYY.
 */
export const parseFlexible6DigitDate = (
  digits: string,
  preferredFormat: string = "MM/DD/YYYY"
): Date | null => {
  if (!digits || digits.replace(/\D/g, "").length !== 6) return null;
  const d = digits.replace(/\D/g, "");
  const p1 = d.substring(0, 2);
  const p2 = d.substring(2, 4);
  const yy = d.substring(4, 6);

  const str = `${p1}/${p2}/${yy}`;
  const validDDMM = isValidDate(str, "DD/MM/YY");
  const validMMDD = isValidDate(str, "MM/DD/YY");

  const pref = preferredFormat.toUpperCase();
  if (pref.includes("DD") && pref.indexOf("DD") < pref.indexOf("MM")) {
    if (validDDMM) return parseDate(str, "DD/MM/YY");
    if (validMMDD) return parseDate(str, "MM/DD/YY");
  } else {
    if (validMMDD) return parseDate(str, "MM/DD/YY");
    if (validDDMM) return parseDate(str, "DD/MM/YY");
  }
  return null;
};

/**
 * Parses input flexibly: YYYY-MM-DD, DDMMYYYY, MMDDYYYY (8 digits),
 * DDMMYY, MMDDYY (6 digits). Also supports formats with separators.
 * Returns null if invalid.
 */
export const parseFlexibleDate = (
  input: string,
  preferredFormat: string = "MM/DD/YYYY"
): Date | null => {
  const trimmed = input.trim().replace(/[^\d/\-.]/g, "");
  const digitsOnly = trimmed.replace(/\D/g, "");

  if (digitsOnly.length === 8) {
    const r = parseFlexible8DigitDate(trimmed, preferredFormat);
    if (r) return r;
  }
  if (digitsOnly.length === 6) {
    const r = parseFlexible6DigitDate(trimmed, preferredFormat);
    if (r) return r;
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

/**
 * Helper function to parse a date string into a Date object
 * Returns null if the date is invalid
 */
export const parseDate = (dateStr: string, format: string = "MM/DD/YYYY"): Date | null => {
  if (!isValidDate(dateStr, format)) {
    return null;
  }
  
  try {
    const cleanStr = dateStr.replace(/[^\d/\-.]/g, '').trim();
    const separators = ['/', '-', '.'];
    let parts: string[] = [];
    
    for (const sep of separators) {
      if (cleanStr.includes(sep)) {
        parts = cleanStr.split(sep);
        break;
      }
    }
    
    // Handle concatenated numbers
    if (parts.length === 1 && cleanStr.length === 8) {
      const formatUpper = format.toUpperCase();
      if (formatUpper === "MM/DD/YYYY" || formatUpper === "MM-DD-YYYY" || formatUpper === "MM.DD.YYYY") {
        parts = [cleanStr.substring(0, 2), cleanStr.substring(2, 4), cleanStr.substring(4, 8)];
      } else if (formatUpper === "DD/MM/YYYY" || formatUpper === "DD-MM-YYYY" || formatUpper === "DD.MM.YYYY") {
        parts = [cleanStr.substring(0, 2), cleanStr.substring(2, 4), cleanStr.substring(4, 8)];
      } else if (formatUpper === "YYYY-MM-DD") {
        parts = [cleanStr.substring(0, 4), cleanStr.substring(4, 6), cleanStr.substring(6, 8)];
      }
    }
    
    if (parts.length !== 3) {
      return null;
    }
    
    let month: number, day: number, year: number;
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
      year = shortYear < 50 ? 2000 + shortYear : 1900 + shortYear;
    } else if (formatUpper === "DD/MM/YY" || formatUpper === "DD-MM-YY" || formatUpper === "DD.MM.YY") {
      day = parseInt(parts[0], 10);
      month = parseInt(parts[1], 10);
      const shortYear = parseInt(parts[2], 10);
      year = shortYear < 50 ? 2000 + shortYear : 1900 + shortYear;
    } else {
      // Default to MM/DD/YYYY
      month = parseInt(parts[0], 10);
      day = parseInt(parts[1], 10);
      year = parseInt(parts[2], 10);
    }
    
    return new Date(year, month - 1, day);
    
  } catch (error) {
    return null;
  }
};

/**
 * Checks if a date is within a specified range
 */
export const isDateInRange = (
  dateStr: string,
  minDate?: string,
  maxDate?: string,
  format: string = "MM/DD/YYYY"
): boolean => {
  const date = parseDate(dateStr, format);
  if (!date) return false;
  
  if (minDate) {
    const min = parseDate(minDate, format);
    if (min && date < min) return false;
  }
  
  if (maxDate) {
    const max = parseDate(maxDate, format);
    if (max && date > max) return false;
  }
  
  return true;
};

export interface CalendarDay {
  date: Date;
  inCurrentMonth: boolean;
}

export const normalizeDate = (date: Date): Date => {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
};

export const isSameDay = (a?: Date | null, b?: Date | null): boolean => {
  if (!a || !b) return false;
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
};

export const isBeforeDay = (a?: Date | null, b?: Date | null): boolean => {
  if (!a || !b) return false;
  return normalizeDate(a).getTime() < normalizeDate(b).getTime();
};

export const isAfterDay = (a?: Date | null, b?: Date | null): boolean => {
  if (!a || !b) return false;
  return normalizeDate(a).getTime() > normalizeDate(b).getTime();
};

export const isBetweenDays = (
  target?: Date | null,
  start?: Date | null,
  end?: Date | null
): boolean => {
  if (!target || !start || !end) return false;
  const time = normalizeDate(target).getTime();
  const startTime = normalizeDate(start).getTime();
  const endTime = normalizeDate(end).getTime();
  return time > startTime && time < endTime;
};

export const addMonths = (date: Date, months: number): Date => {
  return new Date(date.getFullYear(), date.getMonth() + months, 1);
};

export const startOfMonth = (date: Date): Date => {
  return new Date(date.getFullYear(), date.getMonth(), 1);
};

export const getMonthLabel = (date: Date): string => {
  return date.toLocaleDateString(undefined, { month: "long", year: "numeric" });
};

export const MONTH_NAMES = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

export const getMonthOptions = (): { value: number; label: string }[] => {
  return MONTH_NAMES.map((name, index) => ({ value: index, label: name }));
};

export const getYearOptions = (centerYear: number, range: number = 50): { value: number; label: string }[] => {
  const start = centerYear - range;
  const end = centerYear + range;
  const years: { value: number; label: string }[] = [];
  for (let y = start; y <= end; y++) {
    years.push({ value: y, label: String(y) });
  }
  return years;
};

export const formatDateForDisplay = (
  date?: Date | null,
  format: string = "DD-MM-YYYY"
): string => {
  if (!date) return "";
  const resolvedFormat = (format || "DD-MM-YYYY").trim() || "DD-MM-YYYY";
  const yyyy = date.getFullYear();
  const mm = `${date.getMonth() + 1}`.padStart(2, "0");
  const dd = `${date.getDate()}`.padStart(2, "0");
  return formatDateString(`${yyyy}-${mm}-${dd}`, "YYYY-MM-DD", resolvedFormat);
};

export const getCalendarDays = (month: Date): CalendarDay[] => {
  const firstOfMonth = startOfMonth(month);
  const firstWeekday = firstOfMonth.getDay();
  const days: CalendarDay[] = [];

  for (let index = 0; index < 42; index += 1) {
    const dayOffset = index - firstWeekday;
    const date = new Date(firstOfMonth.getFullYear(), firstOfMonth.getMonth(), 1 + dayOffset);
    days.push({
      date,
      inCurrentMonth: date.getMonth() === firstOfMonth.getMonth(),
    });
  }

  return days;
};