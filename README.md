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

## Drawing image

- Root GameObject recursively call draw method of its children. Each GameObject instance has drawImage method. And its drawImage method will be implemented by its child class.
- drawImage method takes a rendering context, and the position of the image.

## Animation frame

- How animation works ?
- FrmaeIndexPattern and Animation classes
- Each FrameIndexPattern instance has current time and given duration.
- step method is called inside game loop
- FramdIndexPattern instance's step method updates current time and then it decide whether to show which frame index
- Animation has a duration and steps of the frame index.
- Animation instance's play method update active key and reset the start time of the animation pattern.
- Animation's step method is called by Sprite's step method and Sprite's step method is called by GameObject' stepEntry method. So finally Animation's step method is continuosly called in the game loop. We can define the animation inside GameObject's step method.

## Event system

- Event system is a collection of event listeners and these listeners are called when the event is triggered.

## Memo

- Game state reside in the game object's properties
- Game state is updated by the game object's methods
- Encapsulate game state and methods in a game object
- step method is a collection of state update methods and is called in a loop
