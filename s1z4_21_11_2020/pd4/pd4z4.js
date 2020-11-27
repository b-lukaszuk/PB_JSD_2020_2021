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

// 10, J, D, K, A w tym samym kolorze
function isRoyalFlush(hand) {
    let rangi = hand.getKarty().map((karta) => karta.ranga);
    let kolory = hand.getKarty().map((karta) => karta.kolor);
    let wymRangi = [10, 11, 12, 13, 14];
    // arr.includes(value) => true|false jesli array zawiera/nie value
    let war1 = wymRangi.every((wymRanga) => rangi.includes(wymRanga));
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
    // arr.includes(value) => true|false jesli array zawiera/nie value
    let war1 = wymRangi.every((wymRanga) => rangi.includes(wymRanga));
    let war2 = kolory.every( // takie same kolory
        (kolor) => kolor === kolory[0]);
    return war1 && war2;
}

// 4x karta tej samej rangi
function isFourOfKind(hand) {
    let rangi = hand.getKarty().map((karta) => karta.ranga);
    let kolory = hand.getKarty().map((karta) => karta.kolor);
    let licznosciRang = {};
    rangi.forEach((ranga) => {
	let curRanga = ranga;
	if(curRanga in licznosciRang) { // jesli jest juz w slown (Python) to +1
	    licznosciRang[curRanga] += 1;
	} else { // jesli nie to wstaw po raz 1
	    licznosciRang[curRanga] = 1;
	}
    });
    let war1 = Object.values(licznosciRang) // zwraca tablice values ze slown
        .includes(4); // true|false dla obecnosci elt-u w tablicy
    return war1;
};

console.log(isFourOfKind(hand1));
console.log(isFourOfKind(new Hand(
    [
	{ranga: 2, kolor: 2},
	{ranga: 4, kolor: 2},
	{ranga: 3, kolor: 2},
	{ranga: 4, kolor: 2},
	{ranga: 4, kolor: 2}]
)));

function StraightFlush() {};
function FullHouse() {};
function Flush() {};
function Straight() {};
function ThreeOfKind() {};
function TwoPair() {};
function OnePair() {};
function HighCard() {};
    
