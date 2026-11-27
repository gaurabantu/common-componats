/* ucs:component-css */
import "./styles/components/atoms/Badge/Badge.css";
// src/components/atoms/Badge/index.tsx
import React, { useCallback } from "react";
import { jsx, jsxs } from "react/jsx-runtime";
function cls(...parts) {
  return parts.filter(Boolean).join(" ");
}
function DismissIcon() {
  return /* @__PURE__ */ jsx(
    "svg",
    {
      className: "ds-badge__dismiss-icon",
      viewBox: "0 0 16 16",
      width: 16,
      height: 16,
      "aria-hidden": true,
      focusable: "false",
      children: /* @__PURE__ */ jsx(
        "path",
        {
          fill: "currentColor",
          d: "M4.22 4.22a.75.75 0 0 1 1.06 0L8 6.94l2.72-2.72a.75.75 0 1 1 1.06 1.06L9.06 8l2.72 2.72a.75.75 0 1 1-1.06 1.06L8 9.06l-2.72 2.72a.75.75 0 1 1-1.06-1.06L6.94 8 4.22 5.28a.75.75 0 0 1 0-1.06Z"
        }
      )
    }
  );
}
var Badge = React.memo(function Badge2({
  children,
  variant = "neutral",
  tone = "soft",
  shape = "rounded",
  size = "sm",
  elevated = false,
  dot = false,
  icon,
  onDismiss,
  dismissLabel = "Remove",
  className,
  onClick,
  ...rest
}) {
  const handleDismiss = useCallback(
    (e) => {
      e.preventDefault();
      e.stopPropagation();
      onDismiss == null ? void 0 : onDismiss();
    },
    [onDismiss]
  );
  return /* @__PURE__ */ jsxs(
    "span",
    {
      className: cls("ds-badge", className),
      "data-variant": variant,
      "data-tone": tone,
      "data-shape": shape,
      "data-size": size,
      "data-elevated": elevated ? "true" : void 0,
      onClick,
      ...rest,
      children: [
        dot ? /* @__PURE__ */ jsx("span", { className: "ds-badge__dot", "aria-hidden": true }) : null,
        icon ? /* @__PURE__ */ jsx("span", { className: "ds-badge__icon", children: icon }) : null,
        /* @__PURE__ */ jsx("span", { className: "ds-badge__label", children }),
        onDismiss ? /* @__PURE__ */ jsx(
          "button",
          {
            type: "button",
            className: "ds-badge__dismiss",
            "aria-label": dismissLabel,
            onClick: handleDismiss,
            children: /* @__PURE__ */ jsx(DismissIcon, {})
          }
        ) : null
      ]
    }
  );
});
var Badge_default = Badge;
var Chip = Badge;
var Tag = Badge;

export {
  Badge_default,
  Chip,
  Tag
};
//# sourceMappingURL=chunk-NPBIA77B.mjs.map