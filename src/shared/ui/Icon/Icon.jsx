import styles from './styles.module.css';

export const Icon = ({ onClick, children }) => (
  <div className={styles.icon} onClick={onClick}>
    {children}
  </div>
);
