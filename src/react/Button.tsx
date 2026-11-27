import { forwardRef, type ButtonHTMLAttributes } from 'react';
import { cx } from './cx';
import { Spinner } from './Spinner';

export type ButtonVariant = 'primary' | 'secondary' | 'oak' | 'ghost' | 'danger';
export type ButtonSize = 'sm' | 'md' | 'lg';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  /** Square, icon-only button. Remember an `aria-label`. */
  iconOnly?: boolean;
  /** Full width. */
  block?: boolean;
  /** Show a spinner and disable the button while something is loading. */
  loading?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  { variant = 'secondary', size = 'md', iconOnly = false, block = false, loading = false, type = 'button', className, disabled, children, ...rest },
  ref,
) {
  return (
    <button
      ref={ref}
      type={type}
      className={cx(
        'pds-button',
        `pds-button--${variant}`,
        size !== 'md' && `pds-button--${size}`,
        iconOnly && 'pds-button--icon',
        block && 'pds-button--block',
        loading && 'pds-button--loading',
        className,
      )}
      {...rest}
      disabled={disabled || loading}
      aria-busy={loading || undefined}
    >
      {loading && <Spinner size="sm" current aria-hidden="true" role={undefined} aria-label={undefined} />}
      {iconOnly && loading ? null : children}
    </button>
  );
});
