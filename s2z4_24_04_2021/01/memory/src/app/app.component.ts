import { Component } from '@angular/core';

import singlCardFactory from './card/cardFactory';
import Card from './card/card';
import Player from './player/player';
import randInt from "./utils/randInt";

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
    public answPlayerId = 0;

    private initializeCards(): void {
        // number of cards is always even (two of a kind)
        let nOfRows: number = this.cardFactory.getNOfCards() / 4;
        let nOfCols: number = this.cardFactory.getNOfCards() / nOfRows;
        for (let r = 0; r < nOfRows; r++) {
            let row: Card[] = [];
            for (let c = 0; c < nOfCols; c++) {
                let aCard: Card = this.cardFactory.getRandCard();
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
        let colors: string[] = ["red", "black", "blue", "gold"];
        let numOfPlayers = randInt(2, 5);
        for (let i = 0; i < numOfPlayers; i++) {
            this.players.push(new Player(i, colors[i],
                this.cardsGetDims()));
        }
    }

    /**
     * flipCard - covers/uncovers card
     */
    public flipCard(pos: number[]): void {
        let [row, col] = pos;
        this.cards[row][col].toggleCovered();
    }

    public areAllCardsMatched(): boolean {
        for (let r = 0; r < this.cards.length; r++) {
            for (let c = 0; c < this.cards[r].length; c++) {
                // if any card is not matched
                if (!this.cards[r][c].isMatched()) {
                    return false;
                }
            }
        }
        return true;
    }

    public makeMove(): void {
        console.log("move made");
    }

    /**
     * removes card from html display,
     * in reality it, changes card's match field (therefor its display in html)
     */
    public removeCard(pos: number[]): void {
        let [row, col] = pos;
        this.cards[row][col].toggleMatched();
    }

    ngOnInit() {
        this.initializeCards();
        this.initializePlayers()
        // this.flipCard([2, 0]);
        // this.removeCard([1, 3]);
    }
}
