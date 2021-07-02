"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
var piece_1 = require("./piece");
var color_1 = require("../dataTypes/color");
var Pawn = /** @class */ (function (_super) {
    __extends(Pawn, _super);
    function Pawn(color) {
        // pawn's ID: 1
        return _super.call(this, 1, color, "p") || this;
    }
    /**
     * gets all possible CAPTURING MOVES for a pawn from a given position
     * pawn captures on diagonals, only forward, 1 field ahead (1 from start)
     * @param {number} row - Int: 0-7 (incl-incl), current position row
     * @param {number} col - Int: 0-7 (incl-incl), current position col
     * @returns {Array<Array<number>>} coordinates of possible moves
     */
    Pawn.prototype.getAllMoves = function (row, col) {
        var positions = []; // result
        var possibleShifts = this.getDiagShifts();
        var distance = 1;
        for (var _i = 0, possibleShifts_1 = possibleShifts; _i < possibleShifts_1.length; _i++) {
            var aShift = possibleShifts_1[_i];
            var move = [];
            move = [row + aShift[0] * distance, col + aShift[1] * distance];
            if (this.isMoveOk(move)) {
                if (this.getColor() === color_1.Color.White && aShift[0] === 1) {
                    positions.push(move); // capturing row forward
                }
                if (this.getColor() === color_1.Color.Black && aShift[0] === -1) {
                    positions.push(move); // capturing row backward
                }
            }
        }
        return positions;
    };
    return Pawn;
}(piece_1["default"]));
exports["default"] = Pawn;
