import { useState } from 'react';
import styles from './navbar.module.css';

import Hamburger from './Hamburger';
import { getAppStateContext } from '../context/AppContext';

function Navbar({ currentPageIndex, sections }) {
  const { isMobileView } = getAppStateContext();
  const [isHamburgerOn, setIsHamburgerOn] = useState(false);

  const navbarClasses = [styles.navBar],
    navItemsClasses = [styles.navItemsList];

  if (isMobileView) {
    navItemsClasses.push(styles.mobile);
  }

  if (isHamburgerOn) {
    navbarClasses.push(styles.active);
    navItemsClasses.push(styles.active);
  }

  return (
    <nav className={navbarClasses.join(' ')}>
      {isMobileView && (
        <Hamburger
          isTurnedOn={isHamburgerOn}
          onClickCallback={() => {
            setIsHamburgerOn((prev) => !prev);
          }}
        ></Hamburger>
      )}
      <ul className={navItemsClasses.join(' ')}>
        {sections.map((section, idx) => (
          <li
            key={`nav-idx-${idx}`}
            className={styles.navItem}
            onClick={() => {
              if (!isMobileView) return;
              setIsHamburgerOn((prev) => !prev);
            }}
          >
            <a href={`#${section.toLowerCase()}`}>{section}</a>

            {isMobileView && (
              <div
                className={styles.growingBar}
                style={{
                  display: currentPageIndex === idx ? 'inline-block' : 'none',
                  //   scale: currentPageIndex === idx ? '1 1' : '0 1',
                  //   transformOrigin:
                  //     currentPageIndex === idx ? 'center left' : 'center right',
                }}
              ></div>
            )}
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
          className={styles.navItem}
          style={{
            paddingTop: isMobileView ? '1.25rem' : '0',
          }}
        >
          <button className={styles.auxilaryButton}>Resume</button>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
