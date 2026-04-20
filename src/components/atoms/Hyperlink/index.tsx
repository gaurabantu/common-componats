import React from "react";
import { HyperlinkProps } from "./Hyperlink.types";
import { hyperlinkBaseClass, defaultLinkColor } from "./Hyperlink.config";
import { cls } from "./Hyperlink.utils";

export const Hyperlink: React.FC<HyperlinkProps> = ({
  children,
  href = "#",
  disabled = false,
  className = "",
  openInNewTab = false,
}) => {
  return (
    <a
      href={disabled ? undefined : href}
      className={cls(
        hyperlinkBaseClass,
        disabled && "disabled",
        className
      )}
      style={{ color: defaultLinkColor }}
      target={openInNewTab ? "_blank" : "_self"}
      rel={openInNewTab ? "noopener noreferrer" : ""}
      onClick={(e) => disabled && e.preventDefault()}
    >
      {children}
    </a>
  );
};

export default Hyperlink;