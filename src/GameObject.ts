import { Input } from "./Input";
import { Vector2 } from "./Vector2";

export class GameObject {
  position: Vector2;
  children: GameObject[];
  input?: Input;

  constructor({ position }: { position?: Vector2 }) {
    this.position = position ?? new Vector2(0, 0);
    this.children = [];
  }

  // Recusively call stepEntry
  stepEntry(delta: number, root: GameObject) {
    this.children.forEach((ch) => ch.stepEntry(delta, root));
    this.step(delta, root);
  }

  // Should be overriden
  step(_delta: number, _root: GameObject) {
    // Update method
  }

  draw(ctx: CanvasRenderingContext2D, x: number, y: number) {
    const drawPosX = x + this.position.x;
    const drawPosY = y + this.position.y;

    this.drawImage(ctx, drawPosX, drawPosY);

    // Iteratively call child's draw
    this.children.forEach((ch) => ch.draw(ctx, drawPosX, drawPosY));
  }

  // Should be overriden
  drawImage(_ctx: CanvasRenderingContext2D, _drawPosX: number, _drawPosY: number) {}

  addChild(child: GameObject) {
    this.children.push(child);
  }

  addChildren(children: GameObject[]) {
    this.children.concat(children);
  }

  removeChild(child: GameObject) {
    this.children.filter((ch) => ch !== child);
  }
}
