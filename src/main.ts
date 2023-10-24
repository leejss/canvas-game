import { GameLoop } from "./GameLoop";
import { Input } from "./Input";
import { resources } from "./Resource";
import { Sprite } from "./Sprite";
import { Vector2 } from "./Vector2";
import { isSpaceFree } from "./helpers/grid";
import { moveTowards } from "./helpers/move";
import { walls } from "./levels/level1";
import "./style.css";

const canvas = document.getElementById("game-canvas") as HTMLCanvasElement;

const ctx = canvas.getContext("2d")!;

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

const heroSprite = new Sprite({
  name: "Hero",
  resource: resources.images.hero,
  frameSize: new Vector2(32, 32),
  hFrames: 3,
  vFrames: 8,
  frame: 1,
  // position: new Vector2(gridCell(6), gridCell(5)),
});

const shadowSprite = new Sprite({
  name: "Shadow",
  resource: resources.images.shadow,
  frameSize: new Vector2(32, 32),
});

const input = new Input();
const heroDestination = heroSprite.position.duplicate();

const tryMove = () => {
  const gridSize = 16;

  let nextX = heroDestination.x;
  let nextY = heroDestination.y;

  if (input.direction === "DOWN") {
    nextY += gridSize;
    heroSprite.frame = 0;
  }
  if (input.direction === "UP") {
    nextY -= gridSize;
    heroSprite.frame = 6;
  }
  if (input.direction === "LEFT") {
    nextX -= gridSize;
    heroSprite.frame = 9;
  }
  if (input.direction === "RIGHT") {
    nextX += gridSize;
    heroSprite.frame = 3;
  }

  if (isSpaceFree(walls, nextX, nextY)) {
    heroDestination.x = nextX;
    heroDestination.y = nextY;
  }
};

const update = () => {
  const distance = moveTowards(heroSprite, heroDestination, 1);
  const hasArrived = distance <= 1;

  if (hasArrived) {
    tryMove();
  }

  return;
};

const draw = () => {
  skySprite.drawImage(ctx, 0, 0);
  groundSprite.drawImage(ctx, 0, 0);

  const heroOffset = new Vector2(-8, -16);
  const heroPosX = heroSprite.position.x + heroOffset.x;
  const heroPosY = heroSprite.position.y + heroOffset.y;

  shadowSprite.drawImage(ctx, heroPosX, heroPosY);
  heroSprite.drawImage(ctx, heroPosX, heroPosY);
};

const gameLoop = new GameLoop(update, draw);

gameLoop.start();
