// src/components/atoms/ProgressBar/index.tsx
import React from "react";

// src/components/atoms/ProgressBar/ProgressBar.config.ts
var DEFAULT_COLOR = "var(--color-brand-primary)";
var DEFAULT_HEIGHT = "1rem";
var DEFAULT_WIDTH = "100%";
var DEFAULT_ARIA_LABEL = "Progress";
var DEFAULT_TYPE = "line";
var DEFAULT_SIZE = "lg";
var SIZE_DIMENSIONS = {
  xs: 32,
  sm: 45,
  md: 70,
  lg: 90
};

// src/components/atoms/ProgressBar/ProgressBar.utils.ts
var computePercentage = ({
  value,
  stepCount,
  formCount
}) => {
  if (formCount && stepCount) {
    return Math.min(100, stepCount / formCount * 100);
  }
  return value;
};
var clamp = (value, min = 0, max = 100) => Math.max(min, Math.min(max, value));
var calculateCircumference = (radius) => 2 * Math.PI * radius;

// src/components/atoms/ProgressBar/index.tsx
import { jsx, jsxs } from "react/jsx-runtime";
var ProgressBar = ({
  value,
  type = DEFAULT_TYPE,
  customColor = DEFAULT_COLOR,
  gradient,
  trackColor,
  striped = false,
  animated = false,
  animation = "smooth",
  showLabel = true,
  label,
  size = DEFAULT_SIZE,
  className = "",
  height = DEFAULT_HEIGHT,
  width = DEFAULT_WIDTH,
  ariaLabel = DEFAULT_ARIA_LABEL,
  stepCount,
  formCount,
  showValue = true,
  strokeWidth,
  rounded = true
}) => {
  const computedPct = computePercentage({ value, stepCount, formCount });
  const pct = clamp(computedPct);
  const visualFill = gradient || customColor;
  const trackFill = trackColor || "var(--color-bg-page)";
  const resolvedAnimation = animation !== "smooth" ? animation : animated ? "pulse" : "smooth";
  const [animatedWidth, setAnimatedWidth] = React.useState(0);
  React.useEffect(() => {
    if (type === "line") {
      const timer = setTimeout(() => setAnimatedWidth(pct), 50);
      return () => clearTimeout(timer);
    }
  }, [pct, type]);
  if (type === "line") {
    const lineTrackStyle = {
      height,
      background: trackFill,
      borderRadius: rounded ? 9999 : 6
    };
    const lineFillStyle = {
      width: `${animatedWidth}%`,
      height: "100%",
      background: visualFill,
      borderRadius: rounded ? 9999 : 6,
      transition: resolvedAnimation === "none" ? "none" : "width 450ms cubic-bezier(0.22, 1, 0.36, 1), opacity 180ms ease",
      position: "relative",
      overflow: "hidden"
    };
    const showStripeOverlay = striped || resolvedAnimation === "stripes-flow";
    return /* @__PURE__ */ jsxs(
      "div",
      {
        className: `progress-bar-reduce-motion ${className}`.trim(),
        style: { width },
        role: "progressbar",
        "aria-valuenow": Math.round(pct),
        "aria-valuemin": 0,
        "aria-valuemax": 100,
        "aria-label": ariaLabel,
        children: [
          /* @__PURE__ */ jsxs(
            "div",
            {
              style: {
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: 12,
                marginBottom: showLabel || showValue ? 8 : 0
              },
              children: [
                showLabel && label ? /* @__PURE__ */ jsx(
                  "span",
                  {
                    style: {
                      color: "var(--color-text-primary)",
                      fontSize: "var(--text-small-size, 12px)",
                      fontWeight: 600,
                      lineHeight: 1.5
                    },
                    children: label
                  }
                ) : /* @__PURE__ */ jsx("span", {}),
                showValue && /* @__PURE__ */ jsxs(
                  "span",
                  {
                    style: {
                      color: "var(--color-text-secondary)",
                      fontSize: "var(--text-small-size, 12px)",
                      lineHeight: 1.5
                    },
                    children: [
                      Math.round(pct),
                      "%"
                    ]
                  }
                )
              ]
            }
          ),
          /* @__PURE__ */ jsx(
            "div",
            {
              style: {
                ...lineTrackStyle,
                position: "relative",
                overflow: "hidden",
                width: "100%"
              },
              children: /* @__PURE__ */ jsx(
                "div",
                {
                  className: "progress-bar-fill",
                  style: {
                    ...lineFillStyle,
                    opacity: resolvedAnimation === "pulse" ? 0.92 : 1,
                    animation: resolvedAnimation === "pulse" ? "progress-pulse 1.4s ease-in-out infinite" : void 0
                  },
                  children: showStripeOverlay && /* @__PURE__ */ jsx(
                    "span",
                    {
                      className: "progress-bar-stripes",
                      style: {
                        position: "absolute",
                        inset: 0,
                        background: "linear-gradient(135deg, rgba(255,255,255,0.28) 25%, transparent 25%, transparent 50%, rgba(255,255,255,0.28) 50%, rgba(255,255,255,0.28) 75%, transparent 75%, transparent)",
                        backgroundSize: "16px 16px",
                        animation: resolvedAnimation === "stripes-flow" ? "progress-stripes 0.8s linear infinite" : void 0
                      }
                    }
                  )
                }
              )
            }
          )
        ]
      }
    );
  }
  const dims = SIZE_DIMENSIONS[size] || 50;
  const effectiveStrokeWidth = strokeWidth != null ? strokeWidth : Math.max(4, Math.round(dims * 0.1));
  const radius = (dims - effectiveStrokeWidth - 4) / 2;
  const circumference = calculateCircumference(radius);
  const [animatedOffset, setAnimatedOffset] = React.useState(circumference);
  React.useEffect(() => {
    const newOffset = circumference * (1 - pct / 100);
    const timer = setTimeout(() => setAnimatedOffset(newOffset), 50);
    return () => clearTimeout(timer);
  }, [pct, circumference]);
  const getFontSize = () => {
    if (size === "xs")
      return "14px";
    if (size === "sm")
      return "16px";
    if (size === "md")
      return "20px";
    if (size === "lg")
      return "24px";
    return void 0;
  };
  const fontSize = getFontSize();
  const circleId = React.useId();
  return /* @__PURE__ */ jsxs(
    "div",
    {
      className: `progress-bar-reduce-motion ${className}`.trim(),
      style: { display: "flex", flexDirection: "column", alignItems: "center", gap: 8 },
      role: "progressbar",
      "aria-valuenow": Math.round(pct),
      "aria-valuemin": 0,
      "aria-valuemax": 100,
      "aria-label": ariaLabel,
      children: [
        /* @__PURE__ */ jsxs(
          "div",
          {
            style: { position: "relative", display: "flex", justifyContent: "center", alignItems: "center", width: dims, height: dims },
            children: [
              /* @__PURE__ */ jsxs("svg", { width: dims, height: dims, className: "block", children: [
                gradient && /* @__PURE__ */ jsx("defs", { children: /* @__PURE__ */ jsxs("linearGradient", { id: `progress-gradient-${circleId}`, x1: "0%", y1: "0%", x2: "100%", y2: "100%", children: [
                  /* @__PURE__ */ jsx("stop", { offset: "0%", stopColor: "var(--color-state-info)" }),
                  /* @__PURE__ */ jsx("stop", { offset: "100%", stopColor: "var(--color-accent-lavender-40)" })
                ] }) }),
                /* @__PURE__ */ jsx(
                  "circle",
                  {
                    cx: dims / 2,
                    cy: dims / 2,
                    r: radius,
                    strokeWidth: effectiveStrokeWidth,
                    style: { stroke: trackFill, fill: "none" }
                  }
                ),
                /* @__PURE__ */ jsx(
                  "circle",
                  {
                    className: "progress-bar-circle-stroke",
                    cx: dims / 2,
                    cy: dims / 2,
                    r: radius,
                    strokeWidth: effectiveStrokeWidth,
                    style: {
                      stroke: gradient ? `url(#progress-gradient-${circleId})` : customColor,
                      strokeDasharray: circumference,
                      strokeDashoffset: animatedOffset,
                      strokeLinecap: rounded ? "round" : "butt",
                      fill: "none",
                      transition: resolvedAnimation === "none" ? "none" : "stroke-dashoffset 0.7s cubic-bezier(0.22, 1, 0.36, 1)",
                      transform: "rotate(-90deg)",
                      transformOrigin: "center",
                      filter: resolvedAnimation === "pulse" ? "drop-shadow(0 0 6px var(--color-progress-glow, rgba(59, 130, 246, 0.35)))" : void 0
                    }
                  }
                )
              ] }),
              /* @__PURE__ */ jsx(
                "div",
                {
                  style: {
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    color: "var(--color-text-primary)",
                    fontWeight: 700,
                    lineHeight: 1,
                    fontSize: fontSize || 16
                  },
                  children: showValue ? `${Math.round(pct)}%` : stepCount !== void 0 ? stepCount : Math.round(pct)
                }
              )
            ]
          }
        ),
        showLabel && label && /* @__PURE__ */ jsx(
          "div",
          {
            style: {
              color: "var(--color-text-secondary)",
              fontSize: "var(--text-small-size, 12px)",
              textAlign: "center",
              lineHeight: 1.5
            },
            children: label
          }
        ),
        /* @__PURE__ */ jsx("style", { children: `
        @keyframes progress-pulse {
          0%, 100% { opacity: 0.86; }
          50% { opacity: 1; }
        }
        @keyframes progress-stripes {
          from { background-position: 0 0; }
          to { background-position: 16px 0; }
        }
        @media (prefers-reduced-motion: reduce) {
          .progress-bar-reduce-motion .progress-bar-fill,
          .progress-bar-reduce-motion .progress-bar-stripes,
          .progress-bar-reduce-motion .progress-bar-circle-stroke {
            animation: none !important;
            transition: none !important;
          }
        }
      ` })
      ]
    }
  );
};
var ProgressBar_default = ProgressBar;

export {
  ProgressBar_default
};
//# sourceMappingURL=chunk-PJNSHXAE.mjs.map