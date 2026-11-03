import type { KbdPlatform, KbdSize } from "./Kbd.types";

export const KBD_DEFAULTS: { size: KbdSize; platform: KbdPlatform; separator: string } = {
  size: "sm",
  platform: "auto",
  separator: "+",
};

export const KBD_SIZES: readonly KbdSize[] = ["sm", "md"] as const;

interface KeyDef {
  mac: [display: string, spoken: string];
  other: [display: string, spoken: string];
  aria: { mac: string; other: string };
}

const same = (display: string, spoken: string, aria: string): KeyDef => ({
  mac: [display, spoken],
  other: [display, spoken],
  aria: { mac: aria, other: aria },
});

/** Named keys → per-platform glyph, spoken name and `aria-keyshortcuts` token. */
export const KBD_KEY_MAP: Record<string, KeyDef> = {
  mod: { mac: ["⌘", "Command"], other: ["Ctrl", "Control"], aria: { mac: "Meta", other: "Control" } },
  cmd: { mac: ["⌘", "Command"], other: ["Win", "Windows"], aria: { mac: "Meta", other: "Meta" } },
  meta: { mac: ["⌘", "Command"], other: ["Win", "Windows"], aria: { mac: "Meta", other: "Meta" } },
  ctrl: { mac: ["⌃", "Control"], other: ["Ctrl", "Control"], aria: { mac: "Control", other: "Control" } },
  control: { mac: ["⌃", "Control"], other: ["Ctrl", "Control"], aria: { mac: "Control", other: "Control" } },
  alt: { mac: ["⌥", "Option"], other: ["Alt", "Alt"], aria: { mac: "Alt", other: "Alt" } },
  option: { mac: ["⌥", "Option"], other: ["Alt", "Alt"], aria: { mac: "Alt", other: "Alt" } },
  shift: { mac: ["⇧", "Shift"], other: ["Shift", "Shift"], aria: { mac: "Shift", other: "Shift" } },
  enter: same("↵", "Enter", "Enter"),
  return: same("↵", "Enter", "Enter"),
  esc: same("Esc", "Escape", "Escape"),
  escape: same("Esc", "Escape", "Escape"),
  tab: same("Tab", "Tab", "Tab"),
  space: same("Space", "Space", "Space"),
  backspace: same("⌫", "Backspace", "Backspace"),
  delete: same("Del", "Delete", "Delete"),
  up: same("↑", "Up arrow", "ArrowUp"),
  arrowup: same("↑", "Up arrow", "ArrowUp"),
  down: same("↓", "Down arrow", "ArrowDown"),
  arrowdown: same("↓", "Down arrow", "ArrowDown"),
  left: same("←", "Left arrow", "ArrowLeft"),
  arrowleft: same("←", "Left arrow", "ArrowLeft"),
  right: same("→", "Right arrow", "ArrowRight"),
  arrowright: same("→", "Right arrow", "ArrowRight"),
  home: same("Home", "Home", "Home"),
  end: same("End", "End", "End"),
  pageup: same("PgUp", "Page up", "PageUp"),
  pagedown: same("PgDn", "Page down", "PageDown"),
};
