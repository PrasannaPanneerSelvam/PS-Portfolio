import MouseDistortionParticle from './ExtendedParticle.js';
import BaseParticleEffect from './BaseParticleEffect.js';

function ParticleGeneratorWrapper() {
  const [mouse] = arguments;
  function MouseDistortionParticleGenerator() {
    const args = arguments,
      lastIndex = args.length - 1;

    if (args[lastIndex] && !Array.isArray(args[lastIndex])) {
      const options = args[lastIndex];
      options.mouseObj = mouse;
      options.squareSize = 2.5;
      return new MouseDistortionParticle(...args);
    }

    return new MouseDistortionParticle(...args, {
      mouseObj: mouse,
      squareSize: 2.5,
    });
  }

  return MouseDistortionParticleGenerator;
}

class MouseDistortionEffect extends BaseParticleEffect {
  #mouse;
  #canvasOffset;

  constructor(canvasObj, ctx, htmlImage, contentOffset) {
    const mouseObj = { x: undefined, y: undefined, radius: 50 };
    super(canvasObj, ctx, htmlImage, {
      contentOffset,
      particleConstructor: ParticleGeneratorWrapper(mouseObj),
      skipValue: 5,
    });

    this.#mouse = mouseObj;

    const { x, y } = canvasObj.getBoundingClientRect();
    this.#canvasOffset = { x, y };
  }

  render() {
    const arr = this._particleArray,
      { width, height } = this._canvas,
      ctx = this._canvas.getContext('2d');

    function animate() {
      ctx.clearRect(0, 0, width, height);
      arr.forEach(i => i.update().draw(ctx));
      requestAnimationFrame(animate);
    }

    animate();
  }

  mountMouseEvents(listenerLayout) {
    const events = ['mousemove', 'mouseleave', 'mouseenter', 'click'];

    listenerLayout.addEventListener('mousemove', this.#mousemoveEvent());
    listenerLayout.addEventListener('click', this.#clickEvent());

    listenerLayout.addEventListener('mouseenter', this.#mouseenterEvent());
    listenerLayout.addEventListener('mouseleave', this.#mouseleaveEvent());
  }

  #mousemoveEvent() {
    const store = this.#canvasOffset;

    return function ({ x, y }) {
      this.#mouse.x = x - store.x;
      this.#mouse.y = y - store.y;
    }.bind(this);
  }

  #clickEvent() {
    const eventFn = () => {
      this.blast = 100;
    };

    return eventFn;
  }

  #mouseenterEvent() {
    return function ({ x, y }) {
      this.#mouse.x = x;
      this.#mouse.y = y;
    }.bind(this);
  }

  #mouseleaveEvent() {
    return function () {
      this.#mouse.x = 0;
      this.#mouse.y = 0;
    }.bind(this);
  }
}

export default MouseDistortionEffect;
