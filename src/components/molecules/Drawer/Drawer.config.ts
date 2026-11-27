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

/** Bottom-sheet gesture + copy defaults. */
export const BOTTOM_SHEET_DEFAULTS = {
  handleLabel: "Resize sheet",
  defaultSnap: 0,
};

/** Drag below this distance (px) is treated as a click / jitter, never a dismiss or snap change. */
export const SHEET_DRAG_SLOP_PX = 6;
/** Dismiss when dragged down by more than this fraction of the sheet height… */
export const SHEET_DISMISS_DISTANCE_RATIO = 0.25;
/** …or flicked down faster than this (px per ms) after moving at least `SHEET_FLICK_MIN_PX`. */
export const SHEET_DISMISS_VELOCITY = 0.5;
export const SHEET_FLICK_MIN_PX = 24;
