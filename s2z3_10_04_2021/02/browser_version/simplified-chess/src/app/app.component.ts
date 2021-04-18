import { Component } from '@angular/core';

import boardGenerator from './chessBoard/chessBoard';
import piecesGenerator from './chessPieces/piecesFactory';
import randInt from './utils/randInt';
import { Color, toggleColor } from './dataTypes/color';
import areArraysEqual from './utils/arraysComparator';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
})
export class AppComponent {
    public title = 'simplified-chess';

    public gameBoard = boardGenerator.getChessBoardInstance();
    public pieceGenerator = piecesGenerator.getPiecesFactoryInstance();

    // sets empty board
    public setEmptyBoard(): void {
        this.gameBoard.setEmptyBoard();
    }

    public isPosInViableCaptures(rId: number, cId: number): boolean {
        return this.gameBoard.getPossibleCaptures().some((a) => {
            return areArraysEqual(a, [rId, cId]);
        });
    }

    // modifies gameBoard INPLACE
    public setTwoRandPiecesOnBoard(): void {
        let pos1: Array<number>;
        let pos2: Array<number>;
        let idPiece1: number;
        let idPiece2: number;
        let color1: Color = Color.White;
        let color2: Color = Color.Black;
        do {
            pos1 = [randInt(8), randInt(8)];
            pos2 = [randInt(8), randInt(8)];
            idPiece1 = randInt(6);
            idPiece2 = randInt(6);
            this.gameBoard.setEmptyBoard();
            this.gameBoard.setAtPos(
                pos1[0],
                pos1[1],
                this.pieceGenerator.getPiece(idPiece1, color1)
            );
            this.gameBoard.setAtPos(
                pos2[0],
                pos2[1],
                this.pieceGenerator.getPiece(idPiece2, color2)
            );
        } while (
            areArraysEqual(pos1, pos2) ||
            !this.gameBoard.isCorrPositionOnBoard()
        );
    }

    ngOnInit() {
        this.setEmptyBoard();
    }
}
