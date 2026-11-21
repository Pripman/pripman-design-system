import { forwardRef, type HTMLAttributes, type ReactNode } from 'react';
import { cx } from './cx';

export interface DigitalDisplayProps extends HTMLAttributes<HTMLDivElement> {
  value: ReactNode;
  /** Small caption, e.g. "BPM". */
  label?: ReactNode;
  size?: 'sm' | 'md' | 'lg';
}

/** Amber-on-wine readout, e.g. tempo or timecode. */
export const DigitalDisplay = forwardRef<HTMLDivElement, DigitalDisplayProps>(function DigitalDisplay(
  { value, label, size = 'md', className, ...rest },
  ref,
) {
  return (
    <div ref={ref} className={cx('pds-digital', size !== 'md' && `pds-digital--${size}`, className)} {...rest}>
      <span className="pds-digital__value">{value}</span>
      {label && <span className="pds-digital__label">{label}</span>}
    </div>
  );
});
