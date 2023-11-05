import { Animations } from "../Animations";
import { events } from "../Events";
import { FrameIndexPattern } from "../FrameIndexPattern";
import { GameObject } from "../GameObject";
import { DIRECTION, Direction } from "../Input";
import { resources } from "../Resource";
import { Sprite } from "../Sprite";
import { Vector2 } from "../Vector2";
import { isSpaceFree } from "../helpers/grid";
import { moveTowards } from "../helpers/move";
import { walls } from "../levels/level1";
import { WALK_DOWN, WALK_UP, WALK_LEFT, WALK_RIGHT, STAND_DOWN, STAND_UP, STAND_LEFT, STAND_RIGHT } from "./heroAnimaiton";

export class Hero extends GameObject {
  body: Sprite;
  facingDirection: Direction = DIRECTION.DOWN;
  destinationPosition = this.position.duplicate();
  lastX = -1;
  lastY = -1;

  constructor(x: number, y: number) {
    super({
      position: new Vector2(x, y),
    });

    this.body = new Sprite({
      name: "Hero",
      resource: resources.images.hero,
      frameSize: new Vector2(32, 32),
      hFrames: 3,
      vFrames: 8,
      frame: 1,
      animations: new Animations({
        WALK_DOWN: new FrameIndexPattern(WALK_DOWN),
        WALK_UP: new FrameIndexPattern(WALK_UP),
        WALK_LEFT: new FrameIndexPattern(WALK_LEFT),
        WALK_RIGHT: new FrameIndexPattern(WALK_RIGHT),
        STAND_DOWN: new FrameIndexPattern(STAND_DOWN),
        STAND_UP: new FrameIndexPattern(STAND_UP),
        STAND_LEFT: new FrameIndexPattern(STAND_LEFT),
        STAND_RIGHT: new FrameIndexPattern(STAND_RIGHT),
      }),
    });
    this.addChild(this.body);
  }

  emitPosition() {
    // Emit position when it changes
    const isSamePosition = this.lastX === this.position.x && this.lastY === this.position.y;
    if (isSamePosition) return;

    this.lastX = this.position.x;
    this.lastY = this.position.y;
    events.emit("HERO_POSITION_CHANGED", this.position);
  }

  tryMove(root: GameObject) {
    const input = root.input;
    if (!input) throw new Error("Input is not defined");

    if (!input.direction) {
      if (this.facingDirection === DIRECTION.LEFT) {
        this.body.animations?.play("STAND_LEFT");
      }
      if (this.facingDirection === DIRECTION.RIGHT) {
        this.body.animations?.play("STAND_RIGHT");
      }
      if (this.facingDirection === DIRECTION.UP) {
        this.body.animations?.play("STAND_UP");
      }
      if (this.facingDirection === DIRECTION.DOWN) {
        this.body.animations?.play("STAND_DOWN");
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

    console.log(nextX, nextY);

    if (isSpaceFree(walls, nextX, nextY)) {
      this.destinationPosition.x = nextX;
      this.destinationPosition.y = nextY;
    }

    this.facingDirection = input.direction ?? this.facingDirection;
    this.body.animations?.play(walkAnimation[this.facingDirection]);
  }

  step(delta: number, root: GameObject) {
    const distance = moveTowards(this, this.destinationPosition, 1);

    if (distance <= 1) {
      this.tryMove(root);
    }

    this.emitPosition();
  }
}
