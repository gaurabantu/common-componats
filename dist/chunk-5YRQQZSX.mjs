/* ucs:component-css */
import "./styles/components/atoms/Spinner/Spinner.css";
// src/components/atoms/Spinner/index.tsx
import React from "react";

// src/components/atoms/Spinner/Spinner.config.ts
var SPINNER_DEFAULTS = {
  size: "md",
  tone: "current",
  variant: "ring",
  speed: "normal",
  delay: 0,
  label: "Loading",
  decorative: false
};
var SPINNER_SEGMENTS = 3;

// src/components/atoms/Spinner/index.tsx
import { jsx, jsxs } from "react/jsx-runtime";
function useDelayElapsed(delay) {
  const [elapsed, setElapsed] = React.useState(() => !(delay > 0));
  React.useEffect(() => {
    if (!(delay > 0)) {
      setElapsed(true);
      return void 0;
    }
    setElapsed(false);
    const timer = setTimeout(() => setElapsed(true), delay);
    return () => clearTimeout(timer);
  }, [delay]);
  return elapsed;
}
var Spinner = React.forwardRef(function Spinner2({
  size = SPINNER_DEFAULTS.size,
  tone = SPINNER_DEFAULTS.tone,
  variant = SPINNER_DEFAULTS.variant,
  thickness,
  speed = SPINNER_DEFAULTS.speed,
  delay = SPINNER_DEFAULTS.delay,
  label = SPINNER_DEFAULTS.label,
  decorative = SPINNER_DEFAULTS.decorative,
  className,
  ...rest
}, ref) {
  const visible = useDelayElapsed(delay);
  if (!visible)
    return null;
  return /* @__PURE__ */ jsxs(
    "span",
    {
      ref,
      className: ["ds-spinner", className].filter(Boolean).join(" "),
      "data-size": size,
      "data-tone": tone,
      "data-variant": variant,
      "data-thickness": thickness,
      "data-speed": speed,
      role: decorative ? void 0 : "status",
      "aria-hidden": decorative ? true : void 0,
      ...rest,
      children: [
        variant === "ring" ? /* @__PURE__ */ jsx("span", { className: "ds-spinner__ring", "aria-hidden": "true" }) : /* @__PURE__ */ jsx("span", { className: `ds-spinner__${variant}`, "aria-hidden": "true", children: Array.from({ length: SPINNER_SEGMENTS }, (_, i) => /* @__PURE__ */ jsx("span", { className: "ds-spinner__segment" }, i)) }),
        decorative ? null : /* @__PURE__ */ jsx("span", { className: "ds-spinner__label", children: label })
      ]
    }
  );
});
Spinner.displayName = "Spinner";
var Spinner_default = Spinner;

export {
  Spinner_default
};
//# sourceMappingURL=chunk-5YRQQZSX.mjs.map