import { Maybe } from './CommonTypes'

interface DimensionInfo {
  xMinRange: number,
  yMinRange: number,

  xMaxRange: number,
  yMaxRange: number,
};

function randomInRange([minVal, maxVal]: number[]) {
  const diffVelX = maxVal - minVal;
  return Math.random() * diffVelX + minVal;
}

class Particle {
  private xMinRange: number;
  private xMaxRange: number;
  private yMinRange: number;
  private yMaxRange: number;

  private xVel: number;
  private yVel: number;

  private particleRadius: number;
  private particleColor: string;

  x: number;
  y: number;

  constructor(boundaryValues: DimensionInfo, options: { particleColor: string | undefined } = { particleColor: undefined }) {
    this.setBoundary(boundaryValues);

    const maxDiff = 2;
    this.xVel = randomInRange([-maxDiff / 2, maxDiff / 2]);
    this.yVel = randomInRange([-maxDiff / 2, maxDiff / 2]);

    this.xVel = this.xVel === 0 ? 0.01 : this.xVel;
    this.yVel = this.yVel === 0 ? 0.01 : this.yVel;

    this.particleRadius = randomInRange([2, 3]);
    this.particleColor = options.particleColor ?? 'white';
  }

  setBoundary({ xMinRange, xMaxRange, yMinRange, yMaxRange }: DimensionInfo) {
    this.x = randomInRange([xMinRange, xMaxRange]);
    this.y = randomInRange([yMinRange, yMaxRange]);

    this.xMinRange = xMinRange;
    this.yMinRange = yMinRange;

    this.xMaxRange = xMaxRange;
    this.yMaxRange = yMaxRange;
  }

  update() {
    if (this.xMinRange > this.x || this.x > this.xMaxRange) this.xVel *= -1;
    if (this.yMinRange > this.y || this.y > this.yMaxRange) this.yVel *= -1;

    this.x += this.xVel;
    this.y += this.yVel;

    return this;
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.fillStyle = this.particleColor;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.particleRadius, 0, 360);
    ctx.fill();
  }
}

class Constellation {
  private particles: Particle[];
  private ctx: CanvasRenderingContext2D;
  private canvas: HTMLCanvasElement;
  private canvasDimensionInfo: DimensionInfo;

  private particleColor: string;
  private linkColor: string;
  private particleNumber: number;
  private stopAnimation: boolean;

  constructor(
    canvas: Maybe<HTMLCanvasElement>,
    options: { particleColor: Maybe<string>, linkColor: Maybe<string> } =
      { particleColor: undefined, linkColor: undefined }
  ) {

    if(!canvas) return;

    this.canvas = canvas;
    this.ctx = this.canvas.getContext('2d');

    this.particleColor = options.particleColor;
    this.linkColor = options.linkColor ?? 'rgba(0, 181, 255)';
    this.stopAnimation = false;

    this.updateCanvasBoundaries();
    this.initParticles();
  }

  updateCanvasBoundaries() {
    const { width, height } = this.canvas.getBoundingClientRect();

    this.canvasDimensionInfo = {
      xMinRange: 0,
      yMinRange: 0,

      xMaxRange: width,
      yMaxRange: height,
    };
  }

  updateOnResize() {
    this.updateCanvasBoundaries();

    for (let idx = 0; idx < this.particles.length; idx++) {
      this.particles[idx].setBoundary(this.canvasDimensionInfo);
    }
  }

  private initParticles() {
    this.particles = [];
    this.particleNumber = 20;
    for (let idx = 0; idx < this.particleNumber; idx++)
      this.particles.push(
        new Particle(this.canvasDimensionInfo, {
          particleColor: this.particleColor,
        })
      );
  }

  private update() {
    function distance(x1: number, y1: number, x2: number, y2: number) {
      const dx = x1 - x2,
        dy = y1 - y2;
      return Math.sqrt(dx ** 2 + dy ** 2);
    }

    for (let idx = 0; idx < this.particles.length; idx++) {
      this.particles[idx].update().draw(this.ctx);
    }

    for (let i = 0; i < this.particles.length - 1; i++) {
      const refParticle = this.particles[i];
      for (let idx = i + 1; idx < this.particles.length; idx++) {
        const otherParticle = this.particles[idx],
          dis = distance(
            refParticle.x,
            refParticle.y,
            otherParticle.x,
            otherParticle.y
          );

        const maxDistance = 150,
          maxThickness = 1;

        if (dis < maxDistance) {
          const lineThickness = maxThickness - dis / maxDistance;

          this.ctx.strokeStyle = this.linkColor;
          this.ctx.lineWidth = lineThickness;
          this.ctx.beginPath();
          this.ctx.moveTo(refParticle.x, refParticle.y);
          this.ctx.lineTo(otherParticle.x, otherParticle.y);
          this.ctx.stroke();
        }
      }
    }
  }

  animate() {
    function animation() {
      if (this.stopAnimation) return;

      const { xMinRange, xMaxRange, yMinRange, yMaxRange } =
        this.canvasDimensionInfo;
      this.ctx.clearRect(xMinRange, yMinRange, xMaxRange, yMaxRange);
      this.update();

      requestAnimationFrame(animation.bind(this));
    }

    animation.call(this);
  }

  toggleAnimation(value: boolean) {
    this.stopAnimation = value ?? !this.stopAnimation;
    this.animate();
  }
}

export default Constellation;
