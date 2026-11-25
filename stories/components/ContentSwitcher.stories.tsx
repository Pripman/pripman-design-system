import type { Meta, StoryObj } from '@storybook/react-vite';
import { ContentSwitcher } from '../../src/react';
import { html } from '../html';

const icon = (d: string) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d={d} />
  </svg>
);
const List = () => icon('M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01');
const Grid = () => icon('M3 3h7v7H3zM14 3h7v7h-7zM14 14h7v7h-7zM3 14h7v7H3z');

const meta = {
  title: 'Components/Content switcher',
  component: ContentSwitcher,
  args: { 'aria-label': 'View', items: [{ value: 'day', label: 'Day' }, { value: 'week', label: 'Week' }, { value: 'month', label: 'Month' }] },
} satisfies Meta<typeof ContentSwitcher>;
export default meta;
type Story = StoryObj<typeof meta>;

export const TextOnly: Story = {};

export const IconsAndText: Story = {
  args: { items: [{ value: 'list', label: 'List', icon: <List /> }, { value: 'grid', label: 'Grid', icon: <Grid /> }] },
};

export const IconsOnly: Story = {
  args: {
    items: [
      { value: 'list', icon: <List />, 'aria-label': 'List' },
      { value: 'grid', icon: <Grid />, 'aria-label': 'Grid' },
    ],
  },
};

export const FullWidth: Story = { args: { fullWidth: true } };

export const PlainHTML: Story = {
  name: 'Plain HTML / CSS',
  ...html(`
<div class="pds-switcher" role="radiogroup" aria-label="View">
  <button type="button" role="radio" aria-checked="true" class="pds-switcher__item">List</button>
  <button type="button" role="radio" aria-checked="false" class="pds-switcher__item">Grid</button>
</div>`),
};
