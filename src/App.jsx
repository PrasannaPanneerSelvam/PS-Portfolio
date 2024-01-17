import { useEffect, useRef } from 'react';
import './App.css';
import styles from './common.module.css';

import Navbar from './components/Navbar';
import { getAppStateContext } from './context/AppContext';
import Contact from './pages/Contact';
import Home from './pages/Home';
import navBarHandler from './components/navBarHandler';
import ContactStick from './components/ContactStick';
import ContactIcons from './components/ContactIcons';
import About from './pages/About';
import Planet from './components/Planet';

function App() {
  const {
    currentPageIndex,
    isMobileView,
    rootFontSize,
    setCurrentPageIndex,
    isHeroAnimPending,
  } = getAppStateContext();

  const pagesRef = useRef([]);

  useEffect(() => {
    const onScrollListener = navBarHandler(
      pagesRef.current,
      setCurrentPageIndex,
      rootFontSize
    );

    window.addEventListener('scroll', onScrollListener);

    return () => {
      window.removeEventListener('scroll', onScrollListener);
    };
  }, [rootFontSize, setCurrentPageIndex]);

  const dummyPageStyles = {
    width: '100%',
    height: '100vh',
    color: '#000',
    fontSize: '2rem',
    display: 'grid',
    placeItems: 'center',
  };

  const colors = [
    'darkslateblue',
    'teal',
    'indigo',
    'darkgreen',
    'darkslateblue',
  ];
  const sectionsForMap = ['Projects'];

  const sections = ['Home', 'About', 'Projects', 'Contact'];

  return (
    <>
      <Planet />
      <Navbar sections={sections} />
      <div className={styles.topWrapper}>
        {!isMobileView && (
          <ContactStick
            show={
              (currentPageIndex !== 0 || !isHeroAnimPending) &&
              currentPageIndex !== 3
            }
          />
        )}
        <main className={styles.mainContent}>
          <Home reference={(el) => (pagesRef.current[0] = el)} />
          <About reference={(el) => (pagesRef.current[1] = el)} />

          {sectionsForMap.map((sectionName, idx) => (
            <section
              key={`section-page-${idx}`}
              ref={(el) => (pagesRef.current[idx + 2] = el)}
              id={`${sectionName.toLowerCase()}`}
              style={{
                ...dummyPageStyles,
                // background: colors[idx],
                border: `2px solid ${colors[idx]}`,
              }}
            >
              {sectionName}
            </section>
          ))}
          <Contact reference={(el) => (pagesRef.current[3] = el)} />
        </main>
      </div>
      <ContactIcons />
    </>
  );
}

export default App;
