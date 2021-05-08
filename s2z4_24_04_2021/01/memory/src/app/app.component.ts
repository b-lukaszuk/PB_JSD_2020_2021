import { Component } from '@angular/core';

import Card from './card/card'; // for code checker
import Player from './player/player'; // for code checker
import randInt from './utils/randInt';
import singlCardFactory from './card/cardFactory';
import singlPlayerFactory from './player/playerFactory';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
})
export class AppComponent {
    public title: string = 'memory';
    private cardFactory = singlCardFactory.getCardFactoryInstance();
    private playerFactory = singlPlayerFactory.getPlayerFactoryInstance();
    public cards: Card[][] = this.getAllCards();
    public players: Player[] = this.getFrom2To4Players();
    public playerToMove: Player = this.players[0];
    public gameOver: boolean = false;
    private matchedCards: Card[] = [];
    public round: number = 1;

    private getAllCards(): Card[][] {
        let theCards: Card[][] = [];
        // factory returns always even Num of cards (two of a kind) and >= 4
        let nOfRows: number = this.cardFactory.getNumOfCards() / 4;
        let nOfCols: number = this.cardFactory.getNumOfCards() / nOfRows;
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
            thePlayers.push(this.playerFactory.getPlayer(colors[i],
                this.getNumOfCards()));
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

    // assumption: card we are looking for is always in the cards
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
            [id1, id2] = aPlayer.getTwoBestGuesses();
            c1 = this.getCardOfId(id1);
            c2 = this.getCardOfId(id2);
        } while (c1.isEqual(c2) || c1.isMatched() || c2.isMatched())
        return [c1, c2];
    }

    private coverAllVisibleCards(): void {
        for (let r = 0; r < this.cards.length; r++) {
            for (let c = 0; c < this.cards[r].length; c++) {
                if (!this.cards[r][c].isCovered()) {
                    this.cards[r][c].toggleCovered();
                }
            }
        }
    }

    private uncoverCards(...cards: Card[]): void {
        for (let i = 0; i < cards.length; i++) {
            if (cards[i].isCovered()) {
                cards[i].toggleCovered();
            }
        }
    }

    private markCardsAsMatched(...cards: Card[]): void {
        for (let i = 0; i < cards.length; i++) {
            if (!cards[i].isMatched()) {
                cards[i].toggleMatched();
            }
        }
    }

    private handleMatchedCards(c1: Card, c2: Card): void {
        this.matchedCards.push(c1, c2);
        this.markCardsAsMatched(c1, c2);

        this.playerToMove.addPoints(100);

        // inform all players about match (so they don't type the cards again)
        for (let player of this.players) {
            player.removeKnownCards(c1, c2);
        }
        this.updateGameOver();
    }

    public makeMove(): void {
        this.coverAllVisibleCards();

        let c1, c2: Card;
        [c1, c2] = this.getTwoGuesses(this.playerToMove);

        this.playerToMove.updateKnownCards(c1, c2);
        this.uncoverCards(c1, c2);

        if (c1.getSymbol() === c2.getSymbol()) {
            this.handleMatchedCards(c1, c2);
        } else {
            this.changePlayerToMoveToNextInLine();
        }
    }

    ngOnInit() {
    }
}
