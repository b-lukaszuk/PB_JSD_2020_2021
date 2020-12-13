/////////////////
// Zadanie zadane przy okazji praca domowej z dnia 07-11-2020
// Przedmiot: Programowanie w jezyku JavaScript
// Podyplomowka: JavaScript Developer 2020/2021
// funkcje nie sprawdzaja zalozen, nie lapia bledow (try...catch), itd.
// calosc lekko opytmalizowana, np. przez pisanie w typescript
/////////////////

///////////////////////////////////////////////////////////////////////////////
//                                 zadanie 1
///////////////////////////////////////////////////////////////////////////////
// 5) Scale riddle. With 8 balls :) EXAM [1,1,1,1,2,1,1,1]. One of the
// items will be change to two. Indexes are t be chosen at random. Use
// compressions only two times.

// "indexes are t be chosen at random"?
// przyjmuje ze zmieniam losowa wartosc w tabeli na z 1 na 2
// sugestia niektorych ludzi z roku:
// kule sa losowo wybierane do wazenia (just in case zastosuje sie i do tego)
// "Use compressions only two times" - chodzi o "comparisons" (porownania)?
// jak mam rozumiec porownanie, tak jak w wazeniu, < lub > lub =
// inaczej jesli same if-y/elsy, boole (a > b) to jest chyba niemozliwe
// utworze wiec funkcje/metode ktora bedzie imitowac wazenie waga

import {Kula} from "./kula"

// reprezentacja kul
let tabLiczb: Array<number> = [1, 1, 1, 1, 1, 1, 1, 1];

// pozwole sobie nie drukowac juz tab liczb, tylko od razu tab kul (obiekty)
// console.log(tabLiczb);

/**
 * fn pomocn - zwraca liczbe (Int) z zakresu 0 do n (incl-excl)
 * @param {Number} n - liczba (Int), gorna granica zakresu (exclusive)
 * @return {Number} losowa liczba (Int) z zadanego zakresu
 */
function getInt0ToN(n: number): number {
    // Math.random() - od 0 do 1
    // * n aby gorny zakres, floor aby zakres byl od 0 do n-1
    return Math.floor(Math.random() * n);
}

/**
 * fn. pomocn - wstawia 2 do los ind tabeli wejsciowej
 * zwraca kopie tablicy
 * @param {Array<Number>} tab - tablica liczb (Inty, same 1)
 * @return {Array<Number>} tablica liczb (Inty, 1x2, reszta 1)
 */
function put2doLosInd(tab: Array<number>): Array<number> {
    let tab1: Array<number> = [...tab];
    // zastepuje jedna 1 na 2, zwraca zast elt
    tab1.splice(getInt0ToN(tab1.length), 1, 2);
    return tab1;
}

tabLiczb = put2doLosInd(tabLiczb);


/**
 * fn. pom. - zamienia tablice Intow na tablice obiektow klasy Kula
 * @param {Array<number>} tab - tabela liczb 1x2, reszta jedynki
 * @return {Array<Kula>} - tab obiektow postaci klasy Kula
 */
function tabLbDoTabKul(tab: Array<number>): Array<Kula> {
    let tabKul: Array<Kula> = [];
    for (let i = 0; i < tab.length; i++) {
	tabKul.push(new Kula(i, tab[i]));
    }
    return tabKul;
}

let kule = tabLbDoTabKul(tabLiczb);

console.log(kule);
console.log("===");


/**
 * fn. pom. - sumuje elt-y tab Kul
 * @param {Array<Kula>} kule - tab obiektow klasy kula
 * @return {Number} suma elementow tej tablicy
 */
function liczMaseKul(kule: Array<Kula>): number {
    return kule.
	reduce((acc: number, cur: Kula) => acc + cur.getMass(), 0);
}

let lWazen = 0;

/**
 * imituje wazenie 2 zestawow kul (wagi)
 * podbija counter (globalny) liczby wazen
 * @param {Array<Kula>} kule1 - tab obiektow klasy Kula
 * @param {Array<Kula>} kule2 - tab obiektow klasy Kula
 * @return {number} - [-1, 0, 1] odpowiednio: [k1 ciezsza, k1==k2, k2 ciezsza]
 */
function zwazKule(kule1: Array<Kula>, kule2: Array<Kula>): number {
    lWazen++; // podbijam counter globalny
    let sT1: number = liczMaseKul(kule1);
    let sT2: number = liczMaseKul(kule2);
    if (sT1 > sT2) {
	return -1;
    } else if (sT1 === sT2) {
	return 0;
    } else {
	return 1;
    }
}

/**
 * fn pom, shuffle-uje/miesza array
 * wykonuje operacje inplace (zmienia array wejsciowy)
 */
function mieszKule(kule: Array<Kula>): void {
    // sortuje kule losowo sort przyjm porFn(a, b),
    // jesli porFn(a, b) => <0, to [a,b],
    // jesli poFn(a, b) => >0, to [b, a],
    // else nie zmienia kol elt-ow
    kule.sort(() => Math.random() - 0.5)
}

/**
 * fn. pom. - zwraca losowo kilka Kul
 * modyfikuje tablice wejsciowa (bedzie mniejsza po uzyciu tej fn)
 * @param {Array<Kula>} kule - tab obiektow klasy kule
 * @param {number} n - liczba kul do zwrotu (usuniecia z kule)
 * @return {Array<Kula>} tablica kul (wybrana losowo z kule, kule beda mniejsze)
 */
function getNrandKul(kule: Array<Kula>, n: number): Array<Kula> {
    mieszKule(kule);
    // zwraca n kul usunietych z this.kule, ktore zostaje zmniejszone
    return kule.splice(0, n);
}


/**
 * zwraca indeks 2 w tablicy co najmniej 2 elementowej
 * @param {Array<Kula>} kule - tablica >=1 elt, 1x2, reszta 1
 * @return {number} indeks pod ktorym jest 2
 */
function getCiezkKula(kule: Array<Kula>): number {
    let lKul: number = kule.length;
    if (lKul === 1) {
	return kule[0].getId();
    } else {
	
	// zawsze dzieli kule na 3 kupki
	let poIleKul: number = Math.ceil(lKul / 3);
	// losowo, bo byc moze jest to wymagane w tresci zadania
	let k1 = getNrandKul(kule, poIleKul);
	let k2 = getNrandKul(kule, poIleKul);
	// pozostale kule trafiaja do k3
	let k3 = kule;

	let wynWaz = zwazKule(k1, k2);

	if (wynWaz === 0) {
	    return getCiezkKula(k3);
	} else if (wynWaz < 0) {
	    return getCiezkKula(k1);
	} else {
	    return getCiezkKula(k2);
	}
    }
}

let ciezkaKula = getCiezkKula(kule);
console.log("Ciezka kula jest pod indeksem: " + ciezkaKula);
console.log("Ilosc wazen: " + lWazen);
