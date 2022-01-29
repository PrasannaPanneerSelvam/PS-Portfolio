import CopyContactIcons from './CopyContactIcons.js';
import { scrollNavbarCallback, setNavigationClicks } from './navbar.js';
import applySmoothScrollEffectToContent from './smoothScroll.js';
import ProgressScrollBar from './ProgressScrollbar.js';
import Constellation from './constellation.js';
import TypeWriter from './typeWrite.js';
import ParallaxTilt from './ParallaxTilt.js';
import addSkewEffect from './skewCard.js';
import {
  activateSkillShowCaseAnimation,
  setContainerSize,
} from './SkillsShowCase.js';
import ActivateSocialMediaAnimation from './Contact.js';
import CopyTextToClipBoard from './CopyText.js';
import ResizeAnimationsHandler from './ResizeHandler.js';

CopyContactIcons();

// Smoothening the scroll
const { setBodyHeightOnResize, navScrollEffect } =
  applySmoothScrollEffectToContent(
    document.getElementsByClassName('smooth-scroll-container')[0]
  );

setNavigationClicks(navScrollEffect);

const scrollBar = document.getElementsByClassName('scroll-bar')[0],
  scrollThumb = document.getElementsByClassName('progress-bar')[0];

const { resizeEventCallback, scrollEventCallback } = ProgressScrollBar({
  scrollBar,
  scrollThumb,
});

window.addEventListener('scroll', scrollNavbarCallback());

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

  const rootStyles = getComputedStyle(document.body);

  const options = {
    particleColor: rootStyles.getPropertyValue(
      '--constellation-particle-color'
    ),
    linkColor: rootStyles.getPropertyValue('--constellation-link-color'),
  };

  const ConstellationEffect = new Constellation(canvas, options);
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
  setBodyHeightOnResize,
  ConstellationResize,
  setContainerSize,
  resizeEventCallback,
  typeWriter.setTypeWriterDimensionsAndUpdateParent.bind(typeWriter),
];

ResizeAnimationsHandler(resizeFunctions);

CopyTextToClipBoard();
ActivateSocialMediaAnimation();

window.addEventListener('scroll', scrollEventCallback);
