const Screen = require("./screen");
const Cursor = require("./cursor");

class TTT {

  constructor() {

    this.playerTurn = "O";

    this.grid = [[' ',' ',' '],
                 [' ',' ',' '],
                 [' ',' ',' ']]

    this.cursor = new Cursor(3, 3);

    // Initialize a 3x3 tic-tac-toe grid
    Screen.initialize(3, 3);
    Screen.setGridlines(true);
    this.cursor.setBackgroundColor();

    Screen.addCommand('w', 'Moves cursor up', this.cursor.up);
    Screen.addCommand('s', 'Moves cursor down', this.cursor.down);
    Screen.addCommand('a', 'Moves cursor left', this.cursor.left);
    Screen.addCommand('d', 'Moves cursor right', this.cursor.right);
    Screen.addCommand('e', 'Places move', this.placeMove);

    Screen.render();
  }

  static _checkRows(grid) {
    let space = 0;
    for (let i = 0; i < grid.length; i++) {
      for (let j = 1; j < grid[i].length; j++) {
        if (grid[i][j] === ' ' || grid[i][j - 1] === ' ') {
          space++;
          break;
        } else if (grid[i][j] !== grid[i][j-1]) {
          break;
        } else if (grid[i].length - 1 === j) {
          return grid[i][j];
        }
      }
    }
    if (space !== 0) {
      return 0;
    }
  }

  static _checkCols(grid) {
    let rowLength = grid[0].length;
    for (let i = 0; i < rowLength; i++) {
      for (let j = 1; j < grid.length; j++) {
        if (grid[j][i] === ' ') {
          break;
        } else if (grid[j][i] !== grid[j - 1][i]) {
          break;
        } else if (grid.length - 1 === j) {
          return grid[j][i];
        }
      }
    }
  }

  static _checkDiags(grid) {
    for (let i = 1; i < grid.length; i++) {
      if (grid[i][i] === ' ') {
        break;
      } else if (grid[i][i] !== grid[i - 1][i - 1]) {
        break;
      } else if (grid.length - 1 === i) {
        return grid[i][i];
      }
    }

    let length = grid.length - 1;

    for (let i = 1; i < grid.length; i++) {
      if (grid[i][length - i] === ' ') {
        break;
      } else if (grid[i][length - i] !== grid[i - 1][length - (i - 1)]) {
        break;
      } else if (grid.length - 1 === i) {
        return grid[i][length - i];
      }
    }
  }

  static checkWin(grid) {
    let rows = this._checkRows(grid);
    let cols = this._checkCols(grid);
    let diags = this._checkDiags(grid);
    if (rows) {
      return rows;
    } else if (cols) {
      return cols;
    } else if (diags) {
      return diags;
    } else if (rows === 0) {
      return false;
    } else {
      return 'T';
    }
  }

  placeMove = () => {
    const row = this.cursor.row;
    const col = this.cursor.col;
    Screen.setGrid(row, col, this.playerTurn);
    this.grid[row][col] = this.playerTurn;
    if (this.playerTurn === 'O') {
      this.playerTurn = 'X';
    } else {
      this.playerTurn = 'O';
    }
    let winner = TTT.checkWin(this.grid);

    if (winner) {
      TTT.endGame(winner);
    }
  }

  static endGame(winner) {
    if (winner === 'O' || winner === 'X') {
      Screen.setMessage(`Player ${winner} wins!`);
    } else if (winner === 'T') {
      Screen.setMessage(`Tie game!`);
    } else {
      Screen.setMessage(`Game Over`);
    }
    Screen.render();
    Screen.quit();
  }

}

module.exports = TTT;
