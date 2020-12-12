/////////////////
// Zadanie zadane przy okazji praca domowej z dnia 07-11-2020
// Przedmiot: Programowanie w jezyku JavaScript
// Podyplomowka: JavaScript Developer 2020/2021
// funkcje nie sprawdzaja zalozen, nie lapia bledow (try...catch), itd.
// calosc lekko opytmalizowana
/////////////////

///////////////////////////////////////////////////////////////////////////////
//                                 zadanie 1
///////////////////////////////////////////////////////////////////////////////
// 5) Scale riddle. With 8 balls :) EXAM [1,1,1,1,2,1,1,1]. One of the
// items will be change to two. Indexes are t be chosen at random. Use
// compressions only two times.

// "indexes are t be chosen at random"?
// przyjmuje ze zmieniam losowa wartosc w tabeli na z 1 na 2
// ale tez niektorzy sugeruja, ze do wazenia kule maja byc wybierane losowo
// "Use compressions only two times" - chodzi o "comparisons" (porownania)?
// jak mam rozumiec porownanie, tak jak w wazeniu, < lub > lub =
// inaczej jesli same if-y/elsy, boole (a > b) to jest chyba niemozliwe
// utworze wiec funkcjemetode zwazKule - ktora imituje wazenie waga

import {Waga} from "./waga" // import klasy Waga

// reprezentacja kul
let tabKule = [1, 1, 1, 1, 1, 1, 1, 1];

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

tabKule = put2doLosInd(tabKule);
console.log("masz nastepujace kule: " + tabKule);

let waga = new Waga(tabKule);
console.log(waga.getKule());

/**
 * fn. pomoc - zwraca tab o ind start (incl) do stop (excl), start < stop
 * nie modyfikuje tabeli wejsciowej
 * @param {Array} tab - tabela (nie moze byc pusta)
 * @param {Number} start - indeks poczatkowy (inclusive)
 * @param {Number} end - indeks koncowy (exclusive)
 * @return {Array} tabela wynikowa z elt z tab wejsc z wybranego zakresu
 */
function tabRange(tab, start, stop) {
    let tabWyn = [];
    for (let i = start; i < stop; i++) {
	tabWyn.push(tab[i]);
    }
    return tabWyn;
}

// dziala, ale nieeleganckie -> do poprawy
/**
 * zwraca indeks 2 w 8 elt tabeli z rep(1, 7) i rep(2, 1)
 * @param {Array<Number>} tab - tablica 8 elt (zawsze), 7 to 1, 1 to 2
 * @return {Number} indeks pod ktorym jest 2
 */
// function getInd2(tab) {
//     let tab1of3 = tabRange(tab, 0, 3); // pierwsze 3 elty
//     let tab2of3 = tabRange(tab, 3, 5); // 2 srodkowe elty
//     let tab3of3 = tabRange(tab, 5, 8); // ostatnie 3 elty
//     let wynWaz1 = zwazKule(tab1of3, tab3of3);
//     if (wynWaz1 === 1) { // ciezka kula jest w 1 czesci
// 	console.log("2 jest na pocz");
// 	let wynWaz2 = zwazKule([tab[0]], [tab[1]]);
// 	if (wynWaz2 === 1) {
// 	    console.log("2 jest pod indeksem 0");
// 	} else if (wynWaz2 === -1) {
// 	    console.log("2 jest pod indeksem 1");
// 	} else {
// 	    console.log("2 jest pod indeksem 2");
// 	}
//     } else if (wynWaz1 === 0) { // ciezka kula jest w srodku
// 	console.log("2 jest w srodku");
// 	let wynWaz2 = zwazKule([tab[3]], [tab[4]]);
// 	if (wynWaz2 === 1) {
// 	    console.log("2 jest pod indeksem 3");
// 	} else {
// 	    console.log("2 jest pod indeksem 4");
// 	}
//     } else { // ciezka kula jest w 3 czesci
// 	console.log("2 jest na koncu");
// 	let wynWaz2 = zwazKule([tab[5]], [tab[6]]);
// 	if (wynWaz2 === 1) {
// 	    console.log("2 jest pod indeksem 5");
// 	} else if (wynWaz2 === -1) {
// 	    console.log("2 jest pod indeksem 6");
// 	} else {
// 	    console.log("2 jest pod indeksem 7");
// 	}
//     }
// }

// getInd2(tabKule);
