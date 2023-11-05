import { Camera } from "./Camera";
import { GameLoop } from "./GameLoop";
import { GameObject } from "./GameObject";
import { Input } from "./Input";
import { resources } from "./Resource";
import { Sprite } from "./Sprite";
import { Vector2 } from "./Vector2";
import { gridCell } from "./helpers/grid";
import { Hero } from "./objects/Hero";
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

mainScene.addChild(skySprite);
mainScene.addChild(groundSprite);

const hero = new Hero(gridCell(6), gridCell(5));
mainScene.addChild(hero);
mainScene.input = new Input();

const camera = new Camera();
mainScene.addChild(camera);

const shadowSprite = new Sprite({
  name: "Shadow",
  resource: resources.images.shadow,
  frameSize: new Vector2(32, 32),
});

const update = (delta: number) => {
  // ! Pass root GameObject
  mainScene.stepEntry(delta, mainScene);
};

const draw = () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  skySprite.drawImage(ctx, 0, 0);
  ctx.save();
  ctx.translate(camera.position.x, camera.position.y);
  mainScene.draw(ctx, 0, 0);
  ctx.restore();
};

const gameLoop = new GameLoop(update, draw);
gameLoop.start();
