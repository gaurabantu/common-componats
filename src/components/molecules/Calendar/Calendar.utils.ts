import {
  addMonths,
  getCalendarDays,
  getMonthOptions,
  getYearOptions,
  isAfterDay,
  isBeforeDay,
  isBetweenDays,
  isSameDay,
  startOfMonth,
  type CalendarDay,
} from "../../atoms/DatePicker/DatePicker.utils";

export {
  addMonths,
  getCalendarDays,
  getMonthOptions,
  getYearOptions,
  isAfterDay,
  isBeforeDay,
  isBetweenDays,
  isSameDay,
  startOfMonth,
  type CalendarDay,
};

const WEEKDAY_LABELS_SUNDAY = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const WEEKDAY_LABELS_MONDAY = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

export const getWeekdayLabels = (firstDayOfWeek: 0 | 1): string[] => {
  return firstDayOfWeek === 1 ? WEEKDAY_LABELS_MONDAY : WEEKDAY_LABELS_SUNDAY;
};

/**
 * Get calendar days with configurable first day of week.
 * Returns 6 rows (42 days) to ensure consistent layout.
 */
export const getCalendarDaysWithFirstDay = (
  month: Date,
  firstDayOfWeek: 0 | 1
): CalendarDay[] => {
  if (firstDayOfWeek === 0) return getCalendarDays(month);

  // firstDayOfWeek === 1: Monday first
  const firstOfMonth = startOfMonth(month);
  const firstWeekday = firstOfMonth.getDay(); // 0=Sun, 1=Mon, ...
  const startOffset = (firstWeekday - 1 + 7) % 7;

  const result: CalendarDay[] = [];
  for (let i = 0; i < 42; i++) {
    const dayOffset = i - startOffset;
    const date = new Date(
      firstOfMonth.getFullYear(),
      firstOfMonth.getMonth(),
      1 + dayOffset
    );
    result.push({
      date,
      inCurrentMonth: date.getMonth() === firstOfMonth.getMonth(),
    });
  }
  return result;
};

export const getWeekNumber = (date: Date): number => {
  const d = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
  const dayNum = d.getUTCDay() || 7; // Make Monday 1, Sunday 7
  d.setUTCDate(d.getUTCDate() + 4 - dayNum);
  const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
  return Math.ceil((((d.getTime() - yearStart.getTime()) / 86400000) + 1) / 7);
};
