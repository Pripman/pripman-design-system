import { useEffect, useId, useRef, useState, type ReactNode } from 'react';
import { Button, type ButtonVariant } from './Button';
import { cx } from './cx';

export interface KebabMenuItem {
  label: ReactNode;
  /** Optional icon shown to the left of the label. */
  icon?: ReactNode;
  onSelect?: () => void;
  disabled?: boolean;
  /** Destructive styling. */
  danger?: boolean;
}

export interface KebabMenuProps {
  items: KebabMenuItem[];
  /** Accessible label for the trigger button. */
  label?: string;
  /** Edge of the trigger the menu is aligned to. */
  align?: 'start' | 'end';
  variant?: ButtonVariant;
  className?: string;
}

function KebabIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <circle cx="12" cy="5" r="2" />
      <circle cx="12" cy="12" r="2" />
      <circle cx="12" cy="19" r="2" />
    </svg>
  );
}

/** Three-vertical-dots button that toggles a list of action buttons, each with an optional leading icon. */
export function KebabMenu({ items, label = 'More actions', align = 'end', variant = 'ghost', className }: KebabMenuProps) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const menuId = `pds-kebab-${useId()}`;

  useEffect(() => {
    if (!open) return;
    const onPointerDown = (event: MouseEvent) => {
      if (rootRef.current && !rootRef.current.contains(event.target as Node)) setOpen(false);
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setOpen(false);
        triggerRef.current?.focus();
      }
    };
    document.addEventListener('mousedown', onPointerDown);
    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('mousedown', onPointerDown);
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [open]);

  return (
    <div ref={rootRef} className={cx('pds-kebab', align === 'start' && 'pds-kebab--start', className)}>
      <Button
        ref={triggerRef}
        variant={variant}
        iconOnly
        className="pds-kebab__trigger"
        aria-label={label}
        aria-haspopup="true"
        aria-expanded={open}
        aria-controls={menuId}
        onClick={() => setOpen((o) => !o)}
      >
        <KebabIcon />
      </Button>
      <div id={menuId} className="pds-kebab__menu" hidden={!open}>
        {items.map((item, i) => (
          <button
            key={i}
            type="button"
            className={cx('pds-kebab__item', item.danger && 'pds-kebab__item--danger')}
            disabled={item.disabled}
            onClick={() => {
              setOpen(false);
              item.onSelect?.();
            }}
          >
            {item.icon && (
              <span className="pds-kebab__icon" aria-hidden="true">
                {item.icon}
              </span>
            )}
            {item.label}
          </button>
        ))}
      </div>
    </div>
  );
}
