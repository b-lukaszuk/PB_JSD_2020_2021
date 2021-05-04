import { Component } from '@angular/core';

import singlCardFactory from './card/cardFactory';
import Card from './card/card';
import Player from './player/player';
import randInt from './utils/randInt';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
})
export class AppComponent {
    public title: string = 'memory';
    public cardFactory = singlCardFactory.getCardFactoryInstance();
    public cards: Card[][] = [];
    public players: Player[] = [];
    public playerOnMoveId = 0;
    public gameOver: boolean = false;
    public shownCards: Card[] = [];
    public round: number = 1;

    private initializeCards(): void {
        // number of cards is always even (two of a kind)
        let nOfRows: number = this.cardFactory.getNOfCards() / 4;
        let nOfCols: number = this.cardFactory.getNOfCards() / nOfRows;
        for (let r = 0; r < nOfRows; r++) {
            let row: Card[] = [];
            for (let c = 0; c < nOfCols; c++) {
                let aCard: Card = this.cardFactory.getRandCard();
                aCard.setXYpos(r, c);
                row.push(aCard);
            }
            this.cards.push(row);
        }
    }

    private cardsGetDims(): number[] {
        let row = this.cards.length;
        let col = this.cards[0].length;
        return [row, col];
    }

    private initializePlayers(): void {
        let colors: string[] = ['red', 'black', 'blue', 'orange'];
        let numOfPlayers = randInt(2, 5);
        // let numOfPlayers = 2;
        for (let i = 0; i < numOfPlayers; i++) {
            this.players.push(new Player(i, colors[i], this.cardsGetDims()));
        }
    }

    private updateGameOver(): void {
        let noOfCards = this.cards.length * this.cards[0].length;
        if (this.shownCards.length === noOfCards) {
            this.gameOver = true;
        }
    }

    private getTwoGuesses(aPlayer: Player): [Card, Card] {
        let g1, g2: number[];
        let c1, c2: Card;
        do {
            [g1, g2] = aPlayer.getBestGuess(); // two positions, 1 pos: [x, y]
            c1 = this.cards[g1[0]][g1[1]];
            c2 = this.cards[g2[0]][g2[1]];
        } while (c1.isEqual(c2) || c1.isMatched() || c2.isMatched());
        return [c1, c2];
    }

    /**
     * if playerOnMoveId is too high, resets it to 0
     */
    private correctPlayerOnMoveId(): void {
        if (this.playerOnMoveId === this.players.length) {
            this.playerOnMoveId = 0;
            this.round += 1;
        }
    }

    /**
     * covers currently uncovered cards
     */
    private coverVisibleCards(): void {
        for (let r = 0; r < this.cards.length; r++) {
            for (let c = 0; c < this.cards[r].length; c++) {
                if (!this.cards[r][c].isCovered()) {
                    this.cards[r][c].toggleCovered();
                }
            }
        }
    }

    public makeMove(): void {
        this.coverVisibleCards();
        let [c1, c2] = this.getTwoGuesses(this.players[this.playerOnMoveId]);
        this.players[this.playerOnMoveId].updateKnownCards(c1);
        this.players[this.playerOnMoveId].updateKnownCards(c2);
        c1.toggleCovered();
        c2.toggleCovered();

        if (c1.getSymbol() === c2.getSymbol()) {
            this.shownCards.push(c1, c2);
            c1.toggleMatched();
            c2.toggleMatched();
            this.players[this.playerOnMoveId].addPoints();
            this.playerOnMoveId -= 1; // player has another move
            for (let player of this.players) {
                player.removeKnownCard(c1);
                player.removeKnownCard(c2);
            }
        }

        this.playerOnMoveId += 1;
        this.correctPlayerOnMoveId();
        this.updateGameOver();
    }

    ngOnInit() {
        this.initializeCards();
        this.initializePlayers();
    }
}
