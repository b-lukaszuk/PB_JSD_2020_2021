"use strict";
exports.__esModule = true;
var Fibonacci = /** @class */ (function () {
    function Fibonacci() {
        this._FibDict = { 1: 1, 2: 1 }; // pierwsze 2 liczby ciagu Fibonacciego
    }
    // uses recursion and dictionary search (to improve effectivenes)
    Fibonacci.prototype.getNthFib = function (nthElt) {
        if (this._FibDict.hasOwnProperty(nthElt)) {
            return this._FibDict[nthElt];
        }
        else {
            // podliczone liczby do slownika celem pozniejszego wykorzystania
            this._FibDict[nthElt] = this.getNthFib(nthElt - 2) +
                this.getNthFib(nthElt - 1);
            return this._FibDict[nthElt];
        }
    };
    Fibonacci.prototype.getFibSequence = function (nFirstFibNums) {
        var fibNums = [];
        for (var i = 0; i < nFirstFibNums; i++) {
            // +1, bo klucze w slowniku od 1, oraz nFirstFibNums jest inclusive
            fibNums.push(this.getNthFib(i + 1));
        }
        return fibNums;
    };
    return Fibonacci;
}());
exports["default"] = Fibonacci;
