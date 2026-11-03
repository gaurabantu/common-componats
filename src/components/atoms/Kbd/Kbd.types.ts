import type { HTMLAttributes, ReactNode } from "react";

/** `sm` for inline hints inside rows / menus · `md` for prose and documentation. */
export type KbdSize = "sm" | "md";

/**
 * Platform used to resolve `mod` (⌘ on macOS, Ctrl elsewhere) and the modifier glyphs.
 * `auto` detects on the client after hydration; the server and first client render use `other`.
 */
export type KbdPlatform = "auto" | "mac" | "other";

/** One resolved key: what is drawn and what a screen reader hears. */
export interface KbdKeyLabel {
  /** Visible text (may be a glyph such as ⌘ or ↵). */
  display: string;
  /** Spoken name (e.g. "Command", "Enter"). */
  spoken: string;
  /** Token for `aria-keyshortcuts` (e.g. "Meta", "Control", "K"). */
  aria: string;
}

export interface KbdProps extends Omit<HTMLAttributes<HTMLElement>, "children"> {
  /**
   * Key combo, one entry per key: `["mod", "k"]`, `["shift", "enter"]`.
   * Recognised names: mod, cmd/meta, ctrl, alt/option, shift, enter, esc, tab, space,
   * backspace, delete, up/down/left/right (or arrowup…), home, end, pageup, pagedown.
   * Anything else is shown as typed (single letters upper-cased).
   */
  keys?: string[];
  /** Free content when `keys` is not used (e.g. `<Kbd>Esc</Kbd>`). Ignored when `keys` is set. */
  children?: ReactNode;
  /** Drawn between keys of a combo. Default `"+"`. Hidden from assistive tech. */
  separator?: ReactNode;
  size?: KbdSize;
  /** Default `auto` (SSR-safe detection). Force `mac` / `other` for docs or tests. */
  platform?: KbdPlatform;
}
