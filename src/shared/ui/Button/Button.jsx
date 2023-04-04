import styles from './styles.module.css';
import { AiOutlineDelete, AiOutlinePlus } from 'react-icons/ai';
import { MdDone } from 'react-icons/md';

export const Button = ({ label, onClick, type, ...props }) => (
  <button className={`${styles.button} ${styles[type]}`} onClick={onClick} {...props}>
    {type === 'create' && <AiOutlinePlus />}
    {type === 'submit' && <MdDone />}
    {type === 'delete' && <AiOutlineDelete />}
  </button>
);
