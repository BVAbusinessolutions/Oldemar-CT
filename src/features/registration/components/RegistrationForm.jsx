import { useRegistrationForm, STEP_TITLES } from '../hooks/useRegistrationForm';
import { Button } from '../../../shared/components/Button';
import { PersonalStep } from './steps/PersonalStep';
import { LegalStep } from './steps/LegalStep';
import { CourseStep } from './steps/CourseStep';
import { DocumentsStep } from './steps/DocumentsStep';
import styles from './RegistrationForm.module.css';

const STEPS = [PersonalStep, LegalStep, CourseStep, DocumentsStep];

export const RegistrationForm = () => {
  const { values, errors, step, status, result, isLastStep, setField, next, back, submit, reset } = useRegistrationForm();
  const StepComponent = STEPS[step];

  if (status === 'done') {
    return (
      <div className={styles.done} role="status">
        <span className={styles.doneMark} aria-hidden="true">✓</span>
        <h3>Inscripción recibida</h3>
        <p>Gracias, {result.firstName}. Revisaremos tus datos y te contactaremos para coordinar tu primera sesión.</p>
        <p className={styles.code}>Código: {result.id.slice(0, 8).toUpperCase()}</p>
        <Button variant="ghost" onClick={reset}>Nueva inscripción</Button>
      </div>
    );
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    if (isLastStep) submit();
    else next();
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit} noValidate>
      <ol className={styles.progress} aria-label="Pasos del formulario">
        {STEP_TITLES.map((title, i) => (
          <li key={title} className={i <= step ? styles.active : ''} aria-current={i === step ? 'step' : undefined}>
            <span>{String(i + 1).padStart(2, '0')}</span> {title}
          </li>
        ))}
      </ol>

      <fieldset className={styles.fieldset}>
        <legend className="visually-hidden">{STEP_TITLES[step]}</legend>
        <StepComponent values={values} errors={errors} setField={setField} />
      </fieldset>

      {status === 'error' && (
        <p className={styles.formError} role="alert">No pudimos enviar tu inscripción. Intenta de nuevo en unos minutos.</p>
      )}

      <div className={styles.actions}>
        {step > 0 && <Button type="button" variant="ghost" onClick={back}>Atrás</Button>}
        <Button type="submit" disabled={status === 'sending'}>
          {isLastStep ? (status === 'sending' ? 'Enviando…' : 'Enviar inscripción') : 'Siguiente'}
        </Button>
      </div>
    </form>
  );
};
