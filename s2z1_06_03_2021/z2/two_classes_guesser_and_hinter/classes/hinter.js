"use strict";
exports.__esModule = true;
var rangeFuncs_1 = require("../utilities/rangeFuncs");
var Hinter = /** @class */ (function () {
    // rengeStart-rangeEnd (incl-excl)
    function Hinter(rangeStart, rangeEnd) {
        if (rangeStart === void 0) { rangeStart = 1; }
        if (rangeEnd === void 0) { rangeEnd = 101; }
        this._secretNum = rangeFuncs_1.getRandNumFromRange(rangeStart, rangeEnd);
    }
    /**
     * ocenia czy guess jest mniejszy (-1), rowny(0), czy wiekszy (1)
     * niz sekretna liczba, wypisuje o tym informacje
     * @param {number} guess - liczba (Int) z zakr z ktorego utworz _secretNum
     * @return {number} -1|0|1 (dla guess <|=|> SecretNum)
     */
    Hinter.prototype.evaluateGuess = function (guess) {
        if (guess < this._secretNum) {
            console.log("+ Hinter: higher");
            return -1;
        }
        else if (guess > this._secretNum) {
            console.log("+ Hinter: lower");
            return 1;
        }
        else {
            console.log("+ Hinter: You got it!");
            console.log("+ Hinter: Congratulations!");
            return 0;
        }
    };
    return Hinter;
}());
exports["default"] = Hinter;
