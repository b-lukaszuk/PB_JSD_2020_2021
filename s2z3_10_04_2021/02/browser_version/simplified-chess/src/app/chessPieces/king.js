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
var King = /** @class */ (function (_super) {
    __extends(King, _super);
    function King(color) {
        // king's ID: 7
        return _super.call(this, 7, color, "k") || this;
    }
    /**
     * gets all possible moves for a king from a given position
     * king moves diag, vert-horiz, forward-backward, by 1 field from start
     * @param {number} row - Int: 0-7 (incl-incl), current position row
     * @param {number} col - Int: 0-7 (incl-incl), current position col
     * @returns {Array<Array<number>>} coordinates of possible moves
     */
    King.prototype.getAllMoves = function (row, col) {
        var positions = []; // result
        var viableShifts;
        viableShifts = this.getDiagShifts().concat(this.getHorAndVertShifts());
        var distance = 1;
        for (var _i = 0, viableShifts_1 = viableShifts; _i < viableShifts_1.length; _i++) {
            var aShift = viableShifts_1[_i];
            var move = [];
            move = [row + aShift[0] * distance, col + aShift[1] * distance];
            if (this.isMoveOk(move)) {
                positions.push(move);
            }
        }
        return positions;
    };
    return King;
}(piece_1["default"]));
exports["default"] = King;
