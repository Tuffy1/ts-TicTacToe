var Cell;
(function (Cell) {
    Cell[Cell["X"] = 0] = "X";
    Cell[Cell["O"] = 1] = "O";
    Cell[Cell[""] = 2] = "";
})(Cell || (Cell = {}));
var Board = /** @class */ (function () {
    /**Constructor */
    function Board(r, c) {
        /**Properties */
        this._cells = [];
        this._gridNum = r;
        this._currentPlayer = Cell.X;
        this.draw();
        this._clickFn = this.clickHandle.bind(this);
        document.getElementById('board').addEventListener('click', this._clickFn);
    }
    /**Private Methods */
    Board.prototype.draw = function () {
        var html = '';
        for (var i = 0; i < this._gridNum; i += 1) {
            this._cells.push([]);
            html += '<div class="row">';
            for (var j = 0; j < this._gridNum; j += 1) {
                html += "\n          <span class=\"cell\" row=\"" + i + "\" col=\"" + j + "\">\"\"</span>\n        ";
            }
            html += '</div>';
        }
        document.getElementById('board').innerHTML = html;
    };
    Board.prototype.clickHandle = function (e) {
        var target = e.target;
        var isCell = target.classList.contains('cell');
        if (isCell) {
            var row = +target.getAttribute('row') || 0;
            var col = +target.getAttribute('col') || 0;
            if (this._cells[row][col] !== Cell.X &&
                this._cells[row][col] !== Cell.O) {
                target.innerText = Cell[this._currentPlayer];
                this._cells[row][col] = this._currentPlayer;
                if (this.isGameOver(row, col)) {
                    console.log('game over');
                    document.getElementById('info').innerText = Cell[this._currentPlayer] + " Win";
                    this.gameOver();
                }
                else {
                    this._currentPlayer = (this._currentPlayer + 1) % 2;
                }
            }
        }
    };
    Board.prototype.isGameOver = function (r, c) {
        var cells = this._cells;
        var numSuccess = this._gridNum;
        var rowSuccess = 0;
        var colSuccess = 0;
        var diagonalSuccess1 = 0;
        var diagonalSuccess2 = 0;
        for (var i = 0; i < this._gridNum; i += 1) {
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
            if (rowSuccess === numSuccess ||
                colSuccess === numSuccess ||
                diagonalSuccess1 === numSuccess ||
                diagonalSuccess2 === numSuccess) {
                return true;
            }
        }
        return false;
    };
    Board.prototype.gameOver = function () {
        document
            .getElementById('board')
            .removeEventListener('click', this._clickFn);
    };
    /**Public Methos */
    Board.prototype.restart = function () {
        this._cells = [];
        this._currentPlayer = Cell.X;
        document.getElementById('info').innerHTML = '';
        this._clickFn = this.clickHandle.bind(this);
        document.getElementById('board').addEventListener('click', this._clickFn);
        this.draw();
    };
    return Board;
}());
var board = new Board(3, 3);
document.getElementById('restart').addEventListener('click', function () {
    board.restart();
});
