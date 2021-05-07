import randInt from "../utils/randInt";
import Card from "../card/card";

class Player {
    private _id: number;
    private _color: string;
    private _points: number = 0;
    private _knownCards: Card[] = [];
    private _knownTwoSymbols: string[] = [];
    static counter: number = 0;

    public constructor(color: string) {
        this._id = Player.counter;
        this._color = color;
        Player.counter++;
    }

    public getId(): number {
        return this._id;
    }

    public getPoints(): number {
        return this._points;
    }

    public getColor(): string {
        return this._color;
    }

    public addPoints(howMany: number): void {
        this._points += howMany;
    }

    public getName(): string {
        return "Player " + (this._id + 1).toString();
    }

    /**
     * returns a random guess (id of a card)
     */
    private getRandomGuess(from0ToExcl: number): number {
        return randInt(from0ToExcl);
    }

    private getTwoRandomGuesses(from0ToExcl: number): number[] {
        let g1, g2: number;
        do {
            g1 = this.getRandomGuess(from0ToExcl);
            g2 = this.getRandomGuess(from0ToExcl);
        } while (g1 === g2)
        return [g1, g2];
    }

    /**
     * remember to check its output, since it may use randInt
     * so it may choose previously matched cards
     */
    public getTwoBestGuesses(rangeFrom0toExcl: number): number[] {
        let bestGuesses: number[] = this.getIdsOfCardsForTwoKnownSymbols();
        if (bestGuesses.length !== 0) {
            return bestGuesses;
        } else {
            return this.getTwoRandomGuesses(rangeFrom0toExcl);
        }
    }

    // for testing this class outside
    // public getKnownCards(): Card[] {
    //     return this._knownCards;
    // }

    /**
     * returns number[] (ids) of two known cards from memory or [] if empty
     */
    private getIdsOfCardsForTwoKnownSymbols(): number[] {
        let theIds: number[] = [];
        let cards: Card[] = this._knownCards.filter((card) => {
            return card.getSymbol() === this._knownTwoSymbols[0];
        })
        if (cards.length === 2) {
            theIds = [cards[0].getId(), cards[1].getId()];
        }
        return theIds;
    }

    // for testing this class outside
    // public getKnownTwoSymbols(): string[] {
    //     return this._knownTwoSymbols;
    // }

    private removeKnownCard(aCard: Card): void {
        this._knownCards = this._knownCards.filter((card) => {
            return card.getId() !== aCard.getId();
        })
        let indx: number = this._knownTwoSymbols.indexOf(aCard.getSymbol());
        if (indx !== -1) {
            // Array.splice() ret. an array and modif the original array inplace
            this._knownTwoSymbols.splice(indx, 1);
        }
    };

    public removeKnownCards(...cards: Card[]) {
        for (let i = 0; i < cards.length; i++) {
            this.removeKnownCard(cards[i]);
        }
    }

    private updateKnownCard(aCard: Card): void {
        let cardOnList: boolean = this._knownCards.some(
            (card) => {
                return card.getId() === aCard.getId()
            })
        let symbolOnList: boolean = this._knownCards.some(
            (card) => {
                return card.getSymbol() === aCard.getSymbol()
            })
        if (!cardOnList) {
            this._knownCards.push(aCard);
        }
        if (!cardOnList && symbolOnList) {
            this._knownTwoSymbols.push(aCard.getSymbol());
        }
    }

    public updateKnownCards(...cards: Card[]): void {
        for (let i = 0; i < cards.length; i++) {
            this.updateKnownCard(cards[i]);
        }
    }
}

export default Player;
