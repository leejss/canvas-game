import { events } from "./Events";
import { GameObject } from "./GameObject";
import { resources } from "./Resource";
import { Sprite } from "./Sprite";
import { Vector2 } from "./Vector2";

export class Rod extends GameObject {
  constructor(x: number, y: number) {
    super({
      position: new Vector2(x, y),
    });

    const sprite = new Sprite({
      name: "Rod",
      resource: resources.images.rod,
    });
    this.addChild(sprite);

    events.on("HERO_POSITION_CHANGED", (position) => {
      if (this.position.x === position.x && this.position.y === position.y) {
        console.log("Rod is in the same position as the hero");
      }
    });
  }
}
