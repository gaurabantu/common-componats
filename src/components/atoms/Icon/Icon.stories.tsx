import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import Icon from "./index";
import ErrorIcon from "../../../assets/error.svg";
import SuccessIcon from "../../../assets/success.svg";

const meta: Meta<typeof Icon> = {
  title: "Design System/Atoms/Icon",
  component: Icon,
  tags: ["autodocs"],
  argTypes: {
    width: { control: { type: "number", min: 12, max: 48 } },
    height: { control: { type: "number", min: 12, max: 48 } },
    color: { control: "color" },
  },
};

export default meta;

type Story = StoryObj<typeof Icon>;

export const Default: Story = {
  args: {
    src: ErrorIcon,
    alt: "Icon",
    width: 20,
    height: 20,
  },
};

export const Sizes: Story = {
  render: () => (
    <div className="flex items-end gap-4">
      <Icon src={ErrorIcon} width={16} height={16} alt="16px" />
      <Icon src={ErrorIcon} width={20} height={20} alt="20px" />
      <Icon src={ErrorIcon} width={24} height={24} alt="24px" />
    </div>
  ),
};

export const WithColor: Story = {
  args: {
    src: SuccessIcon,
    width: 24,
    height: 24,
    color: "var(--color-state-success)",
  },
};

export const PreserveOriginalColors: Story = {
  args: {
    src: SuccessIcon,
    width: 24,
    height: 24,
    preserveColors: true,
    alt: "Success icon",
    decorative: false,
  },
};

export const DesignSystemSizes: Story = {
  render: () => (
    <div className="flex flex-col gap-3">
      <div className="flex items-center gap-2">
        <Icon src={ErrorIcon} width={16} height={16} />
        <span className="text-secondary">Dense (16px) — inline text, metadata</span>
      </div>
      <div className="flex items-center gap-2">
        <Icon src={ErrorIcon} width={20} height={20} />
        <span className="text-secondary">UI default (20px) — buttons, form controls</span>
      </div>
      <div className="flex items-center gap-2">
        <Icon src={ErrorIcon} width={24} height={24} />
        <span className="text-secondary">Primary (24px) — navigation, key actions</span>
      </div>
    </div>
  ),
};

const InlineSvgIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <path d="M12 8v4l2 2" />
  </svg>
);

export const InlineSvg: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <Icon src={<InlineSvgIcon />} width={20} height={20} alt="Clock" />
      <Icon src={<InlineSvgIcon />} width={32} height={32} color="var(--color-state-success)" alt="Clock large" />
      <span className="text-secondary">Inline SVG — works without file imports, Vite/Next compatible</span>
    </div>
  ),
};

export const DataUrlSvg: Story = {
  args: {
    src: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='%2322c55e' stroke-width='2'%3E%3Cpath d='M22 11.08V12a10 10 0 1 1-5.93-9.14'/%3E%3Cpolyline points='22 4 12 14.01 9 11.01'/%3E%3C/svg%3E",
    width: 24,
    height: 24,
    alt: "Success (data URL)",
  },
};
