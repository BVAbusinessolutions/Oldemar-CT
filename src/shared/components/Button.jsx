import styles from './Button.module.css';

export const Button = ({ variant = 'primary', as: Tag = 'button', className = '', ...props }) => (
  <Tag className={`${styles.button} ${styles[variant]} ${className}`} {...props} />
);
