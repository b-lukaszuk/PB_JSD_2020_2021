import { Component } from '@angular/core';

import singlCardFactory from './card/cardFactory';
import Card from './card/card';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
})
export class AppComponent {
    public title: string = 'memory';
    public cardFactory = singlCardFactory.getCardFactoryInstance();
    public cards: Card[][] = [];

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

    ngOnInit() {
        this.initializeCards();
    }
}
