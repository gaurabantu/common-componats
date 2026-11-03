/** SSR-safe: false on the server / when matchMedia is unavailable. */
export function prefersReducedMotion(): boolean {
  if (typeof window === "undefined" || typeof window.matchMedia !== "function") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/** SSR-safe document visibility check. */
export function isDocumentHidden(): boolean {
  return typeof document !== "undefined" && document.visibilityState === "hidden";
}

let counter = 0;
/** Monotonic toast id (`toast-1`, `toast-2`, ...). */
export function nextToastId(): string {
  counter += 1;
  return `toast-${counter}`;
}
