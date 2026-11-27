import type { MenuItemVariant, MenuPlacement } from "./Menu.types";

export const MENU_DEFAULTS: { placement: MenuPlacement; loop: boolean; variant: MenuItemVariant } = {
  placement: "bottom-start",
  loop: true,
  variant: "default",
};

export const MENU_PLACEMENTS: readonly MenuPlacement[] = ["bottom-start", "bottom-end", "top-start", "top-end"] as const;
export const MENU_ITEM_VARIANTS: readonly MenuItemVariant[] = ["default", "danger"] as const;

/** Hover delay before a submenu opens (ms) — avoids flicker while the pointer crosses rows. */
export const SUBMENU_OPEN_DELAY = 100;
/** Typeahead buffer reset (ms), per APG. */
export const TYPEAHEAD_TIMEOUT = 500;
/** Submenus overlap their trigger row by this much (px) so pointer travel stays inside the menu. */
export const SUBMENU_OVERLAP = 4;

/** Every focusable row role in a menu. */
export const MENU_ROW_ROLES = ["menuitem", "menuitemcheckbox", "menuitemradio"] as const;
