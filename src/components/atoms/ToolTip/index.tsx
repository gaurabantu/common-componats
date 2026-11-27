"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";

import Icon from "../Icon";
import Tooltip from "../../molecules/Tooltip";
import { DEFAULT_TOOLTIP_Z, resolveLayerZIndex, type LayerZIndex } from "../../molecules/Popover/layering";
import type { TooltipIconProps } from "./TooltipIcon.types";
import { PLACEMENT_TO_SIDE, defaultTooltipOptions } from "./TooltipIcon.config";
import icon from "../../../assets/tooltip-icon.svg";
import "./ToolTip.css";

export type { TooltipIconProps, TooltipPlacement } from "./TooltipIcon.types";

function cls(...parts: (string | false | undefined)[]): string {
  return parts.filter(Boolean).join(" ");
}

function setRef<T>(ref: React.Ref<T> | undefined, value: T) {
  if (typeof ref === "function") ref(value);
  else if (ref && typeof ref === "object") (ref as React.MutableRefObject<T>).current = value;
}

function renderTooltipMedia(media: TooltipIconProps["tooltipContentIcon"]): React.ReactNode {
  if (!media) return null;
  if (React.isValidElement(media)) return media;
  if (
    typeof media !== "string" &&
    !(typeof media === "object" && media !== null && ("src" in media || "default" in media))
  ) {
    return null;
  }
  return <Icon src={media} width={16} height={16} decorative preserveColors />;
}

/**
 * ToolTip — icon trigger (focusable `span role="button"`, `aria-label={tooltipText}`; Enter/Space toggle)
 * with a hover/focus bubble.
 *
 * Thin wrapper over the canonical {@link Tooltip} molecule: the bubble is portalled, flips on
 * collision, is hoverable and Escape-dismissable (WCAG 1.4.13). Public props are unchanged.
 *
 * @deprecated Use `Tooltip` (molecule) around your own focusable trigger. `ToolTip` stays exported
 * for backward compatibility.
 */
const ToolTip = React.forwardRef<HTMLSpanElement, TooltipIconProps>(function ToolTip(
  {
    tooltipText,
    content,
    children,
    tooltipContentIcon,
    placement = defaultTooltipOptions.placement,
    delay = defaultTooltipOptions.delay,
    closeDelay = defaultTooltipOptions.closeDelay,
    size = defaultTooltipOptions.size,
    color = defaultTooltipOptions.color,
    iconToolTip = icon,
    className = "",
    maxWidth = defaultTooltipOptions.maxWidth,
    variant = defaultTooltipOptions.variant,
    zIndex,
    style,
    onMouseEnter,
    onMouseLeave,
    onPointerEnter,
    onKeyDown,
    role,
    ...rest
  },
  forwardedRef,
) {
  const [open, setOpenState] = useState(false);
  const [layerZ, setLayerZ] = useState<LayerZIndex>(`var(--z-tooltip-top, ${DEFAULT_TOOLTIP_Z})`);
  const triggerRef = useRef<HTMLSpanElement | null>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  /** Browsers fire pointerenter before mouseenter — then the canonical Tooltip owns hover. */
  const pointerSeenRef = useRef(false);

  const clearTimer = () => {
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = null;
  };
  useEffect(() => clearTimer, []);

  const setOpen = useCallback(
    (next: boolean) => {
      clearTimer();
      if (next && zIndex === undefined) {
        setLayerZ(resolveLayerZIndex(triggerRef.current, undefined, "--z-tooltip-top", DEFAULT_TOOLTIP_Z));
      }
      setOpenState(next);
    },
    [zIndex],
  );

  // Mouse-only environments (no Pointer Events) — keep the legacy mouseenter/mouseleave contract.
  const handleMouseEnter = (event: React.MouseEvent<HTMLSpanElement>) => {
    onMouseEnter?.(event);
    if (pointerSeenRef.current) return;
    clearTimer();
    timerRef.current = setTimeout(() => setOpen(true), delay);
  };
  const handleMouseLeave = (event: React.MouseEvent<HTMLSpanElement>) => {
    onMouseLeave?.(event);
    if (pointerSeenRef.current) return;
    clearTimer();
    timerRef.current = setTimeout(() => setOpen(false), closeDelay);
  };
  const handlePointerEnter = (event: React.PointerEvent<HTMLSpanElement>) => {
    pointerSeenRef.current = true;
    onPointerEnter?.(event);
  };

  // role="button" contract (WCAG 4.1.2): Enter / Space toggle the bubble. Escape is handled by Tooltip.
  const handleKeyDown = (event: React.KeyboardEvent<HTMLSpanElement>) => {
    onKeyDown?.(event);
    if (event.defaultPrevented) return;
    if (event.key === "Enter" || event.key === " " || event.key === "Spacebar") {
      event.preventDefault();
      setOpen(!open);
    }
  };

  const body = (
    <span className="ds-tooltip-icon__body" data-has-media={tooltipContentIcon ? "true" : undefined}>
      {renderTooltipMedia(tooltipContentIcon)}
      <span>{content ?? tooltipText}</span>
    </span>
  );

  return (
    <Tooltip
      content={body}
      open={open}
      onOpenChange={setOpen}
      side={PLACEMENT_TO_SIDE[placement] ?? "top"}
      delay={delay}
      closeDelay={closeDelay}
      maxWidth={maxWidth}
      variant={variant}
      zIndex={zIndex ?? layerZ}
    >
      <span
        {...rest}
        ref={(node: HTMLSpanElement | null) => {
          triggerRef.current = node;
          setRef(forwardedRef, node);
        }}
        className={cls("ds-tooltip-icon", className)}
        style={{ color, ...style }}
        role={role ?? "button"}
        aria-label={tooltipText}
        tabIndex={rest.tabIndex ?? 0}
        onKeyDown={handleKeyDown}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onPointerEnter={handlePointerEnter}
      >
        {children || <Icon src={iconToolTip} width={size} height={size} decorative />}
      </span>
    </Tooltip>
  );
});

ToolTip.displayName = "ToolTip";

export default ToolTip;
