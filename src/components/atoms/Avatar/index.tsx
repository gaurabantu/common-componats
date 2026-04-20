import React from 'react';
import { AvatarProps } from './Avatar.types';
import {
  defaultAvatarSize,
  defaultStatusPosition,
  defaultBackgroundColor,
  defaultIconColor,
} from './Avatar.config';
import Icon from '../Icon';

const Avatar: React.FC<AvatarProps> = ({
  src,
  alt = '',
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
  textColor = "var(--color-text-primary, #0D0D0D)",
  iconColor = defaultIconColor,
  iconSize,
  preserveColors = false,
  bordered = false,
  borderColor = "rgba(153, 153, 153, 0.35)",
  className = '',
  style,
}) => {
  const statusSize = size / 5;
  const offset = statusSize / 6;
  const calculatedIconSize = iconSize || size / 2;

  const resolvedInitials =
    initials ||
    name
      ?.split(" ")
      .filter(Boolean)
      .slice(0, 2)
      .map((part) => part[0]?.toUpperCase() ?? "")
      .join("") ||
    "";

  const resolvedBackgroundColor = color || backgroundColor;

  const getStatusStyle = () => {
    const baseStyle: React.CSSProperties = {
      width: statusSize,
      height: statusSize,
      position: "absolute",
      borderRadius: "9999px",
      border: "2px solid var(--color-bg-surface, #FFFFFF)",
      backgroundColor:
        statusColor ||
        (status === "online"
          ? "var(--color-state-success, #28A745)"
          : status === "busy"
            ? "var(--color-state-error, #DC3545)"
            : status === "away"
              ? "var(--color-state-warning, #FFC107)"
              : status === "offline"
                ? "var(--color-text-secondary, #757575)"
                : "transparent"),
    };

    switch (statusPosition) {
      case 'top-left':
        return { ...baseStyle, top: offset, left: offset };
      case 'top-right':
        return { ...baseStyle, top: offset, right: offset };
      case 'bottom-left':
        return { ...baseStyle, bottom: offset, left: offset };
      case 'bottom-right':
      default:
        return { ...baseStyle, bottom: offset, right: offset };
    }
  };

  const renderContent = () => {
    if (fallback) return fallback;
    if (resolvedInitials) {
      return (
        <span
          style={{
            fontSize: `${Math.max(12, size / 2.6)}px`,
            fontWeight: 700,
            lineHeight: 1,
            letterSpacing: "0.02em",
          }}
        >
          {resolvedInitials}
        </span>
      );
    }

    if (!icon) return <span style={{ fontSize: `${size / 2.5}px`, fontWeight: 600 }}>?</span>;

    if (typeof icon === 'string') {
      return (
        <Icon
          src={icon}
          color={iconColor}
          width={calculatedIconSize}
          height={calculatedIconSize}
          preserveColors={preserveColors}
        />
      );
    }

    if (React.isValidElement(icon)) {
      return React.cloneElement(icon as React.ReactElement<any>, {
        color: iconColor,
        width: (icon as any).props?.width || calculatedIconSize,
        height: (icon as any).props?.height || calculatedIconSize,
        size: calculatedIconSize,
        preserveColors: (icon as any).props?.preserveColors ?? preserveColors,
        style: { color: iconColor, ...((icon as any).props?.style || {}) },
      });
    }

    return icon;
  };

  return (
    <div
      className={className}
      style={{
        position: "relative",
        width: size,
        height: size,
        flexShrink: 0,
        ...style,
      }}
    >
      {src ? (
        <img
          src={src}
          alt={alt || name || 'avatar'}
          width={size}
          height={size}
          style={{
            width: size,
            height: size,
            objectFit: "cover",
            display: "block",
            borderRadius:
              shape === "circle"
                ? "50%"
                : shape === "square"
                  ? 0
                  : rounded === "0"
                    ? 0
                    : rounded === "1"
                      ? "var(--radius-xs, 2px)"
                      : rounded === "2"
                        ? "var(--radius-sm, 3px)"
                        : rounded === "3"
                          ? "var(--radius-base, 4px)"
                          : rounded === "4"
                            ? "var(--radius-md, 6px)"
                            : "var(--radius-lg, 8px)",
            border: bordered ? `1.5px solid ${borderColor}` : undefined,
            boxSizing: "border-box",
            background: "var(--color-bg-surface, #FFFFFF)",
          }}
        />
      ) : (
        <div
          style={{
            width: size,
            height: size,
            backgroundColor: resolvedBackgroundColor,
            color: icon ? iconColor : textColor,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            borderRadius:
              shape === "circle"
                ? "50%"
                : shape === "square"
                  ? 0
                  : rounded === "0"
                    ? 0
                    : rounded === "1"
                      ? "var(--radius-xs, 2px)"
                      : rounded === "2"
                        ? "var(--radius-sm, 3px)"
                        : rounded === "3"
                          ? "var(--radius-base, 4px)"
                          : rounded === "4"
                            ? "var(--radius-md, 6px)"
                            : "var(--radius-lg, 8px)",
            border: bordered ? `1.5px solid ${borderColor}` : undefined,
            boxSizing: "border-box",
          }}
        >
          {renderContent()}
        </div>
      )}
      {status !== "none" && <span style={getStatusStyle()} />}
    </div>
  );
};

export default Avatar;