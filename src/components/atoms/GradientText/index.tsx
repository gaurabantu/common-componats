"use client";
import React from "react";
import type { GradientTextProps } from "./GradientText.types";

const defaultGradient =
  "linear-gradient(135deg, var(--color-brand-primary, #0d0d0d) 0%, var(--color-brand-secondary, #10b981) 100%)";

const GradientText = React.memo(function GradientText({
  children,
  as: Component = "span",
  gradient = defaultGradient,
  fallbackColor = "var(--color-brand-primary, #0d0d0d)",
  className = "",
  style,
}: GradientTextProps) {
  return (
    <Component
      className={className}
      style={{
        display: "inline-block",
        color: fallbackColor,
        backgroundImage: gradient,
        backgroundClip: "text",
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
        ...style,
      }}
    >
      {children}
    </Component>
  );
});

export default GradientText;
