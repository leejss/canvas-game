type VoidFunction = <T = undefined>(arg?: T) => void;
type UpdateFunction = (deltaTime: number) => void;

export class GameLoop {
  lastFrameTime: number;
  accumulatedTime: number;
  timeStep: number;
  update: UpdateFunction;
  render: VoidFunction;
  rafId: null | number;
  isRunning: boolean;

  constructor(update: UpdateFunction, render: VoidFunction) {
    this.lastFrameTime = 0;
    this.accumulatedTime = 0;
    this.timeStep = 1000 / 60; // 60 FPS

    this.update = update;
    this.render = render;

    this.rafId = null;
    this.isRunning = false;
  }

  // Render and update loop
  mainLoop(timestamp: number) {
    if (!this.isRunning) return;
    let deltaTime = timestamp - this.lastFrameTime;

    this.lastFrameTime = timestamp;
    this.accumulatedTime += deltaTime;

    while (this.accumulatedTime >= this.timeStep) {
      this.update(this.timeStep);
      this.accumulatedTime -= this.timeStep;
    }

    this.render();
    this.rafId = requestAnimationFrame(this.mainLoop.bind(this));
  }

  start() {
    if (!this.isRunning) {
      this.isRunning = true;
      this.rafId = requestAnimationFrame(this.mainLoop.bind(this));
    }
  }

  stop() {
    if (this.rafId) {
      cancelAnimationFrame(this.rafId);
    }
    this.isRunning = false;
  }
}
