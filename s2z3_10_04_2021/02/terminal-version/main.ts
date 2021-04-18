///////////////////////////////////////////////////////////////////////////////
//                                  imports                                  //
///////////////////////////////////////////////////////////////////////////////
import boardGenerator from "./chessBoard/chessBoard";
import piecesGenerator from "./chessPieces/piecesFactory";
import randInt from "./utils/randInt"
import { Color, toggleColor } from "./dataTypes/color";
import areArraysEqual from "./utils/arraysComparator";


///////////////////////////////////////////////////////////////////////////////
//                         global constants/variables                        //
///////////////////////////////////////////////////////////////////////////////
const gameBoard = boardGenerator.getChessBoardInstance();
const pieceGenerator = piecesGenerator.getPiecesFactoryInstance();


///////////////////////////////////////////////////////////////////////////////
//                           functions declarations                          //
///////////////////////////////////////////////////////////////////////////////
function displayGameInfo(): void {
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
function setTwoRandPiecesOnBoard(): void {
    let pos1: Array<number>
    let pos2: Array<number>
    let color1: Color = Color.White;
    do {
        gameBoard.setEmptyBoard();
        pos1 = [randInt(8), randInt(8)];
        pos2 = [randInt(8), randInt(8)];
        gameBoard.setAtPos(pos1[0], pos1[1], pieceGenerator.getPiece(randInt(6),
            color1));
        gameBoard.setAtPos(pos2[0], pos2[1], pieceGenerator.getPiece(randInt(6),
            toggleColor(color1)));
    } while (areArraysEqual(pos1, pos2) || !gameBoard.isCorrPositionOnBoard());
}

function arrayOfPostionsToString(positions: Array<Array<number>>): string {
    let result: string = "";
    for (let i = 0; i < positions.length; i++) {
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
    console.log("Possible captures (none if empty): ",
        gameBoard.getPossibleCaptures());
}


///////////////////////////////////////////////////////////////////////////////
//                             program execution                             //
///////////////////////////////////////////////////////////////////////////////
main();

