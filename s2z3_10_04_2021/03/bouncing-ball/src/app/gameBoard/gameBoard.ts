class GameBoard {
    // internal representation of the chessBoard
    private _gameBoard: number[][] = [];

    // empty board initialization
    constructor() {
        this.setEmptyBoard();
    }

    public setEmptyBoard(): void {
        this._gameBoard = [];

        for (let r = 0; r < 10; r++) {
            let row: number[] = [];
            for (let c = 0; c < 10; c++) {
                row.push(0);
            }
            this._gameBoard.push(row);
        }
    }

    public getGameBoard(): number[][] {
        return this._gameBoard;
    }

    /**
     * sets a ball at a given position
     * updates this._gameBoard
     */
    public setAtPos(row: number, col: number): void {
        this._gameBoard[row][col] = 1;
    }

    public getVal(row: number, col: number): number {
        return this._gameBoard[row][col];
    }
}

// singelton required by the task
const singelton = (function() {
    let instance: GameBoard; 	// no initialization so undefined

    function init() {
        return new GameBoard();
    }

    function getInstance(): GameBoard {
        if (!Boolean(instance)) {
            instance = init();
        }
        return instance;
    }

    return {
        getGameBoardInstance: getInstance
    }
})();

export { GameBoard, singelton };
