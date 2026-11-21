import { forwardRef, type HTMLAttributes } from 'react';
import { cx } from './cx';

export type BadgeTone = 'neutral' | 'primary' | 'success' | 'warning' | 'danger' | 'info' | 'oak';

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  tone?: BadgeTone;
}

export const Badge = forwardRef<HTMLSpanElement, BadgeProps>(function Badge(
  { tone = 'neutral', className, ...rest },
  ref,
) {
  return <span ref={ref} className={cx('pds-badge', tone !== 'neutral' && `pds-badge--${tone}`, className)} {...rest} />;
});
