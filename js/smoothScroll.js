function applySmoothScrollEffectToContent(contentWrapper) {
  const bodyStyle = document.body.style,
    scrollWrap = contentWrapper,
    height = scrollWrap.getBoundingClientRect().height - 1,
    reducedScrollSpeed = 0.04;

  let offset = 0;

  bodyStyle.height = Math.floor(height) + 'px';

  function smoothScroll() {
    offset += (window.pageYOffset - offset) * reducedScrollSpeed;
    scrollWrap.style.transform = `translateY(${-offset}px)`;

    requestAnimationFrame(smoothScroll);
  }

  smoothScroll();
}

export default applySmoothScrollEffectToContent;
