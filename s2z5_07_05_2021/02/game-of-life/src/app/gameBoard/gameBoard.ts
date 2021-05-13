import randInt from "../utils/randInt";

class GameBoard {
    private _gameBoard: boolean[][] = [];

    public constructor(nRows: number = 25, nCols: number = 25) {
        this._gameBoard = this.initializeBoard(nRows, nCols, 0.1);
    }

    // probability of a cell being alive (true)
    // in statistics probability is 0-1, here give it with 0.1 accuracy
    private initializeBoard(nRows: number, nCols: number,
        probFrom0To1ByOneTenth: number): boolean[][] {
        let result: boolean[][] = [];
        for (let r = 0; r < nRows; r++) {
            let row: boolean[] = [];
            for (let c = 0; c < nCols; c++) {
                row.push(this.randIsCellAlive(probFrom0To1ByOneTenth));
            }
            result.push(row);
        }
        return result;
    }

    // in statistics probability is 0-1, here give it with 0.1 accuracy
    private randIsCellAlive(probFrom0To1ByOneTenth: number): boolean {
        let cutoff: number = 10 * probFrom0To1ByOneTenth;
        return randInt(10) < cutoff;
    }

    public getGameBoard(): boolean[][] {
        return this._gameBoard;
    }

    public getCellContent(positionRowCol: number[]): boolean {
        let row: number, col: number;
        [row, col] = positionRowCol;
        return this._gameBoard[row][col];
    }
}

const singelton = (function() {
    let instance: GameBoard; 	// no initialization, so undefined

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

