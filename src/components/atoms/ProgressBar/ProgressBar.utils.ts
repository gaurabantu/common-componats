import { ProgressBarProps } from "./ProgresBar.types";

export const computePercentage = ({
  value,
  stepCount,
  formCount,
}: ProgressBarProps) => {
  if (formCount && stepCount) {
    return Math.min(100, (stepCount / formCount) * 100);
  }
  return value;
};

export const clamp = (value: number, min = 0, max = 100) =>
  Math.max(min, Math.min(max, value));

export const calculateCircumference = (radius: number) => 2 * Math.PI * radius;
