import type { Meta, StoryObj } from '@storybook/react-vite';
import { Tabs } from '../../src/react';
import { html } from '../html';

const items = [
  { id: 'overview', label: 'Overview', content: <p className="pds-text">Monthly overview.</p> },
  { id: 'expenses', label: 'Expenses', content: <p className="pds-text">All expenses.</p> },
  { id: 'archive', label: 'Archive', content: <p className="pds-text">Archived.</p>, disabled: true },
  { id: 'settings', label: 'Settings', content: <p className="pds-text">Settings.</p> },
];

const meta = {
  title: 'Components/Tabs',
  component: Tabs,
  args: { items, 'aria-label': 'Budget sections' },
  parameters: { controls: { exclude: ['items'] } },
} satisfies Meta<typeof Tabs>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const PlainHTML: Story = {
  name: 'Plain HTML / CSS',
  ...html(`
<div class="pds-tabs">
  <div role="tablist" aria-label="Tracks" class="pds-tabs__list">
    <button type="button" role="tab" aria-selected="true" class="pds-tabs__tab">Track 1</button>
    <button type="button" role="tab" aria-selected="false" tabindex="-1" class="pds-tabs__tab">Track 2</button>
  </div>
  <div role="tabpanel" class="pds-tabs__panel">Panel content (switching needs a bit of JS).</div>
</div>`),
};
