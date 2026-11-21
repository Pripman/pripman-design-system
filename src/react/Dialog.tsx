import { useEffect, useId, useRef, type HTMLAttributes, type ReactNode } from 'react';
import { cx } from './cx';

export interface DialogProps extends Omit<HTMLAttributes<HTMLDialogElement>, 'title'> {
  /** Controlled open state. */
  open: boolean;
  /** Called when the user closes the dialog (Esc, close button). */
  onClose: () => void;
  title: ReactNode;
  footer?: ReactNode;
  /** Accessible label for the close button. */
  closeLabel?: string;
  children?: ReactNode;
}

/** Modal dialog built on the native <dialog> element (focus trap, Esc and top layer for free). */
export function Dialog({ open, onClose, title, footer, closeLabel = 'Close', className, children, ...rest }: DialogProps) {
  const ref = useRef<HTMLDialogElement>(null);
  const titleId = `pds-dialog-${useId()}`;
  const onCloseRef = useRef(onClose);
  onCloseRef.current = onClose;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (open && !el.open) {
      if (typeof el.showModal === 'function') el.showModal();
      else el.setAttribute('open', '');
    } else if (!open && el.open) {
      if (typeof el.close === 'function') el.close();
      else el.removeAttribute('open');
    }
  }, [open]);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    // Esc fires `cancel`; keep the dialog state controlled by the parent.
    const onCancel = (event: Event) => {
      event.preventDefault();
      onCloseRef.current();
    };
    el.addEventListener('cancel', onCancel);
    return () => el.removeEventListener('cancel', onCancel);
  }, []);

  return (
    <dialog ref={ref} className={cx('pds-dialog', className)} aria-labelledby={titleId} {...rest}>
      <div className="pds-dialog__header">
        <h2 id={titleId} className="pds-dialog__title">
          {title}
        </h2>
        <button type="button" className="pds-dialog__close" aria-label={closeLabel} onClick={() => onClose()}>
          ×
        </button>
      </div>
      <div className="pds-dialog__body">{children}</div>
      {footer && <div className="pds-dialog__footer">{footer}</div>}
    </dialog>
  );
}
