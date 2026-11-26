/**
 * Portal motion helpers (Storybook only — never imported by the library entries).
 *
 * - GSAP drives the count-ups, the hero intro and scroll-triggered section reveals.
 * - Framer Motion drives the Components gallery (see ComponentsGallery.tsx).
 *
 * Rules (brief 10, Slice O):
 * - `prefers-reduced-motion: reduce` disables everything — the final state is what renders first,
 *   animations only ever start *from* a transient state and are reverted on unmount.
 * - Transforms / opacity only (no layout shift); every tween ≤ 0.6s; nothing blocks pointer input.
 */
import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const useIsoLayoutEffect = typeof window === "undefined" ? useEffect : useLayoutEffect;

let registered = false;
function ensureGsap(): void {
  if (registered || typeof window === "undefined") return;
  gsap.registerPlugin(ScrollTrigger);
  registered = true;
}

/** Media query that allows motion. `gsap.matchMedia()` reverts the animation when it stops matching. */
export const MOTION_OK = "(prefers-reduced-motion: no-preference)";

/** Longest tween the portal uses (seconds). Tests assert nothing exceeds it. */
export const MAX_DURATION = 0.6;

function canAnimate(): boolean {
  return typeof window !== "undefined" && typeof window.matchMedia === "function" && window.matchMedia(MOTION_OK).matches;
}

/** Live `prefers-reduced-motion: reduce` (true when matchMedia is unavailable — render final state). */
export function useReducedMotionPreference(): boolean {
  const [reduced, setReduced] = useState(() => !canAnimate());
  useEffect(() => {
    if (typeof window === "undefined" || typeof window.matchMedia !== "function") return;
    const mq = window.matchMedia(MOTION_OK);
    const update = () => setReduced(!mq.matches);
    update();
    mq.addEventListener?.("change", update);
    return () => mq.removeEventListener?.("change", update);
  }, []);
  return reduced;
}

/**
 * Runs `setup` inside `gsap.matchMedia()` for MOTION_OK, scoped to `ref` (selector strings resolve
 * inside it). Everything is reverted on unmount or when the user switches to reduced motion.
 */
export function useGsapMotion(
  ref: React.RefObject<HTMLElement | null>,
  setup: (el: HTMLElement) => void | (() => void),
  deps: unknown[] = [],
): void {
  useIsoLayoutEffect(() => {
    const el = ref.current;
    if (!el || typeof window === "undefined" || typeof window.matchMedia !== "function") return;
    ensureGsap();
    const mm = gsap.matchMedia(el);
    mm.add(MOTION_OK, () => setup(el));
    return () => mm.revert();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}

/* ------------------------------------------------------------------ */
/* Count-up                                                            */
/* ------------------------------------------------------------------ */

export interface CountUpProps {
  value: number;
  /** Formats the displayed number (default: locale grouping). */
  format?: (n: number) => string;
  /** Seconds (clamped to MAX_DURATION). */
  duration?: number;
}

const defaultFormat = (n: number) => Math.round(n).toLocaleString("en-US");

/**
 * Number that counts up from 0 when it scrolls into view. Screen readers always get the final
 * value (the animated digits are `aria-hidden`); the box reserves the final width (`ch` +
 * tabular figures) so the count never shifts layout.
 */
export function CountUp({ value, format = defaultFormat, duration = MAX_DURATION }: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const finalText = format(value);
  useGsapMotion(
    ref,
    (el) => {
      const digits = el.querySelector<HTMLElement>("[data-countup-digits]");
      if (!digits) return;
      const state = { n: 0 };
      digits.textContent = format(0);
      gsap.to(state, {
        n: value,
        duration: Math.min(duration, MAX_DURATION),
        ease: "power2.out",
        scrollTrigger: { trigger: el, start: "top 95%", once: true },
        onUpdate: () => {
          digits.textContent = format(state.n);
        },
        onComplete: () => {
          digits.textContent = finalText;
        },
      });
      // Reverted (unmount / switch to reduced motion): always leave the final value behind.
      return () => {
        digits.textContent = finalText;
      };
    },
    [value, finalText],
  );
  return (
    <span ref={ref} className="pt-countup" style={{ minWidth: `${finalText.length}ch` }}>
      {/* keyed: GSAP writes textContent, so a new value gets a fresh node instead of a stale one */}
      <span key={finalText} data-countup-digits aria-hidden="true">
        {finalText}
      </span>
      <span className="pt-sr-only">{finalText}</span>
    </span>
  );
}

/* ------------------------------------------------------------------ */
/* Reveal                                                              */
/* ------------------------------------------------------------------ */

export interface RevealProps extends React.HTMLAttributes<HTMLElement> {
  as?: "div" | "section" | "aside" | "ul" | "ol";
  /** Animate `[data-reveal-item]` descendants with a stagger instead of the whole block. */
  stagger?: boolean;
  children: React.ReactNode;
}

/**
 * Fades + lifts a block (or its `[data-reveal-item]` children) the first time it enters the
 * viewport. Content is in the DOM and focusable from the start; reduced motion renders it as is.
 */
export function Reveal({ as = "div", stagger = false, children, ...rest }: RevealProps) {
  const ref = useRef<HTMLElement>(null);
  useGsapMotion(
    ref,
    (el) => {
      const targets = stagger ? el.querySelectorAll<HTMLElement>("[data-reveal-item]") : [el];
      if (!targets.length) return;
      gsap.from(targets, {
        opacity: 0,
        y: 16,
        duration: 0.5,
        ease: "power2.out",
        stagger: stagger ? 0.05 : 0,
        clearProps: "opacity,transform",
        scrollTrigger: { trigger: el, start: "top 92%", once: true },
      });
    },
    [stagger],
  );
  const Tag = as as React.ElementType;
  return (
    <Tag ref={ref} {...rest}>
      {children}
    </Tag>
  );
}

/* ------------------------------------------------------------------ */
/* Hero intro                                                          */
/* ------------------------------------------------------------------ */

/** Staggered entrance for `[data-hero-item]` descendants of `ref` (total ≤ 0.6s). */
export function useHeroIntro(ref: React.RefObject<HTMLElement | null>): void {
  useGsapMotion(ref, (el) => {
    const items = el.querySelectorAll<HTMLElement>("[data-hero-item]");
    if (!items.length) return;
    const stagger = Math.min(0.05, (MAX_DURATION - 0.35) / Math.max(1, items.length - 1));
    gsap.from(items, {
      opacity: 0,
      y: 14,
      duration: 0.35,
      ease: "power2.out",
      stagger,
      clearProps: "opacity,transform",
    });
  });
}

/* ------------------------------------------------------------------ */
/* In-view (charts replay their own entrance animation once visible)   */
/* ------------------------------------------------------------------ */

/** `true` once `ref` has intersected the viewport (immediately when IntersectionObserver is missing). */
export function useInViewOnce(ref: React.RefObject<HTMLElement | null>, rootMargin = "0px 0px -10% 0px"): boolean {
  const [seen, setSeen] = useState(() => typeof window === "undefined" || typeof IntersectionObserver === "undefined");
  useEffect(() => {
    if (seen) return;
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setSeen(true);
          io.disconnect();
        }
      },
      { rootMargin },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [ref, rootMargin, seen]);
  return seen;
}

/** Content-box width of `ref`, updated on resize (charts get a numeric width → crisp text). */
export function useElementWidth(ref: React.RefObject<HTMLElement | null>, fallback = 480): number {
  const [width, setWidth] = useState(fallback);
  useIsoLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    const read = () => {
      const w = Math.floor(el.getBoundingClientRect().width);
      if (w > 0) setWidth(w);
    };
    read();
    if (typeof ResizeObserver === "undefined") return;
    const ro = new ResizeObserver(read);
    ro.observe(el);
    return () => ro.disconnect();
  }, [ref]);
  return width;
}
