// src/components/charts/chartPrimitives.tsx
import { useLayoutEffect, useRef, useState } from "react";
import { jsx } from "react/jsx-runtime";
function AnimatedLineStroke({
  pathD,
  progress,
  color,
  strokeWidth
}) {
  const ref = useRef(null);
  const [length, setLength] = useState(0);
  useLayoutEffect(() => {
    const el = ref.current;
    if (!el || !pathD) {
      setLength(0);
      return;
    }
    try {
      setLength(el.getTotalLength());
    } catch (e) {
      setLength(0);
    }
  }, [pathD]);
  const len = length || 1;
  const offset = len * (1 - progress);
  return /* @__PURE__ */ jsx(
    "path",
    {
      ref,
      d: pathD,
      fill: "none",
      stroke: color,
      strokeWidth,
      strokeLinecap: "round",
      strokeLinejoin: "round",
      strokeDasharray: len,
      strokeDashoffset: offset
    }
  );
}

export {
  AnimatedLineStroke
};
//# sourceMappingURL=chunk-XFSVRNJR.mjs.map