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

}
