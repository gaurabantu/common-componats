import React, { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import Calendar from "./index";

const meta: Meta<typeof Calendar> = {
  title: "Design System/Molecules/Calendar",
  component: Calendar,
  tags: ["autodocs"],
  argTypes: {
    disabled: { control: "boolean" },
    readOnly: { control: "boolean" },
    showWeekNumbers: { control: "boolean" },
    fullWidth: { control: "boolean" },
    firstDayOfWeek: { control: "select", options: [0, 1] },
    mode: { control: "select", options: ["single", "range"] },
    animation: { control: "select", options: ["none", "slide", "fade", "scale"] },
    cellHoverAnimation: { control: "boolean" },
    variant: { control: "select", options: ["outlined", "elevated", "filled"] },
    elevation: { control: "select", options: ["none", "sm", "md", "lg"] },
    bordered: { control: "boolean" },
    hoverable: { control: "boolean" },
    size: { control: "select", options: ["sm", "md", "lg"] },
    captionLayout: { control: "radio", options: ["label", "dropdown"] },
  },
};

export default meta;

type Story = StoryObj<typeof Calendar>;

const ControlledSingle = (args: any) => {
  const [value, setValue] = useState<Date | null>(args.value ?? null);
  return (
    <Calendar
      {...args}
      value={value}
      onChange={setValue}
    />
  );
};

const ControlledRange = (args: any) => {
  const [range, setRange] = useState<[Date | null, Date | null]>(
    args.rangeValue ?? [null, null]
  );
  return (
    <Calendar
      {...args}
      mode="range"
      rangeValue={range}
      onRangeChange={setRange}
    />
  );
};

export const Default: Story = {
  render: (args) => <ControlledSingle {...args} />,
  args: {
    fullWidth: false,
    captionLayout: "label",
    variant: "outlined",
    elevation: "none",
    bordered: true,
  },
};

/** Month/year as a single centered title (shadcn-style); use `captionLayout="dropdown"` for selects. */
export const CaptionLabel: Story = {
  render: (args) => <ControlledSingle {...args} />,
  args: {
    fullWidth: false,
    captionLayout: "label",
    variant: "outlined",
    elevation: "none",
    bordered: true,
  },
};

export const WithValue: Story = {
  render: (args) => <ControlledSingle {...args} />,
  args: {
    value: new Date(2025, 0, 15),
    fullWidth: false,
  },
};

export const WithMinMax: Story = {
  render: (args) => <ControlledSingle {...args} />,
  args: {
    minDate: new Date(2025, 0, 1),
    maxDate: new Date(2025, 11, 31),
    fullWidth: false,
  },
};

export const RangeMode: Story = {
  render: (args) => <ControlledRange {...args} />,
  args: {
    fullWidth: false,
  },
};

export const RangeWithValue: Story = {
  render: (args) => <ControlledRange {...args} />,
  args: {
    rangeValue: [
      new Date(2025, 0, 10),
      new Date(2025, 0, 20),
    ],
    fullWidth: false,
  },
};

export const MondayFirst: Story = {
  render: (args) => <ControlledSingle {...args} />,
  args: {
    firstDayOfWeek: 1,
    fullWidth: false,
  },
};

export const WithWeekNumbers: Story = {
  render: (args) => <ControlledSingle {...args} />,
  args: {
    showWeekNumbers: true,
    fullWidth: false,
  },
};

export const CustomCellRender: Story = {
  render: (args) => <ControlledSingle {...args} />,
  args: {
    dateCellRender: (date) => {
      const day = date.getDate();
      const hasEvent = [5, 12, 19].includes(day);
      return (
        <span style={{ position: "relative" }}>
          {day}
          {hasEvent && (
            <span
              style={{
                position: "absolute",
                bottom: 2,
                left: "50%",
                transform: "translateX(-50%)",
                width: 4,
                height: 4,
                borderRadius: "50%",
                background: "var(--button-primary-default-bg, #2563EB)",
              }}
            />
          )}
        </span>
      );
    },
    fullWidth: false,
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    value: new Date(2025, 0, 15),
    fullWidth: false,
  },
};

export const ReadOnly: Story = {
  render: (args) => <ControlledSingle {...args} />,
  args: {
    value: new Date(2025, 0, 15),
    readOnly: true,
    fullWidth: false,
  },
};

export const WithAnimations: Story = {
  render: (args) => <ControlledSingle {...args} />,
  args: {
    animation: "slide",
    cellHoverAnimation: true,
    variant: "elevated",
    fullWidth: false,
  },
};

export const FadeAnimation: Story = {
  render: (args) => <ControlledSingle {...args} />,
  args: {
    animation: "fade",
    variant: "elevated",
    fullWidth: false,
  },
};

export const ScaleAnimation: Story = {
  render: (args) => <ControlledSingle {...args} />,
  args: {
    animation: "scale",
    variant: "elevated",
    fullWidth: false,
  },
};

export const NoAnimation: Story = {
  render: (args) => <ControlledSingle {...args} />,
  args: {
    animation: "none",
    cellHoverAnimation: false,
    variant: "outlined",
    fullWidth: false,
  },
};

export const ElevatedVariant: Story = {
  render: (args) => <ControlledSingle {...args} />,
  args: {
    variant: "elevated",
    elevation: "md",
    animation: "slide",
    fullWidth: false,
  },
};

export const OutlinedVariant: Story = {
  render: (args) => <ControlledSingle {...args} />,
  args: {
    variant: "outlined",
    elevation: "none",
    bordered: true,
    fullWidth: false,
  },
};

export const FilledVariant: Story = {
  render: (args) => <ControlledSingle {...args} />,
  args: {
    variant: "filled",
    elevation: "sm",
    fullWidth: false,
  },
};

export const CardElevationLevels: Story = {
  render: (args) => (
    <div style={{ display: "flex", gap: 32, flexWrap: "wrap", alignItems: "flex-start" }}>
      <div style={{ textAlign: "center" }}>
        <div style={{ fontSize: 12, color: "#6B7280", marginBottom: 8 }}>none</div>
        <ControlledSingle {...args} elevation="none" />
      </div>
      <div style={{ textAlign: "center" }}>
        <div style={{ fontSize: 12, color: "#6B7280", marginBottom: 8 }}>sm</div>
        <ControlledSingle {...args} elevation="sm" />
      </div>
      <div style={{ textAlign: "center" }}>
        <div style={{ fontSize: 12, color: "#6B7280", marginBottom: 8 }}>md</div>
        <ControlledSingle {...args} elevation="md" />
      </div>
      <div style={{ textAlign: "center" }}>
        <div style={{ fontSize: 12, color: "#6B7280", marginBottom: 8 }}>lg</div>
        <ControlledSingle {...args} elevation="lg" />
      </div>
    </div>
  ),
  args: {
    variant: "elevated",
    bordered: false,
    fullWidth: false,
  },
};

export const Hoverable: Story = {
  render: (args) => <ControlledSingle {...args} />,
  args: {
    variant: "elevated",
    hoverable: true,
    elevation: "md",
    fullWidth: false,
  },
};

export const CustomRadius: Story = {
  render: (args) => <ControlledSingle {...args} />,
  args: {
    radius: 24,
    variant: "elevated",
    fullWidth: false,
  },
};

export const CustomTheme: Story = {
  render: (args) => <ControlledSingle {...args} />,
  args: {
    theme: {
      primary: "#7C3AED",
      primaryText: "#FFFFFF",
      rangeBackground: "#EDE9FE",
      todayBackground: "#FEF3C7",
      todayRing: "rgba(217, 119, 6, 0.5)",
      text: "#1F2937",
      textSecondary: "#6B7280",
      borderRadius: 20,
      cellRadius: 12,
    },
    fullWidth: false,
  },
};

export const GreenTheme: Story = {
  render: (args) => <ControlledSingle {...args} />,
  args: {
    theme: {
      primary: "#059669",
      rangeBackground: "#D1FAE5",
      todayBackground: "#ECFDF5",
    },
    fullWidth: false,
  },
};

export const SmallSize: Story = {
  render: (args) => <ControlledSingle {...args} />,
  args: {
    size: "sm",
    fullWidth: false,
  },
};

export const LargeSize: Story = {
  render: (args) => <ControlledSingle {...args} />,
  args: {
    size: "lg",
    fullWidth: false,
  },
};

export const WithStyleOverrides: Story = {
  render: (args) => <ControlledSingle {...args} />,
  args: {
    theme: { primary: "#DC2626" },
    styles: {
      header: { borderBottom: "1px solid #E5E7EB", paddingBottom: 12 },
      weekday: { color: "#9CA3AF" },
    },
    fullWidth: false,
  },
};
