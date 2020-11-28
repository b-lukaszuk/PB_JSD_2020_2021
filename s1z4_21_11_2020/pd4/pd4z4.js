/////////////////
// Praca domowa z dnia 21-11-2020
// Przedmiot: Programowanie w jezyku JavaScript
// Podyplomowka: JavaScript Developer 2020/2021
// funkcje nie sprawdzaja zalozen, nie lapia bledow (try...catch), itd.
// funkcje nie sa optymalizowane pod katem szybkosci
// ver 0.3
/////////////////



///////////////////////////////////////////////////////////////////////////////
//	                     zadanie 4 (egazminacyjne)
//		          do pokazania w innym terminie?!
///////////////////////////////////////////////////////////////////////////////
// 4) * Create a solution that will tell us what poker set we
// have. The solution is to deal us 5 cards from the standard 52
// card deck. After that the solution is to tell us what is the
// best poker set. EXAM

// talia, 52 karty:
// a) wartosci 2-10, J, D, K, A (reprezentacja: 2-14)
// b) kolory:  czerwo, dzwonek, wino, zoledz (reprezentacja: 1-4)
// karty to obiekty z 2 polami: ranga i kolor

class Karta {
    constructor(ranga, kolor) {
        this.ranga = ranga;
        this.kolor = kolor;
    }
    toString() {
        let strRanga = "";
        let strKolor = "";
        // reprezentacja stringowa rangi
        switch (this.ranga) {
        case 11:
            strRanga = "J";
            break;
        case 12:
            strRanga = "D";
            break;
        case 13:
            strRanga = "K";
            break;
        case 14:
            strRanga = "A";
            break;
        default:
            strRanga = String(this.ranga);
        }
        // reprezentacja stringowa rangi
        switch (this.kolor) {
        case 1:
            strKolor = "\u2665"; // czerwo
            break;
        case 2:
            strKolor = "\u2666"; // dzwonek
            break;
        case 3:
            strKolor = "\u2660"; // wino
            break;
        default:
            strKolor = "\u2663"; // zoledz
        }
        return strRanga + strKolor;
    }
}

class Talia {
    constructor() {
	this.talia = [];
	for (let i = 2; i < 15; i++) {
	    for (let j = 1; j < 5; j++) {
		this.talia.push(new Karta(i, j));
            }
        }
        this.length = this.talia.length;
    }
    // zwraca 1 losowa karte z talii
    getRandCard() {
        this.length = this.length - 1;
        // array.splice usuwa elt(y) o podanym ind
        return this.talia.splice(
            // liczba losowa od 0 (incl) do dl tablicy (excl)
            Math.floor(Math.random() * this.talia.length), 1
        )[0]; // zwraca 1 karte, a nie tabl z 1 karta
    }
    // zwraca tab kart
    getRandCards(ile) {
        let kartyDoZwrotu = [];
        for (let i = 0; i < ile; i++) {
            kartyDoZwrotu.push(this.getRandCard());
        }
        return kartyDoZwrotu;
    }
}

let taliaKart = new Talia();

class Hand {
    constructor(tab5Kart) {
        this.hand = tab5Kart; 
    }
    toString() {
        let strKarty = "";
        for (let i = 0; i < this.hand.length; i++) {
            strKarty += this.hand[i].toString() + " ";
        }
        return strKarty.replace(/ +$/, ""); // usuwa spacje z konca stringu
    }
    getKarty() { // zwraca tablice kart
        return this.hand;
    }
}

console.log(taliaKart.length);
console.log(taliaKart.getRandCard());
console.log(taliaKart.length);


console.log(taliaKart.length);
let hand1 = new Hand(taliaKart.getRandCards(5));
console.log(hand1.toString());
console.log(taliaKart.length);

// uklady kart za
// https://www.cardschat.com/poker-hands/
// dodane funkcje beda sprawdzane od najw do najmn setu
// dlatego i sOnePair() tez zwroci true dla dwoch par
// bo isTwoPair() bedzie wykonane wczesniej i na tym koniec

// fn. pomocn, mowi, czy kazdy elt tabA, znajduje sie w tabB
function czyAinB(tabA, tabB) {
    return tabA.every((eltA) => tabB.includes(eltA));
}

// 10, J, D, K, A w tym samym kolorze
function isRoyalFlush(hand) {
    let rangi = hand.getKarty().map((karta) => karta.ranga);
    let kolory = hand.getKarty().map((karta) => karta.kolor);
    let wymRangi = [10, 11, 12, 13, 14];
    let war1 = czyAinB(wymRangi, rangi);
    let war2 = kolory.every( // takie same kolory
        (kolor) => kolor === kolory[0]);
    return war1 && war2;
};

// 5 kart po kolei rangami, np. [7, 8, 9, 10, J], w tym samym kolorze
function isStraightFlush(hand) {
    let rangi = hand.getKarty().map((karta) => karta.ranga);
    let kolory = hand.getKarty().map((karta) => karta.kolor);
    // tablica od 0 do 4 (inclusive)
    let wymRangi = Array.from( // zwraca array z obiektu, np. "ab" => ["a", "b"]
        Array(5) // zwraca array 10 elt-owy (undefined w srodku)
            .keys() // zwraca array iterator z indkes. kolejnych elt-ow tablicy
    );
    // dodaje min z rang do kazdego elt, aby miec wymagane karty po kolei
    wymRangi = wymRangi.map((ranga) => ranga + Math.min(...rangi));
    let war1 = czyAinB(wymRangi, rangi);
    let war2 = kolory.every( // takie same kolory
        (kolor) => kolor === kolory[0]);
    return war1 && war2;
}

// fn. pomocn - zwraca tabele z czest wyst liczb w srodku
// np. [1, 2, 3, 4] => [1, 1, 1, 1], ale
// [1, 2, 3, 1] => [1, 1, 2]
function getCzestWyst(tab) {
    let liczebnEltow ={};
    tab.forEach((elt) => {
	let curElt = elt;
	if(curElt in liczebnEltow) { // jesli jest juz w slown (Python) to +1
	    liczebnEltow[curElt] += 1;
	} else { // jesli nie to wstaw po raz 1
	    liczebnEltow[curElt] = 1;
	}
    });
    return Object.values(liczebnEltow); // zwraca tablice values ze slown
}

// 4x karta tej samej rangi
function isFourOfKind(hand) {
    let rangi = hand.getKarty().map((karta) => karta.ranga);
    let war1 = getCzestWyst(rangi).includes(4);
    return war1;
};

// 3x dana_ranga && 2x inna_ranga
function isFullHouse(hand) {
    let rangi = hand.getKarty().map((karta) => karta.ranga);
    let wymCzestWyst = [2, 3];
    let czestWystRang = getCzestWyst(rangi);
    let war1 = czyAinB(wymCzestWyst, czestWystRang);
    return war1;
};

// 5x ten sam kolor
function isFlush(hand) {
    let kolory = hand.getKarty().map((karta) => karta.kolor);
    let wymCzestWyst = [5];
    let czestWystKol = getCzestWyst(kolory);
    let war1 = czyAinB(wymCzestWyst, czestWystKol);
    return war1;
};

// 5x kary w kolejnosci rang, ale bez koloru
function isStraight(hand) {
    let rangi = hand.getKarty().map((karta) => karta.ranga);
    // tablica od 0 do 4 (inclusive)
    let wymRangi = Array.from( // zwraca array z obiektu, np. "ab" => ["a", "b"]
        Array(5) // zwraca array 10 elt-owy (undefined w srodku)
            .keys() // zwraca array iterator z indkes. kolejnych elt-ow tablicy
    );
    // dodaje min z rang do kazdego elt, aby miec wymagane karty po kolei
    wymRangi = wymRangi.map((ranga) => ranga + Math.min(...rangi));
    let war1 = czyAinB(wymRangi, rangi);
    return war1;
};

// 3x dana ranga
function isThreeOfKind(hand) {
    let rangi = hand.getKarty().map((karta) => karta.ranga);
    let war1 = getCzestWyst(rangi).includes(3);
    return war1;
};

// 2x jedna ranga && 2x inna ranga
function isTwoPair(hand) {
    let rangi = hand.getKarty().map((karta) => karta.ranga);
    let war1 = getCzestWyst(rangi).
        filter((czest) => czest === 2) // tylko liczebn = 2
        .length === 2; // sprawdzam czy sa 2
    return war1;
};

// 2x jakas ranga
function isOnePair(hand) {
    let rangi = hand.getKarty().map((karta) => karta.ranga);
    let war1 = getCzestWyst(rangi).includes(2);
    return war1;
};

// zadne z powyzszych, po prostu najwyzsza karta decyduje
// tu zwraca range najw karty
function getHighCardRank(hand) {
    let rangi = hand.getKarty().map((karta) => karta.ranga);
    return Math.max(...rangi);
};
    

// nazwy polskie z https://pl.wikipedia.org/wiki/Poker
let funsSpr = {
    "poker krolewski": isRoyalFlush,
    "poker": isStraightFlush,
    "kareta": isFourOfKind,
    "full": isFullHouse,
    "kolor": isFlush,
    "strit": isFlush,
    "trojka": isFlush,
    "dwie pary": isTwoPair,
    "jedna para": isOnePair,
    "najw karta": getHighCardRank
};

function ustalUklad(hand, funsSpr) {
    for (const nazwaFnSpr in funsSpr) {
        if(funsSpr[nazwaFnSpr](hand)) {
            return nazwaFnSpr;
        }
    }
    return "nie znaleziono pasujacego ukladu";
}

console.log(ustalUklad(hand1, funsSpr));
