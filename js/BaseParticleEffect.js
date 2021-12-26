import BaseParticle from './BaseParticle.js';

function ParticleGenerator() {
  return new BaseParticle(...arguments);
}

class PixelEffect {
  #pixelArray = [];
  #ctx;
  #image;
  // #canvasOffset;
  #contentOffset;
  #optionalHexColor;
  #rotate;
  #noOfParticlesNotInPosition;

  #particleConstructor;
  #skipValue;

  constructor(canvasObj, ctx, image, options) {
    this._canvas = canvasObj;
    this.#ctx = ctx;
    this.#image = image;
    this.#contentOffset = options.contentOffset ?? { x: 0, y: 0 };
    this.#optionalHexColor = options.optionalHexColor ?? null;

    this.#rotate = options.rotate ?? false;
    this.#particleConstructor =
      options.particleConstructor ?? ParticleGenerator;

    this.#skipValue = options.skipValue ?? 1;

    this.#initiate();
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
    this._particleArray = [];

    const data = this.#pixelArray.data,
      rowCount = this.#image.height,
      colCount = this.#image.width,
      startX = this.#contentOffset.x,
      startY = this.#contentOffset.y;

    const Particle = this.#particleConstructor;

    let skip = this.#skipValue,
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
          this._particleArray.push(Particle(x, y, hex));
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
    const arr = this._particleArray,
      { width, height } = this._canvas,
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

export default PixelEffect;

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

setInterval(() => {
  psFlag = !psFlag;
}, 500);
