import { useState } from 'react';
import PropTypes from 'prop-types';
import styles from './css/navbar.module.css';

import Hamburger from './Hamburger';
import { getAppStateContext } from '../context/AppContext';

function Navbar({ sections }) {
  const { currentPageIndex, isMobileView } = getAppStateContext();

  const [isHamburgerOn, setIsHamburgerOn] = useState(false);

  const navItemClickCb = (idx) => {
    console.log('Clicked Nav item', sections[idx]);
  };

  return (
    <header className={styles.primaryHeader}>
      <div className={styles.logo}></div>
      <Hamburger
        isTurnedOn={isHamburgerOn}
        onClickCallback={setIsHamburgerOn}
      />
      <nav>
        <ul
          className={
            styles.primaryNavBar + (isHamburgerOn ? ' ' + styles.active : '')
          }
        >
          {sections.map((sectionName, idx) => (
            <li
              className={styles.primaryNavItem}
              key={`nav-${sectionName}`}
              onClick={() => {
                if (isMobileView) setIsHamburgerOn((prev) => !prev);
                navItemClickCb(idx);
              }}
            >
              <a
                className={currentPageIndex === idx ? styles.activeNavItem : ''}
                href={`#${sectionName.toLowerCase()}`}
              >
                {sectionName}
              </a>
            </li>
          ))}

          {isMobileView || (
            <div
              className={styles.slider}
              style={{
                translate: `${currentPageIndex * 100}%`,
              }}
            ></div>
          )}

          <li
            className={styles.primaryNavItem}
            style={{
              paddingTop: isMobileView ? '1.25rem' : '0',
            }}
          >
            <button className={styles.auxilaryButton}>Resume</button>
          </li>
        </ul>
      </nav>
    </header>
  );
}

Navbar.propTypes = {
  sections: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default Navbar;
