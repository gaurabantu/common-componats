/* ucs:component-css */
import "./styles/components/atoms/Skeleton/Skeleton.css";
// src/components/atoms/Skeleton/index.tsx
import React from "react";

// src/components/atoms/Skeleton/Skeleton.config.ts
var SKELETON_DEFAULTS = {
  shape: "text",
  lines: 1,
  animated: true,
  groupLabel: "Loading content"
};
var SKELETON_LAST_LINE_WIDTH = "60%";

// src/components/atoms/Skeleton/index.tsx
import { jsx, jsxs } from "react/jsx-runtime";
function cls(...parts) {
  return parts.filter(Boolean).join(" ");
}
function toCss(value) {
  if (value === void 0 || value === null)
    return void 0;
  return typeof value === "number" ? `${value}px` : value;
}
var Skeleton = React.forwardRef(function Skeleton2({
  shape = SKELETON_DEFAULTS.shape,
  lines = SKELETON_DEFAULTS.lines,
  width,
  height,
  radius,
  animated = SKELETON_DEFAULTS.animated,
  className,
  style,
  ...rest
}, ref) {
  var _a;
  const w = toCss(width);
  const h = (_a = toCss(height)) != null ? _a : shape === "circle" ? w : void 0;
  const blockStyle = {
    ...w !== void 0 ? { width: w } : null,
    ...h !== void 0 ? { height: h } : null,
    ...radius !== void 0 ? { borderRadius: toCss(radius) } : null
  };
  const lineCount = shape === "text" ? Math.max(1, Math.floor(lines || 1)) : 1;
  if (lineCount > 1) {
    return /* @__PURE__ */ jsx(
      "span",
      {
        ref,
        className: cls("ds-skeleton-lines", className),
        "aria-hidden": "true",
        style,
        ...rest,
        children: Array.from({ length: lineCount }, (_, i) => /* @__PURE__ */ jsx(
          "span",
          {
            className: "ds-skeleton",
            "data-shape": "text",
            "data-animated": animated ? "true" : "false",
            style: i === lineCount - 1 ? { ...blockStyle, width: SKELETON_LAST_LINE_WIDTH } : blockStyle
          },
          i
        ))
      }
    );
  }
  return /* @__PURE__ */ jsx(
    "span",
    {
      ref,
      className: cls("ds-skeleton", className),
      "data-shape": shape,
      "data-animated": animated ? "true" : "false",
      "aria-hidden": "true",
      style: { ...blockStyle, ...style },
      ...rest
    }
  );
});
Skeleton.displayName = "Skeleton";
var SkeletonGroup = React.forwardRef(function SkeletonGroup2({ label = SKELETON_DEFAULTS.groupLabel, className, children, ...rest }, ref) {
  return /* @__PURE__ */ jsxs(
    "div",
    {
      ref,
      role: "status",
      className: cls("ds-skeleton-group", className),
      ...rest,
      children: [
        /* @__PURE__ */ jsx("span", { className: "ds-skeleton-group__label", children: label }),
        children
      ]
    }
  );
});
SkeletonGroup.displayName = "SkeletonGroup";
var Skeleton_default = Skeleton;

export {
  Skeleton,
  SkeletonGroup,
  Skeleton_default
};
//# sourceMappingURL=chunk-VDJ7JNXH.mjs.map