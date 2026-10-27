import { useReveal } from '../hooks/useReveal';
import styles from './Reveal.module.css';

export const Reveal = ({ as: Tag = 'div', delay = 0, className = '', children, ...rest }) => {
  const ref = useReveal();
  return (
    <Tag ref={ref} className={`${styles.reveal} ${className}`} style={{ '--delay': `${delay}ms` }} {...rest}>
      {children}
    </Tag>
  );
};
