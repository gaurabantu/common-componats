// src/components/molecules/Grid/index.tsx
import { jsx } from "react/jsx-runtime";
function toCssSize(value, fallback) {
  if (value === void 0)
    return fallback;
  return typeof value === "number" ? `${value}px` : value;
}
function GridItem({
  span = 1,
  rowSpan = 1,
  style,
  children,
  ...rest
}) {
  return /* @__PURE__ */ jsx(
    "div",
    {
      ...rest,
      style: {
        minWidth: 0,
        gridColumn: `span ${Math.max(1, span)} / span ${Math.max(1, span)}`,
        gridRow: `span ${Math.max(1, rowSpan)} / span ${Math.max(1, rowSpan)}`,
        ...style
      },
      children
    }
  );
}
function Grid({
  columns = 2,
  gap = 16,
  minItemWidth = 240,
  alignItems = "stretch",
  justifyItems = "stretch",
  autoFit = false,
  fullWidth = true,
  style,
  children,
  ...rest
}) {
  const gapValue = toCssSize(gap, "16px");
  const minWidthValue = toCssSize(minItemWidth, "240px");
  return /* @__PURE__ */ jsx(
    "div",
    {
      ...rest,
      style: {
        display: "grid",
        width: fullWidth ? "100%" : "auto",
        minWidth: 0,
        gap: gapValue,
        alignItems,
        justifyItems,
        gridTemplateColumns: autoFit ? `repeat(auto-fit, minmax(${minWidthValue}, 1fr))` : `repeat(${Math.max(1, columns)}, minmax(0, 1fr))`,
        ...style
      },
      children
    }
  );
}

export {
  GridItem,
  Grid
};
//# sourceMappingURL=chunk-G5IZT4H2.mjs.map