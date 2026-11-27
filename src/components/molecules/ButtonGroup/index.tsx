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
import { BUTTON_GROUP_DEFAULTS } from "./ButtonGroup.config";
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

interface CascadeProps {
  className?: string;
  size?: unknown;
  variant?: unknown;
  disabled?: boolean;
}

/**
 * Mark direct `Button` children as segments and cascade group `size` / `variant` / `disabled`.
 * Child props always win: a value is only injected when the child leaves the prop `undefined`.
 */
function augmentChildren(children: React.ReactNode, ctx: ButtonGroupContextValue): React.ReactNode {
  return Children.map(Children.toArray(children), (child) => {
    if (!isValidElement(child)) return child;
    if (child.type === Button) {
      const el = child as React.ReactElement<CascadeProps>;
      const next: CascadeProps = {
        className: cls("ds-button-group__segment", el.props.className),
      };
      if (el.props.size === undefined && ctx.size !== undefined) next.size = ctx.size;
      if (el.props.variant === undefined && ctx.variant !== undefined) next.variant = ctx.variant;
      if (el.props.disabled === undefined && ctx.disabled) next.disabled = true;
      return cloneElement(el, next);
    }
    return child;
  });
}

/**
 * Optional access to the nearest group (returns `null` outside a `ButtonGroup`).
 * Lets components other than direct `Button` children (e.g. a Button wrapped in a ToolTip)
 * read the group's size / variant / disabled.
 */
export function useButtonGroupContext(): ButtonGroupContextValue | null {
  return useContext(ButtonGroupContext);
}

const ButtonGroupImpl = React.forwardRef<HTMLDivElement, ButtonGroupProps>(function ButtonGroup(
  {
    children,
    orientation = BUTTON_GROUP_DEFAULTS.orientation,
    attached = BUTTON_GROUP_DEFAULTS.attached,
    size,
    variant,
    disabled,
    fullWidth = BUTTON_GROUP_DEFAULTS.fullWidth,
    className,
    ...rest
  },
  ref,
) {
  const parent = useContext(ButtonGroupContext);
  // Nested groups inherit size / variant from the parent unless they set their own; disabled is OR-ed.
  const effectiveSize = size ?? parent?.size;
  const effectiveVariant = variant ?? parent?.variant;
  const effectiveDisabled = Boolean(disabled ?? BUTTON_GROUP_DEFAULTS.disabled) || Boolean(parent?.disabled);

  const ctx = useMemo<ButtonGroupContextValue>(
    () => ({
      orientation,
      attached,
      size: effectiveSize,
      variant: effectiveVariant,
      disabled: effectiveDisabled,
    }),
    [orientation, attached, effectiveSize, effectiveVariant, effectiveDisabled],
  );

  return (
    <ButtonGroupContext.Provider value={ctx}>
      <div
        ref={ref}
        role="group"
        className={cls("ds-button-group", className)}
        data-orientation={orientation}
        data-attached={attached ? "true" : "false"}
        data-full-width={fullWidth ? "true" : undefined}
        aria-disabled={effectiveDisabled ? true : undefined}
        {...rest}
      >
        {augmentChildren(children, ctx)}
      </div>
    </ButtonGroupContext.Provider>
  );
});
ButtonGroupImpl.displayName = "ButtonGroup";

/**
 * Groups related buttons under `role="group"` (give it an `aria-label`). Joined by default
 * (`attached`); `size` / `variant` / `disabled` cascade to direct `Button` children (child props win).
 */
export const ButtonGroup = React.memo(ButtonGroupImpl);
ButtonGroup.displayName = "ButtonGroup";

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
  ButtonGroupSize,
  ButtonGroupVariant,
} from "./ButtonGroup.types";
