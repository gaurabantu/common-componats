/* ucs:component-css */
import "./styles/components/atoms/IconBox/IconBox.css";
// src/components/atoms/IconBox/index.tsx
import React from "react";

// src/components/atoms/IconBox/IconBox.config.ts
var ICON_BOX_DEFAULTS = {
  tone: "neutral",
  size: "md",
  shape: "rounded"
};

// src/components/atoms/IconBox/index.tsx
import { jsx } from "react/jsx-runtime";
var IconBox = React.memo(function IconBox2({
  children,
  tone = ICON_BOX_DEFAULTS.tone,
  size = ICON_BOX_DEFAULTS.size,
  shape = ICON_BOX_DEFAULTS.shape,
  label,
  className,
  ...rest
}) {
  return /* @__PURE__ */ jsx(
    "span",
    {
      className: ["ds-icon-box", className].filter(Boolean).join(" "),
      "data-tone": tone,
      "data-size": size,
      "data-shape": shape,
      role: label ? "img" : void 0,
      "aria-label": label,
      "aria-hidden": label ? void 0 : true,
      ...rest,
      children
    }
  );
});
var IconBox_default = IconBox;

export {
  IconBox_default
};
//# sourceMappingURL=chunk-AGZHGVMA.mjs.map