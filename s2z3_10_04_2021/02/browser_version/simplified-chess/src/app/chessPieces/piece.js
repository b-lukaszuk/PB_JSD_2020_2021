"use strict";
exports.__esModule = true;
var color_1 = require("../dataTypes/color");
var Piece = /** @class */ (function () {
    /**
     * IDs:
     * 1 - pawn, 2 - knight
     * 3 - bishop, 5 - rook
     * 6 - queen, 7 - king
     */
    function Piece(value, color, strRepresentation) {
        this._value = value;
        this._color = color;
        this._repr = strRepresentation;
    }
    /**
     * returns value (piece ID)
     */
    Piece.prototype.getVal = function () {
        return this._value;
    };
    /**
     * returns piece color
     */
    Piece.prototype.getColor = function () {
        return this._color;
    };
    /**
     * returns string representation of a piece
     * small letters for black, capital letters for white
     */
    Piece.prototype.toString = function () {
        if (this._color === color_1.Color.White) {
            return this._repr.toLocaleUpperCase();
        }
        return this._repr.toLocaleLowerCase();
    };
    /**
     * checks if coordinates are in a chessboard (r/c from 0-7)
     * @param {Array<number>} coords [row, col]
     * @returns {boolean} are both coords within 0-7 (incl-incl)
     */
    Piece.prototype.isMoveOk = function (coords) {
        for (var _i = 0, coords_1 = coords; _i < coords_1.length; _i++) {
            var coord = coords_1[_i];
            if (coord < 0 || coord > 7) {
                return false;
            }
        }
        return true;
    };
    /**
     * shifts by 1 field for diagonal moves in all directions
     * to be overlayed on piece position [row, col]
     * DIAG.: all configurations of +/-1 in [row or col]
     * @returns {Array<Array<number>>} shifts by 1 field for diagonal moves
     */
    Piece.prototype.getDiagShifts = function () {
        var choices = [-1, 1];
        var diagShifts = [];
        for (var _i = 0, choices_1 = choices; _i < choices_1.length; _i++) {
            var num1 = choices_1[_i];
            for (var _a = 0, choices_2 = choices; _a < choices_2.length; _a++) {
                var num2 = choices_2[_a];
                diagShifts.push([num1, num2]);
            }
        }
        return diagShifts;
    };
    /**
     * shifts by 1 field for horizontal and vertical moves in all directions
     * to be overlayed on piece position [row, col]
     * hor/vert.: all configurations of +/-1 and 0
     * @returns {Array<Array<number>>} shifts by 1 field for hor/vert moves
     */
    Piece.prototype.getHorAndVertShifts = function () {
        var choices = [-1, 1, 0];
        var horAndVertShifts = [];
        for (var _i = 0, choices_3 = choices; _i < choices_3.length; _i++) {
            var num1 = choices_3[_i];
            for (var _a = 0, choices_4 = choices; _a < choices_4.length; _a++) {
                var num2 = choices_4[_a];
                // must be +/-1 with 0 (heterogenous config)
                if (Math.abs(num1) !== Math.abs(num2)) {
                    horAndVertShifts.push([num1, num2]);
                }
            }
        }
        return horAndVertShifts;
    };
    /**
     * shifts by 1 move for L-shaped moves (knight)
     * to be overlayed on piece position [row, col]
     * L-shape: all configurations of +/-2 and +/-1
     * @returns {Array<Array<number>>} shifts by 1 move for knight
     */
    Piece.prototype.getLShapedShifts = function () {
        var choices = [-2, 2, -1, 1];
        var lShapedShifts = [];
        for (var _i = 0, choices_5 = choices; _i < choices_5.length; _i++) {
            var num1 = choices_5[_i];
            for (var _a = 0, choices_6 = choices; _a < choices_6.length; _a++) {
                var num2 = choices_6[_a];
                // must be +/-2 with +/-1 (heterogenous config)
                if (Math.abs(num1) !== Math.abs(num2)) {
                    lShapedShifts.push([num1, num2]);
                }
            }
        }
        return lShapedShifts;
    };
    /**
     * mock implementation it will be overwrittn by children methods
     * necessary for setAtPos() from ChessBoard class
     * @param {number} row - Int: 0-7 (incl-incl), current position row
     * @param {number} col - Int: 0-7 (incl-incl), current position col
     * @returns {Array<Array<number>>} coordinates of possible moves
     */
    Piece.prototype.getAllMoves = function (row, col) {
        return [];
    };
    Piece.prototype.getValue = function () {
        return this._value;
    };
    return Piece;
}());
exports["default"] = Piece;
