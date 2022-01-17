import applySmoothScrollEffectToContent from './smoothScroll.js';
import addSkewEffect from './skewCard.js';
import ParallaxTilt from './ParallaxTilt.js'
import Constellation from './constellation.js'


// Smoothening the scroll
applySmoothScrollEffectToContent(
  document.getElementsByClassName('smooth-scroll-container')[0]
);


// Constellation effect addition
function IncludeConstellationEffect() {
    const canvasId = 'constellation-canvas';
  
    const canvas = document.getElementById(canvasId);
  
    const setCanvasSize = function () {
      const { width, height } = window.getComputedStyle(this);
      this.width = width.split('px')[0];
      this.height = height.split('px')[0];
    }.bind(canvas);
  
    setCanvasSize();
  
    const ConstellationEffect = new Constellation(canvas);
    ConstellationEffect.animate();
  
    window.addEventListener('resize', () => {
      setCanvasSize();
      ConstellationEffect.updateOnResize();
    });
  
    const constellationObserver = new IntersectionObserver(entries => {
      ConstellationEffect.toggleAnimation(!entries[0].isIntersecting);
    });
  
    constellationObserver.observe(canvas);
}
  
IncludeConstellationEffect();
  

// Applying Parallax tilt effect
const tiltCards = [...document.getElementsByClassName('tilt-card')]

tiltCards.forEach(element => {
    new ParallaxTilt(element, {maxDeflection:10});
});


// Adding skew effect on scroll
addSkewEffect(document.getElementsByClassName('skew-container'));



// Copy to Clipboard - Sources : https://alligator.io/js/copying-to-clipboard/

const mailIdElement = document.getElementById('copy-mail-id');

mailIdElement.addEventListener('click', () => {
  const selection = window.getSelection();
  const range = document.createRange();
  range.selectNodeContents(mailIdElement);
  selection.removeAllRanges();
  selection.addRange(range);

  try {
    document.execCommand('copy');
    selection.removeAllRanges();

    mailIdElement.getElementsByClassName('mail')[0].dataset.status = 'Copied!';
    mailIdElement.classList.add('success');

    setTimeout(() => {
      mailIdElement.classList.remove('success');
      mailIdElement.getElementsByClassName('mail')[0].dataset.status = 'Click to Copy';
    }, 1200);
  } catch (e) {}
});
