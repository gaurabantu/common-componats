/* ucs:component-css */
import "./styles/components/molecules/Timeline/Timeline.css";
// src/components/molecules/Timeline/index.tsx
import React, { createContext, useContext } from "react";

// src/components/molecules/Timeline/Timeline.config.ts
var TIMELINE_DEFAULTS = {
  orientation: "vertical",
  align: "start",
  size: "md",
  status: "neutral",
  pendingTitle: "In progress",
  pendingLabel: "Pending"
};
var TIMELINE_STATUS_LABELS = {
  neutral: "",
  primary: "",
  success: "Success",
  warning: "Warning",
  danger: "Error",
  info: "Information"
};
function defaultFormatTimestamp(date) {
  try {
    return new Intl.DateTimeFormat(void 0, { dateStyle: "medium", timeStyle: "short" }).format(date);
  } catch (e) {
    return date.toISOString();
  }
}

// src/components/molecules/Timeline/index.tsx
import { jsx, jsxs } from "react/jsx-runtime";
function cls(...parts) {
  return parts.filter(Boolean).join(" ");
}
var TimelineFormatContext = createContext(defaultFormatTimestamp);
function resolveTimestamp(timestamp, format) {
  if (timestamp === void 0 || timestamp === null || timestamp === "")
    return {};
  if (typeof timestamp === "string")
    return { dateTime: timestamp, label: timestamp };
  const date = timestamp instanceof Date ? timestamp : new Date(timestamp);
  if (Number.isNaN(date.getTime()))
    return {};
  return { dateTime: date.toISOString(), label: format(date) };
}
var TimelineItem = React.forwardRef(function TimelineItem2({
  title,
  description,
  timestamp,
  timestampLabel,
  icon,
  status = TIMELINE_DEFAULTS.status,
  statusLabel,
  pending = false,
  formatTimestamp,
  className,
  ...rest
}, ref) {
  const inheritedFormat = useContext(TimelineFormatContext);
  const { dateTime, label } = resolveTimestamp(timestamp, formatTimestamp != null ? formatTimestamp : inheritedFormat);
  const srStatus = pending ? TIMELINE_DEFAULTS.pendingLabel : statusLabel !== void 0 ? statusLabel : TIMELINE_STATUS_LABELS[status];
  return /* @__PURE__ */ jsxs(
    "li",
    {
      ref,
      className: cls("ds-timeline-item", className),
      "data-status": status,
      "data-pending": pending ? "true" : void 0,
      "data-has-icon": icon != null ? "true" : void 0,
      ...rest,
      children: [
        /* @__PURE__ */ jsx("span", { className: "ds-timeline-item__marker", "aria-hidden": "true", children: /* @__PURE__ */ jsx("span", { className: "ds-timeline-item__dot", children: icon }) }),
        /* @__PURE__ */ jsxs("div", { className: "ds-timeline-item__content", children: [
          dateTime || timestampLabel != null ? /* @__PURE__ */ jsx("time", { className: "ds-timeline-item__time", dateTime, children: timestampLabel != null ? timestampLabel : label }) : null,
          /* @__PURE__ */ jsxs("div", { className: "ds-timeline-item__title", children: [
            title,
            srStatus ? /* @__PURE__ */ jsx("span", { className: "ds-timeline__sr", children: `, ${srStatus}` }) : null
          ] }),
          description != null ? /* @__PURE__ */ jsx("div", { className: "ds-timeline-item__description", children: description }) : null
        ] })
      ]
    }
  );
});
var Timeline = React.forwardRef(function Timeline2({
  items,
  children,
  orientation = TIMELINE_DEFAULTS.orientation,
  align = TIMELINE_DEFAULTS.align,
  size = TIMELINE_DEFAULTS.size,
  pending,
  formatTimestamp = defaultFormatTimestamp,
  label,
  className,
  ...rest
}, ref) {
  var _a;
  const horizontal = orientation === "horizontal";
  const pendingTitle = pending === true ? TIMELINE_DEFAULTS.pendingTitle : pending;
  const ariaLabel = (_a = rest["aria-label"]) != null ? _a : label;
  const list = /* @__PURE__ */ jsxs(
    "ol",
    {
      ...rest,
      ref,
      "aria-label": ariaLabel,
      className: "ds-timeline__list",
      children: [
        items == null ? void 0 : items.map(({ id, ...item }, index) => /* @__PURE__ */ jsx(TimelineItem, { ...item }, id != null ? id : index)),
        children,
        pending ? /* @__PURE__ */ jsx(TimelineItem, { title: pendingTitle, pending: true }) : null
      ]
    }
  );
  return /* @__PURE__ */ jsx(TimelineFormatContext.Provider, { value: formatTimestamp, children: /* @__PURE__ */ jsx(
    "div",
    {
      className: cls("ds-timeline", className),
      "data-orientation": orientation,
      "data-align": align,
      "data-size": size,
      role: horizontal ? "region" : void 0,
      "aria-label": horizontal ? ariaLabel != null ? ariaLabel : "Timeline" : void 0,
      tabIndex: horizontal ? 0 : void 0,
      children: list
    }
  ) });
});
Timeline.displayName = "Timeline";
TimelineItem.displayName = "TimelineItem";
var Timeline_default = Timeline;

export {
  TimelineItem,
  Timeline,
  Timeline_default
};
//# sourceMappingURL=chunk-B5WSYT4E.mjs.map