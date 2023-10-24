// Show the right frame given time.
const makeWalkingFrame = (root: number = 0) => ({
  duration: 400,
  frames: [
    {
      time: 0,
      frame: root + 1,
    },
    {
      time: 100,
      frame: root,
    },
    {
      time: 200,
      frame: root + 1,
    },
    {
      time: 300,
      frame: root + 2,
    },
  ],
});

const makeStandingFrame = (root: number) => ({
  duration: 400,
  frames: [
    {
      time: 0,
      frame: root,
    },
  ],
});

export const STAND_DOWN = makeStandingFrame(1);
export const STAND_RIGHT = makeStandingFrame(4);
export const STAND_UP = makeStandingFrame(7);
export const STAND_LEFT = makeStandingFrame(10);

export const WALK_DOWN = makeWalkingFrame(0);
export const WALK_RIGHT = makeWalkingFrame(3);
export const WALK_UP = makeWalkingFrame(6);
export const WALK_LEFT = makeWalkingFrame(9);
