import Particle from './Particle.js';
const PixelEffect = (function () {
  class PixelEffect {
    #particleArray = [];
    #pixelArray = [];
    #ctx;
    #canvas;
    #image;
    #canvasOffset;
    #contentOffset;
    #optionalHexColor;
    #rotate;
    #noOfParticlesNotInPosition;

    constructor(
      canvasObj,
      ctx,
      image,
      contentOffset = { x: 0, y: 0 },
      rotate = false,
      optionalHexColor = null
    ) {
      this.#canvas = canvasObj;
      this.#ctx = ctx;
      this.#image = image;
      this.#contentOffset = contentOffset;
      this.#optionalHexColor = optionalHexColor;
      this.#initiate();

      this.#rotate = rotate;
      // const { x, y } = canvasObj.getBoundingClientRect();
      // this.#canvasOffset = { x, y };
    }

    #initiate() {
      this.#setImageData();
      this.#scanImageDataAndCreateParticles();
    }

    #setImageData() {
      const width = this.#image.width,
        height = this.#image.height,
        startX = this.#contentOffset.x,
        startY = this.#contentOffset.y;

      this.#ctx.drawImage(this.#image, startX, startY, width, height);
      this.#pixelArray = this.#ctx.getImageData(startX, startY, width, height);
      this.#ctx.clearRect(startX, startY, width, height);
    }

    #scanImageDataAndCreateParticles() {
      this.#noOfParticlesNotInPosition = 0;

      const data = this.#pixelArray.data,
        rowCount = this.#image.height,
        colCount = this.#image.width,
        startX = this.#contentOffset.x,
        startY = this.#contentOffset.y;

      let skip = 1,
        colJump = 0,
        rowJump = 0;
      for (let row = 0; row < rowCount; row++) {
        rowJump++;
        if (rowJump % skip === 0) rowJump = 0;
        else continue;

        for (let col = 0; col < colCount; col++) {
          colJump++;
          if (colJump % skip === 0) colJump = 0;
          else continue;

          const startIndex = row * 4 * colCount + col * 4,
            rVal = data[startIndex],
            gVal = data[startIndex + 1],
            bVal = data[startIndex + 2],
            aVal = data[startIndex + 3],
            x = col + startX,
            y = row + startY;

          if (aVal !== 0) {
            const hex = this.#optionalHexColor ?? [rVal, gVal, bVal];
            this.#particleArray.push(new Particle(x, y, hex));
            this.#noOfParticlesNotInPosition++;
          }
        }
      }
    }

    #rotateImage() {
      const width = this.#image.width,
        height = this.#image.height,
        startX = this.#contentOffset.x,
        startY = this.#contentOffset.y,
        ctx = this.#ctx;

      const rad = globalRadian();

      ctx.save();
      ctx.translate(startX + width / 2, startY + height / 2);

      ctx.rotate(rad);
      ctx.drawImage(this.#image, -width / 2, -height / 2, width, height);
      ctx.restore();
    }

    render() {
      const arr = this.#particleArray,
        { width, height } = this.#canvas,
        ctx = this.#ctx;

      const onPositionCallback = () => {
        this.#noOfParticlesNotInPosition--;
      };

      function clearAndUpdate(cb) {
        ctx.clearRect(0, 0, width, height);
        cb();
        requestAnimationFrame(bindedFn);
      }

      function animate() {
        if (this.#noOfParticlesNotInPosition !== 0) {
          const cb = () =>
            arr.forEach(i => i.update({ onPositionCallback }).draw(ctx));
          clearAndUpdate(cb);
          return;
        }

        if (this.#rotate === true) {
          clearAndUpdate(() => this.#rotateImage());
          return;
        }
      }

      const bindedFn = animate.bind(this);

      bindedFn();
    }
  }

  return PixelEffect;
})();

const handleImages = function (canvas) {
  const ctx = canvas.getContext('2d');

  function setCanvasDimensions(obj, per) {
    obj.width = window.innerWidth * per * 0.01;
    obj.height = window.innerHeight * per * 0.01;
  }

  setCanvasDimensions(canvas, 100);

  window.addEventListener('resize', () => {
    setCanvasDimensions(canvas, 50);
  });

  function setImage(height, width, padding, aspectRatio) {
    height -= padding * 2;
    width -= padding * 2;
    const calcWidth = width,
      calcHeight = aspectRatio * calcWidth;

    return { height: calcHeight, width: calcWidth };
  }

  function handleImages(imageUrl, size, offset, rotate, optionalHexColor) {
    const htmlImage = new Image();
    htmlImage.src = imageUrl;

    htmlImage.width = htmlImage.height = size;

    htmlImage.onload = function () {
      const effect = new PixelEffect(
        canvas,
        ctx,
        htmlImage,
        offset,
        rotate,
        optionalHexColor
      );
      effect.render();
    };
  }
  return handleImages;
};

// Only happy flow
function hexToRGBArray(str) {
  str = str.slice(1).toLowerCase();

  const hexMap = '0123456789abcdef';

  const result = [];
  for (let idx = 0; idx < 6; idx += 2) {
    const firstIndex = hexMap.indexOf(str[idx]),
      secondIndex = hexMap.indexOf(str[idx + 1]);

    result.push(16 * firstIndex + secondIndex);
  }

  return result;
}

let psFlag = true;

const globalRadian = (function () {
  let funcAngle = 0,
    angVel = psFlag === true ? 8 : 1;

  const radianConversionRatio = Math.PI / 180;

  function incAngle() {
    angVel = psFlag === true ? 8 : 3;

    funcAngle += angVel;
    funcAngle %= 360;
    return funcAngle * radianConversionRatio;
  }

  return incAngle;
})();

const canvasText = document.getElementById('myCanvas'),
  canvasOut = document.getElementById('myCanvas1');

const clearance = 20,
  offset = 100;

handleImages(canvasText)(
  './images/logotext.png',
  150,
  {
    x: offset + clearance - 5,
    y: offset + clearance - 5,
  },
  false,
  hexToRGBArray('#31a8ff')
);

handleImages(canvasOut)(
  './images/outline.png',
  150 + 2 * clearance,
  {
    x: offset,
    y: offset,
  },
  true,
  hexToRGBArray('#1d71af')
);

setInterval(() => {
  psFlag = !psFlag;
}, 500);
