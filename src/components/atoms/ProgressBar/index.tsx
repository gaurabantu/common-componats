"use client";
import React from "react";
import { ProgressBarProps } from "./ProgresBar.types";
import { DEFAULT_COLOR, DEFAULT_HEIGHT, DEFAULT_WIDTH, DEFAULT_ARIA_LABEL, DEFAULT_TYPE, DEFAULT_SIZE, SIZE_DIMENSIONS } from "./ProgressBar.config";
import { computePercentage, clamp, calculateCircumference } from "./ProgressBar.utils";
const ProgressBar: React.FC<ProgressBarProps> = ({
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
  rounded = true,
}) => {
  const computedPct = computePercentage({ value, stepCount, formCount });
  const pct = clamp(computedPct);
  const visualFill = gradient || customColor;
  const trackFill = trackColor || "var(--color-bg-page, #F3F4F6)";
  const resolvedAnimation =
    animation !== "smooth"
      ? animation
      : animated
        ? "pulse"
        : "smooth";

  /* ---------------- LINE PROGRESS ---------------- */
  const [animatedWidth, setAnimatedWidth] = React.useState(0);

  React.useEffect(() => {
    if (type === "line") {
      const timer = setTimeout(() => setAnimatedWidth(pct), 50);
      return () => clearTimeout(timer);
    }
  }, [pct, type]);

  if (type === "line") {
    const lineTrackStyle: React.CSSProperties = {
      height,
      background: trackFill,
      borderRadius: rounded ? 9999 : 6,
    };

    const lineFillStyle: React.CSSProperties = {
      width: `${animatedWidth}%`,
      height: "100%",
      background: visualFill,
      borderRadius: rounded ? 9999 : 6,
      transition:
        resolvedAnimation === "none"
          ? "none"
          : "width 450ms cubic-bezier(0.22, 1, 0.36, 1), opacity 180ms ease",
      position: "relative",
      overflow: "hidden",
    };

    const showStripeOverlay = striped || resolvedAnimation === "stripes-flow";

    return (
      <div
        className={`progress-bar-reduce-motion ${className}`.trim()}
        style={{ width }}
        role="progressbar"
        aria-valuenow={Math.round(pct)}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={ariaLabel}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 12,
            marginBottom: showLabel || showValue ? 8 : 0,
          }}
        >
          {showLabel && label ? (
            <span
              style={{
                color: "var(--color-text-primary, #0D0D0D)",
                fontSize: "var(--text-small-size, 12px)",
                fontWeight: 600,
                lineHeight: 1.5,
              }}
            >
              {label}
            </span>
          ) : (
            <span />
          )}
          {showValue && (
            <span
              style={{
                color: "var(--color-text-secondary, #757575)",
                fontSize: "var(--text-small-size, 12px)",
                lineHeight: 1.5,
              }}
            >
              {Math.round(pct)}%
            </span>
          )}
        </div>

        <div
          style={{
            ...lineTrackStyle,
            position: "relative",
            overflow: "hidden",
            width: "100%",
          }}
        >
          <div
            className="progress-bar-fill"
            style={{
              ...lineFillStyle,
              opacity: resolvedAnimation === "pulse" ? 0.92 : 1,
              animation:
                resolvedAnimation === "pulse"
                  ? "progress-pulse 1.4s ease-in-out infinite"
                  : undefined,
            }}
          >
            {showStripeOverlay && (
              <span
                className="progress-bar-stripes"
                style={{
                  position: "absolute",
                  inset: 0,
                  background:
                    "linear-gradient(135deg, rgba(255,255,255,0.28) 25%, transparent 25%, transparent 50%, rgba(255,255,255,0.28) 50%, rgba(255,255,255,0.28) 75%, transparent 75%, transparent)",
                  backgroundSize: "16px 16px",
                  animation:
                    resolvedAnimation === "stripes-flow"
                      ? "progress-stripes 0.8s linear infinite"
                      : undefined,
                }}
              />
            )}
          </div>
        </div>
      </div>
    );
  }


  /* ---------------- CIRCLE PROGRESS ---------------- */
  const dims = SIZE_DIMENSIONS[size] || 50;
  const effectiveStrokeWidth = strokeWidth ?? Math.max(4, Math.round(dims * 0.1));
  const radius = (dims - effectiveStrokeWidth - 4) / 2;
  const circumference = calculateCircumference(radius);

  const [animatedOffset, setAnimatedOffset] = React.useState(circumference);

  React.useEffect(() => {
    const newOffset = circumference * (1 - pct / 100);
    const timer = setTimeout(() => setAnimatedOffset(newOffset), 50);
    return () => clearTimeout(timer);
  }, [pct, circumference]);

  const getFontSize = () => {
    if (size === "xs") return "14px";
    if (size === "sm") return "16px";
    if (size === "md") return "20px";
    if (size === "lg") return "24px";
    return undefined;
  };

  const fontSize = getFontSize();
  const circleId = React.useId();

  return (
    <div
      className={`progress-bar-reduce-motion ${className}`.trim()}
      style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}
      role="progressbar"
      aria-valuenow={Math.round(pct)}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label={ariaLabel}
    >
      <div
        style={{ position: "relative", display: "flex", justifyContent: "center", alignItems: "center", width: dims, height: dims }}
      >
        <svg width={dims} height={dims} className="block">
          {gradient && (
            <defs>
              <linearGradient id={`progress-gradient-${circleId}`} x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#60A5FA" />
                <stop offset="100%" stopColor="#8B5CF6" />
              </linearGradient>
            </defs>
          )}
          <circle
            cx={dims / 2}
            cy={dims / 2}
            r={radius}
            strokeWidth={effectiveStrokeWidth}
            style={{ stroke: trackFill, fill: "none" }}
          />
          <circle
            className="progress-bar-circle-stroke"
            cx={dims / 2}
            cy={dims / 2}
            r={radius}
            strokeWidth={effectiveStrokeWidth}
            style={{
              stroke: gradient ? `url(#progress-gradient-${circleId})` : customColor,
              strokeDasharray: circumference,
              strokeDashoffset: animatedOffset,
              strokeLinecap: rounded ? "round" : "butt",
              fill: "none",
              transition:
                resolvedAnimation === "none"
                  ? "none"
                  : "stroke-dashoffset 0.7s cubic-bezier(0.22, 1, 0.36, 1)",
              transform: "rotate(-90deg)",
              transformOrigin: "center",
              filter: resolvedAnimation === "pulse" ? "drop-shadow(0 0 6px rgba(59,130,246,0.35))" : undefined,
            }}
          />
        </svg>

        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            color: "var(--color-text-primary, #0D0D0D)",
            fontWeight: 700,
            lineHeight: 1,
            fontSize: fontSize || 16,
          }}
        >
          {showValue ? `${Math.round(pct)}%` : stepCount !== undefined ? stepCount : Math.round(pct)}
        </div>
      </div>

      {showLabel && label && (
        <div
          style={{
            color: "var(--color-text-secondary, #757575)",
            fontSize: "var(--text-small-size, 12px)",
            textAlign: "center",
            lineHeight: 1.5,
          }}
        >
          {label}
        </div>
      )}
      <style>{`
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
      `}</style>
    </div>
  );
};

export default ProgressBar;