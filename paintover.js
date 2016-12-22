import Tone from 'tone';
let gameBoard;
let n_rows;
let n_cols;
let sequence;
const colors = "red blue green purple yellow orange".split(/\s+/);
let activatedColors = [];
let dominantColor;
let secondColor;

// DOM functions

function createNode (type, parent) {
  const newNode = document.createElement(type);
  parent.appendChild (newNode);
  return newNode;
}

function getById (id) {
  const element = document.getElementById(id);
  return element;
}

function clear (element) {
  while (element.lastChild) {
    element.removeChild (element.lastChild);
  }
}

function updateMoves(parent, text)
{
  const textNode = document.createTextNode(text);
  clear(parent);
  parent.appendChild(textNode);
}

function updateColors(){
  const colors = document.getElementById("activeColors");
  clear(colors);
  activatedColors.forEach( (color) => {
    colors.appendChild(document.createTextNode(color + " "));
  });
}
// Game logic

let moves;
let maxMoves = 25;
let filled;


function randomColor() {
  let num = Math.floor( Math.random() * 6 );
  return colors[num];
}

function paintElement(row, col, color) {
  gameBoard[row][col].color = color;
  gameBoard[row][col].element.className = "square " + color;
}

function testColorFlood (row, col, color) {
  if (gameBoard[row][col].painted){
    return;
  }
  if (gameBoard[row][col].color === color) {
    gameBoard[row][col].painted = true;
    paintNeighbors(row, col, color);
  }
}

function paintNeighbors(row, col, color){
  if (row < n_rows - 1)
      testColorFlood (row + 1, col, color);
  if (row > 0)
      testColorFlood (row - 1, col, color);
  if (col < n_cols - 1)
      testColorFlood (row, col + 1, color);
  if (col > 0)
      testColorFlood (row, col - 1, color);
}

function allPainted ()
{
  for (let row = 0; row < n_rows; row++) {
      for (let col = 0; col < n_cols; col++) {
          if (!gameBoard[row][col].painted) {
              return false;
          }
      }
  }
  return true;
}

function paint (color, initial)
{
  if(filled){
    return;
  }
  const prev_color = gameBoard[0][0].color;
  if (!initial && color == prev_color)
      return;
  moves++;
  updateMoves(document.getElementById("moves"), moves);
  for (let row = 0; row < n_rows; row++) {
    for (let col = 0; col < n_cols; col++) {
      if (gameBoard[row][col].painted) {
        paintElement (row, col, color);
      }
    }
  }
  for (let row = 0; row < n_rows; row++) {
    for (let col = 0; col < n_cols; col++) {
      if (gameBoard[row][col].painted) {
        paintNeighbors (row, col, color);
      }
    }
  }
  if(allPainted()){
    filled = true;
    if(moves <= maxMoves){
      alert ("Congratulations, you win!");
    } else {
      alert ("You finished... but you still lost");
    }
  } else if(moves === maxMoves){
    alert ("You've Lost. Better luck next time");
  }

}


// array functions

Array.prototype.randomElement = function () {
    return this[Math.floor(Math.random() * this.length)];
};

Array.prototype.transpose = function () {
  let returnArray = new Array(this.length);
  for (let i = 0; i < this.length; i++){
    returnArray[i] = new Array(this.length);
    for (let j = 0; j < this.length; j++){
      returnArray[i][j] = this[j][i];
    }
  }
  return returnArray;
};

function rangeArray(num) {
  const rangeArray = [];
  for (let i = 0; i < num; i++){
    rangeArray.push(i);
  }
  return rangeArray;
}

function paintCallback(e) {
  let color = e.currentTarget.className.split(" ").slice(1)[0];
  paint(color);
  toggleSquares();
  countColors();
}

function countColors(){
  const colorCount = {};
  colors.forEach((color) => {
    colorCount[color] = 0;
  });
  for (let row = 0; row < n_rows; row++){
    for (let col = 0; col < n_cols; col++){
      colorCount[gameBoard[row][col].color] += 1;
    }
  }
  let mostColors = 0;
  let secondMost = 0;
  for (let prop in colorCount) {
    if(colorCount[prop] > secondMost){
      if(colorCount[prop] > mostColors){
        mostColors = colorCount[prop];
        dominantColor = prop;
      } else {
        secondMost = colorCount[prop];
        secondColor = prop;
      }
    }
  }
  console.log("Most colors: " + dominantColor + ": " + mostColors);
  console.log("Second most colors: " + secondColor + ": " + secondMost);
}


function createGameBoard(size) {
  n_rows = size;
  n_cols = size;
  maxMoves = Math.round(1.77 * size);
  gameBoard = new Array (n_rows);
  for (let row = 0; row < n_rows; row++) {
    gameBoard[row] = new Array (n_cols);
    for (let col = 0; col < n_cols; col++){
      gameBoard[row][col] = {};
    }
  }

}


function createBoard (size) {
  createGameBoard(size);
  moves = -1;
  filled = false;
  const board = getById("gameBoard");
  for (let row = 0; row < n_rows; row++) {
    const tr = createNode("tr", board);
    for (let col = 0; col < n_cols; col++) {
      const td = createNode("td", tr);
      td.addEventListener("click", paintCallback);
      let color = randomColor();
      td.className = "square " + color;
      gameBoard[row][col].color = color;
      gameBoard[row][col].element = td;
      gameBoard[row][col].painted = false;
      gameBoard[row][col].activated = false;
    }
  }
  gameBoard[0][0].painted = true;
  paint(gameBoard[0][0].color, true);
  updateMoves(document.getElementById("moves"), moves);
  updateMoves(document.getElementById("maxMoves"), maxMoves);
}

const synth = new Tone.PolySynth(6, Tone.MonoSynth, {
  "oscillator" : { "type" : "sine" },
  envelope:{
    attack:0.1,
    decay:0.4,
    sustain:0.2,
    release:0.4,
}
}).toMaster();
const notes = ["C3", "E3", "G3", "A3", "C4", "D4", "E4", "G4", "A4", "C5"];

function newGame() {
  let size = parseInt(document.getElementById("board-size").value);
  const board = getById("gameBoard");
  clear(board);
  createBoard(size);
  const transposeBoard = gameBoard.transpose();
  sequence = new Tone.Sequence(function(time, col){
    for(let row = 0; row < n_rows; row++){
      if(gameBoard[row][col].activated){
        let className = gameBoard[row][col].element.className;
        gameBoard[row][col].element.className = className + " activated";
        synth.triggerAttackRelease(notes.randomElement(), "4n");
        window.setTimeout(() => {
          gameBoard[row][col].element.className = className;
        }, 500);
      }
    }
  }, rangeArray(size), "4n");
}

function updateBoard() {
  let size = parseInt(document.getElementById("board-size").value);
  newGame(size);
  while(activatedColors.length > 0){
    activatedColors.pop();
  }
  updateColors();
}

function activateColor(color) {
  const indexOfColor = activatedColors.indexOf(color);
  if(indexOfColor !== -1){
    activatedColors.splice(indexOfColor, 1);
    if (activatedColors.length === 0){
      Tone.Transport.stop();
      sequence.stop();
    }
  } else {
    activatedColors.push(color);
  }
  toggleSquares();
  updateColors();
  Tone.Transport.start();
  sequence.start();
}

function toggleSquares() {
  for(let i = 0; i < n_rows; i++){
    for(let j = 0; j < n_cols; j++){
      if(activatedColors.includes(gameBoard[i][j].color)){
        gameBoard[i][j].activated = true;
      } else {
        gameBoard[i][j].activated = false;
      }
    }
  }
}




document.addEventListener("DOMContentLoaded", function(){
  window.newGame = newGame;
  window.updateBoard = updateBoard;
  window.activateColor = activateColor;
  updateBoard(14);
});
