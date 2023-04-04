import styles from './styles.module.css';
import TextareaAutosize from 'react-textarea-autosize';

export const FormInputTextarea = ({ label, ...props }) => (
  <label className={styles.box}>
    <p className={styles.label}>{label}</p>
    <TextareaAutosize minRows={3} className={styles.textarea} id={label.toLowerCase()} {...props} />
  </label>
);
