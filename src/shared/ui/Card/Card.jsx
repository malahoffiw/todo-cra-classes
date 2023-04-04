import styles from './styles.module.css';

export const Card = ({ data, onClick }) => (
  <div className={styles.card} onClick={onClick}>
    <h4 className={styles.title}>{data.title}</h4>
    <small className={styles.createdAt}>{data.createdAt}</small>
    <p className={styles.body}>{data.body}</p>
  </div>
);
