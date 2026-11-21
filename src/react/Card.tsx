import { forwardRef, type HTMLAttributes } from 'react';
import { cx } from './cx';

export type CardVariant = 'default' | 'raised' | 'sunken' | 'oak' | 'oak-frame';

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: CardVariant;
}

export const Card = forwardRef<HTMLDivElement, CardProps>(function Card(
  { variant = 'default', className, ...rest },
  ref,
) {
  return (
    <div
      ref={ref}
      className={cx('pds-card', variant !== 'default' && `pds-card--${variant}`, className)}
      {...rest}
    />
  );
});

export const CardHeader = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(function CardHeader(
  { className, ...rest },
  ref,
) {
  return <div ref={ref} className={cx('pds-card__header', className)} {...rest} />;
});

export const CardTitle = forwardRef<HTMLHeadingElement, HTMLAttributes<HTMLHeadingElement>>(function CardTitle(
  { className, ...rest },
  ref,
) {
  return <h3 ref={ref} className={cx('pds-card__title', className)} {...rest} />;
});

export const CardBody = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(function CardBody(
  { className, ...rest },
  ref,
) {
  return <div ref={ref} className={cx('pds-card__body', className)} {...rest} />;
});

export const CardFooter = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(function CardFooter(
  { className, ...rest },
  ref,
) {
  return <div ref={ref} className={cx('pds-card__footer', className)} {...rest} />;
});
