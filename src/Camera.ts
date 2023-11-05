import { events } from "./Events";
import { GameObject } from "./GameObject";
import { Vector2 } from "./Vector2";

export class Camera extends GameObject {
  position: Vector2 = new Vector2(0, 0);
  constructor() {
    super({});

    events.on("HERO_POSITION_CHANGED", (position) => {
      const personHalf = 8;
      const canvasWidth = 320;
      const canvasHeight = 180;
      const halfWidth = -personHalf + canvasWidth / 2;
      const halfHeight = -personHalf + canvasHeight / 2;

      // Caemra movement position
      this.position = new Vector2(halfWidth - position.x, halfHeight - position.y);
    });
  }
}
