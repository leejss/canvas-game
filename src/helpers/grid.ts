export const gridCell = (n: number) => n * 16;

export const isSpaceFree = (walls: Set<string>, x: number, y: number) => {
  const coord = `${x},${y}`;
  const isWall = walls.has(coord);
  return !isWall;
};
