import {
  Icon_default
} from "./chunk-6JJMOGWW.mjs";

// src/components/atoms/Avatar/index.tsx
import React from "react";

// src/components/atoms/Avatar/Avatar.config.ts
var defaultAvatarSize = 40;
var defaultStatusPosition = "bottom-right";
var defaultBackgroundColor = "var(--color-accent-lavender-10)";
var defaultIconColor = "var(--color-text-on-accent)";

// src/components/atoms/Avatar/index.tsx
import { jsx, jsxs } from "react/jsx-runtime";
var Avatar = ({
  src,
  alt = "",
  name,
  initials,
  icon,
  fallback,
  size = defaultAvatarSize,
  shape = "circle",
  rounded = "4",
  status = "online",
  statusColor,
  statusPosition = defaultStatusPosition,
  color,
  backgroundColor = defaultBackgroundColor,
  textColor = "var(--color-text-primary)",
  iconColor = defaultIconColor,
  iconSize,
  preserveColors = false,
  bordered = false,
  borderColor = "var(--color-border-soft, rgba(153, 153, 153, 0.35))",
  className = "",
  style
}) => {
  const statusSize = size / 5;
  const offset = statusSize / 6;
  const calculatedIconSize = iconSize || size / 2;
  const resolvedInitials = initials || (name == null ? void 0 : name.split(" ").filter(Boolean).slice(0, 2).map((part) => {
    var _a, _b;
    return (_b = (_a = part[0]) == null ? void 0 : _a.toUpperCase()) != null ? _b : "";
  }).join("")) || "";
  const resolvedBackgroundColor = color || backgroundColor;
  const getStatusStyle = () => {
    const baseStyle = {
      width: statusSize,
      height: statusSize,
      position: "absolute",
      borderRadius: "9999px",
      border: "2px solid var(--color-bg-surface)",
      backgroundColor: statusColor || (status === "online" ? "var(--color-state-success)" : status === "busy" ? "var(--color-state-error)" : status === "away" ? "var(--color-state-warning)" : status === "offline" ? "var(--color-text-secondary)" : "transparent")
    };
    switch (statusPosition) {
      case "top-left":
        return { ...baseStyle, top: offset, left: offset };
      case "top-right":
        return { ...baseStyle, top: offset, right: offset };
      case "bottom-left":
        return { ...baseStyle, bottom: offset, left: offset };
      case "bottom-right":
      default:
        return { ...baseStyle, bottom: offset, right: offset };
    }
  };
  const renderContent = () => {
    var _a, _b, _c, _d, _e;
    if (fallback)
      return fallback;
    if (resolvedInitials) {
      return /* @__PURE__ */ jsx(
        "span",
        {
          style: {
            fontSize: `${Math.max(12, size / 2.6)}px`,
            fontWeight: 700,
            lineHeight: 1,
            letterSpacing: "0.02em"
          },
          children: resolvedInitials
        }
      );
    }
    if (!icon)
      return /* @__PURE__ */ jsx("span", { style: { fontSize: `${size / 2.5}px`, fontWeight: 600 }, children: "?" });
    if (typeof icon === "string") {
      return /* @__PURE__ */ jsx(
        Icon_default,
        {
          src: icon,
          color: iconColor,
          width: calculatedIconSize,
          height: calculatedIconSize,
          preserveColors
        }
      );
    }
    if (React.isValidElement(icon)) {
      return React.cloneElement(icon, {
        color: iconColor,
        width: ((_a = icon.props) == null ? void 0 : _a.width) || calculatedIconSize,
        height: ((_b = icon.props) == null ? void 0 : _b.height) || calculatedIconSize,
        size: calculatedIconSize,
        preserveColors: (_d = (_c = icon.props) == null ? void 0 : _c.preserveColors) != null ? _d : preserveColors,
        style: { color: iconColor, ...((_e = icon.props) == null ? void 0 : _e.style) || {} }
      });
    }
    return icon;
  };
  return /* @__PURE__ */ jsxs(
    "div",
    {
      className,
      style: {
        position: "relative",
        width: size,
        height: size,
        flexShrink: 0,
        ...style
      },
      children: [
        src ? /* @__PURE__ */ jsx(
          "img",
          {
            src,
            alt: alt || name || "avatar",
            width: size,
            height: size,
            style: {
              width: size,
              height: size,
              objectFit: "cover",
              display: "block",
              borderRadius: shape === "circle" ? "50%" : shape === "square" ? 0 : rounded === "0" ? 0 : rounded === "1" ? "var(--radius-xs, 2px)" : rounded === "2" ? "var(--radius-sm, 3px)" : rounded === "3" ? "var(--radius-base, 4px)" : rounded === "4" ? "var(--radius-md, 6px)" : "var(--radius-lg, 8px)",
              border: bordered ? `1.5px solid ${borderColor}` : void 0,
              boxSizing: "border-box",
              background: "var(--color-bg-surface)"
            }
          }
        ) : /* @__PURE__ */ jsx(
          "div",
          {
            style: {
              width: size,
              height: size,
              backgroundColor: resolvedBackgroundColor,
              color: icon ? iconColor : textColor,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: shape === "circle" ? "50%" : shape === "square" ? 0 : rounded === "0" ? 0 : rounded === "1" ? "var(--radius-xs, 2px)" : rounded === "2" ? "var(--radius-sm, 3px)" : rounded === "3" ? "var(--radius-base, 4px)" : rounded === "4" ? "var(--radius-md, 6px)" : "var(--radius-lg, 8px)",
              border: bordered ? `1.5px solid ${borderColor}` : void 0,
              boxSizing: "border-box"
            },
            children: renderContent()
          }
        ),
        status !== "none" && /* @__PURE__ */ jsx("span", { style: getStatusStyle() })
      ]
    }
  );
};
var Avatar_default = Avatar;

export {
  Avatar_default
};
//# sourceMappingURL=chunk-JKDK3NKC.mjs.map