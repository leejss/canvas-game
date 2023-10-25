import type { FrameIndexPattern } from "./FrameIndexPattern";

// Pass config to animations
type Patterns = {
  [key: string]: FrameIndexPattern;
};

export class Animations {
  patterns: Patterns;
  activeKey: string;

  constructor(patterns: Patterns) {
    this.patterns = patterns;
    this.activeKey = Object.keys(this.patterns)[0];
  }

  get frame() {
    return this.patterns[this.activeKey].frame;
  }

  play(key: string, startTime = 0) {
    if (this.activeKey === key) return;

    this.activeKey = key;
    this.patterns[this.activeKey].currentTime = startTime;
  }

  step(delta: number) {
    this.patterns[this.activeKey].step(delta);
  }
}
