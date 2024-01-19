import { throttle } from './../utils/timingUtils'

function navBarHandler(parentNode, sections, pageIndexSetter, rootFontSize) {

  const onScrollFn = () => {
    // console.log("In `onScrollFn`", sections.length);
    // const screenHeight = document.body.getBoundingClientRect().height;
    let currentIndex = -1;

    const pageYOffSetWithTopPadding = parentNode.scrollTop;
    // console.log("Ps =>");
    // console.dir(parentNode)

    for (let idx = 0; idx < sections.length; idx++) {
      const section = sections[idx];

      // console.log("Section", idx, section.offsetTop, parentNode.scrollTop)

      // if (
      //   section.offsetTop + section.clientHeight <=
      //   pageYOffSetWithTopPadding
      // ) {
      //   // console.log('Crossed ' + idx);
      // } else if (section.offsetTop <= pageYOffSetWithTopPadding) {
      //   // console.log('On cover ' + idx);
      //   currentIndex = idx;
      //   // break;
      // }

      if (section.offsetTop === pageYOffSetWithTopPadding) {
        // console.log("Ps", idx)
        currentIndex = idx;
        break;
      }
    }

    // console.log("Prithiv", currentIndex)

    if (currentIndex !== -1)
      pageIndexSetter(currentIndex);
  };

  // TODO :: Fix this
  return throttle(onScrollFn);
}

export default navBarHandler;
