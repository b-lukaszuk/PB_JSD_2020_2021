import { Karta } from "./karta"

/**
 * klasa reprezentujaca Talie kart do gry w pokera
 * poczatkowo (konstruktor) sklada sie z 52 kart
 * 2-10, J, D, K, A, kazda w 4 kolorach (czerwo, dzwonek, wino, zoledz)
 */
class Talia {
    private talia: Array<Karta> = [];

    /**
     * tworzy talie 52 kart
     */
    public constructor() {
        for (let i = 2; i < 15; i++) {
            for (let j = 1; j < 5; j++) {
                this.talia.push(new Karta(i, j));
            }
        }
    }

    /**
     * zwraca 1 losowa karte z talii
     * zmienia INPLACE this.talia
     * @returns {Karta} - obiekt klasy karta (1) z this.talia
     */
    private getRandCard(): Karta {
        // liczba losowa od 0 (incl) do dl tablicy (excl)
        let losId: number = Math.floor(Math.random() * this.talia.length);
        // array.splice usuwa elt(y) o podanym ind
        // zwraca 1-eltowa tab kart, wiec [0]
        return this.talia.splice(losId, 1)[0];
    }

    /**
     * zwraca n losowych kart z talii
     * zmienia INPLACE this.talia
     * @param {number} - n, Int (1-52, incl-incl), liczba kart do zwrotu
     * @returns {Array<Karta>} - tablica n kart
     */
    public getNrandCards(n: number): Array<Karta> {
        let kartyDoZwrotu: Array<Karta> = [];
        if (n > this.talia.length) {
            console.log("There are not enough cards in the deck to deal them");
            console.log("Teturning empty Array<Karta>");
        } else {

            for (let i = 0; i < n; i++) {
                kartyDoZwrotu.push(this.getRandCard());
            }
            return kartyDoZwrotu;
        }
    }

    /**
     * zwraca liczbe kart pozostalych w talii
     * @returns {number} - liczba kart aktualnie w talii
     */
    public getLkart(): number {
        return this.talia.length;
    }
}

export { Talia }
