import { useMemo } from 'react';
import styles from './css/hamburger.module.css';

function Hamburger({ isTurnedOn, onClickCallback }) {
  return useMemo(() => {
    return (
      <div
        className={styles.hamburgerButtonHolder}
        onClick={() => onClickCallback(!isTurnedOn)}
      >
        <div
          className={
            styles.hamburgerButton + (isTurnedOn ? ' ' + styles.active : '')
          }
        ></div>
      </div>
    );
  }, [isTurnedOn, onClickCallback]);
}

export default Hamburger;
