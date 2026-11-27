/* ucs:component-css */
import "./styles/components/molecules/List/List.css";
import {
  isSafeHref
} from "./chunk-2SUDH5VN.mjs";

// src/components/molecules/List/index.tsx
import React from "react";

// src/components/molecules/List/List.config.ts
var LIST_DEFAULTS = {
  divided: true,
  bordered: false,
  size: "md"
};

// src/components/molecules/List/index.tsx
import { jsx, jsxs } from "react/jsx-runtime";
function cls(...parts) {
  return parts.filter(Boolean).join(" ");
}
var List = React.forwardRef(function List2({
  children,
  divided = LIST_DEFAULTS.divided,
  bordered = LIST_DEFAULTS.bordered,
  size = LIST_DEFAULTS.size,
  ordered = false,
  className,
  ...rest
}, ref) {
  const Tag = ordered ? "ol" : "ul";
  return /* @__PURE__ */ jsx(
    Tag,
    {
      ref,
      className: cls("ds-list", className),
      "data-divided": divided ? "true" : "false",
      "data-bordered": bordered ? "true" : "false",
      "data-size": size,
      ...rest,
      children
    }
  );
});
var ListItem = React.forwardRef(function ListItem2({
  leading,
  title,
  href,
  target,
  badge,
  description,
  meta,
  action,
  selected = false,
  disabled = false,
  className,
  ...rest
}, ref) {
  const titleNode = href && !disabled && isSafeHref(href) ? /* @__PURE__ */ jsx(
    "a",
    {
      className: "ds-list-item__link",
      href,
      target,
      rel: target === "_blank" ? "noopener noreferrer" : void 0,
      children: title
    }
  ) : title;
  return /* @__PURE__ */ jsxs(
    "li",
    {
      ref,
      className: cls("ds-list-item", className),
      "data-selected": selected ? "true" : void 0,
      "data-disabled": disabled ? "true" : void 0,
      "aria-current": selected ? "true" : void 0,
      "aria-disabled": disabled ? "true" : void 0,
      ...rest,
      children: [
        leading ? /* @__PURE__ */ jsx("span", { className: "ds-list-item__leading", children: leading }) : null,
        /* @__PURE__ */ jsxs("div", { className: "ds-list-item__body", children: [
          /* @__PURE__ */ jsxs("div", { className: "ds-list-item__heading", children: [
            /* @__PURE__ */ jsx("span", { className: "ds-list-item__title", children: titleNode }),
            badge
          ] }),
          description ? /* @__PURE__ */ jsx("p", { className: "ds-list-item__description", children: description }) : null
        ] }),
        meta || action ? /* @__PURE__ */ jsxs("div", { className: "ds-list-item__trail", children: [
          meta ? /* @__PURE__ */ jsx("span", { className: "ds-list-item__meta", children: meta }) : null,
          action
        ] }) : null
      ]
    }
  );
});
List.displayName = "List";
ListItem.displayName = "ListItem";
var List_default = List;

export {
  List,
  ListItem,
  List_default
};
//# sourceMappingURL=chunk-7NZDVSAU.mjs.map