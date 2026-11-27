import { MENU_ROW_ROLES } from "./Menu.config";

const ENABLED_ROW_SELECTOR = MENU_ROW_ROLES.map((r) => `[role="${r}"]:not([aria-disabled="true"])`).join(", ");

/**
 * Enabled rows of one menu panel, in DOM order. Submenu panels are portalled to `document.body`,
 * so their rows are never included here.
 */
export function getEnabledMenuItems(panel: HTMLElement | null): HTMLElement[] {
  if (!panel) return [];
  return Array.from(panel.querySelectorAll<HTMLElement>(ENABLED_ROW_SELECTOR));
}

/** Text typeahead compares against: `data-text-value`, else the visible label. */
export function getItemText(el: HTMLElement): string {
  const explicit = el.getAttribute("data-text-value");
  if (explicit) return explicit.trim().toLowerCase();
  const label = el.querySelector(".ds-menu__label-text") ?? el;
  return (label.textContent ?? "").trim().toLowerCase();
}

/**
 * APG typeahead: find the next item whose text starts with `buffer`, searching after `current`
 * and wrapping. A buffer of one repeated character ("aaa") cycles through items starting with it.
 * Returns -1 when nothing matches.
 */
export function findTypeaheadIndex(items: HTMLElement[], buffer: string, current: number): number {
  if (!buffer || items.length === 0) return -1;
  const query = buffer.toLowerCase();
  const repeated = query.split("").every((ch) => ch === query[0]);
  const search = repeated ? query[0] : query;
  // A fresh / cycling search starts after the current item; a growing multi-char query may stay on it.
  const start = repeated ? current + 1 : Math.max(current, 0);
  for (let step = 0; step < items.length; step += 1) {
    const index = (start + step) % items.length;
    if (getItemText(items[index]).startsWith(search)) return index;
  }
  return -1;
}

/** True for a single printable character without command modifiers. */
export function isPrintableKey(e: { key: string; ctrlKey: boolean; metaKey: boolean; altKey: boolean }): boolean {
  return e.key.length === 1 && e.key !== " " && !e.ctrlKey && !e.metaKey && !e.altKey;
}
