function applySmoothScrollEffectToContent(scrollWrap) {
  function setBodyHeightOnResize() {
    const height = scrollWrap.getBoundingClientRect().height - 1;
    document.body.style.height = `${Math.floor(height)}px`;
  }

  const reducedScrollSpeed = 0.04,
    isMobileView =
      getComputedStyle(document.body)
        .getPropertyValue('--is-mobile-view')
        .trim() === '"true"';
  let offset = 0;

  const cssStyleObj = scrollWrap.style;
  cssStyleObj.transform = 'translateY(var(--scroll-offset, 0))';

  function smoothScroll() {
    offset += (window.pageYOffset - offset) * reducedScrollSpeed;
    cssStyleObj.setProperty('--scroll-offset', `${-offset}px`);

    requestAnimationFrame(smoothScroll);
  }

  function setAndTriggerSmoothScrollForNavClick(finalValue) {
    let lastScrollValue = null;
    function navClickSmoothScroll() {
      offset += (window.pageYOffset - offset) * reducedScrollSpeed;
      cssStyleObj.setProperty('--scroll-offset', `${-offset}px`);

      if (lastScrollValue !== finalValue) {
        lastScrollValue = offset;
        requestAnimationFrame(navClickSmoothScroll);
      } else {
        lastScrollValue = null;
      }
    }

    navClickSmoothScroll();
  }

  setBodyHeightOnResize();

  if (isMobileView) {
    window.addEventListener('scroll', () => {
      cssStyleObj.setProperty('--scroll-offset', `${-window.pageYOffset}px`);
    });
  } else {
    smoothScroll();
  }

  return {
    setBodyHeightOnResize,
    navScrollEffect: isMobileView
      ? setAndTriggerSmoothScrollForNavClick
      : () => {},
  };
}

export default applySmoothScrollEffectToContent;
