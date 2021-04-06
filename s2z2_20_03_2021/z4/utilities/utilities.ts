/**
 * returns number as string padded from right to desired length
 * @param {number} numToPad number to be padded
 * @param {number} finalLen total length of the resulting string
 * @param {string} pad character(s) to serve as padding from right
 * @returns {string} padded number
 */
function rPadNum(
    numToPad: number,
    finalLen: number,
    pad: string = " "
): string {
    let result: string = numToPad.toString(10);
    for (let i = result.length; i < finalLen; i++) {
        result += pad;
    }
    return result;
}

/**
 * returns no of chars (digits) in a number
 * @param {number} someNum a number (Int) where we will count digits
 * @returns {nuber} number of chars (digits) someNum
 */
function numLen(someNum: number): number {
    return someNum.toString(10).length;
}

/**
 * 2d array -> 1d array (flattens by rows, kind of concats rows)
 * @param {Array<Array<number>>} array2d array of arrays of ints
 * @returns {Array<number>} flattened (1d) array
 */
function flatten2dArray(array2d: Array<Array<number>>): Array<number> {
    let result: Array<number> = [];
    for (let row = 0; row < array2d.length; row++) {
        for (let col = 0; col < array2d[row].length; col++) {
            result.push(array2d[row][col]);
        }
    }
    return result;
}

export { rPadNum, numLen, flatten2dArray };
