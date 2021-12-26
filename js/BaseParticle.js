function randomInRange([minVal, maxVal]) {
  const diffVelX = maxVal - minVal;
  return Math.random() * diffVelX + minVal;
}

class BaseParticle {
  #originalX;
  #originalY;

  #color;
  #squareSize;

  #velocityX;
  #velocityY;

  #inOriginalPosition;

  constructor(x, y, rgbaValues, options = {}) {
    this.#originalX = x;
    this.#originalY = y;
    this._x = 0;
    this._y = 0;
    this.#color = rgbaValues || [255, 255, 255];
    this.#squareSize = options.squareSize ?? 1;

    this.#velocityX = randomInRange(options.xVelocityRange ?? [1, 10]);

    this.#velocityY = randomInRange(options.yVelocityRange ?? [1, 10]);
    this.#inOriginalPosition = false;
  }

  re_setOriginalPosition(x, y) {
    this.#originalX = x;
    this.#originalY = y;
  }

  draw(ctx) {
    ctx.fillStyle = 'blue';
    ctx.fillStyle = `rgb(${this.#color.join(',')})`;
    this.#drawSquareBlock(ctx);
  }

  #drawSquareBlock(ctx) {
    ctx.fillRect(this._x, this._y, this.#squareSize, this.#squareSize);
  }

  update(callBackObject = {}) {
    const ifCb = callBackObject.ifCaseCallback,
      skipElseCase = typeof ifCb === 'function' ? ifCb() : false;
    if (skipElseCase) {
      // pass
    } else {
      let dx = this._x - this.#originalX,
        dy = this._y - this.#originalY;

      if (dx) this._x -= dx / this.#velocityX;
      if (dy) this._y -= dy / this.#velocityY;

      const minDiff = 0.1;
      if (
        !this.#inOriginalPosition &&
        Math.abs(dx) <= minDiff &&
        Math.abs(dy) <= minDiff
      ) {
        this.#inOriginalPosition = true;
        (callBackObject?.onPositionCallback || function () {})();
      }
    }

    return this;
  }
}

export default BaseParticle;
