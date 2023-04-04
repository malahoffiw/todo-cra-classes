import { forwardRef } from 'react';
import { VscChromeClose } from 'react-icons/vsc';

import { Icon } from 'shared/ui';
import styles from './styles.module.css';

export const Modal = forwardRef(({ children, label, handleClose }, ref) => (
  <div ref={ref} className={styles.wrapper}>
    <div className={styles.container}>
      <div className={styles.modal}>
        <div className={styles.modalHeader}>
          <p>{label}</p>
          <Icon onClick={handleClose}>
            <VscChromeClose />
          </Icon>
        </div>
        <div className={styles.modalBody}>{children.slice(0, 3)}</div>
        {children.slice(3)}
      </div>
    </div>
  </div>
));
