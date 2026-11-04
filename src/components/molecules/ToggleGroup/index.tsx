"use client";

import React, { Children, isValidElement, useCallback, useMemo, useRef, useState } from "react";
import ToggleButton from "../../atoms/ToggleButton";
import { ToggleGroupContext, type ToggleGroupContextValue } from "../../atoms/ToggleButton/ToggleGroupContext";
import type { ToggleGroupProps } from "./ToggleGroup.types";
import "./ToggleGroup.css";

function cls(...parts: (string | false | undefined)[]): string {
  return parts.filter(Boolean).join(" ");
}

function toArray(v: string | string[] | null | undefined): string[] {
  if (Array.isArray(v)) return v;
  return v ? [v] : [];
}

/**
 * A set of `ToggleButton`s sharing state — `type="single"` (alignment) or `type="multiple"`
 * (Bold / Italic / Underline). Renders `role="group"` with `aria-pressed` buttons and a roving
 * tabindex (one Tab stop; ←/→ or ↑/↓, Home, End move focus; Space / Enter toggle).
 */
function ToggleGroup(props: ToggleGroupProps) {
  const {
    items,
    children,
    ariaLabel,
    "aria-labelledby": ariaLabelledBy,
    size = "sm",
    variant = "ghost",
    disabled = false,
    orientation = "horizontal",
    rovingFocus = true,
    className,
    id,
    type,
  } = props;

  const controlled = props.value !== undefined;
  const [internal, setInternal] = useState<string[]>(() => toArray(props.defaultValue));
  const selected = controlled ? toArray(props.value) : internal;

  const itemValues = useMemo(() => {
    if (items) return items.filter((i) => !i.disabled).map((i) => i.value);
    const out: string[] = [];
    Children.forEach(children, (child) => {
      if (isValidElement<{ value?: string; disabled?: boolean }>(child) && typeof child.props.value === "string" && !child.props.disabled) {
        out.push(child.props.value);
      }
    });
    return out;
  }, [items, children]);

  const [focused, setFocused] = useState<string | null>(null);
  const tabStop = !rovingFocus
    ? null
    : focused && itemValues.includes(focused)
      ? focused
      : selected.find((v) => itemValues.includes(v)) ?? itemValues[0] ?? null;

  const commit = useCallback(
    (next: string[]) => {
      if (!controlled) setInternal(next);
      if (type === "single") {
        (props as Extract<ToggleGroupProps, { type: "single" }>).onValueChange?.(next[0] ?? null);
      } else {
        (props as Extract<ToggleGroupProps, { type: "multiple" }>).onValueChange?.(next);
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [controlled, type, props.onValueChange],
  );

  const allowDeselect = type === "single" ? (props as Extract<ToggleGroupProps, { type: "single" }>).allowDeselect ?? true : true;

  const ctx = useMemo<ToggleGroupContextValue>(
    () => ({
      isPressed: (v) => selected.includes(v),
      toggle: (v) => {
        const on = selected.includes(v);
        if (type === "single") {
          if (on) {
            if (allowDeselect) commit([]);
          } else commit([v]);
        } else {
          commit(on ? selected.filter((x) => x !== v) : [...selected, v]);
        }
      },
      size,
      variant,
      disabled,
      tabStop: tabStop,
      setTabStop: setFocused,
    }),
    [selected, type, allowDeselect, commit, size, variant, disabled, tabStop],
  );

  const rootRef = useRef<HTMLDivElement>(null);
  const onKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (!rovingFocus || !rootRef.current) return;
    const prevKey = orientation === "vertical" ? "ArrowUp" : "ArrowLeft";
    const nextKey = orientation === "vertical" ? "ArrowDown" : "ArrowRight";
    if (![prevKey, nextKey, "Home", "End"].includes(e.key)) return;
    const buttons = Array.from(
      rootRef.current.querySelectorAll<HTMLButtonElement>("button[data-ucs-toggle-item]:not(:disabled)"),
    );
    if (buttons.length === 0) return;
    const current = buttons.indexOf(document.activeElement as HTMLButtonElement);
    let next = current;
    if (e.key === "Home") next = 0;
    else if (e.key === "End") next = buttons.length - 1;
    else if (e.key === nextKey) next = (current + 1) % buttons.length;
    else next = (current - 1 + buttons.length) % buttons.length;
    e.preventDefault();
    buttons[next].focus();
  };

  return (
    <ToggleGroupContext.Provider value={ctx}>
      <div
        ref={rootRef}
        id={id}
        role="group"
        aria-label={ariaLabel}
        aria-labelledby={ariaLabelledBy}
        data-orientation={orientation}
        data-type={type}
        className={cls("ucs-toggle-group", className)}
        onKeyDown={onKeyDown}
      >
        {items
          ? items.map((it) => (
              <ToggleButton
                key={it.value}
                value={it.value}
                icon={it.icon}
                ariaLabel={it.ariaLabel}
                disabled={it.disabled}
                title={it.title}
              >
                {it.label}
              </ToggleButton>
            ))
          : children}
      </div>
    </ToggleGroupContext.Provider>
  );
}

ToggleGroup.displayName = "ToggleGroup";

export default ToggleGroup;
export type {
  ToggleGroupProps,
  ToggleGroupSingleProps,
  ToggleGroupMultipleProps,
  ToggleGroupItem,
} from "./ToggleGroup.types";
