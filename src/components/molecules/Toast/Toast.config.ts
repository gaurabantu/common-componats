import type { ToastPosition } from "./Toast.types";

export const TOAST_DEFAULTS = {
  position: "bottom-right" as ToastPosition,
  max: 3,
  duration: 5000,
  dismissible: true,
  variant: "info" as const,
  label: "Notifications",
  dismissLabel: "Dismiss",
};

/** Keyboard shortcut that moves focus to the notifications region (toasts never steal focus). */
export const TOAST_HOTKEY = "F8";

/** Exit animation length — mirrors `--duration-fast` in tokens.css. Skipped under reduced motion. */
export const TOAST_EXIT_MS = 200;
