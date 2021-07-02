"use strict";
exports.__esModule = true;
var arraysComparator_1 = require("../utils/arraysComparator");
var chessField_1 = require("./chessField");
var king_1 = require("../chessPieces/king");
var pawn_1 = require("../chessPieces/pawn");
var piece_1 = require("../chessPieces/piece");
var rightPad_1 = require("../utils/rightPad");
var color_1 = require("../dataTypes/color");
var Chessboard = /** @class */ (function () {
    // empty board initialization
    function Chessboard() {
        // internal representation of the chessBoard
        this._chessBoard = [];
        // possible moves of pieces on chessboard
        this._viableMovesPositions = [];
        // possible captures by any piece at the board
        this._viableCapturesPositions = [];
        this._piecesOnBoardPositions = [];
        this._corrPiecesPos = true; // flag, for correct board setting
        this.setEmptyBoard();
    }
    Chessboard.prototype.setEmptyBoard = function () {
        this._chessBoard = [];
        this._viableMovesPositions = [];
        this._viableCapturesPositions = [];
        this._piecesOnBoardPositions = [];
        this._corrPiecesPos = true; // flag, for correct board setting
        var curColor = color_1.Color.Black;
        for (var r = 0; r < 8; r++) {
            var chessBoardRow = [];
            for (var c = 0; c < 8; c++) {
                chessBoardRow.push(new chessField_1["default"](0, curColor));
                curColor = color_1.toggleColor(curColor);
            }
            // first field of the next row starts with the same color
            // as the last field of the previous row
            curColor = color_1.toggleColor(curColor);
            this._chessBoard.push(chessBoardRow);
        }
    };
    /**
     * returns info about correct or incorrect position on the chessboard
     */
    Chessboard.prototype.isCorrPositionOnBoard = function () {
        return this._corrPiecesPos;
    };
    /**
     * returns array of possible captures
     * does not make (deep) copy of _viableCapturesPositions
     * so do not modify
     */
    Chessboard.prototype.getPossibleCaptures = function () {
        this.updateViableCapturePositions(); // sets _viableCapturesPositions
        return this._viableCapturesPositions;
    };
    /**
     * updates fields with move indicators (Field value 1) if the field is empty
     */
    Chessboard.prototype.updateMovesIndicators = function (movesPositions) {
        for (var _i = 0, movesPositions_1 = movesPositions; _i < movesPositions_1.length; _i++) {
            var position = movesPositions_1[_i];
            var pRow = void 0, pCol = void 0;
            pRow = position[0], pCol = position[1];
            if (this._chessBoard[pRow][pCol].getVal() === 0) {
                this._chessBoard[pRow][pCol].setTo(1);
            }
        }
    };
    /**
     * updates this._viableCapturesPositions by new moves positions
     */
    Chessboard.prototype.updateViableMovesPositions = function (newMovesPositions) {
        if (this._viableMovesPositions.length === 0) {
            this._viableMovesPositions = newMovesPositions;
        }
        else {
            this._viableMovesPositions = this._viableMovesPositions.concat(newMovesPositions);
        }
    };
    /**
     * checks for positions [r1, c1] and [r2, c2] equality, e.g.
     * r1 === r2 && c1 === c2
     */
    Chessboard.prototype.arePositionsEql = function (pos1, pos2) {
        return arraysComparator_1["default"](pos1, pos2);
    };
    Chessboard.prototype.updateViableCapturePositions = function () {
        for (var i = 0; i < this._piecesOnBoardPositions.length; i++) {
            for (var j = 0; j < this._viableMovesPositions.length; j++) {
                if (this.arePositionsEql(this._piecesOnBoardPositions[i], this._viableMovesPositions[j])) {
                    this._viableCapturesPositions.push(this._piecesOnBoardPositions[i]);
                }
            }
        }
    };
    /**
     * king moves one field in every direction
     * opponent's king is not allowed to allready stand there
     */
    Chessboard.prototype.isKingCollidingWithOtherKing = function (row, col, king) {
        var kingsMovesPos = king.getAllMoves(row, col);
        // checking for otehr king standing within a move/field distance
        for (var _i = 0, kingsMovesPos_1 = kingsMovesPos; _i < kingsMovesPos_1.length; _i++) {
            var position = kingsMovesPos_1[_i];
            var pRow = void 0, pCol = void 0;
            pRow = position[0], pCol = position[1];
            if (this._chessBoard[pRow][pCol].getVal() instanceof king_1["default"]) {
                console.log("kings collision detected");
                return true;
            }
        }
        return false;
    };
    /**
     * sets a field at some value (0 - empty, 1 - move indicator, Piece)
     * updates this._corrPiecesPos
     */
    Chessboard.prototype.setAtPos = function (row, col, what) {
        var thePiecePossibleMoves = [];
        if (what instanceof piece_1["default"]) {
            thePiecePossibleMoves = what.getAllMoves(row, col);
            this.updateViableMovesPositions(thePiecePossibleMoves);
        }
        if (what instanceof king_1["default"]) {
            this._corrPiecesPos = !this.isKingCollidingWithOtherKing(row, col, what);
        }
        if (what instanceof pawn_1["default"]) {
            // pawns start from 2nd row, and are promoted at last row
            this._corrPiecesPos = (row !== 0) && (row !== 7);
        }
        this._chessBoard[row][col].setTo(what);
        this._piecesOnBoardPositions.push([row, col]);
        this.updateMovesIndicators(thePiecePossibleMoves);
    };
    /**
     * returns positions of all the pieces on chessBoard
     * helps with testing (easier to locate a piece on the printed chessBoard)
     * doesn't return a copy of the private field, so do not modify the result
     */
    Chessboard.prototype.getPiecesOnBoardPositions = function () {
        return this._piecesOnBoardPositions;
    };
    // prints current chessboard state
    Chessboard.prototype.print = function () {
        var fieldLen = this._chessBoard[0][0].toString().length;
        var colSep = "|";
        var rowSepSingleCell = "+" + rightPad_1["default"]("-", fieldLen, "-");
        var rowSep = " " +
            rightPad_1["default"](rowSepSingleCell, 8 * rowSepSingleCell.length, rowSepSingleCell) + "+";
        console.log("   0   1   2   3   4   5   6   7  "); // cols numbering
        console.log(rowSep);
        for (var row = 0; row < this._chessBoard.length; row++) {
            var rowToPrint = row + "|"; // row numbering on left
            for (var col = 0; col < this._chessBoard[row].length; col++) {
                rowToPrint += this._chessBoard[row][col].toString();
                rowToPrint += colSep;
            }
            console.log(rowToPrint);
            console.log(rowSep);
        }
    };
    return Chessboard;
}());
// singelton required by the task
var singelton = (function () {
    var instance; // no initialization so undefined
    function init() {
        return new Chessboard();
    }
    function getInstance() {
        if (!Boolean(instance)) {
            instance = init();
        }
        return instance;
    }
    return {
        getChessBoardInstance: getInstance
    };
})();
exports["default"] = singelton;
