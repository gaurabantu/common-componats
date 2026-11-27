"use client";

import React from "react";
import Avatar from "../Avatar";
import type { AvatarProps } from "../Avatar/Avatar.types";
import { Popover, PopoverContent, PopoverTrigger } from "../../molecules/Popover";
import { AVATAR_GROUP_DEFAULTS, overflowLabel, resolveAvatarSize } from "./AvatarGroup.config";
import type { AvatarGroupItem, AvatarGroupProps } from "./AvatarGroup.types";
import "./AvatarGroup.css";

function cls(...parts: (string | false | undefined | null)[]): string {
  return parts.filter(Boolean).join(" ");
}

interface Person {
  key: React.Key;
  name?: string;
  props: AvatarProps;
}

function fromItems(items: AvatarGroupItem[]): Person[] {
  return items.map(({ id, ...props }, index) => ({
    key: id ?? index,
    name: props.name ?? (props.alt || undefined),
    props,
  }));
}

function fromChildren(children: React.ReactNode): Person[] {
  return React.Children.toArray(children)
    .filter((child): child is React.ReactElement<AvatarProps> => React.isValidElement(child))
    .map((child, index) => {
      const props = child.props;
      return { key: child.key ?? index, name: props.name ?? (props.alt || undefined), props };
    });
}

/**
 * AvatarGroup — overlapping row of `Avtar`s (`role="group"` + label) with a "+N" overflow chip.
 * The chip is a button whose accessible name lists the hidden people; it opens a popover with the
 * full list (or calls `onOverflowClick`).
 */
const AvatarGroup = React.forwardRef<HTMLDivElement, AvatarGroupProps>(function AvatarGroup(
  {
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
  },
  ref,
) {
  const people = children != null ? fromChildren(children) : fromItems(items ?? []);
  const px = resolveAvatarSize(size);
  const limit = Math.max(0, Math.floor(max));
  const visible = people.slice(0, limit);
  const hidden = people.slice(limit);
  const totalCount = Math.max(total ?? people.length, people.length);
  const hiddenCount = totalCount - visible.length;
  const hiddenNames = hidden.map((p) => p.name).filter((n): n is string => Boolean(n));
  const chipLabel = overflowLabel(hiddenCount, hiddenNames);
  const groupLabel = rest["aria-labelledby"]
    ? rest["aria-label"]
    : (rest["aria-label"] ?? label ?? `${totalCount} ${totalCount === 1 ? "person" : "people"}`);

  const renderAvatar = (person: Person, avatarSize: number) => (
    <Avatar {...person.props} size={avatarSize} status={person.props.status ?? "none"} />
  );

  const chipContent = renderOverflow ? renderOverflow(hiddenCount) : `+${hiddenCount}`;

  let chip: React.ReactNode = null;
  if (hiddenCount > 0) {
    if (onOverflowClick) {
      chip = (
        <button type="button" className="ds-avatar-group__overflow" aria-label={chipLabel} onClick={onOverflowClick}>
          <span aria-hidden="true">{chipContent}</span>
        </button>
      );
    } else if (hidden.length === 0) {
      // Only a server-side `total` is known — nothing to list, so the chip is informational (not a control).
      chip = (
        <span
          className="ds-avatar-group__overflow"
          data-static="true"
          role="img"
          aria-label={`${hiddenCount} more ${hiddenCount === 1 ? "person" : "people"}`}
        >
          <span aria-hidden="true">{chipContent}</span>
        </span>
      );
    } else {
      chip = (
        <Popover placement="bottom-start">
          <PopoverTrigger className="ds-avatar-group__overflow" aria-label={chipLabel} hasPopup="dialog">
            <span aria-hidden="true">{chipContent}</span>
          </PopoverTrigger>
          <PopoverContent
            showPointer={false}
            aria-label={`${hiddenCount} more ${hiddenCount === 1 ? "person" : "people"}`}
            className="ds-avatar-group__popover"
          >
            <ul className="ds-avatar-group__list" tabIndex={0}>
              {hidden.map((person) => (
                <li key={person.key} className="ds-avatar-group__list-item">
                  <span aria-hidden="true" className="ds-avatar-group__list-avatar">
                    {renderAvatar(person, 24)}
                  </span>
                  <span className="ds-avatar-group__list-name">{person.name ?? "Unnamed"}</span>
                </li>
              ))}
              {hiddenCount > hidden.length ? (
                <li className="ds-avatar-group__list-item ds-avatar-group__list-more">
                  {`and ${hiddenCount - hidden.length} more`}
                </li>
              ) : null}
            </ul>
          </PopoverContent>
        </Popover>
      );
    }
  }

  return (
    <div
      {...rest}
      ref={ref}
      role="group"
      aria-label={groupLabel}
      className={cls("ds-avatar-group", className)}
      data-spacing={spacing}
      style={{ ["--ag-size" as string]: `${px}px`, ...style } as React.CSSProperties}
    >
      {visible.map((person) =>
        person.name ? (
          <span key={person.key} className="ds-avatar-group__item" role="img" aria-label={person.name}>
            <span aria-hidden="true" className="ds-avatar-group__avatar">
              {renderAvatar(person, px)}
            </span>
          </span>
        ) : (
          <span key={person.key} className="ds-avatar-group__item" aria-hidden="true">
            <span className="ds-avatar-group__avatar">{renderAvatar(person, px)}</span>
          </span>
        ),
      )}
      {chip}
    </div>
  );
});

AvatarGroup.displayName = "AvatarGroup";

export default AvatarGroup;
export { AvatarGroup };
export type { AvatarGroupProps, AvatarGroupItem, AvatarGroupSize, AvatarGroupSpacing } from "./AvatarGroup.types";
