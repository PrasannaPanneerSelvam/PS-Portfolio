import { useState } from 'react';
import styles from './hamburger.module.css';

function Hamburger({ isTurnedOn, onClickCallback }) {
  const hamburgerButtonClasses = [styles.hamburgerButton];

  if (isTurnedOn) {
    hamburgerButtonClasses.push(styles.active);
  }

  return (
    <div className={styles.hamburgerButtonHolder} onClick={onClickCallback}>
      <div className={hamburgerButtonClasses.join(' ')}></div>
    </div>
  );
}

export default Hamburger;
