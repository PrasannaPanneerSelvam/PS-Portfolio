function alterSkew(speed) {
  const styles = this.style;

  let xSkewAngle = speed,
    ySkewAngle = 0;

  styles.setProperty('--skew-x-angle', `${xSkewAngle}deg`);
  styles.setProperty('--skew-y-angle', `${ySkewAngle}deg`);
}

function addSkewEffect(elementsToBeSkewed) {
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
