const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MAX_FILE_BYTES = 5 * 1024 * 1024;
const ALLOWED_FILE_TYPES = ['application/pdf', 'image/jpeg', 'image/png'];
export const MIN_AGE = 18;

const digitsOnly = (value) => value.replace(/\D/g, '');
const isNumericFormat = (value) => /^[\d\s-]+$/.test(value);

/** Cédula CR: 9 dígitos (1-0234-0567). DIMEX: 11 o 12 dígitos. Pasaporte: 6–12 alfanuméricos. */
export const isValidId = (type, value) => {
  const raw = value.trim();
  if (type === 'cedula') return isNumericFormat(raw) && digitsOnly(raw).length === 9;
  if (type === 'dimex') return isNumericFormat(raw) && [11, 12].includes(digitsOnly(raw).length);
  if (type === 'pasaporte') return /^[A-Za-z0-9]{6,12}$/.test(raw);
  return false;
};

export const ageOn = (birthDate, today = new Date()) => {
  const birth = new Date(`${birthDate}T00:00:00`);
  if (!birthDate || Number.isNaN(birth.getTime())) return NaN;
  const age = today.getFullYear() - birth.getFullYear();
  const beforeBirthday =
    today.getMonth() < birth.getMonth() ||
    (today.getMonth() === birth.getMonth() && today.getDate() < birth.getDate());
  return beforeBirthday ? age - 1 : age;
};

/** 8 dígitos (Costa Rica) o formato internacional con 10–15 dígitos. */
export const isValidPhone = (value) => {
  const compact = value.replace(/[\s-]/g, '');
  return /^\d{8}$/.test(compact) || /^\+?\d{10,15}$/.test(compact);
};

const fileError = (file, required) => {
  if (!file) return required ? 'Adjunta el documento.' : null;
  if (!ALLOWED_FILE_TYPES.includes(file.type)) return 'Formato permitido: PDF, JPG o PNG.';
  if (file.size > MAX_FILE_BYTES) return 'El archivo no debe superar 5 MB.';
  return null;
};

const validatePersonal = (v, today) => {
  const e = {};
  if (!v.firstName.trim()) e.firstName = 'Escribe tu nombre.';
  if (!v.lastName.trim()) e.lastName = 'Escribe tus apellidos.';
  if (!isValidId(v.idType, v.idNumber)) e.idNumber = 'Número no válido para el tipo de identificación elegido.';
  const age = ageOn(v.birthDate, today);
  if (Number.isNaN(age)) e.birthDate = 'Indica tu fecha de nacimiento.';
  else if (age < MIN_AGE) e.birthDate = `Debes ser mayor de ${MIN_AGE} años.`;
  if (!isValidPhone(v.phone)) e.phone = 'Teléfono no válido (8 dígitos o formato internacional).';
  if (!EMAIL_RE.test(v.email.trim())) e.email = 'Correo electrónico no válido.';
  if (!v.emergencyName.trim()) e.emergencyName = 'Indica un contacto de emergencia.';
  if (!isValidPhone(v.emergencyPhone)) e.emergencyPhone = 'Teléfono de emergencia no válido.';
  return e;
};

const validateLegal = (v, today) => {
  const e = {};
  if (!v.permitStatus) e.permitStatus = 'Selecciona la situación de tu permiso.';
  if (v.permitStatus === 'vigente') {
    if (!v.permitNumber.trim()) e.permitNumber = 'Indica el número de permiso.';
    if (!v.permitExpiry) e.permitExpiry = 'Indica la fecha de vencimiento.';
    else if (new Date(`${v.permitExpiry}T23:59:59`) < today) e.permitExpiry = 'Según la fecha, el permiso está vencido.';
  }
  if (!v.psychExam) e.psychExam = 'Selecciona el estado del examen psicológico.';
  if (!v.practicalExam) e.practicalExam = 'Selecciona el estado del examen teórico-práctico.';
  if (v.ownsWeapon === 'si' && !v.weaponDetails.trim()) e.weaponDetails = 'Describe el arma (tipo y calibre).';
  return e;
};

const validateCourse = (v) => {
  const e = {};
  if (!v.courseId) e.courseId = 'Elige un curso.';
  if (!v.experience) e.experience = 'Indica tu experiencia.';
  if (!v.schedule) e.schedule = 'Elige un horario preferido.';
  return e;
};

const validateDocuments = (v) => {
  const e = {};
  const idErr = fileError(v.idDocument, true);
  if (idErr) e.idDocument = idErr;
  const permitErr = fileError(v.permitDocument, v.permitStatus === 'vigente');
  if (permitErr) e.permitDocument = permitErr;
  if (!v.acceptsSafety) e.acceptsSafety = 'Debes aceptar las normas de seguridad.';
  if (!v.declaresNoRecord) e.declaresNoRecord = 'Esta declaración es obligatoria.';
  if (!v.acceptsPrivacy) e.acceptsPrivacy = 'Debes aceptar el tratamiento de datos.';
  return e;
};

export const STEP_VALIDATORS = [validatePersonal, validateLegal, validateCourse, validateDocuments];

export const validateStep = (stepIndex, values, today = new Date()) => STEP_VALIDATORS[stepIndex](values, today);

export const validateAll = (values, today = new Date()) =>
  STEP_VALIDATORS.reduce((acc, fn) => ({ ...acc, ...fn(values, today) }), {});
