import PixelEffect from './PixelEffect.js';
import { hexToRGBArray } from './Utils.js';

const handleImages = function (canvas) {
  const ctx = canvas.getContext('2d');

  function setCanvasDimensions(obj, per) {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    canvas.__psCenter = { x: canvas.width / 2, y: canvas.height / 2 };
  }

  setCanvasDimensions();
  window.addEventListener('resize', setCanvasDimensions);

  function handleImages(
    imageUrl,
    size,
    additionOffset,
    rotate,
    optionalHexColor
  ) {
    const htmlImage = new Image();
    htmlImage.src = imageUrl;

    htmlImage.width = htmlImage.height = size;

    // TODO :: Load only after all required images are loaded
    htmlImage.onload = function () {
      const xOffset = canvas.__psCenter.x - size / 2,
        yOffset = canvas.__psCenter.y - size / 2;
      const effect = new PixelEffect(
        canvas,
        ctx,
        htmlImage,
        { x: xOffset + additionOffset.x, y: yOffset + additionOffset.y },
        rotate,
        optionalHexColor
      );
      effect.render();
    };
  }
  return handleImages;
};

const canvasText = document.getElementById('myCanvas'),
  canvasOut = document.getElementById('myCanvas1');

const clearance = 20,
  offset = 100;

handleImages(canvasText)(
  './images/logotext.png',
  150,
  {
    x: -1,
    y: -2,
  },
  false,
  hexToRGBArray('#31a8ff')
);

handleImages(canvasOut)(
  './images/outline.png',
  150 + 2 * clearance,
  {
    x: 0,
    y: 0,
  },
  true,
  hexToRGBArray('#1d71af')
);
