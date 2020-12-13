/////////////////
// Zadanie zadane przy okazji praca domowej z dnia 07-11-2020 (jako zad 5)
// Przedmiot: Programowanie w jezyku JavaScript
// Podyplomowka: JavaScript Developer 2020/2021
// funkcje nie sprawdzaja zalozen, nie lapia bledow (try...catch), itd.
// przerobka rozwiazania z pd3 (zad 5)
// calosc lekko opytmalizowana, np. przez pisanie w typescript,
// poprawke poprz wersji
/////////////////

///////////////////////////////////////////////////////////////////////////////
//                                 zadanie 1
///////////////////////////////////////////////////////////////////////////////
// 5) Scale riddle. With 8 balls :) EXAM [1,1,1,1,2,1,1,1]. One of the
// items will be change to two. Indexes are t be chosen at random. Use
// compressions only two times.


////////////////////////////////////////
/// niejasnosci i przyjete zalozenia ///
////////////////////////////////////////
// "indexes are t be chosen at random"?
// przyjmuje ze zmieniam losowa wartosc w tabeli z 1 na 2
// sugestia niektorych ludzi z roku:
// kule sa losowo wybierane do wazenia (just in case zastosuje sie i do tego)
// "Use compressions only two times" - chodzi o "comparisons" (porownania)?
// jak mam rozumiec porownanie, tak jak w wazeniu, < lub > lub =
// inaczej jesli same if-y/elsy, boole (a > b) to jest chyba niemozliwe
// utworze wiec funkcje/metode ktora bedzie imitowac wazenie waga

import {Kula} from "./kula"

// mala modyfikacja, ilosc kul do wazenia bede wczytywal z bash-a, np.:
// > node z1.js 8
const yargs = require("yargs")
const args = yargs.argv; // argsy przeslane przy wywolaniu
let ileEltow: number; // ile kul mamy miec
// jesli nie podano args-ow to 8, jesli za duzo argsow to tylko 1 podany
if (typeof args._[0] === "undefined") {
    ileEltow = 8;
} else {
    ileEltow = args._[0];
}

/**
 * fn pomocn - zwraca tablice 1 o zadanej dlugosci
 * @param {number} n - liczba (Int), dlugosc tablicy jedynek
 * @return {Array<number>} tablica jedynek o zadanej dlugosci
 */
function getTabJedynek(n: number): Array<number> {
    let tmp: Array<number> = [];
    for (let i = 0; i < n; i++) {
	tmp.push(1)
    }
    return tmp;
}

// reprezentacja kul
let tabLiczb: Array<number> = getTabJedynek(ileEltow);

// pozwole sobie nie drukowac juz tab liczb, tylko od razu tab kul (obiekty)
// bo lepiej sie czyta z konsoli
// console.log(tabLiczb);

/**
 * fn pomocn - zwraca liczbe (Int) z zakresu 0 do n (incl-excl)
 * @param {number} n - liczba (Int), gorna granica zakresu (exclusive)
 * @return {number} losowa liczba (Int) z zadanego zakresu
 */
function getInt0ToN(n: number): number {
    // Math.random() - od 0 do 1
    // * n aby gorny zakres, floor aby zakres byl od 0 do n-1
    return Math.floor(Math.random() * n);
}

/**
 * fn. pomocn - wstawia 2 do los ind tabeli wejsciowej
 * zwraca kopie tablicy
 * @param {Array<number>} tab - tablica liczb (Inty, same 1)
 * @return {Array<number>} tablica liczb (Inty, 1x2, reszta 1)
 */
function put2doLosInd(tab: Array<number>): Array<number> {
    let tab1: Array<number> = [...tab]; // kopia tab
    // zastepuje jedna 1 na 2, zwraca zast elt
    tab1.splice(getInt0ToN(tab1.length), 1, 2);
    return tab1;
}

tabLiczb = put2doLosInd(tabLiczb);

/**
 * fn. pom. - zamienia tablice Intow na tablice obiektow klasy Kula
 * @param {Array<number>} tab - tabela liczb 1x2, reszta jedynki
 * @return {Array<Kula>} - tab obiektow klasy Kula
 */
function tabLbDoTabKul(tab: Array<number>): Array<Kula> {
    return tab.map((cur: number, ind: number) => new Kula(ind, cur));
}

let kule: Array<Kula> = tabLbDoTabKul(tabLiczb);

console.log(kule);
console.log("===");

/**
 * fn. pom. - sumuje masy kul w tablicy
 * @param {Array<Kula>} kule - tab obiektow klasy kula
 * @return {number} suma mas kul (z obiektow klasy kula z tab kule)
 */
function liczMaseKul(kule: Array<Kula>): number {
    return kule.
	reduce((acc: number, cur: Kula) => acc + cur.getMass(), 0);
}

// zmienna globalna, podbijana przy kazdym wazeniu
let lWazen: number = 0;

/**
 * imituje wazenie 2 zestawow kul
 * podbija globalny counter liczby wazen (lWazen)
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
 * wykonuje operacje INPLACE (zmienia array wejsciowy)
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
 * modyfikuje tablice wejsciowa INPLACE (bedzie mniejsza po uzyciu tej fn)
 * @param {Array<Kula>} kule - tab obiektow klasy kula
 * @param {number} n - liczba kul do zwrotu (usuniecia z kule)
 * @return {Array<Kula>} tablica kul (wybrana losowo z kule, kule beda mniejsze)
 */
function getNrandKul(kule: Array<Kula>, n: number): Array<Kula> {
    mieszKule(kule);
    // zwraca n kul usunietych z kule, ktore zostaje zmniejszone
    return kule.splice(0, n);
}


/**
 * zwraca ciezka kule z tablicy co najmniej 1 elementowej
 * wykorzystuje rekurencje
 * @param {Array<Kula>} kule - tablica >=1 elt klasy Kula; masa: 1x2, reszta 1
 * @return {Kula} obiekt kula o masie 2
 */
function getCiezkKula(kule: Array<Kula>): Kula {
    let lKul: number = kule.length;
    if (lKul === 1) {
	return kule[0];
    } else {
	// zawsze dzieli kule na 3 kupki
	let poIleKul: number = Math.ceil(lKul / 3);
	// losowo, bo byc moze jest to wymagane w tresci zadania
	let k1: Array<Kula> = getNrandKul(kule, poIleKul);
	let k2: Array<Kula> = getNrandKul(kule, poIleKul);
	// pozostale kule trafiaja do k3
	let k3: Array<Kula> = kule;

	// -1 (k1 ciezsze niz k2); +1 (k1 lzejsze niz k2); 0 (k1 == k2)
	let wynWazenia: number = zwazKule(k1, k2);

	if (wynWazenia === 0) {
	    return getCiezkKula(k3);
	} else if (wynWazenia < 0) {
	    return getCiezkKula(k1);
	} else {
	    return getCiezkKula(k2);
	}
    }
}

let ciezkaKula = getCiezkKula(kule);
console.log("Ciezka kula jest pod indeksem: " + ciezkaKula.getId());
console.log("Ilosc wazen: " + lWazen);
