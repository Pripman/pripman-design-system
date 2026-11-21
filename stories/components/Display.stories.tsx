import type { Meta, StoryObj } from '@storybook/react-vite';
import { Badge, DigitalDisplay, Stack } from '../../src/react';
import { html } from '../html';

const meta = {
  title: 'Components/Badge & DigitalDisplay',
  component: DigitalDisplay,
  args: { value: '120.0', label: 'BPM', size: 'md' },
  argTypes: { size: { control: 'inline-radio', options: ['sm', 'md', 'lg'] } },
} satisfies Meta<typeof DigitalDisplay>;
export default meta;
type Story = StoryObj<typeof meta>;

export const DigitalDisplayPlayground: Story = { name: 'DigitalDisplay' };

export const DisplaySizes: Story = {
  render: () => (
    <Stack direction="row" gap="4" align="end">
      <DigitalDisplay size="sm" value="4/4" label="Meter" />
      <DigitalDisplay value="00:42.17" label="Time" />
      <DigitalDisplay size="lg" value="128" label="BPM" />
    </Stack>
  ),
};

export const Badges: Story = {
  render: () => (
    <Stack direction="row" gap="2" wrap>
      <Badge>Neutral</Badge>
      <Badge tone="primary">Primary</Badge>
      <Badge tone="success">Paid</Badge>
      <Badge tone="warning">Due soon</Badge>
      <Badge tone="danger">Overdue</Badge>
      <Badge tone="info">Info</Badge>
      <Badge tone="oak">Oak</Badge>
    </Stack>
  ),
};

export const PlainHTML: Story = {
  name: 'Plain HTML / CSS',
  ...html(`
<div class="pds-stack pds-stack--row">
  <div class="pds-digital">
    <span class="pds-digital__value">96.0</span>
    <span class="pds-digital__label">BPM</span>
  </div>
  <span class="pds-badge pds-badge--success">Recording</span>
</div>`),
};
