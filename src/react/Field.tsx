import {
  forwardRef,
  useId,
  type InputHTMLAttributes,
  type ReactNode,
  type SelectHTMLAttributes,
  type TextareaHTMLAttributes,
} from 'react';
import { cx } from './cx';

interface FieldOwnProps {
  label: ReactNode;
  /** Help text shown below the control. */
  hint?: ReactNode;
  /** Error message. Marks the control as invalid. */
  error?: ReactNode;
  /** Class name for the wrapping .pds-field element. */
  fieldClassName?: string;
}

/** Shared label/hint/error wiring for all field controls. */
function useField(id: string | undefined, hint: ReactNode, error: ReactNode, describedBy?: string) {
  const generated = useId();
  const controlId = id ?? `pds-${generated}`;
  const hintId = hint ? `${controlId}-hint` : undefined;
  const errorId = error ? `${controlId}-error` : undefined;
  const ariaDescribedBy = [describedBy, hintId, errorId].filter(Boolean).join(' ') || undefined;
  return { controlId, hintId, errorId, ariaDescribedBy };
}

function FieldShell(props: {
  controlId: string;
  label: ReactNode;
  hint: ReactNode;
  hintId?: string;
  error: ReactNode;
  errorId?: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <div className={cx('pds-field', props.className)}>
      <label className="pds-field__label" htmlFor={props.controlId}>
        {props.label}
      </label>
      {props.children}
      {props.hint && (
        <span id={props.hintId} className="pds-field__hint">
          {props.hint}
        </span>
      )}
      {props.error && (
        <span id={props.errorId} className="pds-field__error">
          {props.error}
        </span>
      )}
    </div>
  );
}

export interface TextFieldProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'children'>, FieldOwnProps {}

export const TextField = forwardRef<HTMLInputElement, TextFieldProps>(function TextField(
  { label, hint, error, fieldClassName, id, className, 'aria-describedby': describedBy, ...rest },
  ref,
) {
  const f = useField(id, hint, error, describedBy);
  return (
    <FieldShell {...f} label={label} hint={hint} error={error} className={fieldClassName}>
      <input
        ref={ref}
        id={f.controlId}
        className={cx('pds-input', className)}
        aria-invalid={error ? true : undefined}
        aria-describedby={f.ariaDescribedBy}
        {...rest}
      />
    </FieldShell>
  );
});

export interface TextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement>, FieldOwnProps {}

export const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(function TextArea(
  { label, hint, error, fieldClassName, id, className, 'aria-describedby': describedBy, ...rest },
  ref,
) {
  const f = useField(id, hint, error, describedBy);
  return (
    <FieldShell {...f} label={label} hint={hint} error={error} className={fieldClassName}>
      <textarea
        ref={ref}
        id={f.controlId}
        className={cx('pds-input', className)}
        aria-invalid={error ? true : undefined}
        aria-describedby={f.ariaDescribedBy}
        {...rest}
      />
    </FieldShell>
  );
});

export interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement>, FieldOwnProps {}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(function Select(
  { label, hint, error, fieldClassName, id, className, 'aria-describedby': describedBy, children, ...rest },
  ref,
) {
  const f = useField(id, hint, error, describedBy);
  return (
    <FieldShell {...f} label={label} hint={hint} error={error} className={fieldClassName}>
      <select
        ref={ref}
        id={f.controlId}
        className={cx('pds-select', className)}
        aria-invalid={error ? true : undefined}
        aria-describedby={f.ariaDescribedBy}
        {...rest}
      >
        {children}
      </select>
    </FieldShell>
  );
});
