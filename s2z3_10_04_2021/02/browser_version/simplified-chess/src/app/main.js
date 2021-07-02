"use strict";
exports.__esModule = true;
///////////////////////////////////////////////////////////////////////////////
//                                  imports                                  //
///////////////////////////////////////////////////////////////////////////////
var chessBoard_1 = require("./chessBoard/chessBoard");
var piecesFactory_1 = require("./chessPieces/piecesFactory");
var randInt_1 = require("./utils/randInt");
var color_1 = require("./dataTypes/color");
var arraysComparator_1 = require("./utils/arraysComparator");
///////////////////////////////////////////////////////////////////////////////
//                         global constants/variables                        //
///////////////////////////////////////////////////////////////////////////////
var gameBoard = chessBoard_1["default"].getChessBoardInstance();
var pieceGenerator = piecesFactory_1["default"].getPiecesFactoryInstance();
///////////////////////////////////////////////////////////////////////////////
//                           functions declarations                          //
///////////////////////////////////////////////////////////////////////////////
function displayGameInfo() {
    console.log("Info");
    console.log("=============");
    console.log("Pieces are printed with letters");
    console.log("Uppercase letters stand for white pieces");
    console.log("Lowercase letters stand for black pieces");
    console.log("=============");
    console.log("P|p - pawn");
    console.log("N|n - knight");
    console.log("B|b - bishop");
    console.log("R|r - rook");
    console.log("Q|q - queen");
    console.log("K|k - king");
    console.log("=============");
    console.log(" *  inside a field designates a theoretical possibility for "
        + "piece movement on an empty board");
}
// modifies gameBoard
function setTwoRandPiecesOnBoard() {
    var pos1;
    var pos2;
    var color1 = color_1.Color.White;
    do {
        gameBoard.setEmptyBoard();
        pos1 = [randInt_1["default"](8), randInt_1["default"](8)];
        pos2 = [randInt_1["default"](8), randInt_1["default"](8)];
        gameBoard.setAtPos(pos1[0], pos1[1], pieceGenerator.getPiece(randInt_1["default"](6), color1));
        gameBoard.setAtPos(pos2[0], pos2[1], pieceGenerator.getPiece(randInt_1["default"](6), color_1.toggleColor(color1)));
    } while (arraysComparator_1["default"](pos1, pos2) || !gameBoard.isCorrPositionOnBoard());
}
function arrayOfPostionsToString(positions) {
    var result = "";
    for (var i = 0; i < positions.length; i++) {
        result += "[" + positions[i].toString() + "], ";
    }
    return result;
}
function main() {
    displayGameInfo();
    console.log("\nSetting two random pieces on the board\n");
    setTwoRandPiecesOnBoard();
    console.log("printing the chessboard\n");
    gameBoard.print();
    console.log("pieces are at positions: " +
        arrayOfPostionsToString(gameBoard.getPiecesOnBoardPositions()));
    console.log("Possible captures (none if empty): ", gameBoard.getPossibleCaptures());
}
///////////////////////////////////////////////////////////////////////////////
//                             program execution                             //
///////////////////////////////////////////////////////////////////////////////
main();
