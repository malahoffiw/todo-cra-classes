import styles from './styles.module.css';
import { TfiSearch } from 'react-icons/tfi';

export const FormInputText = ({ label, id, error, ...props }) => (
  <label data-id={id} className={`${styles.box} ${!!error ? styles.error : ''}`}>
    {id !== 'search' && <p className={styles.label}>{label}</p>}
    <input type="text" className={styles.input} id={id} {...props} />
    {id === 'search' && <TfiSearch />}
    {error && <p className={styles.errorText}>{error}</p>}
  </label>
);
