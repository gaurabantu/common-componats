export interface DividerProps {
  children?: React.ReactNode;
  className?: string;
  /** "horizontal" | "vertical" or "row" | "column" (row = horizontal, column = vertical) */
  orientation?: "horizontal" | "vertical" | "row" | "column";
  length?: string;
  thickness?: string | number;
  /** Line colour. Default: `--color-border-subtle` (Ion Mist-60 on light; same token as modal/card/tab separators). */
  color?: string;
  variant?: "solid" | "dashed" | "dotted";
  align?: "start" | "center" | "end";
  /** When children present: "above" = line above text, "center" = lines both sides, "below" = line below text */
  textPosition?: "above" | "center" | "below";
  margin?: string | number;
  inset?: string | number;
  style?: React.CSSProperties;
}