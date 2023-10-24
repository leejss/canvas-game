type AnimationConfig = {
  duration?: number;
  frames: {
    time: number;
    frame: number;
  }[];
};

export class FrameIndexPattern {
  currentTime: number;
  config: AnimationConfig;
  duration: number;
  constructor(config: AnimationConfig) {
    // ? How this currentTime is updated and used?
    this.currentTime = 0;
    this.config = config;
    this.duration = config.duration ?? 500;
  }

  get frame() {
    const { frames } = this.config;
    for (let i = frames.length - 1; i >= 0; i--) {
      if (this.currentTime >= frames[i].time) {
        return frames[i].frame;
      }
    }
  }

  step(delta: number) {
    this.currentTime += delta;
    if (this.currentTime > this.duration) {
      this.currentTime = 0;
    }
  }
}
