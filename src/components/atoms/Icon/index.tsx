"use client";

import React from "react";

/**
 * Icon source: URL string, Next.js StaticImageData, Vite import, or inline React element.
 * Works in Next.js, Vite, Create React App, and other React setups.
 */
export type IconSource =
  | string
  | React.ReactNode
  | { src: string; width?: number; height?: number }
  | { default: string };

export interface IconProps extends Omit<React.HTMLAttributes<HTMLSpanElement>, "color"> {
  /** Icon source: URL, import path, StaticImageData, Vite import, or inline SVG/React element */
  src: IconSource;
  alt?: string;
  color?: string;
  width?: number | string;
  height?: number | string;
  preserveColors?: boolean;
  decorative?: boolean;
}

function resolveSrc(src: IconSource): string | null {
  if (typeof src === "string") return src;
  if (React.isValidElement(src)) return null;
  if (typeof src === "object" && src !== null) {
    if ("src" in src && typeof (src as { src: string }).src === "string") return (src as { src: string }).src;
    if ("default" in src && typeof (src as { default: string }).default === "string") return (src as { default: string }).default;
  }
  return null;
}

function isSvgSource(url: string): boolean {
  const u = url.toLowerCase();
  return u.includes(".svg") || url.startsWith("data:image/svg+xml");
}

/** Valid CSS url(...) for mask-image (handles quotes, spaces, &, data URLs). Raw `"url(${href})"` breaks when href contains " or ). */
function cssUrl(href: string): string {
  return `url(${JSON.stringify(href)})`;
}

const Icon = React.memo<IconProps>(function Icon({
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
  const isDecorative = decorative ?? !alt;

  const wrapperStyle: React.CSSProperties = {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    width: typeof width === "number" ? width : width,
    height: typeof height === "number" ? height : height,
    verticalAlign: "middle",
    lineHeight: 0,
    flexShrink: 0,
    ...style,
  };

  const wrapperProps = {
    className,
    style: wrapperStyle,
    role: isDecorative ? undefined : ("img" as const),
    "aria-hidden": isDecorative ? true : undefined,
    "aria-label": isDecorative ? undefined : alt,
    title: typeof title === "string" ? title : alt || undefined,
    ...rest,
  };

  // Inline SVG or React element — render inside sized wrapper
  if (React.isValidElement(src)) {
    const size = typeof width === "number" ? width : 16;
    const childProps = (src as React.ReactElement).props as Record<string, unknown>;
    const childStyle = (childProps?.style as React.CSSProperties) || {};
    const mergedStyle: React.CSSProperties = {
      width: size,
      height: size,
      color: !preserveColors ? color : undefined,
      ...childStyle,
    };
    const child = React.cloneElement(src as React.ReactElement<{ width?: number; height?: number; style?: React.CSSProperties }>, {
      width: size,
      height: size,
      style: mergedStyle,
    });
    return <span {...wrapperProps}>{child}</span>;
  }

  // No resolvable src (e.g. invalid)
  if (!resolvedSrc) {
    return <span {...wrapperProps} />;
  }

  const isSvg = isSvgSource(resolvedSrc);

  // SVG with color tint (mask) — no next/image, works in Vite
  // Use JSON.stringify inside url() so hrefs with ", ), &, or query strings don't break the mask
  // (raw template literals often produce a solid color block when the URL is invalid CSS).
  // display inline-block improves mask clipping vs inline-flex in some engines.
  if (isSvg && !preserveColors) {
    const maskRef = cssUrl(resolvedSrc);
    return (
      <span
        {...wrapperProps}
        style={{
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
          maskSize: "contain",
        }}
      />
    );
  }

  // Image (SVG with preserveColors, or PNG/JPG) — use plain img for Vite/Next compatibility
  return (
    <span {...wrapperProps}>
      <img
        src={resolvedSrc}
        alt={isDecorative ? "" : alt}
        width={typeof width === "number" ? width : undefined}
        height={typeof height === "number" ? height : undefined}
        style={{ width, height, objectFit: "contain", display: "block" }}
        loading="lazy"
        decoding="async"
      />
    </span>
  );
});

export default Icon;
