import { Component } from '@angular/core';

// GameBoard needed for syntax checker
import { singelton, GameBoard } from "./gameBoard/gameBoard";

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {
    public title = 'game-of-life';
    public gameBoard: GameBoard = singelton.getGameBoardInstance();
    public gameBoardNextState: boolean[][] = [];

    // public displayNeighPos(pos: number[]) {
    //     let positions: number[][] = [];
    //     positions = this.gameBoard.getPositionsOfNeighbours(pos);
    //     console.log(positions);
    // }

    public moveToNextState() {
        // console.log("next generation of life");
        this.gameBoardNextState = this.gameBoard.getNextState();
        this.gameBoard.setGameBoard(this.gameBoardNextState);
        this.gameBoardNextState = [];
    }

    ngOnInit() {

    };
}

