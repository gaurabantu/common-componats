// src/components/charts/useChartAnimation.ts
import { useEffect, useState } from "react";
var DEFAULT_MS_LINE = 800;
var DEFAULT_MS_BAR = 650;
var DEFAULT_MS_PIE = 750;
function resolveChartAnimation(option, kind) {
  var _a, _b;
  const base = kind === "bar" ? DEFAULT_MS_BAR : kind === "pie" ? DEFAULT_MS_PIE : DEFAULT_MS_LINE;
  if (option === false) {
    return { enabled: false, durationMs: base, easing: "ease-out", barStagger: false };
  }
  if (option === true || option === void 0) {
    return { enabled: true, durationMs: base, easing: "ease-out", barStagger: false };
  }
  const obj = option;
  return {
    enabled: obj.enabled !== false,
    durationMs: (_a = obj.durationMs) != null ? _a : base,
    easing: (_b = obj.easing) != null ? _b : "ease-out",
    barStagger: obj.barStagger === true
  };
}
function chartEase(t, preset) {
  const x = Math.min(1, Math.max(0, t));
  switch (preset) {
    case "linear":
      return x;
    case "ease-in":
      return x * x * x;
    case "ease-out":
      return 1 - (1 - x) ** 3;
    case "ease-in-out":
      return x < 0.5 ? 4 * x * x * x : 1 - (-2 * x + 2) ** 3 / 2;
    case "default":
    default:
      return 1 - (1 - x) ** 3;
  }
}
function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const fn = () => setReduced(mq.matches);
    mq.addEventListener("change", fn);
    return () => mq.removeEventListener("change", fn);
  }, []);
  return reduced;
}
function useChartAnimationProgress(enabled, durationMs, easing, resetKey) {
  const reduced = usePrefersReducedMotion();
  const [progress, setProgress] = useState(() => !enabled || reduced ? 1 : 0);
  useEffect(() => {
    if (!enabled || reduced) {
      setProgress(1);
      return;
    }
    setProgress(0);
    const start = performance.now();
    let raf = 0;
    const tick = (now) => {
      const t = Math.min(1, (now - start) / Math.max(16, durationMs));
      setProgress(chartEase(t, easing));
      if (t < 1)
        raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [enabled, reduced, durationMs, easing, resetKey]);
  return reduced ? 1 : progress;
}
function barProgressForIndex(global, index, total, stagger) {
  if (!stagger || total <= 1)
    return global;
  const w = 0.55;
  const start = total > 1 ? index / (total - 1) * w : 0;
  if (global <= start)
    return 0;
  return Math.min(1, (global - start) / (1 - start));
}

export {
  resolveChartAnimation,
  useChartAnimationProgress,
  barProgressForIndex
};
//# sourceMappingURL=chunk-3R3T3GO2.mjs.map