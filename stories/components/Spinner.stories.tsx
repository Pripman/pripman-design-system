import type { Meta, StoryObj } from '@storybook/react-vite';
import { Spinner, Stack } from '../../src/react';
import { html } from '../html';

const meta = {
  title: 'Components/Spinner',
  component: Spinner,
  argTypes: { size: { control: 'inline-radio', options: ['sm', 'md', 'lg'] } },
} satisfies Meta<typeof Spinner>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const Sizes: Story = {
  render: () => (
    <Stack direction="row" gap="4" align="center">
      <Spinner size="sm" />
      <Spinner />
      <Spinner size="lg" />
    </Stack>
  ),
};

export const PlainHTML: Story = {
  name: 'Plain HTML / CSS',
  ...html(`<span class="pds-spinner" role="status" aria-label="Loading"></span>
<span class="pds-spinner pds-spinner--lg" role="status" aria-label="Loading"></span>`),
};
