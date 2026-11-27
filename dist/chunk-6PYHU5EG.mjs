// src/components/atoms/GradientText/index.tsx
import React from "react";
import { jsx } from "react/jsx-runtime";
var defaultGradient = "linear-gradient(135deg, var(--color-brand-primary) 0%, var(--color-brand-secondary) 100%)";
var GradientText = React.memo(function GradientText2({
  children,
  as: Component = "span",
  gradient = defaultGradient,
  fallbackColor = "var(--color-brand-primary)",
  className = "",
  style
}) {
  return /* @__PURE__ */ jsx(
    Component,
    {
      className,
      style: {
        display: "inline-block",
        color: fallbackColor,
        backgroundImage: gradient,
        backgroundClip: "text",
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
        ...style
      },
      children
    }
  );
});
var GradientText_default = GradientText;

export {
  GradientText_default
};
//# sourceMappingURL=chunk-6PYHU5EG.mjs.map