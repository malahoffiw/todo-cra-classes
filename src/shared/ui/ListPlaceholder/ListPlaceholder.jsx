import styles from './styles.module.css';
import { AiOutlineBulb } from 'react-icons/ai';

export const ListPlaceholder = () => (
  <div className={styles.wrapper}>
    <AiOutlineBulb size={45} className={styles.icon} />
    <p className={styles.text}>No tasks</p>
  </div>
);
