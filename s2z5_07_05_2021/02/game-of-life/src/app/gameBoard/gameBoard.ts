import isBetween from "../utils/isNumBetween";

class GameBoard {
    private _gameBoard: boolean[][] = [];

    /**
     * @param {number} probFrom0To1 probability of a cell being alive
     */
    public constructor(nRows: number = 25, nCols: number = 25) {
        this._gameBoard = this.initializeBoard(nRows, nCols, 0);
    }

    public setGameBoard(newGameBoard: boolean[][]): void {
        this._gameBoard = newGameBoard;
    }

    /**
     * @param {number} probFrom0To1 probability of a cell being alive
     */
    public initalizeGenerationOne(probOfCellBeingAliveFrom0To1: number): void {

        this._gameBoard = this.initializeBoard(this.getNrows(), this.getNcols(),
            probOfCellBeingAliveFrom0To1);
    }

    /**
     * @param {number} probFrom0To1 probability of a cell being alive
     */
    private initializeBoard(nRows: number, nCols: number,
        probFrom0To1: number): boolean[][] {
        let result: boolean[][] = [];
        for (let r = 0; r < nRows; r++) {
            let row: boolean[] = [];
            for (let c = 0; c < nCols; c++) {
                // alive/dead - true/false
                row.push(this.isCellAlive(probFrom0To1));
            }
            result.push(row);
        }
        return result;
    }

    private getNrows(): number {
        return this._gameBoard.length;
    }

    private getNcols(): number {
        return this._gameBoard[0].length;
    }

    /**
     * @param {number} probFrom0To1 probability of a cell being alive
     */
    private isCellAlive(probFrom0To1: number): boolean {
        return Math.random() < probFrom0To1;
    }

    public getGameBoard(): boolean[][] {
        return this._gameBoard;
    }

    public getCellContent(positionRowCol: number[]): boolean {
        let row: number, col: number;
        [row, col] = positionRowCol;
        return this._gameBoard[row][col];
    }

    private getPositionsOfCellNeighbours(cellPositionRowCol: number[]): number[][] {
        let result: number[][] = [];
        let cellRow: number, cellCol: number;
        [cellRow, cellCol] = cellPositionRowCol;
        for (let row of this.getAllNeighboursRows(cellRow)) {
            for (let col of this.getAllNeighboursCols(cellCol)) {
                if (!this.isNewPosEqlOldPos(cellPositionRowCol, [row, col]) &&
                    this.isPosOnGameBoard([row, col])) {
                    result.push([row, col]);
                }
            }
        }
        return result;
    }

    private isNewPosEqlOldPos(oldPos: number[], newPos: number[]): boolean {
        return (oldPos[0] === newPos[0]) && (oldPos[1] === newPos[1]);
    }

    private isPosOnGameBoard(pos: number[]): boolean {
        let isRowInRange: boolean = isBetween(pos[0], 0, this.getNrows() - 1);
        let isColInRange: boolean = isBetween(pos[1], 0, this.getNcols() - 1);
        return isRowInRange && isColInRange;
    }

    private getAllNeighboursRows(cellRow: number): number[] {
        return [cellRow - 1, cellRow, cellRow + 1];
    }

    private getAllNeighboursCols(cellCol: number): number[] {
        return [cellCol - 1, cellCol, cellCol + 1];
    }

    private getNumOfLiveNeighbours(cellPos: number[]): number {
        let sum: number = 0;
        let curRow: number, curCol: number;
        for (let pos of this.getPositionsOfCellNeighbours(cellPos)) {
            [curRow, curCol] = pos;
            if (this._gameBoard[curRow][curCol]) {
                sum += 1;
            }
        }
        return sum;
    }

    private isCellNextGenAlive(pos: number[]): boolean {
        let numNeighAlive: number = this.getNumOfLiveNeighbours(pos);

        if (this._gameBoard[pos[0]][pos[1]]) { // previously alive
            if (isBetween(numNeighAlive, 2, 3)) {
                return true;
            }
        } else { // previously dead
            if (numNeighAlive === 3) {
                return true;
            }
        }
        return false;
    }

    public getBoardNextState(): boolean[][] {
        let nextBoardState: boolean[][] = [];
        for (let r = 0; r < this.getNrows(); r++) {
            let newRow: boolean[] = [];
            for (let c = 0; c < this.getNcols(); c++) {
                newRow.push(this.isCellNextGenAlive([r, c]));
            }
            nextBoardState.push(newRow);
        }
        return nextBoardState;
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
