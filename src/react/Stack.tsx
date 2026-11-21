import { forwardRef, type CSSProperties, type HTMLAttributes } from 'react';
import { cx } from './cx';

export type SpaceToken = '0' | '1' | '2' | '3' | '4' | '5' | '6' | '8' | '10' | '12' | '16';

export interface StackProps extends HTMLAttributes<HTMLDivElement> {
  direction?: 'column' | 'row';
  /** Gap from the space scale (4px steps). */
  gap?: SpaceToken | number;
  align?: 'start' | 'center' | 'end' | 'stretch';
  justify?: 'start' | 'center' | 'end' | 'between';
  wrap?: boolean;
}

export const Stack = forwardRef<HTMLDivElement, StackProps>(function Stack(
  { direction = 'column', gap = '4', align, justify, wrap = false, className, style, ...rest },
  ref,
) {
  const gapStyle = { '--pds-stack-gap': `var(--pds-space-${gap})` } as CSSProperties;
  return (
    <div
      ref={ref}
      className={cx(
        'pds-stack',
        direction === 'row' && 'pds-stack--row',
        wrap && 'pds-stack--wrap',
        align && `pds-stack--align-${align}`,
        justify && `pds-stack--justify-${justify}`,
        className,
      )}
      style={{ ...gapStyle, ...style }}
      {...rest}
    />
  );
});
