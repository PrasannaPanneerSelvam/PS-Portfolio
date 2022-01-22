function ProgressScrollBar({ scrollBar, scrollThumb }) {
  let scrollBarHeight,
    entireContentHeight,
    maxYScrollPoint,
    initValue,
    percentagePerStep;

  // For touch tab & laptop screens
  scrollBar.addEventListener('click', ({ y }) => {
    const percent = y / scrollBarHeight,
      initPercent = initValue / 100;

    window.scrollTo({
      top: Math.max(0, percent - initPercent) * entireContentHeight,
    });
  });

  function resetScrollBarDetails() {
    scrollBarHeight = window.getComputedStyle(scrollBar).height.split('px')[0];
    entireContentHeight = document.body.style.height.split('px')[0];
    maxYScrollPoint = entireContentHeight - scrollBarHeight;
    initValue = (scrollBarHeight * 100) / entireContentHeight;
    percentagePerStep = (100 - initValue) / maxYScrollPoint;
    setScrollThumbHeight();
  }

  function setScrollThumbHeight() {
    scrollThumb.style.setProperty(
      '--progress-height',
      `${initValue + percentagePerStep * window.pageYOffset}%`
    );
  }

  resetScrollBarDetails();

  return {
    resizeEventCallback: resetScrollBarDetails,
    scrollEventCallback: setScrollThumbHeight,
  };
}

export default ProgressScrollBar;
