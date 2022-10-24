import { Maybe } from './CommonTypes'

import CopyContactIcons from './CopyContactIcons';
import { scrollNavbarCallback, setNavigationClicks } from './navbar';
import applySmoothScrollEffectToContent from './smoothScroll';
import ProgressScrollBar from './ProgressScrollbar';
import Constellation from './constellation';
import TypeWriter from './typeWrite';
import ParallaxTilt from './ParallaxTilt';
import addSkewEffect from './skewCard';
import {
  activateSkillShowCaseAnimation,
  setContainerSize,
} from './SkillsShowCase';
import ActivateSocialMediaAnimation from './Contact';
import CopyTextToClipBoard from './CopyText';
import ResizeAnimationsHandler from './ResizeHandler';

CopyContactIcons();

// Smoothening the scroll
const { setBodyHeightOnResize, navScrollEffect } =
  applySmoothScrollEffectToContent(
    document.getElementsByClassName('smooth-scroll-container')[0] as HTMLElement
  );

setNavigationClicks(navScrollEffect);

const scrollBar = document.getElementsByClassName('scroll-bar')[0] as HTMLElement,
  scrollThumb = document.getElementsByClassName('progress-bar')[0] as HTMLElement;

const { resizeEventCallback, scrollEventCallback } = ProgressScrollBar({
  scrollBar,
  scrollThumb,
});

window.addEventListener('scroll', scrollNavbarCallback());

activateSkillShowCaseAnimation();

// Constellation effect addition
function IncludeConstellationEffect() {
  const canvasId = 'constellation-canvas';

  const canvas = document.getElementById(canvasId) as Maybe<HTMLCanvasElement>;

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
const tiltCards = Array.from(document.getElementsByClassName('tilt-card'));

tiltCards.forEach(element => {
  new ParallaxTilt(element as HTMLElement, { maxDeflection: 10, childrenProjectionDistance: undefined, scaleOnHover: undefined });
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
