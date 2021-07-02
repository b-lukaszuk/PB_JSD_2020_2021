"use strict";
exports.__esModule = true;
/**
 * 1D-arrays comparator
 * @param {argType} argName argDescription
 * @returns {retValType} retValDescription
 */
function areArraysEqual(arr1, arr2) {
    if (arr1.length !== arr2.length) {
        return false;
    }
    for (var i = 0; i < arr1.length; i++) {
        if (arr1[i] !== arr2[i]) {
            return false;
        }
    }
    return true;
}
exports["default"] = areArraysEqual;
