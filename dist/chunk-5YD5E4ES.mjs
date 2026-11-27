/* ucs:component-css */
import "./styles/components/molecules/PageHeader/PageHeader.css";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "./chunk-UP5YH5MZ.mjs";
import {
  Button_default
} from "./chunk-XIOFTDBU.mjs";
import {
  Icon_default
} from "./chunk-6JJMOGWW.mjs";
import {
  isSafeHref
} from "./chunk-2SUDH5VN.mjs";

// src/components/molecules/PageHeader/index.tsx
import React, { useEffect, useLayoutEffect, useRef, useState } from "react";

// src/components/molecules/PageHeader/PageHeader.config.ts
var PAGE_HEADER_DEFAULTS = {
  titleAs: "h1",
  maxVisibleActions: 2,
  moreActionsLabel: "More actions"
};
var PAGE_HEADER_COMPACT_QUERY = "(max-width: 640px)";
var PAGE_HEADER_SECONDARY_BUTTON = { variant: "outlineSecondary", size: "md" };
var PAGE_HEADER_MORE_TRIGGER_CLASS = "btn-base btn-outline-secondary btn-size-md btn-rounded-md";

// src/components/molecules/PageHeader/index.tsx
import { jsx, jsxs } from "react/jsx-runtime";
function cls(...parts) {
  return parts.filter(Boolean).join(" ");
}
function useMatchMedia(query, onBeforeChange) {
  const beforeRef = useRef(onBeforeChange);
  beforeRef.current = onBeforeChange;
  const get = () => typeof window !== "undefined" && typeof window.matchMedia === "function" ? window.matchMedia(query).matches : false;
  const [matches, setMatches] = useState(false);
  useEffect(() => {
    var _a;
    if (typeof window === "undefined" || typeof window.matchMedia !== "function")
      return;
    const mql = window.matchMedia(query);
    const onChange = () => {
      var _a2;
      (_a2 = beforeRef.current) == null ? void 0 : _a2.call(beforeRef, mql.matches);
      setMatches(mql.matches);
    };
    setMatches(get());
    if (typeof mql.addEventListener === "function")
      mql.addEventListener("change", onChange);
    else
      (_a = mql.addListener) == null ? void 0 : _a.call(mql, onChange);
    return () => {
      var _a2;
      if (typeof mql.removeEventListener === "function")
        mql.removeEventListener("change", onChange);
      else
        (_a2 = mql.removeListener) == null ? void 0 : _a2.call(mql, onChange);
    };
  }, [query]);
  return matches;
}
function safeHref(href) {
  return href && isSafeHref(href) ? href : void 0;
}
var MoreIcon = /* @__PURE__ */ jsxs("svg", { viewBox: "0 0 16 16", width: "16", height: "16", "aria-hidden": "true", focusable: "false", children: [
  /* @__PURE__ */ jsx("circle", { cx: "3.5", cy: "8", r: "1.4", fill: "currentColor" }),
  /* @__PURE__ */ jsx("circle", { cx: "8", cy: "8", r: "1.4", fill: "currentColor" }),
  /* @__PURE__ */ jsx("circle", { cx: "12.5", cy: "8", r: "1.4", fill: "currentColor" })
] });
var PageHeader = React.forwardRef(function PageHeader2({
  title,
  titleAs = PAGE_HEADER_DEFAULTS.titleAs,
  description,
  breadcrumb,
  status,
  meta,
  primaryAction,
  secondaryActions,
  maxVisibleActions = PAGE_HEADER_DEFAULTS.maxVisibleActions,
  moreActionsLabel = PAGE_HEADER_DEFAULTS.moreActionsLabel,
  tabs,
  className,
  ...rest
}, ref) {
  const actionsRef = useRef(null);
  const moreRef = useRef(null);
  const pendingFocus = useRef(null);
  const compact = useMatchMedia(PAGE_HEADER_COMPACT_QUERY, (next) => {
    var _a;
    if (typeof document === "undefined")
      return;
    const active = document.activeElement;
    if (!active || !((_a = actionsRef.current) == null ? void 0 : _a.contains(active)))
      return;
    if (next && active.closest(".ds-page-header__secondary"))
      pendingFocus.current = "more";
    else if (!next && active === moreRef.current)
      pendingFocus.current = "inline";
  });
  const [menuOpen, setMenuOpen] = useState(false);
  useLayoutEffect(() => {
    var _a, _b, _c;
    const pending = pendingFocus.current;
    pendingFocus.current = null;
    if (!pending)
      return;
    if (pending === "more") {
      (_a = moreRef.current) == null ? void 0 : _a.focus();
      return;
    }
    const trigger = moreRef.current;
    if (trigger && trigger.isConnected && document.activeElement === trigger)
      return;
    (_c = (_b = actionsRef.current) == null ? void 0 : _b.querySelector(".ds-page-header__secondary")) == null ? void 0 : _c.focus();
  }, [compact]);
  const actions = secondaryActions != null ? secondaryActions : [];
  const inlineCount = compact ? 0 : Math.max(0, Math.floor(maxVisibleActions));
  const inline = actions.slice(0, inlineCount);
  const overflow = actions.slice(inlineCount);
  const hasActions = actions.length > 0 || Boolean(primaryAction);
  const Heading = titleAs;
  const renderInline = (action, index) => {
    const href = action.disabled ? void 0 : safeHref(action.href);
    const common = {
      variant: PAGE_HEADER_SECONDARY_BUTTON.variant,
      size: PAGE_HEADER_SECONDARY_BUTTON.size,
      icon: action.icon,
      disabled: action.disabled,
      className: "ds-page-header__secondary"
    };
    if (href) {
      return /* @__PURE__ */ jsx(
        Button_default,
        {
          ...common,
          href,
          onClick: action.onClick,
          children: action.label
        },
        `${action.label}-${index}`
      );
    }
    return /* @__PURE__ */ jsx(
      Button_default,
      {
        ...common,
        type: "button",
        onClick: action.onClick,
        children: action.label
      },
      `${action.label}-${index}`
    );
  };
  const renderMenuItem = (action, index) => {
    const key = `${action.label}-${index}`;
    const iconNode = action.icon ? /* @__PURE__ */ jsx(Icon_default, { src: action.icon, width: 16, height: 16, className: "ds-dropdown-menu__icon" }) : null;
    const href = action.disabled ? void 0 : safeHref(action.href);
    if (href) {
      return /* @__PURE__ */ jsx(
        "a",
        {
          role: "menuitem",
          href,
          className: "ds-dropdown-menu__item ds-page-header__menu-link",
          onClick: (e) => {
            var _a;
            (_a = action.onClick) == null ? void 0 : _a.call(action, e);
            setMenuOpen(false);
          },
          children: /* @__PURE__ */ jsxs("span", { className: "ds-dropdown-menu__item-inner", children: [
            iconNode,
            action.label
          ] })
        },
        key
      );
    }
    return /* @__PURE__ */ jsxs(
      DropdownMenuItem,
      {
        disabled: action.disabled,
        onClick: (e) => {
          var _a;
          return (_a = action.onClick) == null ? void 0 : _a.call(action, e);
        },
        children: [
          iconNode,
          action.label
        ]
      },
      key
    );
  };
  return /* @__PURE__ */ jsxs(
    "div",
    {
      ref,
      className: cls("ds-page-header", className),
      "data-has-tabs": tabs ? "true" : void 0,
      "data-compact": compact ? "true" : void 0,
      ...rest,
      children: [
        breadcrumb ? /* @__PURE__ */ jsx("div", { className: "ds-page-header__breadcrumb", children: breadcrumb }) : null,
        /* @__PURE__ */ jsxs("div", { className: "ds-page-header__main", children: [
          /* @__PURE__ */ jsxs("div", { className: "ds-page-header__heading", children: [
            /* @__PURE__ */ jsxs("div", { className: "ds-page-header__title-row", children: [
              /* @__PURE__ */ jsx(Heading, { className: "ds-page-header__title", children: title }),
              status ? /* @__PURE__ */ jsx("span", { className: "ds-page-header__status", children: status }) : null
            ] }),
            description ? /* @__PURE__ */ jsx("p", { className: "ds-page-header__description", children: description }) : null,
            meta ? /* @__PURE__ */ jsx("div", { className: "ds-page-header__meta", children: meta }) : null
          ] }),
          hasActions ? /* @__PURE__ */ jsxs("div", { ref: actionsRef, className: "ds-page-header__actions", children: [
            inline.map(renderInline),
            overflow.length > 0 ? /* @__PURE__ */ jsxs(DropdownMenu, { open: menuOpen, onOpenChange: setMenuOpen, placement: "bottom-end", children: [
              /* @__PURE__ */ jsxs(DropdownMenuTrigger, { ref: moreRef, className: cls(PAGE_HEADER_MORE_TRIGGER_CLASS, "ds-page-header__more"), children: [
                MoreIcon,
                /* @__PURE__ */ jsx("span", { className: "ds-page-header__more-label", children: moreActionsLabel })
              ] }),
              /* @__PURE__ */ jsx(DropdownMenuContent, { children: overflow.map(renderMenuItem) })
            ] }) : null,
            primaryAction ? /* @__PURE__ */ jsx("span", { className: "ds-page-header__primary", children: primaryAction }) : null
          ] }) : null
        ] }),
        tabs ? /* @__PURE__ */ jsx("div", { className: "ds-page-header__tabs", children: tabs }) : null
      ]
    }
  );
});
PageHeader.displayName = "PageHeader";
var PageHeader_default = PageHeader;

export {
  PageHeader,
  PageHeader_default
};
//# sourceMappingURL=chunk-5YD5E4ES.mjs.map