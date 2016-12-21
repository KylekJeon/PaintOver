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
	
	// Game logic
	
	
	
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
	
	function allFlooded ()
	{
	    for (var row = 0; row < n_rows; row++) {
	        for (var col = 0; col < n_cols; col++) {
	            if (!gameBoard[row][col].painted) {
	                return false;
	            }
	        }
	    }
	    return true;
	}
	
	function paint (color)
	{
	    const prev_color = gameBoard[0][0].color;
	    if (color == prev_color)
	        return;
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
	}
	
	function printE(e) {
	  paint(e.currentTarget.className.split(" ").slice(1)[0]);
	  console.log(e.currentTarget.className.split(" ").slice(1)[0]);
	}
	
	function createBoard () {
	  const board = getById("gameBoard");
	  for (let row = 0; row < n_rows; row++) {
	    const tr = createNode("tr", board);
	    for (let col = 0; col < n_cols; col++) {
	      const td = createNode("td", tr);
	      td.addEventListener("click", printE);
	      color = randomColor();
	      td.className = "square " + color;
	      gameBoard[row][col].color = color;
	      gameBoard[row][col].element = td;
	      gameBoard[row][col].painted = false;
	    }
	  }
	  gameBoard[0][0].painted = true;
	}
	
	function newGame() {
	  const board = getById("gameBoard");
	  clear(board);
	  createBoard();
	}
	
	
	
	
	document.addEventListener("DOMContentLoaded", function(){
	  window.newGame = newGame;
	  createBoard();
	});


/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map