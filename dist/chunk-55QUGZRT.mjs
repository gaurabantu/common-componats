// src/components/common/useRipple.tsx
import { useCallback, useEffect, useRef, useState } from "react";
import { jsx } from "react/jsx-runtime";
function useRipple(enabled) {
  const [bursts, setBursts] = useState([]);
  const seq = useRef(0);
  const timersRef = useRef([]);
  useEffect(() => {
    const timers = timersRef.current;
    return () => timers.forEach(clearTimeout);
  }, []);
  const onPointerDown = useCallback(
    (e) => {
      if (!enabled)
        return;
      if (e.button !== 0)
        return;
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
    [enabled]
  );
  const RippleOverlay = bursts.length === 0 ? null : /* @__PURE__ */ jsx("span", { className: "ucs-ripple-layer", "aria-hidden": "true", children: bursts.map((b) => /* @__PURE__ */ jsx("span", { className: "ucs-ripple-wave", style: { left: b.x, top: b.y } }, b.id)) });
  return { onPointerDown, RippleOverlay };
}

export {
  useRipple
};
//# sourceMappingURL=chunk-55QUGZRT.mjs.map