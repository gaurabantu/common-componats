import type React from "react";

/** Focusable menu rows (plain, checkbox and radio items), skipping disabled ones. */
export const MENU_ITEM_SELECTOR = [
  '[role="menuitem"]',
  '[role="menuitemcheckbox"]',
  '[role="menuitemradio"]',
]
  .map((r) => `${r}:not([disabled]):not([aria-disabled="true"])`)
  .join(", ");

/** Focusable listbox options, skipping disabled ones. */
export const LISTBOX_OPTION_SELECTOR = '[role="option"]:not([aria-disabled="true"])';

export function getMenuItems(root: HTMLElement, selector = MENU_ITEM_SELECTOR): HTMLElement[] {
  return Array.from(root.querySelectorAll<HTMLElement>(selector));
}

/**
 * Roving focus for a vertical menu: ArrowDown / ArrowUp wrap, Home / End jump, and a printable
 * character moves to the next item whose text starts with it (typeahead).
 * Returns true when the key was handled.
 */
export function handleMenuKeyNavigation(
  e: React.KeyboardEvent<HTMLElement>,
  selector = MENU_ITEM_SELECTOR
): boolean {
  const root = e.currentTarget;
  const items = getMenuItems(root, selector);
  if (items.length === 0) return false;
  const i = items.indexOf(document.activeElement as HTMLElement);
  let next = -1;

  switch (e.key) {
    case "ArrowDown":
      next = i < 0 ? 0 : (i + 1) % items.length;
      break;
    case "ArrowUp":
      next = i < 0 ? items.length - 1 : (i - 1 + items.length) % items.length;
      break;
    case "Home":
      next = 0;
      break;
    case "End":
      next = items.length - 1;
      break;
    default: {
      if (e.key.length !== 1 || e.ctrlKey || e.metaKey || e.altKey || e.key === " ") return false;
      // Never steal keystrokes from a text field placed inside the menu.
      const t = e.target as HTMLElement;
      if (t.isContentEditable || t.tagName === "INPUT" || t.tagName === "TEXTAREA" || t.tagName === "SELECT") {
        return false;
      }
      const ch = e.key.toLowerCase();
      for (let step = 1; step <= items.length; step += 1) {
        const candidate = items[(Math.max(i, -1) + step + items.length) % items.length];
        if ((candidate.textContent ?? "").trim().toLowerCase().startsWith(ch)) {
          next = items.indexOf(candidate);
          break;
        }
      }
      if (next < 0) return false;
    }
  }

  e.preventDefault();
  items[next]?.focus();
  return true;
}
