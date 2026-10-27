import { TextField, SelectField, TextAreaField } from '../../../../shared/components/Field';
import { PERMIT_STATUS, EXAM_STATUS } from '../../utils/options';
import styles from '../RegistrationForm.module.css';

const OWNS_WEAPON = [
  { value: 'no', label: 'No' },
  { value: 'si', label: 'Sí, inscrita a mi nombre' },
];

export const LegalStep = (form) => {
  const hasPermit = form.values.permitStatus === 'vigente';
  return (
    <div className={styles.grid}>
      <SelectField {...form} name="permitStatus" label="¿Tienes permiso de portación?" options={PERMIT_STATUS} className={styles.full} />
      {hasPermit && (
        <>
          <TextField {...form} name="permitNumber" label="Número de permiso" />
          <TextField {...form} name="permitExpiry" label="Fecha de vencimiento" type="date" />
        </>
      )}
      <SelectField {...form} name="psychExam" label="Examen psicológico" options={EXAM_STATUS} />
      <SelectField {...form} name="practicalExam" label="Examen teórico-práctico" options={EXAM_STATUS} />
      <SelectField {...form} name="ownsWeapon" label="¿Tienes arma propia?" options={OWNS_WEAPON} />
      {form.values.ownsWeapon === 'si' && (
        <TextAreaField {...form} name="weaponDetails" label="Detalle del arma" hint="Tipo, marca y calibre. Ej.: pistola Glock 19, 9 mm" />
      )}
    </div>
  );
};
