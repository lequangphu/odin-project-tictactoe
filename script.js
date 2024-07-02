const gameBoard = {
  board: Array(9).fill(null),
  currentPlayer: 'X',

  init() {
    this.board = Array(9).fill(null);
    this.currentPlayer = 'X';
    this.updateDisplay();
  },

  makeMove(index) {
    if (this.board[index] === null) {
      this.board[index] = this.currentPlayer;
      return true;
    }
    return false;
  },

  checkWin() {
    const winPatterns = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8],
      [0, 3, 6], [1, 4, 7], [2, 5, 8],
      [0, 4, 8], [2, 4, 6]
    ];

    return winPatterns.some(pattern => 
      this.board[pattern[0]] &&
      this.board[pattern[0]] === this.board[pattern[1]] &&
      this.board[pattern[0]] === this.board[pattern[2]]
    );
  },

  checkDraw() {
    return this.board.every(cell => cell !== null);
  },

  switchPlayer() {
    this.currentPlayer = this.currentPlayer === 'X' ? 'O' : 'X';
  },

  updateDisplay() {
    const boardElement = document.getElementById('board');
    boardElement.innerHTML = '';
    this.board.forEach((cell, index) => {
      const cellElement = document.createElement('div');
      cellElement.classList.add('cell');
      cellElement.textContent = cell || '';
      cellElement.addEventListener('click', () => this.handleCellClick(index));
      boardElement.appendChild(cellElement);
    });

    document.getElementById('status').textContent = `Current player: ${this.currentPlayer}`;
  },

  handleCellClick(index) {
    if (this.makeMove(index)) {
      this.updateDisplay();
      if (this.checkWin()) {
        document.getElementById('status').textContent = `Player ${this.currentPlayer} wins!`;
        this.endGame();
      } else if (this.checkDraw()) {
        document.getElementById('status').textContent = "It's a draw!";
        this.endGame();
      } else {
        this.switchPlayer();
        this.updateDisplay();
      }
    }
  },

  endGame() {
    const cells = document.querySelectorAll('.cell');
    cells.forEach(cell => cell.removeEventListener('click', this.handleCellClick));
  }
};

function startGame() {
  gameBoard.init();
}

document.getElementById('restart').addEventListener('click', startGame);

// Start the game
startGame();
