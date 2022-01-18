import MouseDistortionEffect from './MouseDistortionEffect.js';

const handleImages = (function () {
  const canvas = document.getElementById('myCanvas'),
    ctx = canvas.getContext('2d');

  function setCanvasDimensions() {
    canvas.width = window.innerWidth / 2;
    canvas.height = window.innerHeight / 2;
  }

  setCanvasDimensions();
  window.addEventListener('resize', setCanvasDimensions);

  function setImage() {
    const height = canvas.height,
      width = canvas.width;

    const padding = 30;
    const calcHeight = height - 2 * padding,
      calcWidth = width - 2 * padding;

    return;
  }

  function handleImages(imageUrl) {
    const htmlImage = new Image();
    htmlImage.src = imageUrl;
    htmlImage.height = 400;
    htmlImage.width = 400;

    htmlImage.onload = function () {
      const effect = new MouseDistortionEffect(canvas, ctx, htmlImage, {
        x: 80,
        y: 30,
      });
      effect.mountMouseEvents(canvas);

      effect.render();
    };
  }
  return handleImages;
})();

handleImages('./images/html.png');
