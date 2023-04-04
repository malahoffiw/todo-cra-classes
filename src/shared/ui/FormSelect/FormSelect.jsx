import styles from './styles.module.css';

export const FormSelect = ({ label, options, ...props }) => (
  <label className={styles.box}>
    <p className={styles.label}>{label}</p>
    <select className={styles.select} id={label.toLowerCase()} {...props}>
      {options.map((option) => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </select>
  </label>
);
