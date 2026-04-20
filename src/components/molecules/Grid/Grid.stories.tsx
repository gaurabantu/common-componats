import type { Meta, StoryObj } from "@storybook/react";
import Card from "../Card";
import Grid, { GridItem } from "./index";

const meta: Meta<typeof Grid> = {
  title: "Design System/Molecules/Grid",
  component: Grid,
  tags: ["autodocs"],
  parameters: { layout: "padded", storyMedium: true },
};

export default meta;

type Story = StoryObj<typeof Grid>;

export const FixedColumns: Story = {
  render: (args) => (
    <Grid {...args}>
      <Card title="Card 1">First grid item</Card>
      <Card title="Card 2">Second grid item</Card>
      <Card title="Card 3">Third grid item</Card>
      <Card title="Card 4">Fourth grid item</Card>
    </Grid>
  ),
  args: {
    columns: 2,
    gap: 20,
  },
};

export const AutoFit: Story = {
  render: (args) => (
    <Grid {...args}>
      <Card title="Analytics">Responsive cards resize automatically.</Card>
      <Card title="Revenue">Use `autoFit` for dashboard-like layouts.</Card>
      <Card title="Activity">Each card keeps a readable minimum width.</Card>
      <Card title="Users">Works well in app pages and Storybook.</Card>
    </Grid>
  ),
  args: {
    autoFit: true,
    minItemWidth: 220,
    gap: 20,
  },
};

export const WithSpans: Story = {
  render: (args) => (
    <Grid {...args}>
      <GridItem span={2}>
        <Card title="Overview" subtitle="Spans both columns">
          Larger cards can stretch across multiple columns.
        </Card>
      </GridItem>
      <Card title="Users">Smaller card</Card>
      <Card title="Sessions">Smaller card</Card>
      <GridItem span={2}>
        <Card
          title="Insights"
          subtitle="Full-width content"
          actions={<a href="#">View report</a>}
        >
          Use `GridItem span={2}` for sections that should occupy the full row.
        </Card>
      </GridItem>
    </Grid>
  ),
  args: {
    columns: 2,
    gap: 20,
  },
};
