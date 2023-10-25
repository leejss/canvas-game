import { Animations } from "./Animations";
import { Vector2 } from "./Vector2";

export class Sprite {
  name: string;
  resource: {
    image: HTMLImageElement;
    isLoaded: boolean;
  };
  frameSize: Vector2;
  hFrames: number;
  vFrames: number;
  frame: number;
  scale: number;
  position: Vector2;
  frameMap = new Map<number, Vector2>();
  animations?: Animations;
  constructor({
    name,
    resource,
    frameSize,
    hFrames,
    vFrames,
    frame,
    scale,
    position,
    animations,
  }: {
    name: string;
    resource: {
      image: HTMLImageElement;
      isLoaded: boolean;
    };
    frameSize: Vector2;
    hFrames?: number;
    vFrames?: number;
    frame?: number;
    scale?: number;
    position?: Vector2;
    animations?: Animations;
  }) {
    this.name = name;
    this.resource = resource;
    this.frameSize = frameSize ?? new Vector2(16, 16);
    this.hFrames = hFrames ?? 1;
    this.vFrames = vFrames ?? 1;
    this.frame = frame ?? 0;
    this.scale = scale ?? 1;
    this.position = position ?? new Vector2(0, 0);
    this.animations = animations;
    this.buildFrameMap();
  }

  buildFrameMap() {
    let frameCount = 0;

    for (let v = 0; v < this.vFrames; v++) {
      for (let h = 0; h < this.hFrames; h++) {
        this.frameMap.set(frameCount, new Vector2(this.frameSize.x * h, this.frameSize.y * v));
        frameCount++;
      }
    }
  }

  step(delta: number) {
    if (!this.animations) return;
    this.animations.step(delta);
    this.frame = this.animations.frame!;
  }

  drawImage(ctx: CanvasRenderingContext2D, x: number, y: number) {
    if (!this.resource.isLoaded) return;

    let frameCoordX = 0;
    let frameCoordY = 0;

    const frame = this.frameMap.get(this.frame);

    if (frame) {
      frameCoordX = frame.x;
      frameCoordY = frame.y;
    }

    const frameSizeX = this.frameSize.x;
    const frameSizeY = this.frameSize.y;

    ctx.drawImage(this.resource.image, frameCoordX, frameCoordY, frameSizeX, frameSizeY, x, y, frameSizeX * this.scale, frameSizeY * this.scale);
  }
}
