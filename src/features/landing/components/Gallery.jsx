import { gallery } from '../../../config/content';
import { Reveal } from '../../../shared/components/Reveal';
import styles from './Gallery.module.css';

const Media = ({ item }) => {
  if (!item.src) {
    return <div className={styles.placeholder}><span>{item.type === 'video' ? '▶ Video' : 'Foto'} pendiente</span></div>;
  }
  if (item.type === 'video') {
    return <video src={item.src} poster={item.poster ?? undefined} muted loop playsInline controls preload="metadata" />;
  }
  return <img src={item.src} alt={item.caption} loading="lazy" />;
};

export const Gallery = () => (
  <section id="galeria" className={styles.gallery} aria-labelledby="gallery-title">
    <div className="container">
      <header className={styles.head}>
        <h2 id="gallery-title">En el campo</h2>
        <p>Fotos y videos de nuestras clases.</p>
      </header>
      <div className={styles.grid}>
        {gallery.map((item, i) => (
          <Reveal as="figure" key={item.id} delay={(i % 3) * 80} className={`${styles.cell} ${styles[item.size]}`}>
            <Media item={item} />
            <figcaption>{item.caption}</figcaption>
          </Reveal>
        ))}
      </div>
    </div>
  </section>
);
