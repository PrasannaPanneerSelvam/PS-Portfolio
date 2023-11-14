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

export default navBarHandler;
