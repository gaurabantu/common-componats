import { useMemo, useRef } from "react";
import type { PointerEventHandler } from "react";
import type * as ReactNs from "react";
import { useLatest } from "./useLatest";

export interface UseSwipeOptions {
  /** Minimum swipe distance along one axis (`react-swipeable`-style thresholds). @default 40 */
  threshold?: number;
  /** Max duration since pointer down for a swipe to count (`react-use` gestures). @default 600 */
  timeoutMs?: number;
  onSwipeLeft?: (event: ReactNs.PointerEvent) => void;
  onSwipeRight?: (event: ReactNs.PointerEvent) => void;
  onSwipeUp?: (event: ReactNs.PointerEvent) => void;
  onSwipeDown?: (event: ReactNs.PointerEvent) => void;
}

export type UseSwipeReturn = Pick<
  ReactNs.DOMAttributes<Element>,
  "onPointerDown" | "onPointerMove" | "onPointerUp" | "onPointerCancel"
>;

type Track = {
  activePointerId: number | null;
  startX: number;
  startY: number;
  startTimestamp: number;
};

const initialTrack = (): Track => ({
  activePointerId: null,
  startX: 0,
  startY: 0,
  startTimestamp: 0,
});

/**
 * Axis swipe detection via Pointer Events; uses `setPointerCapture` for consistent `pointermove` delivery.
 *
 * Typical CSS: constrain scroll vs swipe (`touch-action`) on the swipe surface (often `touch-action: pan-y` for horizontal swipes).
 */
export function useSwipe(options: UseSwipeOptions): UseSwipeReturn {
  const { threshold = 40, timeoutMs = 600 } = options;
  const leftRef = useLatest(options.onSwipeLeft);
  const rightRef = useLatest(options.onSwipeRight);
  const upRef = useLatest(options.onSwipeUp);
  const downRef = useLatest(options.onSwipeDown);
  const trackRef = useRef<Track>(initialTrack());

  return useMemo(() => {
    const onPointerDown: PointerEventHandler = (event) => {
      if (event.button !== undefined && event.button !== 0) return;
      trackRef.current = {
        activePointerId: event.pointerId,
        startX: event.clientX,
        startY: event.clientY,
        startTimestamp: performance.now(),
      };
      try {
        event.currentTarget.setPointerCapture?.(event.pointerId);
      } catch {
        //
      }
    };

    const onPointerMove: PointerEventHandler = () => {
      // Moves are intentionally ignored beyond recording start; swipe is finalized on pointerup.
      // Enables future extension (progress callbacks) without breaking API.
    };

    const finalize: PointerEventHandler = (event) => {
      if (trackRef.current.activePointerId !== event.pointerId) return;
      try {
        if (event.currentTarget.hasPointerCapture?.(event.pointerId)) {
          event.currentTarget.releasePointerCapture(event.pointerId);
        }
      } catch {
        //
      }
      trackRef.current.activePointerId = null;

      const elapsed = performance.now() - trackRef.current.startTimestamp;
      if (elapsed > timeoutMs) return;

      const dx = event.clientX - trackRef.current.startX;
      const dy = event.clientY - trackRef.current.startY;
      const absX = Math.abs(dx);
      const absY = Math.abs(dy);
      const dominantHorizontal = absX >= absY;

      if (dominantHorizontal) {
        if (absX < threshold) return;
        if (dx < 0) leftRef.current?.(event);
        else rightRef.current?.(event);
      } else {
        if (absY < threshold) return;
        if (dy < 0) upRef.current?.(event);
        else downRef.current?.(event);
      }
    };

    return {
      onPointerDown,
      onPointerMove,
      onPointerUp: finalize,
      onPointerCancel: (event) => {
        if (trackRef.current.activePointerId === event.pointerId) trackRef.current = initialTrack();
        try {
          if (event.currentTarget.hasPointerCapture?.(event.pointerId)) {
            event.currentTarget.releasePointerCapture(event.pointerId);
          }
        } catch {
          //
        }
      },
    };
  }, [downRef, leftRef, rightRef, threshold, timeoutMs, upRef]);
}
