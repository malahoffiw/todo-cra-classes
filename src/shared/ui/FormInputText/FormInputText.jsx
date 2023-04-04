import styles from './styles.module.css';
import { TfiSearch } from 'react-icons/tfi';

export const FormInputText = ({ label, error, ...props }) => (
  <label data-label={label} className={`${styles.box} ${!!error ? styles.error : ''}`}>
    {label !== 'Search' && <p className={styles.label}>{label}</p>}
    <input type="text" className={styles.input} id={label && label.toLowerCase()} {...props} />
    {label === 'Search' && <TfiSearch />}
    {error && <p className={styles.errorText}>{error}</p>}
  </label>
);
