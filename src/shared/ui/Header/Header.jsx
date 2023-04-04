import styles from './styles.module.css';

export const Header = ({ theme, children }) => {
  return (
    <header className={styles.header} data-theme={theme}>
      {children}
    </header>
  );
};
