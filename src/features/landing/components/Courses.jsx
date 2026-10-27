import { courses } from '../../../config/content';
import { Reveal } from '../../../shared/components/Reveal';
import styles from './Courses.module.css';

export const Courses = () => (
  <section id="cursos" className={styles.courses} aria-labelledby="courses-title">
    <div className="container">
      <Reveal as="h2" id="courses-title" className={styles.title}>Cursos</Reveal>
      <ol className={styles.list}>
        {courses.map((c, i) => (
          <Reveal as="li" key={c.id} delay={i * 70} className={styles.item}>
            <span className={styles.index}>{String(i + 1).padStart(2, '0')}</span>
            <h3>{c.title}</h3>
            <p className={styles.level}>{c.level}</p>
            <p className={styles.desc}>{c.description}</p>
          </Reveal>
        ))}
      </ol>
    </div>
  </section>
);
