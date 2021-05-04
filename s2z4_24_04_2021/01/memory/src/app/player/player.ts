import randInt from "../utils/randInt";
import Card from "../card/card";

class Player {
    private _id: number;
    private _color: string;
    private _uptoRow: number; 	// exclusive
    private _uptoCol: number; 	// exclusive
    private _points: number = 0; // each correct match is 100 points
    private _knownCards: Card[] = [];
    private _knownTwoSymbols: string[] = [];

    /**
     * @param {number[]} guessesRange range for guesses [rowExcl, colExcl]
     */
    public constructor(id: number, color: string,
        guessesRange: number[]) {
        this._id = id;
        this._color = color;
        [this._uptoRow, this._uptoCol] = guessesRange;
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

    public addPoints(): void {
        this._points += 100;
    }

    /**
     * returns player name
     */
    public getName(): string {
        return "Player " + this._id.toString();
    }

    /**
     * returns a random guess (position of the card from range)
     */
    public getRandomGuess(): number[] {
        let randRow = randInt(this._uptoRow);
        let randCol = randInt(this._uptoCol);
        return [randRow, randCol];
    }

    public getTwoRandomGuesses(): number[][] {
        let g1Row, g1Col, g2Row, g2Col: number;
        do {
            [g1Row, g1Col] = this.getRandomGuess();
            [g2Row, g2Col] = this.getRandomGuess();
        } while (g1Row === g2Row && g1Col === g2Col)
        return [[g1Row, g1Col], [g2Row, g2Col]];
    }

    public getBestGuess(): number[][] {
        let bestGuess: number[][] = this.getPosOfTwoKnownSymbols();
        if (bestGuess.length !== 0) {
            return bestGuess;
        } else {
            return this.getTwoRandomGuesses();
        }
    }

    public getKnownCards(): Card[] {
        return this._knownCards;
    }

    /**
     * returns number[][] or [] if no double symbols are known
     */
    public getPosOfTwoKnownSymbols(): number[][] {
        let positions: number[][] = [];
        let cards: Card[] = this._knownCards.filter((card) => {
            return card.getSymbol() === this._knownTwoSymbols[0];
        })
        for (let i = 0; i < cards.length; i++) {
            let x, y: number;
            x = cards[i].getXpos();
            y = cards[i].getYpos();
            positions.push([x, y]);
        }
        return positions;
    }

    public getKnownTwoSymbols(): string[] {
        return this._knownTwoSymbols;
    }

    public removeKnownCard(aCard: Card): void {
        this._knownCards = this._knownCards.filter((card) => {
            return card.getId() !== aCard.getId();
        })
        let indx: number = this._knownTwoSymbols.indexOf(aCard.getSymbol());
        if (indx !== -1) {
            // Array.splice() ret. an array and modif the original array inplace
            this._knownTwoSymbols.splice(indx, 1);
        }
    };

    public updateKnownCards(aCard: Card): void {
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
}

export default Player;
