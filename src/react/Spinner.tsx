import { forwardRef, type HTMLAttributes } from 'react';
import { cx } from './cx';

export type SpinnerSize = 'sm' | 'md' | 'lg';

export interface SpinnerProps extends HTMLAttributes<HTMLSpanElement> {
  size?: SpinnerSize;
  /** Use the surrounding text colour instead of the primary colour. */
  current?: boolean;
  /** Accessible label announced to screen readers. Defaults to "Loading". */
  label?: string;
}

export const Spinner = forwardRef<HTMLSpanElement, SpinnerProps>(function Spinner(
  { size = 'md', current = false, label = 'Loading', className, ...rest },
  ref,
) {
  return (
    <span
      ref={ref}
      role="status"
      aria-label={label}
      className={cx('pds-spinner', size !== 'md' && `pds-spinner--${size}`, current && 'pds-spinner--current', className)}
      {...rest}
    />
  );
});
