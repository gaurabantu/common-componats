import { useMediaQuery } from "./useMediaQuery";

/**
 * Mirrors `prefers-reduced-motion` ergonomics (`usehooks-ts`, Framer Motion `useReducedMotion`).
 * Forward `defaultState` to align SSR/hydration with `useMediaQuery`.
 */
export function usePrefersReducedMotion(defaultState = false): boolean {
  return useMediaQuery("(prefers-reduced-motion: reduce)", defaultState);
}
