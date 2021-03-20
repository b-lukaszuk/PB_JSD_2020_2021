"use strict";
exports.__esModule = true;
var Connection = /** @class */ (function () {
    function Connection(curGuess, prevGuess, lastHint, isGameOver) {
        this.curGuess = curGuess;
        this.prevGuess = prevGuess;
        this.lastHint = lastHint;
        this.isGameOver = isGameOver;
    }
    Connection.prototype.getCurGuess = function () {
        return this.curGuess;
    };
    Connection.prototype.setCurGuess = function (newGuess) {
        this.curGuess = newGuess;
    };
    Connection.prototype.getPrevGuess = function () {
        return this.prevGuess;
    };
    Connection.prototype.setPrevGuess = function (newGuess) {
        this.prevGuess = newGuess;
    };
    Connection.prototype.getLastHint = function () {
        return this.lastHint;
    };
    Connection.prototype.setLastHint = function (newHint) {
        this.lastHint = newHint;
    };
    Connection.prototype.getIsGameOver = function () {
        return this.isGameOver;
    };
    Connection.prototype.setIsGameOver = function (newIsOver) {
        this.isGameOver = newIsOver;
    };
    return Connection;
}());
exports["default"] = Connection;
