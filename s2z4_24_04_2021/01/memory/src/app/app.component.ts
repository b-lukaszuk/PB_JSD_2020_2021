import { Component } from '@angular/core';

import singlCardFactory from './card/cardFactory';
import singlPlayerFactory from './player/playerFactory';
import Card from './card/card'; // for code checker
import Player from './player/player'; // for code checker
import randInt from './utils/randInt';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
})
export class AppComponent {
    public title: string = 'memory';
    public cardFactory = singlCardFactory.getCardFactoryInstance();
    public playerFactory = singlPlayerFactory.getPlayerFactoryInstance();
    public cards: Card[][] = this.getAllCards();
    public players: Player[] = this.getFrom2To4Players();
    public playerToMove: Player = this.players[0];
    public gameOver: boolean = false;
    public matchedCards: Card[] = [];
    public round: number = 1;

    private getAllCards(): Card[][] {
        let theCards: Card[][] = [];
        // factory returns always even no of cards (two of a kind) and >= 4
        let nOfRows: number = this.cardFactory.getNOfCards() / 4;
        let nOfCols: number = this.cardFactory.getNOfCards() / nOfRows;
        for (let r = 0; r < nOfRows; r++) {
            let row: Card[] = [];
            for (let c = 0; c < nOfCols; c++) {
                let aCard: Card = this.cardFactory.getRandCard();
                row.push(aCard);
            }
            theCards.push(row);
        }
        return theCards;
    }

    private getNumOfCards() {
        let row = this.cards.length;
        let col = this.cards[0].length;
        return row * col;
    }

    private getFrom2To4Players(): Player[] {
        let thePlayers: Player[] = [];
        let colors: string[] = ['red', 'black', 'blue', 'orange'];
        let numOfPlayers = randInt(2, 5);
        for (let i = 0; i < numOfPlayers; i++) {
            thePlayers.push(this.playerFactory.getPlayer(colors[i]));
        }
        return thePlayers;
    }

    private changePlayerToMoveToNextInLine(): void {
        let nextPlayerId: number = this.playerToMove.getId() + 1;
        if (nextPlayerId < this.players.length) {
            this.playerToMove = this.players[nextPlayerId];
        } else {
            this.playerToMove = this.players[0];
            this.round++;
        }
    }

    private updateGameOver(): void {
        if (this.matchedCards.length === this.getNumOfCards()) {
            this.gameOver = true;
        }
    }

    // assumption card we are looking for is always in the cards
    private getCardOfId(cardId: number): Card {
        let foundCard: Card = this.cards[0][0];
        for (let r = 0; r < this.cards.length; r++) {
            for (let c = 0; c < this.cards[r].length; c++) {
                if (this.cards[r][c].getId() === cardId) {
                    foundCard = this.cards[r][c];
                    return foundCard;
                }
            }
        }
        return foundCard;
    }

    private getTwoGuesses(aPlayer: Player): [Card, Card] {
        let id1, id2: number;
        let c1, c2: Card;
        do {
            [id1, id2] = aPlayer.getTwoBestGuesses(this.getNumOfCards());
            c1 = this.getCardOfId(id1);
            c2 = this.getCardOfId(id2);
        } while (c1.isEqual(c2) || c1.isMatched() || c2.isMatched())
        return [c1, c2];
    }

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

        let [c1, c2] = this.getTwoGuesses(this.playerToMove);
        this.playerToMove.updateKnownCards(c1);
        this.playerToMove.updateKnownCards(c2);
        c1.toggleCovered(); // uncover card
        c2.toggleCovered(); // uncover card

        if (c1.getSymbol() === c2.getSymbol()) {
            this.matchedCards.push(c1, c2);
            c1.toggleMatched();
            c2.toggleMatched();
            this.playerToMove.addPoints(100);
            for (let player of this.players) {
                player.removeKnownCard(c1);
                player.removeKnownCard(c2);
            }
            this.updateGameOver();
        } else {
            this.changePlayerToMoveToNextInLine();
        }
    }

    ngOnInit() {
    }
}
