export const ID_TYPES = [
  { value: 'cedula', label: 'Cédula de identidad' },
  { value: 'dimex', label: 'DIMEX (residente)' },
  { value: 'pasaporte', label: 'Pasaporte' },
];

export const PERMIT_STATUS = [
  { value: 'vigente', label: 'Sí, tengo permiso vigente' },
  { value: 'tramite', label: 'Está en trámite' },
  { value: 'vencido', label: 'Lo tuve, está vencido' },
  { value: 'no', label: 'No tengo permiso' },
];

export const EXAM_STATUS = [
  { value: 'aprobado', label: 'Aprobado' },
  { value: 'pendiente', label: 'Pendiente / programado' },
  { value: 'no', label: 'No lo he realizado' },
];

export const EXPERIENCE_LEVELS = [
  { value: 'ninguna', label: 'Nunca he disparado' },
  { value: 'basica', label: 'Básica (algunas veces)' },
  { value: 'intermedia', label: 'Intermedia (práctica regular)' },
  { value: 'avanzada', label: 'Avanzada' },
];

export const SCHEDULES = [
  { value: 'manana', label: 'Mañana' },
  { value: 'tarde', label: 'Tarde' },
  { value: 'fin-semana', label: 'Fin de semana' },
];

export const REGISTRATION_STATUS = [
  { value: 'pendiente', label: 'Pendiente' },
  { value: 'aprobado', label: 'Aprobado' },
  { value: 'rechazado', label: 'Rechazado' },
];

export const labelOf = (options, value) => options.find((o) => o.value === value)?.label ?? '—';
