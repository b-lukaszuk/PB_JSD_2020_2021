"use strict";
exports.__esModule = true;
var bishop_1 = require("./bishop");
var king_1 = require("./king");
var knight_1 = require("./knight");
var pawn_1 = require("./pawn");
var queen_1 = require("./queen");
var rook_1 = require("./rook");
var PiecesFactory = /** @class */ (function () {
    // nothing todo here
    function PiecesFactory() {
    }
    /**
     * returns desired piece
     * 0 - pawn, 1 - knight, 2 - bishop, 3 - rook, 4 - queen, 5 - king
     * @param {number} type 0-6 (incl-incl)
     * @param {Color} color color of the piece
     * @returns {Piece} desired piece
     */
    PiecesFactory.prototype.getPiece = function (type, color) {
        switch (type) {
            case 0:
                return new pawn_1["default"](color);
            case 1:
                return new knight_1["default"](color);
            case 2:
                return new bishop_1["default"](color);
            case 3:
                return new rook_1["default"](color);
            case 4:
                return new queen_1["default"](color);
            default:
                return new king_1["default"](color);
        }
    };
    return PiecesFactory;
}());
// singelton required by the task
var singelton = (function () {
    var instance = undefined;
    function init() {
        return new PiecesFactory();
    }
    function getInstance() {
        if (!Boolean(instance)) {
            instance = init();
        }
        return instance;
    }
    return {
        getPiecesFactoryInstance: getInstance
    };
})();
exports["default"] = singelton;
