function applySmoothScrollEffectToContent(scrollWrap) {

  function setBodyHeightOnResize() {
    const height = scrollWrap.getBoundingClientRect().height - 1;
    document.body.style.height = `${Math.floor(height)}px`;
  }

  const reducedScrollSpeed = 0.04;
  let offset = 0;

  const cssStyleObj = scrollWrap.style;
  cssStyleObj.transform = 'translateY(var(--scroll-offset, 0))';

  function smoothScroll() {
    offset += (window.pageYOffset - offset) * reducedScrollSpeed;
    cssStyleObj.setProperty('--scroll-offset', `${-offset}px`);

    requestAnimationFrame(smoothScroll);
  }

  setBodyHeightOnResize();
  smoothScroll();

  return setBodyHeightOnResize;
}

export default applySmoothScrollEffectToContent;
