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

export default rightPad;
