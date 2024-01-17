import { throttle } from './../utils/timingUtils'

function navBarHandler(sections, pageIndexSetter, rootFontSize) {

  const onScrollFn = () => {
    // const screenHeight = document.body.getBoundingClientRect().height;
    let currentIndex = -1;

    const pageYOffSetWithTopPadding = window.scrollY + rootFontSize;

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
