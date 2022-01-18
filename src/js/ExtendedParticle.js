import BaseParticle from './BaseParticle.js';

function moveParticleFromMouseWrapper(mouseObj) {
  return function moveParticleFromMouse() {
    let { x, y, radius } = mouseObj;

    let dx = x - this._x,
      dy = y - this._y,
      distance = Math.sqrt(dx ** 2 + dy ** 2);

    if (radius > distance) {
      const fx = dx / distance,
        fy = dy / distance,
        f = (radius - distance) / radius;

      this._x -= fx * f * this.density;
      this._y -= fy * f * this.density;

      return true;
    }
    return false;
  };
}

class MouseDistortionParticle extends BaseParticle {
  constructor(x, y, rgbaValues, options) {
    super(x, y, rgbaValues, options);

    const mouseObj = options?.mouseObj ?? {};

    this.callBackObject = {
      ifCaseCallback: moveParticleFromMouseWrapper(mouseObj).bind(this),
    };
    this.density = 10;
  }

  update(callBackObject = {}) {
    return super.update(this.callBackObject);
    // TODO :: Test this properly
    // return this;
  }
}

export default MouseDistortionParticle;
