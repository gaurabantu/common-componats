import { useMemo, useRef } from "react";
import type { PointerEventHandler } from "react";
import type * as ReactNs from "react";
import { useLatest } from "./useLatest";

export interface UseLongPressOptions {
  /**
   * Delay before invoking `onLongPress` (`react-use`/material-style long press).
   * @default 500
   */
  ms?: number;
  onLongPress: (event: ReactNs.PointerEvent) => void;
  /**
   * Cancel if pointer moves beyond this Euclidean distance from the down point (helps vs scroll jitter).
   * @default 10
   */
  moveThreshold?: number;
}

export type UseLongPressReturn = Pick<
  ReactNs.DOMAttributes<Element>,
  "onPointerDown" | "onPointerMove" | "onPointerUp" | "onPointerLeave" | "onPointerCancel"
>;

type PressState = {
  timerId: ReturnType<typeof setTimeout> | null;
  startX: number;
  startY: number;
  activePointerId: number | null;
};

const initialPressState = (): PressState => ({
  timerId: null,
  startX: 0,
  startY: 0,
  activePointerId: null,
});

/**
 * Pointer-events long press (Chrome/Safari touch + mouse parity); cancel on scroll-like movement / release.
 * Compose returned handlers onto a single interactive element (`role`, `tabIndex`, and `touch-action` are app concerns).
 *
 * Prefer `touch-action: manipulation` CSS on interactive targets where needed to minimize browser zoom delay.
 */
export function useLongPress(options: UseLongPressOptions): UseLongPressReturn {
  const { ms = 500, moveThreshold = 10 } = options;
  const onLongPressRef = useLatest(options.onLongPress);
  const state = useRef<PressState>(initialPressState());

  const clearTimer = () => {
    const id = state.current.timerId;
    if (id != null) clearTimeout(id);
    state.current.timerId = null;
  };

  return useMemo(() => {
    const onPointerDown: PointerEventHandler = (event) => {
      if (event.button !== undefined && event.button !== 0) return;
      clearTimer();
      state.current.startX = event.clientX;
      state.current.startY = event.clientY;
      state.current.activePointerId = event.pointerId;
      try {
        event.currentTarget.setPointerCapture?.(event.pointerId);
      } catch {
        //
      }

      state.current.timerId = setTimeout(() => {
        state.current.timerId = null;
        try {
          onLongPressRef.current(event);
        } catch {
          //
        }
      }, ms);
    };

    const cancelIfActivePointer = (pointerId: number) => {
      if (state.current.activePointerId !== pointerId) return;
      clearTimer();
      state.current.activePointerId = null;
    };

    const onPointerMove: PointerEventHandler = (event) => {
      if (state.current.timerId === null || state.current.activePointerId !== event.pointerId) return;

      const dx = event.clientX - state.current.startX;
      const dy = event.clientY - state.current.startY;
      const distance = Math.hypot(dx, dy);
      if (distance > moveThreshold) cancelIfActivePointer(event.pointerId);
    };

    const onPointerEnd: PointerEventHandler = (event) => {
      cancelIfActivePointer(event.pointerId);
      try {
        if (event.currentTarget.hasPointerCapture?.(event.pointerId)) {
          event.currentTarget.releasePointerCapture(event.pointerId);
        }
      } catch {
        //
      }
    };

    return {
      onPointerDown,
      onPointerMove,
      onPointerUp: onPointerEnd,
      onPointerLeave: onPointerEnd,
      onPointerCancel: onPointerEnd,
    };
  }, [ms, moveThreshold, onLongPressRef]);
}
