"use client";

import React, { useCallback, useId, useLayoutEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

type Props = {
  collapsed: boolean;
  label: string;
  children: React.ReactElement;
};

/**
 * Tooltip when rail collapsed only — trigger keeps single tab stop; no layout shift.
 */
export default function AppSidebarTooltipHost({ collapsed, label, children }: Props) {
  const tipId = useId();
  const [visible, setVisible] = useState(false);
  const [coords, setCoords] = useState<{ top: number; left: number }>({ top: 0, left: 0 });
  const hostRef = useRef<HTMLSpanElement>(null);

  const position = useCallback(() => {
    const el = hostRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const top = r.top + r.height / 2;
    const left = r.right + 8;
    setCoords((prev) => {
      if (Math.abs(prev.top - top) < 0.5 && Math.abs(prev.left - left) < 0.5) return prev;
      return { top, left };
    });
  }, []);

  useLayoutEffect(() => {
    if (!visible || !collapsed) return;
    position();
    const onScroll = () => position();
    window.addEventListener("scroll", onScroll, true);
    window.addEventListener("resize", position);
    return () => {
      window.removeEventListener("scroll", onScroll, true);
      window.removeEventListener("resize", position);
    };
  }, [visible, collapsed, position]);

  if (!collapsed) {
    return children;
  }

  const child = React.cloneElement(children, {
    "aria-describedby": visible ? tipId : undefined,
  } as React.Attributes);

  const tooltip =
    visible && typeof document !== "undefined"
      ? createPortal(
          <span
            id={tipId}
            role="tooltip"
            className="app-sidebar__floating-tip"
            style={{
              position: "fixed",
              top: coords.top,
              left: coords.left,
              transform: "translateY(-50%)",
              zIndex: 99999,
            }}
          >
            {label}
          </span>,
          document.body
        )
      : null;

  return (
    <span
      ref={hostRef}
      className="app-sidebar__tip-host"
      onMouseEnter={() => setVisible(true)}
      onMouseLeave={() => setVisible(false)}
      onFocusCapture={() => setVisible(true)}
      onBlurCapture={() => setVisible(false)}
    >
      {child}
      {tooltip}
    </span>
  );
}
