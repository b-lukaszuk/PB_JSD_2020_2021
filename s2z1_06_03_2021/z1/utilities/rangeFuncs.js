"use strict";
exports.__esModule = true;
exports.range = void 0;
// helper function, useful for testing purposes
// similar to python's range
// https://www.w3schools.com/python/ref_func_range.asp
// start-stop (inclusive-exclusive)
function range(start, stop, step) {
    if (step === void 0) { step = 1; }
    var result = [];
    for (var i = start; i < stop; i += step) {
        result.push(i);
    }
    return result;
}
exports.range = range;
