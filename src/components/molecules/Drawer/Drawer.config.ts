import type { DrawerSide, DrawerSize } from "./Drawer.types";

export const DRAWER_DEFAULTS = {
  side: "right" as DrawerSide,
  size: "md" as DrawerSize,
  showCloseButton: true,
  closeLabel: "Close",
  closeOnBackdropClick: true,
  closeOnEscape: true,
  modal: true,
  returnFocus: true,
};

/** Panel width for `left` / `right` drawers. Capped to the viewport in CSS; full width at ≤ 480px. */
export const DRAWER_WIDTHS: Record<DrawerSize, string> = {
  sm: "20rem",
  md: "25rem",
  lg: "35rem",
  xl: "50rem",
  full: "100vw",
};

/** Panel height for `top` / `bottom` drawers. Capped to the viewport in CSS. */
export const DRAWER_HEIGHTS: Record<DrawerSize, string> = {
  sm: "15rem",
  md: "22.5rem",
  lg: "30rem",
  xl: "40rem",
  full: "100dvh",
};

/** Fallback unmount delay if `animationend` never fires (matches `--duration-normal`). */
export const DRAWER_EXIT_FALLBACK_MS = 320;
