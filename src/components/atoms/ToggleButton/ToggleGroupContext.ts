"use client";

import React from "react";
import type { ToggleButtonSize, ToggleButtonVariant } from "./ToggleButton.types";

/** Internal: lets `ToggleButton` children read state from an enclosing `ToggleGroup`. */
export interface ToggleGroupContextValue {
  isPressed: (value: string) => boolean;
  toggle: (value: string) => void;
  size?: ToggleButtonSize;
  variant?: ToggleButtonVariant;
  disabled?: boolean;
  /** Value of the item that is the group's single Tab stop (roving tabindex), or null when roving is off. */
  tabStop: string | null;
  setTabStop: (value: string) => void;
}

export const ToggleGroupContext = React.createContext<ToggleGroupContextValue | null>(null);
