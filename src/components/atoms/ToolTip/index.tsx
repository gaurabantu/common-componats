"use client";

import React, { useCallback, useEffect, useId, useLayoutEffect, useRef, useState } from "react";

import Icon from "../Icon";
import { TooltipIconProps } from "./TooltipIcon.types";
import { defaultTooltipOptions } from "./TooltipIcon.config";
import icon from '../../../assets/tooltip-icon.svg'

type ResolvedPlacement = "top" | "bottom" | "left" | "right";

const VIEWPORT_PADDING = 8;
const TOOLTIP_GAP = 10;
const ARROW_SIZE = 6;

function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), Math.max(min, max));
}

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
  const tooltipRef = useRef<HTMLSpanElement>(null);
  const openTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const closeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [isPositioned, setIsPositioned] = useState(false);
  const [resolvedPlacement, setResolvedPlacement] = useState<ResolvedPlacement>("top");
  const [floatingStyle, setFloatingStyle] = useState<React.CSSProperties>({
    top: 0,
    left: 0,
  });
  const [arrowStyle, setArrowStyle] = useState<React.CSSProperties>({});

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
    openTimerRef.current = setTimeout(() => {
      setIsPositioned(false);
      setIsOpen(true);
    }, delay);
  };

  const hideTooltip = () => {
    clearTimers();
    closeTimerRef.current = setTimeout(() => setIsOpen(false), closeDelay);
  };

  const getArrowStyle = useCallback((
    nextPlacement: ResolvedPlacement,
    tooltipLeft: number,
    tooltipTop: number,
    tooltipWidth: number,
    tooltipHeight: number,
    triggerRect: DOMRect
  ): React.CSSProperties => {
    const triggerCenterX = triggerRect.left + triggerRect.width / 2;
    const triggerCenterY = triggerRect.top + triggerRect.height / 2;
    const arrowX = clamp(triggerCenterX - tooltipLeft, ARROW_SIZE + 2, tooltipWidth - ARROW_SIZE - 2);
    const arrowY = clamp(triggerCenterY - tooltipTop, ARROW_SIZE + 2, tooltipHeight - ARROW_SIZE - 2);

    const base: React.CSSProperties = {
      position: "absolute",
      width: 0,
      height: 0,
      color: tooltipBackground,
    };

    if (nextPlacement === "top") {
      return {
        ...base,
        left: arrowX,
        top: "100%",
        transform: "translateX(-50%)",
        borderLeft: `${ARROW_SIZE}px solid transparent`,
        borderRight: `${ARROW_SIZE}px solid transparent`,
        borderTop: `${ARROW_SIZE}px solid currentColor`,
      };
    }
    if (nextPlacement === "bottom") {
      return {
        ...base,
        left: arrowX,
        bottom: "100%",
        transform: "translateX(-50%)",
        borderLeft: `${ARROW_SIZE}px solid transparent`,
        borderRight: `${ARROW_SIZE}px solid transparent`,
        borderBottom: `${ARROW_SIZE}px solid currentColor`,
      };
    }
    if (nextPlacement === "left") {
      return {
        ...base,
        left: "100%",
        top: arrowY,
        transform: "translateY(-50%)",
        borderTop: `${ARROW_SIZE}px solid transparent`,
        borderBottom: `${ARROW_SIZE}px solid transparent`,
        borderLeft: `${ARROW_SIZE}px solid currentColor`,
      };
    }
    return {
      ...base,
      right: "100%",
      top: arrowY,
      transform: "translateY(-50%)",
      borderTop: `${ARROW_SIZE}px solid transparent`,
      borderBottom: `${ARROW_SIZE}px solid transparent`,
      borderRight: `${ARROW_SIZE}px solid currentColor`,
    };
  }, [tooltipBackground]);

  const updatePosition = useCallback(() => {
    const trigger = triggerRef.current;
    const tooltip = tooltipRef.current;
    if (!trigger || !tooltip || typeof window === "undefined") return;

    const triggerRect = trigger.getBoundingClientRect();
    const tooltipRect = tooltip.getBoundingClientRect();
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;

    const spaces: Record<ResolvedPlacement, number> = {
      top: triggerRect.top,
      bottom: viewportHeight - triggerRect.bottom,
      left: triggerRect.left,
      right: viewportWidth - triggerRect.right,
    };

    const fits: Record<ResolvedPlacement, boolean> = {
      top: spaces.top >= tooltipRect.height + TOOLTIP_GAP + VIEWPORT_PADDING,
      bottom: spaces.bottom >= tooltipRect.height + TOOLTIP_GAP + VIEWPORT_PADDING,
      left: spaces.left >= tooltipRect.width + TOOLTIP_GAP + VIEWPORT_PADDING,
      right: spaces.right >= tooltipRect.width + TOOLTIP_GAP + VIEWPORT_PADDING,
    };

    const order: ResolvedPlacement[] = ["top", "bottom", "right", "left"];
    const nextPlacement =
      placement === "auto"
        ? order.find((side) => fits[side]) ??
          order.reduce((best, side) => (spaces[side] > spaces[best] ? side : best), "top")
        : placement;

    let left = triggerRect.left + triggerRect.width / 2 - tooltipRect.width / 2;
    let top = triggerRect.top - tooltipRect.height - TOOLTIP_GAP;

    if (nextPlacement === "bottom") {
      top = triggerRect.bottom + TOOLTIP_GAP;
    } else if (nextPlacement === "left") {
      left = triggerRect.left - tooltipRect.width - TOOLTIP_GAP;
      top = triggerRect.top + triggerRect.height / 2 - tooltipRect.height / 2;
    } else if (nextPlacement === "right") {
      left = triggerRect.right + TOOLTIP_GAP;
      top = triggerRect.top + triggerRect.height / 2 - tooltipRect.height / 2;
    }

    left = clamp(left, VIEWPORT_PADDING, viewportWidth - tooltipRect.width - VIEWPORT_PADDING);
    top = clamp(top, VIEWPORT_PADDING, viewportHeight - tooltipRect.height - VIEWPORT_PADDING);

    setResolvedPlacement(nextPlacement);
    setFloatingStyle({ top, left });
    setArrowStyle(getArrowStyle(nextPlacement, left, top, tooltipRect.width, tooltipRect.height, triggerRect));
    setIsPositioned(true);
  }, [getArrowStyle, placement]);

  useLayoutEffect(() => {
    if (!isOpen) return;
    updatePosition();
  }, [isOpen, updatePosition, content, tooltipText, maxWidth]);

  useEffect(() => {
    if (!isOpen) return undefined;
    const onChange = () => updatePosition();
    window.addEventListener("resize", onChange);
    window.addEventListener("scroll", onChange, true);
    return () => {
      window.removeEventListener("resize", onChange);
      window.removeEventListener("scroll", onChange, true);
    };
  }, [isOpen, updatePosition]);

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
          ref={tooltipRef}
          id={`tooltip-${tooltipId}`}
          role="tooltip"
          style={{
            position: "fixed",
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
            top: floatingStyle.top,
            left: floatingStyle.left,
            visibility: isPositioned ? "visible" : "hidden",
          }}
        >
          <span
            style={{
              ...arrowStyle,
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