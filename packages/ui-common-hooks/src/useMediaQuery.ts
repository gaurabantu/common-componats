import { useState } from "react";

import { useIsomorphicLayoutEffect } from "./useIsomorphicLayoutEffect";

/**
 * Subscribes to `window.matchMedia` with layout-safe listener wiring.
 *
 * SSR / first paint mirrors `defaultState` (`false`) until the effect aligns with the viewport.
 *
 * Mirrors `window.matchMedia` usage from **`usehooks-ts`** / **`@react-hook/media-query`**.
 */
export function useMediaQuery(query: string, defaultState = false): boolean {
  const [matches, setMatches] = useState(defaultState);

  useIsomorphicLayoutEffect(() => {
    if (typeof window === "undefined" || typeof window.matchMedia !== "function")
      return undefined;

    const media = window.matchMedia(query);
    const listener = (): void => {
      setMatches(media.matches);
    };

    listener();

    media.addEventListener("change", listener);
    return () => media.removeEventListener("change", listener);
  }, [query]);

  return matches;
}
