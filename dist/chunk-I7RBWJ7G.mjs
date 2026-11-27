// src/components/atoms/Divider/index.tsx
import { jsx, jsxs } from "react/jsx-runtime";
var Divider = ({
  className = "",
  orientation = "horizontal",
  length,
  thickness = "1px",
  color = "var(--color-border-subtle, var(--color-mist-60))",
  variant = "solid",
  align = "center",
  textPosition = "center",
  margin = "12px 0",
  inset = 0,
  style: customStyle,
  children
}) => {
  const resolvedOrientation = orientation === "row" || orientation === "column" ? orientation === "row" ? "horizontal" : "vertical" : orientation;
  const isVertical = resolvedOrientation === "vertical";
  const resolvedThickness = typeof thickness === "number" ? `${thickness}px` : thickness;
  const resolvedInset = typeof inset === "number" ? `${inset}px` : inset;
  if (isVertical) {
    const verticalStyle = {
      display: "inline-block",
      width: resolvedThickness,
      minWidth: resolvedThickness,
      alignSelf: "stretch",
      height: length || "100%",
      backgroundColor: color,
      margin,
      borderRadius: 9999,
      ...customStyle
    };
    return /* @__PURE__ */ jsx(
      "div",
      {
        role: "separator",
        "aria-orientation": "vertical",
        className,
        style: verticalStyle
      }
    );
  }
  const borderStyle = variant === "dashed" ? "dashed" : variant === "dotted" ? "dotted" : "solid";
  const lineStyle = {
    borderTop: `${resolvedThickness} ${borderStyle} ${color}`,
    borderBottom: "none",
    minWidth: 0,
    flex: 1
  };
  if (!children) {
    const finalStyle = {
      width: length || "100%",
      borderTop: `${resolvedThickness} ${borderStyle} ${color}`,
      margin,
      marginLeft: resolvedInset,
      marginRight: resolvedInset,
      boxSizing: "border-box",
      ...customStyle
    };
    return /* @__PURE__ */ jsx(
      "div",
      {
        role: "separator",
        "aria-orientation": "horizontal",
        className,
        style: finalStyle
      }
    );
  }
  const startFlex = align === "start" ? 0.2 : align === "end" ? 0.8 : 1;
  const endFlex = align === "start" ? 0.8 : align === "end" ? 0.2 : 1;
  const contentStyle = {
    flexShrink: 0,
    color: "var(--color-text-secondary)",
    fontSize: "var(--text-small-size, 12px)",
    lineHeight: 1.5,
    whiteSpace: "nowrap"
  };
  const lineBorder = `${resolvedThickness} ${borderStyle} ${color}`;
  if (textPosition === "above") {
    return /* @__PURE__ */ jsxs(
      "div",
      {
        role: "separator",
        "aria-orientation": "horizontal",
        className,
        style: {
          display: "flex",
          flexDirection: "column",
          width: length || "100%",
          margin,
          marginLeft: resolvedInset,
          marginRight: resolvedInset,
          boxSizing: "border-box",
          ...customStyle
        },
        children: [
          /* @__PURE__ */ jsx("span", { style: { width: "100%", borderTop: lineBorder } }),
          /* @__PURE__ */ jsx("span", { style: { ...contentStyle, marginTop: 8 }, children })
        ]
      }
    );
  }
  if (textPosition === "below") {
    return /* @__PURE__ */ jsxs(
      "div",
      {
        role: "separator",
        "aria-orientation": "horizontal",
        className,
        style: {
          display: "flex",
          flexDirection: "column",
          width: length || "100%",
          margin,
          marginLeft: resolvedInset,
          marginRight: resolvedInset,
          boxSizing: "border-box",
          ...customStyle
        },
        children: [
          /* @__PURE__ */ jsx("span", { style: { ...contentStyle, marginBottom: 8 }, children }),
          /* @__PURE__ */ jsx("span", { style: { width: "100%", borderTop: lineBorder } })
        ]
      }
    );
  }
  const contentWrapperStyle = {
    display: "flex",
    alignItems: "center",
    width: length || "100%",
    minWidth: 0,
    gap: 12,
    margin,
    marginLeft: resolvedInset,
    marginRight: resolvedInset,
    boxSizing: "border-box",
    ...customStyle
  };
  return /* @__PURE__ */ jsxs(
    "div",
    {
      role: "separator",
      "aria-orientation": "horizontal",
      className,
      style: contentWrapperStyle,
      children: [
        /* @__PURE__ */ jsx("span", { style: { ...lineStyle, flex: startFlex } }),
        /* @__PURE__ */ jsx("span", { style: contentStyle, children }),
        /* @__PURE__ */ jsx("span", { style: { ...lineStyle, flex: endFlex } })
      ]
    }
  );
};
var Divider_default = Divider;

export {
  Divider_default
};
//# sourceMappingURL=chunk-I7RBWJ7G.mjs.map