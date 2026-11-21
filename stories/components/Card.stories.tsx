import type { Meta, StoryObj } from '@storybook/react-vite';
import { Badge, Button, Card, CardBody, CardFooter, CardHeader, CardTitle, Stack } from '../../src/react';
import { html } from '../html';

const meta = {
  title: 'Components/Card',
  component: Card,
  args: { variant: 'default' },
  argTypes: {
    variant: { control: 'inline-radio', options: ['default', 'raised', 'sunken', 'oak', 'oak-frame'] },
  },
  render: (args) => (
    <Card {...args} style={{ maxWidth: 360 }}>
      <CardHeader>
        <CardTitle>Groceries</CardTitle>
        <Badge tone="success">On track</Badge>
      </CardHeader>
      <CardBody>
        <p className="pds-text">2,350 of 3,000 kr spent this month.</p>
      </CardBody>
      <CardFooter>
        <Button variant="ghost" size="sm">Details</Button>
        <Button variant="primary" size="sm">Add expense</Button>
      </CardFooter>
    </Card>
  ),
} satisfies Meta<typeof Card>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const AllVariants: Story = {
  render: () => (
    <Stack direction="row" gap="6" wrap align="start">
      {(['default', 'raised', 'sunken', 'oak', 'oak-frame'] as const).map((variant) => (
        <Card key={variant} variant={variant} style={{ width: 220 }}>
          <CardHeader>
            <CardTitle>{variant}</CardTitle>
          </CardHeader>
          <CardBody>
            <p className="pds-text pds-text--sm">variant="{variant}"</p>
          </CardBody>
        </Card>
      ))}
    </Stack>
  ),
};

export const PlainHTML: Story = {
  name: 'Plain HTML / CSS',
  ...html(`
<div class="pds-card pds-card--oak" style="max-width: 320px">
  <div class="pds-card__header">
    <h3 class="pds-card__title">Oak panel</h3>
  </div>
  <div class="pds-card__body">
    <p class="pds-text">Wood grain is pure CSS, so there are no images to load.</p>
  </div>
</div>`),
};
