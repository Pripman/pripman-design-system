import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { Button, Dialog, Select, Stack, Switch } from '../../src/react';
import { html } from '../html';

const meta = {
  title: 'Components/Dialog',
  component: Dialog,
  parameters: { controls: { disable: true } },
  args: { open: false, title: 'Settings', onClose: () => {} },
} satisfies Meta<typeof Dialog>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: function Render() {
    const [open, setOpen] = useState(false);
    return (
      <>
        <Button variant="primary" onClick={() => setOpen(true)}>
          Open settings
        </Button>
        <Dialog
          open={open}
          onClose={() => setOpen(false)}
          title="Settings"
          footer={
            <>
              <Button variant="ghost" onClick={() => setOpen(false)}>
                Cancel
              </Button>
              <Button variant="primary" onClick={() => setOpen(false)}>
                Save
              </Button>
            </>
          }
        >
          <Stack gap="4">
            <Select label="Input device" defaultValue="mic">
              <option value="mic">Built-in microphone</option>
              <option value="usb">USB audio interface</option>
            </Select>
            <Switch label="Count-in" defaultChecked />
          </Stack>
        </Dialog>
      </>
    );
  },
};

export const PlainHTML: Story = {
  name: 'Plain HTML / CSS',
  ...html(`
<button type="button" class="pds-button pds-button--primary"
  onclick="document.getElementById('pds-demo-dialog').showModal()">Open dialog</button>

<dialog id="pds-demo-dialog" class="pds-dialog" aria-labelledby="pds-demo-title">
  <div class="pds-dialog__header">
    <h2 id="pds-demo-title" class="pds-dialog__title">Native dialog</h2>
    <button type="button" class="pds-dialog__close" aria-label="Close"
      onclick="this.closest('dialog').close()">×</button>
  </div>
  <div class="pds-dialog__body">
    <p class="pds-text">Uses &lt;dialog&gt;.showModal(): focus trap, Esc and backdrop come free.</p>
  </div>
  <div class="pds-dialog__footer">
    <button type="button" class="pds-button pds-button--primary"
      onclick="this.closest('dialog').close()">OK</button>
  </div>
</dialog>`),
};
