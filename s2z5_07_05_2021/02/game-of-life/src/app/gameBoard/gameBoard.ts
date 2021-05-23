import randInt from "../utils/randInt";
import isBetween from "../utils/isNumBetween";

class GameBoard {
    private _gameBoard: boolean[][] = [];

    // probability of a cell being alive (true)
    // in statistics probability is 0-1, here give it with 0.1 accuracy
    public constructor(nRows: number = 25, nCols: number = 25,
        probFrom0To1ByOneTenth: number = 0.3) {
        this._gameBoard = this.initializeBoard(nRows, nCols,
            probFrom0To1ByOneTenth);
    }

    public setGameBoard(newGameBoard: boolean[][]): void {
        this._gameBoard = newGameBoard;
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

    private getNrows(): number {
        return this._gameBoard.length;
    }

    private getNcols(): number {
        return this._gameBoard[0].length;
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

    public getPositionsOfNeighbours(cellPositionRowCol: number[]): number[][] {
        let result: number[][] = [];
        let cellRow: number, cellCol: number;
        [cellRow, cellCol] = cellPositionRowCol;
        for (let row of this.getAllNeighboursRows(cellRow)) {
            for (let col of this.getAllNeighboursCols(cellCol)) {
                if (this.isNewPosUneqlOldPos(cellPositionRowCol, [row, col]) &&
                    this.isPosOnGameBoard([row, col])) {
                    result.push([row, col]);
                }
            }
        }
        return result;
    }

    private isNewPosUneqlOldPos(oldPos: number[],
        newPos: number[]): boolean {
        return (oldPos[0] !== newPos[0]) || (oldPos[1] !== newPos[1]);
    }

    private isPosOnGameBoard(pos: number[]): boolean {
        let gbNofRows: number = this._gameBoard.length;
        let gbNofCols: number = this._gameBoard[0].length;
        let isRowInRange: boolean = isBetween(pos[0], 0, gbNofRows - 1);
        let isColInRange: boolean = isBetween(pos[1], 0, gbNofCols - 1);
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
        for (let pos of this.getPositionsOfNeighbours(cellPos)) {
            [curRow, curCol] = pos;
            if (this._gameBoard[curRow][curCol]) {
                sum += 1;
            }
        }
        return sum;
    }

    // private getNumOfDeadNeighbours(cellPos: number[]): number {
    //     let sum: number = 0;
    //     let curRow: number, curCol: number;
    //     for (let pos of this.getPositionsOfNeighbours(cellPos)) {
    //         [curRow, curCol] = pos;
    //         if (!this._gameBoard[curRow][curCol]) {
    //             sum += 1;
    //         }
    //     }
    //     return sum;
    // }

    private cellNextGenAliveOrDead(pos: number[]): boolean {
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

    public getNextState(): boolean[][] {
        let nextBoardState: boolean[][] = [];
        for (let r = 0; r < this.getNrows(); r++) {
            let newRow: boolean[] = [];
            for (let c = 0; c < this.getNcols(); c++) {
                newRow.push(this.cellNextGenAliveOrDead([r, c]));
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

