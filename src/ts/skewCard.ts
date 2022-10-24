function alterSkew(speed: number) {
  const styles = this.style;

  let xSkewAngle = speed,
    ySkewAngle = 0;

  // styles.setProperty('--skew-x-angle', `${xSkewAngle}deg`);
  // styles.setProperty('--skew-y-angle', `${ySkewAngle}deg`);

  // styles.setProperty('--horizontal-angle', `${xSkewAngle * 10}deg`);

  const isMobileView = getComputedStyle(document.body)
    .getPropertyValue('--is-mobile-view')
    .trim();

  const sign = xSkewAngle < 0 ? -1 : 1;
  xSkewAngle = Math.min(Math.abs(xSkewAngle), 3);
  xSkewAngle *= sign;
  if (isMobileView === '"true"')
    styles.setProperty('--vertical-angle', `${-xSkewAngle * 10}deg`);
}

function addSkewEffect(elementsToBeSkewed: HTMLCollection) {
  let lastValue = window.scrollY,
    scrollDiff,
    currentScroll,
    speed;

  function skewElementsOnScroll() {
    currentScroll = window.scrollY;
    scrollDiff = lastValue - window.scrollY;
    lastValue = currentScroll;

    speed = scrollDiff / 10;

    for (let idx = 0; idx < elementsToBeSkewed.length; idx++)
      alterSkew.call(elementsToBeSkewed[idx], speed);

    requestAnimationFrame(skewElementsOnScroll);
  }

  skewElementsOnScroll();
}

export default addSkewEffect;
