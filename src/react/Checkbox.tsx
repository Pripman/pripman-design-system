import { forwardRef, type InputHTMLAttributes, type ReactNode } from 'react';
import { cx } from './cx';

export interface CheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label: ReactNode;
  /** Class name for the wrapping label. */
  labelClassName?: string;
}

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(function Checkbox(
  { label, labelClassName, className, ...rest },
  ref,
) {
  return (
    <label className={cx('pds-checkbox', labelClassName)}>
      <input ref={ref} type="checkbox" className={cx('pds-checkbox__input', className)} {...rest} />
      <span>{label}</span>
    </label>
  );
});

export interface SwitchProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type' | 'role'> {
  label: ReactNode;
  labelClassName?: string;
}

/** On/off toggle. A checkbox with role="switch". */
export const Switch = forwardRef<HTMLInputElement, SwitchProps>(function Switch(
  { label, labelClassName, className, ...rest },
  ref,
) {
  return (
    <label className={cx('pds-switch', labelClassName)}>
      <input ref={ref} type="checkbox" role="switch" className={cx('pds-switch__input', className)} {...rest} />
      <span>{label}</span>
    </label>
  );
});
