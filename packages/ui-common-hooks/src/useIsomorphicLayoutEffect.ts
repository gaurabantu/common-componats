import { useEffect, useLayoutEffect } from "react";

/** Safe `useLayoutEffect` fallback for SSR (matches floating-ui/Radix pattern). */
export const useIsomorphicLayoutEffect =
  typeof document !== "undefined" ? useLayoutEffect : useEffect;
