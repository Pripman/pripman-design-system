import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';
import { Button, Stack } from '../../src/react';
import { html } from '../html';

const meta = {
  title: 'Components/Button',
  component: Button,
  args: { children: 'Record', variant: 'primary', size: 'md', onClick: fn() },
  argTypes: {
    variant: { control: 'inline-radio', options: ['primary', 'secondary', 'oak', 'ghost', 'danger'] },
    size: { control: 'inline-radio', options: ['sm', 'md', 'lg'] },
  },
} satisfies Meta<typeof Button>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const Variants: Story = {
  render: (args) => (
    <Stack direction="row" gap="3" wrap>
      <Button {...args} variant="primary">Primary</Button>
      <Button {...args} variant="secondary">Secondary</Button>
      <Button {...args} variant="oak">Oak</Button>
      <Button {...args} variant="ghost">Ghost</Button>
      <Button {...args} variant="danger">Delete</Button>
      <Button {...args} variant="primary" disabled>Disabled</Button>
    </Stack>
  ),
};

export const Sizes: Story = {
  render: (args) => (
    <Stack direction="row" gap="3" align="center">
      <Button {...args} size="sm">Small</Button>
      <Button {...args} size="md">Medium</Button>
      <Button {...args} size="lg">Large</Button>
    </Stack>
  ),
};

const PlayIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M8 5v14l11-7z" />
  </svg>
);

export const IconOnly: Story = {
  render: (args) => (
    <Stack direction="row" gap="3" align="center">
      <Button {...args} iconOnly size="sm" aria-label="Play">
        <PlayIcon />
      </Button>
      <Button {...args} iconOnly aria-label="Play">
        <PlayIcon />
      </Button>
      <Button {...args} iconOnly size="lg" variant="oak" aria-label="Play">
        <PlayIcon />
      </Button>
      <Button {...args} size="lg" variant="secondary">
        <PlayIcon /> Play
      </Button>
    </Stack>
  ),
};

export const PlainHTML: Story = {
  name: 'Plain HTML / CSS',
  ...html(`
<div class="pds-stack pds-stack--row" style="--pds-stack-gap: var(--pds-space-3)">
  <button type="button" class="pds-button pds-button--primary">Primary</button>
  <button type="button" class="pds-button pds-button--secondary">Secondary</button>
  <button type="button" class="pds-button pds-button--oak">Oak</button>
  <button type="button" class="pds-button pds-button--ghost pds-button--sm">Small ghost</button>
  <a href="#" class="pds-button pds-button--primary pds-button--lg">Link as button</a>
</div>`),
};
