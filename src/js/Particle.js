class Particle {
  #originalX;
  #originalY;
  #x;
  #y;
  #color;
  #squareSize;

  #velocityX;
  #velocityY;

  #inOriginalPosition;

  constructor(
    x,
    y,
    rgbaValues,
    options = { parentDimensions: [], initiateFromExtremeRandomSpots: false }
  ) {
    this.#originalX = x;
    this.#originalY = y;
    this.#x = 0;
    this.#y = 0;
    this.#color = rgbaValues || [255, 255, 255];
    this.#squareSize = 2.5;

    this.density = 10;

    const maxVelX = 10,
      minVelX = 1,
      diffVelX = maxVelX - minVelX,
      maxVelY = 10,
      minVelY = 1,
      diffVelY = maxVelY - minVelY;

    this.#velocityX = Math.random() * diffVelX + minVelX;
    this.#velocityY = Math.random() * diffVelY + minVelY;

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
    ctx.fillRect(this.#x, this.#y, this.#squareSize, this.#squareSize);
  }

  update(callBackObject) {
    let dx = this.#x - this.#originalX,
      dy = this.#y - this.#originalY;

    if (dx) this.#x -= dx / this.#velocityX;
    if (dy) this.#y -= dy / this.#velocityY;

    const minDiff = 0.1;
    if (
      !this.#inOriginalPosition &&
      Math.abs(dx) <= minDiff &&
      Math.abs(dy) <= minDiff
    ) {
      this.#inOriginalPosition = true;
      (callBackObject?.onPositionCallback || function () {})();
    }

    return this;
  }
}

export default Particle;
