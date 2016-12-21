# PaintOver

A front-end javascript project mixing the classic game of flood-it, a game where you try to flood the whole board into one homogenous color, with a javascript audio sequencer, to create sounds based on the color and position of individual squares on the board.

## Functionality & MVP

with PaintOver, users will be able to:

- [ ] start, pause, and reset the flood-board
- [ ] select squares adjacent to the current flooded color board
- [ ] Have a set number of moves to clear the level
- [ ] Have a sequencer that detects the colors of the block and creates the appropriate noise

In addition, this project will include:
- [ ] An About modal describing the rules of the game
- [ ] A production README
- [ ] A mute option to turn off the sound

## Architecture and Technologies

This project will be implemented with the following technologies:

- Vanilla JavaScript and jQuery for structure/game logic
- CSS for styling, HTML for Event Listeners
- Webpack to bundle and serve up various scripts
- Github pages for hosting
- Tone.js, an audio sequencing library, will be used for the step-sequencing aspect of this game.

In addition to the entry file, there will be various scripts involved in the game logic.

`board.js`: this script will handle the logic for a stand-alone floodit game.

`sequencer.js`: this script will handle the logic for an audio sequencer.

## Implementation Timeline

### Day 1:
Set up all necessary modules, and flesh out and finish the flood it portion of the game

### Day 2:
Download and use Tone.js to implement step sequencer on a blank n x n board.

### Day 3:
Mix the audio sequencing with the flood-it board, add functionality featuers such as resets, change board size, and other features.
