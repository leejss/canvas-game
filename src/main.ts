import { Animations } from "./Animations";
import { FrameIndexPattern } from "./FrameIndexPattern";
import { GameLoop } from "./GameLoop";
import { GameObject } from "./GameObject";
import { DOWN, Input, LEFT, RIGHT, UP } from "./Input";
import { resources } from "./Resource";
import { Sprite } from "./Sprite";
import { Vector2 } from "./Vector2";
import { isSpaceFree } from "./helpers/grid";
import { walls } from "./levels/level1";
import { STAND_DOWN, STAND_LEFT, STAND_RIGHT, STAND_UP, WALK_DOWN, WALK_LEFT, WALK_RIGHT, WALK_UP } from "./objects/heroAnimaiton";
import "./style.css";

const canvas = document.getElementById("game-canvas") as HTMLCanvasElement;
const ctx = canvas.getContext("2d")!;

const mainScene = new GameObject({
  position: new Vector2(0, 0),
});

const skySprite = new Sprite({
  name: "Sky",
  resource: resources.images.sky,
  frameSize: new Vector2(320, 180),
});

const groundSprite = new Sprite({
  name: "Ground",
  resource: resources.images.ground,
  frameSize: new Vector2(320, 180),
});

mainScene.addChildren([skySprite, groundSprite]);
mainScene.input = new Input();

const heroSprite = new Sprite({
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

const shadowSprite = new Sprite({
  name: "Shadow",
  resource: resources.images.shadow,
  frameSize: new Vector2(32, 32),
});

const input = new Input();
const heroDestination = heroSprite.position.duplicate();

let heroFacing = DOWN;
const tryMove = () => {
  const gridSize = 16;

  if (!input.direction) {
    if (heroFacing === DOWN) {
      heroSprite.animations?.play("STAND_DOWN");
    }
    if (heroFacing === UP) {
      heroSprite.animations?.play("STAND_UP");
    }
    if (heroFacing === LEFT) {
      heroSprite.animations?.play("STAND_LEFT");
    }
    if (heroFacing === RIGHT) {
      heroSprite.animations?.play("STAND_RIGHT");
    }
    return;
  }

  let nextX = heroDestination.x;
  let nextY = heroDestination.y;

  if (input.direction === DOWN) {
    nextY += gridSize;
    heroSprite.animations?.play("WALK_DOWN");
  }
  if (input.direction === UP) {
    nextY -= gridSize;
    heroSprite.animations?.play("WALK_UP");
  }
  if (input.direction === LEFT) {
    nextX -= gridSize;
    heroSprite.animations?.play("WALK_LEFT");
  }
  if (input.direction === RIGHT) {
    nextX += gridSize;
    heroSprite.animations?.play("WALK_RIGHT");
  }

  heroFacing = input.direction ?? heroFacing;

  if (isSpaceFree(walls, nextX, nextY)) {
    heroDestination.x = nextX;
    heroDestination.y = nextY;
  }
};

const update = (delta: number) => {
  // const distance = moveTowards(heroSprite, heroDestination, 1);
  // const hasArrived = distance <= 1;
  // if (hasArrived) {
  //   tryMove();
  // }
  // heroSprite.step(delta);
  // return;

  // ! Pass root GameObject
  mainScene.stepEntry(delta, mainScene);
};

const draw = () => {
  // skySprite.drawImage(ctx, 0, 0);
  // groundSprite.drawImage(ctx, 0, 0);

  // const heroOffset = new Vector2(-8, -16);
  // const heroPosX = heroSprite.position.x + heroOffset.x;
  // const heroPosY = heroSprite.position.y + heroOffset.y;

  // shadowSprite.drawImage(ctx, heroPosX, heroPosY);
  // heroSprite.drawImage(ctx, heroPosX, heroPosY);
  mainScene.draw(ctx, 0, 0);
};

const gameLoop = new GameLoop(update, draw);
gameLoop.start();
