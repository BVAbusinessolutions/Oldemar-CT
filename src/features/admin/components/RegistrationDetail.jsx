import { useState } from 'react';
import { courses } from '../../../config/content';
import { Button } from '../../../shared/components/Button';
import { PERMIT_STATUS, EXAM_STATUS, ID_TYPES, EXPERIENCE_LEVELS, SCHEDULES, REGISTRATION_STATUS, labelOf } from '../../registration';
import { maskValue, maskEmail } from '../utils/mask';
import styles from './AdminPanel.module.css';

const courseTitle = (id) => courses.find((c) => c.id === id)?.title ?? '—';
const formatDate = (iso) => (iso ? new Date(iso).toLocaleDateString('es-CR') : '—');

const Row = ({ label, children }) => (
  <div className={styles.row}><dt>{label}</dt><dd>{children || '—'}</dd></div>
);

export const RegistrationDetail = ({ registration: r, onStatusChange, onClose }) => {
  const [showSensitive, setShowSensitive] = useState(false);
  const sensitive = (value, masker = maskValue) => (showSensitive ? value : masker(value));

  return (
    <article className={styles.detail} aria-label={`Detalle de ${r.firstName} ${r.lastName}`}>
      <header className={styles.detailHead}>
        <div>
          <h3>{r.firstName} {r.lastName}</h3>
          <p className={styles.muted}>Recibida el {formatDate(r.createdAt)}</p>
        </div>
        <Button variant="ghost" onClick={onClose}>Cerrar</Button>
      </header>

      <div className={styles.detailTools}>
        <label>
          Estado{' '}
          <select value={r.status} onChange={(e) => onStatusChange(r.id, e.target.value)}>
            {REGISTRATION_STATUS.map((s) => <option key={s.value} value={s.value}>{s.label}</option>)}
          </select>
        </label>
        <Button variant="ghost" onClick={() => setShowSensitive((v) => !v)} aria-pressed={showSensitive}>
          {showSensitive ? 'Ocultar datos sensibles' : 'Mostrar datos sensibles'}
        </Button>
      </div>

      <section>
        <h4>Información general</h4>
        <dl className={styles.dl}>
          <Row label="Curso">{courseTitle(r.courseId)}</Row>
          <Row label="Experiencia">{labelOf(EXPERIENCE_LEVELS, r.experience)}</Row>
          <Row label="Horario">{labelOf(SCHEDULES, r.schedule)}</Row>
          <Row label="Nacionalidad">{r.nationality}</Row>
        </dl>
      </section>

      <section>
        <h4>Datos personales <span className={styles.badge}>Sensible</span></h4>
        <dl className={styles.dl}>
          <Row label={labelOf(ID_TYPES, r.idType)}>{sensitive(r.idNumber)}</Row>
          <Row label="Nacimiento">{showSensitive ? formatDate(r.birthDate) : '••/••/••••'}</Row>
          <Row label="Teléfono">{sensitive(r.phone)}</Row>
          <Row label="Correo">{sensitive(r.email, maskEmail)}</Row>
          <Row label="Dirección">{showSensitive ? r.address : '••••••'}</Row>
          <Row label="Emergencia">{r.emergencyName} · {sensitive(r.emergencyPhone)}</Row>
          <Row label="Notas médicas">{showSensitive ? r.medicalNotes : r.medicalNotes ? '••••••' : ''}</Row>
        </dl>
      </section>

      <section>
        <h4>Permisos y exámenes</h4>
        <dl className={styles.dl}>
          <Row label="Permiso">{labelOf(PERMIT_STATUS, r.permitStatus)}</Row>
          {r.permitStatus === 'vigente' && <Row label="N.º permiso">{sensitive(r.permitNumber)}</Row>}
          {r.permitStatus === 'vigente' && <Row label="Vence">{formatDate(r.permitExpiry)}</Row>}
          <Row label="Psicológico">{labelOf(EXAM_STATUS, r.psychExam)}</Row>
          <Row label="Teórico-práctico">{labelOf(EXAM_STATUS, r.practicalExam)}</Row>
          <Row label="Arma propia">{r.ownsWeapon === 'si' ? r.weaponDetails : 'No'}</Row>
        </dl>
      </section>

      <section>
        <h4>Documentos</h4>
        <dl className={styles.dl}>
          <Row label="Identificación">{r.idDocument?.name}</Row>
          <Row label="Permiso">{r.permitDocument?.name}</Row>
        </dl>
      </section>
    </article>
  );
};
