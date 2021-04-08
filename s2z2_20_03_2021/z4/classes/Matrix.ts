import {
    rightPad, numLen,
    flatten2dArray, zipWith
} from "../utilities/utilities";

class Matrix {

    private matrix: Array<Array<number>>;

    public constructor(arrOfArrs: Array<Array<number>>) {
        let nOfColsPerRow: Array<number> = [];
        for (let row = 0; row < arrOfArrs.length; row++) {
            nOfColsPerRow.push(arrOfArrs[row].length);
        }
        // if all rows got equal num of cols
        if (nOfColsPerRow.every((len) => { return len === nOfColsPerRow[0] })) {
            this.matrix = arrOfArrs;
        } else {
            throw "number of columns differ between the rows";
        }
    }

    /**
     * returns given row (copy of it) of Matrix as 1d array
     * @param {number} rowId - id of the desired row (0 indexed)
     * @returns {Array<number>} desired row of Matrix
     */
    private getRow(rowId: number): Array<number> {
        return [...this.matrix[rowId]];
    }

    /**
     * returns given column (copy of it) of Matrix as 1d array
     * @param {number} colId - id of desired column (0 indexed)
     * @returns {Array<number>} desired col of Matrix
     */
    private getCol(colId: number): Array<number> {
        let column: Array<number> = [];
        for (let row = 0; row < this.matrix.length; row++) {
            column.push(this.matrix[row][colId]);
        }
        return column;
    }

    /**
     * returns dim [nOfRows, nOfCols] of Matrix
     * @returns {Array<number>} dimensions of Matrix
     */
    private getDim(): Array<number> {
        let nRows = this.matrix.length;
        let nCols = this.getRow(0).length;
        return [nRows, nCols];
    }

    /**
     * returns dot product of two vectors (two 1d arrays)
     * dot product -> eltNArr1 times eltNArr2 and sum of the products
     * @param {Array<number>} array1 1d array
     * @param {Array<number>} array2 1d array
     * @returns {number} dot product
     */
    public dotProduct(arr1: Array<number>, arr2: Array<number>): number {
        let result: Array<number> = [];
        let sum: number = 0;
        if (arr1.length !== arr2.length) {
            throw "Incorrect arrays length (lengths must be equal)";
        } else {
            result = zipWith(arr1, arr2, (a, b) => { return a * b });
        }
        sum = result.reduce((acc, curVal) => { return acc + curVal; });
        return sum;
    }

    /**
     * performs matrix multiplication of self * otherMatr
     * accodring to: [l, m] * [m, n] = [l, n]
     * usage: someMatrix.mult(otherMatr)
     * @param {Matrix} otherMatr other matrix
     * @returns {Matrix} result of matrix multiplication
     */
    public mult(otherMatr: Matrix): Matrix {
        let result: Array<Array<number>> = [];
        let dimsMatr1 = this.getDim();
        let dimsMatr2 = otherMatr.getDim();
        if (dimsMatr1[1] !== dimsMatr2[0]) {
            let msg = "Required dims: l,m * m,n" + " => got: " +
                dimsMatr1.toString() + " * " + dimsMatr2.toString();
            throw msg;
        } else {
            for (let rowArr1 = 0; rowArr1 < dimsMatr1[0]; rowArr1++) {
                let resultRow: Array<number> = [];
                for (let colArr2 = 0; colArr2 < dimsMatr2[1]; colArr2++) {
                    resultRow.push(this.dotProduct(this.getRow(rowArr1),
                        otherMatr.getCol(colArr2)));
                }
                result.push(resultRow);
            }
            return new Matrix(result);
        }
    }

    public print() {
        let flatArray: Array<number> = flatten2dArray(this.matrix);
        let maxNum: number = Math.max(...flatArray);
        let maxNumLen = numLen(maxNum);
        let colSep = "|";
        let rowSepSingleCell = "+" + rightPad("-", maxNumLen, "-");
        let rowSep = rightPad(rowSepSingleCell,
            this.getDim()[1] * rowSepSingleCell.length,
            rowSepSingleCell) + "+";
        console.log(rowSep);
        for (let row = 0; row < this.matrix.length; row++) {
            let rowToPrint = "|";
            for (let col = 0; col < this.matrix[row].length; col++) {
                rowToPrint += rightPad(this.matrix[row][col], maxNumLen, " ") +
                    colSep;
            }
            console.log(rowToPrint);
            console.log(rowSep);
        }
    }
}

export default Matrix;
