import { GameObject } from "../GameObject";
import { DIRECTION, Direction } from "../Input";
import { Sprite } from "../Sprite";
import { Vector2 } from "../Vector2";
import { isSpaceFree } from "../helpers/grid";
import { moveTowards } from "../helpers/move";
import { walls } from "../levels/level1";

export class Hero extends GameObject {
  body: Sprite;
  facingDirection: Direction = DIRECTION.DOWN;
  destinationPosition = this.position.duplicate();

  constructor(x: number, y: number) {
    super({
      position: new Vector2(x, y),
    });
  }

  tryMove(root: GameObject) {
    const input = root.input;
    if (!input) throw new Error("Input is not defined");

    if (!input.direction) {
      if (this.facingDirection === DIRECTION.LEFT) {
        this.body.animations.play("standLeft");
      }
      if (this.facingDirection === DIRECTION.RIGHT) {
        this.body.animations.play("standRight");
      }
      if (this.facingDirection === DIRECTION.UP) {
        this.body.animations.play("standUp");
      }
      if (this.facingDirection === DIRECTION.DOWN) {
        this.body.animations.play("standDown");
      }

      return;
    }

    const gridSize = 16; // px

    // Update standing animation

    let nextX = this.destinationPosition.x;
    let nextY = this.destinationPosition.y;

    const walkAnimation = {
      [DIRECTION.DOWN]: "WALK_DOWN",
      [DIRECTION.UP]: "WALK_UP",
      [DIRECTION.LEFT]: "WALK_LEFT",
      [DIRECTION.RIGHT]: "WALK_RIGHT",
    };

    if (input.direction === DIRECTION.DOWN) {
      nextY += gridSize;
    }
    if (input.direction === DIRECTION.UP) {
      nextY -= gridSize;
    }
    if (input.direction === DIRECTION.LEFT) {
      nextX -= gridSize;
    }
    if (input.direction === DIRECTION.RIGHT) {
      nextX += gridSize;
    }

    if (isSpaceFree(walls, nextX, nextY)) {
      this.destinationPosition.x = nextX;
      this.destinationPosition.y = nextY;
    }

    this.body.animations?.play(walkAnimation[this.facingDirection]);
  }

  step(delta: number, root: GameObject) {
    const distance = moveTowards(this, this.destinationPosition, 1);

    if (distance <= 1) {
      this.tryMove(root);
    }
  }
}
