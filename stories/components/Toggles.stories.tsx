import type { Meta, StoryObj } from '@storybook/react-vite';
import { Checkbox, Stack, Switch } from '../../src/react';
import { html } from '../html';

const meta = {
  title: 'Components/Checkbox & Switch',
  component: Checkbox,
  args: { label: 'Remember me', disabled: false },
} satisfies Meta<typeof Checkbox>;
export default meta;
type Story = StoryObj<typeof meta>;

export const CheckboxPlayground: Story = { name: 'Checkbox' };

export const SwitchStory: Story = {
  name: 'Switch',
  render: (args) => <Switch label="Metronome" disabled={args.disabled} defaultChecked />,
};

export const States: Story = {
  render: () => (
    <Stack gap="3">
      <Checkbox label="Unchecked" />
      <Checkbox label="Checked" defaultChecked />
      <Checkbox label="Disabled" disabled />
      <Switch label="Off" />
      <Switch label="On" defaultChecked />
      <Switch label="Disabled" disabled />
    </Stack>
  ),
};

export const PlainHTML: Story = {
  name: 'Plain HTML / CSS',
  ...html(`
<div class="pds-stack">
  <label class="pds-checkbox">
    <input type="checkbox" class="pds-checkbox__input" checked /> Loop
  </label>
  <label class="pds-switch">
    <input type="checkbox" role="switch" class="pds-switch__input" /> Count-in
  </label>
</div>`),
};
