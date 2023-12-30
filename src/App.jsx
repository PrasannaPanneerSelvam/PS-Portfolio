import { useEffect, useRef } from 'react';
import './App.css';

import Navbar from './components/Navbar';
import { getAppStateContext } from './context/AppContext';
import Contact from './pages/Contact';
import Home from './pages/Home';
import navBarHandler from './components/navBarHandler';
import ContactStick from './components/ContactStick';
import ContactIcons from './components/ContactIcons';

function App() {
  const { currentPageIndex, isMobileView, rootFontSize, setCurrentPageIndex } =
    getAppStateContext();

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
  }, []);

  const dummyPageStyles = {
    width: '100%',
    height: '100vh',
    color: '#000',
    fontSize: '2rem',
    display: 'grid',
    placeItems: 'center',
  };

  const colors = ['teal', 'indigo', 'darkgreen', 'darkslateblue'];
  const sectionsForMap = ['About', 'Projects'];

  const sections = ['Home', 'About', 'Projects', 'Contact'];

  return (
    <>
      <div>
        {/* <Navbar sections={sections} currentPageIndex={currentPageIndex}></Navbar> */}
        {!isMobileView && <ContactStick></ContactStick>}

        <Home reference={(el) => (pagesRef.current[0] = el)}></Home>
        <Contact reference={(el) => (pagesRef.current[1] = el)}></Contact>

        {sectionsForMap.map((sectionName, idx) => (
          <section
            key={`section-page-${idx}`}
            ref={(el) => (pagesRef.current[idx + 2] = el)}
            id={`${sectionName.toLowerCase()}`}
            style={{
              ...dummyPageStyles,
              background: colors[idx],
            }}
          >
            {sectionName}
          </section>
        ))}
      </div>
      <ContactIcons></ContactIcons>
    </>
  );
}

export default App;
