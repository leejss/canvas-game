# canvas-game

Canvas game

## Grid(or Tile based) movement

- 2D space is grid of fixed length of tiles.
- Signle keyboard input should guarantees single tile movement.
- Keyboard input should be buffered and processed in a loop.
- Keyboard input should update the hero facing direction.

## Keyboard input system

- Make a Keyboard Input class instance.
- This instance hold the keyboard input state.
- And GmaeObject instance should have a reference to this instance so that it can use the keyboard input state.

## Animation frame

- How animation works ?
- FrmaeIndexPattern and Animation classes
- Each FrameIndexPattern instance has current time and given duration.
- step method is called inside game loop  

## Memo

- Game state reside in the game object's properties
- Game state is updated by the game object's methods
- Encapsulate game state and methods in a game object
- step method is a collection of state update methods and is called in a loop
