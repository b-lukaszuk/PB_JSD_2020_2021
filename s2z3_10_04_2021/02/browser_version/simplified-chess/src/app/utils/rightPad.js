"use strict";
exports.__esModule = true;
/**
 * returns number as string padded from right to desired length
 * @param {number} numOrStrToPad number or string to be padded
 * @param {number} finalLen total length of the resulting string
 * @param {string} pad character(s) to serve as padding from right
 * @returns {string} padded number
 */
function rightPad(numOrStrToPad, finalLen, pad) {
    if (pad === void 0) { pad = " "; }
    var result = String(numOrStrToPad);
    while (result.length < finalLen) {
        result += pad;
    }
    return result;
}
exports["default"] = rightPad;
