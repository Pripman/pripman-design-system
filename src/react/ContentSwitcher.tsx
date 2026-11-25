import { useRef, useState, type KeyboardEvent, type ReactNode } from 'react';
import { cx } from './cx';

export interface ContentSwitcherItem {
  value: string;
  /** Text label. Optional when `icon` is given. */
  label?: ReactNode;
  /** Optional icon shown to the left of the label (or on its own). */
  icon?: ReactNode;
  /** Required accessible name for icon-only items. */
  'aria-label'?: string;
  disabled?: boolean;
}

export interface ContentSwitcherProps {
  items: ContentSwitcherItem[];
  /** Controlled selected value. */
  value?: string;
  /** Initial value when uncontrolled. Defaults to the first enabled item. */
  defaultValue?: string;
  onChange?: (value: string) => void;
  /** Accessible name for the group. */
  'aria-label'?: string;
  /** Stretch to fill the container, with equal-width items. */
  fullWidth?: boolean;
  className?: string;
}

/** Segmented control for switching between views. Items can hold an icon, text, or both. */
export function ContentSwitcher({
  items,
  value,
  defaultValue,
  onChange,
  fullWidth,
  className,
  'aria-label': ariaLabel,
}: ContentSwitcherProps) {
  const firstEnabled = items.find((i) => !i.disabled)?.value;
  const [internal, setInternal] = useState(defaultValue ?? firstEnabled);
  const selected = value ?? internal;
  const refs = useRef(new Map<string, HTMLButtonElement>());

  const select = (v: string) => {
    if (value === undefined) setInternal(v);
    if (v !== selected) onChange?.(v);
  };

  const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    const enabled = items.filter((i) => !i.disabled);
    if (!enabled.length) return;
    const index = enabled.findIndex((i) => i.value === selected);
    let next: ContentSwitcherItem | undefined;
    if (event.key === 'ArrowRight' || event.key === 'ArrowDown') next = enabled[(index + 1) % enabled.length];
    else if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') next = enabled[(index - 1 + enabled.length) % enabled.length];
    else if (event.key === 'Home') next = enabled[0];
    else if (event.key === 'End') next = enabled[enabled.length - 1];
    if (!next) return;
    event.preventDefault();
    select(next.value);
    refs.current.get(next.value)?.focus();
  };

  return (
    <div
      role="radiogroup"
      aria-label={ariaLabel}
      className={cx('pds-switcher', fullWidth && 'pds-switcher--full', className)}
      onKeyDown={onKeyDown}
    >
      {items.map((item) => {
        const isSelected = item.value === selected;
        return (
          <button
            key={item.value}
            ref={(el) => {
              if (el) refs.current.set(item.value, el);
              else refs.current.delete(item.value);
            }}
            type="button"
            role="radio"
            aria-checked={isSelected}
            aria-label={item['aria-label']}
            tabIndex={isSelected ? 0 : -1}
            disabled={item.disabled}
            className="pds-switcher__item"
            onClick={() => select(item.value)}
          >
            {item.icon && (
              <span className="pds-switcher__icon" aria-hidden="true">
                {item.icon}
              </span>
            )}
            {item.label}
          </button>
        );
      })}
    </div>
  );
}
