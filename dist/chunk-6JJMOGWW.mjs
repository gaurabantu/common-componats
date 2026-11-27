// src/components/atoms/Icon/index.tsx
import React from "react";
import { jsx } from "react/jsx-runtime";
function resolveSrc(src) {
  if (typeof src === "string")
    return src;
  if (React.isValidElement(src))
    return null;
  if (typeof src === "object" && src !== null) {
    if ("src" in src && typeof src.src === "string")
      return src.src;
    if ("default" in src && typeof src.default === "string")
      return src.default;
  }
  return null;
}
function isSvgSource(url) {
  const u = url.toLowerCase();
  return u.includes(".svg") || url.startsWith("data:image/svg+xml");
}
function cssUrl(href) {
  return `url(${JSON.stringify(href)})`;
}
var Icon = React.memo(function Icon2({
  src,
  alt = "",
  color = "currentColor",
  width = 16,
  height = 16,
  className = "",
  style = {},
  preserveColors = false,
  decorative,
  title,
  ...rest
}) {
  const resolvedSrc = resolveSrc(src);
  const isDecorative = decorative != null ? decorative : !alt;
  const wrapperStyle = {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    width: typeof width === "number" ? width : width,
    height: typeof height === "number" ? height : height,
    verticalAlign: "middle",
    lineHeight: 0,
    flexShrink: 0,
    ...style
  };
  const wrapperProps = {
    className,
    style: wrapperStyle,
    role: isDecorative ? void 0 : "img",
    "aria-hidden": isDecorative ? true : void 0,
    "aria-label": isDecorative ? void 0 : alt,
    title: typeof title === "string" ? title : alt || void 0,
    ...rest
  };
  if (React.isValidElement(src)) {
    const size = width;
    const sizeHeight = height != null ? height : width;
    const childProps = src.props;
    const childStyle = (childProps == null ? void 0 : childProps.style) || {};
    const mergedStyle = {
      width: size,
      height: sizeHeight,
      color: !preserveColors ? color : void 0,
      ...childStyle
    };
    const child = React.cloneElement(src, {
      width: size,
      height: sizeHeight,
      style: mergedStyle
    });
    return /* @__PURE__ */ jsx("span", { ...wrapperProps, children: child });
  }
  if (!resolvedSrc) {
    return /* @__PURE__ */ jsx("span", { ...wrapperProps });
  }
  const isSvg = isSvgSource(resolvedSrc);
  if (isSvg && !preserveColors) {
    const maskRef = cssUrl(resolvedSrc);
    return /* @__PURE__ */ jsx(
      "span",
      {
        ...wrapperProps,
        style: {
          ...wrapperStyle,
          display: "inline-block",
          backgroundColor: color,
          WebkitMaskImage: maskRef,
          maskImage: maskRef,
          WebkitMaskRepeat: "no-repeat",
          maskRepeat: "no-repeat",
          WebkitMaskPosition: "center",
          maskPosition: "center",
          WebkitMaskSize: "contain",
          maskSize: "contain"
        }
      }
    );
  }
  return /* @__PURE__ */ jsx("span", { ...wrapperProps, children: /* @__PURE__ */ jsx(
    "img",
    {
      src: resolvedSrc,
      alt: isDecorative ? "" : alt,
      width: typeof width === "number" ? width : void 0,
      height: typeof height === "number" ? height : void 0,
      style: { width, height, objectFit: "contain", display: "block" },
      loading: "lazy",
      decoding: "async"
    }
  ) });
});
var Icon_default = Icon;

export {
  Icon_default
};
//# sourceMappingURL=chunk-6JJMOGWW.mjs.map