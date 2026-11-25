import { useState } from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import {
  Badge,
  Button,
  Card,
  CardBody,
  Checkbox,
  Dialog,
  DigitalDisplay,
  KebabMenu,
  Select,
  Stack,
  Switch,
  Tabs,
  TextField,
} from '../src/react';

describe('Button', () => {
  it('renders CSS classes for variant and size, defaulting to type="button"', () => {
    render(
      <Button variant="primary" size="lg">
        Save
      </Button>,
    );
    const button = screen.getByRole('button', { name: 'Save' });
    expect(button).toHaveClass('pds-button', 'pds-button--primary', 'pds-button--lg');
    expect(button).toHaveAttribute('type', 'button');
  });

  it('passes through props and handles clicks', () => {
    const onClick = vi.fn();
    render(
      <Button iconOnly aria-label="Play" className="extra" onClick={onClick}>
        ▶
      </Button>,
    );
    const button = screen.getByRole('button', { name: 'Play' });
    expect(button).toHaveClass('pds-button--icon', 'extra');
    fireEvent.click(button);
    expect(onClick).toHaveBeenCalledOnce();
  });
});

describe('Card', () => {
  it('applies the oak variant', () => {
    render(
      <Card variant="oak" data-testid="card">
        <CardBody>Hi</CardBody>
      </Card>,
    );
    expect(screen.getByTestId('card')).toHaveClass('pds-card', 'pds-card--oak');
  });
});

describe('TextField', () => {
  it('associates label, hint and error with the input', () => {
    render(<TextField label="Amount" hint="In DKK" error="Required" />);
    const input = screen.getByLabelText('Amount');
    expect(input).toHaveClass('pds-input');
    expect(input).toHaveAttribute('aria-invalid', 'true');
    expect(input).toHaveAccessibleDescription('In DKK Required');
  });

  it('is not marked invalid without an error', () => {
    render(<TextField label="Name" />);
    expect(screen.getByLabelText('Name')).not.toHaveAttribute('aria-invalid');
  });
});

describe('Select', () => {
  it('renders options under a label', () => {
    render(
      <Select label="Category" defaultValue="b">
        <option value="a">A</option>
        <option value="b">B</option>
      </Select>,
    );
    expect(screen.getByLabelText('Category')).toHaveValue('b');
  });
});

describe('Checkbox and Switch', () => {
  it('toggles a checkbox through its label', () => {
    render(<Checkbox label="Remember me" />);
    const box = screen.getByRole('checkbox', { name: 'Remember me' });
    fireEvent.click(screen.getByText('Remember me'));
    expect(box).toBeChecked();
  });

  it('renders a switch role', () => {
    render(<Switch label="Metronome" defaultChecked />);
    expect(screen.getByRole('switch', { name: 'Metronome' })).toBeChecked();
  });
});

describe('Tabs', () => {
  const items = [
    { id: 'one', label: 'One', content: 'First panel' },
    { id: 'two', label: 'Two', content: 'Second panel', disabled: true },
    { id: 'three', label: 'Three', content: 'Third panel' },
  ];

  it('shows the first tab and switches on click', () => {
    render(<Tabs items={items} aria-label="Demo" />);
    expect(screen.getByRole('tab', { name: 'One' })).toHaveAttribute('aria-selected', 'true');
    expect(screen.getByText('First panel')).toBeVisible();
    fireEvent.click(screen.getByRole('tab', { name: 'Three' }));
    expect(screen.getByRole('tab', { name: 'Three' })).toHaveAttribute('aria-selected', 'true');
    expect(screen.getByRole('tabpanel')).toHaveTextContent('Third panel');
  });

  it('skips disabled tabs with the arrow keys', () => {
    render(<Tabs items={items} aria-label="Demo" />);
    fireEvent.keyDown(screen.getByRole('tab', { name: 'One' }), { key: 'ArrowRight' });
    const three = screen.getByRole('tab', { name: 'Three' });
    expect(three).toHaveAttribute('aria-selected', 'true');
    expect(three).toHaveFocus();
    fireEvent.keyDown(three, { key: 'ArrowRight' });
    expect(screen.getByRole('tab', { name: 'One' })).toHaveAttribute('aria-selected', 'true');
  });

  it('can be controlled', () => {
    const onChange = vi.fn();
    render(<Tabs items={items} value="three" onChange={onChange} aria-label="Demo" />);
    fireEvent.click(screen.getByRole('tab', { name: 'One' }));
    expect(onChange).toHaveBeenCalledWith('one');
    expect(screen.getByRole('tab', { name: 'Three' })).toHaveAttribute('aria-selected', 'true');
  });
});

describe('Dialog', () => {
  function Harness({ onClose }: { onClose?: () => void }) {
    const [open, setOpen] = useState(false);
    return (
      <>
        <Button onClick={() => setOpen(true)}>Open</Button>
        <Dialog
          open={open}
          title="Settings"
          onClose={() => {
            onClose?.();
            setOpen(false);
          }}
        >
          Body text
        </Dialog>
      </>
    );
  }

  it('opens and closes via the close button', () => {
    const onClose = vi.fn();
    const { container } = render(<Harness onClose={onClose} />);
    const dialog = container.querySelector('dialog')!;
    expect(dialog).not.toHaveAttribute('open');
    fireEvent.click(screen.getByRole('button', { name: 'Open' }));
    expect(dialog).toHaveAttribute('open');
    expect(dialog).toHaveAccessibleName('Settings');
    fireEvent.click(screen.getByRole('button', { name: 'Close' }));
    expect(onClose).toHaveBeenCalledOnce();
    expect(dialog).not.toHaveAttribute('open');
  });

  it('routes Esc (cancel) to onClose', () => {
    const onClose = vi.fn();
    const { container } = render(<Harness onClose={onClose} />);
    fireEvent.click(screen.getByRole('button', { name: 'Open' }));
    fireEvent(container.querySelector('dialog')!, new Event('cancel', { cancelable: true }));
    expect(onClose).toHaveBeenCalledOnce();
  });
});

describe('Badge, DigitalDisplay, Stack', () => {
  it('render their classes', () => {
    render(
      <Stack direction="row" gap="2" data-testid="stack">
        <Badge tone="success">Paid</Badge>
        <DigitalDisplay value="120.0" label="BPM" size="lg" />
      </Stack>,
    );
    expect(screen.getByText('Paid')).toHaveClass('pds-badge', 'pds-badge--success');
    expect(screen.getByText('120.0').parentElement).toHaveClass('pds-digital', 'pds-digital--lg');
    const stack = screen.getByTestId('stack');
    expect(stack).toHaveClass('pds-stack', 'pds-stack--row');
    expect(stack.style.getPropertyValue('--pds-stack-gap')).toBe('var(--pds-space-2)');
  });
});

describe('KebabMenu', () => {
  it('toggles a list of buttons, with optional icons, and fires onSelect', () => {
    const onSelect = vi.fn();
    render(
      <KebabMenu
        items={[
          { label: 'Edit', icon: <svg data-testid="icon" />, onSelect },
          { label: 'Delete' },
        ]}
      />,
    );
    const trigger = screen.getByRole('button', { name: 'More actions' });
    expect(trigger).toHaveAttribute('aria-expanded', 'false');
    expect(screen.queryByRole('button', { name: 'Edit' })).toBeNull();
    fireEvent.click(trigger);
    expect(trigger).toHaveAttribute('aria-expanded', 'true');
    expect(screen.getByTestId('icon')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Delete' })).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: 'Edit' }));
    expect(onSelect).toHaveBeenCalledTimes(1);
    expect(trigger).toHaveAttribute('aria-expanded', 'false');
  });

  it('closes on Escape', () => {
    render(<KebabMenu items={[{ label: 'Edit' }]} />);
    const trigger = screen.getByRole('button', { name: 'More actions' });
    fireEvent.click(trigger);
    fireEvent.keyDown(document, { key: 'Escape' });
    expect(trigger).toHaveAttribute('aria-expanded', 'false');
  });
});
