"use client";

import { useEffect, useState } from "react";
import type { ChartAnimationOption, ChartAnimationConfig, ChartEasingPreset } from "./Chart.types";

/** Durations feel good for data reveal; still respect `prefers-reduced-motion` */
const DEFAULT_MS_LINE = 800;
const DEFAULT_MS_BAR = 650;
const DEFAULT_MS_PIE = 750;

export type ChartAnimationKind = "line" | "area" | "bar" | "pie";

export function resolveChartAnimation(
  option: ChartAnimationOption | undefined,
  kind: ChartAnimationKind
): { enabled: boolean; durationMs: number; easing: ChartEasingPreset; barStagger: boolean } {
  const base =
    kind === "bar" ? DEFAULT_MS_BAR : kind === "pie" ? DEFAULT_MS_PIE : DEFAULT_MS_LINE;

  if (option === false) {
    return { enabled: false, durationMs: base, easing: "ease-out", barStagger: false };
  }
  if (option === true || option === undefined) {
    return { enabled: true, durationMs: base, easing: "ease-out", barStagger: false };
  }

  const obj = option as ChartAnimationConfig;
  return {
    enabled: obj.enabled !== false,
    durationMs: obj.durationMs ?? base,
    easing: obj.easing ?? "ease-out",
    barStagger: obj.barStagger === true,
  };
}

export function chartEase(t: number, preset: ChartEasingPreset): number {
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

export function usePrefersReducedMotion(): boolean {
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

export function useChartAnimationProgress(
  enabled: boolean,
  durationMs: number,
  easing: ChartEasingPreset,
  resetKey: string
): number {
  const reduced = usePrefersReducedMotion();
  const [progress, setProgress] = useState(() => (!enabled || reduced ? 1 : 0));

  useEffect(() => {
    if (!enabled || reduced) {
      setProgress(1);
      return;
    }
    setProgress(0);
    const start = performance.now();
    let raf = 0;
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / Math.max(16, durationMs));
      setProgress(chartEase(t, easing));
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [enabled, reduced, durationMs, easing, resetKey]);

  return reduced ? 1 : progress;
}

export function barProgressForIndex(global: number, index: number, total: number, stagger: boolean): number {
  if (!stagger || total <= 1) return global;
  const w = 0.55;
  const start = total > 1 ? (index / (total - 1)) * w : 0;
  if (global <= start) return 0;
  return Math.min(1, (global - start) / (1 - start));
}
