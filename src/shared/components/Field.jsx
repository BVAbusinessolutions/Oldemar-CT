import { useId } from 'react';
import styles from './Field.module.css';

/** Envoltorio accesible: label, control, ayuda y error enlazados por id. */
export const Field = ({ label, error, hint, children, className = '' }) => {
  const id = useId();
  const describedBy = [hint && `${id}-hint`, error && `${id}-error`].filter(Boolean).join(' ') || undefined;

  return (
    <div className={`${styles.field} ${className}`}>
      <label htmlFor={id} className={styles.label}>{label}</label>
      {children({ id, 'aria-invalid': Boolean(error), 'aria-describedby': describedBy, className: styles.control })}
      {hint && <small id={`${id}-hint`} className={styles.hint}>{hint}</small>}
      {error && <small id={`${id}-error`} className={styles.error} role="alert">{error}</small>}
    </div>
  );
};

export const TextField = ({ label, name, values, errors, setField, type = 'text', hint, className, ...rest }) => (
  <Field label={label} error={errors[name]} hint={hint} className={className}>
    {(props) => (
      <input {...props} {...rest} name={name} type={type} value={values[name]} onChange={(e) => setField(name, e.target.value)} />
    )}
  </Field>
);

export const SelectField = ({ label, name, options, values, errors, setField, hint, className }) => (
  <Field label={label} error={errors[name]} hint={hint} className={className}>
    {(props) => (
      <select {...props} name={name} value={values[name]} onChange={(e) => setField(name, e.target.value)}>
        <option value="">Selecciona…</option>
        {options.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
      </select>
    )}
  </Field>
);

export const TextAreaField = ({ label, name, values, errors, setField, hint, className }) => (
  <Field label={label} error={errors[name]} hint={hint} className={className}>
    {(props) => <textarea {...props} name={name} rows={3} value={values[name]} onChange={(e) => setField(name, e.target.value)} />}
  </Field>
);

export const FileField = ({ label, name, values, errors, setField, hint, className }) => (
  <Field label={label} error={errors[name]} hint={hint} className={className}>
    {(props) => (
      <>
        <input {...props} name={name} type="file" accept=".pdf,.jpg,.jpeg,.png" onChange={(e) => setField(name, e.target.files?.[0] ?? null)} />
        {values[name] && <span className={styles.fileName}>{values[name].name}</span>}
      </>
    )}
  </Field>
);

export const CheckboxField = ({ label, name, values, errors, setField }) => {
  const id = useId();
  return (
    <div className={styles.check}>
      <input id={id} type="checkbox" name={name} checked={values[name]} aria-invalid={Boolean(errors[name])}
        onChange={(e) => setField(name, e.target.checked)} />
      <label htmlFor={id}>{label}</label>
      {errors[name] && <small className={styles.error} role="alert">{errors[name]}</small>}
    </div>
  );
};
