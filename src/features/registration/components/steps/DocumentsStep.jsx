import { FileField, CheckboxField } from '../../../../shared/components/Field';
import styles from '../RegistrationForm.module.css';

export const DocumentsStep = (form) => {
  const permitRequired = form.values.permitStatus === 'vigente';
  return (
    <div className={styles.grid}>
      <FileField {...form} name="idDocument" label="Foto de la identificación (ambos lados)" hint="PDF, JPG o PNG · máx. 5 MB" />
      <FileField {...form} name="permitDocument" label={`Permiso de portación${permitRequired ? '' : ' (opcional)'}`}
        hint="PDF, JPG o PNG · máx. 5 MB" />
      <div className={`${styles.full} ${styles.checks}`}>
        <CheckboxField {...form} name="acceptsSafety"
          label="Me comprometo a cumplir las normas de seguridad del campo y las indicaciones del instructor en todo momento." />
        <CheckboxField {...form} name="declaresNoRecord"
          label="Declaro bajo juramento que no tengo impedimentos legales para el manejo de armas de fuego." />
        <CheckboxField {...form} name="acceptsPrivacy"
          label="Autorizo el tratamiento de mis datos personales únicamente para gestionar mi inscripción." />
      </div>
    </div>
  );
};
