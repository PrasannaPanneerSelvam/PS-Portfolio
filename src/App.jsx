import { useEffect, useRef } from 'react';
import './App.css';

import Navbar from './components/Navbar';
import { getAppStateContext } from './context/AppContext';

function navBarHandler(sections, pageIndexSetter, rootFontSize) {
  function throttle(cb, delay = 300) {
    let shouldWait = false,
      isSomeCallOnQueue = false;

    const timeOutFunc = () => {
      if (isSomeCallOnQueue) {
        cb();
        isSomeCallOnQueue = false;
        setTimeout(timeOutFunc, delay);
      } else {
        shouldWait = false;
      }
    };

    return () => {
      if (shouldWait) {
        isSomeCallOnQueue = true;
        return;
      }

      cb();
      shouldWait = true;
      setTimeout(timeOutFunc, delay);
    };
  }

  const onScrollFn = () => {
    let currentIndex = -1;

    const pageYOffSetWithTopPadding = window.pageYOffset + rootFontSize;

    for (let idx = 0; idx < sections.length; idx++) {
      const section = sections[idx];

      if (
        section.offsetTop + section.clientHeight <=
        pageYOffSetWithTopPadding
      ) {
        // console.log('Crossed ' + idx);
      } else if (section.offsetTop <= pageYOffSetWithTopPadding) {
        // console.log('On cover ' + idx);
        currentIndex = idx;
        break;
      }
    }

    pageIndexSetter(currentIndex);
  };

  // TODO :: Fix this
  return throttle(onScrollFn);
}

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
  const sections = ['Home', 'About', 'Projects', 'Contact'];

  return (
    <div>
      <Navbar sections={sections} currentPageIndex={currentPageIndex}></Navbar>

      {sections.map((sectionName, idx) => (
        <section
          key={`section-page-${idx}`}
          ref={(el) => (pagesRef.current[idx] = el)}
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
  );
}

export default App;
