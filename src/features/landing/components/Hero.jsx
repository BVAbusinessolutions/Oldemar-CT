import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { brand, heroVideo } from '../../../config/content';
import { Button } from '../../../shared/components/Button';
import styles from './Hero.module.css';

gsap.registerPlugin(ScrollTrigger, useGSAP);

const RINGS = [180, 150, 120, 90, 60, 30];
const IMPACTS = [
  { x: 6, y: -4 },
  { x: -9, y: 7 },
  { x: 2, y: 11 },
];

const Target = () => (
  <svg viewBox="-200 -200 400 400" className={styles.target} aria-hidden="true" data-target>
    {RINGS.map((r, i) => (
      <circle key={r} r={r} className={i % 2 === 0 ? styles.ringDark : styles.ringLight} data-ring />
    ))}
    {RINGS.map((r, i) => (
      <text key={`n${r}`} x={r - 15} y="5" className={styles.ringNumber}>{i + 5}</text>
    ))}
    {IMPACTS.map((p) => (
      <g key={`${p.x}${p.y}`} transform={`translate(${p.x} ${p.y})`}>
        <circle r="5" className={styles.impact} data-impact />
      </g>
    ))}
  </svg>
);

const Scope = () => (
  <svg viewBox="-100 -100 200 200" className={styles.scope} aria-hidden="true" data-scope>
    <circle r="96" className={styles.scopeRing} />
    <line x1="-96" y1="0" x2="-12" y2="0" /><line x1="12" y1="0" x2="96" y2="0" />
    <line x1="0" y1="-96" x2="0" y2="-12" /><line x1="0" y1="12" x2="0" y2="96" />
    <circle r="2" className={styles.scopeDot} />
  </svg>
);

export const Hero = () => {
  const root = useRef(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add('(prefers-reduced-motion: no-preference)', () => {
        const tl = gsap.timeline({
          defaults: { ease: 'none' },
          scrollTrigger: { trigger: root.current, start: 'top top', end: '+=180%', scrub: 0.6, pin: true },
        });
        tl.to('[data-title-word]', { yPercent: -120, opacity: 0, stagger: 0.05, duration: 0.4 }, 0)
          .fromTo('[data-target]', { scale: 0.55, rotate: -12 }, { scale: 1.15, rotate: 0, duration: 1 }, 0)
          .fromTo('[data-scope]', { xPercent: 55, yPercent: -40, scale: 1.4 }, { xPercent: 0, yPercent: 0, scale: 1, duration: 0.9 }, 0)
          .from('[data-impact]', { scale: 0, transformOrigin: 'center', stagger: 0.08, duration: 0.15, ease: 'back.out(3)' }, 0.95)
          .from('[data-hero-final]', { y: 40, opacity: 0, stagger: 0.08, duration: 0.3 }, 1.1)
          .to('[data-scroll-hint]', { opacity: 0, duration: 0.1 }, 0);
      });
      mm.add('(prefers-reduced-motion: reduce)', () => {
        gsap.set('[data-title-word]', { opacity: 0 });
      });
    },
    { scope: root },
  );

  return (
    <section ref={root} className={styles.hero} id="inicio" aria-labelledby="hero-title">
      {heroVideo.src && (
        <video className={styles.video} src={heroVideo.src} poster={heroVideo.poster ?? undefined} autoPlay muted loop playsInline />
      )}
      <div className={styles.grain} aria-hidden="true" />

      <div className={styles.stage}>
        <Target />
        <Scope />
      </div>

      <h1 id="hero-title" className={styles.title}>
        <span data-title-word>Precisión</span>
        <span data-title-word className={styles.outline}>se entrena</span>
      </h1>

      <div className={styles.final}>
        <p data-hero-final className={styles.eyebrow}>{brand.name} · {brand.tagline}</p>
        <h2 data-hero-final className={styles.finalTitle}>Disciplina, seguridad<br />y puntería real</h2>
        <p data-hero-final className={styles.lead}>
          Más de {brand.yearsExperience} años formando tiradores con pistola 9 mm y carabina.
        </p>
        <div data-hero-final className={styles.ctas}>
          <Button as="a" href="#inscripcion">Inscribirme</Button>
          <Button as="a" href="#cursos" variant="ghost">Ver cursos</Button>
        </div>
      </div>

      <p className={styles.hint} data-scroll-hint aria-hidden="true">Desliza para apuntar ↓</p>
    </section>
  );
};
