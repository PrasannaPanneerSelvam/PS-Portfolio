import { useEffect, useRef, useState, lazy, Suspense } from 'react';
import './App.css';
import styles from './common.module.css';

import Navbar from './components/Navbar';
import { getAppStateContext } from './context/AppContext';
import Contact from './pages/Contact';
import Home from './pages/Home';
import navBarHandler from './components/navBarHandler';
import ContactStick from './components/ContactStick';
import About from './pages/About';
import SvgStore from './components/SvgStore';

const Planet = lazy(() => import('./components/Planet'));

function App() {
  const {
    currentPageIndex,
    isMobileView,
    rootFontSize,
    setCurrentPageIndex,
    isHeroAnimPending,
  } = getAppStateContext();

  const [isHamburgerOn, setIsHamburgerOn] = useState(false);

  const pagesRef = useRef([]);
  const mainContent = useRef();

  useEffect(() => {
    const onScrollListener = navBarHandler(
      mainContent.current,
      pagesRef.current,
      setCurrentPageIndex,
      rootFontSize
    );
    mainContent.current.addEventListener('scroll', onScrollListener);
    return () => {
      mainContent.current.removeEventListener('scroll', onScrollListener);
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

  const sections = ['Home', 'About', 'Contact'];

  const isContactPage = currentPageIndex === 2;

  return (
    <>
      <Suspense fallback={null}>
        <Planet />
      </Suspense>
      <Navbar
        sections={sections}
        isHamburgerOn={isHamburgerOn}
        setIsHamburgerOn={setIsHamburgerOn}
      />
      <div className={styles.topWrapper}>
        {!isMobileView && (
          <ContactStick
            show={
              (currentPageIndex !== 0 || !isHeroAnimPending) && !isContactPage
            }
          />
        )}
        <main
          className={[
            styles.mainContent,
            isHamburgerOn ? styles.blockMouseEvents : '',
          ].join(' ')}
          ref={mainContent}
        >
          <Home reference={(el) => (pagesRef.current[0] = el)} />
          <About reference={(el) => (pagesRef.current[1] = el)} />

          {/* {sectionsForMap.map((sectionName, idx) => (
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
          ))} */}
          <Contact
            reference={(el) => (pagesRef.current[2] = el)}
            expand={isContactPage}
          />
        </main>
      </div>
      <SvgStore />
    </>
  );
}

export default App;
