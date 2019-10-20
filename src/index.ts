enum Cell {
  'X',
  'O',
  ''
}
class Board {
  /**Properties */
  private _cells: Cell[][] = [];
  private _gridNum: number;
  private _currentPlayer: number;
  private _clickFn: (e: MouseEvent) => void;
  /**Constructor */
  constructor(r: number, c: number) {
    this._gridNum = r;
    this._currentPlayer = Cell.X;
    this.draw();
    this._clickFn = this.clickHandle.bind(this);
    document.getElementById('board').addEventListener('click', this._clickFn);
  }
  /**Private Methods */
  private draw() {
    let html = '';
    for (let i = 0; i < this._gridNum; i += 1) {
      this._cells.push([]);
      html += '<div class="row">';
      for (let j = 0; j < this._gridNum; j += 1) {
        html += `
          <span class="cell" row="${i}" col="${j}">""</span>
        `;
      }
      html += '</div>';
    }
    document.getElementById('board').innerHTML = html;
  }
  private clickHandle(e: MouseEvent) {
    const target = e.target as HTMLElement;
    const isCell = target.classList.contains('cell');
    if (isCell) {
      const row = +target.getAttribute('row') || 0;
      const col = +target.getAttribute('col') || 0;
      if (
        this._cells[row][col] !== Cell.X &&
        this._cells[row][col] !== Cell.O
      ) {
        target.innerText = Cell[this._currentPlayer];
        this._cells[row][col] = this._currentPlayer;
        if (this.isGameOver(row, col)) {
          console.log('game over');
          document.getElementById('info').innerText = `${
            Cell[this._currentPlayer]
          } Win`;
          this.gameOver();
        } else {
          this._currentPlayer = (this._currentPlayer + 1) % 2;
        }
      }
    }
  }
  private isGameOver(r: number, c: number): boolean {
    const cells = this._cells;
    const numSuccess = this._gridNum;
    let rowSuccess: number = 0;
    let colSuccess: number = 0;
    let diagonalSuccess1: number = 0;
    let diagonalSuccess2: number = 0;
    for (let i = 0; i < this._gridNum; i += 1) {
      if (cells[r][i] === this._currentPlayer) {
        rowSuccess += 1;
      }
      if (cells[i][c] === this._currentPlayer) {
        colSuccess += 1;
      }
      if (cells[i][i] === this._currentPlayer) {
        diagonalSuccess1 += 1;
      }
      if (cells[i][this._gridNum - i - 1] === this._currentPlayer) {
        diagonalSuccess2 += 1;
      }
      if (
        rowSuccess === numSuccess ||
        colSuccess === numSuccess ||
        diagonalSuccess1 === numSuccess ||
        diagonalSuccess2 === numSuccess
      ) {
        return true;
      }
    }
    return false;
  }
  private gameOver() {
    document
      .getElementById('board')
      .removeEventListener('click', this._clickFn);
  }
  /**Public Methos */
  public restart() {
    this._cells = [];
    this._currentPlayer = Cell.X;
    document.getElementById('info').innerHTML = '';
    this._clickFn = this.clickHandle.bind(this);
    document.getElementById('board').addEventListener('click', this._clickFn);
    this.draw();
  }
}

const board: Board = new Board(3, 3);

document.getElementById('restart').addEventListener('click', function() {
  board.restart();
});
