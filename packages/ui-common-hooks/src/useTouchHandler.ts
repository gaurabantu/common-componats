import { useMemo, useRef } from "react";
import type { PointerEventHandler } from "react";
import type * as ReactNs from "react";
import { useLatest } from "./useLatest";

export interface UseTouchHandlerOptions {
  /** Max movement (px) to still classify as tap vs intentional scroll/fling (`react-use`/mobile tap heuristics). @default 12 */
  maxMove?: number;
  /** Milliseconds pointer was down before classify as tap. @default 450 */
  maxDurationMs?: number;
  onTap: (event: ReactNs.PointerEvent) => void;
  /**
   * Which pointer kinds participate. Defaults to touch-first mobile ergonomics (`['touch','pen']`).
   * Include `'mouse'` to treat primary-button clicks similarly.
   * @default ['touch', 'pen']
   */
  pointerTypes?: readonly ("touch" | "mouse" | "pen")[];
}

export type UseTouchHandlerReturn = Pick<
  ReactNs.DOMAttributes<Element>,
  "onPointerDown" | "onPointerMove" | "onPointerUp" | "onPointerCancel"
>;

type Gesture = {
  activePointerId: number | null;
  startX: number;
  startY: number;
  startTs: number;
  pointerType: string;
};

/**
 * Tap vs subtle scroll jitter: activates when pointer down/move delta and duration thresholds are respected.
 *
 * Returned handlers omit `preventDefault`; pair with deliberate `touch-action` / `preventDefault()` if you disable native scrolling.
 *
 * Mirrors ideas from `react-tappable`/`react-use`/mobile menu libraries that delay recognizers slightly.
 */
export function useTouchHandler(options: UseTouchHandlerOptions): UseTouchHandlerReturn {
  const maxMove = options.maxMove ?? 12;
  const maxDurationMs = options.maxDurationMs ?? 450;
  const pointerTypes = options.pointerTypes ?? (["touch", "pen"] as const);
  const onTapRef = useLatest(options.onTap);
  const gesture = useRef<Gesture | null>(null);

  return useMemo(() => {
    const allowsPointerType = (pt: string) =>
      pointerTypes.includes(pt as (typeof pointerTypes)[number]);

    const onPointerDown: PointerEventHandler = (event) => {
      if (!allowsPointerType(event.pointerType)) return;
      if (event.pointerType === "mouse" && event.button !== 0) return;

      gesture.current = {
        activePointerId: event.pointerId,
        startX: event.clientX,
        startY: event.clientY,
        startTs: performance.now(),
        pointerType: event.pointerType,
      };
    };

    const onPointerMove: PointerEventHandler = (event) => {
      if (!gesture.current || gesture.current.activePointerId !== event.pointerId) return;
      if (!allowsPointerType(event.pointerType)) return;

      const dx = event.clientX - gesture.current.startX;
      const dy = event.clientY - gesture.current.startY;
      if (Math.hypot(dx, dy) > maxMove) gesture.current = null;
    };

    const onPointerUp: PointerEventHandler = (event) => {
      if (!gesture.current || gesture.current.activePointerId !== event.pointerId) return;
      if (!allowsPointerType(event.pointerType)) {
        gesture.current = null;
        return;
      }

      const elapsed = performance.now() - gesture.current.startTs;
      const dx = event.clientX - gesture.current.startX;
      const dy = event.clientY - gesture.current.startY;
      const distance = Math.hypot(dx, dy);

      const isTapGesture = elapsed <= maxDurationMs && distance <= maxMove;

      gesture.current = null;

      if (isTapGesture) {
        try {
          onTapRef.current(event);
        } catch {
          //
        }
      }
    };

    const onPointerCancel: PointerEventHandler = (event) => {
      if (gesture.current?.activePointerId === event.pointerId) gesture.current = null;
    };

    return {
      onPointerDown,
      onPointerMove,
      onPointerUp,
      onPointerCancel,
    };
  }, [maxDurationMs, maxMove, onTapRef, pointerTypes]);
}
