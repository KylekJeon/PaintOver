/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports) {

	let gameBoard;
	let n_rows;
	let n_cols;
	
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
	let maxMoves = 25;
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
	
	function newGame(size) {
	  const board = getById("gameBoard");
	  clear(board);
	  createBoard(size);
	}
	
	function updateBoard() {
	  size = parseInt(document.getElementById("board-size").value);
	  console.log(size);
	  newGame(size);
	}
	
	
	
	document.addEventListener("DOMContentLoaded", function(){
	  window.newGame = newGame;
	  window.updateBoard = updateBoard;
	  updateBoard(14);
	});


/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map