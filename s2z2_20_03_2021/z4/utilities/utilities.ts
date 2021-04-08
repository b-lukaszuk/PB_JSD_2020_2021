/**
 * returns number as string padded from right to desired length
 * @param {number} numOrStrToPad number or string to be padded
 * @param {number} finalLen total length of the resulting string
 * @param {string} pad character(s) to serve as padding from right
 * @returns {string} padded number
 */
function rightPad(
    numOrStrToPad: number | string,
    finalLen: number,
    pad: string = " "
): string {
    let result: string = String(numOrStrToPad);
    while (result.length < finalLen) {
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

/**
 * like zipWith in Haskell => takes two lists takes one elt from each of them
 * applies a function to the elts and the result is put into another list
 * resulting list length is equal to the shorter of lists
 * @param {Array<any>} arr1
 * @param {Array<any>} arr2
 * @param {Function} fn - function taking 2 args
 * @returns {Array<any>} retValDescription
 */
function zipWith(arr1: Array<any>, arr2: Array<any>,
    fn: Function): Array<any> {

    let result: Array<any> = [];
    let min: number = Math.min(arr1.length, arr2.length);

    for (let i = 0; i < min; i++) {
        result.push(fn(arr1[i], arr2[i]));
    }

    return result;
}


export {
    rightPad, numLen, flatten2dArray,
    zipWith
};
