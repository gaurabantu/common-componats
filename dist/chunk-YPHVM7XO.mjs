/* ucs:component-css */
import "./styles/components/atoms/AvatarGroup/AvatarGroup.css";
import {
  Avatar_default
} from "./chunk-JKDK3NKC.mjs";
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from "./chunk-UP5YH5MZ.mjs";

// src/components/atoms/AvatarGroup/index.tsx
import React from "react";

// src/components/atoms/AvatarGroup/AvatarGroup.config.ts
var AVATAR_GROUP_DEFAULTS = {
  max: 4,
  size: "md",
  spacing: "normal"
};
var AVATAR_GROUP_SIZE_PX = { xs: 24, sm: 32, md: 40, lg: 48 };
var AVATAR_GROUP_MAX_SPOKEN_NAMES = 10;
function resolveAvatarSize(size) {
  return typeof size === "number" ? size : AVATAR_GROUP_SIZE_PX[size];
}
function overflowLabel(hiddenCount, hiddenNames) {
  const base = `Show ${hiddenCount} more`;
  if (hiddenNames.length === 0)
    return base;
  const spoken = hiddenNames.slice(0, AVATAR_GROUP_MAX_SPOKEN_NAMES);
  const rest = hiddenCount - spoken.length;
  return `${base}: ${spoken.join(", ")}${rest > 0 ? ` and ${rest} other${rest === 1 ? "" : "s"}` : ""}`;
}

// src/components/atoms/AvatarGroup/index.tsx
import { jsx, jsxs } from "react/jsx-runtime";
function cls(...parts) {
  return parts.filter(Boolean).join(" ");
}
function fromItems(items) {
  return items.map(({ id, ...props }, index) => {
    var _a;
    return {
      key: id != null ? id : index,
      name: (_a = props.name) != null ? _a : props.alt || void 0,
      props
    };
  });
}
function fromChildren(children) {
  return React.Children.toArray(children).filter((child) => React.isValidElement(child)).map((child, index) => {
    var _a, _b;
    const props = child.props;
    return { key: (_a = child.key) != null ? _a : index, name: (_b = props.name) != null ? _b : props.alt || void 0, props };
  });
}
var AvatarGroup = React.forwardRef(function AvatarGroup2({
  items,
  children,
  max = AVATAR_GROUP_DEFAULTS.max,
  total,
  size = AVATAR_GROUP_DEFAULTS.size,
  spacing = AVATAR_GROUP_DEFAULTS.spacing,
  label,
  onOverflowClick,
  renderOverflow,
  className,
  style,
  ...rest
}, ref) {
  var _a, _b;
  const people = children != null ? fromChildren(children) : fromItems(items != null ? items : []);
  const px = resolveAvatarSize(size);
  const limit = Math.max(0, Math.floor(max));
  const visible = people.slice(0, limit);
  const hidden = people.slice(limit);
  const totalCount = Math.max(total != null ? total : people.length, people.length);
  const hiddenCount = totalCount - visible.length;
  const hiddenNames = hidden.map((p) => p.name).filter((n) => Boolean(n));
  const chipLabel = overflowLabel(hiddenCount, hiddenNames);
  const groupLabel = rest["aria-labelledby"] ? rest["aria-label"] : (_b = (_a = rest["aria-label"]) != null ? _a : label) != null ? _b : `${totalCount} ${totalCount === 1 ? "person" : "people"}`;
  const renderAvatar = (person, avatarSize) => {
    var _a2;
    return /* @__PURE__ */ jsx(Avatar_default, { ...person.props, size: avatarSize, status: (_a2 = person.props.status) != null ? _a2 : "none" });
  };
  const chipContent = renderOverflow ? renderOverflow(hiddenCount) : `+${hiddenCount}`;
  let chip = null;
  if (hiddenCount > 0) {
    if (onOverflowClick) {
      chip = /* @__PURE__ */ jsx("button", { type: "button", className: "ds-avatar-group__overflow", "aria-label": chipLabel, onClick: onOverflowClick, children: /* @__PURE__ */ jsx("span", { "aria-hidden": "true", children: chipContent }) });
    } else if (hidden.length === 0) {
      chip = /* @__PURE__ */ jsx(
        "span",
        {
          className: "ds-avatar-group__overflow",
          "data-static": "true",
          role: "img",
          "aria-label": `${hiddenCount} more ${hiddenCount === 1 ? "person" : "people"}`,
          children: /* @__PURE__ */ jsx("span", { "aria-hidden": "true", children: chipContent })
        }
      );
    } else {
      chip = /* @__PURE__ */ jsxs(Popover, { placement: "bottom-start", children: [
        /* @__PURE__ */ jsx(PopoverTrigger, { className: "ds-avatar-group__overflow", "aria-label": chipLabel, hasPopup: "dialog", children: /* @__PURE__ */ jsx("span", { "aria-hidden": "true", children: chipContent }) }),
        /* @__PURE__ */ jsx(
          PopoverContent,
          {
            showPointer: false,
            "aria-label": `${hiddenCount} more ${hiddenCount === 1 ? "person" : "people"}`,
            className: "ds-avatar-group__popover",
            children: /* @__PURE__ */ jsxs("ul", { className: "ds-avatar-group__list", tabIndex: 0, children: [
              hidden.map((person) => {
                var _a2;
                return /* @__PURE__ */ jsxs("li", { className: "ds-avatar-group__list-item", children: [
                  /* @__PURE__ */ jsx("span", { "aria-hidden": "true", className: "ds-avatar-group__list-avatar", children: renderAvatar(person, 24) }),
                  /* @__PURE__ */ jsx("span", { className: "ds-avatar-group__list-name", children: (_a2 = person.name) != null ? _a2 : "Unnamed" })
                ] }, person.key);
              }),
              hiddenCount > hidden.length ? /* @__PURE__ */ jsx("li", { className: "ds-avatar-group__list-item ds-avatar-group__list-more", children: `and ${hiddenCount - hidden.length} more` }) : null
            ] })
          }
        )
      ] });
    }
  }
  return /* @__PURE__ */ jsxs(
    "div",
    {
      ...rest,
      ref,
      role: "group",
      "aria-label": groupLabel,
      className: cls("ds-avatar-group", className),
      "data-spacing": spacing,
      style: { ["--ag-size"]: `${px}px`, ...style },
      children: [
        visible.map(
          (person) => person.name ? /* @__PURE__ */ jsx("span", { className: "ds-avatar-group__item", role: "img", "aria-label": person.name, children: /* @__PURE__ */ jsx("span", { "aria-hidden": "true", className: "ds-avatar-group__avatar", children: renderAvatar(person, px) }) }, person.key) : /* @__PURE__ */ jsx("span", { className: "ds-avatar-group__item", "aria-hidden": "true", children: /* @__PURE__ */ jsx("span", { className: "ds-avatar-group__avatar", children: renderAvatar(person, px) }) }, person.key)
        ),
        chip
      ]
    }
  );
});
AvatarGroup.displayName = "AvatarGroup";
var AvatarGroup_default = AvatarGroup;

export {
  AvatarGroup,
  AvatarGroup_default
};
//# sourceMappingURL=chunk-YPHVM7XO.mjs.map