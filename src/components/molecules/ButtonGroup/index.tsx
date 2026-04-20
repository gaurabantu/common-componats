"use client";

import React, {
  Children,
  cloneElement,
  createContext,
  isValidElement,
  useContext,
  useMemo,
} from "react";
import Button from "../../atoms/Button";
import type {
  ButtonGroupContextValue,
  ButtonGroupProps,
  ButtonGroupSeparatorProps,
  ButtonGroupTextProps,
} from "./ButtonGroup.types";
import "./ButtonGroup.css";

const ButtonGroupContext = createContext<ButtonGroupContextValue | null>(null);

function useButtonGroup(component: string): ButtonGroupContextValue {
  const ctx = useContext(ButtonGroupContext);
  if (!ctx) {
    throw new Error(`${component} must be used within <ButtonGroup>`);
  }
  return ctx;
}

function cls(...parts: (string | false | undefined)[]): string {
  return parts.filter(Boolean).join(" ");
}

function augmentChildren(children: React.ReactNode): React.ReactNode {
  return Children.map(Children.toArray(children), (child) => {
    if (!isValidElement(child)) return child;
    if (child.type === Button) {
      const el = child as React.ReactElement<{ className?: string }>;
      return cloneElement(el, {
        className: cls("ds-button-group__segment", el.props.className),
      });
    }
    return child;
  });
}

export const ButtonGroup = React.memo(function ButtonGroup({
  children,
  orientation = "horizontal",
  className,
  ...rest
}: ButtonGroupProps) {
  const ctx = useMemo(() => ({ orientation }), [orientation]);
  return (
    <ButtonGroupContext.Provider value={ctx}>
      <div
        role="group"
        className={cls("ds-button-group", className)}
        data-orientation={orientation}
        {...rest}
      >
        {augmentChildren(children)}
      </div>
    </ButtonGroupContext.Provider>
  );
});

export const ButtonGroupSeparator = React.memo(function ButtonGroupSeparator({
  orientation: orientationProp,
  className,
  ...rest
}: ButtonGroupSeparatorProps) {
  const { orientation: parentOrientation } = useButtonGroup("ButtonGroupSeparator");
  const orientation =
    orientationProp ?? (parentOrientation === "horizontal" ? "vertical" : "horizontal");

  return (
    <div
      role="separator"
      aria-orientation={orientation === "vertical" ? "vertical" : "horizontal"}
      className={cls("ds-button-group__separator", className)}
      data-orientation={orientation}
      {...rest}
    />
  );
});

export const ButtonGroupText = React.memo(function ButtonGroupText({
  children,
  className,
  asChild = false,
  ...rest
}: ButtonGroupTextProps) {
  if (asChild && isValidElement(children)) {
    const ch = children as React.ReactElement<{ className?: string }>;
    const childProps = ch.props;
    return cloneElement(ch, {
      ...(rest as Record<string, unknown>),
      ...childProps,
      className: cls("ds-button-group__text", childProps.className, className),
    } as { className?: string });
  }
  return (
    <span className={cls("ds-button-group__text", className)} {...rest}>
      {children}
    </span>
  );
});

export default ButtonGroup;

export type {
  ButtonGroupProps,
  ButtonGroupSeparatorProps,
  ButtonGroupTextProps,
  ButtonGroupContextValue,
  ButtonGroupOrientation,
} from "./ButtonGroup.types";
