/* ucs:component-css */
import "./styles/components/molecules/Breadcrumb/Breadcrumb.css";
import {
  isSafeHref
} from "./chunk-2SUDH5VN.mjs";

// src/components/molecules/Breadcrumb/index.tsx
import React, {
  Children,
  cloneElement,
  createContext,
  isValidElement,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState
} from "react";

// src/components/molecules/Breadcrumb/Breadcrumb.config.ts
var BREADCRUMB_DEFAULTS = {
  ariaLabel: "Breadcrumb",
  separator: "slash",
  size: "sm",
  itemsBeforeCollapse: 1,
  itemsAfterCollapse: 1,
  responsiveCollapse: true
};
var BREADCRUMB_NARROW_QUERY = "(max-width: 640px)";
var BREADCRUMB_NARROW_MAX_ITEMS = 3;
var defaultExpandLabel = (hiddenCount) => `Show ${hiddenCount} more`;

// src/components/molecules/Breadcrumb/Breadcrumb.utils.ts
function getCollapseRange(total, maxItems, itemsBefore, itemsAfter) {
  const before = Math.max(0, Math.floor(itemsBefore));
  const after = Math.max(0, Math.floor(itemsAfter));
  const none = { collapsed: false, before: total, after: 0, hidden: 0 };
  if (maxItems === void 0 || !Number.isFinite(maxItems) || total <= maxItems)
    return none;
  if (before + after >= total)
    return none;
  return { collapsed: true, before, after, hidden: total - before - after };
}

// src/components/molecules/Breadcrumb/index.tsx
import { Fragment, jsx, jsxs } from "react/jsx-runtime";
function cls(...parts) {
  return parts.filter(Boolean).join(" ");
}
function isDev() {
  var _a;
  const env = (_a = globalThis.process) == null ? void 0 : _a.env;
  return (env == null ? void 0 : env.NODE_ENV) !== "production";
}
var BreadcrumbContext = createContext(null);
function useMatchMedia(query, enabled) {
  const [matches, setMatches] = useState(false);
  useEffect(() => {
    var _a;
    if (!enabled || typeof window === "undefined" || typeof window.matchMedia !== "function") {
      setMatches(false);
      return;
    }
    const mql = window.matchMedia(query);
    const update = () => setMatches(Boolean(mql.matches));
    update();
    if (typeof mql.addEventListener === "function") {
      mql.addEventListener("change", update);
      return () => mql.removeEventListener("change", update);
    }
    (_a = mql.addListener) == null ? void 0 : _a.call(mql, update);
    return () => {
      var _a2;
      return (_a2 = mql.removeListener) == null ? void 0 : _a2.call(mql, update);
    };
  }, [query, enabled]);
  return matches;
}
function SeparatorSlot() {
  const ctx = useContext(BreadcrumbContext);
  if ((ctx == null ? void 0 : ctx.separatorNode) === null || (ctx == null ? void 0 : ctx.separatorNode) === void 0)
    return null;
  return /* @__PURE__ */ jsx("span", { className: "ds-breadcrumb__separator", "aria-hidden": "true", children: ctx.separatorNode });
}
var BreadcrumbImpl = React.forwardRef(function Breadcrumb({
  ariaLabel = BREADCRUMB_DEFAULTS.ariaLabel,
  separator = BREADCRUMB_DEFAULTS.separator,
  size = BREADCRUMB_DEFAULTS.size,
  items,
  maxItems,
  itemsBeforeCollapse = BREADCRUMB_DEFAULTS.itemsBeforeCollapse,
  itemsAfterCollapse = BREADCRUMB_DEFAULTS.itemsAfterCollapse,
  responsiveCollapse = BREADCRUMB_DEFAULTS.responsiveCollapse,
  expandLabel = defaultExpandLabel,
  onExpand,
  renderLink,
  className,
  children,
  ...rest
}, ref) {
  const isBuiltIn = separator === "slash" || separator === "chevron";
  const isNone = separator === null || separator === false;
  const separatorAttr = isBuiltIn ? separator : isNone ? "none" : "custom";
  const separatorNode = isBuiltIn || isNone ? null : separator;
  const ctx = useMemo(
    () => ({ separatorNode, renderLink }),
    [separatorNode, renderLink]
  );
  useEffect(() => {
    if (isDev() && items && Children.count(children) > 0) {
      console.warn("[Breadcrumb] Both `items` and `children` were passed \u2014 `children` is ignored.");
    }
  }, [items, children]);
  const segments = useMemo(() => {
    if (items) {
      const anyCurrent = items.some((item) => item.current === true);
      return items.map((item, i) => {
        var _a, _b;
        return /* @__PURE__ */ jsx(
          BreadcrumbItem2,
          {
            href: item.href,
            icon: item.icon,
            current: (_b = item.current) != null ? _b : !anyCurrent && i === items.length - 1,
            renderLink: item.renderLink,
            linkProps: item.linkProps,
            children: item.label
          },
          (_a = item.key) != null ? _a : `bc-${i}`
        );
      });
    }
    return Children.toArray(children);
  }, [items, children]);
  const total = segments.length;
  const narrow = useMatchMedia(BREADCRUMB_NARROW_QUERY, responsiveCollapse);
  const [expandedFor, setExpandedFor] = useState(null);
  const expanded = expandedFor === total;
  const range = expanded ? getCollapseRange(total, void 0, 0, 0) : narrow ? getCollapseRange(
    total,
    Math.min(maxItems != null ? maxItems : Number.POSITIVE_INFINITY, BREADCRUMB_NARROW_MAX_ITEMS),
    Math.min(itemsBeforeCollapse, 1),
    Math.min(itemsAfterCollapse, 1)
  ) : getCollapseRange(total, maxItems, itemsBeforeCollapse, itemsAfterCollapse);
  const listRef = useRef(null);
  const focusIndexRef = useRef(null);
  const handleExpand = useCallback(() => {
    focusIndexRef.current = range.before;
    setExpandedFor(total);
    onExpand == null ? void 0 : onExpand();
  }, [range.before, total, onExpand]);
  useEffect(() => {
    var _a;
    const index = focusIndexRef.current;
    if (index === null || !expanded)
      return;
    focusIndexRef.current = null;
    const li = (_a = listRef.current) == null ? void 0 : _a.children[index];
    if (!li)
      return;
    const target = li.querySelector("a[href], button, [tabindex]");
    if (target) {
      target.focus();
    } else {
      li.setAttribute("tabindex", "-1");
      li.focus();
    }
  }, [expanded]);
  const visible = range.collapsed ? [
    ...segments.slice(0, range.before),
    /* @__PURE__ */ jsxs("li", { className: "ds-breadcrumb__item ds-breadcrumb__item--ellipsis", children: [
      /* @__PURE__ */ jsx(
        "button",
        {
          type: "button",
          className: "ds-breadcrumb__ellipsis",
          "aria-label": expandLabel(range.hidden),
          onClick: handleExpand,
          children: /* @__PURE__ */ jsx("span", { "aria-hidden": "true", children: "\u2026" })
        }
      ),
      /* @__PURE__ */ jsx(SeparatorSlot, {})
    ] }, "__bc-ellipsis"),
    ...segments.slice(total - range.after)
  ] : segments;
  return /* @__PURE__ */ jsx(BreadcrumbContext.Provider, { value: ctx, children: /* @__PURE__ */ jsx(
    "nav",
    {
      ref,
      "aria-label": ariaLabel,
      className: cls("ds-breadcrumb", className),
      "data-separator": separatorAttr,
      "data-size": size,
      "data-collapsed": range.collapsed ? "true" : void 0,
      ...rest,
      children: /* @__PURE__ */ jsx("ol", { ref: listRef, className: "ds-breadcrumb__list", children: visible })
    }
  ) });
});
BreadcrumbImpl.displayName = "Breadcrumb";
var Breadcrumb2 = React.memo(BreadcrumbImpl);
Breadcrumb2.displayName = "Breadcrumb";
var BreadcrumbItemImpl = React.forwardRef(
  function BreadcrumbItem({ href, current, icon, children, className, linkProps, asChild = false, renderLink, ...liRest }, ref) {
    const ctx = useContext(BreadcrumbContext);
    const linkRenderer = renderLink != null ? renderLink : ctx == null ? void 0 : ctx.renderLink;
    const content = icon ? /* @__PURE__ */ jsxs(Fragment, { children: [
      /* @__PURE__ */ jsx("span", { className: "ds-breadcrumb__icon", "aria-hidden": "true", children: icon }),
      /* @__PURE__ */ jsx("span", { className: "ds-breadcrumb__label", children })
    ] }) : children;
    if (asChild && isValidElement(children)) {
      const child = children;
      const isCurrent2 = current != null ? current : false;
      const childHref = child.props.href;
      const childSafe = typeof childHref !== "string" || isSafeHref(childHref);
      return /* @__PURE__ */ jsxs(
        "li",
        {
          ref,
          className: cls("ds-breadcrumb__item", isCurrent2 && "ds-breadcrumb__item--current", className),
          ...liRest,
          children: [
            childSafe ? cloneElement(child, {
              ...linkProps,
              className: cls(
                "ds-breadcrumb__link",
                isCurrent2 && "ds-breadcrumb__link--current",
                child.props.className
              ),
              ...isCurrent2 ? { "aria-current": "page" } : {}
            }) : /* @__PURE__ */ jsx("span", { className: "ds-breadcrumb__text ds-breadcrumb__text--plain", children: child.props.children }),
            /* @__PURE__ */ jsx(SeparatorSlot, {})
          ]
        }
      );
    }
    const hasHref = typeof href === "string" && href.length > 0;
    const safeHref = hasHref && isSafeHref(href) ? href : void 0;
    if (hasHref && !safeHref && isDev()) {
      console.warn(
        `[BreadcrumbItem] Refused unsafe href ${JSON.stringify(href)} \u2014 rendering text instead.`
      );
    }
    const isCurrent = current != null ? current : !hasHref;
    const renderAnchor = (linkClass, ariaCurrent) => {
      if (linkRenderer && safeHref) {
        return linkRenderer({
          href: safeHref,
          className: linkClass,
          "aria-current": ariaCurrent,
          children: content
        });
      }
      return /* @__PURE__ */ jsx("a", { href: safeHref, className: linkClass, "aria-current": ariaCurrent, ...linkProps, children: content });
    };
    if (safeHref && !isCurrent) {
      return /* @__PURE__ */ jsxs("li", { ref, className: cls("ds-breadcrumb__item", className), ...liRest, children: [
        renderAnchor(cls("ds-breadcrumb__link", icon ? "ds-breadcrumb__link--icon" : void 0)),
        /* @__PURE__ */ jsx(SeparatorSlot, {})
      ] });
    }
    if (!isCurrent) {
      return /* @__PURE__ */ jsxs("li", { ref, className: cls("ds-breadcrumb__item", className), ...liRest, children: [
        /* @__PURE__ */ jsx("span", { className: "ds-breadcrumb__text ds-breadcrumb__text--plain", children: content }),
        /* @__PURE__ */ jsx(SeparatorSlot, {})
      ] });
    }
    return /* @__PURE__ */ jsxs(
      "li",
      {
        ref,
        className: cls("ds-breadcrumb__item", "ds-breadcrumb__item--current", className),
        "aria-current": "page",
        ...liRest,
        children: [
          safeHref ? renderAnchor(
            cls(
              "ds-breadcrumb__link",
              "ds-breadcrumb__link--current",
              icon ? "ds-breadcrumb__link--icon" : void 0
            ),
            "page"
          ) : /* @__PURE__ */ jsx("span", { className: "ds-breadcrumb__text", children: content }),
          /* @__PURE__ */ jsx(SeparatorSlot, {})
        ]
      }
    );
  }
);
BreadcrumbItemImpl.displayName = "BreadcrumbItem";
var BreadcrumbItem2 = React.memo(BreadcrumbItemImpl);
BreadcrumbItem2.displayName = "BreadcrumbItem";
var Breadcrumb_default = Breadcrumb2;

export {
  Breadcrumb2 as Breadcrumb,
  BreadcrumbItem2 as BreadcrumbItem,
  Breadcrumb_default
};
//# sourceMappingURL=chunk-4Y2BVZ6R.mjs.map