const n_rows = 14;
const n_cols = 14;

const gameBoard = new Array (n_rows);
for (let row = 0; row < n_rows; row++) {
  gameBoard[row] = new Array (n_cols);
  for (let col = 0; col < n_cols; col++){
    gameBoard[row][col] = {};
  }
}

const colors = "red blue green purple yellow orange".split(/\s+/);


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

// Game logic

let moves;
const maxMoves = 25;
let filled;


function randomColor() {
  num = Math.floor( Math.random() * 6 );
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

function paintCallback(e) {
  paint(e.currentTarget.className.split(" ").slice(1)[0]);
  console.log(e.currentTarget.className.split(" ").slice(1)[0]);
}

function createBoard () {
  moves = -1;
  filled = false;
  const board = getById("gameBoard");
  for (let row = 0; row < n_rows; row++) {
    const tr = createNode("tr", board);
    for (let col = 0; col < n_cols; col++) {
      const td = createNode("td", tr);
      td.addEventListener("click", paintCallback);
      color = randomColor();
      td.className = "square " + color;
      gameBoard[row][col].color = color;
      gameBoard[row][col].element = td;
      gameBoard[row][col].painted = false;
    }
  }
  gameBoard[0][0].painted = true;
  paint(gameBoard[0][0].color, true);
  updateMoves(document.getElementById("moves"), moves);
  updateMoves(document.getElementById("maxMoves"), maxMoves);
}

function newGame() {
  const board = getById("gameBoard");
  clear(board);
  createBoard();
}




document.addEventListener("DOMContentLoaded", function(){
  window.newGame = newGame;
  createBoard();

  paint(gameBoard[0][0].color);
});