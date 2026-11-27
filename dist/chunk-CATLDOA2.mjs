/* ucs:component-css */
import "./styles/components/atoms/Kbd/Kbd.css";
// src/components/atoms/Kbd/index.tsx
import React from "react";

// src/components/atoms/Kbd/Kbd.config.ts
var KBD_DEFAULTS = {
  size: "sm",
  platform: "auto",
  separator: "+"
};
var same = (display, spoken, aria) => ({
  mac: [display, spoken],
  other: [display, spoken],
  aria: { mac: aria, other: aria }
});
var KBD_KEY_MAP = {
  mod: { mac: ["\u2318", "Command"], other: ["Ctrl", "Control"], aria: { mac: "Meta", other: "Control" } },
  cmd: { mac: ["\u2318", "Command"], other: ["Win", "Windows"], aria: { mac: "Meta", other: "Meta" } },
  meta: { mac: ["\u2318", "Command"], other: ["Win", "Windows"], aria: { mac: "Meta", other: "Meta" } },
  ctrl: { mac: ["\u2303", "Control"], other: ["Ctrl", "Control"], aria: { mac: "Control", other: "Control" } },
  control: { mac: ["\u2303", "Control"], other: ["Ctrl", "Control"], aria: { mac: "Control", other: "Control" } },
  alt: { mac: ["\u2325", "Option"], other: ["Alt", "Alt"], aria: { mac: "Alt", other: "Alt" } },
  option: { mac: ["\u2325", "Option"], other: ["Alt", "Alt"], aria: { mac: "Alt", other: "Alt" } },
  shift: { mac: ["\u21E7", "Shift"], other: ["Shift", "Shift"], aria: { mac: "Shift", other: "Shift" } },
  enter: same("\u21B5", "Enter", "Enter"),
  return: same("\u21B5", "Enter", "Enter"),
  esc: same("Esc", "Escape", "Escape"),
  escape: same("Esc", "Escape", "Escape"),
  tab: same("Tab", "Tab", "Tab"),
  space: same("Space", "Space", "Space"),
  backspace: same("\u232B", "Backspace", "Backspace"),
  delete: same("Del", "Delete", "Delete"),
  up: same("\u2191", "Up arrow", "ArrowUp"),
  arrowup: same("\u2191", "Up arrow", "ArrowUp"),
  down: same("\u2193", "Down arrow", "ArrowDown"),
  arrowdown: same("\u2193", "Down arrow", "ArrowDown"),
  left: same("\u2190", "Left arrow", "ArrowLeft"),
  arrowleft: same("\u2190", "Left arrow", "ArrowLeft"),
  right: same("\u2192", "Right arrow", "ArrowRight"),
  arrowright: same("\u2192", "Right arrow", "ArrowRight"),
  home: same("Home", "Home", "Home"),
  end: same("End", "End", "End"),
  pageup: same("PgUp", "Page up", "PageUp"),
  pagedown: same("PgDn", "Page down", "PageDown")
};

// src/components/atoms/Kbd/Kbd.utils.ts
import { useSyncExternalStore } from "react";
function detectIsMac() {
  var _a;
  if (typeof navigator === "undefined")
    return false;
  const nav = navigator;
  const platform = ((_a = nav.userAgentData) == null ? void 0 : _a.platform) || nav.platform || nav.userAgent || "";
  return /mac|iphone|ipad|ipod/i.test(platform);
}
var noopSubscribe = () => () => {
};
function useIsMac(platform = "auto") {
  const detected = useSyncExternalStore(noopSubscribe, detectIsMac, () => false);
  if (platform === "mac")
    return true;
  if (platform === "other")
    return false;
  return detected;
}
function resolveKey(key, isMac) {
  const def = KBD_KEY_MAP[key.trim().toLowerCase()];
  if (def) {
    const [display2, spoken] = isMac ? def.mac : def.other;
    return { display: display2, spoken, aria: isMac ? def.aria.mac : def.aria.other };
  }
  const raw = key.trim();
  const display = raw.length === 1 ? raw.toUpperCase() : raw;
  return { display, spoken: display, aria: display };
}
function formatShortcut(keys, isMac) {
  const parts = keys.map((k) => resolveKey(k, isMac).display);
  return isMac ? parts.join("") : parts.join("+");
}
function toAriaKeyShortcuts(keys, isMac) {
  return keys.map((k) => resolveKey(k, isMac).aria).join("+");
}

// src/components/atoms/Kbd/index.tsx
import { Fragment, jsx, jsxs } from "react/jsx-runtime";
var Kbd = React.forwardRef(function Kbd2({
  keys,
  children,
  separator = KBD_DEFAULTS.separator,
  size = KBD_DEFAULTS.size,
  platform = KBD_DEFAULTS.platform,
  className,
  ...rest
}, ref) {
  const isMac = useIsMac(platform);
  const classes = ["ds-kbd", className].filter(Boolean).join(" ");
  if (!keys || keys.length === 0) {
    return /* @__PURE__ */ jsx("kbd", { ref, className: classes, "data-size": size, ...rest, children: /* @__PURE__ */ jsx("span", { className: "ds-kbd__key ds-kbd__key--single", children }) });
  }
  return /* @__PURE__ */ jsx(
    "kbd",
    {
      ref,
      className: classes,
      "data-size": size,
      "data-combo": keys.length > 1 ? "true" : void 0,
      "data-platform": isMac ? "mac" : "other",
      "data-shortcut": toAriaKeyShortcuts(keys, isMac),
      ...rest,
      children: keys.map((key, index) => {
        const label = resolveKey(key, isMac);
        const needsSpokenName = label.spoken !== label.display;
        return /* @__PURE__ */ jsxs(React.Fragment, { children: [
          index > 0 && separator !== "" && separator != null ? /* @__PURE__ */ jsx("span", { className: "ds-kbd__sep", "aria-hidden": "true", children: separator }) : null,
          /* @__PURE__ */ jsx("kbd", { className: "ds-kbd__key", children: needsSpokenName ? /* @__PURE__ */ jsxs(Fragment, { children: [
            /* @__PURE__ */ jsx("span", { "aria-hidden": "true", children: label.display }),
            /* @__PURE__ */ jsxs("span", { className: "ds-kbd__sr", children: [
              " ",
              label.spoken,
              " "
            ] })
          ] }) : /* @__PURE__ */ jsxs(Fragment, { children: [
            label.display,
            /* @__PURE__ */ jsx("span", { className: "ds-kbd__sr", children: " " })
          ] }) })
        ] }, `${key}-${index}`);
      })
    }
  );
});
Kbd.displayName = "Kbd";
var Kbd_default = Kbd;

export {
  detectIsMac,
  useIsMac,
  resolveKey,
  formatShortcut,
  toAriaKeyShortcuts,
  Kbd,
  Kbd_default
};
//# sourceMappingURL=chunk-CATLDOA2.mjs.map