export class Vector2 {
  x: number;
  y: number;
  constructor(x: number, y: number) {
    this.x = x ?? 0;
    this.y = y ?? 0;
  }

  duplicate() {
    return new Vector2(this.x, this.y);
  }
}
