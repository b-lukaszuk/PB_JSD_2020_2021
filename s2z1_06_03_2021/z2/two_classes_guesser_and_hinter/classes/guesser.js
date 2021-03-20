"use strict";
exports.__esModule = true;
var rangeFuncs_1 = require("../utilities/rangeFuncs");
var Guesser = /** @class */ (function () {
    // poczatkowy zakres z ktorego bedzie wybierany guess (inclusive-exclusive)
    // choc i tak zawsze bierze po srodku
    function Guesser(minRange, maxRange) {
        if (minRange === void 0) { minRange = 1; }
        if (maxRange === void 0) { maxRange = 101; }
        this._minRangeForGuess = minRange;
        this._maxRangeForGuess = maxRange;
        this._curGuess = rangeFuncs_1.getMiddleOfRange(this._minRangeForGuess, this._maxRangeForGuess);
    }
    // zwraca Guess-a (zawsze Int)
    // deklaruje co zgaduje (console.log())
    Guesser.prototype.getGuess = function () {
        // range: inclusive, INCLUSIVE
        this._curGuess = rangeFuncs_1.getMiddleOfRange(this._minRangeForGuess, this._maxRangeForGuess);
        console.log("- Guesser: My guess is", this._curGuess);
        return this._curGuess;
    };
    /**
     * przyjmuje feedback odnosnie poprzedniego guessu
     * updateuje zakres zgadywania (_minRangeForGuess, _maxRangeForGuess)
     * jesli wygra to wypisuje monit
     * @param {number} feedback -1|0|1 (dla guess <|=|> secretNum)
     * @return {number} 1 - jesli wygrana, 0 - jesli szukamy dalej
     */
    Guesser.prototype.isItOver = function (feedback) {
        var result = false;
        if (feedback < 0) {
            this._minRangeForGuess = this._curGuess;
        }
        else if (feedback > 0) {
            this._maxRangeForGuess = this._curGuess;
        }
        else {
            result = true;
            console.log("- Guesser: Yay, So it was", this._curGuess);
            console.log("- Guesser: I win!");
        }
        return result;
    };
    return Guesser;
}());
exports["default"] = Guesser;
