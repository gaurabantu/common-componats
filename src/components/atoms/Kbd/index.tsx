"use client";

import React from "react";
import { KBD_DEFAULTS } from "./Kbd.config";
import { resolveKey, toAriaKeyShortcuts, useIsMac } from "./Kbd.utils";
import type { KbdProps } from "./Kbd.types";
import "./Kbd.css";

/**
 * Kbd — keyboard key / shortcut chip rendered as semantic `<kbd>`. With `keys`, each key is a
 * nested `<kbd>` (HTML spec for key combinations) joined by a decorative separator; glyphs such
 * as ⌘ carry a visually-hidden spoken name ("Command"). `mod` resolves to ⌘ on macOS and Ctrl
 * elsewhere — SSR-safe: server + hydration render use Ctrl, the client then corrects it.
 */
const Kbd = React.forwardRef<HTMLElement, KbdProps>(function Kbd(
  {
    keys,
    children,
    separator = KBD_DEFAULTS.separator,
    size = KBD_DEFAULTS.size,
    platform = KBD_DEFAULTS.platform,
    className,
    ...rest
  },
  ref,
) {
  const isMac = useIsMac(platform);
  const classes = ["ds-kbd", className].filter(Boolean).join(" ");

  if (!keys || keys.length === 0) {
    return (
      <kbd ref={ref} className={classes} data-size={size} {...rest}>
        <span className="ds-kbd__key ds-kbd__key--single">{children}</span>
      </kbd>
    );
  }

  return (
    <kbd
      ref={ref}
      className={classes}
      data-size={size}
      data-combo={keys.length > 1 ? "true" : undefined}
      data-platform={isMac ? "mac" : "other"}
      data-shortcut={toAriaKeyShortcuts(keys, isMac)}
      {...rest}
    >
      {keys.map((key, index) => {
        const label = resolveKey(key, isMac);
        const needsSpokenName = label.spoken !== label.display;
        return (
          <React.Fragment key={`${key}-${index}`}>
            {index > 0 && separator !== "" && separator != null ? (
              <span className="ds-kbd__sep" aria-hidden="true">
                {separator}
              </span>
            ) : null}
            <kbd className="ds-kbd__key">
              {needsSpokenName ? (
                <>
                  <span aria-hidden="true">{label.display}</span>
                  <span className="ds-kbd__sr"> {label.spoken} </span>
                </>
              ) : (
                <>
                  {label.display}
                  <span className="ds-kbd__sr"> </span>
                </>
              )}
            </kbd>
          </React.Fragment>
        );
      })}
    </kbd>
  );
});

Kbd.displayName = "Kbd";

export default Kbd;
export { Kbd };
export { detectIsMac, useIsMac, resolveKey, formatShortcut, toAriaKeyShortcuts } from "./Kbd.utils";
export type { KbdProps, KbdSize, KbdPlatform, KbdKeyLabel } from "./Kbd.types";
