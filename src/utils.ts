export const isIn = <T>(arr: T[], element: T) => {
  return arr.indexOf(element) !== -1;
};

export const matchDirection = (code: string) => {
  const up = code === "ArrowUp" || code === "KeyW";
  const down = code === "ArrowDown" || code === "KeyS";
  const left = code === "ArrowLeft" || code === "KeyA";
  const right = code === "ArrowRight" || code === "KeyD";
  if (up) {
    return "UP";
  }
  if (down) {
    return "DOWN";
  }
  if (left) {
    return "LEFT";
  }
  if (right) {
    return "RIGHT";
  }
  return "";
};
