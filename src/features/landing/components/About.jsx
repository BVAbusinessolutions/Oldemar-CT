import { brand } from '../../../config/content';
import { Reveal } from '../../../shared/components/Reveal';
import styles from './About.module.css';

const VALUES = ['Seguridad ante todo', 'Fundamentos antes que velocidad', 'Grupos pequeños', 'Acompañamiento en tu permiso'];

export const About = () => (
  <section id="nosotros" className={styles.about} aria-labelledby="about-title">
    <div className={`container ${styles.grid}`}>
      <Reveal className={styles.years} aria-hidden="true">
        {brand.yearsExperience}<span>+</span>
      </Reveal>
      <div className={styles.text}>
        <Reveal as="p" className={styles.eyebrow}>Quiénes somos</Reveal>
        <Reveal as="h2" id="about-title" delay={80}>Años de línea de tiro, enseñando a hacerlo bien</Reveal>
        <Reveal as="p" delay={160} className={styles.body}>
          {brand.name} lleva más de {brand.yearsExperience} años como instructor de tiro, formando a personas que nunca
          habían tomado un arma y a tiradores que quieren mejorar. Cada clase empieza por la seguridad y termina con
          resultados que se ven en el blanco.
        </Reveal>
        <ul className={styles.values}>
          {VALUES.map((v, i) => (
            <Reveal as="li" key={v} delay={220 + i * 60}>{v}</Reveal>
          ))}
        </ul>
      </div>
    </div>
  </section>
);
