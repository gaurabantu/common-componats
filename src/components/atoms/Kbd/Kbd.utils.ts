import { useSyncExternalStore } from "react";
import { KBD_KEY_MAP } from "./Kbd.config";
import type { KbdKeyLabel, KbdPlatform } from "./Kbd.types";

/**
 * True on Apple platforms (macOS, iPadOS, iOS). Returns false when `navigator` is unavailable
 * (SSR, workers) so server output is deterministic.
 */
export function detectIsMac(): boolean {
  if (typeof navigator === "undefined") return false;
  const nav = navigator as Navigator & { userAgentData?: { platform?: string } };
  const platform = nav.userAgentData?.platform || nav.platform || nav.userAgent || "";
  return /mac|iphone|ipad|ipod/i.test(platform);
}

const noopSubscribe = () => () => {};

/**
 * Resolved platform. `auto` uses `useSyncExternalStore` with a server snapshot of `false`, so the
 * server render and the hydration render agree (Ctrl), then React re-renders with the real value.
 */
export function useIsMac(platform: KbdPlatform = "auto"): boolean {
  const detected = useSyncExternalStore(noopSubscribe, detectIsMac, () => false);
  if (platform === "mac") return true;
  if (platform === "other") return false;
  return detected;
}

/** Resolve one key name to its visible glyph, spoken name and `aria-keyshortcuts` token. */
export function resolveKey(key: string, isMac: boolean): KbdKeyLabel {
  const def = KBD_KEY_MAP[key.trim().toLowerCase()];
  if (def) {
    const [display, spoken] = isMac ? def.mac : def.other;
    return { display, spoken, aria: isMac ? def.aria.mac : def.aria.other };
  }
  const raw = key.trim();
  const display = raw.length === 1 ? raw.toUpperCase() : raw;
  return { display, spoken: display, aria: display };
}

/** Plain-text label for a combo: `⌘K` on macOS, `Ctrl+K` elsewhere. */
export function formatShortcut(keys: string[], isMac: boolean): string {
  const parts = keys.map((k) => resolveKey(k, isMac).display);
  return isMac ? parts.join("") : parts.join("+");
}

/** Value for `aria-keyshortcuts` (e.g. `Meta+K` / `Control+K`). */
export function toAriaKeyShortcuts(keys: string[], isMac: boolean): string {
  return keys.map((k) => resolveKey(k, isMac).aria).join("+");
}
