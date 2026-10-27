import { useEffect, useState } from 'react';
import { brand } from '../../../config/content';
import styles from './Nav.module.css';

const LINKS = [
  { href: '#nosotros', label: 'Nosotros' },
  { href: '#cursos', label: 'Cursos' },
  { href: '#galeria', label: 'Galería' },
  { href: '#requisitos', label: 'Requisitos' },
];

export const Nav = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(max > 0 ? window.scrollY / max : 0);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header className={styles.nav}>
      <a href="#inicio" className={styles.logo}>
        <span className={styles.logoMark} aria-hidden="true" />
        {brand.name}
      </a>
      <nav aria-label="Principal">
        <ul className={styles.links}>
          {LINKS.map((l) => <li key={l.href}><a href={l.href}>{l.label}</a></li>)}
        </ul>
      </nav>
      <a href="#inscripcion" className={styles.cta}>Inscribirme</a>
      <span className={styles.progress} style={{ transform: `scaleX(${progress})` }} aria-hidden="true" />
    </header>
  );
};
