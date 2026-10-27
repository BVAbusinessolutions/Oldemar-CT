import { RegistrationForm } from '../../registration';
import styles from './Enroll.module.css';

export const Enroll = () => (
  <section id="inscripcion" className={styles.enroll} aria-labelledby="enroll-title">
    <div className={`container ${styles.inner}`}>
      <header className={styles.head}>
        <h2 id="enroll-title">Inscríbete</h2>
        <p>Toma unos 5 minutos. Ten a mano tu identificación y, si lo tienes, tu permiso de portación.</p>
      </header>
      <RegistrationForm />
    </div>
  </section>
);
