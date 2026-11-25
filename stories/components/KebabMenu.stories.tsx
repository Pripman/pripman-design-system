import type { Meta, StoryObj } from '@storybook/react-vite';
import { KebabMenu } from '../../src/react';
import { html } from '../html';

const Pencil = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 20h9M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4z" />
  </svg>
);
const Trash = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 6h18M8 6V4h8v2M6 6l1 14h10l1-14" />
  </svg>
);

const meta = {
  title: 'Components/Kebab menu',
  component: KebabMenu,
  args: {
    items: [
      { label: 'Edit', icon: <Pencil /> },
      { label: 'Duplicate' },
      { label: 'Delete', icon: <Trash />, danger: true },
    ],
  },
} satisfies Meta<typeof KebabMenu>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  decorators: [(Story) => <div style={{ minHeight: 200, display: 'flex', justifyContent: 'flex-end' }}><Story /></div>],
};

export const PlainHTML: Story = {
  name: 'Plain HTML / CSS',
  ...html(`
<div class="pds-kebab">
  <button type="button" class="pds-button pds-button--ghost pds-button--icon pds-kebab__trigger"
    aria-label="More actions" aria-haspopup="true"
    onclick="this.nextElementSibling.hidden = !this.nextElementSibling.hidden">
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><circle cx="12" cy="5" r="2"/><circle cx="12" cy="12" r="2"/><circle cx="12" cy="19" r="2"/></svg>
  </button>
  <div class="pds-kebab__menu" hidden>
    <button type="button" class="pds-kebab__item">Edit</button>
    <button type="button" class="pds-kebab__item pds-kebab__item--danger">Delete</button>
  </div>
</div>`),
};
