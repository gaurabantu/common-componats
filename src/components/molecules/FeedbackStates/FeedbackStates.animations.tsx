"use client";

/**
 * Pure CSS-animated SVG illustrations — zero runtime dependencies.
 * Each component accepts an optional `size` (px) and uses CSS custom property
 * colours so they automatically adapt to `[data-theme="dark"]`.
 * Decorative only (`aria-hidden="true"` default). Keyframes disabled under
 * `prefers-reduced-motion: reduce` via `.ds-feedback-illustration` in FeedbackStates.css (§18).
 */

import React from "react";

import "./FeedbackStates.css";

// ─── Shared helpers ───────────────────────────────────────────────────────────

interface IllustrationProps {
  /** Width & height in px. Default: 120 */
  size?: number;
  className?: string;
  "aria-hidden"?: boolean | "true" | "false";
}

// ─── NoDataAnimation ─────────────────────────────────────────────────────────

/**
 * Animated empty inbox / tray — floats gently and shows dotted empty lines.
 * Used as the default illustration for `EmptyState`.
 */
export function NoDataAnimation({ size = 120, className, "aria-hidden": ariaHidden = "true" }: IllustrationProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 120 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={["ds-feedback-illustration", className].filter(Boolean).join(" ")}
      aria-hidden={ariaHidden}
      style={{ overflow: "visible" }}
    >
      <style>{`
        @keyframes fb-float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-6px); }
        }
        @keyframes fb-fade-in-line {
          from { stroke-dashoffset: 30; opacity: 0; }
          to   { stroke-dashoffset: 0;  opacity: 1; }
        }
        @keyframes fb-blink-dot {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.2; }
        }
        .fb-tray-group { animation: fb-float 3s ease-in-out infinite; transform-origin: center; }
        .fb-line-1 { stroke-dasharray: 30; animation: fb-fade-in-line 0.6s 0.3s both ease-out; }
        .fb-line-2 { stroke-dasharray: 22; animation: fb-fade-in-line 0.6s 0.5s both ease-out; }
        .fb-line-3 { stroke-dasharray: 16; animation: fb-fade-in-line 0.6s 0.7s both ease-out; }
        .fb-dot-1 { animation: fb-blink-dot 1.8s 0s infinite; }
        .fb-dot-2 { animation: fb-blink-dot 1.8s 0.3s infinite; }
        .fb-dot-3 { animation: fb-blink-dot 1.8s 0.6s infinite; }
      `}</style>

      {/* Shadow */}
      <ellipse cx="60" cy="108" rx="28" ry="5" fill="currentColor" opacity="0.08" />

      <g className="fb-tray-group">
        {/* Tray body */}
        <rect x="18" y="50" width="84" height="48" rx="10" fill="var(--color-fill-muted)" stroke="var(--color-border-subtle)" strokeWidth="2.5" />
        {/* Tray top lip */}
        <path d="M18 72 Q18 50 60 50 Q102 50 102 72" stroke="var(--color-border-subtle)" strokeWidth="2.5" fill="none" />
        {/* Inbox arrow down (empty) */}
        <path d="M60 34 L60 56M53 49 L60 56 L67 49" stroke="var(--color-text-secondary)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />

        {/* Dotted lines inside tray (representing empty rows) */}
        <line x1="32" y1="78" x2="62" y2="78" className="fb-line-1" stroke="var(--color-border-subtle)" strokeWidth="2.5" strokeLinecap="round" />
        <line x1="32" y1="86" x2="54" y2="86" className="fb-line-2" stroke="var(--color-border-subtle)" strokeWidth="2.5" strokeLinecap="round" />
        <line x1="32" y1="94" x2="48" y2="94" className="fb-line-3" stroke="var(--color-border-subtle)" strokeWidth="2.5" strokeLinecap="round" />

        {/* Blinking dots (top right) */}
        <circle cx="82" cy="78" r="3" fill="var(--color-border-subtle)" className="fb-dot-1" />
        <circle cx="91" cy="78" r="3" fill="var(--color-border-subtle)" className="fb-dot-2" />
        <circle cx="100" cy="78" r="3" fill="var(--color-border-subtle)" className="fb-dot-3" />
      </g>
    </svg>
  );
}

// ─── NoSearchResultsAnimation ─────────────────────────────────────────────────

/** Animated magnifier with a ✕ — for "no results found" empty states. */
export function NoSearchResultsAnimation({ size = 120, className, "aria-hidden": ariaHidden = "true" }: IllustrationProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 120 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={["ds-feedback-illustration", className].filter(Boolean).join(" ")}
      aria-hidden={ariaHidden}
      style={{ overflow: "visible" }}
    >
      <style>{`
        @keyframes fb-search-rock {
          0%, 100% { transform: rotate(-6deg); }
          50% { transform: rotate(6deg); }
        }
        @keyframes fb-x-pop {
          0% { transform: scale(0); opacity: 0; }
          60% { transform: scale(1.25); opacity: 1; }
          100% { transform: scale(1); opacity: 1; }
        }
        .fb-lens { animation: fb-search-rock 2.4s ease-in-out infinite; transform-origin: 52px 52px; }
        .fb-x-mark { animation: fb-x-pop 0.45s 0.2s both cubic-bezier(.34,1.56,.64,1); transform-origin: 52px 52px; }
      `}</style>

      <ellipse cx="60" cy="110" rx="24" ry="4" fill="currentColor" opacity="0.07" />

      <g className="fb-lens">
        <circle cx="52" cy="52" r="26" fill="var(--color-fill-muted)" stroke="var(--color-border-subtle)" strokeWidth="3" />
        <line x1="70" y1="70" x2="94" y2="94" stroke="var(--color-border-subtle)" strokeWidth="5" strokeLinecap="round" />
        <g className="fb-x-mark">
          <line x1="43" y1="43" x2="61" y2="61" stroke="var(--color-danger-strong)" strokeWidth="3" strokeLinecap="round" />
          <line x1="61" y1="43" x2="43" y2="61" stroke="var(--color-danger-strong)" strokeWidth="3" strokeLinecap="round" />
        </g>
      </g>
    </svg>
  );
}

// ─── ErrorAnimation ───────────────────────────────────────────────────────────

/** Animated error shield — pulses to draw attention. */
export function ErrorAnimation({ size = 120, className, "aria-hidden": ariaHidden = "true" }: IllustrationProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 120 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={["ds-feedback-illustration", className].filter(Boolean).join(" ")}
      aria-hidden={ariaHidden}
      style={{ overflow: "visible" }}
    >
      <style>{`
        @keyframes fb-shield-pulse {
          0%, 100% { transform: scale(1); }
          45% { transform: scale(1.06); }
          55% { transform: scale(1.06); }
        }
        @keyframes fb-ring-expand {
          0%   { r: 38; opacity: 0.4; }
          100% { r: 54; opacity: 0; }
        }
        .fb-shield-g { animation: fb-shield-pulse 2.2s ease-in-out infinite; transform-origin: 60px 58px; }
        .fb-ring-anim { animation: fb-ring-expand 2.2s ease-out infinite; }
      `}</style>

      {/* Pulse ring */}
      <circle cx="60" cy="58" r="38" className="fb-ring-anim"
        fill="none" stroke="var(--color-danger-strong)" strokeWidth="2" />

      <g className="fb-shield-g">
        {/* Shield */}
        <path d="M60 18 L92 32 L92 62 Q92 84 60 100 Q28 84 28 62 L28 32 Z"
          fill="var(--color-danger-fill)" stroke="var(--color-danger-strong)" strokeWidth="2.5" strokeLinejoin="round" />
        {/* Exclamation */}
        <line x1="60" y1="44" x2="60" y2="65" stroke="var(--color-danger-strong)" strokeWidth="4" strokeLinecap="round" />
        <circle cx="60" cy="75" r="3" fill="var(--color-danger-strong)" />
      </g>
    </svg>
  );
}

// ─── OfflineAnimation ─────────────────────────────────────────────────────────

/**
 * Animated no-wifi / disconnected illustration.
 * Wifi arcs fade out one-by-one to suggest lost connection.
 */
export function OfflineAnimation({ size = 120, className, "aria-hidden": ariaHidden = "true" }: IllustrationProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 120 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={["ds-feedback-illustration", className].filter(Boolean).join(" ")}
      aria-hidden={ariaHidden}
      style={{ overflow: "visible" }}
    >
      <style>{`
        @keyframes fb-arc-fade {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.1; }
        }
        @keyframes fb-slash-draw {
          from { stroke-dashoffset: 90; }
          to   { stroke-dashoffset: 0; }
        }
        @keyframes fb-dot-bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-4px); }
        }
        .fb-arc-3 { animation: fb-arc-fade 2s 0.0s ease-in-out infinite; }
        .fb-arc-2 { animation: fb-arc-fade 2s 0.25s ease-in-out infinite; }
        .fb-arc-1 { animation: fb-arc-fade 2s 0.5s ease-in-out infinite; }
        .fb-slash { stroke-dasharray: 90; animation: fb-slash-draw 0.5s 0.1s both ease-out; }
        .fb-wifi-dot { animation: fb-dot-bounce 1.6s ease-in-out infinite; transform-origin: 60px 92px; }
      `}</style>

      {/* Outer arc */}
      <path className="fb-arc-3"
        d="M22 58 Q22 26 60 26 Q98 26 98 58"
        stroke="var(--color-border-subtle)" strokeWidth="5" strokeLinecap="round" fill="none" />
      {/* Mid arc */}
      <path className="fb-arc-2"
        d="M35 70 Q35 46 60 46 Q85 46 85 70"
        stroke="var(--color-border-subtle)" strokeWidth="5" strokeLinecap="round" fill="none" />
      {/* Inner arc */}
      <path className="fb-arc-1"
        d="M48 82 Q48 66 60 66 Q72 66 72 82"
        stroke="var(--color-border-subtle)" strokeWidth="5" strokeLinecap="round" fill="none" />
      {/* Dot */}
      <circle className="fb-wifi-dot" cx="60" cy="92" r="4.5" fill="var(--color-border-subtle)" />

      {/* Red diagonal slash */}
      <line className="fb-slash"
        x1="24" y1="96" x2="96" y2="24"
        stroke="var(--color-danger-strong)" strokeWidth="4" strokeLinecap="round" />
    </svg>
  );
}

// ─── SuccessAnimation ─────────────────────────────────────────────────────────

/** Animated checkmark in a circle — for success / confirmed states. */
export function SuccessAnimation({ size = 120, className, "aria-hidden": ariaHidden = "true" }: IllustrationProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 120 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={["ds-feedback-illustration", className].filter(Boolean).join(" ")}
      aria-hidden={ariaHidden}
      style={{ overflow: "visible" }}
    >
      <style>{`
        @keyframes fb-circle-draw {
          from { stroke-dashoffset: 220; }
          to   { stroke-dashoffset: 0; }
        }
        @keyframes fb-check-draw {
          from { stroke-dashoffset: 60; }
          to   { stroke-dashoffset: 0; }
        }
        @keyframes fb-success-pop {
          0%   { transform: scale(0.85); }
          60%  { transform: scale(1.06); }
          100% { transform: scale(1); }
        }
        .fb-success-g { animation: fb-success-pop 0.5s 0.1s both cubic-bezier(.34,1.56,.64,1); transform-origin: 60px 60px; }
        .fb-circle-draw { stroke-dasharray: 220; animation: fb-circle-draw 0.55s 0s both ease-out; }
        .fb-check-draw  { stroke-dasharray: 60;  animation: fb-check-draw  0.4s 0.4s both ease-out; }
      `}</style>

      <g className="fb-success-g">
        <circle cx="60" cy="60" r="34" fill="var(--color-success-fill)" />
        <circle cx="60" cy="60" r="34" className="fb-circle-draw"
          stroke="var(--color-success-strong)" strokeWidth="3" fill="none" />
        <path d="M42 60 l14 14 l22-22" className="fb-check-draw"
          stroke="var(--color-success-strong)" strokeWidth="4.5" strokeLinecap="round" strokeLinejoin="round" />
      </g>
    </svg>
  );
}

// ─── InfoAnimation ────────────────────────────────────────────────────────────

/** Animated info circle — subtle pulse for informational notices. */
export function InfoAnimation({ size = 120, className, "aria-hidden": ariaHidden = "true" }: IllustrationProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 120 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={["ds-feedback-illustration", className].filter(Boolean).join(" ")}
      aria-hidden={ariaHidden}
      style={{ overflow: "visible" }}
    >
      <style>{`
        @keyframes fb-info-pulse {
          0%, 100% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.04); opacity: 0.85; }
        }
        @keyframes fb-i-dot {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-3px); }
        }
        .fb-info-g { animation: fb-info-pulse 2.5s ease-in-out infinite; transform-origin: 60px 60px; }
        .fb-i-dot   { animation: fb-i-dot 2.5s ease-in-out infinite; transform-origin: 60px 40px; }
      `}</style>

      <g className="fb-info-g">
        <circle cx="60" cy="60" r="34" fill="var(--color-info-fill)" stroke="var(--color-info-strong)" strokeWidth="2.5" />
        {/* i stem */}
        <line x1="60" y1="54" x2="60" y2="76"
          stroke="var(--color-info-strong)" strokeWidth="5" strokeLinecap="round" />
        {/* i dot */}
        <circle cx="60" cy="43" r="3.5" fill="var(--color-info-strong)" className="fb-i-dot" />
      </g>
    </svg>
  );
}

// ─── Convenience map ──────────────────────────────────────────────────────────

export const FEEDBACK_ANIMATIONS = {
  empty: NoDataAnimation,
  "no-search": NoSearchResultsAnimation,
  error: ErrorAnimation,
  offline: OfflineAnimation,
  success: SuccessAnimation,
  info: InfoAnimation,
} as const;

export type FeedbackAnimationName = keyof typeof FEEDBACK_ANIMATIONS;
