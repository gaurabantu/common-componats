/* ucs:component-css */
import "./styles/components/atoms/Hyperlink/Hyperlink.css";
import {
  isSafeHref
} from "./chunk-2SUDH5VN.mjs";

// src/components/atoms/Hyperlink/index.tsx
import React2 from "react";

// src/components/atoms/Hyperlink/Hyperlink.config.ts
var HYPERLINK_DEFAULTS = {
  href: "#",
  variant: "default",
  size: "md",
  newTabLabel: "(opens in new tab)"
};
var HYPERLINK_DEFAULT_UNDERLINE = {
  default: "hover",
  subtle: "hover",
  inline: "always",
  standalone: "hover"
};

// src/components/atoms/Hyperlink/Hyperlink.slot.tsx
import React, { cloneElement, isValidElement } from "react";
function getElementRef(element) {
  const major = parseInt(React.version, 10);
  if (major >= 19)
    return element.props.ref;
  return element.ref;
}
function setRef(ref, value) {
  if (typeof ref === "function")
    ref(value);
  else if (ref && typeof ref === "object")
    ref.current = value;
}
function renderLinkSlot(children, slotProps, ref, options) {
  const child = React.Children.only(children);
  if (!isValidElement(child)) {
    throw new Error("Hyperlink with asChild expects a single React element child");
  }
  const childProps = child.props;
  const childRef = getElementRef(child);
  const merged = { ...childProps };
  for (const key of Object.keys(slotProps)) {
    const slotValue = slotProps[key];
    const childValue = childProps[key];
    if (slotValue === void 0)
      continue;
    if (/^on[A-Z]/.test(key) && typeof slotValue === "function") {
      merged[key] = typeof childValue === "function" ? (event, ...args) => {
        childValue(event, ...args);
        if (event && event.defaultPrevented)
          return;
        slotValue(event, ...args);
      } : slotValue;
    } else if (key === "className") {
      merged[key] = [childValue, slotValue].filter(Boolean).join(" ") || void 0;
    } else if (key === "style") {
      merged[key] = { ...slotValue, ...childValue };
    } else if (childValue === void 0) {
      merged[key] = slotValue;
    }
  }
  const finalProps = options.finalize(merged);
  finalProps.ref = (node) => {
    setRef(ref, node);
    setRef(childRef, node);
  };
  delete finalProps.children;
  return cloneElement(
    child,
    finalProps,
    options.renderChildren(childProps.children)
  );
}

// src/components/atoms/Hyperlink/Hyperlink.utils.ts
var cls = (...classes) => classes.filter(Boolean).join(" ");

// src/components/atoms/Hyperlink/index.tsx
import { Fragment, jsx, jsxs } from "react/jsx-runtime";
function sanitizeHref(href) {
  if (href === void 0 || href === null)
    return void 0;
  if (typeof href === "string")
    return isSafeHref(href) ? href : void 0;
  if (typeof href === "object") {
    const url = href;
    for (const key of ["href", "pathname"]) {
      const v = url[key];
      if (typeof v === "string" && !isSafeHref(v))
        return void 0;
    }
    if (typeof url.protocol === "string") {
      const protocol = url.protocol.endsWith(":") ? url.protocol : `${url.protocol}:`;
      if (!isSafeHref(`${protocol}//placeholder.invalid/`))
        return void 0;
    }
    return href;
  }
  return void 0;
}
function mergeRel(rel, secure) {
  const tokens = typeof rel === "string" ? rel.split(/\s+/).filter(Boolean) : [];
  if (secure)
    tokens.push("noopener", "noreferrer");
  const unique = tokens.filter((t, i) => tokens.indexOf(t) === i);
  return unique.length ? unique.join(" ") : void 0;
}
function ExternalIcon() {
  return /* @__PURE__ */ jsx("span", { className: "ds-hyperlink__icon ds-hyperlink__icon--external", "aria-hidden": "true", children: /* @__PURE__ */ jsx("svg", { viewBox: "0 0 16 16", width: "1em", height: "1em", fill: "none", focusable: "false", children: /* @__PURE__ */ jsx(
    "path",
    {
      d: "M9 2.5h4.5V7M13.5 2.5 7 9M11.5 9.5v3a1 1 0 0 1-1 1h-7a1 1 0 0 1-1-1v-7a1 1 0 0 1 1-1h3",
      stroke: "currentColor",
      strokeWidth: "1.5",
      strokeLinecap: "round",
      strokeLinejoin: "round"
    }
  ) }) });
}
var Hyperlink = React2.forwardRef(function Hyperlink2({
  children,
  href,
  variant = HYPERLINK_DEFAULTS.variant,
  underline,
  size,
  leadingIcon,
  trailingIcon,
  openInNewTab = false,
  external,
  disabled = false,
  asChild = false,
  newTabLabel = HYPERLINK_DEFAULTS.newTabLabel,
  className,
  target,
  rel,
  onClick,
  ...rest
}, ref) {
  const childTarget = asChild && React2.isValidElement(children) ? children.props.target : void 0;
  const isNewTab = openInNewTab || target === "_blank" || childTarget === "_blank";
  const isExternal = external != null ? external : isNewTab;
  const resolvedUnderline = underline != null ? underline : HYPERLINK_DEFAULT_UNDERLINE[variant];
  const resolvedSize = size != null ? size : variant === "inline" ? void 0 : HYPERLINK_DEFAULTS.size;
  const renderContent = (text) => /* @__PURE__ */ jsxs(Fragment, { children: [
    leadingIcon ? /* @__PURE__ */ jsx("span", { className: "ds-hyperlink__icon", "aria-hidden": "true", children: leadingIcon }) : null,
    text,
    trailingIcon ? /* @__PURE__ */ jsx("span", { className: "ds-hyperlink__icon", "aria-hidden": "true", children: trailingIcon }) : null,
    isExternal && !disabled ? /* @__PURE__ */ jsx(ExternalIcon, {}) : null,
    isNewTab && !disabled ? /* @__PURE__ */ jsx("span", { className: "ds-hyperlink__sr-only", children: ` ${newTabLabel}` }) : null
  ] });
  const swallowClick = (event) => {
    event.preventDefault();
  };
  const visualProps = {
    className: cls("ds-hyperlink", className),
    "data-variant": variant,
    "data-underline": resolvedUnderline,
    "data-size": resolvedSize,
    "data-disabled": disabled ? "" : void 0,
    "data-external": isExternal ? "" : void 0
  };
  const enforce = (props, keepHrefWhenDisabled) => {
    const next = { ...props };
    next.href = sanitizeHref(next.href);
    if (disabled) {
      if (!keepHrefWhenDisabled)
        next.href = void 0;
      next.target = void 0;
      next.rel = void 0;
      next.role = "link";
      next["aria-disabled"] = true;
      next.tabIndex = -1;
      next.onClick = swallowClick;
    } else {
      next.target = isNewTab ? "_blank" : next.target;
      next.rel = mergeRel(next.rel, isExternal || isNewTab);
    }
    return next;
  };
  if (asChild) {
    return renderLinkSlot(
      children,
      { ...rest, ...visualProps, href, target, rel, onClick },
      ref,
      {
        renderChildren: renderContent,
        // Router links (e.g. Next.js <Link>) require `href`; keep it when disabled — clicks and focus are still blocked.
        finalize: (merged) => enforce(merged, true)
      }
    );
  }
  const anchorProps = enforce(
    { ...rest, ...visualProps, href: href != null ? href : HYPERLINK_DEFAULTS.href, target, rel, onClick },
    false
  );
  return /* @__PURE__ */ jsx("a", { ref, ...anchorProps, children: renderContent(children) });
});
Hyperlink.displayName = "Hyperlink";
var Hyperlink_default = Hyperlink;

export {
  Hyperlink,
  Hyperlink_default
};
//# sourceMappingURL=chunk-4MMFDMKK.mjs.map