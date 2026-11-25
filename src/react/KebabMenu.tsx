import { useEffect, useId, useLayoutEffect, useRef, useState, type ReactNode } from 'react';
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
  const menuRef = useRef<HTMLDivElement>(null);
  const [start, setStart] = useState(align === 'start');
  const [up, setUp] = useState(false);
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

  // Re-position when opened: prefer below / the requested side, flip when the menu would overflow the viewport.
  useLayoutEffect(() => {
    if (!open) return;
    const trigger = triggerRef.current;
    const menu = menuRef.current;
    if (!trigger || !menu) return;
    const place = () => {
      const t = trigger.getBoundingClientRect();
      const menuW = menu.offsetWidth;
      const menuH = menu.offsetHeight;
      const vw = document.documentElement.clientWidth || window.innerWidth;
      const vh = document.documentElement.clientHeight || window.innerHeight;
      const gap = 4;

      const spaceBelow = vh - t.bottom;
      const spaceAbove = t.top;
      const nextUp = spaceBelow < menuH + gap && spaceAbove > spaceBelow;

      // 'end' = menu's right edge on the trigger's right edge (menu extends left).
      const roomLeft = t.right; // menu extends left of the trigger's right edge
      const roomRight = vw - t.left; // menu extends right of the trigger's left edge
      const preferEnd = align === 'end';
      const preferredRoom = preferEnd ? roomLeft : roomRight;
      const otherRoom = preferEnd ? roomRight : roomLeft;
      const useOther = preferredRoom < menuW && otherRoom > preferredRoom;
      const nextStart = useOther ? preferEnd : !preferEnd;

      setUp(nextUp);
      setStart(nextStart);
    };
    place();
    window.addEventListener('resize', place);
    return () => window.removeEventListener('resize', place);
  }, [open, align]);

  return (
    <div
      ref={rootRef}
      className={cx('pds-kebab', start && 'pds-kebab--start', up && 'pds-kebab--up', className)}
    >
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
      <div ref={menuRef} id={menuId} className="pds-kebab__menu" hidden={!open}>
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
