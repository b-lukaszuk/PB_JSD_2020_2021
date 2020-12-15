import {Karta} from "./karta"

/**
 * klasa reprezentujaca 5 kart (z ang. Hand) rozdane 1 graczowi
 */
class Hand {
    private hand: Array<Karta> = [];

    public constructor(tab5Kart: Array<Karta>) {
	this.hand = tab5Kart;
	// od razu sortuje karty malejaco, lepiej wyglada :)
	this.hand.sort((a, b) => b.getRanga() - a.getRanga());
    }

    /**
     * zwraca stringowa reprezentacje kart na reku
     * @param {string} sep - separator oddzielajacy karty od siebie
     * @returns {string} - stringowa repr. kart na reku
     */
    public toString(sep: string = " "): string {
	let strKarty: string = "";
	for (let i = 0; i < this.hand.length; i++) {
	    strKarty += this.hand[i].toString() + sep;
	}
	return strKarty.replace(/ +$/, sep); // usuwa separator z konca stringu
    }

    /**
     * zwraca this.hand
     * @returns {Array<Karta>} - 5 kart (hand)
     */
    private getKarty(): Array<Karta> {
	return this.hand;
    }

    // sprawdzanie ukladow kart na reku
    // uklady kart za:
    // https://www.cardschat.com/poker-hands/

    /**
     * met. pomoc, zwraca rangi wszystkich kart na reku
     * @returns {Array<number>} - tablica rang wszystkich kart na reku
     */
    private getRangi(): Array<number> {
	return this.hand.map((karta) => karta.getRanga());
    }

    /**
     * met. pomoc, zwraca kolory wszystkich kart na reku
     * @returns {Array<number>} - tablica kolorow wszystkich kart na reku
     */
    private getKolory(): Array<number> {
	return this.hand.map((karta) => karta.getKolor());
    }

    /**
     * met. pomoc, mowi, czy kazdy elt tabA, znajduje sie w tabB
     * @param {Array<number>} tabA - tablica liczb (unikalne Int-y)
     * @param {Array<number>} tabB - tablica liczb (Int-y)
     * @returns {boolean} - true jesli kazdy elt z tabA jest w tabB
     */
    private czyAllAinB(tabA: Array<number>, tabB: Array<number>): boolean {
	return tabA.every((eltA) => tabB.includes(eltA));
    }

    /**
     * met. pomoc, zwraca czest wyst liczb z tab (input)
     * np. [1, 2, 3, 4] => [1, 1, 1, 1], ale [1, 2, 3, 1] => [1, 1, 2]
     * @param {Array<number>} tab - tablica liczb (Int-y)
     * @returns {Array<number>} - tab liczebnosci (Int-y)
     */
    private getCzestWyst(tab: Array<number>): Array<number> {
	let liczebnEltow: Object = {}; // slown Python-owy
	tab.forEach((elt) => {
	    if(elt in liczebnEltow) { // jesli jest juz w slown, to +1
		liczebnEltow[elt] += 1;
	    } else { // jesli nie, to wstaw po raz pierwszy z liczebn = 1
		liczebnEltow[elt] = 1;
	    }
	});
	return Object.values(liczebnEltow); // zwraca tablice values ze slown
    }

    /**
     * zwraca najwieksza range z kart na reku
     * @returns {number} - najw karta (ranga)
     */
    private getHighestCard(): Karta {
	// zakladajac, ze kolor nie ma znaczenia
	// bo np. 2xK to wylapie to this.isOnePair()
	return this.hand[0];
    }

    /**
     * sprawdza czy jest n kart danej rangi/koloru
     * do sprawdzania pary, trojki i karety, koloru
     * @param {number} n - (Int) ile powtorzen danej rangi na reku ma byc
     * @param {boolean} ranga - czy sprawdzac powt rang, czy kolorow
     * @returns {boolean} - true, jesli jest n kart danej rangi/koloru na reku
     */
    private isNofKind(n: number, ranga: boolean = true): boolean {
	let rangsOrKols: Array<number> = [];
	if (ranga) {
	    rangsOrKols = this.getRangi();
	} else {
	    rangsOrKols = this.getKolory()
	}
	return this.getCzestWyst(rangsOrKols).includes(n);
    };

    /**
     * sprawdza czy na reku jest Para, tj. 2x karta tej samej rangi
     * @returns {boolean} - true, jesli na reku jest Para
     */
    private isOnePair(): boolean {
	return this.isNofKind(2);
    };

    /**
     * sprawdza czy sa 2 pary, tj. 2x jedna ranga && 2x inna ranga
     * @returns {boolean} - true, jesli sa 2 pary
     */
    private isTwoPair(): boolean {
	let rangi: Array<number> = this.getRangi();
	let podwWyst: Array<number> = this.getCzestWyst(rangi)
	    .filter((czest) => czest === 2); // tylko liczebn == 2
	return podwWyst.length === 2; // czy sa 2 dwojki
    };

    /**
     * sprawdza czy na reku jest Trojka, tj. 3x karta tej samej rangi
     * @returns {boolean} - true, jesli na reku jest Trojka
     */
    private isThreeOfKind(): boolean {
	return this.isNofKind(3);
    };

    /**
     * met. pomoc, zwraca tablice z wartosciami od (incl) do (excl)
     * imitacja pythonowego range()
     * @param {number} start - (incl) - Int, min wart min tablicy
     * @param {number} stop - (excl) - Int, max wart (excl) tablicy
     * @param {number} coIle - (Int) przeskok
     * @returns {Array<number>} - tab Int-ow (rosnaco) od (incl)-do (excl) coIle
     */
    private range(start: number, stop: number, coIle: number=1): Array<number> {
	let tmp: Array<number> = [];
	for (let i = start; i < stop; i += coIle) {
	    tmp.push(i);
	}
	return tmp;
    }

    /**
     * met. pomoc, sprawdza, czy karty sa uporzadkowane rosnaco
     * do pokera, duzego strita, strita
     * @param {number} start - Int, najmniejsza karta od ktorej rangi zaczynamy
     * @returns {boolean} - true, jesli karty sa uporzadkowane rosnaco od start
     */
    private isOrdered(start: number): boolean {
	let rangi: Array<number> = this.getRangi();
	let wymRangi: Array<number> = this.range(start, start+5);
	return this.czyAllAinB(wymRangi, rangi);
    }

    /**
     * sprawdza, czy jest strit, tj. 5x karty w kolejnosci rang, ale bez koloru
     * do pokera, duzego strita, strita
     * @returns {boolean} - true, jesli na reku jest strit
     */
    private isStraight(): boolean {
	// this.hand.slice(-1)[0], ost elt tablicy, ktora jest posort
	return this.isOrdered(this.hand.slice(-1)[0].getRanga());
    }

    /**
     * sprawdza, czy jest Kolor, tj. 5x karty w tym samym kolorze
     * @returns {boolean} - true, jesli na reku jest Kolor
     */
    private isFlush(): boolean {
	return this.isNofKind(5, false);
    };

    /**
     * sprawdza, czy jest Full, tj. 3x dana ranga && 2x inna ranga
     * @returns {boolean} - true, jesli na reku jest Full
     */
    private isFullHouse(): boolean {
	let wymCzestWyst: Array<number> = [2, 3];
	return this.czyAllAinB(wymCzestWyst,
			       this.getCzestWyst(this.getRangi()));
    };

    /**
     * sprawdza, czy jest Czworka, tj. 4x karta tej samej rangi
     * @returns {boolean} - true, jesli na reku jest Czworka
     */
    private isFourOfKind(): boolean {
	return this.isNofKind(4);
    };

    /**
     * sprawdza, czy jest Poker, tj. 5 kart po kolei rangami,
     * np. [7, 8, 9, 10, J], w tym samym kolorze
     * @returns {boolean} - true, jesli na reku jest Poker
     */
    private isStraightFlush(): boolean {
	return this.isNofKind(5, false) && this.isStraight();
    }

    /**
     * sprawdza, czy jest Poker Krolewski, tj.
     * 10, J, D, K, A - w tym samym kolorze
     * @returns {boolean} - true, jesli na reku jest Poker Krolewski
     */
    private isRoyalFlush(): boolean {
	return this.isNofKind(5, false) && this.isOrdered(10);
    };

    /**
     * ustala uklad kart na reku
     * nazwy polskie za https://pl.wikipedia.org/wiki/Poker
     * @returns {string} - nazwa najwyzszego ukladu
     */
    public ustalUklad(): string {
	// sprawdza od najwyzszego i zatrzymuje sie po pierw hit-cie
	if(this.isRoyalFlush()) {
	    return "poker krolewski";
	} else if (this.isStraightFlush()) {
	    return "poker";
	} else if (this.isFourOfKind()) {
	    return "kareta";
	} else if (this.isFullHouse()) {
	    return "full";
	} else if (this.isFlush()) {
	    return "kolor";
	} else if (this.isStraight()) {
	    return "strit";
	} else if (this.isThreeOfKind()) {
	    return "trojka";
	} else if (this.isTwoPair()) {
	    return "dwie pary";
	} else if (this.isOnePair()) {
	    return "jedna para";
	} else {
	    return "najwieksza karta: " + this.getHighestCard().toString();
	}
    }
}

export {Hand}
