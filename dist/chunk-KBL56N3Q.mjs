/* ucs:component-css */
import "./styles/components/molecules/DataTable/DataTable.css";
import "./styles/components/molecules/FeedbackStates/FeedbackStates.css";
import {
  FilterBar_default,
  hasActiveFilterValue,
  toValueList
} from "./chunk-2UEEGNXO.mjs";
import {
  Pagination_default
} from "./chunk-DLON4M3W.mjs";
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from "./chunk-UP5YH5MZ.mjs";
import {
  Table_default
} from "./chunk-IFBDQMRQ.mjs";
import {
  TextView_default
} from "./chunk-QLCAIULL.mjs";
import {
  Checkbox_default
} from "./chunk-3P5PIN4K.mjs";
import {
  Button_default
} from "./chunk-XIOFTDBU.mjs";

// src/components/molecules/DataTable/index.tsx
import React3, { useCallback, useEffect, useId as useId3, useLayoutEffect, useMemo, useRef, useState } from "react";

// src/components/molecules/FeedbackStates/EmptyState.tsx
import { useId } from "react";

// src/components/molecules/FeedbackStates/feedbackState.classes.ts
function feedbackCls(...chunks) {
  return chunks.filter(Boolean).join(" ");
}

// src/components/molecules/FeedbackStates/EmptyState.tsx
import { jsx, jsxs } from "react/jsx-runtime";
function EmptyState({
  title,
  description,
  icon,
  iconLabel,
  image,
  action,
  extra,
  className,
  role = "status",
  compact = false,
  size = "md",
  align = "center",
  tone = "neutral",
  "aria-live": ariaLive = "polite",
  "data-testid": testId
}) {
  const titleId = useId();
  const descId = useId();
  return /* @__PURE__ */ jsxs(
    "section",
    {
      className: feedbackCls(
        "ds-feedback-shell",
        `ds-feedback-shell--${size}`,
        compact && "ds-feedback-shell--compact",
        align === "start" && "ds-feedback-shell--align-start",
        tone !== "neutral" && `ds-feedback-shell--tone-${tone}`,
        className
      ),
      role,
      "aria-live": ariaLive,
      "aria-labelledby": titleId,
      "aria-describedby": description ? descId : void 0,
      "data-testid": testId != null ? testId : "feedback-empty-state",
      children: [
        image ? /* @__PURE__ */ jsx("div", { className: "ds-feedback-image", children: image }) : null,
        icon ? /* @__PURE__ */ jsx(
          "span",
          {
            className: "ds-feedback-icon",
            "aria-hidden": iconLabel ? void 0 : "true",
            "aria-label": iconLabel,
            role: iconLabel ? "img" : void 0,
            children: icon
          }
        ) : null,
        /* @__PURE__ */ jsx(TextView_default, { as: "h3", variant: "h4", id: titleId, children: title }),
        description ? /* @__PURE__ */ jsx(TextView_default, { as: "p", variant: "body", color: "secondary", id: descId, children: description }) : null,
        action ? /* @__PURE__ */ jsx("div", { className: "ds-feedback-actions", children: action }) : null,
        extra ? /* @__PURE__ */ jsx("div", { className: "ds-feedback-extra", children: extra }) : null
      ]
    }
  );
}

// src/components/molecules/FeedbackStates/ErrorState.tsx
import { useId as useId2 } from "react";
import { jsx as jsx2, jsxs as jsxs2 } from "react/jsx-runtime";
function DefaultErrorIcon({ tone }) {
  if (tone === "warning") {
    return /* @__PURE__ */ jsxs2("svg", { "aria-hidden": "true", width: "24", height: "24", viewBox: "0 0 24 24", fill: "none", className: "ds-feedback-status-icon", children: [
      /* @__PURE__ */ jsx2("path", { d: "M12 2L2 20h20L12 2z", stroke: "currentColor", strokeWidth: "1.75", strokeLinejoin: "round" }),
      /* @__PURE__ */ jsx2("path", { d: "M12 9v5M12 16.5v.5", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round" })
    ] });
  }
  if (tone === "info") {
    return /* @__PURE__ */ jsxs2("svg", { "aria-hidden": "true", width: "24", height: "24", viewBox: "0 0 24 24", fill: "none", className: "ds-feedback-status-icon", children: [
      /* @__PURE__ */ jsx2("circle", { cx: "12", cy: "12", r: "9", stroke: "currentColor", strokeWidth: "1.75" }),
      /* @__PURE__ */ jsx2("path", { d: "M12 8v.5M12 11v5", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round" })
    ] });
  }
  if (tone === "success") {
    return /* @__PURE__ */ jsxs2("svg", { "aria-hidden": "true", width: "24", height: "24", viewBox: "0 0 24 24", fill: "none", className: "ds-feedback-status-icon", children: [
      /* @__PURE__ */ jsx2("circle", { cx: "12", cy: "12", r: "9", stroke: "currentColor", strokeWidth: "1.75" }),
      /* @__PURE__ */ jsx2("path", { d: "M8 12l3 3 5-5", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round" })
    ] });
  }
  return /* @__PURE__ */ jsxs2("svg", { "aria-hidden": "true", width: "24", height: "24", viewBox: "0 0 24 24", fill: "none", className: "ds-feedback-status-icon", children: [
    /* @__PURE__ */ jsx2("circle", { cx: "12", cy: "12", r: "9", stroke: "currentColor", strokeWidth: "1.75" }),
    /* @__PURE__ */ jsx2("path", { d: "M12 8v5M12 15.5v.5", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round" })
  ] });
}
function toneClass(tone) {
  if (tone === "neutral")
    return "ds-feedback-shell--tone-neutral";
  if (tone === "info")
    return "ds-feedback-shell--tone-info";
  if (tone === "success")
    return "ds-feedback-shell--tone-success";
  if (tone === "warning")
    return "ds-feedback-shell--tone-warning";
  if (tone === "danger")
    return "ds-feedback-shell--danger";
  return false;
}
function ErrorState({
  title = "Something went wrong",
  description = "Please try again later. If the problem continues, contact support.",
  image,
  icon,
  hideIcon = false,
  details,
  retryLabel = "Try again",
  onRetry,
  extra,
  className,
  tone = "danger",
  compact = false,
  size = "md",
  align = "center",
  "aria-live": ariaLive,
  role,
  "data-testid": testId
}) {
  const resolvedRole = role != null ? role : details || onRetry ? "alert" : "status";
  const resolvedAriaLive = ariaLive != null ? ariaLive : resolvedRole === "alert" ? "assertive" : "polite";
  const titleId = useId2();
  const descId = useId2();
  const detailBody = details == null ? null : typeof details === "string" || typeof details === "number" || typeof details === "boolean" ? /* @__PURE__ */ jsx2("pre", { className: "ds-feedback-detail", children: String(details) }) : details instanceof Error ? /* @__PURE__ */ jsx2("pre", { className: "ds-feedback-detail", children: details.message }) : /* @__PURE__ */ jsx2("div", { className: "ds-feedback-detail", children: details });
  const resolvedIcon = !hideIcon ? icon != null ? icon : /* @__PURE__ */ jsx2(DefaultErrorIcon, { tone }) : null;
  return /* @__PURE__ */ jsxs2(
    "section",
    {
      className: feedbackCls(
        "ds-feedback-shell",
        `ds-feedback-shell--${size}`,
        compact && "ds-feedback-shell--compact",
        align === "start" && "ds-feedback-shell--align-start",
        toneClass(tone),
        className
      ),
      role: resolvedRole,
      "aria-live": resolvedAriaLive,
      "aria-labelledby": titleId,
      "aria-describedby": description ? descId : void 0,
      "data-testid": testId != null ? testId : "feedback-error-state",
      children: [
        image ? /* @__PURE__ */ jsx2("div", { className: "ds-feedback-image", children: image }) : null,
        resolvedIcon ? /* @__PURE__ */ jsx2("span", { className: "ds-feedback-icon ds-feedback-icon--status", children: resolvedIcon }) : null,
        /* @__PURE__ */ jsx2(TextView_default, { as: "h3", variant: "h4", id: titleId, children: title }),
        /* @__PURE__ */ jsx2(TextView_default, { as: "p", variant: "body", color: "secondary", id: descId, children: description }),
        detailBody,
        onRetry ? /* @__PURE__ */ jsx2("div", { className: "ds-feedback-actions", children: /* @__PURE__ */ jsx2(Button_default, { variant: "outlinePrimary", type: "button", onClick: () => onRetry(), size: compact ? "sm" : "md", children: retryLabel }) }) : null,
        extra ? /* @__PURE__ */ jsx2("div", { className: "ds-feedback-extra", children: extra }) : null
      ]
    }
  );
}

// src/components/molecules/FeedbackStates/OfflineBanner.tsx
import { jsx as jsx3, jsxs as jsxs3 } from "react/jsx-runtime";
var DefaultOfflineIcon = () => /* @__PURE__ */ jsx3(
  "svg",
  {
    "aria-hidden": "true",
    width: "20",
    height: "20",
    viewBox: "0 0 24 24",
    fill: "none",
    className: "ds-offline-banner__icon",
    children: /* @__PURE__ */ jsx3(
      "path",
      {
        d: "M1 1l22 22M9.9 4.24A10 10 0 0119.07 8.77M5 5a10 10 0 00-.29 14.71M10.73 10.73A5 5 0 0114.35 13M7.05 7.05A5 5 0 005 11.37M12 20h.01",
        stroke: "currentColor",
        strokeWidth: "2",
        strokeLinecap: "round",
        strokeLinejoin: "round"
      }
    )
  }
);
function bannerToneClass(tone) {
  return tone === "neutral" ? "ds-offline-banner--neutral" : "ds-offline-banner--warning";
}
function OfflineBanner({
  headline = "No internet connection.",
  message = "Check your connection and try again.",
  leadingIcon,
  image,
  actionLabel = "Retry",
  onRetry,
  onDismiss,
  dismissLabel = "Dismiss",
  className,
  sticky,
  tone = "warning",
  compact = false,
  role = "status"
}) {
  const showLeadingIcon = leadingIcon !== void 0 ? leadingIcon : /* @__PURE__ */ jsx3(DefaultOfflineIcon, {});
  if (image) {
    return /* @__PURE__ */ jsxs3(
      "section",
      {
        className: feedbackCls(
          "ds-feedback-shell",
          "ds-feedback-shell--md",
          compact && "ds-feedback-shell--compact",
          tone === "warning" ? "ds-feedback-shell--tone-warning" : "ds-feedback-shell--tone-neutral",
          className
        ),
        role,
        "aria-live": "polite",
        "aria-atomic": "true",
        "data-testid": "feedback-offline-banner",
        children: [
          /* @__PURE__ */ jsx3("div", { className: "ds-feedback-image", children: image }),
          /* @__PURE__ */ jsx3(TextView_default, { as: "p", variant: "body", children: /* @__PURE__ */ jsx3("strong", { children: headline }) }),
          message ? /* @__PURE__ */ jsx3(TextView_default, { as: "p", variant: "small", color: "secondary", children: message }) : null,
          onRetry || onDismiss ? /* @__PURE__ */ jsxs3("div", { className: "ds-feedback-actions", children: [
            onRetry ? /* @__PURE__ */ jsx3(Button_default, { variant: "outlinePrimary", type: "button", size: "md", onClick: () => onRetry == null ? void 0 : onRetry(), children: actionLabel }) : null,
            onDismiss ? /* @__PURE__ */ jsx3(Button_default, { variant: "ghost", type: "button", size: "md", onClick: () => onDismiss == null ? void 0 : onDismiss(), children: dismissLabel }) : null
          ] }) : null
        ]
      }
    );
  }
  return /* @__PURE__ */ jsxs3(
    "aside",
    {
      className: feedbackCls(
        "ds-offline-banner",
        bannerToneClass(tone),
        compact && "ds-offline-banner--compact",
        sticky && "ds-offline-banner--sticky",
        className
      ),
      role,
      "aria-live": "polite",
      "aria-atomic": "true",
      "data-testid": "feedback-offline-banner",
      children: [
        showLeadingIcon ? /* @__PURE__ */ jsx3("span", { className: "ds-offline-banner__icon-wrap", children: showLeadingIcon }) : null,
        /* @__PURE__ */ jsxs3("div", { className: "ds-offline-banner__body", children: [
          /* @__PURE__ */ jsx3(TextView_default, { as: "p", variant: "body", children: /* @__PURE__ */ jsx3("strong", { children: headline }) }),
          message ? /* @__PURE__ */ jsx3(TextView_default, { as: "p", variant: "small", color: "secondary", children: message }) : null
        ] }),
        /* @__PURE__ */ jsxs3("div", { className: "ds-offline-banner__actions", children: [
          onRetry ? /* @__PURE__ */ jsx3(Button_default, { variant: "outlineSecondary", type: "button", size: "sm", onClick: () => onRetry == null ? void 0 : onRetry(), children: actionLabel }) : null,
          onDismiss ? /* @__PURE__ */ jsx3(
            "button",
            {
              type: "button",
              onClick: () => onDismiss == null ? void 0 : onDismiss(),
              "aria-label": dismissLabel,
              style: {
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: 28,
                height: 28,
                borderRadius: "var(--radius-control)",
                border: "none",
                background: "transparent",
                cursor: "pointer",
                color: "var(--color-text-secondary)",
                fontSize: 14
              },
              children: "\u2715"
            }
          ) : null
        ] })
      ]
    }
  );
}

// src/components/molecules/FeedbackStates/FeedbackState.tsx
import { jsx as jsx4, jsxs as jsxs4 } from "react/jsx-runtime";
function FeedbackState(props) {
  if (props.variant === "empty") {
    const { variant: _omit, ...rest } = props;
    return /* @__PURE__ */ jsx4(EmptyState, { ...rest });
  }
  if (props.variant === "success") {
    const { variant: _omit, ...rest } = props;
    return /* @__PURE__ */ jsx4(
      EmptyState,
      {
        tone: "success",
        icon: /* @__PURE__ */ jsxs4("svg", { "aria-hidden": "true", width: "28", height: "28", viewBox: "0 0 24 24", fill: "none", style: { color: "var(--color-success-strong)" }, children: [
          /* @__PURE__ */ jsx4("circle", { cx: "12", cy: "12", r: "9", stroke: "currentColor", strokeWidth: "1.75" }),
          /* @__PURE__ */ jsx4("path", { d: "M8 12l3 3 5-5", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round" })
        ] }),
        ...rest
      }
    );
  }
  if (props.variant === "info") {
    const { variant: _omit, ...rest } = props;
    return /* @__PURE__ */ jsx4(
      EmptyState,
      {
        tone: "info",
        icon: /* @__PURE__ */ jsxs4("svg", { "aria-hidden": "true", width: "28", height: "28", viewBox: "0 0 24 24", fill: "none", style: { color: "var(--color-info-strong)" }, children: [
          /* @__PURE__ */ jsx4("circle", { cx: "12", cy: "12", r: "9", stroke: "currentColor", strokeWidth: "1.75" }),
          /* @__PURE__ */ jsx4("path", { d: "M12 8v.5M12 11v5", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round" })
        ] }),
        ...rest
      }
    );
  }
  if (props.variant === "error") {
    const { variant: _omit, ...rest } = props;
    return /* @__PURE__ */ jsx4(ErrorState, { ...rest });
  }
  if (props.variant === "offline") {
    const { variant: _omit, ...rest } = props;
    return /* @__PURE__ */ jsx4(OfflineBanner, { ...rest });
  }
  const _exhaustive = props;
  return _exhaustive;
}

// src/components/molecules/FeedbackStates/FeedbackStates.animations.tsx
import { jsx as jsx5, jsxs as jsxs5 } from "react/jsx-runtime";
function NoDataAnimation({ size = 120, className, "aria-hidden": ariaHidden = "true" }) {
  return /* @__PURE__ */ jsxs5(
    "svg",
    {
      width: size,
      height: size,
      viewBox: "0 0 120 120",
      fill: "none",
      xmlns: "http://www.w3.org/2000/svg",
      className: ["ds-feedback-illustration", className].filter(Boolean).join(" "),
      "aria-hidden": ariaHidden,
      style: { overflow: "visible" },
      children: [
        /* @__PURE__ */ jsx5("style", { children: `
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
      ` }),
        /* @__PURE__ */ jsx5("ellipse", { cx: "60", cy: "108", rx: "28", ry: "5", fill: "currentColor", opacity: "0.08" }),
        /* @__PURE__ */ jsxs5("g", { className: "fb-tray-group", children: [
          /* @__PURE__ */ jsx5("rect", { x: "18", y: "50", width: "84", height: "48", rx: "10", fill: "var(--color-fill-muted)", stroke: "var(--color-border-subtle)", strokeWidth: "2.5" }),
          /* @__PURE__ */ jsx5("path", { d: "M18 72 Q18 50 60 50 Q102 50 102 72", stroke: "var(--color-border-subtle)", strokeWidth: "2.5", fill: "none" }),
          /* @__PURE__ */ jsx5("path", { d: "M60 34 L60 56M53 49 L60 56 L67 49", stroke: "var(--color-text-secondary)", strokeWidth: "2.5", strokeLinecap: "round", strokeLinejoin: "round" }),
          /* @__PURE__ */ jsx5("line", { x1: "32", y1: "78", x2: "62", y2: "78", className: "fb-line-1", stroke: "var(--color-border-subtle)", strokeWidth: "2.5", strokeLinecap: "round" }),
          /* @__PURE__ */ jsx5("line", { x1: "32", y1: "86", x2: "54", y2: "86", className: "fb-line-2", stroke: "var(--color-border-subtle)", strokeWidth: "2.5", strokeLinecap: "round" }),
          /* @__PURE__ */ jsx5("line", { x1: "32", y1: "94", x2: "48", y2: "94", className: "fb-line-3", stroke: "var(--color-border-subtle)", strokeWidth: "2.5", strokeLinecap: "round" }),
          /* @__PURE__ */ jsx5("circle", { cx: "82", cy: "78", r: "3", fill: "var(--color-border-subtle)", className: "fb-dot-1" }),
          /* @__PURE__ */ jsx5("circle", { cx: "91", cy: "78", r: "3", fill: "var(--color-border-subtle)", className: "fb-dot-2" }),
          /* @__PURE__ */ jsx5("circle", { cx: "100", cy: "78", r: "3", fill: "var(--color-border-subtle)", className: "fb-dot-3" })
        ] })
      ]
    }
  );
}
function NoSearchResultsAnimation({ size = 120, className, "aria-hidden": ariaHidden = "true" }) {
  return /* @__PURE__ */ jsxs5(
    "svg",
    {
      width: size,
      height: size,
      viewBox: "0 0 120 120",
      fill: "none",
      xmlns: "http://www.w3.org/2000/svg",
      className: ["ds-feedback-illustration", className].filter(Boolean).join(" "),
      "aria-hidden": ariaHidden,
      style: { overflow: "visible" },
      children: [
        /* @__PURE__ */ jsx5("style", { children: `
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
      ` }),
        /* @__PURE__ */ jsx5("ellipse", { cx: "60", cy: "110", rx: "24", ry: "4", fill: "currentColor", opacity: "0.07" }),
        /* @__PURE__ */ jsxs5("g", { className: "fb-lens", children: [
          /* @__PURE__ */ jsx5("circle", { cx: "52", cy: "52", r: "26", fill: "var(--color-fill-muted)", stroke: "var(--color-border-subtle)", strokeWidth: "3" }),
          /* @__PURE__ */ jsx5("line", { x1: "70", y1: "70", x2: "94", y2: "94", stroke: "var(--color-border-subtle)", strokeWidth: "5", strokeLinecap: "round" }),
          /* @__PURE__ */ jsxs5("g", { className: "fb-x-mark", children: [
            /* @__PURE__ */ jsx5("line", { x1: "43", y1: "43", x2: "61", y2: "61", stroke: "var(--color-danger-strong)", strokeWidth: "3", strokeLinecap: "round" }),
            /* @__PURE__ */ jsx5("line", { x1: "61", y1: "43", x2: "43", y2: "61", stroke: "var(--color-danger-strong)", strokeWidth: "3", strokeLinecap: "round" })
          ] })
        ] })
      ]
    }
  );
}
function ErrorAnimation({ size = 120, className, "aria-hidden": ariaHidden = "true" }) {
  return /* @__PURE__ */ jsxs5(
    "svg",
    {
      width: size,
      height: size,
      viewBox: "0 0 120 120",
      fill: "none",
      xmlns: "http://www.w3.org/2000/svg",
      className: ["ds-feedback-illustration", className].filter(Boolean).join(" "),
      "aria-hidden": ariaHidden,
      style: { overflow: "visible" },
      children: [
        /* @__PURE__ */ jsx5("style", { children: `
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
      ` }),
        /* @__PURE__ */ jsx5(
          "circle",
          {
            cx: "60",
            cy: "58",
            r: "38",
            className: "fb-ring-anim",
            fill: "none",
            stroke: "var(--color-danger-strong)",
            strokeWidth: "2"
          }
        ),
        /* @__PURE__ */ jsxs5("g", { className: "fb-shield-g", children: [
          /* @__PURE__ */ jsx5(
            "path",
            {
              d: "M60 18 L92 32 L92 62 Q92 84 60 100 Q28 84 28 62 L28 32 Z",
              fill: "var(--color-danger-fill)",
              stroke: "var(--color-danger-strong)",
              strokeWidth: "2.5",
              strokeLinejoin: "round"
            }
          ),
          /* @__PURE__ */ jsx5("line", { x1: "60", y1: "44", x2: "60", y2: "65", stroke: "var(--color-danger-strong)", strokeWidth: "4", strokeLinecap: "round" }),
          /* @__PURE__ */ jsx5("circle", { cx: "60", cy: "75", r: "3", fill: "var(--color-danger-strong)" })
        ] })
      ]
    }
  );
}
function OfflineAnimation({ size = 120, className, "aria-hidden": ariaHidden = "true" }) {
  return /* @__PURE__ */ jsxs5(
    "svg",
    {
      width: size,
      height: size,
      viewBox: "0 0 120 120",
      fill: "none",
      xmlns: "http://www.w3.org/2000/svg",
      className: ["ds-feedback-illustration", className].filter(Boolean).join(" "),
      "aria-hidden": ariaHidden,
      style: { overflow: "visible" },
      children: [
        /* @__PURE__ */ jsx5("style", { children: `
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
      ` }),
        /* @__PURE__ */ jsx5(
          "path",
          {
            className: "fb-arc-3",
            d: "M22 58 Q22 26 60 26 Q98 26 98 58",
            stroke: "var(--color-border-subtle)",
            strokeWidth: "5",
            strokeLinecap: "round",
            fill: "none"
          }
        ),
        /* @__PURE__ */ jsx5(
          "path",
          {
            className: "fb-arc-2",
            d: "M35 70 Q35 46 60 46 Q85 46 85 70",
            stroke: "var(--color-border-subtle)",
            strokeWidth: "5",
            strokeLinecap: "round",
            fill: "none"
          }
        ),
        /* @__PURE__ */ jsx5(
          "path",
          {
            className: "fb-arc-1",
            d: "M48 82 Q48 66 60 66 Q72 66 72 82",
            stroke: "var(--color-border-subtle)",
            strokeWidth: "5",
            strokeLinecap: "round",
            fill: "none"
          }
        ),
        /* @__PURE__ */ jsx5("circle", { className: "fb-wifi-dot", cx: "60", cy: "92", r: "4.5", fill: "var(--color-border-subtle)" }),
        /* @__PURE__ */ jsx5(
          "line",
          {
            className: "fb-slash",
            x1: "24",
            y1: "96",
            x2: "96",
            y2: "24",
            stroke: "var(--color-danger-strong)",
            strokeWidth: "4",
            strokeLinecap: "round"
          }
        )
      ]
    }
  );
}
function SuccessAnimation({ size = 120, className, "aria-hidden": ariaHidden = "true" }) {
  return /* @__PURE__ */ jsxs5(
    "svg",
    {
      width: size,
      height: size,
      viewBox: "0 0 120 120",
      fill: "none",
      xmlns: "http://www.w3.org/2000/svg",
      className: ["ds-feedback-illustration", className].filter(Boolean).join(" "),
      "aria-hidden": ariaHidden,
      style: { overflow: "visible" },
      children: [
        /* @__PURE__ */ jsx5("style", { children: `
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
      ` }),
        /* @__PURE__ */ jsxs5("g", { className: "fb-success-g", children: [
          /* @__PURE__ */ jsx5("circle", { cx: "60", cy: "60", r: "34", fill: "var(--color-success-fill)" }),
          /* @__PURE__ */ jsx5(
            "circle",
            {
              cx: "60",
              cy: "60",
              r: "34",
              className: "fb-circle-draw",
              stroke: "var(--color-success-strong)",
              strokeWidth: "3",
              fill: "none"
            }
          ),
          /* @__PURE__ */ jsx5(
            "path",
            {
              d: "M42 60 l14 14 l22-22",
              className: "fb-check-draw",
              stroke: "var(--color-success-strong)",
              strokeWidth: "4.5",
              strokeLinecap: "round",
              strokeLinejoin: "round"
            }
          )
        ] })
      ]
    }
  );
}
function InfoAnimation({ size = 120, className, "aria-hidden": ariaHidden = "true" }) {
  return /* @__PURE__ */ jsxs5(
    "svg",
    {
      width: size,
      height: size,
      viewBox: "0 0 120 120",
      fill: "none",
      xmlns: "http://www.w3.org/2000/svg",
      className: ["ds-feedback-illustration", className].filter(Boolean).join(" "),
      "aria-hidden": ariaHidden,
      style: { overflow: "visible" },
      children: [
        /* @__PURE__ */ jsx5("style", { children: `
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
      ` }),
        /* @__PURE__ */ jsxs5("g", { className: "fb-info-g", children: [
          /* @__PURE__ */ jsx5("circle", { cx: "60", cy: "60", r: "34", fill: "var(--color-info-fill)", stroke: "var(--color-info-strong)", strokeWidth: "2.5" }),
          /* @__PURE__ */ jsx5(
            "line",
            {
              x1: "60",
              y1: "54",
              x2: "60",
              y2: "76",
              stroke: "var(--color-info-strong)",
              strokeWidth: "5",
              strokeLinecap: "round"
            }
          ),
          /* @__PURE__ */ jsx5("circle", { cx: "60", cy: "43", r: "3.5", fill: "var(--color-info-strong)", className: "fb-i-dot" })
        ] })
      ]
    }
  );
}
var FEEDBACK_ANIMATIONS = {
  empty: NoDataAnimation,
  "no-search": NoSearchResultsAnimation,
  error: ErrorAnimation,
  offline: OfflineAnimation,
  success: SuccessAnimation,
  info: InfoAnimation
};

// src/components/molecules/DataTable/DataTable.config.ts
var DATA_TABLE_DEFAULTS = {
  defaultPageSize: 10,
  pageSizeOptions: [10, 25, 50],
  loadingRows: 5,
  hideCaption: false,
  bulkActionVariant: "outlineSecondary",
  exportFilename: "export"
};
var DATA_TABLE_LABELS = {
  selectedCount: (count) => `${count} selected`,
  selectionStatus: (count) => count === 0 ? "Selection cleared" : count === 1 ? "1 row selected" : `${count} rows selected`,
  clearSelection: "Clear",
  clearSelectionAria: "Clear selection",
  bulkActions: "Bulk actions",
  bulkHint: "Select rows to apply bulk actions",
  exportCsv: "Export CSV",
  columns: "Columns",
  columnsLegend: "Show columns",
  loading: "Loading\u2026",
  emptyTitle: "No data yet",
  emptyDescription: "Records will appear here once they are created.",
  noResultsTitle: "No matching results",
  noResultsDescription: "Try a different search or remove some filters.",
  clearFilters: "Clear filters",
  errorTitle: "Couldn't load data",
  errorDescription: "Something went wrong while loading this table. Try again.",
  pagination: "Table pagination"
};

// src/components/molecules/DataTable/DataTable.utils.ts
function resolveRowKey(row, rowKey) {
  var _a;
  if (typeof rowKey === "function")
    return rowKey(row);
  return String((_a = row[rowKey]) != null ? _a : "");
}
function cellText(value) {
  if (value == null)
    return "";
  if (Array.isArray(value))
    return value.map(cellText).join(" ");
  if (value instanceof Date)
    return Number.isNaN(value.getTime()) ? "" : value.toISOString();
  return String(value);
}
function defaultRowFilter(row, value, searchKeys) {
  var _a, _b;
  const q = ((_a = value.search) != null ? _a : "").trim().toLowerCase();
  if (q && !searchKeys.some((k) => cellText(row[k]).toLowerCase().includes(q)))
    return false;
  for (const [id, v] of Object.entries((_b = value.filters) != null ? _b : {})) {
    const wanted = toValueList(v);
    if (wanted.length === 0)
      continue;
    const cell = row[id];
    const have = Array.isArray(cell) ? cell.map((c) => String(c)) : [cell == null ? "" : String(cell)];
    if (!wanted.some((w) => have.includes(w)))
      return false;
  }
  return true;
}
function isNumericLike(value) {
  if (typeof value === "number")
    return Number.isFinite(value);
  if (typeof value !== "string")
    return false;
  const trimmed = value.trim();
  if (!trimmed)
    return false;
  return Number.isFinite(Number(trimmed));
}
function toNumber(value) {
  return typeof value === "number" ? value : Number(String(value).trim());
}
function compareValues(a, b, sortType = "auto") {
  if (a == null && b == null)
    return 0;
  if (a == null)
    return 1;
  if (b == null)
    return -1;
  const numeric = sortType === "number" || sortType === "auto" && isNumericLike(a) && isNumericLike(b);
  if (numeric)
    return toNumber(a) - toNumber(b);
  return String(a).localeCompare(String(b));
}
function nextSortDirection(prevKey, prevDir, key) {
  if (prevKey !== key)
    return "asc";
  if (prevDir === "asc")
    return "desc";
  if (prevDir === "desc")
    return null;
  return "asc";
}
function sortRows(rows, column, direction) {
  var _a;
  if (!column || !column.sortable || !direction)
    return rows;
  const sorter = (_a = column.sorter) != null ? _a : (a, b) => {
    var _a2;
    return compareValues(a[column.key], b[column.key], (_a2 = column.sortType) != null ? _a2 : "auto");
  };
  return [...rows].sort((a, b) => {
    const v = sorter(a, b, column.key);
    return direction === "asc" ? v : -v;
  });
}
function mergePageSelection(prev, keys, pageKeys) {
  const page = new Set(pageKeys);
  const next = new Set(keys.filter((k) => page.has(k)));
  const kept = prev.filter((k) => !page.has(k));
  return [...kept, ...pageKeys.filter((k) => next.has(k))];
}
var FORMULA_TRIGGER = /^[=+\-@\t\r\uFF1D\uFF0B\uFF0D\uFF20]/;
function stringifyCsvValue(value) {
  var _a;
  if (value == null)
    return "";
  if (value instanceof Date)
    return Number.isNaN(value.getTime()) ? "" : value.toISOString();
  if (Array.isArray(value))
    return value.map(stringifyCsvValue).join("; ");
  if (typeof value === "object") {
    try {
      return (_a = JSON.stringify(value)) != null ? _a : "";
    } catch (e) {
      return "";
    }
  }
  return String(value);
}
var SEPARATED_TRIGGER = /([;\uFF1B])(?=[\s"]*[=+\-@\t\r\uFF1D\uFF0B\uFF0D\uFF20])/g;
function hasFormulaTrigger(text) {
  return FORMULA_TRIGGER.test(text);
}
function neutralizeSeparatedTriggers(text) {
  return text.replace(SEPARATED_TRIGGER, "$1'");
}
function escapeCsvCell(value) {
  let text = stringifyCsvValue(value);
  const isNumber = typeof value === "number" || typeof value === "bigint";
  if (!isNumber) {
    if (hasFormulaTrigger(text))
      text = `'${text}`;
    text = neutralizeSeparatedTriggers(text);
  }
  if (/[",;\r\n]/.test(text))
    text = `"${text.replace(/"/g, '""')}"`;
  return text;
}
function csvHeaderText(column) {
  if (typeof column.csvHeader === "string")
    return column.csvHeader;
  const header = column.header;
  if (typeof header === "string" || typeof header === "number")
    return String(header);
  return column.key;
}
function toCsv(columns, rows) {
  const header = columns.map((c) => escapeCsvCell(csvHeaderText(c))).join(",");
  const lines = rows.map(
    (row) => columns.map((c) => escapeCsvCell(c.csvValue ? c.csvValue(row) : row[c.key])).join(",")
  );
  return [header, ...lines].join("\r\n");
}
function sanitizeCsvFilename(name, fallback = "export") {
  const cleaned = (name != null ? name : "").replace(/[\u202A-\u202E\u2066-\u2069]/g, "").replace(/[\\/:*?"<>|\u0000-\u001f]/g, "_").trim();
  const base = cleaned.replace(/^\.+/, "") || fallback;
  return /\.csv$/i.test(base) ? base : `${base}.csv`;
}
function downloadCsv(csv, filename) {
  if (typeof document === "undefined" || typeof URL === "undefined" || typeof URL.createObjectURL !== "function") {
    return false;
  }
  const blob = new Blob(["\uFEFF", csv], { type: "text/csv;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.rel = "noopener";
  a.style.display = "none";
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 0);
  return true;
}
function findMissingTableMarkup(host, { selectable, hasRows }) {
  const missing = [];
  if (!host.querySelector(".table-wrapper"))
    missing.push(".table-wrapper");
  if (!host.querySelector(".table-scroll-wrapper"))
    missing.push(".table-scroll-wrapper");
  if (hasRows) {
    if (!host.querySelector("table thead th"))
      missing.push("table thead th");
    if (selectable && !host.querySelector('thead input[type="checkbox"]'))
      missing.push('thead input[type="checkbox"]');
  }
  return missing;
}

// src/components/molecules/DataTable/index.tsx
import { Fragment, jsx as jsx6, jsxs as jsxs6 } from "react/jsx-runtime";
function cls(...parts) {
  return parts.filter(Boolean).join(" ");
}
var EMPTY_FILTER_VALUE = { search: "", filters: {} };
var SELECTION_NOTE_MS = 1500;
function isDevelopment() {
  var _a;
  return typeof process !== "undefined" && ((_a = process.env) == null ? void 0 : _a.NODE_ENV) !== "production";
}
var NO_SORT = { key: "", direction: null };
function ColumnsIcon() {
  return /* @__PURE__ */ jsxs6("svg", { className: "ds-data-table__tool-icon", viewBox: "0 0 20 20", fill: "none", "aria-hidden": "true", focusable: "false", children: [
    /* @__PURE__ */ jsx6("rect", { x: "3", y: "4", width: "14", height: "12", rx: "1.5", stroke: "currentColor", strokeWidth: "1.6" }),
    /* @__PURE__ */ jsx6("path", { d: "M8 4v12M12 4v12", stroke: "currentColor", strokeWidth: "1.6" })
  ] });
}
function initialVisibility(columns) {
  const out = {};
  for (const c of columns)
    out[c.key] = !c.hidden;
  return out;
}
function DataTableInner({
  caption,
  hideCaption = DATA_TABLE_DEFAULTS.hideCaption,
  columns,
  data,
  rowKey,
  loading = false,
  error,
  emptyState,
  noResultsState,
  filterBar,
  filterFn,
  pagination,
  defaultPageSize = DATA_TABLE_DEFAULTS.defaultPageSize,
  pageSizeOptions = DATA_TABLE_DEFAULTS.pageSizeOptions,
  paginationAriaLabel,
  selectable = false,
  preserveSelectionOnFilter = false,
  selectedRowKeys,
  onSelectionChange,
  bulkActions,
  columnVisibility,
  onColumnVisibilityChange,
  exportCsv,
  toolbarRight,
  onSortChange,
  className,
  tableClassName,
  labels: labelsProp,
  loadingRows = DATA_TABLE_DEFAULTS.loadingRows,
  expandable,
  ...tableRest
}, ref) {
  var _a, _b, _c, _d, _e, _f, _g;
  const labels = { ...DATA_TABLE_LABELS, ...labelsProp };
  const base = useId3().replace(/:/g, "");
  const captionId = `ds-data-table-caption-${base}`;
  const tableHostRef = useRef(null);
  const serverMode = typeof pagination === "object" && pagination !== null;
  const paged = pagination !== false;
  const getKey = useCallback((row) => resolveRowKey(row, rowKey), [rowKey]);
  const [innerFilter, setInnerFilter] = useState((_a = filterBar == null ? void 0 : filterBar.defaultValue) != null ? _a : EMPTY_FILTER_VALUE);
  const filterValue = (_b = filterBar == null ? void 0 : filterBar.value) != null ? _b : innerFilter;
  const filtersActive = Boolean(filterBar) && hasActiveFilterValue(filterValue);
  const [clientPage, setClientPage] = useState(1);
  const [clientPageSize, setClientPageSize] = useState(defaultPageSize);
  const handleFilterChange = (next) => {
    var _a2;
    if ((filterBar == null ? void 0 : filterBar.value) === void 0)
      setInnerFilter(next);
    if (!preserveSelectionOnFilter && selection.length > 0) {
      commitSelection([]);
      raiseSelectionNote(labels.selectionStatus(0));
    }
    (_a2 = filterBar == null ? void 0 : filterBar.onChange) == null ? void 0 : _a2.call(filterBar, next);
    setClientPage(1);
  };
  const visibilityControlled = typeof columnVisibility === "object" && columnVisibility !== null;
  const [innerVisibility, setInnerVisibility] = useState(() => initialVisibility(columns));
  const visibility = useMemo(() => {
    const seeded = initialVisibility(columns);
    const source = visibilityControlled ? columnVisibility : innerVisibility;
    for (const key of Object.keys(seeded))
      if (key in source)
        seeded[key] = Boolean(source[key]);
    return seeded;
  }, [columns, columnVisibility, innerVisibility, visibilityControlled]);
  const isVisible = (c) => c.hideable === false ? true : visibility[c.key] !== false;
  const tableColumns = useMemo(
    () => columns.map((c) => ({ ...c, hidden: c.hideable === false ? false : visibility[c.key] === false })),
    [columns, visibility]
  );
  const visibleColumns = useMemo(() => tableColumns.filter((c) => !c.hidden), [tableColumns]);
  const setColumnVisible = (key, visible) => {
    const next = { ...visibility, [key]: visible };
    if (!visibilityControlled)
      setInnerVisibility(next);
    onColumnVisibilityChange == null ? void 0 : onColumnVisibilityChange(next);
  };
  const [sort, setSort] = useState(NO_SORT);
  const sortRef = useRef(sort);
  sortRef.current = sort;
  useEffect(() => {
    if (error)
      setSort(NO_SORT);
  }, [error]);
  const headerOffset = (expandable ? 1 : 0) + (selectable ? 1 : 0);
  const handleHeaderActivation = (target) => {
    var _a2, _b2;
    const host = tableHostRef.current;
    if (!host || !(target instanceof Element))
      return;
    const th = target.closest("th");
    const thead = th == null ? void 0 : th.closest("thead");
    if (!th || !thead || thead.closest("table") !== host.querySelector("table"))
      return;
    const index = Array.prototype.indexOf.call((_b2 = (_a2 = th.parentElement) == null ? void 0 : _a2.children) != null ? _b2 : [], th) - headerOffset;
    const column = visibleColumns[index];
    if (!(column == null ? void 0 : column.sortable))
      return;
    const prev = sortRef.current;
    const next = { key: column.key, direction: nextSortDirection(prev.key, prev.direction, column.key) };
    sortRef.current = next;
    setSort(next);
    if (!serverMode)
      setClientPage(1);
    onSortChange == null ? void 0 : onSortChange(next);
  };
  const hasFilterBar = Boolean(filterBar);
  const filteredRows = useMemo(() => {
    if (serverMode || !hasFilterBar)
      return data;
    const searchKeys = visibleColumns.map((c) => c.key);
    return data.filter((row) => filterFn ? filterFn(row, filterValue) : defaultRowFilter(row, filterValue, searchKeys));
  }, [serverMode, hasFilterBar, data, filterFn, filterValue, visibleColumns]);
  const sortColumn = visibleColumns.find((c) => c.key === sort.key);
  const orderedRows = useMemo(
    () => serverMode ? filteredRows : sortRows(filteredRows, sortColumn, sort.direction),
    [serverMode, filteredRows, sortColumn, sort.direction]
  );
  const total = serverMode ? pagination.total : orderedRows.length;
  const pageSize = serverMode ? pagination.pageSize : clientPageSize;
  const pageCount = Math.max(1, Math.ceil(total / Math.max(1, pageSize)));
  const page = serverMode ? pagination.page : Math.min(Math.max(1, clientPage), pageCount);
  useEffect(() => {
    if (!serverMode && clientPage !== page)
      setClientPage(page);
  }, [serverMode, clientPage, page]);
  const pageRows = useMemo(() => {
    if (serverMode || !paged)
      return orderedRows;
    const start = (page - 1) * pageSize;
    return orderedRows.slice(start, start + pageSize);
  }, [serverMode, paged, orderedRows, page, pageSize]);
  const [innerSelection, setInnerSelection] = useState([]);
  const selection = selectedRowKeys != null ? selectedRowKeys : innerSelection;
  const [selectionNote, setSelectionNote] = useState("");
  const noteSeen = useRef(false);
  const noteConsumed = useRef(false);
  const raiseSelectionNote = (text) => {
    noteSeen.current = false;
    noteConsumed.current = false;
    setSelectionNote(text);
  };
  let loadingLiveText = labels.loading;
  let liveSelectionNote = "";
  if (selectionNote) {
    if (loading) {
      if (!noteSeen.current)
        loadingLiveText = `${selectionNote}. ${labels.loading}`;
      noteSeen.current = true;
      noteConsumed.current = true;
    } else if (!noteConsumed.current) {
      liveSelectionNote = selectionNote;
      noteSeen.current = true;
    }
  }
  useEffect(() => {
    if (!loading && noteConsumed.current && selectionNote)
      setSelectionNote("");
  }, [loading, selectionNote]);
  useEffect(() => {
    if (!selectionNote)
      return;
    const t = setTimeout(() => setSelectionNote(""), SELECTION_NOTE_MS);
    return () => clearTimeout(t);
  }, [selectionNote]);
  const rowCache = useRef(/* @__PURE__ */ new Map());
  for (const row of data)
    rowCache.current.set(getKey(row), row);
  if (rowCache.current.size > data.length + selection.length * 2 + 100) {
    const keep = /* @__PURE__ */ new Set([...selection, ...data.map(getKey)]);
    for (const k of Array.from(rowCache.current.keys()))
      if (!keep.has(k))
        rowCache.current.delete(k);
  }
  const commitSelection = (keys) => {
    if (keys.length > 0)
      setSelectionNote("");
    if (selectedRowKeys === void 0)
      setInnerSelection(keys);
    const rows = keys.map((k) => rowCache.current.get(k)).filter((r) => r !== void 0);
    onSelectionChange == null ? void 0 : onSelectionChange(keys, rows);
  };
  const pageKeys = pageRows.map(getKey);
  const handleTableSelection = (keys) => {
    commitSelection(mergePageSelection(selection, keys, pageKeys));
  };
  const clearSelection = () => {
    commitSelection([]);
  };
  const clearSelectionAndFocus = () => {
    clearSelection();
    requestAnimationFrame(() => {
      var _a2, _b2;
      (_b2 = (_a2 = tableHostRef.current) == null ? void 0 : _a2.querySelector('thead input[type="checkbox"]')) == null ? void 0 : _b2.focus();
    });
  };
  const selectedRows = selection.map((k) => rowCache.current.get(k)).filter((r) => r !== void 0);
  const tableOwnsScroll = Boolean((_c = tableRest.scroll) == null ? void 0 : _c.y);
  const markupWarned = useRef(false);
  useLayoutEffect(() => {
    var _a2;
    const host = tableHostRef.current;
    if (!host)
      return;
    const region = host.querySelector(".table-scroll-wrapper");
    if (region) {
      if (tableOwnsScroll) {
        region.setAttribute("role", "region");
        region.removeAttribute("aria-label");
        region.setAttribute("aria-labelledby", captionId);
        region.setAttribute("tabindex", "0");
        region.classList.add("ds-data-table__inner-scroll");
      } else {
        region.setAttribute("role", "presentation");
        region.removeAttribute("aria-label");
        region.removeAttribute("aria-labelledby");
        region.removeAttribute("tabindex");
        region.classList.remove("ds-data-table__inner-scroll");
      }
    }
    (_a2 = region == null ? void 0 : region.querySelector("table")) == null ? void 0 : _a2.setAttribute("aria-labelledby", captionId);
    const selectAll = host.querySelector('thead input[type="checkbox"]');
    if (selectAll) {
      const selected = new Set(selection);
      const onPage = pageKeys.filter((k) => selected.has(k)).length;
      const mixed = selection.length > 0 && pageKeys.length > 0 && onPage < pageKeys.length;
      selectAll.indeterminate = mixed;
      if (mixed)
        selectAll.setAttribute("data-indeterminate", "true");
      else
        selectAll.removeAttribute("data-indeterminate");
    }
    if (!markupWarned.current && isDevelopment()) {
      const missing = findMissingTableMarkup(host, { selectable, hasRows: !loading && pageRows.length > 0 });
      if (missing.length > 0) {
        markupWarned.current = true;
        console.warn(
          `[DataTable] Table markup changed \u2014 selectors not found: ${missing.join(", ")}. Caption naming, the scroll region, select-all indeterminate or the sort mirror may be broken.`
        );
      }
    }
  });
  const exportOptions = exportCsv === true ? {} : exportCsv && typeof exportCsv === "object" ? exportCsv : null;
  const handleExport = () => {
    var _a2;
    if (!exportOptions)
      return;
    const cols = visibleColumns.filter((c) => c.exportable !== false);
    const csv = toCsv(cols, orderedRows);
    const fallback = typeof caption === "string" && caption.trim() ? caption : DATA_TABLE_DEFAULTS.exportFilename;
    const filename = sanitizeCsvFilename((_a2 = exportOptions.filename) != null ? _a2 : fallback, DATA_TABLE_DEFAULTS.exportFilename);
    if (exportOptions.onExport)
      exportOptions.onExport(csv, filename);
    else
      downloadCsv(csv, filename);
  };
  const [columnsOpen, setColumnsOpen] = useState(false);
  const columnMenu = columnVisibility ? /* @__PURE__ */ jsxs6(Popover, { open: columnsOpen, onOpenChange: setColumnsOpen, placement: "bottom-end", children: [
    /* @__PURE__ */ jsxs6(PopoverTrigger, { className: "ds-data-table__tool", children: [
      /* @__PURE__ */ jsx6(ColumnsIcon, {}),
      /* @__PURE__ */ jsx6("span", { children: labels.columns })
    ] }),
    /* @__PURE__ */ jsx6(PopoverContent, { showPointer: false, className: "ds-data-table__menu", children: /* @__PURE__ */ jsxs6("fieldset", { className: "ds-data-table__fieldset", children: [
      /* @__PURE__ */ jsx6("legend", { className: "ds-data-table__legend", children: labels.columnsLegend }),
      /* @__PURE__ */ jsx6("div", { className: "ds-data-table__checks", children: columns.map((c) => {
        const checked = isVisible(c);
        const locked = c.hideable === false || checked && visibleColumns.length <= 1;
        return /* @__PURE__ */ jsx6(
          Checkbox_default,
          {
            id: `ds-data-table-${base}-col-${c.key}`,
            name: `ds-data-table-${base}-columns`,
            value: c.key,
            label: c.header,
            checked,
            disabled: locked,
            onChange: () => setColumnVisible(c.key, !checked)
          },
          c.key
        );
      }) })
    ] }) })
  ] }, "columns") : null;
  const exportButton = exportOptions ? /* @__PURE__ */ jsx6(Button_default, { type: "button", variant: "outlineSecondary", size: "lg", onClick: handleExport, disabled: loading, children: (_d = exportOptions.label) != null ? _d : labels.exportCsv }, "export") : null;
  const toolItems = [filterBar == null ? void 0 : filterBar.extra, toolbarRight, columnMenu, exportButton].filter(Boolean);
  const tools = toolItems.length > 0 ? /* @__PURE__ */ jsx6(Fragment, { children: toolItems.map((n, i) => /* @__PURE__ */ jsx6(React3.Fragment, { children: n }, i)) }) : void 0;
  const clearFilters = () => handleFilterChange({ ...filterValue, search: "", filters: {} });
  const emptyNode = filtersActive ? noResultsState != null ? noResultsState : /* @__PURE__ */ jsx6(
    EmptyState,
    {
      compact: true,
      title: labels.noResultsTitle,
      description: labels.noResultsDescription,
      action: /* @__PURE__ */ jsx6(Button_default, { type: "button", variant: "outlineSecondary", size: "md", onClick: clearFilters, children: labels.clearFilters })
    }
  ) : emptyState != null ? emptyState : /* @__PURE__ */ jsx6(EmptyState, { compact: true, title: labels.emptyTitle, description: labels.emptyDescription });
  const paginationLabel = paginationAriaLabel != null ? paginationAriaLabel : typeof caption === "string" && caption.trim() ? `${caption} pagination` : labels.pagination;
  const showPagination = paged && !error && total > 0;
  const lastResultCount = useRef(void 0);
  if (!loading && !error)
    lastResultCount.current = total;
  const setRootRef = (el) => {
    if (typeof ref === "function")
      ref(el);
    else if (ref)
      ref.current = el;
  };
  const {
    extra: _filterExtra,
    value: _fv,
    onChange: _fc,
    defaultValue: _fd,
    resultCount: filterResultCount,
    ...filterBarRest
  } = filterBar != null ? filterBar : {};
  return /* @__PURE__ */ jsxs6(
    "div",
    {
      ref: setRootRef,
      className: cls("ds-data-table", className),
      "data-loading": loading ? "true" : void 0,
      "data-error": error ? "true" : void 0,
      children: [
        /* @__PURE__ */ jsx6("div", { id: captionId, className: cls("ds-data-table__caption", hideCaption && "visually-hidden"), children: caption }),
        filterBar ? /* @__PURE__ */ jsx6(
          FilterBar_default,
          {
            ...filterBarRest,
            value: filterValue,
            onChange: handleFilterChange,
            resultCount: filterResultCount != null ? filterResultCount : error ? void 0 : loading ? lastResultCount.current : total,
            extra: tools
          }
        ) : tools ? /* @__PURE__ */ jsx6("div", { className: "ds-data-table__toolbar", children: tools }) : null,
        selectable ? /* @__PURE__ */ jsx6("div", { className: "ds-data-table__bulk-slot", "data-active": selection.length > 0 ? "true" : "false", children: selection.length > 0 ? /* @__PURE__ */ jsxs6("div", { className: "ds-data-table__bulk", role: "group", "aria-label": labels.bulkActions, children: [
          /* @__PURE__ */ jsx6("span", { className: "ds-data-table__bulk-count", children: labels.selectedCount(selection.length) }),
          /* @__PURE__ */ jsx6("span", { className: "ds-data-table__bulk-sep", "aria-hidden": "true", children: "\xB7" }),
          /* @__PURE__ */ jsx6(
            Button_default,
            {
              type: "button",
              variant: "ghost",
              size: "lg",
              ariaLabel: labels.clearSelectionAria,
              onClick: clearSelectionAndFocus,
              children: labels.clearSelection
            }
          ),
          bulkActions && bulkActions.length > 0 ? /* @__PURE__ */ jsx6("div", { className: "ds-data-table__bulk-actions", children: bulkActions.map((action) => {
            var _a2;
            return /* @__PURE__ */ jsx6(
              Button_default,
              {
                type: "button",
                size: "lg",
                variant: (_a2 = action.variant) != null ? _a2 : DATA_TABLE_DEFAULTS.bulkActionVariant,
                disabled: action.disabled,
                onClick: () => action.onClick(selectedRows, { clearSelection }),
                children: action.label
              },
              action.label
            );
          }) }) : null
        ] }) : /* @__PURE__ */ jsx6("p", { className: "ds-data-table__bulk-hint", children: labels.bulkHint }) }) : null,
        /* @__PURE__ */ jsx6("p", { className: "visually-hidden", "aria-live": "polite", "aria-atomic": "true", children: loading ? loadingLiveText : selectable && selection.length > 0 ? labels.selectionStatus(selection.length) : liveSelectionNote }),
        error ? /* @__PURE__ */ jsx6("div", { className: "ds-data-table__state", children: /* @__PURE__ */ jsx6(
          ErrorState,
          {
            compact: true,
            title: (_e = error.title) != null ? _e : labels.errorTitle,
            description: (_f = error.description) != null ? _f : labels.errorDescription,
            onRetry: error.onRetry
          }
        ) }) : /* @__PURE__ */ jsx6(
          "div",
          {
            ref: tableHostRef,
            className: "ds-data-table__table",
            role: tableOwnsScroll ? void 0 : "region",
            "aria-labelledby": tableOwnsScroll ? void 0 : captionId,
            tabIndex: tableOwnsScroll ? void 0 : 0,
            "data-scroll-owner": tableOwnsScroll ? "table" : "self",
            onClick: (e) => handleHeaderActivation(e.target),
            onKeyDown: (e) => {
              if (e.key === "Enter" || e.key === " ")
                handleHeaderActivation(e.target);
            },
            children: /* @__PURE__ */ jsx6(
              Table_default,
              {
                ...tableRest,
                expandable,
                className: tableClassName,
                columns: tableColumns,
                data: pageRows,
                rowKey: (row) => getKey(row),
                selectionMode: selectable ? "multiple" : "none",
                selectedRowKeys: selection,
                onSelectionChange: (keys) => handleTableSelection(keys),
                searchable: false,
                pagination: false,
                loading,
                loadingVariant: "skeleton",
                loadingRows,
                emptyComponent: /* @__PURE__ */ jsx6("div", { className: "ds-data-table__state", children: emptyNode })
              }
            )
          }
        ),
        showPagination ? /* @__PURE__ */ jsx6(
          Pagination_default,
          {
            className: "ds-data-table__pagination",
            ariaLabel: paginationLabel,
            page,
            pageSize,
            totalItems: total,
            showTotal: true,
            disabled: loading,
            onPageChange: (next) => {
              if (serverMode)
                pagination.onPageChange(next);
              else
                setClientPage(next);
            },
            pageSizeOptions: serverMode ? (_g = pagination.pageSizeOptions) != null ? _g : pageSizeOptions : pageSizeOptions,
            onPageSizeChange: serverMode ? pagination.onPageSizeChange : (n) => {
              setClientPageSize(n);
              setClientPage(1);
            }
          }
        ) : null
      ]
    }
  );
}
var DataTable = React3.forwardRef(DataTableInner);
DataTable.displayName = "DataTable";
var DataTable_default = DataTable;

export {
  EmptyState,
  ErrorState,
  OfflineBanner,
  FeedbackState,
  NoDataAnimation,
  NoSearchResultsAnimation,
  ErrorAnimation,
  OfflineAnimation,
  SuccessAnimation,
  InfoAnimation,
  FEEDBACK_ANIMATIONS,
  escapeCsvCell,
  toCsv,
  DataTable,
  DataTable_default
};
//# sourceMappingURL=chunk-KBL56N3Q.mjs.map