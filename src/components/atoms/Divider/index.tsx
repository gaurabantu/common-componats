import React from "react";
import { DividerProps } from "./Divider.types";

const Divider: React.FC<DividerProps> = ({
  className = "",
  orientation = "horizontal",
  length,
  thickness = "1px",
  color = "var(--color-border-subtle, var(--color-mist-60, #ededed))",
  variant = "solid",
  align = "center",
  textPosition = "center",
  margin = "12px 0",
  inset = 0,
  style: customStyle,
  children,
}) => {
  const resolvedOrientation =
    orientation === "row" || orientation === "column"
      ? orientation === "row"
        ? "horizontal"
        : "vertical"
      : orientation;
  const isVertical = resolvedOrientation === "vertical";
  const resolvedThickness =
    typeof thickness === "number" ? `${thickness}px` : thickness;
  const resolvedInset = typeof inset === "number" ? `${inset}px` : inset;

  if (isVertical) {
    const verticalStyle: React.CSSProperties = {
      display: "inline-block",
      width: resolvedThickness,
      minWidth: resolvedThickness,
      alignSelf: "stretch",
      height: length || "100%",
      backgroundColor: color,
      margin,
      borderRadius: 9999,
      ...customStyle,
    };

    return (
      <div
        role="separator"
        aria-orientation="vertical"
        className={className}
        style={verticalStyle}
      />
    );
  }

  const borderStyle =
    variant === "dashed"
      ? "dashed"
      : variant === "dotted"
        ? "dotted"
        : "solid";

  const lineStyle: React.CSSProperties = {
    borderTop: `${resolvedThickness} ${borderStyle} ${color}`,
    borderBottom: "none",
    minWidth: 0,
    flex: 1,
  };

  if (!children) {
    const finalStyle: React.CSSProperties = {
      width: length || "100%",
      borderTop: `${resolvedThickness} ${borderStyle} ${color}`,
      margin,
      marginLeft: resolvedInset,
      marginRight: resolvedInset,
      boxSizing: "border-box",
      ...customStyle,
    };

    return (
      <div
        role="separator"
        aria-orientation="horizontal"
        className={className}
        style={finalStyle}
      />
    );
  }

  const startFlex = align === "start" ? 0.2 : align === "end" ? 0.8 : 1;
  const endFlex = align === "start" ? 0.8 : align === "end" ? 0.2 : 1;

  const contentStyle: React.CSSProperties = {
    flexShrink: 0,
    color: "var(--color-text-secondary, #757575)",
    fontSize: "var(--text-small-size, 12px)",
    lineHeight: 1.5,
    whiteSpace: "nowrap",
  };

  const lineBorder = `${resolvedThickness} ${borderStyle} ${color}`;

  if (textPosition === "above") {
    return (
      <div
        role="separator"
        aria-orientation="horizontal"
        className={className}
        style={{
          display: "flex",
          flexDirection: "column",
          width: length || "100%",
          margin,
          marginLeft: resolvedInset,
          marginRight: resolvedInset,
          boxSizing: "border-box",
          ...customStyle,
        }}
      >
        <span style={{ width: "100%", borderTop: lineBorder }} />
        <span style={{ ...contentStyle, marginTop: 8 }}>{children}</span>
      </div>
    );
  }

  if (textPosition === "below") {
    return (
      <div
        role="separator"
        aria-orientation="horizontal"
        className={className}
        style={{
          display: "flex",
          flexDirection: "column",
          width: length || "100%",
          margin,
          marginLeft: resolvedInset,
          marginRight: resolvedInset,
          boxSizing: "border-box",
          ...customStyle,
        }}
      >
        <span style={{ ...contentStyle, marginBottom: 8 }}>{children}</span>
        <span style={{ width: "100%", borderTop: lineBorder }} />
      </div>
    );
  }

  const contentWrapperStyle: React.CSSProperties = {
    display: "flex",
    alignItems: "center",
    width: length || "100%",
    minWidth: 0,
    gap: 12,
    margin,
    marginLeft: resolvedInset,
    marginRight: resolvedInset,
    boxSizing: "border-box",
    ...customStyle,
  };

  return (
    <div
      role="separator"
      aria-orientation="horizontal"
      className={className}
      style={contentWrapperStyle}
    >
      <span style={{ ...lineStyle, flex: startFlex }} />
      <span style={contentStyle}>{children}</span>
      <span style={{ ...lineStyle, flex: endFlex }} />
    </div>
  );
};

export default Divider;