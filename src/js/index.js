import applySmoothScrollEffectToContent from './smoothScroll.js';
import addSkewEffect from './skewCard.js';
import ParallaxTilt from './ParallaxTilt.js';
import Constellation from './constellation.js';
import CopyTextToClipBoard from './CopyText.js';
import ProgressScrollBar from './ProgressScrollbar.js';
import TypeWriter from './typeWrite.js';
import NavbarScrollCallback from './navbar.js';
import activateSkillShowCaseAnimation from './SkillsShowCase.js'

// Smoothening the scroll
const SmoothScrollResize = applySmoothScrollEffectToContent(
  document.getElementsByClassName('smooth-scroll-container')[0]
);

const scrollBar = document.getElementsByClassName('scroll-bar')[0],
  scrollThumb = document.getElementsByClassName('progress-bar')[0];

const { resizeEventCallback, scrollEventCallback } = ProgressScrollBar({
  scrollBar,
  scrollThumb,
});

window.addEventListener('scroll', NavbarScrollCallback());

activateSkillShowCaseAnimation();

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

  const constellationObserver = new IntersectionObserver(entries => {
    ConstellationEffect.toggleAnimation(!entries[0].isIntersecting);
  });

  constellationObserver.observe(canvas);

  return () => {
    setCanvasSize();
    ConstellationEffect.updateOnResize();
  };
}

const ConstellationResize = IncludeConstellationEffect();

// Adding Typewriter effect
const words = ['cleaner', 'cool', 'faster'];
const typeWriter = new TypeWriter('typewrite-text', words);
typeWriter.update();

// Applying Parallax tilt effect
const tiltCards = [...document.getElementsByClassName('tilt-card')];

tiltCards.forEach(element => {
  new ParallaxTilt(element, { maxDeflection: 10 });
});

// Adding skew effect on scroll
addSkewEffect(document.getElementsByClassName('skew-container'));

// Adding up window resize callbacks
const resizeFunctions = [
  SmoothScrollResize,
  ConstellationResize,
  resizeEventCallback,
  typeWriter.setTypeWriterDimensionsAndUpdateParent.bind(typeWriter),
];

window.addEventListener('resize', () => {
  for (let idx = 0; idx < resizeFunctions.length; idx++) {
    resizeFunctions[idx]();
  }
});

CopyTextToClipBoard();

window.addEventListener('scroll', scrollEventCallback);
