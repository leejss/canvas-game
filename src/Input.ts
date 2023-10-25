import { isIn, matchDirection } from "./utils";

export type Direction = "UP" | "DOWN" | "LEFT" | "RIGHT";

export const UP = "UP";
export const DOWN = "DOWN";
export const LEFT = "LEFT";
export const RIGHT = "RIGHT";

export class Input {
  heldDirections: Direction[];
  constructor() {
    this.heldDirections = [];
    document.addEventListener("keydown", (e) => {
      const dir = matchDirection(e.code) as Direction;
      this.onArrowPressed(dir);
    });

    document.addEventListener("keyup", (e) => {
      const dir = matchDirection(e.code) as Direction;
      this.onArrowReleased(dir);
    });
  }

  get direction() {
    return this.heldDirections[0];
  }

  onArrowPressed(direction: Direction) {
    if (!isIn(this.heldDirections, direction)) {
      this.heldDirections.unshift(direction);
    }
  }
  onArrowReleased(direction: Direction) {
    const idx = this.heldDirections.indexOf(direction);
    if (idx === -1) return;
    this.heldDirections.splice(idx, 1);
  }
}
