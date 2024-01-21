import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import styles from './css/navbar.module.css';

import Hamburger from './Hamburger';
import { getAppStateContext } from '../context/AppContext';

function Navbar({ sections, isHamburgerOn, setIsHamburgerOn }) {
  const { currentPageIndex, isMobileView } = getAppStateContext();

  // const [isHamburgerOn, setIsHamburgerOn] = useState(false);

  // const navItemClickCb = (idx) => {
  //   console.log('Clicked Nav item', sections[idx]);
  // };

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
                // navItemClickCb(idx);
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
            <a
              className={styles.auxilaryButton}
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
            >
              Resume
            </a>
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
