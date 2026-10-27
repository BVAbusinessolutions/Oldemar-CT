import { useState } from 'react';
import { initialValues } from '../utils/initialValues';
import { validateStep, STEP_VALIDATORS } from '../utils/validation';
import { registrationService } from '../services/registrationService';

export const STEP_TITLES = ['Datos personales', 'Permisos y exámenes', 'Curso', 'Documentos'];

export const useRegistrationForm = () => {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [step, setStep] = useState(0);
  const [status, setStatus] = useState('idle'); // idle | sending | done | error
  const [result, setResult] = useState(null);

  const setField = (name, value) => {
    setValues((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => (prev[name] ? { ...prev, [name]: undefined } : prev));
  };

  const checkStep = () => {
    const stepErrors = validateStep(step, values);
    setErrors(stepErrors);
    return Object.keys(stepErrors).length === 0;
  };

  const next = () => {
    if (checkStep()) setStep((s) => Math.min(s + 1, STEP_VALIDATORS.length - 1));
  };
  const back = () => setStep((s) => Math.max(s - 1, 0));

  const submit = async () => {
    if (!checkStep()) return;
    setStatus('sending');
    try {
      setResult(await registrationService.create(values));
      setStatus('done');
    } catch {
      setStatus('error');
    }
  };

  const reset = () => {
    setValues(initialValues);
    setErrors({});
    setStep(0);
    setStatus('idle');
    setResult(null);
  };

  const isLastStep = step === STEP_VALIDATORS.length - 1;

  return { values, errors, step, status, result, isLastStep, setField, next, back, submit, reset };
};
