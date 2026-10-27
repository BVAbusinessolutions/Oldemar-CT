import { SelectField, TextAreaField } from '../../../../shared/components/Field';
import { courses } from '../../../../config/content';
import { EXPERIENCE_LEVELS, SCHEDULES } from '../../utils/options';
import styles from '../RegistrationForm.module.css';

const COURSE_OPTIONS = courses.map((c) => ({ value: c.id, label: c.title }));

export const CourseStep = (form) => (
  <div className={styles.grid}>
    <SelectField {...form} name="courseId" label="Curso de interés" options={COURSE_OPTIONS} className={styles.full} />
    <SelectField {...form} name="experience" label="Experiencia previa" options={EXPERIENCE_LEVELS} />
    <SelectField {...form} name="schedule" label="Horario preferido" options={SCHEDULES} />
    <TextAreaField {...form} name="medicalNotes" label="Condiciones médicas o notas (opcional)"
      hint="Lesiones, problemas de visión o audición, medicamentos. Es confidencial." className={styles.full} />
  </div>
);
