import { Link } from 'react-router-dom';
import { brand } from '../../../config/content';
import styles from './Footer.module.css';

export const Footer = () => (
  <footer className={styles.footer}>
    <div className={`container ${styles.grid}`}>
      <p className={styles.big}>{brand.name}</p>
      <ul className={styles.contact}>
        <li><a href={`tel:${brand.phone.replace(/\s|-/g, '')}`}>{brand.phone}</a></li>
        <li><a href={`mailto:${brand.email}`}>{brand.email}</a></li>
        <li><a href={brand.instagram} target="_blank" rel="noreferrer">Instagram</a></li>
        <li>{brand.location}</li>
      </ul>
      <p className={styles.legal}>
        © {new Date().getFullYear()} {brand.name}. Uso responsable de armas de fuego. · <Link to="/admin">Acceso administrativo</Link>
      </p>
    </div>
  </footer>
);
