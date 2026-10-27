import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { steps } from '../../../config/content';
import styles from './Process.module.css';

/** Segunda sección "espectáculo": recorrido horizontal fijado (solo escritorio y sin reduced-motion). */
export const Process = () => {
  const root = useRef(null);
  const track = useRef(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add('(min-width: 861px) and (prefers-reduced-motion: no-preference)', () => {
        const distance = () => track.current.scrollWidth - window.innerWidth;
        gsap.to(track.current, {
          x: () => -distance(),
          ease: 'none',
          scrollTrigger: { trigger: root.current, start: 'top top', end: () => `+=${distance()}`, scrub: 0.5, pin: true, invalidateOnRefresh: true },
        });
      });
    },
    { scope: root },
  );

  return (
    <section ref={root} className={styles.process} aria-labelledby="process-title">
      <div ref={track} className={styles.track}>
        <div className={styles.intro}>
          <p className={styles.eyebrow}>Cómo funciona</p>
          <h2 id="process-title">Del formulario<br />a la línea de tiro</h2>
        </div>
        {steps.map((s) => (
          <article key={s.n} className={styles.step}>
            <span className={styles.n}>{s.n}</span>
            <h3>{s.title}</h3>
            <p>{s.text}</p>
          </article>
        ))}
      </div>
    </section>
  );
};
