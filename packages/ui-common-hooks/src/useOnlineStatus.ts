import { useEffect, useState } from "react";

export interface UseOnlineStatusResult {
  /** Mirrors `navigator.onLine` plus `online` / `offline` window events */
  online: boolean;
}

/**
 * Subscribes to browser connectivity (`navigator.onLine` + `"online"` / `"offline"`).
 *
 * First client paint defaults to **`defaultOnline`** (usually **`true`**) until the effect aligns with `navigator.onLine`.
 */
export function useOnlineStatus(defaultOnline = true): UseOnlineStatusResult {
  const [online, setOnline] = useState(defaultOnline);

  useEffect(() => {
    if (typeof window === "undefined" || typeof navigator === "undefined") return undefined;

    function handleOnline() {
      setOnline(true);
    }
    function handleOffline() {
      setOnline(false);
    }

    setOnline(navigator.onLine);
    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  return { online };
}
