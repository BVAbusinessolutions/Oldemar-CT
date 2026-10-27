import { requirements } from '../../../config/content';
import { Reveal } from '../../../shared/components/Reveal';
import styles from './Requirements.module.css';

export const Requirements = () => (
  <section id="requisitos" className={styles.requirements} aria-labelledby="req-title">
    <div className="container">
      <Reveal as="h2" id="req-title" className={styles.title}>Qué necesitas</Reveal>
      <dl className={styles.grid}>
        {requirements.map((r, i) => (
          <Reveal key={r.title} delay={i * 70} className={styles.item}>
            <dt>{r.title}</dt>
            <dd>{r.text}</dd>
          </Reveal>
        ))}
      </dl>
      <p className={styles.note}>
        Los requisitos legales los define la autoridad competente y pueden cambiar. Confírmalos antes de iniciar tu trámite.
      </p>
    </div>
  </section>
);
