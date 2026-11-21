import type { Meta, StoryObj } from '@storybook/react-vite';
import { Select, Stack, TextArea, TextField } from '../../src/react';
import { html } from '../html';

const meta = {
  title: 'Components/Fields',
  component: TextField,
  args: { label: 'Amount', placeholder: '0.00', hint: 'In DKK', error: '', disabled: false },
  render: (args) => (
    <div style={{ maxWidth: 320 }}>
      <TextField {...args} error={args.error || undefined} />
    </div>
  ),
} satisfies Meta<typeof TextField>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const States: Story = {
  render: () => (
    <Stack gap="5" style={{ maxWidth: 320 }}>
      <TextField label="Default" placeholder="Type here" />
      <TextField label="With hint" hint="We'll never share this." defaultValue="hello@example.com" type="email" />
      <TextField label="With error" error="Amount must be positive" defaultValue="-20" />
      <TextField label="Disabled" disabled defaultValue="Locked" />
    </Stack>
  ),
};

export const SelectAndTextArea: Story = {
  name: 'Select & TextArea',
  render: () => (
    <Stack gap="5" style={{ maxWidth: 320 }}>
      <Select label="Category" defaultValue="food">
        <option value="food">Food</option>
        <option value="rent">Rent</option>
        <option value="fun">Fun</option>
      </Select>
      <TextArea label="Notes" placeholder="Anything to remember?" />
    </Stack>
  ),
};

export const PlainHTML: Story = {
  name: 'Plain HTML / CSS',
  ...html(`
<div class="pds-field" style="max-width: 320px">
  <label class="pds-field__label" for="tempo">Tempo</label>
  <input id="tempo" class="pds-input" type="number" value="120" aria-describedby="tempo-hint" />
  <span id="tempo-hint" class="pds-field__hint">Beats per minute</span>
</div>`),
};
