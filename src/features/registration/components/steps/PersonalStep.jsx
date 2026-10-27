import { TextField, SelectField } from '../../../../shared/components/Field';
import { ID_TYPES } from '../../utils/options';
import styles from '../RegistrationForm.module.css';

export const PersonalStep = (form) => (
  <div className={styles.grid}>
    <TextField {...form} name="firstName" label="Nombre" autoComplete="given-name" />
    <TextField {...form} name="lastName" label="Apellidos" autoComplete="family-name" />
    <SelectField {...form} name="idType" label="Tipo de identificación" options={ID_TYPES} />
    <TextField {...form} name="idNumber" label="Número de identificación" hint="Cédula: 9 dígitos, p. ej. 1-0234-0567" />
    <TextField {...form} name="birthDate" label="Fecha de nacimiento" type="date" />
    <TextField {...form} name="nationality" label="Nacionalidad" />
    <TextField {...form} name="phone" label="Teléfono" type="tel" autoComplete="tel" />
    <TextField {...form} name="email" label="Correo electrónico" type="email" autoComplete="email" />
    <TextField {...form} name="address" label="Provincia / dirección" className={styles.full} />
    <TextField {...form} name="emergencyName" label="Contacto de emergencia" />
    <TextField {...form} name="emergencyPhone" label="Teléfono de emergencia" type="tel" />
  </div>
);
