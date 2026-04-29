"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";

/** Press feedback burst for buttons and menu rows. Parent must use `.ucs-ripple-parent`. */
export function useRipple(enabled: boolean) {
  const [bursts, setBursts] = useState<{ id: number; x: number; y: number }[]>([]);
  const seq = useRef(0);
  const timersRef = useRef<ReturnType<typeof setTimeout>[]>([]);

  useEffect(() => {
    const timers = timersRef.current;
    return () => timers.forEach(clearTimeout);
  }, []);

  const onPointerDown = useCallback(
    (e: React.PointerEvent<HTMLElement>) => {
      if (!enabled) return;
      if (e.button !== 0) return;
      const rect = e.currentTarget.getBoundingClientRect();
      const id = ++seq.current;
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      setBursts((b) => [...b, { id, x, y }]);
      const t = window.setTimeout(() => {
        setBursts((b) => b.filter((k) => k.id !== id));
      }, 550);
      timersRef.current.push(t);
    },
    [enabled],
  );

  const RippleOverlay =
    bursts.length === 0 ? null : (
      <span className="ucs-ripple-layer" aria-hidden="true">
        {bursts.map((b) => (
          <span key={b.id} className="ucs-ripple-wave" style={{ left: b.x, top: b.y }} />
        ))}
      </span>
    );

  return { onPointerDown, RippleOverlay };
}
