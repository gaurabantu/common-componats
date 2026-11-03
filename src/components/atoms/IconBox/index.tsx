"use client";

import React from "react";
import { ICON_BOX_DEFAULTS } from "./IconBox.config";
import type { IconBoxProps } from "./IconBox.types";
import "./IconBox.css";

/**
 * IconBox — fixed-size container that gives a leading icon a consistent footprint
 * (list rows, option tiles, stat cards, empty states). Decorative unless `label` is set.
 */
const IconBox = React.memo(function IconBox({
  children,
  tone = ICON_BOX_DEFAULTS.tone,
  size = ICON_BOX_DEFAULTS.size,
  shape = ICON_BOX_DEFAULTS.shape,
  label,
  className,
  ...rest
}: IconBoxProps) {
  return (
    <span
      className={["ds-icon-box", className].filter(Boolean).join(" ")}
      data-tone={tone}
      data-size={size}
      data-shape={shape}
      role={label ? "img" : undefined}
      aria-label={label}
      aria-hidden={label ? undefined : true}
      {...rest}
    >
      {children}
    </span>
  );
});

export default IconBox;
export type { IconBoxProps, IconBoxTone, IconBoxSize, IconBoxShape } from "./IconBox.types";
