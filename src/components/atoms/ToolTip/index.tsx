"use client";

import React, { useEffect, useId, useRef, useState } from "react";

import Icon from "../Icon";
import { TooltipIconProps } from "./TooltipIcon.types";
import { defaultTooltipOptions } from "./TooltipIcon.config";
import icon from '../../../assets/tooltip-icon.svg'

const TooltipIcon: React.FC<TooltipIconProps> = ({
  tooltipText,
  content,
  children,
  tooltipContentIcon,
  placement = defaultTooltipOptions.placement,
  delay = defaultTooltipOptions.delay,
  closeDelay = 80,
  size = 16,
  color = defaultTooltipOptions.color,
  iconToolTip = icon,
  className = "",
  maxWidth = 240,
  variant = "dark",
  ...rest
}) => {
  const tooltipId = useId();
  const triggerRef = useRef<HTMLSpanElement>(null);
  const openTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const closeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  const clearTimers = () => {
    if (openTimerRef.current) clearTimeout(openTimerRef.current);
    if (closeTimerRef.current) clearTimeout(closeTimerRef.current);
    openTimerRef.current = null;
    closeTimerRef.current = null;
  };

  useEffect(() => {
    return () => {
      clearTimers();
    };
  }, []);

  const showTooltip = () => {
    clearTimers();
    openTimerRef.current = setTimeout(() => setIsOpen(true), delay);
  };

  const hideTooltip = () => {
    clearTimers();
    closeTimerRef.current = setTimeout(() => setIsOpen(false), closeDelay);
  };

  const placementStyleMap: Record<string, React.CSSProperties> = {
    top: {
      bottom: `calc(100% + 10px)`,
      left: "50%",
      transform: "translateX(-50%)",
    },
    bottom: {
      top: `calc(100% + 10px)`,
      left: "50%",
      transform: "translateX(-50%)",
    },
    left: {
      right: `calc(100% + 10px)`,
      top: "50%",
      transform: "translateY(-50%)",
    },
    right: {
      left: `calc(100% + 10px)`,
      top: "50%",
      transform: "translateY(-50%)",
    },
  };

  const arrowStyleMap: Record<string, React.CSSProperties> = {
    top: {
      left: "50%",
      top: "100%",
      transform: "translateX(-50%)",
      borderLeft: "6px solid transparent",
      borderRight: "6px solid transparent",
      borderTop: "6px solid currentColor",
    },
    bottom: {
      left: "50%",
      bottom: "100%",
      transform: "translateX(-50%)",
      borderLeft: "6px solid transparent",
      borderRight: "6px solid transparent",
      borderBottom: "6px solid currentColor",
    },
    left: {
      left: "100%",
      top: "50%",
      transform: "translateY(-50%)",
      borderTop: "6px solid transparent",
      borderBottom: "6px solid transparent",
      borderLeft: "6px solid currentColor",
    },
    right: {
      right: "100%",
      top: "50%",
      transform: "translateY(-50%)",
      borderTop: "6px solid transparent",
      borderBottom: "6px solid transparent",
      borderRight: "6px solid currentColor",
    },
  };

  const tooltipBackground =
    variant === "light"
      ? "var(--color-bg-surface, #FFFFFF)"
      : "var(--color-text-primary, #0D0D0D)";
  const tooltipForeground =
    variant === "light"
      ? "var(--color-text-primary, #0D0D0D)"
      : "var(--color-bg-surface, #FFFFFF)";
  const tooltipBorder =
    variant === "light" ? "1px solid rgba(153, 153, 153, 0.3)" : "1px solid transparent";

  const renderTooltipMedia = () => {
    if (!tooltipContentIcon) return null;

    if (React.isValidElement(tooltipContentIcon)) {
      return tooltipContentIcon;
    }

    if (
      typeof tooltipContentIcon !== "string" &&
      !(typeof tooltipContentIcon === "object" && tooltipContentIcon !== null && ("src" in tooltipContentIcon || "default" in tooltipContentIcon))
    ) {
      return null;
    }

    return (
      <Icon
        src={tooltipContentIcon}
        width={16}
        height={16}
        decorative
        preserveColors
      />
    );
  };

  return (
    <span
      ref={triggerRef}
      className={className}
      style={{
        position: "relative",
        display: "inline-flex",
        alignItems: "center",
        cursor: "pointer",
        color,
      }}
      aria-label={tooltipText}
      aria-describedby={isOpen ? `tooltip-${tooltipId}` : undefined}
      tabIndex={0}
      onMouseEnter={showTooltip}
      onMouseLeave={hideTooltip}
      onFocus={showTooltip}
      onBlur={hideTooltip}
      {...rest}
    >
      {children || (
        <Icon
          src={iconToolTip}
          width={size}
          height={size}
          decorative
        />
      )}

      {isOpen && (
        <span
          id={`tooltip-${tooltipId}`}
          role="tooltip"
          style={{
            position: "absolute",
            zIndex: 50,
            maxWidth: typeof maxWidth === "number" ? `${maxWidth}px` : maxWidth,
            minWidth: 120,
            padding: "10px 12px",
            borderRadius: 8,
            background: tooltipBackground,
            color: tooltipForeground,
            border: tooltipBorder,
            boxShadow: "var(--shadow-md, 0 4px 16px rgba(0, 0, 0, 0.10))",
            fontSize: "var(--text-small-size, 12px)",
            lineHeight: 1.5,
            ...placementStyleMap[placement],
          }}
        >
          <span
            style={{
              position: "absolute",
              width: 0,
              height: 0,
              color: tooltipBackground,
              ...arrowStyleMap[placement],
            }}
          />
          <span
            style={{
              display: "flex",
              alignItems: "flex-start",
              gap: tooltipContentIcon ? 8 : 0,
            }}
          >
            {renderTooltipMedia()}
            <span>{content ?? tooltipText}</span>
          </span>
        </span>
      )}
    </span>
  );
};

export default TooltipIcon;