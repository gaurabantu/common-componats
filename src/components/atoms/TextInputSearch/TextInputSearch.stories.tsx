import type { Meta, StoryObj } from "@storybook/react";
import InputSearch from "./index";
import { useState } from "react";
import SearchIcon from "../../../assets/search.svg";

const meta: Meta<typeof InputSearch> = {
  title: "Design System/Atoms/InputSearch",
  component: InputSearch,
  tags: ["autodocs"],
  argTypes: {
    size: { control: "select", options: ["sm", "md", "lg", ""] },
    fullWidth: { control: "boolean" },
    disabled: { control: "boolean" },
  },
};

export default meta;

type Story = StoryObj<typeof InputSearch>;

const Controlled = (args: any) => {
  const [value, setValue] = useState(args.value ?? "");
  return (
    <InputSearch
      {...args}
      value={value}
      onChange={setValue}
    />
  );
};

export const Default: Story = {
  render: (args) => <Controlled {...args} />,
  args: {
    leftIcon: SearchIcon,
    placeholder: "Search...",
    value: "",
    fullWidth: true,
  },
};

export const MarketStandard: Story = {
  render: (args) => <Controlled {...args} />,
  args: {
    placeholder: "Search markets...",
    fullWidth: true,
  },
  parameters: {
    docs: {
      description: {
        story: "Market standard: left icon only, no right-side search or clear. Use showClearButton/showSearchButton to opt in.",
      },
    },
  },
};

export const SearchAction: Story = {
  render: (args) => {
    const Demo = () => {
      const [value, setValue] = useState("");
      const [searched, setSearched] = useState("");

      return (
        <div style={{ width: "100%", maxWidth: 520 }}>
          <InputSearch
            {...args}
            value={value}
            onChange={setValue}
            onSearch={setSearched}
          />
          <div
            style={{
              marginTop: 12,
              fontSize: "var(--text-small-size, 12px)",
              color: "var(--color-text-secondary, #757575)",
            }}
          >
            {searched ? `Search: ${searched}` : "Type text and press Enter or click Search"}
          </div>
        </div>
      );
    };

    return <Demo />;
  },
  args: {
    leftIcon: SearchIcon,
    placeholder: "Search here...",
    fullWidth: true,
    showSearchButton: true,
  },
};

export const WithClearButton: Story = {
  render: (args) => <Controlled {...args} />,
  args: {
    placeholder: "Search with clear...",
    fullWidth: true,
    showClearButton: true,
  },
};

export const WithValue: Story = {
  render: (args) => <Controlled {...args} />,
  args: {
    leftIcon: SearchIcon,
    placeholder: "Search...",
    value: "query",
    fullWidth: true,
  },
};

export const Sizes: Story = {
  render: () => {
    const [v1, setV1] = useState("");
    const [v2, setV2] = useState("");
    const [v3, setV3] = useState("");
    return (
      <div className="flex flex-col gap-3 max-w-md">
        <InputSearch
          leftIcon={SearchIcon}
          placeholder="Small"
          value={v1}
          onChange={setV1}
          size="sm"
          fullWidth
        />
        <InputSearch
          leftIcon={SearchIcon}
          placeholder="Default"
          value={v2}
          onChange={setV2}
          fullWidth
        />
        <InputSearch
          leftIcon={SearchIcon}
          placeholder="Large"
          value={v3}
          onChange={setV3}
          size="lg"
          fullWidth
        />
      </div>
    );
  },
};

export const FullWidth: Story = {
  render: (args) => (
    <div className="w-full max-w-xl">
      <Controlled {...args} />
    </div>
  ),
  args: {
    leftIcon: SearchIcon,
    placeholder: "Search (full width container)",
    fullWidth: true,
  },
};

export const Disabled: Story = {
  args: {
    leftIcon: SearchIcon,
    placeholder: "Search...",
    value: "disabled",
    disabled: true,
    fullWidth: true,
  },
};
