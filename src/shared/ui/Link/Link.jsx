import styles from './styles.module.css';

export const Link = ({ to: { icon, active }, onClick }) => (
  <button className={styles.link} data-active={active} onClick={active ? null : onClick}>
    {icon}
  </button>
);
