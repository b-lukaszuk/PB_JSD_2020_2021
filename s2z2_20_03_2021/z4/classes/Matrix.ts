class Matrix {
    private matrix;

    public constructor(arrOfArrs) {
        this.matrix = arrOfArrs;
    }

    /**
     * returns given row (copy of it) of a matrix as 1d array
     * @param {number} rowId - id of desired row (0 indexed)
     * @returns {Array<number>} desired row of a matrix
     */
    public getRow(rowId: number): Array<number> {
        return [...this.matrix[rowId]];
    }

    /**
     * returns given column (copy of it) of a matrix as 1d array
     * @param {number} colId - id of desired column (0 indexed)
     * @returns {Array<number>} desired col of a matrix
     */
    public getCol(colId: number): Array<number> {
        let column: Array<number> = [];
        for (let row = 0; row < this.matrix.length; row++) {
            column.push(this.matrix[row][colId]);
        }
        return column;
    }

    /**
     * returns dim [nOfRows, nOfCols] of the matrix
     * @returns {Array<number>} dimensions of the matrix
     */
    public getDim(): Array<number> {
        let nRows = this.matrix.length;
        let nCols = this.getRow(0).length;
        return [nRows, nCols];
    }

    public dotProduct(arr1: Array<number>, arr2: Array<number>): number {
        let result: Array<number> = [];
        let sum: number;
        if (arr1.length !== arr2.length) {
            throw "Incorrect arrays length";
        } else {
            for (let i = 0; i < arr1.length; i++) {
                result.push(arr1[i] * arr2[i]);
            }
        }
        sum = result.reduce((acc, curVal) => { return acc + curVal; });
        return sum;

    }

    /**
     * performs matrix multiplication of self * otherMatrix
     * accodring to: [l, m] * [m, n] = [l, n]
     * @param {argType} argName argDescription
     * @returns {retValType} retValDescription
     */
    public multply(otherMatrix: Matrix): Matrix {
        let result: Array<Array<number>> = [];
        for (let rowArr1 = 0; rowArr1 < this.getDim()[0]; rowArr1++) {
            let resultRow: Array<number> = [];
            for (let colArr2 = 0; colArr2 < otherMatrix.getDim()[1]; colArr2++) {
                resultRow.push(this.dotProduct(this.getRow(rowArr1),
                    otherMatrix.getCol(colArr2)));
            }
            result.push(resultRow);
        }
        return new Matrix(result);
    }

    public print() {
        for (let row = 0; row < this.matrix.length; row++) {
            if (row === 0) {
                console.log("-------"); // border, before first row
            }
            let rowAsString: string = "";
            let rowLen: number = this.matrix[row].length;
            for (let col = 0; col < rowLen; col++) {
                if (col === 0) {
                    rowAsString += "|"; // border, before first column
                }
                rowAsString += parseInt(this.matrix[row][col]) + "|";
            }
            console.log(rowAsString);
            console.log("-------"); // border, after each row
        }
    }

}

export default Matrix;
