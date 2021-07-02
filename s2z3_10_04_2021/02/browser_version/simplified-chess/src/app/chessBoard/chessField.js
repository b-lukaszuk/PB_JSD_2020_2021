"use strict";
exports.__esModule = true;
var color_1 = require("../dataTypes/color");
var ChessField = /** @class */ (function () {
    /**
     * _value: 0 (empty field), 1 (move indicator) | Piece (occupied field)
     */
    function ChessField(_value, _color) {
        this._value = _value;
        this._color = _color;
    }
    /**
     * returns string indicator for middle of the field (empty, move or figure)
     */
    ChessField.prototype.getValAsStr = function () {
        switch (this._value) {
            case 0:
                return this._color === color_1.Color.Black ? "!" : " ";
            case 1:
                return "*";
            default:
                return this._value.toString();
        }
    };
    /**
     * returns string of field contents
     */
    ChessField.prototype.toString = function () {
        var theString = " " + this.getValAsStr() + " ";
        if (this._color === color_1.Color.Black) {
            theString = "!" + this.getValAsStr() + "!";
        }
        return theString;
    };
    /**
     * sets field to 0 (empty), 1 (move indicator) or Piece
     */
    ChessField.prototype.setTo = function (what) {
        this._value = what;
    };
    /**
     * returns value of a field
     */
    ChessField.prototype.getVal = function () {
        return this._value;
    };
    return ChessField;
}());
exports["default"] = ChessField;
