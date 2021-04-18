import { Component } from '@angular/core';

import { singelton, GameBoard } from './gameBoard/gameBoard';
// GameBoard imported only for better autocompletion
// consider removing it after everything is done;

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {

    public title: string = 'bouncing-ball';
    public gameBoard: GameBoard = singelton.getGameBoardInstance();

    public setEmptyGameBoard(): void {
        this.gameBoard.setEmptyBoard();
    }

    public getValAtPos(row: number, col: number): number {
        return this.gameBoard.getVal(row, col);
    }

    public setBallValAtPos(row: number, col: number): void {
        this.gameBoard.setAtPos(row, col)
    }

    ngOnInit() {
        this.setEmptyGameBoard();
        this.setBallValAtPos(0, 1);
    }


}
