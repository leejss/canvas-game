import type { Vector2 } from "../Vector2";

type Movable = {
  position: Vector2;
};

export const distanceFormular = (p1: Vector2, p2: Vector2): number => {
  const distanceToTravelX = p2.x - p1.x;
  const distanceToTravelY = p2.y - p1.y;
  return Math.sqrt(distanceToTravelX ** 2 + distanceToTravelY ** 2);
};

export const moveTowards = (movable: Movable, dest: Vector2, speed: number) => {
  let distance = distanceFormular(dest, movable.position);

  if (distance <= speed) {
    // Snap the position
    movable.position.x = dest.x;
    movable.position.y = dest.y;
  } else {
    //  Move towards
    const normalizedX = (dest.x - movable.position.x) / distance;
    const normalizedY = (dest.y - movable.position.y) / distance;

    movable.position.x += normalizedX * speed;
    movable.position.y += normalizedY * speed;

    distance = distanceFormular(dest, movable.position);
  }

  return distance;
};
